import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getLanguage, languages } from '@/i18n/config';
import { useI18n } from '@/i18n/I18nContext';
import { useSwitchLang } from '@/i18n/navigation';

export function LanguageSwitcher({
  compact = false,
  onPicked,
}: {
  compact?: boolean;
  onPicked?: () => void;
}) {
  const { lang, t } = useI18n();
  const switchLang = useSwitchLang();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = getLanguage(lang);

  useEffect(() => {
    if (!open) return;
    function onDoc(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={compact ? 'relative w-full' : 'relative'}>
      <button
        type="button"
        className={[
          'inline-flex items-center justify-between gap-2 border border-white/20 bg-white/5 text-white/90 transition-colors hover:border-white/40 hover:text-white',
          compact ? 'w-full px-3 py-2.5 text-sm' : 'min-w-[8.5rem] px-2.5 py-1.5 text-xs',
        ].join(' ')}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t.nav.language}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="truncate">{current.labelNative}</span>
        <ChevronDown
          className={[
            'h-3.5 w-3.5 shrink-0 opacity-70 transition-transform',
            open ? 'rotate-180' : '',
          ].join(' ')}
          aria-hidden
        />
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label={t.nav.language}
          className={[
            'z-[60] border border-white/15 bg-dark-2 py-1 shadow-lg',
            compact ? 'relative mt-1 w-full' : 'absolute end-0 top-full mt-1 min-w-[12rem]',
          ].join(' ')}
        >
          {languages.map((item) => {
            const selected = item.code === lang;
            return (
              <li key={item.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  lang={item.htmlLang}
                  dir={item.dir}
                  className={[
                    'flex w-full items-center justify-between gap-3 px-3 py-2 text-start text-sm transition-colors',
                    selected
                      ? 'bg-white/5 text-primary'
                      : 'text-white/80 hover:bg-white/10 hover:text-white',
                  ].join(' ')}
                  onClick={() => {
                    switchLang(item.code);
                    setOpen(false);
                    onPicked?.();
                  }}
                >
                  <span>{item.labelNative}</span>
                  <span className="text-[11px] tracking-wide text-white/40">
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
