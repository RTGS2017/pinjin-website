import { factorySlides } from '@/data/factory';
import type { LocalizedText } from '@/i18n/types';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

export const HERO_GALLERY_AUTOPLAY_MS = 5000;
export const HERO_GALLERY_FADE_MS = 450;

/**
 * 工厂专用 9 张序列（路径复用 factory.ts）。
 * 首页 Hero 已改用 src/data/gallery.ts。
 */
const HERO_COPY: Record<
  string,
  { title: LocalizedText; thumbLabel: LocalizedText }
> = {
  'factory-building': {
    title: L('Modern Manufacturing Facility', '现代化制造工厂'),
    thumbLabel: L('Factory', '厂房'),
  },
  'production-workshop': {
    title: L('Professional Production Workshop', '专业生产车间'),
    thumbLabel: L('Workshop', '车间'),
  },
  'workshop-crane': {
    title: L('Workshop With Overhead Lifting', '配备行车的生产车间'),
    thumbLabel: L('Crane', '行车'),
  },
  'concrete-manufacturing': {
    title: L('Concrete Machinery Manufacturing', '混凝土机械制造'),
    thumbLabel: L('Manufacturing', '制造'),
  },
  'trailer-assembly': {
    title: L('Concrete Pump Assembly', '混凝土泵装配'),
    thumbLabel: L('Pump', '泵送装配'),
  },
  'equipment-assembly': {
    title: L('Precision Equipment Assembly', '精密设备装配'),
    thumbLabel: L('Assembly', '装配'),
  },
  'finished-products': {
    title: L('Factory Direct Manufacturing', '工厂直供制造'),
    thumbLabel: L('Products', '成品'),
  },
  'factory-loading': {
    title: L('Factory Packing And Loading', '出厂包装与装车'),
    thumbLabel: L('Loading', '装车'),
  },
  'factory-dispatch': {
    title: L('Equipment Dispatch From Factory', '设备出厂发运'),
    thumbLabel: L('Dispatch', '发运'),
  },
};

export interface FactoryGalleryItem {
  id: string;
  image: string;
  title: LocalizedText;
  description: LocalizedText;
  alt: LocalizedText;
  keywords: string[];
  thumbLabel: LocalizedText;
  width: number;
  height: number;
}

export const factoryGallery: FactoryGalleryItem[] = factorySlides.map((slide) => {
  const copy = HERO_COPY[slide.id];
  if (!copy) {
    throw new Error(`Missing hero gallery copy for factory slide: ${slide.id}`);
  }
  return {
    id: slide.id,
    image: slide.image,
    title: copy.title,
    description: slide.description,
    alt: slide.alt,
    keywords: [...slide.keywords],
    thumbLabel: copy.thumbLabel,
    width: slide.width,
    height: slide.height,
  };
});

export function getHeroGalleryItem(index: number): FactoryGalleryItem {
  const total = factoryGallery.length;
  return factoryGallery[((index % total) + total) % total];
}
