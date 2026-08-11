import { featuredProductSlugs } from '@/config/site';
import { getFeaturedProducts } from '@/data/products';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n/I18nContext';

export function FeaturedProducts() {
  const { t } = useI18n();
  const featured = getFeaturedProducts(featuredProductSlugs);

  return (
    <section className="section-y bg-bg">
      <div className="container-site">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle title={t.featured.title} subtitle={t.featured.subtitle} />
          <Button to="/products" variant="outline" className="shrink-0">
            {t.featured.viewAll}
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
