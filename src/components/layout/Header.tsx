import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { MegaMenu, MobileMegaLinks } from '@/components/navigation/MegaMenu';
import { navItems, type NavLabelKey } from '@/config/navigation';
import { contactInquiryPath, siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n/I18nContext';
import { languages } from '@/i18n/config';
import { localePath, stripLangFromPath } from '@/i18n/paths';
import { LocaleLink, LocaleNavLink, useSwitchLang } from '@/i18n/navigation';

const CLOSE_DELAY = 280;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<NavLabelKey | null>(null);
  const [openKey, setOpenKey] = useState<NavLabelKey | null>(null);
  const closeTimer = useRef<number>(0);
  const location = useLocation();
  const { lang, t } = useI18n();
  const switchLang = useSwitchLang();
  const pagePath = stripLangFromPath(location.pathname);

  function cancelClose() {
    window.clearTimeout(closeTimer.current);
  }

  function openMega(key: NavLabelKey) {
    cancelClose();
    setOpenKey(key);
  }

  function scheduleClose() {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenKey(null), CLOSE_DELAY);
  }

  function closeMegaNow() {
    cancelClose();
    setOpenKey(null);
  }

  useEffect(() => {
    closeMegaNow();
    setMobileOpen(false);
    setExpanded(null);
  }, [location.pathname]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMegaNow();
        setMobileOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const isChildActive = (href: string) => {
    const pathOnly = href.split('#')[0] || '/';
    if (href.includes('#')) {
      const localized = localePath(href, lang);
      const [path, hash] = localized.split('#');
      return location.pathname === path && location.hash === `#${hash}`;
    }
    if (pathOnly === '/') return pagePath === '/';
    return pagePath === pathOnly || pagePath.startsWith(`${pathOnly}/`);
  };

  const isGroupActive = (key: NavLabelKey, href: string) => {
    if (isChildActive(href)) return true;
    if (key === 'products') {
      return pagePath === '/products' || pagePath.startsWith('/products/');
    }
    if (key === 'solutions') {
      return (
        pagePath === '/solutions' ||
        pagePath.startsWith('/solutions/') ||
        pagePath === '/applications' ||
        pagePath.startsWith('/applications')
      );
    }
    if (key === 'resources') {
      return (
        pagePath === '/resources' ||
        pagePath.startsWith('/resources/') ||
        pagePath === '/blog' ||
        pagePath.startsWith('/blog/') ||
        pagePath === '/faq' ||
        pagePath === '/product-selection-guide'
      );
    }
    if (key === 'company') {
      return (
        pagePath === '/about' ||
        pagePath === '/factory' ||
        pagePath.startsWith('/company')
      );
    }
    return false;
  };

  const linkClass = (active: boolean) =>
    [
      'inline-flex items-center gap-1 px-3 py-5 text-sm font-medium tracking-wide transition-colors',
      lang === 'en' ? 'uppercase' : '',
      active ? 'text-primary' : 'text-white/90 hover:text-primary',
    ].join(' ');

  const LanguageSwitch = ({ compact = false }: { compact?: boolean }) => (
    <div
      className={[
        'flex flex-wrap items-center justify-end gap-1 tracking-wider',
        compact ? 'text-sm' : 'text-[11px] lg:text-xs',
      ].join(' ')}
      role="group"
      aria-label="Language"
    >
      {languages.map((l, index) => (
        <span key={l.code} className="contents">
          {index > 0 ? (
            <span className="text-white/30" aria-hidden>
              |
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => {
              switchLang(l.code);
              setMobileOpen(false);
              closeMegaNow();
            }}
            className={[
              'px-1.5 py-1 transition-colors',
              lang === l.code ? 'text-primary' : 'text-white/40 hover:text-white',
            ].join(' ')}
            aria-pressed={lang === l.code}
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50">
      <div className="relative" onMouseLeave={scheduleClose}>
        <div className="bg-dark text-white">
          <div className="container-site flex h-16 items-center justify-between lg:h-[72px]">
            <LocaleLink
              to="/"
              className="flex items-baseline gap-2"
              onClick={() => {
                setMobileOpen(false);
                closeMegaNow();
              }}
            >
              <span className="text-xl font-semibold tracking-[0.14em]">
                {siteConfig.brandName}
              </span>
              <span className="hidden text-sm text-white/50 sm:inline">
                {siteConfig.brandNameCn}
              </span>
            </LocaleLink>

            <nav className="hidden h-full items-center gap-1 lg:flex" aria-label="Main">
              {navItems.map((item) =>
                item.mega ? (
                  <LocaleNavLink
                    key={item.key}
                    to={item.href}
                    className={() =>
                      linkClass(isGroupActive(item.key, item.href) || openKey === item.key)
                    }
                    aria-expanded={openKey === item.key}
                    aria-haspopup="true"
                    aria-controls={`mega-${item.key}`}
                    onMouseEnter={() => openMega(item.key)}
                    onFocus={() => openMega(item.key)}
                  >
                    {t.nav[item.key]}
                    <ChevronDown
                      className={[
                        'h-3.5 w-3.5 opacity-70 transition-transform',
                        openKey === item.key ? 'rotate-180' : '',
                      ].join(' ')}
                      aria-hidden
                    />
                  </LocaleNavLink>
                ) : (
                  <LocaleNavLink
                    key={item.key}
                    to={item.href}
                    className={() => linkClass(isGroupActive(item.key, item.href))}
                    onMouseEnter={closeMegaNow}
                  >
                    {t.nav[item.key]}
                  </LocaleNavLink>
                ),
              )}
            </nav>

            <div className="hidden items-center gap-4 lg:flex" onMouseEnter={closeMegaNow}>
              <LanguageSwitch />
              <Button to={contactInquiryPath} size="md">
                {t.nav.getQuote}
              </Button>
            </div>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-white lg:hidden"
              aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {openKey ? (
          <div className="absolute top-full left-1/2 z-50 hidden w-screen max-w-[100vw] -translate-x-1/2 lg:block">
            <MegaMenu navKey={openKey} onNavigate={closeMegaNow} />
          </div>
        ) : null}
      </div>

      {mobileOpen ? (
        <div className="border-t border-white/10 bg-dark-2 lg:hidden">
          <nav
            className="container-site flex max-h-[min(80vh,640px)] flex-col gap-1 overflow-y-auto py-4"
            aria-label="Mobile"
          >
            {navItems.map((item) =>
              item.mega ? (
                <div key={item.key}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-2 py-3 text-left text-sm font-medium tracking-wide text-white"
                    aria-expanded={expanded === item.key}
                    onClick={() =>
                      setExpanded((cur) => (cur === item.key ? null : item.key))
                    }
                  >
                    {t.nav[item.key]}
                    <ChevronDown
                      className={[
                        'h-4 w-4 transition-transform',
                        expanded === item.key ? 'rotate-180' : '',
                      ].join(' ')}
                    />
                  </button>
                  {expanded === item.key ? (
                    <div className="mb-1 ms-2 border-s border-white/15 pb-2">
                      <MobileMegaLinks
                        navKey={item.key}
                        onNavigate={() => setMobileOpen(false)}
                      />
                    </div>
                  ) : null}
                </div>
              ) : (
                <LocaleNavLink
                  key={item.key}
                  to={item.href}
                  className="px-2 py-3 text-sm font-medium tracking-wide text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {t.nav[item.key]}
                </LocaleNavLink>
              ),
            )}
            <div className="mt-2 px-2">
              <LanguageSwitch compact />
            </div>
            <div className="mt-2 px-2 pb-2">
              <Button
                to={contactInquiryPath}
                className="w-full"
                onClick={() => setMobileOpen(false)}
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
