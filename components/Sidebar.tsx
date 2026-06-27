"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/",             label: "Overview" },
  { href: "/ask",          label: "Ask The AI" },
  { href: "/products",     label: "Products & Costing" },
  { href: "/demand",       label: "Regional Demand" },
  { href: "/distributors", label: "Distributor Targeting" },
  { href: "/trends",       label: "Trends" },
  { href: "/strategy",     label: "AI Strategy" },
];

const sources = ["Amazon", "Flipkart", "IndiaMART", "JustDial", "Quick Commerce"];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="hidden md:flex w-72 shrink-0 bg-ink text-paper flex-col sticky top-0 self-start h-screen">
      <div className="p-7 border-b border-white/15">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center bg-paper text-ink font-display text-2xl font-bold leading-none">
            G
          </span>
          <div>
            <div className="font-display text-xl font-bold tracking-tight leading-none">GOLDBEES</div>
            <div className="eyebrow text-white/55 mt-1">Market Intelligence</div>
          </div>
        </div>
      </div>

      <nav className="flex flex-col p-4 gap-1">
        {nav.map((n, i) => {
          const active = n.href === "/" ? path === "/" : path.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              className={
                "group relative flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-200 " +
                (active
                  ? "bg-paper text-ink font-medium"
                  : "text-white/70 hover:text-paper hover:bg-white/[0.07]")
              }
            >
              <span className={"num text-[10px] tracking-widest " + (active ? "text-ink/50" : "text-white/35")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{n.label}</span>
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-ink" />}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-7 border-t border-white/15">
        <div className="eyebrow text-white/45 mb-3">Live Data Sources</div>
        <ul className="space-y-2">
          {sources.map((s) => (
            <li key={s} className="flex items-center gap-2.5 text-xs text-white/75">
              <span className="h-1.5 w-1.5 rounded-full bg-white/60 animate-pulse" />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
