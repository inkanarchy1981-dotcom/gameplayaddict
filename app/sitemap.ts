import type { MetadataRoute } from "next";
import { contentRepository } from "@/lib/repository";
import { siteConfig } from "@/site.config";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteConfig.domain, lastModified: "2026-08-30", changeFrequency: "daily", priority: 1 }, ...contentRepository.indexable().map((record) => ({ url: `${siteConfig.domain}/${record.slug}`, lastModified: record.updatedAt, changeFrequency: "weekly" as const, priority: record.family === "core" ? .9 : .7 }))];
}
