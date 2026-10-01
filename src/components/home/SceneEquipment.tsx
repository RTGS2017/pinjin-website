import { Button } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LocaleLink } from '@/i18n/navigation';
import {
  catalogueCopy,
  catalogueShowcaseSlugs,
  familyCopy,
  guideCopy,
  howCopy,
  productFamilies,
} from '@/data/homeDecision';
import {
  categoryMeta,
  getProductBySlug,
  keySpecifications,
  productImageAlt,
} from '@/data/products';
import { categoryShowcaseSlugs } from '@/data/homeNarrative';
import { useI18n } from '@/i18n/I18nContext';
import { SceneFrame } from './homeScroll';

export function SceneProductFamilies() {
  const { t, tx } = useI18n();
  return (
    <SceneFrame sceneKey="families" tone="soft">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {tx(familyCopy.kicker)}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        {tx(familyCopy.title)}
      </h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {productFamilies.map((family) => {
          const meta = categoryMeta[family.category];
          const featured = getProductBySlug(categoryShowcaseSlugs[family.category] ?? '');
          return (
            <article key={family.category} className="overflow-hidden border border-border bg-white">
              {featured ? (
                <ImagePlaceholder
                  src={featured.image}
                  alt={tx(featured.name)}
                  label={t.placeholder.image}
                  hint=""
                  width={800}
                  height={560}
                  sizes="(max-width: 1280px) 50vw, 22vw"
                  className="aspect-[16/10] w-full bg-bg"
                  imgClassName="object-contain"
                />
              ) : null}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-dark">{tx(meta.label)}</h3>
                <LocaleLink
                  to={family.href}
                  className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline"
                >
                  {t.categories.view}
                </LocaleLink>
              </div>
            </article>
          );
        })}
      </div>
    </SceneFrame>
  );
}

export function SceneCatalogue() {
  const { lang, t, tx } = useI18n();
  return (
    <SceneFrame sceneKey="products" tone="light">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            {tx(catalogueCopy.kicker)}
          </p>
          <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
            {tx(catalogueCopy.title)}
          </h2>
        </div>
        <LocaleLink to="/products" className="text-sm font-semibold text-primary hover:underline">
          {tx(catalogueCopy.all)} →
        </LocaleLink>
      </div>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {catalogueShowcaseSlugs.map((slug) => {
          const product = getProductBySlug(slug);
          if (!product) return null;
          const specs = keySpecifications(product, 3);
          return (
            <li key={slug}>
              <LocaleLink
                to={`/products/${slug}`}
                className="block h-full border border-border bg-white hover:border-primary"
              >
                <ImagePlaceholder
                  src={product.image}
                  alt={productImageAlt(product, product.image, lang)}
                  label={t.placeholder.product}
                  hint=""
                  width={800}
                  height={560}
                  sizes="(max-width: 1280px) 50vw, 22vw"
                  className="aspect-[4/3] w-full bg-bg"
                  imgClassName="object-contain"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-dark">{tx(product.name)}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                    {specs.map((spec) => tx(spec.value)).filter(Boolean).join(' · ')}
                  </p>
                </div>
              </LocaleLink>
            </li>
          );
        })}
      </ul>
    </SceneFrame>
  );
}

export function SceneGuideEntry() {
  const { tx } = useI18n();
  return (
    <SceneFrame sceneKey="guide" tone="light">
      <div className="flex flex-col gap-6 border border-border bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            {tx(guideCopy.kicker)}
          </p>
          <h2 className="mt-2 heading-display text-2xl sm:text-3xl">{tx(guideCopy.title)}</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/product-selection-guide" variant="cta">
            {tx(guideCopy.cta)}
          </Button>
          <Button to="/contact" variant="outline">
            {tx(howCopy.cta)}
          </Button>
        </div>
      </div>
    </SceneFrame>
  );
}
