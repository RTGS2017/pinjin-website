import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LocaleLink } from '@/i18n/navigation';
import { compareCopy, comparePairs, compareRowNeedles } from '@/data/homeDecision';
import { findSpec, specText } from '@/data/productP01';
import { getProductBySlug, productImageAlt } from '@/data/products';
import { useI18n } from '@/i18n/I18nContext';
import { SceneFrame } from './homeScroll';

export function SceneCompare() {
  const { lang, t, tx } = useI18n();

  return (
    <SceneFrame sceneKey="compare" tone="soft">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {tx(compareCopy.kicker)}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        {tx(compareCopy.title)}
      </h2>

      <div className="mt-10 space-y-8">
        {comparePairs.map((pair) => {
          const left = getProductBySlug(pair.left);
          const right = getProductBySlug(pair.right);
          if (!left || !right) return null;
          const rows = compareRowNeedles
            .map((row) => {
              const a = specText(left, lang, [...row.needles]);
              const b = specText(right, lang, [...row.needles]);
              if (!a && !b) return null;
              const spec = findSpec(left, [...row.needles]) ?? findSpec(right, [...row.needles]);
              return {
                key: row.key,
                label: spec ? tx(spec.label) : row.key,
                left: a ?? '—',
                right: b ?? '—',
              };
            })
            .filter((row): row is NonNullable<typeof row> => Boolean(row));

          return (
            <article key={pair.id} className="home-compare-card">
              <h3 className="px-4 pt-4 text-base font-semibold text-dark sm:px-5 sm:text-lg">
                {tx(pair.axis)}
              </h3>
              <div className="home-compare-pair">
                <LocaleLink to={`/products/${left.slug}`} className="home-compare-side">
                  <ImagePlaceholder
                    src={left.image}
                    alt={productImageAlt(left, left.image, lang)}
                    label={t.placeholder.product}
                    hint=""
                    width={800}
                    height={560}
                    sizes="(max-width: 768px) 100vw, 38vw"
                    className="home-compare-photo"
                    imgClassName="object-contain"
                  />
                  <p className="mt-3 font-semibold text-dark">{tx(left.name)}</p>
                </LocaleLink>
                <p className="home-compare-vs" aria-hidden>
                  {compareCopy.vs}
                </p>
                <LocaleLink to={`/products/${right.slug}`} className="home-compare-side">
                  <ImagePlaceholder
                    src={right.image}
                    alt={productImageAlt(right, right.image, lang)}
                    label={t.placeholder.product}
                    hint=""
                    width={800}
                    height={560}
                    sizes="(max-width: 768px) 100vw, 38vw"
                    className="home-compare-photo"
                    imgClassName="object-contain"
                  />
                  <p className="mt-3 font-semibold text-dark">{tx(right.name)}</p>
                </LocaleLink>
              </div>
              {rows.length ? (
                <table className="home-compare-table">
                  <thead>
                    <tr>
                      <th scope="col">{tx(compareCopy.kicker)}</th>
                      <th scope="col">{tx(left.name)}</th>
                      <th scope="col">{tx(right.name)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => {
                      const differs = row.left !== row.right;
                      return (
                        <tr key={row.key} className={differs ? 'is-diff' : undefined}>
                          <th scope="row">{row.label}</th>
                          <td>{row.left}</td>
                          <td>{row.right}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : null}
              <p className="px-4 py-3 sm:px-5">
                <LocaleLink
                  to={pair.href}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  {tx(compareCopy.readNote)} →
                </LocaleLink>
              </p>
            </article>
          );
        })}
      </div>
      <p className="mt-6 max-w-2xl text-xs text-text-secondary">{tx(compareCopy.note)}</p>
    </SceneFrame>
  );
}
