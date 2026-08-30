import type { LocalizedText } from '@/i18n/types';
import type { Lang } from '@/i18n/config';
import { pick } from '@/i18n/types';

export interface FaqItem {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
}

/**
 * 15 条采购意图 FAQ（答案仅基于产品目录已公开参数与公司事实，不编造项目/价格/认证）
 */
export const siteFaqs: FaqItem[] = [
  {
    id: 'what-is-concrete-pump',
    question: {
      en: 'What is a concrete pump used for?',
      zh: '混凝土泵（输送泵）是做什么的？',
    },
    answer: {
      en: 'A concrete pump is construction equipment designed to transport liquid concrete through pipelines to hard-to-reach placement areas. Instead of relying only on manual handling or crane buckets, contractors use pumps for faster and more continuous pouring. Hebei Pinjin Machinery manufactures concrete delivery pumps and related construction machinery for building and infrastructure work. Pinjin models cover compact transfer pumps and higher-capacity units, so buyers can match delivery capacity, aggregate size and conveying distance to the job site.',
      zh: '混凝土泵用于通过管道将混凝土输送到人工或吊斗不易到达的浇筑点，提高施工连续性与效率。河北品锦机械制造混凝土输送泵及相关工程机械，型号覆盖紧凑型输送泵与更大产能机型，采购方可按输送量、骨料粒径与输送距离匹配工况。',
    },
  },
  {
    id: 'who-is-pinjin',
    question: {
      en: 'Who is Hebei Pinjin Machinery?',
      zh: '河北品锦机械是一家什么样的公司？',
    },
    answer: {
      en: 'Hebei Pinjin Machinery Manufacturing Co., Ltd. is a construction machinery manufacturer focused on special equipment. The company is located in Renze Industrial Park, Xingtai City, Hebei Province, China. Its positioning is a professional source manufacturer of delivery pumps. Core activities include R&D, production and sales of electric concrete pumps, diesel concrete pumps and mixer pumps.',
      zh: '河北品锦机械制造有限公司是专注特种设备制造的工程机械企业，位于河北省邢台市任泽工业园区，定位为专业输送泵生产源头厂家。主营电动混凝土泵、柴油混凝土泵与搅拌泵的研发、生产与销售。',
    },
  },
  {
    id: 'what-products',
    question: {
      en: 'What products does Pinjin manufacture?',
      zh: '品锦主要生产哪些产品？',
    },
    answer: {
      en: 'Pinjin manufactures three catalogue groups: electric concrete pumps, diesel concrete pumps and mixer pumps. Typical electric models include Electric 15 / 20 / 40 / 50 / 60 / 80 and HBT8018 / HBT80-16. Diesel models include Diesel 30–120, LZ-60 / LZ-80, Tractor-Driven 4100 and rural diesel pumps. Mixer pumps include an electric integrated unit and a diesel mixer-integrated pump. A mixing plant, spraying-machine or rebar line is not listed on this website.',
      zh: '品锦目录分为三类：电动混凝土泵、柴油混凝土泵与搅拌泵。电动典型型号包括电动15 / 20 / 40 / 50 / 60 / 80 以及 HBT8018 / HBT80-16。柴油包括柴油30–120、LZ-60 / LZ-80、拖拉机带动4100与农村柴油泵。搅拌泵包括电动一体机与柴油搅拌泵一体机。本站未列出搅拌站、喷涂机或钢筋设备产品线。',
    },
  },
  {
    id: 'how-to-choose',
    question: {
      en: 'How to choose a concrete pump for a construction project?',
      zh: '施工项目如何选择混凝土泵？',
    },
    answer: {
      en: 'Start with four catalogue parameters: theoretical delivery capacity, horizontal conveying distance, vertical conveying height, and max aggregate diameter. Then check power type (diesel or electric), machine dimensions and weight for site access. For smaller jobs, Electric 15, Electric 10 Series, Tractor-Driven 4100 or the rural diesel pump may fit. For medium buildings, compare Electric 40 / 50 and Diesel 40 / 50. For longer reach and higher output, compare Electric 80, Electric 60, HBT8018 and Diesel 120. Share pour volume, pipe layout and aggregate size with Pinjin so the team can recommend a suitable listed model.',
      zh: '优先对照四类目录参数：理论输送量、水平输送距离、垂直输送高度、最大骨料粒径；再确认动力形式（柴油/电机）、外形尺寸与整机重量是否便于进场。小型工况可看电动15、电动10系列、拖拉机带动4100或农村柴油泵；中型建筑对照电动40 / 50 与柴油40 / 50；更长距离与更高产量对照电动80、电动60、HBT8018 与柴油120。把浇筑量、管路布置与骨料粒径发给品锦，可按已列机型推荐。',
    },
  },
  {
    id: 'max-horizontal',
    question: {
      en: 'What is the maximum horizontal conveying distance of Pinjin concrete pumps?',
      zh: '品锦混凝土泵最大水平输送距离是多少？',
    },
    answer: {
      en: 'In the current product catalogue, the highest listed horizontal conveying distance is 900 m on the Electric 80 concrete pump (HBT80-1816-110). Other models list shorter ranges according to their design, for example Electric 15 at 60–80 m, Diesel 30 at 60 m, and Electric 60 fine-stone at 200 m. Always select by the specific model page rather than assuming one distance for the whole range.',
      zh: '当前产品目录中，列出的最大水平输送距离为电动80（HBT80-1816-110）的 900 m。其他型号按设计不同，例如电动15 为 60–80 m、柴油30 为 60 m、电动60 细石 200 m。请以具体型号页面参数为准，不要把单一距离套用到全系列。',
    },
  },
  {
    id: 'max-vertical',
    question: {
      en: 'What vertical conveying height can Pinjin pumps reach?',
      zh: '品锦泵的垂直输送高度能到多少？',
    },
    answer: {
      en: 'The highest listed vertical conveying height in the catalogue is 600 m for Electric 60 on fine stone. Diesel 120 lists 500 m. Compact pumps are lower, for example Electric 15 at 15–20 m. Match vertical height to building floors or placement elevation before ordering, and use the figure printed on that model page.',
      zh: '目录中最高列出的垂直输送高度为电动60细石工况的 600 m。柴油120 为 500 m。紧凑型更低，如电动15 为 15–20 m。下单前请按楼层或浇筑高度匹配型号，并以该型号页面公布值为准。',
    },
  },
  {
    id: 'diesel-vs-motor',
    question: {
      en: 'Should I choose a diesel or motor concrete pump?',
      zh: '应该选柴油泵还是电机泵？',
    },
    answer: {
      en: 'Choose by site power availability. Diesel trailer or rural diesel units suit remote or power-limited sites; for example Diesel 50 lists a diesel engine and 30 m³/h output. Electric models suit stable industrial power; Electric 40 lists motor power and 21 m³/h. Confirm local fuel and electricity conditions before selection.',
      zh: '按现场供电选择。柴油拖泵或农村柴油泵适合偏远或供电不便工地，如柴油50列出柴油机与 30 m³/h；电机型适合稳定工业用电，电动40列出电机功率与 21 m³/h。请结合燃油与供电条件选型。',
    },
  },
  {
    id: 'small-pump',
    question: {
      en: 'Which Pinjin models suit small concrete pumping jobs?',
      zh: '哪些品锦型号适合小型混凝土输送工况？',
    },
    answer: {
      en: 'For compact transfer needs, start with Electric 15 (8–10 m³/h, 60–80 m horizontal, 450 kg), Electric 10 Series, Tractor-Driven 4100 or the rural diesel pump. These models are lighter than Electric 80 / Diesel 120 class pumps and easier to position on constrained sites.',
      zh: '紧凑输送可优先看电动15（8–10 m³/h，水平 60–80 m，重量 450 kg）、电动10系列、拖拉机带动4100或农村柴油泵。相对电动80 / 柴油120 一类更轻便，适合场地受限工况。',
    },
  },
  {
    id: 'electric-80',
    question: {
      en: 'What is special about the Electric 80 concrete pump?',
      zh: '电动80型混凝土泵有什么特点？',
    },
    answer: {
      en: 'Electric 80 (HBT80-1816-110) is positioned for long-distance conveying among currently listed Pinjin electric pumps. Key parameters include theoretical delivery capacity 60 m³/h, horizontal conveying distance 900 m, vertical conveying height 300 m, outlet pressure 40 MPa, and a 110 kW motor.',
      zh: '在当前目录电动泵中，电动80（HBT80-1816-110）面向长距离输送。主要参数包括理论输送量 60 m³/h、水平输送距离 900 m、垂直输送高度 300 m、出口压力 40 MPa，以及 110 kW 电机。',
    },
  },
  {
    id: 'mortar-machine',
    question: {
      en: 'Do you manufacture mortar spraying machines?',
      zh: '你们是否生产砂浆喷涂机？',
    },
    answer: {
      en: 'No. The current website catalogue lists electric concrete pumps, diesel concrete pumps and mixer pumps. A dedicated mortar spraying machine is not published here. If a project needs spraying equipment, contact the Xingtai factory rather than using a pump table.',
      zh: '否。当前网站目录列出电动混凝土泵、柴油混凝土泵与搅拌泵，未公布独立砂浆喷涂机。若项目需要喷涂设备，请联系邢台工厂，不要套用泵送参数表。',
    },
  },
  {
    id: 'plaster-machine',
    question: {
      en: 'What plaster spraying equipment do you offer?',
      zh: '你们有哪些石膏喷涂设备？',
    },
    answer: {
      en: 'A dedicated plaster spraying machine is not listed on the current website catalogue. Pinjin’s published models are electric pumps, diesel pumps and mixer pumps. Contact the factory if the job is finishing spraying rather than pipeline pumping.',
      zh: '当前网站目录未列出独立石膏喷涂机。已公布型号为电动泵、柴油泵与搅拌泵。若工况是饰面喷涂而不是管道泵送，请联系工厂。',
    },
  },
  {
    id: 'customization',
    question: {
      en: 'Do you support customized concrete pumps or mixer pumps?',
      zh: '是否支持混凝土泵或搅拌泵定制？',
    },
    answer: {
      en: 'Customization starts from a listed electric pump, diesel pump or mixer pump. Buyers can send project requirements—capacity, conveying distance, power type and site constraints—and Pinjin can discuss whether a listed configuration fits or what adjustment is feasible. Unpublished performance figures are not promised.',
      zh: '定制从已列电动泵、柴油泵或搅拌泵出发。欢迎提供产能、输送距离、动力形式与场地限制等需求，品锦可基于现有机型讨论适配或可行调整。不承诺未公布的性能数字。',
    },
  },
  {
    id: 'price',
    question: {
      en: 'Can I get a concrete pump price from your China manufacturer?',
      zh: '如何向厂家询价混凝土泵价格？',
    },
    answer: {
      en: 'Pinjin does not publish fixed online prices because configuration depends on model, options and shipping terms. To request a quote, send the required model or duty parameters (delivery capacity, horizontal/vertical distance, aggregate size, diesel or motor) by WhatsApp or email. The team will respond with a suitable equipment recommendation.',
      zh: '品锦不在网站公布固定价格，因为配置取决于型号、选配与贸易条款。询价时请通过 WhatsApp 或邮件说明型号或工况参数（输送量、水平/垂直距离、骨料粒径、柴油/电机），我们将回复合适设备方案。',
    },
  },
  {
    id: 'location',
    question: {
      en: 'Where is Pinjin located and can overseas buyers inquire?',
      zh: '品锦工厂在哪里？海外买家能否询盘？',
    },
    answer: {
      en: 'Pinjin is located in Renze Industrial Park, Xingtai City, Hebei Province, China. Located in Xingtai, Hebei, Xingjiawan is known as an important manufacturing area for concrete machinery. Overseas buyers can request quotations by WhatsApp or email with project needs and preferred models.',
      zh: '品锦位于中国河北省邢台市任泽工业园区。邢台邢家湾是中国重要的混凝土机械制造集聚区之一。海外买家可通过 WhatsApp 或邮件说明项目需求与意向型号获取报价。',
    },
  },
  {
    id: 'aggregate',
    question: {
      en: 'What aggregate size can Pinjin concrete pumps handle?',
      zh: '品锦混凝土泵可输送多大骨料？',
    },
    answer: {
      en: 'Max aggregate diameter depends on the model. Catalogue examples include 1–3 cm on Electric 15, ≤2 cm on Electric 80, and 6 cm and below on Diesel 120 and LZ-80. Choosing a pump with insufficient aggregate allowance can cause pipe blockage, so always verify this parameter against your concrete mix.',
      zh: '最大骨料粒径因型号而异。目录示例：电动15 为 1–3 cm，电动80 为 ≤2 cm，柴油120 与 LZ-80 为 6 cm 及以下。骨料允许值不足易堵管，请务必对照配合比核对该参数。',
    },
  },
];

export function buildFaqPageJsonLd(faqs: FaqItem[], lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: pick(item.question, lang),
      acceptedAnswer: {
        '@type': 'Answer',
        text: pick(item.answer, lang),
      },
    })),
  };
}
