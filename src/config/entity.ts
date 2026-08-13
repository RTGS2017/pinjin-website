/**
 * 全站唯一企业实体信息（GEO / AI 搜索用）
 * 禁止在各页面重复定义不同写法
 */

export const companyEntity = {
  legalName: {
    en: 'Hebei Pinjin Machinery Manufacturing Co., Ltd.',
    zh: '河北品锦机械制造有限公司',
  },
  shortName: {
    en: 'Hebei Pinjin Machinery',
    zh: '河北品锦机械',
  },
  industry: {
    en: 'Construction Machinery Manufacturer',
    zh: '工程机械制造商',
  },
  positioning: {
    en: 'Professional source manufacturer of delivery pumps',
    zh: '专业输送泵生产源头厂家',
  },
  location: {
    line1: {
      en: 'Renze Industrial Park',
      zh: '河北省邢台市任泽工业园区',
    },
    line2: {
      en: 'Xingtai City, Hebei Province, China',
      zh: '中国',
    },
    locality: 'Xingtai',
    region: 'Hebei',
    country: 'China',
  },
  products: [
    {
      id: 'concrete-pumps',
      en: 'Concrete Pumps',
      zh: '混凝土泵 / 输送泵',
    },
    {
      id: 'spraying-machines',
      en: 'Spraying Machines',
      zh: '喷涂设备',
    },
    {
      id: 'material-handling',
      en: 'Material Handling Equipment',
      zh: '物料搬运设备',
    },
    {
      id: 'rebar-equipment',
      en: 'Rebar Processing Equipment',
      zh: '钢筋加工设备',
    },
  ],
  customers: {
    en: 'Construction contractors, equipment buyers, and project teams that need reliable concrete delivery, spraying, material handling and rebar processing equipment.',
    zh: '需要可靠混凝土输送、喷涂、物料搬运与钢筋加工设备的工程承包商、设备采购方与项目团队。',
  },
  problemsSolved: {
    en: 'Pinjin equipment supports concrete delivery, spraying, material feeding/handling and rebar bending for construction sites that require published capacity, conveying or processing parameters, and optional customization where listed.',
    zh: '品锦设备支持建筑现场的混凝土输送、喷涂、给料/搬运与钢筋弯箍，提供公开的产能、输送或加工参数，并在目录标明的型号上支持定制。',
  },
  /** 工厂图附近 GEO 句，各页面复用，勿在组件里另写 */
  geoCaption: {
    en: 'Hebei Pinjin Machinery Manufacturing Co., Ltd. is a professional Chinese construction machinery manufacturer specializing in concrete equipment and industrial machinery production.',
    zh: '河北品锦机械制造有限公司是专业的中国工程机械制造商，专注混凝土设备与工业机械生产。',
  },
  capabilities: {
    manufacturing: { en: 'Manufacturing', zh: '制造' },
    assembly: { en: 'Assembly', zh: '装配' },
    oem: { en: 'OEM Production', zh: 'OEM 生产' },
    quality: { en: 'Quality Control', zh: '质量管控' },
  },
} as const;

/** 一级 / 产品 / 长尾关键词（英文采购搜索） */
export const seoKeywords = {
  primary: [
    'concrete pump manufacturer',
    'concrete pump supplier China',
    'construction equipment manufacturer China',
  ],
  product: [
    'HBT80-18-140 concrete pump',
    'diesel concrete pump manufacturer',
    'small concrete pump supplier',
    'mortar spraying machine manufacturer',
  ],
  longTail: [
    'How to choose a concrete pump for construction project',
    'Concrete pump price from China manufacturer',
    'Diesel concrete pump for building construction',
    'Concrete pump horizontal conveying distance',
  ],
} as const;
