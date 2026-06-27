// Trend signals aggregated from marketplace + IndiaMART/JustDial listing growth.
// Direction: "up" = trending, "down" = declining, "flat" = stable.
// Values are illustrative for the prototype.

export type TrendDirection = "up" | "down" | "flat";

export type TrendRow = {
  signal: string;            // formulation / claim / product type
  relatedCategory: string;
  direction: TrendDirection;
  delta: number;             // % WoW change
  amazon: number;            // 0–100 traction index
  flipkart: number;
  quickCommerce: number;
  indiamart: number;
};

export const trends: TrendRow[] = [
  // Trending up
  { signal: "Vitamin C Face Serum",          relatedCategory: "Face Serum",        direction: "up",   delta: 14.2, amazon: 92, flipkart: 84, quickCommerce: 76, indiamart: 71 },
  { signal: "Niacinamide Serum",             relatedCategory: "Face Serum",        direction: "up",   delta: 11.7, amazon: 90, flipkart: 82, quickCommerce: 70, indiamart: 66 },
  { signal: "Kumkumadi / Ayurvedic Serum",   relatedCategory: "Face Serum",        direction: "up",   delta: 9.6,  amazon: 78, flipkart: 71, quickCommerce: 55, indiamart: 80 },
  { signal: "Goat Milk Soap",                relatedCategory: "Premium Milk Soap", direction: "up",   delta: 18.4, amazon: 81, flipkart: 76, quickCommerce: 60, indiamart: 84 },
  { signal: "Cold Process Soap (Vegan)",     relatedCategory: "Cold Process Soap", direction: "up",   delta: 12.1, amazon: 74, flipkart: 69, quickCommerce: 52, indiamart: 79 },
  { signal: "Aloe Vera Gel (Pure)",          relatedCategory: "Aloe Vera Gel",     direction: "up",   delta: 6.8,  amazon: 85, flipkart: 80, quickCommerce: 78, indiamart: 72 },
  { signal: "Lip Butter / Tinted Lip",       relatedCategory: "Lip Care",          direction: "up",   delta: 8.3,  amazon: 79, flipkart: 73, quickCommerce: 68, indiamart: 58 },
  { signal: "Rose Water Mist",               relatedCategory: "Facial Mist",       direction: "up",   delta: 5.2,  amazon: 76, flipkart: 72, quickCommerce: 70, indiamart: 65 },

  // Flat
  { signal: "Standard Hyaluronic Acid Serum", relatedCategory: "Face Serum",      direction: "flat", delta: 0.4,  amazon: 70, flipkart: 66, quickCommerce: 62, indiamart: 58 },
  { signal: "Cucumber Mist",                  relatedCategory: "Facial Mist",     direction: "flat", delta: -0.6, amazon: 58, flipkart: 54, quickCommerce: 51, indiamart: 50 },
  { signal: "Adult Cold Process Soap",        relatedCategory: "Cold Process Soap", direction: "flat", delta: 1.1,  amazon: 64, flipkart: 60, quickCommerce: 53, indiamart: 67 },

  // Declining
  { signal: "Parabens-based Lip Balm",        relatedCategory: "Lip Care",        direction: "down", delta: -7.4, amazon: 38, flipkart: 36, quickCommerce: 30, indiamart: 42 },
  { signal: "Synthetic Fragrance Mist",       relatedCategory: "Facial Mist",     direction: "down", delta: -5.9, amazon: 41, flipkart: 39, quickCommerce: 34, indiamart: 44 },
  { signal: "Generic Glycerin Soap",          relatedCategory: "Cold Process Soap", direction: "down", delta: -8.6, amazon: 36, flipkart: 34, quickCommerce: 28, indiamart: 46 },
  { signal: "Mineral Oil Aloe Gel",           relatedCategory: "Aloe Vera Gel",   direction: "down", delta: -6.2, amazon: 40, flipkart: 37, quickCommerce: 32, indiamart: 41 },
];
