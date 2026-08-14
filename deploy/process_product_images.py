"""Convert uploaded product images into per-slug WebP paths used by the site.

支持放图方式：
1. public/images/products/{slug}/source.png|jpg|webp → main.webp
2. public/images/products/{可读英文文件名}.png（ROOT_FILE_MAP）→ 对应 slug/main.webp
3. public/images/products/{中文产品名}.jpg（WORKING_ROOT_MAP）→ 对应 slug/working.webp
   若文件名带「2」则为 working-2.webp（第 3 张施工现场图）
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
WORKING_MAX_WIDTH = 1600
WORKING_ASPECT = (4, 3)
SOURCE_NAMES = ("source.png", "source.jpg", "source.jpeg", "source.webp")

# 根目录施工现场图 → (slug, 输出文件名)。working = 第 2 张，working-2 = 第 3 张
WORKING_ROOT_MAP: tuple[tuple[str, str, str], ...] = (
    ("HBT30-37混凝土泵.jpg", "hbt30-37-concrete-pump", "working.webp"),
    ("HBTT55-50混凝土泵.jpg", "hbtt55-50-concrete-pump", "working.webp"),
    ("HBTT55-50混凝土泵2.jpg", "hbtt55-50-concrete-pump", "working-2.webp"),
    ("全自动石膏喷涂机.jpg", "automatic-plaster-spraying-machine", "working.webp"),
    ("双缸柱塞式喷涂机.jpg", "double-cylinder-plunger-spraying-machine", "working.webp"),
    ("双缸柱塞式喷涂机2.jpg", "double-cylinder-plunger-spraying-machine", "working-2.webp"),
    ("四驱叉车装载机-铲斗式.jpg", "forklift-loader-bucket-type", "working.webp"),
    ("柴油4100输送泵.jpg", "diesel-4100-transfer-pump", "working.webp"),
)


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


def to_rgb(img: Image.Image) -> Image.Image:
    if img.mode in ("RGB",):
        return img
    if img.mode in ("RGBA", "LA", "P"):
        rgba = img.convert("RGBA")
        bg = Image.new("RGB", rgba.size, (245, 246, 247))
        bg.paste(rgba, mask=rgba.split()[-1])
        return bg
    return img.convert("RGB")


def center_crop(img: Image.Image, aspect: tuple[int, int]) -> Image.Image:
    w, h = img.size
    target = aspect[0] / aspect[1]
    current = w / h
    if current > target:
        new_w = int(h * target)
        left = (w - new_w) // 2
        return img.crop((left, 0, left + new_w, h))
    if current < target:
        new_h = int(w / target)
        top = (h - new_h) // 2
        return img.crop((0, top, w, top + new_h))
    return img


def convert_working(src: Path, dest: Path) -> None:
    """施工现场图：4:3 居中裁切，长边上限 1600，WebP。"""
    img = to_rgb(Image.open(src))
    img = center_crop(img, WORKING_ASPECT)
    w, h = img.size
    if w > WORKING_MAX_WIDTH:
        new_h = int(h * (WORKING_MAX_WIDTH / w))
        img = img.resize((WORKING_MAX_WIDTH, new_h), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "WEBP", quality=82, method=6)
    print(f"OK working {src.name} -> {dest.relative_to(ROOT)} | {img.size[0]}x{img.size[1]}")


def ingest_working_root_files() -> int:
    """把根目录施工现场图写入对应 slug 的 working.webp / working-2.webp。"""
    count = 0
    for filename, slug, dest_name in WORKING_ROOT_MAP:
        src = ROOT / filename
        if not src.exists():
            continue
        folder = ROOT / slug
        folder.mkdir(parents=True, exist_ok=True)
        stem = dest_name.replace(".webp", "")
        backup = folder / f"source-{stem}.jpg"
        backup.write_bytes(src.read_bytes())
        convert_working(backup, folder / dest_name)
        src.unlink()
        count += 1
        print(f"INGESTED working:{filename} -> {slug}/{dest_name}")
    return count


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
    ingested_working = ingest_working_root_files()
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
    print(
        f"DONE ingested_root={ingested} ingested_working={ingested_working} "
        f"converted_extra={converted} / folders={len(SLUGS)}"
    )


if __name__ == "__main__":
    main()
