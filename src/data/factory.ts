import type { LocalizedText } from '@/i18n/types';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

export const FACTORY_ASPECT = '16 / 9';
export const FACTORY_AUTOPLAY_MS = 7000;
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
  geoFocus: FactoryGeoFocus;
}

export const factorySlides: FactorySlide[] = [
  {
    id: 'factory-building',
    image: '/images/factory/pinjin-construction-machinery-factory-building.webp',
    width: FACTORY_IMAGE_WIDTH,
    height: FACTORY_IMAGE_HEIGHT,
    title: L('Modern Manufacturing Facility', '现代化制造厂房'),
    description: L(
      'Our factory provides professional manufacturing capabilities for construction machinery and industrial equipment.',
      '工厂为工程机械与工业设备提供专业制造能力。',
    ),
    alt: L(
      'Modern manufacturing facility of Chinese construction machinery manufacturer',
      '中国工程机械制造商的现代化厂房外观',
    ),
    schemaName: L('Pinjin Machinery Factory Building', '品锦机械工厂厂房'),
    schemaDescription: L(
      'Factory building of Hebei Pinjin Machinery Manufacturing Co., Ltd. in Xingtai, Hebei, China.',
      '河北品锦机械制造有限公司位于中国河北邢台的工厂厂房。',
    ),
    keywords: [
      'construction machinery manufacturer factory',
      'industrial equipment manufacturing facility China',
      'Chinese machinery factory',
    ],
    geoFocus: 'manufacturing',
  },
  {
    id: 'production-workshop',
    image: '/images/factory/pinjin-machinery-production-workshop.webp',
    width: FACTORY_IMAGE_WIDTH,
    height: FACTORY_IMAGE_HEIGHT,
    title: L('Large-Scale Production Workshop', '大规模生产车间'),
    description: L(
      'Equipped with organized production areas for efficient machinery manufacturing.',
      '车间分区明确，支撑高效的机械制造作业。',
    ),
    alt: L(
      'Large production workshop of Pinjin Machinery industrial equipment factory',
      '品锦机械工业设备工厂的大型生产车间',
    ),
    schemaName: L('Pinjin Machinery Production Workshop', '品锦机械生产车间'),
    schemaDescription: L(
      'Production workshop of Hebei Pinjin Machinery Manufacturing Co., Ltd.',
      '河北品锦机械制造有限公司生产车间。',
    ),
    keywords: [
      'machinery production workshop',
      'construction equipment manufacturing plant',
      'factory production line China',
    ],
    geoFocus: 'manufacturing',
  },
  {
    id: 'workshop-crane',
    image: '/images/factory/pinjin-machinery-workshop-overhead-crane.webp',
    width: FACTORY_IMAGE_WIDTH,
    height: FACTORY_IMAGE_HEIGHT,
    title: L('Workshop With Overhead Lifting', '配备起重能力的生产车间'),
    description: L(
      'The production hall is equipped for handling heavy machinery components during manufacturing.',
      '车间具备搬运重型机械部件的作业条件。',
    ),
    alt: L(
      'Pinjin Machinery production workshop with overhead crane for construction equipment manufacturing',
      '品锦机械配备行车的工程设备生产车间',
    ),
    schemaName: L('Pinjin Workshop Overhead Crane', '品锦机械车间行车'),
    schemaDescription: L(
      'Production workshop with overhead lifting at Hebei Pinjin Machinery Manufacturing Co., Ltd.',
      '河北品锦机械制造有限公司配备行车的生产车间。',
    ),
    keywords: [
      'construction equipment manufacturing plant',
      'machinery production workshop',
      'industrial machinery factory China',
    ],
    geoFocus: 'manufacturing',
  },
  {
    id: 'concrete-manufacturing',
    image: '/images/factory/pinjin-concrete-pump-manufacturing.webp',
    width: FACTORY_IMAGE_WIDTH,
    height: FACTORY_IMAGE_HEIGHT,
    title: L(
      'Concrete Equipment Manufacturing Capability',
      '混凝土设备制造能力',
    ),
    description: L(
      'Professional manufacturing process for concrete pumps and construction equipment.',
      '面向混凝土泵与工程设备的专业制造过程。',
    ),
    alt: L(
      'Concrete pump and construction equipment manufacturing factory in China',
      '中国混凝土泵与工程设备制造现场',
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
      'concrete spraying equipment factory',
      'construction machinery supplier',
    ],
    geoFocus: 'oem',
  },
  {
    id: 'trailer-assembly',
    image: '/images/factory/pinjin-trailer-concrete-pump-assembly.webp',
    width: FACTORY_IMAGE_WIDTH,
    height: FACTORY_IMAGE_HEIGHT,
    title: L('Concrete Pump Assembly On Site', '混凝土泵现场装配'),
    description: L(
      'Trailer-mounted concrete pump assembly and inspection follow the published manufacturing process.',
      '拖泵类混凝土设备按已公开的制造流程进行装配与检查。',
    ),
    alt: L(
      'Trailer concrete pump assembly at Pinjin Machinery construction equipment factory',
      '品锦机械工程设备工厂的拖式混凝土泵装配现场',
    ),
    schemaName: L('Pinjin Trailer Concrete Pump Assembly', '品锦拖式混凝土泵装配'),
    schemaDescription: L(
      'Trailer concrete pump assembly at Hebei Pinjin Machinery Manufacturing Co., Ltd.',
      '河北品锦机械制造有限公司拖式混凝土泵装配现场。',
    ),
    keywords: [
      'concrete pump manufacturer China',
      'machinery assembly factory',
      'construction machinery supplier',
    ],
    geoFocus: 'assembly',
  },
  {
    id: 'equipment-assembly',
    image: '/images/factory/pinjin-equipment-assembly-line.webp',
    width: FACTORY_IMAGE_WIDTH,
    height: FACTORY_IMAGE_HEIGHT,
    title: L('Precision Equipment Assembly', '精密设备装配'),
    description: L(
      'Professional assembly and testing processes ensure stable equipment performance.',
      '专业装配与检测流程，保障设备运行稳定。',
    ),
    alt: L(
      'Pinjin Machinery precision equipment assembly workshop for construction machinery manufacturing',
      '品锦机械工程设备精密装配车间',
    ),
    schemaName: L('Pinjin Machinery Assembly Workshop', '品锦机械装配车间'),
    schemaDescription: L(
      'Equipment assembly workshop of Hebei Pinjin Machinery Manufacturing Co., Ltd.',
      '河北品锦机械制造有限公司设备装配车间。',
    ),
    keywords: [
      'machinery assembly factory',
      'industrial equipment production',
      'OEM machinery manufacturer',
    ],
    geoFocus: 'assembly',
  },
  {
    id: 'finished-products',
    image: '/images/factory/pinjin-finished-machinery-products.webp',
    width: FACTORY_IMAGE_WIDTH,
    height: FACTORY_IMAGE_HEIGHT,
    title: L('Finished Equipment Inventory', '成品设备待发'),
    description: L(
      'Reliable production capacity supporting customized industrial equipment orders.',
      '稳定的生产能力，支持目录范围内的工业设备定制订单。',
    ),
    alt: L(
      'Finished construction machinery products ready for shipment',
      '待发运的工程机械成品',
    ),
    schemaName: L('Pinjin Finished Machinery Products', '品锦机械成品设备'),
    schemaDescription: L(
      'Finished construction machinery ready for packing at Hebei Pinjin Machinery Manufacturing Co., Ltd.',
      '河北品锦机械制造有限公司待包装出厂的工程机械成品。',
    ),
    keywords: [
      'industrial equipment supplier',
      'OEM manufacturing capability',
      'bulk machinery production',
    ],
    geoFocus: 'quality',
  },
  {
    id: 'factory-loading',
    image: '/images/factory/pinjin-construction-machinery-factory-loading.webp',
    width: FACTORY_IMAGE_WIDTH,
    height: FACTORY_IMAGE_HEIGHT,
    title: L('Factory Packing And Loading', '出厂包装与装车'),
    description: L(
      'Finished equipment is packed at the factory in Renze Industrial Park, Xingtai, Hebei.',
      '成品在河北省邢台市任泽工业园区工厂完成包装与装车。',
    ),
    alt: L(
      'Construction machinery loaded for dispatch at Pinjin Machinery factory in Xingtai Hebei',
      '河北邢台品锦机械工厂装车待发的工程设备',
    ),
    schemaName: L('Pinjin Factory Loading', '品锦工厂装车'),
    schemaDescription: L(
      'Factory packing and loading at Hebei Pinjin Machinery Manufacturing Co., Ltd.',
      '河北品锦机械制造有限公司出厂包装与装车。',
    ),
    keywords: [
      'construction machinery manufacturer factory',
      'industrial equipment supplier',
      'factory packing construction equipment',
    ],
    geoFocus: 'quality',
  },
  {
    id: 'factory-dispatch',
    image: '/images/factory/pinjin-diesel-machinery-factory-dispatch.webp',
    width: FACTORY_IMAGE_WIDTH,
    height: FACTORY_IMAGE_HEIGHT,
    title: L('Equipment Dispatch From Factory', '设备出厂发运'),
    description: L(
      'Source manufacturing covers production through factory packing before delivery to the buyer.',
      '源头制造覆盖生产至出厂包装，再交付采购方。',
    ),
    alt: L(
      'Diesel construction equipment dispatched from Pinjin Machinery manufacturing factory',
      '品锦机械制造工厂发出的柴油工程设备',
    ),
    schemaName: L('Pinjin Factory Dispatch', '品锦设备出厂'),
    schemaDescription: L(
      'Equipment dispatch from Hebei Pinjin Machinery Manufacturing Co., Ltd. in Xingtai, Hebei.',
      '河北品锦机械制造有限公司位于邢台的设备出厂发运。',
    ),
    keywords: [
      'industrial equipment supplier',
      'construction machinery manufacturer factory',
      'OEM manufacturing capability',
    ],
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
