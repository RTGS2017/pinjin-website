import { useState } from 'react';
import { LocaleLink } from '@/i18n/navigation';
import { factoryShowcase } from '@/data/gallery';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n/I18nContext';

export function FactoryCapability() {
  const { t, tx } = useI18n();
  const [active, setActive] = useState(0);
  const current = factoryShowcase[active] ?? factoryShowcase[0];
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
          <div className="overflow-hidden rounded-[1.6rem]">
            <ImagePlaceholder
              src={current.image}
              alt={tx(current.alt)}
              label={t.placeholder.factory}
              hint=""
              width={current.width}
              height={current.height}
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="aspect-[16/9] w-full"
              imgClassName="object-cover transition-transform duration-700 ease-out"
            />
          </div>
          <div className="mt-4 flex justify-center gap-2 sm:gap-3">
            {factoryShowcase.map((frame, index) => (
              <button
                key={frame.id}
                type="button"
                className={[
                  'w-[4.5rem] overflow-hidden rounded-lg transition duration-300 sm:w-20',
                  index === active
                    ? 'opacity-100 ring-2 ring-primary ring-offset-2 ring-offset-bg-soft'
                    : 'opacity-55 hover:opacity-100',
                ].join(' ')}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-label={tx(frame.label)}
              >
                <ImagePlaceholder
                  src={frame.image}
                  alt=""
                  label=""
                  hint=""
                  decorative
                  width={320}
                  height={180}
                  sizes="80px"
                  className="aspect-[16/10] w-full"
                  imgClassName="object-cover"
                />
              </button>
            ))}
          </div>
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
