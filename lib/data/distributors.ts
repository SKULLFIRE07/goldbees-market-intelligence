// Distributor targeting recommendations.
// Sources noted as per client brief: IndiaMART, JustDial, Quick Commerce signals,
// Amazon / Flipkart seller registries. All records are illustrative for the prototype.

export type DistributorSource = "IndiaMART" | "JustDial" | "Amazon Seller" | "Flipkart Seller" | "Quick Commerce";
export type BusinessType = "Distributor" | "Super Stockist" | "Wholesaler" | "Retailer";

export type Distributor = {
  id: string;
  name: string;
  city: string;
  stateCode: string;
  type: BusinessType;
  categoryFocus: string[];
  fitScore: number;        // 0–100
  yearsActive: number;
  turnoverBand: string;    // GST turnover band
  primarySource: DistributorSource;
  gstActive: boolean;
  fssaiValid: boolean;
};

export const distributors: Distributor[] = [
  { id: "d-001", name: "Shree Skincare Distributors",  city: "Mumbai",      stateCode: "MH", type: "Distributor",     categoryFocus: ["Face Serum", "Facial Mist", "Lip Care"], fitScore: 94, yearsActive: 11, turnoverBand: "₹5–25 Cr",   primarySource: "IndiaMART",     gstActive: true,  fssaiValid: true  },
  { id: "d-002", name: "Karnataka Cosmetics Hub",      city: "Bengaluru",   stateCode: "KA", type: "Super Stockist",  categoryFocus: ["Face Serum", "Aloe Vera Gel", "Cold Process Soap"], fitScore: 91, yearsActive: 9,  turnoverBand: "₹1.5–5 Cr",  primarySource: "IndiaMART",     gstActive: true,  fssaiValid: true  },
  { id: "d-003", name: "Delhi Beauty Wholesale",       city: "Delhi",       stateCode: "DL", type: "Wholesaler",      categoryFocus: ["Face Serum", "Lip Care", "Premium Milk Soap"], fitScore: 90, yearsActive: 14, turnoverBand: "₹5–25 Cr",   primarySource: "JustDial",      gstActive: true,  fssaiValid: true  },
  { id: "d-004", name: "Chennai Natural Care Co.",     city: "Chennai",     stateCode: "TN", type: "Distributor",     categoryFocus: ["Aloe Vera Gel", "Cold Process Soap"], fitScore: 88, yearsActive: 7,  turnoverBand: "₹40L–1.5 Cr", primarySource: "IndiaMART",     gstActive: true,  fssaiValid: true  },
  { id: "d-005", name: "Kerala Ayurveda Traders",      city: "Kochi",       stateCode: "KL", type: "Distributor",     categoryFocus: ["Aloe Vera Gel", "Cold Process Soap", "Premium Milk Soap", "Face Serum"], fitScore: 92, yearsActive: 16, turnoverBand: "₹1.5–5 Cr",  primarySource: "IndiaMART",     gstActive: true,  fssaiValid: true  },
  { id: "d-006", name: "Pune Personal Care Stockists", city: "Pune",        stateCode: "MH", type: "Super Stockist",  categoryFocus: ["Face Serum", "Facial Mist", "Lip Care"], fitScore: 86, yearsActive: 6,  turnoverBand: "₹40L–1.5 Cr", primarySource: "JustDial",      gstActive: true,  fssaiValid: true  },
  { id: "d-007", name: "Hyderabad Glow Distributors",  city: "Hyderabad",   stateCode: "TS", type: "Distributor",     categoryFocus: ["Face Serum", "Aloe Vera Gel"], fitScore: 84, yearsActive: 5,  turnoverBand: "₹40L–1.5 Cr", primarySource: "Amazon Seller", gstActive: true,  fssaiValid: false },
  { id: "d-008", name: "Kolkata Cosmetics Bazaar",     city: "Kolkata",     stateCode: "WB", type: "Wholesaler",      categoryFocus: ["Lip Care", "Facial Mist"], fitScore: 76, yearsActive: 13, turnoverBand: "₹1.5–5 Cr",  primarySource: "IndiaMART",     gstActive: true,  fssaiValid: true  },
  { id: "d-009", name: "Ahmedabad Soap Traders",       city: "Ahmedabad",   stateCode: "GJ", type: "Distributor",     categoryFocus: ["Cold Process Soap", "Premium Milk Soap"], fitScore: 80, yearsActive: 10, turnoverBand: "₹1.5–5 Cr",  primarySource: "IndiaMART",     gstActive: true,  fssaiValid: true  },
  { id: "d-010", name: "Jaipur Natural Care",          city: "Jaipur",      stateCode: "RJ", type: "Distributor",     categoryFocus: ["Cold Process Soap", "Aloe Vera Gel"], fitScore: 71, yearsActive: 8,  turnoverBand: "₹40L–1.5 Cr", primarySource: "JustDial",      gstActive: true,  fssaiValid: true  },
  { id: "d-011", name: "Lucknow Beauty Supply",        city: "Lucknow",     stateCode: "UP", type: "Wholesaler",      categoryFocus: ["Face Serum", "Lip Care"], fitScore: 68, yearsActive: 12, turnoverBand: "₹1.5–5 Cr",  primarySource: "IndiaMART",     gstActive: true,  fssaiValid: false },
  { id: "d-012", name: "Indore Personal Care Mart",    city: "Indore",      stateCode: "MP", type: "Distributor",     categoryFocus: ["Cold Process Soap", "Aloe Vera Gel"], fitScore: 64, yearsActive: 6,  turnoverBand: "₹40L–1.5 Cr", primarySource: "JustDial",      gstActive: true,  fssaiValid: true  },
  { id: "d-013", name: "Chandigarh Glow Co.",          city: "Chandigarh",  stateCode: "PB", type: "Distributor",     categoryFocus: ["Face Serum", "Premium Milk Soap"], fitScore: 73, yearsActive: 9,  turnoverBand: "₹40L–1.5 Cr", primarySource: "IndiaMART",     gstActive: true,  fssaiValid: true  },
  { id: "d-014", name: "Gurugram Skincare Stockists",  city: "Gurugram",    stateCode: "HR", type: "Super Stockist",  categoryFocus: ["Face Serum", "Lip Care"], fitScore: 78, yearsActive: 4,  turnoverBand: "₹40L–1.5 Cr", primarySource: "Flipkart Seller",gstActive: true, fssaiValid: true  },
  { id: "d-015", name: "Bhubaneswar Cosmetics",        city: "Bhubaneswar", stateCode: "OD", type: "Wholesaler",      categoryFocus: ["Cold Process Soap"], fitScore: 58, yearsActive: 7,  turnoverBand: "<40L",        primarySource: "IndiaMART",     gstActive: true,  fssaiValid: false },
  { id: "d-016", name: "Guwahati Natural Care",        city: "Guwahati",    stateCode: "AS", type: "Distributor",     categoryFocus: ["Aloe Vera Gel", "Cold Process Soap"], fitScore: 60, yearsActive: 5,  turnoverBand: "<40L",        primarySource: "JustDial",      gstActive: true,  fssaiValid: true  },
  { id: "d-017", name: "Dehradun Wellness Traders",    city: "Dehradun",    stateCode: "UT", type: "Distributor",     categoryFocus: ["Premium Milk Soap", "Cold Process Soap"], fitScore: 66, yearsActive: 6,  turnoverBand: "₹40L–1.5 Cr", primarySource: "IndiaMART",     gstActive: true,  fssaiValid: true  },
  { id: "d-018", name: "Panaji Beauty Hub",            city: "Panaji",      stateCode: "GA", type: "Retailer",        categoryFocus: ["Facial Mist", "Lip Care"], fitScore: 67, yearsActive: 4,  turnoverBand: "<40L",        primarySource: "JustDial",      gstActive: true,  fssaiValid: false },
  { id: "d-019", name: "Patna Wholesale Cosmetics",    city: "Patna",       stateCode: "BR", type: "Wholesaler",      categoryFocus: ["Cold Process Soap"], fitScore: 52, yearsActive: 8,  turnoverBand: "<40L",        primarySource: "IndiaMART",     gstActive: false, fssaiValid: false },
  { id: "d-020", name: "Raipur Cosmetics Stockists",   city: "Raipur",      stateCode: "CG", type: "Distributor",     categoryFocus: ["Aloe Vera Gel"], fitScore: 54, yearsActive: 5,  turnoverBand: "<40L",        primarySource: "JustDial",      gstActive: true,  fssaiValid: false },
  { id: "d-021", name: "Mumbai QC Network",            city: "Mumbai",      stateCode: "MH", type: "Distributor",     categoryFocus: ["Face Serum", "Lip Care", "Aloe Vera Gel"], fitScore: 89, yearsActive: 3,  turnoverBand: "₹1.5–5 Cr",  primarySource: "Quick Commerce",gstActive: true,  fssaiValid: true  },
  { id: "d-022", name: "Bengaluru QC Partner",         city: "Bengaluru",   stateCode: "KA", type: "Distributor",     categoryFocus: ["Face Serum", "Facial Mist"], fitScore: 85, yearsActive: 3,  turnoverBand: "₹1.5–5 Cr",  primarySource: "Quick Commerce",gstActive: true,  fssaiValid: true  },
];
