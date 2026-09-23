import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true } });
try {
  const { newsIntelligenceRecords, publicCopyPassesEditorial, rankedPublicNews } = await vite.ssrLoadModule("/lib/news-intelligence.ts");
  const failures = [];
  for (const record of newsIntelligenceRecords) {
    if (record.publicSummary && !publicCopyPassesEditorial(record.publicSummary)) failures.push({ id: record.id, issue: "public summary failed editorial review" });
    if (new Set(record.sourceUrls).size !== record.sourceUrls.length) failures.push({ id: record.id, issue: "duplicate source URL" });
    if (new Set(record.existingPagesAffected).size !== record.existingPagesAffected.length) failures.push({ id: record.id, issue: "duplicate affected page" });
    if (record.decisions.includes("PUBLISH_STANDALONE") && !record.standaloneArticle.justified) failures.push({ id: record.id, issue: "standalone story lacks justification" });
  }
  const feed = rankedPublicNews(20);
  if (feed.some((record) => record.evidence === "UNCONFIRMED" || record.decisions.includes("NO_MEANINGFUL_CHANGE"))) failures.push({ issue: "held or duplicate record reached public feed" });
  console.log(JSON.stringify({ audited: newsIntelligenceRecords.length, publicFeed: feed.length, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  await vite.close();
}
