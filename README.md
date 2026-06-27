# Goldbees — Market Intelligence & Distributor Targeting

A Next.js prototype scoped strictly to the proposed solution in the client brief: turn marketplace and B2B listing signals into regional demand, distributor targeting, pricing and a forward forecast — all in a strict black-and-white interface.

**Live demo:** https://skullfire07.github.io/goldbees-market-intelligence/

## Scope

- **Data sources reflected:** Amazon, Flipkart, IndiaMART, JustDial, Quick Commerce
- **Insights surfaced:**
  - Product performance (weight, size, price range) via the catalog with exact landed costs
  - Area-wise demand trends across Indian states
  - Trending and declining products
  - Distributor targeting recommendations
  - A deterministic AI strategy engine (ranked recommendations, launch matrix, 90-day forecast, pricing model)
  - A natural-language "Ask the AI" query layer over the same data
- **UI:** strict black & white, Next.js App Router + Tailwind CSS, fully responsive

## Pages

| Path | Purpose |
| --- | --- |
| `/` | Overview dashboard — stats, top regions, trending/declining |
| `/ask` | Natural-language query engine over the full dataset |
| `/products` | Full product catalog with exact costing from client notes |
| `/demand` | Area-wise demand heatmap (state × category) |
| `/distributors` | Filterable distributor targeting list |
| `/trends` | Trending vs declining product signals across data sources |
| `/strategy` | AI strategy engine: recommendations, launch matrix, forecast, pricing |

## Data

All product entries and costing values come from the client's costing notes (face serums, mists, lip care, aloe vera gel, cold-process soaps, premium milk soaps).

Distributor, demand and trend rows are illustrative placeholders for the prototype — they will be replaced by live ingestion from IndiaMART, JustDial, Amazon, Flipkart and Quick Commerce in the production build. The prediction and query engines (`lib/ai/`) are deterministic stand-ins for the production LLM + ML pipeline; the inputs, scoring math and outputs stay the same.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

The site is statically exported (`output: "export"`) and published to GitHub Pages by the workflow in `.github/workflows/deploy.yml` on every push to `main`. The `basePath` in `next.config.mjs` is set to the repository name so assets resolve under `/<repo>/`.

```bash
npm run build   # emits a static site into ./out
```
