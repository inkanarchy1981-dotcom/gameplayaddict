import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true } });
const { contentRecords } = await vite.ssrLoadModule("/lib/content.ts");

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
const words = (value) => new Set(normalize(value).split(" ").filter(Boolean));
const similarity = (left, right) => {
  const a = words(left);
  const b = words(right);
  const intersection = [...a].filter((word) => b.has(word)).length;
  return intersection / Math.max(1, new Set([...a, ...b]).size);
};
const sentences = (value) => value.split(/(?<=[.!?])\s+/).map((item) => item.trim()).filter((item) => words(item).size >= 8);

function renderedBlocks(record) {
  const isMap = record.slug === "gta-6/map";
  const isBuySmart = record.slug === "gta-6/buy-smart";
  const isApp = record.slug === "cipher" || record.slug === "search";
  const isRelease = record.slug === "gta-6/release-date" || record.slug === "gta-6/countdown";
  const isEntity = (["characters", "locations", "vehicles", "businesses"].includes(record.family) || record.slug === "gta-6/features/weapons") && !isMap;
  const isCommercial = record.family === "commercial" || record.slug === "gta-6/preorder" || record.slug === "gta-6/editions";
  const isQuestion = record.family === "questions";
  if (isApp) return [];
  if (isMap || isBuySmart) return [record.description];
  if (isRelease) return [record.description, record.directAnswer];
  if (isQuestion) return [record.description, record.directAnswer, record.sections[0]?.body].filter(Boolean);
  if (isCommercial || isEntity) return [record.description, record.directAnswer, ...record.sections.map((section) => section.body)];
  return [record.description, record.directAnswer, ...record.sections.map((section) => section.body)];
}

const pages = [
  { slug: "/", blocks: [
    "Rockstar facts, official images and practical launch prep—without turning rumors into features.",
    "You looking for something? Ask me.",
    "Captured entirely from in-game PlayStation 5 footage. Playback is user-initiated; GameplayAddict connects the presentation to verified dossiers.",
  ] },
  ...contentRecords.map((record) => ({ slug: `/${record.slug}`, blocks: renderedBlocks(record) })),
];

const flagged = [];
for (const page of pages) {
  const issues = [];
  for (let left = 0; left < page.blocks.length; left += 1) {
    for (let right = left + 1; right < page.blocks.length; right += 1) {
      const a = page.blocks[left];
      const b = page.blocks[right];
      if (normalize(a) === normalize(b)) issues.push({ type: "exact-block", left, right });
      for (const sentenceA of sentences(a)) {
        for (const sentenceB of sentences(b)) {
          const score = similarity(sentenceA, sentenceB);
          if (normalize(sentenceA) === normalize(sentenceB)) issues.push({ type: "exact-sentence", left, right, sample: sentenceA });
          else if (score >= 0.86) issues.push({ type: "near-sentence", left, right, score: Number(score.toFixed(2)), sample: sentenceA });
        }
      }
    }
  }
  if (issues.length) flagged.push({ slug: page.slug, issues });
}

console.log(JSON.stringify({ audited: pages.length, flagged: flagged.length, clean: pages.length - flagged.length, pages: flagged }, null, 2));
if (flagged.length) process.exitCode = 1;
await vite.close();
