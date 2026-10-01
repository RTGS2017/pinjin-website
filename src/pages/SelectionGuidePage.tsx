import { LocaleLink } from '@/i18n/navigation';
import { selectionGuideItems } from '@/data/selectionGuide';
import { getProductBySlug } from '@/data/products';
import { getNotSuitable, specText } from '@/data/productP01';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SEO } from '@/components/SEO';
import { CompanyEntity } from '@/components/CompanyEntity';
import { useI18n } from '@/i18n/I18nContext';

export function SelectionGuidePage() {
  const { t, tx, lang } = useI18n();

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
              <div className="mt-5 overflow-x-auto border border-border">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-bg-soft text-dark">
                    <tr>
                      <th className="px-3 py-2 font-semibold">{t.selectionGuide.colModel}</th>
                      <th className="px-3 py-2 font-semibold">{t.selectionGuide.colPower}</th>
                      <th className="px-3 py-2 font-semibold">{t.selectionGuide.colOutput}</th>
                      <th className="px-3 py-2 font-semibold">{t.selectionGuide.colDistance}</th>
                      <th className="px-3 py-2 font-semibold">{t.selectionGuide.colBound}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.productSlugs.map((slug) => {
                      const product = getProductBySlug(slug);
                      if (!product) return null;
                      const power =
                        specText(product, lang, ['motor power', 'engine', 'diesel']) ?? '—';
                      const output =
                        specText(product, lang, ['output', 'capacity', 'delivery']) ?? '—';
                      const distance = [
                        specText(product, lang, ['horizontal']),
                        specText(product, lang, ['vertical']),
                      ]
                        .filter(Boolean)
                        .join(' / ');
                      const bound = tx(getNotSuitable(product)[0]);
                      return (
                        <tr key={slug} className="border-t border-border">
                          <td className="px-3 py-2 font-medium text-dark">
                            <LocaleLink
                              to={`/products/${slug}`}
                              className="hover:text-primary"
                            >
                              {tx(product.name)}
                            </LocaleLink>
                          </td>
                          <td className="px-3 py-2 text-text-secondary">{power}</td>
                          <td className="px-3 py-2 text-text-secondary">{output}</td>
                          <td className="px-3 py-2 text-text-secondary">{distance || '—'}</td>
                          <td className="px-3 py-2 text-text-secondary">{bound}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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
