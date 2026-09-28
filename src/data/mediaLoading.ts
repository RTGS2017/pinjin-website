/**
 * Homepage Hero video loading policy, used by HeroVideoGallery.
 *
 * - The active clip uses preload="auto" (muted, playsInline).
 * - The previous and next clips use preload="metadata" only.
 * - Every other file stays poster-only: do not create a <video> network request.
 * - Clips mount only after the gallery is in view. Reduced-motion stays poster-only.
 * - On unmount or when distance > 1, pause and clear src (then load())
 *   so the decoder and buffer are released.
 * - Never preload the library from index.html. Factory still remains the LCP image.
 */
export type MediaPreload = 'auto' | 'metadata' | 'none';

/** distance 0 = active, 1 = immediate neighbor, 2+ = rest of the library. */
export function preloadForDistance(distance: number): MediaPreload {
  const steps = Math.abs(distance);
  if (steps === 0) return 'auto';
  if (steps === 1) return 'metadata';
  return 'none';
}
