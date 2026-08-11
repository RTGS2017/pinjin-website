import type { LocalizedText } from '@/i18n/types';

export interface SelectionGuideItem {
  id: string;
  question: LocalizedText;
  recommendation: LocalizedText;
  productSlugs: string[];
  rationale: LocalizedText;
}

/** 选型指南：仅依据目录公开参数做对照推荐，不编造案例 */
export const selectionGuideItems: SelectionGuideItem[] = [
  {
    id: 'high-rise-long-distance',
    question: {
      en: 'Need high-rise or long-distance concrete conveying?',
      zh: '需要高层或长距离混凝土输送？',
    },
    recommendation: {
      en: 'Start with HBT80-18-140, then compare LL60-75 / HBTT55-50 / HBT45-40 by capacity and distance.',
      zh: '优先对照 HBT80-18-140，再按输送量与距离比较 LL60-75 / HBTT55-50 / HBT45-40。',
    },
    productSlugs: [
      'hbt80-18-140-concrete-pump',
      'll60-75-concrete-pump',
      'hbtt55-50-concrete-pump',
      'hbt45-40-concrete-pump',
    ],
    rationale: {
      en: 'Catalogue peak values: HBT80 lists 600 m horizontal / 300 m vertical / 40–75 m³/h.',
      zh: '目录峰值：HBT80 列出水平 600 m / 垂直 300 m / 理论输送量 40–75 m³/h。',
    },
  },
  {
    id: 'medium-building',
    question: {
      en: 'Need a pump for medium building projects?',
      zh: '中型建筑项目如何选泵？',
    },
    recommendation: {
      en: 'Compare HBT30-37 and HBT45-40 against your pipeline length and vertical height.',
      zh: '按管路长度与垂直高度对照 HBT30-37 与 HBT45-40。',
    },
    productSlugs: ['hbt30-37-concrete-pump', 'hbt45-40-concrete-pump', 'll28-32-concrete-pump'],
    rationale: {
      en: 'HBT30-37 lists 250 m / 120 m; HBT45-40 lists 300 m / 150 m; LL28-32 lists 100 m / 60 m.',
      zh: 'HBT30-37：250 m / 120 m；HBT45-40：300 m / 150 m；LL28-32：100 m / 60 m。',
    },
  },
  {
    id: 'small-site',
    question: {
      en: 'Need a compact pump for small building sites?',
      zh: '小型工地如何选紧凑型泵？',
    },
    recommendation: {
      en: 'Shortlist Diesel 4100, LL15 (diesel/motor) or ZS22-25.',
      zh: '优先对照柴油4100、LL15（柴油/电机）或 ZS22-25。',
    },
    productSlugs: [
      'diesel-4100-transfer-pump',
      'll15-diesel-transfer-pump',
      'll15-electric-transfer-pump',
      'zs22-25-concrete-pump',
    ],
    rationale: {
      en: 'These models list shorter conveying distances and lower machine weights in the catalogue.',
      zh: '上述型号在目录中水平/垂直距离与机重相对更紧凑。',
    },
  },
  {
    id: 'diesel-vs-electric',
    question: {
      en: 'Diesel or electric transfer pump?',
      zh: '选柴油版还是电机版输送泵？',
    },
    recommendation: {
      en: 'No stable electricity → LL15 Diesel. Stable 380 V → LL15 Motor Version.',
      zh: '供电不便 → LL15 柴油版；稳定 380 V → LL15 电机版。',
    },
    productSlugs: ['ll15-diesel-transfer-pump', 'll15-electric-transfer-pump'],
    rationale: {
      en: 'Catalogue lists 28 HP diesel vs 15 kW / 380 V motor for the LL15 series.',
      zh: '目录中 LL15 系列分别标注 28 HP 柴油与 15 kW / 380 V 电机。',
    },
  },
  {
    id: 'mortar',
    question: {
      en: 'Need mortar spraying?',
      zh: '需要砂浆喷涂？',
    },
    recommendation: {
      en: 'Choose Diesel Screw Mortar Spraying Machine (customization supported).',
      zh: '选择柴油螺杆砂浆喷涂机（目录支持定制）。',
    },
    productSlugs: ['diesel-screw-mortar-spraying-machine'],
    rationale: {
      en: 'Catalogue lists 6 MPa spraying pressure, 70 L hopper and customization support.',
      zh: '目录列出喷涂压力 6 MPa、料斗 70 L，并支持定制。',
    },
  },
  {
    id: 'plaster',
    question: {
      en: 'Need plaster spraying for interior finishing?',
      zh: '室内石膏喷涂如何选型？',
    },
    recommendation: {
      en: 'Choose Fully Automatic Plaster Spraying Machine.',
      zh: '选择全自动石膏喷涂机。',
    },
    productSlugs: ['automatic-plaster-spraying-machine'],
    rationale: {
      en: 'Catalogue lists 115 L mixer capacity and 380 V / 50 Hz supply with 20 m / 10 m conveying limits.',
      zh: '目录列出搅拌容积 115 L、供电 380 V / 50 Hz，输送限值水平 20 m / 垂直 10 m。',
    },
  },
  {
    id: 'spraying-compare',
    question: {
      en: 'Which spraying machine series fits longer distance?',
      zh: '喷涂机系列如何按距离选型？',
    },
    recommendation: {
      en: 'Type 311 (20 m) → Type 511 (40 m) → Double Cylinder Plunger (100 m). For concrete spraying, see Concrete Spraying Machine.',
      zh: '311型（20 m）→ 511型（40 m）→ 双缸柱塞式（100 m）；混凝土喷浆见混凝土喷浆机。',
    },
    productSlugs: [
      'type-311-spraying-machine',
      'type-511-spraying-machine',
      'double-cylinder-plunger-spraying-machine',
      'concrete-spraying-machine',
    ],
    rationale: {
      en: 'Distances above are conveying distances published in the catalogue for each model.',
      zh: '以上距离均为各型号目录公布的输送距离。',
    },
  },
  {
    id: 'feeding-handling',
    question: {
      en: 'Need material feeding or site handling?',
      zh: '需要给料或现场搬运？',
    },
    recommendation: {
      en: 'Spiral feeder for feeding; clamp/bucket forklift loaders for handling.',
      zh: '给料选螺旋给料机；搬运选夹抱式/铲斗式四驱叉车装载机。',
    },
    productSlugs: [
      'hbtb016-110es-spiral-feeder',
      'forklift-loader-clamp-type',
      'forklift-loader-bucket-type',
    ],
    rationale: {
      en: 'Feeder lists customizable head; loaders list lift/unload heights and 4WD drive.',
      zh: '给料机目录扬程可定制；装载机列出举升/卸载高度与四驱。',
    },
  },
  {
    id: 'rebar',
    question: {
      en: 'Need automatic stirrup / rebar bending?',
      zh: '需要自动弯箍 / 钢筋弯曲？',
    },
    recommendation: {
      en: 'Choose Fully Automatic CNC Steel Bar Bending Machine.',
      zh: '选择全自动数控钢筋弯箍机。',
    },
    productSlugs: ['cnc-steel-bar-bending-machine'],
    rationale: {
      en: 'Catalogue publishes single/double strand diameter ranges and CNC speed parameters.',
      zh: '目录公布单/双股加工直径范围与数控速度参数。',
    },
  },
];
