import { Button } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { useI18n } from '@/i18n/I18nContext';

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[72vh] overflow-hidden bg-dark text-white lg:min-h-[78vh]">
      <div className="absolute inset-0">
        <ImagePlaceholder
          src="/images/hero/hero-main-hebei-pinjin-machinery-factory.webp"
          alt="Hebei Pinjin Machinery Manufacturing Co., Ltd. factory exterior in Xingtai, Hebei, China — concrete pump manufacturer"
          label={t.placeholder.hero}
          hint={t.placeholder.heroHint}
          priority
          width={1920}
          height={814}
          className="h-full w-full"
          imgClassName="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/85 to-dark/40" />
      </div>

      <div className="container-site relative flex min-h-[72vh] items-center py-16 lg:min-h-[78vh]">
        <div className="max-w-2xl fade-up">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            {t.hero.eyebrow}
          </p>
          <h1 className="mt-4 heading-display whitespace-pre-line text-4xl text-white sm:text-5xl lg:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/75 sm:text-lg">
            {t.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button to="/products" size="lg" className="w-full sm:w-auto">
              {t.hero.explore}
            </Button>
            <Button href="#inquiry" variant="ghost" size="lg" className="w-full sm:w-auto">
              {t.hero.quote}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
