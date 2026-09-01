import { useEffect, useState } from 'react';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { productImageAlt, type Product } from '@/data/products';
import { useI18n } from '@/i18n/I18nContext';

interface ProductGalleryProps {
  product: Product;
  images: string[];
}

function isWorkingSrc(src: string): boolean {
  return /\/working(?:-2)?\.webp$/.test(src);
}

export function ProductGallery({ product, images }: ProductGalleryProps) {
  const { lang, t } = useI18n();
  const gallery = [...new Set(images.filter(Boolean))];
  const [active, setActive] = useState(0);
  const current = gallery[Math.min(active, Math.max(gallery.length - 1, 0))] || product.image;
  const thumbCols = gallery.length === 2 ? 'grid-cols-2' : 'grid-cols-3';

  useEffect(() => {
    setActive(0);
  }, [product.slug]);

  return (
    <div>
      <ImagePlaceholder
        src={current}
        alt={productImageAlt(product, current, lang)}
        label={t.productCard.imageComingSoon}
        hint={t.placeholder.productHint}
        priority
        width={isWorkingSrc(current) ? 1600 : 1536}
        height={isWorkingSrc(current) ? 1200 : 1024}
        className={
          isWorkingSrc(current)
            ? 'aspect-[4/3] w-full bg-transparent'
            : 'w-full bg-transparent'
        }
        imgClassName={
          isWorkingSrc(current) ? 'object-cover' : 'h-auto w-full object-contain'
        }
      />
      {gallery.length > 1 ? (
        <div className={`mt-3 grid items-start gap-2 ${thumbCols}`}>
          {gallery.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              className={[
                'border bg-transparent',
                index === active ? 'border-primary' : 'border-border',
              ].join(' ')}
              aria-label={`${productImageAlt(product, src, lang)} ${index + 1}`}
              aria-pressed={index === active}
            >
              <ImagePlaceholder
                src={src}
                alt=""
                label={t.placeholder.image}
                hint=""
                decorative
                width={400}
                height={267}
                className="w-full bg-transparent"
                imgClassName={
                  isWorkingSrc(src) ? 'aspect-[4/3] object-cover' : 'h-auto w-full object-contain'
                }
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
