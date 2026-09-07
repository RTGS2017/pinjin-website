import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const script = join(dirname(fileURLToPath(import.meta.url)), 'generate_sitemaps.py');
const bins = process.platform === 'win32' ? ['python', 'py'] : ['python3', 'python'];

for (const bin of bins) {
  const result = spawnSync(bin, [script], { stdio: 'inherit' });
  if (result.error && result.error.code === 'ENOENT') continue;
  if (result.status === 0) process.exit(0);
}

console.error('Could not run generate_sitemaps.py with python3/python/py');
process.exit(1);
