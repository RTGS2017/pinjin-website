import type { BlogPost } from '@/data/blog';
import { getFactorySlide } from '@/data/factory';
import type { LocalizedText } from '@/i18n/types';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

function factoryImage(id: string) {
  const slide = getFactorySlide(id);
  if (!slide) {
    throw new Error(`Missing factory slide: ${id}`);
  }
  return { src: slide.image, alt: slide.alt, caption: slide.title };
}

/**
 * 知识中心增补文章（并入 getBlogPosts）。
 * 不虚构搅拌站产品、矿山专用机型或客户业绩。
 */
export const knowledgeArticles: BlogPost[] = [
  {
    slug: 'trailer-pump-vs-truck-mounted-concrete-pump',
    title: L(
      'Trailer Concrete Pump vs Truck-Mounted Pump',
      '拖式混凝土泵与车载泵对比',
    ),
    seoTitle: L(
      'Trailer Concrete Pump vs Truck-Mounted Pump | Pinjin Machinery',
      '拖式混凝土泵与车载泵对比 | 品锦机械',
    ),
    description: L(
      'Compare trailer / transfer concrete pumps with truck-mounted boom pumps. Pinjin’s catalogue lists trailer and transfer pumps manufactured in Xingtai, China.',
      '对比拖式/输送泵与车载臂架泵。品锦目录列出在中国邢台制造的拖式与输送泵。',
    ),
    category: 'product-guide',
    date: '2026-08-17',
    dateModified: '2026-08-17',
    keywords: [
      'trailer concrete pump vs truck mounted pump',
      'concrete pump manufacturer China',
      'transfer pump for construction',
    ],
    relatedProductSlugs: [
      'hbt80-18-140-concrete-pump',
      'hbt30-37-concrete-pump',
      'diesel-4100-transfer-pump',
    ],
    relatedPaths: [
      {
        href: '/products/concrete-pumps',
        label: L('Concrete pump manufacturer China', '中国混凝土泵厂家'),
      },
      {
        href: '/blog/how-to-choose-a-concrete-pump',
        label: L(
          'How to choose a concrete pump for construction projects',
          '如何为工程项目选择混凝土泵',
        ),
      },
    ],
    content: [
      {
        heading: L('What is a trailer concrete pump?', '什么是拖式混凝土泵？'),
        paragraphs: [
          L(
            'A trailer concrete pump is construction equipment that receives mixed concrete and pushes it through a pipeline to the pour location. It is usually towed or moved on site rather than carrying a folding boom on a truck chassis. Transfer pumps in the same family are compact machines used for shorter secondary-structure or fine-stone placement.',
            '拖式混凝土泵是接收已拌混凝土并通过管道压送到浇筑点的施工设备。它通常在现场拖行或移位，而不是在汽车底盘上携带折叠臂架。同系列的输送泵更紧凑，用于较短的二次结构或细石浇筑。',
          ),
          L(
            'Hebei Pinjin Machinery Manufacturing Co., Ltd. is a concrete pump manufacturer in Xingtai, Hebei, China. Catalogue models such as HBT, LL, HBTT and compact transfer pumps publish theoretical delivery capacity, conveying distance and aggregate diameter. Those tables are the basis for selection.',
            '河北品锦机械制造有限公司是中国河北邢台的混凝土泵厂家。HBT、LL、HBTT 及紧凑输送泵等目录机型公布理论输送量、输送距离与骨料粒径。选型应以这些参数表为依据。',
          ),
        ],
        image: factoryImage('concrete-manufacturing'),
      },
      {
        heading: L('What a truck-mounted pump does', '车载泵做什么'),
        paragraphs: [
          L(
            'A truck-mounted boom pump combines a truck chassis with a hydraulic boom. It is useful when the site needs rapid relocation and aerial placement without assembling a long pipeline. It also costs more to purchase, license and maintain, and it needs suitable road access.',
            '车载臂架泵把汽车底盘与液压臂架结合在一起。当现场需要快速移位、且不想铺设长管路时，臂架浇筑很方便。购置、牌照与维护成本也更高，并需要合适的道路条件。',
          ),
          L(
            'Pinjin does not list truck-mounted boom pumps in the current catalogue. Buyers comparing pump types should treat boom trucks as a different equipment class, then decide whether a trailer or transfer pump from a China concrete pump factory meets the pipeline length and output of the job.',
            '品锦当前目录未列出车载臂架泵。对比泵型时，应把臂架车视为另一类设备，再判断中国混凝土泵工厂的拖式或输送泵是否满足该工程的管长与产量。',
          ),
        ],
      },
      {
        heading: L('When a trailer pump is the better match', '何时更适合拖式泵'),
        paragraphs: [
          L(
            'Trailer pumps suit building construction and infrastructure pours where a pipeline can be laid, the machine can stay in one pumping position, and the buyer wants published conveying distance rather than boom reach. They are also easier to match for OEM customization of power type and capacity.',
            '当可以铺设管路、设备可固定在一个泵送位置、采购需要的是已公布输送距离而不是臂架幅度时，拖式泵更适合建筑与基建浇筑。动力形式与产能也更容易按 OEM 定制对照。',
          ),
        ],
        bullets: [
          L(
            'Long horizontal lines: compare HBT80-18-140 and LL60-75 tables.',
            '较长水平管路：对照 HBT80-18-140 与 LL60-75 参数表。',
          ),
          L(
            'Compact site or secondary structure: review transfer pump pages.',
            '紧凑场地或二次结构：查看输送泵产品页。',
          ),
          L(
            'Need factory photos: open the Xingtai factory capability page.',
            '需要工厂照片：打开邢台工厂能力页。',
          ),
        ],
      },
      {
        heading: L('How to inquire', '如何询盘'),
        paragraphs: [
          L(
            'Send the model name, one-way pipeline length, height difference, target output and aggregate size to the engineering team. After specifications are confirmed against a listed trailer or transfer pump, customized production can be arranged quickly where the catalogue supports it.',
            '把型号、单程管长、高差、目标产量与骨料粒径发给工程团队。对照已列拖式或输送泵确认规格后，可在目录支持范围内尽快安排定制生产。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'shotcrete-machine-application-guide',
    title: L(
      'Shotcrete Machine Application Guide',
      '喷浆机应用指南',
    ),
    seoTitle: L(
      'Shotcrete Machine Application Guide | Pinjin Spraying Equipment',
      '喷浆机应用指南 | 品锦喷涂设备',
    ),
    description: L(
      'How concrete spraying machines are used for mortar, plaster and shotcrete-style placement. Catalogue spraying equipment from a Xingtai manufacturer.',
      '混凝土喷涂机在砂浆、石膏与喷浆浇筑中的用法。邢台厂家目录喷涂设备说明。',
    ),
    category: 'application-solutions',
    date: '2026-08-17',
    dateModified: '2026-08-17',
    keywords: [
      'shotcrete machine application',
      'concrete spraying machine supplier',
      'mortar spraying machine manufacturer',
    ],
    relatedProductSlugs: [
      'concrete-spraying-machine',
      'diesel-screw-mortar-spraying-machine',
      'type-511-spraying-machine',
    ],
    relatedPaths: [
      {
        href: '/products/spraying-machines',
        label: L(
          'Concrete spraying equipment manufacturer',
          '混凝土喷涂设备厂家',
        ),
      },
      {
        href: '/solutions/spraying',
        label: L('Spraying application cases', '喷涂应用场景'),
      },
    ],
    content: [
      {
        heading: L('What is a concrete spraying machine?', '什么是混凝土喷涂机？'),
        paragraphs: [
          L(
            'A concrete spraying machine is construction equipment that conveys mortar or concrete mix and sprays it onto a surface. On finishing jobs this is often mortar or plaster spraying. On structural lining jobs the same family of machines is discussed as shotcrete equipment, provided the mix, nozzle and published pressure/flow match the work.',
            '混凝土喷涂机是将砂浆或混凝土拌合物输送并喷到作业面的施工设备。饰面工程多为砂浆或石膏喷涂；结构护面工程中，只要配合比、喷头与已公布压力/流量匹配，也可按喷浆设备来讨论。',
          ),
          L(
            'Pinjin is a concrete spraying equipment manufacturer in Xingtai, Hebei. The catalogue separates spraying machines from long-distance concrete pumps. Do not select a trailer pump when the job is wall spraying, and do not select a spraying machine when the job is pipeline placement over hundreds of metres.',
            '品锦是河北邢台的混凝土喷涂设备厂家。目录把喷涂机与长距离混凝土泵分开。墙面喷涂不要选拖式泵；数百米管路浇筑不要选喷涂机。',
          ),
        ],
        image: factoryImage('production-workshop'),
      },
      {
        heading: L('Typical application directions', '典型应用方向'),
        paragraphs: [
          L(
            'Building interior finishing uses mortar spraying machines. Plaster spraying machines are listed for gypsum work. Concrete spraying machines are listed where the mix is closer to shotcrete. Each product page publishes pressure, flow and conveying distance so a buyer can compare without guessing.',
            '建筑室内饰面使用砂浆喷涂机。石膏作业对应石膏喷涂机。拌合物更接近喷浆时使用混凝土喷浆机。各产品页公布压力、流量与输送距离，采购无需猜测。',
          ),
        ],
        bullets: [
          L(
            'Interior mortar: diesel screw mortar spraying machine and related models.',
            '室内砂浆：柴油螺杆砂浆喷涂机及相关型号。',
          ),
          L(
            'Plaster: fully automatic plaster spraying machine.',
            '石膏：全自动石膏喷涂机。',
          ),
          L(
            'Concrete spray: concrete spraying machine page and plunger-type models.',
            '混凝土喷浆：混凝土喷浆机页面及柱塞机型。',
          ),
        ],
      },
      {
        heading: L('Site conditions to send with an inquiry', '询盘应提供的工况'),
        paragraphs: [
          L(
            'Describe the material (mortar, plaster or concrete), the required output, the spraying distance and whether the site has diesel or electric power. The engineering team will map those conditions onto a listed spraying machine. Customization is discussed only where the catalogue confirms it.',
            '说明材料（砂浆、石膏或混凝土）、所需产量、喷涂距离，以及现场是柴油还是电力。工程团队会把工况对应到已列喷涂机。仅在目录明确支持处讨论定制。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'dry-mix-vs-wet-mix-spraying-machine',
    title: L(
      'Dry Mix vs Wet Mix Spraying Machine',
      '干喷与湿喷喷涂机对比',
    ),
    seoTitle: L(
      'Dry Mix vs Wet Mix Spraying Machine | Pinjin Machinery',
      '干喷与湿喷喷涂机对比 | 品锦机械',
    ),
    description: L(
      'Dry-mix and wet-mix spraying are different ways to place mortar or shotcrete. Choose from Pinjin spraying machines using published pressure, flow and distance.',
      '干喷与湿喷是不同的砂浆或喷浆方式。应按品锦喷涂机已公布的压力、流量与距离选型。',
    ),
    category: 'product-guide',
    date: '2026-08-17',
    dateModified: '2026-08-17',
    keywords: [
      'dry mix vs wet mix spraying machine',
      'shotcrete dry mix wet mix',
      'concrete spraying machine supplier',
    ],
    relatedProductSlugs: [
      'concrete-spraying-machine',
      'double-cylinder-plunger-spraying-machine',
      'diesel-screw-mortar-spraying-machine',
    ],
    relatedPaths: [
      {
        href: '/products/spraying-machines',
        label: L('Concrete spraying machine supplier', '混凝土喷涂机供应商'),
      },
      {
        href: '/blog/mortar-spraying-machine-buying-guide',
        label: L('Mortar spraying machine buying guide', '砂浆喷涂机采购指南'),
      },
    ],
    content: [
      {
        heading: L('Wet-mix spraying', '湿喷'),
        paragraphs: [
          L(
            'In wet-mix spraying, water is already in the mix before it enters the machine. The equipment pumps or screws a plastic mix to the nozzle. Wet-mix is common for mortar finishing and for many construction spraying jobs because dust is lower and the water/cement ratio is easier to control on site.',
            '湿喷是指拌合物在进入设备前已经加水。设备把塑性拌合物泵送或螺杆输送到喷头。饰面砂浆和许多建筑喷涂常用湿喷，因为粉尘较低，现场也更容易控制水灰比。',
          ),
        ],
        image: factoryImage('equipment-assembly'),
      },
      {
        heading: L('Dry-mix spraying', '干喷'),
        paragraphs: [
          L(
            'In dry-mix spraying, dry material is conveyed and water is added at the nozzle. It can be useful for certain lining jobs, but it needs trained nozzlemen and dust control. Pinjin product pages describe the listed spraying machines by pressure, flow and distance rather than by marketing labels such as “mining dry-mix unit”.',
            '干喷是干料输送、在喷头处加水。某些护面作业会用到，但需要熟练喷射手与粉尘控制。品锦产品页按压力、流量与距离描述已列喷涂机，而不是用“矿山干喷机组”这类营销标签。',
          ),
        ],
      },
      {
        heading: L('How to choose from the catalogue', '如何按目录选择'),
        paragraphs: [
          L(
            'Match the material and the published parameters. Mortar and plaster models are finishing machines. Concrete spraying and plunger machines are closer to structural spray. If the project specification says dry-mix or wet-mix, send that requirement with the output and distance so the factory can confirm a listed model — not an undocumented special.',
            '对照材料与已公布参数。砂浆与石膏机型用于饰面；混凝土喷浆与柱塞机型更接近结构喷浆。若项目写明干喷或湿喷，请连同产量与距离发给工厂，以便确认已列机型，而不是未公开的特制设备。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'tunnel-concrete-spraying-solution',
    title: L(
      'Mining Tunnel Concrete Spraying Solution',
      '矿山巷道混凝土喷浆方案',
    ),
    seoTitle: L(
      'Tunnel Concrete Spraying Solution | Pinjin Spraying Machines',
      '巷道混凝土喷浆方案 | 品锦喷涂机',
    ),
    description: L(
      'How listed concrete spraying machines can support tunnel or underground lining work. Pinjin does not publish a separate mining SKU; selection stays on catalogue models.',
      '已列混凝土喷涂机如何用于巷道或地下护面。品锦不另设矿山专用型号，选型仍以目录机型为准。',
    ),
    category: 'application-solutions',
    date: '2026-08-17',
    dateModified: '2026-08-17',
    keywords: [
      'mining tunnel concrete spraying solution',
      'tunnel shotcrete machine',
      'concrete spraying equipment manufacturer',
    ],
    relatedProductSlugs: [
      'concrete-spraying-machine',
      'type-311-spraying-machine',
      'type-511-spraying-machine',
    ],
    relatedPaths: [
      {
        href: '/products/spraying-machines',
        label: L(
          'Concrete spraying equipment manufacturer',
          '混凝土喷涂设备厂家',
        ),
      },
      {
        href: '/factory',
        label: L('Xingtai construction machinery factory', '邢台工程机械工厂'),
      },
    ],
    content: [
      {
        heading: L('Tunnel spraying as an application, not a fake product line', '巷道喷浆是应用方向，不是虚构产品线'),
        paragraphs: [
          L(
            'Tunnel and underground lining often need sprayed mortar or concrete. That is an application of spraying equipment, not proof that a factory offers a dedicated mining machine. Hebei Pinjin Machinery lists spraying machines with published pressure, flow and distance. Buyers working in tunnels should map those parameters to the job instead of asking for an unpublished “mining model”.',
            '巷道与地下护面常需要喷射砂浆或混凝土。这是喷涂设备的应用方向，并不等于工厂提供专用矿山机型。河北品锦机械列出带压力、流量与距离的喷涂机。巷道项目应按这些参数对照工况，而不是索要未公开的“矿山型号”。',
          ),
        ],
        image: factoryImage('workshop-crane'),
      },
      {
        heading: L('What the engineering team needs', '工程团队需要哪些信息'),
        paragraphs: [
          L(
            'Provide section size, spraying thickness, material, required output, available power and ventilation constraints. The team will say whether a listed concrete spraying machine or mortar spraying machine can be discussed. If the job is long-distance pipeline placement, switch to the concrete pump manufacturer pages instead.',
            '请提供断面尺寸、喷射厚度、材料、所需产量、可用动力与通风限制。团队会说明可否讨论已列混凝土喷浆机或砂浆喷涂机。若作业是长距离管路浇筑，应改看混凝土泵厂家页面。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'why-choose-a-chinese-concrete-machinery-manufacturer',
    title: L(
      'Why Choose a Chinese Concrete Machinery Manufacturer',
      '为什么选择中国混凝土机械厂家',
    ),
    seoTitle: L(
      'Why Choose a Chinese Concrete Machinery Manufacturer | Pinjin',
      '为什么选择中国混凝土机械厂家 | 品锦',
    ),
    description: L(
      'What overseas buyers should verify when choosing a Chinese concrete machinery manufacturer: factory location, catalogue specifications, OEM process and Xingtai manufacturing.',
      '海外采购选择中国混凝土机械厂家时应核实：工厂地点、目录参数、OEM 流程与邢台制造。',
    ),
    category: 'industry-guide',
    date: '2026-08-17',
    dateModified: '2026-08-17',
    keywords: [
      'why choose Chinese concrete machinery manufacturer',
      'China concrete pump manufacturer',
      'Xingtai concrete machinery factory',
    ],
    relatedProductSlugs: [
      'hbt80-18-140-concrete-pump',
      'concrete-spraying-machine',
    ],
    relatedPaths: [
      {
        href: '/factory',
        label: L('Xingtai concrete machinery factory', '邢台混凝土机械工厂'),
      },
      {
        href: '/products/custom-machinery',
        label: L('OEM custom machinery manufacturer', 'OEM 定制机械厂家'),
      },
    ],
    content: [
      {
        heading: L('Manufacturer entity, not only a website', '制造商实体，而不只是网站'),
        paragraphs: [
          L(
            'Overseas buyers searching “China concrete pump manufacturer” need a real factory entity: legal name, city, product list and photos of production. Hebei Pinjin Machinery Manufacturing Co., Ltd. is located in Renze Industrial Park, Xingtai, Hebei, in the Xingjiawan concrete machinery manufacturing area.',
            '搜索“China concrete pump manufacturer”的海外采购需要真实厂家实体：法定名称、城市、产品清单与生产照片。河北品锦机械制造有限公司位于河北省邢台市任泽工业园区，地处邢家湾混凝土机械制造集聚区。',
          ),
          L(
            'A trading-only page often repeats broad keywords such as “concrete machine” without model tables. A manufacturer knowledge platform publishes specifications, FAQs and factory images so Google and buyers can connect the company to concrete pumps and spraying equipment.',
            '纯贸易页面常重复“concrete machine”这类宽泛词，却没有型号表。制造商知识平台会公布参数、FAQ 与工厂图片，便于谷歌与采购把公司与混凝土泵、喷涂设备对应起来。',
          ),
        ],
        image: factoryImage('factory-building'),
      },
      {
        heading: L('What to verify before you buy', '采购前应核实什么'),
        paragraphs: [
          L(
            'Check that the factory city is stated, that each product has a technical table, that customization is described as a process after matching a listed model, and that contact is a real engineering channel (WhatsApp or email). Pinjin does not publish fake certificates, invented clients or mixing-plant products that are not in the catalogue.',
            '核实是否写明工厂城市、每款产品是否有参数表、定制是否描述为对照已列机型之后的流程，以及联系方式是否为真实工程渠道（WhatsApp 或邮件）。品锦不公布虚假证书、虚构客户，也不把目录没有的搅拌站写成产品。',
          ),
        ],
      },
      {
        heading: L('Factory-direct customization', '工厂直供定制'),
        paragraphs: [
          L(
            'Chinese source manufacturers can adjust specifications after confirmation because welding, machining and assembly happen in the same plant. That is why factory-direct OEM is faster than a long reseller chain — provided the change stays inside published, manufacturable parameters.',
            '中国源头厂家在确认规格后能够调整参数，是因为焊接、机加工与装配在同一工厂完成。所以工厂直供 OEM 比多层转销更快——前提是变更仍在已公布、可制造的参数范围内。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'xingtai-concrete-machinery-factory-inspection-guide',
    title: L(
      'Factory Inspection Guide for Xingtai Concrete Machinery',
      '邢台混凝土机械工厂考察指南',
    ),
    seoTitle: L(
      'Xingtai Concrete Machinery Factory Inspection Guide | Pinjin',
      '邢台混凝土机械工厂考察指南 | 品锦',
    ),
    description: L(
      'How to inspect a Xingtai, Hebei concrete machinery factory: workshop, assembly, packing, catalogue models and OEM questions to ask Pinjin.',
      '如何考察河北邢台混凝土机械工厂：车间、装配、包装、目录机型，以及向品锦提出的 OEM 问题。',
    ),
    category: 'factory-insights',
    date: '2026-08-17',
    dateModified: '2026-08-17',
    keywords: [
      'factory inspection guide Xingtai',
      'Xingtai concrete machinery factory',
      'China concrete pump factory',
    ],
    relatedProductSlugs: ['hbt45-40-concrete-pump', 'll60-75-concrete-pump'],
    relatedPaths: [
      {
        href: '/factory',
        label: L(
          'Xingtai construction machinery factory capability',
          '邢台工程机械工厂能力',
        ),
      },
      {
        href: '/blog/oem-concrete-machinery-manufacturing-process',
        label: L('OEM machinery customization process', 'OEM 机械定制流程'),
      },
    ],
    content: [
      {
        heading: L('What a factory visit should show', '工厂考察应看到什么'),
        paragraphs: [
          L(
            'A factory inspection in Xingtai should show a real production workshop, assembly area, finished equipment storage and packing/dispatch. Hebei Pinjin Machinery publishes those photos on the factory capability page. The legal address is Renze Industrial Park; Xingjiawan is the surrounding manufacturing area, not a changed street address.',
            '邢台工厂考察应能看到真实生产车间、装配区、成品存放与包装发运。河北品锦机械在工厂能力页公布这些照片。法定地址是任泽工业园区；邢家湾是周边制造集聚区，不是被改写的街道门牌。',
          ),
        ],
        image: factoryImage('factory-loading'),
      },
      {
        heading: L('Questions to ask the manufacturer', '应向厂家提出的问题'),
        paragraphs: [
          L(
            'Ask which catalogue model matches your output and distance, which parameters can be customized, and how packing is handled for export. Compare answers with the specification table on the product page. If a salesperson promises unpublished conveying distance or a mixing plant that is not listed, treat that as a warning sign.',
            '询问哪款目录机型匹配你的产量与距离、哪些参数可定制、出口包装如何处理。把回答与产品页参数表对照。若销售承诺未公布的输送距离或目录没有的搅拌站，应视为警示。',
          ),
        ],
        bullets: [
          L(
            'Request the model name exactly as printed on the product page.',
            '要求使用产品页上的准确型号名称。',
          ),
          L(
            'Walk the workshop, assembly and dispatch areas.',
            '走看车间、装配与发运区域。',
          ),
          L(
            'Confirm contact channels: WhatsApp and factory email.',
            '确认联系渠道：WhatsApp 与工厂邮箱。',
          ),
        ],
      },
      {
        heading: L('If you cannot visit in person', '若无法亲自到厂'),
        paragraphs: [
          L(
            'Use the factory photo set, manufacturing process description and product technical tables. Send a written inquiry with pipeline data. A real manufacturer replies against catalogue numbers; a brochure-only seller replies with slogans.',
            '使用工厂照片、制造流程说明与产品参数表。把管路数据写成询盘。真正的厂家会按目录数字回复；只有宣传册的卖方会用口号回复。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'concrete-mixing-and-pumping-for-construction-projects',
    title: L(
      'Concrete Mixing Plant Capacity and Pumping on Construction Projects',
      '工程项目中的搅拌站产能与泵送',
    ),
    seoTitle: L(
      'Mobile Concrete Batching vs Concrete Pump Manufacturer | Pinjin',
      '移动搅拌与混凝土泵厂家 | 品锦',
    ),
    description: L(
      'How mixing plant capacity relates to concrete pump selection. Pinjin manufactures concrete pumps in Xingtai and does not list mixing plants in the current catalogue.',
      '搅拌站产能如何对应混凝土泵选型。品锦在邢台制造混凝土泵，当前目录未列出搅拌站。',
    ),
    category: 'application-solutions',
    date: '2026-08-17',
    dateModified: '2026-08-17',
    keywords: [
      'mobile concrete batching plant guide',
      'concrete mixing plant capacity selection',
      'small concrete plant for construction projects',
      'concrete pump manufacturer China',
    ],
    relatedProductSlugs: [
      'hbt30-37-concrete-pump',
      'hbt80-18-140-concrete-pump',
      'll60-75-concrete-pump',
    ],
    relatedPaths: [
      {
        href: '/products/concrete-pumps',
        label: L('Concrete pump manufacturer China', '中国混凝土泵厂家'),
      },
      {
        href: '/blog/how-to-choose-a-concrete-pump',
        label: L(
          'How to choose a concrete pump for construction projects',
          '如何为工程项目选择混凝土泵',
        ),
      },
    ],
    content: [
      {
        heading: L('Mixing and pumping are sequential processes', '搅拌与泵送是前后工序'),
        paragraphs: [
          L(
            'A concrete mixing plant (batching plant) produces mixed concrete. A concrete pump then places that mix through a pipeline. Buyers searching “mobile concrete batching plant manufacturer” or “small concrete plant for construction projects” are often sizing the batching side. The pumping side still needs a matching concrete pump manufacturer.',
            '混凝土搅拌站（配料站）生产拌合物，混凝土泵再通过管路浇筑。搜索“移动搅拌站厂家”或“小型工程搅拌站”的采购往往在定搅拌侧规模。泵送侧仍需要匹配的混凝土泵厂家。',
          ),
          L(
            'Hebei Pinjin Machinery does not list a concrete mixing plant, mobile batching plant or YHZS-type plant in the current catalogue. This article explains the relationship so Google queries about mixing plants can still reach the correct Pinjin entity: a Xingtai manufacturer of concrete pumps and spraying equipment.',
            '河北品锦机械当前目录未列出混凝土搅拌站、移动搅拌站或 YHZS 类搅拌站。本文说明二者关系，使关于搅拌站的搜索仍能对应到正确的品锦实体：邢台的混凝土泵与喷涂设备制造商。',
          ),
        ],
        image: factoryImage('concrete-manufacturing'),
      },
      {
        heading: L('Capacity selection logic', '产能对应逻辑'),
        paragraphs: [
          L(
            'If a site plant produces 30 m³/h, the pump’s theoretical delivery should not be far below that figure or the pour will stall. If the plant is small, a compact transfer pump or HBT30-class model may be enough. Always compare the pump table — delivery capacity, horizontal distance, vertical height and aggregate size — not a marketing slogan.',
            '若现场搅拌约 30 m³/h，泵的理论输送量不应远低于该值，否则浇筑会中断。搅拌规模较小时，紧凑输送泵或 HBT30 级别可能足够。务必对照泵的参数表——输送量、水平距离、垂直高度与骨料粒径——而不是营销口号。',
          ),
        ],
        bullets: [
          L(
            'Small pours / secondary structure: transfer pumps and compact HBT models.',
            '小方量 / 二次结构：输送泵与紧凑 HBT 机型。',
          ),
          L(
            'Higher output or longer lines: HBT80-18-140, LL60-75, HBTT55-50.',
            '更高产量或更长管路：HBT80-18-140、LL60-75、HBTT55-50。',
          ),
        ],
      },
      {
        heading: L('Mobile plant vs trailer pump', '移动搅拌站与拖式泵'),
        paragraphs: [
          L(
            'A mobile batching plant moves with the project; a trailer concrete pump also moves, but it does not batch. Contractors who already have a mixer or ready-mix supply only need the pump. Contractors building a new batching line should source the plant from a mixing-plant maker and source the pump from a pump manufacturer such as Pinjin.',
            '移动搅拌站随项目转移；拖式混凝土泵也会转移，但不负责搅拌。已有搅拌机或商砼供应的承包商只需要泵。新建搅拌线的承包商应从搅拌站厂家采购搅拌设备，并从品锦这样的泵厂家采购混凝土泵。',
          ),
        ],
      },
      {
        heading: L('Contact the pump manufacturer', '联系泵厂家'),
        paragraphs: [
          L(
            'Send plant output, pipeline length, height and aggregate size. The Xingtai engineering team will map the job onto a listed concrete pump. OEM customization is available after specifications are confirmed.',
            '请提供搅拌产量、管长、高差与骨料粒径。邢台工程团队会把工况对应到已列混凝土泵。确认规格后可进行 OEM 定制。',
          ),
        ],
      },
    ],
  },
];
