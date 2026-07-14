#!/usr/bin/env node
import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newContext({ viewport: { width: 1440, height: 1000 } }).then((c) => c.newPage());
await page.goto("https://setec.mk/category/klimatizeri-170?page=2", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForSelector('a[href^="/products/"]', { timeout: 10000 });
for (let i = 0; i < 5; i++) {
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.waitForTimeout(300);
}
await page.waitForTimeout(1000);

const out = await page.evaluate(() => {
  const grid = document.querySelector('div.grid[class*="grid-cols-4"]');
  if (!grid) return { error: "no grid" };
  const cards = Array.from(grid.children).slice(0, 3);
  return cards.map((c) => ({
    outerHtml: c.outerHTML.slice(0, 2000),
    text: c.textContent?.replace(/\s+/g, " ").trim().slice(0, 400),
  }));
});

console.log(JSON.stringify(out, null, 2));
await browser.close();
