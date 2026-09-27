import { CompanyEntity } from '@/components/CompanyEntity';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LocaleLink } from '@/i18n/navigation';
import { featuredProductSlugs } from '@/config/site';
import { factoryProofIds, getFactorySlide } from '@/data/factory';
import { homeCopy } from '@/data/homeNarrative';
import {
  getFeaturedProducts,
  keySpecifications,
  productImageAlt,
} from '@/data/products';
import { useI18n } from '@/i18n/I18nContext';
import { SceneFrame } from './homeScroll';

export function SceneEvidence() {
  const { lang, t, tx } = useI18n();
  const photos = factoryProofIds
    .map((id) => getFactorySlide(id))
    .filter((slide): slide is NonNullable<typeof slide> => Boolean(slide));
  const products = getFeaturedProducts(featuredProductSlugs).slice(0, 2);

  return (
    <SceneFrame sceneKey="evidence" tone="light">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {t.detail.evidence}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        {t.detail.evidence}
      </h2>
      <p className="mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
        {tx(homeCopy.evidenceLead)}
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {photos.map((photo) => (
          <figure key={photo.id} className="overflow-hidden border border-border">
            <ImagePlaceholder
              src={photo.image}
              alt={tx(photo.alt)}
              label={t.placeholder.factory}
              hint=""
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="aspect-[16/10] w-full"
              imgClassName="object-cover"
            />
            <figcaption className="border-t border-border px-4 py-3 text-sm text-dark">
              {tx(photo.title)}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {products.map((product) => {
          const specs = keySpecifications(product, 4);
          return (
            <article key={product.slug} className="grid gap-5 border border-border bg-card p-5 sm:grid-cols-2">
              <ImagePlaceholder
                src={product.image}
                alt={productImageAlt(product, product.image, lang)}
                label={t.productCard.imageComingSoon}
                hint=""
                width={1536}
                height={1024}
                sizes="(max-width: 1024px) 100vw, 28vw"
                className="aspect-[4/3] w-full bg-bg-soft"
                imgClassName="object-contain"
              />
              <div>
                <h3 className="heading-display text-xl">
                  <LocaleLink
                    to={`/products/${product.slug}`}
                    className="hover:text-primary"
                  >
                    {tx(product.name)}
                  </LocaleLink>
                </h3>
                <dl className="mt-4 space-y-2 text-sm">
                  {specs.map((spec) => (
                    <div key={spec.label.en}>
                      <dt className="text-text-secondary">{tx(spec.label)}</dt>
                      <dd className="font-medium text-dark">{tx(spec.value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10">
        <CompanyEntity compact />
      </div>
    </SceneFrame>
  );
}
