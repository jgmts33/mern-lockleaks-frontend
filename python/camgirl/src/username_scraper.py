import aiohttp
from typing import List, Tuple
from tqdm import tqdm

PARSE_URL = "https://api.camgirlfinder.net/models/search?"


class UsernameScraper:
    def __init__(self, query: str):
        self.query = query

    async def parse(self) -> Tuple[dict, List[str]]:
        async with aiohttp.ClientSession() as session:
            async with session.get(PARSE_URL + f"model={self.query}") as responce:
                responce.raise_for_status()
                predictions = await responce.json()
                persons = [
                    pred.get("persons")
                    for pred in predictions
                    if pred.get("persons") and str(pred.get("persons")).isdigit()
                ]

                if predictions:
                    predictions = [
                        f'{prediction.get("name")} - {list(prediction.get("urls").values())[0] if prediction.get("urls") else "None"}'
                        for prediction in tqdm(predictions)
                    ]
                return persons, predictions
