"use client";

import { useState } from "react";
import { states, heatScale, StateRow } from "@/lib/data/regions";
import { categories } from "@/lib/data/products";

type CategoryKey = keyof StateRow["demand"];

export default function HeatGrid({ initialCategory }: { initialCategory?: CategoryKey }) {
  const [cat, setCat] = useState<CategoryKey>(initialCategory ?? "Face Serum");
  const sorted = [...states].sort((a, b) => b.demand[cat] - a.demand[cat]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {(categories as CategoryKey[]).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={
              "text-xs px-3 py-1 border border-black uppercase tracking-widest " +
              (cat === c ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white")
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {sorted.map((s) => {
          const v = s.demand[cat];
          const bg = heatScale(v);
          const dark = v > 55;
          return (
            <div
              key={s.code}
              className="border border-black p-3"
              style={{ background: bg, color: dark ? "#fff" : "#000" }}
            >
              <div className="flex items-baseline justify-between">
                <div className="font-semibold text-sm">{s.name}</div>
                <div className="text-[10px] uppercase tracking-widest">{s.code}</div>
              </div>
              <div className="text-[10px] uppercase tracking-widest opacity-80">
                {s.topCity} · {s.topCityTier} · {s.region}
              </div>
              <div className="text-3xl font-semibold mt-2 font-mono">{v}</div>
              <div className="text-[10px] uppercase tracking-widest opacity-80">Demand Index</div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest">
        <span>Low</span>
        <div className="h-2 flex-1 max-w-xs" style={{
          background: "linear-gradient(to right, hsl(0 0% 100%), hsl(0 0% 10%))",
          border: "1px solid #000",
        }} />
        <span>High</span>
      </div>
    </div>
  );
}
