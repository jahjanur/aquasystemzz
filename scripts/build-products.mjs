#!/usr/bin/env node
// Reads scripts/scrape-setec output and writes:
//  - src/lib/data/setec-products.ts (typed, normalized for the app)
//  - public/products/<slug>.jpg (downloaded thumbnails)
//
// Image URLs from Setec come via their /_next/image proxy; we decode the underlying
// CDN URL and copy a single resolution to /public/products so we ship our own copy.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const IN = resolve(ROOT, "src/lib/data/setec-products.json");
const OUT_TS = resolve(ROOT, "src/lib/data/setec-products.ts");
const OUT_DIR = resolve(ROOT, "public/products");

mkdirSync(OUT_DIR, { recursive: true });

function decodeNextImage(u) {
  if (!u) return null;
  if (u.startsWith("/_next/image")) {
    const q = new URLSearchParams(u.split("?")[1] || "");
    const real = q.get("url");
    return real ? decodeURIComponent(real) : null;
  }
  return u;
}

async function downloadOne(url, dest) {
  if (existsSync(dest)) return true;
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        accept: "image/avif,image/webp,image/jpeg,image/*,*/*;q=0.8",
      },
    });
    if (!res.ok) {
      console.warn(`  ✗ ${res.status} ${url}`);
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(dest, buf);
    return true;
  } catch (e) {
    console.warn(`  ✗ ${e.message} ${url}`);
    return false;
  }
}

const raw = JSON.parse(readFileSync(IN, "utf8"));
const products = [];
let downloaded = 0;
let failed = 0;

for (const p of raw) {
  const cdnUrl = decodeNextImage(p.image);
  let extension = "jpg";
  if (cdnUrl) {
    const m = cdnUrl.match(/\.(webp|jpg|jpeg|png)(?:\?|$)/i);
    if (m) extension = m[1].toLowerCase();
  }
  const localImg = `/products/${p.slug}.${extension}`;
  const localPath = resolve(ROOT, "public" + localImg);
  if (cdnUrl) {
    const ok = await downloadOne(cdnUrl, localPath);
    if (ok) downloaded += 1;
    else failed += 1;
  }

  products.push({
    slug: p.slug,
    sku: p.sku ?? null,
    name: p.name,
    brand: p.brand,
    category: p.category,
    capacityBtu: p.capacityBtu,
    roomSizeM2: p.roomSizeM2,
    energyClass: p.energyClass,
    priceMkd: p.priceMkd,
    priceFromEur: p.priceFromEur,
    image: existsSync(localPath) ? localImg : null,
    setecUrl: p.url,
  });
}

const ts = `// Auto-generated from scripts/build-products.mjs — do not edit by hand.
// Source: setec.mk (Akva System ZZ is an authorised partner).

export type SetecProduct = {
  slug: string;
  sku: string | null;
  name: string;
  brand: string;
  category: "split" | "multisplit" | "vrf" | "heatpump" | "ventilation";
  capacityBtu: number;
  roomSizeM2: [number, number];
  energyClass: string;
  priceMkd: number;
  priceFromEur: number;
  image: string | null;
  setecUrl: string;
};

export const setecProducts: SetecProduct[] = ${JSON.stringify(products, null, 2)};
`;
writeFileSync(OUT_TS, ts);

console.log(
  `\n✓ ${products.length} products → ${OUT_TS}\n  images: ${downloaded} downloaded, ${failed} failed`,
);
