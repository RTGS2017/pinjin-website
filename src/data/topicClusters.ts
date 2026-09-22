/**
 * 关键词集群：锚文本必须含检索词，禁止 click here / learn more。
 */
import {
  getCategoryPath,
  getProductBySlug,
  type ProductCategory,
} from '@/data/products';
import { getBlogPost } from '@/data/blog';

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
  'spraying-machine': {
    en: 'Concrete spraying machine manufacturer China',
    zh: '中国混凝土喷涂机厂家',
  },
  'spare-parts': {
    en: 'Concrete pump parts manufacturer China',
    zh: '中国混凝土泵配件厂家',
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
      {
        href: '/products/concrete-pump-parts',
        en: 'Concrete pump parts manufacturer China',
        zh: '中国混凝土泵配件厂家',
      },
      oemLink,
    ],
    relatedArticles: [
      {
        href: '/blog/electric-15-concrete-pump-applications',
        en: 'Electric 15 compact concrete pump applications',
        zh: '电动15型混凝土泵适用工地',
      },
      {
        href: '/blog/electric-20-vs-30-concrete-pump',
        en: 'Electric 20 vs 30 concrete pump comparison',
        zh: '电动20与电动30混凝土泵对比',
      },
      {
        href: '/blog/fine-stone-concrete-pump-aggregate-size',
        en: 'Fine stone concrete pump aggregate size',
        zh: '细石混凝土泵骨料粒径选型',
      },
      {
        href: '/blog/small-concrete-pump-floor-screed-slab',
        en: 'Small concrete pump for floor screed and slab',
        zh: '楼面找平与楼板小型混凝土泵',
      },
      {
        href: '/blog/concrete-pump-daily-maintenance-checklist',
        en: 'Concrete pump daily maintenance checklist',
        zh: '混凝土泵日常保养清单',
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
      {
        href: '/products/concrete-pump-parts',
        en: 'Concrete pump parts manufacturer China',
        zh: '中国混凝土泵配件厂家',
      },
      oemLink,
    ],
    relatedArticles: [
      {
        href: '/blog/diesel-concrete-pump-no-electricity',
        en: 'Diesel concrete pump for sites without electricity',
        zh: '没有电力时如何选柴油混凝土泵',
      },
      {
        href: '/blog/tractor-4100-concrete-pump-rural',
        en: 'Tractor 4100 rural concrete pump',
        zh: '拖拉机带动4100农村混凝土泵',
      },
      {
        href: '/blog/mini-concrete-pump-narrow-space',
        en: 'Compact pumps for narrow construction sites',
        zh: '狭窄工地紧凑型混凝土泵',
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
      {
        href: '/products/concrete-pump-parts',
        en: 'Concrete pump parts manufacturer China',
        zh: '中国混凝土泵配件厂家',
      },
      oemLink,
    ],
    relatedArticles: [
      {
        href: '/blog/mixer-pump-vs-concrete-mixing-plant',
        en: 'Mixer pump vs concrete mixing plant',
        zh: '搅拌泵一体机不是搅拌站',
      },
      {
        href: '/blog/concrete-pump-pipe-dn-selection',
        en: 'Concrete pump pipe DN selection',
        zh: '混凝土泵输送管DN怎么选',
      },
      { href: '/factory', en: 'Xingtai construction machinery factory', zh: '邢台工程机械工厂' },
    ],
    relatedSolutions: [
      { href: '/solutions/construction', en: 'Building construction pumping', zh: '建筑施工泵送应用' },
      factoryLink,
    ],
  },
  'spare-parts': {
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
    relatedArticles: [
      {
        href: '/blog/concrete-pump-pipe-dn-selection',
        en: 'Concrete pump pipe DN selection',
        zh: '混凝土泵输送管DN怎么选',
      },
      {
        href: '/blog/concrete-pump-spare-parts-wear-parts',
        en: 'Concrete pump spare parts and wear parts',
        zh: '混凝土泵活塞阀门管路配件',
      },
      {
        href: '/blog/concrete-pump-blockage-causes-prevention',
        en: 'Concrete pump blockage causes and safe response',
        zh: '混凝土泵堵管原因与安全处理',
      },
      {
        href: '/blog/concrete-pump-daily-maintenance-checklist',
        en: 'Concrete pump daily maintenance checklist',
        zh: '混凝土泵日常保养清单',
      },
      { href: '/factory', en: 'Xingtai construction machinery factory', zh: '邢台工程机械工厂' },
    ],
    relatedSolutions: [
      { href: '/solutions/construction', en: 'Building construction pumping', zh: '建筑施工泵送应用' },
      factoryLink,
    ],
  },
  'spraying-machine': {
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
      oemLink,
    ],
    relatedArticles: [
      {
        href: '/blog/fine-stone-concrete-pump-vs-mortar-sprayer',
        en: 'Fine stone concrete pump vs mortar and plaster sprayer',
        zh: '细石混凝土泵与砂浆喷涂机的区别',
      },
      {
        href: '/blog/mixer-pump-vs-concrete-mixing-plant',
        en: 'Mixer pump vs concrete mixing plant',
        zh: '搅拌泵与混凝土搅拌站的区别',
      },
      { href: '/factory', en: 'Xingtai construction machinery factory', zh: '邢台工程机械工厂' },
    ],
    relatedSolutions: [
      { href: '/solutions/spraying', en: 'Spraying jobs vs pipeline pumping', zh: '喷浆作业与管道泵送' },
      factoryLink,
    ],
  },
};

export const trustClusterArticles: TopicLink[] = [
  {
    href: '/blog/high-rise-building-concrete-pump-selection',
    en: 'High-rise building concrete pump selection',
    zh: '高层建筑混凝土泵选型',
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

export function clusterForBlog(post: {
  relatedProductSlugs: string[];
  relatedArticleSlugs?: string[];
}): TopicCluster {
  const product = post.relatedProductSlugs
    .map((slug) => getProductBySlug(slug))
    .find((item): item is NonNullable<typeof item> => Boolean(item));
  const base = clusterForProduct(product?.category ?? 'electric-concrete-pump');
  const extraArticles: TopicLink[] = (post.relatedArticleSlugs ?? [])
    .map((slug) => {
      const article = getBlogPost(slug);
      if (!article) return null;
      return {
        href: `/blog/${article.slug}`,
        en: article.title.en,
        zh: article.title.zh ?? article.title.en,
      };
    })
    .filter((item): item is TopicLink => Boolean(item));
  const seen = new Set(extraArticles.map((item) => item.href));
  return {
    ...base,
    relatedArticles: [
      ...extraArticles,
      ...base.relatedArticles.filter((item) => !seen.has(item.href)),
    ],
  };
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
