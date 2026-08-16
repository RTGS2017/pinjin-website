import { Hero } from '@/components/sections/Hero';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { FactoryCapability } from '@/components/sections/FactoryCapability';
import { WhyPinjin } from '@/components/sections/WhyPinjin';
import { Applications } from '@/components/sections/Applications';
import { KnowledgeCenter } from '@/components/sections/KnowledgeCenter';
import { SEO, buildHeroGalleryJsonLdList, buildOrganizationJsonLd } from '@/components/SEO';
import { heroGallery } from '@/data/gallery';
import { useI18n } from '@/i18n/I18nContext';

export function Home() {
  const { lang, t } = useI18n();

  return (
    <>
      <SEO
        title={t.seo.homeTitle}
        description={t.seo.homeDesc}
        path="/"
        image={heroGallery[0].image}
        jsonLd={[buildOrganizationJsonLd(), ...buildHeroGalleryJsonLdList(heroGallery, lang)]}
      />
      <Hero />
      <FeaturedProducts />
      <FactoryCapability />
      <WhyPinjin />
      <Applications />
      <KnowledgeCenter />
    </>
  );
}
