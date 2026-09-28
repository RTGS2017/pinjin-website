import { withBase } from '@/config/site';
import { responsiveAvif, responsiveWebp } from '@/data/responsiveImages.generated';

export type ResponsiveCandidate = { path: string; width: number };

const maps = {
  webp: responsiveWebp,
  avif: responsiveAvif,
} as const;

export function responsiveCandidates(
  src: string,
  kind: keyof typeof maps,
): ResponsiveCandidate[] | undefined {
  const list = maps[kind][src];
  return list?.length ? list : undefined;
}

export function srcSetFor(src: string, kind: keyof typeof maps): string | undefined {
  const list = responsiveCandidates(src, kind);
  if (!list) return undefined;
  return list.map((item) => `${withBase(item.path)} ${item.width}w`).join(', ');
}

export function largestCandidatePath(src: string, kind: keyof typeof maps): string | undefined {
  const list = responsiveCandidates(src, kind);
  if (!list) return undefined;
  return [...list].sort((a, b) => b.width - a.width)[0]?.path;
}
