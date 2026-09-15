import type { BlogPost } from '@/data/blog';
import { getFactorySlide } from '@/data/factory';
import type { LocalizedText } from '@/i18n/types';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

function articleImage(id: string, enAlt?: string, zhAlt?: string) {
  const slide = getFactorySlide(id);
  if (!slide) {
    throw new Error(`Missing factory slide: ${id}`);
  }
  return {
    src: slide.image,
    alt: enAlt && zhAlt ? L(enAlt, zhAlt) : slide.alt,
    caption: slide.title,
  };
}

export const article: BlogPost = {
  slug: 'high-rise-building-concrete-pump-selection',
  title: L(
    'High-rise building concrete pump selection: convert floors to metres first',
    '高层建筑混凝土泵选型：先把楼层换成垂直米数',
  ),
  seoTitle: L(
    'High Rise Concrete Pump Selection | Vertical Pumping Height | Electric 80',
    '高层混凝土泵选型｜垂直泵送高度｜电动80型混凝土泵',
  ),
  description: L(
    'Xingtai engineers convert floor count to vertical metres, then add horizontal pipe before matching Electric 40, 60 and 80 catalogue heights. We do not sell truck-mounted placing booms.',
    '邢台工程师先把楼层换成垂直米数，再计入水平管路，对照电动40、60、80目录高度选型。我们不销售车载布料杆。',
  ),
  category: 'application-solutions',
  date: '2026-08-28',
  keywords: [
    'high rise concrete pump',
    'vertical pumping height',
    'electric 80 concrete pump',
  ],
  relatedProductSlugs: [
    'electric-40-concrete-pump',
    'electric-60-concrete-pump',
    'electric-80-concrete-pump',
  ],
  relatedPaths: [
    {
      href: '/products/electric-concrete-pumps',
      label: L(
        'Electric concrete pump catalogue',
        '电动混凝土泵目录',
      ),
    },
    {
      href: '/solutions/construction',
      label: L(
        'Concrete pump for building construction',
        '建筑施工混凝土泵方案',
      ),
    },
    {
      href: '/product-selection-guide',
      label: L(
        'Concrete pump product selection guide',
        '混凝土泵选型指南',
      ),
    },
  ],
  content: [
    {
      heading: L(
        'Convert floors to vertical metres before you name a pump',
        '先把楼层换成垂直米数，再谈选型',
      ),
      paragraphs: [
        L(
          'When a contractor writes to us in Xingtai and asks for a high rise concrete pump for “20 floors”, our engineers do not start with a model name. We convert the building into a vertical pumping height. A storey-to-storey height around 3 m is a planning figure we use on the desk: 20 floors × about 3 m ≈ 60 m of rise. Podium decks, transfer floors and basement ramps change that number, so we still ask for the estimated floor-to-floor height rather than treating “20 floors” as a specification.',
          '承包商写信到邢台，说要一台“20层”用的高层混凝土泵时，我们的工程师不会先报型号。我们先把建筑换成垂直泵送高度。层高按约 3 m 做案头换算：20 层 × 约 3 m ≈ 60 m 垂直高度。裙房、转换层和地下室坡道都会改这个数字，所以我们仍会问估算层高，而不是把“20层”当成技术参数。这一步是在任泽工业园区把采购语言改成目录语言：目录只公布米，不公布“层”。',
        ),
        L(
          'That 60 m figure is only the riser. Catalogue tables list a vertical pumping height and a horizontal distance as separate published numbers. Matching a trailer pump to a building means reading both columns against the mix you will actually pump — fine stone, 13 mm stone or about 2 cm aggregate — not against a floor count on a drawing title block.',
          '这 60 m 只是立管高度。目录表把垂直泵送高度和水平距离分成两列公布。把拖式泵对上建筑，要按实际要打的料——细石、13 mm 石子或约 2 cm 骨料——去读这两列，而不是对着图纸标题栏上的层数。细石行和 13 mm 行不是同一组余量，混用两列会把可打高度看宽。',
        ),
      ],
      image: {
        src: '/images/applications/pinjin-concrete-pump-building-construction.webp',
        alt: L(
          'Hebei Pinjin Machinery concrete pump on a building construction site for vertical pumping height matching',
          '河北品锦机械混凝土泵在建筑工地，用于对照垂直泵送高度',
        ),
        caption: L(
          'Building placement still needs a metre figure, not only a floor count.',
          '建筑浇筑仍要落到米数，而不是只报层数。',
        ),
      },
    },
    {
      heading: L(
        'Add horizontal pipe loss to the 60 m rise',
        '在 60 m 垂直高度之外，还要加上水平管路',
      ),
      paragraphs: [
        L(
          'On a typical building plot the pump stands at ground level. Delivery pipe runs horizontally to the core, then vertically, then horizontally again across the working floor. Every metre of that ground line and deck line is part of the job. We do not invent an “equivalent length” formula that is not printed in the catalogue. We ask for the planned ground-pipe length, the number of 90° bends you already know about, and the aggregate size, then we sit those facts next to the listed H / V columns.',
          '常见工地里，泵停在地面。输送管先水平接到核心筒，再垂直上去，再在作业层水平铺开。地面管和楼面管的每一米都算工况。目录没有印发“当量长度”换算式，我们不会另编一套，也不把弯头折算成未公布的等效米数。我们会问计划的地面管长、已经知道的 90° 弯头数量和骨料粒径，再把这些事实放到目录水平/垂直两列旁边对照。',
        ),
        L(
          'That is why a 20-floor request can still be the wrong Electric 40 match even when 60 m looks smaller than a listed vertical pumping height. If the remaining horizontal budget is short, the mix will see the ground line first. Send us a simple sketch: pump station, riser, deck run. We would rather read that sketch in Renze Industrial Park than guess a boom radius we do not manufacture.',
          '所以即使用 60 m 去对比目录垂直泵送高度显得有余量，20 层仍可能对不上电动40：水平余量不够时，料会先消耗在地面管上。把泵位、立管、楼面管画一张简图发给我们。我们更愿意在任泽工业园区读这张简图，而不是去猜我们并不生产的布料杆幅度。高层选型问的是米和管，不是底盘上的臂架半径。',
        ),
      ],
      bullets: [
        L(
          'Planning conversion we use: 20 floors × ~3 m ≈ 60 m vertical, then add the ground and deck pipe you can measure.',
          '案头换算：20 层 × 约 3 m ≈ 60 m 垂直，再计入量得到的地面管和楼面管。没有量过地面管时，不要只用层数去对电动40的垂直列。',
        ),
        L(
          'Catalogue distances are listed by aggregate class. Fine-stone figures are not a 24 mm or 2 cm figure.',
          '目录距离按骨料分级公布。细石数字不能当成 24 mm 或 2 cm 骨料的数字。电动40、60、80 三张表要读到对应石子那一行再比 60 m 立管。',
        ),
      ],
    },
    {
      heading: L(
        'Electric 40 listed height: 45 kW, 21 m³/h, two aggregate columns',
        '电动40目录高度：45 kW、21 m³/h，两列骨料',
      ),
      paragraphs: [
        L(
          'The Electric 40 concrete pump we build in Xingtai is listed at 45 kW, 21 m³/h, 23 MPa and a 0.4 m³ hopper. Fine-stone conveying is published as 120 m horizontal / 360 m vertical. The 13 mm aggregate column is 40 m horizontal / 120 m vertical. Main-unit weight is 2300 kg at 3900 × 1500 × 1600 mm, with a Kawasaki 112 hydraulic pump. Those are catalogue numbers, not a completed tower we are claiming.',
          '我们在邢台制造的电动40型混凝土泵，目录为 45 kW、21 m³/h、23 MPa、料斗 0.4 m³。细石输送公布为水平 120 m / 垂直 360 m。13 mm 骨料一列为水平 40 m / 垂直 120 m。整机 2300 kg，外形 3900 × 1500 × 1600 mm，液压泵为川崎 112。电机功率、料斗容积和输送量都写在产品页上，和现场层数没有自动换算关系。这些是目录数字，不是我们在声称某座已完工的塔楼。',
        ),
        L(
          'Read the 13 mm column against a 60 m riser with honest eyes. The listed vertical pumping height of 120 m sits above 60 m, but the listed horizontal is only 40 m. A long ground line can close that 40 m before the pipe ever turns up the building. Fine-stone 120 m / 360 m looks roomier; it only applies if the mix is actually fine stone. We use Electric 40 as a starting comparison for medium buildings with stable three-phase power, not as a universal high-rise answer.',
          '用 60 m 立管去读 13 mm 这一列，要老实：目录垂直泵送高度 120 m 高于 60 m，但水平只有 40 m。地面管一长，这 40 m 可能在管子拐上楼之前就用完。细石 120 m / 360 m 看起来宽裕，前提是料真是细石。读 45 kW 电机也以现场有稳定三相电为前提。电动40是我们给供电稳定的中型建筑做对照的起点，不是所有高层的统一答案。',
        ),
      ],
    },
    {
      heading: L(
        'Electric 60 listed height: 90 kW, 40 m³/h, three stone sizes',
        '电动60目录高度：90 kW、40 m³/h，三种石子',
      ),
      paragraphs: [
        L(
          'The Electric 60 concrete pump is listed at 90 kW, 40 m³/h, 35 MPa and a 0.7 m³ hopper. Fine stone is 200 m horizontal / 600 m vertical. 13 mm stone is 150 m / 450 m. 24 mm stone is 100 m / 300 m. The frame is 6600 × 1800 × 1800 mm at 3300 kg, with a Kawasaki double 112 pump. Output moves from 21 m³/h on Electric 40 to 40 m³/h here, which matters when the pour window on a floor is short.',
          '电动60型混凝土泵目录为 90 kW、40 m³/h、35 MPa、料斗 0.7 m³。细石、13 mm、24 mm 三行要分开读：细石水平 200 m / 垂直 600 m，13 mm 石子 150 m / 450 m，24 mm 石子 100 m / 300 m。不能拿细石行去套 24 mm 浇筑，也不能用 600 m 去理解 20 层现场。外形 6600 × 1800 × 1800 mm，整机 3300 kg，液压为川崎双 112。输送量从电动40的 21 m³/h 到这里的 40 m³/h，楼层浇筑窗口短的时候这个差有意义。',
        ),
        L(
          'If your mix is closer to 24 mm, the published vertical pumping height to compare with that 60 m rise is 300 m, with 100 m listed horizontally. That is still a catalogue envelope, not a promise that any 20-floor layout will run at 40 m³/h. We ask for slump and maximum aggregate together so we do not read the fine-stone row when the batch plant is feeding 24 mm stone.',
          '若配合比更接近 24 mm，拿来对照 60 m 升高的目录垂直泵送高度是 300 m，水平列为 100 m。机重 3300 kg 和双 112 泵说明这是更大一档拖式泵，不是某工地的实测记录。这仍是目录包络，不是保证任何 20 层布置都能打到 40 m³/h。我们会同时要坍落度和最大骨料，避免搅拌站在供 24 mm 石子时我们却去读细石那一行。',
        ),
      ],
    },
    {
      heading: L(
        'Electric 80 listed height: HBT80-1816-110 at 300 m vertical',
        '电动80目录高度：HBT80-1816-110，垂直 300 m',
      ),
      paragraphs: [
        L(
          'Buyers searching for an electric 80 concrete pump are usually trying to protect vertical pumping height and hourly output together. Our Electric 80 is listed as HBT80-1816-110: 110 kW, 60 m³/h, 40 MPa, 0.7 m³ hopper, 900 m horizontal / 300 m vertical at 2 cm aggregate, Kawasaki 140 double pump, 6600 × 1800 × 1800 mm, 6000 kg. The 300 m vertical figure is the catalogue number we put next to a high-rise riser when the stone is in that 2 cm class.',
          '检索电动80型混凝土泵的采购方，通常是想同时保住垂直泵送高度和小时输送量。我们的电动80目录型号为 HBT80-1816-110：110 kW、60 m³/h、40 MPa、料斗 0.7 m³，2 cm 骨料下水平 900 m / 垂直 300 m，川崎 140 双泵，外形 6600 × 1800 × 1800 mm，整机 6000 kg。这一档把垂直 300 m 和 60 m³/h 写在同一张表上。石子落在约 2 cm 这一档时，我们把目录垂直 300 m 放到高层立管旁边对照。',
        ),
        L(
          '60 m³/h is the listed theoretical output, twice Electric 60’s 40 m³/h and well above Electric 40’s 21 m³/h. For a building pour that has to cover a floor before a cold joint, that column can matter as much as the 300 m height. Power demand is 110 kW, so the site still needs a three-phase supply that can hold that motor. We manufacture this trailer pump in Xingtai; we do not turn it into a truck-mounted boom on the same page.',
          '60 m³/h 是目录理论输送量，高于电动60的 40 m³/h，也明显高于电动40的 21 m³/h。要在冷缝出现前铺完一层时，这一列可以和 300 m 高度同样重要。电机 110 kW，现场仍需撑得住这台电机的三相电源；询价时请写清变压器或发电机能否带该电机。我们在邢台制造的是这台拖式泵，不会在同一页上把它写成车载臂架。',
        ),
      ],
      image: articleImage(
        'concrete-manufacturing',
        'Electric trailer concrete pump manufacturing at Hebei Pinjin Machinery in Xingtai for high-rise pipeline pumping',
        '河北品锦机械邢台工厂制造用于高层管路泵送的电动拖式混凝土泵',
      ),
    },
    {
      heading: L(
        'We sell pipeline trailer pumps, not truck-mounted placing booms',
        '我们卖管路拖式泵，不卖车载布料杆',
      ),
      paragraphs: [
        L(
          'Hebei Pinjin Machinery in Renze Industrial Park, Xingtai, publishes electric trailer pumps, diesel trailer pumps and mixer pumps. We do not sell truck-mounted placing booms, and we do not list a boom pump in the catalogue. If a drawing calls for a 30 m or 50 m boom on a chassis, that is a different machine family. Our high-rise answer is a stationary or trailer pipeline from the pump hopper to the floor, sized against the listed H / V tables above.',
          '河北品锦机械在邢台任泽工业园区公布的是电动拖式泵、柴油拖式泵和搅拌泵。我们不销售车载布料杆，目录里也没有臂架泵。若图纸要的是底盘上 30 m 或 50 m 布料杆，那是另一类设备。我们的高层答案是从泵料斗到楼面的固定或拖式管路，按上面的目录水平/垂直表来对照。',
        ),
        L(
          'We also do not manufacture mixing plants as catalogue products. Spraying machines are listed separately. For building work, start on the electric hub and the construction solutions page, then use the product selection guide with floor height, pipe plan and aggregate written down. When those three numbers are on the inquiry, our engineers can compare Electric 40, Electric 60 and Electric 80 without padding the table.',
          '搅拌站和喷涂机也不是我们的目录产品。建筑项目请从电动泵枢纽页和建筑施工方案页入手，再打开选型指南，把层高、管路布置和骨料写清楚。选型指南把高层/中型/小型目录型号并列，便于把 60 m 立管放到电动40、60、80 之间比较。询价里有这三项，我们的工程师就可以对照这三台泵，不必往参数表里添数字。',
        ),
      ],
    },
  ],
  faqs: [
    {
      question: L(
        'Does 20 floors always mean the Electric 40 is enough?',
        '20 层是不是一定选电动40就够？',
      ),
      answer: L(
        'No. 20 floors × about 3 m is only ≈ 60 m of vertical rise. Electric 40 lists 120 m vertical on 13 mm aggregate, but only 40 m horizontal on that same row. Long ground pipe, 24 mm stone, or a short pour window can push the comparison to Electric 60 (24 mm: 100 m / 300 m) or the Electric 80 (900 m / 300 m at 2 cm aggregate, 60 m³/h).',
        '不是。20 层 × 约 3 m 只是约 60 m 垂直升高。电动40在 13 mm 骨料下列垂直 120 m，但同一行水平只有 40 m，地面管一长就会先碰到水平列。地面管长、24 mm 石子或浇筑窗口短，对照就会转到电动60（24 mm：100 m / 300 m，40 m³/h）或电动80（2 cm 骨料 900 m / 300 m，60 m³/h）。',
      ),
    },
    {
      question: L(
        'Why do you ask for ground-pipe length as well as floor count?',
        '为什么除了层数还要问地面管长度？',
      ),
      answer: L(
        'Catalogue vertical pumping height is one column. Horizontal distance is another. A high-rise building uses both: ground line, riser, then deck line. We do not publish an extra conversion ratio beyond those listed metres. Measuring the horizontal run keeps us from spending the whole vertical column on floors that still need pipe on the ground.',
        '目录垂直泵送高度是一列，水平距离是另一列。高层建筑两列都用得到：地面管、立管、再楼面管。除已公布的米数外，我们不再另发换算比。量出水平段，才不会把整列垂直高度都花在楼层上，却忘了地上还要铺管。',
      ),
    },
    {
      question: L(
        'Do you sell truck-mounted placing booms for high-rise work?',
        '高层施工你们卖车载布料杆吗？',
      ),
      answer: L(
        'No. We do not sell truck-mounted placing booms and we do not invent boom-pump models. High-rise matching on our side is trailer pipeline pumping with Electric 40, Electric 60 or Electric 80, using the published H / V figures and the site pipe plan.',
        '不卖。我们不销售车载布料杆，也不编造臂架泵型号。我们这边的高层对照是电动40、电动60或电动80的拖式管路泵送，用已公布的水平/垂直数字和现场管线布置。',
      ),
    },
    {
      question: L(
        'When should we look at the Electric 80 instead of the Electric 60?',
        '什么时候该看电动80而不是电动60？',
      ),
      answer: L(
        'Look at Electric 80 when you need the listed 60 m³/h output or the 900 m / 300 m envelope at 2 cm aggregate and 110 kW. Electric 60 lists 40 m³/h, 35 MPa and 24 mm stone at 100 m / 300 m. Same 300 m vertical class on those two rows does not make the hourly output the same. Send pour volume per hour with the height.',
        '需要目录 60 m³/h 输送量，或需要 2 cm 骨料下 900 m / 300 m 包络和 110 kW 时，看电动80。电动60目录为 40 m³/h、35 MPa，24 mm 石子 100 m / 300 m。这两行同属 300 m 垂直这一档，并不等于小时输送量相同，也不能把电动60的细石 600 m 垂直套到电动80的 2 cm 行上。高度要连同每小时浇筑量一起发来。',
      ),
    },
  ],
};
