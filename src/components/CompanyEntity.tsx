import { companyEntity } from '@/config/entity';
import { siteConfig } from '@/config/site';
import { useI18n } from '@/i18n/I18nContext';

interface CompanyEntityProps {
  className?: string;
  compact?: boolean;
}

/** 企业信息展示块（字段来自 config/entity.ts） */
export function CompanyEntity({ className = '', compact = false }: CompanyEntityProps) {
  const { lang, t } = useI18n();
  const listSep = lang === 'zh' ? '、' : lang === 'ar' ? '، ' : ', ';

  const rows = [
    {
      label: t.page.companyName,
      value: companyEntity.legalName[lang] || companyEntity.legalName.en,
    },
    {
      label: t.page.industry,
      value: companyEntity.industry[lang] || companyEntity.industry.en,
    },
    {
      label: t.page.positioning,
      value: companyEntity.positioning[lang] || companyEntity.positioning.en,
    },
    {
      label: t.page.location,
      value: [
        companyEntity.location.line1[lang] || companyEntity.location.line1.en,
        companyEntity.location.line2[lang] || companyEntity.location.line2.en,
        companyEntity.location.postalCode,
      ].join(', '),
    },
    {
      label: t.page.products,
      value: companyEntity.products.map((p) => p[lang] || p.en).join(listSep),
    },
    {
      label: t.page.customers,
      value: companyEntity.customers[lang] || companyEntity.customers.en,
    },
  ];

  return (
    <section
      className={`border border-border bg-bg-soft ${compact ? 'p-5' : 'p-6 sm:p-8'} ${className}`}
      aria-labelledby="company-profile-heading"
    >
      <h2
        id="company-profile-heading"
        className="text-lg font-semibold tracking-wide text-dark sm:text-xl"
      >
        {t.page.companyProfile}
      </h2>
      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="border-t border-border pt-3">
            <dt className="text-xs font-semibold tracking-[0.14em] text-text-secondary uppercase">
              {row.label}
            </dt>
            <dd className="mt-1 text-sm font-medium text-dark sm:text-base">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
      {!compact ? (
        <div className="mt-6 space-y-4 border-t border-border pt-4">
          <div>
            <h3 className="text-sm font-semibold text-dark">
              {t.page.whatWeFocus}
            </h3>
            <p className="mt-2 text-sm text-text-secondary">
              {companyEntity.problemsSolved[lang] || companyEntity.problemsSolved.en}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-dark">
              {t.page.contactEmail}
            </h3>
            <p className="mt-2 break-all text-sm text-dark">
              {siteConfig.contactEmail}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
