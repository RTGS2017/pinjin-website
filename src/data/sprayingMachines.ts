import {
  isProductStudioImage,
  productDetailImages,
  productDisplayImages,
} from '@/data/imageInventory';
import type { Product, ProductGeo, ProductSeo, ProductSpec } from '@/data/products';
import type { LocalizedText } from '@/i18n/types';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

function imgPaths(slug: string) {
  const gallery = productDisplayImages(slug);
  const image =
    gallery.find((path) => isProductStudioImage(path, slug)) ??
    gallery[0] ??
    `/images/products/${slug}/${slug}.webp`;
  return { image, gallery: productDetailImages(slug) };
}

function spec(labelEn: string, labelZh: string, value: string): ProductSpec {
  return { label: L(labelEn, labelZh), value: { en: value, zh: value } };
}

function specLoc(
  labelEn: string,
  labelZh: string,
  valueEn: string,
  valueZh: string,
): ProductSpec {
  return { label: L(labelEn, labelZh), value: L(valueEn, valueZh) };
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
    title: L(`${nameEn} Manufacturer China | Pinjin Machinery`, `${nameZh}厂家 | 品锦机械`),
    description: L(descEn, descZh),
    keywords: { primary, secondary, longTail },
  };
}

function buildGeo(
  categoryEn: string,
  categoryZh: string,
  whatIs: LocalizedText,
  whoNeeds: LocalizedText,
  whereUsed: LocalizedText,
  advantages: LocalizedText,
): ProductGeo {
  return {
    manufacturer: L(
      'Hebei Pinjin Machinery Manufacturing Co., Ltd.',
      '河北品锦机械制造有限公司',
    ),
    industry: L('Construction Machinery Manufacturer', '工程机械制造商'),
    productCategory: L(categoryEn, categoryZh),
    manufacturedIn: L(
      'Renze Industrial Park, Xingtai City, Hebei Province, China',
      '中国河北省邢台市任泽工业园区',
    ),
    answers: {
      whatIs,
      whoNeeds,
      whereUsed,
      advantages,
      howToInquire: L(
        'Request a quote by email or WhatsApp. Include the model, material, particle size, required output, horizontal and vertical distance, 380 V or diesel, country and purchase timing. Quote only; no published list price.',
        '请通过邮件或 WhatsApp 询价，并注明型号、材料、粒径、目标产量、水平与垂直距离、380V 或柴油、国家与采购时间。询价报价，无公开标价。',
      ),
    },
  };
}

export const sprayingMachineProducts: Product[] = [
  {
    id: 'sm-01',
    name: L('Hydraulic Concrete Spraying Machine', '液压混凝土喷涂机'),
    slug: 'hydraulic-concrete-spraying-machine',
    category: 'spraying-machine',
    inquiryOnly: true,
    ...imgPaths('hydraulic-concrete-spraying-machine'),
    shortDescription: L(
      '380 V hydraulic concrete spraying machine from the Xingtai catalogue — dual copper motors 7.5/9 kW, 5 m³/h, 8 MPa, 100 m horizontal / 50 m vertical, particle ≤8 mm.',
      '邢台目录液压混凝土喷涂机：380V、全铜双电机 7.5/9 kW、5 m³/h、8 MPa、水平 100 m / 垂直 50 m、粒径 ≤8 mm。',
    ),
    productIntroduction: L(
      'Hydraulic Concrete Spraying Machine is a 380 V hydraulic spraying machine manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: all-copper dual motors 7.5/9 kW, 5 m³/h, 8 MPa, hose 38/51 mm, sand-cement ratio ≤1:3, particle ≤8 mm, 100 m horizontal / 50 m vertical, 1500 × 700 × 1100 mm, 295 kg.',
      '液压混凝土喷涂机由河北品锦机械在中国河北邢台制造，380V 液压喷涂。目录参数：全铜双电机 7.5/9 kW、5 m³/h、8 MPa、管径 38/51 mm、砂灰比 ≤1:3、粒径 ≤8 mm、水平 100 m / 垂直 50 m、外形 1500 × 700 × 1100 mm、机重 295 kg。',
    ),
    applicationScenarios: [
      L('Cement-mortar or concrete spraying within the listed 5 m³/h and ≤8 mm particle window', '目录 5 m³/h 与粒径 ≤8 mm 范围内的水泥砂浆或混凝土喷涂'),
      L('Sites that can supply 380 V for the listed dual motors', '能按目录双电机提供 380V 的工地'),
      L('Hose runs inside 100 m horizontal / 50 m vertical', '软管距离落在水平 100 m / 垂直 50 m 内'),
    ],
    keyFeatures: [
      L('Output 5 m³/h', '输送量 5 m³/h'),
      L('Motors 7.5/9 kW, all copper dual motor', '电机 7.5/9 kW，全铜双电机'),
      L('Weight 295 kg', '整机重量 295 kg'),
    ],
    specifications: [
      spec('Model', '型号', 'Hydraulic Concrete Spraying Machine'),
      specLoc('Power Supply', '电源', '380 V', '380V'),
      spec('Motor Power', '电机功率', '7.5/9 kW'),
      specLoc('Drive', '驱动', 'All copper dual motor', '全铜双电机'),
      spec('Output Capacity', '理论输送量', '5 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '8 MPa'),
      spec('Delivery Distance (H / V)', '输送距离（水平/垂直）', '100 m / 50 m'),
      spec('Hose Diameter', '管径', '38/51 mm'),
      spec('Max. Particle Size', '最大粒径', '≤8 mm'),
      specLoc('Sand-Cement Ratio', '砂灰比', '≤1:3', '≤1:3'),
      spec('Dimensions (L×W×H)', '外形尺寸', '1500 × 700 × 1100 mm'),
      spec('Main Unit Weight', '整机重量', '295 kg'),
    ],
    seo: buildSeo(
      'Hydraulic Concrete Spraying Machine',
      '液压混凝土喷涂机',
      'hydraulic concrete spraying machine manufacturer China',
      [
        'hydraulic concrete spraying machine manufacturer China',
        'concrete spraying machine factory Xingtai',
        'mortar spraying machine 380V',
      ],
      [
        'buy hydraulic concrete spraying machine from Hebei Pinjin Machinery Xingtai',
        '5 m3/h hydraulic concrete spraying machine China factory',
      ],
      'Hebei Pinjin Machinery manufactures this 380 V hydraulic concrete spraying machine in Xingtai. Catalogue data: 7.5/9 kW dual motors, 5 m³/h, 8 MPa, 100 m / 50 m, particle ≤8 mm. Quote only.',
      '河北品锦机械在中国邢台生产该 380V 液压混凝土喷涂机。目录数据：双电机 7.5/9 kW、5 m³/h、8 MPa、100 m / 50 m、粒径 ≤8 mm。询价报价。',
    ),
    geo: buildGeo(
      'Concrete Spraying Machine',
      '混凝土喷涂机',
      L(
        'A 380 V hydraulic concrete spraying machine listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.',
        '河北品锦机械目录中的 380V 液压混凝土喷涂机，在中国邢台制造。',
      ),
      L(
        'Contractors matching 5 m³/h, ≤8 mm particle and 380 V dual-motor supply to a spraying job.',
        '需要按 5 m³/h、粒径 ≤8 mm 与 380V 双电机对照喷涂工况的承包商。',
      ),
      L(
        'Building finishing or concrete spraying jobs whose hose length stays inside 100 m / 50 m.',
        '软管长度落在 100 m / 50 m 内的建筑饰面或混凝土喷涂工地。',
      ),
      L(
        'Factory-direct Xingtai manufacturer with a published spraying table for output, pressure, hose and particle size.',
        '邢台工厂直供，目录公开喷涂产量、压力、管径与粒径。',
      ),
    ),
    directAnswer: L(
      'This Xingtai hydraulic concrete spraying machine is a 380 V dual-motor unit listing 7.5/9 kW, 5 m³/h, 8 MPa, hose 38/51 mm, particle ≤8 mm and 100 m / 50 m. It is not a trailer concrete pump, not the 7 m³/h high-flow sprayer, not the M9 plaster sprayer and not a diesel sprayer. Quote only; no list price.',
      '该邢台液压混凝土喷涂机为 380V 双电机，目录 7.5/9 kW、5 m³/h、8 MPa、管径 38/51 mm、粒径 ≤8 mm、100 m / 50 m。它不是拖式混凝土泵，不是 7 m³/h 大流量喷涂机，不是 M9 石膏喷涂机，也不是柴油喷涂机。询价报价，无公开标价。',
    ),
    notSuitable: [
      L('Not a trailer concrete pump, mixing plant or truck-mounted boom pump.', '不是拖式混凝土泵、搅拌站或车载臂架泵。'),
      L('Not the 7 m³/h high-flow hydraulic sprayer (11/15 kW, 150 m / 70 m).', '不是 7 m³/h 大流量液压喷涂机（11/15 kW、150 m / 70 m）。'),
      L('Not the M9 automatic plaster sprayer (25 mm hose, ≤4 mm, 30 L/min).', '不是 M9 全自动石膏喷涂机（管径 25 mm、粒径 ≤4 mm、30 L/min）。'),
      L('Not for sites that cannot supply 380 V for the listed motors.', '现场无法按目录电机提供 380V 时不适用。'),
    ],
    howToSelect: L(
      'Confirm 380 V supply, material, particle ≤8 mm, 5 m³/h, hose 38/51 mm and 100 m / 50 m against this table. If you need 7 m³/h or 150 m / 70 m, open the high-flow hydraulic sprayer. If the job is plaster at ≤4 mm, open M9. If there is no grid, open the diesel sprayer. Then send those conditions for a factory quote.',
      '对照本页确认 380V、材料、粒径 ≤8 mm、5 m³/h、管径 38/51 mm 与 100 m / 50 m。若需要 7 m³/h 或 150 m / 70 m，请打开大流量液压喷涂机。若是粒径 ≤4 mm 的石膏喷涂，请打开 M9。若无电网，请打开柴油喷涂机。再把工况发给工厂报价。',
    ),
  },
  {
    id: 'sm-02',
    name: L('High-Flow Hydraulic Concrete Spraying Machine', '大流量液压混凝土喷涂机'),
    slug: 'high-flow-hydraulic-concrete-spraying-machine',
    category: 'spraying-machine',
    inquiryOnly: true,
    ...imgPaths('high-flow-hydraulic-concrete-spraying-machine'),
    shortDescription: L(
      '380 V high-flow hydraulic concrete spraying machine from the Xingtai catalogue — dual copper motors 11/15 kW, 7 m³/h, 8 MPa, 150 m horizontal / 70 m vertical, particle ≤8 mm.',
      '邢台目录大流量液压混凝土喷涂机：380V、全铜双电机 11/15 kW、7 m³/h、8 MPa、水平 150 m / 垂直 70 m、粒径 ≤8 mm。',
    ),
    productIntroduction: L(
      'High-Flow Hydraulic Concrete Spraying Machine is a 380 V hydraulic spraying machine manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: hydraulic control, all-copper dual motors 11/15 kW, 7 m³/h, 8 MPa, hose 38/51 mm, sand-cement ratio ≤1:3, particle ≤8 mm, 150 m horizontal / 70 m vertical, 2500 × 1000 × 1100 mm, 650 kg. Printed materials: cement mortar, concrete, grout.',
      '大流量液压混凝土喷涂机由河北品锦机械在中国河北邢台制造，380V 液压喷涂。目录参数：液压控制、全铜双电机 11/15 kW、7 m³/h、8 MPa、管径 38/51 mm、砂灰比 ≤1:3、粒径 ≤8 mm、水平 150 m / 垂直 70 m、外形 2500 × 1000 × 1100 mm、机重 650 kg。目录材料：水泥砂浆、混凝土、灌浆料。',
    ),
    applicationScenarios: [
      L('Cement mortar, concrete or grout spraying inside 7 m³/h and ≤8 mm', '7 m³/h 与粒径 ≤8 mm 内的水泥砂浆、混凝土或灌浆料喷涂'),
      L('Longer hose runs up to the listed 150 m / 70 m', '软管距离落在目录 150 m / 70 m 内'),
      L('Sites that can supply 380 V for 11/15 kW dual motors', '能按 11/15 kW 双电机提供 380V 的工地'),
    ],
    keyFeatures: [
      L('Output 7 m³/h', '输送量 7 m³/h'),
      L('Motors 11/15 kW, hydraulic control', '电机 11/15 kW，液压控制'),
      L('Weight 650 kg', '整机重量 650 kg'),
    ],
    specifications: [
      spec('Model', '型号', 'High-Flow Hydraulic Concrete Spraying Machine'),
      specLoc('Power Supply', '电源', '380 V', '380V'),
      spec('Motor Power', '电机功率', '11/15 kW'),
      specLoc('Drive', '驱动', 'Hydraulic control; dual motor (all copper)', '液压控制；全铜双电机'),
      spec('Output Capacity', '理论输送量', '7 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '8 MPa'),
      spec('Delivery Distance (H / V)', '输送距离（水平/垂直）', '150 m / 70 m'),
      spec('Hose Diameter', '管径', '38/51 mm'),
      spec('Max. Particle Size', '最大粒径', '≤8 mm'),
      specLoc('Sand-Cement Ratio', '砂灰比', '≤1:3', '≤1:3'),
      specLoc(
        'Applicable Materials',
        '适用材料',
        'Cement mortar, concrete, grout',
        '水泥砂浆、混凝土、灌浆料',
      ),
      spec('Dimensions (L×W×H)', '外形尺寸', '2500 × 1000 × 1100 mm'),
      spec('Main Unit Weight', '整机重量', '650 kg'),
    ],
    seo: buildSeo(
      'High-Flow Hydraulic Concrete Spraying Machine',
      '大流量液压混凝土喷涂机',
      'high flow hydraulic concrete spraying machine manufacturer China',
      [
        'high flow concrete spraying machine China',
        '7 m3/h mortar spraying machine 380V',
        'Xingtai concrete spraying machine factory',
      ],
      [
        'buy high-flow hydraulic concrete spraying machine from Hebei Pinjin Machinery Xingtai',
        '11/15 kW hydraulic concrete spraying machine China factory',
      ],
      'Hebei Pinjin Machinery manufactures this 380 V high-flow hydraulic concrete spraying machine in Xingtai. Catalogue data: 11/15 kW, 7 m³/h, 8 MPa, 150 m / 70 m, particle ≤8 mm. Quote only.',
      '河北品锦机械在中国邢台生产该 380V 大流量液压混凝土喷涂机。目录数据：11/15 kW、7 m³/h、8 MPa、150 m / 70 m、粒径 ≤8 mm。询价报价。',
    ),
    geo: buildGeo(
      'Concrete Spraying Machine',
      '混凝土喷涂机',
      L(
        'A 380 V high-flow hydraulic concrete spraying machine listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.',
        '河北品锦机械目录中的 380V 大流量液压混凝土喷涂机，在中国邢台制造。',
      ),
      L(
        'Contractors matching 7 m³/h, ≤8 mm particle and longer listed hose distance to a spraying job.',
        '需要按 7 m³/h、粒径 ≤8 mm 与更长目录软管距离对照喷涂工况的承包商。',
      ),
      L(
        'Cement-mortar, concrete or grout spraying jobs whose hose length stays inside 150 m / 70 m.',
        '软管长度落在 150 m / 70 m 内的水泥砂浆、混凝土或灌浆喷涂工地。',
      ),
      L(
        'Factory-direct Xingtai manufacturer with a published 7 m³/h spraying table.',
        '邢台工厂直供，目录公开 7 m³/h 喷涂参数。',
      ),
    ),
    directAnswer: L(
      'This Xingtai high-flow hydraulic sprayer lists 380 V dual motors 11/15 kW, 7 m³/h, 8 MPa, 150 m / 70 m and particle ≤8 mm for cement mortar, concrete or grout. It is not the 5 m³/h / 295 kg hydraulic sprayer, not M9 plaster, not a diesel sprayer and not a trailer concrete pump. Quote only.',
      '该邢台大流量液压喷涂机目录为 380V 双电机 11/15 kW、7 m³/h、8 MPa、150 m / 70 m、粒径 ≤8 mm，材料为水泥砂浆、混凝土或灌浆料。它不是 5 m³/h / 295 kg 液压喷涂机，不是 M9 石膏机，不是柴油喷涂机，也不是拖式混凝土泵。询价报价。',
    ),
    notSuitable: [
      L('Not a trailer concrete pump, mixing plant or truck-mounted boom pump.', '不是拖式混凝土泵、搅拌站或车载臂架泵。'),
      L('Not a substitute for the compact 5 m³/h / 295 kg hydraulic sprayer on constrained floors.', '不能替代场地受限时的紧凑型 5 m³/h / 295 kg 液压喷涂机。'),
      L('Not the M9 automatic plaster sprayer (25 mm, ≤4 mm, 30 L/min).', '不是 M9 全自动石膏喷涂机（25 mm、≤4 mm、30 L/min）。'),
      L('Not for sites that cannot supply 380 V for 11/15 kW motors.', '现场无法按 11/15 kW 提供 380V 时不适用。'),
    ],
    howToSelect: L(
      'Confirm 380 V, 7 m³/h, particle ≤8 mm and 150 m / 70 m against this table. If 5 m³/h and 295 kg fit better, open the compact hydraulic sprayer. Plaster at ≤4 mm → M9. No grid → diesel sprayer. Then inquire.',
      '对照本页确认 380V、7 m³/h、粒径 ≤8 mm 与 150 m / 70 m。若 5 m³/h、295 kg 更合适，请打开紧凑液压喷涂机。粒径 ≤4 mm 石膏 → M9。无电网 → 柴油喷涂机。然后再询盘。',
    ),
  },
  {
    id: 'sm-03',
    name: L('M9 Automatic Plaster Spraying Machine', 'M9全自动石膏喷涂机'),
    slug: 'm9-automatic-plaster-spraying-machine',
    category: 'spraying-machine',
    inquiryOnly: true,
    ...imgPaths('m9-automatic-plaster-spraying-machine'),
    shortDescription: L(
      'M9 automatic plaster spraying machine from the Xingtai catalogue — 380 V/50 Hz, 30 L/min, 50 bar, 25 mm hose, hopper 115 L, 50 m horizontal / 20 m vertical, particle ≤4 mm.',
      '邢台目录 M9 全自动石膏喷涂机：380V/50Hz、30 L/min、50 bar、管径 25 mm、料斗 115 L、水平 50 m / 垂直 20 m、粒径 ≤4 mm。',
    ),
    productIntroduction: L(
      'M9 Automatic Plaster Spraying Machine is a 380 V/50 Hz plaster spraying machine manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: 30 L/min, 50 bar, 25 mm hose, hopper 115 L, loading height 90 cm, particle ≤4 mm, 50 m horizontal / 20 m vertical, 1230 × 720 × 1550 mm, 200 kg.',
      'M9全自动石膏喷涂机由河北品锦机械在中国河北邢台制造，380V/50Hz。目录参数：30 L/min、50 bar、管径 25 mm、料斗 115 L、上料高度 90 cm、粒径 ≤4 mm、水平 50 m / 垂直 20 m、外形 1230 × 720 × 1550 mm、机重 200 kg。',
    ),
    applicationScenarios: [
      L('Gypsum or plaster spraying inside 30 L/min and ≤4 mm particle', '30 L/min 与粒径 ≤4 mm 内的石膏/抹灰喷涂'),
      L('Indoor finishing with 25 mm hose and 115 L hopper', '25 mm 软管与 115 L 料斗的室内饰面'),
      L('Sites that can supply 380 V/50 Hz', '能提供 380V/50Hz 的工地'),
    ],
    keyFeatures: [
      L('Output 30 L/min', '输送量 30 L/min'),
      L('Hopper 115 L, loading height 90 cm', '料斗 115 L，上料高度 90 cm'),
      L('Weight 200 kg', '整机重量 200 kg'),
    ],
    specifications: [
      spec('Model', '型号', 'M9'),
      specLoc('Power Supply', '电源', '380 V / 50 Hz', '380V/50Hz'),
      spec('Output Capacity', '理论输送量', '30 L/min'),
      spec('Max. Outlet Pressure', '最大出口压力', '50 bar'),
      spec('Delivery Distance (H / V)', '输送距离（水平/垂直）', '50 m / 20 m'),
      spec('Hose Diameter', '管径', '25 mm'),
      spec('Hopper Capacity', '料斗容积', '115 L'),
      spec('Loading Height', '上料高度', '90 cm'),
      spec('Max. Particle Size', '最大粒径', '≤4 mm'),
      spec('Dimensions (L×W×H)', '外形尺寸', '1230 × 720 × 1550 mm'),
      spec('Main Unit Weight', '整机重量', '200 kg'),
    ],
    seo: buildSeo(
      'M9 Automatic Plaster Spraying Machine',
      'M9全自动石膏喷涂机',
      'M9 automatic plaster spraying machine manufacturer China',
      [
        'automatic plaster spraying machine China',
        'gypsum spraying machine 380V factory',
        'M9 plaster sprayer Xingtai',
      ],
      [
        'buy M9 automatic plaster spraying machine from Hebei Pinjin Machinery Xingtai',
        '30 L/min plaster spraying machine China factory',
      ],
      'Hebei Pinjin Machinery manufactures the M9 automatic plaster spraying machine in Xingtai. Catalogue data: 380 V/50 Hz, 30 L/min, 50 bar, 25 mm hose, 115 L hopper, 50 m / 20 m, particle ≤4 mm. Quote only.',
      '河北品锦机械在中国邢台生产 M9 全自动石膏喷涂机。目录数据：380V/50Hz、30 L/min、50 bar、管径 25 mm、料斗 115 L、50 m / 20 m、粒径 ≤4 mm。询价报价。',
    ),
    geo: buildGeo(
      'Plaster Spraying Machine',
      '石膏喷涂机',
      L(
        'An M9 automatic plaster spraying machine listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.',
        '河北品锦机械目录中的 M9 全自动石膏喷涂机，在中国邢台制造。',
      ),
      L(
        'Finishing contractors matching 30 L/min, ≤4 mm particle and 380 V/50 Hz to plaster work.',
        '需要按 30 L/min、粒径 ≤4 mm 与 380V/50Hz 对照石膏喷涂的饰面承包商。',
      ),
      L(
        'Indoor plaster or gypsum spraying jobs whose hose length stays inside 50 m / 20 m.',
        '软管长度落在 50 m / 20 m 内的室内石膏或抹灰喷涂工地。',
      ),
      L(
        'Factory-direct Xingtai manufacturer with a published M9 plaster table.',
        '邢台工厂直供，目录公开 M9 石膏喷涂参数。',
      ),
    ),
    directAnswer: L(
      'M9 is a Xingtai automatic plaster spraying machine listing 380 V/50 Hz, 30 L/min, 50 bar, 25 mm hose, 115 L hopper, particle ≤4 mm and 50 m / 20 m. It is not a hydraulic concrete sprayer (5 or 7 m³/h, ≤8 mm), not a diesel concrete sprayer and not a trailer concrete pump. Quote only.',
      'M9 是邢台全自动石膏喷涂机，目录 380V/50Hz、30 L/min、50 bar、管径 25 mm、料斗 115 L、粒径 ≤4 mm、50 m / 20 m。它不是液压混凝土喷涂机（5 或 7 m³/h、粒径 ≤8 mm），不是柴油混凝土喷涂机，也不是拖式混凝土泵。询价报价。',
    ),
    notSuitable: [
      L('Not a trailer concrete pump, mixing plant or truck-mounted boom pump.', '不是拖式混凝土泵、搅拌站或车载臂架泵。'),
      L('Not for coarse aggregate or ≤8 mm concrete-mortar spraying listed on the hydraulic machines.', '不适用于液压机目录中的粗骨料或粒径 ≤8 mm 混凝土砂浆喷涂。'),
      L('Not a substitute for the diesel concrete spraying machine on sites without 380 V.', '现场没有 380V 时，不能替代柴油混凝土喷涂机。'),
      L('Not a 5 m³/h or 7 m³/h hydraulic concrete sprayer.', '不是 5 m³/h 或 7 m³/h 液压混凝土喷涂机。'),
    ],
    howToSelect: L(
      'Confirm plaster/gypsum, particle ≤4 mm, 30 L/min, 25 mm hose and 380 V/50 Hz against this M9 table. Concrete mortar at ≤8 mm belongs on the hydraulic concrete sprayers. No grid → diesel concrete sprayer. Then inquire.',
      '对照本页确认石膏/抹灰、粒径 ≤4 mm、30 L/min、管径 25 mm 与 380V/50Hz。粒径 ≤8 mm 的混凝土砂浆请看液压混凝土喷涂机。无电网 → 柴油混凝土喷涂机。然后再询盘。',
    ),
  },
  {
    id: 'sm-04',
    name: L('Diesel Concrete Spraying Machine', '柴油混凝土喷涂机'),
    slug: 'diesel-concrete-spraying-machine',
    category: 'spraying-machine',
    inquiryOnly: true,
    ...imgPaths('diesel-concrete-spraying-machine'),
    shortDescription: L(
      'Diesel concrete spraying machine from the Xingtai catalogue — 28/32 HP, 5 m³/h, 8 MPa, 80 m horizontal / 40 m vertical, particle ≤6 mm, 480 kg.',
      '邢台目录柴油混凝土喷涂机：28/32 HP、5 m³/h、8 MPa、水平 80 m / 垂直 40 m、粒径 ≤6 mm、机重 480 kg。',
    ),
    productIntroduction: L(
      'Diesel Concrete Spraying Machine is a diesel spraying machine manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Catalogue parameters: engine 28/32 HP, 5 m³/h, 8 MPa, hose 38/51 mm, sand-cement ratio ≤1:3, particle ≤6 mm, 80 m horizontal / 40 m vertical, 2350 × 750 × 1050 mm, 480 kg.',
      '柴油混凝土喷涂机由河北品锦机械在中国河北邢台制造。目录参数：发动机 28/32 HP、5 m³/h、8 MPa、管径 38/51 mm、砂灰比 ≤1:3、粒径 ≤6 mm、水平 80 m / 垂直 40 m、外形 2350 × 750 × 1050 mm、机重 480 kg。',
    ),
    applicationScenarios: [
      L('Concrete or mortar spraying on sites without 380 V grid', '无 380V 电网工地的混凝土或砂浆喷涂'),
      L('Jobs inside 5 m³/h, ≤6 mm particle and 80 m / 40 m', '5 m³/h、粒径 ≤6 mm 与 80 m / 40 m 范围内的喷涂'),
      L('Hose 38/51 mm with sand-cement ratio ≤1:3', '管径 38/51 mm、砂灰比 ≤1:3'),
    ],
    keyFeatures: [
      L('Output 5 m³/h', '输送量 5 m³/h'),
      L('Engine 28/32 HP', '发动机 28/32 HP'),
      L('Weight 480 kg', '整机重量 480 kg'),
    ],
    specifications: [
      spec('Model', '型号', 'Diesel Concrete Spraying Machine'),
      specLoc('Power Type', '动力形式', 'Diesel engine', '柴油机'),
      spec('Engine Power', '发动机功率', '28/32 HP'),
      spec('Output Capacity', '理论输送量', '5 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '8 MPa'),
      spec('Delivery Distance (H / V)', '输送距离（水平/垂直）', '80 m / 40 m'),
      spec('Hose Diameter', '管径', '38/51 mm'),
      spec('Max. Particle Size', '最大粒径', '≤6 mm'),
      specLoc('Sand-Cement Ratio', '砂灰比', '≤1:3', '≤1:3'),
      spec('Dimensions (L×W×H)', '外形尺寸', '2350 × 750 × 1050 mm'),
      spec('Main Unit Weight', '整机重量', '480 kg'),
    ],
    seo: buildSeo(
      'Diesel Concrete Spraying Machine',
      '柴油混凝土喷涂机',
      'diesel concrete spraying machine manufacturer China',
      [
        'diesel concrete spraying machine China factory',
        'diesel mortar sprayer 28 HP Xingtai',
        'no-grid concrete spraying machine manufacturer',
      ],
      [
        'buy diesel concrete spraying machine from Hebei Pinjin Machinery Xingtai',
        '28/32 HP diesel concrete spraying machine China factory',
      ],
      'Hebei Pinjin Machinery manufactures this diesel concrete spraying machine in Xingtai. Catalogue data: 28/32 HP, 5 m³/h, 8 MPa, 80 m / 40 m, particle ≤6 mm. Quote only. Not a Diesel 30 trailer pump.',
      '河北品锦机械在中国邢台生产该柴油混凝土喷涂机。目录数据：28/32 HP、5 m³/h、8 MPa、80 m / 40 m、粒径 ≤6 mm。询价报价。不是柴油30拖式混凝土泵。',
    ),
    geo: buildGeo(
      'Concrete Spraying Machine',
      '混凝土喷涂机',
      L(
        'A diesel concrete spraying machine listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.',
        '河北品锦机械目录中的柴油混凝土喷涂机，在中国邢台制造。',
      ),
      L(
        'Contractors spraying mortar or concrete where 380 V is not available and 5 m³/h / ≤6 mm fits the job.',
        '现场没有 380V、且 5 m³/h / 粒径 ≤6 mm 能覆盖喷涂工况的承包商。',
      ),
      L(
        'Off-grid spraying jobs whose hose length stays inside 80 m / 40 m.',
        '软管长度落在 80 m / 40 m 内的无电网喷涂工地。',
      ),
      L(
        'Factory-direct Xingtai diesel sprayer with a published HP, output and distance table.',
        '邢台工厂直供柴油喷涂机，目录公开马力、产量与距离。',
      ),
    ),
    directAnswer: L(
      'This Xingtai diesel concrete spraying machine lists 28/32 HP, 5 m³/h, 8 MPa, 80 m / 40 m and particle ≤6 mm. It is not a Diesel 30 trailer concrete pump, not a 380 V hydraulic sprayer, not M9 plaster and not a mixing plant. Quote only; no list price.',
      '该邢台柴油混凝土喷涂机目录为 28/32 HP、5 m³/h、8 MPa、80 m / 40 m、粒径 ≤6 mm。它不是柴油30拖式混凝土泵，不是 380V 液压喷涂机，不是 M9 石膏机，也不是搅拌站。询价报价，无公开标价。',
    ),
    notSuitable: [
      L('Not a Diesel 30 trailer concrete pump and not a mixing plant or boom pump.', '不是柴油30拖式混凝土泵，也不是搅拌站或臂架泵。'),
      L('Not a 380 V hydraulic concrete sprayer (7.5/9 kW or 11/15 kW).', '不是 380V 液压混凝土喷涂机（7.5/9 kW 或 11/15 kW）。'),
      L('Not the M9 automatic plaster sprayer (25 mm, ≤4 mm, 30 L/min).', '不是 M9 全自动石膏喷涂机（25 mm、≤4 mm、30 L/min）。'),
      L('Not for particle sizes above the printed ≤6 mm row.', '粒径超过目录 ≤6 mm 时不适用。'),
    ],
    howToSelect: L(
      'Use this row when the site has diesel fuel and no 380 V grid, and 5 m³/h / ≤6 mm / 80 m / 40 m covers the spray. If 380 V is available, compare the hydraulic concrete sprayers. Plaster at ≤4 mm → M9. Do not treat this page as the Diesel 30 pump table. Then inquire.',
      '现场有柴油、没有 380V，且 5 m³/h / ≤6 mm / 80 m / 40 m 能覆盖喷涂时用本机。若有 380V，请对照液压混凝土喷涂机。粒径 ≤4 mm 石膏 → M9。不要把本页当成柴油30泵参数表。然后再询盘。',
    ),
  },
  {
    id: 'sm-05',
    name: L('Double-Cylinder Plunger Mortar Spraying Machine', '双缸柱塞式砂浆喷涂机'),
    slug: 'double-cylinder-plunger-mortar-spraying-machine',
    category: 'spraying-machine',
    inquiryOnly: true,
    ...imgPaths('double-cylinder-plunger-mortar-spraying-machine'),
    shortDescription: L(
      'Double-cylinder plunger mortar spraying machine from the Xingtai printed table — 380 V, dual motors 9/11 kW, 4 m³/h, 8 MPa, 100 m horizontal / 40 m vertical, particle ≤8 mm, 420 kg.',
      '邢台印刷表双缸柱塞式砂浆喷涂机：380V、全铜双电机 9/11 kW、4 m³/h、8 MPa、水平 100 m / 垂直 40 m、粒径 ≤8 mm、机重 420 kg。',
    ),
    productIntroduction: L(
      'Double-Cylinder Plunger Mortar Spraying Machine is a 380 V mortar spraying machine manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Printed parameters: power 380 V, motors 9/11 kW, all-copper dual motor, output 4 m³/h, 8 MPa, hose 38/51 mm, sand-cement ratio ≤1:3, particle ≤8 mm, 100 m horizontal / 40 m vertical, 1850 × 545 × 605 mm, 420 kg.',
      '双缸柱塞式砂浆喷涂机由河北品锦机械在中国河北邢台制造，380V。印刷参数：电源 380V、电机 9/11 kW、全铜双电机、输送量 4 m³/h、8 MPa、管径 38/51 mm、砂灰比 ≤1:3、粒径 ≤8 mm、水平 100 m / 垂直 40 m、外形 1850 × 545 × 605 mm、机重 420 kg。',
    ),
    applicationScenarios: [
      L('Mortar spraying inside the printed 4 m³/h and ≤8 mm particle window', '印刷表 4 m³/h 与粒径 ≤8 mm 范围内的砂浆喷涂'),
      L('Sites that can supply 380 V for the listed 9/11 kW dual motors', '能按目录 9/11 kW 双电机提供 380V 的工地'),
      L('Hose runs inside 100 m horizontal / 40 m vertical', '软管距离落在水平 100 m / 垂直 40 m 内'),
    ],
    keyFeatures: [
      L('Output 4 m³/h', '输送量 4 m³/h'),
      L('Motors 9/11 kW, all copper dual motor', '电机 9/11 kW，全铜双电机'),
      L('Weight 420 kg', '整机重量 420 kg'),
    ],
    specifications: [
      spec('Model', '型号', 'Double-cylinder plunger mortar spraying machine'),
      specLoc('Power Supply', '电源', '380 V', '380V'),
      spec('Motor Power', '电机功率', '9/11 kW'),
      specLoc('Drive', '驱动', 'All copper dual motor', '全铜双电机'),
      spec('Output Capacity', '理论输送量', '4 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '8 MPa'),
      spec('Delivery Distance (H / V)', '输送距离（水平/垂直）', '100 m / 40 m'),
      spec('Hose Diameter', '管径', '38/51 mm'),
      spec('Max. Particle Size', '最大粒径', '≤8 mm'),
      specLoc('Sand-Cement Ratio', '砂灰比', '≤1:3', '≤1:3'),
      spec('Dimensions (L×W×H)', '外形尺寸', '1850 × 545 × 605 mm'),
      spec('Main Unit Weight', '整机重量', '420 kg'),
    ],
    seo: buildSeo(
      'Double-Cylinder Plunger Mortar Spraying Machine',
      '双缸柱塞式砂浆喷涂机',
      'double cylinder plunger mortar spraying machine manufacturer China',
      [
        'double cylinder plunger mortar sprayer China',
        '9/11 kW mortar spraying machine 380V',
        'Xingtai mortar spraying machine factory',
      ],
      [
        'buy double-cylinder plunger mortar spraying machine from Hebei Pinjin Machinery Xingtai',
        '4 m3/h plunger mortar spraying machine China factory',
      ],
      'Hebei Pinjin Machinery manufactures this 380 V double-cylinder plunger mortar spraying machine in Xingtai. Printed data: 9/11 kW, 4 m³/h, 8 MPa, 100 m / 40 m, particle ≤8 mm. Quote only.',
      '河北品锦机械在中国邢台生产该 380V 双缸柱塞式砂浆喷涂机。印刷数据：9/11 kW、4 m³/h、8 MPa、100 m / 40 m、粒径 ≤8 mm。询价报价。',
    ),
    geo: buildGeo(
      'Mortar Spraying Machine',
      '砂浆喷涂机',
      L(
        'A 380 V double-cylinder plunger mortar spraying machine listed on the Hebei Pinjin Machinery printed table and manufactured in Xingtai, China.',
        '河北品锦机械印刷表中的 380V 双缸柱塞式砂浆喷涂机，在中国邢台制造。',
      ),
      L(
        'Contractors matching 4 m³/h, ≤8 mm particle and 380 V dual-motor supply to a mortar spraying job.',
        '需要按 4 m³/h、粒径 ≤8 mm 与 380V 双电机对照砂浆喷涂工况的承包商。',
      ),
      L(
        'Mortar spraying jobs whose hose length stays inside 100 m / 40 m.',
        '软管长度落在 100 m / 40 m 内的砂浆喷涂工地。',
      ),
      L(
        'Factory-direct Xingtai manufacturer with a printed spraying table for output, pressure, hose and particle size.',
        '邢台工厂直供，印刷表公开喷涂产量、压力、管径与粒径。',
      ),
    ),
    directAnswer: L(
      'This Xingtai double-cylinder plunger mortar spraying machine lists 380 V, 9/11 kW dual motors, 4 m³/h, 8 MPa, hose 38/51 mm, particle ≤8 mm and 100 m / 40 m. It is not Type 311 (4 kW, 2 m³/h), not Type 511 (7.5 kW, 3 m³/h), not a trailer concrete pump and not M9 plaster. Quote only; no list price.',
      '该邢台双缸柱塞式砂浆喷涂机印刷为 380V、双电机 9/11 kW、4 m³/h、8 MPa、管径 38/51 mm、粒径 ≤8 mm、100 m / 40 m。它不是 311（4 kW、2 m³/h），不是 511（7.5 kW、3 m³/h），不是拖式混凝土泵，也不是 M9 石膏机。询价报价，无公开标价。',
    ),
    notSuitable: [
      L('Not a trailer concrete pump, mixing plant or truck-mounted boom pump.', '不是拖式混凝土泵、搅拌站或车载臂架泵。'),
      L('Not Type 311 (4 kW, 2 m³/h, 3–5 MPa, 15 m / 5 m, particle ≤2 mm).', '不是 311（4 kW、2 m³/h、3–5 MPa、15 m / 5 m、粒径 ≤2 mm）。'),
      L('Not Type 511 (7.5 kW, 3 m³/h, 3–5 MPa, 30 m / 15 m, particle ≤6 mm).', '不是 511（7.5 kW、3 m³/h、3–5 MPa、30 m / 15 m、粒径 ≤6 mm）。'),
      L('Not for sites that cannot supply 380 V for the listed 9/11 kW motors.', '现场无法按目录 9/11 kW 提供 380V 时不适用。'),
    ],
    howToSelect: L(
      'Confirm 380 V, 4 m³/h, 8 MPa, hose 38/51 mm, particle ≤8 mm and 100 m / 40 m against this printed table. If you need 2 m³/h / ≤2 mm, open Type 311. If 3 m³/h / ≤6 mm, open Type 511. Plaster at ≤4 mm → M9. No grid → diesel sprayer. Then send those conditions for a factory quote.',
      '对照本页印刷表确认 380V、4 m³/h、8 MPa、管径 38/51 mm、粒径 ≤8 mm 与 100 m / 40 m。若需要 2 m³/h / ≤2 mm，请打开 311。若 3 m³/h / ≤6 mm，请打开 511。粒径 ≤4 mm 石膏 → M9。无电网 → 柴油喷涂机。再把工况发给工厂报价。',
    ),
  },
  {
    id: 'sm-06',
    name: L('Type 311 Mortar Spraying Machine', '311砂浆喷涂机'),
    slug: 'type-311-mortar-spraying-machine',
    category: 'spraying-machine',
    inquiryOnly: true,
    ...imgPaths('type-311-mortar-spraying-machine'),
    shortDescription: L(
      'Type 311 mortar spraying machine from the Xingtai printed table — 220/380 V, 4 kW, 2 m³/h, 3–5 MPa, 15 m horizontal / 5 m vertical, particle ≤2 mm, 150 kg.',
      '邢台印刷表 311 砂浆喷涂机：220/380V、4 kW、2 m³/h、3–5 MPa、水平 15 m / 垂直 5 m、粒径 ≤2 mm、机重 150 kg。',
    ),
    productIntroduction: L(
      'Type 311 Mortar Spraying Machine is a mortar spraying machine manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Printed parameters: power 220/380 V, motor 4 kW, output 2 m³/h, 3–5 MPa, hose 25 mm, sand-cement ratio ≤1:3, particle ≤2 mm, 15 m horizontal / 5 m vertical, 1500 × 420 × 900 mm, 150 kg.',
      '311砂浆喷涂机由河北品锦机械在中国河北邢台制造。印刷参数：电源 220/380V、电机 4 kW、输送量 2 m³/h、3–5 MPa、管径 25 mm、砂灰比 ≤1:3、粒径 ≤2 mm、水平 15 m / 垂直 5 m、外形 1500 × 420 × 900 mm、机重 150 kg。',
    ),
    applicationScenarios: [
      L('Fine mortar spraying inside 2 m³/h and ≤2 mm particle', '2 m³/h 与粒径 ≤2 mm 内的细砂浆喷涂'),
      L('Short hose runs inside 15 m horizontal / 5 m vertical', '软管距离落在水平 15 m / 垂直 5 m 内'),
      L('Sites that can supply 220 V or 380 V for the listed 4 kW motor', '能按目录 4 kW 提供 220V 或 380V 的工地'),
    ],
    keyFeatures: [
      L('Output 2 m³/h', '输送量 2 m³/h'),
      L('Motor 4 kW, 220/380 V', '电机 4 kW，220/380V'),
      L('Weight 150 kg', '整机重量 150 kg'),
    ],
    specifications: [
      spec('Model', '型号', 'Type 311'),
      specLoc('Power Supply', '电源', '220/380 V', '220/380V'),
      spec('Motor Power', '电机功率', '4 kW'),
      spec('Output Capacity', '理论输送量', '2 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '3–5 MPa'),
      spec('Delivery Distance (H / V)', '输送距离（水平/垂直）', '15 m / 5 m'),
      spec('Hose Diameter', '管径', '25 mm'),
      spec('Max. Particle Size', '最大粒径', '≤2 mm'),
      specLoc('Sand-Cement Ratio', '砂灰比', '≤1:3', '≤1:3'),
      spec('Dimensions (L×W×H)', '外形尺寸', '1500 × 420 × 900 mm'),
      spec('Main Unit Weight', '整机重量', '150 kg'),
    ],
    seo: buildSeo(
      'Type 311 Mortar Spraying Machine',
      '311砂浆喷涂机',
      'type 311 mortar spraying machine manufacturer China',
      [
        '311 mortar spraying machine China factory',
        '4 kW mortar sprayer 220V 380V',
        'Xingtai compact mortar spraying machine',
      ],
      [
        'buy type 311 mortar spraying machine from Hebei Pinjin Machinery Xingtai',
        '2 m3/h type 311 mortar spraying machine China factory',
      ],
      'Hebei Pinjin Machinery manufactures the Type 311 mortar spraying machine in Xingtai. Printed data: 220/380 V, 4 kW, 2 m³/h, 3–5 MPa, 15 m / 5 m, particle ≤2 mm. Quote only.',
      '河北品锦机械在中国邢台生产 311 砂浆喷涂机。印刷数据：220/380V、4 kW、2 m³/h、3–5 MPa、15 m / 5 m、粒径 ≤2 mm。询价报价。',
    ),
    geo: buildGeo(
      'Mortar Spraying Machine',
      '砂浆喷涂机',
      L(
        'A Type 311 mortar spraying machine listed on the Hebei Pinjin Machinery printed table and manufactured in Xingtai, China.',
        '河北品锦机械印刷表中的 311 砂浆喷涂机，在中国邢台制造。',
      ),
      L(
        'Contractors matching 2 m³/h, ≤2 mm particle and 220/380 V to a short mortar spray.',
        '需要按 2 m³/h、粒径 ≤2 mm 与 220/380V 对照短距离砂浆喷涂的承包商。',
      ),
      L(
        'Fine-mortar jobs whose hose length stays inside 15 m / 5 m.',
        '软管长度落在 15 m / 5 m 内的细砂浆喷涂工地。',
      ),
      L(
        'Factory-direct Xingtai compact sprayer with a printed 4 kW / 2 m³/h table.',
        '邢台工厂直供紧凑喷涂机，印刷表公开 4 kW / 2 m³/h。',
      ),
    ),
    directAnswer: L(
      'Type 311 is a Xingtai mortar spraying machine listing 220/380 V, 4 kW, 2 m³/h, 3–5 MPa, 25 mm hose, particle ≤2 mm and 15 m / 5 m. It is not Type 511 (7.5 kW, 3 m³/h), not the double-cylinder plunger 4 m³/h / 8 MPa unit, not M9 plaster and not a trailer concrete pump. Quote only.',
      '311 是邢台砂浆喷涂机，印刷为 220/380V、4 kW、2 m³/h、3–5 MPa、管径 25 mm、粒径 ≤2 mm、15 m / 5 m。它不是 511（7.5 kW、3 m³/h），不是双缸柱塞 4 m³/h / 8 MPa 机，不是 M9 石膏机，也不是拖式混凝土泵。询价报价。',
    ),
    notSuitable: [
      L('Not a trailer concrete pump, mixing plant or truck-mounted boom pump.', '不是拖式混凝土泵、搅拌站或车载臂架泵。'),
      L('Not Type 511 (7.5 kW, 3 m³/h, 30 m / 15 m, particle ≤6 mm).', '不是 511（7.5 kW、3 m³/h、30 m / 15 m、粒径 ≤6 mm）。'),
      L('Not the double-cylinder plunger machine (9/11 kW, 4 m³/h, 8 MPa, 100 m / 40 m).', '不是双缸柱塞机（9/11 kW、4 m³/h、8 MPa、100 m / 40 m）。'),
      L('Not for particle sizes above the printed ≤2 mm row.', '粒径超过印刷表 ≤2 mm 时不适用。'),
    ],
    howToSelect: L(
      'Confirm 220/380 V, 2 m³/h, 3–5 MPa, 25 mm hose, particle ≤2 mm and 15 m / 5 m against this printed table. Larger particle or longer hose → Type 511 or the double-cylinder plunger machine. Plaster at ≤4 mm → M9. Then inquire.',
      '对照本页印刷表确认 220/380V、2 m³/h、3–5 MPa、管径 25 mm、粒径 ≤2 mm 与 15 m / 5 m。更大粒径或更长软管 → 511 或双缸柱塞机。粒径 ≤4 mm 石膏 → M9。然后再询盘。',
    ),
  },
  {
    id: 'sm-07',
    name: L('Type 511 Mortar Spraying Machine', '511砂浆喷涂机'),
    slug: 'type-511-mortar-spraying-machine',
    category: 'spraying-machine',
    inquiryOnly: true,
    ...imgPaths('type-511-mortar-spraying-machine'),
    shortDescription: L(
      'Type 511 mortar spraying machine from the Xingtai printed table — 380 V, 7.5 kW, 3 m³/h, 3–5 MPa, 30 m horizontal / 15 m vertical, particle ≤6 mm, 260 kg.',
      '邢台印刷表 511 砂浆喷涂机：380V、7.5 kW、3 m³/h、3–5 MPa、水平 30 m / 垂直 15 m、粒径 ≤6 mm、机重 260 kg。',
    ),
    productIntroduction: L(
      'Type 511 Mortar Spraying Machine is a 380 V mortar spraying machine manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. Printed parameters: power 380 V, motor 7.5 kW, output 3 m³/h, 3–5 MPa, hose 32/38 mm, sand-cement ratio ≤1:3, particle ≤6 mm, 30 m horizontal / 15 m vertical, 1700 × 550 × 900 mm, 260 kg.',
      '511砂浆喷涂机由河北品锦机械在中国河北邢台制造，380V。印刷参数：电源 380V、电机 7.5 kW、输送量 3 m³/h、3–5 MPa、管径 32/38 mm、砂灰比 ≤1:3、粒径 ≤6 mm、水平 30 m / 垂直 15 m、外形 1700 × 550 × 900 mm、机重 260 kg。',
    ),
    applicationScenarios: [
      L('Mortar spraying inside 3 m³/h and ≤6 mm particle', '3 m³/h 与粒径 ≤6 mm 内的砂浆喷涂'),
      L('Hose runs inside 30 m horizontal / 15 m vertical', '软管距离落在水平 30 m / 垂直 15 m 内'),
      L('Sites that can supply 380 V for the listed 7.5 kW motor', '能按目录 7.5 kW 提供 380V 的工地'),
    ],
    keyFeatures: [
      L('Output 3 m³/h', '输送量 3 m³/h'),
      L('Motor 7.5 kW, 380 V', '电机 7.5 kW，380V'),
      L('Weight 260 kg', '整机重量 260 kg'),
    ],
    specifications: [
      spec('Model', '型号', 'Type 511'),
      specLoc('Power Supply', '电源', '380 V', '380V'),
      spec('Motor Power', '电机功率', '7.5 kW'),
      spec('Output Capacity', '理论输送量', '3 m³/h'),
      spec('Max. Outlet Pressure', '最大出口压力', '3–5 MPa'),
      spec('Delivery Distance (H / V)', '输送距离（水平/垂直）', '30 m / 15 m'),
      spec('Hose Diameter', '管径', '32/38 mm'),
      spec('Max. Particle Size', '最大粒径', '≤6 mm'),
      specLoc('Sand-Cement Ratio', '砂灰比', '≤1:3', '≤1:3'),
      spec('Dimensions (L×W×H)', '外形尺寸', '1700 × 550 × 900 mm'),
      spec('Main Unit Weight', '整机重量', '260 kg'),
    ],
    seo: buildSeo(
      'Type 511 Mortar Spraying Machine',
      '511砂浆喷涂机',
      'type 511 mortar spraying machine manufacturer China',
      [
        '511 mortar spraying machine China factory',
        '7.5 kW mortar sprayer 380V',
        'Xingtai type 511 mortar spraying machine',
      ],
      [
        'buy type 511 mortar spraying machine from Hebei Pinjin Machinery Xingtai',
        '3 m3/h type 511 mortar spraying machine China factory',
      ],
      'Hebei Pinjin Machinery manufactures the Type 511 mortar spraying machine in Xingtai. Printed data: 380 V, 7.5 kW, 3 m³/h, 3–5 MPa, 30 m / 15 m, particle ≤6 mm. Quote only.',
      '河北品锦机械在中国邢台生产 511 砂浆喷涂机。印刷数据：380V、7.5 kW、3 m³/h、3–5 MPa、30 m / 15 m、粒径 ≤6 mm。询价报价。',
    ),
    geo: buildGeo(
      'Mortar Spraying Machine',
      '砂浆喷涂机',
      L(
        'A Type 511 mortar spraying machine listed on the Hebei Pinjin Machinery printed table and manufactured in Xingtai, China.',
        '河北品锦机械印刷表中的 511 砂浆喷涂机，在中国邢台制造。',
      ),
      L(
        'Contractors matching 3 m³/h, ≤6 mm particle and 380 V to a mortar spraying job.',
        '需要按 3 m³/h、粒径 ≤6 mm 与 380V 对照砂浆喷涂工况的承包商。',
      ),
      L(
        'Mortar spraying jobs whose hose length stays inside 30 m / 15 m.',
        '软管长度落在 30 m / 15 m 内的砂浆喷涂工地。',
      ),
      L(
        'Factory-direct Xingtai manufacturer with a printed 7.5 kW / 3 m³/h table.',
        '邢台工厂直供，印刷表公开 7.5 kW / 3 m³/h。',
      ),
    ),
    directAnswer: L(
      'Type 511 is a Xingtai mortar spraying machine listing 380 V, 7.5 kW, 3 m³/h, 3–5 MPa, hose 32/38 mm, particle ≤6 mm and 30 m / 15 m. It is not Type 311 (4 kW, 2 m³/h, ≤2 mm), not the double-cylinder plunger 4 m³/h / 8 MPa unit, not M9 plaster and not a trailer concrete pump. Quote only.',
      '511 是邢台砂浆喷涂机，印刷为 380V、7.5 kW、3 m³/h、3–5 MPa、管径 32/38 mm、粒径 ≤6 mm、30 m / 15 m。它不是 311（4 kW、2 m³/h、≤2 mm），不是双缸柱塞 4 m³/h / 8 MPa 机，不是 M9 石膏机，也不是拖式混凝土泵。询价报价。',
    ),
    notSuitable: [
      L('Not a trailer concrete pump, mixing plant or truck-mounted boom pump.', '不是拖式混凝土泵、搅拌站或车载臂架泵。'),
      L('Not Type 311 (4 kW, 2 m³/h, 15 m / 5 m, particle ≤2 mm).', '不是 311（4 kW、2 m³/h、15 m / 5 m、粒径 ≤2 mm）。'),
      L('Not the double-cylinder plunger machine (9/11 kW, 4 m³/h, 8 MPa, 100 m / 40 m).', '不是双缸柱塞机（9/11 kW、4 m³/h、8 MPa、100 m / 40 m）。'),
      L('Not for sites that cannot supply 380 V for the listed 7.5 kW motor.', '现场无法按目录 7.5 kW 提供 380V 时不适用。'),
    ],
    howToSelect: L(
      'Confirm 380 V, 3 m³/h, 3–5 MPa, hose 32/38 mm, particle ≤6 mm and 30 m / 15 m against this printed table. Finer ≤2 mm / 2 m³/h → Type 311. 4 m³/h / 8 MPa / 100 m → double-cylinder plunger. Plaster at ≤4 mm → M9. Then inquire.',
      '对照本页印刷表确认 380V、3 m³/h、3–5 MPa、管径 32/38 mm、粒径 ≤6 mm 与 30 m / 15 m。更细 ≤2 mm / 2 m³/h → 311。4 m³/h / 8 MPa / 100 m → 双缸柱塞机。粒径 ≤4 mm 石膏 → M9。然后再询盘。',
    ),
  },
];
