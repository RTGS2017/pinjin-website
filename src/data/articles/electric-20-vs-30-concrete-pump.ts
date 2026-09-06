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

function productImage(slug: string, altEn: string, altZh: string, captionEn: string, captionZh: string) {
  return {
    src: `/images/products/${slug}/main.webp`,
    alt: L(altEn, altZh),
    caption: L(captionEn, captionZh),
  };
}

/**
 * Workshop comparison of Electric 20 vs Electric 30.
 * Numbers only from the published Xingtai catalogue. No cylinder bore/stroke.
 */
export const article: BlogPost = {
  slug: 'electric-20-vs-30-concrete-pump',
  title: L(
    'Electric 20 vs Electric 30 Concrete Pump: Hopper, Pressure and Catalogue Distance',
    '电动20与电动30混凝土泵对比：料斗、压力与目录输送距离',
  ),
  seoTitle: L(
    'Compare Electric 20 vs 30 Concrete Pump | Pinjin Xingtai Factory',
    '电动20与电动30混凝土泵对比 | 品锦邢台工厂',
  ),
  description: L(
    'Workshop comparison of Pinjin Electric 20 and Electric 30 trailer pumps: hopper, outlet pressure, output and published conveying distance from the Xingtai factory.',
    '品锦电动20与电动30拖式泵车间对照：料斗、出口压力、输送量与邢台工厂已公布的输送距离。',
  ),
  category: 'product-guide',
  date: '2026-08-29',
  keywords: [
    'compare concrete pump models',
    'electric 20 concrete pump',
    'electric 30 concrete pump',
  ],
  relatedProductSlugs: [
    'electric-20-concrete-pump',
    'electric-30-concrete-pump',
    'electric-15-concrete-pump',
  ],
  relatedPaths: [
    {
      href: '/products/electric-concrete-pumps',
      label: L('Electric concrete pump catalogue', '电动混凝土泵目录'),
    },
    {
      href: '/solutions/construction',
      label: L('Construction pumping solutions', '建筑泵送方案'),
    },
    {
      href: '/contact',
      label: L('Contact the Xingtai factory', '联系邢台工厂'),
    },
  ],
  content: [
    {
      heading: L(
        'Why we park Electric 20 and Electric 30 on the same workshop bay',
        '为什么我们把电动20和电动30停在同一跨车间对照',
      ),
      paragraphs: [
        L(
          'When buyers write to us at Hebei Pinjin Machinery in Xingtai, they rarely ask whether we make a concrete pump. They ask whether to take the Electric 20 or the Electric 30. Both are electric trailer pumps from the same catalogue. They sit on neighbouring bays in our Renze Industrial Park workshop. The difference is hopper volume, outlet pressure, output, published conveying distance, pipe diameter where we list it, aggregate size, and weight.',
          '买方写信到河北品锦机械邢台工厂时，问的往往不是我们是否做混凝土泵，而是该选电动20还是电动30。两台都是同一份工厂目录里的电动拖式泵，在任泽工业园区车间里经常停在相邻工位。差别不是营销形容词，而是料斗容积、出口压力、理论输送量、已公布输送距离、目录写明的管径、骨料粒径和整机重量。',
        ),
        L(
          'We do not manufacture mixing plants, truck-mounted boom pumps, or spraying machines as catalogue products. This comparison is trailer pump against trailer pump. Every number below is copied from the product pages. If a cell is blank — cylinder bore or stroke — we leave it blank. Our engineers will still walk you around the pumping cylinders, but we will not invent millimetres the catalogue does not print.',
          '我们不以搅拌站、车载臂架泵或喷浆机作为目录产品。下面只做拖式泵对拖式泵。数字全部抄自已公布的产品页。产品页空着的格子——例如缸径、行程——这里同样空着。工程师仍会在车间带着你看泵送缸，但不会编造目录没有印出的毫米数。',
        ),
        L(
          'If the site only needs a compact transfer pump, we also put the Electric 15 on the table: 15 kW, 8–10 m³/h, 15–20 m vertical / 60–80 m horizontal, 450 kg. The 20 and 30 are the pair most people ask us to compare side by side.',
          '若工地只需紧凑型输送泵，我们也会把电动15放上桌面。15是更小的体量：15 kW、8–10 m³/h、垂直15–20 m / 水平60–80 m、450 kg。买方最常要求我们并排对照的，仍是20和30。',
        ),
      ],
      image: productImage(
        'electric-20-concrete-pump',
        'Electric 20 concrete pump at Hebei Pinjin Machinery factory in Xingtai China',
        '中国邢台品锦机械工厂的电动20型混凝土泵',
        'Electric 20 Concrete Pump',
        '电动20型混凝土泵',
      ),
    },
    {
      heading: L(
        'Hopper volume we actually build: 0.25 m³ versus 0.3 m³',
        '我们实际做的料斗：0.25 m³ 对 0.3 m³',
      ),
      paragraphs: [
        L(
          'On the shop floor the hopper is the first thing you see between the two frames. The Electric 20 lists 0.25 m³. The Electric 30 lists 0.3 m³. That 0.05 m³ is the catalogue line we weld and fit to. A larger hopper gives the mixer truck a slightly larger buffer before the pumping cylinders take the mix. It does not replace output in m³/h, and it does not replace outlet pressure.',
          '站在两台机中间，最先看到的是料斗。电动20目录料斗 0.25 m³，电动30是 0.3 m³。这 0.05 m³ 就是我们按目录焊接装配的那一行。料斗大一点，搅拌车或斗车在泵送缸吃料前多一点缓冲，但它不能代替以 m³/h 计的输送量，也不能代替出口压力。',
        ),
        L(
          'We tell buyers not to treat hopper volume as how much the pump can place in an hour. Output is a separate line: 8–10 m³/h on the 20, 12–15 m³/h on the 30. Those are theoretical catalogue figures. Site output still depends on mix, pipe layout and stoppages; we do not invent a guaranteed on-site m³/h.',
          '我们会明确告诉买方：不要把料斗容积当成“这台泵一小时能浇多少”。输送量是另一行：电动20为 8–10 m³/h，电动30为 12–15 m³/h。这是目录理论值。现场产量仍取决于配合比、布管和停机，我们不会编造“保证工地产量”。',
        ),
        L(
          'The hopper also has to match the mix we print. The Electric 20 lists aggregate 1–2 cm. The Electric 30 lists ≤3 cm. If the site regularly pours coarser stone, we do not stretch the 20 table. When our engineers talk about cylinders next to the hopper, they mean the pumping circuit that has to work with that hopper and the published outlet pressure — not an unpublished bore size.',
          '料斗还要和我们愿意印出来的骨料匹配。电动20最大骨料 1–2 cm，电动30为 ≤3 cm。工地经常打更粗的石子，我们不会把20的表格往外撑。工程师在料斗旁边说“缸”，指的是必须和这只料斗、已公布出口压力一起工作的泵送回路，不是未公布的缸径。',
        ),
      ],
      image: articleImage(
        'trailer-assembly',
        'Trailer concrete pump assembly at Hebei Pinjin Machinery in Xingtai, hopper and pumping circuit on the frame',
        '邢台品锦机械拖式混凝土泵装配：机架上的料斗与泵送回路',
      ),
    },
    {
      heading: L(
        'Outlet pressure: 10 MPa on the 20, 20 MPa on the 30',
        '出口压力：20型 10 MPa，30型 20 MPa',
      ),
      paragraphs: [
        L(
          'The pressure step is the line we underline on the nameplate. The Electric 20 lists 10 MPa maximum outlet pressure. The Electric 30 lists 20 MPa. That doubling is why the two models do not share one conveying table. Motor power follows: 22 kW on the 20, 30 kW on the 30. The site needs a three-phase supply that can start that motor.',
          '压力这一档是我们在铭牌上会划出来的。电动20最大出口压力 10 MPa，电动30为 20 MPa，已公布压力翻倍，所以两台并不共用一张输送表。电机功率也分开：20型 22 kW，30型 30 kW。现场要有能启动并带动该电机的三相电源。这里不公布千瓦换安培表；若变压器容量才是瓶颈，询价时把容量一并发给我们。',
        ),
        L(
          'Electric 20 pumping distance is listed as 120 m horizontal / 40 m vertical. Electric 30 lists fine-stone 60 m / 180 m and aggregate-13 20 m / 60 m. Those are different rows because the 30 table splits fine-stone and 13 mm aggregate. We do not substitute one row for the other, and we do not invent a pipe-loss formula on top of the catalogue.',
          '电动20输送距离按目录为水平 120 m / 垂直 40 m。电动30细石输送为水平 60 m / 垂直 180 m，13 骨料为水平 20 m / 垂直 60 m。30 的表把细石和 13 mm 骨料分行写，我们不会拿一行去顶另一行，也不会在目录之外再编一套管损公式。',
        ),
        L(
          'Buyers sometimes assume the 30 must always pump farther horizontally because it has higher pressure. The published fine-stone horizontal figure on the 30 is 60 m; the 20 lists 120 m. We read the rows as printed. Send the pipeline layout and we match the printed table, instead of arguing from pressure alone.',
          '有人以为压力高，30 的水平距离就一定更远。30 已公布的细石水平是 60 m，20 的输送距离写的是 120 m。我们按印出来的行来读。管路又长又平、或又短又高，把布置图发给我们，对照印刷表匹配，而不是只拿压力争长短。',
        ),
      ],
      image: productImage(
        'electric-30-concrete-pump',
        'Electric 30 concrete pump at Hebei Pinjin Machinery factory in Xingtai China',
        '中国邢台品锦机械工厂的电动30型混凝土泵',
        'Electric 30 Concrete Pump',
        '电动30型混凝土泵',
      ),
    },
    {
      heading: L(
        'Output, 80 mm pipe on the 20, and aggregate we will print',
        '输送量、20型的 80 mm 管，以及我们愿意印刷的骨料',
      ),
      paragraphs: [
        L(
          'Output is the figure contractors use to plan the mixer interval. Electric 20: 8–10 m³/h. Electric 30: 12–15 m³/h. If the pour needs the higher band, we do not tell you to run the 20 harder. We move you to the 30, or we ask whether the Electric 15 is enough — same 8–10 m³/h band, much lower weight.',
          '输送量是承包商用来排搅拌车间隔的数字。电动20：8–10 m³/h。电动30：12–15 m³/h。浇筑若需要更高这一档，我们不会说“把20再开猛一点”，而是改到30；或者反过来问，电动15是否已经够用——它的输送量同样是 8–10 m³/h，机重却低得多。',
        ),
        L(
          'Pipe diameter is published on the Electric 20: 80 mm. The Electric 15 lists 100–125 mm. The Electric 30 table does not list a delivery-pipe diameter, so we do not fill that cell from memory. If DN is the decision, write to us with the mix and we will confirm the line that leaves this factory with that machine.',
          '管径在电动20上有公布：80 mm。电动15为 100–125 mm。电动30产品表没有列出输送管内径，我们不会凭记忆填那一格。若管径才是决定项，把配合比写信过来，我们按这台机器出厂所配的管路确认。',
        ),
      ],
      bullets: [
        L(
          'Electric 20: 22 kW, 8–10 m³/h, 10 MPa, hopper 0.25 m³, 120 m / 40 m, pipe 80 mm, aggregate 1–2 cm, 2800 × 1300 × 1500 mm, 900 kg',
          '电动20：22 kW、8–10 m³/h、10 MPa、料斗 0.25 m³、120 m / 40 m、管 80 mm、骨料 1–2 cm、2800 × 1300 × 1500 mm、900 kg',
        ),
        L(
          'Electric 30: 30 kW, 12–15 m³/h, 20 MPa, hopper 0.3 m³, fine-stone 60 m / 180 m, aggregate-13 20 m / 60 m, aggregate ≤3 cm, 3300 × 1500 × 1500 mm, 1200 kg',
          '电动30：30 kW、12–15 m³/h、20 MPa、料斗 0.3 m³、细石 60 m / 180 m、13 骨料 20 m / 60 m、骨料 ≤3 cm、3300 × 1500 × 1500 mm、1200 kg',
        ),
        L(
          'Electric 15 (smaller class): 15 kW, 8–10 m³/h, 15–20 m vertical / 60–80 m horizontal, pipe 100–125 mm, aggregate 1–3 cm, 1900 × 900 × 1200 mm, 450 kg',
          '电动15（更小一档）：15 kW、8–10 m³/h、垂直 15–20 m / 水平 60–80 m、管 100–125 mm、骨料 1–3 cm、1900 × 900 × 1200 mm、450 kg',
        ),
      ],
    },
    {
      heading: L(
        'Weight, footprint and how we move the two frames on a building site',
        '机重、外形，以及工地上如何挪这两台机',
      ),
      paragraphs: [
        L(
          'Electric 20: 2800 × 1300 × 1500 mm, 900 kg. Electric 30: 3300 × 1500 × 1500 mm, 1200 kg. The 30 is 500 mm longer and 300 kg heavier. Both are trailer pumps we assemble in Xingtai. Neither is a truck-mounted boom pump, and neither replaces a mixing plant.',
          '电动20：2800 × 1300 × 1500 mm、900 kg。电动30：3300 × 1500 × 1500 mm、1200 kg。30 长 500 mm，重 300 kg。两台都是我们在邢台装配的拖式泵，都不是车载臂架泵，也不能代替搅拌站。',
        ),
        L(
          'A 900 kg 20 and a 1200 kg 30 need different lifting and towing plans. We do not publish a crane-tonnage recommendation as a catalogue line. Send us how you plan to position the pump and we will say whether that plan matches the printed dimensions and weight.',
          '工地挪机很具体。900 kg 的20和 1200 kg 的30，起吊和拖运计划不一样。目录不写吊车吨位建议。告诉我们打算把泵放在堆场、楼面还是地下室坡道，我们按已印外形和重量判断这份计划是否对得上。',
        ),
        L(
          'If the pour is a small building or secondary structure and the pipeline is short, we often start with the Electric 15 rather than stretching the 20. We would rather put you on the 15 honestly than sell the 20 as a compact machine it is not.',
          '若是小型建筑或二次结构、管路又短，我们常常先看电动15，而不是把20往小里用。输送量档与20同为 8–10 m³/h，机重低一截，管 100–125 mm，垂直 15–20 m / 水平 60–80 m。与其把20说成紧凑机，不如如实推荐15。',
        ),
      ],
    },
    {
      heading: L(
        'How we shortlist 15, 20 or 30 — then what to send us',
        '我们如何在15、20、30里短名单，以及请发给我们什么',
      ),
      paragraphs: [
        L(
          'We shortlist in this order: electric power on site, required m³/h, horizontal and vertical pipeline, aggregate size, then weight and footprint. If those lines sit inside the Electric 20 table, we keep you on the 20. If you need 12–15 m³/h, 20 MPa, the 0.3 m³ hopper and ≤3 cm aggregate, we move you to the 30 and read the fine-stone and aggregate-13 distance rows as printed.',
          '短名单顺序是：现场有没有电、需要的 m³/h、水平和垂直管路、骨料粒径，然后才是机重和外形。这些行若落在电动20表内——22 kW、8–10 m³/h、10 MPa、120 m / 40 m、80 mm 管、1–2 cm 骨料、900 kg——我们就留在20。若需要 12–15 m³/h、20 MPa、0.3 m³ 料斗和 ≤3 cm 骨料，就改到30，并按印好的细石、13 骨料距离行来读。',
        ),
        L(
          'Do not choose by the number in the model name alone. “20” and “30” are catalogue names, not a promise that one is always fifty percent more of everything. Pressure doubles. Hopper does not. Horizontal rows are written differently on the two pages. That is why we compare the machines on the workshop floor with the catalogue open.',
          '不要只看型号里的数字。“20”和“30”是目录名称，并不保证每一项都多出一半。压力翻倍，料斗没有。两页上的水平距离写法也不一样。所以我们在车间对照时是摊开目录看机器，不是看型号数字。',
        ),
        L(
          'When you are ready, open the electric concrete pump hub, the construction solutions page, or contact us with pour volume, pipeline length and height, aggregate size, and available kW. We will answer against the printed table from this Xingtai factory.',
          '准备好了，就打开电动混凝土泵目录页、建筑泵送方案页，或把浇筑方量、管路长度与高度、骨料粒径和可用千瓦发给我们。我们按邢台工厂印刷表答复。',
        ),
      ],
    },
  ],
  faqs: [
    {
      question: L(
        'What is the main catalogue difference between the Electric 20 and Electric 30?',
        '电动20和电动30在目录上的主要差别是什么？',
      ),
      answer: L(
        'The Electric 20 lists 22 kW, 8–10 m³/h, 10 MPa, a 0.25 m³ hopper, 120 m / 40 m, 80 mm pipe, 1–2 cm aggregate and 900 kg. The Electric 30 lists 30 kW, 12–15 m³/h, 20 MPa, a 0.3 m³ hopper, fine-stone 60 m / 180 m, aggregate-13 20 m / 60 m, ≤3 cm aggregate and 1200 kg. We do not publish cylinder bore as a catalogue line.',
        '电动20：22 kW、8–10 m³/h、10 MPa、料斗 0.25 m³、120 m / 40 m、管 80 mm、骨料 1–2 cm、900 kg。电动30：30 kW、12–15 m³/h、20 MPa、料斗 0.3 m³、细石 60 m / 180 m、13 骨料 20 m / 60 m、骨料 ≤3 cm、1200 kg。缸径不是目录行，我们不另编。',
      ),
    },
    {
      question: L(
        'Does the Electric 30 always pump farther than the Electric 20?',
        '电动30是否一定比电动20送得更远？',
      ),
      answer: L(
        'Not as a single number. The 20 lists 120 m horizontal / 40 m vertical. The 30 lists fine-stone 60 m / 180 m and aggregate-13 20 m / 60 m. Higher published pressure (20 MPa vs 10 MPa) does not mean we overwrite those rows. Send the pipeline layout and we will match the printed table.',
        '不能收成一个数字。20 写的是水平 120 m / 垂直 40 m。30 写的是细石 60 m / 180 m，以及 13 骨料 20 m / 60 m。已公布压力更高（20 MPa 对 10 MPa）并不等于我们可以改写这些行。把管路布置发来，我们对照印刷表。',
      ),
    },
    {
      question: L(
        'When should we look at the Electric 15 instead of the 20 or 30?',
        '什么时候该看电动15，而不是20或30？',
      ),
      answer: L(
        'When the pour is a small building or secondary structure, the pipeline is short, and 8–10 m³/h is enough. The Electric 15 lists 15 kW, 15–20 m vertical / 60–80 m horizontal, 100–125 mm pipe, 1–3 cm aggregate, 1900 × 900 × 1200 mm and 450 kg. It is a smaller class than the 20, not a substitute for the 30’s 12–15 m³/h and 20 MPa.',
        '小型建筑或二次结构、管路短、8–10 m³/h 够用时。电动15：15 kW、垂直 15–20 m / 水平 60–80 m、管 100–125 mm、骨料 1–3 cm、1900 × 900 × 1200 mm、450 kg。它比20更小一档，也不能代替30的 12–15 m³/h 和 20 MPa。',
      ),
    },
    {
      question: L(
        'Does Pinjin manufacture boom pumps or mixing plants?',
        '品锦是否生产车载臂架泵或搅拌站？',
      ),
      answer: L(
        'No. We manufacture trailer and compact transfer concrete pumps in Xingtai. Mixing plants, truck-mounted boom pumps and spraying machines are not catalogue products. Compare Electric 20, Electric 30 and Electric 15 on the product pages, then contact us with site conditions.',
        '否。我们在邢台制造拖式与紧凑输送混凝土泵。搅拌站、车载臂架泵和喷浆机不是目录产品。请在产品页对照电动20、电动30和电动15，再把工况发给我们。',
      ),
    },
  ],
};
