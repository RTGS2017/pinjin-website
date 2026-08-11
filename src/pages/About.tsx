import { Link } from 'react-router-dom';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { CompanyEntity } from '@/components/CompanyEntity';
import { getMailtoHref } from '@/config/site';
import { companyEntity } from '@/config/entity';
import { SEO, buildOrganizationJsonLd } from '@/components/SEO';
import { useI18n } from '@/i18n/I18nContext';

export function About() {
  const { lang, t } = useI18n();

  const values = [
    { id: '01', title: t.why.v1t, description: t.why.v1d },
    { id: '02', title: t.why.v2t, description: t.why.v2d },
    { id: '03', title: t.why.v3t, description: t.why.v3d },
    { id: '04', title: t.why.v4t, description: t.why.v4d },
  ];

  const title =
    lang === 'zh'
      ? '关于品锦 | 中国混凝土泵制造商 | 河北品锦机械'
      : 'About Pinjin | Concrete Pump Manufacturer China | Hebei Pinjin Machinery';

  return (
    <section className="section-y bg-bg">
      <SEO
        title={title}
        description={
          lang === 'zh'
            ? '了解河北品锦机械：邢台任泽工业园区的工程机械制造商，专业生产混凝土泵、砂浆喷涂机与石膏喷涂机。'
            : 'Learn who Hebei Pinjin Machinery is: a construction equipment manufacturer in Xingtai, China, producing concrete pumps, mortar spraying machines and plaster spraying machines.'
        }
        path="/about"
        jsonLd={buildOrganizationJsonLd()}
      />
      <div className="container-site">
        <SectionTitle
          eyebrow={t.about.eyebrow}
          title={
            lang === 'zh'
              ? '河北品锦机械是谁？'
              : 'Who is Hebei Pinjin Machinery?'
          }
          subtitle={companyEntity.positioning[lang]}
        />

        <div className="mt-10 max-w-3xl space-y-6 text-text-secondary">
          <section>
            <h2 className="text-lg font-semibold text-dark">
              {lang === 'zh' ? '公司介绍' : 'Company introduction'}
            </h2>
            <p className="mt-3">{t.company.p1}</p>
            <p className="mt-3">{t.company.p2}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark">
              {lang === 'zh' ? '品锦生产什么产品？' : 'What products does Pinjin manufacture?'}
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {companyEntity.products.map((p) => (
                <li key={p.id}>{p[lang]}</li>
              ))}
            </ul>
            <p className="mt-3">
              <Link to="/products" className="font-medium text-dark hover:text-primary">
                {lang === 'zh' ? '浏览全部产品 →' : 'Browse all products →'}
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark">
              {lang === 'zh' ? '公司在哪里？' : 'Where is the company located?'}
            </h2>
            <p className="mt-3">
              {companyEntity.location.line1[lang]}
              <br />
              {companyEntity.location.line2[lang]}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark">
              {lang === 'zh'
                ? '哪些行业会用到这些设备？'
                : 'What industries use these machines?'}
            </h2>
            <p className="mt-3">{companyEntity.customers[lang]}</p>
            <p className="mt-3">{companyEntity.problemsSolved[lang]}</p>
            <p className="mt-3">
              <Link to="/applications" className="font-medium text-dark hover:text-primary">
                {lang === 'zh' ? '查看应用方向 →' : 'View application guides →'}
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark">
              {lang === 'zh' ? '制造与质量理念' : 'Manufacturing focus & quality philosophy'}
            </h2>
            <p className="mt-3">
              {lang === 'zh'
                ? '品锦定位为专业输送泵生产源头厂家，强调研发、生产与销售一体。质量理念遵循目录中的品质为本、创新驱动、绿色环保、客户至上；制造侧强调先进生产设备与完善检测体系、全流程质量管控。网站不编造厂房面积、员工人数、认证或成立年限。'
                : 'Pinjin positions itself as a professional source manufacturer of delivery pumps, covering R&D, production and sales. Quality philosophy follows the catalogue values: quality oriented, innovation driven, environmental friendly and customer first. Manufacturing communications emphasize advanced production equipment, a complete testing system and full-process quality control. This site does not invent factory area, headcount, certifications or years in business.'}
            </p>
          </section>
        </div>

        <div className="mt-12">
          <CompanyEntity />
        </div>

        <div className="mt-16">
          <SectionTitle title={t.about.valuesTitle} />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {values.map((item) => (
              <div key={item.id} className="border border-border bg-bg-soft p-6">
                <p className="text-xs font-semibold tracking-[0.18em] text-primary">
                  {item.id}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-wide text-dark">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Button href={getMailtoHref(t.mailSubjectInquiry)} size="lg">
            {t.about.contact}
          </Button>
          <Button to="/faq" variant="outline" size="lg">
            FAQ
          </Button>
        </div>
      </div>
    </section>
  );
}
