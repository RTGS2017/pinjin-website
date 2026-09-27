import { useState } from 'react';
import { LocaleLink } from '@/i18n/navigation';
import { selectionGuideItems } from '@/data/selectionGuide';
import { getProductBySlug } from '@/data/products';
import { homeCopy } from '@/data/homeNarrative';
import { useI18n } from '@/i18n/I18nContext';
import { SceneFrame } from './homeScroll';

const ITEMS = selectionGuideItems.slice(0, 5);

export function SceneSelection() {
  const { t, tx } = useI18n();
  const [active, setActive] = useState(0);
  const current = ITEMS[active] ?? ITEMS[0];

  return (
    <SceneFrame sceneKey="selection" tone="soft">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {t.nav.selectionGuide}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        {t.selectionGuide.title}
      </h2>
      <p className="mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
        {t.selectionGuide.subtitle} {t.page.selectionIntro}
      </p>

      <div className="mt-10 hidden gap-8 lg:grid lg:grid-cols-12">
        <ol className="space-y-2 lg:col-span-5">
          {ITEMS.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className={[
                  'home-select-q w-full border px-4 py-3 text-left transition-colors duration-200',
                  index === active
                    ? 'border-dark bg-white text-dark'
                    : 'border-border bg-transparent text-text-secondary hover:border-dark/40',
                ].join(' ')}
                aria-current={index === active ? 'true' : undefined}
                onClick={() => setActive(index)}
              >
                <span className="text-[11px] font-semibold tracking-[0.14em] text-primary">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="mt-1 block text-sm font-semibold sm:text-base">
                  {tx(item.question)}
                </span>
              </button>
            </li>
          ))}
        </ol>

        {current ? (
          <div className="border border-border bg-white p-6 sm:p-8 lg:col-span-7">
            <h3 className="heading-display text-xl sm:text-2xl">{tx(current.question)}</h3>
            <p className="mt-4 text-sm font-medium text-dark sm:text-base">
              {tx(current.recommendation)}
            </p>
            <p className="mt-3 text-sm text-text-secondary">
              <span className="font-semibold text-dark">{t.selectionGuide.why}: </span>
              {tx(current.rationale)}
            </p>
            <ul className="mt-6 space-y-2">
              {current.productSlugs.map((slug) => {
                const product = getProductBySlug(slug);
                if (!product) return null;
                return (
                  <li key={slug}>
                    <LocaleLink
                      to={`/products/${slug}`}
                      className="text-sm font-semibold text-dark hover:text-primary"
                    >
                      {tx(product.name)} →
                    </LocaleLink>
                  </li>
                );
              })}
            </ul>
            {active < ITEMS.length - 1 ? (
              <button
                type="button"
                className="mt-6 text-sm font-semibold tracking-wide text-dark hover:text-primary"
                onClick={() => setActive((i) => Math.min(ITEMS.length - 1, i + 1))}
              >
                {tx(homeCopy.nextQuestion)} →
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="mt-10 space-y-6 lg:hidden">
        {ITEMS.map((item) => (
          <article key={`m-${item.id}`} className="border border-border bg-white p-5">
            <h3 className="heading-display text-lg">{tx(item.question)}</h3>
            <p className="mt-3 text-sm font-medium text-dark">{tx(item.recommendation)}</p>
            <p className="mt-2 text-sm text-text-secondary">{tx(item.rationale)}</p>
            <ul className="mt-4 space-y-1">
              {item.productSlugs.map((slug) => {
                const product = getProductBySlug(slug);
                if (!product) return null;
                return (
                  <li key={slug}>
                    <LocaleLink
                      to={`/products/${slug}`}
                      className="text-sm font-semibold text-dark hover:text-primary"
                    >
                      {tx(product.name)} →
                    </LocaleLink>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>

      <p className="mt-8">
        <LocaleLink
          to="/product-selection-guide"
          className="text-sm font-semibold text-dark hover:text-primary"
        >
          {tx(homeCopy.fullGuide)} →
        </LocaleLink>
      </p>
    </SceneFrame>
  );
}
