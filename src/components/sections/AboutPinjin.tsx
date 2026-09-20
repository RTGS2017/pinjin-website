import { LocaleLink } from '@/i18n/navigation';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { factorySlides } from '@/data/factory';
import { useI18n } from '@/i18n/I18nContext';

export function AboutPinjin() {
  const { t, tx } = useI18n();
  const photo =
    factorySlides.find((slide) => slide.id === 'workshop-crane') ?? factorySlides[0];
  const points = [t.homeWhy.c1t, t.homeWhy.c2t, t.homeWhy.c3t, t.factoryCapability.i4];

  if (!photo) return null;

  return (
    <section id="why-pinjin" className="section-y bg-bg scroll-mt-24">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2">
        <figure className="overflow-hidden border border-border bg-bg-soft">
          <ImagePlaceholder
            src={photo.image}
            alt={tx(photo.alt)}
            label={t.placeholder.factory}
            hint=""
            width={photo.width}
            height={photo.height}
            className="aspect-[4/3] w-full"
            imgClassName="object-cover"
          />
        </figure>

        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            {t.about.eyebrow}
          </p>
          <h2 className="mt-3 heading-display text-3xl sm:text-4xl">{t.about.positioning}</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
            {t.hero.intro}
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {points.map((point) => (
              <li key={point} className="border border-border bg-bg-soft px-4 py-3 text-sm font-semibold text-dark">
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm">
            <LocaleLink to="/about" className="font-semibold text-dark hover:text-primary">
              {t.footer.about} →
            </LocaleLink>
          </p>
        </div>
      </div>
    </section>
  );
}
