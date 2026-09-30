import type { LocalizedText } from '@/i18n/types';

const L = (
  en: string,
  zh: string,
  extra?: Partial<Pick<LocalizedText, 'pt' | 'ar' | 'ru'>>,
): LocalizedText => ({ en, zh, ...extra });

/**
 * Homepage knowledge cards only.
 * Titles, descriptions and covers match getBlogCover() for these three slugs.
 * Full article bodies and sourced markdown stay out of the home chunk.
 */
export const homeKnowledgeCards: ReadonlyArray<{
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  alt: LocalizedText;
  width: number;
  height: number;
}> = [
  {
    slug: 'electric-15-concrete-pump-applications',
    title: L(
      'Electric 15 Concrete Pump for Small Building Sites',
      '电动15型混凝土泵：小型建筑与二次结构怎么选',
    ),
    description: L(
      'Customers often ask whether the Electric 15 is enough for their site. We match this compact concrete pump to 2–3 floor houses and secondary structure using only published catalogue numbers from our Xingtai factory.',
      '客户常问电动15型够不够用。我们按邢台工厂已公布目录，把这台紧凑型混凝土泵对照2–3层自建房与二次结构，不编造未列出的压力、料斗或工期。',
      {
        ar: 'Customers often ask whether the Electric 15 is enough for their site. We match this compact concrete pump to 2–3 floor houses and secondary structure using only published catalogue numbers from our شينغتاي factory.',
        ru: 'Customers often ask whether the Electric 15 is enough for their site. We match this compact concrete pump to 2–3 floor houses and secondary structure using only published catalogue numbers from our Синтай factory.',
      },
    ),
    image: '/images/factory/pinjin-trailer-concrete-pump-assembly.webp',
    alt: L(
      'Trailer concrete pump assembly for compact Electric 15 units at Pinjin Xingtai factory',
      '品锦邢台工厂紧凑型电动15拖式混凝土泵装配现场',
    ),
    width: 1920,
    height: 1080,
  },
  {
    slug: 'diesel-concrete-pump-no-electricity',
    title: L(
      'Diesel Concrete Pump for Sites Without Electricity',
      '无电工地用柴油混凝土泵',
    ),
    description: L(
      'Xingtai factory guide to diesel concrete pumps for rural Hebei and sites without three-phase power: rural 17 kW, tractor 4100, and Diesel 30 catalogue ladder.',
      '邢台工厂说明河北农村及无三相电工地如何选柴油混凝土泵：农村17 kW、拖拉机4100与柴油30型目录阶梯。',
      {
        pt: 'Xingtai factory guide to diesel concrete pumps for rural Hebei and sites without trifásico power: rural 17 kW, tractor 4100, and Diesel 30 catalogue ladder.',
        ar: 'شينغتاي factory guide to diesel concrete pumps for rural Hebei and sites without ثلاثي الطور power: rural 17 kW, tractor 4100, and Diesel 30 catalogue ladder.',
        ru: 'Синтай factory guide to diesel concrete pumps for rural Hebei and sites without трёхфазный power: rural 17 kW, tractor 4100, and Diesel 30 catalogue ladder.',
      },
    ),
    image: '/images/factory/pinjin-diesel-machinery-factory-dispatch.webp',
    alt: L(
      'Diesel concrete pump dispatch from Hebei Pinjin Machinery Xingtai factory for rural no-electricity sites',
      '河北品锦机械邢台工厂发出的柴油混凝土泵，用于农村无电工地',
    ),
    width: 1920,
    height: 1080,
  },
  {
    slug: 'high-rise-building-concrete-pump-selection',
    title: L(
      'High-rise building concrete pump selection: convert floors to metres first',
      '高层建筑混凝土泵选型：先把楼层换成垂直米数',
    ),
    description: L(
      'Xingtai engineers convert floor count to vertical metres, then add horizontal pipe before matching Electric 40, 60 and 80 catalogue heights. We do not sell truck-mounted placing booms.',
      '邢台工程师先把楼层换成垂直米数，再计入水平管路，对照电动40、60、80目录高度选型。我们不销售车载布料杆。',
      {
        ar: 'شينغتاي engineers convert floor count to عمودي metres, then add أفقي pipe before matching Electric 40, 60 and 80 catalogue heights. We do not sell truck-mounted placing booms.',
        ru: 'Синтай engineers convert floor count to вертикаль metres, then add горизонталь pipe before matching Electric 40, 60 and 80 catalogue heights. We do not sell truck-mounted placing booms.',
      },
    ),
    image: '/images/factory/pinjin-concrete-pump-manufacturing.webp',
    alt: L(
      'Electric trailer concrete pump manufacturing at Hebei Pinjin Machinery in Xingtai for high-rise pipeline pumping',
      '河北品锦机械邢台工厂制造用于高层管路泵送的电动拖式混凝土泵',
    ),
    width: 1920,
    height: 1080,
  },
  {
    slug: 'concrete-pump-pipe-dn-selection',
    title: L(
      'Concrete Pump Pipe DN Selection: DN80 vs DN100/125',
      '混凝土泵输送管DN选型：DN80与DN100/125',
    ),
    description: L(
      'Buyers often ask for a pipe price first. At our Xingtai factory we start with delivery pipe DN. We publish 80 mm on Electric 20, 100–125 mm on Electric 15, and 100 / 125 mm on mixer pumps and HBT8018.',
      '询价往往先问管子多少钱。我们邢台工厂先问输送管DN。目录已公布：电动20为80 mm，电动15为100–125 mm，搅拌泵与HBT8018为100 / 125 mm。',
    ),
    image: '/images/factory/pinjin-machinery-workshop-overhead-crane.webp',
    alt: L(
      'Pinjin Xingtai workshop overhead crane during concrete pump assembly',
      '品锦邢台车间行车吊运混凝土泵装配件',
    ),
    width: 1920,
    height: 1080,
  },
  {
    slug: 'mixer-pump-vs-concrete-mixing-plant',
    title: L(
      'Mixer Pump vs Mixing Plant: Trailer Mix and Pump',
      '搅拌泵不是搅拌站：拖车上搅拌并泵送',
    ),
    description: L(
      'A mixer pump is not a mixing plant. Pinjin builds mix-plus-pump trailers in Xingtai, not batching plants. Electric 45 kW + 14 kW, 21 m³/h; diesel 4108 66–75 kW, 25 m³/h.',
      '搅拌泵不是搅拌站。品锦在邢台制造搅拌加泵送一体拖车，不生产搅拌站。电动主电机45 kW加搅拌14 kW、21 m³/h；柴油4108 66–75 kW、25 m³/h。',
    ),
    image: '/images/products/integrated-mixer-pump/main.webp',
    alt: L(
      'Integrated mixer pump trailer, mix and pump, Xingtai factory',
      '邢台工厂搅拌泵一体机拖车，现场搅拌并泵送，不是搅拌站',
    ),
    width: 1200,
    height: 900,
  },
];
