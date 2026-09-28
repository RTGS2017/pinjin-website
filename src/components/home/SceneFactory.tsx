import type { CSSProperties } from 'react';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LocaleLink } from '@/i18n/navigation';
import { factorySlides, getFactorySlide } from '@/data/factory';
import { factoryNarrativeCopy, homeCopy } from '@/data/homeNarrative';
import { useI18n } from '@/i18n/I18nContext';
import { useHoverAutoplay } from '@/hooks/useHoverAutoplay';
import { SceneFrame } from './homeScroll';

export function SceneFactory() {
  const { t, tx } = useI18n();
  const steps = factoryNarrativeCopy
    .map((step) => {
      const slide = getFactorySlide(step.slideId) ?? factorySlides[0];
      return slide ? { ...step, slide } : null;
    })
    .filter((step): step is NonNullable<typeof step> => Boolean(step));
  const { index: active, setIndex, pauseProps } = useHoverAutoplay(steps.length);

  return (
    <SceneFrame sceneKey="factory" tone="soft">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {t.factoryCapability.eyebrow}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        {t.factoryCapability.title}
      </h2>
      <p className="mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
        {tx(homeCopy.factoryLead)} {t.factoryCapability.body}
      </p>

      <div
        className="home-factory-board mt-10 grid items-start gap-8 lg:grid-cols-12"
        style={{ '--step': active } as CSSProperties}
        data-step={active}
        {...pauseProps}
      >
        <div className="home-factory-stage relative overflow-hidden lg:col-span-7">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="home-factory-frame"
              data-i={index}
              style={{ '--i': index } as CSSProperties}
            >
              <ImagePlaceholder
                src={step.slide.image}
                alt={tx(step.slide.alt)}
                label={t.placeholder.factory}
                hint=""
                width={step.slide.width}
                height={step.slide.height}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="aspect-[16/10] w-full"
                imgClassName="object-cover"
              />
            </div>
          ))}
        </div>

        <ol className="space-y-2 lg:col-span-5">
          {steps.map((step, index) => (
            <li key={step.id}>
              <button
                type="button"
                className="home-factory-step home-process-step w-full border-t border-border pt-4 text-left"
                style={{ '--i': index } as CSSProperties}
                aria-current={index === active ? 'true' : undefined}
                onMouseEnter={() => setIndex(index)}
                onFocus={() => setIndex(index)}
                onClick={() => setIndex(index)}
              >
                <p className="text-[11px] font-semibold tracking-[0.16em] text-primary">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 heading-display text-xl sm:text-2xl">{tx(step.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{tx(step.body)}</p>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-8">
        <LocaleLink to="/factory" className="text-sm font-semibold text-dark hover:text-primary">
          {t.factoryCapability.view} →
        </LocaleLink>
      </p>
    </SceneFrame>
  );
}
