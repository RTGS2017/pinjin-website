import { LocaleLink } from '@/i18n/navigation';
import { SEO, buildBreadcrumbJsonLd } from '@/components/SEO';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { blogCategoryMeta, getBlogCover, getBlogPosts } from '@/data/blog';
import { useI18n } from '@/i18n/I18nContext';
import { localePath } from '@/i18n/paths';

export function BlogList() {
  const { lang, t, tx } = useI18n();
  const posts = getBlogPosts();

  return (
    <section className="section-y bg-bg">
      <SEO
        title={t.seo.blogTitle}
        description={t.seo.blogDesc}
        path="/blog"
        jsonLd={buildBreadcrumbJsonLd([
          { name: t.detail.home, path: localePath('/', lang) },
          { name: t.nav.resources, path: localePath('/resources', lang) },
          { name: t.blog.title, path: localePath('/blog', lang) },
        ])}
      />
      <div className="container-site">
        <nav className="mb-6 text-sm text-text-secondary">
          <LocaleLink to="/resources" className="hover:text-primary">
            {t.nav.resources}
          </LocaleLink>
          <span aria-hidden> / </span>
          <span className="text-dark">{t.blog.title}</span>
        </nav>
        <SectionTitle title={t.knowledge.title} subtitle={t.knowledge.subtitle} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const cover = getBlogCover(post);
            return (
              <article key={post.slug} className="card-surface flex flex-col overflow-hidden">
                <LocaleLink to={`/blog/${post.slug}`} className="block">
                  <ImagePlaceholder
                    src={cover.src}
                    alt={tx(cover.alt)}
                    label={t.placeholder.image}
                    hint=""
                    width={1600}
                    height={900}
                    className="aspect-[16/10] w-full"
                    imgClassName="object-cover"
                  />
                </LocaleLink>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                    {tx(blogCategoryMeta[post.category])}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-dark">
                    <LocaleLink
                      to={`/blog/${post.slug}`}
                      className="hover:text-primary"
                    >
                      {tx(post.title)}
                    </LocaleLink>
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-text-secondary">{tx(post.description)}</p>
                  <p className="mt-4 text-xs text-text-secondary">
                    {t.blog.published}: {post.date}
                  </p>
                  <LocaleLink
                    to={`/blog/${post.slug}`}
                    className="mt-4 text-sm font-semibold text-dark hover:text-primary"
                  >
                    {t.blog.readMore}
                  </LocaleLink>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
