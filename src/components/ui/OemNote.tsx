import { useI18n } from '@/i18n/I18nContext';

interface OemNoteProps {
  /** 列表卡片用一行；产品展示/详情用完整三条 */
  compact?: boolean;
  className?: string;
}

export function OemNote({ compact = false, className = '' }: OemNoteProps) {
  const { t } = useI18n();

  if (compact) {
    return (
      <p className={`text-sm text-text-secondary ${className}`}>
        <span className="font-semibold text-primary">{t.customization.oem}</span>
        {' · '}
        {t.customization.factoryDirect}
      </p>
    );
  }

  return (
    <div className={`space-y-2 text-sm leading-relaxed text-text-secondary ${className}`}>
      <p className="font-semibold tracking-wide text-primary">{t.customization.oem}</p>
      <p>{t.customization.body}</p>
      <p>{t.customization.note}</p>
      <p className="font-medium text-dark">{t.customization.factoryDirect}</p>
    </div>
  );
}
