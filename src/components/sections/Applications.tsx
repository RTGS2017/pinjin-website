import { useState } from 'react';
import { applicationPages, getApplicationHero } from '@/data/applicationsContent';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { StageGallery } from '@/components/ui/StageGallery';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n/I18nContext';

export function Applications() {
  const { t, tx } = useI18n();
  const cases = applicationPages.filter((app) => getApplicationHero(app));
  const [active, setActive] = useState(0);
  const current = cases[active] ?? cases[0];

  const labels: Record<string, string> = {
    building: t.applications.construction,
    infrastructure: t.applications.concrete,
    spraying: t.applications.mortar,
    handling: t.applications.plaster,
  };

  if (!current) return null;

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

        <div className="mt-10">
          <StageGallery
            frames={cases.map((item) => {
              const image = getApplicationHero(item)!;
              return {
                id: item.id,
                src: image.src,
                alt: `${tx(image.alt)} — Xingtai concrete machinery manufacturer, China concrete pump factory`,
                label: labels[item.id] || tx(item.title),
                width: image.width,
                height: image.height,
              };
            })}
            active={active}
            onChange={setActive}
            placeholderLabel={t.placeholder.application}
          />
        </div>

        <div className="mx-auto mt-8 max-w-3xl text-center sm:text-left">
          <h3 className="heading-display text-2xl sm:text-3xl">{title}</h3>
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
