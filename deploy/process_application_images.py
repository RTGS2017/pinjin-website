"""Convert WeChat application JPGs into 4:3 SEO-named WebP files.

原图放在 public/images/applications/ 或 applications/source/。
已有 WebP 且源文件缺失时跳过。残留的 微信图片_*.jpg 必须映射，否则失败。
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "images" / "applications"
SOURCE_DIR = ROOT / "source"
ASPECT_W, ASPECT_H = 4, 3
MAX_WIDTH = 1600
WEBP_QUALITY = 82

# 原文件名 → SEO WebP
SOURCE_TO_OUTPUT = {
    "微信图片_20260815141958.jpg": "pinjin-concrete-pump-building-construction.webp",
    "微信图片_20260815142006.jpg": "pinjin-concrete-pump-construction-site.webp",
    "微信图片_20260815141938.jpg": "pinjin-concrete-equipment-highway-infrastructure.webp",
    "微信图片_20260815142009.jpg": "pinjin-mortar-spraying-machine-building-interior.webp",
    "微信图片_20260814204458_51325_140.jpg": "pinjin-hydraulic-mortar-spraying-machine-site.webp",
}


def crop_to_aspect(img: Image.Image, bias_y: float = 0.42) -> Image.Image:
    """Portrait sources keep a slightly higher window so the machine stays in frame."""
    w, h = img.size
    target_ratio = ASPECT_W / ASPECT_H
    current = w / h
    if current > target_ratio:
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        img = img.crop((left, 0, left + new_w, h))
    elif current < target_ratio:
        new_h = int(w / target_ratio)
        max_top = h - new_h
        top = int(max_top * bias_y)
        top = max(0, min(top, max_top))
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
    img = crop_to_aspect(img)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "WEBP", quality=WEBP_QUALITY, method=6)
    print(f"OK {src.name} -> {dest.name} | {img.size[0]}x{img.size[1]}")


def find_source(name: str) -> Path | None:
    for folder in (ROOT, SOURCE_DIR):
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
            "Unmapped application JPGs — add them to SOURCE_TO_OUTPUT: "
            + ", ".join(sorted(set(unmapped)))
        )
    if missing:
        raise SystemExit(f"Missing source JPGs (and no webp yet): {', '.join(missing)}")
    print(f"DONE webp={converted} skipped={skipped}")


if __name__ == "__main__":
    main()
