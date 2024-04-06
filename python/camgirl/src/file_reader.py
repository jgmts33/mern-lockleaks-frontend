import aiofiles
from typing import Union
from pathlib import Path


async def read_media_as_bytes(media_path: Union[Path, str]):
    async with aiofiles.open(media_path, "rb") as file:
        return await file.read()
