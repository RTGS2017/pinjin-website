import { LocaleLink } from '@/i18n/navigation';
import { SEO, buildBreadcrumbJsonLd } from '@/components/SEO';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ContactActions } from '@/components/ui/ContactActions';
import { useI18n } from '@/i18n/I18nContext';
import { localePath } from '@/i18n/paths';

export function ResourcesPage() {
  const { lang, t } = useI18n();

  return (
    <section className='section-y bg-bg'>
      <SEO
        title={t.seo.resourcesTitle}
        description={t.seo.resourcesDesc}
        path='/resources'
        jsonLd={buildBreadcrumbJsonLd([
          { name: t.detail.home, path: localePath('/', lang) },
          { name: t.nav.resources, path: localePath('/resources', lang) },
        ])}
      />
      <div className='container-site'>
        <SectionTitle title={t.nav.resources} subtitle={t.seo.resourcesDesc} />

        <div className='mt-10 grid gap-6 md:grid-cols-2'>
          <article className='border border-border p-6'>
            <h2 className='text-lg font-semibold text-dark'>
              {t.selectionGuide.title}
            </h2>
            <p className='mt-2 text-sm text-text-secondary'>
              {t.selectionGuide.subtitle}
            </p>
            <p className='mt-4 text-sm'>
              <LocaleLink
                to='/product-selection-guide'
                className='font-semibold hover:text-primary'
              >
                {t.page.openSelectionGuide}
              </LocaleLink>
            </p>
          </article>
          <article id='downloads' className='border border-border p-6'>
            <h2 className='text-lg font-semibold text-dark'>
              {t.page.downloads}
            </h2>
            <p className='mt-2 text-sm text-text-secondary'>
              {t.page.downloadsHint}
            </p>
          </article>
        </div>

        <div className='mt-12'>
          <ContactActions />
        </div>
      </div>
    </section>
  );
}
