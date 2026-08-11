import { Contact } from '@/components/sections/Contact';
import { CTA } from '@/components/sections/CTA';
import { SEO } from '@/components/SEO';
import { useI18n } from '@/i18n/I18nContext';

export function ContactPage() {
  const { t } = useI18n();

  return (
    <>
      <SEO
        title={t.seo.contactTitle}
        description={t.contact.sendBody}
        path="/contact"
      />
      <Contact />
      <CTA />
    </>
  );
}
