import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'pinjin_compare_slugs';
const MAX_COMPARE = 4;

export function useCompare() {
  const [slugs, setSlugs] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  }, [slugs]);

  const toggle = useCallback((slug: string) => {
    setSlugs((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, slug];
    });
  }, []);

  const isSelected = useCallback(
    (slug: string) => slugs.includes(slug),
    [slugs],
  );

  const clear = useCallback(() => setSlugs([]), []);
  const remove = useCallback(
    (slug: string) => setSlugs((prev) => prev.filter((s) => s !== slug)),
    [],
  );

  return { slugs, toggle, isSelected, clear, remove, count: slugs.length, max: MAX_COMPARE };
}
