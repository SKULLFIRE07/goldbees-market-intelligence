import Section from "@/components/Section";
import HeatGrid from "@/components/HeatGrid";
import { states } from "@/lib/data/regions";

export default function Page() {
  const byRegion: Record<string, number> = {};
  for (const s of states) {
    const total = Object.values(s.demand).reduce((a, b) => a + b, 0);
    byRegion[s.region] = (byRegion[s.region] ?? 0) + total;
  }
  const regionRows = Object.entries(byRegion).sort((a, b) => b[1] - a[1]);

  return (
    <div>
      <Section
        title="Area-wise Demand Heatmap"
        subtitle="Composite signal from Amazon, Flipkart, IndiaMART, JustDial and Quick Commerce. Index 0–100."
      >
        <HeatGrid />
      </Section>

      <Section title="Demand by Zone" subtitle="Aggregated across all Goldbees categories">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black">
              <th className="text-left py-2 uppercase tracking-widest text-[10px]">Zone</th>
              <th className="text-right py-2 uppercase tracking-widest text-[10px]">Composite Demand</th>
            </tr>
          </thead>
          <tbody>
            {regionRows.map(([r, v]) => (
              <tr key={r} className="border-b border-black">
                <td className="py-2">{r}</td>
                <td className="py-2 font-mono text-right">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
