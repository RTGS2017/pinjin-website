import type { BlogPost } from '@/data/blog';
import type { LocalizedText } from '@/i18n/types';
import { getFactorySlide } from '@/data/factory';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

function articleImage(id: string, alt?: LocalizedText, caption?: LocalizedText) {
  const slide = getFactorySlide(id);
  if (!slide) {
    throw new Error(`Missing factory slide: ${id}`);
  }
  return {
    src: slide.image,
    alt: alt ?? slide.alt,
    caption: caption ?? slide.title,
  };
}

export const article: BlogPost = {
  slug: 'bridge-construction-concrete-pump-requirements',
  title: L(
    'Bridge Construction Concrete Pump Requirements for Pier and Deck Pours',
    '桥梁施工混凝土泵要求：墩柱与桥面连续浇筑',
  ),
  seoTitle: L(
    'Bridge Concrete Pump Requirements | Pier & Deck | Pinjin Xingtai',
    '桥梁混凝土泵选型：墩柱与桥面连续浇筑 | 邢台品锦',
  ),
  description: L(
    'Pier and deck pours need a continuous pipeline feed. Our Xingtai engineers match Diesel 50, Diesel 60 and LZ-80 catalogue output and pressure. We do not sell boom pumps.',
    '墩柱与桥面浇筑需要连续管道供料。邢台工程师按目录对照柴油50、柴油60与LZ-80的输送量与压力。我们不销售臂架泵。',
  ),
  category: 'application-solutions',
  date: '2026-09-02',
  keywords: [
    'bridge concrete pump',
    'infrastructure concrete pump',
    'diesel 50 concrete pump',
  ],
  relatedProductSlugs: [
    'diesel-50-concrete-pump',
    'diesel-60-concrete-pump',
    'lz-80-diesel-concrete-pump',
  ],
  relatedPaths: [
    {
      href: '/products/diesel-concrete-pumps',
      label: L('Diesel concrete pumps', '柴油混凝土泵'),
    },
    {
      href: '/solutions/infrastructure',
      label: L('Infrastructure concrete pumping', '基建混凝土泵送'),
    },
    {
      href: '/contact',
      label: L('Contact the Xingtai factory', '联系邢台工厂'),
    },
  ],
  content: [
    {
      heading: L(
        'Pier and deck pours need a continuous feed',
        '墩柱与桥面浇筑需要连续供料',
      ),
      paragraphs: [
        L(
          'When a buyer asks us for a bridge concrete pump, our engineers in Xingtai do not start from a project name. We start from whether the pour can stay continuous. Pier shafts, pile caps and deck slabs are volume jobs. If the hopper runs empty, the pipeline can stall and the mix can stiffen in the line. Recovering a blocked pipe is not placement. Continuous feed is a site requirement we match against catalogue output, not a slogan.',
          '客户问我们要桥梁混凝土泵时，邢台工程师不会先问工程名称，而会先问这次浇筑能不能连续进行。墩柱、承台和桥面板都是体量活。料斗一旦空了，管路可能中断，混凝土会在管里变稠。疏通堵管不是浇筑。连续供料是工地条件，我们用目录输送量去对照，而不是当口号。',
        ),
        L(
          'A trailer pump only delivers what arrives at the hopper. Mixer trucks, the batching plan and the pipeline layout decide whether a listed 30 m³/h or 95 m³/h can exist at the pour point. Many highway and river sites also lack stable three-phase power, which is why diesel trailer pumps are the models we open for infrastructure concrete pump discussions. We manufacture those line pumps in Xingtai, at Renze Industrial Park. We do not sell truck-mounted boom pumps.',
          '拖泵只输送到达料斗的混凝土。搅拌车、搅拌计划和管路布置，才决定目录上的 30 m³/h 或 95 m³/h 在浇筑点能不能成立。不少公路和跨河工地也没有稳定三相电，所以基建混凝土泵我们先翻柴油拖泵。这些管道泵在邢台任泽工业园区制造。我们不销售车载臂架泵。',
        ),
      ],
      image: {
        src: '/images/applications/pinjin-concrete-equipment-highway-infrastructure.webp',
        alt: L(
          'Hebei Pinjin construction equipment working on a highway infrastructure project',
          '品锦工程设备用于公路基建现场作业',
        ),
        caption: L(
          'Infrastructure pours are planned from a trailer pump station through pipeline — not from a boom arm.',
          '基建浇筑从拖式泵站经管道布置到浇筑点，而不是靠臂架。',
        ),
      },
    },
    {
      heading: L(
        'What our Xingtai engineers match before a model',
        '选型前邢台工程师对照哪些工地条件',
      ),
      paragraphs: [
        L(
          'We do not need a named bridge. We need numbers we can set next to a published row. Please do not ask us to recommend the biggest pump from a pier photograph. Theoretical output is a catalogue figure. Real placement rate falls once mixer arrival, elbows, vertical rises and wash-out stops are counted.',
          '我们不需要一座有名字的桥，而需要能对照目录行的数字。请不要只凭墩柱照片让我们推荐最大的泵。理论输送量是目录值。搅拌车到场、弯头、垂直爬升和洗管停顿一计入，实际浇筑速率就会下降。',
        ),
      ],
      bullets: [
        L(
          'Planned pour rate in m³/h, so the hopper is not starved or overfilled',
          '计划浇筑速率（m³/h），避免料斗断料或堆料',
        ),
        L(
          'Horizontal and vertical pipeline length, including approaches, deck runs and extra bends',
          '水平和垂直管路长度，含引桥、桥面段和额外弯头',
        ),
        L(
          'Aggregate size the mix design actually uses, not a round number from another job',
          '配合比实际使用的骨料粒径，而不是其他工地的约数',
        ),
        L(
          'Whether the site has three-phase power or must run diesel',
          '工地有无三相电，还是必须用柴油机',
        ),
      ],
    },
    {
      heading: L(
        'Diesel 50: 99 kW, 30 m³/h, 30 MPa, 150 m / 450 m',
        '柴油50：99 kW、30 m³/h、30 MPa、150 m / 450 m',
      ),
      paragraphs: [
        L(
          'Diesel 50 is the first table we usually open for a mid-size diesel infrastructure pour. Published figures: 6105 diesel, 99 kW; theoretical output 30 m³/h; maximum outlet pressure 30 MPa; hopper 0.4 m³; conveying distance 150 m horizontal / 450 m vertical; Kawasaki 140; 4600 × 1650 × 1850 mm; 3300 kg. The product page lists the 150 m / 450 m pair with 1 cm aggregate.',
          '中等体量、无电网的基建浇筑，我们通常先打开柴油50这张表。目录数据：6105 柴油机 99 kW；理论输送量 30 m³/h；最大出口压力 30 MPa；料斗 0.4 m³；输送距离水平 150 m / 垂直 450 m；川崎 140；外形 4600 × 1650 × 1850 mm；整机 3300 kg。产品页将 150 m / 450 m 与 1 cm 骨料一并列出。',
        ),
        L(
          'Treat 30 m³/h as theoretical. For a pier that must stay in one window, we ask whether mixer trucks can keep that 0.4 m³ hopper moving. 30 MPa is listed outlet pressure, not a promise that a bent deck line will run at 30 MPa. If the planned rate sits under 30 m³/h and the line stays inside the listed distance, Diesel 50 is the starting match. If the same window needs more volume, we step to Diesel 60 or LZ-80 rather than inventing extra capacity on Diesel 50.',
          '30 m³/h 按理论值看待。墩柱必须在一个窗口内浇完时，我们会问搅拌车能不能把 0.4 m³ 料斗持续喂满。30 MPa 是目录出口压力，不是弯头很多的桥面管一定能跑到 30 MPa。计划速率低于 30 m³/h、管路落在目录距离内，柴油50是起点。同一窗口需要更大排量时，我们改对柴油60或LZ-80，而不会给柴油50发明额外能力。',
        ),
      ],
    },
    {
      heading: L(
        'Diesel 60: 144 kW, 35 m³/h, 30 MPa, 150 m / 350 m',
        '柴油60：144 kW、35 m³/h、30 MPa、150 m / 350 m',
      ),
      paragraphs: [
        L(
          'Diesel 60 is listed as HBT60-13.132: 6105 diesel, 144 kW; theoretical output 35 m³/h; 30 MPa; hopper 0.4 m³; 150 m / 350 m; Kawasaki double 100; 4800 × 1700 × 1700 mm; 3500 kg. Engine power steps from 99 kW to 144 kW and theoretical output from 30 m³/h to 35 m³/h. Outlet pressure stays 30 MPa. Listed vertical distance is 350 m, not 450 m. We do not rewrite the table so one model wins every column.',
          '柴油60目录型号为 HBT60-13.132：6105 柴油机 144 kW；理论输送量 35 m³/h；30 MPa；料斗 0.4 m³；150 m / 350 m；川崎双泵 100；外形 4800 × 1700 × 1700 mm；整机 3500 kg。功率从 99 kW 升到 144 kW，理论输送量从 30 m³/h 升到 35 m³/h。出口压力仍是 30 MPa。目录垂直距离是 350 m，不是 450 m。我们不会改写表格让某一型号每一列都占优。',
        ),
        L(
          'We point to Diesel 60 when the crew needs a higher theoretical feed so trucks wait less on the pump, or when the buyer wants the higher-power 6105 package on a diesel infrastructure site. The hopper is still 0.4 m³ on both machines, so continuous feed still depends on truck arrival, not on a larger hopper. If the pour is clearly a high-volume or coarse-aggregate job, we open LZ-80 next instead of stretching Diesel 60 past its listed 35 m³/h.',
          '当现场需要更高理论供料、减少搅拌车等泵，或买家要更大功率的 6105 柴油机方案时，我们指向柴油60。两台机料斗都是 0.4 m³，连续供料仍取决于搅拌车到场，而不是更大料斗。若浇筑明显是大排量或粗骨料工况，我们接着打开 LZ-80，而不是把柴油60拉伸到目录 35 m³/h 以外。',
        ),
      ],
    },
    {
      heading: L(
        'LZ-80: Yuchai 256 kW, HP ≤ 65 m³/h / LP ≤ 95 m³/h',
        'LZ-80：玉柴 256 kW，高压 ≤65 m³/h / 低压 ≤95 m³/h',
      ),
      paragraphs: [
        L(
          'Some pier and deck jobs are volume problems, not 30–35 m³/h problems: thick decks, large pile caps, or coarser aggregate. LZ-80 is the high-capacity diesel trailer pump we list in that band. Catalogue: Yuchai 256 kW; high-pressure output ≤ 65 m³/h / low-pressure output ≤ 95 m³/h; high-pressure ≤ 35 MPa / low-pressure ≤ 22 MPa; hopper 0.6 m³; conveying distance 120 m; aggregate ≤ 6 cm; Kawasaki double 140; 6.6 × 1.8 × 1.9 m; 6800 kg.',
          '有些墩柱和桥面不是 30–35 m³/h 的问题，而是体量问题：厚桥面、大承台，或更粗的骨料。LZ-80 是我们在这一档列出的大排量柴油拖泵。目录：玉柴 256 kW；高压输送量 ≤65 m³/h / 低压输送量 ≤95 m³/h；高压 ≤35 MPa / 低压 ≤22 MPa；料斗 0.6 m³；输送距离 120 m；骨料 ≤6 cm；川崎双 140；外形 6.6 × 1.8 × 1.9 m；整机 6800 kg。',
        ),
        L(
          'High-pressure and low-pressure modes are two listed operating bands: higher listed output sits with lower listed pressure. We ask which band the pipeline needs before anyone quotes 95 m³/h on a deck. The 0.6 m³ hopper only helps if the batching side can fill it. Aggregate up to 6 cm is a catalogue maximum. Conveying distance is 120 m — shorter than the 150 m horizontal figures on Diesel 50 and Diesel 60 — so LZ-80 is a volume machine, not an automatic long-line machine.',
          '高压与低压是两档已公布工况。更高的目录输送量对应更低的目录压力；更高的目录压力对应更低的目录输送量。管路真正需要哪一档，问清楚之前，不要把 95 m³/h 直接说成桥面浇筑量。0.6 m³ 料斗比柴油50/60 大，只有搅拌侧跟得上才有意义。骨料最大 6 cm 是目录上限。输送距离列 120 m，短于柴油50和柴油60的水平 150 m，所以 LZ-80 是排量机型，不是自动的长距离机型。',
        ),
      ],
      image: articleImage(
        'factory-dispatch',
        L(
          'Diesel construction equipment dispatch from Pinjin Machinery in Xingjiawan China',
          '中国邢家湾品锦机械工厂发出的柴油工程设备',
        ),
        L(
          'Trailer diesel pumps dispatched from our Xingtai factory — pipeline machines, not boom trucks.',
          '邢台工厂发出的柴油拖泵是管道泵，不是臂架车。',
        ),
      ),
    },
    {
      heading: L(
        'We do not sell boom pumps — send site conditions',
        '我们不销售臂架泵：请把工地条件发给工厂',
      ),
      paragraphs: [
        L(
          'Buyers sometimes send a boom-pump photo from another job. We need to be direct. Hebei Pinjin Machinery does not manufacture truck-mounted boom pumps or mixing plants as catalogue products. Spraying machines are listed separately. What we build and dispatch from Xingtai for bridge pours are trailer pipeline pumps — electric, diesel and mixer-pump combinations. For bridge construction, the pump sits at a planned station and concrete travels in pipe to the pier or deck.',
          '有时客户会发来其他工地的臂架泵照片。我们需要说清楚：河北品锦机械的目录产品不含车载臂架泵、搅拌站或喷涂机。邢台制造并发运的是拖式管道泵——电动、柴油和搅拌泵一体机。桥梁施工时，泵停在预定泵站，混凝土经管道送到墩柱或桥面。',
        ),
        L(
          'If you are selecting a bridge concrete pump or a wider infrastructure concrete pump, send pour volume and time window, horizontal and vertical pipe, aggregate size, and whether the site has grid power. We will place those numbers next to Diesel 50, Diesel 60 and LZ-80 and say which row we would open first. We will not invent a named bridge or a fuel figure that is not in the catalogue.',
          '若你在选桥梁混凝土泵或更广义的基建混凝土泵，请把浇筑方量与时间窗口、水平和垂直管路、骨料粒径、以及工地有无电网发给我们。我们会把这些数字对照柴油50、柴油60和LZ-80，并说明会先打开哪一行。我们不会虚构桥梁工程名称，也不会提供目录里没有的油耗数字。',
        ),
      ],
    },
  ],
  faqs: [
    {
      question: L(
        'Can a trailer concrete pump place pier and deck concrete?',
        '拖式混凝土泵能否浇筑墩柱和桥面？',
      ),
      answer: L(
        'Yes, when the pipeline is planned and mixer trucks keep the hopper fed. A trailer pump is a line pump. It does not replace a boom arm. We match Diesel 50, Diesel 60 or LZ-80 to listed output, pressure and distance.',
        '可以，前提是管路已规划、搅拌车能持续喂料。拖泵是管道泵，不能代替臂架。我们按已公布的输送量、压力和距离对照柴油50、柴油60或LZ-80。',
      ),
    },
    {
      question: L(
        'Do you sell boom pumps for bridge construction?',
        '桥梁施工你们卖臂架泵吗？',
      ),
      answer: L(
        'No. We do not sell truck-mounted boom pumps. Our Xingtai catalogue lists trailer concrete pumps. For pier and deck work we discuss pipeline layout and a diesel trailer model from the published table.',
        '不卖。我们不销售车载臂架泵。邢台目录列出的是拖式混凝土泵。墩柱和桥面作业，我们讨论管路布置，并按已公布表格对照柴油拖泵。',
      ),
    },
    {
      question: L(
        'Should I choose Diesel 50 or Diesel 60 for an infrastructure pour?',
        '基建浇筑应选柴油50还是柴油60？',
      ),
      answer: L(
        'Diesel 50 is 99 kW, 30 m³/h, 30 MPa, 150 m / 450 m. Diesel 60 is 144 kW, 35 m³/h, 30 MPa, 150 m / 350 m. We choose from the pour rate and pipeline, not from the larger model number alone.',
        '柴油50为 99 kW、30 m³/h、30 MPa、150 m / 450 m。柴油60为 144 kW、35 m³/h、30 MPa、150 m / 350 m。我们按浇筑速率和管路选择，而不是只看更大的型号数字。',
      ),
    },
    {
      question: L(
        'When do you recommend the LZ-80 diesel concrete pump?',
        '什么情况下推荐 LZ-80 柴油混凝土泵？',
      ),
      answer: L(
        'When the job needs the listed high-capacity band: Yuchai 256 kW, high-pressure ≤ 65 m³/h or low-pressure ≤ 95 m³/h, hopper 0.6 m³, aggregate up to 6 cm, 120 m conveying. We still need pipeline length and mix, because 95 m³/h is a low-pressure listed maximum, not a default deck rate.',
        '当工程需要目录大排量档时：玉柴 256 kW，高压 ≤65 m³/h 或低压 ≤95 m³/h，料斗 0.6 m³，骨料最大 6 cm，输送 120 m。我们仍需要管路长度和配合比，因为 95 m³/h 是低压目录上限，不是桥面默认浇筑量。',
      ),
    },
  ],
};
