# -*- coding: utf-8 -*-
"""Map ChatGPT catalogue sheets onto SEO product slugs and write main.webp."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "images" / "products"
MAX_SIDE = 1600
WEBP_QUALITY = 80

# Sorted ChatGPT*.png order → slug (identified from each sheet title)
SLUGS = [
    "electric-20-concrete-pump",
    "electric-30-concrete-pump",
    "electric-low-pressure-40-concrete-pump",
    "electric-40-concrete-pump",
    "electric-80-concrete-pump",
    "diesel-30-concrete-pump",
    "diesel-40-concrete-pump",
    "diesel-50-concrete-pump",
    "diesel-60-concrete-pump",
    "electric-10-series-concrete-pump",
    "integrated-mixer-pump",
    "hbt8018-concrete-pump",
    "hbt80-16-concrete-pump",
    "lz-60-diesel-concrete-pump",
    "lz-80-diesel-concrete-pump",
    "diesel-120-concrete-pump",
    "diesel-mixer-integrated-pump",
    "tractor-4100-concrete-pump",
    "electric-15-concrete-pump",
    "rural-diesel-concrete-pump",
    "electric-50-concrete-pump",
    "electric-low-pressure-60-concrete-pump",
    "electric-60-concrete-pump",
]


def convert(src: Path, dest: Path) -> None:
    img = Image.open(src)
    if img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGBA" if "A" in img.getbands() else "RGB")
    if img.mode == "P":
        img = img.convert("RGBA")
    w, h = img.size
    scale = min(1.0, MAX_SIDE / max(w, h))
    if scale < 1.0:
        img = img.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    kwargs = {"quality": WEBP_QUALITY, "method": 6}
    if img.mode == "RGBA":
        img.save(dest, "WEBP", **kwargs)
    else:
        if img.mode != "RGB":
            img = img.convert("RGB")
        img.save(dest, "WEBP", **kwargs)
    print(f"OK {src.name} -> {dest.relative_to(ROOT)} | {img.size[0]}x{img.size[1]}")


def main() -> None:
    files = sorted(ROOT.glob("ChatGPT*.png"), key=lambda p: p.name)
    if len(files) != len(SLUGS):
        raise SystemExit(f"expected {len(SLUGS)} ChatGPT sheets, found {len(files)}")
    for src, slug in zip(files, SLUGS):
        folder = ROOT / slug
        folder.mkdir(parents=True, exist_ok=True)
        source = folder / "source.png"
        if not source.exists():
            source.write_bytes(src.read_bytes())
        convert(src, folder / "main.webp")
    print(f"converted {len(files)} catalogue sheets")


if __name__ == "__main__":
    main()
