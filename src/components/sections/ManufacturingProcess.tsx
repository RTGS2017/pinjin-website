import { manufacturingSteps } from '@/data/manufacturingProcess';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useI18n } from '@/i18n/I18nContext';

export function ManufacturingProcess({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { t, tx } = useI18n();

  return (
    <section className={compact ? '' : 'section-y bg-bg'}>
      <div className={compact ? '' : 'container-site'}>
        <SectionTitle title={t.process.title} subtitle={t.process.subtitle} />
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {manufacturingSteps.map((step, index) => (
            <li key={step.id} className="border border-border bg-bg-soft p-5">
              <p className="text-xs font-semibold tracking-[0.16em] text-primary">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 font-semibold text-dark">{tx(step.title)}</h3>
              <p className="mt-2 text-sm text-text-secondary">{tx(step.body)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
