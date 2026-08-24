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
const LANGS = ['en', 'zh', 'pt', 'ar'];

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
console.log('Copied dist/index.html → dist/404.html');
console.log(`Copied dist/index.html → dist/{${LANGS.join(',')}}/index.html`);
console.log('Wrote dist/.nojekyll');
