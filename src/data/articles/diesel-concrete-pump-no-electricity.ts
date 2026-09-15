import type { BlogPost } from '@/data/blog';
import { getFactorySlide } from '@/data/factory';
import type { LocalizedText } from '@/i18n/types';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

function articleImage(id: string, altEn: string, altZh: string) {
  const slide = getFactorySlide(id);
  if (!slide) throw new Error(`Missing factory slide: ${id}`);
  return { src: slide.image, alt: L(altEn, altZh), caption: slide.title };
}

export const article: BlogPost = {
  slug: 'diesel-concrete-pump-no-electricity',
  title: L(
    'Diesel Concrete Pump for Sites Without Electricity',
    '无电工地用柴油混凝土泵',
  ),
  seoTitle: L(
    'Diesel Concrete Pump for No Electricity | Pinjin',
    '无电施工柴油混凝土泵 | 品锦',
  ),
  description: L(
    'Xingtai factory guide to diesel concrete pumps for rural Hebei and sites without three-phase power: rural 17 kW, tractor 4100, and Diesel 30 catalogue ladder.',
    '邢台工厂说明河北农村及无三相电工地如何选柴油混凝土泵：农村17 kW、拖拉机4100与柴油30型目录阶梯。',
  ),
  category: 'application-solutions',
  date: '2026-08-27',
  keywords: [
    'diesel concrete pump',
    'no electricity construction',
    'rural diesel pump',
    'diesel concrete pump no electricity',
    'rural Hebei concrete pump',
  ],
  relatedProductSlugs: [
    'diesel-30-concrete-pump',
    'rural-diesel-concrete-pump',
    'tractor-4100-concrete-pump',
  ],
  relatedPaths: [
    {
      href: '/products/diesel-concrete-pumps',
      label: L('Diesel Concrete Pumps', '柴油混凝土泵'),
    },
    {
      href: '/solutions/construction',
      label: L('Construction Solutions', '建筑施工方案'),
    },
    {
      href: '/contact',
      label: L('Contact the Factory', '联系工厂'),
    },
  ],
  content: [
    {
      heading: L(
        'Rural Hebei jobs often have no three-phase power',
        '河北农村工地常常没有三相电',
      ),
      paragraphs: [
        L(
          'We manufacture trailer concrete pumps at Hebei Pinjin Machinery in Xingtai. Many questions are not about the biggest machine on the list. They come from rural counties around the factory, village house builds, and crews who reach a plot and find there is no three-phase supply for the pour.',
          '我们是河北品锦机械，工厂在邢台任泽工业园区。日常接到的问题，很大一部分并不是要目录里最大的机型，而是邢台周边农村自建房、乡镇工地，以及到场后发现浇筑用不上三相电的施工队。很多询盘会先问有没有电、能不能打，而不是先问最大输送量。我们按这个顺序答。',
        ),
        L(
          'On those jobs a diesel concrete pump is the practical option. It does not wait for a transformer, and it does not depend on a generator sized for an electric motor. You bring diesel, you set the trailer, and you pump. That is what we see when we dispatch machines from Xingtai.',
          '这类工地上，柴油混凝土泵是务实选择。它不等变压器，也不依赖按电机功率去配发电机。带上柴油、摆好拖车、接管就能打。这是我们从邢台厂区发运设备时最常见的工况，也是河北农村无三相电施工里最省事的一条路。',
        ),
        L(
          'This article explains why diesel is the first filter for no electricity construction, how our rural 17 kW diesel pump, tractor-driven 4100, and Diesel 30 sit on one catalogue ladder, when an electric pump is still the better buy if three-phase already exists, and what we need in an inquiry.',
          '下文说明：无电施工为什么先看柴油；农村17 kW柴油泵、拖拉机带动4100与柴油30型如何按目录阶梯选型；现场已有三相电时为何仍可能更适合电动泵；以及询盘要带哪些数据。',
        ),
      ],
      image: articleImage(
        'factory-dispatch',
        'Diesel concrete pump dispatch from Hebei Pinjin Machinery Xingtai factory for rural no-electricity sites',
        '河北品锦机械邢台工厂发出的柴油混凝土泵，用于农村无电工地',
      ),
    },
    {
      heading: L(
        'Why diesel when the site has no grid',
        '工地没有电网时为什么用柴油',
      ),
      paragraphs: [
        L(
          'Three-phase power is common on city jobs. It is not guaranteed on a rural Hebei plot, a mountain access road, or a site that still has only a single-phase farm tap. An electric pump needs that supply for the whole pour window. If the cable is missing, undersized, or shared with other plant that trips the breaker, the pump does not run.',
          '城市工地常见三相电。河北农村宅基地、进山路、只有单相农用电的地块，并不保证有三相。电动泵在整个浇筑窗口都需要这份电源。线没接到、容量不够、或和其他设备抢电跳闸，泵就开不了。三相电到位之前买电动泵，等于把浇筑日押在供电进度上，这是我们不建议的。',
        ),
        L(
          'Diesel does not solve every problem. You still need fuel on site, a clear trailer position, and a pipeline that matches the published distance. What it does solve is independence from the grid. Our engineers treat that as the first filter: if three-phase is not available when you need to pour, we start from the diesel side of the catalogue, not from the electric list.',
          '柴油并不能解决所有问题。现场仍要备油、要有摆放拖车的位置、管路还要落在公布距离内。它解决的是对电网的依赖。我们工程师的第一道筛选是：浇筑当时有没有可用三相电。没有，就从柴油目录开始，而不是从电动目录开始。',
        ),
        L(
          'We do not publish fuel litres per hour here. Consumption changes with load, idle time, and how the operator runs the engine. If you need a factory comment, send the shift length with your inquiry rather than asking us to invent a number we cannot stand behind.',
          '本文不公布每小时油耗。油耗随负载、怠速和操作习惯变化。需要工厂意见时，请把作业时长写进询盘，不要让我们编造无法背书的数字。',
        ),
      ],
    },
    {
      heading: L(
        'Catalogue ladder: rural 17 kW, tractor 4100, Diesel 30',
        '目录阶梯：农村17 kW、拖拉机4100、柴油30',
      ),
      paragraphs: [
        L(
          'For most no-grid house work and small-site pours, we keep three diesel options. The ladder is power, output, hopper, and distance. We do not list mixing plants or truck-mounted boom pumps as catalogue products, so the pump choice is which trailer table covers your pipe. Spraying machines sit on /products/spraying-machines.',
          '无电网的住房和小型工地，我们常用三档柴油机型。阶梯比的是功率、输送量、料斗和距离。目录不生产搅拌站、车载布料杆泵或喷涂机，选型就是哪一张拖式泵表格能覆盖你的管路。',
        ),
      ],
      bullets: [
        L(
          'Rural diesel concrete pump (/products/rural-diesel-concrete-pump): 17 kW diesel, 5–8 m³/h, 15 MPa, hopper 0.2 m³, 30–50 m horizontal / 10–30 m vertical, aggregate 1–3 cm, 2200 × 1100 × 1250 mm, 800 kg. This rural diesel pump is the compact match for short village pipelines and two-to-three-floor self-built houses.',
          '农村自建房柴油混凝土泵（/products/rural-diesel-concrete-pump）：17 kW柴油机，输送量5–8 m³/h，压力15 MPa，料斗0.2 m³，水平30–50 m / 垂直10–30 m，骨料1–3 cm，外形2200×1100×1250 mm，整机800 kg。短管路、两三层自建房用这一档紧凑农村柴油泵。',
        ),
        L(
          'Tractor-driven 4100 (/products/tractor-4100-concrete-pump): 40 kW, 6–12 m³/h, 15 MPa, hopper 0.25 m³, 40–100 m horizontal / 15–45 m vertical, aggregate 1–3 cm, slump 180–220 mm, 2900 × 1000 × 1350 mm, 1300 kg. Use this when the site already has a tractor and needs more horizontal reach than the 17 kW unit.',
          '拖拉机带动4100（/products/tractor-4100-concrete-pump）：40 kW，输送量6–12 m³/h，压力15 MPa，料斗0.25 m³，水平40–100 m / 垂直15–45 m，骨料1–3 cm，坍落度180–220 mm，外形2900×1000×1350 mm，整机1300 kg。现场已有拖拉机、需要比17 kW更远水平距离时用这一档。',
        ),
        L(
          'Diesel 30 (/products/diesel-30-concrete-pump): 4105 diesel, 56 kW, 15 m³/h, 20 MPa, hopper 0.3 m³, 60 m / 180 m, aggregate 3 cm and below, 4000 × 1500 × 1800 mm, 2000 kg. Step up when the pour is larger, the pipeline is longer, or the crew wants a self-contained diesel trailer rather than a tractor-driven set.',
          '柴油30型（/products/diesel-30-concrete-pump）：4105柴油机56 kW，输送量15 m³/h，压力20 MPa，料斗0.3 m³，60 m / 180 m，骨料3 cm及以下，外形4000×1500×1800 mm，整机2000 kg。浇筑量更大、管路更长、或需要独立柴油拖车而不是拖拉机带动时，上这一档。',
        ),
      ],
      image: {
        src: '/images/products/rural-diesel-concrete-pump/main.webp',
        alt: L(
          'Rural diesel concrete pump for village houses without three-phase electricity, Hebei Pinjin Machinery',
          '河北品锦机械农村自建房柴油混凝土泵，用于无三相电的村镇住房',
        ),
        caption: L(
          'Rural 17 kW diesel concrete pump from the Xingtai catalogue',
          '邢台目录中的农村17 kW柴油混凝土泵',
        ),
      },
    },
    {
      heading: L(
        'Where we see diesel used on no-electricity sites',
        '无电工地上柴油泵的常见场景',
      ),
      paragraphs: [
        L(
          'Rural house pours. A family building in a Hebei village often has a short line from the mixer to the slab or to a second-floor wall. If the run stays inside 30–50 m horizontal and 10–30 m vertical, the 17 kW rural diesel pump is the catalogue match. If the house sits farther from the mixer or needs a taller lift, we read the tractor 4100 table first.',
          '农村自建房。河北村里从搅拌机到楼板或二层墙的管路往往不长。水平落在30–50 m、垂直落在10–30 m时，17 kW农村柴油泵是目录对应机型。房子离搅拌机更远或要打得更高，先对照拖拉机4100的表。邢台周边自建房、乡镇路边的小型地坪，都是这类无三相电的典型现场。',
        ),
        L(
          'Small contractors moving between villages. They need a trailer they can tow, start without waiting for the power bureau, and park on uneven ground. Diesel 30 is the usual request when several houses or a small commercial slab share one crew and one machine, and the published 15 m³/h and 60 m / 180 m table still covers the pipe.',
          '在村子之间流动的小型施工队。需要能拖走、不等供电所、能在不平地面停放的拖车。几户连打或小型商业地坪、一台机器跟一组人，且公布的15 m³/h与60 m / 180 m仍能覆盖管路时，常见是要柴油30。',
        ),
        L(
          'Sites that have a generator too small for an electric motor, or a generator that must also run lighting and tools. Putting the pump on its own diesel engine keeps the pour independent of that shared load. None of these cases need a boom. They need a trailer pump and a pipe run we can check against the published metres.',
          '发电机带不动电动泵电机，或发电机还要带照明和工具。泵用自己的柴油机，浇筑不跟那份共用负荷绑在一起。这些工况需要的是拖式泵和能按公布米数核对的管路，不是布料杆。',
        ),
      ],
    },
    {
      heading: L(
        'When electric is still better if three-phase exists',
        '现场已有三相电时，电动泵往往更合适',
      ),
      paragraphs: [
        L(
          'Diesel is not automatically better. If the site already has a stable three-phase supply sized for the motor, an electric pump is usually quieter, simpler on a long shift, and easier to place next to a building that restricts exhaust. Our electric catalogue starts at 15 kW for compact work and steps through 22 kW and 30 kW machines with published output and distance.',
          '柴油不是默认更好。若工地已有稳定、容量够电机的三相电，电动泵通常更安静、长班次更好开，也更容易放在限制尾气的建筑物旁。电机只要电源稳定，连续作业通常比柴油更省事。我们电动目录从15 kW紧凑机型起，再到22 kW、30 kW，输送量和距离均按表公布。',
        ),
        L(
          'We tell buyers the same rule in both directions: match the power source first, then match the metres. Do not buy a diesel concrete pump only because it sounds more independent if the grid is already there and reliable. Do not buy electric because it looks simpler on paper if the three-phase cable will not be ready on pour day.',
          '两个方向同一条规则：先对电源，再对米数。电网已经可靠，不要只因为“更独立”就买柴油混凝土泵。浇筑当天三相电缆还没到位，也不要只看纸面简单就买电动。',
        ),
        L(
          'For the full diesel list, use the diesel hub at /products/diesel-concrete-pumps. For building-site layout, see /solutions/construction. For a factory quote from Xingtai, use /contact with the checklist below.',
          '完整柴油机型见柴油泵专页 /products/diesel-concrete-pumps。建筑工地布置见 /solutions/construction。邢台工厂报价走 /contact，并带上下面清单。',
        ),
      ],
    },
    {
      heading: L(
        'Inquiry checklist for the Xingtai factory',
        '写给邢台工厂的询盘清单',
      ),
      paragraphs: [
        L(
          'When you write to us, send the facts that let us map the job onto one published table. We will point you to the rural 17 kW, the tractor 4100, or the Diesel 30, and we will say so if you need a larger diesel from the same hub. We will not invent a fuel L/h figure.',
          '写信给我们时，请带上能对上公布表格的工况。弯头、垂直段和骨料粒径缺一项，我们就无法对照表格。我们会指向农村17 kW、拖拉机4100或柴油30型；若需要同专页里更大的柴油机型，也会直接说明。我们不会编造每小时油耗。',
        ),
      ],
      bullets: [
        L(
          'Whether three-phase power is available on pour day, and at what capacity if you know it.',
          '浇筑当天有没有三相电，知道容量请写上。',
        ),
        L(
          'Horizontal pipe length and vertical height in metres, including elbows you can count.',
          '水平管长和垂直高度（米），能数的弯头一并写。',
        ),
        L(
          'Aggregate size: we publish 1–3 cm on the rural diesel pump and tractor 4100; Diesel 30 lists 3 cm and below.',
          '骨料粒径：农村柴油泵和拖拉机4100公布1–3 cm；柴油30为3 cm及以下。',
        ),
        L(
          'Target output in m³/h, or at least the pour volume and the hours you have.',
          '目标输送量 m³/h，或至少浇筑方量和可用小时数。',
        ),
        L(
          'Whether you already have a tractor (for the 4100) or need a self-contained diesel trailer.',
          '是否已有拖拉机（对应4100），还是需要自带柴油机的拖车。',
        ),
        L(
          'Site access: can an 800 kg, 1300 kg, or 2000 kg machine sit where the hopper can be fed.',
          '进场条件：800 kg、1300 kg 或 2000 kg 的机器能否放到料斗能上料的位置。',
        ),
      ],
    },
  ],
  faqs: [
    {
      question: L(
        'Can we run an electric pump if the site has no three-phase power?',
        '工地没有三相电，还能开电动泵吗？',
      ),
      answer: L(
        'Only if you can supply the motor for the whole pour. A missing, weak, or shared tap is why we start from diesel for no electricity construction. If three-phase will not be ready on pour day, look at the rural diesel pump, tractor 4100, or Diesel 30 rather than hoping a small generator will hold an electric machine.',
        '只有在整个浇筑窗口都能给电机供电时才可以。线没有、容量弱、或和其他设备抢电，正是无电施工我们从柴油开始的原因。浇筑当天三相电还没到位，就看农村柴油泵、拖拉机4100或柴油30，不要指望小发电机能稳住电动泵。',
      ),
    },
    {
      question: L(
        'Is the 17 kW rural diesel pump enough for a three-floor village house?',
        '17 kW农村柴油泵打三层村房够不够？',
      ),
      answer: L(
        'It is the catalogue match when the pipe stays inside 30–50 m horizontal and 10–30 m vertical, with 1–3 cm aggregate and 5–8 m³/h. A taller lift or a longer run from the mixer should be checked against the tractor 4100 table (15–45 m vertical, 40–100 m horizontal) before you assume the 17 kW unit is enough.',
        '管路落在水平30–50 m、垂直10–30 m，骨料1–3 cm、输送量5–8 m³/h时，它是目录对应机型。打得更高，或搅拌机离房子更远，应先对照拖拉机4100的表（垂直15–45 m、水平40–100 m），不要默认17 kW一定够。',
      ),
    },
    {
      question: L(
        'Tractor 4100 or Diesel 30 — which should a village crew buy?',
        '村镇施工队该选拖拉机4100还是柴油30？',
      ),
      answer: L(
        'Buy the tractor 4100 if you already have a tractor and the job fits 6–12 m³/h, 15 MPa, and 40–100 m / 15–45 m. Buy Diesel 30 when you want a self-contained 56 kW diesel trailer with 15 m³/h, 20 MPa, and 60 m / 180 m. The extra mass is 2000 kg versus 1300 kg, so also check access.',
        '现场已有拖拉机，且工况落在6–12 m³/h、15 MPa、40–100 m / 15–45 m时，选拖拉机4100。需要自带56 kW柴油机的拖车，输送量15 m³/h、压力20 MPa、60 m / 180 m时，选柴油30。整机重量分别是2000 kg和1300 kg，进场也要核对。',
      ),
    },
    {
      question: L(
        'Do you publish fuel consumption for these diesel pumps?',
        '这些柴油泵公布油耗吗？',
      ),
      answer: L(
        'No. We do not invent litres per hour. Fuel use depends on load, idle, and how the engine is run. Send pour hours and which model you are comparing (rural 17 kW, tractor 4100, or Diesel 30) to /contact, and we will answer from the factory without a fake L/h figure.',
        '不公布。我们不会编造每小时升数。油耗随负载、怠速和操作变化。把浇筑小时数和对比机型（农村17 kW、拖拉机4100或柴油30）发到 /contact，由工厂答复，不给虚假油耗。',
      ),
    },
  ],
};
