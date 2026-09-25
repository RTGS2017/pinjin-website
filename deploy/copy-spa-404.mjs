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
 * 5. Do not write legacy / alias / unprefixed HTML shells. Those paths are
 *    HTTP 404 (static 404.html, noindex). Only language UI routes are indexed.
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

const sourceHtml = readFileSync(indexHtml, 'utf8');
if (sourceHtml.includes('%BASE_URL%')) {
  console.error('dist/index.html still contains %BASE_URL%; this is not a Vite production build');
  process.exit(1);
}
if (sourceHtml.includes('/pinjin-website/')) {
  console.error('dist/index.html still contains /pinjin-website/; Vite base must be /');
  process.exit(1);
}
if (!/\/assets\/[^"']+\.js/.test(sourceHtml)) {
  console.error('dist/index.html has no hashed /assets/*.js; refusing to deploy source HTML');
  process.exit(1);
}
const built = stripRefresh(sourceHtml);

const sitemapXml = join(distDir, 'sitemap.xml');
const imageSitemapXml = join(distDir, 'image-sitemap.xml');
const robotsTxt = join(distDir, 'robots.txt');
for (const file of [sitemapXml, imageSitemapXml, robotsTxt]) {
  if (!existsSync(file)) {
    console.error(`${file} missing; Vite must copy public/ into dist/`);
    process.exit(1);
  }
}
if (existsSync(join(distDir, 'sitemap-pages.xml'))) {
  console.error('extra sitemap must not ship: sitemap-pages.xml');
  process.exit(1);
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
assertXmlSitemap(sitemapXml, 'urlset');
if (readFileSync(sitemapXml, 'utf8').includes('<sitemapindex')) {
  console.error('sitemap.xml must be a page urlset, not a sitemap index');
  process.exit(1);
}
assertXmlSitemap(imageSitemapXml, 'urlset');
const imageXml = readFileSync(imageSitemapXml, 'utf8');
if (
  !imageXml.includes('xmlns:image') ||
  !imageXml.includes('/images/products/b500s-83d-two-stage-pump/b500s-83d-two-stage-pump.webp') ||
  imageXml.includes('-catalogue.webp') ||
  imageXml.includes('/catalog.webp')
) {
  console.error('image-sitemap.xml must list B500S-83D studio photo and must not list catalogue sheets');
  process.exit(1);
}
const robotsText = readFileSync(robotsTxt, 'utf8');
if (!robotsText.includes('Sitemap: https://pinjinpump.com/sitemap.xml')) {
  console.error('dist/robots.txt must point Google to https://pinjinpump.com/sitemap.xml');
  process.exit(1);
}
if (!robotsText.includes('Sitemap: https://pinjinpump.com/image-sitemap.xml')) {
  console.error('dist/robots.txt must also point Google to https://pinjinpump.com/image-sitemap.xml');
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
if (Array.isArray(meta.redirects) && meta.redirects.length > 0) {
  console.error(
    `prerender-meta.json still lists ${meta.redirects.length} redirect shells; leave redirects empty`,
  );
  process.exit(1);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function stripRefresh(html) {
  return html.replace(/<meta[^>]*http-equiv=["']refresh["'][^>]*>\s*/gi, '');
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

function hreflangBlock(page) {
  const map = meta.hreflang ?? {
    en: 'en',
    zh: 'zh-CN',
    pt: 'pt',
    ar: 'ar',
    ru: 'ru',
  };
  const rest = page.rest;
  const langs = [
    ...new Set(
      (meta.pages || [])
        .filter((item) => item.rest === rest && item.indexed)
        .map((item) => item.lang),
    ),
  ];
  const list = langs.length ? langs : (meta.indexedLangs ?? ['en', 'zh']);
  const lines = list.map((lang) => {
    const path = rest === '/' ? `/${lang}/` : `/${lang}${rest}/`;
    const hl = map[lang] || lang;
    return `    <link rel="alternate" hreflang="${hl}" href="${SITE}${path}" />`;
  });
  const defaultLang = list.includes('en') ? 'en' : list[0];
  const defaultPath = rest === '/' ? `/${defaultLang}/` : `/${defaultLang}${rest}/`;
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

function productOfferJsonLd(page) {
  // Catalogue has no published EXW / list price. Do not invent price, review, or rating.
  return {
    '@type': 'Offer',
    url: page.canonicalUrl,
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    seller: {
      '@type': 'Organization',
      name: 'Hebei Pinjin Machinery Manufacturing Co., Ltd.',
      url: SITE,
    },
  };
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
      manufacturer: {
        '@type': 'Organization',
        name: 'Hebei Pinjin Machinery Manufacturing Co., Ltd.',
        url: SITE,
      },
      additionalProperty: (page.specs || []).map((spec) => ({
        '@type': 'PropertyValue',
        name: spec.label,
        value: spec.value,
      })),
      offers: productOfferJsonLd(page),
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
  const hubs = siblings.filter((item) =>
    ['/', '/products', '/solutions', '/blog', '/factory', '/about', '/markets', '/faq', '/contact', '/resources', '/product-selection-guide', '/copyright'].includes(item.rest),
  );
  const products = siblings.filter((item) => item.kind === 'product' && item.path !== page.path);
  const articles = siblings.filter((item) => item.kind === 'article' && item.path !== page.path);
  const collections = siblings.filter((item) => item.kind === 'collection' && item.path !== page.path);
  const categoryProducts = products.filter((item) => item.categoryRest === page.rest);
  let productNav = pickSlice(products, page.rest, 4);
  if (page.rest === '/' || page.rest === '/products') {
    productNav = products;
  } else if (page.kind === 'collection' && categoryProducts.length) {
    productNav = categoryProducts;
  }
  const collectionNav =
    page.rest === '/' || page.rest === '/solutions' || page.rest === '/products'
      ? collections
      : pickSlice(collections, page.rest, 3);
  const articleNav = page.rest === '/blog' ? articles : pickSlice(articles, page.rest, 2);
  const langs = (meta.allLangs || ['en', 'zh', 'pt', 'ar', 'ru']).map((lang) => {
    const path = page.rest === '/' ? `/${lang}/` : `/${lang}${page.rest}/`;
    return `<a href="${escapeHtml(path)}">${escapeHtml(lang)}</a>`;
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
      <nav>${linkList(productNav)}</nav>
      <nav>${linkList(collectionNav)}</nav>
      <nav>${linkList(articleNav)}</nav>
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
    html = insertHead(html, hreflangBlock(page));
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

const rootCanonical = `${SITE}/en/`;
let rootHtml = built;
rootHtml = setCanonical(rootHtml, rootCanonical);
// GitHub Pages cannot emit HTTP 301. Canonical + refresh without noindex is the
// closest signal: Google can consolidate `/` into `/en/` instead of dropping both.
rootHtml = setNamedMeta(rootHtml, 'robots', 'index, follow');
rootHtml = stripHreflang(rootHtml);
rootHtml = setTitle(rootHtml, HOME_TITLE);
if (!/http-equiv="refresh"/i.test(rootHtml)) {
  rootHtml = insertHead(
    rootHtml,
    '<meta http-equiv="refresh" content="0;url=https://pinjinpump.com/en/" />',
  );
}
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

const pagesXml = readFileSync(sitemapXml, 'utf8');
const locs = [...pagesXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const uniqueLocs = [...new Set(locs)];
if (uniqueLocs.length < 130 || uniqueLocs.length > 220) {
  console.error(`sitemap.xml loc count ${uniqueLocs.length} (expected ~182, en+zh plus EN-only sourced blogs)`);
  process.exit(1);
}
const sitemapPaths = uniqueLocs.map((loc) => new URL(loc).pathname);
if (sitemapPaths.some((path) => !path.endsWith('/'))) {
  console.error('sitemap locs must use trailing slashes so GitHub Pages returns HTTP 200');
  process.exit(1);
}
if (sitemapPaths.some((path) => path.startsWith('/pt/') || path.startsWith('/ar/') || path.startsWith('/ru/'))) {
  console.error('sitemap.xml must not list pt/ar/ru until those locales have independent copy');
  process.exit(1);
}
const zhBlogArticles = sitemapPaths.filter((path) => /^\/zh\/blog\/.+/.test(path));
if (zhBlogArticles.length > 0) {
  console.error(`sitemap.xml must not list zh blog articles: ${zhBlogArticles.slice(0, 5).join(', ')}`);
  process.exit(1);
}
const enBlogArticles = sitemapPaths.filter((path) => /^\/en\/blog\/.+/.test(path));
if (enBlogArticles.length < 20) {
  console.error(`sitemap.xml expected EN blog articles, got ${enBlogArticles.length}`);
  process.exit(1);
}
if (!sitemapPaths.includes('/en/blog/concrete-pump-priming-grout-lubrication/')) {
  console.error('sitemap.xml missing new EN blog /en/blog/concrete-pump-priming-grout-lubrication/');
  process.exit(1);
}
for (const lang of ['en', 'zh']) {
if (!sitemapPaths.some((path) => path === `/${lang}/` || path.startsWith(`/${lang}/`))) {
    console.error(`sitemap.xml missing ${lang} URLs`);
    process.exit(1);
  }
}
for (const token of ['hreflang="en"', 'hreflang="zh-CN"', 'hreflang="x-default"']) {
  if (!pagesXml.includes(token)) {
    console.error(`sitemap.xml missing ${token}`);
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
if (!productHtml.includes('hreflang="zh-CN"') || !productHtml.includes('hreflang="en"') || !productHtml.includes('hreflang="x-default"')) {
  console.error('product shell missing en/zh hreflang cluster');
  process.exit(1);
}
if (
  /rel="alternate"[^>]*hreflang="(?:ar|pt|ru)"/i.test(productHtml) ||
  /hreflang="(?:ar|pt|ru)"[^>]*rel="alternate"/i.test(productHtml)
) {
  console.error('indexed product shell must not advertise ar/pt/ru hreflang until those locales have independent copy');
  process.exit(1);
}
if (!productHtml.includes('catalogue row') && !productHtml.includes('目录行')) {
  console.error('English product shell must include the catalogue-row uniqueness sentence');
  process.exit(1);
}

const product30Shell = join(distDir, 'en', 'products', 'electric-30-concrete-pump', 'index.html');
const product30Html = readFileSync(product30Shell, 'utf8');
const product30Title = product30Html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
if (!product30Title || product30Title === productTitle) {
  console.error(`Electric 30 title must differ from Electric 20: ${product30Title}`);
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
  !b500sHtml.includes('/images/products/b500s-83d-two-stage-pump/b500s-83d-two-stage-pump.webp')
) {
  console.error('B500S-83D detail shell must stamp og:image to the studio machine photo');
  process.exit(1);
}
if (b500sHtml.includes('b500s-83d-two-stage-pump-catalogue.webp') || b500sHtml.includes('/catalog.webp')) {
  console.error('B500S-83D detail shell must not include a catalogue sheet');
  process.exit(1);
}
if (!b500sHtml.includes('og:image:alt') || !b500sHtml.includes('<img src=')) {
  console.error('B500S-83D shell must include image alt and noscript img');
  process.exit(1);
}

function parseLdScripts(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(
    (match) => JSON.parse(match[1]),
  );
}

function githubIndexHtml(pathname) {
  const parts = pathname.replace(/\/+$/, '').replace(/^\//, '').split('/').filter(Boolean);
  return join(distDir, ...parts, 'index.html');
}

const productPages = (meta.pages || []).filter((page) => page.kind === 'product');
if (productPages.length < 20) {
  console.error(`too few product pages in prerender-meta: ${productPages.length}`);
  process.exit(1);
}
for (const page of productPages) {
  const html = readFileSync(githubIndexHtml(page.path), 'utf8');
  const product = parseLdScripts(html).find((schema) => schema['@type'] === 'Product');
  if (!product) {
    console.error(`missing Product JSON-LD: ${page.path}`);
    process.exit(1);
  }
  const offer = product.offers;
  if (!offer || offer['@type'] !== 'Offer' || !offer.url || !offer.availability) {
    console.error(`Product JSON-LD missing Offer url/availability: ${page.path}`);
    process.exit(1);
  }
  if (product.review || product.aggregateRating) {
    console.error(`do not add review/aggregateRating to Product: ${page.path}`);
    process.exit(1);
  }
}
const sampleArticle = (meta.pages || []).find((page) => page.kind === 'article');
if (sampleArticle) {
  const articleHtml = readFileSync(githubIndexHtml(sampleArticle.path), 'utf8');
  const articleSchemas = parseLdScripts(articleHtml);
  if (articleSchemas.some((schema) => schema['@type'] === 'Product' || schema.offers)) {
    console.error(`article JSON-LD must not include Product offers: ${sampleArticle.path}`);
    process.exit(1);
  }
}

const gone = [
  ['applications'],
  ['about'],
  ['company'],
  ['products'],
  ['cases'],
  ['en', 'applications'],
  ['en', 'company'],
  ['en', 'cases'],
  ['en', 'products', 'zs22-25'],
  ['en', 'products', 'concrete-pumps'],
  ['en', 'products', 'category', 'electric-concrete-pumps'],
  ['ar', 'applications'],
  ['ar', 'cases', 'spraying-applications'],
  ['ar', 'products', '13-spiral-feeder'],
  ['ar', 'products', '4102-diesel-four-cylinder-inclined-pump'],
];
for (const parts of gone) {
  const stale = join(distDir, ...parts, 'index.html');
  if (existsSync(stale)) {
    console.error(`legacy shell must not exist: /${parts.join('/')}/`);
    process.exit(1);
  }
}

const aboutShell = join(distDir, 'en', 'about', 'index.html');
const aboutHtml = readFileSync(aboutShell, 'utf8');
if (aboutHtml.includes('href="/about/"') || aboutHtml.includes('href="/en/company/"')) {
  console.error('/en/about must not link removed unprefixed or alias paths');
  process.exit(1);
}
const productsIndex = readFileSync(join(distDir, 'en', 'products', 'index.html'), 'utf8');
if (!productsIndex.includes('/en/products/electric-20-concrete-pump/') || !productsIndex.includes('/en/products/b500s-83d-two-stage-pump/') || !productsIndex.includes('/en/products/hydraulic-concrete-spraying-machine/') || !productsIndex.includes('/en/products/type-311-mortar-spraying-machine/') || !productsIndex.includes('/en/products/spraying-machines/')) {
  console.error('/en/products must list current product URLs in the static graph');
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
if (/name="robots" content="noindex/i.test(rootOut)) {
  console.error('dist/index.html must not noindex; GitHub Pages cannot 301 `/` to `/en/`');
  process.exit(1);
}
if (!/http-equiv="refresh"/i.test(rootOut)) {
  console.error('dist/index.html must refresh to /en/');
  process.exit(1);
}
if (!rootOut.includes('href="https://pinjinpump.com/en/"')) {
  console.error('dist/index.html canonical must be https://pinjinpump.com/en/');
  process.exit(1);
}
if (productTitle.includes(' · en') || productTitle.includes(' · zh')) {
  console.error(`product title still has machine lang suffix: ${productTitle}`);
  process.exit(1);
}
if (/http-equiv="refresh"/i.test(productHtml)) {
  console.error('product shells must not inherit the root meta refresh to /en/');
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

const arShell = join(distDir, 'ar', 'products', 'index.html');
if (!existsSync(arShell)) {
  console.error('missing /ar/products SPA shell');
  process.exit(1);
}
const arHtml = readFileSync(arShell, 'utf8');
if (!arHtml.includes('name="robots" content="noindex, follow"')) {
  console.error('/ar/products must be noindex until Arabic product copy is independent');
  process.exit(1);
}
if (!/rel="canonical" href="https:\/\/pinjinpump\.com\/ar\/products\/"/.test(arHtml)) {
  console.error('/ar/products canonical must be self-referencing');
  process.exit(1);
}

const primingEn = join(distDir, 'en', 'blog', 'concrete-pump-priming-grout-lubrication', 'index.html');
if (!existsSync(primingEn)) {
  console.error('missing EN blog shell /en/blog/concrete-pump-priming-grout-lubrication/');
  process.exit(1);
}
const primingEnHtml = readFileSync(primingEn, 'utf8');
if (!primingEnHtml.includes('name="robots" content="index, follow"')) {
  console.error('EN sourced blog must be index, follow');
  process.exit(1);
}
if (!/rel="canonical" href="https:\/\/pinjinpump\.com\/en\/blog\/concrete-pump-priming-grout-lubrication\/"/.test(primingEnHtml)) {
  console.error('EN sourced blog canonical must be the English URL');
  process.exit(1);
}

const primingZh = join(distDir, 'zh', 'blog', 'concrete-pump-priming-grout-lubrication', 'index.html');
if (!existsSync(primingZh)) {
  console.error('missing ZH blog shell /zh/blog/concrete-pump-priming-grout-lubrication/');
  process.exit(1);
}
const primingZhHtml = readFileSync(primingZh, 'utf8');
if (!primingZhHtml.includes('name="robots" content="noindex, follow"')) {
  console.error('ZH sourced blog must be noindex, follow');
  process.exit(1);
}
if (!/rel="canonical" href="https:\/\/pinjinpump\.com\/en\/blog\/concrete-pump-priming-grout-lubrication\/"/.test(primingZhHtml)) {
  console.error('ZH sourced blog canonical must point to the English URL');
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

console.log(`Wrote ${written} HTML files from ${meta.pages.length} UI pages (no legacy shells)`);
console.log(`Verified Product Offer JSON-LD on ${productPages.length} product pages (all langs)`);
console.log(`sitemap.xml locs=${uniqueLocs.length} (en+zh pages; image-sitemap.xml kept)`);
console.log('Wrote dist/404.html as a static HTTP 404 page (no SPA fallback)');
console.log('Wrote dist/.nojekyll');
console.log('Verified dist/sitemap.xml, dist/image-sitemap.xml, dist/robots.txt');
