import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** 路由 pathname 变化时回到顶部（不含仅 hash 变化） */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
