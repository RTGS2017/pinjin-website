"""Convert uploaded product images into per-slug WebP paths used by the site.

支持放图方式：
1. public/images/products/{slug}/source-photo.png|source.png → {slug}.webp
2. public/images/products/{slug}/source-catalog.png → {slug}-catalogue.webp
3. public/images/products/{可读英文文件名}.png（ROOT_FILE_MAP）→ 对应 slug/{slug}.webp
4. public/images/products/{中文产品名}.jpg（WORKING_ROOT_MAP）→ 对应 slug/working.webp
   若文件名带「2」则为 working-2.webp（第 3 张施工现场图）

Published filenames keep the product keywords. Generic main.webp / catalog.webp
are removed after a successful SEO convert so crawlers do not keep two URLs.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "images" / "products"

SLUGS = [
    "b500s-83d-two-stage-pump",
    "electric-10-series-concrete-pump",
    "electric-15-concrete-pump",
    "electric-20-concrete-pump",
    "electric-30-concrete-pump",
    "electric-low-pressure-40-concrete-pump",
    "electric-40-concrete-pump",
    "electric-50-concrete-pump",
    "electric-low-pressure-60-concrete-pump",
    "electric-60-concrete-pump",
    "electric-80-concrete-pump",
    "hbt80-16-concrete-pump",
    "hbt8018-concrete-pump",
    "tractor-4100-concrete-pump",
    "rural-diesel-concrete-pump",
    "diesel-30-concrete-pump",
    "diesel-40-concrete-pump",
    "diesel-50-concrete-pump",
    "diesel-60-concrete-pump",
    "lz-60-diesel-concrete-pump",
    "lz-80-diesel-concrete-pump",
    "diesel-120-concrete-pump",
    "integrated-mixer-pump",
    "diesel-mixer-integrated-pump",
    "concrete-pump-delivery-pipe",
    "concrete-pump-elbow-dn200-90",
    "concrete-pump-pipe-clamp-dn80",
    "concrete-pump-delivery-hose",
    "hydraulic-concrete-spraying-machine",
    "high-flow-hydraulic-concrete-spraying-machine",
    "m9-automatic-plaster-spraying-machine",
    "diesel-concrete-spraying-machine",
]

# 产品图根目录可读文件名 → slug（实拍入库见 ingest_real_product_photos.py）
ROOT_FILE_MAP: dict[str, str] = {
    "creative-custom-1788684604652-1.png": "concrete-pump-delivery-pipe",
    "creative-custom-1788684612345-1.png": "concrete-pump-elbow-dn200-90",
    "creative-custom-1788684623123-1.png": "concrete-pump-pipe-clamp-dn80",
    "creative-custom-1788684625763-1.png": "concrete-pump-delivery-hose",
}

MAX_SIDE = 1600
WORKING_MAX_WIDTH = 1600
WORKING_ASPECT = (4, 3)
STUDIO_SOURCE_NAMES = (
    "source-photo.png",
    "source-photo.jpg",
    "source-photo.jpeg",
    "source-photo.webp",
)
FALLBACK_SOURCE_NAMES = ("source.png", "source.jpg", "source.jpeg", "source.webp")
CATALOG_SOURCE_NAMES = (
    "source-catalog.png",
    "source-catalog.jpg",
    "source-catalog.jpeg",
    "source-catalog.webp",
)

# 根目录施工现场图 → (slug, 输出文件名)。working = 第 2 张，working-2 = 第 3 张
WORKING_ROOT_MAP: tuple[tuple[str, str, str], ...] = ()


def studio_dest(folder: Path, slug: str) -> Path:
    return folder / f"{slug}.webp"


def catalog_dest(folder: Path, slug: str) -> Path:
    return folder / f"{slug}-catalogue.webp"


def first_existing(folder: Path, names: tuple[str, ...]) -> Path | None:
    return next((folder / name for name in names if (folder / name).exists()), None)


def convert_if_newer(src: Path, dest: Path) -> bool:
    if dest.exists() and src.stat().st_mtime <= dest.stat().st_mtime:
        return False
    convert(src, dest)
    return True


def convert(src: Path, dest: Path) -> None:
    img = Image.open(src)
    if img.mode == "P":
        img = img.convert("RGBA")
    elif img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGBA" if "A" in img.getbands() else "RGB")

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
        convert(dest_source, studio_dest(folder, slug))
        stale = folder / "main.webp"
        if stale.exists():
            stale.unlink()
        src.unlink()
        count += 1
        print(f"INGESTED root:{filename} -> {slug}/")
    return count


def main() -> None:
    ingested = ingest_root_files()
    ingested_working = ingest_working_root_files()
    converted = 0
    catalogs = 0
    for slug in SLUGS:
        folder = ROOT / slug
        folder.mkdir(parents=True, exist_ok=True)
        studio_src = first_existing(folder, STUDIO_SOURCE_NAMES) or first_existing(
            folder, FALLBACK_SOURCE_NAMES
        )
        dest = studio_dest(folder, slug)
        generic_main = folder / "main.webp"
        published = dest if dest.exists() else (generic_main if generic_main.exists() else None)
        if studio_src and (
            published is None or studio_src.stat().st_mtime > published.stat().st_mtime
        ):
            convert(studio_src, dest)
            converted += 1
        if dest.exists() and generic_main.exists():
            generic_main.unlink()
            print(f"REMOVED stale {slug}/main.webp")
        catalog_src = first_existing(folder, CATALOG_SOURCE_NAMES)
        cdest = catalog_dest(folder, slug)
        generic_catalog = folder / "catalog.webp"
        if catalog_src and (
            not cdest.exists() or catalog_src.stat().st_mtime > cdest.stat().st_mtime
        ):
            if (
                generic_catalog.exists()
                and not cdest.exists()
                and catalog_src.stat().st_mtime <= generic_catalog.stat().st_mtime
            ):
                generic_catalog.replace(cdest)
                catalogs += 1
                print(f"RENAMED {slug}/catalog.webp -> {cdest.name}")
            else:
                convert(catalog_src, cdest)
                catalogs += 1
        elif dest.exists() and generic_catalog.exists() and not cdest.exists():
            generic_catalog.replace(cdest)
            catalogs += 1
            print(f"RENAMED {slug}/catalog.webp -> {cdest.name}")
        if cdest.exists() and generic_catalog.exists():
            generic_catalog.unlink()
            print(f"REMOVED stale {slug}/catalog.webp")
    print(
        f"DONE ingested_root={ingested} ingested_working={ingested_working} "
        f"converted_studio={converted} catalogs={catalogs} / folders={len(SLUGS)}"
    )


if __name__ == "__main__":
    main()
