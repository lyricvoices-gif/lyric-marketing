#!/usr/bin/env python3
"""Install unmodified webfonts for this work from the user's Timeless 1.094 ZIP.

Usage: python3 scripts/install-timeless.py /path/to/Timeless-Type-Family-1.094.zip
Font binaries remain ignored by Git under the supplied license.
"""
import argparse
from pathlib import Path
from zipfile import ZipFile

FILES = {
    "TimelessSans-GroteskRegular.woff2": "Sans-Grotesk/static/woff2/",
    "TimelessSans-GroteskMedium.woff2": "Sans-Grotesk/static/woff2/",
    "TimelessSerif-Regular.woff2": "Serif-Text/static/woff2/",
    "TimelessSerif-RegularItalic.woff2": "Serif-Text/static/woff2/",
    "LICENSE.pdf": "",
    "README.txt": "",
}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("archive", type=Path)
    args = parser.parse_args()
    destination = Path(__file__).resolve().parents[1] / "public/fonts/timeless"
    with ZipFile(args.archive.expanduser()) as archive:
        # Validate the complete input before writing; never extract arbitrary paths.
        contents = {
            filename: archive.read(f"Timeless-Type-Family-1.094/{folder}{filename}")
            for filename, folder in FILES.items()
        }
    destination.mkdir(parents=True, exist_ok=True)
    for filename, data in contents.items():
        (destination / filename).write_bytes(data)
    print(f"Installed four unchanged WOFF2 fonts, README, and license in {destination}")


if __name__ == "__main__":
    main()
