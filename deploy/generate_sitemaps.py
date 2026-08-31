# -*- coding: utf-8 -*-
"""Generate sitemap index + page/image sitemaps.

Layout (information architecture, not GPT file order):
  sitemap.xml            sitemapindex
  sitemap-pages.xml      canonical pages, grouped by hub then featured then category
  image-sitemap.xml      images attached only to pages that actually show them

Site origin is read once from (in order):
  1. PINJIN_SITE_URL env
  2. VITE_SITE_URL in pinjin-website/.env
  3. https://pinjinpump.com

Also rewrites public/robots.txt Sitemap line to the index.
"""
from __future__ import annotations

import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "public"
ENV_FILE = Path(__file__).resolve().parents[1] / ".env"
DEFAULT_BASE = "https://pinjinpump.com"

LANGS = ["en", "zh", "pt", "ar"]
HREFLANG = {
    "en": "en",
    "zh": "zh-CN",
    "pt": "pt-BR",
    "ar": "ar",
}

FEATURED = [
    "electric-40-concrete-pump",
    "diesel-50-concrete-pump",
    "electric-80-concrete-pump",
    "integrated-mixer-pump",
    "electric-15-concrete-pump",
]

ELECTRIC = [
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
]

DIESEL = [
    "tractor-4100-concrete-pump",
    "rural-diesel-concrete-pump",
    "diesel-30-concrete-pump",
    "diesel-40-concrete-pump",
    "diesel-50-concrete-pump",
    "diesel-60-concrete-pump",
    "lz-60-diesel-concrete-pump",
    "lz-80-diesel-concrete-pump",
    "diesel-120-concrete-pump",
]

MIXER = [
    "integrated-mixer-pump",
    "diesel-mixer-integrated-pump",
]

NAMES = {
    "electric-20-concrete-pump": "Electric 20 Concrete Pump",
    "electric-30-concrete-pump": "Electric 30 Concrete Pump",
    "electric-low-pressure-40-concrete-pump": "Electric Low Pressure 40 Concrete Pump",
    "electric-40-concrete-pump": "Electric 40 Concrete Pump",
    "electric-80-concrete-pump": "Electric 80 Concrete Pump",
    "diesel-30-concrete-pump": "Diesel 30 Concrete Pump",
    "diesel-40-concrete-pump": "Diesel 40 Concrete Pump",
    "diesel-50-concrete-pump": "Diesel 50 Concrete Pump",
    "diesel-60-concrete-pump": "Diesel 60 Concrete Pump",
    "electric-10-series-concrete-pump": "Electric 10 Series Concrete Pump",
    "integrated-mixer-pump": "Integrated Mixer Pump",
    "hbt8018-concrete-pump": "HBT8018 Concrete Pump",
    "hbt80-16-concrete-pump": "HBT80-16 Concrete Pump",
    "lz-60-diesel-concrete-pump": "LZ-60 Diesel Concrete Pump",
    "lz-80-diesel-concrete-pump": "LZ-80 Diesel Concrete Pump",
    "diesel-120-concrete-pump": "Diesel 120 Concrete Pump",
    "diesel-mixer-integrated-pump": "Diesel Mixer Integrated Pump",
    "tractor-4100-concrete-pump": "Tractor-Driven 4100 Concrete Pump",
    "electric-15-concrete-pump": "Electric 15 Concrete Pump",
    "rural-diesel-concrete-pump": "Rural Diesel Concrete Pump",
    "electric-50-concrete-pump": "Electric 50 Concrete Pump",
    "electric-low-pressure-60-concrete-pump": "Electric Low Pressure 60 Concrete Pump",
    "electric-60-concrete-pump": "Electric 60 Concrete Pump",
}

CATEGORY_HUBS = [
    "electric-concrete-pumps",
    "diesel-concrete-pumps",
    "mixer-pumps",
]

HUB_IMAGE_SLUG = {
    "electric-concrete-pumps": "electric-40-concrete-pump",
    "diesel-concrete-pumps": "diesel-50-concrete-pump",
    "mixer-pumps": "integrated-mixer-pump",
}

BLOG_SLUGS = [
    "what-is-a-concrete-pump",
    "concrete-pump-types",
    "concrete-pump-maintenance-guide",
    "shotcrete-machine-working-principle",
    "choose-construction-equipment-suppliers-from-china",
]

SOLUTION_SLUGS = [
    "construction",
    "infrastructure",
    "industrial-projects",
    "spraying",
]

LASTMOD = "2026-08-31"
IMAGE_GEO = "Xingtai, Hebei, China"
IMAGE_KEYWORD_CAPTION = (
    "Xingtai concrete machinery manufacturer. "
    "China concrete pump factory. "
    "custom concrete equipment supplier."
)

HERO_IMAGE = (
    "hero/pinjin-machinery-factory-xingtai-china.webp",
    "Hebei Pinjin Machinery factory exterior in Xingtai China",
    "Hebei Pinjin Machinery factory exterior in Xingtai Hebei China — concrete pump manufacturer and construction equipment supplier",
)

# 首页工厂能力画廊 4 张（与 src/data/gallery.ts factoryShowcase 一致）
HOME_FACTORY_IMAGES = [
    (
        "pinjin-production-workshop.webp",
        "Production workshop of Hebei Pinjin Machinery",
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
        "pinjin-xingjiawan-concrete-machinery-factory.webp",
        "Hebei Pinjin Machinery factory in Xingjiawan concrete machinery manufacturing area China",
    ),
]

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
        "industrial-projects",
        [
            (
                "pinjin-concrete-pump-construction-site.webp",
                "Hebei Pinjin compact concrete pump on a construction site with operators",
            ),
        ],
    ),
    (
        "spraying",
        [
            (
                "pinjin-mortar-spraying-machine-building-interior.webp",
                "Construction finishing spraying work — industry application context, Hebei Pinjin Machinery",
            ),
            (
                "pinjin-hydraulic-mortar-spraying-machine-site.webp",
                "Outdoor construction finishing spraying — industry application context, Hebei Pinjin Machinery",
            ),
        ],
    ),
]


def ordered_product_slugs() -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    for slug in FEATURED + ELECTRIC + DIESEL + MIXER:
        if slug in seen:
            continue
        seen.add(slug)
        out.append(slug)
    missing = set(NAMES) - seen
    if missing:
        raise SystemExit(f"sitemap product list missing slugs: {sorted(missing)}")
    extra = seen - set(NAMES)
    if extra:
        raise SystemExit(f"sitemap product list has unknown slugs: {sorted(extra)}")
    return out


def page_paths() -> list[str]:
    slugs = ordered_product_slugs()
    return (
        [
            "/",
            "/products",
            *[f"/products/{hub}" for hub in CATEGORY_HUBS],
            "/products/custom-machinery",
            *[f"/products/{s}" for s in slugs],
            "/product-selection-guide",
            "/solutions",
            *[f"/solutions/{s}" for s in SOLUTION_SLUGS],
            "/blog",
            *[f"/blog/{s}" for s in BLOG_SLUGS],
            "/resources",
            "/factory",
            "/about",
            "/faq",
            "/contact",
        ]
    )


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
    if rest == "/":
        return "weekly", "1.0"
    if rest in ("/products", "/factory"):
        return "weekly", "0.9"
    if rest in {f"/products/{c}" for c in CATEGORY_HUBS}:
        return "weekly", "0.9"
    if rest in {f"/products/{s}" for s in FEATURED}:
        return "weekly", "0.9"
    if rest.startswith("/products/") and rest != "/products/custom-machinery":
        return "weekly", "0.8"
    if rest in (
        "/products/custom-machinery",
        "/product-selection-guide",
        "/contact",
        "/solutions",
    ):
        return "weekly", "0.8"
    if rest in ("/solutions/construction", "/solutions/infrastructure"):
        return "monthly", "0.75"
    if rest == "/solutions/industrial-projects":
        return "monthly", "0.7"
    if rest == "/solutions/spraying":
        return "monthly", "0.55"
    if rest == "/blog":
        return "weekly", "0.8"
    if rest.startswith("/blog/"):
        return "monthly", "0.7"
    if rest in ("/about", "/resources", "/faq"):
        return "monthly", "0.75"
    return "monthly", "0.7"


def loc_for(lang: str, rest: str) -> str:
    return f"/{lang}" if rest == "/" else f"/{lang}{rest}"


def write_pages_sitemap(base: str, paths: list[str]) -> int:
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ]
    count = 0
    for rest in paths:
        freq, pri = page_meta(rest)
        for lang in LANGS:
            loc = loc_for(lang, rest)
            lines += [
                "  <url>",
                f"    <loc>{base}{loc}</loc>",
            ]
            for alt_lang in LANGS:
                alt = loc_for(alt_lang, rest)
                hreflang = HREFLANG.get(alt_lang, alt_lang)
                lines.append(
                    f'    <xhtml:link rel="alternate" hreflang="{hreflang}" href="{base}{alt}" />'
                )
            lines.append(
                f'    <xhtml:link rel="alternate" hreflang="x-default" href="{base}{loc_for("en", rest)}" />'
            )
            lines += [
                f"    <lastmod>{LASTMOD}</lastmod>",
                f"    <changefreq>{freq}</changefreq>",
                f"    <priority>{pri}</priority>",
                "  </url>",
            ]
            count += 1
    lines.append("</urlset>")
    (ROOT / "sitemap-pages.xml").write_text("\n".join(lines) + "\n", encoding="utf-8")
    return count


def product_image_block(base: str, lang: str, slug: str) -> list[str]:
    main_img = ROOT / "images" / "products" / slug / "main.webp"
    if not main_img.exists():
        return []
    n = NAMES[slug]
    alt = f"{n} manufactured by Hebei Pinjin Machinery in Xingtai Hebei China"
    lines = [
        "  <url>",
        f"    <loc>{base}/{lang}/products/{slug}</loc>",
        f"    <lastmod>{LASTMOD}</lastmod>",
    ]
    lines += image_nodes(
        f"{base}/images/products/{slug}/main.webp",
        f"{n} manufactured by Hebei Pinjin Machinery",
        alt,
    )
    folder = ROOT / "images" / "products" / slug
    extras = [
        ("working.webp", f"{n} working on a construction site — Hebei Pinjin Machinery"),
        ("working-2.webp", f"{n} construction site application — Hebei Pinjin Machinery"),
        ("detail-1.webp", f"{n} product detail — Hebei Pinjin Machinery"),
    ]
    for fname, title in extras:
        if not (folder / fname).exists():
            continue
        lines += image_nodes(
            f"{base}/images/products/{slug}/{fname}",
            title,
            title,
        )
    lines.append("  </url>")
    return lines


def write_image_sitemap(base: str, slugs: list[str]) -> int:
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ]
    url_count = 0
    for lang in LANGS:
        lines += [
            "  <url>",
            f"    <loc>{base}/{lang}</loc>",
            f"    <lastmod>{LASTMOD}</lastmod>",
        ]
        lines += image_nodes(
            f"{base}/images/{HERO_IMAGE[0]}",
            HERO_IMAGE[1],
            HERO_IMAGE[2],
        )
        for slug in FEATURED:
            n = NAMES[slug]
            lines += image_nodes(
                f"{base}/images/products/{slug}/main.webp",
                f"{n} manufactured by Hebei Pinjin Machinery",
                f"{n} manufactured by Hebei Pinjin Machinery in Xingtai Hebei China",
            )
        for fname, title in HOME_FACTORY_IMAGES:
            lines += image_nodes(
                f"{base}/images/factory/{fname}",
                title,
                title,
            )
        for _slug, images in APPLICATION_IMAGES:
            hero = images[0]
            lines += image_nodes(
                f"{base}/images/applications/{hero[0]}",
                hero[1],
                hero[1],
            )
        lines.append("  </url>")
        url_count += 1

        lines += [
            "  <url>",
            f"    <loc>{base}/{lang}/products</loc>",
            f"    <lastmod>{LASTMOD}</lastmod>",
        ]
        for slug in FEATURED:
            n = NAMES[slug]
            lines += image_nodes(
                f"{base}/images/products/{slug}/main.webp",
                f"{n} manufactured by Hebei Pinjin Machinery",
                f"{n} manufactured by Hebei Pinjin Machinery in Xingtai Hebei China",
            )
        lines.append("  </url>")
        url_count += 1

        for hub, slug in HUB_IMAGE_SLUG.items():
            n = NAMES[slug]
            lines += [
                "  <url>",
                f"    <loc>{base}/{lang}/products/{hub}</loc>",
                f"    <lastmod>{LASTMOD}</lastmod>",
            ]
            lines += image_nodes(
                f"{base}/images/products/{slug}/main.webp",
                f"{n} manufactured by Hebei Pinjin Machinery",
                f"{n} manufactured by Hebei Pinjin Machinery in Xingtai Hebei China",
            )
            lines.append("  </url>")
            url_count += 1

        lines += [
            "  <url>",
            f"    <loc>{base}/{lang}/about</loc>",
            f"    <lastmod>{LASTMOD}</lastmod>",
        ]
        for fname, title in FACTORY_IMAGES:
            lines += image_nodes(
                f"{base}/images/factory/{fname}",
                title,
                title,
            )
        lines.append("  </url>")
        url_count += 1

        lines += [
            "  <url>",
            f"    <loc>{base}/{lang}/factory</loc>",
            f"    <lastmod>{LASTMOD}</lastmod>",
        ]
        for fname, title in FACTORY_IMAGES:
            lines += image_nodes(
                f"{base}/images/factory/{fname}",
                title,
                title,
            )
        lines.append("  </url>")
        url_count += 1

        lines += [
            "  <url>",
            f"    <loc>{base}/{lang}/products/custom-machinery</loc>",
            f"    <lastmod>{LASTMOD}</lastmod>",
        ]
        for fname, title in FACTORY_IMAGES[:4]:
            lines += image_nodes(
                f"{base}/images/factory/{fname}",
                title,
                title,
            )
        lines.append("  </url>")
        url_count += 1

        for slug, images in APPLICATION_IMAGES:
            lines += [
                "  <url>",
                f"    <loc>{base}/{lang}/solutions/{slug}</loc>",
                f"    <lastmod>{LASTMOD}</lastmod>",
            ]
            for fname, title in images:
                lines += image_nodes(
                    f"{base}/images/applications/{fname}",
                    title,
                    title,
                )
            lines.append("  </url>")
            url_count += 1

        for slug in slugs:
            block = product_image_block(base, lang, slug)
            if not block:
                continue
            lines += block
            url_count += 1

    lines.append("</urlset>")
    (ROOT / "image-sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8")
    return url_count


def write_index(base: str) -> None:
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        "  <sitemap>",
        f"    <loc>{base}/sitemap-pages.xml</loc>",
        f"    <lastmod>{LASTMOD}</lastmod>",
        "  </sitemap>",
        "  <sitemap>",
        f"    <loc>{base}/image-sitemap.xml</loc>",
        f"    <lastmod>{LASTMOD}</lastmod>",
        "  </sitemap>",
        "</sitemapindex>",
    ]
    (ROOT / "sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    base = resolve_base()
    slugs = ordered_product_slugs()
    paths = page_paths()
    page_count = write_pages_sitemap(base, paths)
    image_url_count = write_image_sitemap(base, slugs)
    write_index(base)
    write_robots(base)
    print(
        f"base={base} langs={LANGS} "
        f"page urls={page_count} image urls={image_url_count} products={len(slugs)}"
    )


if __name__ == "__main__":
    main()
