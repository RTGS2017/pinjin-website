import { pick, type Lang, type LocalizedText } from '@/i18n/types';
import { productDetailImages, productDisplayImages } from '@/data/imageInventory';

export type ProductCategory =
  | 'electric-concrete-pump'
  | 'diesel-concrete-pump'
  | 'mixer-pump';

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
  const gallery = productDisplayImages(slug);
  const image =
    gallery.find((path) => path.endsWith('/main.webp')) ??
    gallery[0] ??
    `/images/products/${slug}/main.webp`;
  return {
    image,
    gallery: productDetailImages(slug),
  };
}

export function productImageAlt(
  product: Product,
  src: string = product.image,
  lang: Lang = 'en',
): string {
  const name = pick(product.name, lang);
  const intro = pick(product.productIntroduction, lang);
  const location = pick(product.geo.manufacturedIn, lang);
  const category = pick(product.geo.productCategory, lang);
  const file = src.slice(src.lastIndexOf('/') + 1);

  if (file === 'catalog.webp') {
    return lang === 'zh'
      ? `${name}产品目录规格页，${category}，由河北品锦机械制造，${location}`
      : `${name} catalogue specification sheet, ${category}, manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China`;
  }
  if (file.startsWith('detail-')) {
    return lang === 'zh'
      ? `${name}工厂实拍，${category}，${location}`
      : `${name} factory product photo, ${category}, manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China`;
  }
  if (file.startsWith('working')) {
    return lang === 'zh'
      ? `${name}工地应用现场，${category}，河北品锦机械，${location}`
      : `${name} construction site application, ${category}, Hebei Pinjin Machinery, Xingtai, Hebei, China`;
  }
  return `${name}. ${intro}`;
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
      `${nameEn} Manufacturer China | Pinjin Machinery`,
      `${nameZh}厂家 | 品锦机械`,
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
        'Confirm the quotation by email through the Get Quote buttons. Include the model, quantity and destination.',
        '请通过「获取报价」按钮邮件确认报价，并注明型号、数量与目的地。',
      ),
    },
  };
}

/** 旧 slug → 新目录最近机型（兼容已收录链接） */
export const productSlugRedirects: Record<string, string> = {
  'diesel-4100': 'tractor-4100-concrete-pump',
  'diesel-4100-transfer-pump': 'tractor-4100-concrete-pump',
  'll15-diesel': 'diesel-30-concrete-pump',
  'll15-diesel-transfer-pump': 'diesel-30-concrete-pump',
  'll15-motor': 'electric-15-concrete-pump',
  'll15-electric-transfer-pump': 'electric-15-concrete-pump',
  'zs22-25': 'electric-20-concrete-pump',
  'zs22-25-concrete-pump': 'electric-20-concrete-pump',
  'll28-32': 'electric-30-concrete-pump',
  'll28-32-concrete-pump': 'electric-30-concrete-pump',
  'hbt30-37': 'electric-30-concrete-pump',
  'hbt30-37-concrete-pump': 'electric-30-concrete-pump',
  'hbt45-40': 'electric-40-concrete-pump',
  'hbt45-40-concrete-pump': 'electric-40-concrete-pump',
  'hbtt55-50': 'electric-50-concrete-pump',
  'hbtt55-50-concrete-pump': 'electric-50-concrete-pump',
  'll60-75': 'electric-low-pressure-60-concrete-pump',
  'll60-75-concrete-pump': 'electric-low-pressure-60-concrete-pump',
  'hbt80-18-140': 'electric-80-concrete-pump',
  'hbt80-18-140-concrete-pump': 'electric-80-concrete-pump',
  '4102-diesel-four-cylinder-inclined-pump': 'rural-diesel-concrete-pump',
  '13-spiral-feeder': 'electric-15-concrete-pump',
  'hbt60-13-146rs-concrete-pump': 'diesel-60-concrete-pump',
  'hbt60-13-146rs': 'diesel-60-concrete-pump',
  'hbtb016-110es-spiral-feeder': 'electric-15-concrete-pump',
};

export const categoryRouteSlugs: Record<ProductCategory, string> = {
  'electric-concrete-pump': 'electric-concrete-pumps',
  'diesel-concrete-pump': 'diesel-concrete-pumps',
  'mixer-pump': 'mixer-pumps',
};

export const categoryMeta: Record<
  ProductCategory,
  { routeSlug: string; label: LocalizedText; description: LocalizedText }
> = {
  'electric-concrete-pump': {
    routeSlug: 'electric-concrete-pumps',
    label: L('Electric Concrete Pumps', '电动混凝土泵'),
    description: L(
      'Electric trailer and compact concrete pumps with published motor power, output and conveying distance.',
      '电动拖式与紧凑型混凝土泵，目录公布电机功率、输送量与输送距离。',
    ),
  },
  'diesel-concrete-pump': {
    routeSlug: 'diesel-concrete-pumps',
    label: L('Diesel Concrete Pumps', '柴油混凝土泵'),
    description: L(
      'Diesel trailer pumps and rural tractor-driven pumps for sites without stable grid power.',
      '柴油拖式泵与农村拖拉机带动泵，适用于电网供电不便的工地。',
    ),
  },
  'mixer-pump': {
    routeSlug: 'mixer-pumps',
    label: L('Mixer Pumps', '搅拌泵'),
    description: L(
      'Integrated mixer pumps that mix and convey concrete in one machine. This is not a concrete mixing plant line.',
      '搅拌与泵送一体机。这不是混凝土搅拌站产品线。',
    ),
  },
};

export const products: Product[] = [
  {
    id: '01',
    name: L('Electric 20 Concrete Pump', '电动20型混凝土泵'),
    slug: 'electric-20-concrete-pump',
    category: 'electric-concrete-pump',
    ...imgPaths('electric-20-concrete-pump'),
    shortDescription: L('electric trailer concrete pump from the Xingtai factory catalogue — 22 kW motor, 8–10 m³/h output, 10 MPa, 120 m horizontal / 40 m vertical.', '邢台工厂目录中的电动拖式混凝土泵，电机22 kW、输送量8–10 m³/h、出口压力10 MPa、水平120 m / 垂直40 m。'),
    productIntroduction: L('Electric 20 Concrete Pump is a electric trailer concrete pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 22 kW motor, 8–10 m³/h output, 10 MPa, 120 m horizontal / 40 m vertical.', '电动20型混凝土泵由河北品锦机械在中国河北邢台制造，属于电动拖式混凝土泵。目录参数：电机22 kW、输送量8–10 m³/h、出口压力10 MPa、水平120 m / 垂直40 m。'),
    applicationScenarios: [
      L('Building and commercial concrete placement', '建筑与商业混凝土浇筑'),
      L('Pipeline conveying on construction sites', '施工现场管道输送'),
      L('Projects matched to listed capacity and distance', '对照目录输送量与距离的工程')
    ],
    keyFeatures: [
      L('Motor power 22 kW', '电机功率22 kW'),
      L('Output 8–10 m³/h', '输送量8–10 m³/h'),
      L('Weight 900 kg', '整机重量900 kg')
    ],
    specifications: [
      spec('Model', '型号', 'Electric 20'),
      spec('Motor Power', '电机功率', '22 kW'),
      spec('Output Capacity', '理论输送量', '8–10 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '10 MPa'),
      spec('Hopper Capacity', '料斗容积', '0.25 m³'),
      spec('Pumping Distance (H / V)', '输送距离（水平/垂直）', '120 m / 40 m'),
      spec('Delivery Pipe Diameter', '输送管内径', '80 mm'),
      spec('Max. Aggregate Size', '最大骨料粒径', '1–2 cm'),
      spec('Dimensions (L×W×H)', '外形尺寸', '2800 × 1300 × 1500 mm'),
      spec('Main Unit Weight', '整机重量', '900 kg'),
    ],
    seo: buildSeo(
      'Electric 20 Concrete Pump',
      '电动20型混凝土泵',
      'Electric 20 concrete pump manufacturer China',
      ['electric 20 concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy electric 20 concrete pump from Hebei Pinjin Machinery Xingtai', 'electric 20 concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the Electric 20 Concrete Pump in Xingtai, Hebei, China. Catalogue data: 22 kW motor, 8–10 m³/h output, 10 MPa, 120 m horizontal / 40 m vertical.',
      '河北品锦机械在中国河北邢台生产电动20型混凝土泵。目录数据：电机22 kW、输送量8–10 m³/h、出口压力10 MPa、水平120 m / 垂直40 m。',
    ),
    geo: buildGeo(
      'Electric Concrete Pump',
      '电动混凝土泵',
      L('A electric trailer concrete pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的电动拖式混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '02',
    name: L('Electric 30 Concrete Pump', '电动30型混凝土泵'),
    slug: 'electric-30-concrete-pump',
    category: 'electric-concrete-pump',
    ...imgPaths('electric-30-concrete-pump'),
    shortDescription: L('electric trailer concrete pump from the Xingtai factory catalogue — 30 kW motor, 12–15 m³/h, 20 MPa, fine-stone 60 m / 180 m.', '邢台工厂目录中的电动拖式混凝土泵，电机30 kW、输送量12–15 m³/h、出口压力20 MPa、细石水平60 m / 垂直180 m。'),
    productIntroduction: L('Electric 30 Concrete Pump is a electric trailer concrete pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 30 kW motor, 12–15 m³/h, 20 MPa, fine-stone 60 m / 180 m.', '电动30型混凝土泵由河北品锦机械在中国河北邢台制造，属于电动拖式混凝土泵。目录参数：电机30 kW、输送量12–15 m³/h、出口压力20 MPa、细石水平60 m / 垂直180 m。'),
    applicationScenarios: [
      L('Building and commercial concrete placement', '建筑与商业混凝土浇筑'),
      L('Pipeline conveying on construction sites', '施工现场管道输送'),
      L('Projects matched to listed capacity and distance', '对照目录输送量与距离的工程')
    ],
    keyFeatures: [
      L('Motor power 30 kW', '电机功率30 kW'),
      L('Output 12–15 m³/h', '输送量12–15 m³/h'),
      L('Outlet pressure 20 MPa', '出口压力20 MPa')
    ],
    specifications: [
      spec('Model', '型号', 'Electric 30'),
      spec('Motor Power', '电机功率', '30 kW'),
      spec('Output Capacity', '理论输送量', '12–15 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '20 MPa'),
      spec('Hopper Capacity', '料斗容积', '0.3 m³'),
      spec('Fine Stone Pumping (H / V)', '细石输送（水平/垂直）', '60 m / 180 m'),
      spec('Aggregate 13 Pumping (H / V)', '13 骨料输送（水平/垂直）', '20 m / 60 m'),
      spec('Max. Aggregate Size', '最大骨料粒径', '≤ 3 cm'),
      spec('Dimensions (L×W×H)', '外形尺寸', '3300 × 1500 × 1500 mm'),
      spec('Main Unit Weight', '整机重量', '1200 kg'),
    ],
    seo: buildSeo(
      'Electric 30 Concrete Pump',
      '电动30型混凝土泵',
      'Electric 30 concrete pump manufacturer China',
      ['electric 30 concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy electric 30 concrete pump from Hebei Pinjin Machinery Xingtai', 'electric 30 concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the Electric 30 Concrete Pump in Xingtai, Hebei, China. Catalogue data: 30 kW motor, 12–15 m³/h, 20 MPa, fine-stone 60 m / 180 m.',
      '河北品锦机械在中国河北邢台生产电动30型混凝土泵。目录数据：电机30 kW、输送量12–15 m³/h、出口压力20 MPa、细石水平60 m / 垂直180 m。',
    ),
    geo: buildGeo(
      'Electric Concrete Pump',
      '电动混凝土泵',
      L('A electric trailer concrete pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的电动拖式混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '03',
    name: L('Electric Low Pressure 40 Concrete Pump', '电动低压40型混凝土泵'),
    slug: 'electric-low-pressure-40-concrete-pump',
    category: 'electric-concrete-pump',
    ...imgPaths('electric-low-pressure-40-concrete-pump'),
    shortDescription: L('electric low-pressure trailer concrete pump from the Xingtai factory catalogue — 37 kW motor, 12–15 m³/h, 20 MPa, fine-stone 80 m / 240 m.', '邢台工厂目录中的电动低压拖式混凝土泵，电机37 kW、输送量12–15 m³/h、出口压力20 MPa、细石水平80 m / 垂直240 m。'),
    productIntroduction: L('Electric Low Pressure 40 Concrete Pump is a electric low-pressure trailer concrete pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 37 kW motor, 12–15 m³/h, 20 MPa, fine-stone 80 m / 240 m.', '电动低压40型混凝土泵由河北品锦机械在中国河北邢台制造，属于电动低压拖式混凝土泵。目录参数：电机37 kW、输送量12–15 m³/h、出口压力20 MPa、细石水平80 m / 垂直240 m。'),
    applicationScenarios: [
      L('Building and commercial concrete placement', '建筑与商业混凝土浇筑'),
      L('Pipeline conveying on construction sites', '施工现场管道输送'),
      L('Projects matched to listed capacity and distance', '对照目录输送量与距离的工程')
    ],
    keyFeatures: [
      L('Motor power 37 kW', '电机功率37 kW'),
      L('Fine-stone 80 m / 240 m', '细石 80 m / 240 m'),
      L('Kawasaki 112 hydraulic pump', '川崎112液压泵')
    ],
    specifications: [
      spec('Model', '型号', 'Electric Low Pressure 40'),
      spec('Motor Power', '电机功率', '37 kW'),
      spec('Output Capacity', '理论输送量', '12–15 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '20 MPa'),
      spec('Hopper Capacity', '料斗容积', '0.3 m³'),
      spec('Fine Stone Pumping (H / V)', '细石输送（水平/垂直）', '80 m / 240 m'),
      spec('Hydraulic Pump', '液压泵', 'Kawasaki 112'),
      spec('Dimensions (L×W×H)', '外形尺寸', '3300 × 1500 × 1500 mm'),
      spec('Main Unit Weight', '整机重量', '1200 kg'),
    ],
    seo: buildSeo(
      'Electric Low Pressure 40 Concrete Pump',
      '电动低压40型混凝土泵',
      'Electric low pressure 40 concrete pump China',
      ['electric low pressure 40 concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy electric low pressure 40 concrete pump from Hebei Pinjin Machinery Xingtai', 'electric low pressure 40 concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the Electric Low Pressure 40 Concrete Pump in Xingtai, Hebei, China. Catalogue data: 37 kW motor, 12–15 m³/h, 20 MPa, fine-stone 80 m / 240 m.',
      '河北品锦机械在中国河北邢台生产电动低压40型混凝土泵。目录数据：电机37 kW、输送量12–15 m³/h、出口压力20 MPa、细石水平80 m / 垂直240 m。',
    ),
    geo: buildGeo(
      'Electric Concrete Pump',
      '电动混凝土泵',
      L('A electric low-pressure trailer concrete pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的电动低压拖式混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '04',
    name: L('Electric 40 Concrete Pump', '电动40型混凝土泵'),
    slug: 'electric-40-concrete-pump',
    category: 'electric-concrete-pump',
    ...imgPaths('electric-40-concrete-pump'),
    shortDescription: L('electric trailer concrete pump from the Xingtai factory catalogue — 45 kW motor, 21 m³/h, 23 MPa, fine-stone 120 m / 360 m.', '邢台工厂目录中的电动拖式混凝土泵，电机45 kW、输送量21 m³/h、出口压力23 MPa、细石水平120 m / 垂直360 m。'),
    productIntroduction: L('Electric 40 Concrete Pump is a electric trailer concrete pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 45 kW motor, 21 m³/h, 23 MPa, fine-stone 120 m / 360 m.', '电动40型混凝土泵由河北品锦机械在中国河北邢台制造，属于电动拖式混凝土泵。目录参数：电机45 kW、输送量21 m³/h、出口压力23 MPa、细石水平120 m / 垂直360 m。'),
    applicationScenarios: [
      L('Building and commercial concrete placement', '建筑与商业混凝土浇筑'),
      L('Pipeline conveying on construction sites', '施工现场管道输送'),
      L('Projects matched to listed capacity and distance', '对照目录输送量与距离的工程')
    ],
    keyFeatures: [
      L('Motor power 45 kW', '电机功率45 kW'),
      L('Output 21 m³/h', '输送量21 m³/h'),
      L('Fine-stone 120 m / 360 m', '细石 120 m / 360 m')
    ],
    specifications: [
      spec('Model', '型号', 'Electric 40'),
      spec('Motor Power', '电机功率', '45 kW'),
      spec('Output Capacity', '理论输送量', '21 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '23 MPa'),
      spec('Hopper Capacity', '料斗容积', '0.4 m³'),
      spec('Fine Stone Pumping (H / V)', '细石输送（水平/垂直）', '120 m / 360 m'),
      spec('Aggregate 13 Pumping (H / V)', '13 骨料输送（水平/垂直）', '40 m / 120 m'),
      spec('Hydraulic Pump', '液压泵', 'Kawasaki 112'),
      spec('Dimensions (L×W×H)', '外形尺寸', '3900 × 1500 × 1600 mm'),
      spec('Main Unit Weight', '整机重量', '2300 kg'),
    ],
    seo: buildSeo(
      'Electric 40 Concrete Pump',
      '电动40型混凝土泵',
      'Electric 40 concrete pump manufacturer China',
      ['electric 40 concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy electric 40 concrete pump from Hebei Pinjin Machinery Xingtai', 'electric 40 concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the Electric 40 Concrete Pump in Xingtai, Hebei, China. Catalogue data: 45 kW motor, 21 m³/h, 23 MPa, fine-stone 120 m / 360 m.',
      '河北品锦机械在中国河北邢台生产电动40型混凝土泵。目录数据：电机45 kW、输送量21 m³/h、出口压力23 MPa、细石水平120 m / 垂直360 m。',
    ),
    geo: buildGeo(
      'Electric Concrete Pump',
      '电动混凝土泵',
      L('A electric trailer concrete pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的电动拖式混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '05',
    name: L('Electric 80 Concrete Pump', '电动80型混凝土泵'),
    slug: 'electric-80-concrete-pump',
    category: 'electric-concrete-pump',
    ...imgPaths('electric-80-concrete-pump'),
    shortDescription: L('high-capacity electric trailer concrete pump from the Xingtai factory catalogue — 110 kW, 60 m³/h, 40 MPa, 900 m horizontal / 300 m vertical (2 cm aggregate), model HBT80-1816-110.', '邢台工厂目录中的大排量电动拖式混凝土泵，110 kW、60 m³/h、40 MPa、水平900 m / 垂直300 m（2 cm骨料），型号 HBT80-1816-110。'),
    productIntroduction: L('Electric 80 Concrete Pump is a high-capacity electric trailer concrete pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 110 kW, 60 m³/h, 40 MPa, 900 m horizontal / 300 m vertical (2 cm aggregate), model HBT80-1816-110.', '电动80型混凝土泵由河北品锦机械在中国河北邢台制造，属于大排量电动拖式混凝土泵。目录参数：110 kW、60 m³/h、40 MPa、水平900 m / 垂直300 m（2 cm骨料），型号 HBT80-1816-110。'),
    applicationScenarios: [
      L('High-rise and long-distance pumping', '高层与长距离泵送'),
      L('Large commercial and infrastructure pours', '大型商业与基建浇筑'),
      L('Jobs needing 60 m³/h catalogue output', '需要目录60 m³/h输送量的工程')
    ],
    keyFeatures: [
      L('110 kW / 60 m³/h', '110 kW / 60 m³/h'),
      L('900 m / 300 m conveying', '水平900 m / 垂直300 m'),
      L('HBT80-1816-110', 'HBT80-1816-110')
    ],
    specifications: [
      spec('Model', '型号', 'Electric 80 / HBT80-1816-110'),
      spec('Motor Power', '电机功率', '110 kW'),
      spec('Output Capacity', '理论输送量', '60 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '40 MPa'),
      spec('Hopper Capacity', '料斗容积', '0.7 m³'),
      spec('Pumping Distance (H / V)', '输送距离（水平/垂直）', '900 m / 300 m'),
      spec('Max. Aggregate Size', '最大骨料粒径', '24 mm (≤ 2 cm)'),
      spec('Hydraulic Pump', '液压泵', 'Kawasaki 140 double pump'),
      spec('Dimensions (L×W×H)', '外形尺寸', '6600 × 1800 × 1800 mm'),
      spec('Main Unit Weight', '整机重量', '6000 kg'),
    ],
    seo: buildSeo(
      'Electric 80 Concrete Pump',
      '电动80型混凝土泵',
      'Electric 80 HBT80 concrete pump manufacturer China',
      ['electric 80 concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy electric 80 concrete pump from Hebei Pinjin Machinery Xingtai', 'electric 80 concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the Electric 80 Concrete Pump in Xingtai, Hebei, China. Catalogue data: 110 kW, 60 m³/h, 40 MPa, 900 m horizontal / 300 m vertical (2 cm aggregate), model HBT80-1816-110.',
      '河北品锦机械在中国河北邢台生产电动80型混凝土泵。目录数据：110 kW、60 m³/h、40 MPa、水平900 m / 垂直300 m（2 cm骨料），型号 HBT80-1816-110。',
    ),
    geo: buildGeo(
      'Electric Concrete Pump',
      '电动混凝土泵',
      L('A high-capacity electric trailer concrete pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的大排量电动拖式混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '06',
    name: L('Diesel 30 Concrete Pump', '柴油30型混凝土泵'),
    slug: 'diesel-30-concrete-pump',
    category: 'diesel-concrete-pump',
    ...imgPaths('diesel-30-concrete-pump'),
    shortDescription: L('diesel trailer concrete pump from the Xingtai factory catalogue — 4105 diesel 56 kW, 15 m³/h, 20 MPa, 60 m / 180 m (1 cm aggregate).', '邢台工厂目录中的柴油拖式混凝土泵，4105柴油机56 kW、输送量15 m³/h、压力20 MPa、水平60 m / 垂直180 m（1 cm骨料）。'),
    productIntroduction: L('Diesel 30 Concrete Pump is a diesel trailer concrete pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 4105 diesel 56 kW, 15 m³/h, 20 MPa, 60 m / 180 m (1 cm aggregate).', '柴油30型混凝土泵由河北品锦机械在中国河北邢台制造，属于柴油拖式混凝土泵。目录参数：4105柴油机56 kW、输送量15 m³/h、压力20 MPa、水平60 m / 垂直180 m（1 cm骨料）。'),
    applicationScenarios: [
      L('Sites without stable grid power', '电网供电不便的工地'),
      L('Rural and infrastructure concrete placement', '农村与基建混凝土浇筑'),
      L('Trailer-mounted diesel pumping jobs', '拖式柴油泵送作业')
    ],
    keyFeatures: [
      L('4105 / 56 kW diesel', '4105 / 56 kW柴油机'),
      L('Output 15 m³/h', '输送量15 m³/h'),
      L('60 m / 180 m', '水平60 m / 垂直180 m')
    ],
    specifications: [
      spec('Model', '型号', 'Diesel 30'),
      spec('Diesel Engine (Power)', '柴油机功率', '4105 / 56 kW'),
      spec('Theoretical Output', '理论输送量', '15 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '20 MPa'),
      spec('Hopper Capacity', '料斗容积', '0.3 m³'),
      spec('Pumping Distance (H / V)', '输送距离（水平/垂直）', '60 m / 180 m'),
      spec('Max. Aggregate Size', '最大骨料粒径', '3 cm and below'),
      spec('Dimensions (L×W×H)', '外形尺寸', '4000 × 1500 × 1800 mm'),
      spec('Main Unit Weight', '整机重量', '2000 kg'),
    ],
    seo: buildSeo(
      'Diesel 30 Concrete Pump',
      '柴油30型混凝土泵',
      'Diesel 30 concrete pump manufacturer China',
      ['diesel 30 concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy diesel 30 concrete pump from Hebei Pinjin Machinery Xingtai', 'diesel 30 concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the Diesel 30 Concrete Pump in Xingtai, Hebei, China. Catalogue data: 4105 diesel 56 kW, 15 m³/h, 20 MPa, 60 m / 180 m (1 cm aggregate).',
      '河北品锦机械在中国河北邢台生产柴油30型混凝土泵。目录数据：4105柴油机56 kW、输送量15 m³/h、压力20 MPa、水平60 m / 垂直180 m（1 cm骨料）。',
    ),
    geo: buildGeo(
      'Diesel Concrete Pump',
      '柴油混凝土泵',
      L('A diesel trailer concrete pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的柴油拖式混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '07',
    name: L('Diesel 40 Concrete Pump', '柴油40型混凝土泵'),
    slug: 'diesel-40-concrete-pump',
    category: 'diesel-concrete-pump',
    ...imgPaths('diesel-40-concrete-pump'),
    shortDescription: L('diesel trailer concrete pump from the Xingtai factory catalogue — 4108 diesel 66 kW, 26 m³/h, 25 MPa, 120 m / 360 m (1 cm aggregate).', '邢台工厂目录中的柴油拖式混凝土泵，4108柴油机66 kW、输送量26 m³/h、压力25 MPa、水平120 m / 垂直360 m（1 cm骨料）。'),
    productIntroduction: L('Diesel 40 Concrete Pump is a diesel trailer concrete pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 4108 diesel 66 kW, 26 m³/h, 25 MPa, 120 m / 360 m (1 cm aggregate).', '柴油40型混凝土泵由河北品锦机械在中国河北邢台制造，属于柴油拖式混凝土泵。目录参数：4108柴油机66 kW、输送量26 m³/h、压力25 MPa、水平120 m / 垂直360 m（1 cm骨料）。'),
    applicationScenarios: [
      L('Sites without stable grid power', '电网供电不便的工地'),
      L('Rural and infrastructure concrete placement', '农村与基建混凝土浇筑'),
      L('Trailer-mounted diesel pumping jobs', '拖式柴油泵送作业')
    ],
    keyFeatures: [
      L('4108 / 66 kW diesel', '4108 / 66 kW柴油机'),
      L('Output 26 m³/h', '输送量26 m³/h'),
      L('120 m / 360 m', '水平120 m / 垂直360 m')
    ],
    specifications: [
      spec('Model', '型号', 'Diesel 40'),
      spec('Diesel Engine (Power)', '柴油机功率', '4108 / 66 kW'),
      spec('Theoretical Output', '理论输送量', '26 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '25 MPa'),
      spec('Hopper Capacity', '料斗容积', '0.4 m³'),
      spec('Pumping Distance (H / V)', '输送距离（水平/垂直）', '120 m / 360 m'),
      spec('Hydraulic Pump', '液压泵', 'Kawasaki 112'),
      spec('Dimensions (L×W×H)', '外形尺寸', '4200 × 1600 × 1800 mm'),
      spec('Main Unit Weight', '整机重量', '2800 kg'),
    ],
    seo: buildSeo(
      'Diesel 40 Concrete Pump',
      '柴油40型混凝土泵',
      'Diesel 40 concrete pump manufacturer China',
      ['diesel 40 concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy diesel 40 concrete pump from Hebei Pinjin Machinery Xingtai', 'diesel 40 concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the Diesel 40 Concrete Pump in Xingtai, Hebei, China. Catalogue data: 4108 diesel 66 kW, 26 m³/h, 25 MPa, 120 m / 360 m (1 cm aggregate).',
      '河北品锦机械在中国河北邢台生产柴油40型混凝土泵。目录数据：4108柴油机66 kW、输送量26 m³/h、压力25 MPa、水平120 m / 垂直360 m（1 cm骨料）。',
    ),
    geo: buildGeo(
      'Diesel Concrete Pump',
      '柴油混凝土泵',
      L('A diesel trailer concrete pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的柴油拖式混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '08',
    name: L('Diesel 50 Concrete Pump', '柴油50型混凝土泵'),
    slug: 'diesel-50-concrete-pump',
    category: 'diesel-concrete-pump',
    ...imgPaths('diesel-50-concrete-pump'),
    shortDescription: L('diesel trailer concrete pump from the Xingtai factory catalogue — 6105 diesel 99 kW, 30 m³/h, 30 MPa, 150 m / 450 m (1 cm aggregate).', '邢台工厂目录中的柴油拖式混凝土泵，6105柴油机99 kW、输送量30 m³/h、压力30 MPa、水平150 m / 垂直450 m（1 cm骨料）。'),
    productIntroduction: L('Diesel 50 Concrete Pump is a diesel trailer concrete pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 6105 diesel 99 kW, 30 m³/h, 30 MPa, 150 m / 450 m (1 cm aggregate).', '柴油50型混凝土泵由河北品锦机械在中国河北邢台制造，属于柴油拖式混凝土泵。目录参数：6105柴油机99 kW、输送量30 m³/h、压力30 MPa、水平150 m / 垂直450 m（1 cm骨料）。'),
    applicationScenarios: [
      L('Sites without stable grid power', '电网供电不便的工地'),
      L('Rural and infrastructure concrete placement', '农村与基建混凝土浇筑'),
      L('Trailer-mounted diesel pumping jobs', '拖式柴油泵送作业')
    ],
    keyFeatures: [
      L('6105 / 99 kW diesel', '6105 / 99 kW柴油机'),
      L('Output 30 m³/h', '输送量30 m³/h'),
      L('150 m / 450 m', '水平150 m / 垂直450 m')
    ],
    specifications: [
      spec('Model', '型号', 'Diesel 50'),
      spec('Diesel Engine (Power)', '柴油机功率', '6105 / 99 kW'),
      spec('Theoretical Output', '理论输送量', '30 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '30 MPa'),
      spec('Hopper Capacity', '料斗容积', '0.4 m³'),
      spec('Pumping Distance (H / V)', '输送距离（水平/垂直）', '150 m / 450 m'),
      spec('Hydraulic Pump', '液压泵', 'Kawasaki 140'),
      spec('Dimensions (L×W×H)', '外形尺寸', '4600 × 1650 × 1850 mm'),
      spec('Main Unit Weight', '整机重量', '3300 kg'),
    ],
    seo: buildSeo(
      'Diesel 50 Concrete Pump',
      '柴油50型混凝土泵',
      'Diesel 50 concrete pump manufacturer China',
      ['diesel 50 concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy diesel 50 concrete pump from Hebei Pinjin Machinery Xingtai', 'diesel 50 concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the Diesel 50 Concrete Pump in Xingtai, Hebei, China. Catalogue data: 6105 diesel 99 kW, 30 m³/h, 30 MPa, 150 m / 450 m (1 cm aggregate).',
      '河北品锦机械在中国河北邢台生产柴油50型混凝土泵。目录数据：6105柴油机99 kW、输送量30 m³/h、压力30 MPa、水平150 m / 垂直450 m（1 cm骨料）。',
    ),
    geo: buildGeo(
      'Diesel Concrete Pump',
      '柴油混凝土泵',
      L('A diesel trailer concrete pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的柴油拖式混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '09',
    name: L('Diesel 60 Concrete Pump', '柴油60型混凝土泵'),
    slug: 'diesel-60-concrete-pump',
    category: 'diesel-concrete-pump',
    ...imgPaths('diesel-60-concrete-pump'),
    shortDescription: L('diesel trailer concrete pump from the Xingtai factory catalogue — 6105 diesel 144 kW, 35 m³/h, 30 MPa, 150 m / 350 m, model HBT60-13.', '邢台工厂目录中的柴油拖式混凝土泵，6105柴油机144 kW、输送量35 m³/h、压力30 MPa、水平150 m / 垂直350 m，型号 HBT60-13.132。'),
    productIntroduction: L('Diesel 60 Concrete Pump is a diesel trailer concrete pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 6105 diesel 144 kW, 35 m³/h, 30 MPa, 150 m / 350 m, model HBT60-13.132.', '柴油60型混凝土泵由河北品锦机械在中国河北邢台制造，属于柴油拖式混凝土泵。目录参数：6105柴油机144 kW、输送量35 m³/h、压力30 MPa、水平150 m / 垂直350 m，型号 HBT60-13.132。'),
    applicationScenarios: [
      L('Sites without stable grid power', '电网供电不便的工地'),
      L('Rural and infrastructure concrete placement', '农村与基建混凝土浇筑'),
      L('Trailer-mounted diesel pumping jobs', '拖式柴油泵送作业')
    ],
    keyFeatures: [
      L('144 kW diesel', '144 kW柴油机'),
      L('Output 35 m³/h', '输送量35 m³/h'),
      L('HBT60-13.132', 'HBT60-13.132')
    ],
    specifications: [
      spec('Model', '型号', 'Diesel 60 / HBT60-13.132'),
      spec('Diesel Engine (Power)', '柴油机功率', '6105 / 144 kW'),
      spec('Theoretical Output', '理论输送量', '35 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '30 MPa'),
      spec('Hopper Capacity', '料斗容积', '0.4 m³'),
      spec('Pumping Distance (H / V)', '输送距离（水平/垂直）', '150 m / 350 m'),
      spec('Hydraulic Pump', '液压泵', 'Kawasaki double pump 100'),
      spec('Dimensions (L×W×H)', '外形尺寸', '4800 × 1700 × 1700 mm'),
      spec('Main Unit Weight', '整机重量', '3500 kg'),
    ],
    seo: buildSeo(
      'Diesel 60 Concrete Pump',
      '柴油60型混凝土泵',
      'Diesel 60 HBT60 concrete pump manufacturer China',
      ['diesel 60 concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy diesel 60 concrete pump from Hebei Pinjin Machinery Xingtai', 'diesel 60 concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the Diesel 60 Concrete Pump in Xingtai, Hebei, China. Catalogue data: 6105 diesel 144 kW, 35 m³/h, 30 MPa, 150 m / 350 m, model HBT60-13.132.',
      '河北品锦机械在中国河北邢台生产柴油60型混凝土泵。目录数据：6105柴油机144 kW、输送量35 m³/h、压力30 MPa、水平150 m / 垂直350 m，型号 HBT60-13.132。',
    ),
    geo: buildGeo(
      'Diesel Concrete Pump',
      '柴油混凝土泵',
      L('A diesel trailer concrete pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的柴油拖式混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '10',
    name: L('Electric 10 Series Concrete Pump', '电动10系列混凝土泵'),
    slug: 'electric-10-series-concrete-pump',
    category: 'electric-concrete-pump',
    ...imgPaths('electric-10-series-concrete-pump'),
    shortDescription: L('compact electric concrete pump from the Xingtai factory catalogue — 15 kW motor, 21 m³/h theoretical output, 23 MPa, 25 m horizontal, 400 kg.', '邢台工厂目录中的紧凑型电动混凝土泵，电机15 kW、理论输送量21 m³/h、压力23 MPa、水平25 m、重量400 kg。'),
    productIntroduction: L('Electric 10 Series Concrete Pump is a compact electric concrete pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 15 kW motor, 21 m³/h theoretical output, 23 MPa, 25 m horizontal, 400 kg.', '电动10系列混凝土泵由河北品锦机械在中国河北邢台制造，属于紧凑型电动混凝土泵。目录参数：电机15 kW、理论输送量21 m³/h、压力23 MPa、水平25 m、重量400 kg。'),
    applicationScenarios: [
      L('Rural self-built houses', '农村自建房'),
      L('Small building sites and secondary structure', '小型工地与二次结构'),
      L('Short-to-medium pipeline pours', '中短距离管路浇筑')
    ],
    keyFeatures: [
      L('15 kW compact unit', '15 kW紧凑机型'),
      L('Weight 400 kg', '重量400 kg'),
      L('Output 21 m³/h', '输送量21 m³/h')
    ],
    specifications: [
      spec('Model', '型号', 'Electric 10 Series'),
      spec('Motor Power', '电机功率', '15 kW'),
      spec('Theoretical Output', '理论输送量', '21 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '23 MPa'),
      spec('Hopper Capacity', '料斗容积', '0.1 m³'),
      spec('Pumping Distance (Horizontal)', '水平输送距离', '25 m'),
      spec('Max. Aggregate Size', '最大骨料粒径', '2 cm and below'),
      spec('Dimensions (L×W×H)', '外形尺寸', '1800 × 800 × 1200 mm'),
      spec('Main Unit Weight', '整机重量', '400 kg'),
    ],
    seo: buildSeo(
      'Electric 10 Series Concrete Pump',
      '电动10系列混凝土泵',
      'Electric 10 series compact concrete pump China',
      ['electric 10 series concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy electric 10 series concrete pump from Hebei Pinjin Machinery Xingtai', 'electric 10 series concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the Electric 10 Series Concrete Pump in Xingtai, Hebei, China. Catalogue data: 15 kW motor, 21 m³/h theoretical output, 23 MPa, 25 m horizontal, 400 kg.',
      '河北品锦机械在中国河北邢台生产电动10系列混凝土泵。目录数据：电机15 kW、理论输送量21 m³/h、压力23 MPa、水平25 m、重量400 kg。',
    ),
    geo: buildGeo(
      'Electric Concrete Pump',
      '电动混凝土泵',
      L('A compact electric concrete pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的紧凑型电动混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '11',
    name: L('Integrated Mixer Pump', '搅拌泵一体机'),
    slug: 'integrated-mixer-pump',
    category: 'mixer-pump',
    ...imgPaths('integrated-mixer-pump'),
    shortDescription: L('electric integrated concrete mixer pump from the Xingtai factory catalogue — main motor 45 kW plus mixer 14 kW, 21 m³/h, 23 MPa, 100 m / 300 m.', '邢台工厂目录中的电动混凝土搅拌泵送一体机，主电机45 kW、搅拌电机14 kW、输送量21 m³/h、压力23 MPa、水平100 m / 垂直300 m。'),
    productIntroduction: L('Integrated Mixer Pump is a electric integrated concrete mixer pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: main motor 45 kW plus mixer 14 kW, 21 m³/h, 23 MPa, 100 m / 300 m.', '搅拌泵一体机由河北品锦机械在中国河北邢台制造，属于电动混凝土搅拌泵送一体机。目录参数：主电机45 kW、搅拌电机14 kW、输送量21 m³/h、压力23 MPa、水平100 m / 垂直300 m。'),
    applicationScenarios: [
      L('Sites that mix and pump in one unit', '需要搅拌与泵送一体的工地'),
      L('Rural and self-built house pouring', '农村与自建房浇筑'),
      L('Projects matching listed mixer and pump output', '对照目录搅拌与泵送产量的工程')
    ],
    keyFeatures: [
      L('Mix and pump in one unit', '搅拌与泵送一体'),
      L('45 kW + 14 kW', '45 kW + 14 kW'),
      L('100 m / 300 m', '水平100 m / 垂直300 m')
    ],
    specifications: [
      spec('Model', '型号', 'Integrated Mixer Pump'),
      spec('Main Motor / Mixer Motor', '主电机 / 搅拌电机', '45 kW / 14 kW'),
      spec('Theoretical Output', '理论输送量', '21 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '23 MPa'),
      spec('Hopper Capacity', '料斗容积', '0.4 m³'),
      spec('Pumping Distance (H / V)', '输送距离（水平/垂直）', '100 m / 300 m'),
      spec('Max. Aggregate Size', '最大骨料粒径', '4 cm and below'),
      spec('Delivery Pipe Diameter', '输送管内径', '100 / 125 mm'),
      spec('Dimensions (L×W×H)', '外形尺寸', '3900 × 1500 × 1600 mm'),
      spec('Main Unit Weight', '整机重量', '4500 kg'),
      spec('Series Note', '系列说明', '30 series with 400 mixer; 40/50 series with 500 mixer'),
    ],
    seo: buildSeo(
      'Integrated Mixer Pump',
      '搅拌泵一体机',
      'Integrated concrete mixer pump manufacturer China',
      ['integrated mixer pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy integrated mixer pump from Hebei Pinjin Machinery Xingtai', 'integrated mixer pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the Integrated Mixer Pump in Xingtai, Hebei, China. Catalogue data: main motor 45 kW plus mixer 14 kW, 21 m³/h, 23 MPa, 100 m / 300 m.',
      '河北品锦机械在中国河北邢台生产搅拌泵一体机。目录数据：主电机45 kW、搅拌电机14 kW、输送量21 m³/h、压力23 MPa、水平100 m / 垂直300 m。',
    ),
    geo: buildGeo(
      'Concrete Mixer Pump',
      '混凝土搅拌泵',
      L('A electric integrated concrete mixer pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的电动混凝土搅拌泵送一体机，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '12',
    name: L('HBT8018 Concrete Pump', 'HBT8018混凝土泵'),
    slug: 'hbt8018-concrete-pump',
    category: 'electric-concrete-pump',
    ...imgPaths('hbt8018-concrete-pump'),
    shortDescription: L('HBT-series trailer concrete pump from the Xingtai factory catalogue — 132 kW motor, 60 m³/h, 40 MPa, 150 m conveying, model HBT8018-132S.', '邢台工厂目录中的HBT系列拖式混凝土泵，电机132 kW、输送量60 m³/h、压力40 MPa、输送距离150 m，型号 HBT8018-132S。'),
    productIntroduction: L('HBT8018 Concrete Pump is a HBT-series trailer concrete pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 132 kW motor, 60 m³/h, 40 MPa, 150 m conveying, model HBT8018-132S.', 'HBT8018混凝土泵由河北品锦机械在中国河北邢台制造，属于HBT系列拖式混凝土泵。目录参数：电机132 kW、输送量60 m³/h、压力40 MPa、输送距离150 m，型号 HBT8018-132S。'),
    applicationScenarios: [
      L('High-output trailer pumping', '大排量拖式泵送'),
      L('Infrastructure and high-rise pours', '基建与高层浇筑'),
      L('Jobs listed at 60 m³/h', '目录60 m³/h工况')
    ],
    keyFeatures: [
      L('132 kW / 60 m³/h', '132 kW / 60 m³/h'),
      L('HBT8018-132S', 'HBT8018-132S'),
      L('40 MPa pumping pressure', '泵送压力40 MPa')
    ],
    specifications: [
      spec('Model', '型号', 'HBT8018 / HBT8018-132S'),
      spec('Motor Power', '电机功率', '132 kW'),
      spec('Theoretical Output', '理论输送量', '60 m³/h'),
      spec('Pumping Pressure', '泵送压力', '40 MPa'),
      spec('Conveying Distance', '输送距离', '150 m'),
      spec('Delivery Height', '输送高度', '450 m'),
      spec('Max. Aggregate Size', '最大骨料粒径', '4 cm and below'),
      spec('Delivery Pipe Diameter', '输送管内径', '100 / 125 mm'),
      spec('Dimensions (L×W×H)', '外形尺寸', '6700 × 1750 × 1800 mm'),
      spec('Total Weight', '整机重量', '6500 kg'),
    ],
    seo: buildSeo(
      'HBT8018 Concrete Pump',
      'HBT8018混凝土泵',
      'HBT8018 concrete pump manufacturer China',
      ['hbt8018 concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy hbt8018 concrete pump from Hebei Pinjin Machinery Xingtai', 'hbt8018 concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the HBT8018 Concrete Pump in Xingtai, Hebei, China. Catalogue data: 132 kW motor, 60 m³/h, 40 MPa, 150 m conveying, model HBT8018-132S.',
      '河北品锦机械在中国河北邢台生产HBT8018混凝土泵。目录数据：电机132 kW、输送量60 m³/h、压力40 MPa、输送距离150 m，型号 HBT8018-132S。',
    ),
    geo: buildGeo(
      'Trailer Concrete Pump',
      '拖式混凝土泵',
      L('A HBT-series trailer concrete pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的HBT系列拖式混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '13',
    name: L('HBT80-16 Concrete Pump', 'HBT80-16混凝土泵'),
    slug: 'hbt80-16-concrete-pump',
    category: 'electric-concrete-pump',
    ...imgPaths('hbt80-16-concrete-pump'),
    shortDescription: L('HBT-series trailer concrete pump from the Xingtai factory catalogue — 110 kW motor, 50 m³/h, 40 MPa, 120 m conveying, model HBT80-1816-110.', '邢台工厂目录中的HBT系列拖式混凝土泵，电机110 kW、输送量50 m³/h、压力40 MPa、输送距离120 m，型号 HBT80-1816-110。'),
    productIntroduction: L('HBT80-16 Concrete Pump is a HBT-series trailer concrete pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 110 kW motor, 50 m³/h, 40 MPa, 120 m conveying, model HBT80-1816-110.', 'HBT80-16混凝土泵由河北品锦机械在中国河北邢台制造，属于HBT系列拖式混凝土泵。目录参数：电机110 kW、输送量50 m³/h、压力40 MPa、输送距离120 m，型号 HBT80-1816-110。'),
    applicationScenarios: [
      L('Building and commercial concrete placement', '建筑与商业混凝土浇筑'),
      L('Pipeline conveying on construction sites', '施工现场管道输送'),
      L('Projects matched to listed capacity and distance', '对照目录输送量与距离的工程')
    ],
    keyFeatures: [
      L('110 kW / 50 m³/h', '110 kW / 50 m³/h'),
      L('HBT80-1816-110', 'HBT80-1816-110'),
      L('40 MPa', '40 MPa')
    ],
    specifications: [
      spec('Model', '型号', 'HBT80-16 / HBT80-1816-110'),
      spec('Motor Power', '电机功率', '110 kW'),
      spec('Theoretical Output', '理论输送量', '50 m³/h'),
      spec('Pumping Pressure', '泵送压力', '40 MPa'),
      spec('Conveying Distance (Horizontal)', '水平输送距离', '120 m'),
      spec('Delivery Height', '输送高度', '360 m'),
      spec('Max. Aggregate Size', '最大骨料粒径', '4 cm and below'),
      spec('Delivery Pipe Diameter', '输送管内径', '100 / 125 mm'),
      spec('Dimensions (L×W×H)', '外形尺寸', '6600 × 1750 × 1800 mm'),
      spec('Total Weight', '整机重量', '6500 kg'),
    ],
    seo: buildSeo(
      'HBT80-16 Concrete Pump',
      'HBT80-16混凝土泵',
      'HBT80-16 concrete pump manufacturer China',
      ['hbt80-16 concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy hbt80-16 concrete pump from Hebei Pinjin Machinery Xingtai', 'hbt80-16 concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the HBT80-16 Concrete Pump in Xingtai, Hebei, China. Catalogue data: 110 kW motor, 50 m³/h, 40 MPa, 120 m conveying, model HBT80-1816-110.',
      '河北品锦机械在中国河北邢台生产HBT80-16混凝土泵。目录数据：电机110 kW、输送量50 m³/h、压力40 MPa、输送距离120 m，型号 HBT80-1816-110。',
    ),
    geo: buildGeo(
      'Trailer Concrete Pump',
      '拖式混凝土泵',
      L('A HBT-series trailer concrete pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的HBT系列拖式混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '14',
    name: L('LZ-60 Diesel Concrete Pump', 'LZ-60柴油混凝土泵'),
    slug: 'lz-60-diesel-concrete-pump',
    category: 'diesel-concrete-pump',
    ...imgPaths('lz-60-diesel-concrete-pump'),
    shortDescription: L('diesel trailer concrete pump from the Xingtai factory catalogue — 6105 diesel 145 kW, 50 m³/h, 35 MPa, 100 m conveying / 300 m height.', '邢台工厂目录中的柴油拖式混凝土泵，6105柴油机145 kW、输送量50 m³/h、压力35 MPa、水平100 m / 高度300 m。'),
    productIntroduction: L('LZ-60 Diesel Concrete Pump is a diesel trailer concrete pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 6105 diesel 145 kW, 50 m³/h, 35 MPa, 100 m conveying / 300 m height.', 'LZ-60柴油混凝土泵由河北品锦机械在中国河北邢台制造，属于柴油拖式混凝土泵。目录参数：6105柴油机145 kW、输送量50 m³/h、压力35 MPa、水平100 m / 高度300 m。'),
    applicationScenarios: [
      L('Sites without stable grid power', '电网供电不便的工地'),
      L('Rural and infrastructure concrete placement', '农村与基建混凝土浇筑'),
      L('Trailer-mounted diesel pumping jobs', '拖式柴油泵送作业')
    ],
    keyFeatures: [
      L('145 kW diesel', '145 kW柴油机'),
      L('Output 50 m³/h', '输送量50 m³/h'),
      L('300 m delivery height', '输送高度300 m')
    ],
    specifications: [
      spec('Model', '型号', 'LZ-60 / HBT60-13.132'),
      spec('Engine Power', '发动机功率', '6105 / 145 kW'),
      spec('Theoretical Output', '理论输送量', '50 m³/h'),
      spec('Pumping Pressure', '泵送压力', '35 MPa'),
      spec('Conveying Distance', '输送距离', '100 m'),
      spec('Delivery Height', '输送高度', '300 m'),
      spec('Max. Aggregate Size', '最大骨料粒径', '4 cm and below'),
      spec('Delivery Pipe Diameter', '输送管内径', '100 / 125 mm'),
      spec('Dimensions (L×W×H)', '外形尺寸', '6.6 × 1.8 × 1.9 m'),
      spec('Total Weight', '整机重量', '5500 kg'),
    ],
    seo: buildSeo(
      'LZ-60 Diesel Concrete Pump',
      'LZ-60柴油混凝土泵',
      'LZ-60 diesel concrete pump manufacturer China',
      ['lz-60 diesel concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy lz-60 diesel concrete pump from Hebei Pinjin Machinery Xingtai', 'lz-60 diesel concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the LZ-60 Diesel Concrete Pump in Xingtai, Hebei, China. Catalogue data: 6105 diesel 145 kW, 50 m³/h, 35 MPa, 100 m conveying / 300 m height.',
      '河北品锦机械在中国河北邢台生产LZ-60柴油混凝土泵。目录数据：6105柴油机145 kW、输送量50 m³/h、压力35 MPa、水平100 m / 高度300 m。',
    ),
    geo: buildGeo(
      'Diesel Concrete Pump',
      '柴油混凝土泵',
      L('A diesel trailer concrete pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的柴油拖式混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '15',
    name: L('LZ-80 Diesel Concrete Pump', 'LZ-80柴油混凝土泵'),
    slug: 'lz-80-diesel-concrete-pump',
    category: 'diesel-concrete-pump',
    ...imgPaths('lz-80-diesel-concrete-pump'),
    shortDescription: L('high-capacity diesel trailer concrete pump from the Xingtai factory catalogue — Yuchai 256 kW, high pressure ≤ 65 m³/h / low pressure ≤ 95 m³/h, ≤ 35 / 22 MPa.', '邢台工厂目录中的大排量柴油拖式混凝土泵，玉柴256 kW、高压≤65 m³/h / 低压≤95 m³/h、压力高压≤35 MPa / 低压≤22 MPa。'),
    productIntroduction: L('LZ-80 Diesel Concrete Pump is a high-capacity diesel trailer concrete pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: Yuchai 256 kW, high pressure ≤ 65 m³/h / low pressure ≤ 95 m³/h, ≤ 35 / 22 MPa.', 'LZ-80柴油混凝土泵由河北品锦机械在中国河北邢台制造，属于大排量柴油拖式混凝土泵。目录参数：玉柴256 kW、高压≤65 m³/h / 低压≤95 m³/h、压力高压≤35 MPa / 低压≤22 MPa。'),
    applicationScenarios: [
      L('High-volume diesel pumping', '大排量柴油泵送'),
      L('Coarse aggregate pours up to 6 cm', '最大6 cm粗骨料浇筑'),
      L('Infrastructure jobs at listed pressure modes', '对照高压/低压模式的基建工程')
    ],
    keyFeatures: [
      L('Yuchai 256 kW', '玉柴256 kW'),
      L('Up to 95 m³/h low pressure', '低压可达95 m³/h'),
      L('6 cm aggregate', '骨料最大6 cm')
    ],
    specifications: [
      spec('Model', '型号', 'LZ-80'),
      spec('Engine (Diesel)', '柴油发动机', '256 kW (Yuchai)'),
      spec('Theoretical Output', '理论输送量', 'High pressure ≤ 65 m³/h; low pressure ≤ 95 m³/h'),
      spec('Pumping Pressure', '泵送压力', 'High pressure ≤ 35 MPa; low pressure ≤ 22 MPa'),
      spec('Hopper Capacity', '料斗容积', '0.6 m³'),
      spec('Conveying Distance', '输送距离', '120 m'),
      spec('Delivery Height', '输送高度', 'Consult factory standard'),
      spec('Max. Aggregate Size', '最大骨料粒径', '6 cm and below'),
      spec('Hydraulic Pump', '液压泵', 'Kawasaki double 140'),
      spec('Dimensions (L×W×H)', '外形尺寸', '6.6 × 1.8 × 1.9 m'),
      spec('Total Weight', '整机重量', '6800 kg'),
    ],
    seo: buildSeo(
      'LZ-80 Diesel Concrete Pump',
      'LZ-80柴油混凝土泵',
      'LZ-80 diesel concrete pump manufacturer China',
      ['lz-80 diesel concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy lz-80 diesel concrete pump from Hebei Pinjin Machinery Xingtai', 'lz-80 diesel concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the LZ-80 Diesel Concrete Pump in Xingtai, Hebei, China. Catalogue data: Yuchai 256 kW, high pressure ≤ 65 m³/h / low pressure ≤ 95 m³/h, ≤ 35 / 22 MPa.',
      '河北品锦机械在中国河北邢台生产LZ-80柴油混凝土泵。目录数据：玉柴256 kW、高压≤65 m³/h / 低压≤95 m³/h、压力高压≤35 MPa / 低压≤22 MPa。',
    ),
    geo: buildGeo(
      'Diesel Concrete Pump',
      '柴油混凝土泵',
      L('A high-capacity diesel trailer concrete pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的大排量柴油拖式混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '16',
    name: L('Diesel 120 Concrete Pump', '柴油120型混凝土泵'),
    slug: 'diesel-120-concrete-pump',
    category: 'diesel-concrete-pump',
    ...imgPaths('diesel-120-concrete-pump'),
    shortDescription: L('high-capacity diesel trailer concrete pump from the Xingtai factory catalogue — twin 145 kW diesels (290 kW total), 100 m³/h, 40 MPa, 150 m / 500 m.', '邢台工厂目录中的大排量柴油拖式混凝土泵，双机145 kW柴油机（合计290 kW）、输送量100 m³/h、压力40 MPa、水平150 m / 垂直500 m。'),
    productIntroduction: L('Diesel 120 Concrete Pump is a high-capacity diesel trailer concrete pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: twin 145 kW diesels (290 kW total), 100 m³/h, 40 MPa, 150 m / 500 m.', '柴油120型混凝土泵由河北品锦机械在中国河北邢台制造，属于大排量柴油拖式混凝土泵。目录参数：双机145 kW柴油机（合计290 kW）、输送量100 m³/h、压力40 MPa、水平150 m / 垂直500 m。'),
    applicationScenarios: [
      L('Very high output infrastructure pours', '超大排量基建浇筑'),
      L('Long vertical conveying within 500 m listing', '目录垂直500 m范围内的长距离输送'),
      L('Jobs needing twin-engine diesel power', '需要双柴油机动力的工程')
    ],
    keyFeatures: [
      L('Twin 145 kW / 290 kW', '双机145 kW / 合计290 kW'),
      L('Output 100 m³/h', '输送量100 m³/h'),
      L('150 m / 500 m', '水平150 m / 垂直500 m')
    ],
    specifications: [
      spec('Model', '型号', 'Diesel 120'),
      spec('Engine Power (Diesel)', '柴油机功率', '290 kW (two units 145 kW)'),
      spec('Theoretical Output', '理论输送量', '100 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '40 MPa'),
      spec('Hopper Capacity', '料斗容积', '0.6 m³'),
      spec('Conveying Distance (H / V)', '输送距离（水平/垂直）', '150 m / 500 m'),
      spec('Hydraulic Pump', '液压泵', 'Kawasaki 112 (two units)'),
      spec('Max. Aggregate Size', '最大骨料粒径', '6 cm and below'),
      spec('Dimensions (L×W×H)', '外形尺寸', '7000 × 2000 × 2300 mm'),
      spec('Main Unit Weight', '整机重量', '8000 kg'),
    ],
    seo: buildSeo(
      'Diesel 120 Concrete Pump',
      '柴油120型混凝土泵',
      'Diesel 120 concrete pump manufacturer China',
      ['diesel 120 concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy diesel 120 concrete pump from Hebei Pinjin Machinery Xingtai', 'diesel 120 concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the Diesel 120 Concrete Pump in Xingtai, Hebei, China. Catalogue data: twin 145 kW diesels (290 kW total), 100 m³/h, 40 MPa, 150 m / 500 m.',
      '河北品锦机械在中国河北邢台生产柴油120型混凝土泵。目录数据：双机145 kW柴油机（合计290 kW）、输送量100 m³/h、压力40 MPa、水平150 m / 垂直500 m。',
    ),
    geo: buildGeo(
      'Diesel Concrete Pump',
      '柴油混凝土泵',
      L('A high-capacity diesel trailer concrete pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的大排量柴油拖式混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '17',
    name: L('Diesel Mixer Integrated Pump', '柴油搅拌泵一体机'),
    slug: 'diesel-mixer-integrated-pump',
    category: 'mixer-pump',
    ...imgPaths('diesel-mixer-integrated-pump'),
    shortDescription: L('diesel integrated concrete mixer pump from the Xingtai factory catalogue — 4108 diesel 66–75 kW, 25 m³/h, 23 MPa, stone 100 m / 300 m.', '邢台工厂目录中的柴油混凝土搅拌泵送一体机，4108柴油机66–75 kW、输送量25 m³/h、压力23 MPa、细石高度/水平 100 / 300。'),
    productIntroduction: L('Diesel Mixer Integrated Pump is a diesel integrated concrete mixer pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 4108 diesel 66–75 kW, 25 m³/h, 23 MPa, stone 100 m / 300 m.', '柴油搅拌泵一体机由河北品锦机械在中国河北邢台制造，属于柴油混凝土搅拌泵送一体机。目录参数：4108柴油机66–75 kW、输送量25 m³/h、压力23 MPa、细石高度/水平 100 / 300。'),
    applicationScenarios: [
      L('Sites that mix and pump in one unit', '需要搅拌与泵送一体的工地'),
      L('Rural and self-built house pouring', '农村与自建房浇筑'),
      L('Projects matching listed mixer and pump output', '对照目录搅拌与泵送产量的工程')
    ],
    keyFeatures: [
      L('Diesel mix-and-pump', '柴油搅拌泵送一体'),
      L('25 m³/h', '25 m³/h'),
      L('66–75 kW', '66–75 kW')
    ],
    specifications: [
      spec('Model', '型号', 'Diesel Mixer Integrated'),
      spec('Diesel Engine', '柴油机', '4108 / 66–75 kW'),
      spec('Theoretical Output', '理论输送量', '25 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '23 MPa'),
      spec('Hopper Capacity', '料斗容积', '0.4 m³'),
      spec('Stone Capacity (H / V, ≤ 1 inch)', '细石输送（水平/垂直）', '100 / 300 m'),
      spec('13 mm Stone (H / V)', '13 mm石子（水平/垂直）', '60 / 180 m'),
      spec('24 mm Stone (H / V)', '24 mm石子（水平/垂直）', '40 / 120 m'),
      spec('Dimensions (L×W×H)', '外形尺寸', '4100 × 2200 × 3000 mm'),
      spec('Main Unit Weight', '整机重量', '4200 kg'),
      spec('Series Note', '系列说明', '30 model with 400 mixer; 40/50 model with 500 mixer'),
    ],
    seo: buildSeo(
      'Diesel Mixer Integrated Pump',
      '柴油搅拌泵一体机',
      'Diesel mixer integrated concrete pump China',
      ['diesel mixer integrated pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy diesel mixer integrated pump from Hebei Pinjin Machinery Xingtai', 'diesel mixer integrated pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the Diesel Mixer Integrated Pump in Xingtai, Hebei, China. Catalogue data: 4108 diesel 66–75 kW, 25 m³/h, 23 MPa, stone 100 m / 300 m.',
      '河北品锦机械在中国河北邢台生产柴油搅拌泵一体机。目录数据：4108柴油机66–75 kW、输送量25 m³/h、压力23 MPa、细石高度/水平 100 / 300。',
    ),
    geo: buildGeo(
      'Concrete Mixer Pump',
      '混凝土搅拌泵',
      L('A diesel integrated concrete mixer pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的柴油混凝土搅拌泵送一体机，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '18',
    name: L('Tractor-Driven 4100 Concrete Pump', '拖拉机带动4100混凝土泵'),
    slug: 'tractor-4100-concrete-pump',
    category: 'diesel-concrete-pump',
    ...imgPaths('tractor-4100-concrete-pump'),
    shortDescription: L('tractor-driven concrete pump for rural houses from the Xingtai factory catalogue — 40 kW, 6–12 m³/h, 15 MPa, 40–100 m horizontal / 15–45 m vertical.', '邢台工厂目录中的农村自建房拖拉机带动混凝土泵，40 kW、输送量6–12 m³/h、压力15 MPa、水平40–100 m / 垂直15–45 m。'),
    productIntroduction: L('Tractor-Driven 4100 Concrete Pump is a tractor-driven concrete pump for rural houses manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 40 kW, 6–12 m³/h, 15 MPa, 40–100 m horizontal / 15–45 m vertical.', '拖拉机带动4100混凝土泵由河北品锦机械在中国河北邢台制造，属于农村自建房拖拉机带动混凝土泵。目录参数：40 kW、输送量6–12 m³/h、压力15 MPa、水平40–100 m / 垂直15–45 m。'),
    applicationScenarios: [
      L('Rural self-built houses', '农村自建房'),
      L('Small building sites and secondary structure', '小型工地与二次结构'),
      L('Short-to-medium pipeline pours', '中短距离管路浇筑')
    ],
    keyFeatures: [
      L('Tractor-driven 4100', '拖拉机带动4100'),
      L('6–12 m³/h', '6–12 m³/h'),
      L('Rural house pumping', '农村自建房泵送')
    ],
    specifications: [
      spec('Model', '型号', 'Tractor-Driven 4100'),
      spec('Motor Power', '功率', '40 kW'),
      spec('Theoretical Output', '理论输送量', '6–12 m³/h'),
      spec('Pumping Pressure', '泵送压力', '15 MPa'),
      spec('Conveying Distance (H / V)', '输送距离（水平/垂直）', '40–100 m / 15–45 m'),
      spec('Max. Aggregate Size', '最大骨料粒径', '1–3 cm'),
      spec('Hopper Capacity', '料斗容积', '0.25 m³'),
      spec('Concrete Slump', '坍落度', '180–220 mm'),
      spec('Dimensions (L×W×H)', '外形尺寸', '2900 × 1000 × 1350 mm'),
      spec('Total Weight', '整机重量', '1300 kg'),
    ],
    seo: buildSeo(
      'Tractor-Driven 4100 Concrete Pump',
      '拖拉机带动4100混凝土泵',
      'Tractor driven 4100 rural concrete pump China',
      ['tractor-driven 4100 concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy tractor-driven 4100 concrete pump from Hebei Pinjin Machinery Xingtai', 'tractor-driven 4100 concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the Tractor-Driven 4100 Concrete Pump in Xingtai, Hebei, China. Catalogue data: 40 kW, 6–12 m³/h, 15 MPa, 40–100 m horizontal / 15–45 m vertical.',
      '河北品锦机械在中国河北邢台生产拖拉机带动4100混凝土泵。目录数据：40 kW、输送量6–12 m³/h、压力15 MPa、水平40–100 m / 垂直15–45 m。',
    ),
    geo: buildGeo(
      'Diesel Concrete Pump',
      '柴油混凝土泵',
      L('A tractor-driven concrete pump for rural houses listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的农村自建房拖拉机带动混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '19',
    name: L('Electric 15 Concrete Pump', '电动15型混凝土泵'),
    slug: 'electric-15-concrete-pump',
    category: 'electric-concrete-pump',
    ...imgPaths('electric-15-concrete-pump'),
    shortDescription: L('compact electric concrete pump from the Xingtai factory catalogue — 15 kW, 8–10 m³/h, 15–20 m vertical / 60–80 m horizontal, 450 kg.', '邢台工厂目录中的紧凑型电动混凝土泵，15 kW、输送量8–10 m³/h、垂直15–20 m / 水平60–80 m、重量450 kg。'),
    productIntroduction: L('Electric 15 Concrete Pump is a compact electric concrete pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 15 kW, 8–10 m³/h, 15–20 m vertical / 60–80 m horizontal, 450 kg.', '电动15型混凝土泵由河北品锦机械在中国河北邢台制造，属于紧凑型电动混凝土泵。目录参数：15 kW、输送量8–10 m³/h、垂直15–20 m / 水平60–80 m、重量450 kg。'),
    applicationScenarios: [
      L('Rural self-built houses', '农村自建房'),
      L('Small building sites and secondary structure', '小型工地与二次结构'),
      L('Short-to-medium pipeline pours', '中短距离管路浇筑')
    ],
    keyFeatures: [
      L('15 kW compact pump', '15 kW紧凑泵'),
      L('8–10 m³/h', '8–10 m³/h'),
      L('Weight 450 kg', '重量450 kg')
    ],
    specifications: [
      spec('Model', '型号', 'Electric 15'),
      spec('Motor Power', '电机功率', '15 kW'),
      spec('Theoretical Output', '理论输送量', '8–10 m³/h'),
      spec('Vertical Delivery Height', '垂直输送高度', '15–20 m'),
      spec('Horizontal Delivery Distance', '水平输送距离', '60–80 m'),
      spec('Max. Aggregate Size', '最大骨料粒径', '1–3 cm'),
      spec('Delivery Pipe Diameter', '输送管内径', '100–125 mm'),
      spec('Dimensions (L×W×H)', '外形尺寸', '1900 × 900 × 1200 mm'),
      spec('Total Weight', '整机重量', '450 kg'),
    ],
    seo: buildSeo(
      'Electric 15 Concrete Pump',
      '电动15型混凝土泵',
      'Electric 15 compact concrete pump manufacturer China',
      ['electric 15 concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy electric 15 concrete pump from Hebei Pinjin Machinery Xingtai', 'electric 15 concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the Electric 15 Concrete Pump in Xingtai, Hebei, China. Catalogue data: 15 kW, 8–10 m³/h, 15–20 m vertical / 60–80 m horizontal, 450 kg.',
      '河北品锦机械在中国河北邢台生产电动15型混凝土泵。目录数据：15 kW、输送量8–10 m³/h、垂直15–20 m / 水平60–80 m、重量450 kg。',
    ),
    geo: buildGeo(
      'Electric Concrete Pump',
      '电动混凝土泵',
      L('A compact electric concrete pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的紧凑型电动混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '20',
    name: L('Rural Diesel Concrete Pump', '农村自建房柴油混凝土泵'),
    slug: 'rural-diesel-concrete-pump',
    category: 'diesel-concrete-pump',
    ...imgPaths('rural-diesel-concrete-pump'),
    shortDescription: L('compact diesel concrete pump for rural houses from the Xingtai factory catalogue — 17 kW diesel, 5–8 m³/h, 15 MPa, 30–50 m horizontal / 10–30 m vertical.', '邢台工厂目录中的农村自建房紧凑型柴油混凝土泵，17 kW柴油机、输送量5–8 m³/h、压力15 MPa、水平30–50 m / 垂直10–30 m。'),
    productIntroduction: L('Rural Diesel Concrete Pump is a compact diesel concrete pump for rural houses manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 17 kW diesel, 5–8 m³/h, 15 MPa, 30–50 m horizontal / 10–30 m vertical.', '农村自建房柴油混凝土泵由河北品锦机械在中国河北邢台制造，属于农村自建房紧凑型柴油混凝土泵。目录参数：17 kW柴油机、输送量5–8 m³/h、压力15 MPa、水平30–50 m / 垂直10–30 m。'),
    applicationScenarios: [
      L('Rural self-built houses', '农村自建房'),
      L('Small building sites and secondary structure', '小型工地与二次结构'),
      L('Short-to-medium pipeline pours', '中短距离管路浇筑')
    ],
    keyFeatures: [
      L('17 kW diesel', '17 kW柴油机'),
      L('5–8 m³/h', '5–8 m³/h'),
      L('Rural house compact pump', '农村自建房紧凑泵')
    ],
    specifications: [
      spec('Model', '型号', 'Rural Self-Built House Diesel Pump'),
      spec('Diesel Engine Power', '柴油机功率', '17 kW'),
      spec('Theoretical Output', '理论输送量', '5–8 m³/h'),
      spec('Pumping Pressure', '泵送压力', '15 MPa'),
      spec('Horizontal Delivery Distance', '水平输送距离', '30–50 m'),
      spec('Vertical Delivery Height', '垂直输送高度', '10–30 m'),
      spec('Max. Aggregate Size', '最大骨料粒径', '1–3 cm'),
      spec('Hopper Capacity', '料斗容积', '0.2 m³'),
      spec('Dimensions (L×W×H)', '外形尺寸', '2200 × 1100 × 1250 mm'),
      spec('Total Weight', '整机重量', '800 kg'),
    ],
    seo: buildSeo(
      'Rural Diesel Concrete Pump',
      '农村自建房柴油混凝土泵',
      'Rural diesel concrete pump manufacturer China',
      ['rural diesel concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy rural diesel concrete pump from Hebei Pinjin Machinery Xingtai', 'rural diesel concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the Rural Diesel Concrete Pump in Xingtai, Hebei, China. Catalogue data: 17 kW diesel, 5–8 m³/h, 15 MPa, 30–50 m horizontal / 10–30 m vertical.',
      '河北品锦机械在中国河北邢台生产农村自建房柴油混凝土泵。目录数据：17 kW柴油机、输送量5–8 m³/h、压力15 MPa、水平30–50 m / 垂直10–30 m。',
    ),
    geo: buildGeo(
      'Diesel Concrete Pump',
      '柴油混凝土泵',
      L('A compact diesel concrete pump for rural houses listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的农村自建房紧凑型柴油混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '21',
    name: L('Electric 50 Concrete Pump', '电动50型混凝土泵'),
    slug: 'electric-50-concrete-pump',
    category: 'electric-concrete-pump',
    ...imgPaths('electric-50-concrete-pump'),
    shortDescription: L('electric trailer concrete pump from the Xingtai factory catalogue — 55 kW motor, 26 m³/h, 30 MPa, fine stone 150 m / 350 m.', '邢台工厂目录中的电动拖式混凝土泵，电机55 kW、输送量26 m³/h、压力30 MPa、细石水平150 m / 垂直350 m。'),
    productIntroduction: L('Electric 50 Concrete Pump is a electric trailer concrete pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 55 kW motor, 26 m³/h, 30 MPa, fine stone 150 m / 350 m.', '电动50型混凝土泵由河北品锦机械在中国河北邢台制造，属于电动拖式混凝土泵。目录参数：电机55 kW、输送量26 m³/h、压力30 MPa、细石水平150 m / 垂直350 m。'),
    applicationScenarios: [
      L('Building and commercial concrete placement', '建筑与商业混凝土浇筑'),
      L('Pipeline conveying on construction sites', '施工现场管道输送'),
      L('Projects matched to listed capacity and distance', '对照目录输送量与距离的工程')
    ],
    keyFeatures: [
      L('55 kW / 26 m³/h', '55 kW / 26 m³/h'),
      L('Fine stone 150 m / 350 m', '细石 150 m / 350 m'),
      L('Kawasaki 140', '川崎140液压泵')
    ],
    specifications: [
      spec('Model', '型号', 'Electric 50'),
      spec('Motor Power', '电机功率', '55 kW'),
      spec('Theoretical Output', '理论输送量', '26 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '30 MPa'),
      spec('Hopper Capacity', '料斗容积', '0.4 m³'),
      spec('Fine Stone Conveying (H / V)', '细石输送（水平/垂直）', '150 m / 350 m'),
      spec('13 mm Stone (H / V)', '13 mm石子（水平/垂直）', '80 m / 240 m'),
      spec('24 mm Stone (H / V)', '24 mm石子（水平/垂直）', '60 m / 180 m'),
      spec('Hydraulic Pump', '液压泵', 'Kawasaki 140'),
      spec('Dimensions (L×W×H)', '外形尺寸', '4100 × 1600 × 1600 mm'),
      spec('Main Unit Weight', '整机重量', '2800 kg'),
    ],
    seo: buildSeo(
      'Electric 50 Concrete Pump',
      '电动50型混凝土泵',
      'Electric 50 concrete pump manufacturer China',
      ['electric 50 concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy electric 50 concrete pump from Hebei Pinjin Machinery Xingtai', 'electric 50 concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the Electric 50 Concrete Pump in Xingtai, Hebei, China. Catalogue data: 55 kW motor, 26 m³/h, 30 MPa, fine stone 150 m / 350 m.',
      '河北品锦机械在中国河北邢台生产电动50型混凝土泵。目录数据：电机55 kW、输送量26 m³/h、压力30 MPa、细石水平150 m / 垂直350 m。',
    ),
    geo: buildGeo(
      'Electric Concrete Pump',
      '电动混凝土泵',
      L('A electric trailer concrete pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的电动拖式混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '22',
    name: L('Electric Low Pressure 60 Concrete Pump', '电动低压60型混凝土泵'),
    slug: 'electric-low-pressure-60-concrete-pump',
    category: 'electric-concrete-pump',
    ...imgPaths('electric-low-pressure-60-concrete-pump'),
    shortDescription: L('electric low-pressure trailer concrete pump from the Xingtai factory catalogue — 75 kW (Electric 75-60), 35 m³/h, 30 MPa, fine stone 150 m / 350 m.', '邢台工厂目录中的电动低压拖式混凝土泵，75 kW（Electric 75-60）、输送量35 m³/h、压力30 MPa、细石水平150 m / 垂直350 m。'),
    productIntroduction: L('Electric Low Pressure 60 Concrete Pump is a electric low-pressure trailer concrete pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 75 kW (Electric 75-60), 35 m³/h, 30 MPa, fine stone 150 m / 350 m.', '电动低压60型混凝土泵由河北品锦机械在中国河北邢台制造，属于电动低压拖式混凝土泵。目录参数：75 kW（Electric 75-60）、输送量35 m³/h、压力30 MPa、细石水平150 m / 垂直350 m。'),
    applicationScenarios: [
      L('Building and commercial concrete placement', '建筑与商业混凝土浇筑'),
      L('Pipeline conveying on construction sites', '施工现场管道输送'),
      L('Projects matched to listed capacity and distance', '对照目录输送量与距离的工程')
    ],
    keyFeatures: [
      L('75 kW / 35 m³/h', '75 kW / 35 m³/h'),
      L('Electric 75-60', 'Electric 75-60'),
      L('Fine stone 150 m / 350 m', '细石 150 m / 350 m')
    ],
    specifications: [
      spec('Model', '型号', 'Electric Low Pressure 60 / Electric 75-60'),
      spec('Motor Power', '电机功率', '75 kW'),
      spec('Theoretical Output', '理论输送量', '35 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '30 MPa'),
      spec('Hopper Capacity', '料斗容积', '0.5 m³'),
      spec('Fine Stone Conveying (H / V)', '细石输送（水平/垂直）', '150 m / 350 m'),
      spec('13 mm Stone (H / V)', '13 mm石子（水平/垂直）', '100 m / 300 m'),
      spec('24 mm Stone (H / V)', '24 mm石子（水平/垂直）', '80 m / 240 m'),
      spec('Hydraulic Pump', '液压泵', 'Kawasaki double pump 100'),
      spec('Dimensions (L×W×H)', '外形尺寸', '4600 × 1700 × 1700 mm'),
      spec('Main Unit Weight', '整机重量', '3500 kg'),
    ],
    seo: buildSeo(
      'Electric Low Pressure 60 Concrete Pump',
      '电动低压60型混凝土泵',
      'Electric low pressure 60 concrete pump China',
      ['electric low pressure 60 concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy electric low pressure 60 concrete pump from Hebei Pinjin Machinery Xingtai', 'electric low pressure 60 concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the Electric Low Pressure 60 Concrete Pump in Xingtai, Hebei, China. Catalogue data: 75 kW (Electric 75-60), 35 m³/h, 30 MPa, fine stone 150 m / 350 m.',
      '河北品锦机械在中国河北邢台生产电动低压60型混凝土泵。目录数据：75 kW（Electric 75-60）、输送量35 m³/h、压力30 MPa、细石水平150 m / 垂直350 m。',
    ),
    geo: buildGeo(
      'Electric Concrete Pump',
      '电动混凝土泵',
      L('A electric low-pressure trailer concrete pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的电动低压拖式混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
    ),
  },
  {
    id: '23',
    name: L('Electric 60 Concrete Pump', '电动60型混凝土泵'),
    slug: 'electric-60-concrete-pump',
    category: 'electric-concrete-pump',
    ...imgPaths('electric-60-concrete-pump'),
    shortDescription: L('electric trailer concrete pump from the Xingtai factory catalogue — 90 kW motor, 40 m³/h, 35 MPa, fine stone 200 m / 600 m.', '邢台工厂目录中的电动拖式混凝土泵，电机90 kW、输送量40 m³/h、压力35 MPa、细石水平200 m / 垂直600 m。'),
    productIntroduction: L('Electric 60 Concrete Pump is a electric trailer concrete pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 90 kW motor, 40 m³/h, 35 MPa, fine stone 200 m / 600 m.', '电动60型混凝土泵由河北品锦机械在中国河北邢台制造，属于电动拖式混凝土泵。目录参数：电机90 kW、输送量40 m³/h、压力35 MPa、细石水平200 m / 垂直600 m。'),
    applicationScenarios: [
      L('High-rise electric pumping', '高层电动泵送'),
      L('Long-distance fine-stone conveying', '长距离细石输送'),
      L('Jobs listed at 40 m³/h', '目录40 m³/h工况')
    ],
    keyFeatures: [
      L('90 kW / 40 m³/h', '90 kW / 40 m³/h'),
      L('Fine stone 200 m / 600 m', '细石 200 m / 600 m'),
      L('Hopper 0.7 m³', '料斗0.7 m³')
    ],
    specifications: [
      spec('Model', '型号', 'Electric 60'),
      spec('Motor Power', '电机功率', '90 kW'),
      spec('Theoretical Output', '理论输送量', '40 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '35 MPa'),
      spec('Hopper Capacity', '料斗容积', '0.7 m³'),
      spec('Fine Stone Conveying (H / V)', '细石输送（水平/垂直）', '200 m / 600 m'),
      spec('13 mm Stone (H / V)', '13 mm石子（水平/垂直）', '150 m / 450 m'),
      spec('24 mm Stone (H / V)', '24 mm石子（水平/垂直）', '100 m / 300 m'),
      spec('Hydraulic Pump', '液压泵', 'Kawasaki double pump 112'),
      spec('Dimensions (L×W×H)', '外形尺寸', '6600 × 1800 × 1800 mm'),
      spec('Main Unit Weight', '整机重量', '3300 kg'),
    ],
    seo: buildSeo(
      'Electric 60 Concrete Pump',
      '电动60型混凝土泵',
      'Electric 60 concrete pump manufacturer China',
      ['electric 60 concrete pump manufacturer China', 'concrete pump manufacturer China', 'Xingtai concrete pump factory'],
      ['buy electric 60 concrete pump from Hebei Pinjin Machinery Xingtai', 'electric 60 concrete pump supplier China factory'],
      'Hebei Pinjin Machinery manufactures the Electric 60 Concrete Pump in Xingtai, Hebei, China. Catalogue data: 90 kW motor, 40 m³/h, 35 MPa, fine stone 200 m / 600 m.',
      '河北品锦机械在中国河北邢台生产电动60型混凝土泵。目录数据：电机90 kW、输送量40 m³/h、压力35 MPa、细石水平200 m / 垂直600 m。',
    ),
    geo: buildGeo(
      'Electric Concrete Pump',
      '电动混凝土泵',
      L('A electric trailer concrete pump listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.', '河北品锦机械目录中的电动拖式混凝土泵，在中国邢台制造。'),
      L('Contractors matching published output, pressure and conveying distance to the site.', '需要按已公布输送量、压力与输送距离对照工况的承包商。'),
      L('Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.', '管路长度与骨料粒径落在目录表范围内的国内与出口工地。'),
      L('Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.', '邢台工厂直供，目录公开输送量、压力、料斗与输送距离。'),
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

export function getCategoryPath(category: ProductCategory): string {
  return `/products/${categoryMeta[category].routeSlug}`;
}

export function isCategoryRouteSlug(slug: string): boolean {
  return Object.values(categoryRouteSlugs).includes(
    slug as (typeof categoryRouteSlugs)[ProductCategory],
  );
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
