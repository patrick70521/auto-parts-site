export const site = {
  name: "Asia Pacific Trading",
  shortName: "APT",
  tagline: "Replacement auto parts, sourcing, and fitment support",
  description:
    "Asia Pacific Trading helps customers source dependable replacement auto parts, including lighting, exterior body components, engine parts, cooling parts, suspension parts, and daily repair essentials.",
  website: "https://www.asia-pacifictrading.com",
  email: "patrick@asia-pacifictrading.com",
  phone: "(732) 496-2059",
  address: {
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  },
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/categories/vehicle-lighting", label: "Lighting" },
    { href: "/categories/exterior-body-parts", label: "Body Parts" },
    { href: "/categories/drivetrain-engine", label: "Engine" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  utilityLinks: [
    { href: "/contact", label: "Track Order" },
    { href: "/policies/returns", label: "Returns" },
    { href: "/contact", label: "Contact Us" },
  ],
  trustPoints: [
    {
      title: "Replacement Parts",
      description:
        "Lighting, body, engine, cooling, suspension, and accessory parts for common repair needs.",
    },
    {
      title: "Fitment Support",
      description:
        "Send your year, make, model, and part details so we can help confirm the right match.",
    },
    {
      title: "Quote-Based Orders",
      description: "Request current availability and pricing before placing an order.",
    },
    {
      title: "Business Friendly",
      description: "Built for repair shops, resellers, and repeat sourcing requests.",
    },
  ],
} as const;

export function getFullAddress() {
  const { street, city, state, zip, country } = site.address;
  const line2 = [city, state, zip].filter(Boolean).join(", ");
  return [street, line2, country].filter(Boolean).join(" — ");
}
