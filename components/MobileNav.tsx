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
    <div className="md:hidden border-b border-ink sticky top-0 z-20 bg-paper/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center bg-ink text-paper font-display text-lg font-bold leading-none">
            G
          </span>
          <span className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-tight leading-none">GOLDBEES</span>
            <span className="eyebrow text-ink/55">Market Intelligence</span>
          </span>
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="btn-ink"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col border-t border-ink animate-fade-in">
          {nav.map((n, i) => {
            const active = n.href === "/" ? path === "/" : path.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={
                  "flex items-center gap-3 px-4 py-3.5 text-sm border-b border-ink/15 " +
                  (active ? "bg-ink text-paper font-medium" : "bg-paper text-ink")
                }
              >
                <span className={"num text-[10px] " + (active ? "text-paper/50" : "text-ink/40")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {n.label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
