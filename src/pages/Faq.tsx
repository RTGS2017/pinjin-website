import { LocaleLink } from '@/i18n/navigation';
import { SEO } from '@/components/SEO';
import { CompanyEntity } from '@/components/CompanyEntity';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { contactInquiryPath } from '@/config/site';
import { buildFaqPageJsonLd, siteFaqs } from '@/data/faq';
import { useI18n } from '@/i18n/I18nContext';

export function Faq() {
  const { lang, t, tx } = useI18n();

  return (
    <section className="section-y bg-bg">
      <SEO
        title={t.seo.faqTitle}
        description={t.page.faqSubtitle}
        path="/faq"
        jsonLd={buildFaqPageJsonLd(siteFaqs, lang)}
      />
      <div className="container-site">
        <SectionTitle
          eyebrow="FAQ"
          title={t.page.faqHeading}
          subtitle={t.page.faqSubtitle}
        />

        <div className="mt-10">
          <CompanyEntity compact />
          <p className="mt-4 text-sm text-text-secondary">
            <LocaleLink to="/product-selection-guide" className="hover:text-primary">
              {t.productsPage.selectionCta} →
            </LocaleLink>
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {siteFaqs.map((item, index) => (
            <details
              key={item.id}
              className="group border border-border bg-bg open:bg-bg-soft"
              open={index < 3}
            >
              <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-dark marker:content-none">
                <span className="flex items-start gap-3">
                  <span className="mt-0.5 text-xs font-semibold text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{tx(item.question)}</span>
                </span>
              </summary>
              <div className="border-t border-border px-5 py-4 text-sm leading-relaxed text-text-secondary sm:pl-14">
                <p>{tx(item.answer)}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border border-border bg-bg-soft p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-dark">
              {t.page.needHelpSelecting}
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              {t.page.needHelpBody}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button to={contactInquiryPath} size="lg">
              {t.nav.getQuote}
            </Button>
            <Button to="/products" variant="outline" size="lg">
              {t.nav.products}
            </Button>
          </div>
        </div>

        <p className="mt-8 text-sm text-text-secondary">
          <LocaleLink to="/about" className="text-dark underline-offset-2 hover:text-primary hover:underline">
            {t.nav.about}
          </LocaleLink>
          {' · '}
          <LocaleLink
            to="/solutions"
            className="text-dark underline-offset-2 hover:text-primary hover:underline"
          >
            {t.nav.applications}
          </LocaleLink>
          {' · '}
          <LocaleLink
            to="/contact"
            className="text-dark underline-offset-2 hover:text-primary hover:underline"
          >
            {t.nav.contact}
          </LocaleLink>
        </p>
      </div>
    </section>
  );
}
