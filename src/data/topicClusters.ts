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
  'concrete-pump': {
    en: 'Concrete pump manufacturer China',
    zh: '中国混凝土泵厂家',
  },
  'spraying-machine': {
    en: 'Concrete spraying equipment manufacturer',
    zh: '混凝土喷涂设备厂家',
  },
  'material-handling': {
    en: 'Material handling equipment from Xingtai factory',
    zh: '邢台工厂物料搬运设备',
  },
  'rebar-equipment': {
    en: 'Rebar processing equipment manufacturer',
    zh: '钢筋加工设备厂家',
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
  'concrete-pump': {
    relatedCategories: [
      {
        href: '/products/spraying-machines',
        en: 'Concrete spraying equipment manufacturer',
        zh: '混凝土喷涂设备厂家',
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
  'spraying-machine': {
    relatedCategories: [
      {
        href: '/products/concrete-pumps',
        en: 'Concrete pump manufacturer China',
        zh: '中国混凝土泵厂家',
      },
      oemLink,
    ],
    relatedArticles: [
      {
        href: '/blog/shotcrete-machine-working-principle',
        en: 'Shotcrete machine working principle',
        zh: '喷浆机工作原理',
      },
      {
        href: '/product-selection-guide',
        en: 'Spraying machine product selection guide',
        zh: '喷涂设备产品选型指南',
      },
      { href: '/faq', en: 'Construction machinery FAQ', zh: '工程机械常见问题' },
    ],
    relatedSolutions: [
      { href: '/solutions/spraying', en: 'Spraying application cases', zh: '喷涂应用场景' },
      factoryLink,
    ],
  },
  'material-handling': {
    relatedCategories: [
      {
        href: '/products/concrete-pumps',
        en: 'Concrete pump manufacturer China',
        zh: '中国混凝土泵厂家',
      },
      oemLink,
    ],
    relatedArticles: [
      {
        href: '/factory',
        en: 'Xingtai construction machinery factory',
        zh: '邢台工程机械工厂',
      },
      oemLink,
    ],
    relatedSolutions: [
      {
        href: '/solutions/industrial-projects',
        en: 'Industrial material handling applications',
        zh: '工业物料搬运应用',
      },
      factoryLink,
    ],
  },
  'rebar-equipment': {
    relatedCategories: [
      {
        href: '/products/concrete-pumps',
        en: 'Concrete pump manufacturer China',
        zh: '中国混凝土泵厂家',
      },
    ],
    relatedArticles: [
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
        href: '/about',
        en: 'Hebei Pinjin Machinery company profile',
        zh: '河北品锦机械公司介绍',
      },
    ],
    relatedSolutions: [
      { href: '/solutions/construction', en: 'Building construction applications', zh: '建筑施工应用' },
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
  return clusterForProduct(product?.category ?? 'concrete-pump');
}

export function clusterForCustomMachinery(): TopicCluster {
  return {
    relatedCategories: [
      {
        href: '/products/concrete-pumps',
        en: 'Concrete pump manufacturer China',
        zh: '中国混凝土泵厂家',
      },
      {
        href: '/products/spraying-machines',
        en: 'Concrete spraying equipment manufacturer',
        zh: '混凝土喷涂设备厂家',
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
        href: '/products/concrete-pumps',
        en: 'Concrete pump manufacturer China',
        zh: '中国混凝土泵厂家',
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
