"use client";

import { useState } from "react";
import { states, heatScale, StateRow } from "@/lib/data/regions";
import { categories } from "@/lib/data/products";

type CategoryKey = keyof StateRow["demand"];

export default function HeatGrid({ initialCategory }: { initialCategory?: CategoryKey }) {
  const [cat, setCat] = useState<CategoryKey>(initialCategory ?? "Face Serum");
  const sorted = [...states].sort((a, b) => b.demand[cat] - a.demand[cat]);
  const top = sorted[0].demand[cat];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {(categories as CategoryKey[]).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={
              "text-[11px] px-3.5 py-1.5 border border-ink uppercase tracking-widest transition-all duration-200 " +
              (cat === c
                ? "bg-ink text-paper shadow-hard-sm -translate-y-0.5"
                : "bg-paper text-ink hover:-translate-y-0.5")
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {sorted.map((s, i) => {
          const v = s.demand[cat];
          const bg = heatScale(v);
          const dark = v > 55;
          const isTop = i === 0;
          return (
            <div
              key={s.code}
              className="border border-ink p-3.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-hard relative"
              style={{ background: bg, color: dark ? "#f7f6f3" : "#0a0a0a" }}
            >
              {isTop && (
                <span className="absolute top-2 right-2 text-[9px] uppercase tracking-widest border px-1.5 py-0.5"
                  style={{ borderColor: dark ? "#f7f6f3" : "#0a0a0a" }}>
                  Peak
                </span>
              )}
              <div className="flex items-baseline justify-between gap-2">
                <div className="font-display font-semibold text-sm">{s.name}</div>
                <div className="text-[10px] uppercase tracking-widest opacity-70">{s.code}</div>
              </div>
              <div className="text-[10px] uppercase tracking-widest opacity-75 mt-0.5">
                {s.topCity} · {s.topCityTier}
              </div>
              <div className="num font-display text-4xl font-bold mt-3 leading-none">{v}</div>
              <div className="text-[10px] uppercase tracking-widest opacity-75 mt-1">Demand Index</div>
              <div className="mt-2.5 h-1 w-full" style={{ background: dark ? "rgba(247,246,243,0.25)" : "rgba(10,10,10,0.15)" }}>
                <div className="h-1" style={{ width: `${(v / top) * 100}%`, background: dark ? "#f7f6f3" : "#0a0a0a" }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-ink/60">
        <span>Low</span>
        <div className="h-2.5 flex-1 max-w-xs border border-ink" style={{
          background: "linear-gradient(to right, hsl(0 0% 100%), hsl(0 0% 10%))",
        }} />
        <span>High</span>
      </div>
    </div>
  );
}
