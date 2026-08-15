/**
 * GitHub Pages has no Nginx try_files; unknown paths serve 404.html.
 * Copy index.html → 404.html so SPA deep links work on refresh.
 * Also write .nojekyll so GitHub Pages does not run Jekyll on dist.
 */
import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');
const indexHtml = join(distDir, 'index.html');
const notFoundHtml = join(distDir, '404.html');

if (!existsSync(indexHtml)) {
  console.error('dist/index.html not found; run vite build first');
  process.exit(1);
}

copyFileSync(indexHtml, notFoundHtml);
writeFileSync(join(distDir, '.nojekyll'), '');
console.log('Copied dist/index.html → dist/404.html');
console.log('Wrote dist/.nojekyll');
