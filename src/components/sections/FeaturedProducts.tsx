import { useState } from 'react';
import { featuredProductSlugs } from '@/config/site';
import { getFeaturedProducts, productImageAlt } from '@/data/products';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { StageGallery } from '@/components/ui/StageGallery';
import { Button } from '@/components/ui/Button';
import { OemNote } from '@/components/ui/OemNote';
import { useI18n } from '@/i18n/I18nContext';

export function FeaturedProducts() {
  const { lang, t, tx } = useI18n();
  const products = getFeaturedProducts(featuredProductSlugs);
  const [active, setActive] = useState(0);
  const product = products[active] ?? products[0];

  if (!product) return null;

  const advantages = product.keyFeatures.slice(0, 3);
  const name = tx(product.name);

  return (
    <section className="section-y bg-bg">
      <div className="container-site">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle title={t.featured.title} subtitle={t.featured.subtitle} />
          <Button to="/products" variant="outline" className="shrink-0">
            {t.featured.viewAll}
          </Button>
        </div>

        <div className="mt-10">
          <StageGallery
            frames={products.map((item) => ({
              id: item.slug,
              src: item.image,
              alt: productImageAlt(item, item.image, lang),
              label: tx(item.name),
              width: 1536,
              height: 1024,
            }))}
            active={active}
            onChange={setActive}
            placeholderLabel={t.productCard.imageComingSoon}
            fit="contain"
            ringOffsetClassName="ring-offset-bg"
          />
        </div>

        <div className="mx-auto mt-8 max-w-3xl">
          <h3 className="heading-display text-3xl sm:text-4xl">{name}</h3>
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
      </div>
    </section>
  );
}
