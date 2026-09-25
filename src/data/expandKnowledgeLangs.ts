import type { Lang } from '@/i18n/config';
import type { LocalizedText } from '@/i18n/types';
import type { BlogPost, BlogSection } from '@/data/blog';

const ALL: Lang[] = ['en', 'zh', 'pt', 'ar', 'ru'];

const modules = import.meta.glob<Record<string, { zh?: string; pt?: string; ar?: string; ru?: string }>>(
  '../../content/knowledge-i18n/strings.json',
  { eager: true, import: 'default' },
);

const pack: Record<string, { zh?: string; pt?: string; ar?: string; ru?: string }> =
  Object.values(modules)[0] ?? {};

function expandText(text: LocalizedText): LocalizedText {
  const extra = pack[text.en];
  if (!extra) return text;
  return {
    en: text.en,
    zh: text.zh ?? extra.zh,
    pt: extra.pt,
    ar: extra.ar,
    ru: extra.ru,
  };
}

function expandSection(section: BlogSection): BlogSection {
  return {
    ...section,
    heading: expandText(section.heading),
    paragraphs: section.paragraphs.map(expandText),
    bullets: section.bullets?.map(expandText),
    table: section.table
      ? {
          headers: section.table.headers.map(expandText),
          rows: section.table.rows.map((row) => row.map(expandText)),
        }
      : undefined,
    image: section.image
      ? {
          ...section.image,
          alt: expandText(section.image.alt),
          caption: section.image.caption ? expandText(section.image.caption) : undefined,
        }
      : undefined,
  };
}

export function expandKnowledgeLangs(post: BlogPost): BlogPost {
  return {
    ...post,
    availableLangs: ALL,
    title: expandText(post.title),
    seoTitle: post.seoTitle ? expandText(post.seoTitle) : undefined,
    description: expandText(post.description),
    relatedPaths: post.relatedPaths.map((item) => ({
      ...item,
      label: expandText(item.label),
    })),
    content: post.content.map(expandSection),
    faqs: post.faqs?.map((item) => ({
      question: expandText(item.question),
      answer: expandText(item.answer),
    })),
    directAnswer: post.directAnswer ? expandText(post.directAnswer) : undefined,
    answerBlock: post.answerBlock
      ? {
          ...post.answerBlock,
          what: expandText(post.answerBlock.what),
          who: expandText(post.answerBlock.who),
          factors: post.answerBlock.factors.map(expandText),
        }
      : undefined,
  };
}
