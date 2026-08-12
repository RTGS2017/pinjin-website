import { companyEntity } from '@/config/entity';
import { siteConfig } from '@/config/site';
import { useI18n } from '@/i18n/I18nContext';

interface CompanyEntityProps {
  className?: string;
  compact?: boolean;
}

/** 企业信息展示块（字段来自 config/entity.ts） */
export function CompanyEntity({ className = '', compact = false }: CompanyEntityProps) {
  const { lang } = useI18n();

  const rows = [
    {
      label: lang === 'zh' ? '公司名称' : 'Company Name',
      value: companyEntity.legalName[lang],
    },
    {
      label: lang === 'zh' ? '所属行业' : 'Industry',
      value: companyEntity.industry[lang],
    },
    {
      label: lang === 'zh' ? '企业定位' : 'Positioning',
      value: companyEntity.positioning[lang],
    },
    {
      label: lang === 'zh' ? '所在地' : 'Location',
      value: `${companyEntity.location.line1[lang]}, ${companyEntity.location.line2[lang]}`,
    },
    {
      label: lang === 'zh' ? '主要产品' : 'Products',
      value: companyEntity.products.map((p) => p[lang]).join(lang === 'zh' ? '、' : ', '),
    },
    {
      label: lang === 'zh' ? '服务对象' : 'Customers',
      value: companyEntity.customers[lang],
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
        {lang === 'zh' ? '公司信息' : 'Company Profile'}
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
              {lang === 'zh' ? '我们专注解决的需求' : 'What We Focus On'}
            </h3>
            <p className="mt-2 text-sm text-text-secondary">
              {companyEntity.problemsSolved[lang]}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-dark">
              {lang === 'zh' ? '联系邮箱' : 'Contact Email'}
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
