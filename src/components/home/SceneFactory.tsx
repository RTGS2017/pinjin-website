import type { CSSProperties } from 'react';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LocaleLink } from '@/i18n/navigation';
import { factorySlides, getFactorySlide } from '@/data/factory';
import { factoryNarrativeCopy, homeCopy } from '@/data/homeNarrative';
import { useI18n } from '@/i18n/I18nContext';
import { SceneFrame } from './homeScroll';

export function SceneFactory() {
  const { t, tx } = useI18n();
  const steps = factoryNarrativeCopy
    .map((step) => {
      const slide = getFactorySlide(step.slideId) ?? factorySlides[0];
      return slide ? { ...step, slide } : null;
    })
    .filter((step): step is NonNullable<typeof step> => Boolean(step));

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

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-12">
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
                eager={index === 0}
                width={step.slide.width}
                height={step.slide.height}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="aspect-[16/10] w-full"
                imgClassName="object-cover"
              />
            </div>
          ))}
        </div>

        <ol className="space-y-4 lg:col-span-5">
          {steps.map((step, index) => (
            <li
              key={step.id}
              className="home-process-step border-t border-border pt-4"
              style={{ '--i': index } as CSSProperties}
            >
              <p className="text-[11px] font-semibold tracking-[0.16em] text-primary">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 heading-display text-xl sm:text-2xl">{tx(step.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{tx(step.body)}</p>
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
