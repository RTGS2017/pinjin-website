"""Convert factory source JPGs into 16:9 SEO-named WebP files.

从 factory/、factory/source/ 或 deploy/inbox 读取原图。已有 WebP 且源文件
缺失时跳过。未登记的微信 JPG 会自动转成新的 pinjin-factory-*.webp，不再
因为缺映射而失败。DELETED_OUTPUTS 里的文件名永远不会被重新生成。
"""

from __future__ import annotations

import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "images" / "factory"
SOURCE_DIR = ROOT / "source"
ASPECT_W, ASPECT_H = 16, 9
MAX_WIDTH = 1920
WEBP_QUALITY = 82

# 原文件名 → SEO WebP。已从工厂页拿掉的文件不要再写回这里，否则一跑脚本就会复活。
SOURCE_TO_OUTPUT = {
    "微信图片_2026-08-13_225651_795.jpg": "pinjin-concrete-pump-manufacturing.webp",
    "微信图片_2026-08-13_225936_976.jpg": "pinjin-construction-machinery-factory-loading.webp",
    "微信图片_2026-08-13_230001_380.jpg": "pinjin-diesel-machinery-factory-dispatch.webp",
    "微信图片_2026-08-13_230018_881.jpg": "pinjin-trailer-concrete-pump-assembly.webp",
    "微信图片_20260813225534.jpg": "pinjin-machinery-workshop-overhead-crane.webp",
    # 工地室内：液压砂浆喷涂机作业实拍（非目录喷涂机产品线）
    "微信图片_20260814203308_51318_140.jpeg": "pinjin-hydraulic-mortar-spraying-machine-interior.webp",
}

# 用户明确删除的 SEO 文件名：即使旧微信原图还在，也不要再生成。
DELETED_OUTPUTS = {
    "pinjin-production-workshop.webp",
    "pinjin-xingjiawan-concrete-machinery-factory.webp",
    "pinjin-equipment-storage.webp",
    "pinjin-machinery-assembly-area.webp",
}


def center_crop_16x9(img: Image.Image) -> Image.Image:
    w, h = img.size
    target_ratio = ASPECT_W / ASPECT_H
    current = w / h
    if current > target_ratio:
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        img = img.crop((left, 0, left + new_w, h))
    elif current < target_ratio:
        new_h = int(w / target_ratio)
        top = (h - new_h) // 2
        img = img.crop((0, top, w, top + new_h))
    w, h = img.size
    if w > MAX_WIDTH:
        new_h = int(h * (MAX_WIDTH / w))
        img = img.resize((MAX_WIDTH, new_h), Image.Resampling.LANCZOS)
    return img


def to_rgb(img: Image.Image) -> Image.Image:
    if img.mode in ("RGB",):
        return img
    if img.mode in ("RGBA", "LA", "P"):
        rgba = img.convert("RGBA")
        bg = Image.new("RGB", rgba.size, (37, 42, 49))
        bg.paste(rgba, mask=rgba.split()[-1])
        return bg
    return img.convert("RGB")


def convert(src: Path, dest: Path) -> None:
    img = to_rgb(Image.open(src))
    img = center_crop_16x9(img)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "WEBP", quality=WEBP_QUALITY, method=6)
    print(f"OK {src.name} -> {dest.name} | {img.size[0]}x{img.size[1]}")


def find_source(name: str) -> Path | None:
    inbox = Path(__file__).resolve().parents[1] / "deploy" / "inbox"
    for folder in (ROOT, SOURCE_DIR, inbox):
        path = folder / name
        if path.is_file():
            return path
    return None


def wechat_jpgs() -> list[Path]:
    found: list[Path] = []
    for folder in (ROOT, SOURCE_DIR):
        if not folder.is_dir():
            continue
        found.extend(sorted(folder.glob("微信图片*.jpg")))
        found.extend(sorted(folder.glob("微信图片*.jpeg")))
    return found


def backup_source(src: Path) -> None:
    if src.parent.resolve() == SOURCE_DIR.resolve():
        return
    SOURCE_DIR.mkdir(parents=True, exist_ok=True)
    target = SOURCE_DIR / src.name
    if target.exists():
        src.unlink()
    else:
        src.rename(target)
    print(f"BACKUP {src.name} -> source/")


def auto_dest_name(src_name: str) -> str:
    stem = Path(src_name).stem
    stem = re.sub(r"^微信图片_?", "", stem)
    stem = re.sub(r"[^A-Za-z0-9]+", "-", stem).strip("-").lower() or "photo"
    dest = f"pinjin-factory-{stem}.webp"
    if dest not in DELETED_OUTPUTS and not (ROOT / dest).is_file():
        return dest
    n = 2
    while True:
        candidate = f"pinjin-factory-{stem}-{n}.webp"
        if candidate not in DELETED_OUTPUTS and not (ROOT / candidate).is_file():
            return candidate
        n += 1


def main() -> None:
    ROOT.mkdir(parents=True, exist_ok=True)
    SOURCE_DIR.mkdir(parents=True, exist_ok=True)

    converted = 0
    skipped = 0
    for src_name, dest_name in SOURCE_TO_OUTPUT.items():
        if dest_name in DELETED_OUTPUTS:
            print(f"SKIP deleted output: {dest_name}")
            skipped += 1
            continue
        src = find_source(src_name)
        dest = ROOT / dest_name
        if not src:
            if dest.is_file():
                print(f"SKIP missing source (webp exists): {src_name} -> {dest_name}")
                skipped += 1
                continue
            print(f"SKIP missing source (no webp): {src_name}")
            skipped += 1
            continue
        convert(src, dest)
        converted += 1
        backup_source(src)

    for path in wechat_jpgs():
        if path.name in SOURCE_TO_OUTPUT:
            continue
        dest_name = auto_dest_name(path.name)
        if dest_name in DELETED_OUTPUTS:
            print(f"SKIP deleted output for {path.name}")
            skipped += 1
            continue
        convert(path, ROOT / dest_name)
        converted += 1
        backup_source(path)
        print(f"AUTO {path.name} -> {dest_name}")

    print(f"DONE webp={converted} skipped={skipped}")


if __name__ == "__main__":
    main()
