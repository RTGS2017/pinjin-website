import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { products, categoryMeta } from '@/data/products';
import { useI18n } from '@/i18n/I18nContext';
import { LocaleLink } from '@/i18n/navigation';

export function ProductSearch() {
  const { t, tx } = useI18n();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter((p) => {
        const name = tx(p.name).toLowerCase();
        const desc = tx(p.shortDescription).toLowerCase();
        const cat = tx(categoryMeta[p.category].label).toLowerCase();
        return name.includes(q) || desc.includes(q) || cat.includes(q);
      })
      .slice(0, 6);
  }, [query, tx]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/80 transition-colors hover:border-white/40 hover:text-white"
        aria-label={t.nav.search || 'Search'}
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{t.nav.search || 'Search'}</span>
        <kbd className="hidden rounded bg-white/15 px-1 py-0.5 text-[10px] font-mono text-white/60 lg:inline">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-dark/60 pt-[15vh] backdrop-blur-sm">
      <div className="mx-4 w-full max-w-xl overflow-hidden rounded-xl bg-card shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-text-secondary" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.nav.searchPlaceholder || 'Search products...'}
            className="flex-1 bg-transparent text-sm text-dark outline-none placeholder:text-text-secondary"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded p-1 text-text-secondary hover:bg-bg-soft hover:text-dark"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          {results.length === 0 && query.trim() && (
            <p className="px-4 py-6 text-center text-sm text-text-secondary">
              {t.nav.noResults || 'No products found.'}
            </p>
          )}
          {results.map((product) => (
            <LocaleLink
              key={product.slug}
              to={`/products/${product.slug}`}
              onClick={() => {
                setOpen(false);
                setQuery('');
              }}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-bg-soft"
            >
              <img
                src={product.image}
                alt={tx(product.name)}
                className="h-10 w-10 rounded object-contain"
                loading="lazy"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-dark">
                  {tx(product.name)}
                </p>
                <p className="truncate text-xs text-text-secondary">
                  {tx(categoryMeta[product.category].label)}
                </p>
              </div>
            </LocaleLink>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-bg-soft px-4 py-2 text-xs text-text-secondary">
          <span>{t.nav.searchHint || 'Type to search products'}</span>
          <span>
            <kbd className="rounded bg-white px-1 py-0.5 font-mono">ESC</kbd>{' '}
            {t.nav.close || 'close'}
          </span>
        </div>
      </div>
    </div>
  );
}

