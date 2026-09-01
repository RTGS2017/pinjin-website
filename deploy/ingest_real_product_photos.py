# -*- coding: utf-8 -*-
"""Dedup repo-root studio photos and write them into the 23 product folders.

Classification is by visible model text on the machine, not the 01–23 filename
prefix. Byte-identical copies (01=17 … 07=23, and 11=16) are ingested once.

Studio shots are resized with object-contain (no 4:3 crop). Existing GPT
catalogue main.webp is kept as catalog.webp so the spec sheet remains in the
gallery.
"""

from __future__ import annotations

import hashlib
from pathlib import Path

from PIL import Image

REPO = Path(__file__).resolve().parents[1]
PRODUCTS_ROOT = REPO / "public" / "images" / "products"
MAX_SIDE = 1600
WEBP_QUALITY = 85

# slug → main studio photo. Extra angles are not published (detail pages use catalog only).
ASSIGNMENTS: dict[str, dict[str, str | tuple[str, ...]]] = {
    "electric-20-concrete-pump": {
        "main": "07-creative-custom-1788172880665.png",
        "extras": (),
    },
    "electric-30-concrete-pump": {
        "main": "06-creative-custom-1788173058346.png",
        "extras": (),
    },
    "electric-40-concrete-pump": {
        "main": "04-creative-custom-1788173213921.png",
        "extras": (),
    },
    "electric-low-pressure-40-concrete-pump": {
        "main": "05-creative-custom-1788173092064.png",
        "extras": (),
    },
    "electric-50-concrete-pump": {
        "main": "03-creative-custom-1788173237838.png",
        "extras": (),
    },
    "electric-60-concrete-pump": {
        "main": "01-creative-custom-1788173312731.png",
        "extras": (),
    },
    "electric-low-pressure-60-concrete-pump": {
        "main": "02-creative-custom-1788173266217.png",
        "extras": (),
    },
    "electric-80-concrete-pump": {
        "main": "11-creative-custom-1788174632886.png",
        "extras": (
            "16-creative-custom-1788173400626.png",
            "03-creative-custom-1788175499381.png",
        ),
    },
    "electric-10-series-concrete-pump": {
        "main": "02-creative-custom-1788174068770.png",
        "extras": ("02-creative-custom-1788175346852.png",),
    },
    "electric-15-concrete-pump": {
        "main": "11-creative-custom-1788173583343.png",
        "extras": (
            "06-creative-custom-1788175066755.png",
            "11-creative-custom-1788174786378.png",
        ),
    },
    "diesel-30-concrete-pump": {
        "main": "10-creative-custom-1788174850014.png",
        "extras": (
            "01-creative-custom-1788175747113.png",
            "15-creative-custom-1788174665544.png",
            "15-creative-custom-1788173431731.png",
            "01-creative-custom-1788175636193.png",
            "01-creative-custom-1788175633764.png",
            "01-creative-custom-1788175647948.png",
            "03-creative-custom-1788174034957.png",
            "03-creative-custom-1788175260640.png",
        ),
    },
    "diesel-40-concrete-pump": {
        "main": "09-creative-custom-1788174880715.png",
        "extras": (
            "14-creative-custom-1788173462043.png",
            "14-creative-custom-1788174691780.png",
        ),
    },
    "diesel-50-concrete-pump": {
        "main": "08-creative-custom-1788174943024.png",
        "extras": (
            "13-creative-custom-1788173517429.png",
            "13-creative-custom-1788174719332.png",
        ),
    },
    "diesel-60-concrete-pump": {
        "main": "02-creative-custom-1788175546821.png",
        "extras": (
            "01-creative-custom-1788175610536.png",
            "07-creative-custom-1788173881194.png",
            "07-creative-custom-1788174982836.png",
            "07-creative-custom-1788175030874.png",
            "12-creative-custom-1788173550139.png",
            "12-creative-custom-1788174752178.png",
        ),
    },
    "diesel-120-concrete-pump": {
        "main": "05-creative-custom-1788175185563.png",
        "extras": (
            "01-creative-custom-1788175663366.png",
            "05-creative-custom-1788173941890.png",
        ),
    },
    "hbt8018-concrete-pump": {
        "main": "09-creative-custom-1788173759305.png",
        "extras": (
            "04-creative-custom-1788175461835.png",
            "09-creative-custom-1788174860862.png",
        ),
    },
    "hbt80-16-concrete-pump": {
        "main": "08-creative-custom-1788173833417.png",
        "extras": (
            "08-creative-custom-1788174885850.png",
            "01-creative-custom-1788175631558.png",
        ),
    },
    "integrated-mixer-pump": {
        "main": "04-creative-custom-1788175232111.png",
        "extras": (
            "05-creative-custom-1788175240447.png",
            "10-creative-custom-1788174830742.png",
            "10-creative-custom-1788173648494.png",
        ),
    },
    "diesel-mixer-integrated-pump": {
        "main": "01-creative-custom-1788175610545.png",
        "extras": (
            "01-creative-custom-1788175648155.png",
            "04-creative-custom-1788173981778.png",
            "01-creative-custom-1788175664707.png",
        ),
    },
    "tractor-4100-concrete-pump": {
        "main": "01-creative-custom-1788174130823.png",
        "extras": (),
    },
    "rural-diesel-concrete-pump": {
        "main": "01-creative-custom-1788175681751.png",
        "extras": (),
    },
    "lz-60-diesel-concrete-pump": {
        "main": "01-creative-custom-1788175584326.png",
        "extras": (
            "01-creative-custom-1788175617814.png",
            "01-creative-custom-1788175649705.png",
            "06-creative-custom-1788173909064.png",
        ),
    },
    "lz-80-diesel-concrete-pump": {
        "main": "06-creative-custom-1788175012578.png",
        "extras": (
            "01-creative-custom-1788175668751.png",
            "01-creative-custom-1788175698849.png",
        ),
    },
}


def md5(path: Path) -> str:
    return hashlib.md5(path.read_bytes()).hexdigest()


def unique_root_photos() -> dict[str, Path]:
    """filename → path for the shortest name of each unique byte hash."""
    by_hash: dict[str, list[Path]] = {}
    for path in sorted(REPO.glob("*-creative-custom-*.png")):
        by_hash.setdefault(md5(path), []).append(path)
    keepers: dict[str, Path] = {}
    for paths in by_hash.values():
        keeper = sorted(paths, key=lambda p: (len(p.name), p.name))[0]
        keepers[keeper.name] = keeper
    return keepers


def trim_studio_white(img: Image.Image, pad_ratio: float = 0.03) -> Image.Image:
    """Crop near-white studio margin and punch remaining white to alpha."""
    from PIL import ImageChops, ImageOps

    rgb = img.convert("RGB")
    white = Image.new("RGB", rgb.size, (255, 255, 255))
    diff = ImageOps.grayscale(ImageChops.difference(rgb, white))
    mask = diff.point(lambda p: 255 if p > 10 else 0)
    box = mask.getbbox()
    if not box:
        return img.convert("RGBA")

    w, h = rgb.size
    pad_x = max(8, int(w * pad_ratio))
    pad_y = max(8, int(h * pad_ratio))
    left, top, right, bottom = box
    crop = (
        max(0, left - pad_x),
        max(0, top - pad_y),
        min(w, right + pad_x),
        min(h, bottom + pad_y),
    )
    rgb = rgb.crop(crop)
    diff = diff.crop(crop)
    alpha = diff.point(lambda p: 0 if p < 12 else 255)
    out = rgb.convert("RGBA")
    out.putalpha(alpha)
    return out


def convert_studio(src: Path, dest: Path) -> None:
    img = Image.open(src)
    if img.mode == "P":
        img = img.convert("RGBA")
    if img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGBA")

    img = trim_studio_white(img)

    w, h = img.size
    scale = min(1.0, MAX_SIDE / max(w, h))
    if scale < 1.0:
        img = img.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)

    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "WEBP", quality=WEBP_QUALITY, method=6)
    print(f"OK {src.name} -> {dest.relative_to(REPO)} | {img.size[0]}x{img.size[1]}")


def preserve_catalog(folder: Path) -> None:
    main = folder / "main.webp"
    catalog = folder / "catalog.webp"
    if main.exists() and not catalog.exists():
        catalog.write_bytes(main.read_bytes())
        print(f"KEEP catalog {folder.name}/catalog.webp")


def main() -> None:
    keepers = unique_root_photos()
    assigned: list[str] = []
    for slug, spec in ASSIGNMENTS.items():
        assigned.append(str(spec["main"]))
        assigned.extend(list(spec["extras"]))

    missing = [name for name in assigned if name not in keepers and not (REPO / name).exists()]
    if missing:
        raise SystemExit(f"Mapped files missing on disk: {missing}")

    unused = sorted(set(keepers) - set(assigned))
    if unused:
        raise SystemExit(f"Unique photos not assigned to a product: {unused}")

    reused = [name for name in assigned if assigned.count(name) > 1]
    if reused:
        raise SystemExit(f"Same photo assigned to more than one product: {sorted(set(reused))}")

    written = 0
    for slug, spec in ASSIGNMENTS.items():
        folder = PRODUCTS_ROOT / slug
        folder.mkdir(parents=True, exist_ok=True)
        preserve_catalog(folder)

        main_name = str(spec["main"])
        main_src = keepers.get(main_name) or (REPO / main_name)
        convert_studio(main_src, folder / "main.webp")
        (folder / "source-photo.png").write_bytes(main_src.read_bytes())
        written += 1

        # extras stay in ASSIGNMENTS for photo accounting; they are not written as detail-N.

    removed = 0
    for path in REPO.glob("*-creative-custom-*.png"):
        path.unlink()
        removed += 1

    print(f"DONE webp={written} products={len(ASSIGNMENTS)} removed_root_pngs={removed}")


if __name__ == "__main__":
    main()
