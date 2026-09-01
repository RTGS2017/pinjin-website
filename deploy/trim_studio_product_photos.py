# -*- coding: utf-8 -*-
"""Trim studio white margin on existing product WebPs and punch white to alpha."""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

from ingest_real_product_photos import PRODUCTS_ROOT, WEBP_QUALITY, trim_studio_white

SKIP = {"catalog.webp", "working.webp", "working-2.webp", "source.png", "source-photo.png"}


def main() -> None:
    count = 0
    for path in sorted(PRODUCTS_ROOT.glob("*/*.webp")):
        if path.name in SKIP:
            continue
        img = Image.open(path)
        if img.mode == "RGBA":
            print(f"SKIP already trimmed {path.relative_to(PRODUCTS_ROOT)}")
            continue
        trimmed = trim_studio_white(img)
        trimmed.save(path, "WEBP", quality=WEBP_QUALITY, method=6)
        count += 1
        print(f"TRIM {path.relative_to(PRODUCTS_ROOT)} | {img.size} -> {trimmed.size}")
    print(f"DONE trimmed={count}")


if __name__ == "__main__":
    main()
