// Natural language query engine.
// Parses the question for intent, category, region and product, then returns
// a structured answer pulled from the actual data files plus the prediction engine.
// In production this would route to an LLM with the same tools as function calls.

import { products } from "@/lib/data/products";
import { states, StateRow } from "@/lib/data/regions";
import { distributors } from "@/lib/data/distributors";
import { trends } from "@/lib/data/trends";
import {
  generateRecommendations,
  forecastAll,
  pricingModel,
  launchTargets,
} from "./predict";

export type AskResult = {
  question: string;
  intent: string;
  answer: string;
  bullets?: string[];
  table?: { headers: string[]; rows: (string | number)[][] };
  whyUseful: string;
  sources: string[];
};

const lower = (s: string) => s.toLowerCase();
type CategoryKey = keyof StateRow["demand"];

const CAT_ALIASES: { needle: string; cat: CategoryKey }[] = [
  { needle: "face serum", cat: "Face Serum" },
  { needle: "serum", cat: "Face Serum" },
  { needle: "facial mist", cat: "Facial Mist" },
  { needle: "mist", cat: "Facial Mist" },
  { needle: "lip care", cat: "Lip Care" },
  { needle: "lip", cat: "Lip Care" },
  { needle: "aloe vera", cat: "Aloe Vera Gel" },
  { needle: "aloe", cat: "Aloe Vera Gel" },
  { needle: "premium milk soap", cat: "Premium Milk Soap" },
  { needle: "goat milk", cat: "Premium Milk Soap" },
  { needle: "donkey milk", cat: "Premium Milk Soap" },
  { needle: "milk soap", cat: "Premium Milk Soap" },
  { needle: "cold process", cat: "Cold Process Soap" },
  { needle: "soap", cat: "Cold Process Soap" },
];

function findCategory(q: string): CategoryKey | null {
  const ql = lower(q);
  for (const a of CAT_ALIASES) if (ql.includes(a.needle)) return a.cat;
  return null;
}

function findState(q: string) {
  const ql = lower(q);
  return states.find(
    (s) =>
      ql.includes(lower(s.name)) ||
      ql.includes(" " + lower(s.code) + " ") ||
      ql.includes(lower(s.topCity)),
  );
}

function findProduct(q: string) {
  const ql = lower(q);
  return products.find((p) => ql.includes(lower(p.name)));
}

export function ask(question: string): AskResult {
  const q = question.trim();
  const ql = lower(q);

  if (/(price|pricing|mrp|cost|landed|margin)/.test(ql)) {
    const product = findProduct(q);
    const cat = findCategory(q);
    const pm = pricingModel();
    if (product) {
      const m = pm.find((x) => x.product.id === product.id)!;
      return {
        question,
        intent: "pricing",
        answer: `${product.name} (${product.size}) has a landed cost of ₹${m.landed}. Suggested distributor price ₹${m.distributorPrice}, marketplace MRP ₹${m.marketplaceMrp}, D2C MRP ₹${m.d2cMrp}.`,
        bullets: [
          `Manufacturing: ₹${product.costing.manufacturing}`,
          `Primary packaging: ₹${product.costing.primaryPackaging}`,
          `Monocarton: ₹${product.costing.monocarton}`,
          `Corrugated: ₹${product.costing.corrugated}`,
          `Logistics: ₹${product.costing.logistics}`,
          `Landed total: ₹${m.landed}`,
          `Distributor price: ₹${m.distributorPrice}`,
          `Retailer margin: ₹${m.retailerMargin}`,
          `Marketplace MRP: ₹${m.marketplaceMrp}`,
          `D2C MRP: ₹${m.d2cMrp}`,
          `D2C gross margin: ${m.d2cGrossMargin}%`,
        ],
        whyUseful:
          "Pricing is the biggest single lever for a consumer brand. Setting it right at launch is far easier than re-pricing later, when consumers, distributors and marketplaces all anchor on the original number.",
        sources: ["Goldbees costing notes", "Pricing model"],
      };
    }
    if (cat) {
      const rows = pm.filter((m) => m.product.category === cat);
      return {
        question,
        intent: "pricing",
        answer: `Channel pricing for ${cat} (${rows.length} SKUs).`,
        table: {
          headers: ["Product", "Size", "Landed", "Distributor", "Marketplace MRP", "D2C MRP", "D2C %"],
          rows: rows.map((m) => [
            m.product.name,
            m.product.size,
            `₹${m.landed}`,
            `₹${m.distributorPrice}`,
            `₹${m.marketplaceMrp}`,
            `₹${m.d2cMrp}`,
            `${m.d2cGrossMargin}%`,
          ]),
        },
        whyUseful:
          "Channel by channel pricing alignment prevents distributor conflict and protects D2C margin while staying competitive on marketplaces.",
        sources: ["Goldbees costing notes"],
      };
    }
  }

  if (/(distributor|partner|wholesaler|stockist|reseller)/.test(ql)) {
    const state = findState(q);
    const cat = findCategory(q);
    let list = distributors;
    if (state) list = list.filter((d) => d.stateCode === state.code);
    if (cat) list = list.filter((d) => d.categoryFocus.includes(cat));
    list = list.sort((a, b) => b.fitScore - a.fitScore).slice(0, 10);

    return {
      question,
      intent: "distributor",
      answer:
        list.length > 0
          ? `Top ${list.length} distributor matches${state ? ` in ${state.name}` : ""}${cat ? ` for ${cat}` : ""}.`
          : `No distributor records found for that filter.`,
      table:
        list.length > 0
          ? {
              headers: ["Name", "City", "Type", "Fit", "Turnover", "Years", "Source"],
              rows: list.map((d) => [d.name, d.city, d.type, d.fitScore, d.turnoverBand, d.yearsActive, d.primarySource]),
            }
          : undefined,
      whyUseful:
        "Anchor distributors compound. Five strong partners produce more revenue and signal than fifty cold outreaches, and starting with the highest fit scores cuts time to first shelf placement.",
      sources: ["IndiaMART", "JustDial", "Amazon Seller", "Flipkart Seller", "Quick Commerce"],
    };
  }

  if (/(demand|launch|where|best region|top region|market|highest)/.test(ql)) {
    const cat = findCategory(q);
    if (cat) {
      const rows = [...states]
        .map((s) => ({ s, v: s.demand[cat] }))
        .sort((a, b) => b.v - a.v)
        .slice(0, 8);
      return {
        question,
        intent: "demand",
        answer: `Highest demand for ${cat}: ${rows[0].s.name} at index ${rows[0].v}/100. ${rows[1].s.name} (${rows[1].v}) and ${rows[2].s.name} (${rows[2].v}) follow.`,
        table: {
          headers: ["Rank", "State", "City", "Tier", "Demand Index"],
          rows: rows.map((r, i) => [i + 1, r.s.name, r.s.topCity, r.s.topCityTier, r.v]),
        },
        whyUseful:
          "Concentrating launch spend in the single strongest demand pocket lowers customer acquisition cost and ensures sell through before any scale up.",
        sources: ["Amazon", "Flipkart", "IndiaMART", "JustDial", "Quick Commerce"],
      };
    }
    const rows = [...states]
      .map((s) => ({ s, v: Object.values(s.demand).reduce((a, b) => a + b, 0) }))
      .sort((a, b) => b.v - a.v)
      .slice(0, 8);
    return {
      question,
      intent: "demand",
      answer: `Top composite demand regions across all Goldbees categories. ${rows[0].s.name} leads at ${rows[0].v}.`,
      table: {
        headers: ["Rank", "State", "City", "Region", "Composite"],
        rows: rows.map((r, i) => [i + 1, r.s.name, r.s.topCity, r.s.region, r.v]),
      },
      whyUseful:
        "A composite view de-risks single-category bets and reveals truly underpenetrated zones to consider for distribution.",
      sources: ["Amazon", "Flipkart", "IndiaMART", "JustDial", "Quick Commerce"],
    };
  }

  if (/(trend|trending|growing|rising|hot|going up|winning)/.test(ql) && !/declin|down|falling/.test(ql)) {
    const up = trends.filter((t) => t.direction === "up").sort((a, b) => b.delta - a.delta);
    return {
      question,
      intent: "trends",
      answer: `${up.length} formulations trending up this week. Top mover: ${up[0].signal} at +${up[0].delta.toFixed(1)}% WoW.`,
      table: {
        headers: ["Signal", "Category", "WoW", "Amazon", "Flipkart", "QC", "IndiaMART"],
        rows: up.map((t) => [
          t.signal,
          t.relatedCategory,
          `+${t.delta.toFixed(1)}%`,
          t.amazon,
          t.flipkart,
          t.quickCommerce,
          t.indiamart,
        ]),
      },
      whyUseful:
        "Trend aligned launches typically convert 2-3x better than counter trend ones because the consumer is already searching and willing to try.",
      sources: ["Amazon", "Flipkart", "Quick Commerce", "IndiaMART"],
    };
  }

  if (/(declin|falling|drop|down|deprioritise|out of trend|kill|cut|reduce)/.test(ql)) {
    const down = trends.filter((t) => t.direction === "down").sort((a, b) => a.delta - b.delta);
    return {
      question,
      intent: "decline",
      answer: `${down.length} formulations are declining. Largest drop: ${down[0].signal} at ${down[0].delta.toFixed(1)}% WoW.`,
      table: {
        headers: ["Signal", "Category", "WoW"],
        rows: down.map((t) => [t.signal, t.relatedCategory, `${t.delta.toFixed(1)}%`]),
      },
      whyUseful:
        "Cutting exposure to dying SKUs early protects working capital, distributor relationships and brand association.",
      sources: ["Amazon", "Flipkart", "Quick Commerce", "IndiaMART"],
    };
  }

  if (/(forecast|predict|future|90 day|30 day|60 day|projection)/.test(ql)) {
    const cat = findCategory(q);
    const state = findState(q);
    let fc = forecastAll();
    if (cat) fc = fc.filter((f) => f.category === cat);
    if (state) fc = fc.filter((f) => f.stateCode === state.code);
    fc = fc.sort((a, b) => b.day90 - b.base - (a.day90 - a.base)).slice(0, 10);

    return {
      question,
      intent: "forecast",
      answer: `Top forecast growth pockets over the next 90 days${cat ? ` for ${cat}` : ""}${state ? ` in ${state.name}` : ""}.`,
      table: {
        headers: ["State", "Category", "Base", "D+30", "D+60", "D+90", "Δ"],
        rows: fc.map((f) => [f.state, f.category, f.base, f.day30, f.day60, f.day90, `+${f.day90 - f.base}`]),
      },
      whyUseful:
        "Looking 90 days ahead prevents stocking and hiring decisions that look right today but expire in two months. Forecasts give purchasing a useful window.",
      sources: ["Demand index", "Trend signals", "Tier weighting"],
    };
  }

  if (/(strategy|what should|next step|recommend|priorit|plan|move)/.test(ql)) {
    const recs = generateRecommendations().slice(0, 6);
    return {
      question,
      intent: "strategy",
      answer: `Top ${recs.length} strategic moves ranked by priority and confidence.`,
      bullets: recs.map(
        (r) => `[${r.priority} · ${r.confidence}%] ${r.title}. Action: ${r.action}`,
      ),
      whyUseful:
        "Sequencing high priority moves before low priority ones is the difference between a brand that compounds and one that stalls.",
      sources: ["AI Strategy Engine"],
    };
  }

  if (/(launch order|launch matrix|priority matrix|where to launch first)/.test(ql)) {
    const lt = launchTargets().slice(0, 10);
    return {
      question,
      intent: "launch matrix",
      answer: `Top 10 product x region combinations to launch in order.`,
      table: {
        headers: ["Rank", "State", "Category", "Score", "Distributors", "Anchor"],
        rows: lt.map((row, i) => [
          i + 1,
          row.state.name,
          row.category,
          row.score,
          row.distributorCount,
          row.topDistributor?.name ?? "Build from scratch",
        ]),
      },
      whyUseful:
        "A scored matrix prevents launches driven by founder geography or relationships and keeps capital flowing to the highest signal markets first.",
      sources: ["Demand index", "Tier weights", "Distributor fit"],
    };
  }

  const product = findProduct(q);
  if (product) {
    const m = pricingModel().find((x) => x.product.id === product.id)!;
    return {
      question,
      intent: "product",
      answer: `${product.name} (${product.size}). Category: ${product.category}. Landed cost ₹${product.costing.total}. Suggested D2C MRP ₹${m.d2cMrp}.`,
      bullets: [
        `Variant: ${product.variant ?? "-"}`,
        `Shipping weight band: ${product.shipWeightGm} gm`,
        `Manufacturing: ₹${product.costing.manufacturing}`,
        `Primary packaging: ₹${product.costing.primaryPackaging}`,
        `Monocarton: ₹${product.costing.monocarton}`,
        `Corrugated: ₹${product.costing.corrugated}`,
        `Logistics: ₹${product.costing.logistics}`,
        `Landed total: ₹${product.costing.total}`,
      ],
      whyUseful:
        "A single SKU snapshot helps the sales team quote distributors confidently and avoid margin leaks during negotiation.",
      sources: ["Goldbees costing notes"],
    };
  }

  return {
    question,
    intent: "general",
    answer:
      "I can answer questions about regional demand, product pricing, distributor targeting, trends, forecasts and overall strategy. Try one of the suggestions below.",
    bullets: [
      "Which state has the highest demand for face serum?",
      "Top distributors in Maharashtra for soap",
      "Pricing for Glow Serum",
      "What is trending this week?",
      "Show me 90 day forecast for Premium Milk Soap",
      "What should I do next?",
      "Which formulations are declining?",
      "Launch order matrix",
    ],
    whyUseful:
      "A natural language query layer lets non technical team members pull insights without learning the dashboard, which speeds up everyday decisions across sales, marketing and operations.",
    sources: ["Demo prompts"],
  };
}
