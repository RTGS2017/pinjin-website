import type { LocalizedText } from '@/i18n/types';
import { factorySlides } from '@/data/factory';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

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

/** 首页工厂能力：展示 public/images/factory 里全部现存实拍 */
export const factoryShowcase = factorySlides.map((slide) => ({
  id: slide.id,
  image: slide.image,
  alt: slide.alt,
  label: slide.title,
  width: slide.width,
  height: slide.height,
}));

/** 首页知识中心三张卡片（与 knowledgeArticles slug 一致）。 */
export const homeKnowledgeSlugs = [
  'what-is-a-concrete-pump',
  'concrete-pump-types',
  'shotcrete-machine-working-principle',
] as const;
