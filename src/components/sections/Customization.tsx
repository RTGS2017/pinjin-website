import { withBase } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useI18n } from '@/i18n/I18nContext';
import { localePath } from '@/i18n/paths';

export function Customization() {
  const { lang, t } = useI18n();

  return (
    <section id="customization" className="section-y bg-bg-soft scroll-mt-24">
      <div className="container-site">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <SectionTitle
            title={t.customization.title}
            subtitle={t.customization.subtitle}
          />
          <div className="lg:justify-self-end">
            <Button
              href={withBase(localePath('/#inquiry', lang))}
              variant="secondary"
              size="lg"
            >
              {t.customization.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
