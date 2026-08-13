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

const OPEN_DELAY = 70;
const CLOSE_DELAY = 200;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<NavLabelKey | null>(null);
  const [openKey, setOpenKey] = useState<NavLabelKey | null>(null);
  const openTimer = useRef<number>(0);
  const closeTimer = useRef<number>(0);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const { lang, t } = useI18n();
  const switchLang = useSwitchLang();
  const pagePath = stripLangFromPath(location.pathname);

  function clearTimers() {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  }

  function openMega(key: NavLabelKey) {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => setOpenKey(key), OPEN_DELAY);
  }

  function scheduleClose() {
    window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenKey(null), CLOSE_DELAY);
  }

  function closeMegaNow() {
    clearTimers();
    setOpenKey(null);
  }

  useEffect(() => {
    closeMegaNow();
    setMobileOpen(false);
    setExpanded(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- close menus on route change
  }, [location.pathname, location.hash]);

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

  useEffect(() => () => clearTimers(), []);

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
      return pagePath === '/applications' || pagePath.startsWith('/applications');
    }
    if (key === 'resources') {
      return (
        pagePath === '/blog' ||
        pagePath.startsWith('/blog/') ||
        pagePath === '/faq' ||
        pagePath === '/product-selection-guide'
      );
    }
    if (key === 'company') {
      return pagePath === '/about';
    }
    return false;
  };

  const linkClass = (active: boolean) =>
    [
      'inline-flex items-center gap-1 px-3 py-2 text-sm font-medium tracking-wide transition-colors',
      lang === 'en' ? 'uppercase' : '',
      active ? 'text-primary' : 'text-white/90 hover:text-primary',
    ].join(' ');

  const LanguageSwitch = ({ compact = false }: { compact?: boolean }) => (
    <div
      className={[
        'flex items-center gap-1 tracking-wider',
        compact ? 'text-sm' : 'text-xs',
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
    <header
      ref={headerRef}
      className="sticky top-0 z-50"
      onMouseLeave={scheduleClose}
      onMouseEnter={() => window.clearTimeout(closeTimer.current)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          scheduleClose();
        }
      }}
    >
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

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
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
                  onMouseEnter={() => {
                    window.clearTimeout(openTimer.current);
                    scheduleClose();
                  }}
                >
                  {t.nav[item.key]}
                </LocaleNavLink>
              ),
            )}
          </nav>

          <div
            className="hidden items-center gap-4 lg:flex"
            onMouseEnter={() => {
              window.clearTimeout(openTimer.current);
              scheduleClose();
            }}
          >
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
        <div className="absolute inset-x-0 top-full hidden lg:block">
          <MegaMenu navKey={openKey} onNavigate={closeMegaNow} />
        </div>
      ) : null}

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
                    <div className="mb-1 ml-2 border-l border-white/15 pb-2">
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
