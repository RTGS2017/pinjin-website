import { LocaleLink } from '@/i18n/navigation';
import { SEO } from '@/components/SEO';
import { CompanyEntity } from '@/components/CompanyEntity';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { getMailtoHref } from '@/config/site';
import { buildFaqPageJsonLd, siteFaqs } from '@/data/faq';
import { useI18n } from '@/i18n/I18nContext';

export function Faq() {
  const { lang, t, tx } = useI18n();

  const title =
    lang === 'zh'
      ? '常见问题 | 混凝土泵与喷涂设备 | 河北品锦机械'
      : 'FAQ | Concrete Pump Manufacturer China | Hebei Pinjin Machinery';
  const description =
    lang === 'zh'
      ? '品锦机械 FAQ：如何选型混凝土泵、最大输送距离、柴油/电机差异、砂浆与石膏喷涂机、定制与询价方式。'
      : 'Pinjin FAQ for buyers: how to choose a concrete pump, conveying distance, diesel vs motor, mortar/plaster spraying machines, customization and quotes from a China manufacturer.';

  return (
    <section className="section-y bg-bg">
      <SEO
        title={title}
        description={description}
        path="/faq"
        jsonLd={buildFaqPageJsonLd(siteFaqs, lang)}
      />
      <div className="container-site">
        <SectionTitle
          eyebrow="FAQ"
          title={
            lang === 'zh'
              ? '混凝土泵与工程设备常见问题'
              : 'Concrete Pump & Equipment FAQ'
          }
          subtitle={
            lang === 'zh'
              ? '面向采购与施工选型的问答。答案基于产品目录公开参数，不编造价格、认证或项目案例。'
              : 'Buyer-intent answers based on published catalogue specifications. No invented prices, certifications or project claims.'
          }
        />

        <div className="mt-10">
          <CompanyEntity compact />
          <p className="mt-4 text-sm text-text-secondary">
            <LocaleLink to="/product-selection-guide" className="hover:text-primary">
              {lang === 'zh'
                ? '不确定选哪款？查看产品选型指南 →'
                : 'Not sure which model? Open the Product Selection Guide →'}
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
              {lang === 'zh' ? '仍需选型协助？' : 'Need help selecting a model?'}
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              {lang === 'zh'
                ? '发送输送量、水平/垂直距离与骨料粒径，获取目录机型建议。'
                : 'Send capacity, conveying distance and aggregate size for a catalogue-based recommendation.'}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button href={getMailtoHref(t.mailSubjectInquiry)} size="lg">
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
            to="/applications"
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
