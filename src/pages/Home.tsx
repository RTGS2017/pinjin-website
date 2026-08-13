import { Hero } from '@/components/sections/Hero';
import { FactoryCapability } from '@/components/sections/FactoryCapability';
import { CompanyIntro } from '@/components/sections/CompanyIntro';
import { ProductCategories } from '@/components/sections/ProductCategories';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { PerformanceNumbers } from '@/components/sections/PerformanceNumbers';
import { Applications } from '@/components/sections/Applications';
import { WhyPinjin } from '@/components/sections/WhyPinjin';
import { Customization } from '@/components/sections/Customization';
import { CTA } from '@/components/sections/CTA';
import { Contact } from '@/components/sections/Contact';
import { CompanyEntity } from '@/components/CompanyEntity';
import { SEO, buildFactoryImageJsonLdList, buildOrganizationJsonLd } from '@/components/SEO';
import { useI18n } from '@/i18n/I18nContext';

export function Home() {
  const { lang, t } = useI18n();

  return (
    <>
      <SEO
        title={t.seo.homeTitle}
        description={t.seo.homeDesc}
        path="/"
        image="/images/factory/pinjin-construction-machinery-factory-building.webp"
        jsonLd={[buildOrganizationJsonLd(), ...buildFactoryImageJsonLdList(lang)]}
      />
      <Hero />
      <FactoryCapability />
      <CompanyIntro />
      <section className="bg-bg pb-[var(--spacing-section)]">
        <div className="container-site">
          <CompanyEntity />
        </div>
      </section>
      <ProductCategories />
      <FeaturedProducts />
      <PerformanceNumbers />
      <Applications />
      <WhyPinjin />
      <Customization />
      <CTA />
      <Contact />
    </>
  );
}
