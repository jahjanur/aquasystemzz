#!/usr/bin/env node
// Scrapes Setec.mk air-conditioner category into src/lib/data/setec-products.json.
// Usage: node scripts/scrape-setec.mjs [--max=200] [--maxPages=12] [--minPrice=12000]
//
// We are an authorised Setec partner and use this for our showroom catalogue.

import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../src/lib/data/setec-products.json");

const argv = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);
const MAX_PAGES = Number(argv.maxPages ?? 12);
const MAX_ITEMS = Number(argv.max ?? 240);
const MIN_PRICE_MKD = Number(argv.minPrice ?? 12000);

const BASE = "https://setec.mk";
const CATEGORIES = [{ slug: "klimatizeri-170", category: "split" }];

const ACCESSORY_RX =
  /(filter|filtri|dalecinski|wifi[-\s]?(stick|module)|remote|set\s*za\s*mont|kabel|cable|drainage|holder|bracket|cleaner|spray|pumpa)/i;

const KNOWN_BRANDS = [
  "Daikin",
  "Mitsubishi Electric",
  "Mitsubishi",
  "Toshiba",
  "Panasonic",
  "LG",
  "Samsung",
  "Gree",
  "Vivax",
  "Midea",
  "Hisense",
  "Bosch",
  "Beko",
  "Sharp",
  "Haier",
  "Inventor",
  "Sinclair",
  "Tesla",
  "Whirlpool",
  "Cooper&Hunter",
  "ST",
];

function slugify(s) {
  return s
    .toString()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .toLowerCase()
    .slice(0, 80);
}

function parsePrice(text) {
  if (!text) return null;
  const m = text.match(/(\d[\d.,\s]+)/);
  if (!m) return null;
  // MKD prices have no decimals; both "," and "." used as thousand separator
  const digits = m[1].replace(/[.,\s]/g, "");
  const num = Number.parseInt(digits, 10);
  return Number.isFinite(num) ? num : null;
}

function pickBrand(name) {
  if (!name) return "ST";
  for (const b of KNOWN_BRANDS) {
    const re = new RegExp(`\\b${b.replace(/[&]/g, "\\$&")}\\b`, "i");
    if (re.test(name)) return b;
  }
  return name.split(/\s+/)[0];
}

function detectBtu(text) {
  if (!text) return 0;
  const t = text.toUpperCase();
  const direct = t.match(/(\d{4,6})\s*BTU/);
  if (direct) return Number(direct[1]);
  // model codes like TAC-12SOO, PACH-O09CHTW, FTXM25R, MSZ-LN35VG2,
  // FTXC50, MSAFBU-09HRDN8, GWH09AGB, CS-Z25XKEW
  // Look for 2-digit BTU indicator: 07/09/12/18/24/30/36
  const codeMatches = [...t.matchAll(/(?<![\d])(07|09|12|18|24|26|30|36|42|48|50|56|60|68|71)(?![\d])/g)];
  if (codeMatches.length) {
    // pick the FIRST plausible match that's near a model-code character
    return Number(codeMatches[0][1]) * 1000;
  }
  const kw = t.match(/(\d{1,2})[.,](\d{1,3})\s*KW/);
  if (kw) return Math.round((Number(kw[1]) + Number("0." + kw[2])) * 3412);
  return 0;
}

function detectEnergy(text) {
  if (!text) return null;
  const m = text.match(/A\+{1,3}/);
  return m ? m[0] : null;
}

const ROOM_FROM_BTU = (btu) => {
  if (!btu) return [20, 40];
  if (btu <= 9500) return [15, 25];
  if (btu <= 13000) return [25, 40];
  if (btu <= 19000) return [40, 60];
  if (btu <= 25000) return [60, 90];
  if (btu <= 36000) return [90, 140];
  return [140, 240];
};

const collected = new Map();

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
  viewport: { width: 1440, height: 1000 },
  locale: "mk-MK",
});
const page = await ctx.newPage();

for (const cat of CATEGORIES) {
  for (let p = 1; p <= MAX_PAGES; p++) {
    if (collected.size >= MAX_ITEMS) break;
    const url = `${BASE}/category/${cat.slug}?page=${p}`;
    process.stdout.write(`\n→ ${cat.slug} page ${p}\n`);
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForSelector('a[href^="/products/"]', { timeout: 10000 });
    } catch (e) {
      console.warn(`  fail: ${e.message}`);
      continue;
    }

    for (let y = 0; y < 8; y++) {
      await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.8));
      await page.waitForTimeout(350);
    }
    await page.waitForTimeout(700);

    const items = await page.evaluate(() => {
      const grid = document.querySelector('div.grid[class*="grid-cols-4"]');
      if (!grid) return [];
      const out = [];
      const cards = Array.from(grid.children);
      const seen = new Set();
      for (const card of cards) {
        const link = card.querySelector('a[href^="/products/"]');
        if (!link) continue;
        const href = link.getAttribute("href") || "";
        if (seen.has(href)) continue;
        seen.add(href);
        // Product image is the one whose alt is NOT a "Badge"
        let title = "";
        let imgSrc = "";
        for (const img of card.querySelectorAll("img")) {
          const alt = img.getAttribute("alt") || "";
          if (!alt || /^badge$/i.test(alt) || /badge/i.test(img.className || "")) continue;
          title = alt.trim();
          // Pull a high-res variant from the srcset if available
          const srcset = img.getAttribute("srcset") || "";
          const cands = srcset.split(",").map((s) => s.trim().split(" "));
          let best = "";
          let bestW = 0;
          for (const [u, w] of cands) {
            const ww = parseInt(w || "0", 10);
            if (ww > bestW) {
              bestW = ww;
              best = u;
            }
          }
          imgSrc = best || img.getAttribute("src") || "";
          break;
        }
        if (!title) continue;
        const text = card.textContent?.replace(/\s+/g, " ").trim() ?? "";
        const regular = text.match(
          /Редовна\s*цена[:\s]*([\d.,\s]+)\s*(?:ден|MKD|den)/i,
        );
        const club = text.match(/Клуб\s*цена[:\s]*([\d.,\s]+)\s*(?:ден|MKD|den)/i);
        const promoOnly = text.match(/(\d{1,3}(?:[.,\s]\d{3})+)\s*ден/);
        const priceText = (regular?.[1] || club?.[1] || promoOnly?.[1] || "").trim();
        const sku = (text.match(/Шифра[:\s]*([0-9]+)/) || [, ""])[1];
        out.push({ href, title, imgSrc, priceText, sku, debug: text.slice(0, 200) });
      }
      return out;
    });

    process.stdout.write(`  ${items.length} cards\n`);
    if (items.length === 0) break;

    for (const it of items) {
      if (collected.size >= MAX_ITEMS) break;
      if (ACCESSORY_RX.test(it.title)) continue;
      const url = `${BASE}${it.href}`;
      if (collected.has(url)) continue;
      const brand = pickBrand(it.title);
      const btu = detectBtu(it.title);
      const energy = detectEnergy(it.title) || detectEnergy(it.debug) || "A++";
      const priceMkd = parsePrice(it.priceText);
      if (!priceMkd || priceMkd < MIN_PRICE_MKD) continue;
      if (!btu) continue; // skip non-AC items
      const priceEur = Math.round(priceMkd / 61.5);
      const slug = slugify(it.href.replace("/products/", "")) || slugify(it.title);
      collected.set(url, {
        slug,
        url,
        sku: it.sku || null,
        name: it.title,
        brand,
        category: cat.category,
        capacityBtu: btu,
        roomSizeM2: ROOM_FROM_BTU(btu),
        energyClass: energy,
        priceMkd,
        priceFromEur: priceEur,
        image: it.imgSrc || null,
      });
    }
  }
}

await browser.close();

const products = Array.from(collected.values());
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(products, null, 2));
console.log(`\n✓ Saved ${products.length} products → ${OUT}`);
