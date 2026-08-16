import { useEffect } from 'react';
import { featuredProductSlugs, withBase } from '@/config/site';
import { getFeaturedProducts } from '@/data/products';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Button } from '@/components/ui/Button';
import { OemNote } from '@/components/ui/OemNote';
import {
  IndustrialCarousel,
  carouselPanelStyle,
} from '@/components/ui/IndustrialCarousel';
import { useI18n } from '@/i18n/I18nContext';

export function FeaturedProducts() {
  const { t, tx } = useI18n();
  const products = getFeaturedProducts(featuredProductSlugs);
  const total = products.length;

  useEffect(() => {
    products.slice(0, 3).forEach((product) => {
      const preload = new Image();
      preload.src = withBase(product.image);
    });
  }, [products]);

  if (!total) return null;

  return (
    <section className="section-y bg-bg">
      <div className="container-site">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle title={t.featured.title} subtitle={t.featured.subtitle} />
          <Button to="/products" variant="outline" className="shrink-0">
            {t.featured.viewAll}
          </Button>
        </div>

        <IndustrialCarousel
          count={total}
          label={t.featured.title}
          chrome="below"
          className="mt-12"
          viewportClassName="relative min-h-[32rem]"
        >
          {({ active, direction }) =>
            products.map((product, index) => {
              const selected = index === active;
              const advantages = product.keyFeatures.slice(0, 3);
              const name = tx(product.name);

              return (
                <article
                  key={product.slug}
                  className={[
                    'grid gap-8 lg:grid-cols-2 lg:items-center',
                    selected ? 'relative z-10' : 'absolute inset-0',
                  ].join(' ')}
                  style={carouselPanelStyle(selected, direction)}
                  aria-hidden={!selected}
                >
                  <div className="max-w-lg">
                    <h3 className="heading-display text-3xl sm:text-4xl lg:text-[2.5rem]">
                      {name}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-text-secondary">
                      {tx(product.shortDescription)}
                    </p>
                    {advantages.length ? (
                      <ul className="mt-6 space-y-2 text-sm text-text-secondary">
                        {advantages.map((item) => (
                          <li key={item.en} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{tx(item)}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <OemNote className="mt-6 border-t border-border pt-5" />
                    <div className="mt-8">
                      <Button to={`/products/${product.slug}`} size="lg">
                        {t.productCard.getQuote}
                      </Button>
                    </div>
                  </div>

                  <div className="product-stage rounded-[1.25rem]">
                    <ImagePlaceholder
                      src={product.image}
                      alt={`${name} manufactured by Pinjin Machinery in Xingtai Hebei China — China concrete pump factory`}
                      label={t.productCard.imageComingSoon}
                      hint=""
                      priority={index === 0}
                      eager={index === 1}
                      width={1200}
                      height={900}
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="aspect-[4/3] w-full rounded-[1.25rem] !bg-transparent"
                      imgClassName="object-contain p-8 sm:p-12"
                    />
                  </div>
                </article>
              );
            })
          }
        </IndustrialCarousel>
      </div>
    </section>
  );
}
