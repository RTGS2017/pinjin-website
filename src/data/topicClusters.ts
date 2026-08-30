/**
 * 关键词集群：锚文本必须含检索词，禁止 click here / learn more。
 */
import {
  getCategoryPath,
  getProductBySlug,
  type ProductCategory,
} from '@/data/products';

export interface TopicLink {
  href: string;
  en: string;
  zh: string;
}

export interface TopicCluster {
  relatedCategories: TopicLink[];
  relatedArticles: TopicLink[];
  relatedSolutions: TopicLink[];
}

const hubAnchor: Record<ProductCategory, Omit<TopicLink, 'href'>> = {
  'electric-concrete-pump': {
    en: 'Electric concrete pump manufacturer China',
    zh: '中国电动混凝土泵厂家',
  },
  'diesel-concrete-pump': {
    en: 'Diesel concrete pump manufacturer China',
    zh: '中国柴油混凝土泵厂家',
  },
  'mixer-pump': {
    en: 'Concrete mixer pump manufacturer China',
    zh: '中国搅拌泵厂家',
  },
};

const oemLink: TopicLink = {
  href: '/products/custom-machinery',
  en: 'OEM custom machinery manufacturer',
  zh: 'OEM 定制机械厂家',
};

const factoryLink: TopicLink = {
  href: '/factory',
  en: 'Xingtai construction machinery factory',
  zh: '邢台工程机械工厂',
};

export const categoryClusters: Record<ProductCategory, TopicCluster> = {
  'electric-concrete-pump': {
    relatedCategories: [
      {
        href: '/products/diesel-concrete-pumps',
        en: 'Diesel concrete pump manufacturer China',
        zh: '中国柴油混凝土泵厂家',
      },
      oemLink,
    ],
    relatedArticles: [
      {
        href: '/blog/what-is-a-concrete-pump',
        en: 'What is a concrete pump and how it works',
        zh: '什么是混凝土泵及工作原理',
      },
      {
        href: '/blog/concrete-pump-types',
        en: 'Trailer pump vs boom pump selection',
        zh: '拖式泵与臂架泵选型',
      },
      {
        href: '/blog/concrete-pump-maintenance-guide',
        en: 'Concrete pump maintenance guide',
        zh: '混凝土泵维护指南',
      },
      {
        href: '/product-selection-guide',
        en: 'Concrete pump product selection guide',
        zh: '混凝土泵产品选型指南',
      },
    ],
    relatedSolutions: [
      { href: '/solutions/construction', en: 'Building construction pumping', zh: '建筑施工泵送应用' },
      { href: '/solutions/infrastructure', en: 'Infrastructure concrete pumping', zh: '基建混凝土泵送' },
      factoryLink,
    ],
  },
  'diesel-concrete-pump': {
    relatedCategories: [
      {
        href: '/products/electric-concrete-pumps',
        en: 'Electric concrete pump manufacturer China',
        zh: '中国电动混凝土泵厂家',
      },
      oemLink,
    ],
    relatedArticles: [
      {
        href: '/blog/what-is-a-concrete-pump',
        en: 'What is a concrete pump and how it works',
        zh: '什么是混凝土泵及工作原理',
      },
      {
        href: '/blog/concrete-pump-types',
        en: 'Trailer pump vs boom pump selection',
        zh: '拖式泵与臂架泵选型',
      },
      {
        href: '/product-selection-guide',
        en: 'Diesel concrete pump selection guide',
        zh: '柴油混凝土泵选型指南',
      },
    ],
    relatedSolutions: [
      { href: '/solutions/construction', en: 'Building construction pumping', zh: '建筑施工泵送应用' },
      { href: '/solutions/infrastructure', en: 'Infrastructure concrete pumping', zh: '基建混凝土泵送' },
      factoryLink,
    ],
  },
  'mixer-pump': {
    relatedCategories: [
      {
        href: '/products/electric-concrete-pumps',
        en: 'Electric concrete pump manufacturer China',
        zh: '中国电动混凝土泵厂家',
      },
      oemLink,
    ],
    relatedArticles: [
      {
        href: '/blog/what-is-a-concrete-pump',
        en: 'What is a concrete pump and how it works',
        zh: '什么是混凝土泵及工作原理',
      },
      {
        href: '/blog/choose-construction-equipment-suppliers-from-china',
        en: 'How to choose construction equipment suppliers from China',
        zh: '如何选择中国工程设备供应商',
      },
      { href: '/factory', en: 'Xingtai construction machinery factory', zh: '邢台工程机械工厂' },
    ],
    relatedSolutions: [
      { href: '/solutions/construction', en: 'Building construction pumping', zh: '建筑施工泵送应用' },
      factoryLink,
    ],
  },
};

export const trustClusterArticles: TopicLink[] = [
  {
    href: '/blog/choose-construction-equipment-suppliers-from-china',
    en: 'How to choose construction equipment suppliers from China',
    zh: '如何选择中国工程设备供应商',
  },
  {
    href: '/factory',
    en: 'Xingtai construction machinery factory',
    zh: '邢台工程机械工厂',
  },
  {
    href: '/products/custom-machinery',
    en: 'OEM custom machinery manufacturer',
    zh: 'OEM 定制机械厂家',
  },
];

export function clusterForProduct(
  category: ProductCategory,
  extra?: Partial<TopicCluster>,
): TopicCluster {
  const base = categoryClusters[category];
  const selfHub: TopicLink = {
    href: getCategoryPath(category),
    ...hubAnchor[category],
  };
  return {
    relatedCategories: [selfHub, ...base.relatedCategories],
    relatedArticles: extra?.relatedArticles ?? base.relatedArticles,
    relatedSolutions: [
      ...base.relatedSolutions,
      { href: '/contact', en: 'Contact concrete machinery manufacturer', zh: '联系混凝土机械厂家' },
    ],
  };
}

export function clusterForBlog(relatedProductSlugs: string[]): TopicCluster {
  const product = relatedProductSlugs
    .map((slug) => getProductBySlug(slug))
    .find((item): item is NonNullable<typeof item> => Boolean(item));
  return clusterForProduct(product?.category ?? 'electric-concrete-pump');
}

export function clusterForCustomMachinery(): TopicCluster {
  return {
    relatedCategories: [
      {
        href: '/products/electric-concrete-pumps',
        en: 'Electric concrete pump manufacturer China',
        zh: '中国电动混凝土泵厂家',
      },
      {
        href: '/products/diesel-concrete-pumps',
        en: 'Diesel concrete pump manufacturer China',
        zh: '中国柴油混凝土泵厂家',
      },
    ],
    relatedArticles: trustClusterArticles,
    relatedSolutions: [
      factoryLink,
      { href: '/contact', en: 'Contact OEM engineering team', zh: '联系 OEM 工程团队' },
    ],
  };
}

export function clusterForFactory(): TopicCluster {
  return {
    relatedCategories: [
      {
        href: '/products/electric-concrete-pumps',
        en: 'Electric concrete pump manufacturer China',
        zh: '中国电动混凝土泵厂家',
      },
      oemLink,
    ],
    relatedArticles: trustClusterArticles,
    relatedSolutions: [
      { href: '/solutions/construction', en: 'Building construction pumping', zh: '建筑施工泵送应用' },
      { href: '/contact', en: 'Contact Xingtai manufacturer', zh: '联系邢台厂家' },
    ],
  };
}
