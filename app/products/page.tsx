import { Fragment } from "react";
import Section from "@/components/Section";
import { products, categories } from "@/lib/data/products";

export default function Page() {
  const grouped = categories.map((c) => ({
    category: c,
    rows: products.filter((p) => p.category === c),
  }));

  return (
    <div>
      <Section
        title="Product Catalog & Indicative Landed Cost"
        subtitle="Source: Goldbees costing notes. All values in INR."
      >
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="text-left py-2 uppercase tracking-widest text-[10px]">Product</th>
              <th className="text-left py-2 uppercase tracking-widest text-[10px]">Variant</th>
              <th className="text-left py-2 uppercase tracking-widest text-[10px]">Size</th>
              <th className="text-left py-2 uppercase tracking-widest text-[10px]">Ship Wt (gm)</th>
              <th className="text-right py-2 uppercase tracking-widest text-[10px]">Mfg</th>
              <th className="text-right py-2 uppercase tracking-widest text-[10px]">Pkg</th>
              <th className="text-right py-2 uppercase tracking-widest text-[10px]">Mono</th>
              <th className="text-right py-2 uppercase tracking-widest text-[10px]">Corr</th>
              <th className="text-right py-2 uppercase tracking-widest text-[10px]">Logistics</th>
              <th className="text-right py-2 uppercase tracking-widest text-[10px]">Total</th>
            </tr>
          </thead>
          <tbody>
            {grouped.map((g) => (
              <Fragment key={g.category}>
                <tr className="bg-black text-white">
                  <td colSpan={10} className="px-2 py-2 uppercase text-[10px] tracking-widest">
                    {g.category}
                  </td>
                </tr>
                {g.rows.map((p) => (
                  <tr key={p.id} className="border-b border-black">
                    <td className="py-2 pr-2 font-semibold">{p.name}</td>
                    <td className="py-2 pr-2 text-xs">{p.variant ?? "-"}</td>
                    <td className="py-2 pr-2 font-mono">{p.size}</td>
                    <td className="py-2 pr-2 font-mono">{p.shipWeightGm}</td>
                    <td className="py-2 pr-2 font-mono text-right">{p.costing.manufacturing}</td>
                    <td className="py-2 pr-2 font-mono text-right">{p.costing.primaryPackaging}</td>
                    <td className="py-2 pr-2 font-mono text-right">{p.costing.monocarton}</td>
                    <td className="py-2 pr-2 font-mono text-right">{p.costing.corrugated}</td>
                    <td className="py-2 pr-2 font-mono text-right">{p.costing.logistics}</td>
                    <td className="py-2 pr-2 font-mono text-right font-semibold">₹{p.costing.total}</td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
        </div>
      </Section>

      <Section
        title="Soap Batch Structure"
        subtitle="Reference economics from client notes"
      >
        <div className="grid md:grid-cols-2 gap-6 text-sm leading-relaxed">
          <div className="border border-black p-4">
            <div className="text-[10px] uppercase tracking-widest mb-2">Standard Cold Process - 1 kg batch</div>
            <ul className="list-disc pl-5">
              <li>Batch cost: ₹1,500 → ₹150 per 100 gm</li>
              <li>Out of 10 soaps: 7 retained as 100 gm bars</li>
              <li>3 soaps cut into 12 × 25 gm guest bars</li>
              <li>Effective sellable: 7 × 100 gm + 12 × 25 gm = 19 units</li>
            </ul>
          </div>
          <div className="border border-black p-4">
            <div className="text-[10px] uppercase tracking-widest mb-2">Premium Milk Range - 1 kg batch</div>
            <ul className="list-disc pl-5">
              <li>Batch cost: ₹2,500 → ₹250 per 100 gm</li>
              <li>Applies to Goat Milk &amp; Donkey Milk</li>
              <li>100 gm landed: ₹290 · 25 gm landed: ₹79</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
