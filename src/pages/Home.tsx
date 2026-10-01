import { HomeNarrative } from '@/components/home/HomeNarrative';
import { SEO, buildFactoryImageJsonLdList, buildHeroGalleryJsonLdList, buildOrganizationJsonLd, buildWebSiteJsonLd } from '@/components/SEO';
import { heroGallery } from '@/data/gallery';
import { useI18n } from '@/i18n/I18nContext';

export function Home() {
  const { lang, t, tx } = useI18n();
  const hero = heroGallery[0];

  return (
    <>
      <SEO
        title={t.seo.homeTitle}
        description={t.seo.homeDesc}
        path="/"
        image={hero.image}
        imageAlt={tx(hero.alt)}
        imageWidth={hero.width}
        imageHeight={hero.height}
        keywords={hero.seoKeywords.join(', ')}
        jsonLd={[buildOrganizationJsonLd(), buildWebSiteJsonLd(), ...buildHeroGalleryJsonLdList(heroGallery, lang), ...buildFactoryImageJsonLdList(lang)]}
      />
      <HomeNarrative />
    </>
  );
}
