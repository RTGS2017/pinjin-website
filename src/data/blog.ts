import type { LocalizedText } from '@/i18n/types';
import { getFactorySlide } from '@/data/factory';
import { manufacturingSteps } from '@/data/manufacturingProcess';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

function factoryImage(id: string) {
  const slide = getFactorySlide(id);
  if (!slide) {
    throw new Error(`Missing factory slide: ${id}`);
  }
  return { src: slide.image, alt: slide.alt, caption: slide.title };
}

export type BlogCategory =
  | 'buying-guide'
  | 'industry-knowledge'
  | 'technical-guide'
  | 'manufacturing-process';

export const blogCategoryMeta: Record<BlogCategory, LocalizedText> = {
  'buying-guide': L('Buying Guide', '采购指南'),
  'industry-knowledge': L('Industry Knowledge', '行业知识'),
  'technical-guide': L('Technical Guide', '技术指南'),
  'manufacturing-process': L('Manufacturing Process', '制造流程'),
};

export interface BlogSection {
  heading: LocalizedText;
  paragraphs: LocalizedText[];
  bullets?: LocalizedText[];
  image?: {
    src: string;
    alt: LocalizedText;
    caption?: LocalizedText;
  };
}

export interface BlogRelatedPath {
  href: string;
  label: LocalizedText;
}

export interface BlogPost {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  category: BlogCategory;
  date: string;
  keywords: string[];
  relatedProductSlugs: string[];
  relatedPaths: BlogRelatedPath[];
  content: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-choose-a-concrete-pump',
    title: L(
      'How to Choose a Concrete Pump for a Construction Project',
      '如何为工程项目选择混凝土泵',
    ),
    description: L(
      'Match delivery capacity, conveying distance, power type and aggregate size to catalogue models from a China concrete pump manufacturer.',
      '按输送量、输送距离、动力形式与骨料粒径，对照中国混凝土泵厂家目录选型。',
    ),
    category: 'buying-guide',
    date: '2026-08-01',
    keywords: [
      'how to choose a concrete pump',
      'concrete pump selection',
      'concrete pump manufacturer China',
    ],
    relatedProductSlugs: [
      'hbt80-18-140-concrete-pump',
      'll60-75-concrete-pump',
      'hbt30-37-concrete-pump',
    ],
    relatedPaths: [
      {
        href: '/product-selection-guide',
        label: L('Product Selection Guide', '产品选型指南'),
      },
      { href: '/faq', label: L('Concrete pump FAQ', '混凝土泵常见问题') },
    ],
    content: [
      {
        heading: L('Start with the job, not the model name', '先看工况，再看型号'),
        paragraphs: [
          L(
            'Buyers searching for a concrete pump manufacturer in China often compare model names first. A more reliable path is to list site conditions, then match published catalogue parameters: theoretical delivery capacity, horizontal conveying distance, vertical conveying height and maximum aggregate diameter.',
            '采购方常先比较型号名称。更稳妥的做法是先列出工况，再对照目录中的理论输送量、水平输送距离、垂直输送高度与最大骨料粒径。',
          ),
          L(
            'Hebei Pinjin Machinery publishes these figures for transfer pumps and concrete pumps built in Xingtai, Hebei. Use the figures as a shortlist filter, then request a quotation with your pour rate and pipeline layout.',
            '河北品锦机械在邢台生产输送泵与混凝土泵，并公开上述参数。用参数做初选后，再带浇筑量与管路布置询价。',
          ),
        ],
      },
      {
        heading: L('Capacity and conveying distance', '输送量与输送距离'),
        paragraphs: [
          L(
            'If the project needs high theoretical output and long pipelines, start with larger catalogue pumps. Pinjin’s listed range includes models up to 40–75 m³/h theoretical delivery, 600 m maximum listed horizontal conveying distance and 300 m maximum listed vertical conveying height.',
            '若项目需要较高理论产量和较长管路，从目录中的大型号入手。品锦目录中的最高理论输送量区间为 40–75 m³/h，列出的最大水平输送距离 600 m、最大垂直输送高度 300 m。',
          ),
        ],
        bullets: [
          L(
            'High output / long distance: review HBT80-18-140 and LL60-75.',
            '高产量/长距离：重点看 HBT80-18-140 与 LL60-75。',
          ),
          L(
            'Medium site pours: HBT45-40, HBTT55-50 or HBT30-37.',
            '中等现场浇筑：HBT45-40、HBTT55-50 或 HBT30-37。',
          ),
          L(
            'Compact secondary-structure work: smaller transfer pumps such as LL28-32.',
            '紧凑的二次结构施工：可看 LL28-32 等小型输送泵。',
          ),
        ],
      },
      {
        heading: L('Power supply and customization', '动力与定制'),
        paragraphs: [
          L(
            'Diesel and electric (motor) versions exist in the transfer-pump range. Confirm whether the site has stable 380 V supply or needs a diesel unit. Where the catalogue marks customization, share pipeline diameter, rated head or mounting needs with the factory.',
            '输送泵系列包含柴油与电机版本。确认现场是稳定 380 V 供电还是需要柴油机。目录标明可定制的项目，请把管径、扬程或安装需求发给工厂。',
          ),
          L(
            'Next step: open the Product Selection Guide for scenario matching, then send an inquiry with capacity, distance and aggregate size.',
            '下一步：打开选型指南对照场景，再把输送量、距离与骨料粒径写入询盘。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'diesel-vs-electric-concrete-pump',
    title: L(
      'Diesel vs Electric Concrete Pump: Which Power Type Fits the Site',
      '柴油混凝土泵还是电机混凝土泵：如何按现场选择',
    ),
    description: L(
      'Compare diesel and electric transfer pumps using catalogue models from Hebei Pinjin Machinery for construction sites with or without grid power.',
      '结合河北品锦机械目录型号，比较有电与无电工地的柴油/电机输送泵选择。',
    ),
    category: 'industry-knowledge',
    date: '2026-08-05',
    keywords: [
      'diesel concrete pump',
      'electric concrete pump',
      'diesel vs electric concrete pump',
    ],
    relatedProductSlugs: [
      'diesel-4100-transfer-pump',
      'll15-diesel-transfer-pump',
      'll15-electric-transfer-pump',
    ],
    relatedPaths: [
      {
        href: '/products/category/concrete-pumps',
        label: L('Concrete pump category', '混凝土泵分类'),
      },
      { href: '/faq', label: L('FAQ: diesel and motor pumps', 'FAQ：柴油与电机泵') },
    ],
    content: [
      {
        heading: L('Why power type matters', '为什么动力形式重要'),
        paragraphs: [
          L(
            'A concrete pump is only usable if the site can feed it. Diesel units run where grid power is weak or not yet connected. Electric (motor) units suit workshops or sites with stable industrial power, often 380 V as listed on several Pinjin models.',
            '现场能否供电决定泵能不能用。柴油机适合电网弱或尚未通电的工地；电机型适合车间或有稳定工业用电（目录中多款为 380 V）的现场。',
          ),
        ],
      },
      {
        heading: L('Diesel transfer pumps', '柴油输送泵'),
        paragraphs: [
          L(
            'Pinjin’s diesel transfer pumps, such as Diesel 4100 and LL15 diesel, are listed for construction sites that need mobility and independent power. They are a practical match for remote pours and early-stage civil works.',
            '品锦的柴油输送泵（如 Diesel 4100、LL15 柴油版）面向需要机动性与独立动力的工地，适合偏远浇筑与前期土建。',
          ),
        ],
        bullets: [
          L(
            'Choose diesel when temporary power is unreliable.',
            '临时用电不稳定时优先柴油。',
          ),
          L(
            'Include fuel logistics and noise limits in the project plan.',
            '项目计划中需考虑燃油补给与噪声限制。',
          ),
        ],
      },
      {
        heading: L('Electric / motor transfer pumps', '电机输送泵'),
        paragraphs: [
          L(
            'The LL15 motor version is listed for sites that already have electrical supply. Motor pumps avoid on-site diesel handling and are often preferred for indoor or urban jobs where exhaust is restricted.',
            'LL15 电机版面向已具备供电的现场。电机泵无需现场处理柴油，在室内或限制尾气的城区工程中更常见。',
          ),
          L(
            'If you are unsure, send both the available voltage and the required conveying distance in the inquiry form. The factory can point to the matching catalogue model without guessing undocumented options.',
            '若不确定，请在询盘中同时写明可用电压与所需输送距离。工厂可按目录对应型号回复，不臆造未公开配置。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'mortar-spraying-machine-buying-guide',
    title: L(
      'Mortar Spraying Machine Buying Guide for Finishing Work',
      '砂浆喷涂机采购指南（饰面与喷浆）',
    ),
    description: L(
      'How contractors shortlist mortar, plaster and concrete spraying machines from a China manufacturer using published application scenarios.',
      '承包商如何按公开应用场景，从中国厂家初选砂浆、石膏与混凝土喷涂机。',
    ),
    category: 'buying-guide',
    date: '2026-08-08',
    keywords: [
      'mortar spraying machine manufacturer',
      'plaster spraying machine',
      'concrete spraying machine',
    ],
    relatedProductSlugs: [
      'diesel-screw-mortar-spraying-machine',
      'type-311-spraying-machine',
      'automatic-plaster-spraying-machine',
    ],
    relatedPaths: [
      {
        href: '/products/category/spraying-machines',
        label: L('Spraying machines', '喷涂设备'),
      },
      {
        href: '/applications',
        label: L('Application guides', '应用说明'),
      },
    ],
    content: [
      {
        heading: L('Match the machine to the material', '按材料选设备'),
        paragraphs: [
          L(
            'Spraying equipment on this site covers mortar spraying, plaster spraying and concrete spraying. The wrong family wastes labour: a mortar screw sprayer is not a substitute for a dedicated plaster line, and concrete spraying machines are listed for different site duties.',
            '本站喷涂设备覆盖砂浆喷涂、石膏喷涂与混凝土喷浆。选错系列会浪费人工：砂浆螺旋喷涂机不能替代石膏喷涂线，混凝土喷涂机对应的是另一类工况。',
          ),
        ],
      },
      {
        heading: L('Typical shortlist', '常见初选'),
        paragraphs: [
          L(
            'Use the spraying-machine category page, then open the model that names your material. Diesel screw mortar spraying machines suit sites without convenient power. Type 311 / Type 511 and plunger spraying machines are listed for other spraying duties. Fully automatic plaster spraying machines target plaster finishing.',
            '先打开喷涂设备分类，再进入与材料名称对应的型号。柴油螺旋砂浆喷涂机适合用电不便的现场；311 / 511 与柱塞喷涂机对应其他喷浆任务；全自动石膏喷涂机面向石膏饰面。',
          ),
        ],
        bullets: [
          L(
            'Mortar / rendering: diesel screw mortar spraying machine.',
            '砂浆/抹灰：柴油螺旋砂浆喷涂机。',
          ),
          L(
            'Plaster finishing: fully automatic plaster spraying machine.',
            '石膏饰面：全自动石膏喷涂机。',
          ),
          L(
            'Concrete spraying: concrete spraying machine page.',
            '混凝土喷浆：混凝土喷涂机页面。',
          ),
        ],
      },
      {
        heading: L('What to put in the inquiry', '询盘应写清的信息'),
        paragraphs: [
          L(
            'Tell the factory the material (mortar, plaster or concrete), expected output, power type and whether the job is interior finishing or outdoor spraying. Request a catalogue for the shortlisted model if you need a datasheet before issuing a purchase request.',
            '请告知材料（砂浆、石膏或混凝土）、预期产量、动力形式，以及室内饰面还是室外喷浆。若下单前需要参数表，可在询盘中索取对应型号目录。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'concrete-pump-conveying-distance-guide',
    title: L(
      'Concrete Pump Conveying Distance: Horizontal vs Vertical Reach',
      '混凝土泵输送距离：水平与垂直如何对照',
    ),
    description: L(
      'Read catalogue conveying distance and height the way a project buyer should, using Pinjin’s published maximum listed figures.',
      '按项目采购方式阅读目录中的水平输送距离与垂直高度，并结合品锦已公布的最高参数。',
    ),
    category: 'technical-guide',
    date: '2026-08-12',
    keywords: [
      'concrete pump conveying distance',
      'concrete pump vertical height',
      'horizontal conveying distance',
    ],
    relatedProductSlugs: [
      'hbt80-18-140-concrete-pump',
      'll60-75-concrete-pump',
      'hbtt55-50-concrete-pump',
    ],
    relatedPaths: [
      {
        href: '/product-selection-guide',
        label: L('Selection guide', '选型指南'),
      },
      {
        href: '/applications',
        label: L('Construction applications', '施工应用'),
      },
    ],
    content: [
      {
        heading: L('Read the catalogue figures as listed maxima', '把目录数字理解为列出的最大值'),
        paragraphs: [
          L(
            'Horizontal conveying distance and vertical conveying height on a product page are catalogue parameters, not a guarantee for every pipeline layout. Site pipe diameter, number of bends, mix design and aggregate size all reduce practical reach.',
            '产品页上的水平输送距离与垂直输送高度是目录参数，不是对每一种管路布置的保证。管径、弯头数量、配合比与骨料粒径都会降低实际可达距离。',
          ),
          L(
            'Pinjin’s homepage performance block states the highest parameters listed in the current catalogue: 600 m horizontal, 300 m vertical, 40–75 m³/h theoretical delivery range and 6 cm largest listed aggregate diameter. Individual models are lower; always open the model specification table.',
            '品锦首页性能区块写明当前目录列出的最高参数：水平 600 m、垂直 300 m、理论输送量 40–75 m³/h、最大骨料粒径 6 cm。具体型号更低，务必打开该型号参数表。',
          ),
        ],
      },
      {
        heading: L('How buyers should specify the job', '采购应如何描述工况'),
        paragraphs: [
          L(
            'When you request a quote, write the one-way pipeline length, the height difference, the target output and the aggregate size. That is enough for the manufacturer to map the job onto HBT / LL / HBTT models without inventing undocumented performance.',
            '询价时请写明单程管长、高差、目标产量与骨料粒径。厂家即可把工况对应到 HBT / LL / HBTT 型号，而不会编造未公开性能。',
          ),
        ],
        bullets: [
          L(
            'Long horizontal lines: compare HBT80-18-140 and LL60-75 tables.',
            '较长水平管路：对照 HBT80-18-140 与 LL60-75 参数表。',
          ),
          L(
            'Need help mapping scenarios: use the Product Selection Guide.',
            '需要按场景对照：使用产品选型指南。',
          ),
        ],
      },
      {
        heading: L('From article to inquiry', '从文章到询盘'),
        paragraphs: [
          L(
            'Technical articles should lead to a product page, then to an inquiry. Open a related model below, confirm specifications, and send quantity plus pipeline data through the quotation form.',
            '技术文章应引导到产品页再进入询盘。打开下方相关型号核对参数，再通过询价表提交数量与管路数据。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'how-we-manufacture-construction-equipment',
    title: L(
      'How We Manufacture Construction Equipment',
      '我们如何制造工程设备',
    ),
    description: L(
      'A factory-floor view of Hebei Pinjin Machinery: workshop, assembly, inspection and packing for concrete pumps and construction equipment in Xingtai, Hebei.',
      '走进河北品锦机械：邢台工厂的车间、装配、检测与包装，覆盖混凝土泵与工程设备制造。',
    ),
    category: 'manufacturing-process',
    date: '2026-08-13',
    keywords: [
      'construction machinery manufacturer factory',
      'concrete pump manufacturer China',
      'machinery production workshop',
      'OEM machinery manufacturer',
    ],
    relatedProductSlugs: [
      'hbt80-18-140-concrete-pump',
      'hbt30-37-concrete-pump',
      'diesel-screw-mortar-spraying-machine',
    ],
    relatedPaths: [
      { href: '/about#factory', label: L('Factory overview', '工厂概览') },
      {
        href: '/product-selection-guide',
        label: L('Product Selection Guide', '产品选型指南'),
      },
      { href: '/contact#inquiry', label: L('Request a quote', '获取报价') },
    ],
    content: [
      {
        heading: L('A source manufacturer in Xingtai, Hebei', '河北邢台的源头厂家'),
        paragraphs: [
          L(
            'Hebei Pinjin Machinery Manufacturing Co., Ltd. is a professional Chinese construction machinery manufacturer specializing in concrete equipment and industrial machinery production. The manufacturing base is in Renze Industrial Park, Xingtai City, Hebei Province.',
            '河北品锦机械制造有限公司是专业的中国工程机械制造商，专注混凝土设备与工业机械生产。制造基地位于河北省邢台市任泽工业园区。',
          ),
          L(
            'This article explains the published production path — raw materials, machining, assembly, quality inspection and factory packing — using real factory photographs. It does not list certifications, customer names or export countries that are not published on this site.',
            '本文按已公开的生产路径说明：原材料、机加工、装配、质量检测与出厂包装，并配真实工厂照片。不罗列本站未公布的认证、客户名或出口国。',
          ),
        ],
        image: factoryImage('factory-building'),
      },
      {
        heading: L('Production workshop', '生产车间'),
        paragraphs: [
          L(
            'The workshop is organized for machinery manufacturing, with production areas for concrete pumps and related construction equipment. Buyers can treat these photos as evidence of a working plant, not a stock collage.',
            '车间按机械制造分区组织，覆盖混凝土泵及相关工程设备。采购方可把这些照片视为真实工厂现场，而非图库拼贴。',
          ),
        ],
        image: factoryImage('production-workshop'),
      },
      {
        heading: L('Handling heavy components', '重型部件搬运'),
        paragraphs: [
          L(
            'The production hall is equipped for handling heavy machinery components during manufacturing.',
            '车间具备搬运重型机械部件的作业条件。',
          ),
        ],
        image: factoryImage('workshop-crane'),
      },
      {
        heading: manufacturingSteps[0].title,
        paragraphs: [manufacturingSteps[0].body],
      },
      {
        heading: manufacturingSteps[1].title,
        paragraphs: [manufacturingSteps[1].body],
        image: factoryImage('concrete-manufacturing'),
      },
      {
        heading: manufacturingSteps[2].title,
        paragraphs: [manufacturingSteps[2].body],
        image: factoryImage('equipment-assembly'),
      },
      {
        heading: L('Trailer-mounted equipment assembly', '拖式设备装配'),
        paragraphs: [
          L(
            'Trailer-mounted concrete pump assembly and inspection follow the published manufacturing process.',
            '拖泵类混凝土设备按已公开的制造流程进行装配与检查。',
          ),
        ],
        image: factoryImage('trailer-assembly'),
      },
      {
        heading: manufacturingSteps[3].title,
        paragraphs: [manufacturingSteps[3].body],
        image: factoryImage('finished-products'),
      },
      {
        heading: manufacturingSteps[4].title,
        paragraphs: [
          manufacturingSteps[4].body,
          L(
            'Finished equipment photographed in the plant supports customized industrial equipment orders where the product catalogue already lists customization.',
            '厂内拍摄的成品照片，对应产品目录已标明可定制的工业设备订单。',
          ),
        ],
        image: factoryImage('factory-loading'),
      },
      {
        heading: L('Dispatch from the factory', '设备出厂发运'),
        paragraphs: [
          L(
            'Source manufacturing covers production through factory packing before delivery to the buyer.',
            '源头制造覆盖生产至出厂包装，再交付采购方。',
          ),
        ],
        image: factoryImage('factory-dispatch'),
      },
      {
        heading: L('From factory photos to a quotation', '从工厂照片到询盘'),
        paragraphs: [
          L(
            'If you need a model recommendation, open the factory overview, match catalogue parameters on a product page, then send quantity and project conditions through the inquiry form.',
            '如需型号建议，可先看工厂概览，再在产品页核对目录参数，并通过询盘表提交数量与工况。',
          ),
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}
