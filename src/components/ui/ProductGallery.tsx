import { useState } from 'react';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { useI18n } from '@/i18n/I18nContext';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const { t } = useI18n();
  const gallery = images.length > 0 ? images : [''];
  const [active, setActive] = useState(0);
  const current = gallery[active] || gallery[0];

  return (
    <div>
      <ImagePlaceholder
        key={current}
        src={current}
        alt={alt}
        label={t.productCard.imageComingSoon}
        hint={t.placeholder.productHint}
        priority
        width={1200}
        height={760}
        className="aspect-square w-full border border-border"
        imgClassName="object-contain p-8"
      />
      {gallery.length > 1 ? (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {gallery.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              className={[
                'border bg-bg-soft',
                index === active ? 'border-primary' : 'border-border',
              ].join(' ')}
              aria-label={`${alt} ${index + 1}`}
              aria-pressed={index === active}
            >
              <ImagePlaceholder
                src={src}
                alt=""
                label={t.placeholder.image}
                hint=""
                width={400}
                height={400}
                className="aspect-square w-full"
                imgClassName="object-contain p-2"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
