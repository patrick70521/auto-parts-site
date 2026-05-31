export type FeaturedProduct = {
  sku: string;
  name: string;
  description: string;
  price: string;
  category: string;
  tone: "headlight" | "bumper" | "pump";
};

export const featuredProducts: FeaturedProduct[] = [
  {
    sku: "APT-LT-2041",
    name: "Halogen Headlight Assembly",
    description: "Replacement headlight assemblies for sedan, SUV, and compact applications.",
    price: "Request quote",
    category: "Vehicle Lighting",
    tone: "headlight",
  },
  {
    sku: "APT-BD-1180",
    name: "Front Bumper Cover",
    description: "Exterior replacement covers, fenders, mirrors, handles, and related body parts.",
    price: "Request quote",
    category: "Exterior Body Parts",
    tone: "bumper",
  },
  {
    sku: "APT-EN-5902",
    name: "Electric Fuel Pump Module",
    description: "Fuel, cooling, starting, and drivetrain components for common service jobs.",
    price: "Request quote",
    category: "Drivetrain & Engine",
    tone: "pump",
  },
];
