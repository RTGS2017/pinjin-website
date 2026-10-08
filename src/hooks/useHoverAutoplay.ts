import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
} from 'react';
import { carouselConfig } from '@/config/site';

/**
 * Desktop + fine pointer autoplay. Hover / focus pauses; reduced-motion and
 * touch stay static (manual only). Shared by Product System, Applications and Factory.
 */
export function useHoverAutoplay(count: number, intervalMs: number = carouselConfig.autoplayMs) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const hoverRef = useRef(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hover = window.matchMedia('(hover: hover) and (pointer: fine)');
    const wide = window.matchMedia('(min-width: 1024px)');
    const sync = () => {
      const isDesktop = wide.matches;
      setDesktop(isDesktop);
      setAutoplay(count > 1 && isDesktop && !motion.matches && hover.matches);
    };
    sync();
    motion.addEventListener('change', sync);
    hover.addEventListener('change', sync);
    wide.addEventListener('change', sync);
    return () => {
      motion.removeEventListener('change', sync);
      hover.removeEventListener('change', sync);
      wide.removeEventListener('change', sync);
    };
  }, [count]);

  useEffect(() => {
    if (!autoplay || paused || count <= 1) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [autoplay, paused, count, intervalMs]);

  useEffect(() => {
    const onVisibility = () => {
      setPaused(document.hidden || hoverRef.current);
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const pause = useCallback(() => {
    hoverRef.current = true;
    setPaused(true);
  }, []);

  const resume = useCallback(() => {
    hoverRef.current = false;
    if (!document.hidden) setPaused(false);
  }, []);

  const pauseProps = {
    onMouseEnter: pause,
    onMouseLeave: resume,
    onFocusCapture: pause,
    onBlurCapture: (event: FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        resume();
      }
    },
    onTouchStart: pause,
    onTouchEnd: resume,
  };

  return { index, setIndex, autoplay, desktop, pause, resume, pauseProps };
}
