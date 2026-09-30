import { Button } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { exampleMatch } from '@/data/homeDecision';
import { getProductBySlug } from '@/data/products';
import { useI18n } from '@/i18n/I18nContext';
import { LocaleLink } from '@/i18n/navigation';
import { SceneFrame } from './homeScroll';

export function SceneHero() {
  const { t, tx } = useI18n();
  const product = getProductBySlug(exampleMatch.slug);

  return (
    <SceneFrame sceneKey="hero" tone="light">
      <div className="home-decision-hero">
        <div className="home-decision-hero-copy">
          <p className="home-decision-eyebrow">{t.hero.eyebrow}</p>
          <h1 className="mt-3 max-w-[18ch] heading-display text-3xl text-dark sm:text-4xl lg:text-5xl">
            {t.hero.title}
          </h1>
          <p className="mt-4 max-w-xl text-base text-text-secondary sm:text-lg">{t.hero.intro}</p>
          <p className="mt-4 max-w-xl text-base text-text-secondary sm:text-lg">
            {t.hero.directAnswer}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button to="/#start-selection" variant="cta" size="lg">
              {t.hero.findPump}
            </Button>
            <Button to="/products" variant="outline" size="lg">
              {t.hero.explore}
            </Button>
          </div>
          <p className="mt-4 text-sm text-text-secondary">{t.hero.quoteNote}</p>
        </div>

        <aside className="home-match" aria-label={tx(exampleMatch.badge)}>
          {product ? (
            <ImagePlaceholder
              src={product.image}
              alt={tx(product.name)}
              label={t.placeholder.hero}
              hint=""
              priority
              width={800}
              height={600}
              sizes="(max-width: 1024px) 100vw, 28vw"
              className="home-match-photo"
              imgClassName="object-contain"
            />
          ) : null}
          <p className="home-match-badge">{tx(exampleMatch.badge)}</p>
          <p className="home-match-kicker">{tx(exampleMatch.reqTitle)}</p>
          <dl className="home-match-dl">
            <div>
              <dt>{tx(exampleMatch.output)}</dt>
              <dd>{exampleMatch.outputValue}</dd>
            </div>
            <div>
              <dt>{tx(exampleMatch.horizontal)}</dt>
              <dd>{exampleMatch.horizontalValue}</dd>
            </div>
            <div>
              <dt>{tx(exampleMatch.vertical)}</dt>
              <dd>{exampleMatch.verticalValue}</dd>
            </div>
            <div>
              <dt>{tx(exampleMatch.aggregate)}</dt>
              <dd>{exampleMatch.aggregateValue}</dd>
            </div>
            <div>
              <dt>{tx(exampleMatch.power)}</dt>
              <dd>{tx(exampleMatch.powerValue)}</dd>
            </div>
          </dl>
          <div className="home-match-result">
            <p className="home-match-kicker">{tx(exampleMatch.matchTitle)}</p>
            <p className="home-match-model">{tx(exampleMatch.modelName)}</p>
            <p className="text-sm text-text-secondary">
              {exampleMatch.outputValue} · {exampleMatch.horizontalValue} /{' '}
              {exampleMatch.verticalValue} · {exampleMatch.motor}
            </p>
            <LocaleLink
              to={`/products/${exampleMatch.slug}`}
              className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline"
            >
              {tx(exampleMatch.viewModel)} →
            </LocaleLink>
          </div>
        </aside>
      </div>
    </SceneFrame>
  );
}
