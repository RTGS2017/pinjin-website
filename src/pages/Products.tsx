import { useMemo, useState } from 'react';
import { LocaleLink } from '@/i18n/navigation';
import {
  categoryMeta,
  products,
  type ProductCategory,
} from '@/data/products';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ProductCard } from '@/components/ui/ProductCard';
import { SEO } from '@/components/SEO';
import { useI18n } from '@/i18n/I18nContext';

const filters: Array<'all' | ProductCategory> = [
  'all',
  'concrete-pump',
  'spraying-machine',
  'material-handling',
  'rebar-equipment',
];

export function Products() {
  const { t, tx } = useI18n();
  const [filter, setFilter] = useState<'all' | ProductCategory>('all');

  const list = useMemo(() => {
    if (filter === 'all') return products;
    return products.filter((p) => p.category === filter);
  }, [filter]);

  const labelOf = (key: 'all' | ProductCategory) => {
    if (key === 'all') return t.productsPage.all;
    return tx(categoryMeta[key].label);
  };

  return (
    <section className="section-y bg-bg">
      <SEO
        title={t.seo.productsTitle}
        description={t.productsPage.subtitle}
        path="/products"
      />
      <div className="container-site">
        <SectionTitle
          title={t.productsPage.title}
          subtitle={t.productsPage.subtitle}
        />

        <p className="mt-4 text-sm text-text-secondary">
          <LocaleLink to="/product-selection-guide" className="hover:text-primary">
            {t.productsPage.selectionCta} →
          </LocaleLink>
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((key) => {
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={[
                  'rounded-sm border px-4 py-2 text-xs font-semibold tracking-wide transition-colors',
                  active
                    ? 'border-primary bg-primary text-white'
                    : 'border-border bg-bg text-dark hover:border-primary hover:text-primary',
                ].join(' ')}
              >
                {labelOf(key)}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
