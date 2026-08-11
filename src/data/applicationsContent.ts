import type { LocalizedText } from '@/i18n/types';
import type { ProductCategory } from '@/data/products';

export interface ApplicationPageItem {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  points: LocalizedText[];
  relatedCategory: ProductCategory;
  image: string;
}

/** 应用页内容：只写应用方向，不写虚假项目业绩 */
export const applicationPages: ApplicationPageItem[] = [
  {
    id: 'building',
    slug: 'building-construction',
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
    relatedCategory: 'concrete-pump',
    image: '/images/applications/construction-site-application.webp',
  },
  {
    id: 'infrastructure',
    slug: 'infrastructure-projects',
    title: {
      en: 'Concrete Pump for Infrastructure Projects',
      zh: '基建工程用混凝土泵',
    },
    summary: {
      en: 'Infrastructure pours may require longer horizontal conveying. Pinjin’s catalogue lists horizontal distances from compact transfer pumps up to 600 m on HBT80-18-140, helping buyers shortlist models by pipeline length rather than generic “machine” keywords.',
      zh: '基建浇筑可能需要更长水平输送。品锦目录中水平距离从紧凑输送泵到 HBT80-18-140 的 600 m 均有列出，便于按管路长度筛选，而不是搜索泛化的“机械”。',
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
        en: 'Use published specs only—no unverified project references are claimed',
        zh: '仅使用公开参数，不宣称未核实的项目业绩',
      },
    ],
    relatedCategory: 'concrete-pump',
    image: '/images/applications/concrete-delivery-application.webp',
  },
  {
    id: 'spraying',
    slug: 'spraying-applications',
    title: {
      en: 'Spraying Machines for Construction Finishing',
      zh: '施工饰面与喷浆设备',
    },
    summary: {
      en: 'For mortar, plaster and concrete spraying, Pinjin lists diesel screw mortar, automatic plaster, Type 311/511, plunger spraying and concrete spraying machines with published pressure, flow and distance parameters.',
      zh: '砂浆、石膏与混凝土喷浆方面，品锦目录提供柴油螺杆砂浆机、全自动石膏机、311/511、柱塞喷涂机与混凝土喷浆机，并公开压力、流量与距离参数。',
    },
    points: [
      {
        en: 'Select mortar/plaster machines separately from long-distance concrete pumps',
        zh: '砂浆/石膏设备与长距离混凝土泵分开选型',
      },
      {
        en: 'Compare Type 311 / 511 / plunger models by catalogue conveying distance',
        zh: '按目录输送距离对照 311 / 511 / 柱塞机型',
      },
      {
        en: 'Discuss customization where the catalogue explicitly supports it',
        zh: '仅在目录明确支持定制的型号上沟通定制需求',
      },
    ],
    relatedCategory: 'spraying-machine',
    image: '/images/applications/mortar-spraying-application.webp',
  },
  {
    id: 'handling',
    slug: 'material-handling',
    title: {
      en: 'Material Handling for Construction Sites',
      zh: '建筑工地物料搬运',
    },
    summary: {
      en: 'Pinjin also lists spiral feeders and four-wheel drive forklift loaders (clamp/bucket) for site material feeding and handling, with published lift heights and drive parameters.',
      zh: '品锦目录同时提供螺旋给料机与四驱叉车装载机（夹抱/铲斗），用于现场给料与搬运，并公开举升高度与驱动参数。',
    },
    points: [
      {
        en: 'Spiral feeder rated head is customizable per catalogue',
        zh: '螺旋给料机额定扬程按目录可定制',
      },
      {
        en: 'Choose clamp or bucket loader configuration by handling task',
        zh: '按搬运任务选择夹抱或铲斗装载配置',
      },
      {
        en: 'Confirm rated load units with the manufacturer when needed',
        zh: '载重单位如需换算可与厂家确认',
      },
    ],
    relatedCategory: 'material-handling',
    image: '/images/applications/plaster-spraying-application.webp',
  },
];
