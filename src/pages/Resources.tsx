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
  const title =
    lang === 'zh'
      ? '技术资源 | 混凝土机械知识 | 品锦机械'
      : 'Resources | Construction Machinery Knowledge | Pinjin';
  const description =
    lang === 'zh'
      ? '混凝土泵选型、OEM 制造与邢家湾产业带说明。产品目录 PDF 尚未发布，可通过 WhatsApp 或邮件索取参数。'
      : 'Guides on concrete pumps, OEM manufacturing and the Xingjiawan cluster. PDF catalogues are not published; request parameters by WhatsApp or email.';

  return (
    <section className="section-y bg-bg">
      <SEO
        title={title}
        description={description}
        path="/resources"
        jsonLd={buildBreadcrumbJsonLd([
          { name: t.detail.home, path: localePath('/', lang) },
          { name: t.nav.resources, path: localePath('/resources', lang) },
        ])}
      />
      <div className="container-site">
        <SectionTitle title={t.nav.resources} subtitle={description} />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <article className="border border-border p-6">
            <h2 className="text-lg font-semibold text-dark">{t.blog.title}</h2>
            <p className="mt-2 text-sm text-text-secondary">{t.blog.subtitle}</p>
            <p className="mt-4 text-sm">
              <LocaleLink to="/blog" className="font-semibold hover:text-primary">
                {lang === 'zh' ? '进入博客 →' : 'Open blog →'}
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
                {lang === 'zh' ? '打开选型指南 →' : 'Open selection guide →'}
              </LocaleLink>
            </p>
          </article>
          <article id="downloads" className="border border-border p-6">
            <h2 className="text-lg font-semibold text-dark">
              {lang === 'zh' ? '资料下载' : 'Downloads'}
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              {lang === 'zh'
                ? '当前未发布 PDF 产品目录。请通过 WhatsApp 或邮件索取型号参数。'
                : 'PDF catalogues are not published. Request model parameters by WhatsApp or email.'}
            </p>
          </article>
        </div>

        <h2 className="mt-14 heading-display text-2xl">
          {lang === 'zh' ? '最新文章' : 'Latest articles'}
        </h2>
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

        <div className="mt-12">
          <ContactActions />
        </div>
      </div>
    </section>
  );
}
