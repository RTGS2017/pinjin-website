import { LocaleLink } from '@/i18n/navigation';
import { homeKnowledgeSlugs } from '@/data/gallery';
import { getBlogCover, getBlogPost, type BlogCategory } from '@/data/blog';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n/I18nContext';

const knowledgeLabel = (
  category: BlogCategory,
  t: ReturnType<typeof useI18n>['t'],
) => {
  if (category === 'manufacturing-knowledge') return t.knowledge.manufacturing;
  if (category === 'product-guide') return t.knowledge.equipment;
  if (category === 'application-solutions') return t.knowledge.application;
  if (category === 'factory-insights') return t.knowledge.factoryInsights;
  return t.knowledge.trends;
};

export function KnowledgeCenter() {
  const { t, tx } = useI18n();
  const posts = homeKnowledgeSlugs
    .map((slug) => getBlogPost(slug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));

  if (!posts.length) return null;

  return (
    <section className="section-y bg-bg">
      <div className="container-site">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle title={t.knowledge.title} subtitle={t.knowledge.subtitle} />
          <Button to="/blog" variant="outline" className="shrink-0">
            {t.knowledge.viewAll}
          </Button>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {posts.map((post) => {
            const cover = getBlogCover(post);
            return (
              <article key={post.slug} className="card-surface overflow-hidden">
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
                <div className="p-6 sm:p-7">
                  <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                    {knowledgeLabel(post.category, t)}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-dark">
                    <LocaleLink to={`/blog/${post.slug}`} className="hover:text-primary">
                      {tx(post.title)}
                    </LocaleLink>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-secondary">
                    {tx(post.description)}
                  </p>
                  <LocaleLink
                    to={`/blog/${post.slug}`}
                    className="mt-5 inline-block text-sm font-semibold text-dark hover:text-primary"
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
