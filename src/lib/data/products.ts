import { setecProducts, type SetecProduct } from "./setec-products";

export type ProductCategory =
  | "split"
  | "multisplit"
  | "vrf"
  | "heatpump"
  | "ventilation";

export type Product = {
  slug: string;
  sku: string | null;
  name: string;
  brand: string;
  category: ProductCategory;
  capacityBtu: number;
  roomSizeM2: [number, number];
  energyClass: string;
  priceMkd: number;
  priceFromEur: number;
  image: string | null;
  features?: string[];
  highlight?: boolean;
  setecUrl?: string;
};

function deriveFeatures(p: SetecProduct): string[] {
  const out: string[] = [];
  if (/wifi/i.test(p.name)) out.push("Wi-Fi");
  if (/inv|inverter/i.test(p.name)) out.push("Inverter");
  if (/smart/i.test(p.name)) out.push("Smart");
  if (/r32/i.test(p.name)) out.push("R32");
  if (/siberia/i.test(p.name)) out.push("Cold-climate");
  if (out.length === 0) out.push(`${p.energyClass} class`);
  return out;
}

export const brands: string[] = Array.from(
  new Set(setecProducts.map((p) => p.brand)),
).sort();

// Top 8 by price → "Bestseller" highlight badge.
const HIGHLIGHT_SLUGS = new Set(
  [...setecProducts]
    .sort((a, b) => b.priceMkd - a.priceMkd)
    .slice(0, 8)
    .map((p) => p.slug),
);

export const products: Product[] = setecProducts.map((p) => ({
  ...p,
  features: deriveFeatures(p),
  highlight: HIGHLIGHT_SLUGS.has(p.slug),
}));

export const capacityBuckets = [
  { id: "9000", label: "9 000", match: (b: number) => b >= 7000 && b <= 10000 },
  { id: "12000", label: "12 000", match: (b: number) => b > 10000 && b <= 14000 },
  { id: "18000", label: "18 000", match: (b: number) => b > 14000 && b <= 22000 },
  { id: "24000", label: "24 000", match: (b: number) => b > 22000 && b <= 30000 },
  { id: "30000+", label: "30 000+", match: (b: number) => b > 30000 },
] as const;

export const roomBuckets = [
  { id: "small", label: "≤ 25 m²", match: (r: [number, number]) => r[1] <= 25 },
  { id: "medium", label: "25–60 m²", match: (r: [number, number]) => r[0] >= 20 && r[1] <= 60 },
  { id: "large", label: "60–150 m²", match: (r: [number, number]) => r[0] >= 50 && r[1] <= 160 },
  { id: "xl", label: "150 m²+", match: (r: [number, number]) => r[1] > 150 },
] as const;
