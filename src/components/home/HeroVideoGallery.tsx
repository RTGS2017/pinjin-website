import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { withBase } from '@/config/site';
import {
  HERO_CLIP_DWELL_MS,
  HERO_CLIP_FADE_MS,
  heroVideoClips,
  type HeroVideoClip,
} from '@/data/heroVideos';
import { useI18n } from '@/i18n/I18nContext';
import { useHomeScroll } from './homeScroll';

export function FieldMediaConsole() {
  const { t, tx } = useI18n();
  const { reduced } = useHomeScroll();
  const [active, setActive] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const intersectingRef = useRef(false);
  const fadingRef = useRef(false);
  const count = heroVideoClips.length;
  const allowMedia = inView && !reduced && !expanded;
  const current = heroVideoClips[active];
  const nextIndex = (active + 1) % count;
  const layers = [active];
  if (incoming !== null && incoming !== active) layers.push(incoming);
  else if (allowMedia && nextIndex !== active) layers.push(nextIndex);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.some((entry) => entry.isIntersecting);
        intersectingRef.current = seen;
        setInView(seen && !document.hidden);
      },
      { threshold: 0.22, rootMargin: '120px 0px' },
    );
    const onVis = () => setInView(intersectingRef.current && !document.hidden);
    io.observe(el);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  useEffect(() => {
    if (!allowMedia || count < 2) return;
    const id = window.setTimeout(() => {
      if (fadingRef.current) return;
      fadingRef.current = true;
      setIncoming(nextIndex);
      window.setTimeout(() => {
        setActive(nextIndex);
        setIncoming(null);
        fadingRef.current = false;
      }, HERO_CLIP_FADE_MS);
    }, HERO_CLIP_DWELL_MS);
    return () => window.clearTimeout(id);
  }, [allowMedia, active, count, nextIndex]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [expanded]);

  const indexLabel = `${String(active + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`;

  return (
    <>
      <div
        ref={rootRef}
        className="home-field"
        aria-roledescription="carousel"
        aria-label={t.hero.fieldMedia}
      >
        <div className="home-field-shell">
          <header className="home-field-head">
            <p>{t.hero.fieldMedia}</p>
            <p>
              {t.hero.jobsite} / {t.hero.xingtai}
            </p>
            <p>{t.hero.fieldBrand}</p>
          </header>

          <button
            type="button"
            className={['home-field-screen', incoming !== null ? 'is-feed' : ''].join(' ')}
            aria-label={`${tx(current.title)}. ${t.hero.openClip}`}
            onClick={() => setExpanded(true)}
          >
            <img
              src={withBase(current.poster)}
              alt={tx(current.alt)}
              width={current.width}
              height={current.height}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="home-field-poster"
            />
            {allowMedia
              ? layers.map((index) => (
                  <ClipLayer
                    key={heroVideoClips[index].id}
                    clip={heroVideoClips[index]}
                    role={
                      index === incoming
                        ? 'in'
                        : index === active
                          ? 'active'
                          : 'next'
                    }
                    play={index === active || index === incoming}
                  />
                ))
              : null}
            <span className="home-field-scan" aria-hidden />
          </button>

          <footer className="home-field-foot">
            <p className="home-field-kind">{tx(current.kind)}</p>
            <p className="home-field-title">{tx(current.title)}</p>
            <p className="home-field-live">
              <span className="home-field-dot" aria-hidden />
              {t.hero.liveFeed}
            </p>
            <p className="home-field-index">{indexLabel}</p>
          </footer>
        </div>
      </div>

      {expanded
        ? createPortal(
            <div
              className="home-field-lightbox"
              role="dialog"
              aria-modal="true"
              aria-label={tx(current.title)}
            >
              <button
                type="button"
                className="home-field-lightbox-scrim"
                aria-label={t.hero.closeClip}
                onClick={() => setExpanded(false)}
              />
              <div className="home-field home-field-lightbox-stage">
                <div className="home-field-shell">
                  <header className="home-field-head">
                    <p>{t.hero.fieldMedia}</p>
                    <p>
                      {t.hero.jobsite} / {t.hero.xingtai}
                    </p>
                  </header>
                  <div className="home-field-screen">
                    <ClipLayer clip={current} role="active" play />
                  </div>
                  <footer className="home-field-foot">
                    <p className="home-field-kind">{tx(current.kind)}</p>
                    <p className="home-field-title">{tx(current.title)}</p>
                    <p className="home-field-index">{indexLabel}</p>
                    <button
                      type="button"
                      className="home-field-close"
                      onClick={() => setExpanded(false)}
                    >
                      {t.hero.closeClip}
                    </button>
                  </footer>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

function ClipLayer({
  clip,
  role,
  play,
}: {
  clip: HeroVideoClip;
  role: 'active' | 'in' | 'next';
  play: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (play) {
      const run = el.play();
      if (run) run.catch(() => undefined);
      return;
    }
    el.pause();
  }, [play, clip.src]);

  useEffect(
    () => () => {
      const el = ref.current;
      if (!el) return;
      el.pause();
      el.removeAttribute('src');
      el.load();
    },
    [],
  );

  return (
    <video
      ref={ref}
      className={`home-field-video is-${role}`}
      muted
      playsInline
      loop
      preload={role === 'active' ? 'auto' : 'metadata'}
      poster={withBase(clip.poster)}
      width={clip.width}
      height={clip.height}
      src={withBase(clip.src)}
      disablePictureInPicture
      aria-hidden
    />
  );
}
