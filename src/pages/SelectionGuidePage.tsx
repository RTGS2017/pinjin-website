import { LocaleLink } from '@/i18n/navigation';
import { selectionGuideItems } from '@/data/selectionGuide';
import { getProductBySlug } from '@/data/products';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SEO } from '@/components/SEO';
import { CompanyEntity } from '@/components/CompanyEntity';
import { useI18n } from '@/i18n/I18nContext';

export function SelectionGuidePage() {
  const { t, tx } = useI18n();

  return (
    <section className="section-y bg-bg">
      <SEO
        title={t.seo.selectionTitle}
        description={t.seo.selectionDesc}
        path="/product-selection-guide"
      />
      <div className="container-site">
        <SectionTitle
          title={t.selectionGuide.title}
          subtitle={t.selectionGuide.subtitle}
        />

        <div className="mt-8 max-w-3xl text-sm text-text-secondary">
          <p>{t.page.selectionIntro}</p>
        </div>

        <div className="mt-8">
          <CompanyEntity compact />
        </div>

        <div className="mt-12 space-y-8">
          {selectionGuideItems.map((item) => (
            <article key={item.id} className="border border-border p-6">
              <h2 className="heading-display text-xl sm:text-2xl">
                {tx(item.question)}
              </h2>
              <p className="mt-3 text-sm font-medium text-dark">
                {tx(item.recommendation)}
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                <span className="font-semibold text-dark">
                  {t.selectionGuide.why}:{' '}
                </span>
                {tx(item.rationale)}
              </p>
              <div className="mt-5">
                <p className="text-xs font-semibold tracking-wide text-dark uppercase">
                  {t.selectionGuide.recommended}
                </p>
                <ul className="mt-3 flex flex-wrap gap-3">
                  {item.productSlugs.map((slug) => {
                    const product = getProductBySlug(slug);
                    if (!product) return null;
                    return (
                      <li key={slug}>
                        <LocaleLink
                          to={`/products/${slug}`}
                          className="inline-flex border border-border px-3 py-2 text-sm font-medium text-dark transition-colors hover:border-primary hover:text-primary"
                        >
                          {tx(product.name)} →
                        </LocaleLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm text-text-secondary">
          <LocaleLink to="/products" className="hover:text-primary">
            {t.detail.back} →
          </LocaleLink>
        </p>
      </div>
    </section>
  );
}
