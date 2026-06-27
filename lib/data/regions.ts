// Indian states with simulated demand index per Goldbees category.
// Demand index: 0–100, derived from a composite of marketplace listings,
// Google Trends interest, quick-commerce availability, and IndiaMART / JustDial
// distributor density. Values are illustrative for the prototype.

export type Region = "North" | "South" | "East" | "West" | "Central" | "North-East";
export type Tier = "Metro" | "Tier-1" | "Tier-2" | "Tier-3";

export type StateRow = {
  code: string;
  name: string;
  region: Region;
  topCity: string;
  topCityTier: Tier;
  populationMn: number;
  demand: {
    "Face Serum": number;
    "Facial Mist": number;
    "Lip Care": number;
    "Aloe Vera Gel": number;
    "Cold Process Soap": number;
    "Premium Milk Soap": number;
  };
};

export const states: StateRow[] = [
  { code: "MH", name: "Maharashtra",      region: "West",       topCity: "Mumbai",      topCityTier: "Metro",  populationMn: 124,
    demand: { "Face Serum": 92, "Facial Mist": 88, "Lip Care": 81, "Aloe Vera Gel": 74, "Cold Process Soap": 79, "Premium Milk Soap": 71 } },
  { code: "KA", name: "Karnataka",        region: "South",      topCity: "Bengaluru",   topCityTier: "Metro",  populationMn: 67,
    demand: { "Face Serum": 89, "Facial Mist": 82, "Lip Care": 76, "Aloe Vera Gel": 78, "Cold Process Soap": 84, "Premium Milk Soap": 69 } },
  { code: "DL", name: "Delhi NCR",        region: "North",      topCity: "Delhi",       topCityTier: "Metro",  populationMn: 33,
    demand: { "Face Serum": 95, "Facial Mist": 86, "Lip Care": 88, "Aloe Vera Gel": 70, "Cold Process Soap": 72, "Premium Milk Soap": 77 } },
  { code: "TN", name: "Tamil Nadu",       region: "South",      topCity: "Chennai",     topCityTier: "Metro",  populationMn: 77,
    demand: { "Face Serum": 78, "Facial Mist": 74, "Lip Care": 68, "Aloe Vera Gel": 85, "Cold Process Soap": 80, "Premium Milk Soap": 64 } },
  { code: "TS", name: "Telangana",        region: "South",      topCity: "Hyderabad",   topCityTier: "Metro",  populationMn: 38,
    demand: { "Face Serum": 81, "Facial Mist": 76, "Lip Care": 72, "Aloe Vera Gel": 73, "Cold Process Soap": 71, "Premium Milk Soap": 66 } },
  { code: "WB", name: "West Bengal",      region: "East",       topCity: "Kolkata",     topCityTier: "Metro",  populationMn: 99,
    demand: { "Face Serum": 71, "Facial Mist": 64, "Lip Care": 70, "Aloe Vera Gel": 62, "Cold Process Soap": 68, "Premium Milk Soap": 58 } },
  { code: "GJ", name: "Gujarat",          region: "West",       topCity: "Ahmedabad",   topCityTier: "Tier-1", populationMn: 70,
    demand: { "Face Serum": 73, "Facial Mist": 68, "Lip Care": 64, "Aloe Vera Gel": 72, "Cold Process Soap": 75, "Premium Milk Soap": 61 } },
  { code: "KL", name: "Kerala",           region: "South",      topCity: "Kochi",       topCityTier: "Tier-1", populationMn: 35,
    demand: { "Face Serum": 76, "Facial Mist": 70, "Lip Care": 67, "Aloe Vera Gel": 88, "Cold Process Soap": 86, "Premium Milk Soap": 82 } },
  { code: "UP", name: "Uttar Pradesh",    region: "North",      topCity: "Lucknow",     topCityTier: "Tier-1", populationMn: 230,
    demand: { "Face Serum": 64, "Facial Mist": 55, "Lip Care": 60, "Aloe Vera Gel": 67, "Cold Process Soap": 71, "Premium Milk Soap": 54 } },
  { code: "RJ", name: "Rajasthan",        region: "North",      topCity: "Jaipur",      topCityTier: "Tier-1", populationMn: 80,
    demand: { "Face Serum": 62, "Facial Mist": 58, "Lip Care": 57, "Aloe Vera Gel": 64, "Cold Process Soap": 66, "Premium Milk Soap": 60 } },
  { code: "PB", name: "Punjab",           region: "North",      topCity: "Chandigarh",  topCityTier: "Tier-1", populationMn: 30,
    demand: { "Face Serum": 70, "Facial Mist": 63, "Lip Care": 66, "Aloe Vera Gel": 65, "Cold Process Soap": 74, "Premium Milk Soap": 67 } },
  { code: "HR", name: "Haryana",          region: "North",      topCity: "Gurugram",    topCityTier: "Tier-1", populationMn: 30,
    demand: { "Face Serum": 74, "Facial Mist": 67, "Lip Care": 69, "Aloe Vera Gel": 62, "Cold Process Soap": 70, "Premium Milk Soap": 64 } },
  { code: "MP", name: "Madhya Pradesh",   region: "Central",    topCity: "Indore",      topCityTier: "Tier-1", populationMn: 85,
    demand: { "Face Serum": 58, "Facial Mist": 52, "Lip Care": 54, "Aloe Vera Gel": 60, "Cold Process Soap": 63, "Premium Milk Soap": 49 } },
  { code: "BR", name: "Bihar",            region: "East",       topCity: "Patna",       topCityTier: "Tier-2", populationMn: 124,
    demand: { "Face Serum": 47, "Facial Mist": 41, "Lip Care": 45, "Aloe Vera Gel": 52, "Cold Process Soap": 56, "Premium Milk Soap": 38 } },
  { code: "OD", name: "Odisha",           region: "East",       topCity: "Bhubaneswar", topCityTier: "Tier-2", populationMn: 46,
    demand: { "Face Serum": 51, "Facial Mist": 46, "Lip Care": 49, "Aloe Vera Gel": 58, "Cold Process Soap": 60, "Premium Milk Soap": 42 } },
  { code: "JH", name: "Jharkhand",        region: "East",       topCity: "Ranchi",      topCityTier: "Tier-2", populationMn: 38,
    demand: { "Face Serum": 44, "Facial Mist": 39, "Lip Care": 42, "Aloe Vera Gel": 50, "Cold Process Soap": 54, "Premium Milk Soap": 36 } },
  { code: "CG", name: "Chhattisgarh",     region: "Central",    topCity: "Raipur",      topCityTier: "Tier-2", populationMn: 30,
    demand: { "Face Serum": 43, "Facial Mist": 38, "Lip Care": 41, "Aloe Vera Gel": 49, "Cold Process Soap": 52, "Premium Milk Soap": 35 } },
  { code: "AS", name: "Assam",            region: "North-East", topCity: "Guwahati",    topCityTier: "Tier-2", populationMn: 35,
    demand: { "Face Serum": 49, "Facial Mist": 44, "Lip Care": 47, "Aloe Vera Gel": 56, "Cold Process Soap": 58, "Premium Milk Soap": 41 } },
  { code: "UT", name: "Uttarakhand",      region: "North",      topCity: "Dehradun",    topCityTier: "Tier-2", populationMn: 11,
    demand: { "Face Serum": 57, "Facial Mist": 51, "Lip Care": 53, "Aloe Vera Gel": 61, "Cold Process Soap": 68, "Premium Milk Soap": 62 } },
  { code: "HP", name: "Himachal Pradesh", region: "North",      topCity: "Shimla",      topCityTier: "Tier-2", populationMn: 7,
    demand: { "Face Serum": 53, "Facial Mist": 48, "Lip Care": 50, "Aloe Vera Gel": 57, "Cold Process Soap": 65, "Premium Milk Soap": 59 } },
  { code: "GA", name: "Goa",              region: "West",       topCity: "Panaji",      topCityTier: "Tier-2", populationMn: 2,
    demand: { "Face Serum": 72, "Facial Mist": 78, "Lip Care": 71, "Aloe Vera Gel": 66, "Cold Process Soap": 73, "Premium Milk Soap": 68 } },
];

export const heatScale = (v: number) => {
  // Map 0–100 to a black/white intensity (white -> black).
  const clamped = Math.max(0, Math.min(100, v));
  const lightness = 100 - clamped * 0.9;
  return `hsl(0 0% ${lightness}%)`;
};
