import { Button } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { heroGallery } from '@/data/gallery';
import { homeCopy } from '@/data/homeNarrative';
import { useI18n } from '@/i18n/I18nContext';
import { SceneFrame } from './homeScroll';

export function SceneHero() {
  const { t, tx } = useI18n();
  const hero = heroGallery[0];
  const facts = homeCopy.heroFacts;

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

        <div className="home-hero-copy scene-stagger container-site">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-white/55">
            {t.hero.place}
          </p>
          <h1 className="mt-4 heading-display whitespace-pre-line text-4xl text-white sm:text-5xl lg:text-[3.15rem]">
            {t.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/82 sm:text-lg">
            {t.hero.directAnswer}
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.k.en} className="border-t border-white/20 pt-3">
                <dt className="text-[11px] font-semibold tracking-[0.08em] text-white/55">
                  {tx(fact.k)}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-white">{tx(fact.v)}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button to="/product-selection-guide" size="lg" className="w-full sm:w-auto">
              {t.hero.findEquipment}
            </Button>
            <Button href="#applications" variant="ghost" size="lg" className="w-full sm:w-auto">
              {t.hero.watchSite}
            </Button>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}
