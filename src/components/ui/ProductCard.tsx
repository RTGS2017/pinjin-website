import { LocaleLink } from '@/i18n/navigation';
import type { Product } from '@/data/products';
import { categoryMeta } from '@/data/products';
import { ImagePlaceholder } from './ImagePlaceholder';
import { Button } from './Button';
import { useI18n } from '@/i18n/I18nContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, tx } = useI18n();
  const name = tx(product.name);
  const apps = product.applicationScenarios.slice(0, 4);
  const features = product.keyFeatures.slice(0, 3);

  return (
    <article className="group flex h-full flex-col border border-border bg-bg transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(37,42,49,0.06)]">
      <LocaleLink
        to={`/products/${product.slug}`}
        className="block overflow-hidden bg-bg-soft"
      >
        <ImagePlaceholder
          src={product.image}
          alt={`${product.name.en} manufactured by Hebei Pinjin Machinery`}
          label={t.productCard.imageComingSoon}
          hint={t.placeholder.productHint}
          width={1200}
          height={760}
          className="aspect-[4/3] w-full"
          imgClassName="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </LocaleLink>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
          {tx(categoryMeta[product.category].label)}
        </p>
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

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Button
            to={`/products/${product.slug}#inquiry`}
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
