import { performanceValues } from '@/config/site';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useI18n } from '@/i18n/I18nContext';

export function PerformanceNumbers() {
  const { t } = useI18n();
  const labels = [t.performance.n1, t.performance.n2, t.performance.n3, t.performance.n4];

  return (
    <section className="section-y bg-dark text-white">
      <div className="container-site">
        <SectionTitle
          title={t.performance.title}
          light
          subtitle={t.performance.subtitle}
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {performanceValues.map((value, index) => (
            <div key={value} className="border-t border-white/15 pt-6">
              <p className="text-3xl font-semibold tracking-wide text-primary sm:text-4xl">
                {value}
              </p>
              <p className="mt-3 text-sm text-white/65">{labels[index]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
