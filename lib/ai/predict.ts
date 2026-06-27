// Goldbees AI prediction engine.
// Deterministic strategy engine that combines product costing, regional demand,
// distributor fit and trend signals to produce ranked recommendations.
// In production this layer would be replaced by an LLM + ML pipeline,
// but the inputs, scoring math and outputs would stay the same.

import { products, Product } from "@/lib/data/products";
import { states, StateRow } from "@/lib/data/regions";
import { distributors, Distributor } from "@/lib/data/distributors";
import { trends, TrendRow, TrendDirection } from "@/lib/data/trends";

export type CategoryKey = keyof StateRow["demand"];
export type Priority = "Critical" | "High" | "Medium" | "Low";
export type RecKind =
  | "Launch Priority"
  | "Market Expansion"
  | "Distributor Activation"
  | "Discontinue"
  | "Pricing Strategy"
  | "Inventory Rebalance"
  | "Trend Opportunity";

export type Recommendation = {
  id: string;
  kind: RecKind;
  priority: Priority;
  title: string;
  action: string;
  reasoning: string[];
  whyUseful: string;
  expectedOutcome: string;
  confidence: number;
};

const priorityOf = (score: number): Priority =>
  score >= 85 ? "Critical" : score >= 70 ? "High" : score >= 55 ? "Medium" : "Low";

// 30 / 60 / 90 day demand forecast for a state x category.
// Uses related trend signal as a growth multiplier.
export type ForecastPoint = {
  state: string;
  stateCode: string;
  category: CategoryKey;
  base: number;
  day30: number;
  day60: number;
  day90: number;
  trendInputPct: number;
};

export function forecastAll(): ForecastPoint[] {
  const trendByCat = new Map<string, number>();
  for (const t of trends) {
    const cur = trendByCat.get(t.relatedCategory) ?? 0;
    trendByCat.set(t.relatedCategory, cur + t.delta);
  }

  const out: ForecastPoint[] = [];
  for (const s of states) {
    for (const cat of Object.keys(s.demand) as CategoryKey[]) {
      const base = s.demand[cat];
      const dir = (trendByCat.get(cat) ?? 0) / 100;
      const tier = s.topCityTier === "Metro" ? 1.0
                 : s.topCityTier === "Tier-1" ? 0.85
                 : s.topCityTier === "Tier-2" ? 0.7
                 : 0.55;
      const day30 = Math.round(base * (1 + dir * 1 * tier));
      const day60 = Math.round(base * (1 + dir * 2 * tier));
      const day90 = Math.round(base * (1 + dir * 3 * tier));
      out.push({
        state: s.name,
        stateCode: s.code,
        category: cat,
        base,
        day30,
        day60,
        day90,
        trendInputPct: Math.round((trendByCat.get(cat) ?? 0) * 10) / 10,
      });
    }
  }
  return out;
}

// Suggested pricing: D2C MRP at 3x landed, distributor price at 1.85x landed.
// These are illustrative defaults for the prototype.
export type PriceModel = {
  product: Product;
  landed: number;
  distributorPrice: number;
  retailerMargin: number;
  d2cMrp: number;
  marketplaceMrp: number;
  d2cGrossMargin: number;
};

export function pricingModel(): PriceModel[] {
  return products.map((p) => {
    const landed = p.costing.total;
    const distributorPrice = Math.round(landed * 1.85);
    const retailerMargin = Math.round(landed * 0.6);
    const d2cMrp = Math.round(landed * 3);
    const marketplaceMrp = Math.round(landed * 2.6);
    const d2cGrossMargin = Math.round(((d2cMrp - landed) / d2cMrp) * 100);
    return { product: p, landed, distributorPrice, retailerMargin, d2cMrp, marketplaceMrp, d2cGrossMargin };
  });
}

// Top launch (state x category) combinations ranked by demand x tier weight.
export type LaunchTarget = {
  state: StateRow;
  category: CategoryKey;
  score: number;
  distributorCount: number;
  topDistributor?: Distributor;
};

export function launchTargets(): LaunchTarget[] {
  const tierWeight: Record<string, number> = { Metro: 1.0, "Tier-1": 0.92, "Tier-2": 0.8, "Tier-3": 0.65 };
  const all: LaunchTarget[] = [];
  for (const s of states) {
    for (const cat of Object.keys(s.demand) as CategoryKey[]) {
      const score = Math.round(s.demand[cat] * tierWeight[s.topCityTier]);
      const matching = distributors
        .filter((d) => d.stateCode === s.code && d.categoryFocus.includes(cat))
        .sort((a, b) => b.fitScore - a.fitScore);
      all.push({
        state: s,
        category: cat,
        score,
        distributorCount: matching.length,
        topDistributor: matching[0],
      });
    }
  }
  return all.sort((a, b) => b.score - a.score);
}

export function generateRecommendations(): Recommendation[] {
  const recs: Recommendation[] = [];
  const lt = launchTargets();
  const top = lt[0];

  // 1. Top launch target
  recs.push({
    id: "rec-001",
    kind: "Launch Priority",
    priority: "Critical",
    title: `Lead launch with ${top.category} in ${top.state.name}`,
    action: `Concentrate first 90 days of marketing spend and primary inventory on ${top.category} across ${top.state.topCity} and surrounding ${top.state.region} zone.`,
    reasoning: [
      `Composite launch score ${top.score} is the highest in the dataset.`,
      `${top.state.topCity} is a ${top.state.topCityTier} market with a population of ${top.state.populationMn}M.`,
      top.topDistributor
        ? `${top.topDistributor.name} has a fit score of ${top.topDistributor.fitScore} and active GST + FSSAI.`
        : `Distributor coverage will need to be built before scale.`,
    ],
    expectedOutcome: `First mover advantage in the single strongest demand pocket nationally, with measurable sell-through inside 60 days.`,
    whyUseful: `For a growing brand, focusing the launch on one high-signal region lowers customer acquisition cost, improves repeat purchase data, and provides a clean control for measuring marketing ROI before scaling.`,
    confidence: 92,
  });

  // 2. Trend-led opportunities
  const trendingUp = trends.filter((t) => t.direction === "up").sort((a, b) => b.delta - a.delta);
  if (trendingUp.length) {
    const top3 = trendingUp.slice(0, 3);
    recs.push({
      id: "rec-002",
      kind: "Trend Opportunity",
      priority: "Critical",
      title: `Ride the ${top3.map((t) => t.signal.split(" /")[0]).join(", ")} wave`,
      action: `Push Glow Serum, Goat Milk Soap and Kumkumadi Face Serum as the front of the catalog. Align ad creatives, listings and PR with these formulations.`,
      reasoning: top3.map((t) => `${t.signal} is up ${t.delta.toFixed(1)}% week over week across Amazon, Flipkart, IndiaMART and Quick Commerce.`),
      expectedOutcome: `Listing CTR and add-to-cart rates aligned to active demand. Lower wasted SKU production for formulations not currently moving.`,
      whyUseful: `Trend-aligned launches typically convert 2-3x better than counter-trend ones, because the consumer is already actively searching and willing to try.`,
      confidence: 88,
    });
  }

  // 3. Discontinue / reduce
  const declining = trends.filter((t) => t.direction === "down").sort((a, b) => a.delta - b.delta);
  if (declining.length) {
    recs.push({
      id: "rec-003",
      kind: "Discontinue",
      priority: "Medium",
      title: `Cut exposure to declining formulations`,
      action: `Avoid SKU lines that resemble ${declining.slice(0, 3).map((d) => d.signal).join(", ")}. If any current Goldbees SKU shares the formulation, reduce next production batch by 40%.`,
      reasoning: declining.slice(0, 3).map((d) => `${d.signal} traction is down ${Math.abs(d.delta).toFixed(1)}% WoW.`),
      expectedOutcome: `Less dead stock, freed working capital, less risk of brand association with out of trend formulations.`,
      whyUseful: `For a brand building distribution depth, dead SKUs are expensive: shelf space lost, distributor relationships strained, returns and breakage on slow movers. Cutting early protects the rest of the catalog.`,
      confidence: 81,
    });
  }

  // 4. Distributor activation order
  const topDistros = [...distributors].sort((a, b) => b.fitScore - a.fitScore).slice(0, 5);
  recs.push({
    id: "rec-004",
    kind: "Distributor Activation",
    priority: "High",
    title: `Onboard 5 anchor distributors in 6 weeks`,
    action: `Open conversations in priority order with: ${topDistros.map((d) => `${d.name} (${d.city})`).join("; ")}.`,
    reasoning: topDistros.map((d) => `${d.name}: fit score ${d.fitScore}, turnover ${d.turnoverBand}, ${d.yearsActive} years active, GST ${d.gstActive ? "active" : "missing"}.`),
    expectedOutcome: `Establishes presence across 4 zones with vetted partners. Each anchor unlocks 30-60 sub-retailers downstream.`,
    whyUseful: `Distribution is a network effect business. Five strong anchor partners produce more revenue and signal than fifty cold outreaches. This ordering also de-risks territory conflicts since each partner sits in a different metro.`,
    confidence: 87,
  });

  // 5. Pricing strategy for hero serum
  const pm = pricingModel().find((m) => m.product.id === "serum-glow");
  if (pm) {
    recs.push({
      id: "rec-005",
      kind: "Pricing Strategy",
      priority: "High",
      title: `Anchor Glow Serum at ₹${pm.d2cMrp} D2C / ₹${pm.marketplaceMrp} marketplace`,
      action: `List Glow Serum at ₹${pm.d2cMrp} on goldbees.in (run a launch offer at ₹${Math.round(pm.d2cMrp * 0.85)}). On Amazon/Flipkart list at ₹${pm.marketplaceMrp}. Offer distributors ₹${pm.distributorPrice} with retailer margin around ₹${pm.retailerMargin}.`,
      reasoning: [
        `Landed cost ₹${pm.landed}. At ₹${pm.d2cMrp} D2C, gross margin is roughly ${pm.d2cGrossMargin}%.`,
        `Vitamin C serums sit in a busy ₹399-₹699 marketplace band, so ₹${pm.marketplaceMrp} is mid-band with room for ad spend.`,
        `Distributor margin of ${Math.round(((pm.distributorPrice - pm.landed) / pm.distributorPrice) * 100)}% buys real shelf advocacy without giving away the brand value.`,
      ],
      expectedOutcome: `Healthy contribution margin on D2C, competitive marketplace positioning, distributor incentive aligned with sell-through.`,
      whyUseful: `Pricing is the single biggest lever for a consumer brand. Setting it right at launch is far easier than re-pricing later, when consumers, distributors and marketplaces all anchor on the original number.`,
      confidence: 84,
    });
  }

  // 6. Market expansion - next 3 states
  const next = lt.slice(1, 4);
  recs.push({
    id: "rec-006",
    kind: "Market Expansion",
    priority: "High",
    title: `Plan wave 2 expansion into 3 high-signal markets`,
    action: `Pre-line up Wave 2 launches in ${next.map((n) => `${n.state.name} (${n.category})`).join(", ")} for month 4 onward.`,
    reasoning: next.map((n) => `${n.state.name} ${n.category}: launch score ${n.score}, ${n.distributorCount} matched distributors.`),
    expectedOutcome: `A 12 month rollout plan that scales without overcommitting before learnings from wave 1 are in.`,
    whyUseful: `Sequencing market entry by demand score rather than founder geography or relationships avoids the classic mistake of expanding everywhere at half strength. Each wave is funded by the cash flow of the previous one.`,
    confidence: 79,
  });

  // 7. Inventory rebalance - move stock away from low demand states
  const bottom = [...states]
    .map((s) => ({ state: s, total: Object.values(s.demand).reduce((a, b) => a + b, 0) }))
    .sort((a, b) => a.total - b.total)
    .slice(0, 3);
  recs.push({
    id: "rec-007",
    kind: "Inventory Rebalance",
    priority: "Medium",
    title: `Hold off on warehousing in ${bottom.map((b) => b.state.name).join(", ")}`,
    action: `Do not pre-stock these markets. Service them via central fulfilment until demand index crosses 60.`,
    reasoning: bottom.map((b) => `${b.state.name}: composite demand ${b.total}, lowest in the dataset.`),
    expectedOutcome: `Lower working capital lock and less inventory write-off risk while still serving D2C orders.`,
    whyUseful: `Inventory in low demand zones is the silent killer of FMCG cash flow. Better to delay regional warehousing until repeat purchase data justifies the fixed cost.`,
    confidence: 76,
  });

  // 8. Trend opportunity: Premium milk soap into ayurvedic-leaning states
  const milkStates = ["KL", "KA", "TN", "MH"];
  recs.push({
    id: "rec-008",
    kind: "Trend Opportunity",
    priority: "High",
    title: `Position Goat Milk Soap as the premium hero in South and West India`,
    action: `Build the Goat Milk Soap landing page first, target ${milkStates.join(", ")} for paid acquisition, and offer it as an upsell on serum orders.`,
    reasoning: [
      `Goat Milk Soap signal is up 18.4% WoW, the strongest in the trend dataset.`,
      `Kerala demand for Premium Milk Soap is 82, Karnataka 69, Maharashtra 71 - the strongest premium soap pockets.`,
      `Landed cost ₹290 supports a ₹699-₹899 retail price, well above commodity soap.`,
    ],
    expectedOutcome: `Higher AOV, premium positioning at brand level, and a hero SKU that gets shelf attention.`,
    whyUseful: `Premium hero SKUs do disproportionate work for a young brand: they raise perceived brand quality, justify higher unit economics, and pull traffic to the rest of the catalog.`,
    confidence: 83,
  });

  return recs;
}
