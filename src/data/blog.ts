import type { LocalizedText } from '@/i18n/types';
import { getFactorySlide } from '@/data/factory';
import { knowledgeArticles } from '@/data/knowledgeArticles';

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

export interface BlogSection {
  heading: LocalizedText;
  paragraphs: LocalizedText[];
  bullets?: LocalizedText[];
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

export interface BlogPost {
  slug: string;
  title: LocalizedText;
  seoTitle?: LocalizedText;
  description: LocalizedText;
  category: BlogCategory;
  date: string;
  dateModified?: string;
  keywords: string[];
  relatedProductSlugs: string[];
  relatedPaths: BlogRelatedPath[];
  content: BlogSection[];
  faqs?: Array<{ question: LocalizedText; answer: LocalizedText }>;
}

/** 知识中心正文在 knowledgeArticles.ts；本文件只放类型与读取函数。 */
export const blogPosts: BlogPost[] = [];

function allBlogPosts(): BlogPost[] {
  return [...blogPosts, ...knowledgeArticles];
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return allBlogPosts().find((post) => post.slug === slug);
}

export function getBlogPosts(): BlogPost[] {
  return allBlogPosts().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogCover(post: BlogPost) {
  const found = post.content.find((section) => section.image)?.image;
  if (found) return found;
  return factoryImage('factory-building');
}
