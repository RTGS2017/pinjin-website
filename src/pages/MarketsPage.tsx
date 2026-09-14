import { LocaleLink } from '@/i18n/navigation';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { contactInquiryPath } from '@/config/site';
import { SEO, buildFaqPageJsonLd, buildOrganizationJsonLd } from '@/components/SEO';
import { marketsContent } from '@/data/markets';
import { useI18n } from '@/i18n/I18nContext';

export function MarketsPage() {
  const { t, tx } = useI18n();
  const title = tx(marketsContent.title);
  const description = tx(marketsContent.description);
  const faqs = marketsContent.faqs.map((item) => ({
    question: tx(item.question),
    answer: tx(item.answer),
  }));

  return (
    <section className="section-y bg-bg">
      <SEO
        title={title}
        description={description}
        path="/markets"
        keywords="target markets, concrete pump manufacturer China, Xingtai export concrete pump, electric diesel mixer pump"
        jsonLd={[buildOrganizationJsonLd(), buildFaqPageJsonLd(faqs)]}
      />
      <div className="container-site max-w-3xl">
        <SectionTitle
          eyebrow={t.footer.company}
          title={tx(marketsContent.h1)}
          subtitle={tx(marketsContent.intro)}
        />

        <div className="mt-10 space-y-8 text-text-secondary">
          {marketsContent.sections.map((section) => (
            <section key={section.heading.en}>
              <h2 className="text-lg font-semibold text-dark">{tx(section.heading)}</h2>
              <p className="mt-3">{tx(section.body)}</p>
            </section>
          ))}
        </div>

        {faqs.length > 0 ? (
          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-semibold text-dark">{t.detail.faq}</h2>
            {faqs.map((item) => (
              <div key={item.question} className="border border-border p-5">
                <h3 className="font-semibold text-dark">{item.question}</h3>
                <p className="mt-2 text-sm">{item.answer}</p>
              </div>
            ))}
          </section>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-3">
          <Button to={contactInquiryPath} size="lg">
            {t.hero.quote}
          </Button>
          <LocaleLink to="/products" className="inline-flex items-center text-sm font-semibold hover:text-primary">
            {t.page.browseProducts}
          </LocaleLink>
        </div>

        <p className="mt-8 text-sm">
          <LocaleLink to="/about" className="font-semibold hover:text-primary">
            {t.footer.about} →
          </LocaleLink>
          {' · '}
          <LocaleLink to="/factory" className="font-semibold hover:text-primary">
            {t.footer.factory} →
          </LocaleLink>
        </p>
      </div>
    </section>
  );
}
