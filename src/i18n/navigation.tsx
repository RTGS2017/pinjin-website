import { useMemo } from 'react';
import {
  Link,
  NavLink,
  Navigate,
  useLocation,
  useNavigate,
  type LinkProps,
  type NavigateProps,
  type NavLinkProps,
} from 'react-router-dom';
import { useI18n } from './I18nContext';
import { localePath, stripLangFromPath } from './paths';
import type { Lang } from './config';

function localizeTo(
  to: LinkProps['to'],
  lang: Lang,
): LinkProps['to'] {
  if (typeof to === 'string') return localePath(to, lang);
  if (typeof to === 'number') return to;
  const pathname = to.pathname ?? '/';
  return {
    ...to,
    pathname: localePath(pathname, lang),
  };
}

/** 自动加当前语言前缀的 Link（站内跳转请用这个） */
export function LocaleLink({ to, ...rest }: LinkProps) {
  const { lang } = useI18n();
  const localized = useMemo(() => localizeTo(to, lang), [to, lang]);
  return <Link to={localized} {...rest} />;
}

export function LocaleNavLink({ to, ...rest }: NavLinkProps) {
  const { lang } = useI18n();
  const localized = useMemo(() => localizeTo(to, lang), [to, lang]);
  return <NavLink to={localized} {...rest} />;
}

export function LocaleNavigate({ to, ...rest }: NavigateProps) {
  const { lang } = useI18n();
  const localized = useMemo(() => localizeTo(to, lang), [to, lang]);
  return <Navigate to={localized} {...rest} />;
}

/** 切换语言：保留当前页面路径与 query/hash */
export function useSwitchLang() {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  return (next: Lang) => {
    if (next === lang) return;
    const page = stripLangFromPath(location.pathname);
    navigate(`${localePath(page, next)}${location.search}${location.hash}`);
  };
}
