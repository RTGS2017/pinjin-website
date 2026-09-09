import type { LocalizedText } from '@/i18n/types';
import type { ProductCategory } from '@/data/products';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

export interface CategoryHubFaq {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface CategoryHub {
  h1: LocalizedText;
  intro: LocalizedText;
  applications: LocalizedText[];
  advantages: LocalizedText[];
  keywords: string[];
  faqs: CategoryHubFaq[];
}

const madeInFaq = {
  question: L(
    'Are these machines made in China?',
    '这些设备是否在中国制造？',
  ),
  answer: L(
    'Yes. Hebei Pinjin Machinery manufactures the listed models in Xingtai, Hebei, China.',
    '是。河北品锦机械在中国河北邢台制造目录所列机型。',
  ),
};

const customFaq = {
  question: L('Can specifications be customized?', '规格能否定制？'),
  answer: L(
    'After confirming specifications against a listed model, customized production can be arranged. This site does not publish a fixed number of production days.',
    '对照已列机型确认规格后，可安排定制生产。本站不公布固定生产天数。',
  ),
};

export const categoryHubs: Record<ProductCategory, CategoryHub> = {
  'electric-concrete-pump': {
    h1: L('Electric Concrete Pump Manufacturer', '电动混凝土泵厂家'),
    intro: L(
      'Hebei Pinjin Machinery Manufacturing Co., Ltd. is an electric concrete pump manufacturer in Xingtai, Hebei, China. Catalogue models cover the compact B500S-83D two-stage unit, Electric 10 / 15, through Electric 80 and HBT80 trailer pumps, with published motor power and conveying figures.',
      '河北品锦机械制造有限公司是中国河北邢台的电动混凝土泵厂家。目录覆盖紧凑型 B500S-83D 两级结构泵、电动10/15，直至电动80与HBT80拖泵，并公布电机功率与输送参数。',
    ),
    applications: [
      L('Building construction with grid power', '有电网供电的建筑施工'),
      L('Fine-stone and high-rise pipeline pumping', '细石与高层管道泵送'),
      L('Sites matching listed kW, m³/h and distance', '对照目录功率、输送量与距离的工地'),
    ],
    advantages: [
      L('Factory-direct electric concrete pump manufacturer in Xingtai', '邢台工厂直供电动混凝土泵厂家'),
      L('Published motor power, output and conveying tables', '公开电机功率、输送量与输送距离表'),
      L('OEM discussion after matching a listed model', '对照已列机型后沟通 OEM'),
    ],
    keywords: [
      'Electric Concrete Pump Manufacturer China',
      'electric trailer concrete pump factory',
      'Xingtai concrete pump manufacturer',
    ],
    faqs: [
      madeInFaq,
      {
        question: L(
          'How do I choose an electric concrete pump?',
          '如何选择电动混凝土泵？',
        ),
        answer: L(
          'Match motor power, theoretical output, outlet pressure and horizontal/vertical distance to the catalogue table, then contact the engineering team.',
          '按目录表对照电机功率、理论输送量、出口压力与水平/垂直距离，再联系工程团队。',
        ),
      },
      customFaq,
    ],
  },
  'diesel-concrete-pump': {
    h1: L('Diesel Concrete Pump Manufacturer', '柴油混凝土泵厂家'),
    intro: L(
      'Pinjin diesel concrete pumps are built in Xingtai for sites without stable grid power. The catalogue includes Diesel 30–120 trailer pumps, LZ-60 / LZ-80, tractor-driven 4100 units and compact rural diesel pumps, with published engine power, output and conveying distance.',
      '品锦柴油混凝土泵在邢台制造，面向电网供电不便的工地。目录含柴油30–120拖泵、LZ-60 / LZ-80、拖拉机带动4100与农村紧凑柴油泵，并公布发动机功率、输送量与输送距离。',
    ),
    applications: [
      L('Rural and self-built house pouring', '农村与自建房浇筑'),
      L('Infrastructure jobs without reliable electricity', '供电不稳的基建工程'),
      L('Trailer-mounted diesel pumping', '拖式柴油泵送'),
    ],
    advantages: [
      L('Diesel trailer pumps from a Xingtai source manufacturer', '邢台源头厂家柴油拖泵'),
      L('Published engine kW, output and aggregate size', '公开发动机功率、输送量与骨料粒径'),
      L('Compact rural models listed separately from high-output LZ / 120 series', '农村紧凑机型与大排量 LZ / 120 系列分开列出'),
    ],
    keywords: [
      'Diesel Concrete Pump Manufacturer China',
      'diesel trailer concrete pump factory',
      'rural concrete pump supplier China',
    ],
    faqs: [
      madeInFaq,
      {
        question: L(
          'When should I choose diesel instead of electric?',
          '什么时候选柴油而不是电动？',
        ),
        answer: L(
          'Choose a diesel model when the site has no stable grid supply. Match engine power and conveying distance on the product page, then inquire.',
          '工地没有稳定电网时应选柴油机型。对照产品页发动机功率与输送距离后再询盘。',
        ),
      },
      customFaq,
    ],
  },
  'mixer-pump': {
    h1: L('Concrete Mixer Pump Manufacturer', '混凝土搅拌泵厂家'),
    intro: L(
      'Pinjin lists integrated mixer pumps that mix and convey concrete in one machine — electric and diesel versions — manufactured in Xingtai, Hebei. This is not a concrete mixing plant (batching plant) product line.',
      '品锦目录提供搅拌与泵送一体机（电动与柴油），在河北邢台制造。这不是混凝土搅拌站产品线。',
    ),
    applications: [
      L('Sites that need mixing and pumping together', '需要搅拌与泵送一体的工地'),
      L('Rural and compact pours within listed output', '目录输送量范围内的农村与紧凑浇筑'),
    ],
    advantages: [
      L('Mixer pump, not a mixing plant', '搅拌泵，不是搅拌站'),
      L('Published main/mixer motor or diesel kW and output', '公开主电机/搅拌电机或柴油功率与输送量'),
      L('Factory-direct OEM from Xingtai', '邢台工厂直供 OEM'),
    ],
    keywords: [
      'Concrete Mixer Pump Manufacturer China',
      'integrated mixer pump factory',
      'Xingtai concrete machinery manufacturer',
    ],
    faqs: [
      madeInFaq,
      {
        question: L(
          'Is a mixer pump the same as a mixing plant?',
          '搅拌泵是不是搅拌站？',
        ),
        answer: L(
          'No. A mixer pump is a mobile machine that mixes and pumps. Pinjin does not list a concrete batching plant on this catalogue.',
          '不是。搅拌泵是移动式搅拌+泵送设备。本品锦目录不含混凝土搅拌站。',
        ),
      },
      customFaq,
    ],
  },
  'spare-parts': {
    h1: L('Concrete Pump Parts Manufacturer', '混凝土泵配件厂家'),
    intro: L(
      'Hebei Pinjin Machinery supplies pipeline spare parts for its Xingtai-built concrete pumps: delivery pipes, DN200 90° elbows, DN80 clamps and delivery hoses. These replacement parts are quoted after the pump model, diameter and quantity are confirmed. They are not sold in small batches and have no published list price.',
      '河北品锦机械为邢台产混凝土泵提供管路配件：输送管、DN200 90° 弯管、DN80 管卡与输送胶管。替换件在确认泵型号、管径与数量后报价，不支持小批量发货，也没有公开标价。',
    ),
    applications: [
      L('Wear-part replacement on listed Pinjin pumps', '已列品锦泵的易损件更换'),
      L('Pipeline extensions matched to a catalogue model', '对照目录机型加长管路'),
      L('Project or container quantities, not parcel lots', '工程量或整柜，不是小包裹批次'),
    ],
    advantages: [
      L('Same Xingtai factory as the concrete pumps', '与混凝土泵同一邢台工厂'),
      L('Quote by pump model, DN, length and quantity', '按泵型号、管径、长度与数量报价'),
      L('No small-batch shipping and no published list price', '不支持小批量发货，无公开标价'),
    ],
    keywords: [
      'Concrete Pump Parts Manufacturer China',
      'concrete pump delivery pipe factory',
      'Xingtai concrete pump spare parts',
    ],
    faqs: [
      madeInFaq,
      {
        question: L(
          'Do these spare parts have a published price?',
          '这些配件有没有公开价格？',
        ),
        answer: L(
          'No. Pipeline replacement parts have no list price on this site. Send the pump model, diameter, length and quantity for a factory quote. Small-batch shipping is not offered.',
          '没有。本站管路替换件不公布标价。请提供泵型号、管径、长度与数量以便工厂报价。不支持小批量发货。',
        ),
      },
      {
        question: L(
          'Can I order one or two pieces for a trial?',
          '能不能只买一两件试用？',
        ),
        answer: L(
          'These replacement parts are packed and shipped for project quantities, not small-batch parcels. Ask the factory what minimum quantity applies to the part you need.',
          '此类替换件按工程量包装发运，不支持小批量包裹。请向工厂确认你所需配件的起订数量。',
        ),
      },
    ],
  },
};
