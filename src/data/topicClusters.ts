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
        href: '/blog/how-to-choose-a-concrete-pump',
        en: 'How to choose a concrete pump for construction projects',
        zh: '如何为工程项目选择混凝土泵',
      },
      {
        href: '/blog/how-concrete-pumps-work',
        en: 'Concrete pump working principle',
        zh: '混凝土泵工作原理',
      },
      {
        href: '/blog/concrete-pump-maintenance-guide',
        en: 'Concrete pump maintenance guide',
        zh: '混凝土泵维护指南',
      },
      {
        href: '/blog/trailer-pump-vs-truck-mounted-concrete-pump',
        en: 'Truck mounted concrete pump vs trailer pump',
        zh: '车载泵与拖式混凝土泵对比',
      },
      {
        href: '/blog/concrete-mixing-and-pumping-for-construction-projects',
        en: 'Concrete mixing plant capacity and pumping',
        zh: '搅拌站产能与混凝土泵送',
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
        href: '/blog/shotcrete-machine-application-guide',
        en: 'Shotcrete machine application',
        zh: '喷浆机应用',
      },
      {
        href: '/blog/dry-mix-vs-wet-mix-spraying-machine',
        en: 'Dry mix vs wet mix spraying machine',
        zh: '干喷与湿喷喷涂机对比',
      },
      {
        href: '/blog/tunnel-concrete-spraying-solution',
        en: 'Mining tunnel concrete spraying solution',
        zh: '矿山巷道混凝土喷浆方案',
      },
      {
        href: '/blog/mortar-spraying-machine-buying-guide',
        en: 'Mortar spraying machine buying guide',
        zh: '砂浆喷涂机采购指南',
      },
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
        href: '/blog/how-we-manufacture-construction-equipment',
        en: 'How we manufacture construction equipment',
        zh: '工程设备如何制造',
      },
      {
        href: '/blog/oem-concrete-machinery-manufacturing-process',
        en: 'OEM machinery customization process',
        zh: 'OEM 机械定制流程',
      },
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
        href: '/blog/xingjiawan-concrete-machinery-manufacturing',
        en: 'Xingjiawan concrete machinery manufacturing base',
        zh: '邢家湾混凝土机械制造基地',
      },
      {
        href: '/blog/why-choose-a-chinese-concrete-machinery-manufacturer',
        en: 'Why choose a Chinese concrete machinery manufacturer',
        zh: '为什么选择中国混凝土机械厂家',
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
    href: '/blog/why-choose-a-chinese-concrete-machinery-manufacturer',
    en: 'Why choose a Chinese concrete machinery manufacturer',
    zh: '为什么选择中国混凝土机械厂家',
  },
  {
    href: '/blog/xingtai-concrete-machinery-factory-inspection-guide',
    en: 'Factory inspection guide for Xingtai concrete machinery',
    zh: '邢台混凝土机械工厂考察指南',
  },
  {
    href: '/blog/oem-concrete-machinery-manufacturing-process',
    en: 'OEM machinery customization process',
    zh: 'OEM 机械定制流程',
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
