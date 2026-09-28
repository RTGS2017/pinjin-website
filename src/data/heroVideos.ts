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
  {
    id: 'jobsite-pipeline-masonry',
    src: '/videos/hero/jobsite-pipeline-masonry.mp4',
    poster: '/videos/hero/jobsite-pipeline-masonry.webp',
    title: L('Pipeline through masonry and hopper charging', '管路穿墙与料斗上料'),
    kind: L('On-site pumping', '现场泵送'),
    alt: L(
      'Delivery hose through a masonry opening and workers charging a trailer pump hopper on site',
      '输送管穿过砌体洞口，工人在现场向拖式泵料斗上料',
    ),
    width: 480,
    height: 640,
  },
  {
    id: 'jobsite-compact-open-pour',
    src: '/videos/hero/jobsite-compact-open-pour.mp4',
    poster: '/videos/hero/jobsite-compact-open-pour.webp',
    title: L('Compact pump indoors and open-form pour', '室内紧凑型泵与露天浇筑'),
    kind: L('Compact pump', '紧凑型泵'),
    alt: L(
      'Compact yellow concrete pump indoors and a pipeline discharging into open formwork',
      '室内黄色紧凑型混凝土泵，以及管路向露天模板出料',
    ),
    width: 480,
    height: 640,
  },
];

export const HERO_CLIP_DWELL_MS = 6500;
export const HERO_CLIP_FADE_MS = 380;
