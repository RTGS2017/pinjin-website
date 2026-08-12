import { LocaleLink } from '@/i18n/navigation';
import { selectionGuideItems } from '@/data/selectionGuide';
import { getProductBySlug } from '@/data/products';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SEO } from '@/components/SEO';
import { CompanyEntity } from '@/components/CompanyEntity';
import { useI18n } from '@/i18n/I18nContext';

export function SelectionGuidePage() {
  const { lang, t, tx } = useI18n();

  const description =
    lang === 'zh'
      ? '品锦产品选型指南：按高层/小型工地、柴油/电机、砂浆石膏喷涂、喷浆与物料搬运等目录参数对照推荐型号。'
      : 'Pinjin product selection guide: catalogue-based shortlists for high-rise, compact sites, diesel vs electric, mortar/plaster spraying, shotcrete and material handling.';

  return (
    <section className="section-y bg-bg">
      <SEO
        title={t.seo.selectionTitle}
        description={description}
        path="/product-selection-guide"
      />
      <div className="container-site">
        <SectionTitle
          title={t.selectionGuide.title}
          subtitle={t.selectionGuide.subtitle}
        />

        <div className="mt-8 max-w-3xl text-sm text-text-secondary">
          <p>
            {lang === 'zh'
              ? '本页回答采购常见问题：“我该选哪款混凝土泵/喷涂设备？”推荐仅依据产品目录公开参数，不编造项目案例。'
              : 'This page answers a common buyer question: “Which concrete pump or spraying machine should I choose?” Recommendations use published catalogue parameters only—no fake project claims.'}
          </p>
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
