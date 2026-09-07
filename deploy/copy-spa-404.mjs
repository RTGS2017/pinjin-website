/**
 * GitHub Pages has no Nginx try_files; unknown paths serve 404.html.
 *
 * 1. Copy index.html → 404.html so a missed deep link still boots the SPA.
 *    404.html is noindex and must NOT reuse the homepage canonical.
 * 2. Materialize a real HTML file for every prerendered URL so product/blog
 *    /locale paths return HTTP 200 instead of 404.
 * 3. Write `path.html` (no trailing slash) and `path/index.html` (slash).
 *    Pretty URL `/path` serves path.html; `/path/` serves the directory index.
 * 4. Stamp title, description, canonical, hreflang, robots, html lang, and a
 *    noscript H1. Slash copies are noindex and point at the slashless URL.
 * 5. Write static redirect shells for legacy / alias / unprefixed paths so
 *    crawlers no longer hit HTTP 404.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');
const indexHtml = join(distDir, 'index.html');
const notFoundHtml = join(distDir, '404.html');
const metaFile = join(root, 'deploy', 'prerender-meta.json');
const SITE = 'https://pinjinpump.com';
const HOME_TITLE = 'Concrete Pump Manufacturer China | Hebei Pinjin Machinery';

if (!existsSync(indexHtml)) {
  console.error('dist/index.html not found; run vite build first');
  process.exit(1);
}

const built = readFileSync(indexHtml, 'utf8');
if (built.includes('%BASE_URL%')) {
  console.error('dist/index.html still contains %BASE_URL%; this is not a Vite production build');
  process.exit(1);
}
if (built.includes('/pinjin-website/')) {
  console.error('dist/index.html still contains /pinjin-website/; Vite base must be /');
  process.exit(1);
}
if (!/\/assets\/[^"']+\.js/.test(built)) {
  console.error('dist/index.html has no hashed /assets/*.js; refusing to deploy source HTML');
  process.exit(1);
}

const sitemapXml = join(distDir, 'sitemap.xml');
const pagesSitemapXml = join(distDir, 'sitemap-pages.xml');
const imageSitemapXml = join(distDir, 'image-sitemap.xml');
const robotsTxt = join(distDir, 'robots.txt');
for (const file of [sitemapXml, pagesSitemapXml, imageSitemapXml, robotsTxt]) {
  if (!existsSync(file)) {
    console.error(`${file} missing; Vite must copy public/ into dist/`);
    process.exit(1);
  }
}

function assertXmlSitemap(file, kind) {
  const text = readFileSync(file, 'utf8');
  const okRoot =
    kind === 'index'
      ? text.includes('<sitemapindex')
      : text.includes('<urlset');
  if (!text.includes('<?xml') || !okRoot || !text.includes('<loc>')) {
    console.error(`${file} is not a valid ${kind} sitemap`);
    process.exit(1);
  }
  if (text.includes('<html') || text.includes('%BASE_URL%')) {
    console.error(`${file} looks like HTML or source, not XML`);
    process.exit(1);
  }
}
assertXmlSitemap(sitemapXml, 'index');
assertXmlSitemap(pagesSitemapXml, 'urlset');
assertXmlSitemap(imageSitemapXml, 'urlset');
const robotsText = readFileSync(robotsTxt, 'utf8');
if (!robotsText.includes('Sitemap: https://pinjinpump.com/sitemap.xml')) {
  console.error('dist/robots.txt must point Google to https://pinjinpump.com/sitemap.xml');
  process.exit(1);
}

if (!existsSync(metaFile)) {
  console.error('deploy/prerender-meta.json missing; run deploy/export_prerender_meta.ts first');
  process.exit(1);
}

const meta = JSON.parse(readFileSync(metaFile, 'utf8'));
if (!Array.isArray(meta.pages) || meta.pages.length < 10) {
  console.error('prerender-meta.json has too few pages');
  process.exit(1);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function setHtmlLang(html, htmlLang) {
  return html.replace(/<html\b([^>]*)>/i, (_, attrs) => {
    if (/\blang=/.test(attrs)) {
      attrs = attrs.replace(/\blang="[^"]*"/i, `lang="${htmlLang}"`);
    } else {
      attrs += ` lang="${htmlLang}"`;
    }
    return `<html${attrs}>`;
  });
}

function setTitle(html, title) {
  const tag = `<title>${escapeHtml(title)}</title>`;
  if (/<title>[^<]*<\/title>/.test(html)) {
    return html.replace(/<title>[^<]*<\/title>/, tag);
  }
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function setNamedMeta(html, name, content) {
  const tag = `<meta name="${name}" content="${escapeHtml(content)}" />`;
  const re = new RegExp(`<meta\\s+name="${name}"\\s+content="[^"]*"\\s*/?>`, 'i');
  if (re.test(html)) return html.replace(re, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function setCanonical(html, canonical) {
  const tag = `<link rel="canonical" href="${escapeHtml(canonical)}" />`;
  if (/<link rel="canonical" href="[^"]*"\s*\/?>/.test(html)) {
    return html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, tag);
  }
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function stripCanonical(html) {
  return html.replace(/\s*<link rel="canonical" href="[^"]*"\s*\/?>/g, '');
}

function stripHreflang(html) {
  return html.replace(
    /\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/?>/gi,
    '',
  );
}

function insertHead(html, snippet) {
  return html.replace('</head>', `${snippet}\n  </head>`);
}

function hreflangBlock(rest) {
  const langs = meta.indexedLangs ?? ['en', 'zh', 'pt', 'ar', 'ru'];
  const map = meta.hreflang ?? {
    en: 'en',
    zh: 'zh-CN',
    pt: 'pt',
    ar: 'ar',
    ru: 'ru',
  };
  const lines = langs.map((lang) => {
    const path = rest === '/' ? `/${lang}` : `/${lang}${rest}`;
    const hl = map[lang] || lang;
    return `    <link rel="alternate" hreflang="${hl}" href="${SITE}${path}" />`;
  });
  const defaultPath = rest === '/' ? '/en' : `/en${rest}`;
  lines.push(
    `    <link rel="alternate" hreflang="x-default" href="${SITE}${defaultPath}" />`,
  );
  return lines.join('\n');
}

function insertNoscript(html, h1, description) {
  const block = `    <noscript><h1>${escapeHtml(h1)}</h1><p>${escapeHtml(description)}</p></noscript>\n`;
  if (html.includes('<div id="root"></div>')) {
    return html.replace('<div id="root"></div>', `${block}    <div id="root"></div>`);
  }
  return html.replace(/<body>/i, `<body>\n${block}`);
}

function stampPage(page, { slashAlias = false } = {}) {
  let html = built;
  html = setHtmlLang(html, page.htmlLang || 'en');
  html = setTitle(html, page.title);
  html = setNamedMeta(html, 'description', page.description);
  html = setCanonical(html, page.canonicalUrl);
  html = stripHreflang(html);
  if (slashAlias) {
    html = setNamedMeta(html, 'robots', 'noindex, follow');
    const dest = page.path;
    html = insertHead(
      html,
      `    <meta http-equiv="refresh" content="0;url=${escapeHtml(page.canonicalUrl)}" />`,
    );
    html = html.replace(
      /<body>/i,
      `<body>\n    <script>location.replace(${JSON.stringify(dest)}+location.search+location.hash);</script>`,
    );
  } else {
    html = setNamedMeta(html, 'robots', page.robots);
    if (page.indexed) {
      html = insertHead(html, hreflangBlock(page.rest));
    }
    html = insertNoscript(html, page.h1, page.description);
  }
  return html;
}

function redirectDocument(targetUrl, htmlLang = 'en') {
  let pathname = '/en';
  try {
    pathname = new URL(targetUrl).pathname;
  } catch {
    pathname = targetUrl.replace(SITE, '') || '/en';
  }
  const href = escapeHtml(targetUrl);
  return `<!doctype html>
<html lang="${htmlLang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${href}" />
    <meta http-equiv="refresh" content="0;url=${href}" />
    <title>Moved</title>
    <script>location.replace(${JSON.stringify(pathname)}+location.search+location.hash);</script>
  </head>
  <body>
    <p><a href="${href}">Continue to the current page</a></p>
  </body>
</html>
`;
}

function writeSpaShell(absPath, html) {
  mkdirSync(dirname(absPath), { recursive: true });
  writeFileSync(absPath, html);
}

function writePathPair(pathname, prettyHtml, slashHtml) {
  const parts = pathname.replace(/^\//, '').split('/').filter(Boolean);
  if (parts.length === 0) {
    writeSpaShell(join(distDir, 'index.html'), prettyHtml);
    return 1;
  }
  writeSpaShell(
    join(distDir, ...parts.slice(0, -1), `${parts[parts.length - 1]}.html`),
    prettyHtml,
  );
  writeSpaShell(join(distDir, ...parts, 'index.html'), slashHtml);
  return 2;
}

let written = 0;
for (const page of meta.pages) {
  written += writePathPair(
    page.path,
    stampPage(page, { slashAlias: false }),
    stampPage(page, { slashAlias: true }),
  );
}

for (const redirect of meta.redirects ?? []) {
  const html = redirectDocument(redirect.targetUrl);
  written += writePathPair(redirect.path, html, html);
}

const rootCanonical = `${SITE}/en`;
let rootHtml = built;
rootHtml = setCanonical(rootHtml, rootCanonical);
rootHtml = setNamedMeta(rootHtml, 'robots', 'noindex, follow');
rootHtml = stripHreflang(rootHtml);
rootHtml = setTitle(rootHtml, HOME_TITLE);
writeSpaShell(join(distDir, 'index.html'), rootHtml);

let notFound = built;
notFound = stripCanonical(notFound);
notFound = setNamedMeta(notFound, 'robots', 'noindex, follow');
notFound = setTitle(notFound, 'Page not found | Hebei Pinjin Machinery');
notFound = stripHreflang(notFound);
writeFileSync(notFoundHtml, notFound);
writeFileSync(join(distDir, '.nojekyll'), '');

const pagesXml = readFileSync(pagesSitemapXml, 'utf8');
const locs = [...pagesXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const uniqueLocs = [...new Set(locs)];
if (uniqueLocs.length < 270 || uniqueLocs.length > 300) {
  console.error(`sitemap-pages.xml loc count ${uniqueLocs.length} (expected ~285, 5 langs)`);
  process.exit(1);
}
const sitemapPaths = uniqueLocs.map((loc) => new URL(loc).pathname);
for (const lang of ['en', 'zh', 'pt', 'ar', 'ru']) {
  if (!sitemapPaths.some((path) => path === `/${lang}` || path.startsWith(`/${lang}/`))) {
    console.error(`sitemap-pages.xml missing ${lang} URLs`);
    process.exit(1);
  }
}
for (const token of ['hreflang="en"', 'hreflang="zh-CN"', 'hreflang="pt"', 'hreflang="ar"', 'hreflang="ru"', 'hreflang="x-default"']) {
  if (!pagesXml.includes(token)) {
    console.error(`sitemap-pages.xml missing ${token}`);
    process.exit(1);
  }
}

const productShell = join(distDir, 'en', 'products', 'electric-20-concrete-pump.html');
if (!existsSync(productShell)) {
  console.error('missing prerendered product shell for /en/products/electric-20-concrete-pump');
  process.exit(1);
}
const productHtml = readFileSync(productShell, 'utf8');
const productTitle = productHtml.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
if (!productTitle || productTitle === HOME_TITLE) {
  console.error(`product shell still has homepage title: ${productTitle}`);
  process.exit(1);
}
if (!productHtml.includes('hreflang="zh-CN"') || !productHtml.includes('hreflang="ar"') || !productHtml.includes('hreflang="pt"') || !productHtml.includes('hreflang="ru"') || !productHtml.includes('hreflang="x-default"')) {
  console.error('product shell missing full hreflang cluster');
  process.exit(1);
}

const homeShell = join(distDir, 'en.html');
const homeHtml = readFileSync(homeShell, 'utf8');
const homeTitle = homeHtml.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
if (productTitle === homeTitle) {
  console.error('product title matches home title after prerender');
  process.exit(1);
}

const slashHome = readFileSync(join(distDir, 'en', 'index.html'), 'utf8');
if (!slashHome.includes('noindex')) {
  console.error('/en/ shell must be noindex');
  process.exit(1);
}
if (!slashHome.includes('https://pinjinpump.com/en"') && !slashHome.includes('https://pinjinpump.com/en\'')) {
  console.error('/en/ shell must canonical to /en');
  process.exit(1);
}

const rootOut = readFileSync(join(distDir, 'index.html'), 'utf8');
if (!rootOut.includes('noindex')) {
  console.error('dist/index.html must be noindex');
  process.exit(1);
}
if (!rootOut.includes('href="https://pinjinpump.com/en"')) {
  console.error('dist/index.html canonical must be https://pinjinpump.com/en');
  process.exit(1);
}

const notFoundOut = readFileSync(notFoundHtml, 'utf8');
if (!notFoundOut.includes('noindex')) {
  console.error('404.html must be noindex');
  process.exit(1);
}
if (/rel="canonical" href="https:\/\/pinjinpump\.com\/en\/?"/.test(notFoundOut)) {
  console.error('404.html must not reuse the homepage canonical');
  process.exit(1);
}

const legacyShell = join(distDir, 'en', 'products', 'concrete-pumps.html');
if (!existsSync(legacyShell)) {
  console.error('missing legacy redirect shell /en/products/concrete-pumps');
  process.exit(1);
}
const legacyHtml = readFileSync(legacyShell, 'utf8');
if (!legacyHtml.includes('/en/products/electric-concrete-pumps')) {
  console.error('legacy concrete-pumps shell must point at electric-concrete-pumps');
  process.exit(1);
}

const arShell = join(distDir, 'ar', 'products.html');
if (!existsSync(arShell)) {
  console.error('missing /ar/products SPA shell');
  process.exit(1);
}
const arHtml = readFileSync(arShell, 'utf8');
if (!arHtml.includes('name="robots" content="index, follow"')) {
  console.error('/ar/products must be index, follow');
  process.exit(1);
}
if (!/rel="canonical" href="https:\/\/pinjinpump\.com\/ar\/products"/.test(arHtml)) {
  console.error('/ar/products canonical must be self-referencing');
  process.exit(1);
}

console.log(`Wrote ${written} HTML files from ${meta.pages.length} pages + ${(meta.redirects ?? []).length} redirects`);
console.log(`sitemap-pages.xml locs=${uniqueLocs.length} (en+zh+pt+ar+ru)`);
console.log('Copied dist/index.html → dist/404.html (noindex, no homepage canonical)');
console.log('Wrote dist/.nojekyll');
console.log(
  'Verified dist/sitemap.xml (index), dist/sitemap-pages.xml, dist/image-sitemap.xml, dist/robots.txt',
);
