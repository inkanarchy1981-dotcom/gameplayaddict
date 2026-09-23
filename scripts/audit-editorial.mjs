import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true } });
const { contentRecords } = await vite.ssrLoadModule("/lib/content.ts");
const { officialMedia } = await vite.ssrLoadModule("/lib/media.ts");

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
const words = (value) => new Set(normalize(value).split(" ").filter(Boolean));
const similarity = (left, right) => {
  const a = words(left);
  const b = words(right);
  const intersection = [...a].filter((word) => b.has(word)).length;
  return intersection / Math.max(1, new Set([...a, ...b]).size);
};
const sentences = (value) => value.split(/(?<=[.!?])\s+/).map((item) => item.trim()).filter((item) => words(item).size >= 8);
const blocksFor = (record) => [record.description, record.directAnswer, ...record.sections.map((section) => section.body)].filter(Boolean);

const home = {
  slug: "/",
  family: "home",
  blocks: [
    "Rockstar facts, official images and practical launch prep—without turning rumors into features.",
    "You looking for something? Ask me.",
  ],
};
const pages = [home, ...contentRecords.map((record) => ({ slug: `/${record.slug}`, family: record.family, blocks: blocksFor(record) }))];

const withinPageDuplicates = [];
for (const page of pages) {
  const issues = [];
  for (let left = 0; left < page.blocks.length; left += 1) {
    for (let right = left + 1; right < page.blocks.length; right += 1) {
      for (const sentenceA of sentences(page.blocks[left])) {
        for (const sentenceB of sentences(page.blocks[right])) {
          const score = similarity(sentenceA, sentenceB);
          if (normalize(sentenceA) === normalize(sentenceB)) issues.push({ type: "exact", sample: sentenceA });
          else if (score >= 0.86) issues.push({ type: "near", score: Number(score.toFixed(2)), sample: sentenceA });
        }
      }
    }
  }
  if (issues.length) withinPageDuplicates.push({ slug: page.slug, issues });
}

const crossPageSentences = new Map();
for (const page of pages) {
  for (const block of page.blocks) {
    for (const sentence of sentences(block)) {
      const key = normalize(sentence);
      const slugs = crossPageSentences.get(key) ?? new Set();
      slugs.add(page.slug);
      crossPageSentences.set(key, slugs);
    }
  }
}
const crossPageExact = [...crossPageSentences.entries()]
  .filter(([, slugs]) => slugs.size > 1)
  .map(([sentence, slugs]) => ({ sentence, pages: [...slugs] }));

const banned = [
  "delve into",
  "comprehensive guide",
  "navigate the world",
  "in today's",
  "it is important to note",
  "whether you're",
  "whether you are",
  "game-changing",
  "ultimate resource",
  "source-aware",
  "source-led synthesis",
  "continue the investigation",
  "current status",
  "what to do with this",
  "what is not settled",
  "primary claim",
  "why this answer holds",
  "verified source trail",
  "evidence sequence",
  "claim status",
  "where the claim connects",
  "this briefing",
  "this record",
  "companion platform",
  "gaming intelligence",
  "transparent uncertainty",
  "publication workflow",
  "content operations",
];
const genericLanguage = pages.flatMap((page) => {
  const text = normalize(page.blocks.join(" "));
  const matches = banned.filter((phrase) => text.includes(normalize(phrase)));
  return matches.length ? [{ slug: page.slug, matches }] : [];
});

const trustFailures = contentRecords.filter((record) => record.family === "trust").flatMap((record) => {
  const text = blocksFor(record).join(" ");
  const issues = [];
  if (!/\b(we|our|we're|we'll|we've|isn't|don't|can't)\b/i.test(text)) issues.push("missing natural publisher voice");
  if (/\b(workflow|database|record management|evidence enum|content system|publication process)\b/i.test(text)) issues.push("internal methodology language");
  return issues.length ? [{ slug: record.slug, issues }] : [];
});

const imageAssets = officialMedia.filter((asset) => asset.imageUrl);
const weakCaptions = imageAssets.filter((asset) =>
  !asset.caption
  || words(asset.caption).size < 6
  || /\b\d{2}$/.test(asset.title)
  || /^official (character|location|vehicle|weapon|game) media published/i.test(asset.caption),
).map((asset) => asset.id);

const intentFailures = [];
for (const record of contentRecords) {
  const headings = record.sections.map((section) => normalize(section.heading));
  if (record.family === "characters" && record.slug !== "gta-6/characters") {
    const required = ["appearance", "known backstory", "relationships", "official appearances", "still unknown"];
    const missing = required.filter((heading) => !headings.includes(heading));
    if (missing.length || !officialMedia.some((asset) => asset.subjectId === record.slug && asset.imageUrl)) intentFailures.push({ slug: record.slug, missing });
  }
  if (record.family === "locations" && !["gta-6/locations", "gta-6/map"].includes(record.slug)) {
    if (!headings.some((heading) => heading.includes("grid"))) intentFailures.push({ slug: record.slug, missing: ["Grid context"] });
  }
  if (record.family === "commercial" && record.sections.length < 2) intentFailures.push({ slug: record.slug, missing: ["decision sections"] });
  if (record.family === "editorial" && record.sections.length < 3) intentFailures.push({ slug: record.slug, missing: ["story sections"] });
}

const paragraphs = contentRecords.flatMap((record) => [record.description, ...record.sections.map((section) => section.body)]
  .filter((body) => words(body).size >= 12)
  .map((body) => ({ slug: record.slug, family: record.family, body })));
const nearTemplatePages = new Set();
let nearTemplatePairs = 0;
for (let left = 0; left < paragraphs.length; left += 1) {
  for (let right = left + 1; right < paragraphs.length; right += 1) {
    const a = paragraphs[left];
    const b = paragraphs[right];
    if (a.slug === b.slug || a.family !== b.family) continue;
    if (similarity(a.body, b.body) >= 0.86) {
      nearTemplatePairs += 1;
      nearTemplatePages.add(a.slug);
      nearTemplatePages.add(b.slug);
    }
  }
}

const materiallyRewrittenFamilies = new Set(["characters", "locations", "vehicles", "commercial", "editorial"]);
const specialRewrites = new Set([
  "gta-6/release-date",
  "gta-6/countdown",
  "gta-6/preorder",
  "gta-6/editions",
  "gta-6/preorder-bonuses",
  "gta-6/trailers",
  "gta-6/features/weapons",
]);
const materiallyRewritten = contentRecords.filter((record) => materiallyRewrittenFamilies.has(record.family) || specialRewrites.has(record.slug)).length + 1;

const report = {
  audited: pages.length,
  materiallyRewritten,
  withinPageDuplicatePages: withinPageDuplicates.length,
  crossPageExactSentences: crossPageExact.length,
  genericLanguagePages: genericLanguage.length,
  weakGalleryCaptions: weakCaptions.length,
  intentFailures: intentFailures.length,
  nearTemplatePagesRemaining: nearTemplatePages.size,
  nearTemplatePairsRemaining: nearTemplatePairs,
  remainingWeakPages: [...nearTemplatePages].sort(),
  failures: { withinPageDuplicates, crossPageExact, genericLanguage, weakCaptions, intentFailures },
  trustFailures,
};

console.log(JSON.stringify(report, null, 2));
if (withinPageDuplicates.length || crossPageExact.length || genericLanguage.length || weakCaptions.length || intentFailures.length || nearTemplatePairs || trustFailures.length) process.exitCode = 1;
await vite.close();
