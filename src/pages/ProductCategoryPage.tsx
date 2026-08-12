import { useParams } from 'react-router-dom';
import { LocaleLink, LocaleNavigate } from '@/i18n/navigation';
import {
  categoryMeta,
  getCategoryByRouteSlug,
  getProductsByCategory,
} from '@/data/products';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ProductCard } from '@/components/ui/ProductCard';
import { SEO } from '@/components/SEO';
import { useI18n } from '@/i18n/I18nContext';

export function ProductCategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { t, tx } = useI18n();

  if (!categorySlug) {
    return <LocaleNavigate to="/products" replace />;
  }

  const category = getCategoryByRouteSlug(categorySlug);
  if (!category) {
    return <LocaleNavigate to="/products" replace />;
  }

  const meta = categoryMeta[category];
  const list = getProductsByCategory(category);
  const title = `${tx(meta.label)} | Hebei Pinjin Machinery`;
  const description = tx(meta.description);

  return (
    <section className="section-y bg-bg">
      <SEO
        title={title}
        description={description}
        path={`/products/category/${meta.routeSlug}`}
      />
      <div className="container-site">
        <nav className="mb-6 text-sm text-text-secondary">
          <LocaleLink to="/products" className="hover:text-primary">
            {t.detail.products}
          </LocaleLink>
          <span aria-hidden> / </span>
          <span className="text-dark">{tx(meta.label)}</span>
        </nav>

        <SectionTitle title={tx(meta.label)} subtitle={description} />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
