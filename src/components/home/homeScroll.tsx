import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { HOME_SCENES, homeSceneLabels, type HomeSceneKey } from '@/data/homeNarrative';
import { useI18n } from '@/i18n/I18nContext';

interface HomeScrollValue {
  activeIndex: number;
  reduced: boolean;
}

const HomeScrollContext = createContext<HomeScrollValue>({
  activeIndex: 0,
  reduced: false,
});

export function useHomeScroll() {
  return useContext(HomeScrollContext);
}

const STEP_SCENES: Partial<Record<HomeSceneKey, number>> = {};

export function HomeScrollRoot({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const scenes = [...root.querySelectorAll<HTMLElement>('[data-scene]')];
    if (!scenes.length) return;

    let raf = 0;

    const measure = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const y = window.scrollY;
      let bestI = 0;
      let bestR = -1;

      for (let i = 0; i < scenes.length; i += 1) {
        const el = scenes[i];
        const rect = el.getBoundingClientRect();
        const start = y + rect.top - vh * 0.18;
        const span = Math.max(el.offsetHeight - vh * 0.28, 1);
        const raw = (y - start) / span;
        const p = reduced ? 1 : Math.max(0, Math.min(1, raw));
        const enterIn = (vh * 0.9 - rect.top) / Math.max(vh * 0.42, 1);
        const enterOut = (rect.bottom - vh * 0.1) / Math.max(vh * 0.28, 1);
        const enter = reduced
          ? 1
          : Math.max(0, Math.min(1, Math.min(enterIn, enterOut)));
        el.style.setProperty('--p', p.toFixed(4));
        el.style.setProperty('--enter', enter.toFixed(4));

        const key = el.dataset.scene as HomeSceneKey | undefined;
        const n = key ? STEP_SCENES[key] : 0;
        if (n) {
          const idx = Math.min(n - 1, Math.floor(p * n * 0.999));
          el.dataset.step = String(idx);
          el.style.setProperty('--step', String(idx));
        }

        if (enter >= 0.16) {
          el.classList.add('is-inview');
        } else if (enter <= 0.06) {
          el.classList.remove('is-inview');
        }

        const visible =
          Math.min(rect.bottom, vh * 0.78) - Math.max(rect.top, vh * 0.12);
        const ratio = visible / vh;
        if (ratio > bestR) {
          bestR = ratio;
          bestI = i;
        }
      }

      setActiveIndex((cur) => (cur === bestI ? cur : bestI));
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(measure);
    };

    const io = new IntersectionObserver(
      () => {
        onScroll();
      },
      {
        threshold: [0, 0.12, 0.28, 0.45, 0.62, 0.8, 1],
        rootMargin: '-10% 0px -35% 0px',
      },
    );

    scenes.forEach((el) => io.observe(el));
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    measure();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const value = useMemo(
    () => ({ activeIndex, reduced }),
    [activeIndex, reduced],
  );

  return (
    <HomeScrollContext.Provider value={value}>
      <div
        ref={rootRef}
        className="home-narrative"
        data-reduced={reduced ? '1' : '0'}
      >
        {children}
      </div>
    </HomeScrollContext.Provider>
  );
}

export function SectionNavigator() {
  const { activeIndex, reduced } = useHomeScroll();
  const { tx } = useI18n();

  function go(id: string, event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'start',
    });
  }

  return (
    <nav
      className="home-section-nav"
      aria-label="Page sections"
    >
      <ol>
        {HOME_SCENES.map((scene, index) => {
          const current = index === activeIndex;
          return (
            <li key={scene.key}>
              <a
                href={`#${scene.id}`}
                aria-current={current ? 'true' : undefined}
                aria-label={tx(homeSceneLabels[scene.key])}
                onClick={(event) => go(scene.id, event)}
              >
                <span className="home-section-num">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="home-section-line" aria-hidden />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function SceneFrame({
  sceneKey,
  tone = 'light',
  bleed = false,
  children,
}: {
  sceneKey: HomeSceneKey;
  tone?: 'light' | 'soft' | 'dark';
  bleed?: boolean;
  children: ReactNode;
}) {
  const scene = HOME_SCENES.find((item) => item.key === sceneKey)!;
  const index = HOME_SCENES.findIndex((item) => item.key === sceneKey);
  const sticky = scene.sticky;

  return (
    <section
      id={scene.id}
      data-scene={scene.key}
      className={[
        'home-scene',
        index === 0 ? 'is-inview' : '',
        sticky ? 'home-scene-sticky' : '',
        tone === 'dark' ? 'home-scene-dark' : tone === 'soft' ? 'bg-bg-soft' : 'bg-bg',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={sticky ? 'home-scene-pin' : ''}>
        {bleed ? (
          children
        ) : (
          <div className="container-site home-scene-inner">
            <p className="home-scene-kicker" aria-hidden>
              {String(index + 1).padStart(2, '0')}
            </p>
            <div className="scene-copy scene-stagger">{children}</div>
          </div>
        )}
      </div>
    </section>
  );
}
