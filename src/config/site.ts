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
  /** Formspree 表单地址；未配置时询盘回退 mailto */
  formspreeEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT || '',
} as const;

export const inquiryHash = 'inquiry';
export const contactInquiryPath = '/contact#inquiry';

export const productCategoryIds = [
  'concrete-pump',
  'spraying-machine',
  'material-handling',
  'rebar-equipment',
] as const;

export const performanceValues = ['600 m', '300 m', '40–75 m³/h', '6 cm'] as const;

/** Featured product slugs for homepage (order matters) */
export const featuredProductSlugs = [
  'hbt80-18-140-concrete-pump',
  'll60-75-concrete-pump',
  'hbtt55-50-concrete-pump',
  'hbt45-40-concrete-pump',
  'hbt30-37-concrete-pump',
  'll28-32-concrete-pump',
] as const;

export const applicationItems = [
  {
    id: 'construction',
    key: 'construction' as const,
    image: '/images/applications/construction-site-application.webp',
  },
  {
    id: 'concrete-delivery',
    key: 'concrete' as const,
    image: '/images/applications/concrete-delivery-application.webp',
  },
  {
    id: 'mortar-spraying',
    key: 'mortar' as const,
    image: '/images/applications/mortar-spraying-application.webp',
  },
  {
    id: 'plaster-spraying',
    key: 'plaster' as const,
    image: '/images/applications/plaster-spraying-application.webp',
  },
] as const;

export function getMailtoHref(subject?: string, body?: string): string {
  const email = siteConfig.contactEmail;
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return query ? `mailto:${email}?${query}` : `mailto:${email}`;
}

export function buildInquiryMailtoBody(fields: {
  name: string;
  company: string;
  country: string;
  email: string;
  product: string;
  quantity: string;
  message: string;
}): string {
  return [
    `Name: ${fields.name}`,
    `Company: ${fields.company}`,
    `Country: ${fields.country}`,
    `Email: ${fields.email}`,
    `Product: ${fields.product || '-'}`,
    `Quantity: ${fields.quantity || '-'}`,
    '',
    'Message:',
    fields.message,
  ].join('\n');
}

/** 当前页是否已内嵌询盘表单（悬浮按钮用 hash，其它页去联系页） */
export function pageHasInquiryForm(pagePath: string): boolean {
  if (pagePath === '/' || pagePath === '/contact') return true;
  if (pagePath.startsWith('/blog/') && pagePath !== '/blog') return true;
  return (
    pagePath.startsWith('/products/') && !pagePath.includes('/category/')
  );
}

export function getTelHref(): string {
  return `tel:${siteConfig.contactPhone}`;
}
