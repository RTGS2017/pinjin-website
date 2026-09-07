import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { I18nProvider } from '@/i18n/I18nContext';
import { defaultLang, isLang } from '@/i18n/config';
import { NotFound } from '@/pages/NotFound';

/** `/` → `/{defaultLang}`，海外站入口固定英文 */
export function RootRedirect() {
  return <Navigate to={`/${defaultLang}`} replace />;
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

/** 未知子路径 → 404（noindex），不要吞到首页 */
export function LangHomeRedirect() {
  return <NotFound />;
}
