import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true } });
after(async () => vite.close());
const { contentRecords } = await vite.ssrLoadModule("/lib/content.ts");
const { chronologicalPublicNews } = await vite.ssrLoadModule("/lib/news-intelligence.ts");
const { officialMedia, primaryMediaFor } = await vite.ssrLoadModule("/lib/media.ts");
const { characterResults, dualSenseControllerResults, locationResults, namedVehicleResults } = await vite.ssrLoadModule("/lib/entity-results.ts");

const publicText = (record) => [record.title, record.eyebrow, record.description, record.directAnswer, ...record.sections.flatMap((section) => [section.heading, section.body])].join(" ");

test("related content contains no duplicate or self destination", () => {
  for (const record of contentRecords) {
    assert.equal(new Set(record.related).size, record.related.length, `duplicate related destination on /${record.slug}`);
    assert.ok(!record.related.includes(record.slug), `self recommendation on /${record.slug}`);
  }
});

test("public records do not contain internal evidence enums or methodology headings", () => {
  const banned = /OFFICIAL_CONFIRMED|OFFICIAL_OBSERVED|SUPPORTED_INFERENCE|COMMUNITY_SUBMITTED|PRIMARY CLAIM|WHY THIS ANSWER HOLDS|VERIFIED SOURCE TRAIL|CURRENT STATUS|WHAT TO DO WITH THIS|WHAT IS NOT SETTLED|EVIDENCE SEQUENCE|CLAIM STATUS|WHERE THE CLAIM CONNECTS|\bthis briefing\b|\bthis record\b/i;
  for (const record of contentRecords.filter((item) => item.publication === "INDEXABLE")) assert.doesNotMatch(publicText(record), banned, `methodology language on /${record.slug}`);
});

test("question pages answer immediately without generic three-section scaffolding", () => {
  for (const record of contentRecords.filter((item) => item.family === "questions")) {
    assert.ok(record.directAnswer.length > 10, `weak answer on /${record.slug}`);
    assert.ok(record.sections.length <= 1, `question scaffold returned on /${record.slug}`);
  }
});

test("feature pages state a fact or an explicit unknown before supporting sections", () => {
  for (const record of contentRecords.filter((item) => item.family === "features")) {
    assert.ok(record.directAnswer.length > record.title.length, `feature adds no value on /${record.slug}`);
    assert.doesNotMatch(record.sections.map((section) => section.heading).join(" "), /Claim status|What to watch|Where the claim connects/i);
  }
});

test("news has actual developments rather than publishing-process copy", () => {
  const feed = chronologicalPublicNews();
  assert.ok(feed.length > 0);
  for (const item of feed) {
    assert.ok(item.confirmedFacts.length + item.observedDetails.length > 0, `no development in ${item.id}`);
    assert.doesNotMatch(item.publicSummary, /organizes|prioritizes|methodology|record|briefing|source trail/i);
  }
  const hub = contentRecords.find((record) => record.slug === "gta-6/news");
  assert.match(hub.directAnswer, /DualSense|Miami-Dade/i);
});

test("the retired universal section structures cannot return", () => {
  const signatures = contentRecords.map((record) => ({ slug: record.slug, signature: record.sections.map((section) => section.heading.toLowerCase()).join("|") }));
  const banned = new Set([
    "current status|what to do with this|what is not settled",
    "claim status|what to watch|where the claim connects",
    "why this answer holds|what could change|related checks",
    "scope|reader control|corrections",
  ]);
  for (const item of signatures) assert.ok(!banned.has(item.signature), `generic structure returned on /${item.slug}`);
});

test("every public page adds information beyond its title", () => {
  for (const record of contentRecords.filter((item) => item.publication === "INDEXABLE" && !["cipher", "search"].includes(item.slug))) {
    assert.ok(record.directAnswer.trim().length > record.title.trim().length, `weak value on /${record.slug}`);
  }
});

test("overview pages surface useful child knowledge without methodology copy", () => {
  const expectations = new Map([
    ["gta-6/characters", /Real Dimez|Only Raw Records/],
    ["gta-6/locations", /Leonida Penitentiary|Allied Crystal Sugar/],
    ["gta-6/vehicles", /Vapid Stanier|Grotti Cheetah/],
    ["gta-6/features", /racing|basketball/i],
    ["gta-6/buy-smart", /\$84\.99|September 10/],
    ["gta-6/guides/every-vehicle-observed", /Dominator Buggy|Ganado Retro Build/],
  ]);
  for (const [slug, expected] of expectations) {
    const record = contentRecords.find((item) => item.slug === slug);
    assert.ok(record, `missing overview /${slug}`);
    const copy = publicText(record);
    assert.match(copy, expected, `child knowledge missing from /${slug}`);
    assert.doesNotMatch(copy, /more defensible|conservative inventory|why the labels stay broad|this record|this briefing|evidence standard/i, `methodology copy on /${slug}`);
  }
});

test("major entity hubs inherit a relevant official child image", () => {
  for (const slug of ["gta-6/characters", "gta-6/locations", "gta-6/vehicles"]) {
    assert.ok(primaryMediaFor(slug)?.imageUrl, `missing propagated official image on /${slug}`);
  }
});

test("shared hub entities keep exact official media relationships", () => {
  assert.deepEqual(namedVehicleResults.map((item) => item.mediaId), ["stanier-01", "cheetah-01", "ganado-01", "buggy-01"]);
  assert.equal(characterResults.length, 8);
  assert.equal(new Set(characterResults.map((item) => item.mediaId)).size, 8);
  assert.equal(locationResults.length, 6);
  for (const location of locationResults) assert.match(location.gridHref, new RegExp(`place=${location.slug.replaceAll("/", "%2F")}`));
  for (const entity of [...namedVehicleResults, ...characterResults, ...locationResults]) {
    const media = officialMedia.find((item) => item.id === entity.mediaId);
    assert.ok(media?.imageUrl, `missing official media ${entity.mediaId} for ${entity.title}`);
    assert.equal(media.subjectId, entity.slug, `unrelated image ${entity.mediaId} attached to ${entity.title}`);
  }
});

test("the controller guide and Pink Slip entities preserve Sony's distinct product images", () => {
  const guide = contentRecords.find((record) => record.slug === "gta-6/best-controller");
  assert.ok(guide);
  assert.match(publicText(guide), /Black and White.*\$84\.99.*September 10/is);
  assert.deepEqual(dualSenseControllerResults.map((item) => item.mediaId), ["dualsense-gta6-black", "dualsense-gta6-white"]);
  for (const entity of dualSenseControllerResults) {
    const media = officialMedia.find((item) => item.id === entity.mediaId);
    assert.ok(media?.imageUrl, `missing ${entity.title} product image`);
    assert.equal(media.sourcePublisher, "Sony Interactive Entertainment");
    assert.equal(media.subjectId, "gta-6/best-controller");
  }
  assert.notEqual(dualSenseControllerResults[0].mediaId, dualSenseControllerResults[1].mediaId);
});
