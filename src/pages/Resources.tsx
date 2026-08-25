import { LocaleLink } from '@/i18n/navigation';
import { SEO, buildBreadcrumbJsonLd } from '@/components/SEO';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ContactActions } from '@/components/ui/ContactActions';
import { useI18n } from '@/i18n/I18nContext';
import { localePath } from '@/i18n/paths';
import { blogCategoryMeta, getBlogPosts } from '@/data/blog';

export function ResourcesPage() {
  const { lang, t, tx } = useI18n();
  const posts = getBlogPosts().slice(0, 6);

  return (
    <section className="section-y bg-bg">
      <SEO
        title={t.seo.resourcesTitle}
        description={t.seo.resourcesDesc}
        path="/resources"
        jsonLd={buildBreadcrumbJsonLd([
          { name: t.detail.home, path: localePath('/', lang) },
          { name: t.nav.resources, path: localePath('/resources', lang) },
        ])}
      />
      <div className="container-site">
        <SectionTitle title={t.nav.resources} subtitle={t.seo.resourcesDesc} />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <article className="border border-border p-6">
            <h2 className="text-lg font-semibold text-dark">{t.blog.title}</h2>
            <p className="mt-2 text-sm text-text-secondary">{t.blog.subtitle}</p>
            <p className="mt-4 text-sm">
              <LocaleLink to="/blog" className="font-semibold hover:text-primary">
                {t.page.openBlog}
              </LocaleLink>
            </p>
          </article>
          <article className="border border-border p-6">
            <h2 className="text-lg font-semibold text-dark">
              {t.selectionGuide.title}
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              {t.selectionGuide.subtitle}
            </p>
            <p className="mt-4 text-sm">
              <LocaleLink
                to="/product-selection-guide"
                className="font-semibold hover:text-primary"
              >
                {t.page.openSelectionGuide}
              </LocaleLink>
            </p>
          </article>
          <article id="downloads" className="border border-border p-6">
            <h2 className="text-lg font-semibold text-dark">
              {t.page.downloads}
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              {t.page.downloadsHint}
            </p>
          </article>
        </div>

        <h2 className="mt-14 heading-display text-2xl">
          {t.page.latestArticles}
        </h2>
        {posts.length === 0 ? (
          <p className="mt-4 max-w-2xl text-sm text-text-secondary">{t.blog.empty}</p>
        ) : (
        <ul className="mt-4 space-y-3">
          {posts.map((post) => (
            <li key={post.slug} className="text-sm">
              <span className="text-xs tracking-wide text-primary uppercase">
                {tx(blogCategoryMeta[post.category])}
              </span>
              <span aria-hidden> · </span>
              <LocaleLink
                to={`/blog/${post.slug}`}
                className="font-medium text-dark hover:text-primary"
              >
                {tx(post.title)}
              </LocaleLink>
            </li>
          ))}
        </ul>
        )}

        <div className="mt-12">
          <ContactActions />
        </div>
      </div>
    </section>
  );
}
