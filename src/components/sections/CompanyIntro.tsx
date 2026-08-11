import { SectionTitle } from '@/components/ui/SectionTitle';
import { useI18n } from '@/i18n/I18nContext';

export function CompanyIntro() {
  const { t } = useI18n();
  const highlights = [
    { title: t.company.h1, description: t.company.h1d },
    { title: t.company.h2, description: t.company.h2d },
    { title: t.company.h3, description: t.company.h3d },
  ];

  return (
    <section className="section-y bg-bg">
      <div className="container-site">
        <SectionTitle title={t.company.title} />
        <div className="mt-8 max-w-3xl space-y-4 text-text-secondary">
          <p>{t.company.p1}</p>
          <p>{t.company.p2}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="border border-border bg-bg-soft p-6 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <p className="text-sm font-semibold tracking-[0.12em] text-dark">
                {item.title}
              </p>
              <p className="mt-2 text-sm text-text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
