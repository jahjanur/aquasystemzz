#!/usr/bin/env node
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
  viewport: { width: 1440, height: 1000 },
  locale: "mk-MK",
});
const page = await ctx.newPage();

await page.goto(
  "https://setec.mk/category/klimatizeri-170?sort=Најевтино&page=1",
  { waitUntil: "networkidle", timeout: 60000 },
);
for (let i = 0; i < 6; i++) {
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.8));
  await page.waitForTimeout(500);
}
await page.waitForTimeout(1500);

const summary = await page.evaluate(() => {
  // Group anchors by their pathname prefix to discover the URL pattern.
  const out = { hrefSamples: [], urlPrefixes: {} };
  const anchors = Array.from(document.querySelectorAll("a"));
  for (const a of anchors) {
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("javascript:")) continue;
    const path = href.split("?")[0].split("#")[0];
    const prefix = "/" + path.split("/").filter(Boolean).slice(0, 1).join("/");
    out.urlPrefixes[prefix] = (out.urlPrefixes[prefix] || 0) + 1;
  }
  // First 20 distinct hrefs that aren't tiny
  const seen = new Set();
  for (const a of anchors) {
    const href = a.getAttribute("href");
    if (!href) continue;
    if (seen.has(href)) continue;
    seen.add(href);
    if (out.hrefSamples.length < 30) out.hrefSamples.push(href);
  }
  // Detect article/grid container with many similar children
  const candidates = ["article", "[class*='product' i]", "[class*='card' i]", "[class*='item' i]"];
  out.candidateCounts = {};
  for (const sel of candidates) out.candidateCounts[sel] = document.querySelectorAll(sel).length;
  // grid-like elements
  const gridLike = Array.from(document.querySelectorAll("ul, div"))
    .filter((el) => el.children.length >= 6 && el.children.length <= 60)
    .slice(0, 5)
    .map((el) => ({
      tag: el.tagName,
      className: (el.className || "").toString().slice(0, 200),
      children: el.children.length,
      firstChildTag: el.firstElementChild?.tagName,
      firstChildHref:
        el.firstElementChild?.querySelector?.("a")?.getAttribute("href") ?? null,
    }));
  out.gridLike = gridLike;
  return out;
});

console.log(JSON.stringify(summary, null, 2));
writeFileSync("/tmp/setec-dom.html", await page.content());
console.log("\nDOM dumped to /tmp/setec-dom.html");

await browser.close();
