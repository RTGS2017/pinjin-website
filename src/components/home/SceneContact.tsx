import { Mail, MapPin, Phone } from 'lucide-react';
import { InquiryBrief } from '@/components/ui/InquiryBrief';
import { getMailtoHref, getTelHref, siteConfig } from '@/config/site';
import { useI18n } from '@/i18n/I18nContext';
import { SceneFrame } from './homeScroll';

export function SceneContact() {
  const { t } = useI18n();

  return (
    <SceneFrame sceneKey="contact" tone="soft">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {t.nav.getQuote}
      </p>
      <h2 className="mt-3 heading-display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        {t.cta.title}
      </h2>
      <p className="mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
        {t.cta.subtitle}
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-4">
          <div className="flex gap-4 border border-border bg-white p-5">
            <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-text-secondary uppercase">
                {t.contact.email}
              </p>
              <a
                href={getMailtoHref()}
                className="mt-2 block break-all text-base font-semibold text-dark hover:text-primary"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          </div>
          <div className="flex gap-4 border border-border bg-white p-5">
            <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-text-secondary uppercase">
                {t.contact.phone}
              </p>
              <a
                href={getTelHref()}
                className="mt-2 block text-base font-semibold text-dark hover:text-primary"
              >
                {siteConfig.contactPhone}
              </a>
            </div>
          </div>
          <div className="flex gap-4 border border-border bg-white p-5">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-text-secondary uppercase">
                {t.contact.address}
              </p>
              <p className="mt-2 text-base font-semibold text-dark">{t.contact.location1}</p>
              <p className="text-sm text-text-secondary">{t.contact.location2}</p>
            </div>
          </div>
        </div>

        <div className="border border-border bg-white p-6 sm:p-8 lg:col-span-8">
          <InquiryBrief showTitle={false} showJobFields />
        </div>
      </div>
    </SceneFrame>
  );
}
