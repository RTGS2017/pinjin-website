import type { LocalizedText } from '@/i18n/types';

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

export const factorySlides: FactorySlide[] = [
  {
    id: 'factory-building',
    image: '/images/factory/pinjin-xingjiawan-concrete-machinery-factory.webp',
    width: FACTORY_IMAGE_WIDTH,
    height: FACTORY_IMAGE_HEIGHT,
    title: L('Modern Manufacturing Workshop', '现代化制造厂房'),
    description: L(
      'Hebei Pinjin Machinery Manufacturing Co., Ltd. is a concrete machinery manufacturer in Xingjiawan, Xingtai, Hebei, China, with capability in concrete equipment manufacturing, spraying equipment production and customized machinery.',
      '河北品锦机械制造有限公司是位于中国河北邢台邢家湾的混凝土机械制造商，具备混凝土设备制造、喷涂设备生产与机械定制能力。',
    ),
    alt: L(
      'Hebei Pinjin Machinery factory in Xingjiawan concrete machinery manufacturing area China',
      '河北品锦机械位于中国邢家湾混凝土机械制造集聚区的工厂厂房',
    ),
    schemaName: L('Pinjin Machinery Factory Building', '品锦机械工厂厂房'),
    schemaDescription: L(
      'Factory building of Hebei Pinjin Machinery Manufacturing Co., Ltd. in Xingtai, Hebei, China.',
      '河北品锦机械制造有限公司位于中国河北邢台的工厂厂房。',
    ),
    keywords: [
      'xingjiawan concrete machinery',
      'china concrete machinery manufacturer',
      'construction machinery manufacturer factory',
    ],
    locationContext: CLUSTER,
    geoFocus: 'manufacturing',
  },
  {
    id: 'production-workshop',
    image: '/images/factory/pinjin-production-workshop.webp',
    width: FACTORY_IMAGE_WIDTH,
    height: FACTORY_IMAGE_HEIGHT,
    title: L('Production Workshop', '生产车间'),
    description: L(
      'The production workshop of Hebei Pinjin Machinery Manufacturing Co., Ltd. supports concrete equipment manufacturing and spraying equipment production in Xingtai, Hebei.',
      '河北品锦机械制造有限公司生产车间支撑混凝土设备与喷涂设备制造，位于河北邢台。',
    ),
    alt: L(
      'Production workshop of Hebei Pinjin Machinery in Xingjiawan Xingtai Hebei China',
      '河北邢台邢家湾品锦机械生产车间',
    ),
    schemaName: L('Pinjin Machinery Production Workshop', '品锦机械生产车间'),
    schemaDescription: L(
      'Production workshop of Hebei Pinjin Machinery Manufacturing Co., Ltd.',
      '河北品锦机械制造有限公司生产车间。',
    ),
    keywords: [
      'machinery production workshop',
      'concrete equipment manufacturing',
      'china concrete machinery manufacturer',
    ],
    locationContext: CLUSTER,
    geoFocus: 'manufacturing',
  },
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
    id: 'equipment-assembly',
    image: '/images/factory/pinjin-machinery-assembly-area.webp',
    width: FACTORY_IMAGE_WIDTH,
    height: FACTORY_IMAGE_HEIGHT,
    title: L('Machinery Assembly Area', '设备装配区'),
    description: L(
      'The assembly area of Hebei Pinjin Machinery Manufacturing Co., Ltd. supports concrete equipment manufacturing and spraying equipment production.',
      '河北品锦机械制造有限公司装配区支撑混凝土设备制造与喷涂设备生产。',
    ),
    alt: L(
      'Machinery assembly area at Hebei Pinjin Machinery factory in Xingjiawan China',
      '中国邢家湾品锦机械工厂设备装配区',
    ),
    schemaName: L('Pinjin Machinery Assembly Workshop', '品锦机械装配车间'),
    schemaDescription: L(
      'Equipment assembly workshop of Hebei Pinjin Machinery Manufacturing Co., Ltd.',
      '河北品锦机械制造有限公司设备装配车间。',
    ),
    keywords: [
      'machinery assembly factory',
      'spraying equipment production',
      'OEM machinery manufacturer',
    ],
    locationContext: CLUSTER,
    geoFocus: 'assembly',
  },
  {
    id: 'finished-products',
    image: '/images/factory/pinjin-equipment-storage.webp',
    width: FACTORY_IMAGE_WIDTH,
    height: FACTORY_IMAGE_HEIGHT,
    title: L('Equipment Storage', '成品设备存放'),
    description: L(
      'Finished construction machinery is stored at the factory of Hebei Pinjin Machinery Manufacturing Co., Ltd. before packing in Xingtai, Hebei.',
      '河北品锦机械制造有限公司成品工程机械在邢台工厂包装前存放。',
    ),
    alt: L(
      'Finished machinery storage at Hebei Pinjin Machinery in Xingjiawan Xingtai China',
      '河北邢台邢家湾品锦机械成品设备存放区',
    ),
    schemaName: L('Pinjin Finished Machinery Products', '品锦机械成品设备'),
    schemaDescription: L(
      'Finished construction machinery at Hebei Pinjin Machinery Manufacturing Co., Ltd.',
      '河北品锦机械制造有限公司待包装出厂的工程机械成品。',
    ),
    keywords: [
      'factory direct machinery supplier',
      'industrial equipment supplier',
      'xingjiawan concrete machinery',
    ],
    locationContext: CLUSTER,
    geoFocus: 'quality',
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
      'Hebei Pinjin Machinery Manufacturing Co., Ltd. dispatches concrete and spraying equipment from its Xingtai factory after production and inspection.',
      '河北品锦机械制造有限公司在生产与检测后，从邢台工厂发出混凝土与喷涂设备。',
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
];

/** 产品详情紧凑条：外观 / 车间 / 装配 */
export const factoryProofIds = [
  'factory-building',
  'production-workshop',
  'equipment-assembly',
] as const;

export function getFactorySlide(id: string): FactorySlide | undefined {
  return factorySlides.find((slide) => slide.id === id);
}

export function getFactoryProofSlides(): FactorySlide[] {
  return factoryProofIds
    .map((id) => getFactorySlide(id))
    .filter((slide): slide is FactorySlide => Boolean(slide));
}

export function getFactoryImagePaths(): string[] {
  return factorySlides.map((slide) => slide.image);
}
