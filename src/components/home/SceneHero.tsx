import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { contactInquiryPath, withBase } from '@/config/site';
import { companyEntity } from '@/config/entity';
import { heroGallery } from '@/data/gallery';
import { homeCopy } from '@/data/homeNarrative';
import { useI18n } from '@/i18n/I18nContext';
import { SceneFrame } from './homeScroll';

export function SceneHero() {
  const { lang, t, tx } = useI18n();
  const hero = heroGallery[0];
  const facts = [
    { k: homeCopy.who, v: homeCopy.whoValue },
    { k: homeCopy.what, v: homeCopy.whatValue },
    { k: homeCopy.where, v: homeCopy.whereValue },
    { k: homeCopy.why, v: homeCopy.whyValue },
  ];

  return (
    <SceneFrame sceneKey="hero" tone="dark" bleed>
      <Helmet>
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href={withBase(hero.image)}
        />
      </Helmet>

      <div className="home-hero">
        <div className="home-hero-media" aria-hidden={false}>
          <ImagePlaceholder
            src={hero.image}
            alt={tx(hero.alt)}
            label={t.placeholder.hero}
            hint=""
            priority
            width={hero.width}
            height={hero.height}
            sizes="100vw"
            className="h-full w-full !bg-dark"
            imgClassName="object-cover"
          />
        </div>

        <div className="home-hero-copy scene-stagger container-site">
          <p className="home-scene-kicker text-white/40" aria-hidden>
            01
          </p>
          <p className="max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
            {t.hero.intro}
          </p>
          <h1 className="mt-5 heading-display text-4xl text-white sm:text-5xl lg:text-[3.35rem]">
            {t.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/82 sm:text-lg">
            {t.hero.directAnswer}
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.k.en} className="border-t border-white/20 pt-3">
                <dt className="text-[11px] font-semibold tracking-[0.16em] text-white/45 uppercase">
                  {tx(fact.k)}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-white">{tx(fact.v)}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-sm text-white/60">
            {companyEntity.shortName[lang] || companyEntity.shortName.en}
            {' · '}
            {companyEntity.location.locality}, {companyEntity.location.region},{' '}
            {companyEntity.location.country}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button to="/products" size="lg" className="w-full sm:w-auto">
              {tx(homeCopy.viewProducts)}
            </Button>
            <Button
              to={contactInquiryPath}
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t.nav.getQuote}
            </Button>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}
