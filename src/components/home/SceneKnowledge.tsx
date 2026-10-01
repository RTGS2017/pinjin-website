import { LocaleLink } from '@/i18n/navigation';
import { siteFaqs } from '@/data/faq';
import { homeKnowledgeCards } from '@/data/homeKnowledgeCards';
import { faqCopy, homeFaqQuestions, knowledgeCopy } from '@/data/homeDecision';
import {
  homeFaqIds,
  homeFaqProductLinks,
  homeCopy,
} from '@/data/homeNarrative';
import { getProductBySlug } from '@/data/products';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { useI18n } from '@/i18n/I18nContext';
import { SceneFrame } from './homeScroll';

const knowledgeSlugs = [
  'mixer-pump-vs-concrete-mixing-plant',
  'diesel-concrete-pump-no-electricity',
  'electric-15-concrete-pump-applications',
] as const;

export function SceneKnowledge() {
  const { t, tx } = useI18n();
  const faqs = homeFaqIds
    .map((id) => siteFaqs.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const posts = knowledgeSlugs
    .map((slug) => homeKnowledgeCards.find((card) => card.slug === slug))
    .filter((card): card is NonNullable<typeof card> => Boolean(card));

  return (
    <SceneFrame sceneKey="knowledge" tone="light">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            {tx(knowledgeCopy.kicker)}
          </p>
          <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
            {tx(knowledgeCopy.title)}
          </h2>
        </div>
        <LocaleLink to="/blog" className="text-sm font-semibold text-primary hover:underline">
          {tx(homeCopy.moreKnowledge)} →
        </LocaleLink>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug}>
            <LocaleLink to={`/blog/${post.slug}`} className="block overflow-hidden border border-border bg-white">
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
              <h3 className="p-4 text-base font-semibold text-dark">{tx(post.title)}</h3>
            </LocaleLink>
          </article>
        ))}
      </div>

      <p className="mt-14 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {tx(faqCopy.kicker)}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-2xl sm:text-3xl">{tx(faqCopy.title)}</h2>
      <div className="mt-6 space-y-3">
        {faqs.map((faq) => (
          <details key={faq.id} className="group border border-border bg-white px-5 py-4">
            <summary className="cursor-pointer list-none">
              <h3 className="heading-display text-lg">{tx(homeFaqQuestions[faq.id] ?? faq.question)}</h3>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">{tx(faq.answer)}</p>
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
    </SceneFrame>
  );
}
