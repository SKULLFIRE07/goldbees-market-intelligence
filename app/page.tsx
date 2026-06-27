import Stat from "@/components/Stat";
import Section from "@/components/Section";
import { products } from "@/lib/data/products";
import { states } from "@/lib/data/regions";
import { distributors } from "@/lib/data/distributors";
import { trends } from "@/lib/data/trends";

export default function Page() {
  const totalSkus = products.length;
  const totalStates = states.length;
  const qualifiedDistributors = distributors.filter((d) => d.fitScore >= 75).length;
  const trendingUp = trends.filter((t) => t.direction === "up").length;
  const declining = trends.filter((t) => t.direction === "down").length;

  const topRegions = [...states]
    .map((s) => ({
      name: s.name,
      total: Object.values(s.demand).reduce((a, b) => a + b, 0),
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const topTrends = trends.filter((t) => t.direction === "up").sort((a, b) => b.delta - a.delta).slice(0, 5);
  const fallingTrends = trends.filter((t) => t.direction === "down").sort((a, b) => a.delta - b.delta).slice(0, 5);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Stat label="SKUs Tracked" value={totalSkus} sub="across 6 categories" />
        <Stat label="States Mapped" value={totalStates} sub="demand index 0–100" />
        <Stat label="Qualified Distributors" value={qualifiedDistributors} sub="fit score ≥ 75" />
        <Stat label="Trending Signals" value={trendingUp} sub="moving up WoW" />
        <Stat label="Declining Signals" value={declining} sub="moving down WoW" />
      </div>

      <Section title="High-Potential Regions" subtitle="Composite demand index across all Goldbees categories">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black">
              <th className="text-left py-2 uppercase tracking-widest text-[10px]">Rank</th>
              <th className="text-left py-2 uppercase tracking-widest text-[10px]">State</th>
              <th className="text-right py-2 uppercase tracking-widest text-[10px]">Composite Demand</th>
            </tr>
          </thead>
          <tbody>
            {topRegions.map((r, i) => (
              <tr key={r.name} className="border-b border-black">
                <td className="py-2 font-mono">{String(i + 1).padStart(2, "0")}</td>
                <td className="py-2">{r.name}</td>
                <td className="py-2 font-mono text-right">{r.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Section title="Trending Products" subtitle="Largest weekly traction gains">
          <ul className="text-sm">
            {topTrends.map((t) => (
              <li key={t.signal} className="border-b border-black py-2 flex justify-between">
                <div>
                  <div className="font-semibold">{t.signal}</div>
                  <div className="text-[10px] uppercase tracking-widest">{t.relatedCategory}</div>
                </div>
                <div className="font-mono">+{t.delta.toFixed(1)}%</div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Declining Products" subtitle="Out-of-trend formulations to deprioritise">
          <ul className="text-sm">
            {fallingTrends.map((t) => (
              <li key={t.signal} className="border-b border-black py-2 flex justify-between">
                <div>
                  <div className="font-semibold">{t.signal}</div>
                  <div className="text-[10px] uppercase tracking-widest">{t.relatedCategory}</div>
                </div>
                <div className="font-mono">{t.delta.toFixed(1)}%</div>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <Section title="System Scope" subtitle="As proposed by Goldbees in client meeting">
        <div className="grid md:grid-cols-2 gap-6 text-sm leading-relaxed">
          <div>
            <div className="text-[10px] uppercase tracking-widest mb-2">Data Sources</div>
            <ul className="list-disc pl-5">
              <li>Quick Commerce platforms</li>
              <li>Amazon</li>
              <li>Flipkart</li>
              <li>IndiaMART</li>
              <li>JustDial</li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest mb-2">AI Insights Generated</div>
            <ul className="list-disc pl-5">
              <li>Brand & category performance by region</li>
              <li>Product performance by weight, size, price range</li>
              <li>Area-wise demand trends across India</li>
              <li>Trending and declining products</li>
              <li>Distributor targeting recommendations</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
