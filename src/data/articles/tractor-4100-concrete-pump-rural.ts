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

export const article: BlogPost = {
  slug: 'tractor-4100-concrete-pump-rural',
  title: L(
    'Tractor Concrete Pump 4100 for Rural Roads and Village Houses',
    '拖拉机带动4100混凝土泵：农村道路与自建房怎么选',
  ),
  seoTitle: L(
    'Tractor Concrete Pump 4100 | Rural Construction Pump | Pinjin',
    '拖拉机混凝土泵4100 | 农村施工泵选型 | 品锦',
  ),
  description: L(
    'Our engineers explain when the tractor-driven 4100 rural construction pump fits a village site, and how it compares with the 17 kW rural diesel compact and the Diesel 30 trailer.',
    '我们的工程师说明拖拉机带动4100农村施工泵适合哪些村路与自建房工况，并对照17 kW农村柴油紧凑泵与柴油30拖泵的目录参数。',
  ),
  category: 'product-guide',
  date: '2026-09-01',
  keywords: ['tractor concrete pump', 'rural construction pump', '4100 concrete pump'],
  relatedProductSlugs: [
    'tractor-4100-concrete-pump',
    'rural-diesel-concrete-pump',
    'diesel-30-concrete-pump',
  ],
  relatedPaths: [
    {
      href: '/products/diesel-concrete-pumps',
      label: L('Diesel concrete pump manufacturer China', '中国柴油混凝土泵厂家'),
    },
    {
      href: '/solutions/construction',
      label: L('Construction concrete pump solutions', '建筑施工混凝土泵方案'),
    },
    {
      href: '/contact',
      label: L('Contact Pinjin Xingtai factory', '联系品锦邢台工厂'),
    },
  ],
  content: [
    {
      heading: L(
        'Why village crews ask for a tractor concrete pump first',
        '村里工地为什么先问能不能用拖拉机带泵',
      ),
      paragraphs: [
        L(
          'When a crew is pouring a two-storey house at the end of a village lane, the first question we hear is not “how many MPa”. It is whether the tractor they already own can tow the pump in. Grid power is often missing. A truck-mounted boom pump is not in our catalogue. That is the job we designed the Tractor-Driven 4100 around: a rural construction pump listed at 40 kW, 1300 kg, and 2900 × 1000 × 1350 mm.',
          '村里巷道尽头浇两层自建房时，我们听到的第一句往往不是“多少兆帕”，而是家里那台拖拉机能不能把泵拖进去。三相电经常没有，机耕路也容不下两吨级拖泵。车载臂架泵不在我们的目录里。拖拉机带动4100就是按这个工况、在邢台任泽工业园区做出来的农村施工泵：目录功率40 kW、整机1300 kg、外形2900 × 1000 × 1350 mm，给已经有农用拖拉机的自建房和小型二次结构用。',
        ),
        L(
          'We manufacture the 4100 concrete pump in Xingtai, Hebei, at Hebei Pinjin Machinery. Our engineers treat tractor drive as a site-access decision, not a marketing slogan. If the tractor can reach the hopper position and the pipeline stays inside the published distances, this model is usually the middle of our three rural diesel options—not the lightest, and not the long-distance trailer.',
          '4100混凝土泵由河北品锦机械在河北邢台制造。我们的工程师把拖拉机带动当成进场条件，而不是口号：先看巷道、院门和垫木，再看管路。只要拖拉机能把泵拖到料斗位置、管路又落在目录距离内，这台机通常是我们三台农村柴油选项里的中间档——比17 kW紧凑机更能打二层和稍长的管，又不必上柴油30那种工地拖泵。产品页在 /products/tractor-4100-concrete-pump。'
        ),
      ],
      image: {
        src: '/images/products/tractor-4100-concrete-pump/main.webp',
        alt: L(
          'Tractor-driven 4100 concrete pump for rural construction from Hebei Pinjin Machinery Xingtai',
          '河北品锦机械邢台工厂的农村施工用拖拉机带动4100混凝土泵',
        ),
        caption: L(
          'Tractor-Driven 4100 Concrete Pump',
          '拖拉机带动4100混凝土泵',
        ),
      },
    },
    {
      heading: L(
        'The 4100 numbers we actually publish',
        '4100我们真正公布的目录参数',
      ),
      paragraphs: [
        L(
          'Buyers sometimes paste a competitor’s “rural pump” table into the enquiry and ask us to match it. We do not. We only confirm what is on our own product page. For the Tractor-Driven 4100 we list 40 kW, theoretical output 6–12 m³/h, pumping pressure 15 MPa, conveying distance 40–100 m horizontal / 15–45 m vertical, aggregate 1–3 cm, hopper 0.25 m³, and slump 180–220 mm.',
          '有人会把别家“农村泵”参数表贴进询盘，让我们对齐。我们不会那样做，只核对自家产品页上的数。拖拉机带动4100目录是：功率40 kW、理论输送量6–12 m³/h、泵送压力15 MPa、输送距离水平40–100 m / 垂直15–45 m、骨料1–3 cm、料斗0.25 m³、坍落度180–220 mm；外形与重量见下面条目，也写在产品页上，不另外口头加码。',
        ),
        L(
          'Those figures are the selection fence. A 50 m vertical line is already outside this table. A mix stiffer than the listed slump, or stone larger than 3 cm, is also outside what we publish for this rural construction pump. We do not invent oil consumption or litres per hour, because those numbers depend on the tractor, the mix, and the pipe layout—not on a catalogue line we can stand behind.',
          '这些数字就是选型边界。垂直50 m已经超出这张表。比目录坍落度更干的料、大于3 cm的石子，也不在这台农村施工泵的公布范围内。本文不编油耗、每小时升数或“一箱油浇几栋房”，因为那取决于拖拉机、配合比和布管，不是我们能写进目录、事后还能站住脚的一行字。询价时请直接对照产品页，不要把别家油耗表拿来当我们的数。',
        ),
      ],
      bullets: [
        L('Power 40 kW; output 6–12 m³/h; pressure 15 MPa', '功率40 kW；输送量6–12 m³/h；压力15 MPa'),
        L('Pipeline 40–100 m horizontal / 15–45 m vertical', '管路水平40–100 m / 垂直15–45 m'),
        L('Aggregate 1–3 cm; hopper 0.25 m³; slump 180–220 mm', '骨料1–3 cm；料斗0.25 m³；坍落度180–220 mm'),
        L('Size 2900 × 1000 × 1350 mm; weight 1300 kg', '外形2900 × 1000 × 1350 mm；重量1300 kg'),
      ],
    },
    {
      heading: L(
        'What tractor drive changes on a rural road',
        '拖拉机带动在村路上到底改变了什么',
      ),
      paragraphs: [
        L(
          'A tractor concrete pump is still a trailer-style pumping unit. The tractor is the prime mover that takes it down a village road and, on this model, supplies the drive we rate at 40 kW. That is why crews who already keep a farm tractor on site ask for the 4100 instead of a self-powered diesel skid they cannot squeeze through a courtyard gate.',
          '拖拉机混凝土泵本质仍是拖式泵送主机。拖拉机负责把泵带进村路，并在这台机上提供我们标定的40 kW驱动。所以工地本来就有农用拖拉机的班组，会问4100，而不是再拖一台过不了院门的自带柴油机组。',
        ),
        L(
          'Look at the width first. We list 1000 mm. The compact rural diesel pump is 1100 mm wide; Diesel 30 is 1500 mm. On a packed-earth lane between two courtyard walls, 1500 mm versus 1000 mm is the difference between parking beside the mixer and leaving the pump on the main road. Length is 2900 mm, so it is not the shortest machine we build—the rural diesel compact is 2200 mm—but it is still far shorter than Diesel 30 at 4000 mm.',
          '先看宽度。我们列的是1000 mm。农村柴油紧凑泵宽1100 mm，柴油30是1500 mm。两道院墙之间的土路上，比紧凑泵再窄100 mm往往不是决定因素；1500 mm对1000 mm才是停在搅拌机旁边、还是把泵撂在村外大路上的差别。长度2900 mm，不是我们最短的机——农村柴油紧凑泵是2200 mm——但比柴油30的4000 mm短一截，转弯和院门口更容易过。',
        ),
        L(
          'Weight follows the same story. 1300 kg is heavier than the 800 kg rural diesel compact, and lighter than the 2000 kg Diesel 30 trailer. Our engineers ask whether the tractor hitch, the ruts, and the house-side pad can take 1.3 tonnes plus a full hopper. If the answer is no, we point to the lighter rural diesel pump. If the answer is yes and the pipeline is still short, the 4100 is usually enough without stepping up to a construction-site trailer.',
          '重量也是同一条线。1300 kg比农村柴油紧凑泵的800 kg重，比柴油30拖泵的2000 kg轻。我们的工程师会问：拖拉机挂钩、车辙和房边垫木能不能吃住1.3吨再加满料斗。不行就指向更轻的农村柴油泵。行，而且管路仍短，通常不必升到工地级拖泵，4100就够。',
        ),
      ],
    },
    {
      heading: L(
        '4100 versus the 17 kW rural diesel compact',
        '4100对照17 kW农村柴油紧凑泵',
      ),
      paragraphs: [
        L(
          'The rural diesel concrete pump is the machine we list when the site is a single house, the pipe is short, and nobody wants to hitch a 1300 kg unit. Catalogue: 17 kW diesel, 5–8 m³/h, 15 MPa, 30–50 m horizontal / 10–30 m vertical, aggregate 1–3 cm, hopper 0.2 m³, 2200 × 1100 × 1250 mm, 800 kg. Pressure is the same 15 MPa as the 4100; output, hopper, and conveying distance are all smaller.',
          '农村自建房柴油混凝土泵，是我们给“一栋房、管路短、不想挂1.3吨机”的工地列的机型。目录：17 kW柴油机、5–8 m³/h、15 MPa、水平30–50 m / 垂直10–30 m、骨料1–3 cm、料斗0.2 m³、2200 × 1100 × 1250 mm、800 kg。压力与4100同为15 MPa。输送量、料斗和输送距离都更小，适合搅拌机就在房边、只浇地坪或低层圈梁的活。',
        ),
        L(
          'Choose the compact unit when the pour is a ground floor or a low second storey inside 10–30 m vertical, the mixer is almost beside the hopper, and two people can manoeuvre 800 kg. Choose the 4100 concrete pump when you need the extra 6–12 m³/h band, the 0.25 m³ hopper, or the 15–45 m vertical window, and you already have a tractor that can tow 1300 kg down the lane.',
          '浇一层地坪或低层二层、垂直落在10–30 m内、搅拌机几乎就在料斗边、两个人能挪动800 kg，选紧凑机。需要6–12 m³/h这一档、0.25 m³料斗，或垂直15–45 m窗口，并且拖拉机能把1300 kg拖进巷，选4100混凝土泵。骨料同为1–3 cm，压力同级，差的是农村活的体量：从单户短管，到能进拖拉机的二层和中短管路。',
        ),
      ],
    },
    {
      heading: L(
        '4100 versus the Diesel 30 trailer',
        '4100对照柴油30拖式泵',
      ),
      paragraphs: [
        L(
          'Diesel 30 is not a village-lane specialist. It is the first diesel trailer we list for a proper construction site without stable grid power: 4105 engine at 56 kW, 15 m³/h, 20 MPa, hopper 0.3 m³, 60 m / 180 m, aggregate 3 cm and below, 4000 × 1500 × 1800 mm, 2000 kg. Output is a single 15 m³/h figure, above the 4100 band. Pressure steps from 15 MPa to 20 MPa. The published line is 60 m / 180 m.',
          '柴油30不是巷道专用机。它是我们给“没有稳定电网的正经工地”列的第一档柴油拖泵：4105柴油机56 kW、15 m³/h、20 MPa、料斗0.3 m³、60 m / 180 m、骨料≤3 cm、4000 × 1500 × 1800 mm、2000 kg。输送量是单一的15 m³/h，高于4100的6–12 m³/h。压力从15 MPa升到20 MPa。公布管路60 m / 180 m，和4100的40–100 m / 15–45 m不是同一档，也不该靠把4100“开满”去凑。',
        ),
        L(
          'If the pour is a multi-house contract, a workshop slab with a long hose run, or a floor that needs the 180 m vertical number, we do not stretch the 4100. We put Diesel 30 on the shortlist and ask for pipeline sketches. If the site cannot accept 2000 kg or 1500 mm width, we stay with the tractor concrete pump and cut the pipe, not the other way around. We also do not sell the 4100 as a substitute for a mixing plant or a spraying machine—sprayers are listed separately, and mixing plants are not catalogue products.',
          '如果是连片几栋、厂房长软管，或楼层要用到180 m垂直这个数，我们不会把4100硬拉长，而是把柴油30放进短名单并要管路草图。现场吃不住2000 kg或1500 mm宽度，就留在拖拉机混凝土泵上、把管子改短，而不是反过来硬上拖泵。我们也不会把4100当成搅拌站或喷涂机的替代品——那些不是我们制造的目录产品。',
        ),
      ],
      image: articleImage(
        'factory-loading',
        'Rural construction pump packed for dispatch at Hebei Pinjin Machinery factory in Xingtai',
        '河北邢台品锦机械工厂装车待发的农村施工混凝土泵',
      ),
    },
    {
      heading: L(
        'How our engineers match the three models to one pour',
        '我们的工程师如何把三台机对到一次浇筑上',
      ),
      paragraphs: [
        L(
          'Write us four facts, not a brand name: storeys or vertical metres, hose-plus-pipe length, stone size, and whether a tractor can reach the pad. We map those to the three tables. Ground floor, 30–50 m pipe, 800 kg limit → rural diesel 17 kW. Village house, tractor on site, 15–45 m up or 40–100 m along, slump 180–220 mm → 4100. Site without grid, 15 m³/h, 20 MPa, 60 m / 180 m → Diesel 30.',
          '发给我们四件事，不要只发一个牌子：层数或垂直米数、软管加直管长度、石子粒径、拖拉机能不能开到垫木边。有管路草图更好。我们按三张表对照，不按口头“农村泵”三个字选。一层地坪、30–50 m管、限重800 kg → 农村柴油17 kW。村里楼、现场有拖拉机、往上15–45 m或往前40–100 m、坍落度180–220 mm → 4100。没电网、要15 m³/h、20 MPa、60 m / 180 m → 柴油30。',
        ),
        L(
          'Send the same four facts through the contact page, or open the diesel concrete pump hub and the construction solutions page before you enquire. We will answer from the Xingtai catalogue, not from a fuel-consumption story we cannot publish.',
          '把这四件事从联系页发来，或先打开柴油混凝土泵分类页 /products/diesel-concrete-pumps 和建筑施工方案页 /solutions/construction 再询价。我们按邢台目录回答，不会编一篇公布不了的油耗故事。需要报价时走 /contact，带上垂直高度、水平管路、骨料和进场方式即可。'
        ),
      ],
    },
  ],
  faqs: [
    {
      question: L(
        'Can the 4100 concrete pump be tractor-driven on a rural road?',
        '4100混凝土泵能在村路上用拖拉机带动吗？',
      ),
      answer: L(
        'Yes. We list it as a tractor-driven rural construction pump: 40 kW, 1300 kg, 2900 × 1000 × 1350 mm. Confirm that the tractor can tow 1300 kg plus a loaded hopper, and that the pipeline stays inside 40–100 m horizontal / 15–45 m vertical.',
        '能。我们把它列为拖拉机带动的农村施工泵：40 kW、1300 kg、2900 × 1000 × 1350 mm。请确认拖拉机能拖动1300 kg加满料斗，且管路落在水平40–100 m / 垂直15–45 m之内。',
      ),
    },
    {
      question: L(
        'When should we buy the 17 kW rural diesel pump instead of the 4100?',
        '什么时候该买17 kW农村柴油泵而不是4100？',
      ),
      answer: L(
        'When the job is a compact house pour: 5–8 m³/h, 15 MPa, 30–50 m / 10–30 m, 0.2 m³ hopper, 800 kg. Same 15 MPa and 1–3 cm aggregate as the 4100, but less output, less hopper, shorter line, and 500 kg less machine weight.',
        '活很小、只要紧凑自建房泵时：5–8 m³/h、15 MPa、30–50 m / 10–30 m、料斗0.2 m³、800 kg。压力和1–3 cm骨料与4100相同，但输送量、料斗、管路更小，机重轻500 kg。',
      ),
    },
    {
      question: L(
        'When do we need Diesel 30 instead of the tractor concrete pump?',
        '什么时候该上柴油30而不是拖拉机混凝土泵？',
      ),
      answer: L(
        'When the site needs the Diesel 30 table: 56 kW, 15 m³/h, 20 MPa, 0.3 m³ hopper, 60 m / 180 m, 2000 kg. Do not stretch the 4100’s 6–12 m³/h and 15–45 m vertical figures to cover that job.',
        '现场需要柴油30这张表时：56 kW、15 m³/h、20 MPa、料斗0.3 m³、60 m / 180 m、2000 kg。不要把4100的6–12 m³/h和垂直15–45 m硬拉去覆盖那个工况。',
      ),
    },
    {
      question: L(
        'What slump and aggregate does the 4100 list?',
        '4100目录的坍落度和骨料是多少？',
      ),
      answer: L(
        'We publish slump 180–220 mm and aggregate 1–3 cm for the 4100, with a 0.25 m³ hopper. We do not publish slump for the rural diesel compact or Diesel 30 in this comparison; match those models by the output, pressure, distance and weight on their product pages.',
        '4100公布坍落度180–220 mm、骨料1–3 cm、料斗0.25 m³。这篇对照文不给农村柴油紧凑泵和柴油30编坍落度；那两台按各自产品页的输送量、压力、距离和重量对照。',
      ),
    },
  ],
};
