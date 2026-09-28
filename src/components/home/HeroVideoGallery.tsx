import { useEffect, useRef, useState } from 'react';
import { withBase } from '@/config/site';
import { heroVideoClips } from '@/data/heroVideos';
import { preloadForDistance } from '@/data/mediaLoading';
import { useI18n } from '@/i18n/I18nContext';
import { useHomeScroll } from './homeScroll';

export function HeroVideoGallery() {
  const { t, tx } = useI18n();
  const { reduced } = useHomeScroll();
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const intersectingRef = useRef(false);
  const count = heroVideoClips.length;
  const allowMedia = inView && !reduced;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.some((entry) => entry.isIntersecting);
        intersectingRef.current = seen;
        setInView(seen && !document.hidden);
      },
      { threshold: 0.28, rootMargin: '80px 0px' },
    );
    const onVis = () => {
      setInView(intersectingRef.current && !document.hidden);
    };
    io.observe(el);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  function select(index: number) {
    setActive((index + count) % count);
  }

  return (
    <div
      ref={rootRef}
      className="home-hero-clips"
      aria-roledescription="carousel"
      aria-label={t.hero.clipsKicker}
    >
      <p className="home-hero-clips-kicker">{t.hero.clipsKicker}</p>
      <div className="home-hero-clip-list">
        {heroVideoClips.map((clip, index) => (
          <HeroClipCard
            key={clip.id}
            src={withBase(clip.src)}
            poster={withBase(clip.poster)}
            title={tx(clip.title)}
            alt={tx(clip.alt)}
            width={clip.width}
            height={clip.height}
            active={index === active}
            distance={Math.min(
              Math.abs(index - active),
              count - Math.abs(index - active),
            )}
            allowMedia={allowMedia}
            onSelect={() => select(index)}
            onEnded={() => select(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

function HeroClipCard({
  src,
  poster,
  title,
  alt,
  width,
  height,
  active,
  distance,
  allowMedia,
  onSelect,
  onEnded,
}: {
  src: string;
  poster: string;
  title: string;
  alt: string;
  width: number;
  height: number;
  active: boolean;
  distance: number;
  allowMedia: boolean;
  onSelect: () => void;
  onEnded: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const preload = allowMedia ? preloadForDistance(distance) : 'none';
  const showVideo = preload !== 'none';

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !showVideo) return;
    if (active) {
      const play = el.play();
      if (play) play.catch(() => undefined);
      return;
    }
    el.pause();
  }, [active, showVideo, src]);

  useEffect(() => {
    const el = videoRef.current;
    if (showVideo || !el) return;
    el.pause();
    el.removeAttribute('src');
    el.load();
  }, [showVideo]);

  useEffect(
    () => () => {
      const el = videoRef.current;
      if (!el) return;
      el.pause();
      el.removeAttribute('src');
      el.load();
    },
    [],
  );

  return (
    <button
      type="button"
      className={['home-hero-clip', active ? 'is-active' : ''].join(' ')}
      aria-pressed={active}
      aria-label={title}
      onClick={onSelect}
    >
      <img
        src={poster}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="home-hero-clip-poster"
      />
      {showVideo ? (
        <video
          ref={videoRef}
          className="home-hero-clip-video"
          muted
          playsInline
          preload={preload}
          poster={poster}
          width={width}
          height={height}
          src={src}
          onEnded={onEnded}
          aria-hidden
        />
      ) : null}
      <span className="home-hero-clip-caption">{title}</span>
    </button>
  );
}
