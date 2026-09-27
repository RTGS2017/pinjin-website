import type { CSSProperties } from 'react';
import { LocaleLink } from '@/i18n/navigation';
import { contactInquiryPath } from '@/config/site';
import { processNarrative } from '@/data/homeNarrative';
import { useI18n } from '@/i18n/I18nContext';
import { SceneFrame } from './homeScroll';

export function SceneProcess() {
  const { t, tx } = useI18n();

  return (
    <SceneFrame sceneKey="process" tone="soft">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {t.process.title}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        {t.detail.buyProcess}
      </h2>
      <p className="mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
        {t.process.subtitle}
      </p>

      <ol className="home-process-list mt-12">
        {processNarrative.map((step, index) => (
          <li
            key={step.id}
            className="home-process-step grid gap-4 border-t border-border py-6 sm:grid-cols-12 sm:gap-8"
            style={{ '--i': index } as CSSProperties}
          >
            <p className="text-2xl font-semibold tracking-[0.12em] text-dark sm:col-span-2">
              {String(index + 1).padStart(2, '0')}
            </p>
            <div className="sm:col-span-10">
              <h3 className="heading-display text-xl sm:text-2xl">{tx(step.title)}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
                {tx(step.body)}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-8">
        <LocaleLink
          to={contactInquiryPath}
          className="text-sm font-semibold text-dark hover:text-primary"
        >
          {t.nav.getQuote} →
        </LocaleLink>
      </p>
    </SceneFrame>
  );
}
