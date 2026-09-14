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
  directAnswer: LocalizedText;
  applications: LocalizedText[];
  notSuitable: LocalizedText[];
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

const warehouseFaq = {
  question: L(
    'Do you keep an overseas warehouse or a published dealer list?',
    '是否有海外仓或公开经销商名单？',
  ),
  answer: L(
    'No. Equipment ships from Xingtai. This site does not claim an overseas warehouse, exclusive distributors or a global after-sales network. Inquire by WhatsApp or email.',
    '没有。设备从邢台发货。本站不声称拥有海外仓、独家经销网或全球售后网络。请通过 WhatsApp 或邮件询盘。',
  ),
};

const inquireFaq = {
  question: L(
    'What should an inquiry include?',
    '询盘需要带什么？',
  ),
  answer: L(
    'Send mix or material, maximum aggregate, required output, horizontal and vertical distance, diesel or site voltage/frequency, country and purchase timing. Spare parts need name, size and quantity.',
    '请发送材料/配合比、最大骨料、目标产量、水平与垂直距离、柴油或现场电压频率、国家与采购时间。配件请带名称、尺寸与数量。',
  ),
};

const boomFaq = {
  question: L(
    'Are these truck-mounted boom pumps or mixing plants?',
    '这些是车载臂架泵或搅拌站吗？',
  ),
  answer: L(
    'No. The published lines are trailer and compact transfer concrete pumps, mixer pumps that mix and pump on one trailer, and replacement parts. Mixing plants, boom pumps and dedicated sprayers are not catalogue products.',
    '不是。已公布产品线是拖式与紧凑输送泵、同一拖车搅拌并泵送的搅拌泵，以及替换件。搅拌站、臂架泵与独立喷涂机不是目录产品。',
  ),
};

export const categoryHubs: Record<ProductCategory, CategoryHub> = {
  'electric-concrete-pump': {
    h1: L('Electric Concrete Pump Manufacturer', '电动混凝土泵厂家'),
    intro: L(
      'Hebei Pinjin Machinery Manufacturing Co., Ltd. is an electric concrete pump manufacturer in Xingtai, Hebei, China. Catalogue models cover the compact B500S-83D two-stage unit, Electric 10 / 15, through Electric 80 and HBT80 trailer pumps, with published motor power and conveying figures.',
      '河北品锦机械制造有限公司是中国河北邢台的电动混凝土泵厂家。目录覆盖紧凑型 B500S-83D 两级结构泵、电动10/15，直至电动80与HBT80拖泵，并公布电机功率与输送参数。',
    ),
    directAnswer: L(
      'Pinjin electric trailer pumps are built in Xingtai for sites with a stable grid. Match motor kW, output, pressure and listed horizontal/vertical distance on each model page. Compact frames such as Electric 15 are not substitutes for Electric 60 / 80 high-rise rows. These are not boom pumps, sprayers or batching plants.',
      '品锦电动拖泵在邢台制造，面向有稳定电网的工地。请按各型号页对照电机功率、产量、压力与已列水平/垂直距离。电动15一类紧凑机不能替代电动60/80高层行。这些不是臂架泵、喷涂机或搅拌站。',
    ),
    applications: [
      L('Building construction with grid power', '有电网供电的建筑施工'),
      L('Fine-stone and high-rise pipeline pumping', '细石与高层管道泵送'),
      L('Sites matching listed kW, m³/h and distance', '对照目录功率、输送量与距离的工地'),
    ],
    notSuitable: [
      L('Sites that cannot supply the listed motor power from a stable grid', '现场无法按目录电机功率提供稳定电网'),
      L('Jobs that need a truck-mounted placing boom or a mixing plant', '需要车载布料杆或搅拌站的工况'),
      L('Dedicated mortar spraying, grouting or shotcrete robots', '独立砂浆喷涂、灌浆或喷射机械手'),
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
      boomFaq,
      warehouseFaq,
      inquireFaq,
      {
        question: L(
          'Can Electric 15 replace Electric 80 for 900 m conveying?',
          '电动15能否代替电动80做 900 m 输送？',
        ),
        answer: L(
          'No. Compact electric frames are not substitutes for the Electric 60 / Electric 80 catalogue high-rise or 900 m rows. Use the figure printed on that model page.',
          '不能。紧凑电动机不能替代电动60 / 电动80目录中的高层或 900 m 行。请以该型号页已印数字为准。',
        ),
      },
      {
        question: L(
          'Where does the equipment ship from?',
          '设备从哪里发货？',
        ),
        answer: L(
          'From the Xingtai factory. International freight is extra and paid by the buyer. No overseas warehouse is claimed.',
          '从邢台工厂发货。国际运费另计，由买方承担。不声称拥有海外仓。',
        ),
      },
    ],
  },
  'diesel-concrete-pump': {
    h1: L('Diesel Concrete Pump Manufacturer', '柴油混凝土泵厂家'),
    intro: L(
      'Pinjin diesel concrete pumps are built in Xingtai for sites without stable grid power. The catalogue includes Diesel 30–120 trailer pumps, LZ-60 / LZ-80, tractor-driven 4100 units and compact rural diesel pumps, with published engine power, output and conveying distance.',
      '品锦柴油混凝土泵在邢台制造，面向电网供电不便的工地。目录含柴油30–120拖泵、LZ-60 / LZ-80、拖拉机带动4100与农村紧凑柴油泵，并公布发动机功率、输送量与输送距离。',
    ),
    directAnswer: L(
      'Pinjin diesel trailer pumps are for sites without a reliable grid. Match engine power, output and listed distance on the model page. A diesel row is not an electric-catalogue substitute when grid power is already available. Compact rural and tractor units are not Electric 80 class pumps. Not boom pumps or mixing plants.',
      '品锦柴油拖泵面向无可靠电网的工地。请按型号页对照发动机功率、产量与已列距离。现场已有电网时，不要把柴油行当成电机目录机。农村紧凑机与拖拉机带动机组不是电动80这一档。不是臂架泵或搅拌站。',
    ),
    applications: [
      L('Rural and self-built house pouring', '农村与自建房浇筑'),
      L('Infrastructure jobs without reliable electricity', '供电不稳的基建工程'),
      L('Trailer-mounted diesel pumping', '拖式柴油泵送'),
    ],
    notSuitable: [
      L('Sites that already have the listed grid supply and need an electric-catalogue model', '现场已有目录电网、应按电机目录选型的工地'),
      L('Jobs that need a truck-mounted placing boom or a mixing plant', '需要车载布料杆或搅拌站的工况'),
      L('Dedicated mortar spraying or grouting machines', '独立砂浆喷涂或灌浆机'),
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
      boomFaq,
      warehouseFaq,
      inquireFaq,
      {
        question: L(
          'Is the tractor-driven 4100 the same as Diesel 120?',
          '拖拉机带动4100是不是柴油120？',
        ),
        answer: L(
          'No. Tractor-driven 4100 and rural diesel pumps are compact rows. Diesel 120 is a high-output catalogue row. Compare the printed table on each product page.',
          '不是。拖拉机带动4100与农村柴油泵是紧凑行。柴油120是大排量目录行。请对照各产品页已印表格。',
        ),
      },
      {
        question: L(
          'Do you publish engine brand names?',
          '是否公布发动机牌号？',
        ),
        answer: L(
          'Only the engine lines already printed on a model page are used. This hub does not invent extra engine brands or fuel-consumption tables.',
          '仅使用各型号页已印的发动机行。本分类页不另编发动机牌号或油耗表。',
        ),
      },
    ],
  },
  'mixer-pump': {
    h1: L('Concrete Mixer Pump Manufacturer', '混凝土搅拌泵厂家'),
    intro: L(
      'Pinjin lists integrated mixer pumps that mix and convey concrete in one machine — electric and diesel versions — manufactured in Xingtai, Hebei. This is not a concrete mixing plant (batching plant) product line.',
      '品锦目录提供搅拌与泵送一体机（电动与柴油），在河北邢台制造。这不是混凝土搅拌站产品线。',
    ),
    directAnswer: L(
      'A Pinjin mixer pump mixes and pumps on one trailer in Xingtai. Electric and diesel versions are listed with published kW and output. It is not a mixing-plant line, not a boom pump and not a dedicated sprayer. If mix is already supplied, compare a pump-only trailer instead.',
      '品锦搅拌泵在邢台把搅拌与泵送做在同一拖车上。电动与柴油版本均公布功率与产量。这不是搅拌站产品线，也不是臂架泵或独立喷涂机。若混凝土已由外部供应，请对照仅泵送拖泵。',
    ),
    applications: [
      L('Sites that need mixing and pumping together', '需要搅拌与泵送一体的工地'),
      L('Rural and compact pours within listed output', '目录输送量范围内的农村与紧凑浇筑'),
    ],
    notSuitable: [
      L('Projects that already run a mixing plant and only need long-distance pumping', '已有搅拌站、只需长距离泵送的工程'),
      L('Buyers asking for a batching plant, boom pump or spraying machine', '要搅拌站、臂架泵或喷涂机的采购'),
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
      boomFaq,
      warehouseFaq,
      inquireFaq,
      {
        question: L(
          'Electric or diesel mixer pump?',
          '电动还是柴油搅拌泵？',
        ),
        answer: L(
          'Use the electric integrated mixer pump where the site can feed the listed motors. Use the diesel mixer-integrated pump where there is no grid. Both mix and pump on one trailer.',
          '现场能按目录给电机供电时用电动搅拌泵一体机。无电网时用柴油搅拌泵一体机。两台都是同一拖车搅拌加泵送。',
        ),
      },
      {
        question: L(
          'Can a mixer pump replace Electric 80 for 900 m conveying?',
          '搅拌泵能否代替电动80做 900 m 输送？',
        ),
        answer: L(
          'No. Mixer pumps are mix-plus-pump trailers with their own printed output and distance. Long-distance pump-only rows sit on the electric or diesel pump pages.',
          '不能。搅拌泵是搅拌加泵送拖车，产量与距离以本页已印为准。长距离仅泵送行在电动或柴油泵页面。',
        ),
      },
    ],
  },
  'spare-parts': {
    h1: L('Concrete Pump Parts Manufacturer', '混凝土泵配件厂家'),
    intro: L(
      'Hebei Pinjin Machinery supplies pipeline parts and S-valve wear parts from Xingtai: delivery pipes, DN200 90° elbows, DN80 clamps, delivery hoses, split and integral pistons, S-tube seals, mixing seals, cylinder seals, rubber springs and swing-arm balls. Replacement parts are quoted after size and quantity are confirmed. They are not sold in small batches and have no published list price. Wear parts are Xingtai replacements — confirm the outer diameter on the pump; they are not OEM parts of other pump brands.',
      '河北品锦机械从邢台供应管路件与S阀易损件：输送管、DN200 90° 弯管、DN80 管卡、输送胶管、分体/整体活塞、S管密封、搅拌密封、油缸密封、橡胶弹簧与摆臂球头。确认尺寸与数量后报价，不支持小批量发货，也没有公开标价。易损件为邢台替换件，请在泵上核对外径；不是其他泵品牌的原厂件。',
    ),
    directAnswer: L(
      'Xingtai supplies pipeline replacements and S-valve wear parts. Confirm DN or outer diameter on the pump, then send name and quantity for a quote. No list price, no small-batch parcels, no overseas warehouse. Wear parts are not OEM parts of other pump brands.',
      '邢台供应管路替换件与S阀易损件。请在泵上核对管径或外径，再发送名称与数量询价。无公开标价，不支持小批量包裹，不声称海外仓。易损件不是其他泵品牌原厂件。',
    ),
    applications: [
      L('Wear-part replacement on listed Pinjin pumps', '已列品锦泵的易损件更换'),
      L('S-valve piston, seal and spring replacement by OD', '按外径更换S阀活塞、密封与弹簧'),
      L('Pipeline extensions matched to a catalogue model', '对照目录机型加长管路'),
      L('Project or container quantities, not parcel lots', '工程量或整柜，不是小包裹批次'),
    ],
    notSuitable: [
      L('Small-batch parcel orders or published list-price shopping', '小批量包裹采购或按公开标价下单'),
      L('OEM-branded spare kits of other pump makers', '其他泵品牌的原厂配件套件'),
    ],
    advantages: [
      L('Same Xingtai factory as the concrete pumps', '与混凝土泵同一邢台工厂'),
      L('Published OD / kit table for pistons, seals and springs', '活塞、密封与弹簧公布外径/套件表'),
      L('Quote by pump model, size and quantity', '按泵型号、尺寸与数量报价'),
      L('No small-batch shipping and no published list price', '不支持小批量发货，无公开标价'),
    ],
    keywords: [
      'Concrete Pump Parts Manufacturer China',
      'concrete pump delivery pipe factory',
      'Xingtai concrete pump spare parts',
      'concrete pump split piston seal spring',
    ],
    faqs: [
      madeInFaq,
      {
        question: L(
          'Do these spare parts have a published price?',
          '这些配件有没有公开价格？',
        ),
        answer: L(
          'No. Replacement parts have no list price on this site. Send the part name, size (DN or outer diameter) and quantity for a factory quote. Small-batch shipping is not offered. Wear parts are Xingtai replacements, not OEM parts of other pump brands.',
          '没有。本站替换件不公布标价。请提供配件名称、尺寸（管径或外径）与数量以便工厂报价。不支持小批量发货。易损件为邢台替换件，不是其他泵品牌的原厂件。',
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
      warehouseFaq,
      inquireFaq,
      {
        question: L(
          'Are wear parts original parts of other pump brands?',
          '易损件是其他泵品牌的原厂件吗？',
        ),
        answer: L(
          'No. They are Xingtai replacement wear parts. Confirm outer diameter or kit size on the machine before ordering.',
          '不是。它们是邢台替换易损件。下单前请在设备上核对外径或套件尺寸。',
        ),
      },
      {
        question: L(
          'How do I inquire for pipes versus pistons?',
          '管路和活塞怎么分别询盘？',
        ),
        answer: L(
          'Pipes, elbows, clamps and hoses: pump model, DN, length and quantity. Pistons, seals and springs: part name, outer diameter or kit, and quantity.',
          '管、弯管、管卡与胶管：泵型号、管径、长度与数量。活塞、密封与弹簧：配件名称、外径或套件与数量。',
        ),
      },
      customFaq,
    ],
  },
};
