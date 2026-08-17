interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
  /** 页面主标题用 h1，区块标题保持默认 h2 */
  heading?: 'h1' | 'h2';
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  light = false,
  className = '',
  heading = 'h2',
}: SectionTitleProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const titleColor = light ? 'text-white' : 'text-dark';
  const subColor = light ? 'text-white/75' : 'text-text-secondary';
  const HeadingTag = heading;

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          {eyebrow}
        </p>
      ) : null}
      <HeadingTag
        className={`heading-display text-3xl sm:text-4xl lg:text-5xl whitespace-pre-line ${titleColor}`}
      >
        {title}
      </HeadingTag>
      {subtitle ? (
        <p className={`mt-4 text-base sm:text-lg ${subColor}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}
