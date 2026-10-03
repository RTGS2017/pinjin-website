import type { Product } from '@/data/products';
import type { ApplicationPageItem } from '@/data/applicationsContent';
import { applicationPages } from '@/data/applicationsContent';
import { specText } from '@/data/productP01';
import type { Lang } from '@/i18n/types';
import { pick } from '@/i18n/types';

const LOCALE_BRAND: Record<Lang, string> = {
  en: 'Pinjin Machinery',
  zh: '品锦机械',
  pt: 'Fabricante Pinjin em Xingtai',
  ar: 'مصنّع Pinjin في شينغتاي',
  ru: 'Производитель Pinjin, Синтай',
};

const DESC_LEAD: Record<Lang, string> = {
  en: '',
  zh: '',
  pt: 'Página do catálogo da fábrica Pinjin em Xingtai, China. ',
  ar: 'صفحة كتالوج مصنع Pinjin في شينغتاي، الصين. ',
  ru: 'Страница каталога завода Pinjin в Синтае, Китай. ',
};

export function localeBrand(lang: Lang): string {
  return LOCALE_BRAND[lang];
}

/** 同一套英文 heading 在五语里也要能分开，不用 ` · en` 这种机器后缀。 */
export function brandedTitle(heading: string, lang: Lang): string {
  const brand = localeBrand(lang);
  const trimmed = heading.replace(/\s*\|\s*(Pinjin Machinery(?: China)?|品锦机械)\s*$/i, '').trim();
  if (trimmed.includes(brand)) return trimmed;
  return `${trimmed} | ${brand}`;
}

const INTERNAL_TITLE_TAIL =
  /\s*(?:Catalogue Rows?|Quote Rows?|目录行|报价行)\s*$/i;

/** 页面可见标题：去掉内部目录口径，不改 source.json。 */
export function blogDisplayTitle(title: string): string {
  const next = title.replace(INTERNAL_TITLE_TAIL, '').trim();
  return next || title;
}

function stripStackedBlogBrand(heading: string): string {
  return heading
    .replace(/\s*\|\s*Construction Machinery Knowledge\s*/gi, ' ')
    .replace(/\s*\|\s*工程机械知识\s*/g, ' ')
    .replace(/\s*\|\s*Pinjin\s*$/i, '')
    .replace(/\s*\|\s*品锦机械\s*$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function blogDocumentTitle(
  title: string,
  seoTitle: string | undefined,
  lang: Lang,
): string {
  const display = blogDisplayTitle(title);
  const raw = (seoTitle ?? display).trim();
  const cleaned = stripStackedBlogBrand(blogDisplayTitle(raw));
  return brandedTitle(cleaned || display, lang);
}

export function withLocaleDescription(description: string, lang: Lang): string {
  const lead = DESC_LEAD[lang];
  if (!lead) return description;
  if (description.startsWith(lead)) return description;
  return `${lead}${description}`;
}

export function productDocumentTitle(product: Product, lang: Lang): string {
  const name = pick(product.name, lang);
  switch (lang) {
    case 'zh':
      return `${name}厂家 | 品锦机械`;
    case 'pt':
      return `Fabricante ${name} China | Pinjin Machinery`;
    case 'ar':
      return `مصنّع ${name} في الصين | Pinjin Machinery`;
    case 'ru':
      return `Производитель ${name} Китай | Pinjin Machinery`;
    default:
      return `${name} Manufacturer China | Pinjin Machinery`;
  }
}

export function productDocumentDescription(product: Product, lang: Lang): string {
  if (lang === 'zh' && product.seo.description.zh) return product.seo.description.zh;
  if (lang === 'en') return product.seo.description.en;

  const name = pick(product.name, lang);
  const facts = [
    specText(product, lang, ['motor power', 'diesel engine', 'engine']),
    specText(product, lang, ['output', 'capacity', 'theoretical']),
    specText(product, lang, ['outlet pressure']),
    specText(product, lang, ['pumping distance', 'fine stone', 'delivery distance', 'conveying']),
  ].filter(Boolean);
  const table = facts.length ? facts.join('; ') : pick(product.shortDescription, lang);

  switch (lang) {
    case 'pt':
      return `A Hebei Pinjin em Xingtai fabrica ${name}. Dados do catálogo: ${table}. Não é bomba com lança nem usina de concreto. Confira mistura, distância e energia nesta tabela.`;
    case 'ar':
      return `تُصنّع Hebei Pinjin في شينغتاي ${name}. بيانات الكتالوج: ${table}. ليست مضخة ذراع ولا محطة خلط. طابق الخلطة والمسافة والطاقة مع هذا الجدول.`;
    case 'ru':
      return `Hebei Pinjin в Синтае выпускает ${name}. Данные каталога: ${table}. Это не автобетононасос со стрелой и не бетонный завод. Сверяйте смесь, дальность и питание с этой таблицей.`;
    default:
      return product.seo.description.en;
  }
}

export function factoryDocumentTitle(lang: Lang): string {
  switch (lang) {
    case 'zh':
      return '邢台工厂制造现场 | 品锦机械';
    case 'pt':
      return 'Fábrica em Xingtai | Pinjin Machinery';
    case 'ar':
      return 'مصنع شينغتاي | Pinjin Machinery';
    case 'ru':
      return 'Завод в Синтае | Pinjin Machinery';
    default:
      return 'Xingtai Factory | Pinjin Machinery';
  }
}

export function factoryDocumentDescription(lang: Lang, homeDesc: string): string {
  if (lang === 'zh') {
    const factoryDesc =
      '河北品锦机械在中国邢台制造电动、柴油拖式混凝土泵、搅拌泵与喷涂机。请按目录对照产量、距离与动力。不是臂架泵或搅拌站。不声称拥有海外仓。';
    return factoryDesc === homeDesc
      ? `${factoryDesc} 工厂地址为任泽工业园区。`
      : factoryDesc;
  }
  return withLocaleDescription(
    'Hebei Pinjin Machinery factory in Xingtai, Hebei, China — concrete machinery manufacturer in the Xingjiawan manufacturing area. Factory address: Renze Industrial Park.',
    lang,
  );
}

export function solutionContrast(app: ApplicationPageItem, lang: Lang): string {
  const others = applicationPages
    .filter((item) => item.id !== app.id)
    .map((item) => pick(item.title, lang));
  const joiner = lang === 'zh' ? '、' : lang === 'ar' ? '؛ ' : '; ';
  const list = others.join(joiner);
  const self = pick(app.title, lang);
  switch (lang) {
    case 'zh':
      return `${self} 与 ${list} 不是同一页。请按本页摘要与清单选型，不要把其他方案页的工况套到这一页。`;
    case 'pt':
      return `${self} não é a mesma página que ${list}. Use o resumo e a lista desta página; não copie as condições de outra solução.`;
    case 'ar':
      return `${self} ليست الصفحة نفسها لـ ${list}. استخدم ملخص وقائمة هذه الصفحة ولا تنسخ ظروف حل آخر.`;
    case 'ru':
      return `${self} — не та же страница, что ${list}. Берите резюме и список этой страницы, не переносите условия с другой.`;
    default:
      return `${self} is not the same page as ${list}. Use this page’s summary and checklist; do not copy site conditions from another solution page.`;
  }
}
