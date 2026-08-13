import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { contactInquiryPath } from '@/config/site';
import { companyEntity } from '@/config/entity';
import {
  FACTORY_ASPECT,
  FACTORY_AUTOPLAY_MS,
  factorySlides,
} from '@/data/factory';
import { useI18n } from '@/i18n/I18nContext';

export function FactoryCapability() {
  const { lang, t, tx } = useI18n();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useRef(false);

  const go = useCallback((index: number) => {
    const total = factorySlides.length;
    setActive(((index % total) + total) % total);
  }, []);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
  }, []);

  useEffect(() => {
    if (paused || reduceMotion.current) return;
    const id = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      go(active + 1);
    }, FACTORY_AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [active, go, paused]);

  const slide = factorySlides[active];
  const chips = [t.factory.chipFactory, t.factory.chipCapability, t.factory.chipQuality];

  return (
    <section
      id="factory"
      className="relative scroll-mt-24 overflow-hidden bg-dark text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={t.factory.title}
    >
      <div className="relative min-h-[70vh] lg:min-h-[78vh]" style={{ aspectRatio: FACTORY_ASPECT }}>
        {factorySlides.map((item, index) => (
          <div
            key={item.id}
            className={[
              'absolute inset-0 transition-opacity duration-700',
              index === active ? 'opacity-100' : 'pointer-events-none opacity-0',
            ].join(' ')}
            aria-hidden={index !== active}
          >
            <ImagePlaceholder
              src={item.image}
              alt={tx(item.alt)}
              label={t.placeholder.factory}
              hint=""
              priority={index === 0}
              width={item.width}
              height={item.height}
              className="h-full w-full !bg-dark"
              imgClassName="object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-dark/35" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="container-site flex h-full min-h-[70vh] items-center py-16 lg:min-h-[78vh]">
          <div className="pointer-events-auto max-w-2xl fade-up">
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              {t.factory.title}
            </p>
            <p className="mt-4 text-sm font-medium text-white/90">
              {companyEntity.legalName[lang]}
            </p>
            <p className="mt-1 text-xs tracking-[0.14em] text-white/55 uppercase">
              {companyEntity.industry[lang]}
            </p>
            <h2 className="mt-4 heading-display text-3xl text-white sm:text-4xl lg:text-5xl">
              {tx(slide.title)}
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/80 sm:text-lg">
              {tx(slide.description)}
            </p>
            <p className="mt-4 text-xs font-semibold tracking-[0.12em] text-white/50 uppercase">
              {chips.join(' | ')}
            </p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70">
              {companyEntity.geoCaption[lang]}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button to="/about#factory" size="lg" className="w-full sm:w-auto">
                {t.factory.explore}
              </Button>
              <Button
                to={contactInquiryPath}
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto"
              >
                {t.factory.quote}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10">
        <div className="container-site flex items-center justify-between gap-4">
          <div className="flex gap-2" role="tablist" aria-label={t.factory.title}>
            {factorySlides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={tx(item.title)}
                className={[
                  'h-2.5 rounded-full transition-all',
                  index === active ? 'w-8 bg-primary' : 'w-2.5 bg-white/35 hover:bg-white/60',
                ].join(' ')}
                onClick={() => go(index)}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-white/30 bg-dark/40 text-white hover:border-primary hover:text-primary"
              aria-label={t.factory.prev}
              onClick={() => go(active - 1)}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-white/30 bg-dark/40 text-white hover:border-primary hover:text-primary"
              aria-label={t.factory.next}
              onClick={() => go(active + 1)}
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
