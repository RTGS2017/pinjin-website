import { useEffect, useRef, useState } from 'react';
import { withBase } from '@/config/site';
import { preloadForDistance, type MediaPreload } from '@/data/mediaLoading';

type ApplicationClipProps = {
  src: string;
  poster: string;
  alt: string;
  active: boolean;
  index: number;
  current: number;
  count: number;
  desktop: boolean;
};

function circularDistance(a: number, b: number, count: number) {
  const delta = Math.abs(a - b);
  return Math.min(delta, count - delta);
}

export function ApplicationClip({
  src,
  poster,
  alt,
  active,
  index,
  current,
  count,
  desktop,
}: ApplicationClipProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(motion.matches);
    sync();
    motion.addEventListener('change', sync);
    return () => motion.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (desktop) return;
    const node = rootRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.45),
      { threshold: [0.45, 0.7] },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [desktop]);

  const shouldPlay = !reduced && active && (desktop || inView);
  const distance = desktop ? circularDistance(index, current, count) : shouldPlay ? 0 : 2;
  const preload: MediaPreload = reduced ? 'none' : preloadForDistance(distance);
  const mediaSrc = preload === 'none' ? undefined : withBase(src);
  const posterSrc = withBase(poster);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (!mediaSrc) {
      el.pause();
      el.removeAttribute('src');
      el.load();
      return;
    }

    if (el.getAttribute('src') !== mediaSrc) {
      el.setAttribute('src', mediaSrc);
      el.load();
    }

    if (!shouldPlay) {
      el.pause();
      return;
    }

    const play = () => {
      void el.play().catch(() => undefined);
    };
    el.addEventListener('canplay', play);
    play();
    return () => el.removeEventListener('canplay', play);
  }, [mediaSrc, shouldPlay]);

  return (
    <div ref={rootRef} className="home-app-visual">
      {reduced ? (
        <img src={posterSrc} alt={alt} width={720} height={1080} />
      ) : (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          disablePictureInPicture
          preload={preload}
          poster={posterSrc}
          aria-label={alt}
        />
      )}
    </div>
  );
}
