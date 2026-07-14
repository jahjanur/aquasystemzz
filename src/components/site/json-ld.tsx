import { SITE_URL, business } from "@/lib/site";

// Renders a JSON-LD <script>. Server component — no client JS shipped.
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, build-time content — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const businessId = `${SITE_URL}/#business`;

// HVACBusiness (a LocalBusiness subtype) — the core local-SEO signal for
// "best HVAC company in Gostivar / Tetovo", "klimi Gostivar", etc.
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": businessId,
    name: business.name,
    legalName: business.legalName,
    description: business.description,
    url: SITE_URL,
    logo: business.logo,
    image: business.logo,
    telephone: business.telephone,
    email: business.email,
    priceRange: business.priceRange,
    currenciesAccepted: "MKD",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    areaServed: business.areaServed.map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: business.openingHours.days,
        opens: business.openingHours.opens,
        closes: business.openingHours.closes,
      },
    ],
    knowsAbout: [
      "Air conditioning",
      "Inverter air conditioners",
      "Heat pumps",
      "Ventilation systems",
      "VRF systems",
      "HVAC installation",
      "HVAC service",
    ],
    ...(business.sameAs.length ? { sameAs: business.sameAs } : {}),
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: business.name,
    inLanguage: ["mk", "sq", "en", "de"],
    publisher: { "@id": businessId },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function productSchema(p: {
  name: string;
  brand: string;
  sku: string | null;
  image: string | null;
  category: string;
  priceMkd: number;
  url: string;
  energyClass: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    sku: p.sku ?? undefined,
    category: p.category,
    ...(p.image ? { image: p.image.startsWith("http") ? p.image : `${SITE_URL}${p.image}` } : {}),
    brand: { "@type": "Brand", name: p.brand },
    offers: {
      "@type": "Offer",
      priceCurrency: "MKD",
      price: p.priceMkd,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}${p.url}`,
      seller: { "@id": businessId },
    },
  };
}

export function articleSchema(a: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  inLanguage: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.headline,
    description: a.description,
    inLanguage: a.inLanguage,
    datePublished: a.datePublished,
    dateModified: a.dateModified,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${a.url}` },
    author: { "@id": businessId },
    publisher: { "@id": businessId },
  };
}
