"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/": "Overview",
  "/ask": "Ask The AI",
  "/products": "Products & Costing",
  "/demand": "Regional Demand",
  "/distributors": "Distributor Targeting",
  "/trends": "Trends",
  "/strategy": "AI Strategy",
};

export default function Header() {
  const path = usePathname();
  const key = Object.keys(titles).find((k) =>
    k === "/" ? path === "/" : path.startsWith(k),
  );
  const section = key ? titles[key] : "Overview";

  return (
    <header className="hidden md:flex sticky top-0 z-10 items-center justify-between gap-6 px-10 py-4 border-b border-ink bg-paper/80 backdrop-blur-md">
      <div className="flex items-center gap-3 text-sm">
        <span className="eyebrow text-ink/50">Goldbees</span>
        <span className="text-ink/30">/</span>
        <span className="font-medium">{section}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-ink/60">
          <span className="h-1.5 w-1.5 rounded-full bg-ink animate-pulse" />
          Prototype Build
        </span>
        <Link href="/ask" className="btn-ink">Ask The AI</Link>
      </div>
    </header>
  );
}
