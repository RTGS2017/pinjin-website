import type { ApplicationPageItem } from '@/data/applicationsContent';

export type HomeApplicationClip = {
  id: string;
  appId: ApplicationPageItem['id'];
  src: string;
  poster: string;
  width: number;
  height: number;
};

/** Homepage application clips: 2:3 crops of the supplied jobsite videos. */
export const homeApplicationClips: HomeApplicationClip[] = [
  {
    id: 'building',
    appId: 'building',
    src: '/videos/applications/building.mp4',
    poster: '/videos/applications/building.webp',
    width: 720,
    height: 1080,
  },
  {
    id: 'infrastructure',
    appId: 'infrastructure',
    src: '/videos/applications/infrastructure.mp4',
    poster: '/videos/applications/infrastructure.webp',
    width: 720,
    height: 1080,
  },
  {
    id: 'spraying-interior',
    appId: 'spraying',
    src: '/videos/applications/spraying-interior.mp4',
    poster: '/videos/applications/spraying-interior.webp',
    width: 720,
    height: 1080,
  },
  {
    id: 'handling',
    appId: 'handling',
    src: '/videos/applications/handling.mp4',
    poster: '/videos/applications/handling.webp',
    width: 720,
    height: 1080,
  },
  {
    id: 'spraying-scaffold',
    appId: 'spraying',
    src: '/videos/applications/spraying-scaffold.mp4',
    poster: '/videos/applications/spraying-scaffold.webp',
    width: 720,
    height: 1080,
  },
];
