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
  slug: "electric-15-concrete-pump-applications",
  title: L(
    "Electric 15 Concrete Pump for Small Building Sites",
    "电动15型混凝土泵：小型建筑与二次结构怎么选",
  ),
  seoTitle: L(
    "Electric 15 Concrete Pump for Small Building Sites | Pinjin",
    "电动15型混凝土泵小型建筑选型 | 品锦机械",
  ),
  description: L(
    "Customers often ask whether the Electric 15 is enough for their site. We match this compact concrete pump to 2–3 floor houses and secondary structure using only published catalogue numbers from our Xingtai factory.",
    "客户常问电动15型够不够用。我们按邢台工厂已公布目录，把这台紧凑型混凝土泵对照2–3层自建房与二次结构，不编造未列出的压力、料斗或工期。",
  ),
  category: "product-guide",
  date: "2026-08-26",
  keywords: [
    "compact concrete pump",
    "small building concrete pump",
    "electric 15 concrete pump",
    "Xingtai compact concrete pump",
    "secondary structure concrete pump",
  ],
  relatedProductSlugs: [
    "electric-15-concrete-pump",
    "electric-20-concrete-pump",
    "electric-10-series-concrete-pump",
  ],
  relatedPaths: [
    {
      href: "/products/electric-concrete-pumps",
      label: L(
        "Electric concrete pump manufacturer China",
        "中国电动混凝土泵厂家",
      ),
    },
    {
      href: "/solutions/construction",
      label: L("Building construction pumping", "建筑施工泵送应用"),
    },
    {
      href: "/contact",
      label: L("Contact Hebei Pinjin Machinery", "联系河北品锦机械"),
    },
  ],
  content: [
    {
      heading: L(
        "Is the Electric 15 Enough for Your Site?",
        "电动15型够不够用：先把问题说清楚",
      ),
      paragraphs: [
        L(
          "Customers often ask whether the Electric 15 is enough for their site. From our Xingtai factory, we match the pour to the published window: 15 kW, 8–10 m³/h, 15–20 m vertical, 60–80 m horizontal. If the pipe run and 1–3 cm stone sit inside that window, this compact concrete pump can be the right small building concrete pump. If they do not, we say so and name another listed model.",
          "客户常问电动15型够不够用。我们邢台工厂先把浇筑工况对照已公布窗口：15 kW、8–10 m³/h、垂直15–20 m、水平60–80 m。管路与1–3 cm石子落在窗口内，这台紧凑型混凝土泵就可以作为小型建筑混凝土泵来谈；落在窗口外，我们会明说，并改看其他已列机型。目录表上的外形、管径和机重，下文只按公布数字写，不补未列出的压力或料斗。",
        ),
        L(
          "Enough depends on the site, not the model name. Two or three floors with a short hose is one job; a long courtyard line is another; secondary structure with 1–3 cm stone is a third. We manufacture electric trailer pumps in Renze Industrial Park, Xingtai. We do not list mixing plants, truck-mounted boom pumps, or spraying machines. Electric 15 is for grid-powered sites whose height and pipe stay inside the catalogue window.",
          "够不够用，是工地问题，不是型号叫什么。两三层、管路短，是一类；院子绕管水平很长，是另一类；二次结构、石子仍在1–3 cm，又是一类。我们在邢台任泽工业园区制造电动拖式混凝土泵，不把搅拌站、车载臂架泵或喷涂机写成在售产品。电动15型只面向有电网、高度与管长落在目录窗口内的紧凑工地，不拿它去冒充高层泵。",
        ),
        L(
          "If you already have floor count, pipe length, and max stone size, treat the rest of this page as a factory checklist. If not, send those three items to /contact. We will match them to /products/electric-15-concrete-pump before we talk price.",
          "若已清楚层数、计划管长和最大石子粒径，后面各节可当作邢台工厂的对照清单。若还没有，把这三项发到 /contact，我们会先对照 /products/electric-15-concrete-pump 上的目录表，再谈价格，避免先报价后发现管长超表。",
        ),
      ],
    },
    {
      heading: L(
        "What the Electric 15 Compact Concrete Pump Is",
        "电动15型紧凑混凝土泵是什么",
      ),
      paragraphs: [
        L(
          "The Electric 15 Concrete Pump is the compact electric unit we list for small building sites. Our engineers in Xingtai built the catalogue around a 15 kW motor and a 450 kg frame that can pass a tight lane. Listed applications are rural self-built houses, small building sites and secondary structure, and short-to-medium pipeline pours. We do not present this machine as a high-rise pump.",
          "电动15型混凝土泵是我们目录里面向小型工地的紧凑电动机组。邢台工程师按15 kW电机、450 kg机架列目录，便于窄路进场。站点上写明的应用是农村自建房、小型工地与二次结构、中短距离管路浇筑。这是我们认的作业范围，不会把这台机器写成高层泵，也不会拿它去替代中型拖泵的细石远距表。",
        ),
        L(
          "Because it is electric, the site needs a grid that can feed 15 kW. We do not publish generator sizing, fuel use, or lead time here. What we do publish is size: 1900 × 900 × 1200 mm. Next to Electric 20 at 2800 × 1300 × 1500 mm and 900 kg, Electric 15 is the smaller footprint on a house plot where the mixer truck already occupies the gate.",
          "因为是电机，现场需要能带得起15 kW的电网。本页不公布发电机容量、油耗或交货天数，那些放到询盘里谈。我们公布的是外形：1900×900×1200 mm。对照电动20型的2800×1300×1500 mm、900 kg，电动15型占地更小。宅基地门口已被搅拌车占住、泵还要让路时，机重450 kg和宽度900 mm是目录里真正能对照进场条件的数字。",
        ),
        L(
          "The electric range is on /products/electric-concrete-pumps. Construction placement notes are on /solutions/construction. Electric 15 is one compact line in that list, not a substitute for the whole list.",
          "电动全系列入口在 /products/electric-concrete-pumps，建筑浇筑说明在 /solutions/construction。若还在紧凑机与中型拖泵之间犹豫，先看这两个入口再决定是否继续读电动15型。它只是目录里的一行紧凑机，不能代替整张表。",
        ),
      ],
      image: {
        src: "/images/products/electric-15-concrete-pump/main.webp",
        alt: L(
          "Electric 15 compact concrete pump for small building sites, Hebei Pinjin Machinery Xingtai factory",
          "河北品锦机械邢台工厂电动15型小型建筑紧凑混凝土泵",
        ),
        caption: L(
          "Electric 15 compact concrete pump, Xingtai catalogue",
          "邢台目录电动15型紧凑混凝土泵",
        ),
      },
    },
    {
      heading: L(
        "Catalogue Numbers We Actually Publish",
        "我们真正公布的目录数字",
      ),
      paragraphs: [
        L(
          "We quote only the Electric 15 table. This row does not list outlet pressure, hopper volume, certificates, named projects, or fuel use, so we do not invent them here. If a number is missing from the table, it is missing in this article as well.",
          "我们只引用电动15型目录表。该行未列出口压力、料斗容积、证书名称、具名工程或油耗，本文也不编造。表上没有的数字，装配车间里同样不会当成对外承诺。邢台拖泵装配按已公开流程进行；看机型时，请把功率、方量、垂直/水平距离、骨料、管径、外形和机重七项一次对完，缺一项就在询盘里问，不要自行补数。",
        ),
      ],
      bullets: [
        L(
          "Motor power 15 kW; theoretical output 8–10 m³/h.",
          "电机功率15 kW；理论输送量8–10 m³/h。",
        ),
        L(
          "Vertical delivery 15–20 m; horizontal delivery 60–80 m.",
          "垂直输送15–20 m；水平输送60–80 m。",
        ),
        L(
          "Max. aggregate 1–3 cm; delivery pipe 100–125 mm.",
          "最大骨料1–3 cm；输送管内径100–125 mm。",
        ),
        L(
          "Dimensions 1900 × 900 × 1200 mm; total weight 450 kg.",
          "外形尺寸1900×900×1200 mm；整机重量450 kg。",
        ),
      ],
      image: articleImage(
        "trailer-assembly",
        "Trailer concrete pump assembly for compact Electric 15 units at Pinjin Xingtai factory",
        "品锦邢台工厂紧凑型电动15拖式混凝土泵装配现场",
      ),
    },
    {
      heading: L(
        "Site Scenarios: Two- to Three-Floor Houses and Secondary Structure",
        "工况：两三层自建房与二次结构，不是高层",
      ),
      paragraphs: [
        L(
          "A two- or three-floor house is the first question we hear. About 3 m per floor puts three floors near 9 m of rise before bends. Electric 15 lists 15–20 m vertical, so height alone often fits this small building concrete pump. The usual limit is extra horizontal metres plus elbows. Stay inside 60–80 m horizontal. If the hose will snake around the yard, measure it.",
          "两三层自建房是我们听到的第一类问题。按每层约3 m粗算，三层垂直大约9 m，还没计弯头。电动15型目录垂直15–20 m，仅高度一项，这类小型建筑混凝土泵经常对得上。真正卡人的，多半是宅基地绕管的水平米数和弯头。水平要落在目录的60–80 m以内。管子若要绕院子两圈，请用皮尺量通到浇筑点的实长，不要按建筑轴线估一个整数就下单。",
        ),
        L(
          "Secondary structure is the second fit: stairs, ring beams, small columns, and infill pours where the pipe is short and stone stays in the 1–3 cm band. The listed 100–125 mm pipe is what we publish for that mix. We still ask for slump and stone size, because 3 cm stone is not the same as fine-stone grout. We do not list a spraying machine, and we do not stretch this pump into plaster work.",
          "二次结构是第二类对口工况：室内楼梯、圈梁、小柱、填充浇筑，管路短、石子仍在1–3 cm。电动15型公布的100–125 mm管，就是这条配合比下我们列出的管径。询盘里我们仍要塌落度和石子粒径，因为表上上限3 cm的石子，和细石灌浆不是一回事；二次结构若改用更细的料，也请写明，便于对照10系列已列的2 cm及以下骨料。目录不列喷涂机，我们也不会把这台泵拉伸去干抹灰喷涂。",
        ),
        L(
          "High-rise is not an Electric 15 job. Twenty floors at about 3 m is already around 60 m vertical, plus horizontal loss, far above 15–20 m. Compare larger listed electric trailer pumps on the electric hub. Do not buy a compact concrete pump and hope the pipe will carry the rest. Match metres first.",
          "高层不是电动15型的活。二十层按约3 m估算，垂直已接近60 m，还要加水平损失，远高于15–20 m。那种工况请到电动泵入口对照更大已列机型，而不是把紧凑泵的垂直窗口口头放大。不要买一台紧凑型混凝土泵再指望管子自己把高度补上。我们邢台工厂每次都是同一句话：先对米数，再谈哪一台。",
        ),
      ],
    },
    {
      heading: L(
        "Electric 15 Versus the 10 Series and Electric 20",
        "电动15型对照10系列与电动20型",
      ),
      paragraphs: [
        L(
          "The Electric 10 Series Concrete Pump at /products/electric-10-series-concrete-pump shares the 15 kW motor and a similar frame: 1800 × 800 × 1200 mm, 400 kg. It lists theoretical 21 m³/h, 23 MPa, hopper 0.1 m³, horizontal 25 m only, and aggregate 2 cm and below. That row does not list vertical height or pipe diameter. If your pipe is longer than 25 m, do not pick the 10 Series for its higher theoretical m³/h.",
          "电动10系列混凝土泵见 /products/electric-10-series-concrete-pump，同为15 kW，机架同样紧凑：1800×800×1200 mm、400 kg。已公布差异才有用。10系列列出理论输送量21 m³/h、23 MPa、料斗0.1 m³、水平仅25 m、骨料2 cm及以下。该行未列垂直高度和管径。管长超过25 m时，不要因为理论方量更高就用10系列替换电动15型；理论21 m³/h解决不了25 m水平窗口以外的管路。",
        ),
        L(
          "Electric 15 keeps 8–10 m³/h but publishes 60–80 m horizontal, 15–20 m vertical, 1–3 cm aggregate, and 100–125 mm pipe. Weight is close: 450 kg versus 400 kg. Power is the same 15 kW. Distance and stone size are the split, which is why we keep Electric 15 on the small-building shortlist when the 10 Series horizontal window is too short.",
          "电动15型输送量仍是8–10 m³/h，但公布水平60–80 m、垂直15–20 m，骨料1–3 cm、管径100–125 mm。重量接近：450 kg对400 kg。功率同为15 kW。分开两台的是距离和石子。所以当10系列的水平窗口太短、而石子又可能到3 cm时，我们仍把电动15型留在小型建筑短名单里，而不是只看哪一台理论方量更大。",
        ),
        L(
          "The Electric 20 Concrete Pump at /products/electric-20-concrete-pump steps up distance and mass, not hourly volume: 22 kW, the same 8–10 m³/h, 10 MPa, hopper 0.25 m³, 120 m / 40 m, 80 mm pipe, aggregate 1–2 cm, 2800 × 1300 × 1500 mm, 900 kg. Choose it for the listed 40 m height or 120 m run, or for the 0.25 m³ hopper. Do not choose it only because the name sounds larger. If none of the three compact rows cover the metres, open the electric hub instead. We will not stretch Electric 15 on paper to win an inquiry.",
          "电动20型混凝土泵见 /products/electric-20-concrete-pump，升的是距离和机重，不是每小时方量。目录：22 kW、同样8–10 m³/h、10 MPa、料斗0.25 m³、水平120 m / 垂直40 m、管径80 mm、骨料1–2 cm、2800×1300×1500 mm、900 kg。需要目录里的40 m高度或120 m管长，或需要已公布的0.25 m³料斗时，再看电动20型。不要只因为名字更大就选它：输送量仍是8–10 m³/h，80 mm管和1–2 cm石子也与电动15型不同。若三台紧凑机的目录米数都盖不住，离开本页去看电动泵入口上的中型拖泵细石表。我们不会在纸面上把电动15型拉长，只为了接下询盘。",
        ),
      ],
    },
    {
      heading: L(
        "Inquiry Checklist and How to Contact the Xingtai Factory",
        "询盘清单：如何联系邢台工厂",
      ),
      paragraphs: [
        L(
          "Send a short site note, not a model name only. We match the Electric 15 table faster when height, pipe length, stone, and power are already in the message. Price without those four items is a guess, and we prefer not to guess from Xingtai.",
          "请发一段工地说明，不要只写型号名。高度、管长、石子、电源这四项齐了，邢台工程师对照电动15型目录会更快。缺这四项的报价是猜，我们不愿意猜完再改型号。把清单发到询盘页，并附上产品链接，便于和电动10系列、电动20型一起对照。",
        ),
      ],
      bullets: [
        L(
          "Floors or vertical metres, plus measured horizontal pipe including bends.",
          "层数或垂直米数，以及含弯头的水平管长实测值。",
        ),
        L(
          "Maximum aggregate size (keep 1–3 cm in view for Electric 15) and whether the pour is house floors or secondary structure.",
          "最大骨料粒径（电动15型对照1–3 cm），以及浇筑是楼面还是二次结构。",
        ),
        L(
          "Confirm 15 kW grid power is available; if not, ask us to compare a listed diesel compact pump instead.",
          "确认现场有15 kW电网；若没有，让我们改对照已列的紧凑柴油泵。",
        ),
        L(
          "Write to /contact with the product link /products/electric-15-concrete-pump. For construction placement context see /solutions/construction.",
          "把产品链接 /products/electric-15-concrete-pump 一并写到 /contact。建筑浇筑背景见 /solutions/construction。",
        ),
      ],
    },
  ],
  faqs: [
    {
      question: L(
        "Is the Electric 15 enough for a two- or three-floor house?",
        "电动15型够不够浇两三层自建房？",
      ),
      answer: L(
        "Often yes on height alone: the catalogue lists 15–20 m vertical, and two to three floors usually sit below that. You still have to keep the full pipe inside 60–80 m horizontal and the stone inside 1–3 cm. Send floor height and a pipe sketch to /contact so we can match the table, not a guess.",
        "仅看高度，常常可以：目录垂直15–20 m，两三层多半低于这个窗口。仍须把整段管路控制在水平60–80 m内，石子落在1–3 cm。把层高和管路草图发到 /contact，我们按表对照，不按感觉。",
      ),
    },
    {
      question: L(
        "How does Electric 15 differ from the Electric 10 Series?",
        "电动15型与电动10系列有何不同？",
      ),
      answer: L(
        "Both list 15 kW. The 10 Series at /products/electric-10-series-concrete-pump publishes 21 m³/h theoretical output, 23 MPa, 0.1 m³ hopper, 25 m horizontal, aggregate ≤2 cm, 400 kg. Electric 15 publishes 8–10 m³/h, 15–20 m vertical, 60–80 m horizontal, 1–3 cm aggregate, 100–125 mm pipe, 450 kg. Longer house pipes usually point to Electric 15, not the higher theoretical m³/h on the 10 Series.",
        "两台都是15 kW。10系列见 /products/electric-10-series-concrete-pump，公布理论21 m³/h、23 MPa、料斗0.1 m³、水平25 m、骨料≤2 cm、400 kg。电动15型公布8–10 m³/h、垂直15–20 m、水平60–80 m、骨料1–3 cm、管径100–125 mm、450 kg。宅基地管更长时，通常看电动15型，而不是10系列更高的理论方量。",
      ),
    },
    {
      question: L(
        "When should I choose the Electric 20 instead of Electric 15?",
        "什么时候该选电动20型而不是电动15型？",
      ),
      answer: L(
        "Choose the Electric 20 at /products/electric-20-concrete-pump when you need the listed 120 m horizontal / 40 m vertical, 10 MPa, or 0.25 m³ hopper. Output stays 8–10 m³/h. The unit is 900 kg with an 80 mm pipe and 1–2 cm aggregate, so it is a longer-reach compact trailer pump, not a higher-volume pump.",
        "需要目录中的水平120 m / 垂直40 m、10 MPa或0.25 m³料斗时，选 /products/electric-20-concrete-pump 上的电动20型。输送量仍是8–10 m³/h。整机900 kg，管径80 mm，骨料1–2 cm，所以它是更远距离的紧凑拖泵，不是更大排量泵。",
      ),
    },
    {
      question: L(
        "Can the Electric 15 pump high-rise concrete?",
        "电动15型能泵高层混凝土吗？",
      ),
      answer: L(
        "No. Vertical delivery is 15–20 m in the catalogue. High-rise work needs a larger listed electric trailer pump. Hebei Pinjin Machinery does not list truck-mounted boom pumps. Start from /products/electric-concrete-pumps and match vertical metres before you inquire.",
        "不能。目录垂直输送是15–20 m。高层要对照更大的已列电动拖泵。河北品锦机械目录不列车载臂架泵。请从 /products/electric-concrete-pumps 按垂直米数对照后再询盘。",
      ),
    },
  ],
};
