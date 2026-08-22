import { LocaleLink } from '@/i18n/navigation';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { CompanyEntity } from '@/components/CompanyEntity';
import { contactInquiryPath } from '@/config/site';
import { companyEntity } from '@/config/entity';
import { SEO, buildFactoryImageJsonLdList, buildOrganizationJsonLd } from '@/components/SEO';
import { ManufacturingProcess } from '@/components/sections/ManufacturingProcess';
import { FactoryOverview } from '@/components/sections/FactoryOverview';
import { useI18n } from '@/i18n/I18nContext';

export function About() {
  const { lang, t } = useI18n();

  const values = [
    { id: '01', title: t.why.v1t, description: t.why.v1d },
    { id: '02', title: t.why.v2t, description: t.why.v2d },
    { id: '03', title: t.why.v3t, description: t.why.v3d },
    { id: '04', title: t.why.v4t, description: t.why.v4d },
  ];

  return (
    <section className="section-y bg-bg">
      <SEO
        title={t.seo.aboutTitle}
        description={t.hero.intro}
        path="/about"
        jsonLd={[buildOrganizationJsonLd(), ...buildFactoryImageJsonLdList(lang)]}
      />
      <div className="container-site">
        <SectionTitle
          eyebrow={t.about.eyebrow}
          title={t.page.whoAreYou}
          subtitle={companyEntity.positioning[lang] || companyEntity.positioning.en}
        />

        <div className="mt-10 max-w-3xl space-y-6 text-text-secondary">
          <section>
            <h2 className="text-lg font-semibold text-dark">
              {t.page.companyIntro}
            </h2>
            <p className="mt-3">{t.company.p1}</p>
            <p className="mt-3">{t.company.p2}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark">
              {t.page.whatProducts}
            </h2>
            <ul className="mt-3 list-disc space-y-2 ps-5">
              {companyEntity.products.map((p) => (
                <li key={p.id}>{p[lang] || p.en}</li>
              ))}
            </ul>
            <p className="mt-3">
              <LocaleLink to="/products" className="font-medium text-dark hover:text-primary">
                {t.page.browseProducts}
              </LocaleLink>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark">
              {t.page.whereLocated}
            </h2>
            <p className="mt-3">
              {companyEntity.location.line1[lang] || companyEntity.location.line1.en}
              <br />
              {companyEntity.location.line2[lang] || companyEntity.location.line2.en}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark">
              {t.page.whoCustomers}
            </h2>
            <p className="mt-3">{companyEntity.customers[lang] || companyEntity.customers.en}</p>
            <p className="mt-3">{companyEntity.problemsSolved[lang] || companyEntity.problemsSolved.en}</p>
            <p className="mt-3">
              <LocaleLink to="/solutions" className="font-medium text-dark hover:text-primary">
            {t.page.viewSolutions}
              </LocaleLink>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark">
              {t.page.manufacturingFocus}
            </h2>
            <p className="mt-3">
              {t.why.v1d}
            </p>
          </section>
        </div>

        <div className="mt-16">
          <FactoryOverview />
          <p className="mt-6 text-sm">
            <LocaleLink to="/factory" className="font-semibold hover:text-primary">
              {t.page.viewFactoryCapability}
            </LocaleLink>
          </p>
        </div>

        <div className="mt-12">
          <CompanyEntity />
        </div>

        <div className="mt-16">
          <SectionTitle title={t.about.valuesTitle} />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {values.map((item) => (
              <div key={item.id} className="border border-border bg-bg-soft p-6">
                <p className="text-xs font-semibold tracking-[0.18em] text-primary">
                  {item.id}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-wide text-dark">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="process" className="mt-16 scroll-mt-24">
          <ManufacturingProcess compact />
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Button to={contactInquiryPath} size="lg">
            {t.about.contact}
          </Button>
          <Button to="/faq" variant="outline" size="lg">
            FAQ
          </Button>
        </div>
      </div>
    </section>
  );
}
