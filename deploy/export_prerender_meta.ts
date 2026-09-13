/**
 * 从真实页面数据导出每条 URL 的 title / description / H1 / robots。
 * 运行：npx vite-node deploy/export_prerender_meta.ts
 * 输出：deploy/prerender-meta.json（copy-spa-404.mjs 写入静态壳时读取）
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  getLanguage,
  indexedLangs,
  languages,
  type Lang,
} from '@/i18n/config';
import { getMessages } from '@/i18n/messages';
import { pick } from '@/i18n/types';
import { seoTemplates } from '@/config/seo';
import {
  categoryMeta,
  productSlugRedirects,
  products,
  productImageAlt,
  type ProductCategory,
} from '@/data/products';
import { categoryHubs } from '@/data/categoryHubs';
import { getBlogPosts } from '@/data/blog';
import { applicationPages } from '@/data/applicationsContent';
import { marketsContent } from '@/data/markets';
import { customMachineryContent } from '@/data/customMachinery';

const SITE = 'https://pinjinpump.com';
const DEFAULT_LASTMOD = '2026-09-07';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outFile = join(root, 'deploy', 'prerender-meta.json');

type PageKind = 'home' | 'product' | 'collection' | 'article' | 'other';

type PageRecord = {
  path: string;
  rest: string;
  lang: Lang;
  url: string;
  canonicalUrl: string;
  title: string;
  description: string;
  h1: string;
  body: string;
  htmlLang: string;
  robots: string;
  indexed: boolean;
  lastmod: string;
  kind: PageKind;
  ogImage?: string;
  imageAlt?: string;
  specs?: Array<{ label: string; value: string }>;
};

type RedirectRecord = {
  path: string;
  target: string;
  url: string;
  targetUrl: string;
};

function loc(lang: Lang, rest: string): string {
  return rest === '/' ? `/${lang}/` : `/${lang}${rest}/`;
}

function tx(text: { en: string } & Partial<Record<Lang, string>>, lang: Lang): string {
  return pick(text, lang);
}

const solutionSlugs = [...new Set(applicationPages.map((item) => item.solutionSlug))];
const posts = getBlogPosts();
const categoryEntries = Object.entries(categoryHubs) as Array<
  [ProductCategory, (typeof categoryHubs)[ProductCategory]]
>;

function pageRests(): string[] {
  return [
    '/',
    '/products',
    ...Object.values(categoryMeta).map((item) => `/products/${item.routeSlug}`),
    '/products/custom-machinery',
    ...products.map((product) => `/products/${product.slug}`),
    '/product-selection-guide',
    '/solutions',
    ...solutionSlugs.map((slug) => `/solutions/${slug}`),
    '/blog',
    ...posts.map((post) => `/blog/${post.slug}`),
    '/resources',
    '/factory',
    '/about',
    '/markets',
    '/faq',
    '/contact',
    '/copyright',
  ];
}

function pageCopy(rest: string, lang: Lang): {
  title: string;
  description: string;
  h1: string;
  lastmod: string;
} {
  const t = getMessages(lang);

  if (rest === '/') {
    return {
      title: t.seo.homeTitle,
      description: t.seo.homeDesc,
      h1: t.seo.homeTitle,
      lastmod: DEFAULT_LASTMOD,
    };
  }
  if (rest === '/products') {
    return {
      title: t.seo.productsTitle,
      description: t.productsPage.subtitle,
      h1: t.productsPage.title,
      lastmod: DEFAULT_LASTMOD,
    };
  }
  if (rest === '/products/custom-machinery') {
    return {
      title: tx(customMachineryContent.title, lang),
      description: tx(customMachineryContent.description, lang),
      h1: tx(customMachineryContent.h1, lang),
      lastmod: DEFAULT_LASTMOD,
    };
  }
  if (rest === '/product-selection-guide') {
    return {
      title: `${t.seo.selectionTitle} | Selection Guide`,
      description: t.seo.selectionDesc,
      h1: `${t.selectionGuide.title} · Selection Guide`,
      lastmod: DEFAULT_LASTMOD,
    };
  }
  if (rest === '/solutions') {
    return {
      title: t.seo.applicationsTitle,
      description: t.seo.solutionsDesc,
      h1: t.seo.applicationsTitle,
      lastmod: DEFAULT_LASTMOD,
    };
  }
  if (rest === '/blog') {
    return {
      title: `${t.seo.blogTitle} | Blog`,
      description: t.seo.blogDesc,
      h1: `${t.seo.blogTitle} · Blog`,
      lastmod: DEFAULT_LASTMOD,
    };
  }
  if (rest === '/resources') {
    return {
      title: `${t.seo.resourcesTitle} | Resources`,
      description: t.seo.resourcesDesc,
      h1: `${t.nav.resources} · Resources`,
      lastmod: DEFAULT_LASTMOD,
    };
  }
  if (rest === '/factory') {
    return {
      title: seoTemplates.factoryTitle,
      description: seoTemplates.factoryDescription,
      h1: seoTemplates.factoryTitle,
      lastmod: DEFAULT_LASTMOD,
    };
  }
  if (rest === '/about') {
    return {
      title: `${t.seo.aboutTitle} | About`,
      description: t.hero.intro,
      h1: `${t.page.whoAreYou} · About`,
      lastmod: DEFAULT_LASTMOD,
    };
  }
  if (rest === '/markets') {
    return {
      title: t.seo.marketsTitle,
      description: t.seo.marketsDesc,
      h1: tx(marketsContent.h1, lang),
      lastmod: DEFAULT_LASTMOD,
    };
  }
  if (rest === '/faq') {
    return {
      title: `${t.seo.faqTitle} | FAQ`,
      description: t.page.faqSubtitle,
      h1: `${t.page.faqHeading} · FAQ`,
      lastmod: DEFAULT_LASTMOD,
    };
  }
  if (rest === '/contact') {
    return {
      title: `${t.seo.contactTitle} | Contact`,
      description: t.contact.sendBody,
      h1: `${t.seo.contactTitle} · Contact`,
      lastmod: DEFAULT_LASTMOD,
    };
  }
  if (rest === '/copyright') {
    return {
      title: `${t.seo.copyrightTitle} | Pinjin Machinery`,
      description: t.copyright.lead.length >= 40 ? t.copyright.lead : `${t.copyright.lead} Image and catalogue copyright for Hebei Pinjin Machinery.`,
      h1: t.copyright.title,
      lastmod: DEFAULT_LASTMOD,
    };
  }

  const hubEntry = categoryEntries.find(
    ([category]) => `/products/${categoryMeta[category].routeSlug}` === rest,
  );
  if (hubEntry) {
    const [, hub] = hubEntry;
    const heading = tx(hub.h1, lang);
    return {
      title: `${heading} | Pinjin Machinery China`,
      description: tx(hub.intro, lang),
      h1: heading,
      lastmod: DEFAULT_LASTMOD,
    };
  }

  const product = products.find((item) => `/products/${item.slug}` === rest);
  if (product) {
    return {
      title: tx(product.seo.title, lang),
      description: tx(product.seo.description, lang),
      h1: tx(product.name, lang),
      lastmod: DEFAULT_LASTMOD,
    };
  }

  const post = posts.find((item) => `/blog/${item.slug}` === rest);
  if (post) {
    const title = post.seoTitle
      ? tx(post.seoTitle, lang)
      : seoTemplates.blogTitle(tx(post.title, lang));
    return {
      title,
      description: tx(post.description, lang),
      h1: tx(post.title, lang),
      lastmod: post.dateModified ?? post.date ?? DEFAULT_LASTMOD,
    };
  }

  const solution = applicationPages.find(
    (item) => `/solutions/${item.solutionSlug}` === rest,
  );
  if (solution) {
    const heading = tx(solution.title, lang);
    return {
      title: `${heading} | Pinjin Machinery`,
      description: tx(solution.summary, lang),
      h1: heading,
      lastmod: DEFAULT_LASTMOD,
    };
  }

  throw new Error(`No prerender copy for ${rest}`);
}

function pageKind(rest: string): PageKind {
  if (rest === '/') return 'home';
  if (products.some((item) => rest === `/products/${item.slug}`)) return 'product';
  if (posts.some((item) => rest === `/blog/${item.slug}`)) return 'article';
  if (
    rest === '/products' ||
    rest === '/solutions' ||
    rest === '/blog' ||
    rest === '/markets' ||
    rest === '/products/custom-machinery' ||
    Object.values(categoryMeta).some((item) => rest === `/products/${item.routeSlug}`) ||
    applicationPages.some((item) => rest === `/solutions/${item.solutionSlug}`)
  ) {
    return 'collection';
  }
  return 'other';
}

function uniquify(pages: PageRecord[], key: 'title' | 'description') {
  const counts = new Map<string, number>();
  for (const page of pages) counts.set(page[key], (counts.get(page[key]) || 0) + 1);
  for (const page of pages) {
    if ((counts.get(page[key]) || 0) > 1) {
      const suffix = ` · ${page.lang}`;
      const next = `${page[key]}${suffix}`;
      page[key] = key === 'title' && next.length > 70 ? `${page[key].slice(0, Math.max(12, 70 - suffix.length))}${suffix}` : next;
    }
  }
  const again = new Map<string, number>();
  for (const page of pages) again.set(page[key], (again.get(page[key]) || 0) + 1);
  for (const page of pages) {
    if ((again.get(page[key]) || 0) > 1) {
      const suffix = ` · ${page.lang}${page.rest}`;
      const next = `${page[key]}${suffix}`;
      page[key] = key === 'title' && next.length > 70 ? `${page.h1.slice(0, 40)}${suffix}` : next;
    }
  }
}

const legacyRestRedirects: Array<[string, string]> = [
  ['/products/category/electric-concrete-pumps', '/products/electric-concrete-pumps'],
  ['/products/category/diesel-concrete-pumps', '/products/diesel-concrete-pumps'],
  ['/products/category/mixer-pumps', '/products/mixer-pumps'],
  ['/products/category/concrete-pump-parts', '/products/concrete-pump-parts'],
  ['/products/concrete-pumps', '/products/electric-concrete-pumps'],
  ['/products/concrete-pump', '/products/electric-concrete-pumps'],
  ['/products/spraying-machines', '/products'],
  ['/products/material-handling', '/products'],
  ['/products/rebar-equipment', '/products'],
  ['/products/concrete-spraying-machine', '/products'],
  ['/products/concrete-mixing-plant', '/products/electric-concrete-pumps'],
  ['/cases', '/solutions'],
  ['/cases/construction', '/solutions/construction'],
  ['/cases/infrastructure', '/solutions/infrastructure'],
  ['/cases/spraying', '/solutions/spraying'],
  ['/cases/industrial-projects', '/solutions/industrial-projects'],
  ['/cases/building-construction', '/solutions/construction'],
  ['/cases/infrastructure-projects', '/solutions/infrastructure'],
  ['/cases/spraying-applications', '/solutions/spraying'],
  ['/cases/material-handling', '/solutions/industrial-projects'],
  ['/applications', '/solutions'],
  ['/company', '/about'],
  ['/company/factory', '/factory'],
  ['/company/manufacturing-capability', '/factory'],
  ['/resources/blog', '/blog'],
  ['/resources/blog/xingjiawan-concrete-machinery', '/factory'],
  ['/resources/downloads', '/resources'],
];

const restCanonical = new Map<string, string>();
for (const rest of pageRests()) {
  restCanonical.set(rest, rest);
}
for (const [from, to] of legacyRestRedirects) {
  restCanonical.set(from, to);
}
for (const [from, to] of Object.entries(productSlugRedirects)) {
  restCanonical.set(`/products/${from}`, `/products/${to}`);
}

const pages: PageRecord[] = [];
for (const lang of languages.map((item) => item.code)) {
  const indexed = true;
  const meta = getLanguage(lang);
  for (const rest of pageRests()) {
    const copy = pageCopy(rest, lang);
    const path = loc(lang, rest);
    const product = products.find((item) => rest === `/products/${item.slug}`);
    const kind = pageKind(rest);
    const specRows = product
      ? product.specifications.slice(0, 8).map((item) => ({
          label: tx(item.label, lang),
          value: tx(item.value, lang),
        }))
      : undefined;
    const extra =
      product
        ? `${tx(product.productIntroduction, lang)} ${specRows?.map((item) => `${item.label} ${item.value}`).join(' ') || ''}`
        : copy.description;
    pages.push({
      path,
      rest,
      lang,
      url: `${SITE}${path}`,
      canonicalUrl: `${SITE}${path}`,
      title: copy.title,
      description: copy.description,
      h1: copy.h1,
      body: `${copy.h1}. ${extra} Page ${path}.`,
      htmlLang: meta.htmlLang,
      robots: 'index, follow',
      indexed,
      lastmod: copy.lastmod,
      kind,
      specs: specRows,
      ogImage: product
        ? `${SITE}${product.gallery[0] ?? product.image}`
        : undefined,
      imageAlt: product
        ? productImageAlt(product, product.gallery[0] ?? product.image, lang)
        : undefined,
    });
  }
}

const redirects: RedirectRecord[] = [];
const redirectSeen = new Set<string>();

function addRedirect(path: string, target: string) {
  if (path === target || redirectSeen.has(path)) return;
  redirectSeen.add(path);
  redirects.push({
    path,
    target,
    url: `${SITE}${path}`,
    targetUrl: `${SITE}${target}`,
  });
}

for (const lang of languages.map((item) => item.code)) {
  for (const [from, to] of restCanonical) {
    if (from === to) continue;
    addRedirect(loc(lang, from), loc(lang, to));
  }
}

for (const [from, to] of restCanonical) {
  if (from === '/') continue;
  addRedirect(from, loc('en', to));
}

const payload = {
  generatedAt: new Date().toISOString().slice(0, 10),
  site: SITE,
  defaultLastmod: DEFAULT_LASTMOD,
  indexedLangs: [...indexedLangs],
  allLangs: languages.map((item) => item.code),
  hreflang: Object.fromEntries(
    indexedLangs.map((code) => [code, getLanguage(code).hreflang]),
  ),
  pages,
  redirects,
};

uniquify(pages, 'title');
uniquify(pages, 'description');

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

const indexedPages = pages.filter((page) => page.indexed).length;
console.log(
  `wrote ${outFile.replace(root + '\\', '').replace(root + '/', '')} ` +
    `pages=${pages.length} indexed=${indexedPages} redirects=${redirects.length}`,
);
