import { applicationPages, getApplicationHero } from '@/data/applicationsContent';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LocaleLink } from '@/i18n/navigation';
import { useI18n } from '@/i18n/I18nContext';
import { SceneFrame } from './homeScroll';

export function SceneApplications() {
  const { t, tx } = useI18n();
  const cases = applicationPages.filter((app) => getApplicationHero(app));

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

      <div className="mt-10 space-y-16">
        {cases.map((item, index) => {
          const image = getApplicationHero(item);
          if (!image) return null;
          const title = labels[item.id] || tx(item.title);
          return (
            <article
              key={item.id}
              className={[
                'home-app-row grid items-center gap-8 lg:grid-cols-12',
                index % 2 === 1 ? 'home-app-row-alt' : '',
              ].join(' ')}
            >
              <div className="home-app-visual overflow-hidden lg:col-span-7">
                <ImagePlaceholder
                  src={image.src}
                  alt={`${tx(image.alt)} — Xingtai concrete machinery manufacturer, China concrete pump factory`}
                  label={t.placeholder.application}
                  hint=""
                  eager={index === 0}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="aspect-[16/10] w-full"
                  imgClassName="home-app-img object-cover"
                />
              </div>
              <div className="lg:col-span-5">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-primary">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 heading-display text-2xl sm:text-3xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
                  {tx(item.summary)}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-dark">
                  {item.points.map((point) => (
                    <li key={point.en}>{tx(point)}</li>
                  ))}
                </ul>
                <p className="mt-6">
                  <LocaleLink
                    to={`/solutions/${item.solutionSlug}`}
                    className="text-sm font-semibold tracking-wide text-dark hover:text-primary"
                  >
                    {t.applications.viewCase} →
                  </LocaleLink>
                </p>
              </div>
            </article>
          );
        })}
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
