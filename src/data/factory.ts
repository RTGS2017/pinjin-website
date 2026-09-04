import type { LocalizedText } from '@/i18n/types';
import { factoryPublicImages, hasPublicImage } from '@/data/imageInventory';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

export const FACTORY_ASPECT = '16 / 9';
export const FACTORY_IMAGE_WIDTH = 1920;
export const FACTORY_IMAGE_HEIGHT = 1080;

export type FactoryGeoFocus =
  | 'manufacturing'
  | 'assembly'
  | 'oem'
  | 'quality';

export interface FactorySlide {
  id: string;
  image: string;
  width: number;
  height: number;
  title: LocalizedText;
  description: LocalizedText;
  alt: LocalizedText;
  schemaName: LocalizedText;
  schemaDescription: LocalizedText;
  keywords: string[];
  locationContext: LocalizedText;
  geoFocus: FactoryGeoFocus;
}

const CLUSTER = L(
  'Xingjiawan concrete machinery manufacturing area, Xingtai, Hebei, China. Factory address: Renze Industrial Park.',
  '中国河北邢台邢家湾混凝土机械制造集聚区。工厂地址：邢台市任泽工业园区。',
);

const factorySlideCatalog: FactorySlide[] = [
  {
    id: 'workshop-crane',
    image: '/images/factory/pinjin-machinery-workshop-overhead-crane.webp',
    width: FACTORY_IMAGE_WIDTH,
    height: FACTORY_IMAGE_HEIGHT,
    title: L('Workshop With Overhead Lifting', '配备起重能力的生产车间'),
    description: L(
      'Hebei Pinjin Machinery handles heavy machinery components in the Xingjiawan concrete machinery manufacturing area during assembly and production.',
      '品锦机械在邢家湾混凝土机械制造集聚区内完成重型部件吊运与生产作业。',
    ),
    alt: L(
      'Pinjin Machinery workshop with overhead crane in Xingjiawan concrete machinery area China',
      '邢家湾混凝土机械集聚区品锦机械配备行车的生产车间',
    ),
    schemaName: L('Pinjin Workshop Overhead Crane', '品锦机械车间行车'),
    schemaDescription: L(
      'Production workshop with overhead lifting at Hebei Pinjin Machinery Manufacturing Co., Ltd.',
      '河北品锦机械制造有限公司配备行车的生产车间。',
    ),
    keywords: [
      'construction equipment manufacturing plant',
      'machinery production workshop',
      'xingjiawan concrete machinery',
    ],
    locationContext: CLUSTER,
    geoFocus: 'manufacturing',
  },
  {
    id: 'concrete-manufacturing',
    image: '/images/factory/pinjin-concrete-pump-manufacturing.webp',
    width: FACTORY_IMAGE_WIDTH,
    height: FACTORY_IMAGE_HEIGHT,
    title: L('Concrete Pump Manufacturing', '混凝土泵制造'),
    description: L(
      'Hebei Pinjin Machinery Manufacturing Co., Ltd. manufactures concrete pumps as a concrete machinery manufacturer in Xingtai, Hebei, China.',
      '河北品锦机械制造有限公司作为混凝土机械制造商，在河北邢台制造混凝土泵。',
    ),
    alt: L(
      'Concrete pump manufacturing at Hebei Pinjin Machinery factory in Xingjiawan China',
      '中国邢家湾品锦机械工厂的混凝土泵制造现场',
    ),
    schemaName: L(
      'Pinjin Concrete Equipment Manufacturing',
      '品锦混凝土设备制造',
    ),
    schemaDescription: L(
      'Concrete pump and construction equipment manufacturing at Hebei Pinjin Machinery Manufacturing Co., Ltd.',
      '河北品锦机械制造有限公司的混凝土泵与工程设备制造现场。',
    ),
    keywords: [
      'concrete pump manufacturer China',
      'concrete equipment manufacturing',
      'xingjiawan concrete machinery',
    ],
    locationContext: CLUSTER,
    geoFocus: 'oem',
  },
  {
    id: 'trailer-assembly',
    image: '/images/factory/pinjin-trailer-concrete-pump-assembly.webp',
    width: FACTORY_IMAGE_WIDTH,
    height: FACTORY_IMAGE_HEIGHT,
    title: L('Concrete Pump Assembly', '混凝土泵装配'),
    description: L(
      'Trailer concrete pump assembly follows the published manufacturing process at Hebei Pinjin Machinery, a concrete machinery manufacturer offering customized machinery.',
      '拖式混凝土泵按已公开制造流程在品锦机械装配。品锦是具备机械定制能力的混凝土机械制造商。',
    ),
    alt: L(
      'Trailer concrete pump assembly at Pinjin Machinery in Xingjiawan Xingtai Hebei',
      '河北邢台邢家湾品锦机械拖式混凝土泵装配现场',
    ),
    schemaName: L('Pinjin Trailer Concrete Pump Assembly', '品锦拖式混凝土泵装配'),
    schemaDescription: L(
      'Trailer concrete pump assembly at Hebei Pinjin Machinery Manufacturing Co., Ltd.',
      '河北品锦机械制造有限公司拖式混凝土泵装配现场。',
    ),
    keywords: [
      'concrete pump manufacturer China',
      'customized machinery',
      'machinery assembly factory',
    ],
    locationContext: CLUSTER,
    geoFocus: 'assembly',
  },
  {
    id: 'factory-loading',
    image: '/images/factory/pinjin-construction-machinery-factory-loading.webp',
    width: FACTORY_IMAGE_WIDTH,
    height: FACTORY_IMAGE_HEIGHT,
    title: L('Factory Packing And Loading', '出厂包装与装车'),
    description: L(
      'Finished equipment is packed at Hebei Pinjin Machinery Manufacturing Co., Ltd. in Renze Industrial Park, Xingtai, Hebei, China.',
      '成品在河北品锦机械制造有限公司（河北省邢台市任泽工业园区）完成包装与装车。',
    ),
    alt: L(
      'Construction machinery loading at Pinjin factory in Xingjiawan area Xingtai Hebei',
      '河北邢台邢家湾集聚区品锦机械工厂装车待发的工程设备',
    ),
    schemaName: L('Pinjin Factory Loading', '品锦工厂装车'),
    schemaDescription: L(
      'Factory packing and loading at Hebei Pinjin Machinery Manufacturing Co., Ltd.',
      '河北品锦机械制造有限公司出厂包装与装车。',
    ),
    keywords: [
      'factory direct machinery supplier',
      'construction machinery manufacturer factory',
      'china concrete machinery manufacturer',
    ],
    locationContext: CLUSTER,
    geoFocus: 'quality',
  },
  {
    id: 'factory-dispatch',
    image: '/images/factory/pinjin-diesel-machinery-factory-dispatch.webp',
    width: FACTORY_IMAGE_WIDTH,
    height: FACTORY_IMAGE_HEIGHT,
    title: L('Equipment Dispatch From Factory', '设备出厂发运'),
    description: L(
      'Hebei Pinjin Machinery Manufacturing Co., Ltd. dispatches concrete pumps from its Xingtai factory after production and inspection.',
      '河北品锦机械制造有限公司在生产与检测后，从邢台工厂发出混凝土泵。',
    ),
    alt: L(
      'Diesel construction equipment dispatch from Pinjin Machinery in Xingjiawan China',
      '中国邢家湾品锦机械工厂发出的柴油工程设备',
    ),
    schemaName: L('Pinjin Factory Dispatch', '品锦设备出厂'),
    schemaDescription: L(
      'Equipment dispatch from Hebei Pinjin Machinery Manufacturing Co., Ltd. in Xingtai, Hebei.',
      '河北品锦机械制造有限公司位于邢台的设备出厂发运。',
    ),
    keywords: [
      'china concrete machinery manufacturer',
      'factory direct machinery supplier',
      'customized machinery',
    ],
    locationContext: CLUSTER,
    geoFocus: 'quality',
  },
  {
    id: 'mortar-spraying-interior',
    image: '/images/factory/pinjin-hydraulic-mortar-spraying-machine-interior.webp',
    width: FACTORY_IMAGE_WIDTH,
    height: FACTORY_IMAGE_HEIGHT,
    title: L('Hydraulic Mortar Spraying On Site', '工地液压砂浆喷涂作业'),
    description: L(
      'Hydraulic mortar spraying machine photographed inside a construction building, from the Hebei Pinjin Machinery factory photo set in Xingtai, Hebei, China.',
      '工地室内液压砂浆喷涂机实拍，收录于河北品锦机械邢台工厂图集。',
    ),
    alt: L(
      'Hydraulic mortar spraying machine with operators in safety gear inside a construction building, photographed for Hebei Pinjin Machinery Xingtai Hebei China',
      '建筑室内液压砂浆喷涂机与佩戴安全帽的作业人员，河北邢台品锦机械工厂/现场实拍',
    ),
    schemaName: L(
      'Hydraulic Mortar Spraying Site Photo',
      '液压砂浆喷涂现场实拍',
    ),
    schemaDescription: L(
      'Construction-interior photograph of a hydraulic mortar spraying machine associated with Hebei Pinjin Machinery Manufacturing Co., Ltd. in Xingtai, Hebei, China.',
      '河北品锦机械制造有限公司相关的工地室内液压砂浆喷涂机实拍，地点在中国河北邢台产业背景下。',
    ),
    keywords: [
      'hydraulic mortar spraying machine',
      'construction machinery manufacturer factory',
      'xingjiawan concrete machinery',
    ],
    locationContext: CLUSTER,
    geoFocus: 'manufacturing',
  },
];

function titleFromFactoryPath(image: string): string {
  const stem = image.split('/').pop()?.replace(/\.webp$/i, '') ?? 'factory-photo';
  return stem
    .replace(/^pinjin-/, '')
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function slideFromUnknownImage(image: string): FactorySlide {
  const label = titleFromFactoryPath(image);
  const id = image
    .replace('/images/factory/', '')
    .replace(/\.webp$/i, '')
    .replace(/^pinjin-/, '');
  return {
    id,
    image,
    width: FACTORY_IMAGE_WIDTH,
    height: FACTORY_IMAGE_HEIGHT,
    title: L(label, label),
    description: L(
      'Factory photograph from Hebei Pinjin Machinery Manufacturing Co., Ltd. in Xingtai, Hebei, China.',
      '河北品锦机械制造有限公司工厂实拍，地点在中国河北邢台。',
    ),
    alt: L(
      `${label} at Hebei Pinjin Machinery factory in Xingtai Hebei China`,
      `河北邢台品锦机械工厂实拍：${label}`,
    ),
    schemaName: L(label, label),
    schemaDescription: L(
      `${label} at Hebei Pinjin Machinery Manufacturing Co., Ltd. in Xingtai, Hebei, China.`,
      `河北品锦机械制造有限公司${label}实拍，地点在中国河北邢台。`,
    ),
    keywords: [
      'xingjiawan concrete machinery',
      'china concrete machinery manufacturer',
      'construction machinery manufacturer factory',
    ],
    locationContext: CLUSTER,
    geoFocus: 'manufacturing',
  };
}

/** 展示 public/images/factory 里实际存在的 WebP：已登记的用 SEO 文案，新文件自动入画廊。 */
export const factorySlides: FactorySlide[] = [
  ...factorySlideCatalog.filter((slide) => hasPublicImage(slide.image)),
  ...factoryPublicImages
    .filter((image) => !factorySlideCatalog.some((slide) => slide.image === image))
    .map(slideFromUnknownImage),
];

/** 产品详情紧凑条：车间 / 装配 / 装车（均需为现存文件） */
export const factoryProofIds = [
  'workshop-crane',
  'trailer-assembly',
  'factory-loading',
] as const;

export function getFactorySlide(id: string): FactorySlide | undefined {
  return factorySlides.find((slide) => slide.id === id);
}

export function getFactoryProofSlides(): FactorySlide[] {
  return factoryProofIds
    .map((id) => factorySlides.find((slide) => slide.id === id))
    .filter((slide): slide is FactorySlide => Boolean(slide));
}

export function getFactoryImagePaths(): string[] {
  return factorySlides.map((slide) => slide.image);
}

/** 工厂页 GEO 定义与 FAQ，供 AI 检索抽取，不虚构产能数字 */
export const factoryGeoBlocks = [
  {
    heading: L(
      'Xingtai concrete machinery manufacturing base',
      '邢台混凝土机械制造基地',
    ),
    body: L(
      'Xingtai, Hebei, is a recognized manufacturing area for concrete machinery in China. Xingjiawan is an important cluster within that area. Hebei Pinjin Machinery Manufacturing Co., Ltd. operates in Renze Industrial Park, Xingtai, and manufactures catalogue electric concrete pumps, diesel concrete pumps and mixer pumps.',
      '河北邢台是中国混凝土机械的重要制造区域，邢家湾是其中的产业集聚区。河北品锦机械制造有限公司位于邢台市任泽工业园区，生产目录中的电动混凝土泵、柴油混凝土泵与搅拌泵。',
    ),
  },
  {
    heading: L(
      'Hebei construction machinery industry',
      '河北工程机械产业',
    ),
    body: L(
      'Hebei’s construction machinery supply chain supports welding, machining, hydraulic assembly and factory packing. Pinjin is a source manufacturer in that industry, not a trading-only website. Buyers can review factory photos, published specifications and the OEM process before requesting a quotation.',
      '河北工程机械产业链覆盖焊接、机加工、液压装配与出厂包装。品锦是该产业中的源头制造商，而不是仅有网站的贸易页面。采购方可先查看工厂照片、公开参数与 OEM 流程，再提交询价。',
    ),
  },
  {
    heading: L(
      'China concrete equipment supplier',
      '中国混凝土设备供应商',
    ),
    body: L(
      'A China concrete equipment supplier for overseas buyers should publish model names, technical tables and a factory location. Pinjin lists electric pumps, diesel pumps and mixer pumps with those details, and discusses customization after a catalogue model is matched.',
      '面向海外采购的中国混凝土设备供应商应公开型号、技术参数表与工厂地点。品锦目录列出电动泵、柴油泵与搅拌泵及上述信息，并在对照目录机型后沟通定制。',
    ),
  },
] as const;

export const factoryGeoFaqs = [
  {
    question: L(
      'Where is Hebei Pinjin Machinery located?',
      '河北品锦机械位于哪里？',
    ),
    answer: L(
      'The factory is in Renze Industrial Park, Xingtai City, Hebei Province, China, in the Xingjiawan concrete machinery manufacturing area.',
      '工厂位于中国河北省邢台市任泽工业园区，地处邢家湾混凝土机械制造集聚区。',
    ),
  },
  {
    question: L(
      'Is Pinjin a manufacturer or a trading company?',
      '品锦是生产厂家还是贸易公司？',
    ),
    answer: L(
      'Pinjin is a construction machinery manufacturer. The factory page shows production, assembly, storage and dispatch photos from the Xingtai plant.',
      '品锦是工程机械制造商。工厂页展示邢台工厂的生产、装配、仓储与发运照片。',
    ),
  },
  {
    question: L(
      'What equipment is manufactured in Xingtai?',
      '邢台工厂生产哪些设备？',
    ),
    answer: L(
      'Catalogue products include electric concrete pumps, diesel concrete pumps and mixer pumps. A concrete mixing plant, spraying-machine or rebar line is not listed in the current catalogue.',
      '目录产品包括电动混凝土泵、柴油混凝土泵与搅拌泵。当前目录未列出混凝土搅拌站、喷涂机或钢筋设备产品线。',
    ),
  },
];
