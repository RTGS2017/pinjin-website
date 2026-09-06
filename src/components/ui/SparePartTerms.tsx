import { useI18n } from '@/i18n/I18nContext';

interface SparePartTermsProps {
  compact?: boolean;
  className?: string;
}

export function SparePartTerms({ compact = false, className = '' }: SparePartTermsProps) {
  const { t } = useI18n();

  if (compact) {
    return (
      <p className={`mt-3 text-sm text-text-secondary ${className}`}>
        {t.productCard.noListPrice}
      </p>
    );
  }

  return (
    <div className={`mt-5 space-y-2 border border-border bg-bg-soft p-4 text-sm text-text-secondary ${className}`}>
      <p className="font-semibold tracking-wide text-dark">{t.productCard.quoteOnly}</p>
      <p>{t.productCard.noListPrice}</p>
      <p>{t.productCard.noSmallBatch}</p>
    </div>
  );
}
