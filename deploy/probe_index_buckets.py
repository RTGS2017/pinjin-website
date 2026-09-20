# -*- coding: utf-8 -*-
"""Live probe of pinjinpump.com for index-bucket diagnosis."""
from __future__ import annotations

import os
import re
import ssl
import sys
import urllib.error
import urllib.request
from collections import Counter

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

for k in list(os.environ):
    if "proxy" in k.lower():
        os.environ.pop(k, None)

ctx = ssl.create_default_context()


class NoRedir(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        raise urllib.error.HTTPError(req.full_url, code, msg, headers, fp)


opener = urllib.request.build_opener(
    NoRedir,
    urllib.request.HTTPSHandler(context=ctx),
    urllib.request.HTTPHandler(),
)
follow_opener = urllib.request.build_opener(
    urllib.request.HTTPSHandler(context=ctx),
    urllib.request.HTTPHandler(),
)
UA = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"


def fetch(url: str, follow: bool = False):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    o = follow_opener if follow else opener
    try:
        with o.open(req, timeout=25) as r:
            return r.status, dict(r.headers), r.read(), r.geturl()
    except urllib.error.HTTPError as e:
        body = e.read() if e.fp else b""
        return e.code, dict(e.headers), body, url
    except Exception as e:  # noqa: BLE001
        return "ERR", {}, str(e).encode(), url


def sniff(html: bytes) -> dict:
    text = html.decode("utf-8", "replace")
    title = re.search(r"<title>([^<]*)</title>", text, re.I)
    canon = re.search(r'rel="canonical" href="([^"]+)"', text, re.I)
    robots = re.search(r'name="robots" content="([^"]+)"', text, re.I)
    h1 = re.search(r"<h1[^>]*>(.*?)</h1>", text, re.I | re.S)
    xrobots = None
    return {
        "title": title.group(1).strip() if title else "",
        "canonical": canon.group(1) if canon else "",
        "robots": robots.group(1) if robots else "",
        "h1": re.sub("<[^>]+>", "", h1.group(1)).strip()[:80] if h1 else "",
        "refresh": "http-equiv=\"refresh\"" in text.lower(),
        "xml": b"<urlset" in html or b"<sitemapindex" in html,
        "en": text.lower().count("manufactured by hebei pinjin"),
        "zh": text.count("河北品锦"),
        "ar": text.count("مصنّع") + text.count("الكتالوج"),
        "pt": text.lower().count("fabricado pela") + text.count("catálogo"),
        "ru": text.count("каталог") + text.count("производит"),
        "len": len(text),
    }


def dump(label: str, url: str, follow: bool = False) -> None:
    code, headers, body, final = fetch(url, follow=follow)
    loc = headers.get("Location") or headers.get("location")
    xrt = headers.get("X-Robots-Tag") or headers.get("x-robots-tag")
    ct = headers.get("Content-Type") or headers.get("content-type")
    s = sniff(body) if isinstance(body, (bytes, bytearray)) else {}
    print(f"{label}\t{code}\t{url}")
    print(f"  ct={ct} xrt={xrt} loc={loc} final={final} bytes={len(body)}")
    if s:
        print(
            f"  title={s['title'][:90]!r} canon={s['canonical']} robots={s['robots']} "
            f"h1={s['h1'][:50]!r} refresh={s['refresh']} xml={s['xml']}"
        )
        print(f"  markers en={s['en']} zh={s['zh']} ar={s['ar']} pt={s['pt']} ru={s['ru']}")


def main() -> None:
    print("=== sitemaps ===")
    for url in [
        "https://pinjinpump.com/sitemap.xml",
        "https://pinjinpump.com/robots.txt",
        "https://pinjinpump.com/sitemap-pages.xml",
        "https://pinjinpump.com/image-sitemap.xml",
    ]:
        dump("SITEMAP", url)

    print("\n=== host variants ===")
    for url in [
        "https://pinjinpump.com/",
        "https://pinjinpump.com/en",
        "https://pinjinpump.com/en/",
        "http://pinjinpump.com/en/",
        "https://www.pinjinpump.com/en/",
    ]:
        dump("HOST", url)

    print("\n=== sample pages ===")
    samples = [
        "https://pinjinpump.com/en/products/electric-20-concrete-pump/",
        "https://pinjinpump.com/en/products/electric-30-concrete-pump/",
        "https://pinjinpump.com/en/products/diesel-50-concrete-pump/",
        "https://pinjinpump.com/zh/products/electric-20-concrete-pump/",
        "https://pinjinpump.com/ar/products/electric-20-concrete-pump/",
        "https://pinjinpump.com/pt/products/electric-20-concrete-pump/",
        "https://pinjinpump.com/ru/products/electric-20-concrete-pump/",
        "https://pinjinpump.com/en/products/",
        "https://pinjinpump.com/en/blog/",
        "https://pinjinpump.com/en/factory/",
    ]
    titles = []
    for url in samples:
        code, headers, body, final = fetch(url)
        s = sniff(body)
        titles.append(s["title"])
        dump("PAGE", url)

    print("\n=== title uniqueness among samples ===")
    print(Counter(titles))

    print("\n=== expected 404 aliases ===")
    for url in [
        "https://pinjinpump.com/about/",
        "https://pinjinpump.com/en/company/",
        "https://pinjinpump.com/en/products/zs22-25/",
        "https://pinjinpump.com/applications/",
    ]:
        dump("ALIAS", url)


if __name__ == "__main__":
    main()
