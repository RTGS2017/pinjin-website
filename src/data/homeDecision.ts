import type { LocalizedText } from '@/i18n/types';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

/** Static Hero example. Numbers are Electric 20 catalogue rows only. */
export const exampleMatch = {
  badge: L('Example match', '示例对照'),
  reqTitle: L('Project requirements', '工况条件'),
  matchTitle: L('Matching listed model', '对照目录型号'),
  output: L('Required output', '目标输送量'),
  outputValue: '8–10 m³/h',
  horizontal: L('Horizontal distance', '水平距离'),
  horizontalValue: '120 m',
  vertical: L('Vertical distance', '垂直距离'),
  verticalValue: '40 m',
  aggregate: L('Aggregate', '骨料粒径'),
  aggregateValue: '1–2 cm',
  power: L('Power', '动力'),
  powerValue: L('Electric', '电动'),
  modelName: L('Electric 20', '电动20型'),
  motor: '22 kW',
  slug: 'electric-20-concrete-pump',
  viewModel: L('View model', '查看型号'),
} as const;

export const requirementPoints = [
  {
    n: '01',
    title: L('How much concrete do you need to place?', '需要浇筑多少混凝土？'),
    label: L('Required output', '目标输送量'),
  },
  {
    n: '02',
    title: L('How far and how high?', '要打多远、多高？'),
    label: L('Horizontal & vertical distance', '水平与垂直距离'),
  },
  {
    n: '03',
    title: L('What material are you pumping?', '泵送什么材料？'),
    label: L('Aggregate / mix conditions', '骨料 / 配合比'),
  },
  {
    n: '04',
    title: L('What power is available?', '现场有什么动力？'),
    label: L('Diesel / voltage / frequency', '柴油 / 电压 / 频率'),
  },
] as const;

export const requirementCopy = {
  kicker: L('Project requirements', '工况条件'),
  title: L(
    'Buying a concrete pump is not just about choosing a model.',
    '买混凝土泵不是先在目录里猜型号。',
  ),
  subtitle: L(
    'The right machine depends on your project conditions.',
    '合适的机型取决于工程条件。',
  ),
  close: L(
    'These conditions determine which equipment class should be compared.',
    '这些条件决定应对照哪一类设备。',
  ),
  cta: L('Start equipment selection', '开始对照选型'),
};

export const whyCopy = {
  kicker: L('Why Pinjin', '为何先看工况'),
  title: L(
    'We help you choose the machine before you place the order.',
    '下单前先对照工况，再选目录机型。',
  ),
  body: L(
    'Buying from a factory should not mean choosing a model from a long catalogue and hoping it fits. Pinjin organizes product selection around the conditions that actually affect pumping: output, aggregate, distance, power and project type. Then listed models can be compared against those requirements.',
    '向工厂采购不应是在长目录里选一个型号再碰运气。品锦按真正影响泵送的条件组织选型：输送量、骨料、距离、动力与工程类型，再对照已列型号。',
  ),
};

export const whyPoints = [
  {
    title: L('Match', '对照'),
    body: L(
      'Match listed catalogue models to output, distance, aggregate and power.',
      '按输送量、距离、骨料与动力对照已列目录型号。',
    ),
  },
  {
    title: L('Compare', '比较'),
    body: L(
      'Compare published rows across electric, diesel, mixer and spraying families.',
      '在电动、柴油、搅拌泵与喷涂机产品族之间比较已公布参数行。',
    ),
  },
  {
    title: L('Select', '选定'),
    body: L(
      'Select a listed class first, then open the model page for the printed table.',
      '先选定已列类别，再打开型号页核对印刷参数表。',
    ),
  },
  {
    title: L('Based on project conditions', '依据工况'),
    body: L(
      'The factory quote is based on the project conditions you send — not a ranking score.',
      '工厂报价依据你发送的工况，不是评分或保证性能。',
    ),
  },
] as const;

export const howCopy = {
  kicker: L('How it works', '询价路径'),
  title: L(
    'From project requirements to factory quote',
    '从工程条件到工厂报价',
  ),
  cta: L('Request factory quote', '申请工厂报价'),
};

export const howSteps = [
  {
    n: '01',
    title: L('Tell us your project', '说明工程条件'),
    body: L(
      'Material, aggregate, required output, horizontal and vertical distance, power and country.',
      '材料、骨料、目标输送量、水平/垂直距离、动力与国家。',
    ),
  },
  {
    n: '02',
    title: L('Compare suitable models', '对照合适类别'),
    body: L(
      'Electric, diesel, mixer pump or spraying machine — using listed catalogue families.',
      '电动、柴油、搅拌泵或喷涂机，仅对照已列产品族。',
    ),
  },
  {
    n: '03',
    title: L('Confirm technical conditions', '核对已公布参数'),
    body: L(
      'Output, pressure, distance, aggregate, power and pipe against the published table.',
      '对照目录表核对输送量、压力、距离、骨料、动力与管径。',
    ),
  },
  {
    n: '04',
    title: L('Get a factory quote', '获取工厂报价'),
    body: L(
      'Send the model, quantity, destination and the same project conditions. Not an automated matcher.',
      '发送型号、数量、目的地与同一套工况。不是自动匹配算法。',
    ),
  },
] as const;

export const useCaseCopy = {
  kicker: L('Equipment selection', '按用途选设备'),
  title: L('What are you trying to do?', '你的工程要完成什么？'),
};

export const useCases = [
  {
    n: '01',
    title: L('Small / compact projects', '小型 / 紧凑工地'),
    body: L(
      'Rural houses, small building sites, secondary structure and short-to-medium pumping.',
      '农房、小型工地、二次结构与中短距离泵送。',
    ),
    cta: L('View compact pumps', '查看紧凑型泵'),
    href: '/product-selection-guide#small-site',
    models: ['electric-15-concrete-pump', 'electric-20-concrete-pump'],
  },
  {
    n: '02',
    title: L('Building & commercial projects', '建筑与商业浇筑'),
    body: L(
      'Building construction, commercial concrete placement and pipeline conveying.',
      '房屋建筑、商业浇筑与管路输送。',
    ),
    cta: L('View electric pumps', '查看电动泵'),
    href: '/products/electric-concrete-pumps',
    models: ['electric-40-concrete-pump', 'electric-80-concrete-pump'],
  },
  {
    n: '03',
    title: L('Sites without grid power', '无稳定电网工地'),
    body: L(
      'Remote sites, infrastructure and jobs without a stable grid supply.',
      '偏远工地、基建及电网不稳定的现场。',
    ),
    cta: L('View diesel pumps', '查看柴油泵'),
    href: '/products/diesel-concrete-pumps',
  },
  {
    n: '04',
    title: L('Mixing + pumping in one machine', '搅拌与泵送一体'),
    body: L(
      'Sites that need both mixing and pumping on one trailer. Not a batching plant.',
      '需要同一拖车搅拌并泵送的现场。不是搅拌站。',
    ),
    cta: L('View mixer pumps', '查看搅拌泵'),
    href: '/products/mixer-pumps',
  },
] as const;

export const familyCopy = {
  kicker: L('Product families', '产品族'),
  title: L(
    'Choose by project, then compare the machines.',
    '先按工程类型，再对照机型。',
  ),
  why: L('Why this model?', '为何对照这一型号？'),
};

export const productFamilies = [
  {
    category: 'electric-concrete-pump' as const,
    href: '/products/electric-concrete-pumps',
    fit: L(
      'Grid-powered sites that can match listed kW, output and pipeline distance.',
      '有电网、可对照目录千瓦、输送量与管距的工地。',
    ),
  },
  {
    category: 'diesel-concrete-pump' as const,
    href: '/products/diesel-concrete-pumps',
    fit: L(
      'Sites without stable three-phase supply, using listed engine rows.',
      '无稳定三相电、对照目录发动机行的工地。',
    ),
  },
  {
    category: 'mixer-pump' as const,
    href: '/products/mixer-pumps',
    fit: L(
      'Mix and pump on one Xingtai trailer. Not a mixing plant.',
      '邢台目录的搅拌泵一体机。不是搅拌站。',
    ),
  },
  {
    category: 'spraying-machine' as const,
    href: '/products/spraying-machines',
    fit: L(
      'Mortar, plaster or concrete spraying with published particle and hose sizes. Not a trailer pump.',
      '目录公布粒径与胶管规格的喷涂机。不是拖式混凝土泵。',
    ),
  },
] as const;

export const featuredModels = [
  {
    slug: 'electric-20-concrete-pump',
    why: L(
      'Listed 22 kW, 8–10 m³/h, 120 m / 40 m and 1–2 cm aggregate — a compact electric table for shorter listed runs.',
      '目录：22 kW、8–10 m³/h、120 m / 40 m、骨料 1–2 cm，适合较短目录距离的紧凑电动表。',
    ),
  },
  {
    slug: 'electric-40-concrete-pump',
    why: L(
      'Listed 45 kW and 21 m³/h, with fine-stone 120 m / 360 m for medium building pipelines.',
      '目录：45 kW、21 m³/h，细石 120 m / 360 m，对照中型建筑管路。',
    ),
  },
  {
    slug: 'electric-80-concrete-pump',
    why: L(
      'Listed 110 kW, 60 m³/h and 900 m / 300 m with aggregate 24 mm (≤ 2 cm).',
      '目录：110 kW、60 m³/h、900 m / 300 m，骨料 24 mm（≤ 2 cm）。',
    ),
  },
  {
    slug: 'diesel-50-concrete-pump',
    why: L(
      'Listed 6105 / 99 kW, 30 m³/h and 150 m / 450 m for diesel trailer work. Aggregate is not a separate table row on this model.',
      '目录：6105 / 99 kW、30 m³/h、150 m / 450 m。该型号没有单独的最大骨料表行。',
    ),
  },
  {
    slug: 'diesel-120-concrete-pump',
    why: L(
      'Listed 290 kW, 100 m³/h, 150 m / 500 m and aggregate 6 cm and below.',
      '目录：290 kW、100 m³/h、150 m / 500 m，骨料 6 cm 及以下。',
    ),
  },
  {
    slug: 'integrated-mixer-pump',
    why: L(
      'Listed 45 kW main plus 14 kW mixer, 21 m³/h, 100 m / 300 m and aggregate 4 cm and below on one trailer.',
      '目录：主电机 45 kW + 搅拌 14 kW、21 m³/h、100 m / 300 m，骨料 4 cm 及以下，同一拖车。',
    ),
  },
] as const;

export const guideCopy = {
  kicker: L('Product selection guide', '产品选型指南'),
  title: L('Not sure which model fits?', '还不确定对照哪一型号？'),
  subtitle: L(
    'Start with your project conditions. This panel does not calculate a result — it opens the published selection guide.',
    '从工况开始。此面板不会自动计算结果，只打开已发布的选型指南。',
  ),
  cta: L('Compare suitable models', '对照合适型号'),
  output: L('Required output', '目标输送量'),
  horizontal: L('Horizontal distance', '水平距离'),
  vertical: L('Vertical distance', '垂直距离'),
  aggregate: L('Aggregate', '骨料粒径'),
  power: L('Power', '动力'),
};

export const systemCopy = {
  kicker: L('Pumping system', '泵送系统'),
  title: L(
    'The machine is only one part of the pumping system.',
    '泵只是泵送系统的一部分。',
  ),
  subtitle: L(
    'After the pump, confirm pipe diameter and length, hose, clamps and wear parts against the mix.',
    '选定泵后，还要按配合比确认管径与管长、胶管、卡箍与易损件。',
  ),
  cta: L('View concrete pump parts', '查看泵管配件'),
};

export const systemSteps = [
  L('Pump', '泵'),
  L('Delivery pipe', '输送管'),
  L('Clamp / hose', '卡箍 / 胶管'),
  L('Mix', '拌合物'),
  L('Job site', '工地'),
] as const;

export const proofCopy = {
  kicker: L('Why buy from Pinjin?', '为何向品锦询价'),
  title: L('Factory evidence, not marketing counts.', '工厂实据，不是营销数字。'),
  specs: L('Published specifications', '已公布参数'),
  inquire: L('Talk to the factory', '联系工厂'),
};

export const transparencyCopy = {
  kicker: L('Catalogue limits', '目录边界'),
  title: L(
    'We show what the catalogue says — and what it does not.',
    '目录写了什么，以及没有写什么。',
  ),
  published: L(
    'Published cells include theoretical output, pumping distance, aggregate size where listed, and motor or engine power.',
    '已公布单元格包括理论输送量、泵送距离、已列表的骨料粒径，以及电机或发动机功率。',
  ),
  limit: L(
    'Catalogue output is theoretical output. Actual site performance depends on mix, pipe, distance, crew and site conditions.',
    '目录输送量是理论输送量。现场表现取决于配合比、管路、距离、班组与工地条件。',
  ),
};

export const buyerCopy = {
  kicker: L('Who is this for?', '面向谁'),
  title: L('Roles we write for — not invented client logos.', '采购角色，不是虚构客户名。'),
};

export const buyerTypes = [
  {
    title: L('Contractors', '承包商'),
    body: L(
      'You need a listed machine for an active construction project.',
      '需要为在建工程对照目录机型。',
    ),
  },
  {
    title: L('Equipment buyers', '设备采购'),
    body: L(
      'You are comparing Chinese manufacturers and published models.',
      '正在比较中国厂家与已公布型号。',
    ),
  },
  {
    title: L('Project teams', '项目组'),
    body: L(
      'You need to match capacity, distance and power conditions.',
      '需要把产量、距离与动力条件对照起来。',
    ),
  },
  {
    title: L('Distributors / machinery dealers', '经销商'),
    body: L(
      'You need catalogue models and factory quotations.',
      '需要目录型号与工厂报价。',
    ),
  },
  {
    title: L('Residential / rural builders', '农房与小型施工'),
    body: L(
      'You need compact pumping equipment for smaller listed jobs.',
      '需要对照小型目录工地的紧凑泵送设备。',
    ),
  },
] as const;

export const knowledgeCopy = {
  kicker: L('Construction machinery knowledge', '工程机械知识'),
  title: L(
    'Read before you compare models.',
    '对照型号前先看这些判断。',
  ),
};

export const faqCopy = {
  kicker: L('Buyer FAQ', '采购问答'),
  title: L('Questions buyers actually send.', '采购方真正会问的问题。'),
};

/** Display-layer wording only. Answers stay in faq.ts. */
export const homeFaqQuestions: Record<string, LocalizedText> = {
  'who-is-pinjin': L(
    'Who is Pinjin, and where is the factory?',
    '品锦是谁？工厂在哪里？',
  ),
  'how-to-choose': L(
    'I do not know the model yet. How should I start?',
    '还不知道型号，应该从哪里开始？',
  ),
  'diesel-vs-motor': L(
    'Should I compare diesel or electric first?',
    '应该先对照柴油还是电动？',
  ),
  aggregate: L(
    'Does the catalogue list the aggregate size I can pump?',
    '目录有没有列出可泵送的骨料粒径？',
  ),
  'inquiry-fields': L(
    'What should I send to get a factory quote?',
    '向工厂询价要发哪些工况？',
  ),
  location: L(
    'Can overseas buyers inquire from Xingtai?',
    '海外买家能否向邢台工厂询盘？',
  ),
  customization: L(
    'Can you customize from a listed model?',
    '能否在已列型号上定制？',
  ),
  'not-suitable': L(
    'Do you sell boom pumps or mixing plants?',
    '是否销售臂架泵或搅拌站？',
  ),
  'no-overseas-warehouse': L(
    'Do you keep stock in an overseas warehouse?',
    '是否有海外仓存货？',
  ),
  'what-products': L(
    'What equipment is actually in the catalogue?',
    '目录里实际有哪些设备？',
  ),
};
