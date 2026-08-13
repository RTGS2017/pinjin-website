import type { ReactNode } from 'react';
import { LocaleLink } from '@/i18n/navigation';

interface MegaMenuLinkProps {
  to: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

/** 站内 Mega Menu 链接：走 React Router（含 hash），保留 /en /zh */
export function MegaMenuLink({ to, className, onClick, children }: MegaMenuLinkProps) {
  return (
    <LocaleLink to={to} className={className} onClick={onClick}>
      {children}
    </LocaleLink>
  );
}
