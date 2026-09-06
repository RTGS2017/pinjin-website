/**
 * GitHub Pages has no Nginx try_files; unknown paths serve 404.html.
 *
 * 1. Copy index.html → 404.html so a missed deep link still boots the SPA.
 *    404.html is noindex so Google does not treat those as the homepage.
 * 2. Materialize a real HTML file for every URL in sitemap-pages.xml so
 *    product/blog/locale paths return HTTP 200 instead of 404.
 * 3. Write both `path.html` and `path/index.html` so `/path` and `/path/` work.
 * 4. Stamp the matching canonical on each copy (static index.html otherwise
 *    claims every URL is https://pinjinpump.com/en/).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');
const indexHtml = join(distDir, 'index.html');
const notFoundHtml = join(distDir, '404.html');
const SITE = 'https://pinjinpump.com';

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

function htmlForCanonical(canonical) {
  let html = built;
  if (/<link rel="canonical" href="[^"]*"\s*\/?>/.test(html)) {
    html = html.replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${canonical}" />`,
    );
  } else {
    html = html.replace(
      '</head>',
      `    <link rel="canonical" href="${canonical}" />\n  </head>`,
    );
  }
  return html;
}

function writeSpaShell(absPath, html) {
  mkdirSync(dirname(absPath), { recursive: true });
  writeFileSync(absPath, html);
}

const pagesXml = readFileSync(pagesSitemapXml, 'utf8');
const locs = [...pagesXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const uniqueLocs = [...new Set(locs)];
if (uniqueLocs.length < 10) {
  console.error(`sitemap-pages.xml has too few <loc> entries: ${uniqueLocs.length}`);
  process.exit(1);
}

let written = 0;
for (const loc of uniqueLocs) {
  let pathname;
  try {
    const url = new URL(loc);
    if (url.origin !== SITE) {
      console.error(`sitemap loc is not on ${SITE}: ${loc}`);
      process.exit(1);
    }
    pathname = url.pathname;
  } catch {
    console.error(`invalid sitemap loc: ${loc}`);
    process.exit(1);
  }

  const canonical = `${SITE}${pathname.replace(/\/+$/, '') || '/'}`;
  const html = htmlForCanonical(canonical);
  const rel = pathname.replace(/^\//, '').replace(/\/+$/, '');
  const parts = rel ? rel.split('/').filter(Boolean) : [];

  if (parts.length === 0) {
    writeSpaShell(join(distDir, 'index.html'), html);
    written += 1;
    continue;
  }

  writeSpaShell(join(distDir, ...parts, 'index.html'), html);
  written += 1;
  writeSpaShell(join(distDir, ...parts.slice(0, -1), `${parts[parts.length - 1]}.html`), html);
  written += 1;
}

const notFound = built.replace(
  '</head>',
  '    <meta name="robots" content="noindex" />\n  </head>',
);
writeFileSync(notFoundHtml, notFound);
writeFileSync(join(distDir, '.nojekyll'), '');

console.log(`Wrote ${written} SPA HTML shells from ${uniqueLocs.length} sitemap URLs`);
console.log('Copied dist/index.html → dist/404.html (noindex)');
console.log('Wrote dist/.nojekyll');
console.log(
  'Verified dist/sitemap.xml (index), dist/sitemap-pages.xml, dist/image-sitemap.xml, dist/robots.txt',
);
