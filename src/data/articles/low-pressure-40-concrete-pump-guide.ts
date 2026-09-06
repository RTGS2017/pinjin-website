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
  slug: 'low-pressure-40-concrete-pump-guide',
  title: L(
    'Low Pressure Concrete Pump: Fine-Stone Electric 40 Guide',
    '低压混凝土泵：细石电动40选型指南',
  ),
  seoTitle: L(
    'Low Pressure Concrete Pump Guide | Fine-Stone Electric 40 | Pinjin',
    '低压混凝土泵选型指南 | 细石电动40 | 品锦机械',
  ),
  description: L(
    'Xingtai factory guide: the Electric Low Pressure 40 is tuned for fine-stone, not a weak 40. Compare 37 kW / 12–15 m³/h / 20 MPa / 80 m / 240 m against Electric 30 and Electric 40.',
    '邢台工厂导购：电动低压40是细石调校，不是“弱40”。对照37 kW、12–15 m³/h、20 MPa、细石80/240 m，以及电动30与电动40目录参数。',
  ),
  category: 'product-guide',
  date: '2026-09-03',
  keywords: [
    'low pressure concrete pump',
    'fine stone pump',
    'electric 40 low pressure',
  ],
  relatedProductSlugs: [
    'electric-low-pressure-40-concrete-pump',
    'electric-40-concrete-pump',
    'electric-30-concrete-pump',
  ],
  relatedPaths: [
    {
      href: '/products/electric-concrete-pumps',
      label: L('Electric concrete pumps', '电动混凝土泵'),
    },
    {
      href: '/solutions/construction',
      label: L('Construction solutions', '建筑施工方案'),
    },
    {
      href: '/contact',
      label: L('Contact the factory', '联系工厂'),
    },
  ],
  content: [
    {
      heading: L(
        'Low pressure is not a weak pump',
        '低压不是弱泵',
      ),
      paragraphs: [
        L(
          'Buyers writing to our Xingtai plant often ask: your Electric Low Pressure 40 sits at 20 MPa — is that a weaker 40? Our engineers say no. Low pressure here is a mix and distance choice, not a downgrade. The three electric trailers share a job family, but they are not interchangeable.',
          '采购方写信到我们邢台任泽工业园区工厂时，第一个问题常常一样：你们电动低压40出口压力是20 MPa，是不是一台更弱的40？我们工程师的回答很明确：不是。这台泵目录里的“低压”，是针对细石拌合物和管路距离做的调校，不是把液压系统减配。我们把它和电动30、电动40放在同一档讨论，只因为三者都是有电网的拖式泵送，并不能互相替代，也不能靠型号里的数字去猜。',
        ),
        L(
          'A catalogue name with “low pressure” is easy to misread. On our floor it means we tuned the unit for fine-stone concrete, not that we cut the hydraulic package. Kawasaki 112 is the same family we fit on Electric 40. The trailer shares the 3300 × 1500 × 1500 mm envelope with Electric 30. Motor, output, and the fine-stone table are what change.',
          '目录名称里带“低压”，很容易被读成功率不够、压力不够。在我们车间里，这句话只表示按细石混凝土调校，而不是为了省成本砍掉液压件。川崎112液压泵与标准电动40同属一系。拖泵外形与电动30同为3300 × 1500 × 1500 mm、整机同样1200 kg。真正变化的是电机功率、目录输送量，以及已公布的细石水平/垂直输送距离表。采购时请对这三行，而不是对“40”这个称呼。',
        ),
        L(
          'We do not manufacture mixing plants, truck-mounted boom pumps, or spraying machines. If your pour needs a boom or a batching plant, that is a different supplier. This guide stays inside our published electric trailer range on /products/electric-concrete-pumps.',
          '我们不生产搅拌站、车载臂架泵或喷浆机，目录里也没有这三类产品。如果浇筑必须用臂架或搅拌站，那是另一类供应商的事，我们不会把拖泵说成臂架泵。本指南只谈已公布的电动拖泵系列，可从 /products/electric-concrete-pumps 进入对照。',
        ),
      ],
    },
    {
      heading: L(
        'What our Electric Low Pressure 40 is built for',
        '电动低压40到底为哪类工况而做',
      ),
      paragraphs: [
        L(
          'The Electric Low Pressure 40 on /products/electric-low-pressure-40-concrete-pump is a 37 kW electric trailer pump. Catalogue output is 12–15 m³/h, outlet pressure 20 MPa, hopper 0.3 m³, fine-stone 80 m horizontal / 240 m vertical, weight 1200 kg, hydraulic pump Kawasaki 112. We do not add unpublished working-pressure columns.',
          '产品页 /products/electric-low-pressure-40-concrete-pump 上的电动低压40，是一台37 kW电动拖泵。目录输送量12–15 m³/h，出口压力20 MPa，料斗0.3 m³，细石水平80 m、垂直240 m，整机1200 kg，液压泵为川崎112。这些是我们愿意对表的数字。我们不会再另加未公布的“工作压力”栏，也不会把细石距离说成普通骨料距离。',
        ),
        L(
          'Those figures sit between two neighbours. Electric 30 on /products/electric-30-concrete-pump is 30 kW, the same 12–15 m³/h, 20 MPa, 0.3 m³ hopper and 1200 kg class, with fine-stone 60 m / 180 m. Electric 40 on /products/electric-40-concrete-pump steps to 45 kW, 21 m³/h, 23 MPa, 0.4 m³ hopper, fine-stone 120 m / 360 m, and 2300 kg on a 3900 × 1500 × 1600 mm frame.',
          '这组参数夹在两台邻机之间，选型时必须三台一起看。电动30（/products/electric-30-concrete-pump）是30 kW电机，同样12–15 m³/h、20 MPa、0.3 m³料斗，同样1200 kg、3300 mm级外形，但细石表只有60 m / 180 m。标准电动40（/products/electric-40-concrete-pump）升到45 kW、21 m³/h、23 MPa、0.4 m³料斗、细石120 m / 360 m，整机2300 kg，外形3900 × 1500 × 1600 mm。低压40既不是30的贴纸改款，也不是40的缩水版。',
        ),
        L(
          'If you only read the “40” in the name, you will order the wrong machine. The Low Pressure 40 is not a lighter Electric 40. It is an Electric 30-size trailer with a 37 kW motor and a longer fine-stone table.',
          '如果只看名称里的“40”，很容易买错机。低压40不是一台更轻的电动40，而是电动30同级拖泵，配37 kW电机和更长的细石管路表。单独列这一型号，就是为了把细石距离从60/180 m做到80/240 m，同时把车体留在1200 kg这一档，而不是让工地为了多几十米细石去扛2300 kg的电动40。',
        ),
      ],
      image: {
        src: '/images/products/electric-low-pressure-40-concrete-pump/main.webp',
        alt: L(
          'Electric Low Pressure 40 concrete pump at Hebei Pinjin Machinery Xingtai factory',
          '河北品锦机械邢台工厂的电动低压40型混凝土泵',
        ),
        caption: L(
          'Electric Low Pressure 40 trailer pump from the Xingtai catalogue',
          '邢台目录中的电动低压40型拖式泵',
        ),
      },
    },
    {
      heading: L(
        'Catalogue comparison: LP40, Electric 30, Electric 40',
        '目录对照：低压40、电动30、电动40',
      ),
      paragraphs: [
        L(
          'We put the three models on one whiteboard when a contractor is choosing. Low Pressure 40 output and pressure match Electric 30, not Electric 40. The motor is 7 kW above the 30 and 8 kW below the 40. Fine-stone distance sits in the middle: 80 / 240 m versus 60 / 180 m and 120 / 360 m.',
          '承包商选型时，我们会把三台机写在同一块白板上，避免只盯着“30”或“40”的称呼。低压40的输送量和压力对齐电动30，而不是电动40；电机比电动30高7 kW，比电动40低8 kW。细石距离夹在中间：80 m / 240 m，对比电动30的60 m / 180 m，以及电动40的120 m / 360 m。输送量仍是12–15 m³/h这一档，并没有因为名称带40就变成21 m³/h。',
        ),
        L(
          'Those figures live on the product pages. We do not invent extra site-tested metres. If your pipe run sits outside the published row, we say so instead of stretching a number.',
          '这些数字只出现在产品页上，没有另一张“内部实测表”。我们不会在目录之外再编一套工地米数，也不会把细石行套到13 mm骨料行上。如果管路超出已公布行，我们会直接说明，而不是把数字往上拉来促成订单。',
        ),
      ],
      bullets: [
        L(
          'Electric 30: 30 kW, 12–15 m³/h, 20 MPa, hopper 0.3 m³, fine-stone 60 m / 180 m, agg13 20 m / 60 m, aggregate ≤3 cm, 3300 × 1500 × 1500 mm, 1200 kg.',
          '电动30：30 kW、12–15 m³/h、20 MPa、料斗0.3 m³、细石60 m / 180 m、13骨料20 m / 60 m、骨料≤3 cm、外形3300 × 1500 × 1500 mm、整机1200 kg。',
        ),
        L(
          'Electric Low Pressure 40: 37 kW, 12–15 m³/h, 20 MPa, hopper 0.3 m³, fine-stone 80 m / 240 m, Kawasaki 112, 3300 × 1500 × 1500 mm, 1200 kg.',
          '电动低压40：37 kW、12–15 m³/h、20 MPa、料斗0.3 m³、细石80 m / 240 m、川崎112液压泵、外形3300 × 1500 × 1500 mm、整机1200 kg，与电动30同级车体。',
        ),
        L(
          'Electric 40: 45 kW, 21 m³/h, 23 MPa, hopper 0.4 m³, fine-stone 120 m / 360 m, agg13 40 m / 120 m, Kawasaki 112, 3900 × 1500 × 1600 mm, 2300 kg.',
          '电动40：45 kW、21 m³/h、23 MPa、料斗0.4 m³、细石120 m / 360 m、13骨料40 m / 120 m、川崎112液压泵、外形3900 × 1500 × 1600 mm、整机2300 kg。',
        ),
      ],
    },
    {
      heading: L(
        'Fine-stone distance is the real selector',
        '真正用来选型的是细石输送距离',
      ),
      paragraphs: [
        L(
          'Buyers pouring fine-stone screeds, secondary structure, and indoor pipeline work should read the fine-stone row, not the model number. If the mix stays fine-stone and the run is longer than Electric 30 (60 m / 180 m) but still inside 80 m / 240 m, we discuss Low Pressure 40 first.',
          '做细石楼面、二次结构、室内管路的采购方，真正要看的是细石那一行，而不是型号里的数字。如果拌合物仍在细石范围内，管路又长过电动30的60 m水平 / 180 m垂直，但仍落在80 m / 240 m以内，我们会先谈低压40。这是细石泵的选择，不是“更大号40”的选择。工地若把低压40当成标准电动40来下料速度，会发现目录输送量并没有变成21 m³/h。',
        ),
        L(
          'If you need 21 m³/h or the 23 MPa / 120 m / 360 m fine-stone table, that is Electric 40. The extra 1100 kg and 3900 mm frame are part of that step. We will not say Low Pressure 40 almost reaches those numbers. Output stays 12–15 m³/h and pressure stays 20 MPa.',
          '如果需要21 m³/h，或23 MPa、细石120 m / 360 m那一行，那就是标准电动40。多出来的1100 kg和3900 mm机身是这一档必须接受的部分。我们不会说低压40“差不多够到”。它够不到。目录输送量仍是12–15 m³/h，目录压力仍是20 MPa。细石泵不是把40的压力改低一点那么简单，车体、料斗、电机都要一起对表。',
        ),
        L(
          'For 13 mm aggregate, Electric 30 lists agg13 20 m / 60 m and Electric 40 lists 40 m / 120 m. The Low Pressure 40 row we publish is the fine-stone pair. If the mix is not fine-stone, write that in the inquiry. Building jobs on /solutions/construction still have to match mix and metres.',
          '若工地用13 mm骨料，请看已公布的13骨料行：电动30为20 m / 60 m，电动40为40 m / 120 m。低压40我们公布的是细石那一对，没有把13骨料行写进这台机的目录表。拌合物不是细石时，请写进询价，免得我们把细石表套到更粗的浇筑上。建筑工况见 /solutions/construction，仍然要对照拌合物、管长和米数，而不是对照外号。',
        ),
      ],
      image: articleImage(
        'concrete-manufacturing',
        'Fine-stone electric concrete pump manufacturing at Pinjin Xingtai factory',
        '品锦邢台工厂的细石电动混凝土泵制造现场',
      ),
    },
    {
      heading: L(
        'Same trailer class as Electric 30, not Electric 40',
        '与电动30同级车体，不是电动40那一档',
      ),
      paragraphs: [
        L(
          'Weight and footprint decide whether a pump fits a small hoist or a narrow yard. Low Pressure 40 and Electric 30 share 1200 kg and 3300 × 1500 × 1500 mm. Electric 40 is 2300 kg and 600 mm longer. If the site only accepts the 30-class trailer, we do not stretch Electric 40 into that slot. Our low pressure concrete pump is still a 1200 kg machine.',
          '重量和外形往往比名称更早决定能不能进场。低压40与电动30同为1200 kg、3300 × 1500 × 1500 mm。电动40是2300 kg，还长600 mm。工地只能接受30级拖泵、小吊或窄院子时，我们不会把电动40硬塞进去。目录里这台低压混凝土泵，仍然是1200 kg这一档，这一点要在询价里写清楚，避免到厂才发现车体对不上。',
        ),
        L(
          'The 37 kW motor is why Low Pressure 40 exists as its own SKU. It is not a sticker change on Electric 30. We fit Kawasaki 112 and the 37 kW motor into the 30-class chassis so the fine-stone table can move from 60 / 180 m to 80 / 240 m without jumping to 2300 kg. That is the electric 40 low pressure position: more motor than the 30, same size class, still not the 45 kW Electric 40.',
          '单独做低压40这个型号，是因为37 kW电机，不是电动30换了贴纸。装配线上把川崎112和37 kW电机装进30级底盘，细石表才能从60 m / 180 m走到80 m / 240 m，而不必跳到2300 kg那一档。这就是电动40低压在系列里的位置：电机比30大，车体同级，仍不是45 kW、21 m³/h的电动40。采购方若只要更大输送量，请直接看电动40，不要在低压40上找21 m³/h。',
        ),
        L(
          'Grid power still matters. All three pumps are electric. If the site has no three-phase supply, look at our diesel trailer range instead of forcing an electric 40 low pressure unit onto a generator figure we have not published.',
          '电网仍然关键。三台都是电动泵，都要三相电源。工地没有稳定三相电时，这场对照就走错了——应看柴油拖泵系列，而不是把电动40低压硬套到我们并未公布的发电机功率或油耗假设上。没有目录数字的事，我们不写进选型建议。',
        ),
      ],
    },
    {
      heading: L(
        'What to send us before you order',
        '下单前请把工况发给我们',
      ),
      paragraphs: [
        L(
          'Before we quote, send mix type (fine-stone or not), horizontal and vertical pipe length, storeys or metres, and whether you can take 1200 kg or 2300 kg. Use /contact. We match Electric Low Pressure 40, Electric 30, and Electric 40. You can also start from /products/electric-concrete-pumps or /solutions/construction.',
          '报价前请把这些工况发给我们：拌合物是否细石、水平和垂直管长、层数或米数，以及工地能否接受1200 kg还是必须上2300 kg机型。请发到 /contact。我们按三张产品页对照：电动低压40、电动30、电动40。也可以从 /products/electric-concrete-pumps 或 /solutions/construction 进入，先看电动拖泵系列和建筑施工方案，再把数字写进询价。',
        ),
        L(
          'We will not invent a lead time, a customer name, or an unpublished project. These are electric pumps, so we also do not publish fuel litres per hour. If your numbers sit outside the catalogue table, we say so. That is how we keep the fine stone pump discussion honest in Renze Industrial Park.',
          '我们不会编交货期、客户名或未公布的工程案例，也不会用虚构认证来证明这台细石泵。这些是电动泵，因此不公布小时油耗。如果您给的管长、层数或骨料落在目录表之外，我们会明说，并建议改对电动40或把管路缩短，而不是口头加米。邢台任泽工业园区的工厂，细石泵的讨论就该这样对表。',
        ),
      ],
    },
  ],
  faqs: [
    {
      question: L(
        'Is the Electric Low Pressure 40 a weaker Electric 40?',
        '电动低压40是不是一台更弱的电动40？',
      ),
      answer: L(
        'No. Catalogue pressure is 20 MPa and output is 12–15 m³/h — the same band as Electric 30, not Electric 40 (23 MPa, 21 m³/h). Low Pressure 40 is tuned for fine-stone at 80 m / 240 m, in the same 1200 kg size class as Electric 30.',
        '不是。目录压力20 MPa、输送量12–15 m³/h，与电动30同档，而不是电动40的23 MPa、21 m³/h。低压40按细石80 m / 240 m调校，车体重量仍是与电动30相同的1200 kg级，不能当成缩水版电动40来用。',
      ),
    },
    {
      question: L(
        'When should I choose Low Pressure 40 instead of Electric 30?',
        '什么时候选低压40而不是电动30？',
      ),
      answer: L(
        'When the mix is fine-stone and the pipe run is longer than Electric 30 fine-stone 60 m / 180 m, but still inside 80 m / 240 m, and you still need the 1200 kg / 3300 mm trailer. Output stays 12–15 m³/h; the step is 37 kW versus 30 kW and the longer fine-stone table.',
        '拌合物是细石，管路长过电动30细石60 m / 180 m，但仍在80 m / 240 m以内，并且仍要1200 kg / 3300 mm这级拖泵时。两台输送量都是12–15 m³/h；差异在电机（37 kW对30 kW）和细石距离，而不是把输送量做大。',
      ),
    },
    {
      question: L(
        'When do I still need the standard Electric 40?',
        '什么时候仍要选标准电动40？',
      ),
      answer: L(
        'When you need 21 m³/h, 23 MPa, the 0.4 m³ hopper, fine-stone 120 m / 360 m, or agg13 40 m / 120 m. That machine is 2300 kg and 3900 × 1500 × 1600 mm. Low Pressure 40 does not reach those catalogue rows.',
        '需要21 m³/h、23 MPa、0.4 m³料斗、细石120 m / 360 m，或13骨料40 m / 120 m时，仍要选标准电动40。那台机是2300 kg、3900 × 1500 × 1600 mm。低压40到不了这些目录行，也不要按“差不多”去下单。',
      ),
    },
    {
      question: L(
        'Does Pinjin list boom pumps or mixing plants for the same job?',
        '品锦有没有把臂架泵或搅拌站列进同一工况？',
      ),
      answer: L(
        'No. We manufacture catalogue electric trailer pumps, diesel trailer pumps, and mixer pumps in Xingtai. We do not list mixing plants, truck-mounted boom pumps, or spraying machines. Inquire with mix, pipe length, and weight limit on /contact.',
        '没有。我们在邢台生产目录中的电动拖泵、柴油拖泵和搅拌泵，不列搅拌站、车载臂架泵或喷浆机。请把拌合物、管长和重量限制发到 /contact，由工厂按已公布参数对照。',
      ),
    },
  ],
};
