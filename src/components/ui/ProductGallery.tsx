import { useEffect, useState } from 'react';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { withBase } from '@/config/site';
import { useI18n } from '@/i18n/I18nContext';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

function probeImage(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = withBase(src);
  });
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const { t } = useI18n();
  const candidateKey = images.filter(Boolean).join('|');
  const candidates = candidateKey ? candidateKey.split('|') : [];
  const [available, setAvailable] = useState<string[]>(() =>
    candidates.slice(0, 1),
  );
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const list = candidateKey ? candidateKey.split('|') : [];

    if (list.length === 0) {
      setAvailable([]);
      setActive(0);
      return;
    }

    setAvailable(list.slice(0, 1));
    setActive(0);

    Promise.all(list.map((src) => probeImage(src))).then((flags) => {
      if (cancelled) return;
      setAvailable(list.filter((_, index) => flags[index]));
    });

    return () => {
      cancelled = true;
    };
  }, [candidateKey]);

  const gallery = available.length > 0 ? available : candidates.slice(0, 1);
  const current = gallery[Math.min(active, Math.max(gallery.length - 1, 0))] || '';
  const thumbCols = gallery.length === 2 ? 'grid-cols-2' : 'grid-cols-3';

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
        <div className={`mt-3 grid gap-2 ${thumbCols}`}>
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
