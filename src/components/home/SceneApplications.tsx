import type { CSSProperties } from 'react';
import { homeApplicationClips, homeApplicationLead } from '@/data/homeApplicationClips';
import { categoryMeta, getProductBySlug } from '@/data/products';
import { LocaleLink } from '@/i18n/navigation';
import { useI18n } from '@/i18n/I18nContext';
import { useHoverAutoplay } from '@/hooks/useHoverAutoplay';
import { ApplicationClip } from './ApplicationClip';
import { SceneFrame } from './homeScroll';

export function SceneApplications() {
  const { t, tx } = useI18n();
  const { index: active, setIndex, desktop, pauseProps } = useHoverAutoplay(
    homeApplicationClips.length,
    12000,
  );

  return (
    <SceneFrame sceneKey="applications" tone="light">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {t.applications.title}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        {t.applications.title}
      </h2>
      <p className="mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
        {tx(homeApplicationLead)}
      </p>

      <div
        className="home-product-viewport mt-10"
        style={{ '--slide': active } as CSSProperties}
        aria-roledescription="carousel"
        aria-label={t.applications.title}
        {...pauseProps}
      >
        <div className="home-product-track">
          {homeApplicationClips.map((clip, index) => {
            const hidden = desktop && index !== active;
            const product = getProductBySlug(clip.productSlug);
            const title = tx(clip.title);
            const productName = product ? tx(product.name) : title;
            const alt = `${tx(clip.alt)} — Xingtai concrete machinery manufacturer`;

            return (
              <article
                key={clip.id}
                className="home-product-panel home-app-panel"
                data-i={index}
                style={{ '--i': index } as CSSProperties}
                aria-hidden={hidden || undefined}
                inert={hidden ? true : undefined}
              >
                <ApplicationClip
                  src={clip.src}
                  poster={clip.poster}
                  alt={alt}
                  active={!hidden}
                  index={index}
                  current={active}
                  count={homeApplicationClips.length}
                  desktop={desktop}
                />
                <div className="home-product-copy">
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 heading-display text-2xl sm:text-3xl">{title}</h3>
                  {product ? (
                    <p className="mt-3">
                      <LocaleLink
                        to={`/products/${product.slug}`}
                        className="text-base font-semibold text-dark hover:text-primary"
                        tabIndex={hidden ? -1 : undefined}
                      >
                        {productName}
                      </LocaleLink>
                    </p>
                  ) : null}
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
                    {tx(clip.summary)}
                  </p>
                  {clip.points.length ? (
                    <ul className="mt-5 space-y-2 text-sm text-dark">
                      {clip.points.map((point) => (
                        <li key={point.en}>{tx(point)}</li>
                      ))}
                    </ul>
                  ) : null}
                  {product ? (
                    <p className="mt-6">
                      <LocaleLink
                        to={`/products/${product.slug}`}
                        className="text-sm font-semibold tracking-wide text-dark hover:text-primary"
                        tabIndex={hidden ? -1 : undefined}
                      >
                        {productName} →
                      </LocaleLink>
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        <div className="home-product-dots" role="tablist" aria-label={t.applications.title}>
          {homeApplicationClips.map((clip, index) => (
            <button
              key={clip.id}
              type="button"
              role="tab"
              className="home-product-dot"
              aria-selected={index === active}
              aria-label={tx(clip.title)}
              onClick={() => setIndex(index)}
              onFocus={() => setIndex(index)}
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-10">
        <LocaleLink
          to="/products/spraying-machines"
          className="text-sm font-semibold text-dark hover:text-primary"
        >
          {tx(categoryMeta['spraying-machine'].label)} →
        </LocaleLink>
      </p>
    </SceneFrame>
  );
}
