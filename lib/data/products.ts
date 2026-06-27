// Goldbees product catalog with exact costing from client notes.
// All figures in INR.

export type Product = {
  id: string;
  category: "Face Serum" | "Facial Mist" | "Lip Care" | "Aloe Vera Gel" | "Cold Process Soap" | "Premium Milk Soap";
  name: string;
  variant?: string;
  size: string;            // e.g. "30 ml", "100 gm"
  shipWeightGm: string;    // expected shipping weight band
  costing: {
    manufacturing: number;
    primaryPackaging: number;
    monocarton: number;
    corrugated: number;
    logistics: number;
    total: number;
  };
};

export const products: Product[] = [
  // FACE SERUMS (30 ml)
  {
    id: "serum-glow",
    category: "Face Serum",
    name: "Glow Serum",
    variant: "Vitamin C + Rice Extract",
    size: "30 ml",
    shipWeightGm: "140–160",
    costing: { manufacturing: 143, primaryPackaging: 22, monocarton: 8, corrugated: 5, logistics: 18, total: 196 },
  },
  {
    id: "serum-clear",
    category: "Face Serum",
    name: "Clear Skin Serum",
    variant: "Salicylic Acid + Niacinamide",
    size: "30 ml",
    shipWeightGm: "140–160",
    costing: { manufacturing: 143, primaryPackaging: 22, monocarton: 8, corrugated: 5, logistics: 18, total: 196 },
  },
  {
    id: "serum-hydration",
    category: "Face Serum",
    name: "Hydration Serum",
    variant: "HA + Panthenol / Ceramide",
    size: "30 ml",
    shipWeightGm: "140–160",
    costing: { manufacturing: 157, primaryPackaging: 30, monocarton: 8, corrugated: 5, logistics: 10, total: 210 },
  },
  {
    id: "serum-kumkumadi",
    category: "Face Serum",
    name: "Kumkumadi Face Serum",
    size: "30 ml",
    shipWeightGm: "140–160",
    costing: { manufacturing: 187, primaryPackaging: 35, monocarton: 10, corrugated: 5, logistics: 8, total: 245 },
  },

  // FACIAL TONIC MISTS (100 ml)
  {
    id: "mist-rose",
    category: "Facial Mist",
    name: "Rose Water Mist",
    size: "100 ml",
    shipWeightGm: "180–220",
    costing: { manufacturing: 53, primaryPackaging: 20, monocarton: 7, corrugated: 5, logistics: 22, total: 107 },
  },
  {
    id: "mist-lavender",
    category: "Facial Mist",
    name: "Lavender Water Mist",
    size: "100 ml",
    shipWeightGm: "180–220",
    costing: { manufacturing: 53, primaryPackaging: 20, monocarton: 7, corrugated: 5, logistics: 22, total: 107 },
  },
  {
    id: "mist-cucumber",
    category: "Facial Mist",
    name: "Cucumber Water Mist",
    size: "100 ml",
    shipWeightGm: "180–220",
    costing: { manufacturing: 53, primaryPackaging: 20, monocarton: 7, corrugated: 5, logistics: 22, total: 107 },
  },

  // LIP CARE
  {
    id: "lip-greentea",
    category: "Lip Care",
    name: "Green Tea Lip Balm",
    size: "8–10 ml",
    shipWeightGm: "25–40",
    costing: { manufacturing: 69, primaryPackaging: 12, monocarton: 0, corrugated: 3, logistics: 10, total: 94 },
  },
  {
    id: "lip-peach",
    category: "Lip Care",
    name: "Peach Lip Balm",
    size: "8–10 ml",
    shipWeightGm: "25–40",
    costing: { manufacturing: 69, primaryPackaging: 12, monocarton: 0, corrugated: 3, logistics: 10, total: 94 },
  },
  {
    id: "lip-grapefruit",
    category: "Lip Care",
    name: "Pink Grapefruit Lip Balm",
    size: "8–10 ml",
    shipWeightGm: "25–40",
    costing: { manufacturing: 69, primaryPackaging: 12, monocarton: 0, corrugated: 3, logistics: 10, total: 94 },
  },
  {
    id: "lip-butter",
    category: "Lip Care",
    name: "Lip Butter (Premium)",
    size: "8–10 gm",
    shipWeightGm: "25–40",
    costing: { manufacturing: 102, primaryPackaging: 15, monocarton: 0, corrugated: 3, logistics: 12, total: 132 },
  },

  // ALOE VERA GEL
  {
    id: "aloe-125",
    category: "Aloe Vera Gel",
    name: "Aloe Vera Gel",
    size: "125 gm",
    shipWeightGm: "170–220",
    costing: { manufacturing: 83, primaryPackaging: 18, monocarton: 7, corrugated: 5, logistics: 20, total: 133 },
  },

  // COLD PROCESS SOAPS - 100 GM
  {
    id: "soap-kids-100",
    category: "Cold Process Soap",
    name: "Kids Soap",
    variant: "Cold Process",
    size: "100 gm",
    shipWeightGm: "120–135",
    costing: { manufacturing: 150, primaryPackaging: 10, monocarton: 10, corrugated: 4, logistics: 12, total: 186 },
  },
  {
    id: "soap-adult-100",
    category: "Cold Process Soap",
    name: "Adult Soap",
    variant: "Cold Process",
    size: "100 gm",
    shipWeightGm: "120–135",
    costing: { manufacturing: 150, primaryPackaging: 10, monocarton: 10, corrugated: 4, logistics: 12, total: 186 },
  },
  {
    id: "soap-vegan-100",
    category: "Cold Process Soap",
    name: "Vegan Soap",
    variant: "Cold Process",
    size: "100 gm",
    shipWeightGm: "120–135",
    costing: { manufacturing: 150, primaryPackaging: 10, monocarton: 10, corrugated: 4, logistics: 12, total: 186 },
  },
  {
    id: "soap-cowmilk-100",
    category: "Cold Process Soap",
    name: "Cow Milk Soap",
    variant: "Cold Process",
    size: "100 gm",
    shipWeightGm: "120–135",
    costing: { manufacturing: 150, primaryPackaging: 10, monocarton: 10, corrugated: 4, logistics: 12, total: 186 },
  },
  {
    id: "soap-buffmilk-100",
    category: "Cold Process Soap",
    name: "Buffalo Milk Soap",
    variant: "Cold Process",
    size: "100 gm",
    shipWeightGm: "120–135",
    costing: { manufacturing: 150, primaryPackaging: 10, monocarton: 10, corrugated: 4, logistics: 12, total: 186 },
  },

  // COLD PROCESS SOAPS - 25 GM (guest/sample)
  {
    id: "soap-kids-25",
    category: "Cold Process Soap",
    name: "Kids Soap",
    variant: "Cold Process - Guest Bar",
    size: "25 gm",
    shipWeightGm: "35–45",
    costing: { manufacturing: 37.5, primaryPackaging: 6, monocarton: 0, corrugated: 2, logistics: 6, total: 52 },
  },
  {
    id: "soap-adult-25",
    category: "Cold Process Soap",
    name: "Adult Soap",
    variant: "Cold Process - Guest Bar",
    size: "25 gm",
    shipWeightGm: "35–45",
    costing: { manufacturing: 37.5, primaryPackaging: 6, monocarton: 0, corrugated: 2, logistics: 6, total: 52 },
  },
  {
    id: "soap-vegan-25",
    category: "Cold Process Soap",
    name: "Vegan Soap",
    variant: "Cold Process - Guest Bar",
    size: "25 gm",
    shipWeightGm: "35–45",
    costing: { manufacturing: 37.5, primaryPackaging: 6, monocarton: 0, corrugated: 2, logistics: 6, total: 52 },
  },
  {
    id: "soap-cowmilk-25",
    category: "Cold Process Soap",
    name: "Cow Milk Soap",
    variant: "Cold Process - Guest Bar",
    size: "25 gm",
    shipWeightGm: "35–45",
    costing: { manufacturing: 37.5, primaryPackaging: 6, monocarton: 0, corrugated: 2, logistics: 6, total: 52 },
  },
  {
    id: "soap-buffmilk-25",
    category: "Cold Process Soap",
    name: "Buffalo Milk Soap",
    variant: "Cold Process - Guest Bar",
    size: "25 gm",
    shipWeightGm: "35–45",
    costing: { manufacturing: 37.5, primaryPackaging: 6, monocarton: 0, corrugated: 2, logistics: 6, total: 52 },
  },

  // PREMIUM MILK SOAPS - 100 GM
  {
    id: "soap-goat-100",
    category: "Premium Milk Soap",
    name: "Goat Milk Soap",
    size: "100 gm",
    shipWeightGm: "120–135",
    costing: { manufacturing: 250, primaryPackaging: 20, monocarton: 0, corrugated: 5, logistics: 15, total: 290 },
  },
  {
    id: "soap-donkey-100",
    category: "Premium Milk Soap",
    name: "Donkey Milk Soap",
    size: "100 gm",
    shipWeightGm: "120–135",
    costing: { manufacturing: 250, primaryPackaging: 20, monocarton: 0, corrugated: 5, logistics: 15, total: 290 },
  },

  // PREMIUM MILK SOAPS - 25 GM
  {
    id: "soap-goat-25",
    category: "Premium Milk Soap",
    name: "Goat Milk Soap",
    variant: "Guest Bar",
    size: "25 gm",
    shipWeightGm: "35–45",
    costing: { manufacturing: 62.5, primaryPackaging: 7, monocarton: 0, corrugated: 2, logistics: 7, total: 79 },
  },
  {
    id: "soap-donkey-25",
    category: "Premium Milk Soap",
    name: "Donkey Milk Soap",
    variant: "Guest Bar",
    size: "25 gm",
    shipWeightGm: "35–45",
    costing: { manufacturing: 62.5, primaryPackaging: 7, monocarton: 0, corrugated: 2, logistics: 7, total: 79 },
  },
];

export const categories = Array.from(new Set(products.map((p) => p.category)));
