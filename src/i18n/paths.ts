import { defaultLang, isLang, type Lang } from './config';

/**
 * 去掉路径中的语言前缀，得到「页面路径」。
 * `/en/products` → `/products`；`/zh` → `/`
 */
export function stripLangFromPath(pathname: string): string {
  const clean = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const segments = clean.split('/').filter(Boolean);
  if (segments.length === 0) return '/';
  if (!isLang(segments[0])) return clean === '' ? '/' : clean;
  const rest = segments.slice(1).join('/');
  return rest ? `/${rest}` : '/';
}

/**
 * 为页面路径加上语言前缀（可含 hash）。
 * `products` / `/products` / `/en/products` → `/{lang}/products`
 */
export function localePath(path: string, lang: Lang = defaultLang): string {
  if (!path || path === '/') return `/${lang}`;

  const hashIndex = path.indexOf('#');
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : '';
  const withoutHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const searchIndex = withoutHash.indexOf('?');
  const search = searchIndex >= 0 ? withoutHash.slice(searchIndex) : '';
  const pathnameOnly =
    searchIndex >= 0 ? withoutHash.slice(0, searchIndex) : withoutHash;

  const pagePath = stripLangFromPath(
    pathnameOnly.startsWith('/') ? pathnameOnly : `/${pathnameOnly}`,
  );

  if (pagePath === '/') return `/${lang}${search}${hash}`;
  return `/${lang}${pagePath}${search}${hash}`;
}

/** 解析当前浏览器路径中的语言；无效则返回默认语言 */
export function detectLangFromPath(pathname: string): Lang {
  const first = pathname.split('/').filter(Boolean)[0];
  return isLang(first) ? first : defaultLang;
}
