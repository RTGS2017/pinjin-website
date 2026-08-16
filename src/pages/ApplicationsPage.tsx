import { LocaleLink } from '@/i18n/navigation';
import { SEO } from '@/components/SEO';
import { CompanyEntity } from '@/components/CompanyEntity';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Button } from '@/components/ui/Button';
import { applicationPages } from '@/data/applicationsContent';
import { products } from '@/data/products';
import { useI18n } from '@/i18n/I18nContext';

export function ApplicationsPage() {
  const { lang, t, tx } = useI18n();

  const title =
    lang === 'zh'
      ? '应用场景 | 建筑与基建混凝土泵 | 河北品锦机械'
      : 'Applications | Concrete Pump for Building & Infrastructure | Hebei Pinjin';
  const description =
    lang === 'zh'
      ? '品锦机械应用方向：建筑施工混凝土泵、基建输送、砂浆喷涂与石膏喷涂。'
      : 'Pinjin application guides for building construction concrete pumps, infrastructure conveying, mortar spraying and plaster spraying.';

  return (
    <section className="section-y bg-bg">
      <SEO title={title} description={description} path="/applications" />
      <div className="container-site">
        <SectionTitle
          eyebrow={t.nav.applications}
          title={
            lang === 'zh'
              ? '混凝土泵与喷涂设备应用方向'
              : 'Concrete Pump & Spraying Applications'
          }
          subtitle={
            lang === 'zh'
              ? '说明设备适用方向与选型要点。'
              : 'Typical use cases and selection points for Pinjin equipment.'
          }
        />

        <div className="mt-8 max-w-3xl space-y-3 text-sm text-text-secondary">
          <h2 className="text-base font-semibold text-dark">
            {lang === 'zh' ? '你们是谁？' : 'Who are you?'}
          </h2>
          <p>
            {lang === 'zh'
              ? '河北品锦机械制造有限公司是位于河北邢台的工程机械制造商，专业输送泵生产源头厂家。'
              : 'Hebei Pinjin Machinery Manufacturing Co., Ltd. is a construction machinery manufacturer in Xingtai, Hebei, China, and a professional source manufacturer of delivery pumps.'}
          </p>
          <h2 className="text-base font-semibold text-dark">
            {lang === 'zh' ? '产品解决什么问题？' : 'What problems do the products solve?'}
          </h2>
          <p>
            {lang === 'zh'
              ? '帮助施工方按输送量、水平/垂直距离与骨料粒径匹配混凝土输送，并提供砂浆/石膏喷涂设备选项。'
              : 'They help contractors match concrete delivery capacity, conveying distance and aggregate size, with additional mortar and plaster spraying options for finishing work.'}
          </p>
        </div>

        <div className="mt-10">
          <CompanyEntity compact />
        </div>

        <div className="mt-14 space-y-14">
          {applicationPages.map((app) => {
            const related = products
              .filter((p) => p.category === app.relatedCategory)
              .slice(0, 4);
            return (
              <article
                key={app.id}
                id={app.slug}
                className="scroll-mt-24 border border-border"
              >
                <div className="grid gap-0 lg:grid-cols-2">
                  <ImagePlaceholder
                    src={app.images[0]?.src ?? ''}
                    alt={app.images[0] ? tx(app.images[0].alt) : `${tx(app.title)} - Hebei Pinjin Machinery`}
                    label={t.placeholder.application}
                    hint={t.placeholder.applicationHint}
                    width={app.images[0]?.width ?? 1600}
                    height={app.images[0]?.height ?? 1200}
                    className="aspect-[4/3] w-full lg:aspect-auto lg:min-h-full"
                    imgClassName="object-cover"
                  />
                  <div className="p-6 sm:p-8">
                    <h2 className="heading-display text-2xl sm:text-3xl">
                      {tx(app.title)}
                    </h2>
                    <p className="mt-4 text-sm text-text-secondary sm:text-base">
                      {tx(app.summary)}
                    </p>
                    <h3 className="mt-6 text-sm font-semibold tracking-wide text-dark">
                      {lang === 'zh' ? '选型要点' : 'Selection checklist'}
                    </h3>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-text-secondary">
                      {app.points.map((point) => (
                        <li key={point.en}>{tx(point)}</li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold text-dark">
                        {lang === 'zh' ? '相关产品' : 'Related products'}
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm">
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
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12">
          <Button to="/products" size="lg">
            {t.featured.viewAll}
          </Button>
        </div>
      </div>
    </section>
  );
}
