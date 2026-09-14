import type { Product, ProductSpec } from '@/data/products';
import type { Lang, LocalizedText } from '@/i18n/types';
import { pick } from '@/i18n/types';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

const COMPACT_SLUGS = new Set([
  'electric-15-concrete-pump',
  'electric-10-series-concrete-pump',
  'b500s-83d-two-stage-pump',
  'tractor-4100-concrete-pump',
  'rural-diesel-concrete-pump',
]);

export function findSpec(product: Product, needles: string[]): ProductSpec | undefined {
  return product.specifications.find((row) => {
    const label = row.label.en.toLowerCase();
    return needles.some((needle) => label.includes(needle.toLowerCase()));
  });
}

export function specText(product: Product, lang: Lang, needles: string[]): string | undefined {
  const row = findSpec(product, needles);
  return row ? pick(row.value, lang) : undefined;
}

function clipEn(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text.trim();
  return `${words.slice(0, maxWords).join(' ')}.`;
}

export function getDirectAnswer(product: Product): LocalizedText {
  if (product.directAnswer) return product.directAnswer;
  const introEn = pick(product.productIntroduction, 'en').replace(/\s+/g, ' ').trim();
  const introZh = pick(product.productIntroduction, 'zh').replace(/\s+/g, ' ').trim();
  if (product.category === 'spare-parts') {
    return {
      en: clipEn(
        `${introEn} Confirm the size on the pump before ordering. Quote only; not sold in small batches; no published list price.`,
        80,
      ),
      zh: `${introZh}下单前请在泵上核对尺寸。询价报价，不支持小批量发货，无公开标价。`,
    };
  }
  return {
    en: clipEn(
      `${introEn} Match mix, aggregate size, pumping distance and site power to this catalogue table. It is not a truck-mounted placing boom and not a concrete batching plant.`,
      80,
    ),
    zh: `${introZh}请按本页目录表对照配合比、骨料粒径、输送距离与现场动力。这不是车载臂架泵，也不是混凝土搅拌站。`,
  };
}

export function getNotSuitable(product: Product): LocalizedText[] {
  if (product.notSuitable?.length) return product.notSuitable;
  if (product.category === 'spare-parts') {
    const rows = [
      L(
        'Not sold as small-batch parcels; no published list price.',
        '不支持小批量包裹发货；本站无公开标价。',
      ),
    ];
    if (product.partKind === 'wear') {
      rows.push(
        L(
          'Not OEM parts of other pump brands. Confirm outer diameter or kit on the machine.',
          '不是其他泵品牌原厂件。请在设备上核对外径或套件。',
        ),
      );
    }
    return rows;
  }
  const rows = [
    L(
      'Not a truck-mounted placing boom and not a concrete batching plant.',
      '不是车载布料杆泵，也不是混凝土搅拌站。',
    ),
    L(
      'Not a dedicated mortar sprayer, grout pump or shotcrete robot.',
      '不是独立砂浆喷涂机、灌浆泵或喷射机械手。',
    ),
  ];
  if (product.category === 'electric-concrete-pump') {
    rows.push(
      L(
        'Not for sites that cannot supply the listed motor power from a stable grid.',
        '现场无法按目录电机功率提供稳定电网时不适用。',
      ),
    );
  }
  if (product.category === 'diesel-concrete-pump') {
    rows.push(
      L(
        'Not an electric-catalogue substitute when the site already has the listed grid supply.',
        '现场已有目录所列电网时，不要把柴油行当成电机目录机型。',
      ),
    );
  }
  if (product.category === 'mixer-pump') {
    rows.push(
      L(
        'A mixer pump mixes and conveys on one trailer. It is not a mixing-plant line.',
        '搅拌泵是搅拌与泵送一体的拖车设备，不是搅拌站产品线。',
      ),
    );
  }
  if (COMPACT_SLUGS.has(product.slug)) {
    rows.push(
      L(
        'Not a substitute for Electric 60 / Electric 80 catalogue high-rise or 900 m rows.',
        '不能替代电动60 / 电动80目录中的高层或 900 m 行。',
      ),
    );
  }
  return rows;
}

export function getHowToSelect(product: Product): LocalizedText {
  if (product.howToSelect) return product.howToSelect;
  if (product.partKind === 'wear') {
    return L(
      'Send the part name, outer diameter or kit size, and quantity. Confirm the size on the pump. Xingtai replacement wear parts, not OEM parts of other brands.',
      '请提供配件名称、外径或套件尺寸与数量，并在泵上核对尺寸。邢台替换易损件，不是其他品牌原厂件。',
    );
  }
  if (product.category === 'spare-parts') {
    return L(
      'Send the pump model, diameter (DN), length and quantity. Pipeline replacements are quoted after size confirmation.',
      '请提供泵型号、管径（DN）、长度与数量。管路替换件在确认尺寸后报价。',
    );
  }
  return L(
    'Shortlist from this page’s table: mix or material, maximum aggregate, required output, horizontal and vertical distance, diesel or site voltage/frequency, country and purchase timing. Then send those conditions for a factory quote.',
    '对照本页目录表短名单：材料/配合比、最大骨料、目标产量、水平与垂直距离、柴油或现场电压频率、国家与采购时间。再把这些工况发给工厂报价。',
  );
}

export function getBuyProcess(product: Product): LocalizedText[] {
  if (product.category === 'spare-parts') {
    return [
      L('Confirm the part name and the size on the pump.', '确认配件名称并在泵上核对尺寸。'),
      L('Send quantity. The factory quotes from Xingtai.', '发送数量，由邢台工厂报价。'),
      L('No small-batch shipping and no published list price.', '不支持小批量发货，无公开标价。'),
      L('Shipping is arranged after the quote is accepted.', '接受报价后再安排发运。'),
    ];
  }
  return [
    L('Match mix, aggregate, distance and power to this catalogue table.', '按本页目录表对照配合比、骨料、距离与动力。'),
    L('Send those site conditions by WhatsApp or email.', '通过 WhatsApp 或邮件发送上述工况。'),
    L('Xingtai factory recommends a listed model and quotes EXW.', '邢台工厂按已列机型推荐并给出 EXW 报价。'),
    L('Packing and freight are confirmed after the quote; international freight is paid by the buyer.', '报价确认后再谈包装与运费；国际运费由买方承担。'),
  ];
}
