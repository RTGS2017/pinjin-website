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

export const categoryClusters: Record<ProductCategory, TopicCluster> = {
  'concrete-pump': {
    relatedCategories: [
      {
        href: '/products/spraying-machines',
        en: 'Concrete spraying equipment',
        zh: '混凝土喷涂设备',
      },
    ],
    relatedArticles: [
      {
        href: '/blog/how-concrete-pumps-work',
        en: 'How concrete pumps work',
        zh: '混凝土泵如何工作',
      },
      {
        href: '/blog/how-to-choose-a-reliable-concrete-pump-manufacturer-in-china',
        en: 'How to choose a concrete pump manufacturer in China',
        zh: '如何选择中国混凝土泵厂家',
      },
      {
        href: '/blog/concrete-pump-maintenance-guide',
        en: 'Concrete pump maintenance guide',
        zh: '混凝土泵维护指南',
      },
      {
        href: '/blog/xingjiawan-concrete-machinery-manufacturing',
        en: 'Xingjiawan concrete machinery manufacturing base',
        zh: '邢家湾混凝土机械制造基地',
      },
    ],
    relatedSolutions: [
      { href: '/solutions/construction', en: 'Building construction', zh: '建筑施工' },
      { href: '/solutions/infrastructure', en: 'Infrastructure projects', zh: '基建工程' },
      { href: '/factory', en: 'Factory capability', zh: '工厂能力' },
    ],
  },
  'spraying-machine': {
    relatedCategories: [
      {
        href: '/products/concrete-pumps',
        en: 'Concrete pump manufacturer China',
        zh: '中国混凝土泵厂家',
      },
    ],
    relatedArticles: [
      {
        href: '/blog/mortar-spraying-machine-buying-guide',
        en: 'Mortar spraying machine buying guide',
        zh: '砂浆喷涂机采购指南',
      },
      {
        href: '/blog/oem-concrete-machinery-manufacturing-process',
        en: 'OEM manufacturing process',
        zh: 'OEM 制造流程',
      },
    ],
    relatedSolutions: [
      { href: '/solutions/spraying', en: 'Spraying applications', zh: '喷涂应用' },
      { href: '/factory', en: 'Factory capability', zh: '工厂能力' },
    ],
  },
  'material-handling': {
    relatedCategories: [
      {
        href: '/products/concrete-pumps',
        en: 'Concrete pumps',
        zh: '混凝土泵',
      },
    ],
    relatedArticles: [
      {
        href: '/blog/how-we-manufacture-construction-equipment',
        en: 'How we manufacture construction equipment',
        zh: '工程设备如何制造',
      },
    ],
    relatedSolutions: [
      {
        href: '/solutions/industrial-projects',
        en: 'Industrial / site handling',
        zh: '工业与现场搬运',
      },
      { href: '/factory', en: 'Factory capability', zh: '工厂能力' },
    ],
  },
  'rebar-equipment': {
    relatedCategories: [
      {
        href: '/products/concrete-pumps',
        en: 'Concrete pumps',
        zh: '混凝土泵',
      },
    ],
    relatedArticles: [
      {
        href: '/blog/xingjiawan-concrete-machinery-manufacturing',
        en: 'Xingjiawan manufacturing base',
        zh: '邢家湾制造基地',
      },
    ],
    relatedSolutions: [
      { href: '/solutions/construction', en: 'Building construction', zh: '建筑施工' },
      { href: '/factory', en: 'Factory capability', zh: '工厂能力' },
    ],
  },
};

export function clusterForProduct(
  category: ProductCategory,
  extra?: Partial<TopicCluster>,
): TopicCluster {
  const base = categoryClusters[category];
  return {
    relatedCategories: [
      {
        href: getCategoryPath(category),
        en: 'Product category hub',
        zh: '产品分类专题',
      },
      ...base.relatedCategories,
    ],
    relatedArticles: extra?.relatedArticles ?? base.relatedArticles,
    relatedSolutions: [
      ...base.relatedSolutions,
      { href: '/contact', en: 'Contact engineering team', zh: '联系工程团队' },
    ],
  };
}

export function clusterForBlog(relatedProductSlugs: string[]): TopicCluster {
  const product = relatedProductSlugs
    .map((slug) => getProductBySlug(slug))
    .find((item): item is NonNullable<typeof item> => Boolean(item));
  return clusterForProduct(product?.category ?? 'concrete-pump');
}
