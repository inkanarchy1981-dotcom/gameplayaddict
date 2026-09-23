import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true } });
after(async () => vite.close());
const { resolvePinkSlipQuestion } = await vite.ssrLoadModule("/lib/pink-slip.ts");

const cases = [
  ["What are the characters?", "characters", "/gta-6/characters", /Lucia Caminos.*Jason Duval/],
  ["Who is Lucia?", "specific_character", "/gta-6/characters/lucia-caminos", /playable protagonist/i],
  ["Who is Jason?", "specific_character", "/gta-6/characters/jason-duval", /Jason/i],
  ["Where is Vice City?", "specific_location", "/gta-6/map?place=gta-6%2Flocations%2Fvice-city", /Vice City/i],
  ["Show me the map.", "map", "/gta-6/map", /Grid/],
  ["What is the GTA VI download size?", "systems", "/gta-6/questions/gta-6-download-size", /not published.*download size/i],
  ["When does GTA VI release?", "release", "/gta-6/release-date", /November 19, 2026/i],
  ["What platforms is GTA VI on?", "platforms", "/gta-6/platforms", /PlayStation 5.*Xbox Series X\|S/i],
  ["Can you switch characters?", "systems", "/gta-6/features/dual-protagonists", /controlled together or independently/i],
  ["What should I buy for GTA VI?", "buying", "/gta-6/buy-smart", /Tell me what you play on/i],
  ["What’s new?", "news", "/gta-6/best-controller", /Black and White.*\$84\.99.*September 10/i],
  ["asdf random thing", "unknown", undefined, /not sure what you mean/i],
];

for (const [query, intent, href, answerPattern] of cases) {
  test(`resolves: ${query}`, () => {
    const result = resolvePinkSlipQuestion(query);
    assert.equal(result.intent, intent);
    assert.match(result.text, answerPattern);
    assert.equal(result.action?.href, href);
    assert.doesNotMatch(`${result.text} ${result.action?.label ?? ""}`, /Cipher|Slick|Onyx|route|handoff|classifier|evidence state|command center/i);
  });
}

test("character wording tolerates common phrasing and punctuation", () => {
  for (const query of ["characters", "who are the characters?", "show characters", "What are the characters!!!"]) {
    assert.equal(resolvePinkSlipQuestion(query).intent, "characters");
  }
});

test("character questions never receive download-size content", () => {
  const result = resolvePinkSlipQuestion("What are the characters?");
  assert.doesNotMatch(result.text, /download|install size|gigabyte/i);
});

test("download-size questions never receive a Grid action", () => {
  const result = resolvePinkSlipQuestion("What is the GTA VI download size?");
  assert.notEqual(result.action?.href, "/gta-6/map");
  assert.doesNotMatch(result.action?.label ?? "", /Grid/i);
});

test("uncertain questions do not guess an article or action", () => {
  const result = resolvePinkSlipQuestion("asdf random thing");
  assert.equal(result.record, undefined);
  assert.equal(result.action, undefined);
  assert.equal(result.imageRecords.length, 0);
});

test("what's new names accepted GTA VI developments, not editorial methodology", () => {
  const result = resolvePinkSlipQuestion("What's new?");
  assert.match(result.text, /Black and White.*DualSense.*\$84\.99/i);
  assert.doesNotMatch(result.text, /observations|promised mechanic|record|briefing|methodology|source trail/i);
  assert.equal(result.action?.href, "/gta-6/best-controller");
});

test("controller questions return both official designs, price, timing and the existing guide", () => {
  for (const query of ["What's new with the GTA VI controllers?", "Which GTA VI DualSense controller should I buy?"]) {
    const result = resolvePinkSlipQuestion(query);
    assert.match(result.text, /Black and White.*\$84\.99.*September 10/is);
    assert.deepEqual(result.entities.map((item) => item.title), ["GTA VI Black Limited Edition DualSense", "GTA VI White Limited Edition DualSense"]);
    assert.deepEqual(result.entities.map((item) => item.mediaId), ["dualsense-gta6-black", "dualsense-gta6-white"]);
    assert.equal(result.action?.href, "/gta-6/best-controller");
  }
});

test("Miami proposal questions explain what is reported and what is not approved", () => {
  for (const query of ["What's happening with Vice City Airport?", "Tell me about the Miami GTA VI proposal"] ) {
    const result = resolvePinkSlipQuestion(query);
    assert.equal(result.intent, "news");
    assert.match(result.text, /Miami-Dade.*opposed.*reported.*nothing has been formally agreed or approved/is);
    assert.match(result.context, /not a new GTA VI game announcement.*No airport renaming or partnership has been approved/is);
    assert.equal(result.entities[0].title, "Vice City");
    assert.equal(result.entities[0].mediaId, "vice-city-01");
    assert.equal(result.action?.href, "/gta-6/news");
  }
});

test("release freshness separates the controller launch from the unchanged game plan", () => {
  const result = resolvePinkSlipQuestion("Did anything change with the release?");
  assert.match(result.text, /did not change.*November 19, 2026.*\$84\.99.*game's editions, prices and preorder terms are unchanged/is);
  assert.equal(result.action?.href, "/gta-6/release-date");
});

test("vehicle answers return the four named cars with matching official media", () => {
  const result = resolvePinkSlipQuestion("Show me the cars we actually know.");
  assert.equal(result.intent, "vehicles");
  assert.deepEqual(result.entities.map((item) => item.title), ["'55 Vapid Stanier", "'95 Grotti Cheetah", "Vapid Ganado Retro Build", "'67 Vapid Dominator Buggy"]);
  assert.deepEqual(result.entities.map((item) => item.mediaId), ["stanier-01", "cheetah-01", "ganado-01", "buggy-01"]);
  assert.match(result.context, /police and emergency vehicles.*boats and airboats/i);
});

test("follow-up visual questions preserve the prior entities and media", () => {
  const vehicles = resolvePinkSlipQuestion("Show me the cars we actually know.");
  const followUp = resolvePinkSlipQuestion("Show me what they look like.", vehicles);
  assert.deepEqual(followUp.entities, vehicles.entities);
  assert.equal(followUp.action?.href, "/gta-6/vehicles");
});

test("Lucia and character answers use the corresponding official portraits", () => {
  const lucia = resolvePinkSlipQuestion("Who's Lucia?");
  assert.equal(lucia.entities[0].mediaId, "lucia-01");
  assert.match(lucia.entities[0].summary, /playable protagonist/i);
  const cast = resolvePinkSlipQuestion("Show me the characters.");
  assert.equal(cast.entities.length, 8);
  assert.equal(new Set(cast.entities.map((item) => item.mediaId)).size, 8);
});

test("map freshness answers do not invent news and keep focused Grid actions", () => {
  const result = resolvePinkSlipQuestion("What's new with the map?");
  assert.match(result.text, /hasn’t been a new verified map announcement/i);
  assert.equal(result.entities.length, 6);
  assert.match(result.action?.href ?? "", /\/gta-6\/map\?place=gta-6%2Flocations%2Fvice-city/);
  const followUp = resolvePinkSlipQuestion("Show me where that is.", result);
  assert.match(followUp.action?.href ?? "", /place=gta-6%2Flocations%2Fvice-city/);
});

test("location lists return six matching regional images and focused Grid links", () => {
  const result = resolvePinkSlipQuestion("What locations do we know?");
  assert.deepEqual(result.entities.map((item) => item.title), ["Vice City", "Leonida Keys", "Grassrivers", "Port Gellhorn", "Ambrosia", "Mount Kalaga National Park"]);
  assert.deepEqual(result.entities.map((item) => item.mediaId), ["vice-city-01", "keys-01", "grassrivers-01", "port-01", "ambrosia-01", "kalaga-01"]);
  for (const entity of result.entities) assert.match(entity.gridHref, /\/gta-6\/map\?place=/);
});

test("freshness, features and platforms produce specific answers and destinations", () => {
  const news = resolvePinkSlipQuestion("Is GTA VI doing numbers?");
  assert.match(news.text, /31\.1 million.*ranked first.*87 of 93/is);
  const features = resolvePinkSlipQuestion("What gameplay features have actually been shown?");
  assert.equal(features.entities.length, 8);
  assert.match(features.text, /character switching.*body changes.*phone feeds/i);
  const platforms = resolvePinkSlipQuestion("What can I buy GTA VI on?");
  assert.equal(platforms.intent, "platforms");
  assert.match(platforms.text, /PlayStation 5.*Xbox Series X\|S/i);
});
