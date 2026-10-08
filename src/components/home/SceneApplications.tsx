import type { CSSProperties } from 'react';
import { applicationPages } from '@/data/applicationsContent';
import { homeApplicationClips } from '@/data/homeApplicationClips';
import { categoryMeta, getCategoryPath } from '@/data/products';
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

  const labels: Record<string, string> = {
    building: t.applications.construction,
    infrastructure: t.applications.concrete,
    spraying: t.applications.mortar,
    handling: t.applications.plaster,
  };

  return (
    <SceneFrame sceneKey="applications" tone="light">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {t.applications.title}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        {t.applications.title}
      </h2>
      <p className="mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
        {t.applications.subtitle}
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
            const item = applicationPages.find((page) => page.id === clip.appId);
            if (!item) return null;
            const title =
              clip.id === 'spraying-scaffold' ? tx(item.title) : labels[item.id] || tx(item.title);
            const hidden = desktop && index !== active;
            const categoryLabel = tx(categoryMeta[item.relatedCategory].label);
            const image = item.images[0];
            const alt = image
              ? `${tx(image.alt)} — Xingtai concrete machinery manufacturer, China concrete pump factory`
              : title;

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
                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-text-secondary sm:text-base">
                    {tx(item.summary)}
                  </p>
                  {item.points.length ? (
                    <ul className="mt-5 space-y-2 text-sm text-dark">
                      {item.points.slice(0, 3).map((point) => (
                        <li key={point.en}>{tx(point)}</li>
                      ))}
                    </ul>
                  ) : null}
                  <p className="mt-6">
                    <LocaleLink
                      to={`/solutions/${item.solutionSlug}`}
                      className="text-sm font-semibold tracking-wide text-dark hover:text-primary"
                      tabIndex={hidden ? -1 : undefined}
                    >
                      {t.applications.viewCase} →
                    </LocaleLink>
                  </p>
                  <p className="mt-2">
                    <LocaleLink
                      to={getCategoryPath(item.relatedCategory)}
                      className="text-sm text-text-secondary hover:text-primary"
                      tabIndex={hidden ? -1 : undefined}
                    >
                      {categoryLabel}
                    </LocaleLink>
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="home-product-dots" role="tablist" aria-label={t.applications.title}>
          {homeApplicationClips.map((clip, index) => {
            const item = applicationPages.find((page) => page.id === clip.appId);
            const title =
              clip.id === 'spraying-scaffold'
                ? item
                  ? tx(item.title)
                  : clip.id
                : labels[clip.appId] || clip.id;
            return (
              <button
                key={clip.id}
                type="button"
                role="tab"
                className="home-product-dot"
                aria-selected={index === active}
                aria-label={title}
                onClick={() => setIndex(index)}
                onFocus={() => setIndex(index)}
              >
                {String(index + 1).padStart(2, '0')}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-10">
        <LocaleLink
          to="/solutions"
          className="text-sm font-semibold text-dark hover:text-primary"
        >
          {t.applications.viewAll} →
        </LocaleLink>
      </p>
    </SceneFrame>
  );
}
