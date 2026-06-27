export default function Section({
  title,
  subtitle,
  eyebrow,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="surface mb-6 animate-fade-up">
      <div className="flex items-start justify-between gap-4 border-b border-ink px-5 py-4">
        <div>
          {eyebrow && <div className="eyebrow text-ink/45 mb-1.5">{eyebrow}</div>}
          <h2 className="font-display text-base sm:text-lg font-semibold tracking-tight leading-tight">
            {title}
          </h2>
          {subtitle && <p className="text-xs sm:text-[13px] text-ink/65 mt-1.5 max-w-3xl leading-relaxed">{subtitle}</p>}
        </div>
        {right && <div className="shrink-0">{right}</div>}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}
