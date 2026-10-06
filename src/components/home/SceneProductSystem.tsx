import type { CSSProperties } from 'react';
import {
  categoryMeta,
  getCategoryPath,
  getProductBySlug,
  getProductsByCategory,
  keySpecifications,
  productImageAlt,
  type ProductCategory,
} from '@/data/products';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LocaleLink } from '@/i18n/navigation';
import { useI18n } from '@/i18n/I18nContext';
import { categoryShowcaseSlugs, homeCopy } from '@/data/homeNarrative';
import { useHoverAutoplay } from '@/hooks/useHoverAutoplay';
import { SceneFrame } from './homeScroll';

const order: ProductCategory[] = [
  'electric-concrete-pump',
  'diesel-concrete-pump',
  'mixer-pump',
  'spraying-machine',
  'spare-parts',
];

export function SceneProductSystem() {
  const { lang, t, tx } = useI18n();
  const { index: active, setIndex, desktop, pauseProps } = useHoverAutoplay(order.length);

  return (
    <SceneFrame sceneKey="products" tone="light">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {t.categories.title}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        {tx(homeCopy.productHeadline)}
      </h2>
      <p className="mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
        {t.categories.subtitle}
      </p>

      <div
        className="home-product-viewport mt-10"
        style={{ '--slide': active } as CSSProperties}
        aria-roledescription="carousel"
        aria-label={t.categories.title}
        {...pauseProps}
      >
        <div className="home-product-track">
          {order.map((id, index) => {
            const meta = categoryMeta[id];
            const listed = getProductsByCategory(id);
            const featured =
              getProductBySlug(categoryShowcaseSlugs[id] ?? '') ?? listed[0];
            const names = listed
              .slice(0, 4)
              .map((item) => tx(item.name))
              .filter(Boolean);
            const specs = featured
              ? keySpecifications(featured, 3)
                  .map((spec) => tx(spec.value))
                  .filter(Boolean)
              : [];
            const hidden = desktop && index !== active;

            return (
              <article
                key={id}
                className="home-product-panel"
                data-i={index}
                style={{ '--i': index } as CSSProperties}
                aria-hidden={hidden || undefined}
                inert={hidden ? true : undefined}
              >
                <div className="home-product-visual">
                  {featured ? (
                    <ImagePlaceholder
                      src={featured.image}
                      alt={productImageAlt(featured, featured.image, lang)}
                      label={t.productCard.imageComingSoon}
                      hint=""
                      width={1536}
                      height={1024}
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="h-full w-full bg-bg-soft"
                      imgClassName="object-contain"
                    />
                  ) : null}
                </div>
                <div className="home-product-copy">
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 heading-display text-2xl sm:text-3xl">
                    {tx(meta.label)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
                    {tx(meta.description)}
                  </p>
                  {names.length ? (
                    <p className="mt-5 text-sm text-dark">
                      <span className="font-semibold">{tx(homeCopy.modelRange)}: </span>
                      {names.join(' · ')}
                    </p>
                  ) : null}
                  {specs.length ? (
                    <p className="mt-2 text-sm text-text-secondary">{specs.join(' · ')}</p>
                  ) : null}
                  <p className="mt-6">
                    <LocaleLink
                      to={getCategoryPath(id)}
                      className="text-sm font-semibold tracking-wide text-dark hover:text-primary"
                      tabIndex={hidden ? -1 : undefined}
                    >
                      {tx(homeCopy.explore)} →
                    </LocaleLink>
                  </p>
                  {featured ? (
                    <p className="mt-2">
                      <LocaleLink
                        to={`/products/${featured.slug}`}
                        className="text-sm text-text-secondary hover:text-primary"
                        tabIndex={hidden ? -1 : undefined}
                      >
                        {tx(featured.name)}
                      </LocaleLink>
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        <div className="home-product-dots" role="tablist" aria-label={t.categories.title}>
          {order.map((id, index) => (
            <button
              key={id}
              type="button"
              role="tab"
              className="home-product-dot"
              aria-selected={index === active}
              aria-label={tx(categoryMeta[id].label)}
              onClick={() => setIndex(index)}
              onFocus={() => setIndex(index)}
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>
    </SceneFrame>
  );
}
