import { Factory, Headphones, Settings2, ShieldCheck } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useI18n } from '@/i18n/I18nContext';

export function WhyPinjin() {
  const { t } = useI18n();
  const items = [
    { icon: Factory, title: t.homeWhy.c1t, description: t.homeWhy.c1d },
    { icon: Settings2, title: t.homeWhy.c2t, description: t.homeWhy.c2d },
    { icon: Headphones, title: t.homeWhy.c3t, description: t.homeWhy.c3d },
    { icon: ShieldCheck, title: t.homeWhy.c4t, description: t.homeWhy.c4d },
  ];

  return (
    <section id="why-pinjin" className="section-y bg-bg scroll-mt-24">
      <div className="container-site">
        <SectionTitle title={t.homeWhy.title} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="glass-card p-7 sm:p-8">
              <item.icon className="h-7 w-7 text-primary" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-dark">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
