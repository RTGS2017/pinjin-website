import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LocaleLink, LocaleNavigate } from '@/i18n/navigation';
import { getMailtoHref } from '@/config/site';
import {
  categoryMeta,
  getProductBySlug,
  getRelatedProducts,
  resolveProductSlug,
} from '@/data/products';
import { getProductFaqs } from '@/data/productFaqs';
import { SpecItem } from '@/components/ui/SpecItem';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductGallery } from '@/components/ui/ProductGallery';
import {
  SEO,
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
  buildProductJsonLd,
} from '@/components/SEO';
import { WhyFactory } from '@/components/sections/WhyFactory';
import { ManufacturingProcess } from '@/components/sections/ManufacturingProcess';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { useI18n } from '@/i18n/I18nContext';
import { localePath } from '@/i18n/paths';

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t, tx } = useI18n();
  const [catalogIntent, setCatalogIntent] = useState(false);

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
  const faqs = getProductFaqs(product, lang);
  const categoryLabel = tx(categoryMeta[product.category].label);
  const categoryPath = `/products/category/${categoryMeta[product.category].routeSlug}`;
  const seoTitle = tx(product.seo.title);
  const seoDescription = tx(product.seo.description);
  const keywords = [
    product.seo.keywords.primary,
    ...product.seo.keywords.secondary,
    ...product.seo.keywords.longTail,
  ].join(', ');

  const highlightSpecs = product.specifications.slice(0, 4);
  const gallery = product.gallery?.length ? product.gallery : [product.image];

  return (
    <section className="section-y bg-bg">
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={path}
        image={product.image}
        type="product"
        keywords={keywords}
        jsonLd={[
          buildProductJsonLd({
            name,
            description: seoDescription,
            image: product.image,
            path: localizedPath,
            category: categoryLabel,
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
          <ProductGallery
            images={gallery}
            alt={`${product.name.en} manufactured by Hebei Pinjin Machinery`}
          />

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

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                href="#inquiry"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => setCatalogIntent(false)}
              >
                {t.detail.quote}
              </Button>
              <Button
                href={getMailtoHref(`${t.mailSubjectInquiry} - ${name}`)}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                {t.detail.contactEngineer}
              </Button>
              <Button
                href="#inquiry"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => setCatalogIntent(true)}
              >
                {t.detail.requestCatalog}
              </Button>
            </div>
          </div>
        </div>

        <section className="mt-14 border border-border p-6">
          <h2 className="heading-display text-2xl">{t.detail.entity}</h2>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-dark">
                {lang === 'zh' ? '制造商' : 'Manufacturer'}
              </dt>
              <dd className="mt-1 text-text-secondary">
                {tx(product.geo.manufacturer)}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-dark">
                {lang === 'zh' ? '行业' : 'Industry'}
              </dt>
              <dd className="mt-1 text-text-secondary">{tx(product.geo.industry)}</dd>
            </div>
            <div>
              <dt className="font-semibold text-dark">
                {lang === 'zh' ? '产品类别' : 'Product Category'}
              </dt>
              <dd className="mt-1 text-text-secondary">
                {tx(product.geo.productCategory)}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-dark">
                {lang === 'zh' ? '产地' : 'Manufactured In'}
              </dt>
              <dd className="mt-1 text-text-secondary">
                {tx(product.geo.manufacturedIn)}
              </dd>
            </div>
          </dl>
        </section>

        <section className="mt-14">
          <h2 className="heading-display text-2xl sm:text-3xl">
            {t.detail.overview}
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-text-secondary sm:text-base">
            {tx(product.productIntroduction)}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(
              [
                ['whatIs', lang === 'zh' ? '这是什么设备？' : 'What is this equipment?'],
                ['whoNeeds', lang === 'zh' ? '谁需要这台设备？' : 'Who needs this equipment?'],
                ['whereUsed', lang === 'zh' ? '可以用在哪里？' : 'Where can it be used?'],
                ['advantages', lang === 'zh' ? '有哪些优势？' : 'What advantages does it provide?'],
                ['howToInquire', lang === 'zh' ? '如何询价？' : 'How can I request a quotation?'],
              ] as const
            ).map(([key, label]) => (
              <div key={key} className="border border-border p-5">
                <h3 className="font-semibold text-dark">{label}</h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {tx(product.geo.answers[key])}
                </p>
              </div>
            ))}
          </div>
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
        </section>

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
                      {lang === 'zh' ? '参数' : 'Parameter'}
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      {lang === 'zh' ? '数值' : 'Value'}
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
            {t.detail.advantages}
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-text-secondary sm:text-base">
            {product.keyFeatures.map((item) => (
              <li key={item.en}>{tx(item)}</li>
            ))}
          </ul>
        </section>

        <WhyFactory />

        <div className="mt-14">
          <ManufacturingProcess compact />
        </div>

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
              {lang === 'zh' ? '查看全部 FAQ →' : 'View all FAQ →'}
            </LocaleLink>
            {' · '}
            <LocaleLink to="/product-selection-guide" className="hover:text-primary">
              {lang === 'zh' ? '产品选型指南 →' : 'Product Selection Guide →'}
            </LocaleLink>
          </p>
        </section>

        <div className="mt-16 border border-border bg-bg-soft p-8">
          <h2 className="heading-display text-2xl">{t.detail.inquiryTitle}</h2>
          <p className="mt-3 max-w-xl text-text-secondary">{t.detail.inquiryBody}</p>
          <div className="mt-6">
            <InquiryForm
              key={catalogIntent ? 'catalog' : 'quote'}
              defaultProduct={name}
              defaultMessage={catalogIntent ? t.detail.catalogPrefill : ''}
            />
          </div>
        </div>

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
      </div>
    </section>
  );
}
