import { useState } from 'react';
import { LocaleLink } from '@/i18n/navigation';
import { factoryShowcase } from '@/data/gallery';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { StageGallery } from '@/components/ui/StageGallery';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n/I18nContext';

export function FactoryCapability() {
  const { t, tx } = useI18n();
  const [active, setActive] = useState(0);
  const points = [
    t.factoryCapability.i1,
    t.factoryCapability.i2,
    t.factoryCapability.i3,
    t.factoryCapability.i4,
  ];

  return (
    <section className="section-y bg-bg-soft">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            eyebrow={t.factoryCapability.eyebrow}
            title={t.factoryCapability.title}
            subtitle={t.factoryCapability.body}
          />
          <ul className="grid max-w-xl grid-cols-2 gap-x-8 gap-y-2 text-sm text-dark">
            {points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <StageGallery
            frames={factoryShowcase.map((frame) => ({
              id: frame.id,
              src: frame.image,
              alt: tx(frame.alt),
              label: tx(frame.label),
              width: frame.width,
              height: frame.height,
            }))}
            active={active}
            onChange={setActive}
            placeholderLabel={t.placeholder.factory}
          />
        </div>

        <div className="mt-8 flex items-center gap-6">
          <Button to="/factory" variant="outline">
            {t.factoryCapability.view}
          </Button>
          <LocaleLink to="/about" className="text-sm font-medium text-text-secondary hover:text-primary">
            {t.factory.viewFactory} →
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
