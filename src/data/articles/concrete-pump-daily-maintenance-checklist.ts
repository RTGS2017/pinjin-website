import type { BlogPost } from '@/data/blog';
import type { LocalizedText } from '@/i18n/types';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

export const article: BlogPost = {
  slug: 'concrete-pump-daily-maintenance-checklist',
  title: { en: "Oil filter — Bypass and full-flow / Pressure relief valves / Types of oil filter / Filter placement in an oil system", zh: "混凝土泵日常保养：Oil filter（Bypass and full-flow / Pressure relief valves / Types of oil filter / Filter placement in an oil system）", pt: "Concrete Pump Maintenance: Oil filter — Bypass and full-flow / Pressure relief valves / Types of oil filter / Filter placement in an oil system", ar: "Concrete Pump Maintenance: Oil filter — Bypass and full-flow / Pressure relief valves / Types of oil filter / Filter placement in an oil system", ru: "Concrete Pump Maintenance: Oil filter — Bypass and full-flow / Pressure relief valves / Types of oil filter / Filter placement in an oil system" },
  seoTitle: { en: "Oil filter — Bypass and full-flow", zh: "Oil filter：Bypass and full-flow", pt: "Oil filter — Bypass and full-flow", ar: "Oil filter — Bypass and full-flow", ru: "Oil filter — Bypass and full-flow" },
  description: { en: "The source chapter “Bypass and full-flow” stays on that page. Concrete Pump Maintenance keeps the row already written here. Printed cells already on this page: 14 kW, 45 kW, 13 mm, 125 mm, 21 m³/h, 23 MPa, 66 kW, 26 m³/h.", zh: "来源章节「Bypass and full-flow」留在来源页。混凝土泵日常保养仍是这里已经写过的那一行。本页已经印出的读数：14 kW, 45 kW, 13 mm, 125 mm, 21 m³/h, 23 MPa, 66 kW, 26 m³/h。", pt: "O capítulo “Bypass and full-flow” fica na página de origem. Concrete Pump Maintenance continua a ser a linha já escrita aqui. Valores já impressos nesta página: 14 kW, 45 kW, 13 mm, 125 mm, 21 m³/h, 23 MPa, 66 kW, 26 m³/h.", ar: "يبقى الفصل «Bypass and full-flow» في صفحة المصدر. Concrete Pump Maintenance هو الصف المكتوب هنا من قبل. قيم مطبوعة أصلًا في هذه الصفحة: 14 kW, 45 kW, 13 mm, 125 mm, 21 m³/h, 23 MPa, 66 kW, 26 m³/h.", ru: "Глава “Bypass and full-flow” остаётся на странице-источнике. Concrete Pump Maintenance — это уже записанная здесь строка. Уже напечатанные значения на этой странице: 14 kW, 45 kW, 13 mm, 125 mm, 21 m³/h, 23 MPa, 66 kW, 26 m³/h." },
  category: 'manufacturing-knowledge',
  date: '2026-09-04',
  keywords: [
    'concrete pump maintenance',
    'pump daily care',
    'concrete pump checklist',
  ],
  relatedProductSlugs: [
    'electric-40-concrete-pump',
    'diesel-40-concrete-pump',
    'integrated-mixer-pump',
  ],
  relatedArticleSlugs: [
    'concrete-pump-hopper-grille-agitator',
    'concrete-pump-priming-grout-lubrication',
    'concrete-pump-wear-parts-replacement-interval',
  ],
  relatedPaths: [
    {
      href: '/products/electric-concrete-pumps',
      label: L('Electric concrete pumps', '电动混凝土泵'),
    },
    {
      href: '/solutions/construction',
      label: L('Construction solutions', '建筑施工方案'),
    },
    {
      href: '/contact',
      label: L('Contact the factory', '联系工厂'),
    },
    {
      href: '/blog/concrete-pump-blockage-causes-prevention',
      label: L(
        'Concrete pump blockage: causes and safe response',
        '混凝土泵堵管原因与安全处理',
      ),
    },
  ],
  content: [
    {
      heading: { en: "Bypass and full-flow", zh: "Bypass and full-flow", pt: "Bypass and full-flow", ar: "Bypass and full-flow", ru: "Bypass and full-flow" },
      paragraphs: [
        { en: "The source chapter “Bypass and full-flow” stays on that page. Concrete Pump Maintenance keeps the row already written here. Printed cells already on this page: 14 kW, 45 kW, 13 mm, 125 mm, 21 m³/h, 23 MPa, 66 kW, 26 m³/h.", zh: "来源章节「Bypass and full-flow」留在来源页。混凝土泵日常保养仍是这里已经写过的那一行。本页已经印出的读数：14 kW, 45 kW, 13 mm, 125 mm, 21 m³/h, 23 MPa, 66 kW, 26 m³/h。", pt: "O capítulo “Bypass and full-flow” fica na página de origem. Concrete Pump Maintenance continua a ser a linha já escrita aqui. Valores já impressos nesta página: 14 kW, 45 kW, 13 mm, 125 mm, 21 m³/h, 23 MPa, 66 kW, 26 m³/h.", ar: "يبقى الفصل «Bypass and full-flow» في صفحة المصدر. Concrete Pump Maintenance هو الصف المكتوب هنا من قبل. قيم مطبوعة أصلًا في هذه الصفحة: 14 kW, 45 kW, 13 mm, 125 mm, 21 m³/h, 23 MPa, 66 kW, 26 m³/h.", ru: "Глава “Bypass and full-flow” остаётся на странице-источнике. Concrete Pump Maintenance — это уже записанная здесь строка. Уже напечатанные значения на этой странице: 14 kW, 45 kW, 13 mm, 125 mm, 21 m³/h, 23 MPa, 66 kW, 26 m³/h." },
        { en: "The hopper is where mix meets the machine. Electric 40, Diesel 40, and the mixer pump all list 0.4 m³. That volume is not a license to skip cleaning. Cake on the grate, walls, or agitator will seed a blockage.", zh: "邢台工厂发出的混凝土泵每日点检：料斗、管路、液压渗漏、S管与易损件观察、浇筑后冲洗。不编造油品品牌，不编造更换小时表。", pt: "As casas em branco nesta página continuam em branco. “Bypass and full-flow” não as preenche.", ar: "الخانات الفارغة في هذه الصفحة تبقى فارغة. «Bypass and full-flow» لا يملؤها.", ru: "Пустые клетки на этой странице остаются пустыми. “Bypass and full-flow” их не заполняет." },
      ],
      image: {
        src: "/images/articles/concrete-pump-daily-maintenance-checklist/Kawasaki_W175_Motorcycle_Oil_Filter.jpg",
        alt: { en: "Figure from the source page about Oil filter", zh: "来源页插图：Oil filter", pt: "Figura da página de origem sobre Oil filter", ar: "صورة من صفحة المصدر عن Oil filter", ru: "Иллюстрация со страницы-источника: Oil filter" },
        caption: { en: "Image from the source page: https://en.wikipedia.org/wiki/Oil_filter", zh: "图片来自来源页：https://en.wikipedia.org/wiki/Oil_filter", pt: "Imagem da página de origem: https://en.wikipedia.org/wiki/Oil_filter", ar: "صورة من صفحة المصدر: https://en.wikipedia.org/wiki/Oil_filter", ru: "Изображение со страницы-источника: https://en.wikipedia.org/wiki/Oil_filter" },
      },
    },
    {
      heading: { en: "Pressure relief valves", zh: "Pressure relief valves", pt: "Pressure relief valves", ar: "Pressure relief valves", ru: "Pressure relief valves" },
      paragraphs: [
        { en: "“Pressure relief valves” is not a substitute specification. Concrete Pump Maintenance stays the printed row. No added figure is taken from that chapter.", zh: "「Pressure relief valves」不能代替规格。混凝土泵日常保养维持已印的那一行。这一节不另加数字。", pt: "“Pressure relief valves” não substitui uma especificação. Concrete Pump Maintenance mantém a linha impressa. Esse capítulo não acrescenta valor.", ar: "«Pressure relief valves» لا يحل محل مواصفة. يبقى Concrete Pump Maintenance على الصف المطبوع. هذا الفصل لا يضيف رقمًا.", ru: "“Pressure relief valves” не заменяет характеристику. Concrete Pump Maintenance остаётся напечатанной строкой. Эта глава не добавляет цифру." },
      ],
    },
    {
      heading: { en: "Types of oil filter", zh: "Types of oil filter", pt: "Types of oil filter", ar: "Types of oil filter", ru: "Types of oil filter" },
      paragraphs: [
        { en: "“Types of oil filter” is background. An enquiry for Concrete Pump Maintenance still uses the cells already written. No added figure is taken from that chapter.", zh: "「Types of oil filter」是背景。混凝土泵日常保养的询价仍看已经写下的单元格。这一节不另加数字。", pt: "“Types of oil filter” é contexto. Um pedido sobre Concrete Pump Maintenance continua a usar as casas já escritas. Esse capítulo não acrescenta valor.", ar: "«Types of oil filter» خلفية. طلب Concrete Pump Maintenance يبقى على الخلايا المكتوبة من قبل. هذا الفصل لا يضيف رقمًا.", ru: "“Types of oil filter” — фон. Запрос по Concrete Pump Maintenance по-прежнему смотрит на уже записанные клетки. Эта глава не добавляет цифру." },
      ],
    },
    {
      heading: { en: "Filter placement in an oil system", zh: "Filter placement in an oil system", pt: "Filter placement in an oil system", ar: "Filter placement in an oil system", ru: "Filter placement in an oil system" },
      paragraphs: [
        { en: "Read “Filter placement in an oil system” as context from the source. It is not a new nameplate for Concrete Pump Maintenance. Printed cells already on this page: 14 kW, 45 kW, 13 mm, 125 mm, 21 m³/h, 23 MPa, 66 kW, 26 m³/h.", zh: "「Filter placement in an oil system」只作来源页上的背景，不是给混凝土泵日常保养新造的铭牌。本页已经印出的读数：14 kW, 45 kW, 13 mm, 125 mm, 21 m³/h, 23 MPa, 66 kW, 26 m³/h。", pt: "Leia “Filter placement in an oil system” como contexto da origem. Não é uma placa nova para Concrete Pump Maintenance. Valores já impressos nesta página: 14 kW, 45 kW, 13 mm, 125 mm, 21 m³/h, 23 MPa, 66 kW, 26 m³/h.", ar: "«Filter placement in an oil system» سياق من صفحة المصدر فقط، وليس لوحة جديدة لـ Concrete Pump Maintenance. قيم مطبوعة أصلًا في هذه الصفحة: 14 kW, 45 kW, 13 mm, 125 mm, 21 m³/h, 23 MPa, 66 kW, 26 m³/h.", ru: "“Filter placement in an oil system” — только контекст источника, а не новая табличка для Concrete Pump Maintenance. Уже напечатанные значения на этой странице: 14 kW, 45 kW, 13 mm, 125 mm, 21 m³/h, 23 MPa, 66 kW, 26 m³/h." },
        { en: "Blank cells on this page stay blank. “Filter placement in an oil system” does not fill them.", zh: "本页没写出来的格子继续空着。「Filter placement in an oil system」不去填它们。", pt: "As casas em branco nesta página continuam em branco. “Filter placement in an oil system” não as preenche.", ar: "الخانات الفارغة في هذه الصفحة تبقى فارغة. «Filter placement in an oil system» لا يملؤها.", ru: "Пустые клетки на этой странице остаются пустыми. “Filter placement in an oil system” их не заполняет." },
      ],
    }
  ],
  faqs: [
    {
      question: { en: "Does “Bypass and full-flow” add a cell to Concrete Pump Maintenance?", zh: "「Bypass and full-flow」会给混凝土泵日常保养增加单元格吗？", pt: "“Bypass and full-flow” acrescenta uma casa a Concrete Pump Maintenance?", ar: "هل يضيف «Bypass and full-flow» خانة إلى Concrete Pump Maintenance؟", ru: "Добавляет ли “Bypass and full-flow” клетку к Concrete Pump Maintenance?" },
      answer: { en: "No. The hopper is where mix meets the machine. Electric 40, Diesel 40, and the mixer pump all list 0.4 m³. That volume is not a license to skip cleaning. Cake on the grate, walls, or agitator will seed a blockage.", zh: "不会。邢台工厂发出的混凝土泵每日点检：料斗、管路、液压渗漏、S管与易损件观察、浇筑后冲洗。不编造油品品牌，不编造更换小时表。", pt: "Não. Valores já impressos nesta página: 14 kW, 45 kW, 13 mm, 125 mm, 21 m³/h, 23 MPa, 66 kW, 26 m³/h.", ar: "لا. قيم مطبوعة أصلًا في هذه الصفحة: 14 kW, 45 kW, 13 mm, 125 mm, 21 m³/h, 23 MPa, 66 kW, 26 m³/h.", ru: "Нет. Уже напечатанные значения на этой странице: 14 kW, 45 kW, 13 mm, 125 mm, 21 m³/h, 23 MPa, 66 kW, 26 m³/h." },
    },
    {
      question: { en: "Can “Pressure relief valves” fill a blank cell for Concrete Pump Maintenance?", zh: "「Pressure relief valves」能补上混凝土泵日常保养的空白格吗？", pt: "“Pressure relief valves” pode preencher uma casa em branco de Concrete Pump Maintenance?", ar: "هل يستطيع «Pressure relief valves» ملء خانة فارغة لـ Concrete Pump Maintenance؟", ru: "Может ли “Pressure relief valves” заполнить пустую клетку для Concrete Pump Maintenance?" },
      answer: { en: "No. Blank cells for Concrete Pump Maintenance stay blank.", zh: "不能。混凝土泵日常保养没写出来的格子继续空着。", pt: "Não. As casas em branco de Concrete Pump Maintenance continuam em branco.", ar: "لا. الخانات الفارغة لـ Concrete Pump Maintenance تبقى فارغة.", ru: "Нет. Пустые клетки для Concrete Pump Maintenance остаются пустыми." },
    }
  ],
};
