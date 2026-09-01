import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

export interface StageGalleryFrame {
  id: string;
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
}

interface StageGalleryProps {
  frames: StageGalleryFrame[];
  active: number;
  onChange: (index: number) => void;
  placeholderLabel: string;
  sizes?: string;
  /** Scene photos crop to fill; studio product photos contain on a transparent stage. */
  fit?: 'cover' | 'contain';
  ringOffsetClassName?: string;
}

export function StageGallery({
  frames,
  active,
  onChange,
  placeholderLabel,
  sizes = '(max-width: 1280px) 100vw, 1200px',
  fit = 'cover',
  ringOffsetClassName = 'ring-offset-bg-soft',
}: StageGalleryProps) {
  const current = frames[active] ?? frames[0];
  if (!current) return null;

  const contain = fit === 'contain';

  return (
    <div>
      <div className="overflow-hidden rounded-[1.6rem]">
        <ImagePlaceholder
          src={current.src}
          alt={current.alt}
          label={placeholderLabel}
          hint=""
          priority={active === 0}
          width={current.width}
          height={current.height}
          sizes={sizes}
          className={`aspect-[16/9] w-full ${contain ? 'bg-transparent' : ''}`}
          imgClassName={
            contain
              ? 'object-contain'
              : 'object-cover transition-transform duration-700 ease-out'
          }
        />
      </div>
      {frames.length > 1 ? (
        <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
          {frames.map((frame, index) => (
            <button
              key={frame.id}
              type="button"
              className={[
                'w-[4.5rem] overflow-hidden rounded-lg transition duration-300 sm:w-20',
                index === active
                  ? `opacity-100 ring-2 ring-primary ring-offset-2 ${ringOffsetClassName}`
                  : 'opacity-55 hover:opacity-100',
              ].join(' ')}
              onMouseEnter={() => onChange(index)}
              onClick={() => onChange(index)}
              aria-label={frame.label}
              aria-pressed={index === active}
            >
              <ImagePlaceholder
                src={frame.src}
                alt=""
                label=""
                hint=""
                decorative
                width={320}
                height={180}
                sizes="80px"
                className={`aspect-[16/10] w-full ${contain ? 'bg-transparent' : ''}`}
                imgClassName={contain ? 'object-contain' : 'object-cover'}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
