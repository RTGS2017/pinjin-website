import { X, Scale } from 'lucide-react';
import { useCompare } from '@/hooks/useCompare';
import { getProductBySlug } from '@/data/products';
import { useI18n } from '@/i18n/I18nContext';
import { useState } from 'react';
import { CompareTable } from './CompareTable';

export function CompareBar() {
  const { slugs, remove, clear, count } = useCompare();
  const { tx } = useI18n();
  const [open, setOpen] = useState(false);

  if (count === 0) return null;

  const products = slugs.map((s) => getProductBySlug(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <div className='fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]'>
        <div className='container-site flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3 overflow-x-auto'>
            <Scale className='h-4 w-4 shrink-0 text-primary' />
            <span className='text-sm font-medium text-dark'>
              {count} selected
            </span>
            {products.map((p) =>
              p ? (
                <span
                  key={p.slug}
                  className='inline-flex items-center gap-1 rounded-full bg-bg-soft px-2.5 py-1 text-xs'
                >
                  {tx(p.name)}
                  <button
                    type='button'
                    onClick={() => remove(p.slug)}
                    className='rounded-full p-0.5 hover:bg-border'
                  >
                    <X className='h-3 w-3' />
                  </button>
                </span>
              ) : null,
            )}
          </div>
          <div className='flex shrink-0 items-center gap-2'>
            <button
              type='button'
              onClick={() => setOpen(true)}
              disabled={count < 2}
              className='rounded-sm bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-hover disabled:opacity-40'
            >
              Compare
            </button>
            <button
              type='button'
              onClick={clear}
              className='rounded-sm border border-border px-3 py-2 text-xs text-text-secondary hover:bg-bg-soft'
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      {open && <CompareTable products={products} onClose={() => setOpen(false)} />}
    </>
  );
}

