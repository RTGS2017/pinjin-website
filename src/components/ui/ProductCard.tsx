import { LocaleLink } from '@/i18n/navigation';
import type { Product } from '@/data/products';
import { categoryMeta, isInquiryOnlyProduct, productImageAlt } from '@/data/products';
import { ImagePlaceholder } from './ImagePlaceholder';
import { Button } from './Button';
import { OemNote } from './OemNote';
import { ProductPrice } from './ProductPrice';
import { SparePartTerms } from './SparePartTerms';
import { useI18n } from '@/i18n/I18nContext';
import { useCompare } from '@/hooks/useCompare';
import { Scale } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { lang, t, tx } = useI18n();
  const { toggle, isSelected, count, max } = useCompare();
  const name = tx(product.name);
  const apps = product.applicationScenarios.slice(0, 4);
  const features = product.keyFeatures.slice(0, 3);
  const selected = isSelected(product.slug);
  const canAdd = selected || count < max;

  return (
    <article className="group card-surface flex h-full flex-col overflow-hidden bg-bg transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)]">
      <LocaleLink
        to={`/products/${product.slug}`}
        className="block overflow-hidden bg-transparent"
      >
        <ImagePlaceholder
          src={product.image}
          alt={productImageAlt(product, product.image, lang)}
          label={t.productCard.imageComingSoon}
          hint={t.placeholder.productHint}
          width={1536}
          height={1024}
          className="w-full bg-transparent"
          imgClassName="h-auto w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </LocaleLink>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
            {tx(categoryMeta[product.category].label)}
          </p>
          <label className={`inline-flex cursor-pointer items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-semibold tracking-wide transition-colors ${selected ? 'border-primary bg-primary text-white' : canAdd ? 'border-border text-text-secondary hover:border-primary hover:text-primary' : 'border-border text-text-secondary opacity-40 cursor-not-allowed'}`}>
            <Scale className="h-3 w-3" />
            <input
              type="checkbox"
              className="sr-only"
              checked={selected}
              disabled={!canAdd}
              onChange={() => toggle(product.slug)}
            />
            {selected ? 'Comparing' : 'Compare'}
          </label>
        </div>

        <h3 className="mt-2 text-lg font-semibold tracking-wide text-dark">
          <LocaleLink
            to={`/products/${product.slug}`}
            className="transition-colors hover:text-primary"
          >
            {name}
          </LocaleLink>
        </h3>
        <p className="mt-2 text-sm text-text-secondary line-clamp-3">
          {tx(product.shortDescription)}
        </p>
        {isInquiryOnlyProduct(product) ? (
          product.category === 'spare-parts' ? (
            <SparePartTerms compact />
          ) : (
            <p className="mt-3 text-sm text-text-secondary">{t.productCard.inquiryNoListPrice}</p>
          )
        ) : (
          <ProductPrice slug={product.slug} compact />
        )}

        {apps.length > 0 ? (
          <div className="mt-4">
            <p className="text-xs font-semibold tracking-wide text-dark">
              {t.productCard.suitableFor}
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-text-secondary">
              {apps.map((item) => (
                <li key={item.en}>{tx(item)}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {features.length > 0 ? (
          <div className="mt-4 flex-1">
            <p className="text-xs font-semibold tracking-wide text-dark">
              {t.productCard.keyAdvantages}
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-text-secondary">
              {features.map((item) => (
                <li key={item.en}>{tx(item)}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex-1" />
        )}

        <OemNote compact className="mt-4" />

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Button
            to={`/products/${product.slug}`}
            size="md"
            className="w-full sm:w-auto"
          >
            {t.productCard.getQuote}
          </Button>
          <LocaleLink
            to={`/products/${product.slug}`}
            className="inline-flex items-center justify-center text-sm font-semibold tracking-wide text-dark transition-colors hover:text-primary"
          >
            {t.productCard.viewDetails}
          </LocaleLink>
        </div>
      </div>
    </article>
  );
}

