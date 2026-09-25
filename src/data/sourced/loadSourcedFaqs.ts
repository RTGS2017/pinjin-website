import type { Lang } from '@/i18n/config';
import type { SourcedQaItem, SourcedQaManifest, SourcedQaMountKind } from './types';

const L = (en: string) => ({ en });

const qaModules = import.meta.glob<SourcedQaManifest>(
  '../../../content/sourced/qa/manifest.json',
  { eager: true, import: 'default' },
);

function loadManifest(): SourcedQaManifest {
  const first = Object.values(qaModules)[0];
  return first ?? { generated: '', items: [] };
}

export const sourcedQaManifest: SourcedQaManifest = loadManifest();

export function sourcedQaItems(): SourcedQaItem[] {
  return sourcedQaManifest.items ?? [];
}

export function extraFaqsFor(
  kind: SourcedQaMountKind,
  slug: string,
  lang: Lang = 'en',
): Array<{ question: { en: string }; answer: { en: string } }> {
  if (lang !== 'en') return [];
  return sourcedQaItems()
    .filter(
      (item) =>
        item.mount.kind === kind &&
        item.mount.slug === slug &&
        !item.inArticleFaqs,
    )
    .map((item) => ({
      question: L(item.question),
      answer: L(item.answer),
    }));
}

export function extraProductFaqPlain(slug: string, lang: Lang) {
  return extraFaqsFor('product', slug, lang).map((item) => ({
    question: item.question.en,
    answer: item.answer.en,
  }));
}

export function extraCategoryFaqPlain(slug: string, lang: Lang) {
  return extraFaqsFor('category', slug, lang).map((item) => ({
    question: item.question.en,
    answer: item.answer.en,
  }));
}

export function extraSiteFaqItems(lang: Lang) {
  if (lang !== 'en') return [];
  return sourcedQaItems()
    .filter((item) => item.mount.kind === 'site-faq' && !item.inArticleFaqs)
    .map((item) => ({
      id: item.id,
      question: L(item.question),
      answer: L(item.answer),
    }));
}
