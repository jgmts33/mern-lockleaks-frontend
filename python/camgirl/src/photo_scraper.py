import aiohttp
import asyncio
import mimetypes
from typing import Union, List, Tuple
from pathlib import Path
from .file_reader import read_media_as_bytes
from contextlib import suppress
from tqdm import tqdm


PARSE_URL = "https://api.camgirlfinder.net/search"


class PhotoScraper:
    def __init__(self, query: Union[Path, str]):
        self.query = Path(query)

    async def parse(self) -> Tuple[dict, List[str]]:
        media_bytes = await read_media_as_bytes(self.query)

        data = aiohttp.FormData()

        file_type = mimetypes.guess_type(self.query)[0] or "application/octet-stream"
        data.add_field(
            "image",
            media_bytes,
            filename=self.query.name,
            content_type=file_type,
        )
        async with aiohttp.ClientSession() as session:
            async with session.post(PARSE_URL, data=data) as responce:
                responce.raise_for_status()
                json_responce = await responce.json()
                predictions = json_responce.get("predictions")
                persons: List[dict] = []
                
                for pred in tqdm(predictions):
                    with suppress(Exception):
                        url = list(pred.get("urls").values())[0].replace(
                            "camgirlfinder.net", "api.camgirlfinder.net"
                        )
                        async with session.get(url) as responce:
                            await asyncio.sleep(0.2)
                            json_responce = await responce.json()
                            pers = json_responce.get("persons")
                            if pers:
                                persons.extend(pers)

                if predictions:
                    predictions = [
                        f'{prediction.get("model")} - {list(prediction.get("urls").values())[0] if prediction.get("urls") else "None"}'
                        for prediction in predictions
                    ]
                return persons, predictions
