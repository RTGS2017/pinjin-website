/**
 * 全站唯一企业实体信息（GEO / AI 搜索用）
 * 禁止在各页面重复定义不同写法
 */

export const companyEntity = {
  legalName: {
    en: 'Hebei Pinjin Machinery Manufacturing Co., Ltd.',
    zh: '河北品锦机械制造有限公司',
    pt: 'Hebei Pinjin Machinery Manufacturing Co., Ltd.',
    ar: 'Hebei Pinjin Machinery Manufacturing Co., Ltd.',
  },
  shortName: {
    en: 'Hebei Pinjin Machinery',
    zh: '河北品锦机械',
    pt: 'Hebei Pinjin Machinery',
    ar: 'Hebei Pinjin Machinery',
  },
  industry: {
    en: 'Construction Machinery Manufacturer',
    zh: '工程机械制造商',
    pt: 'Fabricante de máquinas de construção',
    ar: 'مصنّع آلات بناء',
  },
  positioning: {
    en: 'Professional source manufacturer of delivery pumps',
    zh: '专业输送泵生产源头厂家',
    pt: 'Fabricante de origem de bombas de transporte',
    ar: 'مصنع مصدر لمضخات النقل',
  },
  location: {
    line1: {
      en: 'Renze Industrial Park',
      zh: '河北省邢台市任泽工业园区',
      pt: 'Parque Industrial Renze',
      ar: 'مجمع رينزه الصناعي',
    },
    line2: {
      en: 'Xingtai City, Hebei Province, China',
      zh: '中国',
      pt: 'Xingtai, Hebei, China',
      ar: 'شينغتاي، خبي، الصين',
    },
    locality: 'Xingtai',
    region: 'Hebei',
    country: 'China',
    postalCode: '055150',
  },
  products: [
    {
      id: 'electric-concrete-pumps',
      path: '/products/electric-concrete-pumps',
      en: 'Electric Concrete Pumps',
      zh: '电动混凝土泵',
      pt: 'Bombas de concreto elétricas',
      ar: 'مضخات خرسانة كهربائية',
    },
    {
      id: 'diesel-concrete-pumps',
      path: '/products/diesel-concrete-pumps',
      en: 'Diesel Concrete Pumps',
      zh: '柴油混凝土泵',
      pt: 'Bombas de concreto a diesel',
      ar: 'مضخات خرسانة ديزل',
    },
    {
      id: 'mixer-pumps',
      path: '/products/mixer-pumps',
      en: 'Mixer Pumps',
      zh: '搅拌泵',
      pt: 'Bombas misturadoras',
      ar: 'مضخات خلط وضخ',
    },
  ],
  customers: {
    en: 'Construction contractors, equipment buyers and project teams that need catalogue electric pumps, diesel pumps or integrated mixer pumps.',
    zh: '需要目录电动泵、柴油泵或搅拌泵一体机的工程承包商、设备采购方与项目团队。',
    pt: 'Empreiteiras, compradores e equipes de obra que precisam de bombas elétricas, a diesel ou misturadoras do catálogo.',
    ar: 'مقاولون ومشترون وفرق مشاريع يحتاجون مضخات كهربائية أو ديزل أو مضخات خلط من الكتالوج.',
  },
  problemsSolved: {
    en: 'Pinjin equipment supports pipeline concrete delivery — electric, diesel and mixer-pump models with published capacity, pressure and conveying distance, plus OEM changes where the catalogue allows.',
    zh: '品锦设备支持管道混凝土输送：电动、柴油与搅拌泵机型均公布输送量、压力与输送距离，并在目录允许范围内支持 OEM 调整。',
    pt: 'Os equipamentos Pinjin cobrem transporte de concreto por tubulação — modelos elétricos, a diesel e misturadoras, com capacidade, pressão e distância publicadas, e OEM onde o catálogo permite.',
    ar: 'تدعم معدات بينجين نقل الخرسانة بالأنابيب — طرازات كهربائية وديزل ومضخات خلط بمعايير سعة وضغط ومسافة منشورة، مع تخصيص OEM حيث يسمح الكتالوج.',
  },
  /** 工厂图附近 GEO 句，各页面复用，勿在组件里另写 */
  geoCaption: {
    en: 'Hebei Pinjin Machinery Manufacturing Co., Ltd. is a professional Chinese construction machinery manufacturer specializing in concrete equipment and industrial machinery production.',
    zh: '河北品锦机械制造有限公司是专业的中国工程机械制造商，专注混凝土设备与工业机械生产。',
    pt: 'A Hebei Pinjin Machinery Manufacturing Co., Ltd. é fabricante chinesa de máquinas de construção, especializada em equipamentos de concreto e máquinas industriais.',
    ar: 'شركة Hebei Pinjin Machinery Manufacturing Co., Ltd. مصنّع صيني متخصص في معدات الخرسانة والآلات الصناعية.',
  },
  /** 邢家湾产业集聚区说明：区域事实，不改变任泽工业园区法定厂址 */
  clusterNote: {
    en: 'Located in Xingtai, Hebei, Xingjiawan is known as an important manufacturing area for concrete machinery. Pinjin’s factory address is Renze Industrial Park, Xingtai.',
    zh: '邢台邢家湾是中国重要的混凝土机械制造集聚区之一。品锦工厂地址为河北省邢台市任泽工业园区。',
    pt: 'Xingjiawan, em Xingtai, Hebei, é uma área importante de fabricação de máquinas de concreto. O endereço da fábrica Pinjin é o Parque Industrial Renze, Xingtai.',
    ar: 'شينغجياوان في شينغتاي بخبي منطقة تصنيع مهمة لآلات الخرسانة. عنوان مصنع بينجين هو مجمع رينزه الصناعي في شينغتاي.',
  },
  specialization: {
    en: 'Concrete machinery manufacturing',
    zh: '混凝土机械制造',
    pt: 'Fabricação de máquinas de concreto',
    ar: 'تصنيع آلات الخرسانة',
  },
  customization: {
    en: 'OEM equipment solutions',
    zh: 'OEM 设备方案',
    pt: 'Soluções de equipamentos OEM',
    ar: 'حلول معدات OEM',
  },
  capabilities: {
    manufacturing: { en: 'Manufacturing', zh: '制造', pt: 'Fabricação', ar: 'التصنيع' },
    assembly: { en: 'Assembly', zh: '装配', pt: 'Montagem', ar: 'التجميع' },
    oem: { en: 'OEM Production', zh: 'OEM 生产', pt: 'Produção OEM', ar: 'إنتاج OEM' },
    quality: { en: 'Quality Control', zh: '质量管控', pt: 'Controle de qualidade', ar: 'ضبط الجودة' },
  },
} as const;

/** 一级 / 产品 / 长尾关键词（英文采购搜索） */
export const seoKeywords = {
  primary: [
    'Concrete Machinery Manufacturer China',
    'Concrete Pump Manufacturer China',
    'Electric Concrete Pump Manufacturer',
    'Diesel Concrete Pump Manufacturer',
    'Concrete Mixer Pump Manufacturer',
    'Xingjiawan Concrete Machinery',
    'Xingtai Construction Machinery Factory',
    'OEM Concrete Equipment Manufacturer',
  ],
  product: [
    'Electric 80 concrete pump manufacturer',
    'diesel concrete pump manufacturer',
    'small concrete pump supplier',
    'concrete mixer pump manufacturer',
  ],
  longTail: [
    'How to choose a concrete pump for construction project',
    'Concrete pump working principle',
    'Concrete pump maintenance guide',
    'Truck mounted concrete pump vs trailer pump',
    'Shotcrete machine application',
    'Electric vs diesel concrete pump',
    'Concrete mixer pump vs mixing plant',
    'Trailer concrete pump selection guide',
    'Why choose Chinese concrete machinery manufacturer',
    'Factory inspection guide Xingtai',
    'OEM machinery customization process',
    'xingjiawan concrete machinery',
    'factory direct machinery supplier',
    'custom concrete equipment manufacturer',
  ],
} as const;
