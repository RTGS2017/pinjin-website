import { LocaleLink } from '@/i18n/navigation';
import { SEO } from '@/components/SEO';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n/I18nContext';

export function CopyrightPage() {
  const { t } = useI18n();

  return (
    <section className="section-y bg-bg">
      <SEO
        title={t.seo.copyrightTitle}
        description={t.copyright.lead}
        path="/copyright"
      />
      <div className="container-site">
        <SectionTitle title={t.copyright.title} subtitle={t.copyright.lead} />
        <div className="mt-10 max-w-3xl space-y-6 text-sm leading-relaxed text-text-secondary sm:text-base">
          <p>{t.copyright.notice}</p>
          <p>{t.copyright.credit}</p>
          <div>
            <h2 className="text-lg font-semibold text-dark">{t.copyright.licenseHeading}</h2>
            <p className="mt-2">{t.copyright.licenseBody}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-dark">{t.copyright.requestHeading}</h2>
            <p className="mt-2">{t.copyright.requestBody}</p>
          </div>
          <div className="pt-2">
            <Button to="/contact">{t.copyright.contact}</Button>
          </div>
          <p>
            <LocaleLink to="/factory" className="font-medium text-dark hover:text-primary">
              {t.factory.viewFactory} →
            </LocaleLink>
          </p>
        </div>
      </div>
    </section>
  );
}
