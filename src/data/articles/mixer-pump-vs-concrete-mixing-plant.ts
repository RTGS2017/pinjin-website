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
  slug: 'mixer-pump-vs-concrete-mixing-plant',
  title: L(
    'Mixer Pump vs Mixing Plant: Trailer Mix and Pump',
    '搅拌泵不是搅拌站：拖车上搅拌并泵送',
  ),
  seoTitle: L(
    'Mixer Pump vs Concrete Mixing Plant | Pinjin',
    '搅拌泵与混凝土搅拌站区别 | 品锦',
  ),
  description: L(
    'A mixer pump is not a mixing plant. Pinjin builds mix-plus-pump trailers in Xingtai, not batching plants. Electric 45 kW + 14 kW, 21 m³/h; diesel 4108 66–75 kW, 25 m³/h.',
    '搅拌泵不是搅拌站。品锦在邢台制造搅拌加泵送一体拖车，不生产搅拌站。电动主电机45 kW加搅拌14 kW、21 m³/h；柴油4108 66–75 kW、25 m³/h。',
  ),
  category: 'product-guide',
  date: '2026-08-31',
  keywords: [
    'mixer pump',
    'concrete mixing plant difference',
    'integrated mixer pump',
  ],
  relatedProductSlugs: [
    'integrated-mixer-pump',
    'diesel-mixer-integrated-pump',
    'electric-40-concrete-pump',
  ],
  relatedPaths: [
    { href: '/products/mixer-pumps', label: L('Mixer pump catalogue', '搅拌泵目录') },
    {
      href: '/solutions/construction',
      label: L('Building construction pumping', '建筑施工泵送应用'),
    },
    { href: '/contact', label: L('Contact Xingtai factory', '联系邢台工厂') },
  ],
  content: [
    {
      heading: L(
        'A Mixer Pump Is Not a Mixing Plant',
        '搅拌泵不是混凝土搅拌站',
      ),
      paragraphs: [
        L(
          "We hear the same mix-up almost every week. A buyer writes mixing plant, then sends a photo of a trailer with a mixer and a pump hopper. A mixer pump is not a concrete mixing plant. We do not manufacture mixing plants at Hebei Pinjin Machinery in Xingtai. What we build is mix plus pump on one trailer.",
          '几乎每周我们都会碰到同一种混淆。询盘写着搅拌站或配料站，随附的照片却是一台带着搅拌筒和泵送料斗的拖车。那不是同一种设备。搅拌泵不是混凝土搅拌站。河北品锦机械在邢台不生产搅拌站。我们做的是把搅拌和泵送放在同一辆拖车上。',
        ),
        L(
          "A mixing plant sits on a yard. It batches cement, sand, stone and water, then loads mixer trucks. It does not travel to a house site and it does not push concrete through pipe. If you need a plant, you need a different factory.",
          '搅拌站固定在搅拌场地。它把水泥、砂、石和水按配比计量，再装进搅拌车。它需要基础、料仓和生产布置。它不会开到两层自建房旁边，也不会把混凝土压进输送管。如果你的工程确实要搅拌站，需要找另一类厂家。我们会在第一通电话里把话说清楚，而不是把目录往外撑。',
        ),
        L(
          "Our published pump line in Renze Industrial Park covers electric trailer pumps, diesel trailer pumps, and integrated mixer pumps. It does not list a batching plant or a truck-mounted boom pump. Spraying machines are listed separately. When the site must mix on the ground and place through pipe, we ship a mixer pump.",
          '任泽工业园区里，我们已公布的产品线覆盖电动拖泵、柴油拖泵和搅拌泵一体机。目录里没有配料站、没有车载臂架泵、也没有喷浆机。工地若要从搅拌站拉商品混凝土，搅拌泵替不了那个场地。工地若要在现场拌料再经管道浇筑，搅拌泵才是我们真正发货的机型。',
        ),
      ],
      table: {
        headers: [
          L('Point', '对照点'),
          L('Mixer pump (Pinjin catalogue)', '搅拌泵（品锦目录）'),
          L('Mixing plant', '搅拌站'),
        ],
        rows: [
          [
            L('What it is', '是什么'),
            L('Mix and pump on one trailer', '同一拖车搅拌并泵送'),
            L('Yard batching that loads trucks', '场地计量搅拌并装车'),
          ],
          [
            L('Published output', '已公布产量'),
            L('Electric 21 m³/h; diesel 25 m³/h', '电动 21 m³/h；柴油 25 m³/h'),
            L('Not listed — Pinjin does not manufacture plants', '未列入——品锦不生产搅拌站'),
          ],
          [
            L('Power on this site', '本站动力'),
            L('Electric 45 kW + 14 kW, or diesel 4108 66–75 kW', '电动 45 kW + 14 kW，或柴油 4108 66–75 kW'),
            L('Not a Pinjin catalogue line', '不是品锦目录行'),
          ],
        ],
      },
    },
    {
      heading: L(
        'Mix Plus Pump on One Trailer',
        '同一辆拖车上完成搅拌和泵送',
      ),
      paragraphs: [
        L(
          "On our assembly floor a mixer pump is one chassis with two jobs. You feed materials into the mixer; the pump then pushes that mix through pipe. You need aggregate within the listed size, a pipeline plan, and power: grid for electric, diesel for off-grid.",
          '在装配现场，搅拌泵是一台底盘上的两道工序。骨料、水泥和水进搅拌装置，现场出混凝土；泵再从料斗把拌合物压进管道。你不必按商品混凝土时间表等搅拌车，也不必给搅拌站打基础。你需要的是粒径落在目录范围内的骨料、一套管路方案，以及动力：电动机能接电网，柴油机能在无三相电的工地工作。',
        ),
        L(
          "That trailer is still a pump, not a plant. The output we publish is the pumping circuit. Electric integrated mixer pump: 21 m³/h. Diesel mixer integrated pump: 25 m³/h. See /products/integrated-mixer-pump and /products/diesel-mixer-integrated-pump. Those are not mixing-plant ratings.",
          '那台拖车仍然是泵，不是搅拌站。我们公布的输送量属于泵送回路，不是搅拌站的小时搅拌产能。电动搅拌泵一体机目录为21 m³/h，柴油搅拌泵一体机目录为25 m³/h。数字写在 /products/integrated-mixer-pump 与 /products/diesel-mixer-integrated-pump。它们不是搅拌站额定产量，我们也不会按搅拌站去卖。',
        ),
        L(
          "The mixer-pump family sits on /products/mixer-pumps. If you only need to pump concrete that already arrives mixed, look at a trailer pump. The mixer is extra mass and extra power. Buy it when you will use it.",
          '搅拌泵系列集中在 /products/mixer-pumps。如果混凝土已经拌好、你只需泵送，应看拖式混凝土泵。底盘上的搅拌装置是额外质量和额外功率。要用到搅拌，再买带搅拌的机型。',
        ),
      ],
      image: {
        src: '/images/products/integrated-mixer-pump/main.webp',
        alt: L(
          'Integrated mixer pump trailer, mix and pump, Xingtai factory',
          '邢台工厂搅拌泵一体机拖车，现场搅拌并泵送，不是搅拌站',
        ),
        caption: L(
          'Electric integrated mixer pump: mix and pump on one trailer',
          '电动搅拌泵一体机：搅拌与泵送在同一拖车',
        ),
      },
    },
    {
      heading: L(
        'Electric Integrated Mixer Pump Catalogue',
        '电动搅拌泵一体机目录参数',
      ),
      paragraphs: [
        L(
          "The electric unit we quote most often is the Integrated Mixer Pump. Catalogue power is split: main motor 45 kW for the pump, mixer motor 14 kW for the mixer. Theoretical output 21 m³/h. Maximum outlet pressure 23 MPa. Hopper 0.4 m³. Conveying 100 m / 300 m. Aggregate 4 cm and below. Pipe 100 / 125 mm. Outline 3900 × 1500 × 1600 mm. Main unit weight 4500 kg.",
          '工程上我们谈得最多的电动型号是搅拌泵一体机。目录功率是分开写的：主电机45 kW给泵送，搅拌电机14 kW给搅拌。理论输送量21 m³/h，最大出口压力23 MPa，料斗0.4 m³，目录输送距离100 m / 300 m，最大骨料粒径4 cm及以下，输送管内径100 / 125 mm，外形3900 × 1500 × 1600 mm，整机重量4500 kg。',
        ),
        L(
          "The series note sizes the mixer drum, not a plant. We list a 30 series with a 400 mixer and 40 / 50 series with a 500 mixer. That is still a trailer mixer feeding a pump hopper.",
          '同一张表上的系列说明，用在选定搅拌筒规格，而不是用来买搅拌站。目录写30系列配400搅拌机、40 / 50系列配500搅拌机。那仍是给泵送料斗供料的拖车搅拌，不是搅拌楼、不是皮带配料、也不是装车站。若有经销商按搅拌站报价，却指向这台4500 kg拖车，名称已经被换掉了。',
        ),
        L(
          "Weight is the fastest check. Pump-only Electric 40 on /products/electric-40-concrete-pump shares 45 kW, 21 m³/h and 23 MPa, but weighs 2300 kg with no 14 kW mixer. The mixer pump at 4500 kg is heavier because mix and pump travel together. If you already buy ready-mix, skip the mixer.",
          '重量是装配现场最快的核对。仅泵送的电动40型写在 /products/electric-40-concrete-pump，同样是45 kW主电机、21 m³/h、23 MPa，但整机2300 kg，因为那台底盘没有14 kW搅拌电机。搅拌泵4500 kg更重，是因为搅拌和泵送一起走。若你已经购买商品混凝土，就是在为用不到的搅拌装置付钱。',
        ),
      ],
      image: articleImage(
        'trailer-assembly',
        'Trailer mixer pump assembly at Pinjin Xingtai, mix and pump on one chassis',
        '品锦邢台拖车搅拌泵装配，搅拌与泵送共底盘，不是配料搅拌站',
      ),
    },
    {
      heading: L(
        'Diesel Mixer Pump Versus the Electric 40 Pump',
        '柴油搅拌泵，以及它和电动40型拖泵的差别',
      ),
      paragraphs: [
        L(
          "Sites without three-phase power ask for the Diesel Mixer Integrated Pump. Catalogue engine: 4108 diesel, 66–75 kW. Output 25 m³/h. Pressure 23 MPa. Hopper 0.4 m³. Stone 1 inch and below: 100 / 300 m. 13 mm stone: 60 / 180 m. 24 mm stone: 40 / 120 m. Outline 4100 × 2200 × 3000 mm. Weight 4200 kg.",
          '没有稳定三相电的工地会问柴油搅拌泵一体机。目录发动机是4108柴油机，66–75 kW。理论输送量25 m³/h，最大出口压力23 MPa，料斗0.4 m³。粒径1英寸及以下时表列为100 / 300 m；13 mm石子为60 / 180 m；24 mm石子为40 / 120 m。外形4100 × 2200 × 3000 mm，整机重量4200 kg。',
        ),
        L(
          "That diesel trailer still mixes and pumps on one chassis. It is not a mobile mixing plant. Output stays at 25 m³/h. Distance shrinks as stone grows, so we ask aggregate size before pressure. We do not publish fuel litres per hour.",
          '那台柴油拖车仍然是同一底盘上搅拌加泵送。它不是移动搅拌站。输送量就停在目录的25 m³/h。石子变大，距离就缩短，所以我们谈压力之前先问骨料粒径。我们不公布小时油耗，也不会为了和场地搅拌站比一比而编一个油耗数字。',
        ),
        L(
          "Choose Electric 40 when mix is already made and the site has grid power. Choose the electric mixer pump when you mix on site and want the 45 kW / 21 m³/h pump circuit. Choose the diesel mixer pump when there is no grid. None of them is a mixing plant.",
          '混凝土已经拌好、工地有电网，选电动40型。要在现场搅拌、又要用45 kW / 21 m³/h这一套泵送回路，选电动搅拌泵。没有电网、仍要搅拌加泵送，选柴油搅拌泵。三台设备，三种活。没有一台是搅拌站。',
        ),
      ],
    },
    {
      heading: L(
        'Where a Mixer Pump Fits on a Construction Site',
        '搅拌泵适合什么样的施工现场',
      ),
      paragraphs: [
        L(
          "This machine fits compact pours that mix on the ground: rural and self-built houses, secondary structure, and small building work. Notes live on /solutions/construction. It earns the 4500 kg or 4200 kg when the crew batches beside the trailer and places through 100 / 125 mm pipe.",
          '对得上这台设备的，是在现场拌料的紧凑浇筑：农村与自建房、二次结构、搅拌车没法按点停靠的小型建筑。建筑施工泵送说明在 /solutions/construction。当班组就在拖车旁边配料，再经100 / 125 mm管道浇筑，4500 kg或4200 kg的搅拌泵才值这个重量。',
        ),
        L(
          "It does not fit a project that already runs a mixing plant and only needs long-distance pumping. For that work we point to pump-only trailers. We do not quote a plant or a boom pump; those items are not in the Xingtai catalogue. Spraying machines are listed on a separate hub.",
          '已经在跑搅拌站、只需要长距离泵送的工程，对不上。那种活我们指向仅泵送的拖泵。想让我们报搅拌站、臂架泵或喷浆机的买家，也对不上。那些不在邢台目录里，我们不会为了拿订单把它们写进去。',
        ),
        L(
          "Aggregate size is the other hard stop. The electric mixer pump lists 4 cm and below. The diesel table splits 1 inch, 13 mm and 24 mm stone, with shorter distance on the larger stone. If your mix is coarser than the table, we will not promise the listed metres. Send the stone size with the inquiry.",
          '骨料粒径是另一条硬界限。电动搅拌泵写4 cm及以下。柴油表按1英寸、13 mm、24 mm石子分行，石子越大距离越短。配合比目录更粗，我们不会承诺表上的米数。询盘请带上石子粒径，好让我们对着已公布的行来谈。',
        ),
      ],
    },
    {
      heading: L(
        'What to Send Us Before We Quote',
        '报价前请发给我们的核对项',
      ),
      paragraphs: [
        L(
          "Write whether you need mix plus pump on one trailer, or pump only. If you need a mixing plant, say so; we do not build it. Then send power on site, output, pipeline length and height, aggregate size, and 100 mm or 125 mm pipe so we can point at Integrated Mixer Pump, Diesel Mixer Integrated Pump, or Electric 40.",
          '请写清楚：要同一拖车上搅拌加泵送，还是只要泵送。若要搅拌站，请直接说；我们会告诉你我们不生产。然后发送现场动力（电网或柴油）、你对照的理论输送量、管路长度与高度、骨料粒径，以及准备用100 mm还是125 mm管。这五点足够让我们指向搅拌泵一体机、柴油搅拌泵一体机或电动40型，而不靠猜。',
        ),
        L(
          "Our engineers answer from the Xingtai table, not from a plant brochure. Open /products/mixer-pumps, then use /contact with the site notes above. We would rather lose a mixing-plant inquiry than ship the wrong machine.",
          '我们的工程师按邢台目录表回答，不按搅拌站样本回答。搅拌泵系列看 /products/mixer-pumps，把上述工地说明发到 /contact。我们宁可丢掉一单搅拌站询盘，也不愿用听起来对、实际错的名字把错误设备发走。',
        ),
      ],
      bullets: [
        L(
          'Confirm mix-plus-pump on one trailer — not a mixing plant',
          '确认是同一拖车搅拌加泵送，不是搅拌站',
        ),
        L(
          'Grid 45 kW + 14 kW / 21 m³/h, or diesel 4108 66–75 kW / 25 m³/h',
          '电网45 kW + 14 kW / 21 m³/h，或柴油4108 66–75 kW / 25 m³/h',
        ),
        L(
          'Aggregate size, pipe 100 / 125 mm, and horizontal / vertical metres',
          '骨料粒径、管径100 / 125 mm，以及水平 / 垂直米数',
        ),
        L(
          'If mix is already supplied, compare Electric 40 pump-only at 2300 kg',
          '若混凝土已由外部供应，对照仅泵送的电动40型2300 kg',
        ),
      ],
    },
  ],
  faqs: [
    {
      question: L(
        'Does Pinjin manufacture concrete mixing plants?',
        '品锦生产混凝土搅拌站吗？',
      ),
      answer: L(
        'No. Xingtai does not manufacture mixing plants or truck-mounted boom pumps. Spraying machines are listed separately. We manufacture trailer concrete pumps and integrated mixer pumps: mix plus pump on one trailer.',
        '不生产。河北品锦机械在邢台不制造搅拌站、车载臂架泵或喷浆机。我们制造拖式混凝土泵和搅拌泵一体机：搅拌与泵送在同一辆拖车上。',
      ),
    },
    {
      question: L(
        'What is the difference between a mixer pump and a mixing plant?',
        '搅拌泵和搅拌站有什么区别？',
      ),
      answer: L(
        'A mixing plant batches on a yard and loads trucks. A mixer pump mixes on site and pumps through pipe. Output is 21 m³/h electric or 25 m³/h diesel — pumping figures, not plant capacity.',
        '搅拌站在场地计量搅拌并装车。搅拌泵是移动拖车，现场搅拌再经管道泵送。目录搅拌泵输送量为电动21 m³/h或柴油25 m³/h，这是泵送数字，不是搅拌站搅拌产能。',
      ),
    },
    {
      question: L(
        'Should I buy the electric mixer pump or the diesel mixer pump?',
        '该买电动搅拌泵还是柴油搅拌泵？',
      ),
      answer: L(
        'Use the electric Integrated Mixer Pump where grid power can feed 45 kW plus 14 kW at 21 m³/h and 23 MPa. Use the diesel unit with no grid: 4108, 66–75 kW, 25 m³/h. Both mix and pump on one trailer.',
        '工地能给主电机45 kW和搅拌电机14 kW供电时，用电动搅拌泵一体机，21 m³/h、23 MPa。没有电网时用柴油机型：4108发动机、66–75 kW、25 m³/h。两台都是同一拖车搅拌加泵送。',
      ),
    },
    {
      question: L(
        'Can a mixer pump replace a mixing plant on my project?',
        '搅拌泵能替代项目上的搅拌站吗？',
      ),
      answer: L(
        'No. Yard batching needs a mixing plant from another manufacturer. Choose a Pinjin mixer pump when the crew mixes beside the trailer and places through pipe within listed distance and aggregate size.',
        '不能。若需要场地计量搅拌并装车，应向其他厂家购买搅拌站。只有班组在拖车旁拌料、并在目录距离与骨料粒径内管道浇筑时，才选品锦搅拌泵。',
      ),
    },
  ],
};
