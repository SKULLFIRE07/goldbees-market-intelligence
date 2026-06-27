export default function Section({
  title,
  subtitle,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-black mb-6">
      <div className="flex items-center justify-between border-b border-black px-4 py-3">
        <div>
          <h2 className="text-sm uppercase tracking-widest font-semibold">{title}</h2>
          {subtitle && <p className="text-xs mt-1">{subtitle}</p>}
        </div>
        {right}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}
