import type { Lang } from '@/i18n/config';
import type { BlogCategory } from '@/data/blog';

export type SourceType = 'marketplace' | 'industry' | 'manufacturer' | 'pinjin';
export type ContentStatus = 'ready' | 'needs-manual-content';

export type BlogResourceType =
  | 'equipment-guide'
  | 'application-guide'
  | 'technical-reference'
  | 'procurement-guide'
  | 'safety-guide'
  | 'parts-guide';

export interface SourcedReference {
  name: string;
  url: string;
  type: SourceType;
}

export interface SourcedJson {
  title: string;
  seoTitle?: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  category: BlogCategory;
  resourceType: BlogResourceType;
  tags: string[];
  date: string;
  dateModified?: string;
  availableLangs: Lang[];
  relatedProductSlugs: string[];
  relatedArticleSlugs?: string[];
  relatedPaths: Array<{ href: string; label: string }>;
  answerBlock: {
    what: string;
    who: string;
    factors: string[];
    relatedModels: string[];
  };
  faqs?: Array<{ question: string; answer: string }>;
  image: { src: string; alt: string; caption?: string };
  sources: SourcedReference[];
  contentStatus: ContentStatus;
  missingSources?: string[];
  /** Optional translations for title/description/answer/FAQs. Body lives in content.{lang}.md. */
  i18n?: Partial<
    Record<
      Exclude<Lang, 'en'>,
      {
        title?: string;
        seoTitle?: string;
        description?: string;
        imageAlt?: string;
        imageCaption?: string;
        relatedPathLabels?: string[];
        answerBlock?: {
          what?: string;
          who?: string;
          factors?: string[];
        };
        faqs?: Array<{ question: string; answer: string }>;
      }
    >
  >;
}

export type SourcedQaMountKind =
  | 'blog'
  | 'product'
  | 'category'
  | 'site-faq'
  | 'factory'
  | 'custom-machinery';

export interface SourcedQaItem {
  id: string;
  question: string;
  answer: string;
  source: SourcedReference;
  mount: { kind: SourcedQaMountKind; slug: string };
  /** True when the same Q/A already lives in a sourced article `faqs` array. */
  inArticleFaqs?: boolean;
}

export interface SourcedQaManifest {
  generated: string;
  items: SourcedQaItem[];
}
