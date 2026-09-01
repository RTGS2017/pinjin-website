import { useEffect, useState } from 'react';
import { featuredProductSlugs, withBase } from '@/config/site';
import { getFeaturedProducts, productImageAlt } from '@/data/products';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { GalleryThumbs } from '@/components/ui/StageGallery';
import { Button } from '@/components/ui/Button';
import { OemNote } from '@/components/ui/OemNote';
import { ProductPrice } from '@/components/ui/ProductPrice';
import { useI18n } from '@/i18n/I18nContext';

export function FeaturedProducts() {
  const { lang, t, tx } = useI18n();
  const products = getFeaturedProducts(featuredProductSlugs);
  const [active, setActive] = useState(0);
  const product = products[active] ?? products[0];

  useEffect(() => {
    products.slice(0, 3).forEach((item) => {
      const preload = new Image();
      preload.src = withBase(item.image);
    });
  }, [products]);

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

        <article className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="max-w-lg">
            <h3 className="heading-display text-3xl sm:text-4xl lg:text-[2.5rem]">
              {name}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              {tx(product.shortDescription)}
            </p>
            <ProductPrice slug={product.slug} />
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

          <div className="product-stage">
            <ImagePlaceholder
              src={product.image}
              alt={productImageAlt(product, product.image, lang)}
              label={t.productCard.imageComingSoon}
              hint=""
              priority={active === 0}
              width={1536}
              height={1024}
              sizes="(max-width: 1024px) 100vw, 560px"
              className="w-full bg-transparent"
              imgClassName="h-auto w-full object-contain"
            />
          </div>
        </article>

        <GalleryThumbs
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
          fit="contain"
          ringOffsetClassName="ring-offset-bg"
          className="mt-8"
        />
      </div>
    </section>
  );
}
