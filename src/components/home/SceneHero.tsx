import { Button } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { contactInquiryPath } from '@/config/site';
import { heroGallery } from '@/data/gallery';
import { homeCopy } from '@/data/homeNarrative';
import { useI18n } from '@/i18n/I18nContext';
import { FieldMediaConsole } from './HeroVideoGallery';
import { SceneFrame } from './homeScroll';

export function SceneHero() {
  const { t, tx } = useI18n();
  const hero = heroGallery[0];
  const facts = [
    { k: homeCopy.who, v: homeCopy.whoValue },
    { k: homeCopy.what, v: homeCopy.whatValue },
    { k: homeCopy.where, v: homeCopy.whereValue },
    { k: homeCopy.why, v: homeCopy.whyValue },
  ];

  return (
    <SceneFrame sceneKey="hero" tone="dark" bleed>
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

        <div className="home-hero-copy container-site">
          <div className="home-hero-text">
            <p className="home-hero-kicker" aria-hidden>
              01
            </p>
            <p className="home-hero-intro">{t.hero.intro}</p>
            <h1 className="home-hero-title heading-display">{t.hero.title}</h1>
            <p className="home-hero-lead">{t.hero.directAnswer}</p>
          </div>

          <div className="home-hero-rail" aria-hidden>
            <span className="home-hero-rail-tick" />
          </div>

          <FieldMediaConsole />

          <div className="home-hero-meta">
            <dl className="home-hero-facts">
              {facts.map((fact) => (
                <div key={fact.k.en}>
                  <dt>{tx(fact.k)}</dt>
                  <dd>{tx(fact.v)}</dd>
                </div>
              ))}
            </dl>
            <div className="home-hero-cta">
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
      </div>
    </SceneFrame>
  );
}
