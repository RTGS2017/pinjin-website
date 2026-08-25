import type { LocalizedText } from '@/i18n/types';
import { getFactorySlide } from '@/data/factory';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

function factoryImage(id: string) {
  const slide = getFactorySlide(id);
  if (!slide) {
    throw new Error(`Missing factory slide for gallery: ${id}`);
  }
  return slide;
}

export type GalleryCategory = 'product' | 'factory' | 'hero';

export interface GalleryItem {
  id: string;
  image: string;
  title: LocalizedText;
  description: LocalizedText;
  category: GalleryCategory;
  alt: LocalizedText;
  seoKeywords: string[];
  thumbLabel: LocalizedText;
  width: number;
  height: number;
}

/** 轮播时长见 src/config/site.ts 的 carouselConfig */

const workshop = factoryImage('production-workshop');
const crane = factoryImage('workshop-crane');
const finished = factoryImage('finished-products');
const building = factoryImage('factory-building');
const assembly = factoryImage('equipment-assembly');

/**
 * 首页 Hero 背景序列：工厂实拍与设备实拍交错，自动播放，无缩略图导航。
 * 图片路径复用 public/images 已有 WebP，不另造文件。
 */
export const heroGallery: GalleryItem[] = [
  {
    id: 'hero-concrete-pump',
    image: '/images/products/hbt30-37-concrete-pump/working.webp',
    title: L('Concrete Pump Product Showcase', '混凝土泵产品展示'),
    description: L(
      'Hebei Pinjin concrete pump working on a construction site.',
      '品锦混凝土泵在建筑工地作业。',
    ),
    category: 'product',
    alt: L(
      'Pinjin Machinery concrete pump at a China construction site — Xingtai concrete machinery manufacturer and China concrete pump factory',
      '品锦机械混凝土泵在中国工地作业 — 邢台混凝土机械制造商、中国混凝土泵工厂',
    ),
    seoKeywords: [
      'Xingtai concrete machinery manufacturer',
      'China concrete pump factory',
      'custom concrete equipment manufacturer',
    ],
    thumbLabel: L('Pump', '泵送'),
    width: 1600,
    height: 1200,
  },
  {
    id: 'hero-factory-production',
    image: workshop.image,
    title: L('Factory Production Capability', '工厂生产能力'),
    description: workshop.description,
    category: 'factory',
    alt: L(
      'Pinjin Machinery concrete pump manufacturing factory in Xingtai Hebei China',
      '品锦机械位于中国河北邢台的混凝土泵制造工厂',
    ),
    seoKeywords: [
      'Xingtai concrete machinery manufacturer',
      'China concrete pump factory',
      'custom concrete equipment manufacturer',
    ],
    thumbLabel: L('Factory', '工厂'),
    width: workshop.width,
    height: workshop.height,
  },
  {
    id: 'hero-spraying-equipment',
    image: '/images/applications/pinjin-mortar-spraying-machine-building-interior.webp',
    title: L('Concrete Spraying Equipment', '混凝土喷涂设备'),
    description: L(
      'Mortar spraying equipment for building interior finishing.',
      '用于建筑室内饰面的砂浆喷涂设备。',
    ),
    category: 'product',
    alt: L(
      'Pinjin Machinery spraying equipment for construction finishing — custom concrete equipment manufacturer in Xingtai China',
      '品锦机械喷涂设备用于建筑饰面 — 邢台定制混凝土设备制造商',
    ),
    seoKeywords: [
      'Xingtai concrete machinery manufacturer',
      'custom concrete equipment manufacturer',
    ],
    thumbLabel: L('Spraying', '喷涂'),
    width: 1600,
    height: 1200,
  },
  {
    id: 'hero-workshop',
    image: crane.image,
    title: L('Manufacturing Workshop', '制造车间'),
    description: crane.description,
    category: 'factory',
    alt: L(
      'Pinjin Machinery manufacturing workshop in Xingtai Hebei China — China concrete pump factory',
      '品锦机械邢台制造车间 — 中国混凝土泵工厂',
    ),
    seoKeywords: crane.keywords,
    thumbLabel: L('Workshop', '车间'),
    width: crane.width,
    height: crane.height,
  },
  {
    id: 'hero-finished',
    image: finished.image,
    title: L('Finished Equipment', '成品设备'),
    description: finished.description,
    category: 'factory',
    alt: L(
      'Finished construction machinery at Pinjin Machinery factory in Xingtai Hebei China',
      '品锦机械邢台工厂的工程机械成品',
    ),
    seoKeywords: finished.keywords,
    thumbLabel: L('Finished', '成品'),
    width: finished.width,
    height: finished.height,
  },
];

export const factoryShowcase = [
  {
    id: 'workshop',
    image: workshop.image,
    alt: L(
      'Pinjin Machinery production workshop in Xingtai Hebei China — Xingtai concrete machinery manufacturer',
      '品锦机械邢台生产车间 — 邢台混凝土机械制造商',
    ),
    label: L('Workshop', '车间'),
    width: workshop.width,
    height: workshop.height,
  },
  {
    id: 'assembly',
    image: assembly.image,
    alt: L(
      'Pinjin Machinery assembly line in Xingtai China concrete pump factory',
      '品锦机械邢台装配现场 — 中国混凝土泵工厂',
    ),
    label: L('Assembly', '装配'),
    width: assembly.width,
    height: assembly.height,
  },
  {
    id: 'finished',
    image: finished.image,
    alt: L(
      'Finished construction equipment at Pinjin Machinery factory in Xingtai Hebei China',
      '品锦机械邢台工厂成品设备',
    ),
    label: L('Finished equipment', '成品设备'),
    width: finished.width,
    height: finished.height,
  },
  {
    id: 'exterior',
    image: building.image,
    alt: L(
      'Pinjin Machinery factory exterior in Xingtai Hebei China — custom concrete equipment manufacturer',
      '品锦机械邢台厂房外观 — 定制混凝土设备制造商',
    ),
    label: L('Factory exterior', '厂房外观'),
    width: building.width,
    height: building.height,
  },
] as const;

/** 首页知识中心三张卡片（与 knowledgeArticles slug 一致）。 */
export const homeKnowledgeSlugs = [
  'what-is-a-concrete-pump',
  'concrete-pump-types',
  'shotcrete-machine-working-principle',
] as const;
