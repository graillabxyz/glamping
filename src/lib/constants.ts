export const BUSINESS_CONFIG = {
  numberOfYurts: 4,
  nightlyRate: 600000,
  daysPerMonth: 30,
  fixedOperatingCosts: 18500000,
  villageSharePercent: 0.256,
  initialInvestment: 198000000,
};

export const INVESTMENT_ITEMS = [
  { name: "Yurts", quantity: 4, costPerUnit: 20000000, total: 80000000 },
  { name: "Wooden Platforms", quantity: 4, costPerUnit: 6000000, total: 24000000 },
  { name: "Queen Beds + Bedding", quantity: 4, costPerUnit: 5000000, total: 20000000 },
  { name: "Basic Interior Furnishing", quantity: 4, costPerUnit: 3000000, total: 12000000 },
  { name: "Shared Bathroom Building", quantity: 1, costPerUnit: 40000000, total: 40000000 },
  { name: "Electrical + Outdoor Lighting", quantity: 1, costPerUnit: 2000000, total: 2000000 },
  { name: "Light Landscaping + Pathways", quantity: 1, costPerUnit: 2000000, total: 2000000 },
  { name: "Decor, Styling, and Signage", quantity: 1, costPerUnit: 3000000, total: 3000000 },
  { name: "Contingency Buffer", quantity: 1, costPerUnit: 15000000, total: 15000000 },
];

export const MONTHLY_COSTS_BREAKDOWN = [
  { name: "Staff overhead", cost: 12000000 },
  { name: "Electricity", cost: 1500000 },
  { name: "Laundry, guest supplies, internet", cost: 3000000 },
  { name: "Maintenance reserve", cost: 2000000 },
];

export const EXPANSION_PLAN = {
  title: "Phase 2: Forest Kitchen & Lounge",
  description: "Planned for once the initial project is stable (target: 12 months). This 8x8m wooden structure with a simple central kitchen will serve local organic food to guests and visitors, increasing village revenue.",
  timeline: "Month 12 - 18",
  estimatedCost: 85000000,
};
