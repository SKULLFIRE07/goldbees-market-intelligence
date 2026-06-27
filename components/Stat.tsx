export default function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="surface surface-hover p-5 group">
      <div className="eyebrow text-ink/50">{label}</div>
      <div className="num font-display text-4xl sm:text-5xl font-semibold mt-3 tracking-tight leading-none">
        {value}
      </div>
      {sub && <div className="text-xs text-ink/60 mt-2">{sub}</div>}
      <div className="mt-4 h-px w-full bg-ink/15 overflow-hidden">
        <div className="h-px w-0 bg-ink transition-all duration-500 group-hover:w-full" />
      </div>
    </div>
  );
}
