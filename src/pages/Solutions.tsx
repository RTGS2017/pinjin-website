import { LocaleLink } from '@/i18n/navigation';
import { SEO, buildBreadcrumbJsonLd, buildMediaImageJsonLd } from '@/components/SEO';
import { CompanyEntity } from '@/components/CompanyEntity';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { InternalLinks } from '@/components/InternalLink';
import { applicationPages, getSolutionBySlug } from '@/data/applicationsContent';
import { products, getCategoryPath } from '@/data/products';
import { categoryClusters } from '@/data/topicClusters';
import { useI18n } from '@/i18n/I18nContext';
import { localePath } from '@/i18n/paths';
import { useParams } from 'react-router-dom';
import { LocaleNavigate } from '@/i18n/navigation';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { ContactActions } from '@/components/ui/ContactActions';

export function SolutionsIndex() {
  const { lang, t, tx } = useI18n();
  const title =
    lang === 'zh'
      ? '行业解决方案 | 混凝土机械制造商 | 品锦机械'
      : 'Industry Solutions | Concrete Machinery Manufacturer China | Pinjin';
  const description =
    lang === 'zh'
      ? '建筑、基建、喷涂与现场搬运方向的混凝土机械选型说明。不编造未核实的矿业项目。'
      : 'Concrete machinery selection notes for construction, infrastructure, spraying and site handling. Mining projects are not listed because they are not published in the catalogue.';

  return (
    <section className="section-y bg-bg">
      <SEO
        title={title}
        description={description}
        path="/solutions"
        jsonLd={buildBreadcrumbJsonLd([
          { name: t.detail.home, path: localePath('/', lang) },
          { name: lang === 'zh' ? '解决方案' : 'Solutions', path: localePath('/solutions', lang) },
        ])}
      />
      <div className="container-site">
        <SectionTitle
          eyebrow={t.nav.solutions}
          title={
            lang === 'zh'
              ? '混凝土机械行业解决方案'
              : 'Concrete machinery industry solutions'
          }
          subtitle={description}
        />
        <div className="mt-8">
          <CompanyEntity compact />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {applicationPages.map((app) => {
            const hero = app.images[0];
            return (
            <article key={app.id} className="overflow-hidden border border-border">
              {hero ? (
                <ImagePlaceholder
                  src={hero.src}
                  alt={tx(hero.alt)}
                  label={t.placeholder.application}
                  hint={t.placeholder.applicationHint}
                  width={hero.width}
                  height={hero.height}
                  className="aspect-[4/3] w-full"
                  imgClassName="object-cover"
                />
              ) : null}
              <div className="p-6">
              <h2 className="text-xl font-semibold text-dark">
                <LocaleLink
                  to={`/solutions/${app.solutionSlug}`}
                  className="hover:text-primary"
                >
                  {tx(app.title)}
                </LocaleLink>
              </h2>
              <p className="mt-3 text-sm text-text-secondary">{tx(app.summary)}</p>
              <p className="mt-4 text-sm">
                <LocaleLink
                  to={`/solutions/${app.solutionSlug}`}
                  className="font-semibold text-dark hover:text-primary"
                >
                  {lang === 'zh' ? '查看方案 →' : 'View solution →'}
                </LocaleLink>
              </p>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SolutionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t, tx } = useI18n();
  const app = slug ? getSolutionBySlug(slug) : undefined;

  if (!app) {
    return <LocaleNavigate to="/solutions" replace />;
  }

  const related = products
    .filter((p) => p.category === app.relatedCategory)
    .slice(0, 6);
  const path = `/solutions/${app.solutionSlug}`;
  const title = `${tx(app.title)} | Pinjin Machinery`;
  const hero = app.images[0];
  const keywords = app.images.flatMap((item) => item.keywords).join(', ');

  return (
    <section className="section-y bg-bg">
      <SEO
        title={title}
        description={tx(app.summary)}
        path={path}
        image={hero?.src}
        keywords={keywords || undefined}
        jsonLd={[
          buildBreadcrumbJsonLd([
            { name: t.detail.home, path: localePath('/', lang) },
            { name: lang === 'zh' ? '解决方案' : 'Solutions', path: localePath('/solutions', lang) },
            { name: tx(app.title), path: localePath(path, lang) },
          ]),
          ...app.images.map((item) =>
            buildMediaImageJsonLd({
              name: tx(app.title),
              description: tx(item.alt),
              image: item.src,
            }),
          ),
        ]}
      />
      <div className="container-site">
        <nav className="mb-6 text-sm text-text-secondary">
          <LocaleLink to="/solutions" className="hover:text-primary">
            {lang === 'zh' ? '解决方案' : 'Solutions'}
          </LocaleLink>
          <span aria-hidden> / </span>
          <span className="text-dark">{tx(app.title)}</span>
        </nav>
        <div className="grid gap-8 lg:grid-cols-2">
          {hero ? (
            <ImagePlaceholder
              src={hero.src}
              alt={tx(hero.alt)}
              label={t.placeholder.application}
              hint={t.placeholder.applicationHint}
              width={hero.width}
              height={hero.height}
              className="aspect-[4/3] w-full"
              imgClassName="object-cover"
            />
          ) : (
            <ImagePlaceholder
              src=""
              alt={tx(app.title)}
              label={t.placeholder.application}
              hint={t.placeholder.applicationHint}
              width={1600}
              height={1200}
              className="aspect-[4/3] w-full"
            />
          )}
          <div>
            <h1 className="heading-display text-3xl sm:text-4xl">{tx(app.title)}</h1>
            <p className="mt-4 text-text-secondary">{tx(app.summary)}</p>
            <h2 className="mt-8 text-lg font-semibold text-dark">
              {lang === 'zh' ? '选型要点' : 'Selection checklist'}
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-text-secondary">
              {app.points.map((point) => (
                <li key={point.en}>{tx(point)}</li>
              ))}
            </ul>
          </div>
        </div>

        {app.images.length > 1 ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {app.images.slice(1).map((item) => (
              <ImagePlaceholder
                key={item.src}
                src={item.src}
                alt={tx(item.alt)}
                label={t.placeholder.application}
                hint=""
                width={item.width}
                height={item.height}
                className="aspect-[4/3] w-full"
                imgClassName="object-cover"
              />
            ))}
          </div>
        ) : null}

        <h2 className="mt-14 heading-display text-2xl">
          {lang === 'zh' ? '相关产品' : 'Related products'}
        </h2>
        <ul className="mt-4 space-y-2 text-sm">
          {related.map((p) => (
            <li key={p.slug}>
              <LocaleLink
                to={`/products/${p.slug}`}
                className="font-medium text-dark hover:text-primary"
              >
                {tx(p.name)}
              </LocaleLink>
            </li>
          ))}
          <li>
            <LocaleLink
              to={getCategoryPath(app.relatedCategory)}
              className="font-semibold text-dark hover:text-primary"
            >
              {lang === 'zh' ? '查看该分类全部型号 →' : 'View all models in this category →'}
            </LocaleLink>
          </li>
        </ul>

        <InternalLinks cluster={categoryClusters[app.relatedCategory]} />
        <div className="mt-10">
          <ContactActions />
        </div>
      </div>
    </section>
  );
}
