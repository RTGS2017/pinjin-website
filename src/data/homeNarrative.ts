import type { LocalizedText } from '@/i18n/types';
import { manufacturingSteps } from '@/data/manufacturingProcess';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

export const HOME_SCENES = [
  { key: 'hero', id: 'scene-hero', sticky: false, steps: 0 },
  { key: 'products', id: 'scene-products', sticky: false, steps: 0 },
  { key: 'selection', id: 'scene-selection', sticky: true, steps: 0 },
  { key: 'applications', id: 'applications', sticky: false, steps: 0 },
  { key: 'factory', id: 'why-pinjin', sticky: false, steps: 0 },
  { key: 'process', id: 'scene-process', sticky: true, steps: 6 },
  { key: 'knowledge', id: 'scene-knowledge', sticky: false, steps: 0 },
  { key: 'contact', id: 'contact', sticky: false, steps: 0 },
] as const;

export type HomeSceneKey = (typeof HOME_SCENES)[number]['key'];

export const homeSceneLabels: Record<HomeSceneKey, LocalizedText> = {
  hero: L('Hero', '首页'),
  products: L('Product System', '产品系统'),
  selection: L('Find the Right Pump', '按工况选型'),
  applications: L('Applications', '应用场景'),
  factory: L('Factory', '工厂'),
  process: L('From Inquiry to Shipment', '从询盘到发运'),
  knowledge: L('Buyer Questions', '采购问答'),
  contact: L('Contact', '联系工厂'),
};

export const homeCopy = {
  brandLockup: L('MACHINERY', '机械'),
  viewProducts: L('VIEW PRODUCTS', '查看产品'),
  who: L('Who', '厂商'),
  what: L('What', '产品'),
  where: L('Where', '产地'),
  why: L('Why', '定位'),
  whoValue: L('Hebei Pinjin Machinery', '河北品锦机械'),
  whatValue: L('Electric · Diesel · Mixer · Spraying', '电动 · 柴油 · 搅拌泵 · 喷涂机'),
  whereValue: L('Xingtai, Hebei, China', '中国河北邢台'),
  whyValue: L('Source manufacturer of delivery pumps', '输送泵源头生产厂家'),
  heroFacts: [
    {
      k: { en: 'Manufacturing', zh: '专业制造', pt: 'Fabricação', ar: 'تصنيع', ru: 'Производство' },
      v: {
        en: 'Concrete Pumps & Construction Equipment',
        zh: '混凝土泵与工程输送设备',
        pt: 'Bombas de concreto e equipamentos de obra',
        ar: 'مضخات خرسانة ومعدات إنشائية',
        ru: 'Бетононасосы и строительное оборудование',
      },
    },
    {
      k: { en: 'Industry Cluster', zh: '产业集群', pt: 'Polo industrial', ar: 'التجمع الصناعي', ru: 'Промышленный кластер' },
      v: {
        en: 'Xingtai Machinery Manufacturing Hub',
        zh: '邢台机械制造产业集群',
        pt: 'Polo de máquinas de Xingtai',
        ar: 'مركز شينغتاي لصناعة الآلات',
        ru: 'Машиностроительный кластер Синтая',
      },
    },
    {
      k: { en: 'Global Supply', zh: '全球供应', pt: 'Fornecimento global', ar: 'توريد عالمي', ru: 'Мировые поставки' },
      v: {
        en: 'OEM · Export · Project Support',
        zh: 'OEM · 出口 · 项目支持',
        pt: 'OEM · Exportação · Apoio a projetos',
        ar: 'OEM · تصدير · دعم المشاريع',
        ru: 'OEM · Экспорт · Поддержка проектов',
      },
    },
  ] as const,
  modelRange: L('Catalogue models', '目录型号'),
  explore: L('Explore', '查看分类'),
  nextQuestion: L('Next question', '下一问'),
  fullGuide: L('Open the full Product Selection Guide', '打开完整选型指南'),
  buyerQuestions: L('Buyer questions', '采购常见问题'),
  moreFaq: L('Read all FAQs', '查看全部问答'),
  moreKnowledge: L('More technical notes', '更多技术文章'),
  inquiryStep: L('Inquiry', '询盘'),
  inquiryBody: L(
    'Send mix type, aggregate size, output, horizontal and vertical distance, and site power. The factory replies by WhatsApp or email with a listed model — not a matching algorithm.',
    '发送材料、骨料粒径、输送量、水平/垂直距离与现场动力。工厂通过 WhatsApp 或邮件对照已列型号回复，不是自动匹配算法。',
  ),
  shipmentStep: L('Factory packing and dispatch', '出厂包装与发运'),
  shipmentBody: L(
    'Finished equipment is packed and dispatched from the Xingtai factory after production and inspection.',
    '成品在邢台工厂完成生产与检测后包装发运。',
  ),
  factoryLead: L(
    'Workshop production, assembly, inspection and packing at the Xingtai factory in Renze Industrial Park.',
    '邢台任泽工业园区工厂：车间生产、装配、检测与包装。',
  ),
};

export const factoryNarrativeIds = [
  'workshop-crane',
  'trailer-assembly',
  'concrete-manufacturing',
  'factory-loading',
] as const;

export const factoryNarrativeCopy = [
  {
    id: 'workshop',
    slideId: 'workshop-crane',
    title: L('Workshop', '车间'),
    body: L(
      'Heavy components are handled in the production workshop at Hebei Pinjin Machinery in Xingjiawan, Xingtai.',
      '品锦机械在邢台邢家湾生产车间完成重型部件吊运与生产作业。',
    ),
  },
  {
    id: 'assembly',
    slideId: 'trailer-assembly',
    title: L('Assembly', '装配'),
    body: L(
      'Trailer concrete pumps are assembled as a source manufacturer covering R&D, production and sales.',
      '作为集研发、生产与销售一体的源头厂家完成拖式混凝土泵装配。',
    ),
  },
  {
    id: 'testing',
    slideId: 'concrete-manufacturing',
    title: manufacturingSteps[3].title,
    body: manufacturingSteps[3].body,
  },
  {
    id: 'packing',
    slideId: 'factory-loading',
    title: L('Packing', '包装'),
    body: L(
      'Finished equipment is packed at the factory in Renze Industrial Park, Xingtai, Hebei.',
      '成品在河北省邢台市任泽工业园区工厂完成包装。',
    ),
  },
] as const;

export const processNarrative = [
  {
    id: 'inquiry',
    title: homeCopy.inquiryStep,
    body: homeCopy.inquiryBody,
  },
  ...manufacturingSteps.map((step) => ({
    id: step.id,
    title: step.title,
    body: step.body,
  })),
] as const;

export const homeFaqIds = [
  'who-is-pinjin',
  'what-products',
  'how-to-choose',
  'diesel-vs-motor',
  'location',
] as const;

export const homeFaqProductLinks: Record<string, string[]> = {
  'how-to-choose': [
    'electric-40-concrete-pump',
    'diesel-50-concrete-pump',
    'electric-80-concrete-pump',
  ],
  'diesel-vs-motor': ['diesel-40-concrete-pump', 'electric-40-concrete-pump'],
  'what-products': ['integrated-mixer-pump'],
};

export const homeKnowledgeSlugsShort = [
  'electric-15-concrete-pump-applications',
  'diesel-concrete-pump-no-electricity',
  'high-rise-building-concrete-pump-selection',
] as const;

export const categoryShowcaseSlugs: Record<string, string> = {
  'electric-concrete-pump': 'electric-40-concrete-pump',
  'diesel-concrete-pump': 'diesel-50-concrete-pump',
  'mixer-pump': 'integrated-mixer-pump',
  'spraying-machine': 'hydraulic-concrete-spraying-machine',
  'spare-parts': 'concrete-pump-delivery-pipe',
};
