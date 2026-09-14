# -*- coding: utf-8 -*-
"""Split the piston-seal catalogue PDF into page WebP files (not committed as PDF)."""
from __future__ import annotations

from pathlib import Path

import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS = ROOT / "public" / "images" / "products"
OUT_PAGES = ROOT / "deploy" / "out" / "piston-seals" / "pages"
MAX_WIDTH = 1400
WEBP_QUALITY = 82


def find_pdf() -> Path:
    for path in PRODUCTS.iterdir():
        if path.is_file() and path.suffix.lower() == ".pdf":
            return path
    raise SystemExit("no PDF in public/images/products")


def main() -> None:
    pdf = find_pdf()
    OUT_PAGES.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(pdf)
    print(f"pdf={pdf.name} pages={doc.page_count}")
    for i, page in enumerate(doc, 1):
        pix = page.get_pixmap(matrix=fitz.Matrix(1.6, 1.6), alpha=False)
        img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        if img.width > MAX_WIDTH:
            ratio = MAX_WIDTH / img.width
            img = img.resize((MAX_WIDTH, int(img.height * ratio)), Image.Resampling.LANCZOS)
        dest = OUT_PAGES / f"page-{i:02d}.webp"
        img.save(dest, "WEBP", quality=WEBP_QUALITY, method=6)
        print(f"wrote {dest.name} {img.size}")


if __name__ == "__main__":
    main()
