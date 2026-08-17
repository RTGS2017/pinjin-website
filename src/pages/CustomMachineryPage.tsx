import { LocaleLink } from '@/i18n/navigation';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ContactActions } from '@/components/ui/ContactActions';
import { InternalLinks } from '@/components/InternalLink';
import { FactoryProofStrip } from '@/components/sections/FactoryOverview';
import {
  SEO,
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
} from '@/components/SEO';
import { customMachineryContent } from '@/data/customMachinery';
import { clusterForCustomMachinery } from '@/data/topicClusters';
import { useI18n } from '@/i18n/I18nContext';
import { localePath } from '@/i18n/paths';

export function CustomMachineryPage() {
  const { lang, t, tx } = useI18n();
  const content = customMachineryContent;
  const faqs = content.faqs.map((item) => ({
    question: tx(item.question),
    answer: tx(item.answer),
  }));
  const path = '/products/custom-machinery';

  return (
    <section className="section-y bg-bg">
      <SEO
        title={tx(content.title)}
        description={tx(content.description)}
        path={path}
        keywords={content.keywords.join(', ')}
        jsonLd={[
          buildFaqPageJsonLd(faqs),
          buildBreadcrumbJsonLd([
            { name: t.detail.home, path: localePath('/', lang) },
            { name: t.detail.products, path: localePath('/products', lang) },
            { name: tx(content.h1), path: localePath(path, lang) },
          ]),
        ]}
      />
      <div className="container-site">
        <nav className="mb-6 text-sm text-text-secondary">
          <LocaleLink to="/" className="hover:text-primary">
            {t.detail.home}
          </LocaleLink>
          <span aria-hidden> / </span>
          <LocaleLink to="/products" className="hover:text-primary">
            {t.detail.products}
          </LocaleLink>
          <span aria-hidden> / </span>
          <span className="text-dark">{tx(content.h1)}</span>
        </nav>

        <SectionTitle title={tx(content.h1)} subtitle={tx(content.intro)} heading="h1" />

        <section className="mt-10 border border-border bg-bg-soft p-6">
          <h2 className="heading-display text-2xl">{t.detail.definition}</h2>
          <p className="mt-4 text-sm text-text-secondary sm:text-base">
            {tx(content.definition)}
          </p>
        </section>

        <section className="mt-14">
          <h2 className="heading-display text-2xl sm:text-3xl">
            {tx(content.whatTitle)}
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-text-secondary sm:text-base">
            {content.whatItems.map((item) => (
              <li key={item.en}>{tx(item)}</li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="heading-display text-2xl sm:text-3xl">
            {tx(content.processTitle)}
          </h2>
          <ol className="mt-4 space-y-2 text-sm text-text-secondary sm:text-base">
            {content.processSteps.map((item) => (
              <li key={item.en}>{tx(item)}</li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-text-secondary">{tx(content.note)}</p>
        </section>

        <FactoryProofStrip />

        <section className="mt-14">
          <h2 className="heading-display text-2xl">{t.detail.faq}</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((item) => (
              <div key={item.question} className="border border-border p-5">
                <h3 className="font-semibold text-dark">{item.question}</h3>
                <p className="mt-2 text-sm text-text-secondary">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <InternalLinks cluster={clusterForCustomMachinery()} />

        <div className="mt-16 border border-border bg-bg-soft p-8">
          <h2 className="heading-display text-2xl">{t.detail.contactEngineer}</h2>
          <p className="mt-3 text-sm text-text-secondary">
            {t.detail.contactEngineerLead}
          </p>
          <div className="mt-6">
            <ContactActions />
          </div>
        </div>
      </div>
    </section>
  );
}
