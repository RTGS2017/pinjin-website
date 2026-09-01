import type { Product } from '@/data/products';
import { formatIndicativeUsd, getIndicativePrice } from '@/data/productPricing';
import type { Lang } from '@/i18n/types';
import { pick } from '@/i18n/types';

export interface ProductFaqItem {
  question: string;
  answer: string;
}

function specJoiner(lang: Lang): string {
  if (lang === 'zh') return '；';
  if (lang === 'ar') return '؛ ';
  return '; ';
}

function quoteAnswer(lang: Lang, name: string, priceText: string, inquire: string): string {
  if (!priceText) return inquire;
  if (lang === 'zh') {
    return `${name} 参考出厂价 ${priceText}（邢台 EXW）。国际运费另计，由买方承担。${inquire}`;
  }
  if (lang === 'pt') {
    return `Preço EXW Xingtai indicativo de ${name}: ${priceText}. O frete internacional é extra e pago pelo comprador. ${inquire}`;
  }
  if (lang === 'ar') {
    return `السعر التقريبي EXW شينغتاي لـ ${name}: ${priceText}. الشحن الدولي إضافي ويدفعه المشتري. ${inquire}`;
  }
  return `Indicative EXW Xingtai price for ${name}: ${priceText}. International freight is extra and paid by the buyer. ${inquire}`;
}

/** 每产品最多 5 条 FAQ，基于产品实体字段生成（不编造参数） */
export function getProductFaqs(product: Product, lang: Lang): ProductFaqItem[] {
  const name = pick(product.name, lang);
  const what = pick(product.geo.answers.whatIs, lang);
  const who = pick(product.geo.answers.whoNeeds, lang);
  const manufacturer = pick(product.geo.manufacturer, lang);
  const madeIn = pick(product.geo.manufacturedIn, lang);
  const inquire = pick(product.geo.answers.howToInquire, lang);
  const price = getIndicativePrice(product.slug);
  const priceText = price ? formatIndicativeUsd(price.usd) : '';
  const hasSpecs = product.specifications.length > 0;
  const keySpecs = product.specifications
    .slice(0, 4)
    .map((s) => `${pick(s.label, lang)}: ${pick(s.value, lang)}`)
    .join(specJoiner(lang));
  const quote = quoteAnswer(lang, name, priceText, inquire);

  if (lang === 'zh') {
    return [
      { question: `${name} 是什么设备？`, answer: what },
      { question: `谁需要 ${name}？`, answer: who },
      {
        question: hasSpecs
          ? `${name} 的关键技术参数有哪些？`
          : `${name} 是否有完整技术参数？`,
        answer: hasSpecs
          ? `根据产品目录：${keySpecs}。完整列表见本页技术参数表。`
          : '当前产品目录仅标注型号，未提供详细技术参数。请通过邮件或 WhatsApp 向厂家索取最新参数表后再选型。',
      },
      {
        question: `${name} 由谁制造？在哪里生产？`,
        answer: `${name} 由 ${manufacturer} 制造，产地：${madeIn}。`,
      },
      { question: `${name} 大概多少钱？如何报价？`, answer: quote },
    ];
  }

  if (lang === 'pt') {
    return [
      { question: `O que é ${name}?`, answer: what },
      { question: `Quem precisa de ${name}?`, answer: who },
      {
        question: hasSpecs
          ? `Quais são as especificações principais de ${name}?`
          : `Há especificações detalhadas publicadas para ${name}?`,
        answer: hasSpecs
          ? `Segundo o catálogo: ${keySpecs}. Veja a tabela completa nesta página.`
          : 'O catálogo atual indica só o modelo, sem parâmetros técnicos detalhados. Peça a ficha atual por e-mail ou WhatsApp antes de selecionar.',
      },
      {
        question: `Quem fabrica ${name} e onde?`,
        answer: `${name} é fabricado por ${manufacturer}, em ${madeIn}.`,
      },
      { question: `Qual o preço de ${name} e como cotar?`, answer: quote },
    ];
  }

  if (lang === 'ar') {
    return [
      { question: `ما هو ${name}؟`, answer: what },
      { question: `من يحتاج إلى ${name}؟`, answer: who },
      {
        question: hasSpecs
          ? `ما المواصفات الرئيسية لـ ${name}؟`
          : `هل نُشرت مواصفات تفصيلية لـ ${name}؟`,
        answer: hasSpecs
          ? `وفق الكتالوج: ${keySpecs}. راجع جدول المواصفات الكامل في هذه الصفحة.`
          : 'الكتالوج الحالي يذكر اسم الطراز فقط دون معايير تقنية تفصيلية. اطلب ورقة المعايير عبر البريد أو واتساب قبل الاختيار.',
      },
      {
        question: `من يصنّع ${name} وأين؟`,
        answer: `يُصنَّع ${name} بواسطة ${manufacturer} في ${madeIn}.`,
      },
      { question: `كم سعر ${name} وكيف أطلب عرض سعر؟`, answer: quote },
    ];
  }

  return [
    { question: `What is ${name}?`, answer: what },
    { question: `Who needs ${name}?`, answer: who },
    {
      question: hasSpecs
        ? `What are the key specifications of ${name}?`
        : `Are detailed specifications published for ${name}?`,
      answer: hasSpecs
        ? `According to the product catalogue: ${keySpecs}. See the full specifications table on this page.`
        : 'The current catalogue lists the model name only without detailed technical parameters. Please email or WhatsApp the manufacturer for the latest parameter sheet before selection.',
    },
    {
      question: `Who manufactures ${name} and where?`,
      answer: `${name} is manufactured by ${manufacturer}, located at ${madeIn}.`,
    },
    { question: `What is the price of ${name} and how do I get a quote?`, answer: quote },
  ];
}
