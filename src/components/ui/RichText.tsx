import { Fragment, type ReactNode } from 'react';
import { LocaleLink } from '@/i18n/navigation';

function renderPart(part: string, key: number): ReactNode {
  const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if (!match) return <Fragment key={key}>{part}</Fragment>;
  const label = match[1];
  const href = match[2].trim();
  if (href.startsWith('/')) {
    const path = href.replace(/\/+$/, '') || '/';
    return (
      <LocaleLink key={key} to={path} className="font-medium text-dark hover:text-primary">
        {label}
      </LocaleLink>
    );
  }
  return (
    <a
      key={key}
      href={href}
      className="font-medium text-dark hover:text-primary"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}

/** Inline `[label](/path)` and `[label](https://…)` in sourced markdown paragraphs. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g).filter((part) => part !== '');
  return <>{parts.map((part, index) => renderPart(part, index))}</>;
}
