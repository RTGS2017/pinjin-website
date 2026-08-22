import { LocaleLink } from '@/i18n/navigation';
import { SEO } from '@/components/SEO';
import { CompanyEntity } from '@/components/CompanyEntity';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Button } from '@/components/ui/Button';
import { applicationPages } from '@/data/applicationsContent';
import { products } from '@/data/products';
import { useI18n } from '@/i18n/I18nContext';

export function ApplicationsPage() {
  const { t, tx } = useI18n();

  return (
    <section className="section-y bg-bg">
      <SEO
        title={t.seo.applicationsTitle}
        description={t.seo.applicationsDesc}
        path="/applications"
      />
      <div className="container-site">
        <SectionTitle
          eyebrow={t.nav.applications}
          title={t.page.applicationsHeading}
          subtitle={t.page.applicationsSubtitle}
        />

        <div className="mt-8 max-w-3xl space-y-3 text-sm text-text-secondary">
          <h2 className="text-base font-semibold text-dark">
            {t.page.whoAreYou}
          </h2>
          <p>{t.page.whoAreYouBody}</p>
          <h2 className="text-base font-semibold text-dark">
            {t.page.whatProblems}
          </h2>
          <p>{t.page.whatProblemsBody}</p>
        </div>

        <div className="mt-10">
          <CompanyEntity compact />
        </div>

        <div className="mt-14 space-y-14">
          {applicationPages.map((app) => {
            const related = products
              .filter((p) => p.category === app.relatedCategory)
              .slice(0, 4);
            return (
              <article
                key={app.id}
                id={app.slug}
                className="scroll-mt-24 border border-border"
              >
                <div className="grid gap-0 lg:grid-cols-2">
                  <ImagePlaceholder
                    src={app.images[0]?.src ?? ''}
                    alt={app.images[0] ? tx(app.images[0].alt) : `${tx(app.title)} - Hebei Pinjin Machinery`}
                    label={t.placeholder.application}
                    hint={t.placeholder.applicationHint}
                    width={app.images[0]?.width ?? 1600}
                    height={app.images[0]?.height ?? 1200}
                    className="aspect-[4/3] w-full lg:aspect-auto lg:min-h-full"
                    imgClassName="object-cover"
                  />
                  <div className="p-6 sm:p-8">
                    <h2 className="heading-display text-2xl sm:text-3xl">
                      {tx(app.title)}
                    </h2>
                    <p className="mt-4 text-sm text-text-secondary sm:text-base">
                      {tx(app.summary)}
                    </p>
                    <h3 className="mt-6 text-sm font-semibold tracking-wide text-dark">
                        {t.page.selectionChecklist}
                    </h3>
                    <ul className="mt-3 list-disc space-y-2 ps-5 text-sm text-text-secondary">
                      {app.points.map((point) => (
                        <li key={point.en}>{tx(point)}</li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold text-dark">
                        {t.page.relatedProducts}
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm">
                        {related.map((p) => (
                          <li key={p.slug}>
                            <LocaleLink
                              to={`/products/${p.slug}`}
                              className="font-medium text-dark hover:text-primary"
                            >
                              {tx(p.name)}
                            </LocaleLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12">
          <Button to="/products" size="lg">
            {t.featured.viewAll}
          </Button>
        </div>
      </div>
    </section>
  );
}
