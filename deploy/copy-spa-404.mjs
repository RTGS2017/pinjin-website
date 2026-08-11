/**
 * GitHub Pages has no Nginx try_files; unknown paths serve 404.html.
 * Copy index.html → 404.html so SPA deep links work on refresh.
 */
import { copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const indexHtml = join(root, 'dist', 'index.html');
const notFoundHtml = join(root, 'dist', '404.html');

if (!existsSync(indexHtml)) {
  console.error('dist/index.html not found; run vite build first');
  process.exit(1);
}

copyFileSync(indexHtml, notFoundHtml);
console.log('Copied dist/index.html → dist/404.html');
