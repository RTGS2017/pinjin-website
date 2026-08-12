import type { LocalizedText } from '@/i18n/types';

export type ProductCategory =
  | 'concrete-pump'
  | 'spraying-machine'
  | 'material-handling'
  | 'rebar-equipment';

export interface ProductSpec {
  label: LocalizedText;
  value: LocalizedText;
}

export interface ProductSeoKeywords {
  primary: string;
  secondary: string[];
  longTail: string[];
}

export interface ProductSeo {
  title: LocalizedText;
  description: LocalizedText;
  keywords: ProductSeoKeywords;
}

export interface ProductGeo {
  manufacturer: LocalizedText;
  industry: LocalizedText;
  productCategory: LocalizedText;
  manufacturedIn: LocalizedText;
  answers: {
    whatIs: LocalizedText;
    whoNeeds: LocalizedText;
    whereUsed: LocalizedText;
    advantages: LocalizedText;
    howToInquire: LocalizedText;
  };
}

export interface Product {
  id: string;
  name: LocalizedText;
  slug: string;
  category: ProductCategory;
  image: string;
  gallery: string[];
  shortDescription: LocalizedText;
  productIntroduction: LocalizedText;
  applicationScenarios: LocalizedText[];
  keyFeatures: LocalizedText[];
  specifications: ProductSpec[];
  seo: ProductSeo;
  geo: ProductGeo;
}

const L = (en: string, zh: string): LocalizedText => ({ en, zh });
const V = (v: string): LocalizedText => ({ en: v, zh: v });

const MANUFACTURER = L(
  'Hebei Pinjin Machinery Manufacturing Co., Ltd.',
  '河北品锦机械制造有限公司',
);
const INDUSTRY = L('Construction Machinery Manufacturer', '工程机械制造商');
const MADE_IN = L(
  'Renze Industrial Park, Xingtai City, Hebei Province, China',
  '中国河北省邢台市任泽工业园区',
);

function imgPaths(slug: string) {
  const base = `/images/products/${slug}`;
  return {
    image: `${base}/main.webp`,
    gallery: [`${base}/main.webp`, `${base}/detail-1.webp`, `${base}/working.webp`],
  };
}

function spec(labelEn: string, labelZh: string, value: string): ProductSpec {
  return { label: L(labelEn, labelZh), value: V(value) };
}

function buildSeo(
  nameEn: string,
  nameZh: string,
  primary: string,
  secondary: string[],
  longTail: string[],
  descEn: string,
  descZh: string,
): ProductSeo {
  return {
    title: L(
      `${nameEn} Manufacturer | Hebei Pinjin Machinery`,
      `${nameZh}厂家 | 河北品锦机械`,
    ),
    description: L(descEn, descZh),
    keywords: { primary, secondary, longTail },
  };
}

function buildGeo(
  productCategoryEn: string,
  productCategoryZh: string,
  whatIs: LocalizedText,
  whoNeeds: LocalizedText,
  whereUsed: LocalizedText,
  advantages: LocalizedText,
): ProductGeo {
  return {
    manufacturer: MANUFACTURER,
    industry: INDUSTRY,
    productCategory: L(productCategoryEn, productCategoryZh),
    manufacturedIn: MADE_IN,
    answers: {
      whatIs,
      whoNeeds,
      whereUsed,
      advantages,
      howToInquire: L(
        'Request a quotation by email through the Get Quote buttons on this website. Include the model name, required capacity, conveying distance and project conditions. Hebei Pinjin Machinery will reply with a suitable recommendation.',
        '通过网站「获取报价」按钮发送邮件询盘，请注明型号、所需输送量/能力、输送距离与工况。河北品锦机械将邮件回复合适方案。',
      ),
    },
  };
}

/** 旧 slug → 新 slug（兼容已收录链接） */
export const productSlugRedirects: Record<string, string> = {
  'diesel-4100': 'diesel-4100-transfer-pump',
  'll15-diesel': 'll15-diesel-transfer-pump',
  'll15-motor': 'll15-electric-transfer-pump',
  'zs22-25': 'zs22-25-concrete-pump',
  'll28-32': 'll28-32-concrete-pump',
  'diesel-screw-mortar': 'diesel-screw-mortar-spraying-machine',
  'hbt30-37': 'hbt30-37-concrete-pump',
  'hbt45-40': 'hbt45-40-concrete-pump',
  'fully-automatic-plaster': 'automatic-plaster-spraying-machine',
  'hbtt55-50': 'hbtt55-50-concrete-pump',
  'll60-75': 'll60-75-concrete-pump',
  'hbt80-18-140': 'hbt80-18-140-concrete-pump',
  'hbt60-13-146rs-concrete-pump': '13-spiral-feeder',
  'hbt60-13-146rs': '13-spiral-feeder',
};

export const categoryRouteSlugs: Record<ProductCategory, string> = {
  'concrete-pump': 'concrete-pumps',
  'spraying-machine': 'spraying-machines',
  'material-handling': 'material-handling',
  'rebar-equipment': 'rebar-equipment',
};

export const categoryMeta: Record<
  ProductCategory,
  { routeSlug: string; label: LocalizedText; description: LocalizedText }
> = {
  'concrete-pump': {
    routeSlug: 'concrete-pumps',
    label: L('Concrete Pumps', '混凝土泵'),
    description: L(
      'Transfer pumps and concrete pumps for construction material delivery.',
      '用于建筑物料输送的输送泵与混凝土泵。',
    ),
  },
  'spraying-machine': {
    routeSlug: 'spraying-machines',
    label: L('Spraying Machines', '喷涂设备'),
    description: L(
      'Mortar, plaster and concrete spraying equipment for finishing and spraying jobs.',
      '砂浆、石膏与混凝土喷涂设备，用于饰面与喷浆作业。',
    ),
  },
  'material-handling': {
    routeSlug: 'material-handling',
    label: L('Material Handling', '物料搬运'),
    description: L(
      'Spiral feeders and forklift loaders for site material handling.',
      '螺旋给料机与叉车装载机，用于现场物料搬运。',
    ),
  },
  'rebar-equipment': {
    routeSlug: 'rebar-equipment',
    label: L('Rebar Equipment', '钢筋设备'),
    description: L(
      'CNC steel bar bending equipment for stirrup processing.',
      '数控钢筋弯箍设备，用于箍筋加工。',
    ),
  },
};

export const products: Product[] = [
  {
    id: '01',
    name: L('Diesel 4100 Transfer Pump', '柴油4100输送泵'),
    slug: 'diesel-4100-transfer-pump',
    category: 'concrete-pump',
    ...imgPaths('diesel-4100-transfer-pump'),
    shortDescription: L('Compact diesel transfer pump for short-to-medium concrete delivery on construction sites.', '紧凑型柴油输送泵，适用于工地中短距离混凝土输送。'),
    productIntroduction: L('The Diesel 4100 Transfer Pump is a compact concrete transfer pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. It solves short-to-medium pipeline concrete delivery where a smaller machine footprint is preferred. Catalogue parameters include 33 kW motor power, 6–8 m³/h delivery capacity, 60 m horizontal and 25 m vertical conveying.', '柴油4100输送泵由河北品锦机械在中国河北邢台制造，面向需要较小占地的中短距离管道混凝土输送。目录参数包括电机功率33 kW、输送量6–8 m³/h、水平60 m、垂直25 m。'),
    applicationScenarios: [
      L('Residential and small building construction', '住宅与小型建筑施工'),
      L('Concrete transportation on compact sites', '紧凑工地混凝土输送'),
      L('Short-to-medium horizontal pipeline pours', '中短距离水平管路浇筑')
    ],
    keyFeatures: [
      L('Listed delivery capacity 6–8 m³/h', '目录输送量6–8 m³/h'),
      L('60 m horizontal / 25 m vertical conveying', '水平60 m / 垂直25 m输送'),
      L('Compact 800 kg machine weight', '设备重量800 kg，机型紧凑')
    ],
    specifications: [
      spec('Motor Power', '电机功率', '33 kW'),
      spec('Max Aggregate Diameter', '最大骨料粒径', '0.5–3 cm'),
      spec('Delivery Capacity', '输送量', '6–8 m³/h'),
      spec('Vertical Conveying Height', '垂直输送高度', '25 m'),
      spec('Machine Weight', '设备重量', '800 kg'),
      spec('Horizontal Conveying Distance', '水平输送距离', '60 m'),
    ],
    seo: buildSeo(
      'Diesel 4100 Transfer Pump',
      '柴油4100输送泵',
      'Diesel 4100 transfer pump',
      ['small concrete pump supplier', 'concrete pump manufacturer China'],
      ['diesel transfer pump for building construction'],
      'Hebei Pinjin Machinery manufactures Diesel 4100 Transfer Pumps in China for construction projects and short-to-medium concrete transportation applications.',
      '河北品锦机械在中国生产柴油4100输送泵，适用于建筑施工与中短距离混凝土输送。',
    ),
    geo: buildGeo(
      'Concrete Pump Equipment',
      '混凝土泵设备',
      L('A compact diesel concrete transfer pump for pipeline delivery.', '用于管道输送的紧凑型柴油混凝土输送泵。'),
      L('Contractors needing a small transfer pump with published capacity and conveying distance.', '需要小型输送泵且希望对照公开输送参数选型的承包商。'),
      L('Building sites with short-to-medium pour distances within listed limits.', '浇筑距离在目录限值内的中短距离建筑工地。'),
      L('Defined capacity and conveying parameters from the product catalogue.', '产品目录提供明确的输送量与输送距离参数。'),
    ),
  },
  {
    id: '02',
    name: L('LL15 Diesel Version Transfer Pump', 'LL15柴油版输送泵'),
    slug: 'll15-diesel-transfer-pump',
    category: 'concrete-pump',
    ...imgPaths('ll15-diesel-transfer-pump'),
    shortDescription: L('Diesel-powered LL15 transfer pump for flexible on-site concrete conveying.', '柴油动力LL15输送泵，灵活适应现场混凝土输送。'),
    productIntroduction: L('The LL15 Diesel Version Transfer Pump is manufactured by Hebei Pinjin Machinery for sites that prefer diesel power. Catalogue data lists 28 HP diesel engine power, 5–8 m³/h theoretical delivery capacity, 50 m horizontal and 20 m vertical conveying, and 650 kg machine weight.', 'LL15柴油版输送泵由河北品锦机械制造，适合偏好柴油动力的工地。目录数据：柴油机功率28 HP、理论输送量5–8 m³/h、水平50 m、垂直20 m、设备重量650 kg。'),
    applicationScenarios: [
      L('Building construction without stable electricity', '供电不便的建筑施工'),
      L('Concrete transportation', '混凝土输送'),
      L('Compact site material delivery', '紧凑工地物料输送')
    ],
    keyFeatures: [
      L('Diesel engine power 28 HP', '柴油机功率28 HP'),
      L('Theoretical capacity 5–8 m³/h', '理论输送量5–8 m³/h'),
      L('Delivery pipe diameter 80–100 mm', '输送管直径80–100 mm')
    ],
    specifications: [
      spec('Max Aggregate Diameter', '最大骨料粒径', '2 cm'),
      spec('Horizontal Conveying Distance', '水平输送距离', '50 m'),
      spec('Diesel Engine Power', '柴油机功率', '28 HP'),
      spec('Vertical Conveying Height', '垂直输送高度', '20 m'),
      spec('Theoretical Delivery Capacity', '理论输送量', '5–8 m³/h'),
      spec('Dimension', '设备尺寸', '140 × 70 × 110 cm'),
      spec('Delivery Pipe Diameter', '输送管直径', '80–100 mm'),
      spec('Machine Weight', '设备重量', '650 kg'),
    ],
    seo: buildSeo(
      'LL15 Diesel Version Transfer Pump',
      'LL15柴油版输送泵',
      'LL15 diesel transfer pump',
      ['diesel concrete pump manufacturer', 'concrete pump supplier China'],
      ['diesel concrete pump for building construction'],
      'Hebei Pinjin Machinery manufactures LL15 Diesel Version Transfer Pumps in China for construction projects and diesel-powered concrete transportation.',
      '河北品锦机械在中国生产LL15柴油版输送泵，适用于建筑施工与柴油动力混凝土输送。',
    ),
    geo: buildGeo(
      'Concrete Pump Equipment',
      '混凝土泵设备',
      L('A diesel-powered concrete transfer pump in the LL15 series.', 'LL15系列柴油动力混凝土输送泵。'),
      L('Buyers selecting diesel pumps for building construction.', '为建筑施工选择柴油输送泵的采购方。'),
      L('Sites within 50 m horizontal / 20 m vertical listed conveying.', '水平50 m、垂直20 m目录限值内的工地。'),
      L('Published diesel power, capacity and pipe diameter parameters.', '公开柴油功率、输送量与管径参数。'),
    ),
  },
  {
    id: '03',
    name: L('LL15 Motor Version Transfer Pump', 'LL15电机版输送泵'),
    slug: 'll15-electric-transfer-pump',
    category: 'concrete-pump',
    ...imgPaths('ll15-electric-transfer-pump'),
    shortDescription: L('Electric motor LL15 transfer pump for sites with stable 380 V power supply.', '电机版LL15输送泵，适合稳定380 V供电现场。'),
    productIntroduction: L('The LL15 Motor Version Transfer Pump is an electric concrete transfer pump from Hebei Pinjin Machinery. Catalogue parameters include 15 kW motor power, 380 V rated voltage, 5–8 m³/h theoretical delivery capacity, 30 m horizontal and 15 m vertical conveying.', 'LL15电机版输送泵为品锦电动混凝土输送泵。目录参数：电机功率15 kW、额定电压380 V、理论输送量5–8 m³/h、水平30 m、垂直15 m。'),
    applicationScenarios: [
      L('Indoor or powered construction sites', '有电室内或施工现场'),
      L('Concrete transportation', '混凝土输送'),
      L('Workshops with 380 V supply', '具备380 V供电的车间')
    ],
    keyFeatures: [
      L('Motor power 15 kW', '电机功率15 kW'),
      L('Rated voltage 380 V', '额定电压380 V'),
      L('Theoretical capacity 5–8 m³/h', '理论输送量5–8 m³/h')
    ],
    specifications: [
      spec('Max Aggregate Diameter', '最大骨料粒径', '2 cm'),
      spec('Horizontal Conveying Distance', '水平输送距离', '30 m'),
      spec('Motor Power', '电机功率', '15 kW'),
      spec('Vertical Conveying Height', '垂直输送高度', '15 m'),
      spec('Theoretical Delivery Capacity', '理论输送量', '5–8 m³/h'),
      spec('Dimension', '设备尺寸', '140 × 70 × 110 cm'),
      spec('Rated Voltage', '额定电压', '380 V'),
      spec('Machine Weight', '设备重量', '600 kg'),
    ],
    seo: buildSeo(
      'LL15 Motor Version Transfer Pump',
      'LL15电机版输送泵',
      'LL15 motor transfer pump',
      ['electric concrete transfer pump', 'concrete pump manufacturer China'],
      ['electric concrete pump for construction sites'],
      'Hebei Pinjin Machinery manufactures LL15 Motor Version Transfer Pumps in China for construction projects with stable electrical supply.',
      '河北品锦机械在中国生产LL15电机版输送泵，适用于具备稳定供电的建筑施工。',
    ),
    geo: buildGeo(
      'Concrete Pump Equipment',
      '混凝土泵设备',
      L('An electric-motor LL15 concrete transfer pump.', 'LL15电机版混凝土输送泵。'),
      L('Buyers comparing diesel vs electric transfer pumps.', '对比柴油/电机输送泵方案的采购方。'),
      L('Sites with 380 V power within listed conveying limits.', '具备380 V供电且在目录输送限值内的现场。'),
      L('Defined motor power, voltage and capacity from the catalogue.', '目录明确电机功率、电压与输送量。'),
    ),
  },
  {
    id: '04',
    name: L('ZS22-25 Concrete Pump', 'ZS22-25输送泵'),
    slug: 'zs22-25-concrete-pump',
    category: 'concrete-pump',
    ...imgPaths('zs22-25-concrete-pump'),
    shortDescription: L('Practical concrete pump balancing delivery capacity and compact machine weight.', '兼顾输送量与紧凑机重的实用型混凝土泵。'),
    productIntroduction: L('ZS22-25 Concrete Pump from Hebei Pinjin Machinery lists 18.5 kW motor power, 7–8 m³/h delivery capacity, 60 m horizontal and 25 m vertical conveying, with 600 kg machine weight for practical building pours.', '品锦ZS22-25混凝土泵目录参数：电机功率18.5 kW、输送量7–8 m³/h、水平60 m、垂直25 m、设备重量600 kg，适合实用型建筑浇筑。'),
    applicationScenarios: [
      L('Building construction', '建筑施工'),
      L('Concrete transportation', '混凝土输送'),
      L('Medium compact site pours', '中等紧凑工地浇筑')
    ],
    keyFeatures: [
      L('Delivery capacity 7–8 m³/h', '输送量7–8 m³/h'),
      L('60 m horizontal conveying', '水平输送60 m'),
      L('Compact 600 kg weight', '设备重量600 kg')
    ],
    specifications: [
      spec('Motor Power', '电机功率', '18.5 kW'),
      spec('Max Aggregate Diameter', '最大骨料粒径', '0.5–3 cm'),
      spec('Delivery Capacity', '输送量', '7–8 m³/h'),
      spec('Vertical Conveying Height', '垂直输送高度', '25 m'),
      spec('Machine Weight', '设备重量', '600 kg'),
      spec('Horizontal Conveying Distance', '水平输送距离', '60 m'),
    ],
    seo: buildSeo(
      'ZS22-25 Concrete Pump',
      'ZS22-25输送泵',
      'ZS22-25 concrete pump',
      ['concrete pump manufacturer', 'construction equipment manufacturer China'],
      ['how to choose a concrete pump for construction project'],
      'Hebei Pinjin Machinery manufactures ZS22-25 concrete pumps in China for construction projects and concrete transportation applications.',
      '河北品锦机械在中国生产ZS22-25混凝土泵，适用于建筑施工与混凝土输送。',
    ),
    geo: buildGeo(
      'Concrete Pump Equipment',
      '混凝土泵设备',
      L('A practical mid-compact concrete pump model.', '实用型中紧凑混凝土泵型号。'),
      L('Contractors needing slightly higher output than entry transfer pumps.', '需要比入门输送泵略高产量的承包商。'),
      L('Building projects within 60 m / 25 m listed conveying.', '水平60 m、垂直25 m目录范围内的建筑项目。'),
      L('Clear capacity and conveying specs for model comparison.', '参数清晰，便于型号对比选型。'),
    ),
  },
  {
    id: '05',
    name: L('LL28-32 Concrete Pump', 'LL28-32输送泵'),
    slug: 'll28-32-concrete-pump',
    category: 'concrete-pump',
    ...imgPaths('ll28-32-concrete-pump'),
    shortDescription: L('Mid-range concrete pump with extended horizontal conveying capability.', '具备更长水平输送能力的中型混凝土泵。'),
    productIntroduction: L('LL28-32 Concrete Pump extends horizontal conveying to 100 m and vertical height to 60 m in the catalogue, with 6–10 m³/h theoretical delivery capacity and diesel engine model 4100.', 'LL28-32混凝土泵目录水平输送达100 m、垂直60 m，理论输送量6–10 m³/h，柴油机型号4100。'),
    applicationScenarios: [
      L('Building construction', '建筑施工'),
      L('Infrastructure pipeline pours', '基建管路浇筑'),
      L('Concrete transportation', '混凝土输送')
    ],
    keyFeatures: [
      L('100 m horizontal conveying', '水平输送100 m'),
      L('60 m vertical height', '垂直高度60 m'),
      L('Theoretical capacity 6–10 m³/h', '理论输送量6–10 m³/h')
    ],
    specifications: [
      spec('Max Aggregate Diameter', '最大骨料粒径', '2 cm'),
      spec('Horizontal Conveying Distance', '水平输送距离', '100 m'),
      spec('Diesel Engine Model', '柴油机型号', '4100'),
      spec('Vertical Conveying Height', '垂直输送高度', '60 m'),
      spec('Theoretical Delivery Capacity', '理论输送量', '6–10 m³/h'),
      spec('Dimension', '设备尺寸', '310 × 90 × 126 cm'),
      spec('Delivery Pipe Diameter', '输送管直径', '80–100 mm'),
      spec('Machine Weight', '设备重量', '1400 kg'),
    ],
    seo: buildSeo(
      'LL28-32 Concrete Pump',
      'LL28-32输送泵',
      'LL28-32 concrete pump',
      ['diesel concrete pump manufacturer', 'concrete pump horizontal conveying distance'],
      ['diesel concrete pump for building construction'],
      'Hebei Pinjin Machinery manufactures LL28-32 concrete pumps in China for construction projects requiring longer horizontal concrete transportation.',
      '河北品锦机械在中国生产LL28-32混凝土泵，适用于需要更长水平混凝土输送的建筑项目。',
    ),
    geo: buildGeo(
      'Concrete Pump Equipment',
      '混凝土泵设备',
      L('A mid-range diesel concrete pump with extended horizontal reach.', '具备更长水平输送的中型柴油混凝土泵。'),
      L('Buyers whose pipeline length exceeds compact transfer pumps.', '管路长度超过紧凑输送泵能力的采购方。'),
      L('Projects within 100 m horizontal / 60 m vertical listed limits.', '水平100 m、垂直60 m目录限值内的项目。'),
      L('Extended conveying distance with published capacity.', '输送距离更长且参数公开。'),
    ),
  },
  {
    id: '06',
    name: L('Diesel Screw Mortar Spraying Machine', '柴油螺杆砂浆喷涂机'),
    slug: 'diesel-screw-mortar-spraying-machine',
    category: 'spraying-machine',
    ...imgPaths('diesel-screw-mortar-spraying-machine'),
    shortDescription: L('Diesel screw mortar spraying machine with catalogue-confirmed customization support.', '柴油螺杆砂浆喷涂机，目录明确支持设备定制。'),
    productIntroduction: L('Diesel Screw Mortar Spraying Machine is mortar spraying equipment from Hebei Pinjin Machinery for construction finishing. Catalogue specifications include 15–18 HP power output, spraying pressure 6 MPa, hopper volume 70 L, and explicit customization support. Conveying height/distance depend on materials as noted in the catalogue.', '柴油螺杆砂浆喷涂机用于施工饰面砂浆喷涂。目录参数：动力15–18 HP、喷涂压力6 MPa、料斗70 L，并明确支持定制；输送高度/距离按目录注明随物料适配。'),
    applicationScenarios: [
      L('Mortar spraying for wall finishing', '墙面抹灰砂浆喷涂'),
      L('Construction finishing work', '施工饰面作业'),
      L('Projects needing customization support', '需要定制支持的喷涂项目')
    ],
    keyFeatures: [
      L('Spraying pressure 6 MPa', '喷涂压力6 MPa'),
      L('Hopper volume 70 L', '料斗容积70 L'),
      L('Customization supported', '支持设备定制')
    ],
    specifications: [
      spec('Power Output', '动力输出', '15–18 HP'),
      spec('Conveying Height', '输送高度', '40 m (depends on materials)'),
      spec('Horizontal Conveying Distance', '水平输送距离', '60 m (depends on materials)'),
      spec('Max Conveying Particle', '输送颗粒粒径', '≤10 mm'),
      spec('Spraying Pressure', '喷涂压力', '6 MPa'),
      spec('Hopper Volume', '料斗容积', '70 L'),
      spec('Machine Weight', '设备重量', '180 kg'),
      spec('Overall Dimension', '整体尺寸', '1800 × 580 × 950 mm'),
      spec('Customization', '定制服务', 'Support customization'),
    ],
    seo: buildSeo(
      'Diesel Screw Mortar Spraying Machine',
      '柴油螺杆砂浆喷涂机',
      'mortar spraying machine manufacturer',
      ['diesel screw mortar spraying machine', 'construction equipment manufacturer China'],
      ['mortar spraying machine for construction finishing'],
      'Hebei Pinjin Machinery manufactures diesel screw mortar spraying machines in China for construction finishing and mortar spraying applications.',
      '河北品锦机械在中国生产柴油螺杆砂浆喷涂机，适用于施工饰面与砂浆喷涂。',
    ),
    geo: buildGeo(
      'Mortar Spraying Equipment',
      '砂浆喷涂设备',
      L('A diesel screw machine for mortar spraying.', '用于砂浆喷涂的柴油螺杆设备。'),
      L('Finishing teams that need mortar spraying with published pressure and hopper data.', '需要公开喷涂压力与料斗参数的饰面施工团队。'),
      L('Construction finishing sites within material-dependent conveying notes.', '在目录注明“根据物料适配”范围内的饰面现场。'),
      L('6 MPa spraying pressure and catalogue customization support.', '喷涂压力6 MPa，目录支持定制。'),
    ),
  },
  {
    id: '07',
    name: L('HBT30-37 Concrete Pump', 'HBT30-37混凝土泵'),
    slug: 'hbt30-37-concrete-pump',
    category: 'concrete-pump',
    ...imgPaths('hbt30-37-concrete-pump'),
    shortDescription: L('High-reach concrete pump for demanding horizontal and vertical conveying jobs.', '面向高要求水平与垂直输送工况的混凝土泵。'),
    productIntroduction: L('HBT30-37 Concrete Pump is designed for larger placement distance. Catalogue specifications list 15–20 m³/h theoretical delivery capacity, 250 m horizontal conveying, 120 m vertical height, and diesel engine model 4105.', 'HBT30-37面向更大输送距离。目录参数：理论输送量15–20 m³/h、水平250 m、垂直120 m、柴油机型号4105。'),
    applicationScenarios: [
      L('Building construction', '建筑施工'),
      L('Infrastructure projects', '基建工程'),
      L('High-rise concrete transportation', '高层混凝土输送')
    ],
    keyFeatures: [
      L('250 m horizontal conveying', '水平输送250 m'),
      L('120 m vertical height', '垂直高度120 m'),
      L('Theoretical capacity 15–20 m³/h', '理论输送量15–20 m³/h')
    ],
    specifications: [
      spec('Max Aggregate Diameter', '最大骨料粒径', '3 cm'),
      spec('Horizontal Conveying Distance', '水平输送距离', '250 m'),
      spec('Diesel Engine Model', '柴油机型号', '4105'),
      spec('Vertical Conveying Height', '垂直输送高度', '120 m'),
      spec('Theoretical Delivery Capacity', '理论输送量', '15–20 m³/h'),
      spec('Dimension', '设备尺寸', '360 × 145 × 146 cm'),
      spec('Delivery Pipe Diameter', '输送管直径', '80–100 mm'),
      spec('Machine Weight', '设备重量', '2400 kg'),
    ],
    seo: buildSeo(
      'HBT30-37 Concrete Pump',
      'HBT30-37混凝土泵',
      'HBT30-37 concrete pump',
      ['diesel concrete pump for building construction', 'concrete pump manufacturer China'],
      ['concrete pump for small and medium building projects'],
      'Hebei Pinjin Machinery manufactures HBT30-37 concrete pumps in China for building construction and infrastructure concrete transportation.',
      '河北品锦机械在中国生产HBT30-37混凝土泵，适用于建筑与基建混凝土输送。',
    ),
    geo: buildGeo(
      'Concrete Pump Equipment',
      '混凝土泵设备',
      L('A diesel concrete pump for longer conveying distance.', '面向更长输送距离的柴油混凝土泵。'),
      L('Contractors with medium-to-high rise or longer pipeline needs.', '有中高层或较长管路需求的承包商。'),
      L('Projects within 250 m / 120 m listed conveying limits.', '水平250 m、垂直120 m目录限值内的项目。'),
      L('Strong published horizontal and vertical conveying parameters.', '水平与垂直输送参数明确且较强。'),
    ),
  },
  {
    id: '08',
    name: L('HBT45-40 Concrete Pump', 'HBT45-40混凝土泵'),
    slug: 'hbt45-40-concrete-pump',
    category: 'concrete-pump',
    ...imgPaths('hbt45-40-concrete-pump'),
    shortDescription: L('Strong concrete pump model for longer conveying distance and higher vertical reach.', '适合更长输送距离与更高垂直高度的混凝土泵型号。'),
    productIntroduction: L('HBT45-40 Concrete Pump lists 18–20 m³/h theoretical delivery capacity, 300 m horizontal conveying, 150 m vertical height, diesel engine model 4108, and 2700 kg machine weight.', 'HBT45-40目录参数：理论输送量18–20 m³/h、水平300 m、垂直150 m、柴油机型号4108、设备重量2700 kg。'),
    applicationScenarios: [
      L('High-rise construction', '高层建筑施工'),
      L('Infrastructure projects', '基建工程'),
      L('Long-distance concrete transportation', '长距离混凝土输送')
    ],
    keyFeatures: [
      L('300 m horizontal conveying', '水平输送300 m'),
      L('150 m vertical height', '垂直高度150 m'),
      L('Pipe diameter 80–100–125 mm', '管径80–100–125 mm')
    ],
    specifications: [
      spec('Max Aggregate Diameter', '最大骨料粒径', '3 cm'),
      spec('Horizontal Conveying Distance', '水平输送距离', '300 m'),
      spec('Diesel Engine Model', '柴油机型号', '4108'),
      spec('Vertical Conveying Height', '垂直输送高度', '150 m'),
      spec('Theoretical Delivery Capacity', '理论输送量', '18–20 m³/h'),
      spec('Dimension', '设备尺寸', '420 × 145 × 150 cm'),
      spec('Delivery Pipe Diameter', '输送管直径', '80–100–125 mm'),
      spec('Machine Weight', '设备重量', '2700 kg'),
    ],
    seo: buildSeo(
      'HBT45-40 Concrete Pump',
      'HBT45-40混凝土泵',
      'HBT45-40 concrete pump',
      ['concrete pump supplier China', 'concrete pump manufacturer'],
      ['concrete pump price from China manufacturer'],
      'Hebei Pinjin Machinery manufactures HBT45-40 concrete pumps in China for construction projects and long-distance concrete transportation applications.',
      '河北品锦机械在中国生产HBT45-40混凝土泵，适用于建筑施工与长距离混凝土输送。',
    ),
    geo: buildGeo(
      'Concrete Pump Equipment',
      '混凝土泵设备',
      L('A higher-reach diesel concrete pump versus HBT30-37.', '相对HBT30-37输送能力更强的柴油混凝土泵。'),
      L('Buyers comparing China manufacturer models by conveying distance.', '按输送距离对比中国厂家型号的采购方。'),
      L('Projects needing up to 300 m horizontal / 150 m vertical listed reach.', '需要目录水平300 m / 垂直150 m输送能力的项目。'),
      L('Longer reach with published capacity and pipe options.', '输送距离更长，容量与管径参数公开。'),
    ),
  },
  {
    id: '09',
    name: L('Fully Automatic Plaster Spraying Machine', '全自动石膏喷涂机'),
    slug: 'automatic-plaster-spraying-machine',
    category: 'spraying-machine',
    ...imgPaths('automatic-plaster-spraying-machine'),
    shortDescription: L('Fully automatic plaster spraying machine for efficient interior finishing.', '全自动石膏喷涂机，提升室内饰面施工效率。'),
    productIntroduction: L('Fully Automatic Plaster Spraying Machine provides automatic plaster application with mixer capacity 115 L, power supply 380 V / 50 Hz, main motor 5 kW, horizontal 20 m and vertical 10 m conveying limits as listed.', '全自动石膏喷涂机用于石膏喷涂：搅拌容积115 L、供电380 V / 50 Hz、主电机5 kW、水平20 m、垂直10 m为目录限值。'),
    applicationScenarios: [
      L('Interior plaster finishing', '室内石膏饰面'),
      L('Plaster spraying rooms and corridors', '房间与走廊石膏喷涂'),
      L('Finishing sites with 380 V / 50 Hz power', '具备380 V / 50 Hz供电的饰面现场')
    ],
    keyFeatures: [
      L('Mixer capacity 115 L', '搅拌容积115 L'),
      L('Main motor 5 kW', '主电机5 kW'),
      L('Air compressor power 3 kW', '空压机功率3 kW')
    ],
    specifications: [
      spec('Mixer Capacity', '搅拌容积', '115 L'),
      spec('Power Supply', '供电参数', '380 V / 50 Hz'),
      spec('Main Motor Power', '主电机功率', '5 kW'),
      spec('Horizontal Conveying Distance', '水平输送距离', '20 m'),
      spec('Vertical Conveying Height', '垂直输送高度', '10 m'),
      spec('Max Particle Size', '最大颗粒粒径', '6 mm'),
      spec('Air Compressor Power', '空压机功率', '3 kW'),
    ],
    seo: buildSeo(
      'Fully Automatic Plaster Spraying Machine',
      '全自动石膏喷涂机',
      'plaster spraying machine',
      ['automatic plaster spraying machine', 'construction equipment manufacturer China'],
      ['plaster spraying machine for interior finishing'],
      'Hebei Pinjin Machinery manufactures fully automatic plaster spraying machines in China for interior finishing and plaster spraying applications.',
      '河北品锦机械在中国生产全自动石膏喷涂机，适用于室内饰面与石膏喷涂。',
    ),
    geo: buildGeo(
      'Plaster Spraying Equipment',
      '石膏喷涂设备',
      L('An automatic machine for plaster spraying finishing.', '用于石膏喷涂饰面的全自动设备。'),
      L('Interior finishing teams selecting plaster equipment separately from concrete pumps.', '将石膏设备与混凝土泵分开选型的室内饰面团队。'),
      L('Spaces within 20 m horizontal / 10 m vertical listed limits.', '水平20 m、垂直10 m目录限值内的空间。'),
      L('Defined mixer capacity and power supply parameters.', '搅拌容积与供电参数明确。'),
    ),
  },
  {
    id: '10',
    name: L('HBTT55-50 Concrete Pump', 'HBTT55-50混凝土泵'),
    slug: 'hbtt55-50-concrete-pump',
    category: 'concrete-pump',
    ...imgPaths('hbtt55-50-concrete-pump'),
    shortDescription: L('High-capacity concrete pump for large-scale delivery distance and output.', '面向大输送距离与高输出量的大产能混凝土泵。'),
    productIntroduction: L('HBTT55-50 Concrete Pump targets higher output jobs with 35–40 m³/h theoretical delivery capacity, 300–400 m horizontal conveying, 150–180 m vertical height, and diesel engine model 6105.', 'HBTT55-50面向更高产量：理论输送量35–40 m³/h、水平300–400 m、垂直150–180 m、柴油机型号6105。'),
    applicationScenarios: [
      L('Large-scale construction', '大型建筑施工'),
      L('Infrastructure projects', '基建工程'),
      L('High-volume concrete transportation', '大方量混凝土输送')
    ],
    keyFeatures: [
      L('Theoretical capacity 35–40 m³/h', '理论输送量35–40 m³/h'),
      L('300–400 m horizontal conveying', '水平输送300–400 m'),
      L('Diesel engine model 6105', '柴油机型号6105')
    ],
    specifications: [
      spec('Max Aggregate Diameter', '最大骨料粒径', '4 cm'),
      spec('Horizontal Conveying Distance', '水平输送距离', '300–400 m'),
      spec('Diesel Engine Model', '柴油机型号', '6105'),
      spec('Vertical Conveying Height', '垂直输送高度', '150–180 m'),
      spec('Theoretical Delivery Capacity', '理论输送量', '35–40 m³/h'),
      spec('Dimension', '设备尺寸', '420 × 145 × 150 cm'),
      spec('Delivery Pipe Diameter', '输送管直径', '100–125 mm'),
      spec('Machine Weight', '设备重量', '3000 kg'),
    ],
    seo: buildSeo(
      'HBTT55-50 Concrete Pump',
      'HBTT55-50混凝土泵',
      'HBTT55-50 concrete pump',
      ['high capacity concrete pump', 'diesel concrete pump manufacturer'],
      ['concrete pump for infrastructure projects'],
      'Hebei Pinjin Machinery manufactures HBTT55-50 concrete pumps in China for large-scale construction and long-distance concrete transportation.',
      '河北品锦机械在中国生产HBTT55-50混凝土泵，适用于大型建筑与长距离混凝土输送。',
    ),
    geo: buildGeo(
      'Concrete Pump Equipment',
      '混凝土泵设备',
      L('A high-capacity diesel concrete pump for large pours.', '面向大方量浇筑的高产能柴油混凝土泵。'),
      L('Buyers needing higher output than HBT45-class models.', '需要高于HBT45级别产量的采购方。'),
      L('Large projects within 300–400 m / 150–180 m listed limits.', '在水平300–400 m、垂直150–180 m目录范围内的大型项目。'),
      L('High listed capacity with long conveying distance.', '高输送量与长输送距离参数并存。'),
    ),
  },
  {
    id: '11',
    name: L('LL60-75 Concrete Pump', 'LL60-75混凝土泵'),
    slug: 'll60-75-concrete-pump',
    category: 'concrete-pump',
    ...imgPaths('ll60-75-concrete-pump'),
    shortDescription: L('Heavy-duty concrete pump with high theoretical delivery capacity.', '高理论输送量的重型混凝土泵。'),
    productIntroduction: L('LL60-75 Concrete Pump lists 40–45 m³/h theoretical delivery capacity, 200–550 m horizontal conveying, 150–180 m vertical height, diesel engine model 6110, and 3300 kg machine weight.', 'LL60-75目录：理论输送量40–45 m³/h、水平200–550 m、垂直150–180 m、柴油机型号6110、设备重量3300 kg。'),
    applicationScenarios: [
      L('Heavy construction pours', '重型建筑浇筑'),
      L('Infrastructure projects', '基建工程'),
      L('Long-distance concrete transportation', '长距离混凝土输送')
    ],
    keyFeatures: [
      L('Theoretical capacity 40–45 m³/h', '理论输送量40–45 m³/h'),
      L('Up to 550 m horizontal conveying', '水平输送可达550 m'),
      L('125 mm delivery pipe diameter', '输送管直径125 mm')
    ],
    specifications: [
      spec('Max Aggregate Diameter', '最大骨料粒径', '5 cm'),
      spec('Horizontal Conveying Distance', '水平输送距离', '200–550 m'),
      spec('Diesel Engine Model', '柴油机型号', '6110'),
      spec('Vertical Conveying Height', '垂直输送高度', '150–180 m'),
      spec('Theoretical Delivery Capacity', '理论输送量', '40–45 m³/h'),
      spec('Dimension', '设备尺寸', '430 × 160 × 170 cm'),
      spec('Delivery Pipe Diameter', '输送管直径', '125 mm'),
      spec('Machine Weight', '设备重量', '3300 kg'),
    ],
    seo: buildSeo(
      'LL60-75 Concrete Pump',
      'LL60-75混凝土泵',
      'LL60-75 concrete pump',
      ['heavy duty concrete pump', 'construction equipment manufacturer China'],
      ['high capacity concrete pump for construction projects'],
      'Hebei Pinjin Machinery manufactures LL60-75 concrete pumps in China for heavy construction and long-distance concrete transportation applications.',
      '河北品锦机械在中国生产LL60-75混凝土泵，适用于重型建筑与长距离混凝土输送。',
    ),
    geo: buildGeo(
      'Concrete Pump Equipment',
      '混凝土泵设备',
      L('A heavy-duty high-output concrete pump.', '重型高输出混凝土泵。'),
      L('Contractors selecting near top-range catalogue capacity.', '需要接近目录高端输送量的承包商。'),
      L('Projects matched to 200–550 m / 150–180 m listed ranges.', '匹配水平200–550 m、垂直150–180 m目录范围的项目。'),
      L('High theoretical capacity with long horizontal range.', '高理论输送量与长水平输送范围。'),
    ),
  },
  {
    id: '12',
    name: L('HBT80-18-140 Concrete Pump', 'HBT80-18-140混凝土泵'),
    slug: 'hbt80-18-140-concrete-pump',
    category: 'concrete-pump',
    ...imgPaths('hbt80-18-140-concrete-pump'),
    shortDescription: L('High pressure concrete pumping equipment designed for long-distance construction material transportation.', '面向长距离建筑物料输送的高压混凝土泵送设备。'),
    productIntroduction: L('HBT80-18-140 Concrete Pump is designed for large-scale concrete delivery. Catalogue parameters include max aggregate diameter 6 cm, horizontal conveying 600 m, vertical conveying 300 m, theoretical delivery capacity 40–75 m³/h, diesel engine 6-cylinder / 216 kW, delivery pipe diameter 125 mm, machine weight 5800 kg, and dimension 650 × 160 × 170 cm.', 'HBT80-18-140面向大规模混凝土输送。目录参数：最大骨料粒径6 cm、水平600 m、垂直300 m、理论输送量40–75 m³/h、柴油机六缸/216 kW、输送管直径125 mm、设备重量5800 kg、尺寸650 × 160 × 170 cm。'),
    applicationScenarios: [
      L('Residential and commercial building construction', '住宅与商业建筑施工'),
      L('Infrastructure projects', '基建工程'),
      L('Concrete transportation', '混凝土输送'),
      L('High-rise construction', '高层建筑施工')
    ],
    keyFeatures: [
      L('Long conveying distance up to 600 m horizontal', '水平输送可达600 m'),
      L('High-rise vertical conveying up to 300 m', '垂直输送可达300 m'),
      L('High theoretical capacity 40–75 m³/h', '理论输送量40–75 m³/h'),
      L('Suitable for large construction projects', '适合大型建筑项目选型对照')
    ],
    specifications: [
      spec('Max Aggregate Diameter', '最大骨料粒径', '6 cm'),
      spec('Horizontal Conveying Distance', '水平输送距离', '600 m'),
      spec('Diesel Engine Parameter', '柴油机参数', '6-cylinder / 216 kW'),
      spec('Vertical Conveying Height', '垂直输送高度', '300 m'),
      spec('Theoretical Delivery Capacity', '理论输送量', '40–75 m³/h'),
      spec('Dimension', '设备尺寸', '650 × 160 × 170 cm'),
      spec('Delivery Pipe Diameter', '输送管直径', '125 mm'),
      spec('Machine Weight', '设备重量', '5800 kg'),
    ],
    seo: buildSeo(
      'HBT80-18-140 Concrete Pump',
      'HBT80-18-140混凝土泵',
      'HBT80-18-140 concrete pump',
      ['concrete pump manufacturer China', 'diesel concrete pump manufacturer'],
      ['diesel concrete pump for construction projects'],
      'Hebei Pinjin Machinery manufactures HBT80-18-140 concrete pumps for construction projects and professional concrete transportation applications.',
      '河北品锦机械生产HBT80-18-140混凝土泵，适用于建筑项目与专业混凝土输送应用。',
    ),
    geo: buildGeo(
      'Concrete Pump Equipment',
      '混凝土泵设备',
      L('A flagship high-output concrete pump for long-distance and high-rise conveying.', '面向长距离与高扬程输送的旗舰高输出混凝土泵。'),
      L('Buyers planning large pours that need the highest listed conveying distance in the catalogue.', '需要目录中最高水平/垂直输送距离的大方量采购方。'),
      L('Large construction and infrastructure sites matched to 600 m / 300 m listed limits.', '匹配水平600 m、垂直300 m目录限值的大型建筑与基建现场。'),
      L('Highest listed horizontal and vertical conveying among catalogue concrete pumps.', '目录混凝土泵中列出的最高水平与垂直输送参数。'),
    ),
  },
  {
    id: '13',
    name: L('HBTB016-110ES Spiral Feeder', 'HBTB016-110ES螺旋给料机'),
    slug: 'hbtb016-110es-spiral-feeder',
    category: 'material-handling',
    ...imgPaths('hbtb016-110es-spiral-feeder'),
    shortDescription: L('Spiral feeder for material feeding with customizable rated head.', '螺旋给料机，额定扬程可定制。'),
    productIntroduction: L('HBTB016-110ES Spiral Feeder is material feeding equipment from Hebei Pinjin Machinery. Catalogue parameters: rated power 4 kW, rated flow 3–6 m³/h, rated head custom made, rated voltage 380 V, machine weight 90 kg.', 'HBTB016-110ES螺旋给料机用于物料给料。目录参数：额定功率4 kW、额定流量3–6 m³/h、额定扬程可定制、额定电压380 V、设备重量90 kg。'),
    applicationScenarios: [
      L('Material feeding to process equipment', '向工艺设备给料'),
      L('Construction material handling', '建筑物料输送辅助'),
      L('Sites requiring customizable head', '需要定制扬程的现场')
    ],
    keyFeatures: [
      L('Rated flow 3–6 m³/h', '额定流量3–6 m³/h'),
      L('Rated head custom made', '额定扬程可定制'),
      L('Lightweight 90 kg machine', '设备重量90 kg')
    ],
    specifications: [
      spec('Rated Power', '额定功率', '4 kW'),
      spec('Rated Flow', '额定流量', '3–6 m³/h'),
      spec('Rated Head', '额定扬程', 'Custom made'),
      spec('Rated Voltage', '额定电压', '380 V'),
      spec('Machine Weight', '设备重量', '90 kg'),
    ],
    seo: buildSeo(
      'HBTB016-110ES Spiral Feeder',
      'HBTB016-110ES螺旋给料机',
      'HBTB016-110ES spiral feeder manufacturer China',
      [
        'spiral feeder manufacturer China',
        'construction material feeding equipment',
        'spiral feeder 3-6 m3/h customizable head',
      ],
      [
        'buy HBTB016-110ES spiral feeder from Hebei Pinjin Machinery',
        'spiral feeder with customizable rated head 4 kW',
      ],
      'Hebei Pinjin Machinery manufactures HBTB016-110ES spiral feeders in China for construction material feeding, with 3–6 m³/h rated flow, 4 kW power and customizable rated head.',
      '河北品锦机械在中国生产HBTB016-110ES螺旋给料机，额定流量3–6 m³/h、功率4 kW、扬程可定制，适用于建筑物料给料。',
    ),
    geo: buildGeo(
      'Material Handling Equipment',
      '物料输送设备',
      L(
        'A spiral feeder for controlled material feeding, manufactured by Hebei Pinjin Machinery in China.',
        '河北品锦机械在中国制造的螺旋给料机，用于可控物料给料。',
      ),
      L(
        'Buyers needing feeding equipment with customizable head and 3–6 m³/h flow.',
        '需要可定制扬程、流量3–6 m³/h给料设备的采购方。',
      ),
      L(
        'Material handling setups with 380 V supply on construction sites.',
        '建筑现场具备380 V供电的物料输送场景。',
      ),
      L(
        'Published flow range, power, weight and customizable rated head from the manufacturer catalogue.',
        '厂家目录公开流量、功率、重量，扬程可定制。',
      ),
    ),
  },
  {
    id: '14',
    name: L('4102 Diesel Four-cylinder Inclined Pump', '4102柴油四缸斜泵'),
    slug: '4102-diesel-four-cylinder-inclined-pump',
    category: 'concrete-pump',
    ...imgPaths('4102-diesel-four-cylinder-inclined-pump'),
    shortDescription: L('Diesel four-cylinder inclined pump with S pipe valve working form.', '柴油四缸斜泵，工作形式为S管阀。'),
    productIntroduction: L('4102 Diesel Four-cylinder Inclined Pump lists maximum theoretical delivery capacity 15 m³/h, S pipe valve working form, max aggregate size 0.5–3 cm, hydraulic system push-pull/electric pull type, vertical theoretical conveying height 40 m, horizontal theoretical conveying distance 100 m, delivery pipe diameter 80–100 mm, diesel engine model 4102.', '4102柴油四缸斜泵目录：最大理论输送量15 m³/h、工作形式S管阀、最大骨料粒径0.5–3 cm、液压系统推拉式/电动式、理论垂直40 m、理论水平100 m、管径80–100 mm、柴油机型号4102。'),
    applicationScenarios: [
      L('Building construction', '建筑施工'),
      L('Concrete transportation', '混凝土输送'),
      L('Sites selecting S pipe valve pumps', '选用S管阀泵型的现场')
    ],
    keyFeatures: [
      L('Max theoretical capacity 15 m³/h', '最大理论输送量15 m³/h'),
      L('S pipe valve working form', 'S管阀工作形式'),
      L('Diesel engine model 4102', '柴油机型号4102')
    ],
    specifications: [
      spec('Maximum Theoretical Delivery Capacity', '最大理论输送量', '15 m³/h'),
      spec('Working Form', '工作形式', 'S pipe valve'),
      spec('Max Aggregate Size', '最大骨料粒径', '0.5–3 cm'),
      spec('Hydraulic System Form', '液压系统形式', 'Push-pull / electric pull type'),
      spec('Vertical Theoretical Conveying Height', '理论垂直输送高度', '40 m'),
      spec('Horizontal Theoretical Conveying Distance', '理论水平输送距离', '100 m'),
      spec('Delivery Pipe Diameter', '输送管直径', '80–100 mm'),
      spec('Diesel Engine Model', '柴油机型号', '4102'),
    ],
    seo: buildSeo(
      '4102 Diesel Four-cylinder Inclined Pump',
      '4102柴油四缸斜泵',
      '4102 diesel inclined pump manufacturer China',
      [
        'diesel concrete pump manufacturer China',
        'S pipe valve concrete pump',
        'inclined diesel pump Xingtai Hebei',
      ],
      [
        '4102 diesel four-cylinder inclined pump for construction concrete delivery',
        'buy 4102 diesel inclined pump from China manufacturer',
      ],
      'Hebei Pinjin Machinery manufactures 4102 diesel four-cylinder inclined pumps in Xingtai, Hebei, China for construction concrete transportation with S pipe valve and published 15 m³/h capacity.',
      '河北品锦机械在中国河北邢台生产4102柴油四缸斜泵，采用S管阀，目录最大理论输送量15 m³/h，适用于建筑混凝土输送。',
    ),
    geo: buildGeo(
      'Concrete Pump Equipment',
      '混凝土泵设备',
      L(
        'A diesel four-cylinder inclined concrete pump with S pipe valve, manufactured by Hebei Pinjin Machinery in China.',
        '由河北品锦机械在中国制造的柴油四缸斜泵，工作形式为S管阀。',
      ),
      L(
        'Contractors and equipment buyers specifying 4102 diesel engine and inclined pump layout for building sites.',
        '建筑工地指定4102柴油机与斜泵结构的承包商与设备采购方。',
      ),
      L(
        'Construction projects within the catalogue theoretical conveying range of 100 m horizontal / 40 m vertical.',
        '理论水平100 m、垂直40 m目录范围内的建筑施工项目。',
      ),
      L(
        'Clear catalogue working form, hydraulic options, pipe diameter and diesel engine model from the source manufacturer.',
        '源头厂家目录明确工作形式、液压选项、管径与柴油机型号。',
      ),
    ),
  },
  {
    id: '15',
    name: L('Type 311 Spraying Machine', '311型喷涂机'),
    slug: 'type-311-spraying-machine',
    category: 'spraying-machine',
    ...imgPaths('type-311-spraying-machine'),
    shortDescription: L('Type 311 spraying machine for construction spraying applications.', '311型喷涂机，用于施工喷涂作业。'),
    productIntroduction: L('Type 311 Spraying Machine catalogue parameters include working pressure 4 MPa (catalogue print showed Pa; aligned to MPa consistent with other Pinjin spraying models), rated voltage 220/380 V, work efficiency 15 m/h (unit as printed in source catalogue), spray flow 3–4 m³, conveying head 10 m, conveying distance 20 m, motor power 4 kW, machine weight 130 kg.', '311型喷涂机目录参数：工作压力4 MPa（原目录印为Pa，按同系列喷涂机统一为MPa）、额定电压220/380 V、工作效率15 m/h（单位按原目录标注）、喷涂流量3–4 m³、输送扬程10 m、输送距离20 m、电机功率4 kW、设备重量130 kg。'),
    applicationScenarios: [
      L('Construction spraying work', '施工喷涂作业'),
      L('Finishing applications within listed distance', '目录距离范围内的饰面喷涂'),
      L('Sites with 220/380 V supply', '具备220/380 V供电的现场')
    ],
    keyFeatures: [
      L('Spray flow 3–4 m³', '喷涂流量3–4 m³'),
      L('Conveying distance 20 m', '输送距离20 m'),
      L('Motor power 4 kW', '电机功率4 kW')
    ],
    specifications: [
      spec('Working Pressure', '工作压力', '4 MPa'),
      spec('Rated Voltage', '额定电压', '220/380 V'),
      spec('Work Efficiency', '工作效率', '15 m/h'),
      spec('Spray Flow', '喷涂流量', '3–4 m³'),
      spec('Conveying Head', '输送扬程', '10 m'),
      spec('Conveying Distance', '输送距离', '20 m'),
      spec('Motor Power', '电机功率', '4 kW'),
      spec('Machine Weight', '设备重量', '130 kg'),
      spec('Machine Length', '设备长度', '1600 mm'),
      spec('Machine Width', '设备宽度', '450 mm'),
      spec('Overall Height', '整体高度', '800 mm'),
    ],
    seo: buildSeo(
      'Type 311 Spraying Machine',
      '311型喷涂机',
      'Type 311 spraying machine manufacturer China',
      [
        'construction spraying machine China',
        'mortar plaster spraying equipment manufacturer',
        'compact spraying machine 4 kW',
      ],
      [
        'Type 311 spraying machine for construction finishing within 20 m',
        'buy Type 311 spraying machine from Hebei Pinjin Machinery',
      ],
      'Hebei Pinjin Machinery manufactures Type 311 spraying machines in China for construction spraying, with 3–4 m³ spray flow, 20 m conveying distance and 4 kW motor power.',
      '河北品锦机械在中国生产311型喷涂机，喷涂流量3–4 m³、输送距离20 m、电机功率4 kW，适用于施工喷涂。',
    ),
    geo: buildGeo(
      'Spraying Machine Equipment',
      '喷涂设备',
      L(
        'A Type 311 construction spraying machine made by Hebei Pinjin Machinery in China.',
        '河北品锦机械在中国制造的311型施工喷涂机。',
      ),
      L(
        'Buyers selecting compact spraying machines by catalogue spray flow, distance and power.',
        '按目录喷涂流量、距离与功率选择紧凑喷涂机的采购方。',
      ),
      L(
        'Finishing sites within 20 m conveying distance and 10 m head with 220/380 V supply.',
        '输送距离20 m、扬程10 m、具备220/380 V供电的饰面喷涂现场。',
      ),
      L(
        'Published spray flow, motor power, machine weight and overall dimensions from the manufacturer catalogue.',
        '厂家目录公开喷涂流量、电机功率、设备重量与外形尺寸。',
      ),
    ),
  },
  {
    id: '16',
    name: L('Type 511 Spraying Machine', '511型喷涂机'),
    slug: 'type-511-spraying-machine',
    category: 'spraying-machine',
    ...imgPaths('type-511-spraying-machine'),
    shortDescription: L('Type 511 spraying machine with higher listed work efficiency than Type 311.', '511型喷涂机，目录工作效率高于311型。'),
    productIntroduction: L('Type 511 Spraying Machine lists working pressure 6–7 MPa (catalogue print showed Pa; aligned to MPa consistent with other Pinjin spraying models), rated voltage 220/380 V, work efficiency 300 m²/h, spray flow 3–4 m³, conveying head 20 m, conveying distance 40 m, motor power 7.5 kW, machine weight 200 kg.', '511型喷涂机目录：工作压力6–7 MPa（原目录印为Pa，按同系列喷涂机统一为MPa）、额定电压220/380 V、工作效率300 m²/h、喷涂流量3–4 m³、输送扬程20 m、输送距离40 m、电机功率7.5 kW、设备重量200 kg。'),
    applicationScenarios: [
      L('Larger-area construction spraying', '较大面积施工喷涂'),
      L('Finishing work within 40 m distance', '输送距离40 m范围内的饰面作业'),
      L('Sites needing 7.5 kW motor class', '需要7.5 kW电机级别的现场')
    ],
    keyFeatures: [
      L('Work efficiency 300 m²/h', '工作效率300 m²/h'),
      L('Conveying distance 40 m', '输送距离40 m'),
      L('Motor power 7.5 kW', '电机功率7.5 kW')
    ],
    specifications: [
      spec('Working Pressure', '工作压力', '6–7 MPa'),
      spec('Rated Voltage', '额定电压', '220/380 V'),
      spec('Work Efficiency', '工作效率', '300 m²/h'),
      spec('Spray Flow', '喷涂流量', '3–4 m³'),
      spec('Conveying Head', '输送扬程', '20 m'),
      spec('Conveying Distance', '输送距离', '40 m'),
      spec('Motor Power', '电机功率', '7.5 kW'),
      spec('Machine Weight', '设备重量', '200 kg'),
      spec('Machine Length', '设备长度', '1800 mm'),
      spec('Machine Width', '设备宽度', '500 mm'),
      spec('Overall Height', '整体高度', '900 mm'),
    ],
    seo: buildSeo(
      'Type 511 Spraying Machine',
      '511型喷涂机',
      'Type 511 spraying machine manufacturer China',
      [
        'construction spraying machine China',
        'high efficiency spraying equipment 300 m2/h',
        'spraying machine 40 m conveying distance',
      ],
      [
        'Type 511 vs Type 311 spraying machine selection guide',
        'buy Type 511 spraying machine from China manufacturer',
      ],
      'Hebei Pinjin Machinery manufactures Type 511 spraying machines in China for larger-area construction finishing, with 300 m²/h work efficiency, 40 m conveying distance and 7.5 kW motor power.',
      '河北品锦机械在中国生产511型喷涂机，工作效率300 m²/h、输送距离40 m、电机功率7.5 kW，适用于较大面积施工饰面喷涂。',
    ),
    geo: buildGeo(
      'Spraying Machine Equipment',
      '喷涂设备',
      L(
        'A Type 511 spraying machine with higher listed area efficiency, manufactured in China by Hebei Pinjin Machinery.',
        '河北品锦机械在中国制造的511型喷涂机，目录面积效率更高。',
      ),
      L(
        'Buyers comparing Type 311 vs Type 511 by conveying distance, power and area efficiency.',
        '按输送距离、功率与面积效率对比311/511的采购方。',
      ),
      L(
        'Construction finishing sites within 40 m conveying distance and 20 m head.',
        '输送距离40 m、扬程20 m范围内的施工饰面现场。',
      ),
      L(
        'Higher listed work efficiency and conveying distance than Type 311, with published motor power and weight.',
        '目录工作效率与输送距离高于311型，并公开电机功率与重量。',
      ),
    ),
  },
  {
    id: '17',
    name: L('Double Cylinder Plunger Type Spraying Machine', '双缸柱塞式喷涂机'),
    slug: 'double-cylinder-plunger-spraying-machine',
    category: 'spraying-machine',
    ...imgPaths('double-cylinder-plunger-spraying-machine'),
    shortDescription: L('Double cylinder plunger spraying machine for longer conveying distance spraying.', '双缸柱塞式喷涂机，适合更长输送距离喷涂。'),
    productIntroduction: L('Double Cylinder Plunger Type Spraying Machine lists working pressure 8 MPa (catalogue print showed Pa; aligned to MPa consistent with other Pinjin spraying models), rated voltage 380 V, work efficiency 300 m²/h, spray flow 4 m³, conveying head 40 m, conveying distance 100 m, motor power 11+4.6 kW, machine weight 450 kg.', '双缸柱塞式喷涂机目录：工作压力8 MPa（原目录印为Pa，按同系列喷涂机统一为MPa）、额定电压380 V、工作效率300 m²/h、喷涂流量4 m³、输送扬程40 m、输送距离100 m、电机功率11+4.6 kW、设备重量450 kg。'),
    applicationScenarios: [
      L('Longer-distance spraying applications', '更长距离喷涂应用'),
      L('Construction finishing', '施工饰面'),
      L('Sites with 380 V supply', '具备380 V供电的现场')
    ],
    keyFeatures: [
      L('Conveying distance 100 m', '输送距离100 m'),
      L('Conveying head 40 m', '输送扬程40 m'),
      L('Motor power 11+4.6 kW', '电机功率11+4.6 kW')
    ],
    specifications: [
      spec('Working Pressure', '工作压力', '8 MPa'),
      spec('Rated Voltage', '额定电压', '380 V'),
      spec('Work Efficiency', '工作效率', '300 m²/h'),
      spec('Spray Flow', '喷涂流量', '4 m³'),
      spec('Conveying Head', '输送扬程', '40 m'),
      spec('Conveying Distance', '输送距离', '100 m'),
      spec('Motor Power', '电机功率', '11+4.6 kW'),
      spec('Machine Weight', '设备重量', '450 kg'),
      spec('Machine Length', '设备长度', '1800 mm'),
      spec('Machine Width', '设备宽度', '800 mm'),
      spec('Overall Height', '整体高度', '1100 mm'),
    ],
    seo: buildSeo(
      'Double Cylinder Plunger Type Spraying Machine',
      '双缸柱塞式喷涂机',
      'double cylinder plunger spraying machine manufacturer China',
      [
        'long distance spraying machine China',
        'plunger spraying machine 100 m',
        'construction spraying equipment manufacturer',
      ],
      [
        'double cylinder plunger spraying machine for 100 m conveying distance',
        'buy plunger spraying machine from Hebei Pinjin Machinery',
      ],
      'Hebei Pinjin Machinery manufactures double cylinder plunger type spraying machines in China for longer-distance construction spraying, with 100 m conveying distance, 40 m head and 11+4.6 kW motor power.',
      '河北品锦机械在中国生产双缸柱塞式喷涂机，输送距离100 m、扬程40 m、电机功率11+4.6 kW，适用于较长距离施工喷涂。',
    ),
    geo: buildGeo(
      'Spraying Machine Equipment',
      '喷涂设备',
      L(
        'A double-cylinder plunger spraying machine manufactured by Hebei Pinjin Machinery in China.',
        '河北品锦机械在中国制造的双缸柱塞式喷涂机。',
      ),
      L(
        'Buyers needing longer spraying conveying distance than Type 511 for construction finishing.',
        '施工饰面需要比511型更长喷涂输送距离的采购方。',
      ),
      L(
        'Sites within 100 m conveying distance / 40 m head with 380 V supply.',
        '输送距离100 m、扬程40 m、具备380 V供电的现场。',
      ),
      L(
        'Longer listed conveying distance with dual motor power rating and published spray flow.',
        '更长输送距离，双电机功率标注，喷涂流量公开。',
      ),
    ),
  },
  {
    id: '18',
    name: L('Concrete Spraying Machine', '混凝土喷浆机'),
    slug: 'concrete-spraying-machine',
    category: 'spraying-machine',
    ...imgPaths('concrete-spraying-machine'),
    shortDescription: L('Concrete spraying machine for wet-mix style spraying with published rebound and dust limits.', '混凝土喷浆机，目录含回弹率与机旁粉尘限值。'),
    productIntroduction: L('Concrete Spraying Machine from Hebei Pinjin Machinery lists maximum production capacity 10 m³/h, concrete outlet pressure 6.1 MPa, hopper volume 0.3 m³, S pipe valve distribution, motor drive 22 kW, rebound rate <10%, machine-side dust <6 mg/m³, and related hydraulic/accelerator parameters as published in the catalogue.', '混凝土喷浆机目录：最大生产能力10 m³/h、混凝土出口压力6.1 MPa、料斗0.3 m³、S管阀分配、电机驱动22 kW、回弹率<10%、机旁粉尘<6 mg/m³，以及液压与速凝剂相关参数。'),
    applicationScenarios: [
      L('Concrete spraying applications', '混凝土喷浆应用'),
      L('Tunnel and industrial spraying where specs match', '参数匹配的隧道与工业喷浆'),
      L('Projects needing published rebound/dust limits', '需要公开回弹/粉尘限值的项目')
    ],
    keyFeatures: [
      L('Max production capacity 10 m³/h', '最大生产能力10 m³/h'),
      L('Outlet pressure 6.1 MPa', '出口压力6.1 MPa'),
      L('Rebound rate <10%', '回弹率<10%')
    ],
    specifications: [
      spec('Overall Dimensions (L×W×H)', '外形尺寸（长×宽×高）', '3400 × 1470 × 1660 mm'),
      spec('Machine Weight', '设备重量', '2200 kg'),
      spec('Maximum Production Capacity', '最大生产能力', '10 m³/h'),
      spec('Pump Cylinder Diameter', '泵缸直径', '140 mm'),
      spec('Pumping Stroke', '泵送行程', '590 mm'),
      spec('Feed Pipe Diameter', '进料管直径', '125–57 mm reducer'),
      spec('Concrete Outlet Pressure', '混凝土出口压力', '6.1 MPa'),
      spec('Hopper Volume', '料斗容积', '0.3 m³'),
      spec('Loading Height', '上料高度', '1150 mm'),
      spec('Concrete Distribution Valve', '混凝土分配阀', 'S pipe valve'),
      spec('Lubrication System', '润滑系统', 'Automatic'),
      spec('Concrete Slump', '混凝土坍落度', '120–180 mm'),
      spec('Cooling Method', '冷却方式', 'Air cooling'),
      spec('Machine-side Dust', '机旁粉尘', '<6 mg/m³'),
      spec('Rebound Rate', '回弹率', '<10%'),
      spec('Maximum Aggregate Diameter', '最大骨料粒径', '15 mm'),
      spec('Water-cement Ratio', '水灰比', '0.45–0.6'),
      spec('Accelerator Pump Model', '速凝剂泵型号', 'JSZ330/0.9'),
      spec('Drive Mode', '驱动方式', 'Motor drive'),
      spec('Accelerator Discharge', '速凝剂排量', '330 L/H'),
      spec('Maximum Pressure of Accelerator', '速凝剂最大压力', '1 MPa'),
      spec('Motor Power', '电机功率', '22 kW'),
      spec('Oil Tank Capacity', '油箱容积', '140 L'),
      spec('Hydraulic Oil Contamination', '液压油污染度', 'NAS 1638 8–9'),
    ],
    seo: buildSeo(
      'Concrete Spraying Machine',
      '混凝土喷浆机',
      'concrete spraying machine',
      ['concrete spraying machine manufacturer China', 'shotcrete equipment supplier'],
      ['concrete spraying machine for tunnel and industrial projects'],
      'Hebei Pinjin Machinery manufactures concrete spraying machines in China with up to 10 m³/h capacity, 6.1 MPa outlet pressure, rebound rate under 10% and published dust limits for professional spraying jobs.',
      '河北品锦机械在中国生产混凝土喷浆机，最大产能10 m³/h、出口压力6.1 MPa、回弹率<10%，并公布机旁粉尘限值，适用于专业喷浆作业。',
    ),
    geo: buildGeo(
      'Concrete Spraying Equipment',
      '混凝土喷浆设备',
      L(
        'A concrete spraying machine with S pipe valve and motor drive, manufactured in China by Hebei Pinjin Machinery.',
        '河北品锦机械在中国制造的混凝土喷浆机，采用S管阀与电机驱动。',
      ),
      L(
        'Buyers needing spraying rather than long-distance pumping for tunnel or industrial jobs matching catalogue specs.',
        '需要喷浆而非长距离泵送、且参数匹配目录的隧道或工业喷浆采购方。',
      ),
      L(
        'Spraying jobs matched to 10 m³/h capacity and listed aggregate/slump ranges.',
        '匹配10 m³/h产能及目录骨料/坍落度范围的喷浆作业。',
      ),
      L(
        'Detailed catalogue specs including rebound rate and machine-side dust limit from the source manufacturer.',
        '源头厂家目录参数详细，含回弹率与机旁粉尘限值。',
      ),
    ),
  },
  {
    id: '19',
    name: L('Four-wheel Drive Forklift Loader - Clamp Type', '四驱叉车装载机-夹抱式'),
    slug: 'forklift-loader-clamp-type',
    category: 'material-handling',
    ...imgPaths('forklift-loader-clamp-type'),
    shortDescription: L('Four-wheel drive forklift loader with clamp-type attachment options.', '四驱叉车装载机，夹抱式配置。'),
    productIntroduction: L('Four-wheel Drive Forklift Loader (Clamp Type) lists unloading height 2100 mm, towing weight 3 tons, rated load about 490 kg (catalogue: 980 jin), vehicle weight 1.02 tons, transmission shaft drive, full hydraulic power steering, maximum lifting height 2800 mm, overall dimensions 3020 × 1305 × 1705 mm. Available colors: Flame Yellow, Military Green.', '四驱叉车装载机（夹抱式）目录：卸载高度2100 mm、牵引重量3吨、额定载重约490 kg（目录标注980斤）、整车重量1.02吨、传动轴传动、全液压助力转向、最大举升高度2800 mm、外形3020 × 1305 × 1705 mm。可选颜色：火焰黄、军绿色。'),
    applicationScenarios: [
      L('Material handling on construction sites', '建筑工地物料搬运'),
      L('Yard loading and unloading', '场内装卸'),
      L('Clamp-type handling tasks', '夹抱式搬运作业')
    ],
    keyFeatures: [
      L('Four-wheel drive', '四轮驱动'),
      L('Max lifting height 2800 mm', '最大举升高度2800 mm'),
      L('Full hydraulic power steering', '全液压助力转向')
    ],
    specifications: [
      spec('Unloading Height', '卸载高度', '2100 mm'),
      spec('Towing Weight', '牵引重量', '3 tons'),
      spec('Rated Load', '额定载重', 'About 490 kg (catalogue: 980 jin)'),
      spec('Vehicle Weight', '整车重量', '1.02 tons'),
      spec('Drive Mode', '驱动方式', 'Transmission shaft'),
      spec('Available Colors', '可选颜色', 'Flame Yellow / Military Green'),
      spec('Steering System', '转向系统', 'Full hydraulic power steering'),
      spec('Maximum Lifting Height', '最大举升高度', '2800 mm'),
      spec('Overall Dimensions', '外形尺寸', '3020 × 1305 × 1705 mm'),
    ],
    seo: buildSeo(
      'Four-wheel Drive Forklift Loader - Clamp Type',
      '四驱叉车装载机-夹抱式',
      '4WD forklift loader clamp type manufacturer China',
      [
        'four-wheel drive forklift loader China',
        'construction material handling equipment manufacturer',
        'clamp type forklift loader for construction sites',
      ],
      [
        'buy 4WD forklift loader clamp type from Hebei Pinjin Machinery',
        'four-wheel drive clamp loader 2800 mm lifting height',
      ],
      'Hebei Pinjin Machinery manufactures four-wheel drive forklift loaders (clamp type) in China for construction site material handling, with 2800 mm max lifting height and about 490 kg rated load.',
      '河北品锦机械在中国生产四驱叉车装载机（夹抱式），最大举升高度2800 mm、额定载重约490 kg，适用于建筑工地物料搬运。',
    ),
    geo: buildGeo(
      'Material Handling Equipment',
      '物料搬运设备',
      L(
        'A 4WD forklift loader in clamp-type configuration, manufactured by Hebei Pinjin Machinery in China.',
        '河北品锦机械在中国制造的夹抱式四驱叉车装载机。',
      ),
      L(
        'Construction yards needing compact loaders for clamp-type material handling.',
        '需要紧凑夹抱式装载设备进行物料搬运的工地与场区。',
      ),
      L(
        'Yards and construction areas matched to listed lift/unload heights and 4WD drive.',
        '匹配目录举升/卸载高度与四驱的场区与工地。',
      ),
      L(
        'Published lift heights, drive mode, rated load and color options from the manufacturer catalogue.',
        '厂家目录公开举升高度、驱动方式、额定载重与颜色选项。',
      ),
    ),
  },
  {
    id: '20',
    name: L('Four-wheel Drive Forklift Loader - Bucket Type', '四驱叉车装载机-铲斗式'),
    slug: 'forklift-loader-bucket-type',
    category: 'material-handling',
    ...imgPaths('forklift-loader-bucket-type'),
    shortDescription: L('Four-wheel drive forklift loader with bucket-type configuration.', '四驱叉车装载机，铲斗式配置。'),
    productIntroduction: L('Four-wheel Drive Forklift Loader (Bucket Type) shares catalogue mobility parameters with the clamp type: unloading height 2100 mm, towing weight 3 tons, rated load about 490 kg (catalogue: 980 jin), vehicle weight 1.02 tons, transmission shaft drive, full hydraulic power steering, maximum lifting height 2800 mm, overall dimensions 3020 × 1305 × 1705 mm. Available colors: Flame Yellow, Military Green.', '四驱叉车装载机（铲斗式）与夹抱式在目录中共享行走与举升参数：卸载高度2100 mm、牵引重量3吨、额定载重约490 kg（目录标注980斤）、整车1.02吨、传动轴传动、全液压助力转向、最大举升2800 mm、外形3020 × 1305 × 1705 mm。可选火焰黄、军绿色。'),
    applicationScenarios: [
      L('Bucket loading of bulk materials', '散料铲装'),
      L('Construction site material handling', '建筑工地物料搬运'),
      L('Yard operations', '场内作业')
    ],
    keyFeatures: [
      L('Bucket-type configuration', '铲斗式配置'),
      L('Four-wheel drive', '四轮驱动'),
      L('Max lifting height 2800 mm', '最大举升高度2800 mm')
    ],
    specifications: [
      spec('Unloading Height', '卸载高度', '2100 mm'),
      spec('Towing Weight', '牵引重量', '3 tons'),
      spec('Rated Load', '额定载重', 'About 490 kg (catalogue: 980 jin)'),
      spec('Vehicle Weight', '整车重量', '1.02 tons'),
      spec('Drive Mode', '驱动方式', 'Transmission shaft'),
      spec('Available Colors', '可选颜色', 'Flame Yellow / Military Green'),
      spec('Steering System', '转向系统', 'Full hydraulic power steering'),
      spec('Maximum Lifting Height', '最大举升高度', '2800 mm'),
      spec('Overall Dimensions', '外形尺寸', '3020 × 1305 × 1705 mm'),
    ],
    seo: buildSeo(
      'Four-wheel Drive Forklift Loader - Bucket Type',
      '四驱叉车装载机-铲斗式',
      '4WD forklift loader bucket type manufacturer China',
      [
        'bucket forklift loader China',
        'construction bulk material loader manufacturer',
        'four-wheel drive bucket loader for yards',
      ],
      [
        'buy 4WD forklift loader bucket type from Hebei Pinjin Machinery',
        'bucket type forklift loader for construction material handling',
      ],
      'Hebei Pinjin Machinery manufactures four-wheel drive forklift loaders (bucket type) in China for bulk material handling, with 2800 mm max lifting height and about 490 kg rated load.',
      '河北品锦机械在中国生产四驱叉车装载机（铲斗式），最大举升高度2800 mm、额定载重约490 kg，适用于工地散料铲装与搬运。',
    ),
    geo: buildGeo(
      'Material Handling Equipment',
      '物料搬运设备',
      L(
        'A 4WD forklift loader in bucket-type configuration, manufactured by Hebei Pinjin Machinery in China.',
        '河北品锦机械在中国制造的铲斗式四驱叉车装载机。',
      ),
      L(
        'Buyers choosing bucket vs clamp handling configurations for yard loading.',
        '场内装卸在铲斗/夹抱配置间选型的采购方。',
      ),
      L(
        'Sites needing bucket loading within listed lift/unload heights.',
        '需要在目录举升/卸载高度内进行铲装的现场。',
      ),
      L(
        'Bucket configuration with published 4WD drive, lift height and color options.',
        '铲斗式配置，四驱、举升高度与颜色选项公开。',
      ),
    ),
  },
  {
    id: '21',
    name: L('Fully Automatic CNC Steel Bar Bending Machine', '全自动数控钢筋弯箍机'),
    slug: 'cnc-steel-bar-bending-machine',
    category: 'rebar-equipment',
    ...imgPaths('cnc-steel-bar-bending-machine'),
    shortDescription: L('Fully automatic CNC steel bar bending machine for stirrup processing.', '全自动数控钢筋弯箍机，用于箍筋加工。'),
    productIntroduction: L('Fully Automatic CNC Steel Bar Bending Machine lists single strand processing 4–10 mm, double strand 4–8 mm, maximum diagonal size 1250 mm, minimum square stirrup side 80 mm, maximum bending angle 180°, one-way bending, max linear bending speed 110 m/min, max angular speed 1200°/sec, total power 19.2 kW, average power consumption 4 kW/h, equipment dimensions 3800 × 1100 × 1700 mm, weight 1200 kg.', '全自动数控钢筋弯箍机目录：单股加工直径4–10 mm、双股4–8 mm、最大对角线1250 mm、方形箍筋最小边长80 mm、最大弯曲角度180°、单向弯曲、最大弯曲线速度110 m/min、最大弯曲角速度1200°/sec、总功率19.2 kW、平均耗电4 kW/h、设备尺寸3800 × 1100 × 1700 mm、重量1200 kg。'),
    applicationScenarios: [
      L('Rebar stirrup processing', '钢筋箍筋加工'),
      L('Precast and construction rebar yards', '预制与建筑钢筋加工场'),
      L('Automatic bending workflows', '自动化弯曲加工流程')
    ],
    keyFeatures: [
      L('CNC automatic bending', '数控自动弯曲'),
      L('Single strand 4–10 mm range', '单股加工直径4–10 mm'),
      L('Total power 19.2 kW', '总功率19.2 kW')
    ],
    specifications: [
      spec('Single Strand Processing Range', '单股加工直径', '4–10 mm'),
      spec('Double Strand Processing Range', '双股加工直径', '4–8 mm'),
      spec('Maximum Diagonal Size', '最大对角线尺寸', '1250 mm'),
      spec('Minimum Side Length of Square Stirrup', '方形箍筋最小边长', '80 mm'),
      spec('Maximum Bending Angle', '最大弯曲角度', '180°'),
      spec('Bending Direction', '弯曲方向', 'One way'),
      spec('Maximum Linear Bending Speed', '最大弯曲线速度', '110 m/min'),
      spec('Maximum Angular Bending Speed', '最大弯曲角速度', '1200°/sec'),
      spec('Total Power', '总功率', '19.2 kW'),
      spec('Average Power Consumption', '平均耗电量', '4 kW/h'),
      spec('Equipment Dimensions', '设备尺寸', '3800 × 1100 × 1700 mm'),
      spec('Equipment Weight', '设备重量', '1200 kg'),
    ],
    seo: buildSeo(
      'Fully Automatic CNC Steel Bar Bending Machine',
      '全自动数控钢筋弯箍机',
      'CNC steel bar bending machine manufacturer China',
      [
        'automatic rebar stirrup bending machine China',
        'CNC stirrup machine manufacturer',
        'rebar processing equipment Xingtai Hebei',
      ],
      [
        'fully automatic CNC steel bar bending machine for stirrups 4-10 mm',
        'buy CNC rebar bending machine from Hebei Pinjin Machinery',
      ],
      'Hebei Pinjin Machinery manufactures fully automatic CNC steel bar bending machines in China for rebar stirrup processing, with single-strand 4–10 mm range and 19.2 kW total power.',
      '河北品锦机械在中国生产全自动数控钢筋弯箍机，单股加工直径4–10 mm、总功率19.2 kW，适用于建筑钢筋箍筋加工。',
    ),
    geo: buildGeo(
      'Rebar Processing Equipment',
      '钢筋加工设备',
      L(
        'A fully automatic CNC machine for steel bar / stirrup bending, manufactured by Hebei Pinjin Machinery in China.',
        '河北品锦机械在中国制造的全自动数控钢筋/箍筋弯曲设备。',
      ),
      L(
        'Rebar yards and contractors automating stirrup bending for precast or site fabrication.',
        '预制或现场加工中需要自动化箍筋弯曲的钢筋场与承包商。',
      ),
      L(
        'Workshops matched to listed processing diameter ranges and machine size 3800 × 1100 × 1700 mm.',
        '匹配目录加工直径范围与设备尺寸3800 × 1100 × 1700 mm的加工车间。',
      ),
      L(
        'Detailed CNC processing ranges, bending speeds and power consumption published by the manufacturer.',
        '厂家公开数控加工范围、弯曲速度与耗电参数。',
      ),
    ),
  },
  {
    id: '22',
    name: L('13 Spiral Feeder', '13型螺旋泵'),
    slug: '13-spiral-feeder',
    category: 'concrete-pump',
    ...imgPaths('13-spiral-feeder'),
    shortDescription: L(
      'Screw pump / spiral feeder for secondary structure pouring, 3–6 m³/h, 4 kW.',
      '用于二次结构浇筑的螺旋泵（螺旋给料），额定流量3–6 m³/h，功率4 kW。',
    ),
    productIntroduction: L(
      '13 Spiral Feeder is a screw pump (螺旋泵) from Hebei Pinjin Machinery for secondary structure pouring. Published parameters: specification 4 kW, rated flow 3–6 m³/h, rated head custom made, rated power 4 kW, voltage 380 V, weight 90 kg. Positioned as a secondary structure pouring specialist for compact mobile pouring tasks.',
      '13型螺旋泵（螺旋给料机）用于二次结构浇筑。公开参数：规格4 kW、额定流量3–6 m³/h、额定扬程可定制、额定功率4 kW、电压380 V、重量90 kg。定位为二次结构浇筑专家，适合紧凑移动浇筑工况。',
    ),
    applicationScenarios: [
      L('Secondary structure pouring', '二次结构浇筑'),
      L('Compact mobile screw-pump pouring on site', '现场紧凑移动式螺旋泵浇筑'),
      L('Small-volume concrete / mortar delivery where 3–6 m³/h matches demand', '流量需求匹配3–6 m³/h的小方量混凝土/砂浆输送'),
    ],
    keyFeatures: [
      L('Secondary structure pouring specialist', '二次结构浇筑专家'),
      L('Rated flow 3–6 m³/h', '额定流量3–6 m³/h'),
      L('Lightweight 90 kg mobile unit', '重量90 kg，移动便捷'),
    ],
    specifications: [
      spec('Specification', '规格', '4 kW'),
      spec('Rated Flow', '额定流量', '3–6 m³/h'),
      spec('Rated Head', '额定扬程', 'Custom made'),
      spec('Rated Power', '额定功率', '4 kW'),
      spec('Voltage', '电压', '380 V'),
      spec('Weight', '重量', '90 kg'),
    ],
    seo: buildSeo(
      '13 Spiral Feeder',
      '13型螺旋泵',
      '13 spiral feeder screw pump manufacturer China',
      [
        'secondary structure pouring pump China',
        'screw pump manufacturer China',
        'spiral feeder for secondary structure pouring',
      ],
      [
        '13 spiral feeder secondary structure pouring expert 3-6 m3/h',
        'buy 13 screw pump from Hebei Pinjin Machinery',
      ],
      'Hebei Pinjin Machinery manufactures the 13 Spiral Feeder (screw pump) in China as a secondary structure pouring specialist, with 3–6 m³/h rated flow, 4 kW power and 90 kg mobile weight.',
      '河北品锦机械在中国生产13型螺旋泵（螺旋给料机），定位二次结构浇筑专家，额定流量3–6 m³/h、功率4 kW、重量90 kg。',
    ),
    geo: buildGeo(
      'Concrete Pump / Screw Pump Equipment',
      '混凝土泵 / 螺旋泵设备',
      L(
        'A compact screw pump / spiral feeder for secondary structure pouring, manufactured by Hebei Pinjin Machinery in China.',
        '河北品锦机械在中国制造的紧凑型螺旋泵，用于二次结构浇筑。',
      ),
      L(
        'Contractors pouring secondary structures who need a light, mobile screw pump.',
        '需要轻便移动螺旋泵进行二次结构浇筑的承包商。',
      ),
      L(
        'Building sites with 380 V supply and pour rates within 3–6 m³/h.',
        '具备380 V供电、浇筑流量在3–6 m³/h范围内的建筑现场。',
      ),
      L(
        'Positioned as secondary structure pouring expert with published flow, power, weight and customizable rated head.',
        '定位二次结构浇筑专家，流量、功率、重量公开，扬程可定制。',
      ),
    ),
  }
];

export function resolveProductSlug(slug: string): string {
  return productSlugRedirects[slug] ?? slug;
}

export function getProductBySlug(slug: string): Product | undefined {
  const resolved = resolveProductSlug(slug);
  return products.find((p) => p.slug === resolved);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getCategoryByRouteSlug(routeSlug: string): ProductCategory | undefined {
  const entry = (Object.entries(categoryMeta) as Array<
    [ProductCategory, (typeof categoryMeta)[ProductCategory]]
  >).find(([, meta]) => meta.routeSlug === routeSlug);
  return entry?.[0];
}

export function getFeaturedProducts(slugs: readonly string[]): Product[] {
  return slugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => Boolean(p));
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}
