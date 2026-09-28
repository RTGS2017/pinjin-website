/**
 * Future homepage video loading policy.
 * This module is not wired to a player. The live homepage does not ship video.
 *
 * When product-evidence clips are added later:
 * - The active clip uses preload="auto" (muted, loop, playsInline).
 * - The previous and next clips use preload="metadata" only.
 * - Every other file stays poster-only: do not create a <video> network request.
 * - On switch, pause the outgoing video and clear its src (then load())
 *   so the decoder and buffer are released.
 * - Never preload the whole library, and never preload clips from index.html.
 */
export type MediaPreload = 'auto' | 'metadata' | 'none';

/** distance 0 = active, 1 = immediate neighbor, 2+ = rest of the library. */
export function preloadForDistance(distance: number): MediaPreload {
  const steps = Math.abs(distance);
  if (steps === 0) return 'auto';
  if (steps === 1) return 'metadata';
  return 'none';
}
