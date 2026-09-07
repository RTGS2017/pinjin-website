"""Local or live SEO retest. Usage: python deploy/retest_preview_seo.py [base_url]"""
from __future__ import annotations

import re
import sys
import urllib.error
import urllib.request

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:4173"
HOME = "Concrete Pump Manufacturer China | Hebei Pinjin Machinery"
fail: list[tuple[str, str, object]] = []


def get(path: str) -> tuple[int, str]:
    req = urllib.request.Request(BASE + path, headers={"User-Agent": "PinjinSEOTest/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
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


def check(name: str, passed: bool, key: str, value: object) -> None:
    mark = "PASS" if passed else "FAIL"
    print(f"{mark} {name} {key}={value!r}")
    if not passed:
        fail.append((name, key, value))


status, html = get("/")
check("/", status == 200, "status", status)
check("/", "noindex" in meta(html, "robots"), "robots", meta(html, "robots"))
check("/", canon(html) == "https://pinjinpump.com/en", "canonical", canon(html))

status, html = get("/en")
check("/en", status == 200, "status", status)
check("/en", title_of(html) == HOME, "title", title_of(html))
check("/en", meta(html, "robots").startswith("index"), "robots", meta(html, "robots"))
check("/en", canon(html) == "https://pinjinpump.com/en", "canonical", canon(html))

status, html = get("/en/")
check("/en/", status == 200, "status", status)
check("/en/", "noindex" in meta(html, "robots"), "robots", meta(html, "robots"))
check("/en/", canon(html) == "https://pinjinpump.com/en", "canonical", canon(html))

status, html = get("/en/products/electric-20-concrete-pump")
page_title = title_of(html)
check("/en/products/electric-20", status == 200, "status", status)
check(
    "/en/products/electric-20",
    page_title != HOME and "Electric 20" in page_title,
    "title",
    page_title,
)
check("/en/products/electric-20", 'hreflang="zh-CN"' in html, "hreflang", True)
check("/en/products/electric-20", 'hreflang="pt-BR"' not in html, "no pt hreflang", True)

status, html = get("/en/products/concrete-pumps")
check("/en/products/concrete-pumps", status == 200, "status", status)
check(
    "/en/products/concrete-pumps",
    "/en/products/electric-concrete-pumps" in html,
    "target",
    True,
)
check("/en/products/concrete-pumps", "noindex" in html, "noindex", True)

status, html = get("/ar/products")
check("/ar/products", status == 200, "status", status)
check("/ar/products", "noindex" in meta(html, "robots"), "robots", meta(html, "robots"))
check(
    "/ar/products",
    canon(html) == "https://pinjinpump.com/en/products",
    "canonical",
    canon(html),
)

status, html = get("/products")
check("/products", status == 200, "status", status)
check("/products", "/en/products" in html, "redirect-en", True)

status, html = get("/en/products/zs22-25")
check("/en/products/zs22-25", status == 200, "status", status)
check("/en/products/zs22-25", "electric-20-concrete-pump" in html, "alias", True)

status, html = get("/sitemap-pages.xml")
locs = re.findall(r"<loc>([^<]+)</loc>", html)
check("sitemap", status == 200, "status", status)
check("sitemap", len(locs) == 114, "count", len(locs))
check(
    "sitemap",
    not any(re.search(r"/(ar|pt|ru)(/|$)", url) for url in locs),
    "no ar/pt/ru",
    True,
)
check(
    "sitemap",
    'hreflang="pt-BR"' not in html and 'hreflang="ar"' not in html,
    "hreflang en+zh",
    True,
)

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
    status == 200 and "Sitemap: https://pinjinpump.com/sitemap.xml" in html,
    "sitemap line",
    True,
)

print(f"\n{len(fail)} failed")
if fail:
    sys.exit(1)
