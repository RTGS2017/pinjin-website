interface SpecItemProps {
  label: string;
  value: string;
  compact?: boolean;
}

export function SpecItem({ label, value, compact = false }: SpecItemProps) {
  return (
    <div
      className={`border-b border-border ${
        compact ? 'py-2' : 'py-3'
      } last:border-b-0`}
    >
      <dt className="text-xs font-medium tracking-wide text-text-secondary uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-dark sm:text-base">
        {value}
      </dd>
    </div>
  );
}
