import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n/I18nContext';

export function Customization() {
  const { t } = useI18n();

  return (
    <section className="section-y bg-bg-soft">
      <div className="container-site">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <SectionTitle
            title={t.customization.title}
            subtitle={t.customization.subtitle}
          />
          <div className="lg:justify-self-end">
            <Button href="/#contact" variant="secondary" size="lg">
              {t.customization.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
