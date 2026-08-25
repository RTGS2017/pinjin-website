import type { BlogPost } from '@/data/blog';
import { getFactorySlide } from '@/data/factory';
import type { LocalizedText } from '@/i18n/types';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

function articleImage(id: string, altEn: string, altZh: string) {
  const slide = getFactorySlide(id);
  if (!slide) {
    throw new Error(`Missing factory slide: ${id}`);
  }
  return {
    src: slide.image,
    alt: L(altEn, altZh),
    caption: slide.title,
  };
}

/**
 * 知识中心第一批行业文（并入 getBlogPosts）。
 * 正文按目录与工厂事实写；不虚构搅拌站、车载臂架泵产品线、认证或客户业绩。
 */
export const knowledgeArticles: BlogPost[] = [
  {
    slug: 'what-is-a-concrete-pump',
    title: L(
      'What Is a Concrete Pump and How Does It Work?',
      '什么是混凝土泵？它如何工作？',
    ),
    seoTitle: L(
      'What Is a Concrete Pump | Concrete Pump Manufacturer Guide | Pinjin',
      '什么是混凝土泵 | 混凝土泵厂家说明 | 品锦',
    ),
    description: L(
      'Learn what a concrete pump is, how pipeline pumping works, and how to shortlist a concrete pump manufacturer using catalogue capacity and conveying distance.',
      '说明混凝土泵是什么、管道泵送如何工作，以及如何按目录输送量与输送距离对照混凝土泵厂家机型。',
    ),
    category: 'product-guide',
    date: '2026-08-25',
    keywords: [
      'concrete pump manufacturer',
      'what is a concrete pump',
      'concrete pump supplier',
      'construction equipment',
    ],
    relatedProductSlugs: [
      'hbt80-18-140-concrete-pump',
      'hbt30-37-concrete-pump',
      'diesel-4100-transfer-pump',
    ],
    relatedPaths: [
      {
        href: '/products/concrete-pumps',
        label: L('Concrete pump manufacturer catalogue', '混凝土泵厂家目录'),
      },
      {
        href: '/product-selection-guide',
        label: L('Concrete pump selection guide', '混凝土泵选型指南'),
      },
      { href: '/factory', label: L('Xingtai concrete pump factory', '邢台混凝土泵工厂') },
    ],
    faqs: [
      {
        question: L('What is a concrete pump?', '什么是混凝土泵？'),
        answer: L(
          'A concrete pump is construction equipment that moves mixed concrete through a pipeline from the hopper to the pour location. Horizontal and vertical distance depend on the published catalogue of each model.',
          '混凝土泵是把已拌混凝土从料斗经管道送到浇筑点的施工设备。水平和垂直输送距离以各型号目录参数为准。',
        ),
      },
      {
        question: L(
          'How does a trailer concrete pump work?',
          '拖式混凝土泵如何工作？',
        ),
        answer: L(
          'Fresh concrete enters the hopper. A hydraulic system drives the cylinders, which push concrete through pipes and hoses to the placement point. Operators control the pipeline layout rather than a truck-mounted boom.',
          '新拌混凝土进入料斗，液压系统驱动缸体把混凝土经管道送到浇筑点。拖式泵通过管路布置浇筑，而不是车载臂架。',
        ),
      },
      {
        question: L(
          'Does Pinjin manufacture concrete pumps in China?',
          '品锦是否在中国制造混凝土泵？',
        ),
        answer: L(
          'Hebei Pinjin Machinery manufactures trailer and transfer concrete pumps in Xingtai, Hebei. Compare published capacity, conveying distance and aggregate size on the product pages, then request a quotation.',
          '河北品锦机械在河北邢台制造拖式与输送混凝土泵。请对照产品页公布的输送量、输送距离与骨料粒径后再询价。',
        ),
      },
    ],
    content: [
      {
        heading: L('Introduction', '引言'),
        paragraphs: [
          L(
            'In construction, how concrete is moved and placed affects both pour quality and programme. Manual or crane-and-bucket methods often slow down when the pour point is high, far, or hard to access — for example floors of a building, a bridge deck, a tunnel lining or a large foundation.',
            '施工中，混凝土如何输送与浇筑会影响浇筑质量与工期。当浇筑点较高、较远或人工难以到达时，人工或吊斗方式往往会变慢，例如楼层、桥面、隧道衬砌或大体积基础。',
          ),
          L(
            'A concrete pump moves mixed concrete through a pipeline and places it at the required point. This article explains what a concrete pump is, how the pumping cycle works, and which catalogue figures to check when you contact a concrete pump manufacturer or supplier.',
            '混凝土泵把已拌混凝土经管道送到指定位置。本文说明混凝土泵是什么、泵送循环如何工作，以及联系混凝土泵厂家或供应商时应对照哪些目录参数。',
          ),
        ],
        image: articleImage(
          'concrete-manufacturing',
          'Concrete pump manufacturer at Hebei Pinjin Machinery factory in Xingtai China',
          '中国邢台品锦机械工厂的混凝土泵制造现场',
        ),
      },
      {
        heading: L('What is a concrete pump?', '什么是混凝土泵？'),
        paragraphs: [
          L(
            'A concrete pump is a construction machine that receives liquid concrete in a hopper and pushes it through pipes to the pour location. Unlike a mixer truck that only delivers to a nearby chute, a pump can send concrete along a pipeline for the horizontal and vertical distances listed in that model’s catalogue.',
            '混凝土泵是把液态混凝土收入料斗、再经管道压送到浇筑点的施工机械。与仅能在近处溜槽卸料的搅拌车不同，泵可按该型号目录列出的水平和垂直距离沿管路输送。',
          ),
          L(
            'Hebei Pinjin Machinery is a concrete pump manufacturer in Xingtai, Hebei, China. The published catalogue covers trailer pumps and compact transfer pumps with listed delivery capacity, conveying distance, power type and maximum aggregate diameter. Those tables — not marketing adjectives — are the basis for selection.',
            '河北品锦机械是中国河北邢台的混凝土泵厂家。目录覆盖拖式泵与紧凑输送泵，并公布输送量、输送距离、动力形式与最大骨料粒径。选型应以这些参数表为依据，而不是营销形容词。',
          ),
        ],
        bullets: [
          L('Residential and commercial building pours', '住宅与商业建筑浇筑'),
          L('Bridges and other infrastructure decks', '桥梁及其他基建桥面'),
          L('Tunnels and underground structures where pipeline access exists', '具备管路条件的隧道与地下结构'),
          L('High-rise floors within the listed vertical conveying height', '目录垂直输送高度范围内的高层楼层'),
        ],
      },
      {
        heading: L('How does a concrete pump work?', '混凝土泵如何工作？'),
        paragraphs: [
          L(
            'The cycle is the same in principle for trailer and transfer pumps listed by Pinjin.',
            '品锦目录中的拖式泵与输送泵，工作循环原理相同。',
          ),
        ],
        bullets: [
          L(
            'Feeding: fresh concrete is placed in the hopper. Workability must match what the pipeline and valves can pass; oversize aggregate or a mix that is too stiff can block the line.',
            '进料：新拌混凝土进入料斗。和易性须能通过管路与阀体；骨料过大或过干都可能堵管。',
          ),
          L(
            'Pumping: the hydraulic system drives the cylinders, which create the pressure that moves concrete into the delivery line.',
            '泵送：液压系统驱动缸体，产生把混凝土推入输送管的压力。',
          ),
          L(
            'Pipeline transport: pipes and hoses carry the concrete to the pour point. Actual distance is limited by the model’s published horizontal and vertical figures, plus on-site pipe layout.',
            '管路输送：管道把混凝土送到浇筑点。实际距离受型号公布的水平/垂直参数以及现场布管限制。',
          ),
          L(
            'Placement: the crew directs the end of the line. Pinjin’s catalogue models are trailer or transfer pumps; they do not include a truck-mounted placing boom.',
            '浇筑：现场引导管口落点。品锦目录机型为拖式或输送泵，不含车载布料臂。',
          ),
        ],
      },
      {
        heading: L('Main components', '主要组成'),
        paragraphs: [
          L(
            'A typical trailer or transfer concrete pump includes a hopper, hydraulic pumping system, pumping cylinders, delivery pipeline connections, controls, and a diesel or electric power unit as listed for that model. Each published specification (capacity, pressure-related conveying distance, motor or engine rating) belongs to a specific machine — compare the product page, not a generic industry brochure.',
            '典型拖式或输送混凝土泵包括料斗、液压泵送系统、泵送缸、管路接口、控制系统，以及该型号标明的柴油或电机动力。输送量、与压力相关的输送距离、电机或发动机功率都属于具体机型——请对照产品页，而不是笼统的行业宣传册。',
          ),
        ],
        image: articleImage(
          'trailer-assembly',
          'Concrete pump manufacturer assembling a trailer concrete pump in Xingtai China',
          '中国邢台混凝土泵厂家装配拖式混凝土泵',
        ),
      },
      {
        heading: L('Why contractors use concrete pumps', '承包商为何使用混凝土泵'),
        paragraphs: [
          L(
            'Pipeline pumping reduces repeated manual handling and can keep a pour continuous when the site layout matches the machine’s listed capacity and distance. Better access to elevated or distant points is the main practical gain. Quality still depends on mix design, pipe cleanliness and operator practice — the pump does not replace those.',
            '管路泵送可减少反复人工搬运；当现场布置与机型目录输送量、距离匹配时，浇筑可以更连续。主要实际收益是把混凝土送到较高或较远的点。质量仍取决于配合比、管路清洁与操作，泵不能替代这些。',
          ),
        ],
      },
      {
        heading: L('How to choose a concrete pump', '如何选择混凝土泵'),
        paragraphs: [
          L(
            'Shortlist from the job, then the catalogue: required output (m³/h), horizontal and vertical conveying distance, maximum aggregate diameter, diesel or electric power, and whether the site can handle the machine weight and dimensions. Open the concrete pump category, compare models such as compact transfer pumps and larger HBT/LL/HBTT trailer pumps, then send pour rate and pipeline layout to the factory.',
            '先看工况再看目录：所需输送量（m³/h）、水平与垂直输送距离、最大骨料粒径、柴油或电机、以及现场能否容纳整机重量与外形。打开混凝土泵分类，对比紧凑输送泵与较大的 HBT/LL/HBTT 拖式泵，再把浇筑量与管路布置发给工厂。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'concrete-pump-types',
    title: L(
      'Concrete Pump Types: How to Choose the Right Concrete Pump for Your Project',
      '混凝土泵类型：如何为工程选择合适的混凝土泵',
    ),
    seoTitle: L(
      'Boom Pump vs Trailer Pump | Concrete Pump Supplier Guide | Pinjin',
      '车载泵与拖式泵 | 混凝土泵供应商选型 | 品锦',
    ),
    description: L(
      'Compare boom pumps and trailer pumps, then shortlist a concrete pump supplier using project size, pipeline distance and Pinjin’s published trailer and transfer pump catalogue.',
      '对比车载臂架泵与拖式泵，再按工程规模、管路距离与品锦已公布的拖式/输送泵目录选型。',
    ),
    category: 'product-guide',
    date: '2026-08-25',
    keywords: [
      'concrete pump supplier',
      'trailer concrete pump',
      'boom pump vs trailer pump',
      'concrete pump manufacturer',
    ],
    relatedProductSlugs: [
      'll15-diesel-transfer-pump',
      'hbt45-40-concrete-pump',
      'hbtt55-50-concrete-pump',
    ],
    relatedPaths: [
      {
        href: '/products/concrete-pumps',
        label: L('Trailer and transfer concrete pumps', '拖式与输送混凝土泵'),
      },
      {
        href: '/blog/what-is-a-concrete-pump',
        label: L('What is a concrete pump and how it works', '什么是混凝土泵及工作原理'),
      },
      {
        href: '/product-selection-guide',
        label: L('Product selection guide', '产品选型指南'),
      },
    ],
    faqs: [
      {
        question: L(
          'What is the difference between a boom pump and a trailer pump?',
          '车载臂架泵和拖式泵有什么区别？',
        ),
        answer: L(
          'A boom pump is usually truck-mounted with an articulated placing boom. A trailer pump is towed or moved on site and uses a delivery pipeline. Pinjin’s published catalogue lists trailer and transfer pumps, not boom pumps.',
          '车载臂架泵通常装在汽车底盘上并带折叠布料臂。拖式泵在现场拖行或移位，依靠输送管路。品锦已公布目录为拖式与输送泵，不含臂架泵。',
        ),
      },
      {
        question: L(
          'Which concrete pump type does Pinjin supply?',
          '品锦供应哪类混凝土泵？',
        ),
        answer: L(
          'Pinjin supplies trailer concrete pumps and compact transfer pumps with listed capacity, conveying distance and power type. If a project needs a truck-mounted boom, that is a different machine family not listed on this site.',
          '品锦供应拖式混凝土泵与紧凑输送泵，并公布输送量、输送距离与动力形式。若工程需要车载臂架泵，那是本站未列出的另一类设备。',
        ),
      },
      {
        question: L(
          'How should a contractor choose a trailer pump?',
          '承包商应如何选择拖式泵？',
        ),
        answer: L(
          'Match listed theoretical capacity, horizontal and vertical conveying distance, aggregate diameter and diesel or electric power to the pour. Then request a quotation with pipeline length and output.',
          '把目录中的理论输送量、水平与垂直输送距离、骨料粒径、柴油或电机与浇筑任务对照，再带管路长度与产量询价。',
        ),
      },
    ],
    content: [
      {
        heading: L('Introduction', '引言'),
        paragraphs: [
          L(
            'Concrete pumps are built in more than one layout. Choosing a type that matches access, pour size and pipeline length helps avoid over-buying or under-reaching. Industry practice usually groups machines into boom pumps and trailer (line) pumps. A concrete pump supplier should state which group they actually manufacture.',
            '混凝土泵有多种布置。按进场条件、浇筑量和管路长度选型，可避免买大或买不够。行业上常分成臂架泵与拖式（管路）泵。混凝土泵供应商应说明自己实际制造哪一类。',
          ),
          L(
            'Hebei Pinjin Machinery is a concrete pump manufacturer in Xingtai whose catalogue covers trailer pumps and transfer pumps. The comparison below is for orientation; only listed Pinjin models are offered on this website.',
            '河北品锦机械是邢台的混凝土泵厂家，目录覆盖拖式泵与输送泵。下文对比仅作行业对照；本站只提供已列出的品锦型号。',
          ),
        ],
        image: articleImage(
          'trailer-assembly',
          'Concrete pump supplier assembling trailer concrete pumps in Xingtai China',
          '中国邢台混凝土泵供应商装配拖式混凝土泵',
        ),
      },
      {
        heading: L('Boom concrete pump', '车载臂架混凝土泵'),
        paragraphs: [
          L(
            'A boom pump is typically mounted on a truck chassis with a hydraulic placing boom. It is used when the site needs rapid relocation and aerial placement without assembling a long pipeline. Purchase, licensing and road access costs are usually higher. Pinjin does not list boom pumps in the current catalogue.',
            '臂架泵通常装在汽车底盘上，带液压布料臂。适合需要快速移位、且不想铺长管路的现场。购置、牌照与道路条件成本通常更高。品锦当前目录未列出臂架泵。',
          ),
        ],
        bullets: [
          L('Typical use: large commercial buildings, bridges, high-rise pours with boom reach', '常见用途：大型商业建筑、桥梁、臂架覆盖范围内的高层浇筑'),
          L('Placement is fast when the boom can cover the pour', '臂架能覆盖浇筑面时落料较快'),
        ],
      },
      {
        heading: L('Trailer concrete pump', '拖式混凝土泵'),
        paragraphs: [
          L(
            'A trailer pump is moved on site and connected to a delivery pipeline. It is the layout used for Pinjin’s HBT, LL, HBTT and similar catalogue models. Compact transfer pumps in the same family suit shorter secondary-structure or fine-stone placement where listed distances are smaller.',
            '拖式泵在现场移动并连接输送管。品锦 HBT、LL、HBTT 等目录机型即为此类。同系列紧凑输送泵适合目录距离较短的二次结构或细石浇筑。',
          ),
        ],
        bullets: [
          L('Can be towed or spotted where a mixer can feed the hopper', '可拖行或停在搅拌车能喂料斗的位置'),
          L('Investment is usually lower than a boom truck', '投资通常低于臂架车'),
          L('Long-distance work depends on listed horizontal conveying and pipe setup', '长距离作业取决于目录水平输送距离与布管'),
        ],
      },
      {
        heading: L('Boom pump vs trailer pump', '臂架泵与拖式泵对比'),
        paragraphs: [
          L(
            'Mobility: boom units travel as a truck; trailer pumps are portable line pumps. Application: boom units often serve large, open pours; trailer pumps serve many sites that can run a pipeline. Setup: boom placement can start after unfolding the arm; trailer pumps need pipe assembly. Cost: boom packages are typically higher; trailer pumps are the more economical line for many small and medium contractors.',
            '机动性：臂架机组随车行驶；拖式泵是可移动的管路泵。应用：臂架常用于大型开阔浇筑；拖式泵适合能布管的多种现场。就位：臂架展开后即可布料；拖式泵需要接管。成本：臂架成套通常更高；对许多中小承包商，拖式泵更经济。',
          ),
        ],
      },
      {
        heading: L('How to select a pump for the project', '如何为工程选型'),
        paragraphs: [
          L(
            'Project size and access decide the family (boom vs trailer). Pipeline length and height decide pressure-related conveying — read the product table, not a generic “long distance” claim. Budget and licensing often push smaller contractors toward trailer pumps. For Pinjin machines, open the concrete pump category, compare listed m³/h and conveying figures, then contact the factory with pour rate and pipe layout.',
            '工程规模与进场条件决定大类（臂架还是拖式）。管路长度与高度决定与压力相关的输送能力——请读产品表，而不是笼统的“长距离”说法。预算与牌照常使较小承包商倾向拖式泵。品锦机型请打开混凝土泵分类，对照已公布的 m³/h 与输送参数，再把浇筑量与布管发给工厂。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'concrete-pump-maintenance-guide',
    title: L(
      'Concrete Pump Maintenance Guide: How to Extend Equipment Service Life',
      '混凝土泵维护指南：如何延长设备使用寿命',
    ),
    seoTitle: L(
      'Concrete Pump Maintenance Guide | Construction Equipment | Pinjin',
      '混凝土泵维护指南 | 工程设备 | 品锦',
    ),
    description: L(
      'Practical concrete pump maintenance: clean pipelines after pours, check hydraulics and wear parts, and keep mix quality within what the machine can pump.',
      '混凝土泵维护要点：浇筑后清洗管路、检查液压与易损件，并使配合比处于设备可泵送范围。',
    ),
    category: 'manufacturing-knowledge',
    date: '2026-08-25',
    keywords: [
      'concrete pump maintenance',
      'construction equipment',
      'concrete pump manufacturer',
    ],
    relatedProductSlugs: [
      'zs22-25-concrete-pump',
      'll60-75-concrete-pump',
      '4102-diesel-four-cylinder-inclined-pump',
    ],
    relatedPaths: [
      {
        href: '/products/concrete-pumps',
        label: L('Concrete pump product list', '混凝土泵产品列表'),
      },
      { href: '/factory', label: L('Xingtai manufacturing factory', '邢台制造工厂') },
      { href: '/faq', label: L('Concrete pump FAQ', '混凝土泵常见问题') },
    ],
    faqs: [
      {
        question: L(
          'Why must a concrete pump be cleaned after each pour?',
          '为什么每次浇筑后都要清洗混凝土泵？',
        ),
        answer: L(
          'Residue hardens in pipes, hoppers and valves. Cleaning the delivery line and checking seals after operation reduces blockage and wear on the next pour.',
          '残留混凝土会在管道、料斗和阀体里硬化。作业后清洗输送管并检查密封，可减少下次堵管与磨损。',
        ),
      },
      {
        question: L(
          'Which parts wear fastest on a trailer concrete pump?',
          '拖式混凝土泵哪些部位磨损最快？',
        ),
        answer: L(
          'Wear plates, cutting rings, pistons and pipeline joints take abrasive flow. Inspect them on a schedule and replace when worn — do not wait for a sudden leak or loss of pressure.',
          '眼镜板、切割环、活塞和管路接头承受磨料流。应按计划检查，磨损后更换，不要等到突然泄漏或失压。',
        ),
      },
      {
        question: L(
          'Can mix design affect pump life?',
          '配合比会影响泵的寿命吗？',
        ),
        answer: L(
          'Yes. A mix that is too harsh, too dry or oversized for the listed maximum aggregate diameter increases blockage risk and component wear. Stay within the figures published for that model.',
          '会。过干、过糙或超过该型号最大骨料粒径的拌合物会增加堵管和零件磨损。请控制在该型号公布的参数范围内。',
        ),
      },
    ],
    content: [
      {
        heading: L('Introduction', '引言'),
        paragraphs: [
          L(
            'A concrete pump only stays reliable if it is cleaned and inspected. Blocked pipes, dirty oil or worn cutting parts cause downtime in the middle of a pour. This guide lists maintenance that operators can do around each job, plus what to ask a concrete pump manufacturer when you need parts.',
            '混凝土泵只有清洗和检查到位才可靠。堵管、油脏或切割件磨损会在浇筑中途停机。本指南列出每班可做的维护，以及需要配件时向混凝土泵厂家询问什么。',
          ),
        ],
        image: articleImage(
          'equipment-assembly',
          'Construction equipment assembly area at a concrete pump manufacturer in Xingtai',
          '邢台混凝土泵厂家的工程设备装配区',
        ),
      },
      {
        heading: L('1. Clean the pump after every operation', '1. 每次作业后清洗泵送系统'),
        paragraphs: [
          L(
            'Concrete left in the line sets hard. After pumping, clean delivery pipelines, empty the hopper of leftover mix, and check valves and seals for packed residue. Do this before the next shift, not after a weekend delay.',
            '留在管路里的混凝土会硬化。泵送结束后清洗输送管，清空料斗余料，并检查阀体与密封是否夹渣。应在下一班前完成，不要拖过周末。',
          ),
        ],
      },
      {
        heading: L('2. Check the hydraulic system', '2. 检查液压系统'),
        paragraphs: [
          L(
            'Hydraulics drive the cylinders. On a regular interval check oil level, oil condition, hoses and cylinder movement. Follow the schedule in the machine documents for that model; this site does not publish a generic hour interval that would replace those documents.',
            '液压驱动缸体。定期检查油位、油质、胶管和缸体动作。间隔以该型号随车文件为准；本站不另写一套可替代说明书的通用小时数。',
          ),
        ],
      },
      {
        heading: L('3. Inspect wear parts', '3. 检查易损件'),
        paragraphs: [
          L(
            'Pumping abrasive concrete wears plates, cutting rings, pistons and pipe joints. Inspect them, keep spare wear parts for the model you run, and request replacements from the factory using the exact model name.',
            '泵送磨蚀性混凝土会磨损眼镜板、切割环、活塞和管接头。检查这些零件，为在用型号备齐易损件，并向工厂提供准确型号名称索取更换件。',
          ),
        ],
        bullets: [
          L('Wear plates and cutting rings', '眼镜板与切割环'),
          L('Pistons and seals', '活塞与密封'),
          L('Pipeline clamps and elbows', '管路卡箍与弯头'),
        ],
      },
      {
        heading: L('4. Keep concrete within what the pump can handle', '4. 混凝土须在泵可输送范围内'),
        paragraphs: [
          L(
            'Poor mix design causes blockage, slow output and extra wear. Stay within the maximum aggregate diameter and workability the catalogue lists for that pump. If a pour needs a different mix, ask the factory whether that model is still suitable — do not assume.',
            '配合比不当会导致堵管、产量下降和额外磨损。骨料粒径与和易性须落在该泵目录范围内。若浇筑需要另一种拌合物，应询问工厂该型号是否仍适用，不要自行假设。',
          ),
        ],
      },
      {
        heading: L('5. Use the manufacturer’s documents', '5. 使用厂家随车文件'),
        paragraphs: [
          L(
            'Pinjin provides model-specific parameters on each product page. For lubrication points, torque and replacement intervals, use the documents supplied with the machine. Send the model name, conveying distance and aggregate size when you ask for service advice.',
            '品锦在各产品页公布该型号参数。润滑点、扭矩与更换周期以随车文件为准。咨询维护时请提供型号、输送距离与骨料粒径。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'shotcrete-machine-working-principle',
    title: L(
      'Shotcrete Machine: Working Principle, Applications, and Benefits',
      '喷浆机：工作原理、应用与作用',
    ),
    seoTitle: L(
      'Shotcrete Machine Guide | Spraying Equipment Manufacturer | Pinjin',
      '喷浆机说明 | 喷涂设备厂家 | 品锦',
    ),
    description: L(
      'How a shotcrete machine sprays concrete or mortar, where it is used, and how to match Pinjin’s listed spraying machines to pressure, flow and distance.',
      '喷浆机如何喷射混凝土或砂浆、常用场合，以及如何按压力、流量与距离对照品锦已列出的喷涂机。',
    ),
    category: 'application-solutions',
    date: '2026-08-25',
    keywords: [
      'shotcrete machine',
      'concrete spraying machine',
      'construction equipment',
    ],
    relatedProductSlugs: [
      'concrete-spraying-machine',
      'diesel-screw-mortar-spraying-machine',
      'type-511-spraying-machine',
    ],
    relatedPaths: [
      {
        href: '/products/spraying-machines',
        label: L('Shotcrete and spraying machine catalogue', '喷浆与喷涂设备目录'),
      },
      {
        href: '/solutions/spraying',
        label: L('Spraying applications', '喷涂应用场景'),
      },
      {
        href: '/product-selection-guide',
        label: L('Equipment selection guide', '设备选型指南'),
      },
    ],
    faqs: [
      {
        question: L('What is a shotcrete machine?', '什么是喷浆机？'),
        answer: L(
          'A shotcrete or concrete spraying machine transports a mix through a pipeline and uses compressed air to spray it onto a surface at high speed. It is used where formwork pouring is slow or impractical, such as some tunnel linings, slopes and repair patches.',
          '喷浆或混凝土喷涂机把拌合物经管道输送，再用压缩空气高速喷到作业面。适用于支模浇筑慢或不便的场合，例如部分隧道衬砌、边坡和修补。',
        ),
      },
      {
        question: L(
          'Does Pinjin list a shotcrete machine?',
          '品锦目录是否有喷浆机？',
        ),
        answer: L(
          'Yes. The spraying category includes a concrete spraying machine with published capacity, outlet pressure and rebound figures, plus mortar and plaster spraying models. Open the spraying machines page and compare the tables.',
          '有。喷涂分类中有公布产能、出口压力与回弹数据的混凝土喷浆机，以及砂浆、石膏喷涂机型。请打开喷涂设备页对照参数表。',
        ),
      },
      {
        question: L(
          'Is shotcrete the same as a concrete pump?',
          '喷浆和混凝土泵是一回事吗？',
        ),
        answer: L(
          'No. A concrete pump places concrete through a pipeline into formwork or a slab. A shotcrete machine sprays material onto a surface. Choose from the matching catalogue category.',
          '不是。混凝土泵把混凝土经管道打入模板或板面；喷浆机把材料喷到作业面。请按对应目录分类选型。',
        ),
      },
    ],
    content: [
      {
        heading: L('Introduction', '引言'),
        paragraphs: [
          L(
            'Shotcrete is a way to apply concrete or mortar by spraying it at high speed onto a surface. It is common in tunnels, slope protection, underground works and some repair jobs where traditional formwork is slow. A shotcrete machine (concrete spraying machine) is the equipment that feeds, conveys and sprays that mix.',
            '喷浆是把混凝土或砂浆高速喷到作业面的施工方法。常见于隧道、边坡防护、地下工程和部分修补，这些场合传统支模较慢。喷浆机（混凝土喷涂机）负责进料、输送与喷射。',
          ),
        ],
        image: articleImage(
          'finished-products',
          'Shotcrete machine and construction equipment at a China spraying equipment manufacturer',
          '中国喷涂设备厂家的喷浆机与工程设备成品',
        ),
      },
      {
        heading: L('What is a shotcrete machine?', '什么是喷浆机？'),
        paragraphs: [
          L(
            'A shotcrete machine transports a concrete or mortar mix and uses compressed air to accelerate it through a nozzle onto the target. It can cover vertical and overhead surfaces that are hard to pour. Pinjin’s catalogue lists a concrete spraying machine with published maximum capacity, outlet pressure and rebound, plus mortar and plaster spraying machines with their own flow and distance figures.',
            '喷浆机输送混凝土或砂浆拌合物，并用压缩空气经喷头加速喷到目标面，可覆盖不易浇筑的立面和顶面。品锦目录列出公布最大产能、出口压力与回弹的混凝土喷浆机，以及各有流量与距离参数的砂浆、石膏喷涂机。',
          ),
        ],
      },
      {
        heading: L('How does a shotcrete machine work?', '喷浆机如何工作？'),
        paragraphs: [
          L(
            'The sequence is: mix enters the hopper; the machine moves it through a pipeline; compressed air sprays it onto the surface; the layer builds up as the nozzle is moved. Exact pressure, flow and distance are those printed for the model — for example the concrete spraying machine page lists capacity, outlet pressure and rebound. Do not copy another brand’s figures onto Pinjin equipment.',
            '顺序是：拌合物进入料斗；机器经管道输送；压缩空气喷到作业面；移动喷头形成喷层。压力、流量与距离以该型号公布值为准——例如混凝土喷浆机页列出产能、出口压力与回弹。不要把其他品牌的数字套到品锦设备上。',
          ),
        ],
        bullets: [
          L('Material feeding into the hopper', '拌合物进入料斗'),
          L('Pipeline transport', '管路输送'),
          L('Air-assisted spraying at the nozzle', '喷头处压缩空气喷射'),
          L('Layer build-up on the surface', '作业面成层'),
        ],
      },
      {
        heading: L('Where shotcrete is used', '喷浆用在哪些场合'),
        paragraphs: [
          L(
            'Typical jobs include tunnel lining, slope protection, underground structures, pools and repair patches. Pinjin does not publish a separate mining-only product line; if a tunnel or slope job matches a listed spraying model’s pressure, flow and distance, use that table. Open spraying applications and the spraying machines category to compare.',
            '常见作业包括隧道衬砌、边坡防护、地下结构、水池和修补。品锦未单独发布矿山专用产品线；若隧道或边坡工况落在已列喷涂机型的压力、流量与距离内，就用该表。请打开喷涂应用与喷涂设备分类对照。',
          ),
        ],
      },
      {
        heading: L('Practical benefits', '实际作用'),
        paragraphs: [
          L(
            'Spraying can cover a surface faster than building full formwork for every face. Many jobs need less mould work. Bond depends on surface preparation and nozzle technique as much as on machine pressure. Select from listed models (concrete spraying, mortar screw spraying, plaster spraying, plunger spraying) rather than a generic “shotcrete” label.',
            '喷射覆盖作业面往往比每一面都支模更快，许多场合模具更少。粘结既取决于表面处理和喷头手法，也取决于机压。请从已列机型（混凝土喷浆、砂浆螺杆喷涂、石膏喷涂、柱塞喷涂）中选，而不是只用笼统的“喷浆”名称。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'choose-construction-equipment-suppliers-from-china',
    title: L(
      'How to Choose Reliable Construction Equipment Suppliers from China',
      '如何选择可靠的中国工程设备供应商',
    ),
    seoTitle: L(
      'China Construction Equipment Supplier Checklist | Concrete Pump Manufacturer | Pinjin',
      '中国工程设备供应商核查清单 | 混凝土泵厂家 | 品锦',
    ),
    description: L(
      'A buyer checklist for Chinese construction equipment suppliers: published specifications, factory location, product range and export communication — without invented certificates or client lists.',
      '采购中国工程设备供应商的核查清单：已公布参数、工厂地址、产品范围与出口沟通——不编造证书或客户名单。',
    ),
    category: 'industry-guide',
    date: '2026-08-25',
    keywords: [
      'construction equipment',
      'concrete pump manufacturer',
      'concrete pump supplier',
      'rebar processing equipment',
      'shotcrete machine',
    ],
    relatedProductSlugs: [
      'hbt80-18-140-concrete-pump',
      'concrete-spraying-machine',
      'cnc-steel-bar-bending-machine',
    ],
    relatedPaths: [
      { href: '/products', label: L('Construction equipment catalogue', '工程设备目录') },
      {
        href: '/products/rebar-equipment',
        label: L('Rebar processing equipment', '钢筋加工设备'),
      },
      { href: '/factory', label: L('Visit the Xingtai factory page', '查看邢台工厂页') },
      {
        href: '/products/custom-machinery',
        label: L('OEM custom machinery', 'OEM 定制机械'),
      },
    ],
    faqs: [
      {
        question: L(
          'What should overseas buyers check with a China concrete pump manufacturer?',
          '海外买家应向中国混凝土泵厂家核对什么？',
        ),
        answer: L(
          'Ask for the legal factory address, published model tables (capacity, distance, power), and how to request a quotation. Do not rely on unspecified “certificates” or unnamed export countries unless the factory can show the actual documents.',
          '询问法定厂址、已公布的型号表（输送量、距离、动力）以及如何询价。不要依赖未出示的“证书”或未点名的出口国，除非工厂能提供相应文件。',
        ),
      },
      {
        question: L(
          'Where is Pinjin’s factory?',
          '品锦工厂在哪里？',
        ),
        answer: L(
          'Hebei Pinjin Machinery Manufacturing Co., Ltd. is at Renze Industrial Park, Xingtai, Hebei, China, in the Xingjiawan concrete machinery manufacturing area context. The factory page shows production photos and the published process.',
          '河北品锦机械制造有限公司位于中国河北省邢台市任泽工业园区，地处邢家湾混凝土机械制造集聚区语境。工厂页提供生产照片与已公布流程。',
        ),
      },
      {
        question: L(
          'What product groups does Pinjin list?',
          '品锦目录有哪些产品组？',
        ),
        answer: L(
          'The site lists concrete pumps (trailer and transfer), spraying machines including a shotcrete / concrete spraying model, material handling equipment, and rebar processing equipment (CNC stirrup bending). There is no mixing-plant product line on this catalogue.',
          '本站列出混凝土泵（拖式与输送）、含混凝土喷浆机的喷涂设备、物料搬运设备，以及钢筋加工设备（数控弯箍）。本目录没有搅拌站产品线。',
        ),
      },
    ],
    content: [
      {
        heading: L('Introduction', '引言'),
        paragraphs: [
          L(
            'China supplies a large share of the world’s construction machinery. For an overseas buyer, the risk is not “China” as a label, but a supplier who cannot show a factory address, model tables or a clear enquiry path. This article lists checks that do not depend on invented awards or unnamed customers.',
            '中国供应全球很大一部分工程机械。对海外买家，风险不在“中国”这个标签，而在无法出示厂址、型号表或清晰询价路径的供应商。本文列出的核查不依赖编造的奖项或未具名客户。',
          ),
        ],
        image: articleImage(
          'factory-building',
          'Construction equipment manufacturer factory of a concrete pump supplier in Xingtai China',
          '中国邢台混凝土泵供应商的工程设备制造工厂',
        ),
      },
      {
        heading: L('1. Manufacturing location and capability', '1. 制造地点与能力'),
        paragraphs: [
          L(
            'Ask where the machines are built and whether you can see workshop photos that match that address. Pinjin publishes the Xingtai / Renze Industrial Park address and factory images of production, assembly and dispatch. Capability claims should match what is on the factory page (workshop, assembly, inspection, packing) rather than a number of “years” or “export countries” that this site does not state.',
            '询问设备在何处制造，以及车间照片是否与该地址相符。品锦公布邢台任泽工业园区地址，以及生产、装配与发运的工厂照片。能力说明应与工厂页内容（车间、装配、检验、包装）一致，而不是本站未写明的“年限”或“出口国”数字。',
          ),
        ],
      },
      {
        heading: L('2. Product quality — what you can actually verify', '2. 产品质量——你能核实的部分'),
        paragraphs: [
          L(
            'Before purchase, compare published specifications, materials described on the product page, and any test or inspection steps the factory will confirm in writing. If a seller advertises certificates, ask for the document, the issuing body and the machine it covers. This website does not list certificate names, so we do not claim them here.',
            '采购前对照已公布参数、产品页对材料的说明，以及工厂书面确认的检测或检验步骤。若卖方宣传证书，请索取文件、颁发机构和覆盖的设备。本站未列出证书名称，因此这里也不声称拥有它们。',
          ),
        ],
      },
      {
        heading: L('3. Technical support after the order', '3. 订货后的技术支持'),
        paragraphs: [
          L(
            'A usable supplier answers with the model name, spare-wear parts for that model, and how to run and clean the machine. Pinjin enquiry paths are WhatsApp and email on the contact page. Installation on a foreign site is arranged after the specification is confirmed — this site does not promise a fixed overseas service crew.',
            '可用的供应商会按型号回复、提供该型号易损件，并说明操作与清洗。品锦询盘路径为联系页上的 WhatsApp 与邮件。海外现场安装在规格确认后安排——本站不承诺固定的海外服务团队。',
          ),
        ],
      },
      {
        heading: L('4. Product range that matches real catalogue pages', '4. 与真实目录页相符的产品范围'),
        paragraphs: [
          L(
            'Look for a manufacturer who publishes several related machines, not only a keyword. Pinjin’s catalogue includes concrete pumps, shotcrete / spraying machines, material handling equipment and rebar processing equipment (CNC steel bar bending). It does not include a concrete mixing plant line. Solutions are combinations of these listed machines plus OEM changes where the product page says customization is available.',
            '应找公布多类相关设备的厂家，而不是只有一个关键词。品锦目录包括混凝土泵、喷浆/喷涂机、物料搬运设备和钢筋加工设备（数控钢筋弯箍），不含混凝土搅拌站产品线。方案是这些已列设备的组合，以及产品页标明可定制时的 OEM 调整。',
          ),
        ],
      },
      {
        heading: L('5. Communication and shipment paperwork', '5. 沟通与发运文件'),
        paragraphs: [
          L(
            'International orders need timely replies, a language you can work in, and shipping documents the factory can actually issue. Test this with a specific model and destination port before paying a deposit. Pinjin responds through the published email and WhatsApp numbers.',
            '国际订单需要及时回复、可沟通的语言，以及工厂确实能出具的发运文件。付款前用具体型号和目的港测试。品锦通过已公布的邮箱与 WhatsApp 号码回复。',
          ),
        ],
      },
      {
        heading: L('Conclusion', '结语'),
        paragraphs: [
          L(
            'Choosing a construction equipment supplier affects uptime and spare-part lead time more than a slogan. Use factory address, published tables and a clear enquiry channel. Then open the product pages for concrete pumps, spraying machines and rebar equipment, and send the model plus site conditions to the engineering team.',
            '选择工程设备供应商，影响的是停机时间和配件周期，而不是口号。应核对厂址、已公布参数表和清晰询盘渠道。然后打开混凝土泵、喷涂机与钢筋设备产品页，把型号与工况发给工程团队。',
          ),
        ],
      },
    ],
  },
];
