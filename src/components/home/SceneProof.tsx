import { Button } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Mail, MessageCircle } from 'lucide-react';
import { LocaleLink } from '@/i18n/navigation';
import {
  buyerCopy,
  buyerTypes,
  proofCopy,
  systemCopy,
  systemSteps,
  transparencyCopy,
} from '@/data/homeDecision';
import { factoryNarrativeCopy } from '@/data/homeNarrative';
import { factorySlides, getFactorySlide } from '@/data/factory';
import { getMailtoHref, getWhatsAppHref } from '@/config/site';
import { useI18n } from '@/i18n/I18nContext';
import { SceneFrame } from './homeScroll';

export function ScenePumpingSystem() {
  const { tx } = useI18n();
  return (
    <SceneFrame sceneKey="system" tone="soft">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {tx(systemCopy.kicker)}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        {tx(systemCopy.title)}
      </h2>
      <p className="mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
        {tx(systemCopy.subtitle)}
      </p>
      <ol className="mt-10 flex flex-wrap items-center gap-2 sm:gap-3">
        {systemSteps.map((step, index) => (
          <li key={step.en} className="flex items-center gap-2 sm:gap-3">
            <span className="border border-border bg-white px-3 py-2 text-sm font-semibold text-dark">
              {tx(step)}
            </span>
            {index < systemSteps.length - 1 ? (
              <span className="text-text-secondary" aria-hidden>
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      <div className="mt-8">
        <Button to="/products/concrete-pump-parts" variant="outline">
          {tx(systemCopy.cta)}
        </Button>
      </div>
    </SceneFrame>
  );
}

export function SceneFactoryProof() {
  const { t, tx } = useI18n();
  const steps = factoryNarrativeCopy
    .map((step) => {
      const slide = getFactorySlide(step.slideId) ?? factorySlides[0];
      return slide ? { ...step, slide } : null;
    })
    .filter((step): step is NonNullable<typeof step> => Boolean(step));

  return (
    <SceneFrame sceneKey="factory" tone="light">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {tx(proofCopy.kicker)}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        {tx(proofCopy.title)}
      </h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <article key={step.id} className="border border-border bg-white">
            <ImagePlaceholder
              src={step.slide.image}
              alt={tx(step.slide.alt)}
              label={t.placeholder.factory}
              hint=""
              width={step.slide.width}
              height={step.slide.height}
              sizes="(max-width: 1024px) 100vw, 22vw"
              className="aspect-[16/10] w-full"
              imgClassName="object-cover"
            />
            <div className="p-4">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-primary">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-1 font-semibold text-dark">{tx(step.title)}</h3>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-4">
        <LocaleLink to="/products" className="text-sm font-semibold text-primary hover:underline">
          {tx(proofCopy.specs)} →
        </LocaleLink>
        <a
          href={getWhatsAppHref(t.mailSubjectInquiry)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-dark hover:text-primary"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          WhatsApp
        </a>
        <a
          href={getMailtoHref()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-dark hover:text-primary"
        >
          <Mail className="h-4 w-4" aria-hidden />
          {tx(proofCopy.inquire)}
        </a>
        <LocaleLink to="/factory" className="text-sm font-semibold text-primary hover:underline">
          {t.factoryCapability.view} →
        </LocaleLink>
      </div>
    </SceneFrame>
  );
}

export function SceneTransparency() {
  const { tx } = useI18n();
  return (
    <SceneFrame sceneKey="transparency" tone="soft">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {tx(transparencyCopy.kicker)}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        {tx(transparencyCopy.title)}
      </h2>
      <p className="mt-6 max-w-3xl text-base text-text-secondary">{tx(transparencyCopy.published)}</p>
      <p className="mt-4 max-w-3xl text-base font-medium text-dark">{tx(transparencyCopy.limit)}</p>
    </SceneFrame>
  );
}

export function SceneBuyerTypes() {
  const { tx } = useI18n();
  return (
    <SceneFrame sceneKey="buyers" tone="light">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {tx(buyerCopy.kicker)}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        {tx(buyerCopy.title)}
      </h2>
      <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {buyerTypes.map((item) => (
          <li key={item.title.en} className="border border-border bg-white p-5">
            <h3 className="text-lg font-semibold text-dark">{tx(item.title)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{tx(item.body)}</p>
          </li>
        ))}
      </ul>
    </SceneFrame>
  );
}
