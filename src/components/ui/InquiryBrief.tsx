import { useMemo, useState } from 'react';
import type { Product } from '@/data/products';
import { ContactActions } from '@/components/ui/ContactActions';
import { useI18n } from '@/i18n/I18nContext';

interface InquiryBriefProps {
  product: Product;
  quoteOnly: boolean;
  className?: string;
}

const empty = {
  material: '',
  aggregate: '',
  output: '',
  distanceH: '',
  distanceV: '',
  power: '',
  country: '',
  roleTiming: '',
  contact: '',
  partName: '',
  size: '',
  quantity: '',
  dn: '',
  length: '',
};

export function InquiryBrief({ product, quoteOnly, className = '' }: InquiryBriefProps) {
  const { t, tx } = useI18n();
  const [fields, setFields] = useState(empty);
  const wear = product.partKind === 'wear';
  const spare = product.category === 'spare-parts';
  const name = tx(product.name);

  const set = (key: keyof typeof empty) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const message = useMemo(() => {
    const lines = [`${name}`];
    if (wear) {
      lines.push(t.detail.spareWearInquiryBody);
      if (fields.partName) lines.push(`${t.inquiry.partName}: ${fields.partName}`);
      if (fields.size) lines.push(`${t.inquiry.outerDiameter}: ${fields.size}`);
      if (fields.quantity) lines.push(`${t.inquiry.quantity}: ${fields.quantity}`);
    } else if (spare) {
      lines.push(t.detail.spareInquiryBody);
      if (fields.dn) lines.push(`${t.inquiry.dn}: ${fields.dn}`);
      if (fields.length) lines.push(`${t.inquiry.length}: ${fields.length}`);
      if (fields.quantity) lines.push(`${t.inquiry.quantity}: ${fields.quantity}`);
    } else {
      lines.push(t.detail.inquiryBody);
      if (fields.material) lines.push(`${t.inquiry.material}: ${fields.material}`);
      if (fields.aggregate) lines.push(`${t.inquiry.aggregateSize}: ${fields.aggregate}`);
      if (fields.output) lines.push(`${t.inquiry.targetOutput}: ${fields.output}`);
      if (fields.distanceH) lines.push(`${t.inquiry.distanceH}: ${fields.distanceH}`);
      if (fields.distanceV) lines.push(`${t.inquiry.distanceV}: ${fields.distanceV}`);
      if (fields.power) lines.push(`${t.inquiry.powerCondition}: ${fields.power}`);
      if (fields.country) lines.push(`${t.inquiry.country}: ${fields.country}`);
      if (fields.roleTiming) lines.push(`${t.inquiry.roleTiming}: ${fields.roleTiming}`);
    }
    if (fields.contact) lines.push(`${t.inquiry.contactChannel}: ${fields.contact}`);
    return lines.filter(Boolean).join('\n');
  }, [fields, name, spare, t, wear]);

  const fieldClass =
    'w-full border border-border bg-bg px-3 py-2 text-sm text-dark outline-none focus:border-primary';

  return (
    <div className={className}>
      <h2 className="heading-display text-2xl sm:text-3xl">{t.detail.inquiryBrief}</h2>
      <p className="mt-3 text-sm text-text-secondary">{t.inquiry.formLead}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {wear ? (
          <>
            <label className="text-sm text-text-secondary">
              {t.inquiry.partName}
              <input className={`mt-1 ${fieldClass}`} value={fields.partName} onChange={set('partName')} />
            </label>
            <label className="text-sm text-text-secondary">
              {t.inquiry.outerDiameter}
              <input className={`mt-1 ${fieldClass}`} value={fields.size} onChange={set('size')} />
            </label>
            <label className="text-sm text-text-secondary">
              {t.inquiry.quantity}
              <input className={`mt-1 ${fieldClass}`} value={fields.quantity} onChange={set('quantity')} />
            </label>
          </>
        ) : spare ? (
          <>
            <label className="text-sm text-text-secondary">
              {t.inquiry.dn}
              <input className={`mt-1 ${fieldClass}`} value={fields.dn} onChange={set('dn')} />
            </label>
            <label className="text-sm text-text-secondary">
              {t.inquiry.length}
              <input className={`mt-1 ${fieldClass}`} value={fields.length} onChange={set('length')} />
            </label>
            <label className="text-sm text-text-secondary">
              {t.inquiry.quantity}
              <input className={`mt-1 ${fieldClass}`} value={fields.quantity} onChange={set('quantity')} />
            </label>
          </>
        ) : (
          <>
            <label className="text-sm text-text-secondary">
              {t.inquiry.material}
              <input className={`mt-1 ${fieldClass}`} value={fields.material} onChange={set('material')} />
            </label>
            <label className="text-sm text-text-secondary">
              {t.inquiry.aggregateSize}
              <input className={`mt-1 ${fieldClass}`} value={fields.aggregate} onChange={set('aggregate')} />
            </label>
            <label className="text-sm text-text-secondary">
              {t.inquiry.targetOutput}
              <input className={`mt-1 ${fieldClass}`} value={fields.output} onChange={set('output')} />
            </label>
            <label className="text-sm text-text-secondary">
              {t.inquiry.distanceH}
              <input className={`mt-1 ${fieldClass}`} value={fields.distanceH} onChange={set('distanceH')} />
            </label>
            <label className="text-sm text-text-secondary">
              {t.inquiry.distanceV}
              <input className={`mt-1 ${fieldClass}`} value={fields.distanceV} onChange={set('distanceV')} />
            </label>
            <label className="text-sm text-text-secondary">
              {t.inquiry.powerCondition}
              <input className={`mt-1 ${fieldClass}`} value={fields.power} onChange={set('power')} />
            </label>
            <label className="text-sm text-text-secondary">
              {t.inquiry.country}
              <input className={`mt-1 ${fieldClass}`} value={fields.country} onChange={set('country')} />
            </label>
            <label className="text-sm text-text-secondary">
              {t.inquiry.roleTiming}
              <input className={`mt-1 ${fieldClass}`} value={fields.roleTiming} onChange={set('roleTiming')} />
            </label>
          </>
        )}
        <label className="text-sm text-text-secondary sm:col-span-2">
          {t.inquiry.contactChannel}
          <input className={`mt-1 ${fieldClass}`} value={fields.contact} onChange={set('contact')} />
        </label>
      </div>
      <div className="mt-6">
        <ContactActions
          subject={`${t.mailSubjectInquiry} - ${name}`}
          message={message}
          showCustom={!quoteOnly}
        />
      </div>
    </div>
  );
}
