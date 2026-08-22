import { useLocation, useParams } from 'react-router-dom';
import { LocaleLink, LocaleNavigate } from '@/i18n/navigation';
import {
  categoryMeta,
  getCategoryByRouteSlug,
  getCategoryPath,
  getProductsByCategory,
} from '@/data/products';
import { categoryHubs } from '@/data/categoryHubs';
import { categoryClusters } from '@/data/topicClusters';
import { getBlogPosts } from '@/data/blog';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ProductCard } from '@/components/ui/ProductCard';
import { ContactActions } from '@/components/ui/ContactActions';
import { InternalLinks } from '@/components/InternalLink';
import {
  SEO,
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
  buildFaqPageJsonLd,
} from '@/components/SEO';
import { useI18n } from '@/i18n/I18nContext';
import { localePath } from '@/i18n/paths';

export function ProductCategoryPage() {
  const { categorySlug, slug } = useParams<{
    categorySlug?: string;
    slug?: string;
  }>();
  const location = useLocation();
  const { lang, t, tx } = useI18n();
  const pathSlug =
    categorySlug ??
    slug ??
    location.pathname.split('/').filter(Boolean).pop();

  if (!pathSlug) {
    return <LocaleNavigate to="/products" replace />;
  }

  const category = getCategoryByRouteSlug(pathSlug);
  if (!category) {
    return <LocaleNavigate to="/products" replace />;
  }

  const meta = categoryMeta[category];
  const hub = categoryHubs[category];
  const list = getProductsByCategory(category);
  const path = getCategoryPath(category);
  const localizedPath = localePath(path, lang);
  const label = tx(meta.label);
  const heading = tx(hub.h1);
  const title = `${heading} | Pinjin Machinery China`;
  const description = tx(hub.intro);
  const faqs = hub.faqs.map((item) => ({
    question: tx(item.question),
    answer: tx(item.answer),
  }));
  const relatedPosts = getBlogPosts().filter((post) =>
    categoryClusters[category].relatedArticles.some((link) =>
      link.href.endsWith(post.slug),
    ),
  );

  return (
    <section className="section-y bg-bg">
      <SEO
        title={title}
        description={description}
        path={path}
        keywords={hub.keywords.join(', ')}
        jsonLd={[
          buildCollectionPageJsonLd({
            name: heading,
            description,
            path: localizedPath,
            items: list.map((item) => ({
              name: tx(item.name),
              path: localePath(`/products/${item.slug}`, lang),
            })),
          }),
          buildFaqPageJsonLd(faqs),
          buildBreadcrumbJsonLd([
            { name: t.detail.home, path: localePath('/', lang) },
            { name: t.detail.products, path: localePath('/products', lang) },
            { name: label, path: localizedPath },
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
          <span className="text-dark">{label}</span>
        </nav>

        <SectionTitle title={heading} subtitle={description} heading="h1" />

        {hub.applications.length > 0 ? (
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-dark">
              {t.page.applications}
            </h2>
            <ul className="mt-3 list-disc space-y-2 ps-5 text-sm text-text-secondary">
              {hub.applications.map((item) => (
                <li key={item.en}>{tx(item)}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {hub.advantages.length > 0 ? (
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-dark">
              {t.page.advantages}
            </h2>
            <ul className="mt-3 list-disc space-y-2 ps-5 text-sm text-text-secondary">
              {hub.advantages.map((item) => (
                <li key={item.en}>{tx(item)}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <h2 className="mt-14 heading-display text-2xl sm:text-3xl">
          {t.page.relatedModels}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {faqs.length > 0 ? (
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
        ) : null}

        {relatedPosts.length > 0 ? (
          <section className="mt-14">
            <h2 className="heading-display text-2xl">
              {t.page.technicalResources}
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {relatedPosts.map((post) => (
                <li key={post.slug}>
                  <LocaleLink
                    to={`/blog/${post.slug}`}
                    className="font-medium text-dark hover:text-primary"
                  >
                    {tx(post.title)}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <InternalLinks cluster={categoryClusters[category]} />

        <div className="mt-10">
          <ContactActions />
        </div>
      </div>
    </section>
  );
}

export function LegacyCategoryRedirect() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  if (!categorySlug) {
    return <LocaleNavigate to="/products" replace />;
  }
  return <LocaleNavigate to={`/products/${categorySlug}`} replace />;
}
