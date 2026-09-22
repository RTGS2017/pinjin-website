"""Delist catalogue sheets from public/, ingest 1/2/3 new machines, punch white studio backgrounds."""
from __future__ import annotations

import shutil
import sys
from pathlib import Path

_DEPLOY = Path(__file__).resolve().parent
if str(_DEPLOY) not in sys.path:
    sys.path.insert(0, str(_DEPLOY))

from PIL import Image

from remove_white_background import remove_white_background, save_transparent_webp

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_PRODUCTS = ROOT / "public" / "images" / "products"
SHEETS = ROOT / "content" / "catalog-sheets"

NEW_PRODUCTS = [
    (
        "1",
        "double-cylinder-plunger-mortar-spraying-machine",
    ),
    (
        "2",
        "type-311-mortar-spraying-machine",
    ),
    (
        "3",
        "type-511-mortar-spraying-machine",
    ),
]


def is_catalog_name(name: str, slug: str) -> bool:
    lower = name.lower()
    return lower == "catalog.webp" or lower.endswith("-catalogue.webp")


def delist_catalog_webps() -> list[str]:
    moved: list[str] = []
    if not PUBLIC_PRODUCTS.is_dir():
        return moved
    for folder in sorted(PUBLIC_PRODUCTS.iterdir()):
        if not folder.is_dir():
            continue
        for path in list(folder.iterdir()):
            if not path.is_file():
                continue
            if not is_catalog_name(path.name, folder.name):
                continue
            dest_dir = SHEETS / folder.name
            dest_dir.mkdir(parents=True, exist_ok=True)
            dest = dest_dir / path.name
            if dest.exists():
                dest.unlink()
            shutil.move(str(path), str(dest))
            moved.append(f"{folder.name}/{path.name}")
            print(f"DELIST {folder.name}/{path.name} -> content/catalog-sheets/", flush=True)
    return moved


def ingest_new() -> None:
    for stem, slug in NEW_PRODUCTS:
        folder = PUBLIC_PRODUCTS / slug
        folder.mkdir(parents=True, exist_ok=True)
        photo = None
        for ext in (".png", ".jpg", ".jpeg", ".webp"):
            candidate = PUBLIC_PRODUCTS / f"{stem}{ext}"
            if candidate.exists() and candidate.suffix.lower() == ".png":
                photo = candidate
                break
        if photo is None:
            for ext in (".png", ".webp"):
                candidate = PUBLIC_PRODUCTS / f"{stem}{ext}"
                if candidate.exists():
                    photo = candidate
                    break
        catalog = None
        for ext in (".jpg", ".jpeg", ".png"):
            candidate = PUBLIC_PRODUCTS / f"{stem}{ext}"
            if candidate.exists() and candidate != photo:
                catalog = candidate
                break

        if photo and photo.exists():
            source_photo = folder / f"source-photo{photo.suffix.lower()}"
            if not source_photo.exists() or photo.stat().st_mtime > source_photo.stat().st_mtime:
                shutil.copy2(photo, source_photo)
            dest_webp = folder / f"{slug}.webp"
            save_transparent_webp(source_photo, dest_webp)
            if photo.parent == PUBLIC_PRODUCTS:
                photo.unlink()
                print(f"REMOVED public root {photo.name}")

        if catalog and catalog.exists():
            source_catalog = folder / f"source-catalog{catalog.suffix.lower()}"
            shutil.copy2(catalog, source_catalog)
            if catalog.parent == PUBLIC_PRODUCTS:
                catalog.unlink()
                print(f"REMOVED public root catalog {catalog.name}")


def punch_existing_studio() -> list[str]:
    done: list[str] = []
    skip_names = {"working.webp", "working-2.webp"}
    for folder in sorted(PUBLIC_PRODUCTS.iterdir()):
        if not folder.is_dir():
            continue
        slug = folder.name
        if slug.startswith("concrete-pump-") and slug not in {
            # keep pipeline/wear parts as-is; white rubber would get eaten
        }:
            pass
        sources: list[Path] = []
        for name in (
            "source-photo.png",
            "source-photo.jpg",
            "source-photo.jpeg",
            "source-photo.webp",
            "source.png",
        ):
            path = folder / name
            if path.exists():
                sources.append(path)
                break
        dest = folder / f"{slug}.webp"
        if not dest.exists():
            dest = folder / "main.webp"
        if slug.startswith("concrete-pump-"):
            continue
        if not dest.exists() and not sources:
            continue
        src = sources[0] if sources else dest
        if src.name in skip_names:
            continue
        img = Image.open(src)
        arr_mode = img.convert("RGBA")
        extrema = arr_mode.getextrema()
        has_alpha = extrema[3][0] < 250 if len(extrema) == 4 else False
        # If published webp already has real alpha and we are reusing it as source, skip.
        if src == dest and has_alpha:
            continue
        backup = folder / "source-photo.png"
        if src == dest and not backup.exists():
            img.convert("RGBA").save(backup, "PNG")
            src = backup
            print(f"BACKUP {slug} -> source-photo.png")
        out = remove_white_background(Image.open(src))
        # skip write if corners were not white (function returns original-ish opaque)
        alpha = out.split()[-1]
        a_min, a_max = alpha.getextrema()
        if a_min >= 250:
            print(f"SKIP not-white {slug}")
            continue
        dest = folder / f"{slug}.webp"
        w, h = out.size
        scale = min(1.0, 1600 / max(w, h))
        if scale < 1.0:
            out = out.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
        out.save(dest, "WEBP", quality=88, method=6)
        done.append(slug)
        print(f"PUNCHED {slug}.webp alpha min={a_min}", flush=True)
    return done


def main() -> None:
    moved = delist_catalog_webps()
    ingest_new()
    punched = punch_existing_studio()
    print(f"DONE delisted={len(moved)} punched={len(punched)}")


if __name__ == "__main__":
    main()
