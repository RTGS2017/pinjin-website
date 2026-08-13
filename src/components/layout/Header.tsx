import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import {
  contactInquiryPath,
  navItems,
  siteConfig,
  withBase,
  type NavChild,
  type NavItem,
  type NavLabelKey,
} from '@/config/site';
import { categoryMeta } from '@/data/products';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n/I18nContext';
import { languages } from '@/i18n/config';
import { localePath, stripLangFromPath } from '@/i18n/paths';
import { LocaleLink, LocaleNavLink, useSwitchLang } from '@/i18n/navigation';

function childHref(child: NavChild): string {
  return child.href;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<NavLabelKey | null>(null);
  const location = useLocation();
  const { lang, t, tx } = useI18n();
  const switchLang = useSwitchLang();
  const pagePath = stripLangFromPath(location.pathname);

  const navLabel = (key: NavLabelKey) => t.nav[key];

  const childLabel = (child: NavChild) => {
    if ('categoryId' in child) {
      return tx(categoryMeta[child.categoryId].label);
    }
    return navLabel(child.key);
  };

  const isHashActive = (href: string) => {
    if (!href.includes('#')) return false;
    const localized = localePath(href, lang);
    const [path, hash] = localized.split('#');
    return location.pathname === path && location.hash === `#${hash}`;
  };

  const isChildActive = (href: string) => {
    const pathOnly = href.split('#')[0] || '/';
    if (href.includes('#')) return isHashActive(href);
    if (pathOnly === '/') return pagePath === '/';
    return pagePath === pathOnly || pagePath.startsWith(`${pathOnly}/`);
  };

  const isGroupActive = (item: NavItem) => {
    if (isChildActive(item.href)) return true;
    return item.children?.some((child) => isChildActive(childHref(child))) ?? false;
  };

  const linkClass = (active: boolean) =>
    [
      'text-sm font-medium tracking-wide transition-colors',
      lang === 'en' ? 'uppercase' : '',
      active ? 'text-primary' : 'text-white/90 hover:text-primary',
    ].join(' ');

  const renderNavTarget = (
    href: string,
    label: string,
    className: string,
    onNavigate?: () => void,
  ) => {
    if (href.includes('#')) {
      return (
        <a
          href={withBase(localePath(href, lang))}
          className={className}
          onClick={onNavigate}
        >
          {label}
        </a>
      );
    }
    return (
      <LocaleNavLink
        to={href}
        className={() => className}
        onClick={onNavigate}
        end={href === '/'}
      >
        {label}
      </LocaleNavLink>
    );
  };

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
              setOpen(false);
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
    <header className="sticky top-0 z-50 bg-dark text-white">
      <div className="container-site flex h-16 items-center justify-between lg:h-[72px]">
        <LocaleLink
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
        </LocaleLink>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navItems.map((item) =>
            item.children?.length ? (
              <div key={item.key} className="group relative">
                <LocaleNavLink
                  to={item.href}
                  className={() =>
                    [
                      'inline-flex items-center gap-1 px-3 py-2',
                      linkClass(isGroupActive(item)),
                    ].join(' ')
                  }
                >
                  {navLabel(item.key)}
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden />
                </LocaleNavLink>
                <div className="invisible absolute left-0 top-full z-50 min-w-[220px] pt-1 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="border border-white/10 bg-dark-2 py-2 shadow-lg">
                    {item.children.map((child) => {
                      const href = childHref(child);
                      const label = childLabel(child);
                      return (
                        <li key={href}>
                          {renderNavTarget(
                            href,
                            label,
                            [
                              'block px-4 py-2 text-sm text-white/85 hover:bg-white/5 hover:text-primary',
                              isChildActive(href) ? 'text-primary' : '',
                            ].join(' '),
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ) : (
              <LocaleNavLink
                key={item.key}
                to={item.href}
                className={() =>
                  ['px-3 py-2', linkClass(isGroupActive(item))].join(' ')
                }
                end={item.href === '/'}
              >
                {navLabel(item.key)}
              </LocaleNavLink>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitch />
          <Button to={contactInquiryPath} size="md">
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
              item.children?.length ? (
                <div key={item.key}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-2 py-3 text-left text-sm font-medium tracking-wide text-white"
                    aria-expanded={expanded === item.key}
                    onClick={() =>
                      setExpanded((cur) => (cur === item.key ? null : item.key))
                    }
                  >
                    {navLabel(item.key)}
                    <ChevronDown
                      className={[
                        'h-4 w-4 transition-transform',
                        expanded === item.key ? 'rotate-180' : '',
                      ].join(' ')}
                    />
                  </button>
                  {expanded === item.key ? (
                    <div className="mb-1 ml-2 border-l border-white/15 pb-2">
                      {item.children.map((child) =>
                        renderNavTarget(
                          childHref(child),
                          childLabel(child),
                          'block px-3 py-2 text-sm text-white/80',
                          () => setOpen(false),
                        ),
                      )}
                    </div>
                  ) : null}
                </div>
              ) : (
                <LocaleNavLink
                  key={item.key}
                  to={item.href}
                  className="px-2 py-3 text-sm font-medium tracking-wide text-white"
                  onClick={() => setOpen(false)}
                  end={item.href === '/'}
                >
                  {navLabel(item.key)}
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
