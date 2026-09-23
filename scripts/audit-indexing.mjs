import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true } });

try {
  const { contentRecords } = await vite.ssrLoadModule("/lib/content.ts");
  const { canonicalRedirects, dispositionFor, removedSlugs } = await vite.ssrLoadModule("/lib/indexing.ts");
  const { default: sitemap } = await vite.ssrLoadModule("/app/sitemap.ts");
  const { default: robots } = await vite.ssrLoadModule("/app/robots.ts");
  const { siteConfig } = await vite.ssrLoadModule("/site.config.ts");

  const recordsBySlug = new Map(contentRecords.map((record) => [record.slug, record]));
  const disposition = { INDEX: ["/"], NOINDEX: [], MERGE_REDIRECT: [], REMOVE: [] };
  const failures = [];

  for (const record of contentRecords) {
    const result = dispositionFor(record.slug, record.publication);
    disposition[result].push(`/${record.slug}`);
    if ((result === "INDEX") !== (record.publication === "INDEXABLE")) failures.push(`publication mismatch: /${record.slug}`);
    if (new Set(record.related).size !== record.related.length) failures.push(`duplicate related URL: /${record.slug}`);
    if (record.related.includes(record.slug)) failures.push(`self-related URL: /${record.slug}`);
    for (const target of record.related) {
      if (!recordsBySlug.has(target) || removedSlugs.has(target)) failures.push(`broken related URL on /${record.slug}: /${target}`);
      if (canonicalRedirects[target]) failures.push(`related URL points to redirect on /${record.slug}: /${target}`);
    }
  }

  for (const [source, target] of Object.entries(canonicalRedirects)) {
    if (!recordsBySlug.has(source)) failures.push(`redirect source missing: /${source}`);
    if (!recordsBySlug.has(target)) failures.push(`redirect target missing: /${target}`);
    if (canonicalRedirects[target]) failures.push(`redirect chain: /${source} -> /${target}`);
    if (recordsBySlug.get(target)?.publication !== "INDEXABLE") failures.push(`redirect target is not indexable: /${source} -> /${target}`);
  }

  const sitemapUrls = sitemap().map((entry) => entry.url);
  const expectedSitemap = new Set(disposition.INDEX.map((path) => path === "/" ? siteConfig.domain : `${siteConfig.domain}${path}`));
  if (sitemapUrls.length !== new Set(sitemapUrls).size) failures.push("duplicate sitemap URL");
  for (const url of sitemapUrls) if (!expectedSitemap.has(url)) failures.push(`non-indexable sitemap URL: ${url}`);
  for (const url of expectedSitemap) if (!sitemapUrls.includes(url)) failures.push(`missing sitemap URL: ${url}`);

  const robotsResult = robots();
  if (robotsResult.sitemap !== `${siteConfig.domain}/sitemap.xml`) failures.push("robots.txt sitemap reference is incorrect");
  if (JSON.stringify(robotsResult.rules).includes('"disallow":"/"')) failures.push("robots.txt blocks legitimate pages");

  const staticRouteText = ["app", "components"].flatMap((directory) => {
    const stack = [new URL(`../${directory}/`, import.meta.url)];
    const files = [];
    while (stack.length) {
      const next = stack.pop();
      for (const entry of fs.readdirSync(next, { withFileTypes: true })) {
        const child = new URL(entry.name + (entry.isDirectory() ? "/" : ""), next);
        if (entry.isDirectory()) stack.push(child);
        else if (/\.(tsx?|jsx?)$/.test(entry.name)) files.push(fs.readFileSync(child, "utf8"));
      }
    }
    return files;
  }).join("\n");
  const literalLinks = [...staticRouteText.matchAll(/(?:href|redirect|permanentRedirect)\s*=?(?:\(|\{)?["'`]\/(?!\/)([^"'`?#${}]*)/g)].map((match) => match[1]).filter(Boolean);
  const validRoutes = new Set(["", "crew", ...contentRecords.map((record) => record.slug)]);
  for (const link of literalLinks) if (!validRoutes.has(link) && !link.startsWith("api/") && !link.endsWith("/")) failures.push(`unresolved literal route: /${link}`);

  const legacyDefault = (record) => record.family === "operator" || ["UNKNOWN", "UNCONFIRMED"].includes(record.evidence) ? "NOINDEX" : "INDEXABLE";
  const changedFromIndexable = contentRecords.filter((record) => legacyDefault(record) === "INDEXABLE" && record.publication === "NOINDEX").map((record) => `/${record.slug}`).sort();

  const report = {
    totalPublicUrls: contentRecords.length + 1,
    index: disposition.INDEX.length,
    noindex: disposition.NOINDEX.length,
    mergeRedirect: disposition.MERGE_REDIRECT.length,
    remove: disposition.REMOVE.length,
    sitemapUrls: sitemapUrls.length,
    changedFromIndexable,
    disposition,
    failures,
  };
  console.log(JSON.stringify(report, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  await vite.close();
}
