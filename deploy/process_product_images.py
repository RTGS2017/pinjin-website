"""Convert uploaded product images into per-slug main.webp paths used by the site."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "images" / "products"

# Place source files as: public/images/products/{slug}/source.png (or .jpg)
# Output: public/images/products/{slug}/main.webp
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
    "hbt60-13-146rs-concrete-pump",
]

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

    print(f"OK {src} -> {dest.relative_to(ROOT)} | {img.size[0]}x{img.size[1]}")


def main() -> None:
    converted = 0
    for slug in SLUGS:
        folder = ROOT / slug
        folder.mkdir(parents=True, exist_ok=True)
        src = next((folder / name for name in SOURCE_NAMES if (folder / name).exists()), None)
        if not src:
            continue
        convert(src, folder / "main.webp")
        converted += 1
    print(f"DONE converted={converted} / folders={len(SLUGS)}")


if __name__ == "__main__":
    main()
