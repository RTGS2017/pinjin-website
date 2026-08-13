import { useState, type FormEvent } from 'react';
import {
  buildInquiryMailtoBody,
  getMailtoHref,
  siteConfig,
} from '@/config/site';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n/I18nContext';

export interface InquiryFormProps {
  defaultProduct?: string;
  defaultMessage?: string;
  id?: string;
  className?: string;
}

const fieldClass =
  'mt-1 w-full border border-border bg-bg px-3 py-2.5 text-sm text-dark outline-none focus:border-primary';

export function InquiryForm({
  defaultProduct = '',
  defaultMessage = '',
  id = 'inquiry',
  className = '',
}: InquiryFormProps) {
  const { t } = useI18n();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  );
  const [error, setError] = useState('');
  const hasFormspree = Boolean(siteConfig.formspreeEndpoint);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get('company_website') || '').trim()) {
      setStatus('success');
      return;
    }

    const fields = {
      name: String(data.get('name') || '').trim(),
      company: String(data.get('company') || '').trim(),
      country: String(data.get('country') || '').trim(),
      email: String(data.get('email') || '').trim(),
      product: String(data.get('product') || '').trim(),
      quantity: String(data.get('quantity') || '').trim(),
      message: String(data.get('message') || '').trim(),
    };

    if (!fields.name || !fields.company || !fields.country || !fields.email || !fields.message) {
      setError(t.inquiry.required);
      setStatus('error');
      return;
    }

    setError('');
    setStatus('submitting');

    const subject = fields.product
      ? `${t.mailSubjectInquiry} - ${fields.product}`
      : t.mailSubjectInquiry;

    if (hasFormspree) {
      try {
        const response = await fetch(siteConfig.formspreeEndpoint, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: fields.name,
            email: fields.email,
            company: fields.company,
            country: fields.country,
            product: fields.product,
            quantity: fields.quantity,
            message: fields.message,
            _subject: subject,
          }),
        });
        if (!response.ok) throw new Error('formspree');
        setStatus('success');
        form.reset();
      } catch {
        setStatus('error');
        setError(t.inquiry.error);
      }
      return;
    }

    window.location.href = getMailtoHref(
      subject,
      buildInquiryMailtoBody(fields),
    );
    setStatus('success');
  }

  return (
    <form
      id={id}
      className={`scroll-mt-24 space-y-4 ${className}`}
      onSubmit={onSubmit}
      noValidate
    >
      <div className="hidden" aria-hidden="true">
        <label>
          {t.inquiry.honeypot}
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-dark">
          {t.inquiry.name} *
          <input className={fieldClass} name="name" required autoComplete="name" />
        </label>
        <label className="block text-sm font-medium text-dark">
          {t.inquiry.company} *
          <input className={fieldClass} name="company" required autoComplete="organization" />
        </label>
        <label className="block text-sm font-medium text-dark">
          {t.inquiry.country} *
          <input className={fieldClass} name="country" required autoComplete="country-name" />
        </label>
        <label className="block text-sm font-medium text-dark">
          {t.inquiry.email} *
          <input
            className={fieldClass}
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </label>
        <label className="block text-sm font-medium text-dark">
          {t.inquiry.product}
          <input
            className={fieldClass}
            name="product"
            defaultValue={defaultProduct}
            autoComplete="off"
          />
        </label>
        <label className="block text-sm font-medium text-dark">
          {t.inquiry.quantity}
          <input className={fieldClass} name="quantity" inputMode="numeric" />
        </label>
      </div>

      <label className="block text-sm font-medium text-dark">
        {t.inquiry.message} *
        <textarea
          className={`${fieldClass} min-h-[120px]`}
          name="message"
          required
          defaultValue={defaultMessage}
        />
      </label>

      {status === 'error' && error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
      {status === 'success' ? (
        <p className="text-sm text-dark" role="status">
          {hasFormspree ? t.inquiry.successFormspree : t.inquiry.success}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={status === 'submitting'}>
        {status === 'submitting' ? t.inquiry.submitting : t.inquiry.submit}
      </Button>
    </form>
  );
}
