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
const finished = factoryImage('finished-products');
const building = factoryImage('factory-building');
const assembly = factoryImage('equipment-assembly');

export const HERO_IMAGE_PATH =
  '/images/hero/pinjin-machinery-factory-xingtai-china.webp';
export const HERO_IMAGE_WIDTH = 2560;
export const HERO_IMAGE_HEIGHT = 1086;

/**
 * 首页 Hero 主视图：只展示工厂外观一张，不自动轮播。
 */
export const heroGallery: GalleryItem[] = [
  {
    id: 'hero-factory-exterior',
    image: HERO_IMAGE_PATH,
    title: L(
      'Pinjin Machinery Factory in Xingtai China',
      '品锦机械邢台工厂',
    ),
    description: L(
      'Hebei Pinjin Machinery factory exterior in Xingtai, Hebei, China — a concrete pump manufacturer and construction equipment supplier.',
      '河北品锦机械邢台工厂外观，混凝土泵厂家与工程设备供应商。',
    ),
    category: 'hero',
    alt: L(
      'Hebei Pinjin Machinery factory exterior in Xingtai Hebei China — concrete pump manufacturer and construction equipment supplier',
      '河北品锦机械邢台工厂外观 — 混凝土泵厂家与工程设备供应商',
    ),
    seoKeywords: [
      'concrete pump manufacturer',
      'concrete pump supplier',
      'construction equipment',
      'Xingtai concrete machinery manufacturer',
      'China concrete pump factory',
    ],
    thumbLabel: L('Factory', '工厂'),
    width: HERO_IMAGE_WIDTH,
    height: HERO_IMAGE_HEIGHT,
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
