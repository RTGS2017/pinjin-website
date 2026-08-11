import { SectionTitle } from '@/components/ui/SectionTitle';
import { useI18n } from '@/i18n/I18nContext';

export function WhyPinjin() {
  const { t } = useI18n();
  const items = [
    { id: '01', title: t.why.v1t, subtitle: t.why.v1s, description: t.why.v1d },
    { id: '02', title: t.why.v2t, subtitle: t.why.v2s, description: t.why.v2d },
    { id: '03', title: t.why.v3t, subtitle: t.why.v3s, description: t.why.v3d },
    { id: '04', title: t.why.v4t, subtitle: t.why.v4s, description: t.why.v4d },
  ];

  return (
    <section id="why-pinjin" className="section-y bg-bg-soft scroll-mt-24">
      <div className="container-site">
        <SectionTitle title={t.why.title} />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-border bg-bg p-7 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-primary">
                {item.id}
              </p>
              <h3 className="mt-3 text-lg font-semibold tracking-wide text-dark">
                {item.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-text">{item.subtitle}</p>
              <p className="mt-3 text-sm text-text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
