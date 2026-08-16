import { Check } from 'lucide-react';
import { ContactActions } from '@/components/ui/ContactActions';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useI18n } from '@/i18n/I18nContext';

const BENEFIT_KEYS = ['b1', 'b2', 'b3', 'b4'] as const;

interface CustomizationProps {
  compact?: boolean;
}

export function Customization({ compact = false }: CustomizationProps) {
  const { t } = useI18n();

  return (
    <section
      id="customization"
      className={`scroll-mt-24 ${compact ? 'mt-14' : 'section-y bg-bg-soft'}`}
    >
      <div className={compact ? '' : 'container-site'}>
        {compact ? (
          <h2 className="heading-display text-2xl sm:text-3xl">
            {t.customization.title}
          </h2>
        ) : (
          <SectionTitle
            title={t.customization.title}
            subtitle={t.customization.lead}
          />
        )}
        {compact ? (
          <p className="mt-4 max-w-3xl text-sm text-text-secondary sm:text-base">
            {t.customization.lead}
          </p>
        ) : null}
        <p className="mt-4 max-w-3xl text-sm text-text-secondary">
          {t.customization.body}
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {BENEFIT_KEYS.map((key) => (
            <li
              key={key}
              className="flex gap-3 border border-border bg-bg p-4 text-sm text-text-secondary"
            >
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span>{t.customization[key]}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-3xl text-sm font-medium text-dark">
          {t.customization.factoryDirect}
        </p>
        <p className="mt-5 max-w-3xl text-sm text-text-secondary">
          {t.customization.note}
        </p>
        <div className="mt-6">
          <ContactActions showCustom />
        </div>
      </div>
    </section>
  );
}
