import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, Menu, MessageCircle, X } from 'lucide-react';
import { MegaMenu, MobileMegaLinks } from '@/components/navigation/MegaMenu';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { navItems, type NavLabelKey } from '@/config/navigation';
import { contactInquiryPath, getWhatsAppHref, siteConfig, withBase } from '@/config/site';
import { useI18n } from '@/i18n/I18nContext';
import { localePath, stripLangFromPath } from '@/i18n/paths';
import { LocaleLink, LocaleNavLink } from '@/i18n/navigation';
import { homeCopy } from '@/data/homeNarrative';

const CLOSE_DELAY = 280;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<NavLabelKey | null>(null);
  const [openKey, setOpenKey] = useState<NavLabelKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number>(0);
  const location = useLocation();
  const { lang, t, tx } = useI18n();
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

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 24);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

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
        pagePath === '/faq'
      );
    }
    if (key === 'company' || key === 'factory') {
      return (
        pagePath === '/about' ||
        pagePath === '/markets' ||
        pagePath === '/factory' ||
        pagePath.startsWith('/company')
      );
    }
    return false;
  };

  const onHome = pagePath === '/';
  const solid = true;
  const findPumpTo = onHome ? '/#start-selection' : '/product-selection-guide';

  const navLinkClass = (active: boolean) =>
    ['site-header-item', active ? 'is-active' : '', lang === 'en' ? 'is-en' : '']
      .filter(Boolean)
      .join(' ');

  const closeLangAndNav = () => {
    setMobileOpen(false);
    closeMegaNow();
  };

  return (
    <header
      className={[
        'site-header sticky top-0 z-50 isolate',
        solid ? 'is-solid' : 'is-transparent',
        scrolled ? 'is-compact' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="relative" onMouseLeave={scheduleClose}>
        <div className="site-header-rule">
          <div className="container-site site-header-bar">
            <div className="site-header-cluster">
              <LocaleLink
                to="/"
                className="site-header-brand"
                onClick={() => {
                  setMobileOpen(false);
                  closeMegaNow();
                }}
              >
                <img
                  src={withBase(siteConfig.logoPath)}
                  alt=""
                  width={40}
                  height={40}
                  className="site-header-logo"
                />
                <span className="site-header-lockup">
                  <span className="site-header-name">{siteConfig.brandName}</span>
                  <span className="site-header-tag">{tx(homeCopy.brandLockup)}</span>
                </span>
              </LocaleLink>

              <nav className="site-header-nav" aria-label="Main">
                {navItems.map((item) =>
                  item.mega ? (
                    <LocaleNavLink
                      key={item.key}
                      to={item.href}
                      className={() =>
                        navLinkClass(isGroupActive(item.key, item.href) || openKey === item.key)
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
                          'site-header-caret',
                          openKey === item.key ? 'is-open' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        aria-hidden
                      />
                    </LocaleNavLink>
                  ) : (
                    <LocaleNavLink
                      key={item.key}
                      to={item.href}
                      className={() => navLinkClass(isGroupActive(item.key, item.href))}
                      onMouseEnter={closeMegaNow}
                    >
                      {t.nav[item.key]}
                    </LocaleNavLink>
                  ),
                )}
              </nav>
            </div>

            <div className="site-header-actions" onMouseEnter={closeMegaNow}>
              <LanguageSwitcher
                fit="header"
                onPicked={closeLangAndNav}
                tone={solid ? 'light' : 'dark'}
              />
              <a
                href={getWhatsAppHref(t.mailSubjectInquiry)}
                target="_blank"
                rel="noopener noreferrer"
                className="site-header-item site-header-wa"
              >
                <MessageCircle className="site-header-caret" aria-hidden />
                {t.contact.whatsapp}
              </a>
              <LocaleLink to={findPumpTo} className="site-header-item site-header-find">
                {t.nav.findMyPump}
              </LocaleLink>
              <LocaleLink to={contactInquiryPath} className="site-header-item site-header-quote">
                {t.nav.getQuote}
              </LocaleLink>
            </div>

            <button
              type="button"
              className="site-header-menu"
              aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
        <div className="site-header-drawer lg:hidden">
          <nav className="container-site site-header-drawer-nav" aria-label="Mobile">
            {navItems.map((item) =>
              item.mega ? (
                <div key={item.key}>
                  <button
                    type="button"
                    className="site-header-drawer-item"
                    aria-expanded={expanded === item.key}
                    onClick={() =>
                      setExpanded((cur) => (cur === item.key ? null : item.key))
                    }
                  >
                    {t.nav[item.key]}
                    <ChevronDown
                      className={[
                        'site-header-caret',
                        expanded === item.key ? 'is-open' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    />
                  </button>
                  {expanded === item.key ? (
                    <div className="site-header-drawer-sub">
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
                  className="site-header-drawer-item"
                  onClick={() => setMobileOpen(false)}
                >
                  {t.nav[item.key]}
                </LocaleNavLink>
              ),
            )}
            <div className="site-header-drawer-lang">
              <LanguageSwitcher compact onPicked={closeLangAndNav} />
            </div>
            <div className="site-header-drawer-actions">
              <a
                href={getWhatsAppHref(t.mailSubjectInquiry)}
                target="_blank"
                rel="noopener noreferrer"
                className="site-header-item site-header-wa"
                onClick={() => setMobileOpen(false)}
              >
                <MessageCircle className="site-header-caret" aria-hidden />
                {t.contact.whatsapp}
              </a>
              <LocaleLink
                to={findPumpTo}
                className="site-header-item site-header-find"
                onClick={() => setMobileOpen(false)}
              >
                {t.nav.findMyPump}
              </LocaleLink>
              <LocaleLink
                to={contactInquiryPath}
                className="site-header-item site-header-quote"
                onClick={() => setMobileOpen(false)}
              >
                {t.nav.getQuote}
              </LocaleLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
