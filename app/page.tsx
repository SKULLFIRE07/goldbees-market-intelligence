import Link from "next/link";
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
      city: s.topCity,
      total: Object.values(s.demand).reduce((a, b) => a + b, 0),
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 6);
  const maxRegion = topRegions[0].total;

  const topTrends = trends.filter((t) => t.direction === "up").sort((a, b) => b.delta - a.delta).slice(0, 5);
  const fallingTrends = trends.filter((t) => t.direction === "down").sort((a, b) => a.delta - b.delta).slice(0, 5);
  const maxUp = Math.max(...topTrends.map((t) => t.delta));
  const maxDown = Math.max(...fallingTrends.map((t) => Math.abs(t.delta)));

  const topMover = topTrends[0];
  const ticker = [...trends].sort((a, b) => b.delta - a.delta);

  return (
    <div>
      {/* Hero */}
      <section className="surface mb-6 overflow-hidden animate-fade-up">
        <div className="grid lg:grid-cols-[1.6fr_1fr]">
          <div className="p-8 sm:p-12 lg:border-r border-ink">
            <div className="eyebrow text-ink/50">AI Distributor Targeting Solution</div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95] mt-5">
              Turn marketplace<br />signal into<br />distribution.
            </h1>
            <p className="text-sm sm:text-base text-ink/70 mt-6 max-w-xl leading-relaxed">
              Goldbees reads demand across Amazon, Flipkart, IndiaMART, JustDial and Quick Commerce,
              then tells you exactly <span className="text-ink font-medium">what to launch</span>,{" "}
              <span className="text-ink font-medium">where</span>, and{" "}
              <span className="text-ink font-medium">through whom</span> — with the economics attached.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/ask" className="btn-ink">Ask The AI →</Link>
              <Link href="/strategy" className="btn-ghost">View Strategy</Link>
              <Link href="/demand" className="btn-ghost">Demand Heatmap</Link>
            </div>
          </div>

          <div className="p-8 sm:p-12 bg-ink text-paper flex flex-col justify-between gap-8">
            <div>
              <div className="eyebrow text-paper/50">Top Mover · This Week</div>
              <div className="font-display text-2xl font-semibold mt-3 leading-tight">{topMover.signal}</div>
              <div className="num font-display text-6xl font-bold mt-4 leading-none">
                +{topMover.delta.toFixed(1)}<span className="text-2xl align-top">%</span>
              </div>
              <div className="eyebrow text-paper/50 mt-2">Week over week traction</div>
            </div>
            <div className="grid grid-cols-2 gap-px bg-paper/20 border border-paper/20">
              {[
                ["Amazon", topMover.amazon],
                ["Flipkart", topMover.flipkart],
                ["Quick Comm.", topMover.quickCommerce],
                ["IndiaMART", topMover.indiamart],
              ].map(([label, v]) => (
                <div key={label as string} className="bg-ink p-3">
                  <div className="eyebrow text-paper/45">{label}</div>
                  <div className="num font-display text-xl font-semibold mt-1">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live ticker */}
        <div className="border-t border-ink bg-ink text-paper overflow-hidden">
          <div className="flex w-max animate-marquee">
            {[...ticker, ...ticker].map((t, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-2.5 border-r border-paper/15 whitespace-nowrap">
                <span className="eyebrow text-paper/45">{t.relatedCategory}</span>
                <span className="text-sm">{t.signal}</span>
                <span className={"num text-sm font-medium " + (t.delta >= 0 ? "text-paper" : "text-paper/55")}>
                  {t.delta > 0 ? "+" : ""}{t.delta.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Stat label="SKUs Tracked" value={totalSkus} sub="across 6 categories" />
        <Stat label="States Mapped" value={totalStates} sub="demand index 0–100" />
        <Stat label="Qualified Distributors" value={qualifiedDistributors} sub="fit score ≥ 75" />
        <Stat label="Trending Signals" value={trendingUp} sub="moving up WoW" />
        <Stat label="Declining Signals" value={declining} sub="moving down WoW" />
      </div>

      <Section
        eyebrow="Composite demand index across all categories"
        title="High-Potential Regions"
        right={<Link href="/demand" className="btn-ghost">Full heatmap →</Link>}
      >
        <div className="flex flex-col">
          {topRegions.map((r, i) => (
            <div key={r.name} className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-3 border-b border-ink/15 last:border-0">
              <span className="num text-ink/40 text-sm">{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-medium truncate">{r.name}</span>
                  <span className="eyebrow text-ink/45 shrink-0">{r.city}</span>
                </div>
                <div className="mt-2 h-2 w-full bg-ink/10">
                  <div className="h-2 bg-ink" style={{ width: `${(r.total / maxRegion) * 100}%` }} />
                </div>
              </div>
              <span className="num font-display text-lg font-semibold w-14 text-right">{r.total}</span>
            </div>
          ))}
        </div>
      </Section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section eyebrow="Largest weekly traction gains" title="Trending Up">
          <ul>
            {topTrends.map((t) => (
              <li key={t.signal} className="py-3 border-b border-ink/15 last:border-0">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-medium">{t.signal}</span>
                  <span className="num font-display font-semibold">+{t.delta.toFixed(1)}%</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="eyebrow text-ink/45 w-28 shrink-0">{t.relatedCategory}</span>
                  <div className="h-1.5 flex-1 bg-ink/10">
                    <div className="h-1.5 bg-ink" style={{ width: `${(t.delta / maxUp) * 100}%` }} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section eyebrow="Out-of-trend formulations to deprioritise" title="Declining">
          <ul>
            {fallingTrends.map((t) => (
              <li key={t.signal} className="py-3 border-b border-ink/15 last:border-0">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-medium">{t.signal}</span>
                  <span className="num font-display font-semibold">{t.delta.toFixed(1)}%</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="eyebrow text-ink/45 w-28 shrink-0">{t.relatedCategory}</span>
                  <div className="h-1.5 flex-1 bg-ink/10">
                    <div className="h-1.5 bg-ink/40" style={{ width: `${(Math.abs(t.delta) / maxDown) * 100}%` }} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <Section eyebrow="As proposed by Goldbees in client meeting" title="System Scope">
        <div className="grid md:grid-cols-2 gap-px bg-ink/15 border border-ink/15">
          <div className="bg-paper p-5">
            <div className="eyebrow text-ink/50 mb-3">Data Sources</div>
            <ul className="space-y-2 text-sm">
              {["Quick Commerce platforms", "Amazon", "Flipkart", "IndiaMART", "JustDial"].map((s) => (
                <li key={s} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-ink" />{s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-paper p-5">
            <div className="eyebrow text-ink/50 mb-3">AI Insights Generated</div>
            <ul className="space-y-2 text-sm">
              {[
                "Brand & category performance by region",
                "Product performance by weight, size, price range",
                "Area-wise demand trends across India",
                "Trending and declining products",
                "Distributor targeting recommendations",
              ].map((s) => (
                <li key={s} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-ink" />{s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
