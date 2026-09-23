import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true } });
after(async () => vite.close());

const { contentRecords } = await vite.ssrLoadModule("/lib/content.ts");
const { canonicalRedirects, dispositionFor } = await vite.ssrLoadModule("/lib/indexing.ts");
const { default: sitemap } = await vite.ssrLoadModule("/app/sitemap.ts");
const { siteConfig } = await vite.ssrLoadModule("/site.config.ts");

test("sitemap contains only canonical indexable URLs", () => {
  const actual = sitemap().map((entry) => entry.url).sort();
  const expected = [siteConfig.domain, ...contentRecords
    .filter((record) => dispositionFor(record.slug, record.publication) === "INDEX")
    .map((record) => `${siteConfig.domain}/${record.slug}`)].sort();
  assert.deepEqual(actual, expected);
  assert.equal(new Set(actual).size, actual.length);
  assert.equal(actual.length, 98, "knowledge propagation must not change the validated index inventory");
});

test("redirects are single-hop and end on indexable records", () => {
  for (const [source, target] of Object.entries(canonicalRedirects)) {
    assert.ok(contentRecords.some((record) => record.slug === source));
    const targetRecord = contentRecords.find((record) => record.slug === target);
    assert.ok(targetRecord, `missing target /${target}`);
    assert.equal(targetRecord.publication, "INDEXABLE", `non-indexable target /${target}`);
    assert.ok(!canonicalRedirects[target], `redirect chain from /${source}`);
  }
});

test("trust records use human publisher voice and carry no GTA source furniture", () => {
  for (const record of contentRecords.filter((item) => item.family === "trust")) {
    const copy = [record.directAnswer, record.description, ...record.sections.map((section) => section.body)].join(" ");
    assert.match(copy, /\b(we|our|we're|we'll|isn't|don't|can't)\b/i, `impersonal trust copy on /${record.slug}`);
    assert.deepEqual(record.sourceIds, [], `source module leak on /${record.slug}`);
    assert.doesNotMatch(copy, /workflow|database|evidence enum|content system|publication process/i);
  }
});

test("utility, thin and merged routes cannot enter the sitemap", () => {
  for (const record of contentRecords) {
    const disposition = dispositionFor(record.slug, record.publication);
    if (disposition !== "INDEX") assert.equal(record.publication, "NOINDEX", `index leak on /${record.slug}`);
  }
});
