import { useMemo, useState } from 'react';
import { LocaleLink } from '@/i18n/navigation';
import {
  categoryMeta,
  getCategoryPath,
  products,
  type ProductCategory,
} from '@/data/products';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ProductCard } from '@/components/ui/ProductCard';
import { SEO, buildBreadcrumbJsonLd } from '@/components/SEO';
import { useI18n } from '@/i18n/I18nContext';
import { localePath } from '@/i18n/paths';

const filters: Array<'all' | ProductCategory> = [
  'all',
  'concrete-pump',
  'spraying-machine',
  'material-handling',
  'rebar-equipment',
];

export function Products() {
  const { lang, t, tx } = useI18n();
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
        jsonLd={buildBreadcrumbJsonLd([
          { name: t.detail.home, path: localePath('/', lang) },
          { name: t.detail.products, path: localePath('/products', lang) },
        ])}
      />
      <div className="container-site">
        <SectionTitle
          title={t.productsPage.title}
          subtitle={t.productsPage.subtitle}
          heading="h1"
        />

        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-text-secondary">
          {filters
            .filter((key): key is ProductCategory => key !== 'all')
            .map((key) => (
              <LocaleLink
                key={key}
                to={getCategoryPath(key)}
                className="hover:text-primary"
              >
                {tx(categoryMeta[key].label)}
              </LocaleLink>
            ))}
          <LocaleLink to="/products/custom-machinery" className="hover:text-primary">
            {t.productsPage.customMachinery}
          </LocaleLink>
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
