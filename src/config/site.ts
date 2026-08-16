/** 全站统一结构配置（文案见 src/i18n/messages.ts，勿在此重复定义文案） */

/**
 * 为 public 静态资源 / 裸 `<a href>` 加上 Vite base（GitHub 项目站为 /pinjin-website/）。
 * React Router 的 `to` 不要用此函数（basename 已处理）。
 */
export function withBase(path: string): string {
  if (!path) return import.meta.env.BASE_URL || '/';
  if (/^(https?:|mailto:|tel:|data:)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL || '/';
  if (base !== '/' && (path === base.slice(0, -1) || path.startsWith(base))) {
    return path;
  }
  const normalized = path.startsWith('/') ? path.slice(1) : path;
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
  'concrete-pump',
  'spraying-machine',
  'material-handling',
  'rebar-equipment',
] as const;

export const performanceValues = ['600 m', '300 m', '40–75 m³/h', '6 cm'] as const;

/** 首页 Hero / 精选产品 / 应用案例共用的工业轮播参数 */
export const carouselConfig = {
  autoplayMs: 5000,
  transitionMs: 700,
  swipeThreshold: 40,
} as const;

/** Featured product slugs for homepage showcase (order matters, 5 models) */
export const featuredProductSlugs = [
  'hbt80-18-140-concrete-pump',
  'diesel-screw-mortar-spraying-machine',
  'forklift-loader-bucket-type',
  'cnc-steel-bar-bending-machine',
  'hbt30-37-concrete-pump',
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
