"""Local or live SEO retest. Usage: python deploy/retest_preview_seo.py [base_url]"""
from __future__ import annotations

import re
import sys
import urllib.error
import urllib.request
from collections import Counter
from urllib.parse import urlparse

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

BASE = sys.argv[1].rstrip("/") if len(sys.argv) > 1 else "http://127.0.0.1:4173"
SITE = "https://pinjinpump.com"
HOME = "Concrete Pump Manufacturer China | Hebei Pinjin Machinery"
HREFLANG_REQUIRED = ("en", "zh-CN", "pt", "ar", "ru", "x-default")
LANGS = ("en", "zh", "pt", "ar", "ru")
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
    return first if first in LANGS else ""


def check(name: str, passed: bool, key: str, value: object) -> None:
    mark = "PASS" if passed else "FAIL"
    print(f"{mark} {name} {key}={value!r}")
    if not passed:
        fail.append((name, key, value))


status, html = get("/")
check("/", status == 200, "status", status)
check("/", "noindex" in meta(html, "robots"), "robots", meta(html, "robots"))
check("/", canon(html) == f"{SITE}/en/", "canonical", canon(html))

for lang, expect_title_part in (
    ("en", "Concrete Pump Manufacturer"),
    ("zh", "混凝土泵"),
    ("ar", "مضخات"),
    ("pt", "Bomba de Concreto"),
    ("ru", "бетононасос"),
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

status, html = get("/ar/products/")
check("/ar/products", status == 200, "status", status)
check("/ar/products", meta(html, "robots").startswith("index"), "robots", meta(html, "robots"))
check("/ar/products", canon(html) == f"{SITE}/ar/products/", "canonical", canon(html))

status, html = get("/en/products/concrete-pumps/")
check("/en/products/concrete-pumps/", status == 200, "status", status)
check(
    "/en/products/concrete-pumps/",
    "/en/products/electric-concrete-pumps" in html,
    "target",
    True,
)
check("/en/products/concrete-pumps/", "noindex" in html, "noindex", True)

status, html = get("/products/")
check("/products/", status == 200, "status", status)
check("/products/", "/en/products/" in html, "redirect-en", True)

status, html = get("/en/products/zs22-25/")
check("/en/products/zs22-25/", status == 200, "status", status)
check("/en/products/zs22-25/", "electric-20-concrete-pump" in html, "alias", True)

status, sitemap_xml = get("/sitemap-pages.xml")
locs = re.findall(r"<loc>([^<]+)</loc>", sitemap_xml)
check("sitemap", status == 200, "status", status)
check("sitemap", len(locs) == 285, "count", len(locs))
by_lang = Counter(lang_of(url) for url in locs)
for lang in LANGS:
    check("sitemap", by_lang[lang] == 57, f"{lang}-count", by_lang[lang])
for token in HREFLANG_REQUIRED:
    check("sitemap", f'hreflang="{token}"' in sitemap_xml, f"hreflang-{token}", True)

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
canonical = canon(html)
check(
    "/404.html",
    "pinjinpump.com/en" not in (canonical or ""),
    "no home canonical",
    canonical,
)

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
