import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { getMailtoHref, navItems, siteConfig, withBase } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n/I18nContext';
import type { Lang } from '@/i18n/types';

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useI18n();

  const navLabel = (key: (typeof navItems)[number]['key']) => t.nav[key];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'text-sm font-medium tracking-wide transition-colors',
      lang === 'en' ? 'uppercase' : '',
      isActive ? 'text-primary' : 'text-white/90 hover:text-primary',
    ].join(' ');

  const isHashActive = (href: string) => {
    if (!href.includes('#')) return false;
    const [path, hash] = href.split('#');
    return location.pathname === path && location.hash === `#${hash}`;
  };

  const switchLang = (next: Lang) => {
    setLang(next);
  };

  return (
    <header className="sticky top-0 z-50 bg-dark text-white">
      <div className="container-site flex h-16 items-center justify-between lg:h-[72px]">
        <Link
          to="/"
          className="flex items-baseline gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="text-xl font-semibold tracking-[0.14em]">
            {siteConfig.brandName}
          </span>
          <span className="hidden text-sm text-white/50 sm:inline">
            {siteConfig.brandNameCn}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {navItems.map((item) =>
            item.href.includes('#') ? (
              <a
                key={item.key}
                href={withBase(item.href)}
                className={[
                  'text-sm font-medium tracking-wide transition-colors',
                  lang === 'en' ? 'uppercase' : '',
                  isHashActive(item.href)
                    ? 'text-primary'
                    : 'text-white/90 hover:text-primary',
                ].join(' ')}
              >
                {navLabel(item.key)}
              </a>
            ) : (
              <NavLink
                key={item.key}
                to={item.href}
                className={linkClass}
                end={item.href === '/'}
              >
                {navLabel(item.key)}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div
            className="flex items-center gap-1 text-xs tracking-wider"
            role="group"
            aria-label="Language"
          >
            <button
              type="button"
              onClick={() => switchLang('en')}
              className={[
                'px-1.5 py-1 transition-colors',
                lang === 'en' ? 'text-primary' : 'text-white/40 hover:text-white',
              ].join(' ')}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
            <span className="text-white/30" aria-hidden>
              |
            </span>
            <button
              type="button"
              onClick={() => switchLang('zh')}
              className={[
                'px-1.5 py-1 transition-colors',
                lang === 'zh' ? 'text-primary' : 'text-white/40 hover:text-white',
              ].join(' ')}
              aria-pressed={lang === 'zh'}
            >
              中文
            </button>
          </div>
          <Button href={getMailtoHref(t.mailSubjectQuote)} size="md">
            {t.nav.getQuote}
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-white lg:hidden"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-dark-2 lg:hidden">
          <nav
            className="container-site flex flex-col gap-1 py-4"
            aria-label="Mobile"
          >
            {navItems.map((item) =>
              item.href.includes('#') ? (
                <a
                  key={item.key}
                  href={withBase(item.href)}
                  className="px-2 py-3 text-sm font-medium tracking-wide text-white"
                  onClick={() => setOpen(false)}
                >
                  {navLabel(item.key)}
                </a>
              ) : (
                <NavLink
                  key={item.key}
                  to={item.href}
                  className="px-2 py-3 text-sm font-medium tracking-wide text-white"
                  onClick={() => setOpen(false)}
                  end={item.href === '/'}
                >
                  {navLabel(item.key)}
                </NavLink>
              ),
            )}
            <div className="mt-2 flex items-center gap-3 px-2 text-sm">
              <button
                type="button"
                onClick={() => switchLang('en')}
                className={lang === 'en' ? 'text-primary' : 'text-white/50'}
              >
                EN
              </button>
              <span className="text-white/30">|</span>
              <button
                type="button"
                onClick={() => switchLang('zh')}
                className={lang === 'zh' ? 'text-primary' : 'text-white/50'}
              >
                中文
              </button>
            </div>
            <div className="mt-2 px-2 pb-2">
              <Button
                href={getMailtoHref(t.mailSubjectQuote)}
                className="w-full"
                onClick={() => setOpen(false)}
              >
                {t.nav.getQuote}
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
