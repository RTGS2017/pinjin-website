"""Local or live SEO retest. Usage: python deploy/retest_preview_seo.py [base_url]"""
from __future__ import annotations

import re
import sys
import urllib.error
import urllib.request
from collections import Counter
from pathlib import Path
from urllib.parse import urlparse

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

BASE = sys.argv[1].rstrip("/") if len(sys.argv) > 1 else "http://127.0.0.1:4173"
SITE = "https://pinjinpump.com"
DIST = Path(__file__).resolve().parents[1] / "dist"
LIVE = "pinjinpump.com" in BASE
HOME = "Concrete Pump Manufacturer China | Hebei Pinjin Machinery"
HREFLANG_REQUIRED = ("en", "zh-CN", "x-default")
HREFLANG_FORBIDDEN = ("pt", "ar", "ru", "pt-BR")
INDEXED_LANGS = ("en", "zh")
UI_LANGS = ("en", "zh", "pt", "ar", "ru")
fail: list[tuple[str, str, object]] = []


def get(path: str) -> tuple[int, str]:
    url = path if path.startswith("http") else BASE + path
    req = urllib.request.Request(url, headers={"User-Agent": "PinjinSEOTest/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=20) as response:
            return response.status, response.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as exc:
        return exc.code, exc.read().decode("utf-8", "replace")


def title_of(html: str) -> str:
    match = re.search(r"<title>([^<]*)</title>", html, re.I)
    return match.group(1) if match else ""


def meta(html: str, name: str) -> str:
    match = re.search(
        rf'<meta[^>]*name=["\']{name}["\'][^>]*content=["\']([^"\']*)["\']',
        html,
        re.I,
    )
    return match.group(1) if match else ""


def canon(html: str) -> str:
    match = re.search(
        r'rel=["\']canonical["\'][^>]*href=["\']([^"\']*)["\']',
        html,
        re.I,
    )
    if match:
        return match.group(1)
    match = re.search(
        r'href=["\']([^"\']*)["\'][^>]*rel=["\']canonical["\']',
        html,
        re.I,
    )
    return match.group(1) if match else ""


def hreflangs(html: str) -> set[str]:
    return set(re.findall(r'rel=["\']alternate["\'][^>]*hreflang=["\']([^"\']+)["\']', html, re.I)) | set(
        re.findall(r'hreflang=["\']([^"\']+)["\'][^>]*rel=["\']alternate["\']', html, re.I)
    )


def lang_of(url: str) -> str:
    first = urlparse(url).path.strip("/").split("/", 1)[0]
    return first if first in UI_LANGS else ""


def check(name: str, passed: bool, key: str, value: object) -> None:
    mark = "PASS" if passed else "FAIL"
    print(f"{mark} {name} {key}={value!r}")
    if not passed:
        fail.append((name, key, value))


def dist_shell(url_path: str) -> Path:
    parts = [part for part in url_path.strip("/").split("/") if part]
    return DIST.joinpath(*parts, "index.html")


def is_static_not_found(status: int, html: str) -> bool:
    robots = meta(html, "robots")
    return status == 404 or (
        "noindex" in robots
        and "/assets/" not in html
        and ("Not Found" in html or "This page does not exist" in html)
    )


status, html = get("/")
check("/", status == 200, "status", status)
check("/", meta(html, "robots").startswith("index"), "robots", meta(html, "robots"))
check("/", "noindex" not in meta(html, "robots").lower(), "not-noindex", meta(html, "robots"))
check("/", canon(html) == f"{SITE}/en/", "canonical", canon(html))
check("/", 'http-equiv="refresh"' in html.lower(), "refresh", True)

for lang, expect_title_part in (
    ("en", "Concrete Pump Manufacturer"),
    ("zh", "混凝土泵"),
):
    path = f"/{lang}/"
    status, html = get(path)
    page_title = title_of(html)
    check(path, status == 200, "status", status)
    check(path, meta(html, "robots").startswith("index"), "robots", meta(html, "robots"))
    check(path, canon(html) == f"{SITE}{path}", "canonical", canon(html))
    check(path, expect_title_part.lower() in page_title.lower(), "title-lang", page_title)
    missing = [item for item in HREFLANG_REQUIRED if item not in hreflangs(html)]
    check(path, not missing, "hreflang", missing or "ok")
    extra = [item for item in HREFLANG_FORBIDDEN if item in hreflangs(html)]
    check(path, not extra, "no-thin-locale-hreflang", extra or "ok")

for lang, expect_title_part in (
    ("ar", "مضخات"),
    ("pt", "Bomba de Concreto"),
    ("ru", "бетононасос"),
):
    path = f"/{lang}/"
    status, html = get(path)
    page_title = title_of(html)
    check(path, status == 200, "status", status)
    check(path, "noindex" in meta(html, "robots"), "robots", meta(html, "robots"))
    check(path, canon(html) == f"{SITE}{path}", "canonical", canon(html))
    check(path, expect_title_part.lower() in page_title.lower(), "title-lang", page_title)

status, html = get("/en/")
check("/en/", status == 200, "status", status)
check("/en/", meta(html, "robots").startswith("index"), "robots", meta(html, "robots"))
check("/en/", canon(html) == f"{SITE}/en/", "canonical", canon(html))

status, html = get("/en/products/electric-20-concrete-pump/")
page_title = title_of(html)
check("/en/products/electric-20", status == 200, "status", status)
check(
    "/en/products/electric-20",
    page_title != HOME and "Electric 20" in page_title,
    "title",
    page_title,
)
missing = [item for item in HREFLANG_REQUIRED if item not in hreflangs(html)]
check("/en/products/electric-20", not missing, "hreflang", missing or "ok")
check("/en/products/electric-20", 'hreflang="pt-BR"' not in html, "hreflang-pt", True)
extra = [item for item in HREFLANG_FORBIDDEN if item in hreflangs(html)]
check("/en/products/electric-20", not extra, "no-thin-locale-hreflang", extra or "ok")
check("/en/products/electric-20", "catalogue row" in html.lower() or "目录行" in html, "unique-row", True)

status, html30 = get("/en/products/electric-30-concrete-pump/")
title30 = title_of(html30)
check("/en/products/electric-30", status == 200, "status", status)
check(
    "/en/products/electric-30",
    title30 != page_title and "Electric 30" in title30,
    "title-distinct",
    title30,
)
check("/en/products/electric-30", "catalogue row" in html30.lower(), "unique-row", True)

status, html = get("/ar/products/")
check("/ar/products", status == 200, "status", status)
check("/ar/products", "noindex" in meta(html, "robots"), "robots", meta(html, "robots"))
check("/ar/products", canon(html) == f"{SITE}/ar/products/", "canonical", canon(html))

GONE_PATHS = (
    "/about/",
    "/products/",
    "/applications/",
    "/company/",
    "/en/products/concrete-pumps/",
    "/en/products/zs22-25/",
    "/ar/applications/",
)
for path in GONE_PATHS:
    check(path, not dist_shell(path).exists(), "no-dist-shell", dist_shell(path).exists())
    if LIVE:
        status, html = get(path)
        check(path, is_static_not_found(status, html), "gone", status)

status, html = get("/en/about/")
check("/en/about/", status == 200, "status", status)
check("/en/about/", 'href="/about/"' not in html, "no-unprefixed-link", True)
check("/en/about/", 'href="/en/company/"' not in html, "no-company-alias", True)

status, html = get("/en/products/")
check("/en/products/", status == 200, "status", status)
check("/en/products/", "/en/products/electric-20-concrete-pump/" in html, "graph-electric-20", True)
check("/en/products/", "/en/products/b500s-83d-two-stage-pump/" in html, "graph-b500s", True)

status, html = get("/en/markets/")
check("/en/markets/", status == 200, "status", status)
check("/en/markets/", meta(html, "robots").startswith("index"), "robots", meta(html, "robots"))
check("/en/markets/", "Target Markets" in title_of(html), "title", title_of(html))

status, sitemap_xml = get("/sitemap.xml")
locs = re.findall(r"<loc>([^<]+)</loc>", sitemap_xml)
check("sitemap", status == 200, "status", status)
check("sitemap", "<urlset" in sitemap_xml and "<sitemapindex" not in sitemap_xml, "urlset", True)
check("sitemap", 130 <= len(locs) <= 160, "count", len(locs))
by_lang = Counter(lang_of(url) for url in locs)
for lang in INDEXED_LANGS:
    check("sitemap", by_lang[lang] > 50, f"{lang}-count", by_lang[lang])
for lang in ("pt", "ar", "ru"):
    check("sitemap", by_lang[lang] == 0, f"{lang}-absent", by_lang[lang])
for token in HREFLANG_REQUIRED:
    check("sitemap", f'hreflang="{token}"' in sitemap_xml, f"hreflang-{token}", True)
for token in ("pt", "ar", "ru"):
    check("sitemap", f'hreflang="{token}"' not in sitemap_xml, f"no-hreflang-{token}", True)

check("sitemap-pages.xml", not (DIST / "sitemap-pages.xml").exists(), "removed", True)
check("image-sitemap.xml", not (DIST / "image-sitemap.xml").exists(), "removed", True)
if LIVE:
    for extra in ("/sitemap-pages.xml", "/image-sitemap.xml"):
        extra_status, extra_html = get(extra)
        check(extra, is_static_not_found(extra_status, extra_html), "gone", extra_status)

indexable = 0
noindex_pages = 0
redirect_pages = 0
not_found = 0
canonical_errors = 0
hreflang_errors = 0
lang_indexable: Counter[str] = Counter()

print("\n--- sitemap loc crawl ---")
for loc in locs:
    path = urlparse(loc).path
    status, html = get(path)
    robots = meta(html, "robots")
    canonical = canon(html)
    hrefs = hreflangs(html)
    if status == 404:
        not_found += 1
        print(f"FAIL {path} 404")
        fail.append((path, "404", status))
        continue
    if status != 200:
        print(f"FAIL {path} status={status}")
        fail.append((path, "status", status))
        continue
    if "refresh" in html.lower() and "Moved" in title_of(html):
        redirect_pages += 1
        print(f"FAIL {path} sitemap loc is a redirect shell")
        fail.append((path, "redirect-in-sitemap", True))
        continue
    if "noindex" in robots:
        noindex_pages += 1
        print(f"FAIL {path} sitemap loc is noindex")
        fail.append((path, "noindex-in-sitemap", robots))
        continue
    indexable += 1
    lang_indexable[lang_of(loc)] += 1
    if canonical != loc:
        canonical_errors += 1
        print(f"FAIL {path} canonical={canonical!r}")
        fail.append((path, "canonical", canonical))
    missing_h = [item for item in HREFLANG_REQUIRED if item not in hrefs]
    if missing_h:
        hreflang_errors += 1
        print(f"FAIL {path} missing hreflang {missing_h}")
        fail.append((path, "hreflang", missing_h))

status, html = get("/404.html")
check("/404.html", status == 200, "status", status)
check("/404.html", "noindex" in html, "noindex", True)
check("/404.html", "/assets/" not in html, "no spa bundle", True)
canonical = canon(html)
check(
    "/404.html",
    "pinjinpump.com/en" not in (canonical or ""),
    "no home canonical",
    canonical,
)

unknown = "/this-page-does-not-exist-pinjin-seo-test/"
if "pinjinpump.com" in BASE:
    status, html = get(unknown)
    check(unknown, status == 404, "status", status)
    check(unknown, "/assets/" not in html, "no spa bundle", True)

status, html = get("/robots.txt")
check(
    "robots",
    status == 200 and f"Sitemap: {SITE}/sitemap.xml" in html,
    "sitemap line",
    True,
)

print("\n=== totals ===")
print(f"sitemap_urls={len(locs)}")
print(f"language_distribution={dict(by_lang)}")
print(f"indexable_in_sitemap={indexable}")
print(f"indexable_by_lang={dict(lang_indexable)}")
print(f"noindex_in_sitemap={noindex_pages}")
print(f"redirect_in_sitemap={redirect_pages}")
print(f"http_404_in_sitemap={not_found}")
print(f"canonical_errors={canonical_errors}")
print(f"hreflang_errors={hreflang_errors}")
print(f"spot_check_failures={len(fail)}")
if fail:
    sys.exit(1)
