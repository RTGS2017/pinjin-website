import { Link } from 'react-router-dom';
import { getMailtoHref, getTelHref, siteConfig } from '@/config/site';
import { useI18n } from '@/i18n/I18nContext';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-dark text-white">
      <div className="container-site section-y">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="text-xl font-semibold tracking-[0.14em]">
              {siteConfig.brandName}
            </p>
            <p className="mt-4 max-w-xs text-sm text-white/65">{t.footer.tagline}</p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-white/45 uppercase">
              {t.footer.products}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <Link
                  to="/products/category/concrete-pumps"
                  className="hover:text-primary transition-colors"
                >
                  {t.footer.concrete}
                </Link>
              </li>
              <li>
                <Link
                  to="/products/category/spraying-machines"
                  className="hover:text-primary transition-colors"
                >
                  {t.footer.spraying}
                </Link>
              </li>
              <li>
                <Link
                  to="/products/category/material-handling"
                  className="hover:text-primary transition-colors"
                >
                  {t.footer.material}
                </Link>
              </li>
              <li>
                <Link
                  to="/products/category/rebar-equipment"
                  className="hover:text-primary transition-colors"
                >
                  {t.footer.rebar}
                </Link>
              </li>
              <li>
                <Link
                  to="/product-selection-guide"
                  className="hover:text-primary transition-colors"
                >
                  {t.footer.selectionGuide}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-white/45 uppercase">
              {t.footer.company}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  {t.footer.about}
                </Link>
              </li>
              <li>
                <Link
                  to="/applications"
                  className="hover:text-primary transition-colors"
                >
                  {t.footer.applications}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors">
                  {t.footer.faq}
                </Link>
              </li>
              <li>
                <a href="/#why-pinjin" className="hover:text-primary transition-colors">
                  {t.footer.why}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-white/45 uppercase">
              {t.footer.contact}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <a
                  href={getMailtoHref()}
                  className="hover:text-primary transition-colors break-all"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
              <li>
                <a
                  href={getTelHref()}
                  className="hover:text-primary transition-colors"
                >
                  {siteConfig.contactPhone}
                </a>
              </li>
              <li className="text-white/65">
                {t.contact.location1}
                <br />
                {t.contact.location2}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/45">
          © 2026 {t.companyName}. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
