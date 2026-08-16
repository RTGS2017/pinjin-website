import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type AnimationEvent,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  type TouchEvent,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { carouselConfig } from '@/config/site';
import { useI18n } from '@/i18n/I18nContext';

export type CarouselChrome = 'none' | 'below' | 'sides';
export type CarouselProgressTone = 'on-light' | 'on-dark';

export interface IndustrialCarouselState {
  active: number;
  direction: 1 | -1;
  go: (index: number) => void;
}

interface IndustrialCarouselProps {
  count: number;
  label: string;
  chrome?: CarouselChrome;
  progress?: boolean;
  progressTone?: CarouselProgressTone;
  pauseOnHover?: boolean;
  onChange?: (index: number) => void;
  className?: string;
  viewportClassName?: string;
  children: (state: IndustrialCarouselState) => ReactNode;
}

function wrapIndex(index: number, count: number) {
  if (count <= 0) return 0;
  return ((index % count) + count) % count;
}

export function carouselPanelStyle(
  selected: boolean,
  direction: 1 | -1,
): CSSProperties {
  const ms = carouselConfig.transitionMs;
  return {
    opacity: selected ? 1 : 0,
    transform: selected ? 'translateX(0)' : `translateX(${direction * 28}px)`,
    transition: `opacity ${ms}ms ease, transform ${ms}ms ease`,
    pointerEvents: selected ? 'auto' : 'none',
  };
}

export function formatSlideIndex(active: number, count: number) {
  const current = String(active + 1).padStart(2, '0');
  const total = String(count).padStart(2, '0');
  return `${current}/${total}`;
}

export function IndustrialCarousel({
  count,
  label,
  chrome = 'below',
  progress = true,
  progressTone = 'on-light',
  pauseOnHover = true,
  onChange,
  className = '',
  viewportClassName = '',
  children,
}: IndustrialCarouselProps) {
  const { t } = useI18n();
  const reactId = useId();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [runId, setRunId] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchX = useRef<number | null>(null);
  const activeRef = useRef(0);

  const canCycle = count > 1 && !reduceMotion;
  const showButtons = chrome !== 'none' && count > 1;
  const showProgress = progress && canCycle;

  const go = useCallback(
    (index: number) => {
      if (count <= 1) return;
      const current = activeRef.current;
      const next = wrapIndex(index, count);
      if (next === current) {
        setRunId((id) => id + 1);
        return;
      }
      const forward = wrapIndex(next - current, count);
      setDirection(forward <= count / 2 ? 1 : -1);
      setActive(next);
      setRunId((id) => id + 1);
    },
    [count],
  );

  activeRef.current = active;

  useEffect(() => {
    onChange?.(active);
  }, [active, onChange]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    function onVisibility() {
      setPaused(document.hidden);
    }
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  function step(delta: -1 | 1) {
    go(activeRef.current + delta);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (count <= 1) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    }
  }

  function onTouchStart(event: TouchEvent) {
    touchX.current = event.changedTouches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: TouchEvent) {
    const start = touchX.current;
    const end = event.changedTouches[0]?.clientX;
    touchX.current = null;
    if (start == null || end == null || count <= 1) return;
    const delta = end - start;
    if (Math.abs(delta) < carouselConfig.swipeThreshold) return;
    step(delta < 0 ? 1 : -1);
  }

  function onProgressEnd(event: AnimationEvent<HTMLSpanElement>) {
    if (event.animationName !== 'carousel-progress') return;
    if (paused || !canCycle) return;
    step(1);
  }

  const navButtons = showButtons ? (
    <>
      <button
        type="button"
        className="carousel-nav"
        aria-label={t.carousel.prev}
        aria-controls={reactId}
        onClick={() => step(-1)}
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      </button>
      {chrome === 'below' ? (
        <p className="min-w-[4.5rem] text-center text-sm font-semibold tracking-[0.14em] text-dark tabular-nums">
          {formatSlideIndex(active, count)}
        </p>
      ) : null}
      <button
        type="button"
        className="carousel-nav"
        aria-label={t.carousel.next}
        aria-controls={reactId}
        onClick={() => step(1)}
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      </button>
    </>
  ) : null;

  const progressBar = showProgress ? (
    <div
      className={[
        'h-[3px] w-full overflow-hidden',
        progressTone === 'on-dark' ? 'bg-white/20' : 'bg-border',
        chrome === 'none' ? 'absolute inset-x-0 bottom-0 z-20' : 'mt-6',
      ].join(' ')}
      role="progressbar"
      aria-label={t.carousel.progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(((active + 1) / count) * 100)}
    >
      <span
        key={runId}
        className="carousel-progress-fill block h-full w-full bg-primary"
        style={{
          animationDuration: `${carouselConfig.autoplayMs}ms`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
        onAnimationEnd={onProgressEnd}
      />
    </div>
  ) : null;

  const viewport = (
    <div
      id={reactId}
      className={`min-w-0 flex-1 ${viewportClassName}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {children({ active, direction, go })}
    </div>
  );

  return (
    <div
      className={`relative ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerEnter={() => {
        if (pauseOnHover) setPaused(true);
      }}
      onPointerLeave={() => {
        if (pauseOnHover) setPaused(false);
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {chrome === 'sides' ? (
        <div className="flex items-center gap-3 sm:gap-5">
          {showButtons ? (
            <button
              type="button"
              className="carousel-nav shrink-0"
              aria-label={t.carousel.prev}
              aria-controls={reactId}
              onClick={() => step(-1)}
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </button>
          ) : null}
          {viewport}
          {showButtons ? (
            <button
              type="button"
              className="carousel-nav shrink-0"
              aria-label={t.carousel.next}
              aria-controls={reactId}
              onClick={() => step(1)}
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </button>
          ) : null}
        </div>
      ) : (
        viewport
      )}

      {chrome === 'below' && showButtons ? (
        <div className="mt-8 flex items-center justify-center gap-4">{navButtons}</div>
      ) : null}

      {progressBar}
    </div>
  );
}
