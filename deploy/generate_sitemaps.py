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
    "custom-machinery",
]

# 与 src/data/blog.ts + knowledgeArticles.ts 的 slug 保持一致
BLOG_SLUGS = [
    "how-to-choose-a-concrete-pump",
    "diesel-vs-electric-concrete-pump",
    "mortar-spraying-machine-buying-guide",
    "concrete-pump-conveying-distance-guide",
    "how-we-manufacture-construction-equipment",
    "xingjiawan-concrete-machinery-manufacturing",
    "how-to-choose-a-reliable-concrete-pump-manufacturer-in-china",
    "oem-concrete-machinery-manufacturing-process",
    "why-factory-direct-concrete-equipment-has-faster-customization",
    "how-concrete-pumps-work",
    "concrete-pump-maintenance-guide",
    "trailer-pump-vs-truck-mounted-concrete-pump",
    "shotcrete-machine-application-guide",
    "dry-mix-vs-wet-mix-spraying-machine",
    "tunnel-concrete-spraying-solution",
    "why-choose-a-chinese-concrete-machinery-manufacturer",
    "xingtai-concrete-machinery-factory-inspection-guide",
    "concrete-mixing-and-pumping-for-construction-projects",
]

SOLUTION_SLUGS = [
    "construction",
    "infrastructure",
    "spraying",
    "industrial-projects",
]

LASTMOD = "2026-08-17"
IMAGE_GEO = "Xingtai, Hebei, China"
IMAGE_KEYWORD_CAPTION = (
    "Xingtai concrete machinery manufacturer. "
    "China concrete pump factory. "
    "custom concrete equipment supplier."
)

FACTORY_IMAGES = [
    (
        "pinjin-xingjiawan-concrete-machinery-factory.webp",
        "Hebei Pinjin Machinery factory in Xingjiawan concrete machinery manufacturing area China",
    ),
    (
        "pinjin-production-workshop.webp",
        "Production workshop of Hebei Pinjin Machinery",
    ),
    (
        "pinjin-machinery-workshop-overhead-crane.webp",
        "Production workshop with overhead crane at Hebei Pinjin Machinery",
    ),
    (
        "pinjin-concrete-pump-manufacturing.webp",
        "Concrete pump manufacturing at Hebei Pinjin Machinery",
    ),
    (
        "pinjin-trailer-concrete-pump-assembly.webp",
        "Trailer concrete pump assembly at Hebei Pinjin Machinery",
    ),
    (
        "pinjin-machinery-assembly-area.webp",
        "Equipment assembly workshop of Hebei Pinjin Machinery",
    ),
    (
        "pinjin-equipment-storage.webp",
        "Finished construction machinery at Hebei Pinjin Machinery",
    ),
    (
        "pinjin-construction-machinery-factory-loading.webp",
        "Factory packing and loading at Hebei Pinjin Machinery",
    ),
    (
        "pinjin-diesel-machinery-factory-dispatch.webp",
        "Equipment dispatch from Hebei Pinjin Machinery factory",
    ),
]

APPLICATION_IMAGES = [
    (
        "construction",
        [
            (
                "pinjin-concrete-pump-building-construction.webp",
                "Hebei Pinjin Machinery concrete pump working on a building construction site in China",
            ),
            (
                "pinjin-concrete-pump-construction-site.webp",
                "Hebei Pinjin compact concrete pump on a construction site with operators",
            ),
        ],
    ),
    (
        "infrastructure",
        [
            (
                "pinjin-concrete-equipment-highway-infrastructure.webp",
                "Hebei Pinjin construction equipment working on a highway infrastructure project",
            ),
        ],
    ),
    (
        "spraying",
        [
            (
                "pinjin-mortar-spraying-machine-building-interior.webp",
                "Mortar spraying machine in a building interior finishing job — Hebei Pinjin Machinery",
            ),
            (
                "pinjin-hydraulic-mortar-spraying-machine-site.webp",
                "Hydraulic mortar spraying machine operating on an outdoor construction site — Hebei Pinjin Machinery",
            ),
        ],
    ),
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
    text = (
        "User-agent: Googlebot\n"
        "Allow: /\n"
        "\n"
        "User-agent: Bingbot\n"
        "Allow: /\n"
        "\n"
        "User-agent: *\n"
        "Allow: /\n"
        "Disallow: /admin\n"
        "Disallow: /admin/\n"
        "Disallow: /src/\n"
        "Disallow: /dev\n"
        "Disallow: /dev/\n"
        "\n"
        f"Sitemap: {base}/sitemap.xml\n"
        f"Sitemap: {base}/image-sitemap.xml\n"
    )
    (ROOT / "robots.txt").write_text(text, encoding="utf-8")


def xml_esc(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def image_nodes(loc: str, title: str, alt: str | None = None) -> list[str]:
    caption = alt or title
    if IMAGE_KEYWORD_CAPTION not in caption:
        caption = f"{caption} {IMAGE_KEYWORD_CAPTION}"
    return [
        "    <image:image>",
        f"      <image:loc>{xml_esc(loc)}</image:loc>",
        f"      <image:title>{xml_esc(title)}</image:title>",
        f"      <image:caption>{xml_esc(caption)}</image:caption>",
        f"      <image:geo_location>{IMAGE_GEO}</image:geo_location>",
        "    </image:image>",
    ]


def page_meta(rest: str) -> tuple[str, str]:
    """Return (changefreq, priority) for a language-stripped path."""
    if rest == "/":
        return "weekly", "1.0"
    if rest in {f"/products/{c}" for c in CATS} or rest == "/factory":
        return "weekly", "0.9"
    if rest in ("/products", "/solutions"):
        return "weekly", "0.9"
    if rest.startswith("/solutions/"):
        return "monthly", "0.8"
    if rest.startswith("/products/"):
        return "monthly", "0.85"
    if rest == "/blog":
        return "weekly", "0.8"
    if rest.startswith("/blog/"):
        return "monthly", "0.7"
    if rest in ("/about", "/contact", "/resources"):
        return "monthly", "0.8"
    return "monthly", "0.7"


def main() -> None:
    base = resolve_base()
    page_paths = [
        "/",
        "/products",
        "/product-selection-guide",
        "/about",
        "/factory",
        "/solutions",
        "/resources",
        "/faq",
        "/contact",
        "/blog",
    ]
    page_paths += [f"/products/{c}" for c in CATS]
    page_paths += [f"/products/{s}" for s in SLUGS]
    page_paths += [f"/solutions/{s}" for s in SOLUTION_SLUGS]
    page_paths += [f"/blog/{s}" for s in BLOG_SLUGS]

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
            freq, pri = page_meta("/")
        else:
            freq, pri = page_meta(rest)
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
            f"    <lastmod>{LASTMOD}</lastmod>",
            f"    <changefreq>{freq}</changefreq>",
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
    factory_exterior_alt = (
        "Concrete machinery manufacturing factory in Xingtai Hebei China"
    )
    for lang in LANGS:
        img_lines += [
            "  <url>",
            f"    <loc>{base}/{lang}</loc>",
            f"    <lastmod>{LASTMOD}</lastmod>",
        ]
        img_lines += image_nodes(
            f"{base}/images/factory/pinjin-xingjiawan-concrete-machinery-factory.webp",
            "Hebei Pinjin Machinery Manufacturing Co., Ltd. factory exterior",
            factory_exterior_alt,
        )
        for fname, title in FACTORY_IMAGES:
            img_lines += image_nodes(
                f"{base}/images/factory/{fname}",
                title,
                title,
            )
        for _slug, images in APPLICATION_IMAGES:
            for fname, title in images:
                img_lines += image_nodes(
                    f"{base}/images/applications/{fname}",
                    title,
                    title,
                )
        img_lines.append("  </url>")
        img_lines += [
            "  <url>",
            f"    <loc>{base}/{lang}/about</loc>",
            f"    <lastmod>{LASTMOD}</lastmod>",
        ]
        for fname, title in FACTORY_IMAGES:
            img_lines += image_nodes(
                f"{base}/images/factory/{fname}",
                title,
                title,
            )
        img_lines.append("  </url>")
        img_lines += [
            "  <url>",
            f"    <loc>{base}/{lang}/factory</loc>",
            f"    <lastmod>{LASTMOD}</lastmod>",
        ]
        for fname, title in FACTORY_IMAGES:
            img_lines += image_nodes(
                f"{base}/images/factory/{fname}",
                title,
                title,
            )
        img_lines.append("  </url>")
        img_lines += [
            "  <url>",
            f"    <loc>{base}/{lang}/products/custom-machinery</loc>",
            f"    <lastmod>{LASTMOD}</lastmod>",
        ]
        for fname, title in FACTORY_IMAGES[:4]:
            img_lines += image_nodes(
                f"{base}/images/factory/{fname}",
                title,
                title,
            )
        img_lines.append("  </url>")
        for slug, images in APPLICATION_IMAGES:
            img_lines += [
                "  <url>",
                f"    <loc>{base}/{lang}/solutions/{slug}</loc>",
                f"    <lastmod>{LASTMOD}</lastmod>",
            ]
            for fname, title in images:
                img_lines += image_nodes(
                    f"{base}/images/applications/{fname}",
                    title,
                    title,
                )
            img_lines.append("  </url>")
        for s in SLUGS:
            main_img = ROOT / "images" / "products" / s / "main.webp"
            if not main_img.exists():
                continue
            n = NAMES[s]
            alt = f"{n} manufactured by Hebei Pinjin Machinery in Xingtai Hebei China"
            img_lines += [
                "  <url>",
                f"    <loc>{base}/{lang}/products/{s}</loc>",
                f"    <lastmod>{LASTMOD}</lastmod>",
            ]
            img_lines += image_nodes(
                f"{base}/images/products/{s}/main.webp",
                f"{n} manufactured by Hebei Pinjin Machinery",
                alt,
            )
            extras = [
                ("working.webp", f"{n} working on a construction site — Hebei Pinjin Machinery"),
                ("working-2.webp", f"{n} construction site application — Hebei Pinjin Machinery"),
                ("detail-1.webp", f"{n} product detail — Hebei Pinjin Machinery"),
            ]
            folder = ROOT / "images" / "products" / s
            for fname, title in extras:
                if not (folder / fname).exists():
                    continue
                img_lines += image_nodes(
                    f"{base}/images/products/{s}/{fname}",
                    title,
                    title,
                )
            img_lines.append("  </url>")
    img_lines.append("</urlset>")
    (ROOT / "image-sitemap.xml").write_text(
        "\n".join(img_lines) + "\n", encoding="utf-8"
    )
    write_robots(base)
    print(f"base={base} langs={LANGS} sitemap urls={len(urls)}")


if __name__ == "__main__":
    main()
