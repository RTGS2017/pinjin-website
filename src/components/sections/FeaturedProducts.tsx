import { featuredProductSlugs } from '@/config/site';
import { categoryMeta, getFeaturedProducts, keySpecifications, productImageAlt } from '@/data/products';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Button } from '@/components/ui/Button';
import { LocaleLink } from '@/i18n/navigation';
import { useI18n } from '@/i18n/I18nContext';

export function FeaturedProducts() {
  const { lang, t, tx } = useI18n();
  const products = getFeaturedProducts(featuredProductSlugs).slice(0, 4);

  if (!products.length) return null;

  return (
    <section className="section-y bg-bg-soft">
      <div className="container-site">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle title={t.featured.title} subtitle={t.featured.subtitle} />
          <Button to="/products" variant="outline" className="shrink-0">
            {t.featured.viewAll}
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => {
            const name = tx(product.name);
            const specs = keySpecifications(product, 4)
              .map((spec) => tx(spec.value))
              .filter(Boolean);

            return (
              <article key={product.slug} className="flex h-full flex-col border border-border bg-card">
                <LocaleLink to={`/products/${product.slug}`} className="block bg-bg px-4 pt-4">
                  <ImagePlaceholder
                    src={product.image}
                    alt={productImageAlt(product, product.image, lang)}
                    label={t.productCard.imageComingSoon}
                    hint=""
                    priority={index < 2}
                    width={1536}
                    height={1024}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 280px"
                    className="aspect-[4/3] w-full bg-transparent"
                    imgClassName="h-full w-full object-contain"
                  />
                </LocaleLink>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
                    {tx(categoryMeta[product.category].label)}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-wide text-dark">
                    <LocaleLink to={`/products/${product.slug}`} className="hover:text-primary">
                      {name}
                    </LocaleLink>
                  </h3>
                  {specs.length ? (
                    <p className="mt-2 text-sm text-text-secondary">{specs.join(' · ')}</p>
                  ) : null}
                  <div className="mt-5">
                    <Button to={`/products/${product.slug}`} size="md" className="w-full">
                      {t.selectionGuide.viewProduct}
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
