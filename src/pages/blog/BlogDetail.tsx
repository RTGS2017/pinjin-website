import { Navigate, useParams } from 'react-router-dom';
import { LocaleLink } from '@/i18n/navigation';
import { NotFound } from '@/pages/NotFound';
import {
  SEO,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
  buildHowToJsonLd,
} from '@/components/SEO';
import { ProductCard } from '@/components/ui/ProductCard';
import { ContactActions } from '@/components/ui/ContactActions';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { InternalLinks } from '@/components/InternalLink';
import { RichText } from '@/components/ui/RichText';
import { getBlogDirectAnswer, getBlogFaqPlain, maintenanceHowToSteps } from '@/data/blogGeo';
import {
  blogCategoryMeta,
  blogResourceTypeMeta,
  getBlogPost,
  getBlogPosts,
  isIndexablePost,
  postAvailableInLang,
  postLangs,
} from '@/data/blog';
import { getCategoryPath, getProductBySlug, categoryMeta } from '@/data/products';
import { clusterForBlog } from '@/data/topicClusters';
import { seoTemplates } from '@/config/seo';
import { useI18n } from '@/i18n/I18nContext';
import { localePath } from '@/i18n/paths';
import { brandedTitle, withLocaleDescription } from '@/seo/documentCopy';
import { defaultLang } from '@/i18n/config';

export function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t, tx } = useI18n();

  if (!slug) {
    return <NotFound />;
  }

  const post = getBlogPost(slug);
  if (!post || !isIndexablePost(post)) {
    return <NotFound />;
  }

  if (!postAvailableInLang(post, lang)) {
    const canonicalLang = postLangs(post)[0] ?? defaultLang;
    return <Navigate to={localePath(`/blog/${post.slug}`, canonicalLang)} replace />;
  }

  const title = tx(post.title);
  const description = tx(post.description);
  const path = `/blog/${post.slug}`;
  const localizedPath = localePath(path, lang);
  const relatedProducts = post.relatedProductSlugs
    .map((item) => getProductBySlug(item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const keywords = post.keywords.join(', ');
  const seoTitle = brandedTitle(
    post.seoTitle ? tx(post.seoTitle) : seoTemplates.blogTitle(title),
    lang,
  );
  const seoDescription = withLocaleDescription(description, lang);
  const firstImage = post.content.find((section) => section.image)?.image?.src;
  const categoryHub = relatedProducts[0]
    ? getCategoryPath(relatedProducts[0].category)
    : '/products';
  const faqs = getBlogFaqPlain(post, lang);
  const visibleRelatedPaths = post.relatedPaths.filter((item) => {
    if (!item.href.startsWith('/blog/')) return true;
    const target = getBlogPost(item.href.replace(/^\/blog\//, '').replace(/\/$/, ''));
    return !target || (isIndexablePost(target) && postAvailableInLang(target, lang));
  });
  const relatedGuides = (post.relatedArticleSlugs ?? [])
    .map((item) => getBlogPost(item))
    .filter((item): item is NonNullable<typeof item> =>
      Boolean(item && isIndexablePost(item) && postAvailableInLang(item, lang)),
    );
  const otherPosts = getBlogPosts(lang).filter((item) => item.slug !== post.slug);
  const jsonLd = [
    buildArticleJsonLd({
      headline: title,
      description,
      path: localizedPath,
      datePublished: post.date,
      dateModified: post.dateModified ?? post.date,
      keywords,
      image: firstImage,
      lang,
    }),
    buildBreadcrumbJsonLd([
      { name: t.detail.home, path: localePath('/', lang) },
      { name: t.nav.resources, path: localePath('/resources', lang) },
      { name: t.blog.title, path: localePath('/blog', lang) },
      { name: title, path: localizedPath },
    ]),
    ...(faqs.length > 0 ? [buildFaqPageJsonLd(faqs)] : []),
    ...(post.slug === 'concrete-pump-daily-maintenance-checklist'
      ? [
          buildHowToJsonLd({
            name: title,
            description,
            path: localizedPath,
            steps: maintenanceHowToSteps.map((step) => tx(step)),
          }),
        ]
      : []),
  ];

  return (
    <section className="section-y bg-bg">
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={path}
        type="article"
        image={firstImage}
        keywords={keywords}
        jsonLd={jsonLd}
        hreflangLangs={['en']}
        canonicalLang="en"
        noindex={lang !== 'en'}
      />
      <article className="container-site">
        <nav className="mb-8 text-sm text-text-secondary" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <LocaleLink to="/" className="hover:text-primary">
                {t.detail.home}
              </LocaleLink>
            </li>
            <li aria-hidden>/</li>
            <li>
              <LocaleLink to="/resources" className="hover:text-primary">
                {t.nav.resources}
              </LocaleLink>
            </li>
            <li aria-hidden>/</li>
            <li>
              <LocaleLink to="/blog" className="hover:text-primary">
                {t.blog.title}
              </LocaleLink>
            </li>
            <li aria-hidden>/</li>
            <li className="text-dark">{title}</li>
          </ol>
        </nav>

        <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
          {tx(blogCategoryMeta[post.category])}
          {post.resourceType ? ` · ${tx(blogResourceTypeMeta[post.resourceType])}` : null}
        </p>
        <h1 className="mt-3 heading-display max-w-4xl text-3xl sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-text-secondary">{tx(getBlogDirectAnswer(post))}</p>
        <p className="mt-3 text-sm text-text-secondary">
          {t.blog.published}: {post.date}
          {post.dateModified && post.dateModified !== post.date
            ? ` · ${t.blog.updated}: ${post.dateModified}`
            : null}
        </p>
        {post.tags && post.tags.length > 0 ? (
          <p className="mt-2 text-xs text-text-secondary">
            {t.blog.tags}: {post.tags.join(' · ')}
          </p>
        ) : null}

        {post.answerBlock ? (
          <section className="mt-8 max-w-3xl border border-border bg-bg-soft p-6">
            <h2 className="text-lg font-semibold text-dark">{t.blog.answerTitle}</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-dark">{t.blog.answerWhat}</dt>
                <dd className="mt-1 text-text-secondary">{tx(post.answerBlock.what)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-dark">{t.blog.answerWho}</dt>
                <dd className="mt-1 text-text-secondary">{tx(post.answerBlock.who)}</dd>
              </div>
              {post.answerBlock.factors.length > 0 ? (
                <div>
                  <dt className="font-semibold text-dark">{t.blog.answerFactors}</dt>
                  <dd>
                    <ul className="mt-1 list-disc space-y-1 ps-5 text-text-secondary">
                      {post.answerBlock.factors.map((item) => (
                        <li key={item.en}>{tx(item)}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ) : null}
              {relatedProducts.length > 0 ? (
                <div>
                  <dt className="font-semibold text-dark">{t.blog.answerModels}</dt>
                  <dd className="mt-1 text-text-secondary">
                    {relatedProducts.map((product, index) => (
                      <span key={product.slug}>
                        {index > 0 ? ' · ' : null}
                        <LocaleLink
                          to={`/products/${product.slug}`}
                          className="font-medium hover:text-primary"
                        >
                          {tx(product.name)}
                        </LocaleLink>
                      </span>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
          </section>
        ) : null}

        <div className="mt-10 max-w-3xl space-y-10">
          {post.content.map((section) => {
            const HeadingTag = section.level === 3 ? 'h3' : 'h2';
            return (
              <section key={`${section.level ?? 2}-${section.heading.en}`}>
                <HeadingTag
                  className={
                    section.level === 3
                      ? 'text-lg font-semibold text-dark'
                      : 'text-xl font-semibold text-dark'
                  }
                >
                  {tx(section.heading)}
                </HeadingTag>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.en} className="mt-3 text-text-secondary">
                    <RichText text={tx(paragraph)} />
                  </p>
                ))}
                {section.image ? (
                  <figure className="mt-5 overflow-hidden border border-border bg-bg-soft">
                    <ImagePlaceholder
                      src={section.image.src}
                      alt={tx(section.image.alt)}
                      label={t.placeholder.factory}
                      hint=""
                      width={1920}
                      height={1080}
                      className="aspect-video w-full"
                      imgClassName="object-cover"
                    />
                    {section.image.caption ? (
                      <figcaption className="px-4 py-3 text-sm text-text-secondary">
                        {tx(section.image.caption)}
                      </figcaption>
                    ) : null}
                  </figure>
                ) : null}
                {section.bullets?.length ? (
                  <ul className="mt-3 list-disc space-y-2 ps-5 text-text-secondary">
                    {section.bullets.map((item) => (
                      <li key={item.en}>
                        <RichText text={tx(item)} />
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.table ? (
                  <div className="mt-5 overflow-x-auto border border-border">
                    <table className="min-w-full text-left text-sm">
                      <thead className="bg-bg-soft text-dark">
                        <tr>
                          {section.table.headers.map((header) => (
                            <th key={header.en} className="px-3 py-2 font-semibold">
                              {tx(header)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row) => (
                          <tr key={row.map((cell) => cell.en).join('|')} className="border-t border-border">
                            {row.map((cell) => (
                              <td key={cell.en} className="px-3 py-2 text-text-secondary">
                                <RichText text={tx(cell)} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </section>
            );
          })}
        </div>

        {post.sources && post.sources.length > 0 ? (
          <section className="mt-12 max-w-3xl">
            <h2 className="text-xl font-semibold text-dark">{t.blog.sourcesTitle}</h2>
            <ul className="mt-4 list-disc space-y-2 ps-5 text-sm text-text-secondary">
              {post.sources.map((source) => (
                <li key={`${source.type}-${source.url}`}>
                  <a href={source.url} className="hover:text-primary" rel="noopener noreferrer">
                    {source.name}
                  </a>
                  <span> ({source.type})</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <p className="mt-10 text-sm text-text-secondary">
          <LocaleLink to={categoryHub} className="font-semibold hover:text-primary">
            {relatedProducts[0]
              ? tx(categoryMeta[relatedProducts[0].category].label)
              : t.page.relatedProducts}
          </LocaleLink>
          {' · '}
          {relatedProducts[0] ? (
            <>
              <LocaleLink
                to={`/products/${relatedProducts[0].slug}`}
                className="font-semibold hover:text-primary"
              >
                {tx(relatedProducts[0].name)}
              </LocaleLink>
              {' · '}
            </>
          ) : null}
          {relatedGuides[0] ? (
            <>
              <LocaleLink
                to={`/blog/${relatedGuides[0].slug}`}
                className="font-semibold hover:text-primary"
              >
                {tx(relatedGuides[0].title)}
              </LocaleLink>
              {' · '}
            </>
          ) : otherPosts[0] ? (
            <>
              <LocaleLink
                to={`/blog/${otherPosts[0].slug}`}
                className="font-semibold hover:text-primary"
              >
                {tx(otherPosts[0].title)}
              </LocaleLink>
              {' · '}
            </>
          ) : null}
          <LocaleLink to="/contact" className="font-semibold hover:text-primary">
            {t.page.contactManufacturer}
          </LocaleLink>
        </p>

        {visibleRelatedPaths.length > 0 ? (
          <p className="mt-4 text-sm text-text-secondary">
            {t.blog.relatedGuides}:{' '}
            {visibleRelatedPaths.map((item, index) => (
              <span key={item.href}>
                {index > 0 ? ' · ' : null}
                <LocaleLink to={item.href} className="hover:text-primary">
                  {tx(item.label)}
                </LocaleLink>
              </span>
            ))}
          </p>
        ) : null}

        {relatedProducts.length > 0 ? (
          <div className="mt-16">
            <h2 className="heading-display text-2xl sm:text-3xl">
              {t.blog.relatedProducts}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {relatedProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        ) : null}

        {faqs.length > 0 ? (
          <section className="mt-14 max-w-3xl">
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

        <InternalLinks cluster={clusterForBlog(post)} />

        <div className="mt-16 border border-border bg-bg-soft p-8">
          <h2 className="heading-display text-2xl">{t.blog.ctaTitle}</h2>
          <p className="mt-3 max-w-2xl text-sm text-text-secondary">{t.blog.ctaBody}</p>
          <div className="mt-6">
            <ContactActions
              subject={t.mailSubjectInquiry}
              message={title}
            />
          </div>
        </div>

        <p className="mt-8 text-sm">
          <LocaleLink to="/blog" className="font-semibold hover:text-primary">
            {t.blog.back}
          </LocaleLink>
        </p>
      </article>
    </section>
  );
}
