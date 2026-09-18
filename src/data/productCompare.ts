import { products, type Product } from '@/data/products';
import { specText } from '@/data/productP01';
import type { Lang } from '@/i18n/types';
import { pick } from '@/i18n/types';

export interface NearbyComparison {
  slug: string;
  name: string;
  diff: string;
}

const POWER = ['motor power', 'diesel engine', 'engine'];
const OUTPUT = ['output', 'capacity', 'theoretical'];
const PRESSURE = ['outlet pressure'];
const DISTANCE = ['pumping distance', 'fine stone', 'delivery distance', 'conveying'];
const AGGREGATE = ['aggregate', 'particle'];

function phrase(
  lang: Lang,
  table: Record<Lang, string>,
): string {
  return table[lang] ?? table.en;
}

function sameLine(product: Product, other: Product): boolean {
  return product.category === other.category && product.partKind === other.partKind;
}

function numericKey(product: Product): number {
  const output = specText(product, 'en', OUTPUT) || '';
  const power = specText(product, 'en', POWER) || '';
  const text = `${output} ${power}`;
  const nums = [...text.matchAll(/(\d+(?:\.\d+)?)/g)].map((match) => Number(match[1]));
  return nums.length ? Math.max(...nums) : 0;
}

export function getNearbyProducts(product: Product, limit = 2): Product[] {
  const ordered = products
    .filter((item) => sameLine(item, product))
    .slice()
    .sort((a, b) => numericKey(a) - numericKey(b) || a.slug.localeCompare(b.slug));
  const index = ordered.findIndex((item) => item.slug === product.slug);
  if (index < 0) return [];
  const picked: Product[] = [];
  if (ordered[index - 1]) picked.push(ordered[index - 1]);
  if (ordered[index + 1]) picked.push(ordered[index + 1]);
  for (const item of ordered) {
    if (item.slug === product.slug) continue;
    if (picked.some((row) => row.slug === item.slug)) continue;
    picked.push(item);
    if (picked.length >= limit) break;
  }
  return picked.slice(0, limit);
}

function specDiffs(product: Product, other: Product, lang: Lang): string[] {
  const rows: Array<{ needles: string[]; kind: 'power' | 'output' | 'pressure' | 'distance' | 'aggregate' }> = [
    { needles: POWER, kind: 'power' },
    { needles: OUTPUT, kind: 'output' },
    { needles: PRESSURE, kind: 'pressure' },
    { needles: DISTANCE, kind: 'distance' },
    { needles: AGGREGATE, kind: 'aggregate' },
  ];
  const bits: string[] = [];
  const selfName = pick(product.name, lang);
  const otherName = pick(other.name, lang);
  for (const row of rows) {
    const selfValue = specText(product, lang, row.needles);
    const otherValue = specText(other, lang, row.needles);
    if (!selfValue || !otherValue || selfValue === otherValue) continue;
    bits.push(
      phrase(lang, {
        en: `${otherName} lists ${otherValue}; ${selfName} lists ${selfValue}`,
        zh: `${otherName} 目录为 ${otherValue}；${selfName} 目录为 ${selfValue}`,
        pt: `${otherName} indica ${otherValue}; ${selfName} indica ${selfValue}`,
        ar: `${otherName} يذكر ${otherValue}؛ ${selfName} يذكر ${selfValue}`,
        ru: `${otherName}: ${otherValue}; ${selfName}: ${selfValue}`,
      }),
    );
  }
  if (product.catalogSizes?.length && other.catalogSizes?.length) {
    const selfSizes = product.catalogSizes.map((row) => row.size).join(', ');
    const otherSizes = other.catalogSizes.map((row) => row.size).join(', ');
    if (selfSizes !== otherSizes) {
      bits.push(
        phrase(lang, {
          en: `${otherName} catalogue sizes: ${otherSizes}. ${selfName} catalogue sizes: ${selfSizes}`,
          zh: `${otherName} 目录尺寸：${otherSizes}。${selfName} 目录尺寸：${selfSizes}`,
          pt: `Medidas de ${otherName}: ${otherSizes}. Medidas de ${selfName}: ${selfSizes}`,
          ar: `مقاسات ${otherName}: ${otherSizes}. مقاسات ${selfName}: ${selfSizes}`,
          ru: `Размеры ${otherName}: ${otherSizes}. Размеры ${selfName}: ${selfSizes}`,
        }),
      );
    }
  }
  return bits.slice(0, 4);
}

export function getNearbyComparisons(product: Product, lang: Lang): NearbyComparison[] {
  return getNearbyProducts(product)
    .map((other) => {
      const diffs = specDiffs(product, other, lang);
      if (!diffs.length) return null;
      const useThis = phrase(lang, {
        en: 'Use this page’s table, not a row copied from the other model.',
        zh: '请用本页目录表，不要套用另一型号的行。',
        pt: 'Use a tabela desta página, não a linha de outro modelo.',
        ar: 'استخدم جدول هذه الصفحة لا صف طراز آخر.',
        ru: 'Берите таблицу этой страницы, не строку другой модели.',
      });
      return {
        slug: other.slug,
        name: pick(other.name, lang),
        diff: `${diffs.join('. ')}. ${useThis}`,
      };
    })
    .filter((item): item is NearbyComparison => item !== null);
}

export function getNearbyComparisonText(product: Product, lang: Lang): string {
  const rows = getNearbyComparisons(product, lang);
  if (!rows.length) return '';
  return rows.map((item) => `${item.name}: ${item.diff}`).join(' ');
}
