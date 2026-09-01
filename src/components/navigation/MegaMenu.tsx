import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  Cog,
  Factory,
  FileText,
  Fuel,
  HelpCircle,
  Layers,
  ListChecks,
  Mail,
  Newspaper,
  Zap,
} from 'lucide-react';
import {
  companyLinks,
  megaFeaturedSlugs,
  productCategoryLinks,
  resourcesDownloadLinks,
  resourcesTechnicalLinks,
  solutionsIndustryLinks,
  solutionsOemLinks,
  type NavLabelKey,
} from '@/config/navigation';
import { contactInquiryPath, getMailtoHref } from '@/config/site';
import { applicationPages } from '@/data/applicationsContent';
import { categoryMeta, getFeaturedProducts, productImageAlt } from '@/data/products';
import { Button } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { MegaMenuLink } from '@/components/navigation/MegaMenuLink';
import { useI18n } from '@/i18n/I18nContext';
import type { Messages } from '@/i18n/messages';
import type { ProductCategory } from '@/data/products';

interface MegaMenuProps {
  navKey: NavLabelKey;
  onNavigate: () => void;
}

const categoryIcons: Record<ProductCategory, LucideIcon> = {
  'electric-concrete-pump': Zap,
  'diesel-concrete-pump': Fuel,
  'mixer-pump': Layers,
};

const technicalIcons: Record<(typeof resourcesTechnicalLinks)[number]['megaKey'], LucideIcon> = {
  blog: Newspaper,
  guides: ClipboardList,
  faq: HelpCircle,
};

const downloadIcons: Record<(typeof resourcesDownloadLinks)[number]['megaKey'], LucideIcon> = {
  catalog: FileText,
  datasheets: ClipboardList,
};

const companyIcons: Record<(typeof companyLinks)[number]['megaKey'], LucideIcon> = {
  factoryOverview: Factory,
  capability: Cog,
  quality: BadgeCheck,
  contact: Mail,
};

function Panel({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      role="region"
      aria-label={label}
      className="mega-panel w-full border-t border-white/10 bg-dark/40 shadow-[0_18px_50px_rgba(37,42,49,0.28)] backdrop-blur-sm"
    >
      <div className="container-site py-8 lg:py-10">{children}</div>
    </div>
  );
}

function ColumnHeading({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold tracking-[0.16em] text-white/50 uppercase">
      {children}
    </p>
  );
}

function ItemLink({
  to,
  title,
  hint,
  icon: Icon,
  onNavigate,
}: {
  to: string;
  title: string;
  hint?: string;
  icon?: LucideIcon;
  onNavigate: () => void;
}) {
  return (
    <MegaMenuLink
      to={to}
      onClick={onNavigate}
      className="group flex gap-3 rounded-md border border-transparent px-3 py-2.5 transition-colors hover:border-white/15 hover:bg-white/10"
    >
      {Icon ? (
        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/10 text-white group-hover:bg-white/15 group-hover:text-primary">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
      ) : null}
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-white group-hover:text-primary">
          {title}
        </span>
        {hint ? (
          <span className="mt-0.5 block line-clamp-2 text-xs leading-relaxed text-white/55">
            {hint}
          </span>
        ) : null}
      </span>
    </MegaMenuLink>
  );
}

function ProductsMega({ onNavigate }: { onNavigate: () => void }) {
  const { lang, t, tx } = useI18n();
  const featured = getFeaturedProducts(megaFeaturedSlugs);

  return (
    <div className="grid min-h-[420px] max-h-[500px] gap-8 overflow-y-auto lg:grid-cols-12">
      <div className="lg:col-span-4">
        <ColumnHeading>{t.nav.products}</ColumnHeading>
        <div className="space-y-1">
          {productCategoryLinks.map((item) => {
            const meta = categoryMeta[item.categoryId];
            const Icon = categoryIcons[item.categoryId];
            return (
              <ItemLink
                key={item.href}
                to={item.href}
                icon={Icon}
                title={tx(meta.label)}
                hint={tx(meta.description)}
                onNavigate={onNavigate}
              />
            );
          })}
          <ItemLink
            to="/product-selection-guide"
            icon={ListChecks}
            title={t.nav.selectionGuide}
            hint={t.selectionGuide.subtitle}
            onNavigate={onNavigate}
          />
        </div>
        <MegaMenuLink
          to="/products"
          onClick={onNavigate}
          className="mt-4 inline-flex items-center gap-1 px-3 text-sm font-semibold text-white/90 hover:text-primary"
        >
          {t.mega.allProducts}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </MegaMenuLink>
      </div>

      <div className="lg:col-span-5">
        <ColumnHeading>{t.mega.featured}</ColumnHeading>
        <div className="grid gap-3 sm:grid-cols-2">
          {featured.map((product) => (
            <MegaMenuLink
              key={product.slug}
              to={`/products/${product.slug}`}
              onClick={onNavigate}
              className="group flex flex-col overflow-hidden rounded-md border border-white/15 bg-white/5 transition-colors hover:border-primary/40"
            >
              <ImagePlaceholder
                src={product.image}
                alt={productImageAlt(product, product.image, lang)}
                label={t.productCard.imageComingSoon}
                hint=""
                width={600}
                height={400}
                className="w-full bg-transparent"
                imgClassName="h-auto w-full object-contain"
              />
              <span className="flex flex-1 flex-col p-3">
                <span className="text-sm font-semibold text-white group-hover:text-primary">
                  {tx(product.name)}
                </span>
                <span className="mt-1 line-clamp-2 text-xs text-white/55">
                  {tx(product.shortDescription)}
                </span>
                <span className="mt-2 text-xs font-semibold text-white/80">
                  {t.mega.viewProduct}
                </span>
              </span>
            </MegaMenuLink>
          ))}
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="flex h-full flex-col justify-between rounded-md border border-white/15 bg-white/5 p-6">
          <div>
            <h3 className="text-lg font-semibold text-white">{t.mega.needCustom}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              {t.mega.engineerBody}
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Button to={contactInquiryPath} size="md" className="w-full" onClick={onNavigate}>
                {t.nav.getQuote}
              </Button>
              <Button
                href={getMailtoHref(t.mailSubjectInquiry)}
                variant="ghost"
                size="md"
                className="w-full"
                onClick={onNavigate}
              >
                {t.detail.contactEngineer}
              </Button>
            </div>
          </div>
          <MegaMenuLink
            to={contactInquiryPath}
            onClick={onNavigate}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-primary"
          >
            <FileText className="h-4 w-4" aria-hidden />
            {t.detail.requestCatalog}
          </MegaMenuLink>
          <p className="mt-2 text-xs text-white/50">{t.mega.catalogHint}</p>
        </div>
      </div>
    </div>
  );
}

function ColumnsMega({
  leftTitle,
  left,
  rightTitle,
  right,
}: {
  leftTitle: string;
  left: ReactNode;
  rightTitle: string;
  right: ReactNode;
}) {
  return (
    <div className="grid min-h-[280px] gap-10 md:grid-cols-2">
      <div>
        <ColumnHeading>{leftTitle}</ColumnHeading>
        <div className="space-y-1">{left}</div>
      </div>
      <div>
        <ColumnHeading>{rightTitle}</ColumnHeading>
        <div className="space-y-1">{right}</div>
      </div>
    </div>
  );
}

function technicalLabel(t: Messages, key: (typeof resourcesTechnicalLinks)[number]['megaKey']) {
  if (key === 'guides') return t.mega.guides;
  return t.nav[key];
}

export function MegaMenu({ navKey, onNavigate }: MegaMenuProps) {
  const { t, tx } = useI18n();
  const label = t.nav[navKey];

  if (navKey === 'products') {
    return (
      <Panel id="mega-products" label={label}>
        <ProductsMega onNavigate={onNavigate} />
      </Panel>
    );
  }

  if (navKey === 'solutions') {
    return (
      <Panel id="mega-solutions" label={label}>
        <ColumnsMega
          leftTitle={t.mega.industryGroup}
          rightTitle={t.mega.oemGroup}
          left={
            <>
              {solutionsIndustryLinks.map((item) => {
                const app = applicationPages.find((page) => page.id === item.appId);
                if (!app) return null;
                return (
                  <ItemLink
                    key={item.href}
                    to={item.href}
                    title={tx(app.title)}
                    hint={tx(app.summary)}
                    onNavigate={onNavigate}
                  />
                );
              })}
              <MegaMenuLink
                to="/solutions"
                onClick={onNavigate}
                className="mt-2 inline-flex items-center gap-1 px-3 text-sm font-semibold text-white/90 hover:text-primary"
              >
                {t.mega.viewAllApps}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </MegaMenuLink>
            </>
          }
          right={
            <>
              {solutionsOemLinks.map((item) => (
                <ItemLink
                  key={item.href}
                  to={item.href}
                  title={t.mega[item.megaKey]}
                  onNavigate={onNavigate}
                />
              ))}
            </>
          }
        />
      </Panel>
    );
  }

  if (navKey === 'resources') {
    return (
      <Panel id="mega-resources" label={label}>
        <ColumnsMega
          leftTitle={t.mega.technicalGroup}
          rightTitle={t.mega.downloadsGroup}
          left={
            <>
              {resourcesTechnicalLinks.map((item) => (
                <ItemLink
                  key={item.href}
                  to={item.href}
                  icon={technicalIcons[item.megaKey]}
                  title={technicalLabel(t, item.megaKey)}
                  onNavigate={onNavigate}
                />
              ))}
              <MegaMenuLink
                to="/resources"
                onClick={onNavigate}
                className="mt-2 inline-flex items-center gap-1 px-3 text-sm font-semibold text-white/90 hover:text-primary"
              >
                {t.nav.resources}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </MegaMenuLink>
            </>
          }
          right={
            <>
              {resourcesDownloadLinks.map((item) => (
                <ItemLink
                  key={item.href}
                  to={item.href}
                  icon={downloadIcons[item.megaKey]}
                  title={t.mega[item.megaKey]}
                  hint={item.megaKey === 'catalog' ? t.mega.catalogHint : t.mega.datasheetsHint}
                  onNavigate={onNavigate}
                />
              ))}
            </>
          }
        />
      </Panel>
    );
  }

  if (navKey === 'company') {
    return (
      <Panel id="mega-company" label={label}>
        <div className="max-w-3xl">
          <ColumnHeading>{t.mega.aboutGroup}</ColumnHeading>
          <div className="grid gap-1 sm:grid-cols-2">
            {companyLinks.map((item) => (
              <ItemLink
                key={item.href}
                to={item.href}
                icon={companyIcons[item.megaKey]}
                title={t.mega[item.megaKey]}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </Panel>
    );
  }

  return null;
}

export function MobileMegaLinks({
  navKey,
  onNavigate,
}: {
  navKey: NavLabelKey;
  onNavigate: () => void;
}) {
  const { t, tx } = useI18n();
  const linkClass = 'block px-3 py-2 text-sm text-white/80 hover:text-primary';

  if (navKey === 'products') {
    return (
      <div className="space-y-1">
        {productCategoryLinks.map((item) => (
          <MegaMenuLink
            key={item.href}
            to={item.href}
            className={linkClass}
            onClick={onNavigate}
          >
            {tx(categoryMeta[item.categoryId].label)}
          </MegaMenuLink>
        ))}
        <MegaMenuLink to="/product-selection-guide" className={linkClass} onClick={onNavigate}>
          {t.nav.selectionGuide}
        </MegaMenuLink>
        <MegaMenuLink to="/products" className={linkClass} onClick={onNavigate}>
          {t.nav.allProducts}
        </MegaMenuLink>
        <MegaMenuLink to={contactInquiryPath} className={linkClass} onClick={onNavigate}>
          {t.nav.getQuote}
        </MegaMenuLink>
      </div>
    );
  }

  if (navKey === 'solutions') {
    return (
      <div className="space-y-1">
        {solutionsIndustryLinks.map((item) => {
          const app = applicationPages.find((page) => page.id === item.appId);
          if (!app) return null;
          return (
            <MegaMenuLink key={item.href} to={item.href} className={linkClass} onClick={onNavigate}>
              {tx(app.title)}
            </MegaMenuLink>
          );
        })}
        {solutionsOemLinks.map((item) => (
          <MegaMenuLink key={item.href} to={item.href} className={linkClass} onClick={onNavigate}>
            {t.mega[item.megaKey]}
          </MegaMenuLink>
        ))}
      </div>
    );
  }

  if (navKey === 'resources') {
    return (
      <div className="space-y-1">
        {resourcesTechnicalLinks.map((item) => (
          <MegaMenuLink key={item.href} to={item.href} className={linkClass} onClick={onNavigate}>
            {technicalLabel(t, item.megaKey)}
          </MegaMenuLink>
        ))}
        {resourcesDownloadLinks.map((item) => (
          <MegaMenuLink key={item.href} to={item.href} className={linkClass} onClick={onNavigate}>
            {t.mega[item.megaKey]}
          </MegaMenuLink>
        ))}
        <MegaMenuLink to="/resources" className={linkClass} onClick={onNavigate}>
          {t.nav.resources}
        </MegaMenuLink>
      </div>
    );
  }

  if (navKey === 'company') {
    return (
      <div className="space-y-1">
        {companyLinks.map((item) => (
          <MegaMenuLink key={item.href} to={item.href} className={linkClass} onClick={onNavigate}>
            {t.mega[item.megaKey]}
          </MegaMenuLink>
        ))}
      </div>
    );
  }

  return null;
}
