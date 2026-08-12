/** 全站 SEO 基础配置（域名、默认 OG、组织信息仅在此定义） */

export const seoConfig = {
  siteUrl: (
    import.meta.env.VITE_SITE_URL || 'https://rtgs2017.github.io/pinjin-website'
  ).replace(/\/$/, ''),
  siteName: 'Hebei Pinjin Machinery',
  companyLegalName: 'Hebei Pinjin Machinery Manufacturing Co., Ltd.',
  defaultTitle: 'Concrete Pump Manufacturer China | Hebei Pinjin Machinery',
  defaultDescription:
    'Concrete pump manufacturer and supplier in China. Hebei Pinjin Machinery builds concrete pumps, mortar spraying machines and plaster spraying machines in Xingtai, Hebei.',
  defaultOgImage: '/images/hero/hero-main-hebei-pinjin-machinery-factory.webp',
  twitterCard: 'summary_large_image' as const,
  organization: {
    name: 'Hebei Pinjin Machinery Manufacturing Co., Ltd.',
    alternateName: '河北品锦机械制造有限公司',
    description:
      'Professional source manufacturer of delivery pumps. R&D, production and sales of construction machinery such as concrete pumps.',
    address: {
      streetAddress: 'Renze Industrial Park',
      addressLocality: 'Xingtai',
      addressRegion: 'Hebei',
      addressCountry: 'CN',
    },
    logoPath: '/images/brand/logo.svg',
  },
} as const;

export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${seoConfig.siteUrl}${normalized}`;
}
