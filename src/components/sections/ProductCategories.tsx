import { Link } from 'react-router-dom';
import { categoryMeta, type ProductCategory } from '@/data/products';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useI18n } from '@/i18n/I18nContext';

const order: ProductCategory[] = [
  'concrete-pump',
  'spraying-machine',
  'material-handling',
  'rebar-equipment',
];

export function ProductCategories() {
  const { t, tx } = useI18n();

  return (
    <section className="section-y bg-bg-soft">
      <div className="container-site">
        <SectionTitle title={t.categories.title} subtitle={t.categories.subtitle} />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {order.map((id) => {
            const meta = categoryMeta[id];
            return (
              <Link
                key={id}
                to={`/products/category/${meta.routeSlug}`}
                className="group border border-border bg-bg p-7 transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(37,42,49,0.06)]"
              >
                <h3 className="text-xl font-semibold tracking-wide text-dark">
                  {tx(meta.label)}
                </h3>
                <p className="mt-3 text-sm text-text-secondary">
                  {tx(meta.description)}
                </p>
                <span className="mt-6 inline-block text-sm font-semibold tracking-wide text-dark transition-colors group-hover:text-primary">
                  {t.categories.view}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
