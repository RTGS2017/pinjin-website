/**
 * GitHub Pages has no Nginx try_files; unknown paths serve 404.html.
 * Copy index.html → 404.html so SPA deep links work on refresh.
 * Also write .nojekyll so GitHub Pages does not run Jekyll on dist.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');
const indexHtml = join(distDir, 'index.html');
const notFoundHtml = join(distDir, '404.html');
/** 与 src/i18n/config.ts 的 languages.code 保持一致 */
const LANGS = ['en', 'zh', 'pt', 'ar', 'ru'];

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

copyFileSync(indexHtml, notFoundHtml);
writeFileSync(join(distDir, '.nojekyll'), '');
for (const lang of LANGS) {
  const dir = join(distDir, lang);
  mkdirSync(dir, { recursive: true });
  copyFileSync(indexHtml, join(dir, 'index.html'));
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

console.log('Copied dist/index.html → dist/404.html');
console.log(`Copied dist/index.html → dist/{${LANGS.join(',')}}/index.html`);
console.log('Wrote dist/.nojekyll');
console.log(
  'Verified dist/sitemap.xml (index), dist/sitemap-pages.xml, dist/image-sitemap.xml, dist/robots.txt',
);
