import { Check } from 'lucide-react';
import { whyFactoryPoints } from '@/data/manufacturingProcess';
import { useI18n } from '@/i18n/I18nContext';

export function WhyFactory() {
  const { t, tx } = useI18n();

  return (
    <section className="mt-14">
      <h2 className="heading-display text-2xl sm:text-3xl">{t.whyFactory.title}</h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {whyFactoryPoints.map((item) => (
          <li
            key={item.en}
            className="flex gap-3 border border-border bg-bg-soft p-4 text-sm text-text-secondary"
          >
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <span>{tx(item)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
