import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { I18nProvider, detectPreferredLang } from '@/i18n/I18nContext';
import { defaultLang, isLang } from '@/i18n/config';
import { localePath } from '@/i18n/paths';

/** `/` → `/{preferredLang}` */
export function RootRedirect() {
  const preferred = detectPreferredLang();
  return <Navigate to={`/${preferred}`} replace />;
}

/**
 * 校验 `/:lang`；若第一段不是语言码（如旧链接 /products），
 * 则重定向到 `/{defaultLang}{原路径}`。
 */
export function LanguageRoot() {
  const { lang: langParam } = useParams<{ lang: string }>();
  const location = useLocation();

  if (!isLang(langParam)) {
    const target = `/${defaultLang}${location.pathname}${location.search}${location.hash}`;
    return <Navigate to={target} replace />;
  }

  return (
    <I18nProvider lang={langParam}>
      <Outlet />
    </I18nProvider>
  );
}

/** 未知子路径 → 当前语言首页（已在 I18nProvider 内） */
export function LangHomeRedirect() {
  const { lang } = useParams<{ lang: string }>();
  const code = isLang(lang) ? lang : defaultLang;
  return <Navigate to={localePath('/', code)} replace />;
}
