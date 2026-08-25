import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import {
  IndustrialCarousel,
  carouselPanelStyle,
} from '@/components/ui/IndustrialCarousel';
import { contactInquiryPath, withBase } from '@/config/site';
import { heroGallery } from '@/data/gallery';
import { useI18n } from '@/i18n/I18nContext';

export function Hero() {
  const { t, tx } = useI18n();

  return (
    <section id="factory" className="bg-dark text-white">
      <Helmet>
        <link rel="preload" as="image" type="image/webp" href={withBase(heroGallery[0].image)} />
      </Helmet>

      <IndustrialCarousel
        count={heroGallery.length}
        label={t.hero.title}
        chrome="none"
        progressTone="on-dark"
        pauseOnHover={false}
        className="min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-4.5rem)]"
        viewportClassName="relative min-h-[calc(100svh-4rem)] overflow-hidden lg:min-h-[calc(100svh-4.5rem)]"
      >
        {({ active, direction }) => (
          <>
            {heroGallery.map((item, index) => (
              <div
                key={item.id}
                className="absolute inset-0"
                style={carouselPanelStyle(index === active, direction)}
                aria-hidden={index !== active}
              >
                <ImagePlaceholder
                  src={item.image}
                  alt={tx(item.alt)}
                  label={t.placeholder.hero}
                  hint=""
                  priority={index === 0}
                  eager={index === 1}
                  width={item.width}
                  height={item.height}
                  sizes="100vw"
                  className="h-full w-full !bg-dark"
                  imgClassName="object-cover"
                />
              </div>
            ))}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-dark/88 via-dark/55 to-dark/20" />

            <div className="relative z-10 flex min-h-[calc(100svh-4rem)] items-end pb-16 pt-28 lg:min-h-[calc(100svh-4.5rem)] lg:pb-20">
              <div className="container-site w-full">
                <div className="max-w-2xl fade-up">
                  <p className="max-w-xl text-sm leading-relaxed text-white/78 sm:text-base">
                    {t.hero.intro}
                  </p>
                  <h1 className="mt-5 heading-display text-4xl text-white sm:text-5xl lg:text-[3.25rem]">
                    {t.hero.title}
                  </h1>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-white/82 sm:text-lg">
                    {t.hero.subtitle}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button to="/products" size="lg" className="w-full sm:w-auto">
                      {t.hero.explore}
                    </Button>
                    <Button
                      to={contactInquiryPath}
                      variant="ghost"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      {t.hero.quote}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </IndustrialCarousel>
    </section>
  );
}
