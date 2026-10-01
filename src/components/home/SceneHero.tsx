import { Button } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { heroProductSlug } from '@/data/homeDecision';
import { findSpec, specText } from '@/data/productP01';
import { getProductBySlug, productImageAlt } from '@/data/products';
import { useI18n } from '@/i18n/I18nContext';
import { LocaleLink } from '@/i18n/navigation';
import { SceneFrame } from './homeScroll';

const heroSpecNeedles = [
  ['motor power', 'diesel engine', 'main motor'],
  ['output', 'capacity', 'theoretical'],
  ['outlet pressure'],
  ['fine stone', 'pumping distance', 'delivery distance'],
] as const;

export function SceneHero() {
  const { lang, t, tx } = useI18n();
  const product = getProductBySlug(heroProductSlug);
  const specs = product
    ? heroSpecNeedles
        .map((needles) => {
          const spec = findSpec(product, [...needles]);
          const value = specText(product, lang, [...needles]);
          if (!spec || !value) return null;
          return { label: spec.label, value };
        })
        .filter((row): row is NonNullable<typeof row> => Boolean(row))
    : [];

  return (
    <SceneFrame sceneKey="hero" tone="light">
      <div className="home-catalog-hero">
        <div className="home-catalog-hero-photo">
          {product ? (
            <ImagePlaceholder
              src={product.image}
              alt={productImageAlt(product, product.image, lang)}
              label={t.placeholder.hero}
              hint=""
              priority
              width={1536}
              height={1024}
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="home-catalog-hero-img"
              imgClassName="object-contain"
            />
          ) : null}
          {product ? (
            <LocaleLink
              to={`/products/${product.slug}`}
              className="home-catalog-hero-caption"
            >
              {tx(product.name)} →
            </LocaleLink>
          ) : null}
        </div>

        <div className="home-catalog-hero-copy">
          <p className="home-decision-eyebrow">{t.hero.eyebrow}</p>
          <h1 className="mt-3 heading-display text-3xl text-dark sm:text-4xl lg:text-[2.75rem]">
            {t.hero.title}
          </h1>
          <p className="mt-4 max-w-xl text-base text-text-secondary sm:text-lg">
            {t.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button to="/products" variant="primary" size="lg">
              {t.hero.explore}
            </Button>
            <Button to="/contact" variant="cta" size="lg">
              {t.hero.quote}
            </Button>
          </div>
          {specs.length ? (
            <ul className="home-catalog-hero-specs">
              {specs.map((spec) => (
                <li key={spec.label.en}>
                  <span>{tx(spec.label)}</span>
                  <strong>{spec.value}</strong>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </SceneFrame>
  );
}
