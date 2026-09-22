import type { LocalizedText } from '@/i18n/types';

export interface SelectionGuideItem {
  id: string;
  question: LocalizedText;
  recommendation: LocalizedText;
  productSlugs: string[];
  rationale: LocalizedText;
}

/** 选型指南：仅依据新目录公开参数做对照推荐 */
export const selectionGuideItems: SelectionGuideItem[] = [
  {
    id: 'high-rise-long-distance',
    question: {
      en: 'Need high-rise or long-distance concrete conveying?',
      zh: '需要高层或长距离混凝土输送？',
    },
    recommendation: {
      en: 'Start with Electric 80 (900 m / 300 m, 60 m³/h), then compare Electric 60, HBT8018 and Diesel 120.',
      zh: '优先对照电动80（水平900 m / 垂直300 m、60 m³/h），再比较电动60、HBT8018 与柴油120。',
    },
    productSlugs: [
      'electric-80-concrete-pump',
      'electric-60-concrete-pump',
      'hbt8018-concrete-pump',
      'diesel-120-concrete-pump',
    ],
    rationale: {
      en: 'Electric 80 lists 900 m horizontal / 300 m vertical at 60 m³/h. Diesel 120 lists 150 m / 500 m at 100 m³/h.',
      zh: '电动80目录：水平900 m / 垂直300 m、60 m³/h。柴油120：150 m / 500 m、100 m³/h。',
    },
  },
  {
    id: 'medium-building',
    question: {
      en: 'Need a pump for medium building projects?',
      zh: '中型建筑项目如何选泵？',
    },
    recommendation: {
      en: 'Compare Electric 40, Electric 50 and Diesel 40 / Diesel 50 against pipeline length and power type.',
      zh: '按管长与动力形式对照电动40、电动50与柴油40 / 柴油50。',
    },
    productSlugs: [
      'electric-40-concrete-pump',
      'electric-50-concrete-pump',
      'diesel-40-concrete-pump',
      'diesel-50-concrete-pump',
    ],
    rationale: {
      en: 'Electric 40 lists 21 m³/h and fine-stone 120 m / 360 m. Diesel 50 lists 30 m³/h and 150 m / 450 m.',
      zh: '电动40：21 m³/h、细石 120 m / 360 m。柴油50：30 m³/h、150 m / 450 m。',
    },
  },
  {
    id: 'small-site',
    question: {
      en: 'Need a compact pump for small building sites?',
      zh: '小型工地如何选紧凑型泵？',
    },
    recommendation: {
      en: 'Shortlist B500S-83D for 5 m short-reach sand and small stone, then Electric 15, Electric 10 Series, Tractor-Driven 4100 or the rural diesel pump.',
      zh: '5 m 短距离砂石优先对照 B500S-83D，再对照电动15、电动10系列、拖拉机带动4100或农村柴油泵。',
    },
    productSlugs: [
      'b500s-83d-two-stage-pump',
      'electric-15-concrete-pump',
      'electric-10-series-concrete-pump',
      'tractor-4100-concrete-pump',
      'rural-diesel-concrete-pump',
    ],
    rationale: {
      en: 'B500S-83D lists 280 kg and 5 m height / 5 m horizontal. The other compact models list 400–1300 kg and longer catalogue distances.',
      zh: 'B500S-83D 目录机重 280 kg、垂直/水平各 5 m。其余紧凑机型约 400–1300 kg，目录输送距离更长。',
    },
  },
  {
    id: 'diesel-vs-electric',
    question: {
      en: 'Diesel or electric concrete pump?',
      zh: '选柴油泵还是电动泵？',
    },
    recommendation: {
      en: 'No stable grid → diesel trailer or rural diesel. Stable power → Electric 20–80 / HBT series.',
      zh: '电网不稳 → 柴油拖泵或农村柴油泵；供电稳定 → 电动20–80 / HBT 系列。',
    },
    productSlugs: [
      'diesel-40-concrete-pump',
      'electric-40-concrete-pump',
      'rural-diesel-concrete-pump',
    ],
    rationale: {
      en: 'Electric models list motor kW; diesel models list engine type/kW. Match the site power first.',
      zh: '电动型号列出电机功率，柴油型号列出发动机型号/功率。先对照现场动力。',
    },
  },
  {
    id: 'mixer-pump',
    question: {
      en: 'Need mixing and pumping in one machine?',
      zh: '需要搅拌与泵送一体？',
    },
    recommendation: {
      en: 'Choose Integrated Mixer Pump (electric) or Diesel Mixer Integrated Pump. These are not mixing plants.',
      zh: '选择电动搅拌泵一体机或柴油搅拌泵一体机。它们不是搅拌站。',
    },
    productSlugs: ['integrated-mixer-pump', 'diesel-mixer-integrated-pump'],
    rationale: {
      en: 'Electric unit lists 45 kW + 14 kW and 21 m³/h. Diesel unit lists 66–75 kW and 25 m³/h.',
      zh: '电机型：主电机45 kW + 搅拌14 kW、21 m³/h。柴油型：66–75 kW、25 m³/h。',
    },
  },
  {
    id: 'high-output-diesel',
    question: {
      en: 'Need high output on a diesel site?',
      zh: '柴油工地需要大排量？',
    },
    recommendation: {
      en: 'Compare LZ-80 (up to 95 m³/h low pressure) and Diesel 120 (100 m³/h, twin 145 kW).',
      zh: '对照 LZ-80（低压可达95 m³/h）与柴油120（100 m³/h、双机145 kW）。',
    },
    productSlugs: ['lz-80-diesel-concrete-pump', 'diesel-120-concrete-pump', 'lz-60-diesel-concrete-pump'],
    rationale: {
      en: 'LZ-80 lists Yuchai 256 kW. Diesel 120 lists 290 kW total and 150 m / 500 m.',
      zh: 'LZ-80 目录玉柴256 kW。柴油120 合计290 kW、150 m / 500 m。',
    },
  },
  {
    id: 'spraying-machine',
    question: {
      en: 'Need a mortar, plaster or concrete spraying machine?',
      zh: '需要砂浆、石膏或混凝土喷涂机？',
    },
    recommendation: {
      en: 'Fine mortar ≤2 mm / 2 m³/h → Type 311. ≤6 mm / 3 m³/h → Type 511. Dual-motor plunger 4 m³/h / 8 MPa → double-cylinder plunger. Plaster ≤4 mm → M9. 380 V concrete/mortar ≤8 mm → hydraulic 5 m³/h or high-flow 7 m³/h. No grid → diesel 5 m³/h / ≤6 mm. These are not trailer pumps.',
      zh: '细砂浆 ≤2 mm / 2 m³/h → 311。≤6 mm / 3 m³/h → 511。双缸柱塞 4 m³/h / 8 MPa → 双缸柱塞式。石膏 ≤4 mm → M9。380V 混凝土/砂浆 ≤8 mm → 液压 5 m³/h 或大流量 7 m³/h。无电网 → 柴油 5 m³/h / ≤6 mm。它们不是拖式泵。',
    },
    productSlugs: [
      'type-311-mortar-spraying-machine',
      'type-511-mortar-spraying-machine',
      'double-cylinder-plunger-mortar-spraying-machine',
      'hydraulic-concrete-spraying-machine',
      'high-flow-hydraulic-concrete-spraying-machine',
      'm9-automatic-plaster-spraying-machine',
      'diesel-concrete-spraying-machine',
    ],
    rationale: {
      en: 'M9 lists 30 L/min, 25 mm hose and ≤4 mm. Hydraulic rows list 5 or 7 m³/h and ≤8 mm. Diesel lists 28/32 HP, 5 m³/h and ≤6 mm.',
      zh: 'M9 目录 30 L/min、管径 25 mm、粒径 ≤4 mm。液压行 5 或 7 m³/h、≤8 mm。柴油行 28/32 HP、5 m³/h、≤6 mm。',
    },
  },
];
