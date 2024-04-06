import aiofiles
from datetime import datetime
from pathlib import Path

FOLDERS_DIR = Path("outputs")


class Saver:
    def __init__(self, data: list, file_name: str):
        self.data = data
        self.file_name = file_name

    async def save_photo(self) -> None:
        await self.save_data(dir_path=Path(FOLDERS_DIR, "photo"))

    async def save_username(self) -> None:
        await self.save_data(dir_path=Path(FOLDERS_DIR, "username"))

    async def save_data(self, dir_path: Path) -> None:
        file_path = Path(dir_path, self.file_name)

        async with aiofiles.open(file_path, "w", encoding="utf-8") as file:
            await file.write("\n".join(self.data))

        print(f"Results saved {file_path}")
