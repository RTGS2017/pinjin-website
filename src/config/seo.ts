/** 全站 SEO 基础配置（域名、默认 OG、组织信息仅在此定义） */

export const seoConfig = {
  siteUrl: (
    import.meta.env.VITE_SITE_URL || 'https://pinjinpump.com'
  ).replace(/\/$/, ''),
  siteName: 'Hebei Pinjin Machinery',
  companyLegalName: 'Hebei Pinjin Machinery Manufacturing Co., Ltd.',
  defaultTitle: 'Concrete Pump Manufacturer China | Hebei Pinjin Machinery',
  defaultDescription:
    'Concrete pump manufacturer and supplier in China. Hebei Pinjin Machinery builds electric and diesel concrete pumps and mixer pumps in Xingtai, Hebei.',
  defaultOgImage:
    '/images/hero/pinjin-machinery-factory-xingtai-china.webp',
  twitterCard: 'summary_large_image' as const,
  organization: {
    name: 'Hebei Pinjin Machinery Manufacturing Co., Ltd.',
    alternateName: '河北品锦机械制造有限公司',
    description:
      'Concrete machinery manufacturer in China. Hebei Pinjin Machinery builds electric and diesel concrete pumps and mixer pumps in Xingtai, Hebei, in the Xingjiawan concrete machinery manufacturing area.',
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

/** 页面 Title / Description 模板（产品详情优先用 products.ts 的 seo 字段） */
export const seoTemplates = {
  productTitle: (name: string) => `${name} Manufacturer China | Pinjin Machinery`,
  productDescription: (product: string) =>
    `Professional ${product} manufacturer in China. Factory direct supply with customization capability from Hebei Pinjin Machinery in Xingtai.`,
  categoryTitle: (label: string) => `${label} Manufacturer China | Pinjin Machinery`,
  blogTitle: (topic: string) =>
    `${topic} | Construction Machinery Knowledge | Pinjin`,
  factoryTitle:
    'Xingtai Construction Machinery Factory | Pinjin Machinery',
  factoryDescription:
    'Hebei Pinjin Machinery factory in Xingtai, Hebei, China — concrete machinery manufacturer in the Xingjiawan manufacturing area. Factory address: Renze Industrial Park.',
} as const;
