"""Convert uploaded product images into per-slug main.webp paths used by the site.

支持两种放图方式：
1. public/images/products/{slug}/source.png|jpg|webp
2. public/images/products/{可读文件名}.png（见 ROOT_FILE_MAP，收录后写入对应 slug 目录）
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "images" / "products"

SLUGS = [
    "diesel-4100-transfer-pump",
    "ll15-diesel-transfer-pump",
    "ll15-electric-transfer-pump",
    "zs22-25-concrete-pump",
    "ll28-32-concrete-pump",
    "diesel-screw-mortar-spraying-machine",
    "hbt30-37-concrete-pump",
    "hbt45-40-concrete-pump",
    "automatic-plaster-spraying-machine",
    "hbtt55-50-concrete-pump",
    "ll60-75-concrete-pump",
    "hbt80-18-140-concrete-pump",
    "hbtb016-110es-spiral-feeder",
    "4102-diesel-four-cylinder-inclined-pump",
    "type-311-spraying-machine",
    "type-511-spraying-machine",
    "double-cylinder-plunger-spraying-machine",
    "concrete-spraying-machine",
    "forklift-loader-clamp-type",
    "forklift-loader-bucket-type",
    "cnc-steel-bar-bending-machine",
    "13-spiral-feeder",
]

# 产品图根目录可读文件名 → slug（大小写敏感匹配文件名）
ROOT_FILE_MAP: dict[str, str] = {
    "4102 Diesel Four-cylinder Inclined Pump.png": "4102-diesel-four-cylinder-inclined-pump",
    "Concrete Spraying Machine.png": "concrete-spraying-machine",
    "Double Cylinder Plunger Type Spraying.png": "double-cylinder-plunger-spraying-machine",
    "Four-wheel Drive Forklift Loader - Bucket Type.png": "forklift-loader-bucket-type",
    "Four-wheel Drive Forklift Loader - Clamp Type.png": "forklift-loader-clamp-type",
    "Fully Automatic CNC Steel Bar Bending Machine.png": "cnc-steel-bar-bending-machine",
    "HBTB016-110ES.png": "hbtb016-110es-spiral-feeder",
    "Spiral feeder.png": "13-spiral-feeder",
    "Type 311.png": "type-311-spraying-machine",
    "Type 511.png": "type-511-spraying-machine",
}

MAX_SIDE = 1200
SOURCE_NAMES = ("source.png", "source.jpg", "source.jpeg", "source.webp")


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
    save_kwargs = {"quality": 85, "method": 6}
    if img.mode == "RGBA":
        img.save(dest, "WEBP", **save_kwargs)
    else:
        if img.mode != "RGB":
            img = img.convert("RGB")
        img.save(dest, "WEBP", **save_kwargs)

    print(f"OK {src.name} -> {dest.relative_to(ROOT)} | {img.size[0]}x{img.size[1]}")


def ingest_root_files() -> int:
    """把根目录映射文件复制为 {slug}/source.png 并转换。成功后删除根目录原文件避免重复入库。"""
    count = 0
    for filename, slug in ROOT_FILE_MAP.items():
        src = ROOT / filename
        if not src.exists():
            continue
        folder = ROOT / slug
        folder.mkdir(parents=True, exist_ok=True)
        dest_source = folder / "source.png"
        dest_source.write_bytes(src.read_bytes())
        convert(dest_source, folder / "main.webp")
        src.unlink()
        count += 1
        print(f"INGESTED root:{filename} -> {slug}/")
    return count


def main() -> None:
    ingested = ingest_root_files()
    converted = 0
    for slug in SLUGS:
        folder = ROOT / slug
        folder.mkdir(parents=True, exist_ok=True)
        src = next((folder / name for name in SOURCE_NAMES if (folder / name).exists()), None)
        if not src:
            continue
        # 根目录刚 ingest 过的已转换，跳过重复；其他 source 仍转换
        main = folder / "main.webp"
        if main.exists() and src.stat().st_mtime <= main.stat().st_mtime:
            continue
        convert(src, main)
        converted += 1
    print(f"DONE ingested_root={ingested} converted_extra={converted} / folders={len(SLUGS)}")


if __name__ == "__main__":
    main()
