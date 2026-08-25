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
  },
  products: [
    {
      id: 'concrete-pumps',
      path: '/products/concrete-pumps',
      en: 'Concrete Pumps',
      zh: '混凝土泵 / 输送泵',
      pt: 'Bombas de concreto',
      ar: 'مضخات الخرسانة',
    },
    {
      id: 'spraying-machines',
      path: '/products/spraying-machines',
      en: 'Spraying Machines',
      zh: '喷涂设备',
      pt: 'Máquinas de projeção',
      ar: 'آلات الرش',
    },
    {
      id: 'material-handling',
      path: '/products/material-handling',
      en: 'Material Handling Equipment',
      zh: '物料搬运设备',
      pt: 'Equipamentos de movimentação de materiais',
      ar: 'معدات مناولة المواد',
    },
    {
      id: 'rebar-equipment',
      path: '/products/rebar-equipment',
      en: 'Rebar Processing Equipment',
      zh: '钢筋加工设备',
      pt: 'Equipamentos para aço',
      ar: 'معدات حديد التسليح',
    },
  ],
  customers: {
    en: 'Construction contractors, equipment buyers, and project teams that need reliable concrete delivery, spraying, material handling and rebar processing equipment.',
    zh: '需要可靠混凝土输送、喷涂、物料搬运与钢筋加工设备的工程承包商、设备采购方与项目团队。',
    pt: 'Empreiteiras, compradores de equipamentos e equipes de obra que precisam de transporte de concreto, projeção, movimentação de materiais e processamento de aço confiáveis.',
    ar: 'مقاولو بناء ومشترو معدات وفرق مشاريع يحتاجون نقل خرسانة ورشاً ومناولة مواد ومعالجة حديد تسليح موثوقة.',
  },
  problemsSolved: {
    en: 'Pinjin equipment supports concrete delivery, spraying, material feeding/handling and rebar bending for construction sites that require published capacity, conveying or processing parameters, and optional customization where listed.',
    zh: '品锦设备支持建筑现场的混凝土输送、喷涂、给料/搬运与钢筋弯箍，提供公开的产能、输送或加工参数，并在目录标明的型号上支持定制。',
    pt: 'Os equipamentos Pinjin cobrem transporte de concreto, projeção, alimentação/movimentação de materiais e dobragem de aço, com parâmetros publicados e customização onde o catálogo indica.',
    ar: 'تدعم معدات بينجين نقل الخرسانة والرش وتغذية/مناولة المواد وثني حديد التسليح في مواقع تتطلب معايير سعة ونقل أو تشغيل منشورة، مع تخصيص اختياري حيث يذكر الكتالوج.',
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
    'Concrete Spraying Equipment Manufacturer',
    'Xingjiawan Concrete Machinery',
    'Xingtai Construction Machinery Factory',
    'OEM Concrete Equipment Manufacturer',
  ],
  product: [
    'HBT80-18-140 concrete pump',
    'diesel concrete pump manufacturer',
    'small concrete pump supplier',
    'mortar spraying machine manufacturer',
  ],
  longTail: [
    'How to choose a concrete pump for construction project',
    'Concrete pump working principle',
    'Concrete pump maintenance guide',
    'Truck mounted concrete pump vs trailer pump',
    'Shotcrete machine application',
    'Dry mix vs wet mix spraying machine',
    'Mining tunnel concrete spraying solution',
    'Mobile concrete batching plant guide',
    'Why choose Chinese concrete machinery manufacturer',
    'Factory inspection guide Xingtai',
    'OEM machinery customization process',
    'xingjiawan concrete machinery',
    'factory direct machinery supplier',
    'custom concrete equipment manufacturer',
  ],
} as const;
