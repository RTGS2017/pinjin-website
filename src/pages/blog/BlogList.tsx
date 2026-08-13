import { LocaleLink } from '@/i18n/navigation';
import { SEO } from '@/components/SEO';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { blogCategoryMeta, getBlogPosts } from '@/data/blog';
import { useI18n } from '@/i18n/I18nContext';

export function BlogList() {
  const { t, tx } = useI18n();
  const posts = getBlogPosts();

  return (
    <section className="section-y bg-bg">
      <SEO
        title={t.seo.blogTitle}
        description={t.seo.blogDesc}
        path="/blog"
      />
      <div className="container-site">
        <SectionTitle title={t.blog.title} subtitle={t.blog.subtitle} />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.slug} className="flex flex-col border border-border p-6">
              <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                {tx(blogCategoryMeta[post.category])}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-dark">
                <LocaleLink
                  to={`/blog/${post.slug}`}
                  className="hover:text-primary"
                >
                  {tx(post.title)}
                </LocaleLink>
              </h2>
              <p className="mt-2 text-sm text-text-secondary">{tx(post.description)}</p>
              <p className="mt-4 text-xs text-text-secondary">
                {t.blog.published}: {post.date}
              </p>
              <LocaleLink
                to={`/blog/${post.slug}`}
                className="mt-4 text-sm font-semibold text-dark hover:text-primary"
              >
                {t.blog.readMore}
              </LocaleLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
