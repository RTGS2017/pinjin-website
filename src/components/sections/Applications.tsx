import { useState } from 'react';
import { applicationPages, getApplicationHero } from '@/data/applicationsContent';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Button } from '@/components/ui/Button';
import {
  IndustrialCarousel,
  carouselPanelStyle,
  formatSlideIndex,
} from '@/components/ui/IndustrialCarousel';
import { useI18n } from '@/i18n/I18nContext';

export function Applications() {
  const { t, tx } = useI18n();
  const cases = applicationPages.filter((app) => getApplicationHero(app));
  const total = cases.length;
  const [active, setActive] = useState(0);

  const labels: Record<string, string> = {
    building: t.applications.construction,
    infrastructure: t.applications.concrete,
    spraying: t.applications.mortar,
    handling: t.applications.plaster,
  };

  if (!total) return null;

  const current = cases[active] ?? cases[0];
  const title = labels[current.id] || tx(current.title);

  return (
    <section id="applications" className="section-y bg-bg-soft scroll-mt-24">
      <div className="container-site">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            title={t.applications.title}
            subtitle={t.applications.subtitle}
          />
          <Button to="/solutions" variant="outline" className="shrink-0">
            {t.applications.viewAll}
          </Button>
        </div>

        <IndustrialCarousel
          count={total}
          label={t.applications.title}
          chrome="sides"
          className="mt-12"
          onChange={setActive}
        >
          {({ active: index, direction }) => (
            <div className="relative overflow-hidden rounded-[1.25rem] bg-card">
              {cases.map((item, itemIndex) => {
                const hero = getApplicationHero(item);
                if (!hero) return null;
                const selected = itemIndex === index;
                return (
                  <div
                    key={item.id}
                    className={selected ? 'relative z-10' : 'absolute inset-0'}
                    style={carouselPanelStyle(selected, direction)}
                    aria-hidden={!selected}
                  >
                    <ImagePlaceholder
                      src={hero.src}
                      alt={`${tx(hero.alt)} — Xingtai concrete machinery manufacturer, China concrete pump factory`}
                      label={t.placeholder.application}
                      hint=""
                      priority={itemIndex === 0}
                      eager={itemIndex === 1}
                      width={hero.width}
                      height={hero.height}
                      sizes="(max-width: 1024px) 100vw, 900px"
                      className="aspect-[16/9] w-full"
                      imgClassName="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </IndustrialCarousel>

        <div className="mx-auto mt-8 max-w-3xl text-center sm:text-left">
          <p className="text-sm font-semibold tracking-[0.14em] text-silver tabular-nums">
            {formatSlideIndex(active, total)}
          </p>
          <h3 className="mt-2 heading-display text-2xl sm:text-3xl">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
            {tx(current.summary)}
          </p>
          <div className="mt-5">
            <Button to={`/solutions/${current.solutionSlug}`}>
              {t.applications.viewCase}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
