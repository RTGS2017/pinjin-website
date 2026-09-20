import type { Product } from '@/data/products';
import {
  getHowToSelect,
  getNotSuitable,
  specText,
} from '@/data/productP01';
import { getNearbyComparisonText } from '@/data/productCompare';
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

function quoteAnswer(lang: Lang, name: string, inquire: string, inquiryOnly: boolean): string {
  if (inquiryOnly) return inquire;
  if (lang === 'zh') {
    return `${name} 无公开标价。国际运费另计，由买方承担。${inquire}`;
  }
  if (lang === 'pt') {
    return `${name} não tem preço de tabela publicado. O frete internacional é extra e pago pelo comprador. ${inquire}`;
  }
  if (lang === 'ar') {
    return `لا يوجد سعر قائمة منشور لـ ${name}. الشحن الدولي إضافي ويدفعه المشتري. ${inquire}`;
  }
  if (lang === 'ru') {
    return `Для ${name} нет опубликованной прайс-цены. Международная доставка оплачивается покупателем отдельно. ${inquire}`;
  }
  return `There is no published list price for ${name}. International freight is extra and paid by the buyer. ${inquire}`;
}

function t(lang: Lang, table: Record<Lang, string>): string {
  return table[lang] ?? table.en;
}

/** 8–12 条 FAQ，只引用本页已公布目录字段，不编造参数。 */
export function getProductFaqs(product: Product, lang: Lang): ProductFaqItem[] {
  const name = pick(product.name, lang);
  const what = pick(product.geo.answers.whatIs, lang);
  const who = pick(product.geo.answers.whoNeeds, lang);
  const manufacturer = pick(product.geo.manufacturer, lang);
  const madeIn = pick(product.geo.manufacturedIn, lang);
  const inquire = pick(product.geo.answers.howToInquire, lang);
  const howSelect = pick(getHowToSelect(product), lang);
  const notSuitable = getNotSuitable(product)
    .map((item) => pick(item, lang))
    .join(specJoiner(lang));
  const hasSpecs = product.specifications.length > 0;
  const keySpecs = product.specifications
    .slice(0, 4)
    .map((s) => `${pick(s.label, lang)}: ${pick(s.value, lang)}`)
    .join(specJoiner(lang));
  const quote = quoteAnswer(lang, name, inquire, Boolean(product.inquiryOnly));
  const wear = product.partKind === 'wear';
  const spare = product.category === 'spare-parts';
  const aggregate = specText(product, lang, ['aggregate', 'particle']);
  const distance = specText(product, lang, [
    'pumping distance',
    'delivery distance',
    'fine stone',
    'horizontal',
    'conveying',
  ]);
  const power = specText(product, lang, ['motor power', 'engine', 'diesel']);
  const output = specText(product, lang, ['output', 'capacity']);

  const items: ProductFaqItem[] = [];

  items.push({
    question: t(lang, {
      en: wear ? `What is ${name}?` : `What is ${name}?`,
      zh: wear ? `${name} 是什么配件？` : `${name} 是什么设备？`,
      pt: `O que é ${name}?`,
      ar: `ما هو ${name}؟`,
      ru: `Что такое ${name}?`,
    }),
    answer: what,
  });
  items.push({
    question: t(lang, {
      en: `Who needs ${name}?`,
      zh: `谁需要 ${name}？`,
      pt: `Quem precisa de ${name}?`,
      ar: `من يحتاج إلى ${name}؟`,
      ru: `Кому нужен ${name}?`,
    }),
    answer: who,
  });
  items.push({
    question: hasSpecs
      ? t(lang, {
          en: `What are the key specifications of ${name}?`,
          zh: `${name} 的关键技术参数有哪些？`,
          pt: `Quais são as especificações principais de ${name}?`,
          ar: `ما المواصفات الرئيسية لـ ${name}؟`,
          ru: `Какие ключевые параметры у ${name}?`,
        })
      : t(lang, {
          en: `Are detailed specifications published for ${name}?`,
          zh: `${name} 是否有完整技术参数？`,
          pt: `Há especificações detalhadas publicadas para ${name}?`,
          ar: `هل نُشرت مواصفات تفصيلية لـ ${name}؟`,
          ru: `Есть ли подробные технические параметры для ${name}?`,
        }),
    answer: hasSpecs
      ? t(lang, {
          en: `According to the product catalogue: ${keySpecs}. See the full specifications table on this page.`,
          zh: `根据产品目录：${keySpecs}。完整列表见本页技术参数表。`,
          pt: `Segundo o catálogo: ${keySpecs}. Veja a tabela completa nesta página.`,
          ar: `وفق الكتالوج: ${keySpecs}. راجع جدول المواصفات الكامل في هذه الصفحة.`,
          ru: `По каталогу: ${keySpecs}. Полная таблица — на этой странице.`,
        })
      : t(lang, {
          en: 'The current catalogue lists the model name only without detailed technical parameters. Please email or WhatsApp the manufacturer for the latest parameter sheet before selection.',
          zh: '当前产品目录仅标注型号，未提供详细技术参数。请通过邮件或 WhatsApp 向厂家索取最新参数表后再选型。',
          pt: 'O catálogo atual indica só o modelo, sem parâmetros técnicos detalhados. Peça a ficha atual por e-mail ou WhatsApp antes de selecionar.',
          ar: 'الكتالوج الحالي يذكر اسم الطراز فقط دون معايير تقنية تفصيلية. اطلب ورقة المعايير عبر البريد أو واتساب قبل الاختيار.',
          ru: 'В текущем каталоге указано только название модели без подробных технических параметров. Запросите актуальный лист параметров по почте или WhatsApp до выбора.',
        }),
  });
  items.push({
    question: t(lang, {
      en: `Who manufactures ${name} and where?`,
      zh: `${name} 由谁制造？在哪里生产？`,
      pt: `Quem fabrica ${name} e onde?`,
      ar: `من يصنّع ${name} وأين؟`,
      ru: `Кто производит ${name} и где?`,
    }),
    answer: t(lang, {
      en: `${name} is manufactured by ${manufacturer}, located at ${madeIn}.`,
      zh: `${name} 由 ${manufacturer} 制造，产地：${madeIn}。`,
      pt: `${name} é fabricado por ${manufacturer}, em ${madeIn}.`,
      ar: `يُصنَّع ${name} بواسطة ${manufacturer} في ${madeIn}.`,
      ru: `${name} производит ${manufacturer}, место производства: ${madeIn}.`,
    }),
  });
  items.push({
    question: t(lang, {
      en: `What is the price of ${name} and how do I get a quote?`,
      zh: `${name} 大概多少钱？如何报价？`,
      pt: `Qual o preço de ${name} e como cotar?`,
      ar: `كم سعر ${name} وكيف أطلب عرض سعر؟`,
      ru: `Сколько стоит ${name} и как запросить цену?`,
    }),
    answer: quote,
  });

  if (spare) {
    items.push({
      question: t(lang, {
        en: `Can I order one or two pieces of ${name} as a trial?`,
        zh: `${name} 能否只买一两件试用？`,
        pt: `Posso pedir uma ou duas peças de ${name} para teste?`,
        ar: `هل يمكن طلب قطعة أو قطعتين من ${name} للتجربة؟`,
        ru: `Можно ли заказать одну-две штуки ${name} на пробу?`,
      }),
      answer: t(lang, {
        en: 'No. These replacement parts are packed for project quantities, not small-batch parcels. Ask the factory what minimum quantity applies.',
        zh: '不能。此类替换件按工程量包装发运，不支持小批量包裹。请向工厂确认起订数量。',
        pt: 'Não. Estas peças saem em quantidades de obra, não em encomendas pequenas. Pergunte o mínimo à fábrica.',
        ar: 'لا. تُعبَّأ هذه القطع لكميات المشروع لا للطرود الصغيرة. اسأل المصنع عن الحد الأدنى.',
        ru: 'Нет. Эти детали отгружают проектными партиями, не мелкими посылками. Уточните минимум на заводе.',
      }),
    });
    if (wear) {
      items.push({
        question: t(lang, {
          en: `Are these OEM parts of other pump brands?`,
          zh: `这些是其他泵品牌的原厂件吗？`,
          pt: `São peças originais de outras marcas de bomba?`,
          ar: `هل هذه قطع أصلية لعلامات مضخات أخرى؟`,
          ru: `Это оригинальные детали других марок насосов?`,
        }),
        answer: t(lang, {
          en: 'No. They are Xingtai replacement wear parts. Confirm the outer diameter or kit on the pump before ordering.',
          zh: '不是。邢台替换易损件。下单前请在泵上核对外径或套件。',
          pt: 'Não. São peças de reposição de Xingtai. Confirme o diâmetro externo ou o kit na bomba.',
          ar: 'لا. قطع تآكل بديلة من شينغتاي. أكّد القطر الخارجي أو الطقم على المضخة.',
          ru: 'Нет. Это сменные изнашиваемые детали из Синтая. Сверьте наружный диаметр или комплект на насосе.',
        }),
      });
    }
  } else {
    items.push({
      question: t(lang, {
        en: `What mix or aggregate can ${name} pump?`,
        zh: `${name} 能泵送什么材料或骨料？`,
        pt: `Que mistura ou agregado ${name} pode bombear?`,
        ar: `ما الخلطة أو الركام الذي تضخه ${name}؟`,
        ru: `Какую смесь или заполнитель может подавать ${name}?`,
      }),
      answer: aggregate
        ? t(lang, {
            en: `The catalogue lists maximum aggregate ${aggregate}. Send the mix design so the factory can match that published limit. Unpublished mixes are not promised.`,
            zh: `目录列出最大骨料 ${aggregate}。请发送配合比，以便工厂对照该已公布上限。未公布的配比不作承诺。`,
            pt: `O catálogo indica agregado máximo ${aggregate}. Envie o traço para a fábrica confrontar esse limite publicado. Misturas não publicadas não são prometidas.`,
            ar: `الكتالوج يذكر الركام الأقصى ${aggregate}. أرسل تصميم الخلطة ليطابق المصنع هذا الحد المنشور. لا نعد بخلطات غير منشورة.`,
            ru: `В каталоге указан макс. заполнитель ${aggregate}. Пришлите состав смеси, чтобы завод сверил опубликованный предел. Неопубликованные смеси не обещаем.`,
          })
        : t(lang, {
            en: 'This model page does not list a maximum aggregate size. Send the mix and aggregate so the factory can confirm against a listed configuration. Unpublished performance is not promised.',
            zh: '本型号页未列出最大骨料粒径。请发送配合比与骨料，由工厂对照已列配置确认。不承诺未公布性能。',
            pt: 'Esta página não publica granulometria máxima. Envie o traço para a fábrica confirmar numa configuração listada. Desempenho não publicado não é prometido.',
            ar: 'هذه الصفحة لا تنشر حجم ركام أقصى. أرسل الخلطة ليؤكد المصنع وفق تهيئة مدرجة. لا نعد بأداء غير منشور.',
            ru: 'На странице модели нет макс. фракции. Пришлите смесь, чтобы завод подтвердил по опубликованной конфигурации. Неопубликованные показатели не обещаем.',
          }),
    });
    if (distance) {
      items.push({
        question: t(lang, {
          en: `What conveying distance is listed for ${name}?`,
          zh: `${name} 目录输送距离是多少？`,
          pt: `Qual distância de transporte está no catálogo de ${name}?`,
          ar: `ما مسافة النقل المدرجة لـ ${name}؟`,
          ru: `Какая дальность указана для ${name}?`,
        }),
        answer: t(lang, {
          en: `The catalogue lists ${distance}. Use that row, not a distance copied from another model.`,
          zh: `目录列出 ${distance}。请用这一行，不要套用其他型号的距离。`,
          pt: `O catálogo indica ${distance}. Use esta linha, não a distância de outro modelo.`,
          ar: `الكتالوج يذكر ${distance}. استخدم هذا الصف لا مسافة طراز آخر.`,
          ru: `В каталоге указано ${distance}. Берите эту строку, не дистанцию другой модели.`,
        }),
      });
    }
    if (power) {
      items.push({
        question: t(lang, {
          en: `What power does ${name} use?`,
          zh: `${name} 用什么动力？`,
          pt: `Que energia usa ${name}?`,
          ar: `ما طاقة ${name}؟`,
          ru: `Какое питание у ${name}?`,
        }),
        answer: t(lang, {
          en: `The catalogue lists ${power}${output ? `; theoretical output ${output}` : ''}. Confirm site voltage/frequency or diesel supply before ordering. Engine brand beyond the printed row is not invented here.`,
          zh: `目录列出 ${power}${output ? `；理论输送量 ${output}` : ''}。下单前请确认现场电压频率或柴油供应。目录行以外的发动机品牌不在此编造。`,
          pt: `O catálogo indica ${power}${output ? `; vazão teórica ${output}` : ''}. Confirme tensão/frequência ou diesel antes de pedir. Marca de motor fora da linha impressa não é inventada.`,
          ar: `الكتالوج يذكر ${power}${output ? `؛ التدفق النظري ${output}` : ''}. أكّد الجهد/التردد أو الديزل قبل الطلب. لا نختلق علامة محرك خارج الصف المطبوع.`,
          ru: `В каталоге: ${power}${output ? `; теоретическая подача ${output}` : ''}. Перед заказом подтвердите напряжение/частоту или дизель. Марку двигателя сверх печатной строки здесь не выдумываем.`,
        }),
      });
    }
  }

  const nearby = getNearbyComparisonText(product, lang);
  if (nearby) {
    items.push({
      question: t(lang, {
        en: `How does ${name} differ from nearby catalogue models?`,
        zh: `${name} 和相邻目录机型差在哪？`,
        pt: `Como ${name} difere dos modelos vizinhos do catálogo?`,
        ar: `كيف يختلف ${name} عن الطرازات المجاورة في الكتالوج؟`,
        ru: `Чем ${name} отличается от соседних моделей каталога?`,
      }),
      answer: nearby,
    });
  }

  items.push({
    question: t(lang, {
      en: `What is ${name} not suitable for?`,
      zh: `${name} 不适用什么工况？`,
      pt: `Para que ${name} não serve?`,
      ar: `ما الذي لا تناسب له ${name}؟`,
      ru: `Для чего ${name} не подходит?`,
    }),
    answer: notSuitable,
  });
  items.push({
    question: t(lang, {
      en: `How do I inquire about ${name}?`,
      zh: `如何询盘 ${name}？`,
      pt: `Como consultar ${name}?`,
      ar: `كيف أستفسر عن ${name}؟`,
      ru: `Как запросить ${name}?`,
    }),
    answer: `${howSelect} ${inquire}`,
  });
  items.push({
    question: t(lang, {
      en: 'Do you have overseas warehouses or a global dealer network?',
      zh: '有没有海外仓或全球经销网络？',
      pt: 'Há armazém no exterior ou rede global de distribuidores?',
      ar: 'هل لديكم مستودع خارجي أو شبكة وكلاء عالمية؟',
      ru: 'Есть ли зарубежный склад или глобальная дилерская сеть?',
    }),
    answer: t(lang, {
      en: 'No overseas warehouse or exclusive country dealer list is published on this site. Quotes and shipment are arranged from the Xingtai factory. WhatsApp and email are the contact channels listed.',
      zh: '本站未公布海外仓或独家国别经销商名单。报价与发运由邢台工厂安排。联系方式为已公布的 WhatsApp 与邮箱。',
      pt: 'Este site não publica armazém no exterior nem lista exclusiva de distribuidores. Cotação e envio saem da fábrica de Xingtai. WhatsApp e e-mail são os canais listados.',
      ar: 'لا يُنشر هنا مستودع خارجي ولا قائمة وكلاء حصرية. العرض والشحن من مصنع شينغتاي. واتساب والبريد هما القناتان المنشورتان.',
      ru: 'На сайте нет зарубежного склада и эксклюзивного списка дилеров. Котировка и отгрузка — с завода в Синтае. Каналы — опубликованные WhatsApp и почта.',
    }),
  });

  return items.slice(0, 12);
}
