import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { locales } from "@/lib/i18n/config";
import { products } from "@/lib/data/products";
import { blogPosts } from "@/lib/data/blog";

// Required for `output: export` — emit sitemap.xml as a static file at build.
export const dynamic = "force-static";

// Static export generates /sitemap.xml at build. Every URL carries hreflang
// alternates so Google serves the right language per region.
const languagesFor = (path: string) =>
  Object.fromEntries(
    locales.map((l) => [l, `${SITE_URL}/${l}/${path ? `${path}/` : ""}`]),
  );

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const staticPaths: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "services", priority: 0.7, freq: "monthly" },
    { path: "products", priority: 0.8, freq: "weekly" },
    { path: "blog", priority: 0.8, freq: "weekly" },
    { path: "about", priority: 0.5, freq: "yearly" },
    { path: "contact", priority: 0.6, freq: "yearly" },
  ];

  for (const { path, priority, freq } of staticPaths) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}/${path ? `${path}/` : ""}`,
        changeFrequency: freq,
        priority,
        alternates: { languages: languagesFor(path) },
      });
    }
  }

  for (const p of products) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}/products/${p.slug}/`,
        changeFrequency: "weekly",
        priority: 0.6,
        alternates: { languages: languagesFor(`products/${p.slug}`) },
      });
    }
  }

  for (const post of blogPosts) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}/`,
        lastModified: post.updatedAt,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: languagesFor(`blog/${post.slug}`) },
      });
    }
  }

  return entries;
}
