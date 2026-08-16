import { ContactActions } from '@/components/ui/ContactActions';
import { useI18n } from '@/i18n/I18nContext';

export function CTA() {
  const { t } = useI18n();

  return (
    <section className="section-y bg-dark text-white">
      <div className="container-site">
        <div className="max-w-3xl fade-up">
          <h2 className="heading-display whitespace-pre-line text-3xl text-white sm:text-4xl lg:text-5xl">
            {t.cta.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base text-white/70 sm:text-lg">
            {t.cta.subtitle}
          </p>
          <div className="mt-8">
            <ContactActions tone="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
