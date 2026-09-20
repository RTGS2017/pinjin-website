# -*- coding: utf-8 -*-
"""Generate a single page sitemap and robots.txt.

Layout:
  sitemap.xml   canonical en/zh pages (urlset + hreflang)
  robots.txt    points only at sitemap.xml

Do not emit sitemap-pages.xml, image-sitemap.xml, or a sitemap index.
Images are discovered from page HTML.

Site origin is read once from (in order):
  1. PINJIN_SITE_URL env
  2. VITE_SITE_URL in pinjin-website/.env
  3. https://pinjinpump.com
"""
from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "public"
ENV_FILE = Path(__file__).resolve().parents[1] / ".env"
DEFAULT_BASE = "https://pinjinpump.com"

# 仅 en + zh 进入 sitemap / hreflang。pt/ar/ru 界面仍可打开，暂不作为独立索引语言。
LANGS = ["en", "zh"]
HREFLANG = {
    "en": "en",
    "zh": "zh-CN",
    "pt": "pt",
    "ar": "ar",
    "ru": "ru",
}

FEATURED = [
    "electric-40-concrete-pump",
    "diesel-50-concrete-pump",
    "electric-80-concrete-pump",
    "integrated-mixer-pump",
    "electric-15-concrete-pump",
]

ELECTRIC = [
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

SPARE = [
    "concrete-pump-delivery-pipe",
    "concrete-pump-elbow-dn200-90",
    "concrete-pump-pipe-clamp-dn80",
    "concrete-pump-delivery-hose",
    "concrete-pump-split-piston",
    "concrete-pump-integral-piston",
    "concrete-pump-s-tube-seal",
    "concrete-pump-mixing-seal",
    "concrete-pump-main-cylinder-seal",
    "concrete-pump-swing-cylinder-seal",
    "concrete-pump-rubber-spring",
    "concrete-pump-swing-arm-ball",
]

SPRAYING = [
    "hydraulic-concrete-spraying-machine",
    "high-flow-hydraulic-concrete-spraying-machine",
    "m9-automatic-plaster-spraying-machine",
    "diesel-concrete-spraying-machine",
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
    "b500s-83d-two-stage-pump": "B500S-83D Two-Stage Structure Pump",
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
    "concrete-pump-delivery-pipe": "Concrete Pump Delivery Pipe",
    "concrete-pump-elbow-dn200-90": "DN200 90 Degree Concrete Pump Elbow",
    "concrete-pump-pipe-clamp-dn80": "DN80 Concrete Pump Pipe Clamp",
    "concrete-pump-delivery-hose": "Concrete Pump Delivery Hose",
    "concrete-pump-split-piston": "Concrete Pump Split Piston",
    "concrete-pump-integral-piston": "Concrete Pump Integral Piston",
    "concrete-pump-s-tube-seal": "Concrete Pump S-Tube Seal",
    "concrete-pump-mixing-seal": "Concrete Pump Mixing Seal",
    "concrete-pump-main-cylinder-seal": "Concrete Pump Main Cylinder Seal",
    "concrete-pump-swing-cylinder-seal": "Concrete Pump Swing Cylinder Seal",
    "concrete-pump-rubber-spring": "Concrete Pump Rubber Spring",
    "concrete-pump-swing-arm-ball": "Concrete Pump Swing-Arm Ball",
    "hydraulic-concrete-spraying-machine": "Hydraulic Concrete Spraying Machine",
    "high-flow-hydraulic-concrete-spraying-machine": "High-Flow Hydraulic Concrete Spraying Machine",
    "m9-automatic-plaster-spraying-machine": "M9 Automatic Plaster Spraying Machine",
    "diesel-concrete-spraying-machine": "Diesel Concrete Spraying Machine",
}

CATEGORY_HUBS = [
    "electric-concrete-pumps",
    "diesel-concrete-pumps",
    "mixer-pumps",
    "spraying-machines",
    "concrete-pump-parts",
]

HUB_PRODUCTS = {
    "electric-concrete-pumps": ELECTRIC,
    "diesel-concrete-pumps": DIESEL,
    "mixer-pumps": MIXER,
    "spraying-machines": SPRAYING,
    "concrete-pump-parts": SPARE,
}

BLOG_SLUGS = [
    "electric-15-concrete-pump-applications",
    "diesel-concrete-pump-no-electricity",
    "high-rise-building-concrete-pump-selection",
    "electric-20-vs-30-concrete-pump",
    "concrete-pump-pipe-dn-selection",
    "mixer-pump-vs-concrete-mixing-plant",
    "tractor-4100-concrete-pump-rural",
    "bridge-construction-concrete-pump-requirements",
    "low-pressure-40-concrete-pump-guide",
    "concrete-pump-daily-maintenance-checklist",
]

SOLUTION_SLUGS = [
    "construction",
    "infrastructure",
    "industrial-projects",
    "spraying",
]

LASTMOD = "2026-09-20"
META_FILE = Path(__file__).resolve().parents[1] / "deploy" / "prerender-meta.json"
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

FACTORY_IMAGES = [
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
        "pinjin-construction-machinery-factory-loading.webp",
        "Factory packing and loading at Hebei Pinjin Machinery",
    ),
    (
        "pinjin-diesel-machinery-factory-dispatch.webp",
        "Equipment dispatch from Hebei Pinjin Machinery factory",
    ),
    (
        "pinjin-hydraulic-mortar-spraying-machine-interior.webp",
        "Hydraulic mortar spraying machine at a construction interior photographed by Hebei Pinjin Machinery",
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


def existing_images(folder: str, items: list[tuple[str, str]]) -> list[tuple[str, str]]:
    root = ROOT / "images" / folder
    found = [(name, title) for name, title in items if (root / name).is_file()]
    listed = {name for name, _ in items}
    extras: list[tuple[str, str]] = []
    if root.is_dir():
        for path in sorted(root.glob("*.webp")):
            if path.name not in listed:
                extras.append((path.name, path.stem.replace("-", " ")))
    return found + extras


def ordered_product_slugs() -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    for slug in FEATURED + ELECTRIC + DIESEL + MIXER + SPRAYING + SPARE:
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
            "/markets",
            "/faq",
            "/contact",
            "/copyright",
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
        "User-agent: OAI-SearchBot\n"
        "Allow: /\n"
        "\n"
        "User-agent: GPTBot\n"
        "Allow: /\n"
        "\n"
        "User-agent: ChatGPT-User\n"
        "Allow: /\n"
        "\n"
        "User-agent: PerplexityBot\n"
        "Allow: /\n"
        "\n"
        "User-agent: ClaudeBot\n"
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
        "/copyright",
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
    if rest in ("/about", "/markets", "/resources", "/faq"):
        return "monthly", "0.75"
    return "monthly", "0.7"


def loc_for(lang: str, rest: str) -> str:
    if rest == "/":
        return f"/{lang}/"
    return f"/{lang}{rest}/"


def load_lastmods() -> dict[str, str]:
    if not META_FILE.exists():
        return {}
    try:
        data = json.loads(META_FILE.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}
    out: dict[str, str] = {}
    for page in data.get("pages", []):
        url = page.get("url")
        lastmod = page.get("lastmod")
        if url and lastmod:
            out[url] = lastmod
    return out


def write_pages_sitemap(
    base: str, paths: list[str], lastmods: dict[str, str]
) -> int:
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ]
    count = 0
    for rest in paths:
        for lang in LANGS:
            loc = loc_for(lang, rest)
            lastmod = lastmods.get(f"{base}{loc}", LASTMOD)
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
                f"    <lastmod>{lastmod}</lastmod>",
                "  </url>",
            ]
            count += 1
    lines.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8")
    return count


def product_studio_name(slug: str) -> str | None:
    folder = ROOT / "images" / "products" / slug
    for name in (f"{slug}.webp", "main.webp"):
        if (folder / name).is_file():
            return name
    return None


def product_catalog_name(slug: str) -> str | None:
    folder = ROOT / "images" / "products" / slug
    for name in (f"{slug}-catalogue.webp", "catalog.webp"):
        if (folder / name).is_file():
            return name
    return None


def product_image_block(base: str, lang: str, slug: str) -> list[str]:
    n = NAMES[slug]
    images: list[tuple[str, str]] = []
    studio = product_studio_name(slug)
    catalog = product_catalog_name(slug)
    if studio:
        images.append(
            (
                studio,
                f"{n} factory product photo manufactured by Hebei Pinjin Machinery in Xingtai Hebei China",
            )
        )
    if catalog:
        images.append(
            (
                catalog,
                f"{n} catalogue specification sheet manufactured by Hebei Pinjin Machinery in Xingtai Hebei China",
            )
        )
    if not images:
        return []
    lines = [
        "  <url>",
        f"    <loc>{base}/{lang}/products/{slug}/</loc>",
        f"    <lastmod>{LASTMOD}</lastmod>",
    ]
    for filename, title in images:
        lines += image_nodes(
            f"{base}/images/products/{slug}/{filename}",
            title,
            title,
        )
    lines.append("  </url>")
    return lines


def write_image_sitemap(base: str, slugs: list[str]) -> int:
    factory_images = existing_images("factory", FACTORY_IMAGES)
    home_factory_images = factory_images
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ]
    url_count = 0
    for lang in LANGS:
        lines += [
            "  <url>",
            f"    <loc>{base}/{lang}/</loc>",
            f"    <lastmod>{LASTMOD}</lastmod>",
        ]
        lines += image_nodes(
            f"{base}/images/{HERO_IMAGE[0]}",
            HERO_IMAGE[1],
            HERO_IMAGE[2],
        )
        for slug in FEATURED:
            n = NAMES[slug]
            studio = product_studio_name(slug)
            if not studio:
                continue
            lines += image_nodes(
                f"{base}/images/products/{slug}/{studio}",
                f"{n} manufactured by Hebei Pinjin Machinery",
                f"{n} manufactured by Hebei Pinjin Machinery in Xingtai Hebei China",
            )
        for fname, title in home_factory_images:
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
            f"    <loc>{base}/{lang}/products/</loc>",
            f"    <lastmod>{LASTMOD}</lastmod>",
        ]
        for slug in slugs:
            studio = product_studio_name(slug)
            if not studio:
                continue
            n = NAMES[slug]
            lines += image_nodes(
                f"{base}/images/products/{slug}/{studio}",
                f"{n} manufactured by Hebei Pinjin Machinery",
                f"{n} factory product photo manufactured by Hebei Pinjin Machinery in Xingtai Hebei China",
            )
        lines.append("  </url>")
        url_count += 1

        for hub, hub_slugs in HUB_PRODUCTS.items():
            lines += [
                "  <url>",
                f"    <loc>{base}/{lang}/products/{hub}/</loc>",
                f"    <lastmod>{LASTMOD}</lastmod>",
            ]
            for slug in hub_slugs:
                studio = product_studio_name(slug)
                if not studio:
                    continue
                n = NAMES[slug]
                lines += image_nodes(
                    f"{base}/images/products/{slug}/{studio}",
                    f"{n} manufactured by Hebei Pinjin Machinery",
                    f"{n} factory product photo manufactured by Hebei Pinjin Machinery in Xingtai Hebei China",
                )
            lines.append("  </url>")
            url_count += 1

        lines += [
            "  <url>",
            f"    <loc>{base}/{lang}/about/</loc>",
            f"    <lastmod>{LASTMOD}</lastmod>",
        ]
        for fname, title in factory_images:
            lines += image_nodes(
                f"{base}/images/factory/{fname}",
                title,
                title,
            )
        lines.append("  </url>")
        url_count += 1

        lines += [
            "  <url>",
            f"    <loc>{base}/{lang}/markets/</loc>",
            f"    <lastmod>{LASTMOD}</lastmod>",
        ]
        for fname, title in factory_images[:2]:
            lines += image_nodes(
                f"{base}/images/factory/{fname}",
                title,
                title,
            )
        lines.append("  </url>")
        url_count += 1

        lines += [
            "  <url>",
            f"    <loc>{base}/{lang}/factory/</loc>",
            f"    <lastmod>{LASTMOD}</lastmod>",
        ]
        for fname, title in factory_images:
            lines += image_nodes(
                f"{base}/images/factory/{fname}",
                title,
                title,
            )
        lines.append("  </url>")
        url_count += 1

        lines += [
            "  <url>",
            f"    <loc>{base}/{lang}/products/custom-machinery/</loc>",
            f"    <lastmod>{LASTMOD}</lastmod>",
        ]
        for fname, title in factory_images[:3]:
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
                f"    <loc>{base}/{lang}/solutions/{slug}/</loc>",
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


def drop_extra_sitemaps() -> None:
    for name in ("sitemap-pages.xml", "image-sitemap.xml"):
        path = ROOT / name
        if path.exists():
            path.unlink()


SRC_DATA = Path(__file__).resolve().parents[1] / "src" / "data"


def write_image_inventory() -> None:
    factory = [
        f"/images/factory/{path.name}"
        for path in sorted((ROOT / "images" / "factory").glob("*.webp"))
    ]
    applications = [
        f"/images/applications/{path.name}"
        for path in sorted((ROOT / "images" / "applications").glob("*.webp"))
    ]
    hero = [
        f"/images/hero/{path.name}"
        for path in sorted((ROOT / "images" / "hero").glob("*.webp"))
    ]
    products: dict[str, list[str]] = {}
    products_root = ROOT / "images" / "products"
    if products_root.is_dir():
        for folder in sorted(products_root.iterdir()):
            if not folder.is_dir():
                continue
            files = [path.name for path in folder.glob("*.webp")]

            def sort_key(name: str, slug: str = folder.name) -> tuple[int, str]:
                if name in {f"{slug}.webp", "main.webp"}:
                    return (0, name)
                if name in {f"{slug}-catalogue.webp", "catalog.webp"}:
                    return (1, name)
                if name == "working.webp":
                    return (2, name)
                if name == "working-2.webp":
                    return (3, name)
                return (9, name)

            files.sort(key=sort_key)
            products[folder.name] = [
                f"/images/products/{folder.name}/{name}" for name in files
            ]

    def ts_list(paths: list[str]) -> str:
        if not paths:
            return "[]"
        inner = ",\n".join(f"  {json.dumps(path)}" for path in paths)
        return "[\n" + inner + ",\n]"

    revs: dict[str, str] = {}
    images_root = ROOT / "images"
    if images_root.is_dir():
        for path in sorted(images_root.rglob("*")):
            if not path.is_file() or path.suffix.lower() not in {".webp", ".svg", ".png"}:
                continue
            rel = "/" + path.relative_to(ROOT).as_posix()
            digest = hashlib.md5(path.read_bytes()).hexdigest()[:10]
            revs[rel] = digest
    rev_entries = [
        f"  {json.dumps(rel)}: {json.dumps(rev)}" for rel, rev in revs.items()
    ]
    rev_block = "{\n" + ",\n".join(rev_entries) + ",\n}" if rev_entries else "{}"

    product_entries = []
    for slug, paths in products.items():
        inner = ",\n".join(f"    {json.dumps(path)}" for path in paths)
        product_entries.append(f"  {json.dumps(slug)}: [\n{inner},\n  ]")
    product_block = "{\n" + ",\n".join(product_entries) + ",\n}" if product_entries else "{}"

    text = (
        "/* Generated by deploy/generate_sitemaps.py — do not edit by hand. */\n"
        "export const factoryPublicImages = "
        + ts_list(factory)
        + " as const;\n\n"
        "export const applicationPublicImages = "
        + ts_list(applications)
        + " as const;\n\n"
        "export const heroPublicImages = "
        + ts_list(hero)
        + " as const;\n\n"
        "export const productPublicImagesBySlug: Record<string, readonly string[]> = "
        + product_block
        + ";\n\n"
        "export const publicImageRev: Record<string, string> = "
        + rev_block
        + ";\n"
    )
    dest = SRC_DATA / "imageInventory.generated.ts"
    dest.write_text(text, encoding="utf-8")
    print(f"wrote {dest.relative_to(SRC_DATA.parent.parent)} factory={len(factory)} products={len(products)}")


def main() -> None:
    base = resolve_base()
    slugs = ordered_product_slugs()
    paths = page_paths()
    page_count = write_pages_sitemap(base, paths, load_lastmods())
    drop_extra_sitemaps()
    write_robots(base)
    write_image_inventory()
    print(f"base={base} langs={LANGS} page urls={page_count} products={len(slugs)}")



if __name__ == "__main__":
    main()
