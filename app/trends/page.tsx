import Section from "@/components/Section";
import { trends } from "@/lib/data/trends";

function Bar({ value }: { value: number }) {
  const w = Math.max(0, Math.min(100, value));
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-2 border border-ink bg-paper">
        <div className="h-full bg-ink" style={{ width: `${w}%` }} />
      </div>
      <span className="num text-[11px] text-ink/60 w-6">{value}</span>
    </div>
  );
}

export default function Page() {
  const up = trends.filter((t) => t.direction === "up").sort((a, b) => b.delta - a.delta);
  const flat = trends.filter((t) => t.direction === "flat");
  const down = trends.filter((t) => t.direction === "down").sort((a, b) => a.delta - b.delta);

  const renderTable = (rows: typeof trends) => (
    <div className="overflow-x-auto">
    <table className="w-full text-sm min-w-[680px]">
      <thead>
        <tr className="border-b-2 border-black">
          <th className="text-left py-2 uppercase tracking-widest text-[10px]">Signal</th>
          <th className="text-left py-2 uppercase tracking-widest text-[10px]">Category</th>
          <th className="text-right py-2 uppercase tracking-widest text-[10px]">Δ WoW</th>
          <th className="text-left py-2 uppercase tracking-widest text-[10px]">Amazon</th>
          <th className="text-left py-2 uppercase tracking-widest text-[10px]">Flipkart</th>
          <th className="text-left py-2 uppercase tracking-widest text-[10px]">Quick Commerce</th>
          <th className="text-left py-2 uppercase tracking-widest text-[10px]">IndiaMART</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((t) => (
          <tr key={t.signal} className="border-b border-black">
            <td className="py-2 pr-2 font-semibold">{t.signal}</td>
            <td className="py-2 pr-2 text-xs">{t.relatedCategory}</td>
            <td className="py-2 pr-2 font-mono text-right">
              {t.delta > 0 ? "+" : ""}{t.delta.toFixed(1)}%
            </td>
            <td className="py-2 pr-2"><Bar value={t.amazon} /></td>
            <td className="py-2 pr-2"><Bar value={t.flipkart} /></td>
            <td className="py-2 pr-2"><Bar value={t.quickCommerce} /></td>
            <td className="py-2 pr-2"><Bar value={t.indiamart} /></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );

  return (
    <div>
      <Section title="Trending Products" subtitle="Largest week-over-week traction gains across data sources">
        {renderTable(up)}
      </Section>

      <Section title="Stable / Flat" subtitle="Holding steady - monitor">
        {renderTable(flat)}
      </Section>

      <Section title="Declining Products" subtitle="Out-of-trend formulations - consider deprioritisation">
        {renderTable(down)}
      </Section>
    </div>
  );
}
