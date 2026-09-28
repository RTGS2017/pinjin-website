/**
 * Homepage Field Media Console loading policy.
 *
 * - Only the active clip uses preload="auto" (muted, playsInline).
 * - The next clip uses preload="metadata" and is fetched after the console is in view.
 * - Other files stay poster-only.
 * - Reduced-motion stays poster-only. Never preload clips from index.html.
 * - Factory still remains the LCP image.
 */
export type MediaPreload = 'auto' | 'metadata' | 'none';

/** distance 0 = active, 1 = immediate neighbor, 2+ = rest of the library. */
export function preloadForDistance(distance: number): MediaPreload {
  const steps = Math.abs(distance);
  if (steps === 0) return 'auto';
  if (steps === 1) return 'metadata';
  return 'none';
}
