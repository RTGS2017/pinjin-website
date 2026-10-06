import type { LocalizedText } from '@/i18n/types';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

export interface ProofPhoto {
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
  kicker: LocalizedText;
  place: LocalizedText;
  tag: LocalizedText;
}

const XINGTAI = L('Xingtai, Hebei, China', '中国河北邢台');
const REAL_FACTORY = L('Real factory photo', '工厂实拍');
const REAL_PHOTO = L('Real photo', '实拍');

export const heroPhoto: ProofPhoto = {
  src: '/images/factory/pinjin-trailer-concrete-pump-assembly.webp',
  width: 1920,
  height: 1080,
  alt: L(
    'Trailer concrete pump assembly at the Pinjin factory in Xingtai, Hebei, China',
    '河北邢台品锦工厂正在装配的拖式混凝土泵',
  ),
  kicker: L('Factory assembly', '工厂装配'),
  place: XINGTAI,
  tag: REAL_FACTORY,
};

export const trustPoints = [
  L('Factory direct', '工厂直供'),
  L('Xingtai, China', '中国邢台'),
  L('Published specifications', '参数公开'),
  L('Parts available', '配件可询'),
];

export const buyerConcerns: { concern: LocalizedText; proof: LocalizedText; photo: ProofPhoto }[] = [
  {
    concern: L('Will the machine look like the one on the page?', '网页上的机器和实物一样吗？'),
    proof: L(
      'The photos on this site are from the Xingtai factory and its jobsite set, not a stock library.',
      '本站照片来自邢台工厂和已收录的工地实拍，不是图库素材。',
    ),
    photo: heroPhoto,
  },
  {
    concern: L('Are the specifications real?', '参数是真的吗？'),
    proof: L(
      'Each listed model has its own page. Output, pressure, distance and aggregate size are the printed catalogue cells, not a slogan.',
      '每个在售型号有自己的页面。产量、压力、距离和骨料粒径是目录里印出的格子，不是口号。',
    ),
    photo: {
      src: '/images/factory/pinjin-concrete-pump-manufacturing.webp',
      width: 1920,
      height: 1080,
      alt: L(
        'Concrete pump manufacturing at the Pinjin factory in Xingtai, Hebei, China',
        '河北邢台品锦工厂的混凝土泵制造现场',
      ),
      kicker: L('Manufacturing', '制造'),
      place: XINGTAI,
      tag: REAL_FACTORY,
    },
  },
  {
    concern: L('Can I buy pipes and wear parts later?', '以后还能买管子和易损件吗？'),
    proof: L(
      'Delivery pipes, elbows, clamps, hoses, pistons and seals can be quoted with the machine. They are not sold as loose single pieces.',
      '输送管、弯管、管卡、胶管、活塞和密封可以和整机一起报价。不拆零零售。',
    ),
    photo: {
      src: '/images/applications/pinjin-concrete-pump-construction-site.webp',
      width: 1280,
      height: 960,
      alt: L(
        'Pinjin concrete pump on a construction site',
        '施工现场的品锦混凝土泵',
      ),
      kicker: L('Jobsite', '工地'),
      place: L('Factory photo set', '工厂图集'),
      tag: REAL_PHOTO,
    },
  },
  {
    concern: L('Who do I talk to before I order?', '下单前我和谁说话？'),
    proof: L(
      'You write to the factory in Xingtai by WhatsApp or email. There is no overseas office claimed on this site.',
      '你通过 WhatsApp 或邮件直接联系邢台工厂。本站不声称设有海外办公室。',
    ),
    photo: {
      src: '/images/hero/pinjin-machinery-factory-xingtai-china.webp',
      width: 2560,
      height: 1086,
      alt: L(
        'Hebei Pinjin Machinery factory exterior in Xingtai, Hebei, China',
        '河北品锦机械邢台工厂外观',
      ),
      kicker: L('Factory exterior', '工厂外观'),
      place: XINGTAI,
      tag: REAL_FACTORY,
    },
  },
];

export const whyReasons: { title: LocalizedText; body: LocalizedText }[] = [
  {
    title: L('Direct from the factory', '工厂直供'),
    body: L(
      'You talk with the manufacturer in Xingtai, China, before you place an order.',
      '下单前，你直接和中国邢台的制造厂沟通。',
    ),
  },
  {
    title: L('Clear model information', '型号写清楚'),
    body: L(
      'Each listed machine has its own specifications, applications and limits. A distance cell is not stretched to win the enquiry.',
      '每台在售机器有自己的参数、用途和边界。不会为了拿下询盘把距离格拉长。',
    ),
  },
  {
    title: L('Project-based selection', '按工程选型'),
    body: L(
      'Output, aggregate size, pumping distance and site power are checked before a model is named.',
      '先核对产量、骨料粒径、泵送距离和现场动力，再指出型号。',
    ),
  },
  {
    title: L('Machines and pumping parts', '整机和管路配件'),
    body: L(
      'Delivery pipes, elbows, clamps, hoses and wear parts can be quoted with the equipment.',
      '输送管、弯管、管卡、胶管和易损件可以和设备一起报价。',
    ),
  },
  {
    title: L('Production and loading you can see', '生产和装车看得到'),
    body: L(
      'Workshop, assembly, packing and loading photos on this site were taken at the Xingtai factory.',
      '本站的车间、装配、包装和装车照片拍自邢台工厂。',
    ),
  },
];

export const factoryProof: ProofPhoto[] = [
  {
    src: '/images/hero/pinjin-machinery-factory-xingtai-china.webp',
    width: 2560,
    height: 1086,
    alt: L(
      'Pinjin Machinery factory exterior in Xingtai, Hebei, China',
      '河北邢台品锦机械工厂外观',
    ),
    kicker: L('Factory', '工厂'),
    place: XINGTAI,
    tag: REAL_FACTORY,
  },
  {
    src: '/images/factory/pinjin-machinery-workshop-overhead-crane.webp',
    width: 1920,
    height: 1080,
    alt: L(
      'Pinjin workshop with overhead crane in Xingtai, Hebei, China',
      '河北邢台品锦车间与行车',
    ),
    kicker: L('Workshop', '车间'),
    place: XINGTAI,
    tag: REAL_FACTORY,
  },
  heroPhoto,
  {
    src: '/images/factory/pinjin-concrete-pump-manufacturing.webp',
    width: 1920,
    height: 1080,
    alt: L(
      'Concrete pump manufacturing floor at Pinjin in Xingtai, Hebei, China',
      '河北邢台品锦混凝土泵制造现场',
    ),
    kicker: L('Production floor', '生产现场'),
    place: XINGTAI,
    tag: REAL_FACTORY,
  },
];

export const journey: { step: string; title: LocalizedText; body: LocalizedText; photo?: ProofPhoto }[] = [
  {
    step: '01',
    title: L('Project', '工程'),
    body: L(
      'Tell us the pour: output, distance, aggregate size and the power on site.',
      '先说浇筑：产量、距离、骨料粒径，以及现场有什么动力。',
    ),
    photo: {
      src: '/images/applications/pinjin-concrete-pump-building-construction.webp',
      width: 1600,
      height: 1200,
      alt: L(
        'Pinjin concrete pump on a building construction site',
        '建筑工地上的品锦混凝土泵',
      ),
      kicker: L('Jobsite', '工地'),
      place: L('Factory photo set', '工厂图集'),
      tag: REAL_PHOTO,
    },
  },
  {
    step: '02',
    title: L('Model', '型号'),
    body: L(
      'We name a listed model whose printed cells cover that work. The full table stays on the product page.',
      '我们指出目录里能盖住这个工况的型号。完整参数表在产品页。',
    ),
  },
  {
    step: '03',
    title: L('Production', '生产'),
    body: L('The machine is manufactured and assembled in Xingtai.', '机器在邢台制造和装配。'),
    photo: {
      src: '/images/factory/pinjin-concrete-pump-manufacturing.webp',
      width: 1920,
      height: 1080,
      alt: L(
        'Concrete pump in production at the Pinjin factory in Xingtai',
        '邢台品锦工厂正在生产的混凝土泵',
      ),
      kicker: L('Production', '生产'),
      place: XINGTAI,
      tag: REAL_FACTORY,
    },
  },
  {
    step: '04',
    title: L('Inspection', '检测'),
    body: L(
      'The machine is checked in Xingtai before it is packed. A separate inspection-certificate photo is not on file yet.',
      '包装前在邢台检测。单独的检测证书照片目前还没有。',
    ),
    photo: {
      src: '/images/factory/pinjin-machinery-workshop-overhead-crane.webp',
      width: 1920,
      height: 1080,
      alt: L(
        'Pinjin workshop in Xingtai where machines are handled before they leave',
        '邢台品锦车间，机器离厂前在这里作业',
      ),
      kicker: L('Workshop', '车间'),
      place: XINGTAI,
      tag: REAL_FACTORY,
    },
  },
  {
    step: '05',
    title: L('Packing', '包装'),
    body: L('Equipment is prepared for shipment at the factory.', '设备在工厂做好发运准备。'),
    photo: {
      src: '/images/factory/pinjin-construction-machinery-factory-loading.webp',
      width: 1920,
      height: 1080,
      alt: L(
        'Construction machinery packed and loaded at the Pinjin factory in Xingtai',
        '邢台品锦工厂正在包装装车的工程机械',
      ),
      kicker: L('Packing and loading', '包装与装车'),
      place: XINGTAI,
      tag: REAL_PHOTO,
    },
  },
  {
    step: '06',
    title: L('Loading', '装车'),
    body: L(
      'The machine is loaded at the factory. A photo of loading into a shipping container is not on file yet.',
      '机器在工厂装车。装入集装箱的照片目前还没有。',
    ),
    photo: {
      src: '/images/factory/pinjin-diesel-machinery-factory-dispatch.webp',
      width: 1920,
      height: 1080,
      alt: L(
        'Diesel equipment leaving the Pinjin factory in Xingtai',
        '从邢台品锦工厂发出的柴油设备',
      ),
      kicker: L('Dispatch', '出厂'),
      place: XINGTAI,
      tag: REAL_PHOTO,
    },
  },
  {
    step: '07',
    title: L('Arrival', '到达'),
    body: L(
      'After shipment, setup is the next stage on your site. We do not have an arrival or handover photo to show yet.',
      '发运之后，下一步是你工地上的就位。到达或交接的照片目前还没有。',
    ),
  },
];

export const shipmentCards: { title: LocalizedText; body: LocalizedText; photo: ProofPhoto }[] = [
  {
    title: L('Electric pump, in the workshop', '电动泵，在车间'),
    body: L('Manufacturing floor at the Xingtai factory.', '邢台工厂的制造现场。'),
    photo: factoryProof[3],
  },
  {
    title: L('Trailer pump, in assembly', '拖式泵，在装配'),
    body: L('A trailer pump on the assembly floor, not a catalogue rendering.', '装配现场的拖式泵，不是效果图。'),
    photo: heroPhoto,
  },
  {
    title: L('Packed and loaded', '包装与装车'),
    body: L('Equipment prepared for dispatch from Xingtai.', '从邢台发出前的装车。'),
    photo: journey[4].photo!,
  },
  {
    title: L('Diesel equipment leaving the yard', '柴油设备离厂'),
    body: L(
      'Dispatch from the factory. Destination is not printed on this photo, so it is not labelled as a country delivery.',
      '工厂发运。照片上没有目的地，所以不标注运往哪个国家。',
    ),
    photo: journey[5].photo!,
  },
];

export const jobCards: {
  title: LocalizedText;
  body: LocalizedText;
  href: string;
  photo?: ProofPhoto;
}[] = [
  {
    title: L('Building and residential', '建筑与住宅'),
    body: L(
      'Concrete placement where height, daily volume and stone size decide the model.',
      '楼层和住宅浇筑。高度、一天的方量和石子粒径决定型号。',
    ),
    href: '/solutions/construction',
    photo: journey[0].photo!,
  },
  {
    title: L('Long-distance pumping', '长距离泵送'),
    body: L(
      'For a line that has to travel further. Measure the pipe, then open the model whose horizontal cell still covers it.',
      '管路要走得更远时。先量管长，再打开水平格还能盖住的型号。',
    ),
    href: '/solutions/infrastructure',
    photo: {
      src: '/images/applications/pinjin-concrete-equipment-highway-infrastructure.webp',
      width: 1280,
      height: 960,
      alt: L(
        'Pinjin construction equipment on a highway infrastructure site',
        '公路现场的品锦工程设备',
      ),
      kicker: L('Infrastructure', '基建'),
      place: L('Factory photo set', '工厂图集'),
      tag: REAL_PHOTO,
    },
  },
  {
    title: L('Remote and off-grid work', '偏远、没有稳定电源'),
    body: L(
      'Diesel trailer pumps and tractor-driven pumps for sites that cannot feed an electric motor.',
      '供不上电机的工地，用柴油拖泵或拖拉机带动泵。',
    ),
    href: '/products/diesel-concrete-pumps',
    photo: journey[5].photo!,
  },
  {
    title: L('Mixing and pumping', '搅拌加泵送'),
    body: L(
      'One machine mixes and places concrete. This is not a concrete batching plant.',
      '一台机器完成搅拌和泵送。这不是搅拌站。',
    ),
    href: '/products/mixer-pumps',
  },
];

export const familyIds = [
  'electric-concrete-pump',
  'diesel-concrete-pump',
  'mixer-pump',
  'spraying-machine',
] as const;

export const afterContact: LocalizedText[] = [
  L('You send the project details.', '你发来工程条件。'),
  L('We confirm the equipment configuration.', '我们确认设备配置。'),
  L('We compare the suitable listed models.', '我们对照适合的在售型号。'),
  L('We confirm the quotation and what is known about shipping.', '我们确认报价，以及目前能确定的发运信息。'),
  L('Production starts after the order is confirmed.', '订单确认后开始生产。'),
  L('The machine is prepared and shipped from Xingtai.', '机器在邢台备好并发出。'),
];

export const confirmFields: LocalizedText[] = [
  L('Required output', '需要的产量'),
  L('Maximum aggregate size', '最大骨料粒径'),
  L('Horizontal distance', '水平距离'),
  L('Vertical distance', '垂直距离'),
  L('Delivery pipe diameter', '输送管管径'),
  L('Site voltage or diesel', '现场电压或柴油'),
  L('Machine dimensions', '机器外形尺寸'),
  L('Weight', '重量'),
];

export const australiaChecks: LocalizedText[] = [
  L('Site power', '现场动力'),
  L('Output', '产量'),
  L('Pumping distance', '泵送距离'),
  L('Aggregate size', '骨料粒径'),
  L('Machine dimensions', '外形尺寸'),
  L('Weight', '重量'),
  L('How the machine should be delivered', '发运方式'),
  L('Spare parts', '配件'),
  L('Documents you need with the shipment', '随货需要的资料'),
];

export const homeFaqIds = [
  'who-is-pinjin',
  'what-products',
  'how-to-choose',
  'diesel-vs-motor',
] as const;

export const replyExpectation = L(
  'WhatsApp and email are answered on China business days. This is not a 24-hour desk.',
  'WhatsApp 和邮件在中国工作日回复。这里不是 24 小时值班。',
);
