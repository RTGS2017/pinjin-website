import { getMailtoHref, getTelHref, siteConfig } from '@/config/site';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';

export function Contact() {
  const { t } = useI18n();

  return (
    <section id="contact" className="section-y bg-bg scroll-mt-24">
      <div className="container-site">
        <SectionTitle title={t.contact.title} />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex gap-4 border border-border p-6">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-text-secondary uppercase">
                  {t.contact.email}
                </p>
                <a
                  href={getMailtoHref()}
                  className="mt-2 block break-all text-lg font-semibold text-dark hover:text-primary transition-colors"
                >
                  {siteConfig.contactEmail}
                </a>
                <p className="mt-2 text-sm text-text-secondary">
                  {t.contact.emailHint}
                </p>
              </div>
            </div>

            <div className="flex gap-4 border border-border p-6">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-text-secondary uppercase">
                  {t.contact.phone}
                </p>
                <a
                  href={getTelHref()}
                  className="mt-2 block text-lg font-semibold text-dark hover:text-primary transition-colors"
                >
                  {siteConfig.contactPhone}
                </a>
                <p className="mt-2 text-sm text-text-secondary">
                  {t.contact.phoneHint}
                </p>
              </div>
            </div>

            <div className="flex gap-4 border border-border p-6">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-text-secondary uppercase">
                  {t.contact.address}
                </p>
                <p className="mt-2 text-lg font-semibold text-dark">
                  {t.contact.location1}
                </p>
                <p className="text-text-secondary">{t.contact.location2}</p>
              </div>
            </div>
          </div>

          <div className="border border-border bg-bg-soft p-8">
            <h3 className="text-xl font-semibold tracking-wide text-dark">
              {t.contact.sendTitle}
            </h3>
            <p className="mt-3 text-sm text-text-secondary">{t.contact.sendBody}</p>
            <div className="mt-6">
              <InquiryForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
