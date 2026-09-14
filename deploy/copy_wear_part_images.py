# -*- coding: utf-8 -*-
"""Copy selected catalogue photos into public/images/products/{slug}/ as WebP."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "deploy" / "out" / "piston-seals" / "photos"
DEST_ROOT = ROOT / "public" / "images" / "products"
MAX_WIDTH = 1200
QUALITY = 82

# Family slug -> [(source filename start, dest name)]
MAP = {
    "concrete-pump-split-piston": [
        ("p01-03-1120x694.jpeg", "concrete-pump-split-piston.webp"),
        ("p01-04-1108x686.jpeg", "detail-1.webp"),
        ("p14-01-760x510.jpeg", "detail-2.webp"),
    ],
    "concrete-pump-integral-piston": [
        ("p04-01-1120x694.jpeg", "concrete-pump-integral-piston.webp"),
        ("p04-03-1122x694.jpeg", "detail-1.webp"),
    ],
    "concrete-pump-s-tube-seal": [
        ("p04-06-672x415.jpeg", "concrete-pump-s-tube-seal.webp"),
        ("p04-05-672x415.jpeg", "detail-1.webp"),
    ],
    "concrete-pump-mixing-seal": [
        ("p04-08-747x519.jpeg", "concrete-pump-mixing-seal.webp"),
        ("p04-07-672x415.jpeg", "detail-1.webp"),
    ],
    "concrete-pump-main-cylinder-seal": [
        ("p17-01-760x941.jpeg", "concrete-pump-main-cylinder-seal.webp"),
        ("p05-01-1122x520.jpeg", "detail-1.webp"),
    ],
    "concrete-pump-swing-cylinder-seal": [
        ("p10-05-885x547.jpeg", "concrete-pump-swing-cylinder-seal.webp"),
        ("p10-04-878x590.jpeg", "detail-1.webp"),
    ],
    "concrete-pump-rubber-spring": [
        ("p13-01-626x1034.jpeg", "concrete-pump-rubber-spring.webp"),
        ("p13-02-514x848.jpeg", "detail-1.webp"),
    ],
    "concrete-pump-swing-arm-ball": [
        ("p10-01-560x694.jpeg", "concrete-pump-swing-arm-ball.webp"),
        ("p10-02-560x694.jpeg", "detail-1.webp"),
    ],
}


def to_webp(src: Path, dest: Path) -> None:
    img = Image.open(src).convert("RGB")
    if img.width > MAX_WIDTH:
        ratio = MAX_WIDTH / img.width
        img = img.resize((MAX_WIDTH, int(img.height * ratio)), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "WEBP", quality=QUALITY, method=6)
    print(f"wrote {dest.relative_to(ROOT)} {img.size}")


def main() -> None:
    for slug, files in MAP.items():
        for name, dest_name in files:
            src = SRC / name
            if not src.is_file():
                raise SystemExit(f"missing {src}")
            to_webp(src, DEST_ROOT / slug / dest_name)


if __name__ == "__main__":
    main()
