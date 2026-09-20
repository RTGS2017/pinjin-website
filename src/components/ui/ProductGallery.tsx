import { useEffect, useState } from 'react';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { isProductCatalogImage } from '@/data/imageInventory';
import { productImageAlt, type Product } from '@/data/products';
import { useI18n } from '@/i18n/I18nContext';

interface ProductGalleryProps {
  product: Product;
  images: string[];
  active?: number;
  onChange?: (index: number) => void;
  showStage?: boolean;
  showThumbs?: boolean;
}

function isWorkingSrc(src: string): boolean {
  return /\/working(?:-2)?\.webp$/.test(src);
}

function isCatalogSrc(src: string): boolean {
  return isProductCatalogImage(src);
}

export function ProductGallery({
  product,
  images,
  active: activeProp,
  onChange,
  showStage = true,
  showThumbs = true,
}: ProductGalleryProps) {
  const { lang, t } = useI18n();
  const gallery = [...new Set(images.filter(Boolean))];
  const [internalActive, setInternalActive] = useState(0);
  const active = activeProp ?? internalActive;
  const setActive = (index: number) => {
    onChange?.(index);
    if (activeProp == null) setInternalActive(index);
  };
  const current = gallery[Math.min(active, Math.max(gallery.length - 1, 0))] ?? '';
  const thumbCols = gallery.length === 2 ? 'grid-cols-2' : 'grid-cols-3';
  const catalog = isCatalogSrc(current);
  const working = isWorkingSrc(current);

  useEffect(() => {
    if (activeProp == null) setInternalActive(0);
  }, [product.slug, activeProp]);

  return (
    <div>
      {showStage ? (
        <ImagePlaceholder
          src={current}
          alt={productImageAlt(product, current, lang)}
          label={t.productCard.imageComingSoon}
          hint={t.placeholder.productHint}
          priority
          width={working ? 1600 : catalog ? 1054 : 1536}
          height={working ? 1200 : catalog ? 1492 : 1024}
          className={
            working
              ? 'aspect-[4/3] w-full bg-transparent'
              : catalog
                ? 'max-h-[min(28rem,70vh)] w-full overflow-auto bg-card'
                : 'aspect-[4/3] w-full bg-transparent'
          }
          imgClassName={
            working ? 'h-full w-full object-cover' : 'h-full w-full object-contain'
          }
        />
      ) : null}
      {showThumbs && gallery.length > 1 ? (
        <div className={`grid items-stretch gap-2 ${thumbCols} ${showStage ? 'mt-3' : ''}`}>
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
                className="aspect-[4/3] w-full bg-transparent"
                imgClassName="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
