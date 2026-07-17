import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { blogPosts } from "@/data/blog";
import { SITE } from "@/lib/constants";

const staticPaths = [
  "",
  "/about",
  "/services",
  "/solutions",
  "/portfolio",
  "/pricing",
  "/blog",
  "/faq",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["vi", "de"] as const;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${SITE.url}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }
    for (const s of services) {
      entries.push({
        url: `${SITE.url}/${locale}/services/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
    for (const i of industries) {
      entries.push({
        url: `${SITE.url}/${locale}/solutions/${i.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.75,
      });
    }
    for (const p of blogPosts) {
      entries.push({
        url: `${SITE.url}/${locale}/blog/${p.slug}`,
        lastModified: new Date(p.date),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
