"use client";

import { useMemo, useState } from "react";
import Section from "@/components/Section";
import { distributors } from "@/lib/data/distributors";
import { states } from "@/lib/data/regions";
import { categories } from "@/lib/data/products";

export default function Page() {
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [minScore, setMinScore] = useState<number>(0);

  const filtered = useMemo(() => {
    return distributors
      .filter((d) => stateFilter === "all" || d.stateCode === stateFilter)
      .filter((d) => categoryFilter === "all" || d.categoryFocus.includes(categoryFilter))
      .filter((d) => d.fitScore >= minScore)
      .sort((a, b) => b.fitScore - a.fitScore);
  }, [stateFilter, categoryFilter, minScore]);

  const stateOptions = [{ code: "all", name: "All States" }, ...states];

  return (
    <div>
      <Section
        title="Distributor Targeting"
        subtitle="Ranked recommendations from IndiaMART, JustDial, Amazon/Flipkart seller signals and Quick Commerce partners."
      >
        <div className="flex flex-wrap items-end gap-4 mb-5 p-4 bg-smoke border border-ink/15">
          <label className="flex flex-col gap-1.5">
            <span className="eyebrow text-ink/55">State</span>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="border border-ink px-3 py-2 bg-paper text-ink text-sm min-w-[10rem]"
            >
              {stateOptions.map((s) => (
                <option key={s.code} value={s.code}>{s.name}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="eyebrow text-ink/55">Category</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-ink px-3 py-2 bg-paper text-ink text-sm min-w-[10rem]"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 min-w-[12rem]">
            <span className="eyebrow text-ink/55">Min Fit Score · <span className="num text-ink">{minScore}</span></span>
            <input
              type="range"
              min={0}
              max={100}
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="mt-2"
            />
          </label>

          <div className="ml-auto flex flex-col gap-1.5">
            <span className="eyebrow text-ink/55">Matches</span>
            <span className="num font-display text-2xl font-semibold leading-none">{filtered.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[820px]">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="text-left py-2 uppercase tracking-widest text-[10px]">Fit</th>
              <th className="text-left py-2 uppercase tracking-widest text-[10px]">Name</th>
              <th className="text-left py-2 uppercase tracking-widest text-[10px]">City / State</th>
              <th className="text-left py-2 uppercase tracking-widest text-[10px]">Type</th>
              <th className="text-left py-2 uppercase tracking-widest text-[10px]">Category Focus</th>
              <th className="text-left py-2 uppercase tracking-widest text-[10px]">Turnover</th>
              <th className="text-left py-2 uppercase tracking-widest text-[10px]">Years</th>
              <th className="text-left py-2 uppercase tracking-widest text-[10px]">Source</th>
              <th className="text-left py-2 uppercase tracking-widest text-[10px]">Compliance</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d.id} className="border-b border-black">
                <td className="py-2 pr-2">
                  <span className="inline-block min-w-[2.5rem] font-mono text-center border border-black px-1">
                    {d.fitScore}
                  </span>
                </td>
                <td className="py-2 pr-2 font-semibold">{d.name}</td>
                <td className="py-2 pr-2">{d.city}, {d.stateCode}</td>
                <td className="py-2 pr-2">{d.type}</td>
                <td className="py-2 pr-2 text-xs">{d.categoryFocus.join(", ")}</td>
                <td className="py-2 pr-2 font-mono">{d.turnoverBand}</td>
                <td className="py-2 pr-2 font-mono">{d.yearsActive}y</td>
                <td className="py-2 pr-2 text-xs">{d.primarySource}</td>
                <td className="py-2 pr-2 text-[10px] uppercase tracking-widest">
                  GST {d.gstActive ? "OK" : "-"} · FSSAI {d.fssaiValid ? "OK" : "-"}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={9} className="py-6 text-center text-xs uppercase tracking-widest">No matches</td></tr>
            )}
          </tbody>
        </table>
        </div>
      </Section>
    </div>
  );
}
