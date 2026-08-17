import { LocaleLink } from '@/i18n/navigation';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { companyEntity } from '@/config/entity';
import { factorySlides, getFactoryProofSlides, type FactorySlide } from '@/data/factory';
import { useI18n } from '@/i18n/I18nContext';

function SlideCard({ slide }: { slide: FactorySlide }) {
  const { t, tx } = useI18n();
  return (
    <figure className="overflow-hidden border border-border bg-bg-soft">
      <ImagePlaceholder
        src={slide.image}
        alt={tx(slide.alt)}
        label={t.placeholder.factory}
        hint=""
        width={slide.width}
        height={slide.height}
        className="aspect-video w-full"
        imgClassName="object-cover"
      />
      <figcaption className="p-4">
        <h3 className="text-sm font-semibold text-dark">{tx(slide.title)}</h3>
        <p className="mt-1 text-sm text-text-secondary">{tx(slide.description)}</p>
      </figcaption>
    </figure>
  );
}

/** About 页工厂一览网格 */
export function FactoryOverview() {
  const { lang, t } = useI18n();

  return (
    <section id="factory" className="scroll-mt-24">
      <SectionTitle title={t.factory.overviewTitle} subtitle={t.factory.overviewSubtitle} />
      <p className="mt-6 max-w-3xl text-sm text-text-secondary">{companyEntity.geoCaption[lang]}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {factorySlides.map((slide) => (
          <SlideCard key={slide.id} slide={slide} />
        ))}
      </div>
    </section>
  );
}

/** 产品详情紧凑厂商能力条（外观 / 车间 / 装配） */
export function FactoryProofStrip() {
  const { lang, t } = useI18n();
  const slides = getFactoryProofSlides();

  return (
    <section className="mt-14">
      <h2 className="heading-display text-2xl sm:text-3xl">{t.factory.proofTitle}</h2>
      <p className="mt-4 max-w-3xl text-sm text-text-secondary">{companyEntity.geoCaption[lang]}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {slides.map((slide) => (
          <SlideCard key={slide.id} slide={slide} />
        ))}
      </div>
      <p className="mt-4 text-sm">
        <LocaleLink to="/factory" className="font-semibold text-dark hover:text-primary">
          {lang === 'zh'
            ? '邢台工程机械工厂能力'
            : 'Xingtai construction machinery factory'}
        </LocaleLink>
      </p>
    </section>
  );
}
