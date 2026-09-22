import type { BlogPost, BlogRelatedPath, BlogSection } from '@/data/blog';
import type { LocalizedText } from '@/i18n/types';
import { parseMarkdownToSections } from './parseMarkdown';
import type { SourcedJson } from './types';

const L = (en: string): LocalizedText => ({ en });

const jsonModules = import.meta.glob<SourcedJson>(
  '../../../content/sourced/*/source.json',
  { eager: true, import: 'default' },
);

const mdModules = import.meta.glob<string>(
  '../../../content/sourced/*/content.md',
  { eager: true, query: '?raw', import: 'default' },
);

function slugFromPath(path: string): string {
  const match = path.replace(/\\/g, '/').match(/content\/sourced\/([^/]+)\//);
  if (!match) throw new Error(`Cannot read sourced slug from ${path}`);
  return match[1];
}

function mdPathForSlug(slug: string): string | undefined {
  return Object.keys(mdModules).find((path) =>
    path.replace(/\\/g, '/').includes(`/content/sourced/${slug}/`),
  );
}

function attachCover(sections: BlogSection[], source: SourcedJson): BlogSection[] {
  if (sections.some((section) => section.image)) return sections;
  const image = source.image;
  if (!image?.src) return sections;
  if (sections.length === 0) {
    return [
      {
        heading: L(source.title),
        level: 2,
        paragraphs: [],
        image: {
          src: image.src,
          alt: L(image.alt),
          caption: image.caption ? L(image.caption) : undefined,
        },
      },
    ];
  }
  return sections.map((section, index) =>
    index === 0
      ? {
          ...section,
          image: {
            src: image.src,
            alt: L(image.alt),
            caption: image.caption ? L(image.caption) : undefined,
          },
        }
      : section,
  );
}

function toPost(slug: string, source: SourcedJson, markdown: string): BlogPost {
  const keywords = [
    source.primaryKeyword,
    ...source.secondaryKeywords,
    ...(source.tags ?? []),
  ].filter((item, index, list) => item && list.indexOf(item) === index);

  const relatedPaths: BlogRelatedPath[] = source.relatedPaths.map((item) => ({
    href: item.href,
    label: L(item.label),
  }));

  return {
    slug,
    title: L(source.title),
    seoTitle: source.seoTitle ? L(source.seoTitle) : undefined,
    description: L(source.description),
    category: source.category,
    date: source.date,
    dateModified: source.dateModified,
    keywords,
    primaryKeyword: source.primaryKeyword,
    secondaryKeywords: source.secondaryKeywords,
    relatedProductSlugs: source.relatedProductSlugs,
    relatedArticleSlugs: source.relatedArticleSlugs ?? [],
    relatedPaths,
    content: attachCover(parseMarkdownToSections(markdown), source),
    faqs: source.faqs?.map((item) => ({
      question: L(item.question),
      answer: L(item.answer),
    })),
    directAnswer: L(source.answerBlock.what),
    answerBlock: {
      what: L(source.answerBlock.what),
      who: L(source.answerBlock.who),
      factors: source.answerBlock.factors.map(L),
      relatedModels: source.answerBlock.relatedModels,
    },
    sources: source.sources,
    availableLangs: source.availableLangs,
    contentStatus: source.contentStatus,
    resourceType: source.resourceType,
    tags: source.tags,
    missingSources: source.missingSources,
  };
}

export interface SourcedManifestEntry {
  slug: string;
  title: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  contentStatus: SourcedJson['contentStatus'];
  availableLangs: SourcedJson['availableLangs'];
  missingSources?: string[];
  sources: SourcedJson['sources'];
  category: SourcedJson['category'];
  relatedProductSlugs: string[];
}

function loadAll(): { posts: BlogPost[]; manifest: SourcedManifestEntry[] } {
  const posts: BlogPost[] = [];
  const manifest: SourcedManifestEntry[] = [];

  for (const [jsonPath, source] of Object.entries(jsonModules)) {
    const slug = slugFromPath(jsonPath);
    const data = source as SourcedJson;
    const mdKey = mdPathForSlug(slug);
    const markdown = mdKey ? mdModules[mdKey] ?? '' : '';
    manifest.push({
      slug,
      title: data.title,
      primaryKeyword: data.primaryKeyword,
      secondaryKeywords: data.secondaryKeywords,
      contentStatus: data.contentStatus,
      availableLangs: data.availableLangs,
      missingSources: data.missingSources,
      sources: data.sources,
      category: data.category,
      relatedProductSlugs: data.relatedProductSlugs,
    });
    posts.push(toPost(slug, data, markdown));
  }

  return {
    posts: posts.sort((a, b) => (a.date < b.date ? 1 : -1)),
    manifest: manifest.sort((a, b) => a.slug.localeCompare(b.slug)),
  };
}

const loaded = loadAll();

export const sourcedArticles: BlogPost[] = loaded.posts;
export const sourcedManifest: SourcedManifestEntry[] = loaded.manifest;
