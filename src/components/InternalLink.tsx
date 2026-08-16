import { LocaleLink } from '@/i18n/navigation';
import { useI18n } from '@/i18n/I18nContext';
import type { TopicCluster, TopicLink } from '@/data/topicClusters';

interface InternalLinkProps {
  href: string;
  children: string;
  className?: string;
}

/** 站内主题内链（自动加语言前缀） */
export function InternalLink({ href, children, className = '' }: InternalLinkProps) {
  return (
    <LocaleLink
      to={href}
      className={`font-medium text-dark hover:text-primary ${className}`}
    >
      {children}
    </LocaleLink>
  );
}

function LinkGroup({
  title,
  items,
}: {
  title: string;
  items: TopicLink[];
}) {
  const { lang } = useI18n();
  if (!items.length) return null;
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wide text-dark">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <InternalLink href={item.href}>
              {lang === 'zh' ? item.zh : item.en}
            </InternalLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface InternalLinksProps {
  cluster: TopicCluster;
  className?: string;
}

/** 相关产品分类 / 文章 / 解决方案，用于主题集群内链 */
export function InternalLinks({ cluster, className = '' }: InternalLinksProps) {
  const { lang } = useI18n();
  return (
    <section className={`mt-14 border border-border bg-bg-soft p-6 ${className}`}>
      <h2 className="heading-display text-2xl">
        {lang === 'zh' ? '相关主题' : 'Related topics'}
      </h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-3">
        <LinkGroup
          title={lang === 'zh' ? '相关产品' : 'Related products'}
          items={cluster.relatedCategories}
        />
        <LinkGroup
          title={lang === 'zh' ? '相关文章' : 'Related articles'}
          items={cluster.relatedArticles}
        />
        <LinkGroup
          title={lang === 'zh' ? '相关方案' : 'Related solutions'}
          items={cluster.relatedSolutions}
        />
      </div>
    </section>
  );
}
