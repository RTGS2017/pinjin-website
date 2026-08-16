import { getMailtoHref, getWhatsAppHref } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n/I18nContext';

interface ContactActionsProps {
  subject?: string;
  message?: string;
  layout?: 'row' | 'stack';
  size?: 'md' | 'lg';
  showCustom?: boolean;
  tone?: 'light' | 'dark';
  className?: string;
}

export function ContactActions({
  subject,
  message,
  layout = 'row',
  size = 'lg',
  showCustom = false,
  tone = 'light',
  className = '',
}: ContactActionsProps) {
  const { t } = useI18n();
  const mailSubject = subject || t.mailSubjectInquiry;
  const mail = getMailtoHref(mailSubject, message);
  const wa = getWhatsAppHref(message || mailSubject);
  const customMail = getMailtoHref(
    t.mailSubjectCustom,
    message || t.customization.mailPrefill,
  );
  const secondary = tone === 'dark' ? 'ghost' : 'outline';

  return (
    <div
      className={[
        layout === 'stack'
          ? 'flex flex-col gap-3'
          : 'flex flex-col gap-3 sm:flex-row sm:flex-wrap',
        className,
      ].join(' ')}
    >
      <Button
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        size={size}
        className="w-full sm:w-auto"
      >
        {t.contact.whatsapp}
      </Button>
      <Button
        href={mail}
        variant={secondary}
        size={size}
        className="w-full sm:w-auto"
      >
        {t.contact.emailInquiry}
      </Button>
      {showCustom ? (
        <Button
          href={customMail}
          variant={secondary}
          size={size}
          className="w-full sm:w-auto"
        >
          {t.detail.requestCustom}
        </Button>
      ) : null}
    </div>
  );
}
