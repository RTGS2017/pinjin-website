import { LocaleLink } from '@/i18n/navigation';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { CompanyEntity } from '@/components/CompanyEntity';
import { ContactActions } from '@/components/ui/ContactActions';
import { InternalLinks } from '@/components/InternalLink';
import {
  SEO,
  buildBreadcrumbJsonLd,
  buildFactoryImageJsonLdList,
  buildOrganizationJsonLd,
} from '@/components/SEO';
import { seoTemplates } from '@/config/seo';
import { companyEntity } from '@/config/entity';
import { ManufacturingProcess } from '@/components/sections/ManufacturingProcess';
import { FactoryOverview } from '@/components/sections/FactoryOverview';
import { categoryClusters } from '@/data/topicClusters';
import { useI18n } from '@/i18n/I18nContext';
import { localePath } from '@/i18n/paths';

export function FactoryPage() {
  const { lang, t } = useI18n();

  return (
    <section className="section-y bg-bg">
      <SEO
        title={seoTemplates.factoryTitle}
        description={seoTemplates.factoryDescription}
        path="/factory"
        image="/images/factory/pinjin-xingjiawan-concrete-machinery-factory.webp"
        keywords="Xingjiawan Concrete Machinery, Xingtai Construction Machinery Factory, Concrete Machinery Manufacturer China"
        jsonLd={[
          buildOrganizationJsonLd(),
          ...buildFactoryImageJsonLdList(lang),
          buildBreadcrumbJsonLd([
            { name: t.detail.home, path: localePath('/', lang) },
            { name: t.footer.about, path: localePath('/about', lang) },
            {
              name: lang === 'zh' ? '工厂能力' : 'Factory capability',
              path: localePath('/factory', lang),
            },
          ]),
        ]}
      />
      <div className="container-site">
        <SectionTitle
          eyebrow={t.factory.title}
          title={
            lang === 'zh'
              ? '邢台工厂制造能力'
              : 'Xingtai factory manufacturing capability'
          }
          subtitle={companyEntity.clusterNote[lang]}
        />
        <p className="mt-6 max-w-3xl text-sm text-text-secondary">
          {companyEntity.geoCaption[lang]}
        </p>
        <div className="mt-10">
          <CompanyEntity compact />
        </div>
        <div className="mt-14">
          <FactoryOverview />
        </div>
        <div id="process" className="mt-16 scroll-mt-24">
          <ManufacturingProcess />
        </div>
        <InternalLinks cluster={categoryClusters['concrete-pump']} />
        <div className="mt-10">
          <ContactActions />
        </div>
        <p className="mt-8 text-sm">
          <LocaleLink to="/about" className="font-semibold hover:text-primary">
            {lang === 'zh' ? '返回公司介绍 →' : 'Back to company profile →'}
          </LocaleLink>
        </p>
      </div>
    </section>
  );
}
