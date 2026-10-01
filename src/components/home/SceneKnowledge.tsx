import { LocaleLink } from '@/i18n/navigation';
import { siteFaqs } from '@/data/faq';
import { homeKnowledgeCards } from '@/data/homeKnowledgeCards';
import {
  homeFaqIds,
  homeFaqProductLinks,
  homeCopy,
} from '@/data/homeNarrative';
import { getProductBySlug } from '@/data/products';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { useI18n } from '@/i18n/I18nContext';
import { SceneFrame } from './homeScroll';

export function SceneKnowledge() {
  const { t, tx } = useI18n();
  const faqs = homeFaqIds
    .map((id) => siteFaqs.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const posts = homeKnowledgeCards;

  return (
    <SceneFrame sceneKey="knowledge" tone="light">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {tx(homeCopy.buyerQuestions)}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        {tx(homeCopy.buyerQuestions)}
      </h2>
      <p className="mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
        {t.knowledge.subtitle}
      </p>

      <div className="mt-10 space-y-3">
        {faqs.map((faq, index) => (
          <details
            key={faq.id}
            className="group border border-border bg-white px-5 py-4"
            open={index === 0}
          >
            <summary className="cursor-pointer list-none">
              <h3 className="heading-display text-lg sm:text-xl">{tx(faq.question)}</h3>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
              {tx(faq.answer)}
            </p>
            {homeFaqProductLinks[faq.id] ? (
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {homeFaqProductLinks[faq.id].map((slug) => {
                  const product = getProductBySlug(slug);
                  if (!product) return null;
                  return (
                    <li key={slug}>
                      <LocaleLink
                        to={`/products/${slug}`}
                        className="text-sm font-semibold text-dark hover:text-primary"
                      >
                        {tx(product.name)}
                      </LocaleLink>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </details>
        ))}
      </div>

      <p className="mt-6">
        <LocaleLink to="/faq" className="text-sm font-semibold text-dark hover:text-primary">
          {tx(homeCopy.moreFaq)} →
        </LocaleLink>
      </p>

      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {posts.map((post) => {
          return (
            <article key={post.slug}>
              <LocaleLink to={`/blog/${post.slug}`} className="block overflow-hidden">
                <ImagePlaceholder
                  src={post.image}
                  alt={tx(post.alt)}
                  label={t.placeholder.image}
                  hint=""
                  width={post.width}
                  height={post.height}
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="aspect-[16/10] w-full"
                  imgClassName="object-cover"
                />
              </LocaleLink>
              <h3 className="mt-4 text-lg font-semibold text-dark">
                <LocaleLink to={`/blog/${post.slug}`} className="hover:text-primary">
                  {tx(post.title)}
                </LocaleLink>
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-text-secondary">
                {tx(post.description)}
              </p>
            </article>
          );
        })}
      </div>

      <p className="mt-8">
        <LocaleLink to="/blog" className="text-sm font-semibold text-dark hover:text-primary">
          {tx(homeCopy.moreKnowledge)} →
        </LocaleLink>
      </p>
    </SceneFrame>
  );
}
