/** 全站统一结构配置（文案见 src/i18n/messages.ts，勿在此重复定义文案） */

import { withAssetRev } from './assetRev';

/**
 * 为 public 静态资源 / 裸 `<a href>` 加上 Vite base（正式站为 /）。
 * React Router 的 `to` 不要用此函数（basename 已处理）。
 */
export function withBase(path: string): string {
  if (!path) return import.meta.env.BASE_URL || '/';
  if (/^(https?:|mailto:|tel:|data:)/i.test(path)) return path;
  const versioned = withAssetRev(path);
  const base = import.meta.env.BASE_URL || '/';
  if (base !== '/' && (versioned === base.slice(0, -1) || versioned.startsWith(base))) {
    return versioned;
  }
  const normalized = versioned.startsWith('/') ? versioned.slice(1) : versioned;
  return `${base}${normalized}`;
}

export const siteConfig = {
  brandName: 'PINJIN',
  brandNameCn: '品锦',
  layout: {
    maxWidthClass: 'max-w-site',
    sectionYClass: 'section-y',
  },
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || '1912829892@qq.com',
  contactPhone: import.meta.env.VITE_CONTACT_PHONE || '19912003025',
  /**
   * WhatsApp 国际号码（纯数字）。未单独配置时使用联系电话并补 86 前缀。
   * 不另造号码；与 VITE_CONTACT_PHONE 同源。
   */
  whatsappNumber:
    import.meta.env.VITE_WHATSAPP_NUMBER ||
    import.meta.env.VITE_CONTACT_PHONE ||
    '19912003025',
} as const;

export const contactInquiryPath = '/contact';

export const productCategoryIds = [
  'electric-concrete-pump',
  'diesel-concrete-pump',
  'mixer-pump',
] as const;

export const performanceValues = ['900 m', '600 m', '100 m³/h', '6 cm'] as const;

/** 首页 Hero / 精选产品 / 应用案例共用的工业轮播参数 */
export const carouselConfig = {
  autoplayMs: 5000,
  transitionMs: 700,
  swipeThreshold: 40,
} as const;

/** Featured product slugs for homepage showcase (order matters, 5 models) */
export const featuredProductSlugs = [
  'electric-40-concrete-pump',
  'diesel-50-concrete-pump',
  'electric-80-concrete-pump',
  'integrated-mixer-pump',
  'electric-15-concrete-pump',
] as const;

export function getMailtoHref(subject?: string, body?: string): string {
  const email = siteConfig.contactEmail;
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return query ? `mailto:${email}?${query}` : `mailto:${email}`;
}

export function getTelHref(): string {
  return `tel:${siteConfig.contactPhone}`;
}

function whatsappDigits(): string {
  const raw = String(siteConfig.whatsappNumber).replace(/\D/g, '');
  if (!raw) return '';
  return raw.startsWith('86') ? raw : `86${raw}`;
}

export function getWhatsAppHref(text?: string): string {
  const digits = whatsappDigits();
  const base = `https://wa.me/${digits}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}
