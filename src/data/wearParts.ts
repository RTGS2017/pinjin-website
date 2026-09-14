import {
  isProductStudioImage,
  productDetailImages,
  productDisplayImages,
} from '@/data/imageInventory';
import type { Product, ProductGeo, ProductSeo, ProductSpec } from '@/data/products';
import type { LocalizedText } from '@/i18n/types';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });
const SET = L('set', '套');
const PC = L('piece', '个');

function imgPaths(slug: string) {
  const gallery = productDisplayImages(slug);
  const image =
    gallery.find((path) => isProductStudioImage(path, slug)) ??
    gallery[0] ??
    `/images/products/${slug}/${slug}.webp`;
  return { image, gallery: productDetailImages(slug) };
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
    title: L(
      `${nameEn} Manufacturer China | Pinjin Machinery`,
      `${nameZh}厂家 | 品锦机械`,
    ),
    description: L(descEn, descZh),
    keywords: { primary, secondary, longTail },
  };
}

function buildGeo(
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
    productCategory: L('Concrete Pump Wear Parts', '混凝土泵易损件'),
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
        'Request a quote by email or WhatsApp. Include the part name, outer diameter or kit size, and quantity. Confirm the size on the pump. These are Xingtai replacement wear parts, not OEM parts of other pump brands. Not sold in small batches; no published list price.',
        '请通过邮件或 WhatsApp 询价，并注明配件名称、外径或套件尺寸与数量。请先在泵上核对尺寸。邢台替换易损件，不是其他泵品牌的原厂件。不支持小批量发货，也没有公开标价。',
      ),
    },
  };
}

const TERMS = specLoc(
  'Commercial terms',
  '商务条款',
  'No small-batch shipping; no published list price. Confirm OD / kit on the pump. Replacement wear parts, not OEM branded parts.',
  '不支持小批量发货；无公开标价。请在泵上核对外径/套件。替换易损件，不是其他品牌原厂件。',
);

function sizes(
  rows: Array<{ size: string; formEn: string; formZh: string; unit?: LocalizedText }>,
) {
  return rows.map((row) => ({
    size: row.size,
    form: L(row.formEn, row.formZh),
    unit: row.unit ?? SET,
  }));
}

export const wearPartProducts: Product[] = [
  {
    id: '28',
    name: L('Concrete Pump Split Piston', '混凝土泵分体活塞'),
    slug: 'concrete-pump-split-piston',
    category: 'spare-parts',
    inquiryOnly: true,
    partKind: 'wear',
    ...imgPaths('concrete-pump-split-piston'),
    shortDescription: L(
      'Split rubber, rubber-cloth and polyurethane pistons for S-valve concrete pumps. Catalogue outer diameters φ150–φ280, quoted by size and quantity. Confirm the OD on the pump. Not sold in small batches; no published list price.',
      'S阀混凝土泵用橡胶、橡胶夹布与聚氨酯分体活塞。目录外径 φ150–φ280，按尺寸与数量报价。请在泵上核对外径。不支持小批量发货，无公开标价。',
    ),
    productIntroduction: L(
      'Concrete Pump Split Piston is a wear replacement part supplied by Hebei Pinjin Machinery from Xingtai, Hebei, China. The factory wear-part catalogue lists split pistons as sets in rubber, rubber-cloth and polyurethane, with outer diameters φ150, φ180, φ195, φ200, φ220, φ230, φ250, φ260 and φ280. These are replacement parts for S-valve concrete pumps. Confirm the outer diameter on the machine before ordering. They are not OEM parts of other pump brands. Quote only; not sold in small batches; no published list price.',
      '混凝土泵分体活塞由河北品锦机械在中国河北邢台供应，属于S阀混凝土泵易损替换件。工厂易损件目录列出橡胶、橡胶夹布与聚氨酯分体活塞，外径 φ150、φ180、φ195、φ200、φ220、φ230、φ250、φ260、φ280，按套供货。下单前请在泵上核对外径。不是其他泵品牌的原厂件。询价报价，不支持小批量发货，无公开标价。',
    ),
    applicationScenarios: [
      L('S-valve concrete pump piston replacement', 'S阀混凝土泵活塞更换'),
      L('Wear-ring sets matched to published OD', '按已公布外径匹配的易损圈套件'),
      L('Project quantities, not small-batch parcels', '工程用量，非整件小包裹'),
    ],
    keyFeatures: [
      L('Split piston sets: rubber, rubber-cloth, polyurethane', '分体活塞：橡胶、橡胶夹布、聚氨酯'),
      L('Catalogue OD φ150–φ280', '目录外径 φ150–φ280'),
      L('Quote by size and quantity; no list price', '按尺寸与数量报价，无公开标价'),
    ],
    specifications: [
      specLoc('Part type', '配件类型', 'Split piston set for S-valve concrete pumps', 'S阀混凝土泵分体活塞套件'),
      specLoc('Materials listed', '目录材料', 'Rubber, rubber-cloth, polyurethane', '橡胶、橡胶夹布、聚氨酯'),
      specLoc('Outer diameters listed', '已列外径', 'φ150 / 180 / 195 / 200 / 220 / 230 / 250 / 260 / 280', 'φ150 / 180 / 195 / 200 / 220 / 230 / 250 / 260 / 280'),
      specLoc('Unit', '单位', 'Set', '套'),
      TERMS,
    ],
    catalogSizes: sizes([
      { size: 'φ150', formEn: 'Rubber split piston', formZh: '橡胶分体活塞' },
      { size: 'φ180', formEn: 'Rubber split piston', formZh: '橡胶分体活塞' },
      { size: 'φ180', formEn: 'Polyurethane split piston', formZh: '聚氨酯分体活塞' },
      { size: 'φ195', formEn: 'Polyurethane split piston', formZh: '聚氨酯分体活塞' },
      { size: 'φ200', formEn: 'Rubber / rubber-cloth / polyurethane split piston', formZh: '橡胶 / 橡胶夹布 / 聚氨酯分体活塞' },
      { size: 'φ220', formEn: 'Polyurethane split piston', formZh: '聚氨酯分体活塞' },
      { size: 'φ230', formEn: 'Rubber / rubber-cloth / polyurethane split piston', formZh: '橡胶 / 橡胶夹布 / 聚氨酯分体活塞' },
      { size: 'φ250', formEn: 'Rubber split piston', formZh: '橡胶分体活塞' },
      { size: 'φ260', formEn: 'Rubber / rubber-cloth / polyurethane split piston', formZh: '橡胶 / 橡胶夹布 / 聚氨酯分体活塞' },
      { size: 'φ280', formEn: 'Rubber split piston', formZh: '橡胶分体活塞' },
    ]),
    seo: buildSeo(
      'Concrete Pump Split Piston',
      '混凝土泵分体活塞',
      'concrete pump split piston manufacturer China',
      [
        'S-valve concrete pump piston set',
        'rubber split piston φ200 φ230',
        'Xingtai concrete pump wear parts',
      ],
      [
        'buy concrete pump split piston from Hebei Pinjin Machinery Xingtai',
        'polyurethane rubber cloth split piston replacement China factory',
      ],
      'Hebei Pinjin Machinery supplies concrete pump split pistons from Xingtai, Hebei, China. Rubber, rubber-cloth and polyurethane sets, catalogue OD φ150–φ280. Confirm size on the pump. Quote only; not sold in small batches.',
      '河北品锦机械在中国河北邢台供应混凝土泵分体活塞。橡胶、橡胶夹布与聚氨酯套件，目录外径 φ150–φ280。请在泵上核对尺寸。询价报价，不支持小批量发货。',
    ),
    geo: buildGeo(
      L(
        'A split piston set used on S-valve concrete pumps, supplied from Xingtai, China, in rubber, rubber-cloth and polyurethane with published outer diameters.',
        'S阀混凝土泵用分体活塞套件，由中国邢台供应，材料为橡胶、橡胶夹布与聚氨酯，目录公布外径。',
      ),
      L(
        'Service teams replacing worn S-valve pistons after matching the outer diameter on the pump.',
        '需要在泵上核对外径后更换S阀活塞的维保团队。',
      ),
      L(
        'Concrete pump pipelines and S-valve housings whose piston OD matches a listed size.',
        '活塞外径落在已列尺寸内的混凝土泵管路与S阀腔。',
      ),
      L(
        'Xingtai replacement sets with published OD table. Not OEM branded parts. Quote after size and quantity are confirmed.',
        '邢台替换套件，目录公布外径。不是其他品牌原厂件。确认尺寸与数量后报价。',
      ),
    ),
  },
  {
    id: '29',
    name: L('Concrete Pump Integral Piston', '混凝土泵整体活塞'),
    slug: 'concrete-pump-integral-piston',
    category: 'spare-parts',
    inquiryOnly: true,
    partKind: 'wear',
    ...imgPaths('concrete-pump-integral-piston'),
    shortDescription: L(
      'One-piece concrete pump pistons from the Xingtai wear-part catalogue. Listed outer diameters include φ150, φ180, φ195, φ200, φ205, φ210, φ220, φ225, φ230 and φ250. Confirm OD on the pump. Quote only; no small-batch shipping.',
      '邢台易损件目录中的整体混凝土泵活塞。已列外径含 φ150、φ180、φ195、φ200、φ205、φ210、φ220、φ225、φ230、φ250。请在泵上核对外径。询价报价，不支持小批量发货。',
    ),
    productIntroduction: L(
      'Concrete Pump Integral Piston is a one-piece wear replacement part supplied by Hebei Pinjin Machinery from Xingtai, Hebei, China. The factory catalogue lists integral pistons sold per piece at outer diameters φ150, φ160, φ180, φ195, φ200, φ205, φ210, φ220, φ225, φ230 and φ250. Confirm the outer diameter on the concrete pump before ordering. These are replacement parts, not OEM parts of other pump brands. Quote only; not sold in small batches; no published list price.',
      '混凝土泵整体活塞由河北品锦机械在中国河北邢台供应，按个供货。工厂目录列出外径 φ150、φ160、φ180、φ195、φ200、φ205、φ210、φ220、φ225、φ230、φ250。下单前请在混凝土泵上核对外径。替换件，不是其他泵品牌原厂件。询价报价，不支持小批量发货，无公开标价。',
    ),
    applicationScenarios: [
      L('One-piece S-valve piston replacement', '整体式S阀活塞更换'),
      L('Matching a listed outer diameter on the pump', '对照泵上已列外径'),
      L('Project quantities, not small-batch parcels', '工程用量，非整件小包裹'),
    ],
    keyFeatures: [
      L('Integral (one-piece) piston', '整体活塞'),
      L('Catalogue OD φ150–φ250', '目录外径 φ150–φ250'),
      L('Sold per piece; quote by size', '按个供货，按尺寸报价'),
    ],
    specifications: [
      specLoc('Part type', '配件类型', 'Integral / one-piece concrete pump piston', '整体混凝土泵活塞'),
      specLoc('Outer diameters listed', '已列外径', 'φ150 / 160 / 180 / 195 / 200 / 205 / 210 / 220 / 225 / 230 / 250', 'φ150 / 160 / 180 / 195 / 200 / 205 / 210 / 220 / 225 / 230 / 250'),
      specLoc('Unit', '单位', 'Piece', '个'),
      TERMS,
    ],
    catalogSizes: sizes([
      { size: 'φ150', formEn: 'Integral piston', formZh: '整体活塞', unit: PC },
      { size: 'φ160', formEn: 'Integral piston', formZh: '整体活塞', unit: PC },
      { size: 'φ180', formEn: 'Integral piston', formZh: '整体活塞', unit: PC },
      { size: 'φ195', formEn: 'Integral piston', formZh: '整体活塞', unit: PC },
      { size: 'φ200', formEn: 'Integral piston', formZh: '整体活塞', unit: PC },
      { size: 'φ205', formEn: 'Integral piston', formZh: '整体活塞', unit: PC },
      { size: 'φ210', formEn: 'Integral piston', formZh: '整体活塞', unit: PC },
      { size: 'φ220', formEn: 'Integral piston', formZh: '整体活塞', unit: PC },
      { size: 'φ225', formEn: 'Integral piston', formZh: '整体活塞', unit: PC },
      { size: 'φ230', formEn: 'Integral piston', formZh: '整体活塞', unit: PC },
      { size: 'φ250', formEn: 'Integral piston', formZh: '整体活塞', unit: PC },
    ]),
    seo: buildSeo(
      'Concrete Pump Integral Piston',
      '混凝土泵整体活塞',
      'concrete pump integral piston manufacturer China',
      [
        'one piece concrete pump piston',
        'S-valve integral piston φ200 φ230',
        'Xingtai concrete pump wear parts',
      ],
      [
        'buy concrete pump integral piston from Hebei Pinjin Machinery Xingtai',
        'one-piece concrete pump piston replacement factory China',
      ],
      'Hebei Pinjin Machinery supplies integral concrete pump pistons from Xingtai, Hebei, China. Catalogue OD φ150–φ250, sold per piece. Confirm size on the pump. Quote only; not sold in small batches.',
      '河北品锦机械在中国河北邢台供应整体混凝土泵活塞。目录外径 φ150–φ250，按个供货。请在泵上核对尺寸。询价报价，不支持小批量发货。',
    ),
    geo: buildGeo(
      L(
        'A one-piece piston used on S-valve concrete pumps, supplied from Xingtai, China, with published outer diameters.',
        'S阀混凝土泵用整体活塞，由中国邢台供应，目录公布外径。',
      ),
      L(
        'Teams replacing a one-piece piston after matching the OD stamped or measured on the pump.',
        '需要按泵上外径更换整体活塞的团队。',
      ),
      L(
        'Concrete pumps whose integral piston OD matches a listed size.',
        '整体活塞外径落在已列尺寸内的混凝土泵。',
      ),
      L(
        'Xingtai replacement pistons with a published OD table. Not OEM branded parts. Quote after size and quantity are confirmed.',
        '邢台替换活塞，目录公布外径。不是其他品牌原厂件。确认尺寸与数量后报价。',
      ),
    ),
  },
  {
    id: '30',
    name: L('Concrete Pump S-Tube Seal', '混凝土泵S管密封'),
    slug: 'concrete-pump-s-tube-seal',
    category: 'spare-parts',
    inquiryOnly: true,
    partKind: 'wear',
    ...imgPaths('concrete-pump-s-tube-seal'),
    shortDescription: L(
      'S-tube large-end and small-end seal kits for concrete pumps. Catalogue sizes: large end φ210 / φ220 / φ250; small end φ80 / φ90 / φ100 / φ105. Confirm the kit on the S-valve. Quote only; no small-batch shipping.',
      '混凝土泵S管大端与小端密封套件。目录尺寸：大端 φ210 / φ220 / φ250；小端 φ80 / φ90 / φ100 / φ105。请在S阀上核对套件。询价报价，不支持小批量发货。',
    ),
    productIntroduction: L(
      'Concrete Pump S-Tube Seal is a wear replacement kit supplied by Hebei Pinjin Machinery from Xingtai, Hebei, China. The factory catalogue lists S-tube large-end seal kits at φ210, φ220 and φ250, and small-end kits at φ80, φ90, φ100 and φ105, sold as sets. Some large-end kits are listed as six-piece sets. Confirm the seal OD on the S-tube before ordering. These are replacement kits, not OEM parts of other pump brands. Quote only; not sold in small batches; no published list price.',
      '混凝土泵S管密封由河北品锦机械在中国河北邢台供应。工厂目录列出S管大端密封套件 φ210、φ220、φ250，小端套件 φ80、φ90、φ100、φ105，按套供货；部分大端为六件套。下单前请在S管上核对密封外径。替换套件，不是其他泵品牌原厂件。询价报价，不支持小批量发货，无公开标价。',
    ),
    applicationScenarios: [
      L('S-tube large-end seal replacement', 'S管大端密封更换'),
      L('S-tube small-end seal replacement', 'S管小端密封更换'),
      L('Project quantities, not small-batch parcels', '工程用量，非整件小包裹'),
    ],
    keyFeatures: [
      L('Large-end and small-end S-tube kits', 'S管大端与小端套件'),
      L('Large end φ210 / 220 / 250; small end φ80–105', '大端 φ210 / 220 / 250；小端 φ80–105'),
      L('Quote by kit size; no list price', '按套件尺寸报价，无公开标价'),
    ],
    specifications: [
      specLoc('Part type', '配件类型', 'S-tube large-end and small-end seal kit', 'S管大端与小端密封套件'),
      specLoc('Large-end sizes listed', '已列大端尺寸', 'φ210 / φ220 / φ250 (set; some six-piece)', 'φ210 / φ220 / φ250（套；部分为六件套）'),
      specLoc('Small-end sizes listed', '已列小端尺寸', 'φ80 / φ90 / φ100 / φ105', 'φ80 / φ90 / φ100 / φ105'),
      specLoc('Unit', '单位', 'Set', '套'),
      TERMS,
    ],
    catalogSizes: sizes([
      { size: 'φ210', formEn: 'S-tube large-end seal kit', formZh: 'S管大端密封套件' },
      { size: 'φ220', formEn: 'S-tube large-end seal kit (including six-piece kits)', formZh: 'S管大端密封套件（含六件套）' },
      { size: 'φ250', formEn: 'S-tube large-end seal kit', formZh: 'S管大端密封套件' },
      { size: 'φ80', formEn: 'S-tube small-end seal kit', formZh: 'S管小端密封套件' },
      { size: 'φ90', formEn: 'S-tube small-end seal kit', formZh: 'S管小端密封套件' },
      { size: 'φ100', formEn: 'S-tube small-end seal kit', formZh: 'S管小端密封套件' },
      { size: 'φ105', formEn: 'S-tube small-end seal kit', formZh: 'S管小端密封套件' },
    ]),
    seo: buildSeo(
      'Concrete Pump S-Tube Seal',
      '混凝土泵S管密封',
      'concrete pump S-tube seal manufacturer China',
      [
        'S-valve large end seal kit',
        'concrete pump small end seal φ80 φ90',
        'Xingtai concrete pump wear parts',
      ],
      [
        'buy concrete pump S-tube seal kit from Hebei Pinjin Machinery Xingtai',
        'S-tube big end small end seal replacement factory China',
      ],
      'Hebei Pinjin Machinery supplies concrete pump S-tube seal kits from Xingtai, Hebei, China. Large end φ210 / 220 / 250; small end φ80–105. Confirm size on the S-valve. Quote only; not sold in small batches.',
      '河北品锦机械在中国河北邢台供应混凝土泵S管密封套件。大端 φ210 / 220 / 250，小端 φ80–105。请在S阀上核对尺寸。询价报价，不支持小批量发货。',
    ),
    geo: buildGeo(
      L(
        'Seal kits for the large and small ends of a concrete pump S-tube, supplied from Xingtai, China, with published sizes.',
        '混凝土泵S管大端与小端密封套件，由中国邢台供应，目录公布尺寸。',
      ),
      L(
        'Service teams replacing leaking S-tube seals after matching the kit size on the valve.',
        '需要按S阀套件尺寸更换泄漏密封的维保团队。',
      ),
      L(
        'S-valve concrete pumps whose large-end or small-end seal matches a listed size.',
        '大端或小端密封尺寸落在已列范围内的S阀混凝土泵。',
      ),
      L(
        'Xingtai replacement kits with a published size table. Not OEM branded parts. Quote after kit size and quantity are confirmed.',
        '邢台替换套件，目录公布尺寸。不是其他品牌原厂件。确认套件尺寸与数量后报价。',
      ),
    ),
  },
  {
    id: '31',
    name: L('Concrete Pump Mixing Seal', '混凝土泵搅拌密封'),
    slug: 'concrete-pump-mixing-seal',
    category: 'spare-parts',
    inquiryOnly: true,
    partKind: 'wear',
    ...imgPaths('concrete-pump-mixing-seal'),
    shortDescription: L(
      'Mixing-shaft seal kits for concrete pumps and mixer pumps. Catalogue listings include φ65 and φ80 sets plus generational mixer-seal kits. Confirm the kit on the mixer. Quote only; no small-batch shipping.',
      '混凝土泵与搅拌泵用搅拌轴密封套件。目录含 φ65、φ80 套件及分代搅拌密封套件。请在搅拌装置上核对。询价报价，不支持小批量发货。',
    ),
    productIntroduction: L(
      'Concrete Pump Mixing Seal is a wear replacement kit supplied by Hebei Pinjin Machinery from Xingtai, Hebei, China. The factory catalogue lists mixing-seal sets at φ65 and φ80, plus mixer-seal kits identified by generation (first to fourth generation and an upper-pump kit) where no extra OD is printed. Confirm the seal on the mixer housing before ordering. These are replacement kits, not OEM parts of other pump brands. Quote only; not sold in small batches; no published list price.',
      '混凝土泵搅拌密封由河北品锦机械在中国河北邢台供应。工厂目录列出 φ65、φ80 搅拌密封套件，以及按代际列出的搅拌密封套件（第一代至第四代、上泵套件，未另印外径）。下单前请在搅拌腔核对密封。替换套件，不是其他泵品牌原厂件。询价报价，不支持小批量发货，无公开标价。',
    ),
    applicationScenarios: [
      L('Mixer-shaft seal replacement on mixer pumps', '搅拌泵搅拌轴密封更换'),
      L('Agitator seal kits on trailer concrete pumps', '拖泵搅拌密封套件'),
      L('Project quantities, not small-batch parcels', '工程用量，非整件小包裹'),
    ],
    keyFeatures: [
      L('Mixing / agitator seal kits', '搅拌密封套件'),
      L('Listed φ65 and φ80 plus generation kits', '已列 φ65、φ80 及分代套件'),
      L('Quote by kit; no list price', '按套件报价，无公开标价'),
    ],
    specifications: [
      specLoc('Part type', '配件类型', 'Mixing / agitator seal kit', '搅拌密封套件'),
      specLoc('Sizes listed', '已列尺寸', 'φ65 / φ80 / generation kits (1st–4th, upper-pump)', 'φ65 / φ80 / 分代套件（第一至第四代、上泵）'),
      specLoc('Unit', '单位', 'Set', '套'),
      TERMS,
    ],
    catalogSizes: sizes([
      { size: 'φ65', formEn: 'Mixing seal kit', formZh: '搅拌密封套件' },
      { size: 'φ80', formEn: 'Mixing seal kit', formZh: '搅拌密封套件' },
      { size: '—', formEn: 'Mixer seal kit, 1st generation', formZh: '搅拌密封套件，第一代' },
      { size: '—', formEn: 'Mixer seal kit, 2nd generation', formZh: '搅拌密封套件，第二代' },
      { size: '—', formEn: 'Mixer seal kit, 3rd generation', formZh: '搅拌密封套件，第三代' },
      { size: '—', formEn: 'Mixer seal kit, 4th generation', formZh: '搅拌密封套件，第四代' },
      { size: '—', formEn: 'Upper-pump mixing seal kit', formZh: '上泵搅拌密封套件' },
    ]),
    seo: buildSeo(
      'Concrete Pump Mixing Seal',
      '混凝土泵搅拌密封',
      'concrete pump mixing seal manufacturer China',
      [
        'mixer pump agitator seal kit',
        'concrete pump mixing shaft seal φ80',
        'Xingtai concrete pump wear parts',
      ],
      [
        'buy concrete pump mixing seal from Hebei Pinjin Machinery Xingtai',
        'mixer pump agitator seal replacement factory China',
      ],
      'Hebei Pinjin Machinery supplies concrete pump mixing seals from Xingtai, Hebei, China. Catalogue kits φ65 / φ80 and generation mixer-seal sets. Confirm the kit on the mixer. Quote only; not sold in small batches.',
      '河北品锦机械在中国河北邢台供应混凝土泵搅拌密封。目录套件 φ65 / φ80 及分代搅拌密封。请在搅拌装置上核对。询价报价，不支持小批量发货。',
    ),
    geo: buildGeo(
      L(
        'A mixing-shaft / agitator seal kit for concrete pumps and mixer pumps, supplied from Xingtai, China.',
        '混凝土泵与搅拌泵用搅拌轴密封套件，由中国邢台供应。',
      ),
      L(
        'Teams replacing a leaking mixer seal after matching φ65, φ80 or the generation kit on the housing.',
        '需要按 φ65、φ80 或分代套件更换泄漏搅拌密封的团队。',
      ),
      L(
        'Mixer pumps and trailer pumps whose agitator seal matches a listed kit.',
        '搅拌密封套件落在已列范围内的搅拌泵与拖泵。',
      ),
      L(
        'Xingtai replacement kits. Not OEM branded parts. Quote after the kit identity and quantity are confirmed.',
        '邢台替换套件。不是其他品牌原厂件。确认套件与数量后报价。',
      ),
    ),
  },
  {
    id: '32',
    name: L('Concrete Pump Main Cylinder Seal', '混凝土泵主油缸密封'),
    slug: 'concrete-pump-main-cylinder-seal',
    category: 'spare-parts',
    inquiryOnly: true,
    partKind: 'wear',
    ...imgPaths('concrete-pump-main-cylinder-seal'),
    shortDescription: L(
      'Main-cylinder seal kits for concrete pumps. Catalogue sizes include φ63, φ80, 80×125, 90×140, 90–160, 95×140, 100×150 and kit 461K. Confirm the kit against the cylinder. Quote only; no small-batch shipping.',
      '混凝土泵主油缸密封套件。目录尺寸含 φ63、φ80、80×125、90×140、90–160、95×140、100×150 与 461K。请对照油缸核对套件。询价报价，不支持小批量发货。',
    ),
    productIntroduction: L(
      'Concrete Pump Main Cylinder Seal is a hydraulic wear kit supplied by Hebei Pinjin Machinery from Xingtai, Hebei, China. The factory catalogue lists main-cylinder seal sets at φ63, φ80, 80×125, 90×140, 90–160, 95×140, 100×150 and a kit marked 461K. Confirm the kit against the cylinder bore/rod before ordering. These are replacement kits, not OEM parts of other pump brands. Quote only; not sold in small batches; no published list price.',
      '混凝土泵主油缸密封由河北品锦机械在中国河北邢台供应。工厂目录列出 φ63、φ80、80×125、90×140、90–160、95×140、100×150 及 461K 套件。下单前请对照油缸缸径/活塞杆核对。替换套件，不是其他泵品牌原厂件。询价报价，不支持小批量发货，无公开标价。',
    ),
    applicationScenarios: [
      L('Main pumping-cylinder seal replacement', '主油缸密封更换'),
      L('Hydraulic kit matched to a listed size', '按已列尺寸匹配的液压套件'),
      L('Project quantities, not small-batch parcels', '工程用量，非整件小包裹'),
    ],
    keyFeatures: [
      L('Main-cylinder seal kits', '主油缸密封套件'),
      L('Listed φ63–φ80 and 80×125 to 100×150 / 461K', '已列 φ63–φ80 及 80×125 至 100×150 / 461K'),
      L('Quote by kit; no list price', '按套件报价，无公开标价'),
    ],
    specifications: [
      specLoc('Part type', '配件类型', 'Main cylinder / master cylinder seal kit', '主油缸密封套件'),
      specLoc(
        'Sizes listed',
        '已列尺寸',
        'φ63 / φ80 / 80×125 / 90×140 / 90–160 / 95×140 / 100×150 / 461K',
        'φ63 / φ80 / 80×125 / 90×140 / 90–160 / 95×140 / 100×150 / 461K',
      ),
      specLoc('Unit', '单位', 'Set', '套'),
      TERMS,
    ],
    catalogSizes: sizes([
      { size: 'φ63', formEn: 'Main cylinder seal kit', formZh: '主油缸密封套件' },
      { size: 'φ80', formEn: 'Main cylinder seal kit', formZh: '主油缸密封套件' },
      { size: '80×125', formEn: 'Main cylinder seal kit', formZh: '主油缸密封套件' },
      { size: '90×140', formEn: 'Main cylinder seal kit', formZh: '主油缸密封套件' },
      { size: '90–160', formEn: 'Main cylinder seal kit', formZh: '主油缸密封套件' },
      { size: '95×140', formEn: 'Main cylinder seal kit', formZh: '主油缸密封套件' },
      { size: '100×150', formEn: 'Main cylinder seal kit', formZh: '主油缸密封套件' },
      { size: '461K', formEn: 'Main cylinder seal kit', formZh: '主油缸密封套件' },
    ]),
    seo: buildSeo(
      'Concrete Pump Main Cylinder Seal',
      '混凝土泵主油缸密封',
      'concrete pump main cylinder seal manufacturer China',
      [
        'concrete pump master cylinder seal kit',
        'hydraulic seal 80x125 90x140 concrete pump',
        'Xingtai concrete pump wear parts',
      ],
      [
        'buy concrete pump main cylinder seal from Hebei Pinjin Machinery Xingtai',
        'concrete pump hydraulic cylinder seal kit factory China',
      ],
      'Hebei Pinjin Machinery supplies concrete pump main-cylinder seal kits from Xingtai, Hebei, China. Catalogue sizes φ63, φ80, 80×125 to 100×150 and 461K. Confirm the kit on the cylinder. Quote only; not sold in small batches.',
      '河北品锦机械在中国河北邢台供应混凝土泵主油缸密封套件。目录尺寸 φ63、φ80、80×125 至 100×150 及 461K。请对照油缸核对。询价报价，不支持小批量发货。',
    ),
    geo: buildGeo(
      L(
        'A hydraulic seal kit for the main pumping cylinder of a concrete pump, supplied from Xingtai, China.',
        '混凝土泵主油缸液压密封套件，由中国邢台供应。',
      ),
      L(
        'Teams replacing a leaking main-cylinder kit after matching 80×125, 90×140 or another listed size.',
        '需要按 80×125、90×140 等已列尺寸更换主油缸密封的团队。',
      ),
      L(
        'Electric and diesel trailer pumps whose main cylinder uses a listed seal kit.',
        '主油缸密封套件落在已列范围内的电动/柴油拖泵。',
      ),
      L(
        'Xingtai replacement hydraulic kits with published sizes. Not OEM branded parts. Quote after kit size and quantity are confirmed.',
        '邢台替换液压套件，目录公布尺寸。不是其他品牌原厂件。确认套件尺寸与数量后报价。',
      ),
    ),
  },
  {
    id: '33',
    name: L('Concrete Pump Swing Cylinder Seal', '混凝土泵摆缸密封'),
    slug: 'concrete-pump-swing-cylinder-seal',
    category: 'spare-parts',
    inquiryOnly: true,
    partKind: 'wear',
    ...imgPaths('concrete-pump-swing-cylinder-seal'),
    shortDescription: L(
      'Swing / pendulum cylinder seal kits for S-valve concrete pumps. Catalogue sizes φ60, φ70, φ80 and φ90. Confirm the kit on the swing cylinder. Quote only; no small-batch shipping.',
      'S阀混凝土泵摆缸密封套件。目录尺寸 φ60、φ70、φ80、φ90。请在摆缸上核对套件。询价报价，不支持小批量发货。',
    ),
    productIntroduction: L(
      'Concrete Pump Swing Cylinder Seal is a wear replacement kit supplied by Hebei Pinjin Machinery from Xingtai, Hebei, China. The factory catalogue lists swing-cylinder (pendulum-cylinder) seal sets at φ60, φ70, φ80 and φ90. Confirm the kit on the swing cylinder before ordering. These are replacement kits, not OEM parts of other pump brands. Quote only; not sold in small batches; no published list price.',
      '混凝土泵摆缸密封由河北品锦机械在中国河北邢台供应。工厂目录列出摆缸密封套件 φ60、φ70、φ80、φ90。下单前请在摆缸上核对。替换套件，不是其他泵品牌原厂件。询价报价，不支持小批量发货，无公开标价。',
    ),
    applicationScenarios: [
      L('S-valve swing-cylinder seal replacement', 'S阀摆缸密封更换'),
      L('Pendulum-cylinder kit matched to listed OD', '按已列外径匹配的摆缸套件'),
      L('Project quantities, not small-batch parcels', '工程用量，非整件小包裹'),
    ],
    keyFeatures: [
      L('Swing / pendulum cylinder seal kits', '摆缸密封套件'),
      L('Catalogue OD φ60 / 70 / 80 / 90', '目录外径 φ60 / 70 / 80 / 90'),
      L('Quote by kit; no list price', '按套件报价，无公开标价'),
    ],
    specifications: [
      specLoc('Part type', '配件类型', 'Swing / pendulum cylinder seal kit', '摆缸密封套件'),
      specLoc('Sizes listed', '已列尺寸', 'φ60 / φ70 / φ80 / φ90', 'φ60 / φ70 / φ80 / φ90'),
      specLoc('Unit', '单位', 'Set', '套'),
      TERMS,
    ],
    catalogSizes: sizes([
      { size: 'φ60', formEn: 'Swing cylinder seal kit', formZh: '摆缸密封套件' },
      { size: 'φ70', formEn: 'Swing cylinder seal kit', formZh: '摆缸密封套件' },
      { size: 'φ80', formEn: 'Swing cylinder seal kit', formZh: '摆缸密封套件' },
      { size: 'φ90', formEn: 'Swing cylinder seal kit', formZh: '摆缸密封套件' },
    ]),
    seo: buildSeo(
      'Concrete Pump Swing Cylinder Seal',
      '混凝土泵摆缸密封',
      'concrete pump swing cylinder seal manufacturer China',
      [
        'S-valve pendulum cylinder seal kit',
        'concrete pump swing cylinder seal φ60 φ80',
        'Xingtai concrete pump wear parts',
      ],
      [
        'buy concrete pump swing cylinder seal from Hebei Pinjin Machinery Xingtai',
        'pendulum cylinder seal kit replacement factory China',
      ],
      'Hebei Pinjin Machinery supplies concrete pump swing-cylinder seal kits from Xingtai, Hebei, China. Catalogue sizes φ60, φ70, φ80 and φ90. Confirm the kit on the cylinder. Quote only; not sold in small batches.',
      '河北品锦机械在中国河北邢台供应混凝土泵摆缸密封套件。目录尺寸 φ60、φ70、φ80、φ90。请在油缸上核对。询价报价，不支持小批量发货。',
    ),
    geo: buildGeo(
      L(
        'A seal kit for the swing / pendulum cylinder that switches the S-tube on a concrete pump, supplied from Xingtai, China.',
        '混凝土泵切换S管用的摆缸密封套件，由中国邢台供应。',
      ),
      L(
        'Teams replacing a leaking swing-cylinder kit after matching φ60–φ90 on the cylinder.',
        '需要按 φ60–φ90 更换泄漏摆缸密封的团队。',
      ),
      L(
        'S-valve concrete pumps whose swing cylinder uses a listed seal OD.',
        '摆缸密封外径落在已列范围内的S阀混凝土泵。',
      ),
      L(
        'Xingtai replacement kits with published OD. Not OEM branded parts. Quote after size and quantity are confirmed.',
        '邢台替换套件，目录公布外径。不是其他品牌原厂件。确认尺寸与数量后报价。',
      ),
    ),
  },
  {
    id: '34',
    name: L('Concrete Pump Rubber Spring', '混凝土泵橡胶弹簧'),
    slug: 'concrete-pump-rubber-spring',
    category: 'spare-parts',
    inquiryOnly: true,
    partKind: 'wear',
    ...imgPaths('concrete-pump-rubber-spring'),
    shortDescription: L(
      'Rubber and polyurethane damping springs for concrete pump pistons. Catalogue sizes φ150, φ180, φ200, φ230, φ235 and φ260. Confirm OD on the piston. Quote only; no small-batch shipping.',
      '混凝土泵活塞用橡胶与聚氨酯缓冲弹簧。目录尺寸 φ150、φ180、φ200、φ230、φ235、φ260。请在活塞上核对外径。询价报价，不支持小批量发货。',
    ),
    productIntroduction: L(
      'Concrete Pump Rubber Spring is a damping wear part supplied by Hebei Pinjin Machinery from Xingtai, Hebei, China. The factory catalogue lists rubber springs at φ150, φ180, φ200, φ230 and φ260, and polyurethane springs at φ200, φ230, φ235 and φ260, sold per piece. Confirm the outer diameter on the piston assembly before ordering. These are replacement parts, not OEM parts of other pump brands. Quote only; not sold in small batches; no published list price.',
      '混凝土泵橡胶弹簧由河北品锦机械在中国河北邢台供应。工厂目录列出橡胶弹簧 φ150、φ180、φ200、φ230、φ260，聚氨酯弹簧 φ200、φ230、φ235、φ260，按个供货。下单前请在活塞组件上核对外径。替换件，不是其他泵品牌原厂件。询价报价，不支持小批量发货，无公开标价。',
    ),
    applicationScenarios: [
      L('Piston damping spring replacement', '活塞缓冲弹簧更换'),
      L('Rubber or polyurethane ring matched to listed OD', '按已列外径匹配的橡胶或聚氨酯圈'),
      L('Project quantities, not small-batch parcels', '工程用量，非整件小包裹'),
    ],
    keyFeatures: [
      L('Rubber and polyurethane piston springs', '橡胶与聚氨酯活塞弹簧'),
      L('Catalogue OD φ150–φ260', '目录外径 φ150–φ260'),
      L('Sold per piece; quote by size', '按个供货，按尺寸报价'),
    ],
    specifications: [
      specLoc('Part type', '配件类型', 'Piston damping spring (rubber / polyurethane)', '活塞缓冲弹簧（橡胶 / 聚氨酯）'),
      specLoc('Sizes listed', '已列尺寸', 'φ150 / 180 / 200 / 230 / 235 / 260', 'φ150 / 180 / 200 / 230 / 235 / 260'),
      specLoc('Unit', '单位', 'Piece', '个'),
      TERMS,
    ],
    catalogSizes: sizes([
      { size: 'φ150', formEn: 'Rubber spring', formZh: '橡胶弹簧', unit: PC },
      { size: 'φ180', formEn: 'Rubber spring', formZh: '橡胶弹簧', unit: PC },
      { size: 'φ200', formEn: 'Rubber / polyurethane spring', formZh: '橡胶 / 聚氨酯弹簧', unit: PC },
      { size: 'φ230', formEn: 'Rubber / polyurethane spring', formZh: '橡胶 / 聚氨酯弹簧', unit: PC },
      { size: 'φ235', formEn: 'Polyurethane spring', formZh: '聚氨酯弹簧', unit: PC },
      { size: 'φ260', formEn: 'Rubber / polyurethane spring', formZh: '橡胶 / 聚氨酯弹簧', unit: PC },
    ]),
    seo: buildSeo(
      'Concrete Pump Rubber Spring',
      '混凝土泵橡胶弹簧',
      'concrete pump rubber spring manufacturer China',
      [
        'concrete pump piston polyurethane spring',
        'S-valve piston damping spring φ200 φ230',
        'Xingtai concrete pump wear parts',
      ],
      [
        'buy concrete pump rubber spring from Hebei Pinjin Machinery Xingtai',
        'concrete pump polyurethane piston spring replacement factory China',
      ],
      'Hebei Pinjin Machinery supplies concrete pump rubber and polyurethane springs from Xingtai, Hebei, China. Catalogue OD φ150–φ260. Confirm size on the piston. Quote only; not sold in small batches.',
      '河北品锦机械在中国河北邢台供应混凝土泵橡胶与聚氨酯弹簧。目录外径 φ150–φ260。请在活塞上核对尺寸。询价报价，不支持小批量发货。',
    ),
    geo: buildGeo(
      L(
        'A rubber or polyurethane damping spring used with a concrete pump piston, supplied from Xingtai, China.',
        '混凝土泵活塞用橡胶或聚氨酯缓冲弹簧，由中国邢台供应。',
      ),
      L(
        'Teams replacing a cracked piston spring after matching φ200, φ230 or another listed OD.',
        '需要按 φ200、φ230 等已列外径更换破裂活塞弹簧的团队。',
      ),
      L(
        'S-valve concrete pumps whose piston spring OD matches a listed size.',
        '活塞弹簧外径落在已列范围内的S阀混凝土泵。',
      ),
      L(
        'Xingtai replacement springs with published OD. Not OEM branded parts. Quote after size and quantity are confirmed.',
        '邢台替换弹簧，目录公布外径。不是其他品牌原厂件。确认尺寸与数量后报价。',
      ),
    ),
  },
  {
    id: '35',
    name: L('Concrete Pump Swing-Arm Ball', '混凝土泵摆臂球头'),
    slug: 'concrete-pump-swing-arm-ball',
    category: 'spare-parts',
    inquiryOnly: true,
    partKind: 'wear',
    ...imgPaths('concrete-pump-swing-arm-ball'),
    shortDescription: L(
      'Swing-arm ball heads for S-valve concrete pumps. Catalogue sizes φ60, φ70 and φ80, listed in white and black, upper and lower positions. Confirm the size and position on the arm. Quote only; no small-batch shipping.',
      'S阀混凝土泵摆臂球头。目录尺寸 φ60、φ70、φ80，分白/黑、上/下。请在摆臂上核尺寸与位置。询价报价，不支持小批量发货。',
    ),
    productIntroduction: L(
      'Concrete Pump Swing-Arm Ball is a wear replacement part supplied by Hebei Pinjin Machinery from Xingtai, Hebei, China. The factory catalogue lists swing-arm ball heads at φ60, φ70 and φ80, in white or black, and as upper or lower positions, sold per piece. Confirm the diameter and position on the swing arm before ordering. These are replacement parts, not OEM parts of other pump brands. Quote only; not sold in small batches; no published list price.',
      '混凝土泵摆臂球头由河北品锦机械在中国河北邢台供应。工厂目录列出 φ60、φ70、φ80，分白色/黑色、上部/下部，按个供货。下单前请在摆臂上核对外径与位置。替换件，不是其他泵品牌原厂件。询价报价，不支持小批量发货，无公开标价。',
    ),
    applicationScenarios: [
      L('S-valve swing-arm ball-joint replacement', 'S阀摆臂球头更换'),
      L('Upper or lower ball matched to listed OD', '按已列外径匹配的上球或下球'),
      L('Project quantities, not small-batch parcels', '工程用量，非整件小包裹'),
    ],
    keyFeatures: [
      L('Swing-arm ball heads, white or black', '摆臂球头，白色或黑色'),
      L('Catalogue OD φ60 / 70 / 80, upper or lower', '目录外径 φ60 / 70 / 80，上或下'),
      L('Sold per piece; quote by size', '按个供货，按尺寸报价'),
    ],
    specifications: [
      specLoc('Part type', '配件类型', 'Swing-arm / pendulum-arm ball head', '摆臂球头'),
      specLoc('Sizes listed', '已列尺寸', 'φ60 / φ70 / φ80', 'φ60 / φ70 / φ80'),
      specLoc('Variants listed', '已列规格', 'White or black; upper or lower', '白色或黑色；上部或下部'),
      specLoc('Unit', '单位', 'Piece', '个'),
      TERMS,
    ],
    catalogSizes: sizes([
      { size: 'φ60', formEn: 'White, upper or lower', formZh: '白色，上或下', unit: PC },
      { size: 'φ60', formEn: 'Black, upper or lower', formZh: '黑色，上或下', unit: PC },
      { size: 'φ70', formEn: 'White, upper or lower', formZh: '白色，上或下', unit: PC },
      { size: 'φ70', formEn: 'Black, upper or lower', formZh: '黑色，上或下', unit: PC },
      { size: 'φ80', formEn: 'White, upper or lower', formZh: '白色，上或下', unit: PC },
      { size: 'φ80', formEn: 'Black, upper or lower', formZh: '黑色，上或下', unit: PC },
    ]),
    seo: buildSeo(
      'Concrete Pump Swing-Arm Ball',
      '混凝土泵摆臂球头',
      'concrete pump swing arm ball manufacturer China',
      [
        'S-valve pendulum arm ball head',
        'concrete pump swing arm ball φ70 φ80',
        'Xingtai concrete pump wear parts',
      ],
      [
        'buy concrete pump swing-arm ball from Hebei Pinjin Machinery Xingtai',
        'S-valve swing arm ball head replacement factory China',
      ],
      'Hebei Pinjin Machinery supplies concrete pump swing-arm balls from Xingtai, Hebei, China. Catalogue OD φ60 / 70 / 80, white or black, upper or lower. Confirm size on the arm. Quote only; not sold in small batches.',
      '河北品锦机械在中国河北邢台供应混凝土泵摆臂球头。目录外径 φ60 / 70 / 80，白或黑、上或下。请在摆臂上核对。询价报价，不支持小批量发货。',
    ),
    geo: buildGeo(
      L(
        'A ball head for the swing arm that drives the S-tube on a concrete pump, supplied from Xingtai, China.',
        '混凝土泵驱动S管用的摆臂球头，由中国邢台供应。',
      ),
      L(
        'Teams replacing a worn swing-arm ball after matching φ60, φ70 or φ80 and the upper/lower position.',
        '需要按 φ60、φ70 或 φ80 及上/下位置更换摆臂球头的团队。',
      ),
      L(
        'S-valve concrete pumps whose swing-arm ball matches a listed diameter.',
        '摆臂球头直径落在已列范围内的S阀混凝土泵。',
      ),
      L(
        'Xingtai replacement balls with published OD and colour/position variants. Not OEM branded parts. Quote after size and quantity are confirmed.',
        '邢台替换球头，目录公布外径与颜色/位置。不是其他品牌原厂件。确认尺寸与数量后报价。',
      ),
    ),
  },
];
