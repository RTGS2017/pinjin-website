import { getIndicativePrice, formatIndicativeUsd } from '@/data/productPricing';
import { useI18n } from '@/i18n/I18nContext';

interface ProductPriceProps {
  slug: string;
  compact?: boolean;
}

export function ProductPrice({ slug, compact = false }: ProductPriceProps) {
  const { t } = useI18n();
  const price = getIndicativePrice(slug);
  if (!price) return null;

  return (
    <div className={compact ? 'mt-3' : 'mt-5'}>
      <p className="text-xs font-semibold tracking-[0.12em] text-text-secondary uppercase">
        {t.productCard.priceFrom}
      </p>
      <p className={compact ? 'mt-1 text-base font-semibold text-dark' : 'mt-1 text-2xl font-semibold text-dark'}>
        {formatIndicativeUsd(price.usd)}
      </p>
      <p className="mt-1 text-xs text-text-secondary">{t.productCard.freightNote}</p>
    </div>
  );
}
