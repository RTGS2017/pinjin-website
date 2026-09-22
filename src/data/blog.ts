import type { LocalizedText } from '@/i18n/types';
import type { Lang } from '@/i18n/config';
import { indexedLangs } from '@/i18n/config';
import { getFactorySlide } from '@/data/factory';
import { knowledgeArticles } from '@/data/knowledgeArticles';
import { sourcedArticles, sourcedManifest } from '@/data/sourced/loadSourcedArticles';
import type { BlogResourceType, SourcedReference } from '@/data/sourced/types';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

function factoryImage(id: string) {
  const slide = getFactorySlide(id);
  if (!slide) {
    throw new Error(`Missing factory slide: ${id}`);
  }
  return { src: slide.image, alt: slide.alt, caption: slide.title };
}

export type BlogCategory =
  | 'manufacturing-knowledge'
  | 'industry-guide'
  | 'product-guide'
  | 'factory-insights'
  | 'application-solutions';

export const blogCategoryOrder: BlogCategory[] = [
  'product-guide',
  'application-solutions',
  'manufacturing-knowledge',
  'industry-guide',
  'factory-insights',
];

export const blogCategoryMeta: Record<BlogCategory, LocalizedText> = {
  'manufacturing-knowledge': L('Manufacturing Knowledge', '制造知识'),
  'industry-guide': L('Industry Trends', '行业趋势'),
  'product-guide': L('Equipment Guide', '设备指南'),
  'factory-insights': L('Factory Insights', '工厂洞察'),
  'application-solutions': L('Application Solutions', '应用方案'),
};

export const blogResourceTypeMeta: Record<BlogResourceType, LocalizedText> = {
  'equipment-guide': L('Equipment guide', '设备指南'),
  'application-guide': L('Application guide', '应用指南'),
  'technical-reference': L('Technical reference', '技术参考'),
  'procurement-guide': L('Procurement guide', '采购指南'),
  'safety-guide': L('Safety guide', '安全指南'),
  'parts-guide': L('Parts guide', '配件指南'),
};

export interface BlogSection {
  heading: LocalizedText;
  level?: 2 | 3;
  paragraphs: LocalizedText[];
  bullets?: LocalizedText[];
  table?: {
    headers: LocalizedText[];
    rows: LocalizedText[][];
  };
  image?: {
    src: string;
    alt: LocalizedText;
    caption?: LocalizedText;
  };
}

export interface BlogRelatedPath {
  href: string;
  label: LocalizedText;
}

export interface BlogAnswerBlock {
  what: LocalizedText;
  who: LocalizedText;
  factors: LocalizedText[];
  relatedModels: string[];
}

export interface BlogPost {
  slug: string;
  title: LocalizedText;
  seoTitle?: LocalizedText;
  description: LocalizedText;
  category: BlogCategory;
  date: string;
  dateModified?: string;
  keywords: string[];
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  relatedProductSlugs: string[];
  relatedArticleSlugs?: string[];
  relatedPaths: BlogRelatedPath[];
  content: BlogSection[];
  faqs?: Array<{ question: LocalizedText; answer: LocalizedText }>;
  directAnswer?: LocalizedText;
  answerBlock?: BlogAnswerBlock;
  sources?: SourcedReference[];
  availableLangs?: readonly Lang[];
  contentStatus?: 'ready' | 'needs-manual-content';
  resourceType?: BlogResourceType;
  tags?: string[];
  missingSources?: string[];
}

/** 知识中心正文：旧文在 knowledgeArticles.ts；新文在 content/sourced。 */
export const blogPosts: BlogPost[] = [];

function allBlogPosts(): BlogPost[] {
  return [...blogPosts, ...knowledgeArticles, ...sourcedArticles];
}

export function postLangs(post: BlogPost): readonly Lang[] {
  return post.availableLangs ?? indexedLangs;
}

export function postAvailableInLang(post: BlogPost, lang: Lang): boolean {
  return postLangs(post).includes(lang);
}

export function isIndexablePost(post: BlogPost): boolean {
  return post.contentStatus !== 'needs-manual-content';
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return allBlogPosts().find((post) => post.slug === slug);
}

/** Indexable posts, newest first. Pass lang to hide untranslated sourced pages. */
export function getBlogPosts(lang?: Lang): BlogPost[] {
  return allBlogPosts()
    .filter(isIndexablePost)
    .filter((post) => (lang ? postAvailableInLang(post, lang) : true))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRelatedKnowledgePosts(productSlug: string, lang?: Lang): BlogPost[] {
  return getBlogPosts(lang).filter((post) => post.relatedProductSlugs.includes(productSlug));
}

export function getBlogCover(post: BlogPost) {
  const found = post.content.find((section) => section.image)?.image;
  if (found) return found;
  return factoryImage('workshop-crane');
}

export function getSourcedContentManifest() {
  return sourcedManifest;
}
