import { MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getWhatsAppHref } from '@/config/site';
import { useI18n } from '@/i18n/I18nContext';
import { stripLangFromPath } from '@/i18n/paths';

export function FloatingQuote() {
  const { t } = useI18n();
  const location = useLocation();
  const pagePath = stripLangFromPath(location.pathname);

  if (pagePath === '/contact') return null;

  return (
    <a
      href={getWhatsAppHref(t.mailSubjectInquiry)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-5 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold tracking-wide text-white shadow-lg hover:bg-primary-hover sm:right-6"
    >
      <MessageCircle className="h-4 w-4" aria-hidden />
      {t.floating.whatsapp}
    </a>
  );
}
