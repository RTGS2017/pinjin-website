import { X } from 'lucide-react';
import type { Product } from '@/data/products';
import { useI18n } from '@/i18n/I18nContext';
import { LocaleLink } from '@/i18n/navigation';

interface CompareTableProps {
  products: Product[];
  onClose: () => void;
}

export function CompareTable({ products, onClose }: CompareTableProps) {
  const { tx, t } = useI18n();

  const rows = [
    { key: 'image', label: '', render: (p: Product) => (
      <img src={p.image} alt={tx(p.name)} className='h-16 w-16 object-contain' loading='lazy' />
    )},
    { key: 'name', label: 'Product', render: (p: Product) => (
      <LocaleLink to={`/products/${p.slug}`} className='font-semibold text-primary hover:underline'>
        {tx(p.name)}
      </LocaleLink>
    )},
    { key: 'intro', label: 'Introduction', render: (p: Product) => (
      <p className='text-xs text-text-secondary'>{tx(p.shortDescription)}</p>
    )},
    { key: 'features', label: 'Key Features', render: (p: Product) => (
      <ul className='space-y-1'>
        {p.keyFeatures.slice(0, 3).map((f) => (
          <li key={f.en} className='text-xs text-text-secondary'>• {tx(f)}</li>
        ))}
      </ul>
    )},
    { key: 'specs', label: 'Specifications', render: (p: Product) => (
      <ul className='space-y-1'>
        {p.specifications.slice(0, 5).map((s) => (
          <li key={s.label.en} className='text-xs'>
            <span className='text-text-secondary'>{tx(s.label)}:</span>{' '}
            <span className='font-medium'>{tx(s.value)}</span>
          </li>
        ))}
      </ul>
    )},
    { key: 'cta', label: '', render: (p: Product) => (
      <LocaleLink
        to={`/products/${p.slug}`}
        className='inline-block rounded-sm bg-dark px-3 py-1.5 text-xs font-semibold text-white hover:bg-dark-2'
      >
        {t.productCard.viewDetails}
      </LocaleLink>
    )},
  ];

  return (
    <div className='fixed inset-0 z-[70] flex items-center justify-center bg-dark/70 p-4 backdrop-blur-sm'>
      <div className='max-h-[90vh] w-full max-w-5xl overflow-auto rounded-xl bg-card shadow-2xl'>
        <div className='sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4'>
          <h2 className='text-lg font-semibold text-dark'>Product Comparison</h2>
          <button
            type='button'
            onClick={onClose}
            className='rounded p-1 text-text-secondary hover:bg-bg-soft hover:text-dark'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full min-w-[600px]'>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className='border-b border-border'>
                  <td className='w-32 shrink-0 bg-bg-soft px-4 py-3 text-xs font-semibold text-text-secondary'>
                    {row.label}
                  </td>
                  {products.map((p) => (
                    <td key={p.slug} className='min-w-[180px] px-4 py-3 align-top'>
                      {row.render(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

