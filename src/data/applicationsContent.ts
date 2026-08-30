import type { LocalizedText } from '@/i18n/types';
import type { ProductCategory } from '@/data/products';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

export interface ApplicationImage {
  src: string;
  alt: LocalizedText;
  width: number;
  height: number;
  keywords: string[];
}

export interface ApplicationPageItem {
  id: string;
  slug: string;
  solutionSlug: string;
  title: LocalizedText;
  summary: LocalizedText;
  points: LocalizedText[];
  relatedCategory: ProductCategory;
  images: ApplicationImage[];
}

/** 应用页内容：只写应用方向，不写虚假项目业绩 */
export const applicationPages: ApplicationPageItem[] = [
  {
    id: 'building',
    slug: 'building-construction',
    solutionSlug: 'construction',
    title: {
      en: 'Concrete Pump for Building Construction',
      zh: '建筑施工用混凝土泵',
    },
    summary: {
      en: 'Building projects often need continuous concrete placement across floors and structural elements. Pinjin concrete pumps provide published vertical and horizontal conveying parameters so contractors can match pump models to building height and pour layout.',
      zh: '建筑项目常需跨楼层与结构部位连续浇筑。品锦混凝土泵提供公开的垂直/水平输送参数，便于承包商按建筑高度与浇筑布置匹配型号。',
    },
    points: [
      {
        en: 'Compare vertical conveying height against floor levels before model selection',
        zh: '选型前将垂直输送高度与楼层高度对照',
      },
      {
        en: 'Check delivery capacity against daily pour volume',
        zh: '按日浇筑量核对输送量参数',
      },
      {
        en: 'Verify max aggregate diameter against the concrete mix design',
        zh: '按配合比核对最大骨料粒径',
      },
    ],
    relatedCategory: 'electric-concrete-pump',
    images: [
      {
        src: '/images/applications/pinjin-concrete-pump-building-construction.webp',
        alt: L(
          'Hebei Pinjin Machinery concrete pump working on a building construction site in China',
          '河北品锦机械混凝土泵在建筑工地浇筑作业',
        ),
        width: 1600,
        height: 1200,
        keywords: [
          'concrete pump manufacturer China',
          'concrete pump for building construction',
        ],
      },
      {
        src: '/images/applications/pinjin-concrete-pump-construction-site.webp',
        alt: L(
          'Hebei Pinjin compact concrete pump on a construction site with operators',
          '品锦紧凑型混凝土泵在施工现场作业',
        ),
        width: 1280,
        height: 960,
        keywords: [
          'concrete pump manufacturer China',
          'construction site concrete pump',
        ],
      },
    ],
  },
  {
    id: 'infrastructure',
    slug: 'infrastructure-projects',
    solutionSlug: 'infrastructure',
    title: {
      en: 'Concrete Pump for Infrastructure Projects',
      zh: '基建工程用混凝土泵',
    },
    summary: {
      en: 'Infrastructure pours may require longer horizontal conveying. Pinjin’s catalogue lists horizontal distances up to 900 m on Electric 80 (HBT80-1816-110), helping buyers shortlist models by pipeline length.',
      zh: '基建浇筑可能需要更长水平输送。品锦目录中水平距离最高为电动80（HBT80-1816-110）的 900 m，可按管路长度筛选型号。',
    },
    points: [
      {
        en: 'Map pipeline length to listed horizontal conveying distance',
        zh: '将管路长度对照目录水平输送距离',
      },
      {
        en: 'Review diesel engine models for remote infrastructure sites',
        zh: '偏远工地优先核对柴油机型号与动力参数',
      },
      {
        en: 'Match delivery capacity to planned pour volume and schedule',
        zh: '按计划浇筑量与工期匹配输送量参数',
      },
    ],
    relatedCategory: 'electric-concrete-pump',
    images: [
      {
        src: '/images/applications/pinjin-concrete-equipment-highway-infrastructure.webp',
        alt: L(
          'Hebei Pinjin construction equipment working on a highway infrastructure project',
          '品锦工程设备用于公路基建现场作业',
        ),
        width: 1280,
        height: 960,
        keywords: [
          'china concrete machinery manufacturer',
          'infrastructure concrete equipment',
        ],
      },
    ],
  },
  {
    id: 'spraying',
    slug: 'spraying-applications',
    solutionSlug: 'spraying',
    title: {
      en: 'Spraying Jobs vs Pipeline Pumping',
      zh: '喷浆作业与管道泵送',
    },
    summary: {
      en: 'Shotcrete and mortar spraying are finishing methods, not the same as pipeline pumping. Pinjin’s current catalogue lists electric and diesel concrete pumps and mixer pumps. A dedicated spraying-machine line is not published on this website.',
      zh: '喷浆与砂浆喷涂是饰面施工方法，不同于管道泵送。品锦当前目录列出电动/柴油混凝土泵与搅拌泵，本站未公布独立喷涂机产品线。',
    },
    points: [
      {
        en: 'Do not treat a concrete pump table as shotcrete equipment data',
        zh: '不要把混凝土泵参数表当作喷浆机数据',
      },
      {
        en: 'If the job is pipeline placement, match capacity and conveying distance on pump pages',
        zh: '若工况是管道浇筑，请在泵产品页对照输送量与输送距离',
      },
      {
        en: 'Contact the Xingtai factory if the project needs spraying equipment that is not listed',
        zh: '若项目需要未列入目录的喷涂设备，请联系邢台工厂',
      },
    ],
    relatedCategory: 'electric-concrete-pump',
    images: [
      {
        src: '/images/applications/pinjin-mortar-spraying-machine-building-interior.webp',
        alt: L(
          'Construction finishing spraying work — industry application context, Hebei Pinjin Machinery',
          '施工饰面喷浆作业（行业应用说明）— 河北品锦机械',
        ),
        width: 1600,
        height: 1200,
        keywords: [
          'concrete pumping vs spraying',
          'construction finishing application',
        ],
      },
      {
        src: '/images/applications/pinjin-hydraulic-mortar-spraying-machine-site.webp',
        alt: L(
          'Outdoor construction finishing spraying — industry application context, Hebei Pinjin Machinery',
          '室外施工饰面喷浆（行业应用说明）— 河北品锦机械',
        ),
        width: 1600,
        height: 1200,
        keywords: [
          'construction site conveying',
          'concrete pump manufacturer China',
        ],
      },
    ],
  },
  {
    id: 'handling',
    slug: 'material-handling',
    solutionSlug: 'industrial-projects',
    title: {
      en: 'Diesel Pumping on Sites Without Grid Power',
      zh: '无电网工地的柴油泵送',
    },
    summary: {
      en: 'Rural houses, remote infrastructure and sites without stable electricity use diesel trailer pumps or tractor-driven units. Pinjin lists Diesel 30–120, LZ-60 / LZ-80, Tractor-Driven 4100 and rural diesel pumps with published engine power, output and conveying distance.',
      zh: '农村自建房、偏远基建和供电不稳的工地使用柴油拖泵或拖拉机带动泵。品锦目录列出柴油30–120、LZ-60 / LZ-80、拖拉机带动4100与农村柴油泵，并公开发动机功率、输送量与输送距离。',
    },
    points: [
      {
        en: 'Match engine kW and output to daily pour volume',
        zh: '按日浇筑量对照发动机功率与输送量',
      },
      {
        en: 'Use compact rural or tractor-driven models on constrained sites',
        zh: '场地受限时对照农村紧凑型或拖拉机带动型号',
      },
      {
        en: 'This page is about diesel pumping, not forklifts or spiral feeders',
        zh: '本页说明柴油泵送，不是叉车或螺旋给料机产品线',
      },
    ],
    relatedCategory: 'diesel-concrete-pump',
    images: [
      {
        src: '/images/applications/pinjin-concrete-pump-construction-site.webp',
        alt: L(
          'Hebei Pinjin compact concrete pump on a construction site with operators',
          '品锦紧凑型混凝土泵在施工现场作业',
        ),
        width: 1280,
        height: 960,
        keywords: [
          'diesel concrete pump manufacturer China',
          'Xingtai concrete machinery manufacturer',
        ],
      },
    ],
  },
];

export function getSolutionBySlug(slug: string) {
  return applicationPages.find(
    (item) => item.solutionSlug === slug || item.slug === slug,
  );
}

export function getApplicationHero(
  item: ApplicationPageItem,
): ApplicationImage | undefined {
  return item.images[0];
}
