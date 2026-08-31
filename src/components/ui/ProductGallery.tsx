import { useEffect, useState } from 'react';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { withBase } from '@/config/site';
import { useI18n } from '@/i18n/I18nContext';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

const OPTIONAL_FILES = [
  'detail-1.webp',
  'detail-2.webp',
  'detail-3.webp',
  'detail-4.webp',
  'detail-5.webp',
  'detail-6.webp',
  'detail-7.webp',
  'detail-8.webp',
  'working.webp',
  'working-2.webp',
  'catalog.webp',
] as const;

function galleryAlt(src: string, baseAlt: string): string {
  if (src.endsWith('/working-2.webp')) {
    return `${baseAlt.replace(/ manufactured by Hebei Pinjin Machinery$/i, '')} construction site application manufactured by Hebei Pinjin Machinery`;
  }
  if (src.endsWith('/working.webp')) {
    return `${baseAlt.replace(/ manufactured by Hebei Pinjin Machinery$/i, '')} working on a construction site manufactured by Hebei Pinjin Machinery`;
  }
  if (src.endsWith('/catalog.webp')) {
    return `${baseAlt.replace(/ manufactured by Hebei Pinjin Machinery$/i, '')} catalogue specification sheet manufactured by Hebei Pinjin Machinery`;
  }
  if (/\/detail-\d+\.webp$/.test(src)) {
    return `${baseAlt.replace(/ manufactured by Hebei Pinjin Machinery$/i, '')} studio product photo manufactured by Hebei Pinjin Machinery`;
  }
  return baseAlt;
}

function isWorkingSrc(src: string): boolean {
  return /\/working(?:-2)?\.webp$/.test(src);
}

/** SPA 的 404.html 可能以 200 返回，用 naturalWidth 判断是否真图 */
function confirmImage(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.naturalWidth > 1);
    img.onerror = () => resolve(false);
    img.src = withBase(src);
  });
}

function siblingOptional(mainSrc: string): string[] {
  const slash = mainSrc.lastIndexOf('/');
  if (slash < 0) return [];
  const dir = mainSrc.slice(0, slash);
  return OPTIONAL_FILES.map((file) => `${dir}/${file}`);
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const { t } = useI18n();
  const unique = [...new Set(images.filter(Boolean))];
  const main = unique[0] || '';
  const extrasKey = unique.join('|');
  const [readyExtras, setReadyExtras] = useState<string[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setReadyExtras([]);
    setActive(0);

    const parts = extrasKey ? extrasKey.split('|') : [];
    const mainSrc = parts[0] || '';
    const listed = parts.slice(1);
    const extras = [
      ...listed,
      ...siblingOptional(mainSrc).filter((src) => src !== mainSrc && !listed.includes(src)),
    ];

    if (!mainSrc || extras.length === 0) return;

    void Promise.all(extras.map((src) => confirmImage(src))).then((flags) => {
      if (cancelled) return;
      setReadyExtras(extras.filter((_, index) => flags[index]));
    });

    return () => {
      cancelled = true;
    };
  }, [extrasKey]);

  const gallery = main ? [main, ...readyExtras] : readyExtras;
  const current = gallery[Math.min(active, Math.max(gallery.length - 1, 0))] || main;
  const thumbCols = gallery.length === 2 ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <div>
      <ImagePlaceholder
        src={current}
        alt={galleryAlt(current, alt)}
        label={t.productCard.imageComingSoon}
        hint={t.placeholder.productHint}
        priority
        width={isWorkingSrc(current) ? 1600 : 1200}
        height={isWorkingSrc(current) ? 1200 : 760}
        className="aspect-square w-full border border-border"
        imgClassName={isWorkingSrc(current) ? 'object-cover' : 'object-contain p-8'}
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
              aria-label={`${galleryAlt(src, alt)} ${index + 1}`}
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
                imgClassName={isWorkingSrc(src) ? 'object-cover' : 'object-contain p-2'}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
