import { Button } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LocaleLink } from '@/i18n/navigation';
import {
  exampleMatch,
  familyCopy,
  featuredModels,
  guideCopy,
  howCopy,
  productFamilies,
  useCaseCopy,
  useCases,
} from '@/data/homeDecision';
import { categoryMeta, getProductBySlug } from '@/data/products';
import { categoryShowcaseSlugs } from '@/data/homeNarrative';
import { useI18n } from '@/i18n/I18nContext';
import { SceneFrame } from './homeScroll';

export function SceneUseCases() {
  const { tx } = useI18n();
  return (
    <SceneFrame sceneKey="usecases" tone="light">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {tx(useCaseCopy.kicker)}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        {tx(useCaseCopy.title)}
      </h2>
      <ol className="mt-10 grid gap-4 md:grid-cols-2">
        {useCases.map((item) => (
          <li key={item.n} className="flex flex-col border border-border bg-white p-6">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-primary">{item.n}</p>
            <h3 className="mt-2 text-xl font-semibold text-dark">{tx(item.title)}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">{tx(item.body)}</p>
            {'models' in item && item.models ? (
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {item.models.map((slug) => {
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
            <LocaleLink
              to={item.href}
              className="mt-5 text-sm font-semibold text-primary hover:underline"
            >
              {tx(item.cta)} →
            </LocaleLink>
          </li>
        ))}
      </ol>
    </SceneFrame>
  );
}

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
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
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
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="aspect-[16/10] w-full bg-bg"
                  imgClassName="object-contain"
                />
              ) : null}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-dark">{tx(meta.label)}</h3>
                <p className="mt-2 text-sm text-text-secondary">{tx(family.fit)}</p>
                <LocaleLink
                  to={family.href}
                  className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
                >
                  {t.categories.view}
                </LocaleLink>
              </div>
            </article>
          );
        })}
      </div>

      <ul className="mt-10 space-y-4">
        {featuredModels.map((row) => {
          const product = getProductBySlug(row.slug);
          if (!product) return null;
          return (
            <li key={row.slug} className="border border-border bg-white p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-dark">
                <LocaleLink to={`/products/${product.slug}`} className="hover:text-primary">
                  {tx(product.name)}
                </LocaleLink>
              </h3>
              <p className="mt-2 text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                {tx(familyCopy.why)}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">{tx(row.why)}</p>
            </li>
          );
        })}
      </ul>
    </SceneFrame>
  );
}

export function SceneGuideEntry() {
  const { tx } = useI18n();
  const fields = [
    { label: guideCopy.output, value: exampleMatch.outputValue },
    { label: guideCopy.horizontal, value: exampleMatch.horizontalValue },
    { label: guideCopy.vertical, value: exampleMatch.verticalValue },
    { label: guideCopy.aggregate, value: exampleMatch.aggregateValue },
    { label: guideCopy.power, value: tx(exampleMatch.powerValue) },
  ];
  return (
    <SceneFrame sceneKey="guide" tone="light">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {tx(guideCopy.kicker)}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        {tx(guideCopy.title)}
      </h2>
      <p className="mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
        {tx(guideCopy.subtitle)}
      </p>
      <div className="mt-10 max-w-xl border border-border bg-white p-6 sm:p-8">
        <dl className="space-y-4">
          {fields.map((field) => (
            <div key={field.value}>
              <dt className="text-xs font-semibold tracking-[0.14em] text-text-secondary uppercase">
                {tx(field.label)}
              </dt>
              <dd className="mt-1 border border-border bg-bg px-3 py-2 text-sm font-medium text-dark">
                {field.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button to="/product-selection-guide" variant="cta" size="lg">
            {tx(guideCopy.cta)}
          </Button>
          <Button to="/contact" variant="outline" size="lg">
            {tx(howCopy.cta)}
          </Button>
        </div>
      </div>
    </SceneFrame>
  );
}
