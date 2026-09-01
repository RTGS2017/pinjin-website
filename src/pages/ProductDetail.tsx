import { useParams } from 'react-router-dom';
import { LocaleLink, LocaleNavigate } from '@/i18n/navigation';
import { companyEntity } from '@/config/entity';
import {
  categoryMeta,
  getCategoryPath,
  getProductBySlug,
  getRelatedProducts,
  productImageAlt,
  resolveProductSlug,
} from '@/data/products';
import { clusterForProduct } from '@/data/topicClusters';
import { InternalLinks } from '@/components/InternalLink';
import { getProductFaqs } from '@/data/productFaqs';
import { SpecItem } from '@/components/ui/SpecItem';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductGallery } from '@/components/ui/ProductGallery';
import { ContactActions } from '@/components/ui/ContactActions';
import { Customization } from '@/components/sections/Customization';
import { FactoryProofStrip } from '@/components/sections/FactoryOverview';
import { OemNote } from '@/components/ui/OemNote';
import {
  SEO,
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
  buildProductJsonLd,
} from '@/components/SEO';
import { useI18n } from '@/i18n/I18nContext';
import { localePath } from '@/i18n/paths';

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t, tx } = useI18n();

  if (!slug) {
    return <LocaleNavigate to="/products" replace />;
  }

  const resolved = resolveProductSlug(slug);
  if (resolved !== slug) {
    return <LocaleNavigate to={`/products/${resolved}`} replace />;
  }

  const product = getProductBySlug(slug);
  if (!product) {
    return <LocaleNavigate to="/products" replace />;
  }

  const name = tx(product.name);
  const path = `/products/${product.slug}`;
  const localizedPath = localePath(path, lang);
  const related = getRelatedProducts(product);
  const faqs = getProductFaqs(product, lang).slice(0, 5);
  const categoryLabel = tx(categoryMeta[product.category].label);
  const categoryPath = getCategoryPath(product.category);
  const seoTitle = tx(product.seo.title);
  const seoDescription = tx(product.seo.description);
  const keywords = [
    product.seo.keywords.primary,
    ...product.seo.keywords.secondary,
    ...product.seo.keywords.longTail,
  ].join(', ');

  const highlightSpecs = product.specifications.slice(0, 4);
  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const advantages = product.keyFeatures.slice(0, 5);
  const inquireMessage = `${name}\n${t.detail.inquiryBody}`;

  return (
    <section className="section-y bg-bg">
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={path}
        image={product.image}
        imageAlt={productImageAlt(product, product.image, lang)}
        type="product"
        keywords={keywords}
        jsonLd={[
          buildProductJsonLd({
            name,
            description: seoDescription,
            image: product.image,
            images: gallery.map((src) => ({
              url: src,
              name,
              caption: productImageAlt(product, src, lang),
              description: tx(product.productIntroduction),
              keywords: keywords,
            })),
            path: localizedPath,
            category: categoryLabel,
            model: name,
            brand: 'Pinjin',
            lang,
            specifications: product.specifications.map((spec) => ({
              name: tx(spec.label),
              value: tx(spec.value),
            })),
          }),
          buildFaqPageJsonLd(faqs),
          buildBreadcrumbJsonLd([
            { name: t.detail.home, path: localePath('/', lang) },
            { name: t.detail.products, path: localePath('/products', lang) },
            { name: categoryLabel, path: localePath(categoryPath, lang) },
            { name, path: localizedPath },
          ]),
        ]}
      />
      <div className="container-site">
        <nav className="mb-8 text-sm text-text-secondary" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <LocaleLink to="/" className="hover:text-primary">
                {t.detail.home}
              </LocaleLink>
            </li>
            <li aria-hidden>/</li>
            <li>
              <LocaleLink to="/products" className="hover:text-primary">
                {t.detail.products}
              </LocaleLink>
            </li>
            <li aria-hidden>/</li>
            <li>
              <LocaleLink to={categoryPath} className="hover:text-primary">
                {categoryLabel}
              </LocaleLink>
            </li>
            <li aria-hidden>/</li>
            <li className="text-dark">{name}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery product={product} images={gallery} />

          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
              {categoryLabel}
            </p>
            <h1 className="mt-3 heading-display text-3xl sm:text-4xl">{name}</h1>
            <p className="mt-5 text-text-secondary">{tx(product.shortDescription)}</p>

            {highlightSpecs.length > 0 ? (
              <div className="mt-8">
                <h2 className="text-sm font-semibold tracking-[0.14em] text-dark">
                  {t.detail.keySpecs}
                </h2>
                <dl className="mt-3 border border-border p-4">
                  {highlightSpecs.map((spec) => (
                    <SpecItem
                      key={spec.label.en}
                      label={tx(spec.label)}
                      value={tx(spec.value)}
                    />
                  ))}
                </dl>
              </div>
            ) : null}

            <div className="mt-6">
              <OemNote className="mb-5" />
              <ContactActions
                subject={`${t.mailSubjectInquiry} - ${name}`}
                message={inquireMessage}
                showCustom
              />
            </div>
          </div>
        </div>

        <section className="mt-14 border border-border p-6">
          <h2 className="heading-display text-2xl">{t.detail.entity}</h2>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-dark">{t.detail.entityManufacturer}</dt>
              <dd className="mt-1 text-text-secondary">
                {companyEntity.legalName[lang] || companyEntity.legalName.en}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-dark">{t.detail.entityLocation}</dt>
              <dd className="mt-1 text-text-secondary">
                {`${companyEntity.location.line1[lang] || companyEntity.location.line1.en}, ${companyEntity.location.locality}, ${companyEntity.location.region}, ${companyEntity.location.country} ${companyEntity.location.postalCode}`}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-dark">{t.detail.entitySpecialization}</dt>
              <dd className="mt-1 text-text-secondary">
                {companyEntity.specialization[lang] || companyEntity.specialization.en}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-dark">{t.detail.entityCustomization}</dt>
              <dd className="mt-1 text-text-secondary">
                {companyEntity.customization[lang] || companyEntity.customization.en}
              </dd>
            </div>
          </dl>
        </section>

        <section className="mt-14">
          <h2 className="heading-display text-2xl sm:text-3xl">
            {t.detail.overview}
          </h2>
          <p className="mt-4 text-text-secondary">{tx(product.productIntroduction)}</p>
          <div className="mt-6 border border-border bg-bg-soft p-5">
            <h3 className="font-semibold text-dark">{t.detail.definition}</h3>
            <p className="mt-2 text-sm text-text-secondary">
              {tx(product.geo.answers.whatIs)}
            </p>
            <h3 className="mt-4 font-semibold text-dark">{t.detail.whoNeeds}</h3>
            <p className="mt-2 text-sm text-text-secondary">
              {tx(product.geo.answers.whoNeeds)}
            </p>
            <h3 className="mt-4 font-semibold text-dark">{t.detail.whereUsed}</h3>
            <p className="mt-2 text-sm text-text-secondary">
              {tx(product.geo.answers.whereUsed)}
            </p>
          </div>
        </section>

        {advantages.length > 0 ? (
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">
              {t.detail.advantages}
            </h2>
            <ul className="mt-4 list-disc space-y-2 ps-5 text-sm text-text-secondary sm:text-base">
              {advantages.map((item) => (
                <li key={item.en}>{tx(item)}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-14">
          <h2 className="heading-display text-2xl sm:text-3xl">
            {t.detail.techParams}
          </h2>
          {product.specifications.length > 0 ? (
            <div className="mt-6 overflow-x-auto border border-border">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-bg-soft text-dark">
                  <tr>
                    <th className="px-4 py-3 font-semibold">
                    {t.page.parameter}
                    </th>
                    <th className="px-4 py-3 font-semibold">
                    {t.page.value}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.specifications.map((spec) => (
                    <tr key={spec.label.en} className="border-t border-border">
                      <td className="px-4 py-3 text-text-secondary">
                        {tx(spec.label)}
                      </td>
                      <td className="px-4 py-3 font-medium text-dark">
                        {tx(spec.value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 text-sm text-text-secondary">{t.detail.noSpecs}</p>
          )}
        </section>

        <section className="mt-14">
          <h2 className="heading-display text-2xl sm:text-3xl">
            {t.detail.applications}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {product.applicationScenarios.map((item) => (
              <div
                key={item.en}
                className="border border-border bg-bg-soft p-5"
              >
                <h3 className="font-semibold text-dark">{tx(item)}</h3>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-text-secondary">{t.detail.relatedCases}</p>
          <ul className="mt-2 space-y-2 text-sm">
            {clusterForProduct(product.category)
              .relatedSolutions.filter((link) => link.href.startsWith('/solutions'))
              .map((link) => (
                <li key={link.href}>
                  <LocaleLink to={link.href} className="font-medium text-dark hover:text-primary">
                    {link.zh && lang === 'zh' ? link.zh : link.en}
                  </LocaleLink>
                </li>
              ))}
          </ul>
        </section>

        <Customization compact />

        <FactoryProofStrip />

        <section className="mt-14">
          <h2 className="heading-display text-2xl sm:text-3xl">{t.detail.faq}</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((item) => (
              <div key={item.question} className="border border-border p-5">
                <h3 className="font-semibold text-dark">{item.question}</h3>
                <p className="mt-2 text-sm text-text-secondary">{item.answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-text-secondary">
            <LocaleLink to="/faq" className="hover:text-primary">
              {t.page.viewAllFaq}
            </LocaleLink>
            {' · '}
            <LocaleLink to="/product-selection-guide" className="hover:text-primary">
              {t.page.productSelectionGuide}
            </LocaleLink>
          </p>
        </section>

        {related.length > 0 ? (
          <div className="mt-16">
            <h2 className="heading-display text-2xl sm:text-3xl">
              {t.detail.related}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        ) : null}

        <InternalLinks cluster={clusterForProduct(product.category)} />

        <div className="mt-16 border border-border bg-bg-soft p-8">
          <h2 className="heading-display text-2xl">{t.detail.contactEngineer}</h2>
          <p className="mt-3 text-sm text-text-secondary">
            {t.detail.contactEngineerLead}
          </p>
          <div className="mt-6">
            <ContactActions
              subject={`${t.mailSubjectInquiry} - ${name}`}
              message={inquireMessage}
              showCustom
            />
          </div>
        </div>
      </div>
    </section>
  );
}
