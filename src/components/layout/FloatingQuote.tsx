import { MessageSquare } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import {
  contactInquiryPath,
  pageHasInquiryForm,
} from '@/config/site';
import { LocaleLink } from '@/i18n/navigation';
import { useI18n } from '@/i18n/I18nContext';
import { stripLangFromPath } from '@/i18n/paths';

export function FloatingQuote() {
  const { t } = useI18n();
  const location = useLocation();
  const pagePath = stripLangFromPath(location.pathname);

  if (pagePath === '/contact') return null;

  const to = pageHasInquiryForm(pagePath) ? '#inquiry' : contactInquiryPath;
  const className =
    'fixed right-4 bottom-5 z-40 inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-3 text-sm font-semibold tracking-wide text-white shadow-lg hover:bg-primary-hover sm:right-6';

  if (to === '#inquiry') {
    return (
      <a href="#inquiry" className={className}>
        <MessageSquare className="h-4 w-4" aria-hidden />
        {t.floating.quote}
      </a>
    );
  }

  return (
    <LocaleLink to={to} className={className}>
      <MessageSquare className="h-4 w-4" aria-hidden />
      {t.floating.quote}
    </LocaleLink>
  );
}
