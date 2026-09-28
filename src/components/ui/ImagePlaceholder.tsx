import { useEffect, useRef, useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { withBase } from '@/config/site';
import { srcSetFor } from '@/data/responsiveImages';

interface ImagePlaceholderProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  label?: string;
  hint?: string;
  /** Hero / LCP 图使用 eager + high fetch priority */
  priority?: boolean;
  /** 非 LCP 但仍需立即解码（如 Hero 后续幻灯），避免淡入闪白 */
  eager?: boolean;
  /** 装饰性缩略图：允许空 alt，避免重复朗读 */
  decorative?: boolean;
  /** 固有宽高，减少 CLS；与容器比例一致即可 */
  width?: number;
  height?: number;
  /** 响应式提示，配合单一 WebP 源即可 */
  sizes?: string;
}

export function ImagePlaceholder({
  src,
  alt,
  className = '',
  imgClassName = 'object-contain',
  label = 'IMAGE',
          hint = 'Image unavailable',
  priority = false,
  eager = false,
  decorative = false,
  width,
  height,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px',
}: ImagePlaceholderProps) {
  const [failed, setFailed] = useState(false);
  const defer = !priority && !eager;
  const [active, setActive] = useState(!defer);
  const boxRef = useRef<HTMLDivElement>(null);
  const meaningfulAlt = decorative
    ? ''
    : (alt ?? '').trim() || 'Hebei Pinjin Machinery';
  const resolved = withBase(src);
  const webpSrcSet = srcSetFor(src, 'webp');
  const avifSrcSet = srcSetFor(src, 'avif');

  useEffect(() => {
    setFailed(false);
  }, [resolved]);

  useEffect(() => {
    if (!defer) {
      setActive(true);
      return;
    }
    const el = boxRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: '640px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [defer, resolved]);

  return (
    <div
      ref={boxRef}
      className={`relative overflow-hidden ${className.includes('bg-') ? '' : 'bg-bg-soft'} ${className}`}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : meaningfulAlt}
    >
      {src && !failed && active ? (
        <picture>
          {avifSrcSet ? (
            <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
          ) : null}
          <img
            key={resolved}
            src={resolved}
            srcSet={webpSrcSet}
            alt={meaningfulAlt}
            width={width}
            height={height}
            loading={priority || eager ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            sizes={sizes}
            onLoad={(event) => {
              if (event.currentTarget.naturalWidth <= 1) setFailed(true);
            }}
            onError={() => setFailed(true)}
            className={`${imgClassName.includes('h-auto') ? 'w-full' : 'h-full w-full'} ${imgClassName}`}
          />
        </picture>
      ) : null}

      {!src || failed ? (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-dark-2 text-white/70"
          aria-hidden
        >
          <ImageIcon className="h-8 w-8 text-primary/80" strokeWidth={1.5} />
          <p className="text-xs font-semibold tracking-[0.16em] uppercase">
            {label}
          </p>
          {hint ? (
            <p className="px-4 text-center text-[11px] text-white/45">{hint}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
