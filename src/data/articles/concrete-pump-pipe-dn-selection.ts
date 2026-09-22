import type { BlogPost } from '@/data/blog';
import type { LocalizedText } from '@/i18n/types';
import { getFactorySlide } from '@/data/factory';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

function articleImage(id: string, alt: LocalizedText, caption?: LocalizedText) {
  const slide = getFactorySlide(id);
  if (!slide) {
    throw new Error(`Missing factory slide: ${id}`);
  }
  return {
    src: slide.image,
    alt,
    caption: caption ?? slide.title,
  };
}

export const article: BlogPost = {
  slug: 'concrete-pump-pipe-dn-selection',
  title: L(
    'Concrete Pump Pipe DN Selection: DN80 vs DN100/125',
    '混凝土泵输送管DN选型：DN80与DN100/125',
  ),
  seoTitle: L(
    'Concrete Pump Pipe DN Selection | DN80 vs DN125 | Pinjin Xingtai',
    '混凝土泵管DN选型｜DN80与DN125｜品锦邢台',
  ),
  description: L(
    'Buyers often ask for a pipe price first. At our Xingtai factory we start with delivery pipe DN. We publish 80 mm on Electric 20, 100–125 mm on Electric 15, and 100 / 125 mm on mixer pumps and HBT8018.',
    '询价往往先问管子多少钱。我们邢台工厂先问输送管DN。目录已公布：电动20为80 mm，电动15为100–125 mm，搅拌泵与HBT8018为100 / 125 mm。',
  ),
  category: 'manufacturing-knowledge',
  date: '2026-08-30',
  keywords: ['concrete pump pipe DN', 'delivery pipe selection', 'DN80 DN125'],
  relatedProductSlugs: [
    'electric-20-concrete-pump',
    'electric-15-concrete-pump',
    'hbt8018-concrete-pump',
  ],
  relatedPaths: [
    {
      href: '/products/electric-concrete-pumps',
      label: L('Electric concrete pump manufacturer China', '中国电动混凝土泵厂家'),
    },
    {
      href: '/solutions/construction',
      label: L('Building construction pumping', '建筑施工泵送应用'),
    },
    {
      href: '/contact',
      label: L('Contact Xingtai manufacturer', '联系邢台厂家'),
    },
    {
      href: '/blog/concrete-pump-spare-parts-wear-parts',
      label: L(
        'Concrete pump spare parts: pistons, valves and pipes',
        '混凝土泵活塞阀门管路配件',
      ),
    },
  ],
  content: [
    {
      heading: L(
        'Buyers ask for a price; we ask DN80 or DN100/125',
        '客户先问价格，我们先问DN80还是DN100/125',
      ),
      paragraphs: [
        L(
          'When a buyer writes to Hebei Pinjin Machinery, the first line is often a price for concrete pump pipe. From our Xingtai workshop that question is incomplete. The line has to match the pump outlet and the mix already listed for that machine.',
          '写给河北品锦机械的询盘，开头常常是一句“混凝土泵管多少钱”。在我们邢台车间看来，这个问题还不完整。输送管要对上泵的出口，也必须对上该机型目录里已经写明的骨料范围，不能当成随便报一截的通用件。',
        ),
        L(
          'Our engineers therefore ask: are you lining up DN80, or DN100 / DN125? Those are the inner diameters we actually publish on catalogue pumps. Until we know which family the site needs, a number in a message is not a selection.',
          '所以我们工程人员会反过来问：你要对的是DN80，还是DN100 / DN125？这才是我们在目录泵上真正公布过的内径。工地属于哪一档还没说清之前，消息里的一个数字还谈不上选型。询盘里常把管子当配件单独询价，我们仍会先把DN族问清楚。',
        ),
        L(
          'We manufacture trailer and mixer concrete pumps in Renze Industrial Park, Xingtai. The outlet and the first pipes leave as a matched set. Mixing another DN family onto a pump we did not list for that diameter is not something we will bless from a photograph.',
          '我们在邢台任泽工业园区制造拖式混凝土泵和搅拌泵。出口与出厂配备的第一段管路，是按该机型配套的。把另一档DN的管子套到我们并未按该管径公布的泵上，我们不会只凭一张照片就点头。现场现有管子能不能继续用，也要先对上机型，而不是先谈米数。',
        ),
      ],
      image: articleImage(
        'workshop-crane',
        L(
          'Pinjin Xingtai workshop overhead crane during concrete pump assembly',
          '品锦邢台车间行车吊运混凝土泵装配件',
        ),
        L(
          'Xingtai workshop where trailer pumps and matched delivery pipe leave as a set',
          '邢台车间：拖泵与配套输送管按机型成套出厂',
        ),
      ),
    },
    {
      heading: L(
        'Pipe diameters we publish — not a full size table',
        '我们公布的管径，不是一张完整规格表',
      ),
      paragraphs: [
        L(
          'This article is a selection note, not a warehouse list of every clamp, elbow and hose. We do not publish a full pipe size table, and we will not invent wall thickness here. What we do publish is delivery pipe diameter next to each listed model that carries the field.',
          '这篇文章是选型说明，不是把管卡、弯头、胶管逐件摊开的仓库目录。我们不公布完整的管子规格表，这里也不会编造壁厚数字。我们真正写在产品页上的，是带有该字段的机型所对应的输送管内径。没有写进那几台泵参数表的直径，都不能当成“品锦拖泵主管路已经公开”来用。',
        ),
        L(
          'If a diameter is not written on those pages, we do not treat it as a published pump line. Selection starts from the pump model, then the DN printed beside it.',
          '产品页上没写的管径，我们不当成已公布的泵送主管路。选型从机型开始，再看旁边印着的DN，而不是从另一类产品上的铭牌记号倒推。邢台工厂可以按已列机型确认配套管路，但不会在这篇知识稿里补一张全型号、全壁厚的对照总表。',
        ),
      ],
      bullets: [
        L(
          'Electric 20 concrete pump: delivery pipe 80 mm',
          '电动20型混凝土泵：输送管内径80 mm',
        ),
        L(
          'Electric 15 concrete pump: delivery pipe 100–125 mm',
          '电动15型混凝土泵：输送管内径100–125 mm',
        ),
        L(
          'Integrated mixer pump: delivery pipe 100 / 125 mm',
          '搅拌泵一体机：输送管内径100 / 125 mm',
        ),
        L(
          'HBT8018 concrete pump: delivery pipe 100 / 125 mm',
          'HBT8018混凝土泵：输送管内径100 / 125 mm',
        ),
      ],
    },
    {
      heading: L(
        'DN80 on the Electric 20 concrete pump',
        '电动20型上的DN80',
      ),
      paragraphs: [
        L(
          'The Electric 20 is a 22 kW electric trailer pump: 8–10 m³/h at 10 MPa, 0.25 m³ hopper, 120 m horizontal / 40 m vertical, 900 kg. Delivery pipe is 80 mm. Maximum aggregate is 1–2 cm.',
          '电动20型是22 kW电动拖泵。目录输送量8–10 m³/h，出口压力10 MPa，料斗0.25 m³，水平120 m / 垂直40 m，整机900 kg。输送管内径80 mm，最大骨料粒径1–2 cm。这组数字要一起读：管子不是单独卖的“更粗一档”，而是跟这台22 kW、细骨料工况写在同一张参数表上的。',
        ),
        L(
          'That 80 mm figure is why we interrupt a price-first enquiry. The Electric 20 is not a bigger-pipe machine just because it has more kilowatts than Electric 15. If your mix regularly sits above 1–2 cm, look at models whose catalogue pipe is 100 / 125 mm.',
          '正是这个80 mm，让我们会打断“先报价”的询盘。电动20并不是“功率更大管子就该更粗”的机型。它公布的管路是80 mm，并且配的是相对细的骨料区间。如果现场拌合物经常超过1–2 cm，就不该在这台泵上谈管子——我们应该去看目录管径写成100 / 125 mm的机型。很多询盘把电动20当成“比15更大的管子”，邢台车间的对照结果正好相反。',
        ),
        L(
          'On the factory floor we treat 80 mm as the Electric 20 family. Clamps and hoses have to continue that diameter unless our engineers agree a documented transition. We do not publish reducer tables here.',
          '在车间里，我们把80 mm当成电动20这一族。管卡与胶管要延续这个直径，除非工程人员书面确认过渡方案。本文不公布变径表，也不把80 mm改写成别的公称直径去凑现场库存。',
        ),
      ],
      image: {
        src: '/images/products/electric-20-concrete-pump/main.webp',
        alt: L(
          'Electric 20 concrete pump with 80 mm delivery pipe from the Xingtai catalogue',
          '邢台目录中的电动20型混凝土泵，输送管80 mm',
        ),
        caption: L(
          'Electric 20: published delivery pipe 80 mm, aggregate 1–2 cm',
          '电动20型：目录输送管80 mm，骨料1–2 cm',
        ),
      },
    },
    {
      heading: L(
        'DN100 and DN125 on Electric 15, mixer pumps and HBT8018',
        '电动15、搅拌泵与HBT8018上的DN100与DN125',
      ),
      paragraphs: [
        L(
          'Three catalogue machines share the 100 / 125 mm band, and they are not the same pump. We group them only because the published pipe sits in that family.',
          '目录里有三台机器同属100 / 125 mm这一档，但它们不是同一台泵。我们把它们放在一起，只因为公布的输送管内径落在这一族。管径相同，不等于功率、排量和输送距离可以互相替代。',
        ),
        L(
          'The Electric 15 is a compact 15 kW unit: 8–10 m³/h, 15–20 m vertical / 60–80 m horizontal, 450 kg. Pipe is 100–125 mm, aggregate 1–3 cm. The smaller motor does not mean a smaller pipe: Electric 15 is 100–125 mm; Electric 20 is 80 mm.',
          '电动15型是紧凑的15 kW机型：输送量8–10 m³/h，垂直15–20 m / 水平60–80 m，重量450 kg。输送管内径写成100–125 mm，骨料1–3 cm。有人以为电机更小管子就该更细，目录并不是这样：电动15属于100–125 mm这一族，电动20才是80 mm。紧凑机型和细管并不是一回事，邢台出厂时也是按这张表配的。',
        ),
        L(
          'The integrated mixer pump mixes and pumps on one trailer: 45 kW plus 14 kW mixer, 21 m³/h, 23 MPa, 0.4 m³ hopper, 100 m / 300 m, aggregate 4 cm and below, pipe 100 / 125 mm.',
          '搅拌泵一体机是搅拌与泵送装在同一台拖车上：主电机45 kW、搅拌电机14 kW，输送量21 m³/h，压力23 MPa，料斗0.4 m³，水平100 m / 垂直300 m，骨料4 cm及以下，输送管100 / 125 mm。它能搅拌，并不改变管子仍要落在已公布的100 / 125 mm族里这一条。',
        ),
        L(
          'HBT8018-132S is the high-output electric trailer here: 132 kW, 60 m³/h, 40 MPa, 150 m conveying, 450 m height, aggregate 4 cm and below, pipe 100 / 125 mm, 6500 kg. The catalogue lists both diameters; we confirm which one ships against the pump and the mix. We have not published a site-by-site 100 versus 125 rule in this note.',
          '本文里的大排量电动拖泵是HBT8018-132S：132 kW，60 m³/h，40 MPa，输送距离150 m，输送高度450 m，骨料4 cm及以下，输送管100 / 125 mm，重量6500 kg。我们写成100 / 125 mm，是因为目录两项都列了，不是说每个工地都该两套都订。某一单发100还是125，要对照泵和拌合物确认。这份知识稿不会假装我们已经公布了100与125的工地对照表，也不会把HBT8018的管子族套到电动20的80 mm上。',
        ),
      ],
    },
    {
      heading: L(
        'Match pipe DN to the aggregate the model already lists',
        '管径要跟机型已经公布的骨料对上',
      ),
      paragraphs: [
        L(
          'Pipe DN and maximum aggregate are printed on the same specification block. We use that pairing instead of a homemade stone-to-bore ratio, which this article is not allowed to add.',
          '管内径和最大骨料粒径印在同一块参数表上。我们按这对关系选型，而不是自己编一套“石子粒径占管内径几分之一”的公式。那种比例正是本文不允许补进去的数字，邢台工程人员对现场时也是拿已公布的配对来挡，而不是现场口算。',
        ),
        L(
          'Read the four published pairings together. Electric 20: 80 mm with 1–2 cm. Electric 15: 100–125 mm with 1–3 cm. Mixer pump and HBT8018: 100 / 125 mm with aggregate 4 cm and below. If a buyer describes a coarse mix and then asks for an Electric 20 80 mm line, we will push back.',
          '四组已公布的配对要一起看。电动20：80 mm配1–2 cm骨料。电动15：100–125 mm配1–3 cm。搅拌泵与HBT8018：100 / 125 mm配4 cm及以下骨料。如果询盘一边说粗骨料，一边要电动20的80 mm管路，我们会挡回去。目录里的骨料和目录里的管子是绑在一起的。骨料越出已列范围，应先换机型或改配比，而不是先改管径去“凑”。',
        ),
        L(
          'We also do not convert DN into wall thickness, pressure class, or a spare-part price list. Those extra columns are not on the pump pages we cite, so they do not appear here.',
          '我们也不会把DN换算成壁厚、压力等级或配件价目。那些多出来的列并不写在我们这里引用的泵产品页上，所以这份说明里也不出现。需要报价时，请把机型和DN族写进询盘，由工厂按已列机型回复，而不是在知识页上填一张价目。',
        ),
      ],
    },
    {
      heading: L(
        'What to send our Xingtai engineers before we match a line',
        '对接邢台工程人员前，请先把这些说清楚',
      ),
      paragraphs: [
        L(
          'A useful enquiry names the pump, the DN family, the mix, and the line layout — not only a metre price. We manufacture in Xingtai; we match a line to a listed machine when those four points are on the table.',
          '有用的询盘会点明泵型、DN族、拌合物和管路布置，而不是只问一米多少钱。我们在邢台制造；这四点摆到台面上，才能把管路对到已列机型上。任泽工业园区的工程人员对照的是目录字段，不是询盘里临时起的管径称呼。',
        ),
        L(
          'Then write to us from the contact page, or start from the electric concrete pump hub if you are still choosing a machine for building work. We will match the line to a listed model. We will not fill this page with a complete pipe matrix, wall thicknesses, or invented list prices.',
          '随后从联系页写信给我们；如果还在为建筑工地选泵，也可以先从电动混凝土泵产品中心看起。我们会把管路对到已列机型。这份页面不会补一张完整管子矩阵，也不会补壁厚或编造的标价。把DN80还是DN100/125说清楚，比先要一个管子单价更接近能排产的选型。',
        ),
      ],
      bullets: [
        L(
          'Which listed model you are running or buying — Electric 20, Electric 15, mixer pump, HBT8018, or another catalogue unit',
          '正在使用或准备采购的已列机型：电动20、电动15、搅拌泵、HBT8018，或其他目录机型',
        ),
        L(
          'Whether you need the 80 mm family or the 100 / 125 mm family',
          '需要的是80 mm这一族，还是100 / 125 mm这一族',
        ),
        L(
          'Maximum aggregate you actually pour, in centimetres',
          '现场实际浇筑的最大骨料粒径，单位用厘米',
        ),
        L(
          'Roughly how much horizontal and vertical pipe you expect, so we can compare it with the published distance on that model',
          '预计的水平和垂直管路大概多长，便于对照该机型已公布的输送距离',
        ),
      ],
    },
  ],
  faqs: [
    {
      question: L(
        'Why does Pinjin ask about pipe DN before quoting?',
        '为什么品锦报价前先问输送管DN？',
      ),
      answer: L(
        'Because 80 mm and 100 / 125 mm are different families on our published pumps. A price without DN is not a selection. We quote after the model and diameter are clear.',
        '因为在我们已公布的泵上，80 mm与100 / 125 mm是不同的管路族。没有DN的价格还不是选型。机型和管径说清之后，我们再报价。',
      ),
    },
    {
      question: L(
        'Can I fit DN125 pipe on an Electric 20 concrete pump?',
        '电动20型混凝土泵能配DN125管子吗？',
      ),
      answer: L(
        'The Electric 20 is listed at 80 mm. We do not treat DN125 as that model’s published delivery pipe. If you need 100 / 125 mm, look at Electric 15, the mixer pump, or HBT8018, and confirm with our engineers.',
        '电动20型目录写的是80 mm。我们不把DN125当成该机型已公布的输送管。如果需要100 / 125 mm，请看电动15、搅拌泵或HBT8018，并与工程人员确认。',
      ),
    },
    {
      question: L(
        'Do you publish a full pipe size table, including wall thickness?',
        '你们公布完整的管子规格表和壁厚吗？',
      ),
      answer: L(
        'No. We publish delivery pipe diameter on the models that carry that field. We do not publish a full pipe size table, and we do not invent wall thickness in this article.',
        '不公布。我们只在带有该字段的机型上公布输送管内径。我们不发布完整管子规格表，本文也不编造壁厚。',
      ),
    },
    {
      question: L(
        'Is DN200 a delivery line for these trailer and mixer pumps?',
        'DN200是这些拖泵和搅拌泵的输送主管路吗？',
      ),
      answer: L(
        'No. The pumps in this article are published at 80 mm or 100 / 125 mm. We do not present DN200 as a trailer or mixer pump delivery line.',
        '不是。本文涉及的泵，目录管径是80 mm或100 / 125 mm。我们不把DN200当作拖泵或搅拌泵的输送主管路。',
      ),
    },
  ],
};
