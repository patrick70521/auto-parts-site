export type Subcategory = {
  name: string;
  slug: string;
};

export type Category = {
  name: string;
  slug: string;
  description: string;
  subcategories: Subcategory[];
};

export const categories: Category[] = [
  {
    name: "Vehicle Lighting",
    slug: "vehicle-lighting",
    description:
      "Replacement lighting components to keep your vehicle visible and safe on the road.",
    subcategories: [
      { name: "Headlights", slug: "headlights" },
      { name: "Tail Lights", slug: "tail-lights" },
      { name: "Corner Lights", slug: "corner-lights" },
      { name: "Fog Lights", slug: "fog-lights" },
      { name: "Performance Lights", slug: "performance-lights" },
      { name: "Reflectors & Signals", slug: "reflectors-signals" },
      { name: "Other Accessories", slug: "lighting-accessories" },
    ],
  },
  {
    name: "Exterior Body Parts",
    slug: "exterior-body-parts",
    description:
      "Restore your vehicle's exterior with mirrors, bumpers, fenders, and more.",
    subcategories: [
      { name: "Side Mirrors", slug: "side-mirrors" },
      { name: "Door Handles", slug: "door-handles" },
      { name: "Tailgate Handles", slug: "tailgate-handles" },
      { name: "Window Regulators", slug: "window-regulators" },
      { name: "Bumpers", slug: "bumpers" },
      { name: "Fenders", slug: "fenders" },
      { name: "Fender Liners", slug: "fender-liners" },
    ],
  },
  {
    name: "Drivetrain & Engine",
    slug: "drivetrain-engine",
    description:
      "Engine and drivetrain components to keep your vehicle running reliably.",
    subcategories: [
      { name: "Alternators", slug: "alternators" },
      { name: "Blower Motors", slug: "blower-motors" },
      { name: "Cabin Air Filters", slug: "cabin-air-filters" },
      { name: "Evaporator Cores", slug: "evaporator-cores" },
      { name: "Fuel Pumps", slug: "fuel-pumps" },
      { name: "Water Pumps", slug: "water-pumps" },
      { name: "Starters", slug: "starters" },
      { name: "Timing Belts", slug: "timing-belts" },
      { name: "Timing Belt Tensioners", slug: "timing-belt-tensioners" },
      { name: "Universal Joints", slug: "universal-joints" },
    ],
  },
  {
    name: "Cooling System",
    slug: "cooling-system",
    description:
      "Radiators, fans, and condensers to maintain optimal engine temperature.",
    subcategories: [
      { name: "Engine Cooling Fan Clutches", slug: "cooling-fan-clutches" },
      { name: "Condensers", slug: "condensers" },
      { name: "Cooling Fans", slug: "cooling-fans" },
      { name: "Intercoolers", slug: "intercoolers" },
      { name: "Radiators", slug: "radiators" },
    ],
  },
  {
    name: "Suspension & Steering",
    slug: "suspension-steering",
    description:
      "Shocks, struts, and wheel components for a smooth, controlled ride.",
    subcategories: [
      { name: "Shock Absorbers", slug: "shock-absorbers" },
      { name: "Struts", slug: "struts" },
      { name: "Wheel Hubs", slug: "wheel-hubs" },
      { name: "Wheel Bearings", slug: "wheel-bearings" },
    ],
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Practical add-ons and accessories for everyday driving comfort.",
    subcategories: [{ name: "Floor Mats", slug: "floor-mats" }],
  },
];

export const partCategoryOptions = categories.flatMap((category) =>
  category.subcategories.map((sub) => ({
    value: sub.slug,
    label: sub.name,
    categorySlug: category.slug,
  })),
);

export const vehicleYears = Array.from({ length: 35 }, (_, i) =>
  String(new Date().getFullYear() - i),
);

export const vehicleMakes = [
  "Acura",
  "Audi",
  "BMW",
  "Chevrolet",
  "Dodge",
  "Ford",
  "Honda",
  "Hyundai",
  "Jeep",
  "Kia",
  "Lexus",
  "Mazda",
  "Mercedes-Benz",
  "Nissan",
  "Ram",
  "Subaru",
  "Toyota",
  "Volkswagen",
];

export const vehicleModels: Record<string, string[]> = {
  Acura: ["ILX", "MDX", "RDX", "TLX"],
  Audi: ["A3", "A4", "A6", "Q5", "Q7"],
  BMW: ["3 Series", "5 Series", "X3", "X5"],
  Chevrolet: ["Camaro", "Equinox", "Malibu", "Silverado", "Tahoe"],
  Dodge: ["Challenger", "Charger", "Durango", "Ram 1500"],
  Ford: ["Escape", "Explorer", "F-150", "Focus", "Mustang"],
  Honda: ["Accord", "Civic", "CR-V", "Pilot"],
  Hyundai: ["Elantra", "Santa Fe", "Sonata", "Tucson"],
  Jeep: ["Cherokee", "Compass", "Grand Cherokee", "Wrangler"],
  Kia: ["Forte", "Optima", "Sorento", "Sportage"],
  Lexus: ["ES", "IS", "NX", "RX"],
  Mazda: ["CX-5", "Mazda3", "Mazda6"],
  "Mercedes-Benz": ["C-Class", "E-Class", "GLC", "GLE"],
  Nissan: ["Altima", "Maxima", "Rogue", "Sentra", "Titan"],
  Ram: ["1500", "2500", "3500"],
  Subaru: ["Crosstrek", "Forester", "Impreza", "Outback"],
  Toyota: ["Camry", "Corolla", "Highlander", "RAV4", "Tacoma"],
  Volkswagen: ["Atlas", "Golf", "Jetta", "Passat"],
};

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return categories.map((category) => category.slug);
}
