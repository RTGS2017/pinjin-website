/** 全站统一结构配置（文案见 src/i18n/messages.ts，勿在此重复定义文案） */

export const siteConfig = {
  brandName: 'PINJIN',
  brandNameCn: '品锦',
  layout: {
    maxWidthClass: 'max-w-site',
    sectionYClass: 'section-y',
  },
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || '1912829892@qq.com',
  contactPhone: import.meta.env.VITE_CONTACT_PHONE || '19912003025',
} as const;

export const navItems = [
  { key: 'home' as const, href: '/' },
  { key: 'products' as const, href: '/products' },
  { key: 'selectionGuide' as const, href: '/product-selection-guide' },
  { key: 'about' as const, href: '/about' },
  { key: 'applications' as const, href: '/applications' },
  { key: 'faq' as const, href: '/faq' },
  { key: 'contact' as const, href: '/contact' },
];

export const performanceValues = ['600 m', '300 m', '40–75 m³/h', '6 cm'] as const;

export const productCategoryIds = [
  'concrete-pump',
  'spraying-machine',
  'material-handling',
  'rebar-equipment',
] as const;

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

export function getMailtoHref(subject?: string): string {
  const email = siteConfig.contactEmail;
  if (subject) {
    return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  }
  return `mailto:${email}`;
}

export function getTelHref(): string {
  return `tel:${siteConfig.contactPhone}`;
}
