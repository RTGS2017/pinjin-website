import type { Product } from '@/data/products';
import type { Lang } from '@/i18n/types';
import { pick } from '@/i18n/types';

export interface ProductFaqItem {
  question: string;
  answer: string;
}

/** 每产品至少 5 条 FAQ，基于产品实体字段生成（不编造参数） */
export function getProductFaqs(product: Product, lang: Lang): ProductFaqItem[] {
  const name = pick(product.name, lang);
  const what = pick(product.geo.answers.whatIs, lang);
  const who = pick(product.geo.answers.whoNeeds, lang);
  const where = pick(product.geo.answers.whereUsed, lang);
  const adv = pick(product.geo.answers.advantages, lang);
  const inquire = pick(product.geo.answers.howToInquire, lang);
  const manufacturer = pick(product.geo.manufacturer, lang);
  const madeIn = pick(product.geo.manufacturedIn, lang);

  const keySpecs = product.specifications
    .slice(0, 4)
    .map((s) => `${pick(s.label, lang)}: ${pick(s.value, lang)}`)
    .join(lang === 'zh' ? '；' : '; ');

  const apps = product.applicationScenarios
    .slice(0, 3)
    .map((a) => pick(a, lang))
    .join(lang === 'zh' ? '；' : '; ');

  if (lang === 'zh') {
    return [
      {
        question: `${name} 是什么设备？`,
        answer: what,
      },
      {
        question: `谁需要 ${name}？`,
        answer: who,
      },
      {
        question: `${name} 可以用在哪些场景？`,
        answer: apps
          ? `${where} 目录相关应用方向包括：${apps}。`
          : where,
      },
      {
        question:
          product.specifications.length > 0
            ? `${name} 的关键技术参数有哪些？`
            : `${name} 是否有完整技术参数？`,
        answer:
          product.specifications.length > 0
            ? `根据产品目录：${keySpecs}。完整列表见本页技术参数表。`
            : '当前产品目录仅标注型号，未提供详细技术参数。请通过邮件向厂家索取最新参数表后再选型。',
      },
      {
        question: `${name} 有哪些优势？`,
        answer: adv,
      },
      {
        question: `${name} 由谁制造？在哪里生产？`,
        answer: `${name} 由 ${manufacturer} 制造，产地：${madeIn}。`,
      },
      {
        question: `如何就 ${name} 获取报价？`,
        answer: inquire,
      },
    ];
  }

  return [
    {
      question: `What is ${name}?`,
      answer: what,
    },
    {
      question: `Who needs ${name}?`,
      answer: who,
    },
    {
      question: `Where can ${name} be used?`,
      answer: apps
        ? `${where} Related catalogue application directions include: ${apps}.`
        : where,
    },
    {
      question:
        product.specifications.length > 0
          ? `What are the key specifications of ${name}?`
          : `Are detailed specifications published for ${name}?`,
      answer:
        product.specifications.length > 0
          ? `According to the product catalogue: ${keySpecs}. See the full specifications table on this page.`
          : 'The current catalogue lists the model name only without detailed technical parameters. Please email the manufacturer for the latest parameter sheet before selection.',
    },
    {
      question: `What advantages does ${name} provide?`,
      answer: adv,
    },
    {
      question: `Who manufactures ${name} and where?`,
      answer: `${name} is manufactured by ${manufacturer}, located at ${madeIn}.`,
    },
    {
      question: `How can I request a quotation for ${name}?`,
      answer: inquire,
    },
  ];
}
