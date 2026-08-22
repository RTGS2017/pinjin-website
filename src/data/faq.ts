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
      en: 'Hebei Pinjin Machinery Manufacturing Co., Ltd. is a construction machinery manufacturer focused on special equipment. The company is located in Renze Industrial Park, Xingtai City, Hebei Province, China. Its positioning is a professional source manufacturer of delivery pumps. Core activities include R&D, production and sales of construction machinery such as concrete pumps, with additional mortar spraying and plaster spraying equipment in the product range.',
      zh: '河北品锦机械制造有限公司是专注特种设备制造的工程机械企业，位于河北省邢台市任泽工业园区，定位为专业输送泵生产源头厂家。主营混凝土泵等工程机械的研发、生产与销售，产品线还包括砂浆喷涂机与石膏喷涂机。',
    },
  },
  {
    id: 'what-products',
    question: {
      en: 'What products does Pinjin manufacture?',
      zh: '品锦主要生产哪些产品？',
    },
    answer: {
      en: 'Pinjin manufactures three main equipment groups: concrete pumps / transfer pumps, mortar spraying machines, and plaster spraying machines. Concrete pump models include Diesel 4100, LL15 diesel/motor versions, ZS22-25, LL28-32, HBT30-37, HBT45-40, HBTT55-50, LL60-75 and HBT80-18-140. The mortar line includes a diesel screw mortar spraying machine. The plaster line includes a fully automatic plaster spraying machine.',
      zh: '品锦产品主要包括三类：混凝土泵/输送泵、砂浆喷涂机、石膏喷涂机。混凝土泵型号含 Diesel 4100、LL15 柴油/电机版、ZS22-25、LL28-32、HBT30-37、HBT45-40、HBTT55-50、LL60-75、HBT80-18-140；砂浆类有柴油螺杆砂浆喷涂机；石膏类有全自动石膏喷涂机。',
    },
  },
  {
    id: 'how-to-choose',
    question: {
      en: 'How to choose a concrete pump for a construction project?',
      zh: '施工项目如何选择混凝土泵？',
    },
    answer: {
      en: 'Start with four catalogue parameters: theoretical delivery capacity, horizontal conveying distance, vertical conveying height, and max aggregate diameter. Then check power type (diesel or motor), machine dimensions and weight for site access. For smaller jobs, LL15 or Diesel 4100 class pumps may fit. For longer reach and higher output, compare HBT30-37, HBT45-40, HBTT55-50, LL60-75 and HBT80-18-140. Share your pour volume, pipe layout and aggregate size with Pinjin so the team can recommend a suitable model from published specs.',
      zh: '优先对照四类目录参数：理论输送量、水平输送距离、垂直输送高度、最大骨料粒径；再确认动力形式（柴油/电机）、外形尺寸与整机重量是否便于进场。小型工况可看 LL15、Diesel 4100 一类；更长距离与更高产量可对比 HBT30-37、HBT45-40、HBTT55-50、LL60-75、HBT80-18-140。把浇筑量、管路布置与骨料粒径发给品锦，可按公开参数推荐型号。',
    },
  },
  {
    id: 'max-horizontal',
    question: {
      en: 'What is the maximum horizontal conveying distance of Pinjin concrete pumps?',
      zh: '品锦混凝土泵最大水平输送距离是多少？',
    },
    answer: {
      en: 'In the current product catalogue, the highest listed horizontal conveying distance is 600 m on the HBT80-18-140 concrete pump. Other models list shorter ranges according to their design, for example LL15 diesel at 50 m, LL28-32 at 100 m, HBT30-37 at 250 m, and HBT45-40 at 300 m. Always select by the specific model page rather than assuming one distance for the whole range.',
      zh: '当前产品目录中，列出的最大水平输送距离为 HBT80-18-140 的 600 m。其他型号按设计不同，例如 LL15 柴油版 50 m、LL28-32 为 100 m、HBT30-37 为 250 m、HBT45-40 为 300 m。请以具体型号页面参数为准，不要把单一距离套用到全系列。',
    },
  },
  {
    id: 'max-vertical',
    question: {
      en: 'What vertical conveying height can Pinjin pumps reach?',
      zh: '品锦泵的垂直输送高度能到多少？',
    },
    answer: {
      en: 'The highest listed vertical conveying height in the catalogue is 300 m for HBT80-18-140. Mid and large models such as HBT30-37 list 120 m, while HBT45-40 lists 150 m and HBTT55-50 / LL60-75 list 150–180 m. Compact transfer pumps are lower, for example LL15 motor version at 15 m and Diesel 4100 at 25 m. Match vertical height to building floors or placement elevation before ordering.',
      zh: '目录中最高列出的垂直输送高度为 HBT80-18-140 的 300 m。中大型如 HBT30-37 为 120 m，HBT45-40 为 150 m，HBTT55-50 / LL60-75 为 150–180 m；紧凑型更低，如 LL15 电机版 15 m、Diesel 4100 为 25 m。下单前请按楼层或浇筑高度匹配型号。',
    },
  },
  {
    id: 'diesel-vs-motor',
    question: {
      en: 'Should I choose a diesel or motor concrete pump?',
      zh: '应该选柴油泵还是电机泵？',
    },
    answer: {
      en: 'Choose by site power availability and mobility. Diesel units suit remote or power-limited sites; for example LL15 diesel lists 28 HP diesel engine power. Motor versions suit stable industrial power supply; LL15 motor lists 15 kW motor power and 380 V rated voltage. Many larger Pinjin pumps are diesel-engine based (models such as 4100/4105/4108/6105/6110 listed in the catalogue). Confirm local fuel and electricity conditions before selection.',
      zh: '按现场供电与机动性选择。柴油机适合偏远或供电不便工地，如 LL15 柴油版目录列出 28 HP；电机版适合稳定工业用电，LL15 电机版列出 15 kW、额定电压 380 V。多数中大型品锦泵为柴油动力（目录含 4100/4105/4108/6105/6110 等机型标注）。请结合燃油与供电条件选型。',
    },
  },
  {
    id: 'small-pump',
    question: {
      en: 'Which Pinjin models suit small concrete pumping jobs?',
      zh: '哪些品锦型号适合小型混凝土输送工况？',
    },
    answer: {
      en: 'For compact transfer needs, start with Diesel 4100 (delivery capacity 6–8 m³/h, horizontal 60 m, vertical 25 m), LL15 diesel (5–8 m³/h, horizontal 50 m, vertical 20 m) and LL15 motor (5–8 m³/h, horizontal 30 m, vertical 15 m). ZS22-25 is another practical option with 7–8 m³/h capacity and 60 m horizontal distance. These models are lighter than the large HBT/LL high-capacity pumps and easier to position on constrained sites.',
      zh: '紧凑输送可优先看 Diesel 4100（输送量 6–8 m³/h，水平 60 m，垂直 25 m）、LL15 柴油版（5–8 m³/h，水平 50 m，垂直 20 m）与 LL15 电机版（5–8 m³/h，水平 30 m，垂直 15 m）。ZS22-25 也较实用（7–8 m³/h，水平 60 m）。相对大型 HBT/LL 机型更轻便，适合场地受限工况。',
    },
  },
  {
    id: 'hbt80',
    question: {
      en: 'What is special about the HBT80-18-140 concrete pump?',
      zh: 'HBT80-18-140 混凝土泵有什么特点？',
    },
    answer: {
      en: 'HBT80-18-140 is positioned for long-distance and high-rise conveying among currently listed Pinjin pumps. Key parameters include theoretical delivery capacity 40–75 m³/h, horizontal conveying distance 600 m, vertical conveying height 300 m, max aggregate diameter 6 cm, and a 6-cylinder / 216 kW diesel engine.',
      zh: '在当前目录机型中，HBT80-18-140 面向长距离与高扬程输送。主要参数包括理论输送量 40–75 m³/h、水平输送距离 600 m、垂直输送高度 300 m、最大骨料粒径 6 cm，以及六缸 / 216 kW 柴油机参数。',
    },
  },
  {
    id: 'mortar-machine',
    question: {
      en: 'Do you manufacture mortar spraying machines?',
      zh: '你们是否生产砂浆喷涂机？',
    },
    answer: {
      en: 'Yes. Pinjin lists a Diesel Screw Mortar Spraying Machine. Catalogue parameters include power output 15–18 HP, conveying height up to 40 m (depends on materials), horizontal conveying distance up to 60 m (depends on materials), max conveying particle ≤10 mm, spraying pressure 6 MPa, hopper volume 70 L, and machine weight 180 kg. The same product page explicitly states that customization is supported.',
      zh: '是的。目录含柴油螺杆砂浆喷涂机，参数包括动力输出 15–18 HP、输送高度可达 40 m（根据物料适配）、水平输送距离可达 60 m（根据物料适配）、输送颗粒粒径 ≤10 mm、喷涂压力 6 MPa、料斗容积 70 L、设备重量 180 kg，并明确支持设备定制。',
    },
  },
  {
    id: 'plaster-machine',
    question: {
      en: 'What plaster spraying equipment do you offer?',
      zh: '你们有哪些石膏喷涂设备？',
    },
    answer: {
      en: 'Pinjin offers a Fully Automatic Plaster Spraying Machine. Listed specifications include mixer capacity 115 L, power supply 380 V / 50 Hz, main motor power 5 kW, horizontal conveying distance 20 m, vertical conveying height 10 m, max particle size 6 mm, and air compressor power 3 kW. It is intended for plaster spraying finishing work rather than long-distance concrete pumping.',
      zh: '品锦提供全自动石膏喷涂机。目录参数包括搅拌容积 115 L、供电 380 V / 50 Hz、主电机功率 5 kW、水平输送距离 20 m、垂直输送高度 10 m、最大颗粒粒径 6 mm、空压机功率 3 kW，面向石膏喷涂饰面施工，而非长距离混凝土泵送。',
    },
  },
  {
    id: 'customization',
    question: {
      en: 'Do you support customized concrete pumps or spraying machines?',
      zh: '是否支持混凝土泵或喷涂机定制？',
    },
    answer: {
      en: 'Customization is confirmed in the product catalogue for the Diesel Screw Mortar Spraying Machine (“Support customization”). For other models, buyers can send project requirements—capacity, conveying distance, power type and site constraints—and Pinjin can discuss whether a listed configuration fits or what adjustment is feasible.',
      zh: '产品目录明确柴油螺杆砂浆喷涂机“支持设备定制”。其他型号欢迎提供产能、输送距离、动力形式与场地限制等需求，品锦可基于现有机型讨论适配或可行调整。',
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
      en: 'Max aggregate diameter depends on the model. Catalogue examples include 0.5–3 cm on Diesel 4100 and ZS22-25, 2 cm on LL15 and LL28-32, 3 cm on HBT30-37 and HBT45-40, 4 cm on HBTT55-50, 5 cm on LL60-75, and 6 cm on HBT80-18-140. Choosing a pump with insufficient aggregate allowance can cause pipe blockage, so always verify this parameter against your concrete mix.',
      zh: '最大骨料粒径因型号而异。目录示例：Diesel 4100 与 ZS22-25 为 0.5–3 cm，LL15 与 LL28-32 为 2 cm，HBT30-37 与 HBT45-40 为 3 cm，HBTT55-50 为 4 cm，LL60-75 为 5 cm，HBT80-18-140 为 6 cm。骨料允许值不足易堵管，请务必对照配合比核对该参数。',
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
