import { HomeNarrative } from '@/components/home/HomeNarrative';
import {
  SEO,
  buildFaqPageJsonLd,
  buildImageObjectJsonLd,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
} from '@/components/SEO';
import { absoluteUrl } from '@/config/seo';
import { exampleMatch, homeFaqQuestions } from '@/data/homeDecision';
import { factoryNarrativeCopy, homeFaqIds } from '@/data/homeNarrative';
import { siteFaqs } from '@/data/faq';
import { getFactorySlide } from '@/data/factory';
import { getProductBySlug } from '@/data/products';
import { useI18n } from '@/i18n/I18nContext';

export function Home() {
  const { lang, t, tx } = useI18n();
  const product = getProductBySlug(exampleMatch.slug);
  const faqs = homeFaqIds
    .map((id) => siteFaqs.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const factoryImages = factoryNarrativeCopy
    .map((step) => getFactorySlide(step.slideId))
    .filter((slide): slide is NonNullable<typeof slide> => Boolean(slide));

  return (
    <>
      <SEO
        title={t.seo.homeTitle}
        description={t.seo.homeDesc}
        path="/"
        image={product?.image}
        imageAlt={product ? tx(product.name) : undefined}
        imageWidth={800}
        imageHeight={600}
        keywords="concrete pump manufacturer China, project matched concrete pump, Xingtai concrete pump factory"
        jsonLd={[
          buildOrganizationJsonLd(),
          buildWebSiteJsonLd(),
          ...(product
            ? [
                {
                  '@context': 'https://schema.org',
                  '@type': 'ImageObject',
                  name: tx(product.name),
                  description: tx(product.shortDescription),
                  contentUrl: absoluteUrl(product.image),
                  caption: tx(product.name),
                },
              ]
            : []),
          ...factoryImages.map((slide) => buildImageObjectJsonLd(slide, lang)),
          buildFaqPageJsonLd(
            faqs.map((faq) => ({
              question: tx(homeFaqQuestions[faq.id] ?? faq.question),
              answer: tx(faq.answer),
            })),
          ),
        ]}
      />
      <HomeNarrative />
    </>
  );
}
