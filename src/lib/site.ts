// Single source of truth for the public domain and business identity (NAP).
// Used by metadata, sitemap, robots and structured data so they never drift.

export const SITE_URL = "https://aquasystemzz.com";

export const business = {
  name: "Akva System ZZ",
  legalName: "Akva System ZZ",
  // Short, human description reused in Organization schema.
  description:
    "Design, installation and service of premium air-conditioning, heating and ventilation systems in Gostivar, Tetovo and across the Polog region of North Macedonia.",
  telephone: "+38978433882",
  telephoneDisplay: "078 433 882",
  email: "info@akvasystem.mk",
  logo: `${SITE_URL}/AkvaSistemZZLogo.svg`,
  address: {
    street: "Brakja Blazhevski 9",
    locality: "Gostivar",
    region: "Polog",
    postalCode: "1230",
    country: "MK",
  },
  geo: { lat: 41.8006, lng: 20.9086 },
  // Municipalities we actively serve — the core of the local-SEO signal.
  areaServed: ["Gostivar", "Tetovo", "Mavrovo", "Vrapchishte", "Bogovinje", "Polog"],
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "18:00",
  },
  priceRange: "€€",
  rating: { value: "4.9", count: "200" },
  sameAs: [] as string[], // add Facebook / Instagram / Google Business URLs when available
} as const;
