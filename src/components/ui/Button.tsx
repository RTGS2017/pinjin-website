import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import { LocaleLink } from '@/i18n/navigation';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined };

type ButtonAsLink = BaseProps & {
  to: string;
  href?: undefined;
  onClick?: () => void;
};

type ButtonAsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href: string;
    to?: undefined;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-hover border border-transparent',
  secondary:
    'bg-dark text-white hover:bg-dark-2 border border-transparent',
  outline:
    'bg-transparent text-dark border border-dark hover:border-primary hover:text-primary',
  ghost:
    'bg-transparent text-white border border-white/40 hover:border-primary hover:text-primary',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-sm sm:text-base',
};

export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
  } = props;

  const classes = [
    'inline-flex items-center justify-center gap-2 font-semibold tracking-wide uppercase transition-colors duration-200 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
    variants[variant],
    sizes[size],
    className,
  ].join(' ');

  if ('to' in props && props.to) {
    return (
      <LocaleLink to={props.to} className={classes} onClick={props.onClick}>
        {children}
      </LocaleLink>
    );
  }

  if ('href' in props && props.href) {
    const { href, children: _c, variant: _v, size: _s, className: _cl, to: _t, ...rest } =
      props as ButtonAsAnchor & BaseProps;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  const { type = 'button', ...rest } = buttonProps;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
