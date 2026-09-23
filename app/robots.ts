import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
export default function robots(): MetadataRoute.Robots { return { rules: [{ userAgent: "*", allow: "/", disallow: ["/operator", "/api/"] }], sitemap: `${siteConfig.domain}/sitemap.xml` }; }
