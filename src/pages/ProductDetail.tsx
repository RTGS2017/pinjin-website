import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LocaleLink, LocaleNavigate } from '@/i18n/navigation';
import { NotFound } from '@/pages/NotFound';
import { featuredProductSlugs } from '@/config/site';
import { companyEntity } from '@/config/entity';
import {
  categoryMeta,
  getCategoryPath,
  getProductBySlug,
  getRelatedProducts,
  getSpareParts,
  getFeaturedProducts,
  isInquiryOnlyProduct,
  keySpecifications,
  productImageAlt,
  resolveProductSlug,
} from '@/data/products';
import { isProductCatalogImage } from '@/data/imageInventory';
import { getApplicationImagesForCategory } from '@/data/applicationsContent';
import { clusterForProduct } from '@/data/topicClusters';
import { InternalLinks } from '@/components/InternalLink';
import { getProductFaqs } from '@/data/productFaqs';
import {
  getBuyProcess,
  getDirectAnswer,
  getHowToSelect,
  getNotSuitable,
  getSelectionBound,
} from '@/data/productP01';
import { getNearbyComparisons } from '@/data/productCompare';
import { productDocumentDescription, productDocumentTitle } from '@/seo/documentCopy';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductGallery } from '@/components/ui/ProductGallery';
import { InquiryBrief } from '@/components/ui/InquiryBrief';
import { FactoryProofStrip } from '@/components/sections/FactoryOverview';
import { OemNote } from '@/components/ui/OemNote';
import { SparePartTerms } from '@/components/ui/SparePartTerms';
import { Button } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
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
  const [shot, setShot] = useState(0);

  useEffect(() => {
    setShot(0);
  }, [slug]);

  if (!slug) {
    return <NotFound />;
  }

  const resolved = resolveProductSlug(slug);
  if (resolved !== slug) {
    return <LocaleNavigate to={`/products/${resolved}`} replace />;
  }

  const product = getProductBySlug(slug);
  if (!product) {
    return <NotFound />;
  }

  const name = tx(product.name);
  const path = `/products/${product.slug}`;
  const localizedPath = localePath(path, lang);
  const related = getRelatedProducts(product);
  const faqs = getProductFaqs(product, lang);
  const categoryLabel = tx(categoryMeta[product.category].label);
  const categoryPath = getCategoryPath(product.category);
  const seoTitle = productDocumentTitle(product, lang);
  const seoDescription = productDocumentDescription(product, lang);
  const keywords = [
    product.seo.keywords.primary,
    ...product.seo.keywords.secondary,
    ...product.seo.keywords.longTail,
  ].join(', ');

  const gallery = product.gallery;
  const heroImage = gallery[0] ?? product.image;
  const catalogShot = isProductCatalogImage(heroImage);
  const quoteOnly = isInquiryOnlyProduct(product);
  const spareParts = quoteOnly ? [] : getSpareParts();
  const relatedPumps = quoteOnly ? getFeaturedProducts(featuredProductSlugs).slice(0, 3) : [];
  const notSuitable = getNotSuitable(product);
  const nearby = getNearbyComparisons(product, lang);
  const selectionBound = getSelectionBound(product);
  const buySteps = getBuyProcess(product);
  const solutionLinks = clusterForProduct(product.category).relatedSolutions.filter((link) =>
    link.href.startsWith('/solutions'),
  );
  const keySpecs = keySpecifications(product, 5);
  const applicationImages =
    product.category === 'spare-parts' ? [] : getApplicationImagesForCategory(product.category);

  return (
    <section className="section-y bg-bg">
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={path}
        image={heroImage}
        imageAlt={productImageAlt(product, heroImage, lang)}
        imageWidth={catalogShot ? 1054 : 1200}
        imageHeight={catalogShot ? 1492 : 800}
        type="product"
        keywords={keywords}
        jsonLd={[
          buildProductJsonLd({
            name,
            description: seoDescription,
            image: heroImage,
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
            priceNote: quoteOnly ? t.productCard.noListPrice : t.productCard.freightNote,
            specifications: [
              ...product.specifications.map((spec) => ({
                name: tx(spec.label),
                value: tx(spec.value),
              })),
              ...(product.catalogSizes ?? []).map((row) => ({
                name: `${t.detail.catalogSize} ${row.size}`,
                value: [row.form ? tx(row.form) : '', row.unit ? tx(row.unit) : '']
                  .filter(Boolean)
                  .join(' · '),
              })),
            ],
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

        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <ProductGallery
            product={product}
            images={gallery}
            active={shot}
            onChange={setShot}
            showThumbs={false}
          />

          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
              {categoryLabel}
            </p>
            <h1 className="mt-3 heading-display text-3xl sm:text-4xl">{name}</h1>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
              {tx(product.shortDescription)}
            </p>
            {keySpecs.length > 0 ? (
              <dl className="mt-6 divide-y divide-border border border-border">
                <div className="bg-bg-soft px-4 py-2">
                  <dt className="text-xs font-semibold tracking-[0.12em] text-text-secondary uppercase">
                    {t.detail.keySpecs}
                  </dt>
                </div>
                {keySpecs.map((spec, index) => (
                  <div
                    key={spec.label.en}
                    className={`items-baseline justify-between gap-4 px-4 py-2.5 ${index >= 3 ? 'hidden sm:flex' : 'flex'}`}
                  >
                    <dt className="text-sm text-text-secondary">{tx(spec.label)}</dt>
                    <dd className="text-sm font-semibold text-dark">{tx(spec.value)}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {quoteOnly ? (
              product.category === 'spare-parts' ? (
                <SparePartTerms />
              ) : (
                <p className="mt-4 text-sm text-text-secondary">{t.productCard.inquiryNoListPrice}</p>
              )
            ) : (
              <p className="mt-4 text-sm text-text-secondary">{t.productCard.quoteOnly}</p>
            )}
            <div className="mt-6">
              <Button href="#inquiry" size="lg" className="w-full sm:w-auto">
                {t.nav.getQuote}
              </Button>
            </div>
          </div>

          {gallery.length > 1 ? (
            <div className="lg:col-start-1">
              <ProductGallery
                product={product}
                images={gallery}
                active={shot}
                onChange={setShot}
                showStage={false}
              />
            </div>
          ) : null}
        </div>

        <section className="mt-14">
          <h2 className="heading-display text-2xl sm:text-3xl">{t.detail.overview}</h2>
          <p className="mt-4 max-w-3xl text-text-secondary">{tx(getDirectAnswer(product))}</p>
          {selectionBound.en ? (
            <p className="mt-4 max-w-3xl text-sm text-text-secondary">{tx(selectionBound)}</p>
          ) : null}
          <p className="mt-4 max-w-3xl text-sm text-text-secondary">{tx(product.productIntroduction)}</p>
        </section>

        <section className="mt-14">
          <h2 className="heading-display text-2xl sm:text-3xl">{t.detail.techParams}</h2>
          {product.specifications.length > 0 ? (
            <div className="mt-6 overflow-x-auto border border-border">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-bg-soft text-dark">
                  <tr>
                    <th className="px-4 py-3 font-semibold">{t.page.parameter}</th>
                    <th className="px-4 py-3 font-semibold">{t.page.value}</th>
                  </tr>
                </thead>
                <tbody>
                  {product.specifications.map((spec) => (
                    <tr key={spec.label.en} className="border-t border-border">
                      <td className="px-4 py-3 text-text-secondary">{tx(spec.label)}</td>
                      <td className="px-4 py-3 font-medium text-dark">{tx(spec.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 text-sm text-text-secondary">{t.detail.noSpecs}</p>
          )}
          {product.catalogSizes && product.catalogSizes.length > 0 ? (
            <div className="mt-8 overflow-x-auto border border-border">
              <h3 className="bg-bg-soft px-4 py-3 text-sm font-semibold text-dark">
                {t.detail.catalogSizes}
              </h3>
              <table className="min-w-full text-left text-sm">
                <thead className="bg-bg-soft text-dark">
                  <tr>
                    <th className="px-4 py-3 font-semibold">{t.detail.catalogSize}</th>
                    <th className="px-4 py-3 font-semibold">{t.detail.catalogForm}</th>
                    <th className="px-4 py-3 font-semibold">{t.detail.catalogUnit}</th>
                  </tr>
                </thead>
                <tbody>
                  {product.catalogSizes.map((row) => (
                    <tr
                      key={`${row.size}-${row.form?.en ?? ''}`}
                      className="border-t border-border"
                    >
                      <td className="px-4 py-3 font-medium text-dark">{row.size}</td>
                      <td className="px-4 py-3 text-text-secondary">
                        {row.form ? tx(row.form) : '—'}
                      </td>
                      <td className="px-4 py-3 text-text-secondary">
                        {row.unit ? tx(row.unit) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="border-t border-border px-4 py-3 text-xs text-text-secondary">
                {t.detail.wearReplacementNote}
              </p>
            </div>
          ) : null}
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="border border-border p-6">
            <h2 className="heading-display text-2xl">{t.productCard.suitableFor}</h2>
            <ul className="mt-4 list-disc space-y-2 ps-5 text-sm text-text-secondary">
              {product.applicationScenarios.map((item) => (
                <li key={item.en}>{tx(item)}</li>
              ))}
            </ul>
          </div>
          <div className="border border-border p-6">
            <h2 className="heading-display text-2xl">{t.detail.notSuitable}</h2>
            <ul className="mt-4 list-disc space-y-2 ps-5 text-sm text-text-secondary">
              {notSuitable.map((item) => (
                <li key={item.en}>{tx(item)}</li>
              ))}
            </ul>
          </div>
        </section>

        {applicationImages.length > 0 || solutionLinks.length > 0 ? (
          <section className="mt-14">
            <h2 className="heading-display text-2xl sm:text-3xl">{t.detail.applications}</h2>
            {applicationImages.length > 0 ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {applicationImages.map((image) => (
                  <figure key={image.src} className="overflow-hidden border border-border bg-bg-soft">
                    <ImagePlaceholder
                      src={image.src}
                      alt={tx(image.alt)}
                      label={t.placeholder.image}
                      hint=""
                      width={image.width}
                      height={image.height}
                      className="aspect-[4/3] w-full"
                      imgClassName="object-cover"
                    />
                  </figure>
                ))}
              </div>
            ) : null}
            <p className="mt-3 text-xs text-text-secondary">{t.detail.relatedCases}</p>
            {solutionLinks.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm">
                {solutionLinks.map((link) => (
                  <li key={link.href}>
                    <LocaleLink to={link.href} className="font-medium text-dark hover:text-primary">
                      {link.zh && lang === 'zh' ? link.zh : link.en}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ) : null}

        <FactoryProofStrip />

        <details className="mt-14 border border-border p-6">
          <summary className="cursor-pointer">
            <h2 className="heading-display inline text-2xl sm:text-3xl">{t.detail.howToSelect}</h2>
          </summary>
          <p className="mt-4 max-w-3xl text-text-secondary">{tx(getHowToSelect(product))}</p>
        </details>

        {nearby.length > 0 ? (
          <details className="mt-6 border border-border p-6">
            <summary className="cursor-pointer">
              <h2 className="heading-display inline text-2xl sm:text-3xl">{t.detail.vsNearby}</h2>
            </summary>
            <p className="mt-3 max-w-3xl text-sm text-text-secondary">{t.detail.vsNearbyLead}</p>
            <ul className="mt-4 space-y-3 text-sm text-text-secondary">
              {nearby.map((item) => (
                <li key={item.slug}>
                  <LocaleLink
                    to={`/products/${item.slug}`}
                    className="font-semibold text-dark hover:text-primary"
                  >
                    {item.name}
                  </LocaleLink>
                  <span> — {item.diff}</span>
                </li>
              ))}
            </ul>
          </details>
        ) : null}

        <details className="mt-6 border border-border p-6">
          <summary className="cursor-pointer">
            <h2 className="heading-display inline text-2xl sm:text-3xl">{t.detail.buyProcess}</h2>
          </summary>
          <ol className="mt-4 list-decimal space-y-2 ps-5 text-sm text-text-secondary">
            {buySteps.map((step) => (
              <li key={step.en}>{tx(step)}</li>
            ))}
          </ol>
        </details>

        <details className="mt-6 border border-border p-6">
          <summary className="cursor-pointer">
            <h2 className="heading-display inline text-2xl sm:text-3xl">{t.detail.entity}</h2>
          </summary>
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
        </details>

        <section className="mt-14">
          <h2 className="heading-display text-2xl sm:text-3xl">{t.detail.faq}</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((item) => (
              <details key={item.question} className="border border-border p-5">
                <summary className="cursor-pointer font-semibold text-dark">{item.question}</summary>
                <p className="mt-2 text-sm text-text-secondary">{item.answer}</p>
              </details>
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

        {spareParts.length > 0 ? (
          <div className="mt-16">
            <h2 className="heading-display text-2xl sm:text-3xl">{t.detail.spareRelated}</h2>
            <p className="mt-3 text-sm text-text-secondary">{t.productCard.noSmallBatch}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {spareParts.slice(0, 4).map((item) => (
                <ProductCard key={item.slug} product={item} variant="related" />
              ))}
            </div>
            <p className="mt-4 text-sm">
              <LocaleLink
                to={getCategoryPath('spare-parts')}
                className="font-semibold text-dark hover:text-primary"
              >
                {t.featured.viewAll} →
              </LocaleLink>
            </p>
          </div>
        ) : null}

        {relatedPumps.length > 0 ? (
          <div className="mt-16">
            <h2 className="heading-display text-2xl sm:text-3xl">{t.detail.fitsPumps}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {relatedPumps.map((item) => (
                <ProductCard key={item.slug} product={item} variant="related" />
              ))}
            </div>
          </div>
        ) : null}

        {related.length > 0 ? (
          <div className="mt-16">
            <h2 className="heading-display text-2xl sm:text-3xl">{t.detail.related}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} variant="related" />
              ))}
            </div>
          </div>
        ) : null}

        <InternalLinks cluster={clusterForProduct(product.category)} />

        <section id="inquiry" className="mt-16 scroll-mt-24 border border-border p-6">
          <OemNote className="mb-6" />
          <InquiryBrief product={product} />
        </section>
      </div>
    </section>
  );
}
