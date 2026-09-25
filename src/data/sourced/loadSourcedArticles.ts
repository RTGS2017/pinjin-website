import type { Lang } from '@/i18n/config';
import type { LocalizedText } from '@/i18n/types';
import type { BlogPost, BlogRelatedPath, BlogSection } from '@/data/blog';
import { parseMarkdownToSections } from './parseMarkdown';
import type { SourcedJson } from './types';

const BODY_LANGS: Array<Exclude<Lang, 'en'>> = ['zh', 'pt', 'ar', 'ru'];

const L = (en: string, extra?: Partial<Record<Lang, string>>): LocalizedText =>
  extra ? { en, ...extra } : { en };

const jsonModules = import.meta.glob<SourcedJson>(
  '../../../content/sourced/*/source.json',
  { eager: true, import: 'default' },
);

const mdModules = import.meta.glob<string>(
  '../../../content/sourced/*/content.md',
  { eager: true, query: '?raw', import: 'default' },
);

const mdLangModules = import.meta.glob<string>(
  '../../../content/sourced/*/content.*.md',
  { eager: true, query: '?raw', import: 'default' },
);

function slugFromPath(path: string): string {
  const match = path.replace(/\\/g, '/').match(/content\/sourced\/([^/]+)\//);
  if (!match) throw new Error(`Cannot read sourced slug from ${path}`);
  return match[1];
}

function mdPathForSlug(slug: string): string | undefined {
  return Object.keys(mdModules).find((path) =>
    path.replace(/\\/g, '/').includes(`/content/sourced/${slug}/content.md`),
  );
}

function langMarkdownForSlug(slug: string): Partial<Record<Lang, string>> {
  const out: Partial<Record<Lang, string>> = {};
  for (const [path, markdown] of Object.entries(mdLangModules)) {
    const normalised = path.replace(/\\/g, '/');
    if (!normalised.includes(`/content/sourced/${slug}/`)) continue;
    const match = normalised.match(/content\.([a-z]{2})\.md$/);
    if (!match) continue;
    const lang = match[1] as Lang;
    if ((BODY_LANGS as readonly string[]).includes(lang)) out[lang] = markdown;
  }
  return out;
}

type Parsed = ReturnType<typeof parseMarkdownToSections>[number];

function mergeText(en: string, byLang: Partial<Record<Lang, string | undefined>>): LocalizedText {
  const extra: Partial<Record<Lang, string>> = {};
  for (const lang of BODY_LANGS) {
    const value = byLang[lang];
    if (value) extra[lang] = value;
  }
  return L(en, extra);
}

function mergeSections(
  english: Parsed[],
  translations: Partial<Record<Lang, Parsed[]>>,
): BlogSection[] {
  return english.map((section, index) => {
    const headingByLang: Partial<Record<Lang, string>> = {};
    const imageAltByLang: Partial<Record<Lang, string>> = {};
    const imageCaptionByLang: Partial<Record<Lang, string>> = {};
    for (const lang of BODY_LANGS) {
      const other = translations[lang]?.[index];
      if (other?.heading.en) headingByLang[lang] = other.heading.en;
      if (other?.image?.alt.en) imageAltByLang[lang] = other.image.alt.en;
      if (other?.image?.caption?.en) imageCaptionByLang[lang] = other.image.caption.en;
    }
    const paragraphs = section.paragraphs.map((paragraph, pIndex) => {
      const byLang: Partial<Record<Lang, string>> = {};
      for (const lang of BODY_LANGS) {
        const value = translations[lang]?.[index]?.paragraphs[pIndex]?.en;
        if (value) byLang[lang] = value;
      }
      return mergeText(paragraph.en, byLang);
    });
    const bullets = section.bullets?.map((bullet, bIndex) => {
      const byLang: Partial<Record<Lang, string>> = {};
      for (const lang of BODY_LANGS) {
        const value = translations[lang]?.[index]?.bullets?.[bIndex]?.en;
        if (value) byLang[lang] = value;
      }
      return mergeText(bullet.en, byLang);
    });
    const table = section.table
      ? {
          headers: section.table.headers.map((header, hIndex) => {
            const byLang: Partial<Record<Lang, string>> = {};
            for (const lang of BODY_LANGS) {
              const value = translations[lang]?.[index]?.table?.headers[hIndex]?.en;
              if (value) byLang[lang] = value;
            }
            return mergeText(header.en, byLang);
          }),
          rows: section.table.rows.map((row, rIndex) =>
            row.map((cell, cIndex) => {
              const byLang: Partial<Record<Lang, string>> = {};
              for (const lang of BODY_LANGS) {
                const value = translations[lang]?.[index]?.table?.rows[rIndex]?.[cIndex]?.en;
                if (value) byLang[lang] = value;
              }
              return mergeText(cell.en, byLang);
            }),
          ),
        }
      : undefined;
    const image = section.image
      ? {
          src: section.image.src,
          alt: mergeText(section.image.alt.en, imageAltByLang),
          caption: section.image.caption
            ? mergeText(section.image.caption.en, imageCaptionByLang)
            : undefined,
        }
      : undefined;
    return {
      heading: mergeText(section.heading.en, headingByLang),
      level: section.level,
      paragraphs,
      bullets,
      table,
      image,
    };
  });
}

function attachCover(sections: BlogSection[], source: SourcedJson): BlogSection[] {
  if (sections.some((section) => section.image)) return sections;
  const image = source.image;
  if (!image?.src) return sections;
  const altExtra: Partial<Record<Lang, string>> = {};
  const captionExtra: Partial<Record<Lang, string>> = {};
  for (const lang of BODY_LANGS) {
    const pack = source.i18n?.[lang];
    if (pack?.imageAlt) altExtra[lang] = pack.imageAlt;
    if (pack?.imageCaption) captionExtra[lang] = pack.imageCaption;
  }
  const cover = {
    src: image.src,
    alt: mergeText(image.alt, altExtra),
    caption: image.caption ? mergeText(image.caption, captionExtra) : undefined,
  };
  if (sections.length === 0) {
    return [
      {
        heading: locField(source, 'title'),
        level: 2,
        paragraphs: [],
        image: cover,
      },
    ];
  }
  return sections.map((section, index) =>
    index === 0 ? { ...section, image: cover } : section,
  );
}

function locField(
  source: SourcedJson,
  key: 'title' | 'seoTitle' | 'description',
): LocalizedText {
  const extra: Partial<Record<Lang, string>> = {};
  for (const lang of BODY_LANGS) {
    const value = source.i18n?.[lang]?.[key];
    if (value) extra[lang] = value;
  }
  const en = key === 'seoTitle' ? source.seoTitle ?? source.title : source[key];
  return mergeText(en, extra);
}

function toPost(slug: string, source: SourcedJson, markdown: string): BlogPost {
  const keywords = [
    source.primaryKeyword,
    ...source.secondaryKeywords,
    ...(source.tags ?? []),
  ].filter((item, index, list) => item && list.indexOf(item) === index);

  const relatedPaths: BlogRelatedPath[] = source.relatedPaths.map((item, index) => {
    const extra: Partial<Record<Lang, string>> = {};
    for (const lang of BODY_LANGS) {
      const label = source.i18n?.[lang]?.relatedPathLabels?.[index];
      if (label) extra[lang] = label;
    }
    return { href: item.href, label: mergeText(item.label, extra) };
  });

  const factorExtras = source.answerBlock.factors.map((_, index) => {
    const extra: Partial<Record<Lang, string>> = {};
    for (const lang of BODY_LANGS) {
      const value = source.i18n?.[lang]?.answerBlock?.factors?.[index];
      if (value) extra[lang] = value;
    }
    return extra;
  });

  const whatExtra: Partial<Record<Lang, string>> = {};
  const whoExtra: Partial<Record<Lang, string>> = {};
  for (const lang of BODY_LANGS) {
    const pack = source.i18n?.[lang]?.answerBlock;
    if (pack?.what) whatExtra[lang] = pack.what;
    if (pack?.who) whoExtra[lang] = pack.who;
  }

  const langMarkdown = langMarkdownForSlug(slug);
  const translatedSections: Partial<Record<Lang, Parsed[]>> = {};
  for (const lang of BODY_LANGS) {
    const text = langMarkdown[lang];
    if (text) translatedSections[lang] = parseMarkdownToSections(text);
  }

  const content = attachCover(
    mergeSections(parseMarkdownToSections(markdown), translatedSections),
    source,
  );

  return {
    slug,
    title: locField(source, 'title'),
    seoTitle: source.seoTitle ? locField(source, 'seoTitle') : undefined,
    description: locField(source, 'description'),
    category: source.category,
    date: source.date,
    dateModified: source.dateModified,
    keywords,
    primaryKeyword: source.primaryKeyword,
    secondaryKeywords: source.secondaryKeywords,
    relatedProductSlugs: source.relatedProductSlugs,
    relatedArticleSlugs: source.relatedArticleSlugs ?? [],
    relatedPaths,
    content,
    faqs: source.faqs?.map((item, index) => {
      const qExtra: Partial<Record<Lang, string>> = {};
      const aExtra: Partial<Record<Lang, string>> = {};
      for (const lang of BODY_LANGS) {
        const faq = source.i18n?.[lang]?.faqs?.[index];
        if (faq?.question) qExtra[lang] = faq.question;
        if (faq?.answer) aExtra[lang] = faq.answer;
      }
      return {
        question: mergeText(item.question, qExtra),
        answer: mergeText(item.answer, aExtra),
      };
    }),
    directAnswer: mergeText(source.answerBlock.what, whatExtra),
    answerBlock: {
      what: mergeText(source.answerBlock.what, whatExtra),
      who: mergeText(source.answerBlock.who, whoExtra),
      factors: source.answerBlock.factors.map((factor, index) =>
        mergeText(factor, factorExtras[index]),
      ),
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
