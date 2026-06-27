"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/",             label: "Overview" },
  { href: "/ask",          label: "Ask The AI" },
  { href: "/products",     label: "Products & Costing" },
  { href: "/demand",       label: "Regional Demand" },
  { href: "/distributors", label: "Distributor Targeting" },
  { href: "/trends",       label: "Trends" },
  { href: "/strategy",     label: "AI Strategy" },
];

export default function MobileNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden border-b border-black sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" onClick={() => setOpen(false)} className="flex flex-col">
          <span className="text-xl font-bold tracking-tight leading-none">GOLDBEES</span>
          <span className="text-[10px] uppercase tracking-widest">Market Intelligence</span>
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="border border-black px-3 py-2 text-xs uppercase tracking-widest bg-black text-white"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col border-t border-black">
          {nav.map((n) => {
            const active = n.href === "/" ? path === "/" : path.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={
                  "px-4 py-3 text-sm border-b border-black " +
                  (active ? "bg-black text-white" : "bg-white text-black")
                }
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
