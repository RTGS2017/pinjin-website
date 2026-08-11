import { Link } from 'react-router-dom';
import { applicationItems } from '@/config/site';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n/I18nContext';

export function Applications() {
  const { lang, t } = useI18n();

  return (
    <section id="applications" className="section-y bg-bg scroll-mt-24">
      <div className="container-site">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            title={t.applications.title}
            subtitle={t.applications.subtitle}
          />
          <Button to="/applications" variant="outline" className="shrink-0">
            {lang === 'zh' ? '查看应用详解' : 'View application guides'}
          </Button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {applicationItems.map((app) => (
            <Link
              key={app.id}
              to="/applications"
              className="group overflow-hidden border border-border"
            >
              <ImagePlaceholder
                src={app.image}
                alt={`${t.applications[app.key]} application - Hebei Pinjin Machinery`}
                label={t.placeholder.application}
                hint={t.placeholder.applicationHint}
                width={1600}
                height={1200}
                className="aspect-[4/3] w-full"
                imgClassName="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="bg-bg p-5">
                <h3 className="text-sm font-semibold tracking-[0.12em] text-dark">
                  {t.applications[app.key]}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
