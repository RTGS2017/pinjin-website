import { Button } from '@/components/ui/Button';
import {
  howCopy,
  howSteps,
  requirementCopy,
  requirementPoints,
  whyCopy,
  whyPoints,
} from '@/data/homeDecision';
import { useI18n } from '@/i18n/I18nContext';
import { SceneFrame } from './homeScroll';

export function SceneRequirements() {
  const { tx } = useI18n();
  return (
    <SceneFrame sceneKey="requirements" tone="soft">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {tx(requirementCopy.kicker)}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        {tx(requirementCopy.title)}
      </h2>
      <p className="mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
        {tx(requirementCopy.subtitle)}
      </p>
      <ol className="mt-10 grid gap-4 sm:grid-cols-2">
        {requirementPoints.map((item) => (
          <li key={item.n} className="border border-border bg-white p-5">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-primary">{item.n}</p>
            <h3 className="mt-2 text-lg font-semibold text-dark">{tx(item.title)}</h3>
            <p className="mt-2 text-sm text-text-secondary">{tx(item.label)}</p>
          </li>
        ))}
      </ol>
      <p className="mt-8 max-w-2xl text-base text-dark">{tx(requirementCopy.close)}</p>
      <div className="mt-6">
        <Button to="/#start-selection" variant="cta">
          {tx(requirementCopy.cta)}
        </Button>
      </div>
    </SceneFrame>
  );
}

export function SceneWhyMatch() {
  const { tx } = useI18n();
  return (
    <SceneFrame sceneKey="why" tone="light">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {tx(whyCopy.kicker)}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        {tx(whyCopy.title)}
      </h2>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-text-secondary sm:text-lg">
        {tx(whyCopy.body)}
      </p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {whyPoints.map((item) => (
          <li key={item.title.en} className="border border-border bg-white p-5">
            <h3 className="text-lg font-semibold text-dark">{tx(item.title)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{tx(item.body)}</p>
          </li>
        ))}
      </ul>
    </SceneFrame>
  );
}

export function SceneHowItWorks() {
  const { tx } = useI18n();
  return (
    <SceneFrame sceneKey="how" tone="soft">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {tx(howCopy.kicker)}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        {tx(howCopy.title)}
      </h2>
      <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {howSteps.map((step) => (
          <li key={step.n} className="border border-border bg-white p-5">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-primary">{step.n}</p>
            <h3 className="mt-2 text-lg font-semibold text-dark">{tx(step.title)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{tx(step.body)}</p>
          </li>
        ))}
      </ol>
      <div className="mt-8">
        <Button to="/contact" variant="cta" size="lg">
          {tx(howCopy.cta)}
        </Button>
      </div>
    </SceneFrame>
  );
}
