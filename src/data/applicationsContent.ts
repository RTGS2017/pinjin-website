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
      en: 'A floor pour stops when the vertical cell is short or the stone is larger than the pump allows. Start with height, the day’s volume and the aggregate, then open the electric building rows.',
      zh: '楼层浇筑停住，多半是垂直距离不够，或者石子比这台泵允许的更大。先看高度、一天打多少方、骨料多大，再打开电动建筑型号。',
    },
    points: [
      {
        en: 'Put the vertical metres next to the floor you still have to reach',
        zh: '把垂直米数对着还要送到的那一层',
      },
      {
        en: 'Put hourly output next to the volume the crew can actually place',
        zh: '把每小时方量对着班组真正能浇完的量',
      },
      {
        en: 'Put the stone size next to the mix, not next to a bigger pump’s row',
        zh: '把石子粒径对着配合比，不要对着更大那一档的参数',
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
      en: 'A long pipe run is a distance problem, not a slogan. The longest horizontal cell in the catalogue is 900 m on Electric 80 (HBT80-1816-110). If that site has no grid, open a diesel row instead of stretching an electric one.',
      zh: '管路长，是距离问题，不是一句“超远输送”能解决的。目录里水平最长的一格是电动80（HBT80-1816-110）的 900 米。这个工地如果没有电，去看柴油型号，不要把电动泵的距离拉长。',
    },
    points: [
      {
        en: 'Measure the pipe, then find the horizontal cell that still covers it',
        zh: '先量管路，再找还能盖住这段距离的水平格',
      },
      {
        en: 'No power along the line: use a diesel model, not a longer electric claim',
        zh: '沿线没有电：用柴油型号，不要把电动泵说得更远',
      },
      {
        en: 'Match hourly output to the pour you can finish, not to the biggest number on the site',
        zh: '每小时方量对着你能浇完的量，不对着全站最大的那个数字',
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
      en: 'If the crew is finishing a wall, a trailer pump is the wrong machine. Open the spraying line for mortar, plaster and the listed concrete sprayers. Each one prints its own output, hose and particle size. Type 311, Type 511, the diesel 511, the German-type dual-motor row, the double-cylinder plunger, two 380 V hydraulic sprayers (5 m³/h and 7 m³/h), M9 plaster (30 L/min) and a diesel concrete sprayer (5 m³/h) stay on that page.',
      zh: '班组是在抹墙，拖式泵就买错了。砂浆、石膏和目录里的混凝土喷涂，去喷涂机这条线。每台单独印着产量、管径和粒径。311、511、511 柴油、德式双电机、双缸柱塞、两台 380V 液压喷涂机（5 m³/h 与 7 m³/h）、M9 石膏喷涂（30 L/min）和柴油混凝土喷涂机（5 m³/h）都在这一页。',
    },
    points: [
      {
        en: 'Do not treat a concrete pump table as spraying-machine data',
        zh: '不要把混凝土泵参数表当作喷涂机数据',
      },
      {
        en: 'If the job is pipeline placement, match capacity and conveying distance on pump pages',
        zh: '若工况是管道浇筑，请在泵产品页对照输送量与输送距离',
      },
      {
        en: 'If the job is mortar, plaster or listed concrete spraying, open the spraying-machines hub',
        zh: '若工况是砂浆、石膏或目录所列混凝土喷涂，请打开喷涂机分类页',
      },
    ],
    relatedCategory: 'spraying-machine',
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
      en: 'When the site cannot feed an electric motor, the pour still has to move. Diesel 30–120, LZ-60 / LZ-80, the tractor-driven 4100 and the rural diesel pump print engine power, output and distance for that job. A tight rural plot uses the compact or tractor-driven row, not a larger trailer.',
      zh: '工地供不上电机，混凝土还是要打出去。柴油 30–120、LZ-60 / LZ-80、拖拉机带动 4100 和农村柴油泵，把发动机功率、输送量和距离印在这个工况上。院子小，用紧凑型或拖拉机带动，不要上一台更大的拖泵。',
    },
    points: [
      {
        en: 'Match engine power and hourly output to the day’s pour',
        zh: '发动机功率和每小时方量对着这一天的浇筑',
      },
      {
        en: 'A tight yard takes the rural or tractor-driven row',
        zh: '院子小，用农村型或拖拉机带动',
      },
      {
        en: 'This is diesel pumping, not a forklift or a feeder',
        zh: '这里是柴油泵送，不是叉车，也不是给料机',
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

export function getApplicationImagesForCategory(category: ProductCategory): ApplicationImage[] {
  const fallbackCategory: ProductCategory =
    category === 'mixer-pump' || category === 'spare-parts'
      ? 'electric-concrete-pump'
      : category;
  const matched = applicationPages.filter((page) => page.relatedCategory === fallbackCategory);
  const pages = matched.length ? matched : applicationPages.slice(0, 1);
  const seen = new Set<string>();
  const images: ApplicationImage[] = [];
  for (const page of pages) {
    for (const image of page.images) {
      if (seen.has(image.src)) continue;
      seen.add(image.src);
      images.push(image);
    }
  }
  return images.slice(0, 2);
}
