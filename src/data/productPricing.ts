/**
 * Indicative EXW Xingtai USD prices.
 *
 * Compact 15–60 class: China-market factory quotes for matching type/kW
 * (2026-09 secondary conveying-pump SKUs), × 1.45 (mid of 40–50% margin),
 * ÷ 6.7809 (USD/CNY), rounded to USD 50.
 * Larger HBT / LZ / mixer / twin-engine units are not those compact SKUs;
 * factory CNY is scaled by power/duty from the 60-class floor.
 *
 * Freight is extra and paid by the buyer. Figures are a starting reference,
 * not a locked contract price.
 */
export interface IndicativePrice {
  factoryCny: number;
  usd: number;
}

const FX_CNY_PER_USD = 6.7809;
const MARGIN = 1.45;

function usdFromFactoryCny(cny: number): number {
  return Math.round((cny * MARGIN) / FX_CNY_PER_USD / 50) * 50;
}

function quote(factoryCny: number): IndicativePrice {
  return { factoryCny, usd: usdFromFactoryCny(factoryCny) };
}

const PRODUCT_PRICES: Record<string, IndicativePrice> = {
  'electric-10-series-concrete-pump': quote(13500),
  'electric-15-concrete-pump': quote(13500),
  'rural-diesel-concrete-pump': quote(17500),
  'tractor-4100-concrete-pump': quote(26000),
  'electric-20-concrete-pump': quote(26000),
  'electric-30-concrete-pump': quote(29000),
  'electric-low-pressure-40-concrete-pump': quote(32000),
  'diesel-30-concrete-pump': quote(42000),
  'electric-40-concrete-pump': quote(45000),
  'diesel-40-concrete-pump': quote(52000),
  'electric-50-concrete-pump': quote(55000),
  'diesel-50-concrete-pump': quote(65000),
  'integrated-mixer-pump': quote(65000),
  'diesel-mixer-integrated-pump': quote(75000),
  'electric-low-pressure-60-concrete-pump': quote(96000),
  'electric-60-concrete-pump': quote(110000),
  'diesel-60-concrete-pump': quote(110000),
  'hbt80-16-concrete-pump': quote(170000),
  'electric-80-concrete-pump': quote(180000),
  'lz-60-diesel-concrete-pump': quote(185000),
  'hbt8018-concrete-pump': quote(200000),
  'lz-80-diesel-concrete-pump': quote(260000),
  'diesel-120-concrete-pump': quote(320000),
};

export function getIndicativePrice(slug: string): IndicativePrice | undefined {
  return PRODUCT_PRICES[slug];
}

export function formatIndicativeUsd(usd: number): string {
  return `USD ${usd.toLocaleString('en-US')}`;
}
