import { publicImageRev } from '@/data/imageInventory.generated';

/** Append a content hash so browsers and GitHub Pages drop stale same-path images. */
export function withAssetRev(path: string): string {
  if (!path) return path;
  const queryAt = path.indexOf('?');
  const pathname = queryAt >= 0 ? path.slice(0, queryAt) : path;
  const search = queryAt >= 0 ? path.slice(queryAt + 1) : '';
  if (!pathname.startsWith('/images/')) return path;
  const rev = publicImageRev[pathname];
  if (!rev) return path;
  const params = new URLSearchParams(search);
  params.set('v', rev);
  return `${pathname}?${params.toString()}`;
}
