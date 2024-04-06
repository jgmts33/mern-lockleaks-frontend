import asyncio
import argparse
from datetime import datetime
from src.photo_scraper import PhotoScraper
from src.username_scraper import UsernameScraper
from src.saver import Saver


async def main():
    parser = argparse.ArgumentParser(description="Camgril Scraper")
    parser.add_argument(
        "-p",
        "--photo",
        help='Photo Scraper. Arg: Path to the photo file. Use "," as delimiter',
    )
    parser.add_argument(
        "-u",
        "--username",
        help='Username Scraper. Arg: search text, between 3 and 50 characters. Use "," as delimiter',
    )
    args = parser.parse_args()

    if args.photo:
        for query in (args.photo).split(","):
            persons, predictions = await PhotoScraper(query).parse()

            print(f'Results: {len(predictions) if predictions else "0"}. Query: {query}')
            print(f'Possible profiles: {len(persons) if persons else "0"}')

            await Saver(
                data=predictions,
                file_name=query
                + "_"
                + datetime.now().strftime("%d_%m_%Y_%H_%M_%S")
                + ".txt",
            ).save_photo()

    elif args.username:
        for query in (args.username).split(","):
            persons, predictions = await UsernameScraper(query).parse()

            print(f'Results: {len(predictions) if predictions else "0"}. Query: {query}')
            print(f'Possible profiles: {sum(persons) if persons else "0"}')

            await Saver(
                data=predictions,
                file_name=query
                + "_"
                + datetime.now().strftime("%d_%m_%Y_%H_%M_%S")
                + ".txt",
            ).save_username()


if __name__ == "__main__":
    asyncio.run(main())
