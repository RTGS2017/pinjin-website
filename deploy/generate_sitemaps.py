# -*- coding: utf-8 -*-
"""Generate public/sitemap.xml and public/image-sitemap.xml.

Site origin is read once from (in order):
  1. PINJIN_SITE_URL env
  2. VITE_SITE_URL in pinjin-website/.env
  3. placeholder https://www.example.com

Also rewrites public/robots.txt Sitemap lines to the same origin.
"""
from __future__ import annotations

import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "public"
ENV_FILE = Path(__file__).resolve().parents[1] / ".env"
DEFAULT_BASE = "https://rtgs2017.github.io/pinjin-website"

# 与 src/i18n/config.ts 保持一致；新增语言时同步改这里
LANGS = ["en", "zh"]

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

NAMES = {
    "diesel-4100-transfer-pump": "Diesel 4100 Transfer Pump",
    "ll15-diesel-transfer-pump": "LL15 Diesel Version Transfer Pump",
    "ll15-electric-transfer-pump": "LL15 Motor Version Transfer Pump",
    "zs22-25-concrete-pump": "ZS22-25 Concrete Pump",
    "ll28-32-concrete-pump": "LL28-32 Concrete Pump",
    "diesel-screw-mortar-spraying-machine": "Diesel Screw Mortar Spraying Machine",
    "hbt30-37-concrete-pump": "HBT30-37 Concrete Pump",
    "hbt45-40-concrete-pump": "HBT45-40 Concrete Pump",
    "automatic-plaster-spraying-machine": "Fully Automatic Plaster Spraying Machine",
    "hbtt55-50-concrete-pump": "HBTT55-50 Concrete Pump",
    "ll60-75-concrete-pump": "LL60-75 Concrete Pump",
    "hbt80-18-140-concrete-pump": "HBT80-18-140 Concrete Pump",
    "hbtb016-110es-spiral-feeder": "HBTB016-110ES Spiral Feeder",
    "4102-diesel-four-cylinder-inclined-pump": "4102 Diesel Four-cylinder Inclined Pump",
    "type-311-spraying-machine": "Type 311 Spraying Machine",
    "type-511-spraying-machine": "Type 511 Spraying Machine",
    "double-cylinder-plunger-spraying-machine": "Double Cylinder Plunger Type Spraying Machine",
    "concrete-spraying-machine": "Concrete Spraying Machine",
    "forklift-loader-clamp-type": "Four-wheel Drive Forklift Loader - Clamp Type",
    "forklift-loader-bucket-type": "Four-wheel Drive Forklift Loader - Bucket Type",
    "cnc-steel-bar-bending-machine": "Fully Automatic CNC Steel Bar Bending Machine",
    "13-spiral-feeder": "13 Spiral Feeder",
}

CATS = [
    "concrete-pumps",
    "spraying-machines",
    "material-handling",
    "rebar-equipment",
]


def _read_vite_site_url() -> str | None:
    if not ENV_FILE.exists():
        return None
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        s = line.strip()
        if not s or s.startswith("#") or "=" not in s:
            continue
        key, _, val = s.partition("=")
        if key.strip() == "VITE_SITE_URL":
            return val.strip().strip('"').strip("'")
    return None


def resolve_base() -> str:
    raw = (
        os.environ.get("PINJIN_SITE_URL")
        or os.environ.get("VITE_SITE_URL")
        or _read_vite_site_url()
        or DEFAULT_BASE
    )
    return raw.rstrip("/")


def write_robots(base: str) -> None:
    robots = ROOT / "robots.txt"
    text = robots.read_text(encoding="utf-8") if robots.exists() else ""
    # Drop existing Sitemap lines; append the pair for current base
    body = "\n".join(
        line
        for line in text.splitlines()
        if not re.match(r"(?i)^\s*sitemap\s*:", line)
    ).rstrip()
    if body:
        body += "\n\n"
    body += f"Sitemap: {base}/sitemap.xml\n"
    body += f"Sitemap: {base}/image-sitemap.xml\n"
    robots.write_text(body, encoding="utf-8")


def main() -> None:
    base = resolve_base()
    page_paths = [
        "/",
        "/products",
        "/product-selection-guide",
        "/about",
        "/applications",
        "/faq",
        "/contact",
    ]
    page_paths += [f"/products/category/{c}" for c in CATS]
    page_paths += [f"/products/{s}" for s in SLUGS]

    urls: list[str] = []
    for lang in LANGS:
        for p in page_paths:
            if p == "/":
                urls.append(f"/{lang}")
            else:
                urls.append(f"/{lang}{p}")

    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ]
    for u in urls:
        # priority by page type (strip /{lang})
        parts = u.strip("/").split("/", 1)
        rest = f"/{parts[1]}" if len(parts) > 1 else "/"
        if rest == "/":
            pri = "1.0"
        elif rest in ("/products", "/product-selection-guide"):
            pri = "0.9"
        elif rest.startswith("/products/"):
            pri = "0.85"
        else:
            pri = "0.8"
        lines += [
            "  <url>",
            f"    <loc>{base}{u}</loc>",
        ]
        for lang in LANGS:
            alt = f"/{lang}" if rest == "/" else f"/{lang}{rest}"
            hreflang = "zh-CN" if lang == "zh" else lang
            lines.append(
                f'    <xhtml:link rel="alternate" hreflang="{hreflang}" href="{base}{alt}" />'
            )
        lines.append(
            f'    <xhtml:link rel="alternate" hreflang="x-default" href="{base}/en{"" if rest == "/" else rest}" />'
        )
        lines += [
            "    <changefreq>weekly</changefreq>",
            f"    <priority>{pri}</priority>",
            "  </url>",
        ]
    lines.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8")

    img_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ]
    for lang in LANGS:
        img_lines += [
            "  <url>",
            f"    <loc>{base}/{lang}</loc>",
            "    <image:image>",
            f"      <image:loc>{base}/images/hero/hero-main-hebei-pinjin-machinery-factory.webp</image:loc>",
            "      <image:title>Hebei Pinjin Machinery Manufacturing Co., Ltd. factory exterior</image:title>",
            "    </image:image>",
            "  </url>",
        ]
        for s in SLUGS:
            main_img = ROOT / "images" / "products" / s / "main.webp"
            if not main_img.exists():
                continue
            n = NAMES[s]
            img_lines += [
                "  <url>",
                f"    <loc>{base}/{lang}/products/{s}</loc>",
                "    <image:image>",
                f"      <image:loc>{base}/images/products/{s}/main.webp</image:loc>",
                f"      <image:title>{n} manufactured by Hebei Pinjin Machinery</image:title>",
                "    </image:image>",
                "  </url>",
            ]
    img_lines.append("</urlset>")
    (ROOT / "image-sitemap.xml").write_text(
        "\n".join(img_lines) + "\n", encoding="utf-8"
    )
    write_robots(base)
    print(f"base={base} langs={LANGS} sitemap urls={len(urls)}")


if __name__ == "__main__":
    main()
