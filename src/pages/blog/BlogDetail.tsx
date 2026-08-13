import { useParams } from 'react-router-dom';
import { LocaleLink, LocaleNavigate } from '@/i18n/navigation';
import {
  SEO,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
} from '@/components/SEO';
import { ProductCard } from '@/components/ui/ProductCard';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { blogCategoryMeta, getBlogPost } from '@/data/blog';
import { getProductBySlug } from '@/data/products';
import { useI18n } from '@/i18n/I18nContext';
import { localePath } from '@/i18n/paths';

export function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t, tx } = useI18n();

  if (!slug) {
    return <LocaleNavigate to="/blog" replace />;
  }

  const post = getBlogPost(slug);
  if (!post) {
    return <LocaleNavigate to="/blog" replace />;
  }

  const title = tx(post.title);
  const description = tx(post.description);
  const path = `/blog/${post.slug}`;
  const localizedPath = localePath(path, lang);
  const relatedProducts = post.relatedProductSlugs
    .map((item) => getProductBySlug(item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const keywords = post.keywords.join(', ');

  return (
    <section className="section-y bg-bg">
      <SEO
        title={`${title} | Pinjin`}
        description={description}
        path={path}
        type="article"
        keywords={keywords}
        jsonLd={[
          buildArticleJsonLd({
            headline: title,
            description,
            path: localizedPath,
            datePublished: post.date,
            keywords,
          }),
          buildBreadcrumbJsonLd([
            { name: t.detail.home, path: localePath('/', lang) },
            { name: t.blog.title, path: localePath('/blog', lang) },
            { name: title, path: localizedPath },
          ]),
        ]}
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
        </p>
        <h1 className="mt-3 heading-display max-w-4xl text-3xl sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-text-secondary">{description}</p>
        <p className="mt-3 text-sm text-text-secondary">
          {t.blog.published}: {post.date}
        </p>

        <div className="mt-10 max-w-3xl space-y-10">
          {post.content.map((section) => (
            <section key={section.heading.en}>
              <h2 className="text-xl font-semibold text-dark">
                {tx(section.heading)}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.en} className="mt-3 text-text-secondary">
                  {tx(paragraph)}
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
                <ul className="mt-3 list-disc space-y-2 pl-5 text-text-secondary">
                  {section.bullets.map((item) => (
                    <li key={item.en}>{tx(item)}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {post.relatedPaths.length > 0 ? (
          <p className="mt-10 text-sm text-text-secondary">
            {t.blog.relatedGuides}:{' '}
            {post.relatedPaths.map((item, index) => (
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

        <div className="mt-16 border border-border bg-bg-soft p-8">
          <h2 className="heading-display text-2xl">{t.blog.inquiryCta}</h2>
          <div className="mt-6">
            <InquiryForm defaultMessage={title} />
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
