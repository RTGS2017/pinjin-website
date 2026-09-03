"""Convert factory source JPGs into 16:9 SEO-named WebP files.

从 factory/ 或 factory/source/ 读取原图。已有 WebP 且源文件缺失时跳过，
避免旧微信图备份后脚本无法重跑。根目录残留的 微信图片_*.jpg 必须写入
SOURCE_TO_OUTPUT，否则构建前会失败，避免新工厂图扫不到。
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "images" / "factory"
SOURCE_DIR = ROOT / "source"
ASPECT_W, ASPECT_H = 16, 9
MAX_WIDTH = 1920
WEBP_QUALITY = 82

# 原文件名 → SEO WebP
SOURCE_TO_OUTPUT = {
    "微信图片_2026-08-13_225635_834.jpg": "pinjin-machinery-assembly-area.webp",
    "微信图片_2026-08-13_225651_795.jpg": "pinjin-concrete-pump-manufacturing.webp",
    "微信图片_2026-08-13_225700_779.jpg": "pinjin-production-workshop.webp",
    "微信图片_2026-08-13_225824_931.jpg": "pinjin-equipment-storage.webp",
    "微信图片_2026-08-13_225846_838.jpg": "pinjin-xingjiawan-concrete-machinery-factory.webp",
    "微信图片_2026-08-13_225936_976.jpg": "pinjin-construction-machinery-factory-loading.webp",
    "微信图片_2026-08-13_230001_380.jpg": "pinjin-diesel-machinery-factory-dispatch.webp",
    "微信图片_2026-08-13_230018_881.jpg": "pinjin-trailer-concrete-pump-assembly.webp",
    "微信图片_20260813225534.jpg": "pinjin-machinery-workshop-overhead-crane.webp",
    # 新车间实拍：打开侧板的柴油拖泵装配现场，覆盖生产车间图
    "微信图片_2026-08-30_150541_565.jpg": "pinjin-production-workshop.webp",
    # 工地室内：液压砂浆喷涂机作业实拍（非目录喷涂机产品线）
    "微信图片_20260814203308_51318_140.jpeg": "pinjin-hydraulic-mortar-spraying-machine-interior.webp",
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


def main() -> None:
    ROOT.mkdir(parents=True, exist_ok=True)
    SOURCE_DIR.mkdir(parents=True, exist_ok=True)

    missing: list[str] = []
    converted = 0
    skipped = 0
    for src_name, dest_name in SOURCE_TO_OUTPUT.items():
        src = find_source(src_name)
        dest = ROOT / dest_name
        if not src:
            if dest.is_file():
                print(f"SKIP missing source (webp exists): {src_name} -> {dest_name}")
                skipped += 1
                continue
            missing.append(src_name)
            continue
        convert(src, dest)
        converted += 1
        backup_source(src)

    unmapped = [
        path.name
        for path in wechat_jpgs()
        if path.name not in SOURCE_TO_OUTPUT
    ]
    if unmapped:
        raise SystemExit(
            "Unmapped factory JPGs — add them to SOURCE_TO_OUTPUT: "
            + ", ".join(sorted(set(unmapped)))
        )
    if missing:
        raise SystemExit(f"Missing source JPGs (and no webp yet): {', '.join(missing)}")
    print(f"DONE webp={converted} skipped={skipped}")


if __name__ == "__main__":
    main()
