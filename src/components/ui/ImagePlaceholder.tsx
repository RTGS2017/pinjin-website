import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { withBase } from '@/config/site';

interface ImagePlaceholderProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  label?: string;
  hint?: string;
  /** Hero / LCP 图使用 eager + high fetch priority */
  priority?: boolean;
  /** 固有宽高，减少 CLS；与容器比例一致即可 */
  width?: number;
  height?: number;
}

export function ImagePlaceholder({
  src,
  alt,
  className = '',
  imgClassName = 'object-contain',
  label = 'IMAGE',
  hint = 'Replace with actual photo',
  priority = false,
  width,
  height,
}: ImagePlaceholderProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const meaningfulAlt = alt.trim() || 'Hebei Pinjin Machinery';

  return (
    <div
      className={`relative overflow-hidden bg-bg-soft ${className}`}
      role="img"
      aria-label={meaningfulAlt}
    >
      {!failed ? (
        <img
          src={withBase(src)}
          alt={meaningfulAlt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full transition-opacity duration-300 ${imgClassName} ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : null}

      {failed || !loaded ? (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-dark-2 text-white/70 ${
            failed ? '' : loaded ? 'hidden' : ''
          }`}
          aria-hidden={loaded && !failed}
        >
          <ImageIcon className="h-8 w-8 text-primary/80" strokeWidth={1.5} />
          <p className="text-xs font-semibold tracking-[0.16em] uppercase">
            {label}
          </p>
          <p className="px-4 text-center text-[11px] text-white/45">{hint}</p>
        </div>
      ) : null}
    </div>
  );
}
