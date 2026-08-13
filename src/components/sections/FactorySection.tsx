import { SectionTitle } from '@/components/ui/SectionTitle';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { useI18n } from '@/i18n/I18nContext';

const factoryImages = [
  {
    src: '/images/factory/factory-01-workshop-exterior.webp',
    altEn: 'Pinjin factory workshop exterior in Xingtai Hebei',
  },
  {
    src: '/images/factory/factory-02-production-line.webp',
    altEn: 'Pinjin concrete pump production line',
  },
  {
    src: '/images/factory/factory-03-assembly-area.webp',
    altEn: 'Pinjin machinery assembly area',
  },
  {
    src: '/images/factory/factory-04-finished-equipment.webp',
    altEn: 'Pinjin finished concrete pump equipment area',
  },
];

export function FactorySection() {
  const { t } = useI18n();

  return (
    <section id="factory" className="section-y bg-bg scroll-mt-24">
      <div className="container-site">
        <SectionTitle title={t.factory.title} subtitle={t.factory.subtitle} />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {factoryImages.map((item) => (
            <ImagePlaceholder
              key={item.src}
              src={item.src}
              alt={item.altEn}
              label={t.placeholder.factory}
              hint={t.placeholder.factoryHint}
              width={1600}
              height={1000}
              className="aspect-[16/10] w-full"
              imgClassName="object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
