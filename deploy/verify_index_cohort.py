# -*- coding: utf-8 -*-
"""Check the fixed URL cohort against dist shells. Do not request indexing."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from urllib.parse import urlparse

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
COHORT = Path(__file__).resolve().parent / "index-cohort.json"
SITE = "https://pinjinpump.com"
fail: list[str] = []


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
    return match.group(1) if match else ""


def title_of(html: str) -> str:
    match = re.search(r"<title>([^<]*)</title>", html, re.I)
    return match.group(1) if match else ""


def hreflangs(html: str) -> set[str]:
    return set(re.findall(r'hreflang=["\']([^"\']+)["\']', html, re.I))


def dist_path(url: str) -> Path:
    path = urlparse(url).path
    parts = [part for part in path.strip("/").split("/") if part]
    if not parts:
        return DIST / "index.html"
    return DIST.joinpath(*parts, "index.html")


def check(url: str, ok: bool, detail: str) -> None:
    mark = "PASS" if ok else "FAIL"
    print(f"{mark} {url} {detail}")
    if not ok:
        fail.append(f"{url} {detail}")


def main() -> None:
    data = json.loads(COHORT.read_text(encoding="utf-8"))
    if not data.get("doNotRequestIndexing"):
        fail.append("cohort must set doNotRequestIndexing")
    print(f"cohort={COHORT.name} updated={data.get('updated')} doNotRequestIndexing={data.get('doNotRequestIndexing')}")
    print(data.get("note", ""))

    sitemap = (DIST / "sitemap.xml").read_text(encoding="utf-8")
    locs = set(re.findall(r"<loc>([^<]+)</loc>", sitemap))

    for item in data["targets"]:
        url = item["url"]
        expect = item["expect"]
        path = urlparse(url).path
        if path.endswith(".xml"):
            file = DIST / path.lstrip("/")
            check(url, file.exists(), expect)
            text = file.read_text(encoding="utf-8") if file.exists() else ""
            if path.endswith("image-sitemap.xml"):
                check(url, "<?xml" in text and "<urlset" in text and "xmlns:image" in text, "image-urlset")
                check(
                    url,
                    "b500s-83d-two-stage-pump.webp" in text
                    and "b500s-83d-two-stage-pump-catalogue.webp" in text,
                    "b500s-images",
                )
                continue
            check(url, "<?xml" in text and "<urlset" in text and "<sitemapindex" not in text, "xml-urlset")
            check(url, "/ar/" not in text and "/pt/" not in text and "/ru/" not in text, "no-thin-locales")
            check(url, 130 <= len(locs) <= 160, f"loc-count={len(locs)}")
            check(url, not (DIST / "sitemap-pages.xml").exists(), "no-sitemap-pages")
            continue

        shell = dist_path(url)
        gone = path in {
            "/en/products/zs22-25/",
            "/about/",
            "/applications/",
            "/en/company/",
        } or "404" in expect.lower()
        if gone:
            check(url, not shell.exists(), f"no-shell expect={expect}")
            continue

        if not shell.exists():
            check(url, False, f"missing-shell expect={expect}")
            continue
        html = shell.read_text(encoding="utf-8")
        robots = meta(html, "robots")
        canonical = canon(html)
        title = title_of(html)
        hrefs = hreflangs(html)

        if url.rstrip("/") == SITE:
            check(url, canonical == f"{SITE}/en/", f"canonical={canonical}")
            check(url, 'http-equiv="refresh"' in html.lower(), "refresh-to-en")
            check(url, "noindex" not in robots.lower(), f"robots={robots}")
            continue

        if "/ar/" in path or "/pt/" in path or "/ru/" in path:
            check(url, "noindex" in robots, f"robots={robots}")
            check(url, canonical == url, f"canonical={canonical}")
            check(url, url not in locs, "absent-from-sitemap")
            continue

        check(url, robots.lower().startswith("index"), f"robots={robots}")
        check(url, canonical == url, f"canonical={canonical}")
        check(url, url in locs, "in-sitemap")
        if path.startswith("/en/") or path.startswith("/zh/"):
            missing = [code for code in ("en", "zh-CN", "x-default") if code not in hrefs]
            extra = [code for code in ("ar", "pt", "ru", "pt-BR") if code in hrefs]
            check(url, not missing, f"hreflang-missing={missing}")
            check(url, not extra, f"hreflang-extra={extra}")
        if "unique title" in expect.lower() or "catalogue" in expect.lower():
            check(url, "catalogue row" in html.lower() or "目录行" in html, "catalogue-row")
            check(url, bool(title) and title != "Concrete Pump Manufacturer China | Hebei Pinjin Machinery", f"title={title[:80]}")
        print(f"  title={title[:90]!r}")

    print("\nDo not bulk-request indexing in GSC. After deploy, re-check this same cohort with URL Inspection on a few changed URLs only.")
    if fail:
        print(f"\n{len(fail)} failures")
        sys.exit(1)
    print("cohort dist checks passed")


if __name__ == "__main__":
    main()
