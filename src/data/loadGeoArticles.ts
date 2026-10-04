import type { BlogCategory, BlogPost, BlogRelatedPath, BlogSection } from '@/data/blog';
import type { BlogResourceType, SourcedReference } from '@/data/sourced/types';
import { getProductBySlug } from '@/data/products';

type Pair = { en?: string; zh?: string };

type GeoArticle = {
  slug?: string;
  category?: string;
  date?: string;
  keyword?: string | Pair;
  title?: Pair;
  description?: Pair;
  directAnswer?: Pair;
  sections?: Array<{ heading?: Pair; body?: Pair }>;
  faqs?: Array<{ question?: Pair; answer?: Pair }>;
  image?: { src?: string; alt?: Pair } | null;
  relatedPaths?: Array<string | { href?: string; label?: Pair }>;
  sources?: Array<string | { url?: string }>;
};

const KNOWLEDGE = { category: 'manufacturing-knowledge' as const, resourceType: 'technical-reference' as const };
const BUYING = { category: 'industry-guide' as const, resourceType: 'procurement-guide' as const };
const APPLICATION = { category: 'application-solutions' as const, resourceType: 'application-guide' as const };
const PARTS = { category: 'product-guide' as const, resourceType: 'parts-guide' as const };

const CATEGORY: Record<string, { category: BlogCategory; resourceType: BlogResourceType }> = {
  knowledge: KNOWLEDGE,
  'knowledge-b': KNOWLEDGE,
  buying: BUYING,
  'buying-b': BUYING,
  application: APPLICATION,
  applications: APPLICATION,
  'applications-b': APPLICATION,
  parts: PARTS,
  'parts-b': PARTS,
};

const jsonModules = import.meta.glob<GeoArticle>(
  '../../content/geo-articles/*/*.json',
  { eager: true, import: 'default' },
);

function text(value: unknown): string {
  return (typeof value === 'string' ? value : '').replace(/\s+/g, ' ').trim();
}

function pair(value: Pair | undefined, fallback = ''): { en: string; zh: string } {
  const en = text(value?.en) || fallback;
  const zh = text(value?.zh) || en;
  return { en, zh };
}

function publishedDate(value: unknown): string {
  const raw = text(value);
  return /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : '2026-10-03';
}

function keywordText(value: GeoArticle['keyword']): { en: string; zh: string } {
  if (!value) return { en: '', zh: '' };
  if (typeof value === 'string') return { en: text(value), zh: text(value) };
  return pair(value);
}

function metaDescription(answer: string, title: string): string {
  const source = answer.length >= 80 ? answer : title;
  if (source.length <= 170) return source;
  const cut = source.slice(0, 167);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

function pagePath(raw: unknown): string | null {
  const value =
    typeof raw === 'string'
      ? raw
      : raw && typeof raw === 'object' && 'href' in raw
        ? String((raw as { href?: unknown }).href ?? '')
        : '';
  let path = value.trim().replace(/^https?:\/\/pinjinpump\.com/i, '');
  path = path.replace(/^\/(en|zh|pt|ar|ru)(?=\/)/, '');
  if (!path.startsWith('/')) return null;
  path = path.split('?')[0]?.split('#')[0] ?? path;
  path = path.replace(/\/+$/, '') || '/';
  if (path === '/en' || path === '/zh') return '/';
  return path;
}

function labelFromPath(path: string): { en: string; zh: string } {
  const slug = path.split('/').filter(Boolean).pop() ?? path;
  const en = slug
    .split('-')
    .map((part) => (part.length <= 3 ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1)))
    .join(' ');
  return { en, zh: en };
}

function toPost(article: GeoArticle): BlogPost | null {
  const slug = text(article.slug);
  const title = pair(article.title);
  const answer = pair(article.directAnswer);
  const sectionsIn = article.sections ?? [];
  if (!slug || !title.en || !answer.en || sectionsIn.length === 0) return null;

  const kind = CATEGORY[article.category ?? ''] ?? CATEGORY.knowledge;
  const keyword = keywordText(article.keyword);
  const description = {
    en: metaDescription(answer.en, title.en),
    zh: metaDescription(answer.zh, title.zh),
  };
  const imageSrc = text(article.image?.src);
  const imageAlt = pair(article.image?.alt, `${title.en}, Hebei Pinjin Machinery`);
  const sections: BlogSection[] = [];
  for (const section of sectionsIn) {
    const heading = pair(section.heading);
    const body = pair(section.body);
    if (!heading.en || !body.en) continue;
    sections.push({ heading, paragraphs: [body] });
  }
  if (sections.length === 0) return null;
  if (imageSrc) {
    sections[0] = {
      ...sections[0],
      image: { src: imageSrc.startsWith('/') ? imageSrc : `/${imageSrc}`, alt: imageAlt },
    };
  }

  const relatedPaths: BlogRelatedPath[] = [];
  const seenPaths = new Set<string>();
  const productSlugs: string[] = [];
  const seenProducts = new Set<string>();
  for (const raw of article.relatedPaths ?? []) {
    const href = pagePath(raw);
    if (!href || seenPaths.has(href)) continue;
    seenPaths.add(href);
    const productMatch = href.match(/^\/products\/([^/]+)$/);
    if (productMatch && getProductBySlug(productMatch[1])) {
      if (!seenProducts.has(productMatch[1])) {
        seenProducts.add(productMatch[1]);
        productSlugs.push(productMatch[1]);
      }
    }
    if (relatedPaths.length < 8) {
      const given =
        raw && typeof raw === 'object' && 'label' in raw
          ? pair((raw as { label?: Pair }).label)
          : null;
      relatedPaths.push({
        href,
        label: given?.en ? given : labelFromPath(href),
      });
    }
  }

  const sources: SourcedReference[] = [];
  const seenSources = new Set<string>();
  for (const rawSource of article.sources ?? []) {
    const url =
      typeof rawSource === 'string'
        ? rawSource
        : rawSource && typeof rawSource === 'object' && 'url' in rawSource
          ? String((rawSource as { url?: unknown }).url ?? '')
          : '';
    const clean = text(url);
    if (!clean.startsWith('https://pinjinpump.com/') || seenSources.has(clean)) continue;
    seenSources.add(clean);
    sources.push({
      name: 'Hebei Pinjin Machinery',
      url: clean,
      type: 'pinjin',
    });
    if (sources.length >= 6) break;
  }

  const faqs = (article.faqs ?? [])
    .map((item) => {
      const question = pair(item.question);
      const answerText = pair(item.answer);
      if (!question.en || !answerText.en) return null;
      return { question, answer: answerText };
    })
    .filter((item): item is { question: { en: string; zh: string }; answer: { en: string; zh: string } } =>
      Boolean(item),
    );

  return {
    slug,
    title,
    seoTitle: title,
    description,
    category: kind.category,
    date: publishedDate(article.date),
    keywords: [keyword.en, keyword.zh].filter(Boolean),
    primaryKeyword: keyword.en || title.en,
    relatedProductSlugs: productSlugs,
    relatedPaths,
    content: sections,
    faqs,
    directAnswer: answer,
    answerBlock: {
      what: answer,
      who: {
        en: 'Hebei Pinjin Machinery, Xingtai, Hebei, China',
        zh: '河北品锦机械，中国河北邢台',
      },
      factors: [],
      relatedModels: productSlugs,
    },
    sources,
    availableLangs: ['en', 'zh'],
    indexLangs: ['en', 'zh'],
    contentStatus: 'ready',
    resourceType: kind.resourceType,
    tags: [kind.resourceType],
  };
}

const bySlug = new Map<string, BlogPost>();
for (const article of Object.values(jsonModules)) {
  const post = toPost(article);
  if (!post || bySlug.has(post.slug)) continue;
  bySlug.set(post.slug, post);
}

export const geoArticles: BlogPost[] = [...bySlug.values()];
