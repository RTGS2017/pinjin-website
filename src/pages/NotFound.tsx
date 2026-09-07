import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n/I18nContext';

export function NotFound() {
  const { lang } = useI18n();
  const isZh = lang === 'zh';

  return (
    <section className="section-y bg-bg">
      <SEO
        title={isZh ? '页面不存在 | 品锦机械' : 'Page not found | Pinjin Machinery'}
        description={
          isZh
            ? '该页面不存在或已更换地址。请从首页或产品目录继续浏览。'
            : 'This page does not exist or has moved. Continue from the home page or product catalogue.'
        }
        path="/404"
        noindex
      />
      <div className="container-site max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-dark">
          {isZh ? '页面不存在' : 'Page not found'}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-text-secondary">
          {isZh
            ? '该地址没有对应页面。旧分类或产品别名如仍可用，会跳转到当前规范 URL。'
            : 'There is no page at this address. Legacy category and product aliases still redirect to the current canonical URL when they exist.'}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/">{isZh ? '返回首页' : 'Back to home'}</Button>
          <Button to="/products" variant="outline">
            {isZh ? '浏览产品' : 'Browse products'}
          </Button>
        </div>
      </div>
    </section>
  );
}
