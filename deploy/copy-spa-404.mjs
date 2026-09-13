/**
 * GitHub Pages has no Nginx try_files; unknown paths serve 404.html.
 *
 * 1. Unknown paths must be a real HTTP 404. Write a static 404.html with
 *    no React bundle, so GitHub Pages cannot boot the SPA as a fallback.
 * 2. Materialize a real HTML file for every prerendered URL so product/blog
 *    /locale paths return HTTP 200 instead of 404.
 * 3. Never write both `name.html` and `name/index.html`. GitHub Pages treats
 *    that pair as a conflict: `/en` may still 200 from `en.html`, but nested
 *    URLs like `/en/products` return HTTP 404 to Googlebot.
 *    Always write `path/index.html` and publish trailing-slash sitemap locs
 *    so Googlebot gets HTTP 200 without a 301.
 * 4. Stamp title, description, canonical, hreflang, robots, html lang, and a
 *    noscript H1 onto the single file that GitHub will actually serve.
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
const imageXml = readFileSync(imageSitemapXml, 'utf8');
if (
  !imageXml.includes('/images/products/b500s-83d-two-stage-pump/b500s-83d-two-stage-pump.webp') ||
  !imageXml.includes('/images/products/b500s-83d-two-stage-pump/b500s-83d-two-stage-pump-catalogue.webp')
) {
  console.error('image-sitemap.xml must list B500S-83D studio photo and catalogue WebP');
  process.exit(1);
}
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

function setPropertyMeta(html, property, content) {
  const tag = `<meta property="${property}" content="${escapeHtml(content)}" />`;
  const re = new RegExp(
    `<meta\\s+property="${property}"\\s+content="[^"]*"\\s*/?>`,
    'i',
  );
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
  const path = rest === '/' ? `/${lang}/` : `/${lang}${rest}/`;
    const hl = map[lang] || lang;
    return `    <link rel="alternate" hreflang="${hl}" href="${SITE}${path}" />`;
  });
  const defaultPath = rest === '/' ? '/en/' : `/en${rest}/`;
  lines.push(
    `    <link rel="alternate" hreflang="x-default" href="${SITE}${defaultPath}" />`,
  );
  return lines.join('\n');
}

function jsonLdTag(data) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return `    <script type="application/ld+json">${json}</script>`;
}

function toSrc(url) {
  if (!url) return '';
  return String(url).replace(/^https?:\/\/pinjinpump\.com/i, '');
}

function jsonLdFor(page) {
  if (page.kind === 'home') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Hebei Pinjin Machinery Manufacturing Co., Ltd.',
        url: SITE,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Hebei Pinjin Machinery',
        url: SITE,
      },
    ];
  }
  if (page.kind === 'product') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: page.h1,
      description: page.description,
      image: page.ogImage,
      url: page.canonicalUrl,
      brand: { '@type': 'Brand', name: 'Hebei Pinjin Machinery' },
      additionalProperty: (page.specs || []).map((spec) => ({
        '@type': 'PropertyValue',
        name: spec.label,
        value: spec.value,
      })),
    };
  }
  if (page.kind === 'collection') {
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: page.h1,
      description: page.description,
      url: page.canonicalUrl,
    };
  }
  if (page.kind === 'article') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: page.h1,
      description: page.description,
      mainEntityOfPage: page.canonicalUrl,
    };
  }
  return null;
}

function linkList(pages) {
  return pages
    .map((item) => `<a href="${escapeHtml(item.path)}">${escapeHtml(item.h1 || item.title)}</a>`)
    .join(' ');
}

function pickSlice(items, seed, count) {
  const list = items.filter((item) => item && item.path);
  if (!list.length || count <= 0) return [];
  let hash = 0;
  for (const ch of String(seed)) hash = (hash + ch.charCodeAt(0) * 17) % 997;
  const start = hash % list.length;
  const out = [];
  for (let i = 0; i < Math.min(count, list.length); i += 1) {
    out.push(list[(start + i) % list.length]);
  }
  return out;
}

function insertSeoStatic(html, page) {
  const siblings = (meta.pages || []).filter((item) => item.lang === page.lang);
  const hubs = siblings.filter
    ? siblings.filter((item) =>
        ['/', '/products', '/solutions', '/blog', '/factory', '/about', '/markets', '/faq', '/contact', '/resources', '/product-selection-guide', '/copyright'].includes(item.rest),
      )
    : [];
  const products = siblings.filter((item) => item.kind === 'product' && item.path !== page.path);
  const articles = siblings.filter((item) => item.kind === 'article' && item.path !== page.path);
  const collections = siblings.filter((item) => item.kind === 'collection' && item.path !== page.path);
  const langs = (meta.indexedLangs || ['en', 'zh', 'pt', 'ar', 'ru']).map((lang) => {
    const path = page.rest === '/' ? `/${lang}/` : `/${lang}${page.rest}/`;
    return `<a href="${escapeHtml(path)}" hreflang="${escapeHtml((meta.hreflang && meta.hreflang[lang]) || lang)}">${escapeHtml(lang)}</a>`;
  });
  const specs = (page.specs || [])
    .map((spec) => `<li>${escapeHtml(spec.label)}: ${escapeHtml(spec.value)}</li>`)
    .join('');
  const specBlock = specs ? `<h2>Specifications</h2><ul>${specs}</ul>` : '';
  const img = page.ogImage
    ? `<p><img src="${escapeHtml(toSrc(page.ogImage))}" alt="${escapeHtml(page.imageAlt || page.h1)}" width="1200" height="800" /></p>`
    : '';
  const contact = `/${page.lang}/contact/`;
  const block = `    <style>#seo-static{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}</style>
    <main id="seo-static">
      <nav>${linkList(hubs)} ${langs.join(' ')}</nav>
      <h1>${escapeHtml(page.h1)}</h1>
      <p>${escapeHtml(page.title)}. ${escapeHtml(page.body || page.description)}</p>
      ${specBlock}
      ${img}
      <p><a href="${escapeHtml(contact)}">Contact inquiry WhatsApp email</a></p>
      <nav>${linkList(pickSlice(products, page.rest, 4))}</nav>
      <nav>${linkList(pickSlice(collections, page.rest, 3))}</nav>
      <nav>${linkList(pickSlice(articles, page.rest, 2))}</nav>
    </main>
`;
  if (html.includes('<div id="root"></div>')) {
    return html.replace('<div id="root"></div>', `${block}    <div id="root"></div>`);
  }
  return html.replace(/<body>/i, `<body>\n${block}`);
}

function stampPage(page) {
  let html = built;
  html = setHtmlLang(html, page.htmlLang || 'en');
  html = setTitle(html, page.title);
  html = setNamedMeta(html, 'description', page.description);
  html = setCanonical(html, page.canonicalUrl);
  html = stripHreflang(html);
  html = setNamedMeta(html, 'robots', page.robots);
  if (page.indexed) {
    html = insertHead(html, hreflangBlock(page.rest));
  }
  const schema = jsonLdFor(page);
  if (schema) {
    const tags = (Array.isArray(schema) ? schema : [schema]).map(jsonLdTag).join('\n');
    html = insertHead(html, tags);
  }
  if (page.ogImage) {
    html = setPropertyMeta(html, 'og:image', page.ogImage);
    html = setPropertyMeta(html, 'og:image:type', 'image/webp');
    html = setNamedMeta(html, 'twitter:image', page.ogImage);
    if (page.imageAlt) {
      html = setPropertyMeta(html, 'og:image:alt', page.imageAlt);
      html = setNamedMeta(html, 'twitter:image:alt', page.imageAlt);
    }
  }
  html = insertSeoStatic(html, page);
  return html;
}

function redirectDocument(targetUrl, htmlLang = 'en', heading = 'Continue') {
  let pathname = '/en';
  try {
    pathname = new URL(targetUrl).pathname;
  } catch {
    pathname = targetUrl.replace(SITE, '') || '/en';
  }
  const href = escapeHtml(targetUrl);
  const relative = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const title = escapeHtml(heading);
  return `<!doctype html>
<html lang="${htmlLang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${href}" />
    <meta http-equiv="refresh" content="0;url=${href}" />
    <title>${title}</title>
    <script>location.replace(${JSON.stringify(pathname)}+location.search+location.hash);</script>
  </head>
  <body>
    <h1>${title}</h1>
    <p>This address continues to the current canonical page.</p>
    <p><a href="${escapeHtml(relative)}">Continue to the current page</a></p>
  </body>
</html>
`;
}

function writeSpaShell(absPath, html) {
  mkdirSync(dirname(absPath), { recursive: true });
  writeFileSync(absPath, html);
}

function writeGitHubPage(pathname, html) {
  const parts = pathname.replace(/\/+$/, '').replace(/^\//, '').split('/').filter(Boolean);
  if (parts.length === 0) {
    writeSpaShell(join(distDir, 'index.html'), html);
    return 1;
  }
  writeSpaShell(join(distDir, ...parts, 'index.html'), html);
  return 1;
}

let written = 0;
for (const page of meta.pages) {
  written += writeGitHubPage(page.path, stampPage(page));
}

for (const redirect of meta.redirects ?? []) {
  const targetPage = (meta.pages || []).find(
    (item) => item.url === redirect.targetUrl || item.canonicalUrl === redirect.targetUrl,
  );
  written += writeGitHubPage(
    redirect.path,
    redirectDocument(
      redirect.targetUrl,
      targetPage?.htmlLang || 'en',
      targetPage?.h1 || targetPage?.title || 'Continue',
    ),
  );
}

const rootCanonical = `${SITE}/en/`;
let rootHtml = built;
rootHtml = setCanonical(rootHtml, rootCanonical);
rootHtml = setNamedMeta(rootHtml, 'robots', 'noindex, follow');
rootHtml = stripHreflang(rootHtml);
rootHtml = setTitle(rootHtml, HOME_TITLE);
rootHtml = insertHead(
  rootHtml,
  '<meta http-equiv="refresh" content="0;url=https://pinjinpump.com/en/" />',
);
rootHtml = rootHtml.includes('<div id="root"></div>')
  ? rootHtml.replace(
      '<div id="root"></div>',
      `    <p><a href="/en/">English site</a> <a href="/zh/">中文</a> <a href="/pt/">Português</a> <a href="/ar/">العربية</a> <a href="/ru/">Русский</a></p>\n    <div id="root"></div>`,
    )
  : rootHtml;
writeSpaShell(join(distDir, 'index.html'), rootHtml);

const notFound = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Not Found</title>
  </head>
  <body>
    <h1>Not Found</h1>
    <p>This page does not exist.</p>
  </body>
</html>
`;
writeFileSync(notFoundHtml, notFound);
writeFileSync(join(distDir, '.nojekyll'), '');

const pagesXml = readFileSync(pagesSitemapXml, 'utf8');
const locs = [...pagesXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const uniqueLocs = [...new Set(locs)];
if (uniqueLocs.length < 280 || uniqueLocs.length > 310) {
  console.error(`sitemap-pages.xml loc count ${uniqueLocs.length} (expected ~295, 5 langs)`);
  process.exit(1);
}
const sitemapPaths = uniqueLocs.map((loc) => new URL(loc).pathname);
if (sitemapPaths.some((path) => !path.endsWith('/'))) {
  console.error('sitemap locs must use trailing slashes so GitHub Pages returns HTTP 200');
  process.exit(1);
}
for (const lang of ['en', 'zh', 'pt', 'ar', 'ru']) {
if (!sitemapPaths.some((path) => path === `/${lang}/` || path.startsWith(`/${lang}/`))) {
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

const productShell = join(distDir, 'en', 'products', 'electric-20-concrete-pump', 'index.html');
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

const b500sShell = join(distDir, 'en', 'products', 'b500s-83d-two-stage-pump', 'index.html');
if (!existsSync(b500sShell)) {
  console.error('missing prerendered product shell for /en/products/b500s-83d-two-stage-pump');
  process.exit(1);
}
const b500sHtml = readFileSync(b500sShell, 'utf8');
if (
  !b500sHtml.includes('property="og:image"') ||
  !b500sHtml.includes('/images/products/b500s-83d-two-stage-pump/b500s-83d-two-stage-pump-catalogue.webp')
) {
  console.error('B500S-83D detail shell must stamp og:image to the catalogue sheet');
  process.exit(1);
}
if (b500sHtml.includes('/images/products/b500s-83d-two-stage-pump/b500s-83d-two-stage-pump.webp')) {
  console.error('B500S-83D detail shell must not include the studio machine photo');
  process.exit(1);
}
if (!b500sHtml.includes('og:image:alt') || !b500sHtml.includes('<img src=')) {
  console.error('B500S-83D shell must include image alt and noscript img');
  process.exit(1);
}

const aliasShell = join(distDir, 'en', 'products', 'zs22-25', 'index.html');
if (!existsSync(aliasShell)) {
  console.error('missing redirect shell for /en/products/zs22-25');
  process.exit(1);
}
const aliasHtml = readFileSync(aliasShell, 'utf8');
if (!aliasHtml.includes('name="robots" content="index, follow"')) {
  console.error('legacy product alias must be index, follow with canonical');
  process.exit(1);
}
if (!aliasHtml.includes('rel="canonical"') || !aliasHtml.includes('electric-20-concrete-pump')) {
  console.error('legacy product alias must canonical to the current product URL');
  process.exit(1);
}

const marketsShell = join(distDir, 'en', 'markets', 'index.html');
if (!existsSync(marketsShell)) {
  console.error('missing prerendered /en/markets');
  process.exit(1);
}
const marketsHtml = readFileSync(marketsShell, 'utf8');
if (!marketsHtml.includes('name="robots" content="index, follow"')) {
  console.error('/en/markets must be index, follow');
  process.exit(1);
}
if (!marketsHtml.includes('Target Markets')) {
  console.error('/en/markets must mention Target Markets');
  process.exit(1);
}

const homeShell = join(distDir, 'en', 'index.html');
const homeHtml = readFileSync(homeShell, 'utf8');
const homeTitle = homeHtml.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
if (productTitle === homeTitle) {
  console.error('product title matches home title after prerender');
  process.exit(1);
}
if (existsSync(join(distDir, 'en.html'))) {
  console.error('do not write en.html; it conflicts with en/ on GitHub Pages');
  process.exit(1);
}
if (existsSync(join(distDir, 'en', 'products.html'))) {
  console.error('do not write en/products.html; it conflicts with en/products/');
  process.exit(1);
}
if (!homeHtml.includes('name="robots" content="index, follow"')) {
  console.error('/en/index.html must be index, follow');
  process.exit(1);
}
if (!homeHtml.includes('https://pinjinpump.com/en/"') && !homeHtml.includes("https://pinjinpump.com/en/'")) {
  console.error('/en/index.html must canonical to /en/');
  process.exit(1);
}

const rootOut = readFileSync(join(distDir, 'index.html'), 'utf8');
if (!rootOut.includes('noindex')) {
  console.error('dist/index.html must be noindex');
  process.exit(1);
}
if (!/http-equiv="refresh"/i.test(rootOut)) {
  console.error('dist/index.html must refresh to /en/ so root noindex is intentional');
  process.exit(1);
}
if (!rootOut.includes('href="https://pinjinpump.com/en/"')) {
  console.error('dist/index.html canonical must be https://pinjinpump.com/en/');
  process.exit(1);
}

const notFoundOut = readFileSync(notFoundHtml, 'utf8');
if (!notFoundOut.includes('noindex')) {
  console.error('404.html must be noindex');
  process.exit(1);
}
if (/\/assets\/[^"']+\.js/.test(notFoundOut)) {
  console.error('404.html must not load the SPA bundle');
  process.exit(1);
}
if (/rel="canonical" href="https:\/\/pinjinpump\.com\/en\/?"/.test(notFoundOut)) {
  console.error('404.html must not reuse the homepage canonical');
  process.exit(1);
}

const legacyShell = join(distDir, 'en', 'products', 'concrete-pumps', 'index.html');
if (!existsSync(legacyShell)) {
  console.error('missing legacy redirect shell /en/products/concrete-pumps');
  process.exit(1);
}
const legacyHtml = readFileSync(legacyShell, 'utf8');
if (!legacyHtml.includes('/en/products/electric-concrete-pumps')) {
  console.error('legacy concrete-pumps shell must point at electric-concrete-pumps');
  process.exit(1);
}

const arShell = join(distDir, 'ar', 'products', 'index.html');
if (!existsSync(arShell)) {
  console.error('missing /ar/products SPA shell');
  process.exit(1);
}
const arHtml = readFileSync(arShell, 'utf8');
if (!arHtml.includes('name="robots" content="index, follow"')) {
  console.error('/ar/products must be index, follow');
  process.exit(1);
}
if (!/rel="canonical" href="https:\/\/pinjinpump\.com\/ar\/products\/"/.test(arHtml)) {
  console.error('/ar/products canonical must be self-referencing');
  process.exit(1);
}

function githubLookup(pathname) {
  const parts = pathname.replace(/\/+$/, '').replace(/^\//, '').split('/').filter(Boolean);
  if (parts.length === 0) {
    if (!existsSync(join(distDir, 'index.html'))) {
      console.error('missing dist/index.html');
      process.exit(1);
    }
    return;
  }
  const asHtml = join(distDir, ...parts.slice(0, -1), `${parts[parts.length - 1]}.html`);
  const asIndex = join(distDir, ...parts, 'index.html');
  if (existsSync(asHtml)) {
    console.error(`GitHub Pages conflict file should not exist: ${asHtml}`);
    process.exit(1);
  }
  if (!existsSync(asIndex)) {
    console.error(`no GitHub Pages index.html for ${pathname}`);
    process.exit(1);
  }
}
for (const loc of uniqueLocs) {
  githubLookup(new URL(loc).pathname);
}

console.log(`Wrote ${written} HTML files from ${meta.pages.length} pages + ${(meta.redirects ?? []).length} redirects`);
console.log(`sitemap-pages.xml locs=${uniqueLocs.length} (en+zh+pt+ar+ru)`);
console.log('Wrote dist/404.html as a static HTTP 404 page (no SPA fallback)');
console.log('Wrote dist/.nojekyll');
console.log(
  'Verified dist/sitemap.xml (index), dist/sitemap-pages.xml, dist/image-sitemap.xml, dist/robots.txt',
);
