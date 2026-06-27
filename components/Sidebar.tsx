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

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="hidden md:flex w-64 shrink-0 bg-white text-black p-6 flex-col gap-8 sticky top-0 self-start h-screen">
      <div>
        <div className="text-2xl font-bold tracking-tight">GOLDBEES</div>
        <div className="text-xs uppercase tracking-widest mt-1">Market Intelligence</div>
      </div>
      <nav className="flex flex-col gap-1">
        {nav.map((n) => {
          const active = n.href === "/" ? path === "/" : path.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              className={
                "px-3 py-2 text-sm border border-black " +
                (active ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white")
              }
            >
              {n.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto text-[10px] uppercase tracking-widest leading-relaxed">
        <div className="border-t border-black pt-3">Data Sources</div>
        <ul className="mt-2 space-y-1 normal-case tracking-normal">
          <li>Amazon</li>
          <li>Flipkart</li>
          <li>IndiaMART</li>
          <li>JustDial</li>
          <li>Quick Commerce</li>
        </ul>
      </div>
    </aside>
  );
}
