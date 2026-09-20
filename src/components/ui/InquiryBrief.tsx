import { useMemo, useState } from 'react';
import type { Product } from '@/data/products';
import { ContactActions } from '@/components/ui/ContactActions';
import { useI18n } from '@/i18n/I18nContext';

interface InquiryBriefProps {
  product?: Product;
  className?: string;
}

const empty = {
  name: '',
  contact: '',
  company: '',
  product: '',
  message: '',
  material: '',
  aggregate: '',
  output: '',
  distanceH: '',
  distanceV: '',
  power: '',
  country: '',
  roleTiming: '',
  partName: '',
  size: '',
  quantity: '',
  dn: '',
  length: '',
};

export function InquiryBrief({ product, className = '' }: InquiryBriefProps) {
  const { t, tx } = useI18n();
  const [fields, setFields] = useState(empty);
  const wear = product?.partKind === 'wear';
  const spare = product?.category === 'spare-parts';
  const productName = product ? tx(product.name) : fields.product;
  const contactLabel = `${t.contact.whatsapp} / ${t.inquiry.email}`;

  const set =
    (key: keyof typeof empty) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const message = useMemo(() => {
    const lines = [productName || t.inquiry.product];
    if (fields.name) lines.push(`${t.inquiry.name}: ${fields.name}`);
    if (fields.company) lines.push(`${t.inquiry.company}: ${fields.company}`);
    if (fields.contact) lines.push(`${contactLabel}: ${fields.contact}`);
    if (product) {
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
    }
    if (fields.message) lines.push(`${t.inquiry.message}: ${fields.message}`);
    return lines.filter(Boolean).join('\n');
  }, [contactLabel, fields, product, productName, spare, t, wear]);

  const fieldClass =
    'mt-1 w-full border border-border bg-bg px-3 py-2 text-sm text-dark outline-none focus:border-primary';
  const showOptional = Boolean(product);

  return (
    <div className={className}>
      <h2 className="heading-display text-2xl sm:text-3xl">{t.detail.inquiryTitle}</h2>
      <p className="mt-3 text-sm text-text-secondary">{t.inquiry.formLead}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <label className="text-sm text-text-secondary">
          {t.inquiry.name}
          <input className={fieldClass} value={fields.name} onChange={set('name')} autoComplete="name" />
        </label>
        <label className="text-sm text-text-secondary">
          {contactLabel}
          <input
            className={fieldClass}
            value={fields.contact}
            onChange={set('contact')}
            autoComplete="email"
          />
        </label>
        <label className="text-sm text-text-secondary">
          {t.inquiry.company}
          <input
            className={fieldClass}
            value={fields.company}
            onChange={set('company')}
            autoComplete="organization"
          />
        </label>
        <label className="text-sm text-text-secondary">
          {t.inquiry.product}
          {product ? (
            <input className={fieldClass} value={productName} readOnly />
          ) : (
            <input className={fieldClass} value={fields.product} onChange={set('product')} />
          )}
        </label>
        <label className="text-sm text-text-secondary sm:col-span-2">
          {t.inquiry.message}
          <textarea
            className={`${fieldClass} min-h-24 resize-y`}
            value={fields.message}
            onChange={set('message')}
            rows={4}
          />
        </label>
      </div>

      {showOptional ? (
        <details className="mt-5 border border-border bg-bg-soft p-4">
          <summary className="cursor-pointer text-sm font-semibold text-dark">
            {t.detail.inquiryBrief}
          </summary>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {wear ? (
              <>
                <label className="text-sm text-text-secondary">
                  {t.inquiry.partName}
                  <input className={fieldClass} value={fields.partName} onChange={set('partName')} />
                </label>
                <label className="text-sm text-text-secondary">
                  {t.inquiry.outerDiameter}
                  <input className={fieldClass} value={fields.size} onChange={set('size')} />
                </label>
                <label className="text-sm text-text-secondary">
                  {t.inquiry.quantity}
                  <input className={fieldClass} value={fields.quantity} onChange={set('quantity')} />
                </label>
              </>
            ) : spare ? (
              <>
                <label className="text-sm text-text-secondary">
                  {t.inquiry.dn}
                  <input className={fieldClass} value={fields.dn} onChange={set('dn')} />
                </label>
                <label className="text-sm text-text-secondary">
                  {t.inquiry.length}
                  <input className={fieldClass} value={fields.length} onChange={set('length')} />
                </label>
                <label className="text-sm text-text-secondary">
                  {t.inquiry.quantity}
                  <input className={fieldClass} value={fields.quantity} onChange={set('quantity')} />
                </label>
              </>
            ) : (
              <>
                <label className="text-sm text-text-secondary">
                  {t.inquiry.material}
                  <input className={fieldClass} value={fields.material} onChange={set('material')} />
                </label>
                <label className="text-sm text-text-secondary">
                  {t.inquiry.aggregateSize}
                  <input className={fieldClass} value={fields.aggregate} onChange={set('aggregate')} />
                </label>
                <label className="text-sm text-text-secondary">
                  {t.inquiry.targetOutput}
                  <input className={fieldClass} value={fields.output} onChange={set('output')} />
                </label>
                <label className="text-sm text-text-secondary">
                  {t.inquiry.distanceH}
                  <input className={fieldClass} value={fields.distanceH} onChange={set('distanceH')} />
                </label>
                <label className="text-sm text-text-secondary">
                  {t.inquiry.distanceV}
                  <input className={fieldClass} value={fields.distanceV} onChange={set('distanceV')} />
                </label>
                <label className="text-sm text-text-secondary">
                  {t.inquiry.powerCondition}
                  <input className={fieldClass} value={fields.power} onChange={set('power')} />
                </label>
                <label className="text-sm text-text-secondary">
                  {t.inquiry.country}
                  <input className={fieldClass} value={fields.country} onChange={set('country')} />
                </label>
                <label className="text-sm text-text-secondary">
                  {t.inquiry.roleTiming}
                  <input className={fieldClass} value={fields.roleTiming} onChange={set('roleTiming')} />
                </label>
              </>
            )}
          </div>
        </details>
      ) : null}

      <div className="mt-6">
        <ContactActions
          subject={`${t.mailSubjectInquiry}${productName ? ` - ${productName}` : ''}`}
          message={message}
          showCustom={false}
        />
      </div>
    </div>
  );
}
