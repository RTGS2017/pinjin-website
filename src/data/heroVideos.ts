import type { LocalizedText } from '@/i18n/types';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

export interface HeroVideoClip {
  id: string;
  src: string;
  poster: string;
  title: LocalizedText;
  kind: LocalizedText;
  alt: LocalizedText;
  width: number;
  height: number;
}

/**
 * Portrait jobsite clips for the Hero Field Media Console.
 * Factory exterior remains the LCP image; clips are not preloaded in HTML.
 */
export const heroVideoClips: readonly HeroVideoClip[] = [
  {
    id: 'jobsite-pipeline-discharge',
    src: '/videos/hero/jobsite-pipeline-discharge.mp4',
    poster: '/videos/hero/jobsite-pipeline-discharge.webp',
    title: L('Hose discharge into formwork', '软管出料入模'),
    kind: L('Concrete placement', '现场浇筑'),
    alt: L(
      'Concrete discharging from a delivery hose into timber formwork on a construction site',
      '施工现场输送软管向木模出料',
    ),
    width: 480,
    height: 640,
  },
  {
    id: 'jobsite-trailer-pump',
    src: '/videos/hero/jobsite-trailer-pump.mp4',
    poster: '/videos/hero/jobsite-trailer-pump.webp',
    title: L('Trailer pump on a building pour', '拖式泵楼面浇筑'),
    kind: L('Trailer pump', '拖式泵'),
    alt: L(
      'Trailer concrete pump on a building site and workers placing concrete on a slab',
      '建筑工地拖式混凝土泵与楼面浇筑作业',
    ),
    width: 480,
    height: 640,
  },
];

export const HERO_CLIP_DWELL_MS = 6500;
export const HERO_CLIP_FADE_MS = 380;
