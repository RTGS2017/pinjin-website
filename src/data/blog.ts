import type { LocalizedText } from '@/i18n/types';
import { getFactorySlide } from '@/data/factory';
import { manufacturingSteps } from '@/data/manufacturingProcess';
import { knowledgeArticles } from '@/data/knowledgeArticles';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

function factoryImage(id: string) {
  const slide = getFactorySlide(id);
  if (!slide) {
    throw new Error(`Missing factory slide: ${id}`);
  }
  return { src: slide.image, alt: slide.alt, caption: slide.title };
}

export type BlogCategory =
  | 'manufacturing-knowledge'
  | 'industry-guide'
  | 'product-guide'
  | 'factory-insights'
  | 'application-solutions';

export const blogCategoryOrder: BlogCategory[] = [
  'product-guide',
  'application-solutions',
  'manufacturing-knowledge',
  'industry-guide',
  'factory-insights',
];

export const blogCategoryMeta: Record<BlogCategory, LocalizedText> = {
  'manufacturing-knowledge': L('Manufacturing Knowledge', '制造知识'),
  'industry-guide': L('Industry Trends', '行业趋势'),
  'product-guide': L('Equipment Guide', '设备指南'),
  'factory-insights': L('Factory Insights', '工厂洞察'),
  'application-solutions': L('Application Solutions', '应用方案'),
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
  seoTitle?: LocalizedText;
  description: LocalizedText;
  category: BlogCategory;
  date: string;
  dateModified?: string;
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
    category: 'product-guide',
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
        href: '/products/concrete-pumps',
        label: L('Concrete pump category', '混凝土泵分类'),
      },
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
    category: 'industry-guide',
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
        href: '/products/concrete-pumps',
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
    category: 'product-guide',
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
        href: '/products/spraying-machines',
        label: L('Spraying machines', '喷涂设备'),
      },
      {
        href: '/solutions',
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
    category: 'product-guide',
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
        href: '/solutions',
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
    category: 'manufacturing-knowledge',
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
      { href: '/contact', label: L('Request a quote', '获取报价') },
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
            'If you need a model recommendation, open the factory overview, match catalogue parameters on a product page, then contact the engineering team by WhatsApp or email with quantity and project conditions.',
            '如需型号建议，可先看工厂概览，再在产品页核对目录参数，并通过 WhatsApp 或邮件向工程团队说明数量与工况。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'xingjiawan-concrete-machinery-manufacturing',
    title: L(
      'Xingjiawan Concrete Machinery Manufacturing Base',
      '邢家湾混凝土机械制造基地',
    ),
    seoTitle: L(
      "Xingjiawan Concrete Machinery Manufacturing Base: Why It Became China's Concrete Equipment Hub | Construction Machinery Knowledge | Pinjin",
      '邢家湾混凝土机械制造基地：为何成为中国混凝土设备集聚区 | 工程机械知识 | 品锦',
    ),
    description: L(
      'Xingjiawan Concrete Machinery Manufacturing Base explained: why Xingtai, Hebei is known for concrete machinery, and how Hebei Pinjin Machinery manufactures customized equipment in Renze Industrial Park.',
      '邢家湾混凝土机械制造基地说明：河北邢台为何以混凝土机械著称，以及河北品锦机械如何在任泽工业园区提供定制设备。',
    ),
    category: 'factory-insights',
    date: '2026-08-15',
    keywords: [
      'xingjiawan concrete machinery',
      'xingtai concrete equipment manufacturer',
      'china concrete machinery manufacturer',
      'concrete pump factory China',
    ],
    relatedProductSlugs: [
      'hbt80-18-140-concrete-pump',
      'hbt30-37-concrete-pump',
      'diesel-screw-mortar-spraying-machine',
    ],
    relatedPaths: [
      { href: '/products/concrete-pumps', label: L('Concrete pumps', '混凝土泵') },
      { href: '/products/spraying-machines', label: L('Spraying machines', '喷涂设备') },
      { href: '/contact', label: L('Contact engineering team', '联系工程团队') },
    ],
    content: [
      {
        heading: L(
          'Introduction of the Xingjiawan manufacturing cluster',
          '邢家湾制造集聚区简介',
        ),
        paragraphs: [
          L(
            'Located in Xingtai, Hebei, Xingjiawan is known as an important manufacturing area for concrete machinery. Nearby plants produce concrete pumps, spraying machines and related construction equipment, supported by local machining and component suppliers.',
            '邢台邢家湾是中国重要的混凝土机械制造集聚区之一。周边企业生产混凝土泵、喷涂机及相关工程设备，并有本地机加工与零部件配套。',
          ),
          L(
            'Hebei Pinjin Machinery Manufacturing Co., Ltd. is a concrete machinery manufacturer with its factory address in Renze Industrial Park, Xingtai. This article describes the regional cluster and Pinjin’s published manufacturing role. It does not claim certifications, customer names or export countries that are not published on this site.',
            '河北品锦机械制造有限公司是混凝土机械制造商，工厂地址为河北省邢台市任泽工业园区。本文说明区域集聚与品锦已公开的制造定位，不罗列本站未公布的认证、客户名或出口国。',
          ),
        ],
        image: factoryImage('factory-building'),
      },
      {
        heading: L(
          'Local supply chain and concrete equipment',
          '本地配套与混凝土设备的关系',
        ),
        paragraphs: [
          L(
            'Concrete pumps and spraying machines need frames, hoppers, pumping units and wearing parts. A regional supply chain shortens the path from parts preparation to assembly, which is useful when a project needs a non-standard specification discussed against a catalogue model.',
            '混凝土泵与喷涂机需要机架、料斗、泵送单元与易损件。区域配套缩短从零件准备到装配的路径，便于在目录机型基础上讨论非标参数。',
          ),
        ],
        image: factoryImage('production-workshop'),
      },
      {
        heading: L(
          'Advantages of sourcing concrete machinery from this region',
          '从该区域采购混凝土机械的优势',
        ),
        paragraphs: [
          L(
            'Buyers looking for a China concrete machinery manufacturer often compare factories in the same industrial area. A cluster makes it easier to inspect production, discuss catalogue models and confirm whether a listed configuration can be adjusted.',
            '寻找中国混凝土机械制造商的采购方，常会比较同一产业区内的工厂。集聚便于实地查看生产、讨论目录机型，并确认所列配置能否调整。',
          ),
          L(
            'Pinjin publishes delivery capacity, conveying distance and power type on each product page. Buyers can match those parameters to the jobsite before contacting the engineering team.',
            '品锦在各产品页公布输送量、输送距离与动力形式。采购方可先对照工况，再联系工程团队。',
          ),
        ],
      },
      {
        heading: L(
          'Pinjin Machinery manufacturing capability',
          '品锦机械制造能力',
        ),
        paragraphs: [
          L(
            'Published manufacturing steps cover incoming materials, machining, assembly, quality inspection and factory packing. Real factory photographs on this site show the workshop, assembly area and dispatch — not stock collages.',
            '已公开的制造步骤包括原材料、机加工、装配、质量检测与出厂包装。本站工厂照片展示车间、装配区与发运现场，而非图库拼贴。',
          ),
        ],
        image: factoryImage('equipment-assembly'),
      },
      {
        heading: L(
          'Customized equipment solutions',
          '定制设备方案',
        ),
        paragraphs: [
          L(
            'Not every project requires a standard machine. Pinjin engineers can discuss capacity, conveying distance, aggregate size and power type against published models. After confirming specifications, customized production can be arranged quickly. This site does not publish a fixed number of production days.',
            '并非每个项目都适合标准机型。品锦工程师可对照已公布机型讨论产能、输送距离、骨料粒径与动力形式。确认规格后可尽快安排定制生产。本站不公布固定生产天数。',
          ),
        ],
        bullets: [
          L('Factory direct discussion of specifications', '工厂直接沟通规格'),
          L('OEM equipment solutions where the catalogue allows', '目录允许范围内的 OEM 方案'),
        ],
      },
      {
        heading: L('Contact our engineering team', '联系工程团队'),
        paragraphs: [
          L(
            'Open a product category to match a catalogue model, then contact Hebei Pinjin Machinery by WhatsApp or email with quantity and project conditions.',
            '先打开产品分类对照目录机型，再通过 WhatsApp 或邮件向河北品锦机械说明数量与工况。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'how-to-choose-a-reliable-concrete-pump-manufacturer-in-china',
    title: L(
      'How to Choose a Reliable Concrete Pump Manufacturer in China',
      '如何选择可靠的中国混凝土泵厂家',
    ),
    description: L(
      'A practical checklist for choosing a concrete pump manufacturer in China: published specifications, factory photos, customization scope and clear contact channels.',
      '选择中国混凝土泵厂家的实用清单：公开参数、工厂照片、定制范围与明确联系方式。',
    ),
    category: 'product-guide',
    date: '2026-08-15',
    keywords: [
      'concrete pump manufacturer China',
      'china concrete machinery manufacturer',
      'factory direct machinery supplier',
    ],
    relatedProductSlugs: [
      'hbt80-18-140-concrete-pump',
      'll60-75-concrete-pump',
      'hbt45-40-concrete-pump',
    ],
    relatedPaths: [
      { href: '/products/concrete-pumps', label: L('Concrete pump models', '混凝土泵型号') },
      { href: '/product-selection-guide', label: L('Product Selection Guide', '产品选型指南') },
      { href: '/contact', label: L('Contact manufacturer', '联系厂家') },
    ],
    content: [
      {
        heading: L('Start with published specifications', '先看已公布参数'),
        paragraphs: [
          L(
            'A reliable concrete pump manufacturer China listing should show delivery capacity, horizontal and vertical conveying distance, aggregate size and power type. If a page only repeats marketing slogans, ask for the catalogue sheet before comparing price.',
            '可靠的中国混凝土泵厂家页面应列出输送量、水平/垂直输送距离、骨料粒径与动力形式。若页面只有宣传语，比价前应先索取目录参数。',
          ),
        ],
      },
      {
        heading: L('Confirm it is a factory, not only a trading desk', '确认是工厂而非纯贸易窗口'),
        paragraphs: [
          L(
            'Factory photographs of the workshop, assembly area and packing help verify a manufacturing base. Hebei Pinjin Machinery Manufacturing Co., Ltd. publishes real plant photos from Xingtai, Hebei, in the Xingjiawan concrete machinery manufacturing area context, with the factory address at Renze Industrial Park.',
            '车间、装配区与包装照片有助于核实制造基地。河北品锦机械制造有限公司公布河北邢台工厂实拍，地处邢家湾混凝土机械制造集聚区语境，工厂地址为任泽工业园区。',
          ),
        ],
        image: factoryImage('concrete-manufacturing'),
      },
      {
        heading: L('Ask how customization is handled', '问清定制如何落实'),
        paragraphs: [
          L(
            'OEM and project adjustments should be discussed against a listed model. After confirming specifications, customized production can be arranged quickly. Avoid suppliers that promise undocumented performance.',
            'OEM 与项目调整应对照已列机型讨论。确认规格后可尽快安排定制生产。避免承诺未公布性能的供应商。',
          ),
        ],
      },
      {
        heading: L('Use a direct contact path', '使用直接联系渠道'),
        paragraphs: [
          L(
            'Send the model, quantity, conveying distance and aggregate size by WhatsApp or email. Pinjin does not publish fixed online prices because configuration depends on options and shipping terms.',
            '请通过 WhatsApp 或邮件发送型号、数量、输送距离与骨料粒径。品锦不在网站公布固定价格，因为配置取决于选配与贸易条款。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'oem-concrete-machinery-manufacturing-process',
    title: L(
      'OEM Concrete Machinery Manufacturing Process Explained',
      'OEM 混凝土机械制造流程说明',
    ),
    description: L(
      'How a custom concrete equipment manufacturer in Xingtai, Hebei organizes materials, machining, assembly, inspection and factory packing for OEM orders.',
      '河北邢台定制混凝土设备厂家如何组织原材料、机加工、装配、检测与出厂包装以承接 OEM 订单。',
    ),
    category: 'manufacturing-knowledge',
    date: '2026-08-15',
    keywords: [
      'custom concrete equipment manufacturer',
      'OEM machinery manufacturer',
      'china concrete machinery manufacturer',
    ],
    relatedProductSlugs: [
      'diesel-screw-mortar-spraying-machine',
      'hbt30-37-concrete-pump',
      'automatic-plaster-spraying-machine',
    ],
    relatedPaths: [
      {
        href: '/blog/how-we-manufacture-construction-equipment',
        label: L('Factory manufacturing photos', '工厂制造照片'),
      },
      { href: '/about#process', label: L('Manufacturing process', '制造流程') },
      { href: '/contact', label: L('Request OEM discussion', '沟通 OEM') },
    ],
    content: [
      {
        heading: L('What OEM means on a catalogue machine', '目录机型上的 OEM 含义'),
        paragraphs: [
          L(
            'For Hebei Pinjin Machinery, OEM discussion starts from a published model. Engineers review capacity, power type and site constraints. The product catalogue confirms customization support on listed items such as the diesel screw mortar spraying machine; other models are reviewed case by case.',
            '对河北品锦机械而言，OEM 沟通从已公布机型开始。工程师核对产能、动力形式与场地限制。产品目录明确柴油螺杆砂浆喷涂机支持定制，其他型号按项目评估。',
          ),
        ],
      },
      {
        heading: L('From materials to packing', '从原材料到包装'),
        paragraphs: [
          L(
            'The published path is incoming materials, machining, assembly, quality inspection and factory packing in Renze Industrial Park, Xingtai, Hebei. This is the same sequence described in the company profile — not an extra undocumented line.',
            '已公开路径为：原材料、机加工、装配、质量检测，并在河北省邢台市任泽工业园区出厂包装。与企业简介所述顺序一致，并非额外未公布产线。',
          ),
        ],
        image: factoryImage('equipment-assembly'),
        bullets: [
          L('Match incoming materials to catalogue specifications', '原材料按目录参数准备'),
          L('Assemble as a source manufacturer covering R&D, production and sales', '作为集研发、生产与销售一体的源头厂家装配'),
          L('Inspect with the factory testing system before packing', '出厂包装前按工厂检测体系检查'),
        ],
      },
      {
        heading: L('After specifications are confirmed', '规格确认之后'),
        paragraphs: [
          L(
            'After confirming specifications, customized production can be arranged quickly. This site does not state a guaranteed number of days. Buyers should send drawings or duty data so the factory can reply with a feasible configuration.',
            '确认规格后可尽快安排定制生产。本站不承诺固定天数。采购方应提供图纸或工况数据，工厂据此回复可行配置。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'why-factory-direct-concrete-equipment-has-faster-customization',
    title: L(
      'Why Factory Direct Concrete Equipment Has Faster Customization',
      '为何工厂直供混凝土设备定制更快',
    ),
    description: L(
      'Why a factory direct machinery supplier can discuss specification changes faster than a multi-layer trading chain — without unrealistic lead-time guarantees.',
      '工厂直供机械供应商为何比多层贸易链路更快讨论规格调整——不承诺不切实际的交期。',
    ),
    category: 'factory-insights',
    date: '2026-08-15',
    keywords: [
      'factory direct machinery supplier',
      'custom concrete equipment manufacturer',
      'concrete pump manufacturer China',
    ],
    relatedProductSlugs: [
      'hbtt55-50-concrete-pump',
      'll28-32-concrete-pump',
      'type-311-spraying-machine',
    ],
    relatedPaths: [
      { href: '/contact', label: L('Customization', '设备定制') },
      { href: '/products', label: L('All products', '全部产品') },
      { href: '/contact', label: L('Contact factory', '联系工厂') },
    ],
    content: [
      {
        heading: L('Fewer hand-offs between buyer and plant', '采购方与工厂之间环节更少'),
        paragraphs: [
          L(
            'A factory direct machinery supplier can pass capacity, distance and power questions to the same team that builds the machine. Trading-only channels often add extra confirmation steps before the plant sees the request.',
            '工厂直供机械供应商可将产能、距离与动力问题直接交给制造团队。纯贸易渠道往往要多一轮确认，工厂才能看到需求。',
          ),
        ],
      },
      {
        heading: L('What “faster” does and does not mean', '“更快”包含与不包含什么'),
        paragraphs: [
          L(
            'Faster customization here means engineering discussion and production arrangement after specifications are confirmed. It does not mean a published three-day promise; that figure is not stated in Pinjin’s company information.',
            '此处更快是指规格确认后的工程沟通与排产安排。并不表示已公布的三天承诺；品锦企业资料中未写该数字。',
          ),
          L(
            'After confirming specifications, customized production can be arranged quickly. Shipping time still depends on destination and terms, which are confirmed in the quotation.',
            '确认规格后可尽快安排定制生产。运输时间仍取决于目的地与贸易条款，以报价确认为准。',
          ),
        ],
        image: factoryImage('finished-products'),
      },
      {
        heading: L('How to start a factory-direct request', '如何发起工厂直供需求'),
        paragraphs: [
          L(
            'Choose a catalogue model, list the parameters that must change, and contact Hebei Pinjin Machinery Manufacturing Co., Ltd. by WhatsApp or email. The engineering team will reply with a feasible configuration or ask for missing duty data.',
            '选定目录机型，列出必须调整的参数，通过 WhatsApp 或邮件联系河北品锦机械制造有限公司。工程团队将回复可行配置，或补充所需工况数据。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'how-concrete-pumps-work',
    title: L(
      'How Concrete Pumps Work',
      '混凝土泵如何工作',
    ),
    description: L(
      'A plain-language explanation of hopper, pumping unit and pipeline on trailer and transfer pumps built by a concrete pump manufacturer in China.',
      '用通俗语言说明中国混凝土泵厂家拖车泵与输送泵的料斗、泵送单元与管路工作方式。',
    ),
    category: 'product-guide',
    date: '2026-08-15',
    keywords: [
      'how concrete pumps work',
      'concrete pump manufacturer China',
      'concrete machinery manufacturer China',
    ],
    relatedProductSlugs: [
      'hbt80-18-140-concrete-pump',
      'hbt30-37-concrete-pump',
      'll28-32-concrete-pump',
    ],
    relatedPaths: [
      { href: '/products/concrete-pumps', label: L('Concrete pump category', '混凝土泵分类') },
      {
        href: '/blog/how-to-choose-a-concrete-pump',
        label: L('How to choose a concrete pump', '如何选择混凝土泵'),
      },
      { href: '/contact', label: L('Contact engineering team', '联系工程团队') },
    ],
    content: [
      {
        heading: L('Three parts that move the mix', '推动拌合物的三个部分'),
        paragraphs: [
          L(
            'A concrete pump does not “spray” concrete by itself. Catalogue trailer pumps and transfer pumps move a mix from a hopper, through a pumping unit, into a pipeline that reaches the pour point. Matching those three parts to site distance and aggregate size is more useful than comparing model names alone.',
            '混凝土泵本身不是喷浆设备。目录中的拖车泵与输送泵把拌合物从料斗经泵送单元送入管路，到达浇筑点。把这三部分与现场距离、骨料粒径对应起来，比只比较型号名称更有用。',
          ),
        ],
      },
      {
        heading: L('Hopper and feeding', '料斗与上料'),
        paragraphs: [
          L(
            'The hopper receives mixed concrete or mortar. If feeding is uneven or the mix is too dry for the listed aggregate diameter, the pumping unit cannot keep a stable flow. Pinjin product pages list maximum aggregate diameter so buyers can check this before inquiry.',
            '料斗接收已搅拌的混凝土或砂浆。若上料不均匀，或拌合物相对目录列出的骨料粒径过干，泵送单元难以保持稳定流量。品锦产品页列出最大骨料粒径，便于询盘前核对。',
          ),
        ],
      },
      {
        heading: L('Pumping unit and pipeline', '泵送单元与管路'),
        paragraphs: [
          L(
            'The pumping unit creates the pressure that pushes the mix through pipes or hoses. Horizontal conveying distance and vertical conveying height on each Pinjin model are catalogue maxima, not a guarantee for every pipeline layout. Long, high or sharply bent lines need a model with enough listed capacity, then a factory discussion of the actual route.',
            '泵送单元产生压力，把拌合物推过管道或软管。各品锦型号上的水平输送距离与垂直输送高度是目录最大值，不是对每一种管路布置的保证。管路长、扬程高或弯头多时，应先选目录能力足够的型号，再与工厂讨论实际走向。',
          ),
        ],
        bullets: [
          L(
            'High output / long distance: review HBT80-18-140 and LL60-75.',
            '高产量/长距离：重点看 HBT80-18-140 与 LL60-75。',
          ),
          L(
            'Compact secondary-structure work: smaller transfer pumps such as LL28-32.',
            '紧凑的二次结构施工：可看 LL28-32 等小型输送泵。',
          ),
        ],
      },
      {
        heading: L('What to send when you inquire', '询盘时应提供的信息'),
        paragraphs: [
          L(
            'Open the concrete pump category, shortlist a model, then contact the engineering team with pour rate, pipeline length and aggregate size. After specifications are confirmed, customized production can be arranged quickly where the catalogue allows.',
            '打开混凝土泵分类并初选型号，再向工程团队说明浇筑量、管路长度与骨料粒径。确认规格后，可在目录允许范围内尽快安排定制生产。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'concrete-pump-maintenance-guide',
    title: L(
      'Concrete Pump Maintenance Guide',
      '混凝土泵维护指南',
    ),
    description: L(
      'Practical maintenance checks for hopper, pipeline and wear parts on concrete pumps from a China factory — without undocumented service-hour claims.',
      '针对中国工厂混凝土泵料斗、管路与易损件的实用维护检查，不编造未公布的保养小时数。',
    ),
    category: 'product-guide',
    date: '2026-08-15',
    keywords: [
      'concrete pump maintenance',
      'concrete pump manufacturer China',
      'concrete pump factory China',
    ],
    relatedProductSlugs: [
      'hbt45-40-concrete-pump',
      'hbtt55-50-concrete-pump',
      'hbt80-18-140-concrete-pump',
    ],
    relatedPaths: [
      { href: '/products/concrete-pumps', label: L('Concrete pump models', '混凝土泵型号') },
      {
        href: '/blog/how-concrete-pumps-work',
        label: L('How concrete pumps work', '混凝土泵如何工作'),
      },
      { href: '/contact', label: L('Request wear-part advice', '咨询易损件') },
    ],
    content: [
      {
        heading: L('Clean the hopper and pipeline after use', '使用后清理料斗与管路'),
        paragraphs: [
          L(
            'Leftover mix that hardens in the hopper or pipeline is a common cause of blocked conveying. Flush according to the mix type and the hose or pipe diameter used on site. This guide does not replace the operating instructions supplied with a specific machine.',
            '料斗或管路中残留拌合物硬化，是堵塞的常见原因。应按现场拌合物类型与管径冲洗。本指南不能替代随机提供的操作说明。',
          ),
        ],
      },
      {
        heading: L('Watch wear parts, not marketing intervals', '关注易损件，而不是宣传保养周期'),
        paragraphs: [
          L(
            'Seals, cutting rings, pipes and hopper grate parts wear at different rates depending on aggregate and daily output. Hebei Pinjin Machinery does not publish a single service-hour number that fits every project. Inspect parts against the catalogue model you purchased, then ask the factory which replacements match that model.',
            '密封、切割环、管道与料斗格栅的磨损速度取决于骨料与日产量。河北品锦机械不公布适用于所有项目的单一保养小时数。请按所购目录机型检查零件，再向工厂确认对应易损件。',
          ),
        ],
        bullets: [
          L('Check pipeline joints before a long pour', '长距离浇筑前检查管路接头'),
          L('Keep the hopper grate in place during feeding', '上料时保持料斗格栅就位'),
          L('Record the model name when ordering spare parts', '订购备件时写明型号名称'),
        ],
      },
      {
        heading: L('Power unit and site conditions', '动力单元与现场条件'),
        paragraphs: [
          L(
            'Diesel and electric pumps need different site support. Unstable voltage or poor fuel quality can stop a pour even when the pumping unit is in good condition. Match power type on the product page before blaming the pump for downtime.',
            '柴油泵与电机泵需要不同的现场保障。电压不稳或燃油质量差，即使泵送单元状态正常也可能中断浇筑。停机前先核对产品页上的动力形式。',
          ),
        ],
      },
      {
        heading: L('When to contact the factory', '何时联系工厂'),
        paragraphs: [
          L(
            'If wear is faster than expected, send the model name, conveying distance and aggregate size to the engineering team. They can point to the matching catalogue machine and discuss whether a configuration change is needed. After confirming specifications, customized production can be arranged quickly where listed.',
            '若磨损快于预期，请把型号、输送距离与骨料粒径发给工程团队。他们可对应目录机型，并讨论是否需要调整配置。确认规格后，可在目录标明范围内尽快安排定制生产。',
          ),
        ],
      },
    ],
  },
];

function allBlogPosts(): BlogPost[] {
  return [...blogPosts, ...knowledgeArticles];
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return allBlogPosts().find((post) => post.slug === slug);
}

export function getBlogPosts(): BlogPost[] {
  return allBlogPosts().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogCover(post: BlogPost) {
  const found = post.content.find((section) => section.image)?.image;
  if (found) return found;
  return factoryImage('factory-building');
}
