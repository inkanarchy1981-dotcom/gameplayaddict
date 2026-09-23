import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true } });
after(async () => vite.close());
const { chronologicalPublicNews, dualSenseControllerBrief, evaluateNewsBrief, latestNewsAnswer, miamiDadeViceCityBrief, netflixExtendedLookBrief, newsIntelligenceRecords, propagationTargetsFor, publicCopyPassesEditorial, publicNewsAttribution, publicNewsDestination, rankedPublicNews } = await vite.ssrLoadModule("/lib/news-intelligence.ts");

const official = (id, title = id) => ({ id, title, publisher: "Rockstar Games", url: `https://example.test/${id}`, publishedAt: "2026-09-02", type: "official" });
const reporting = (id) => ({ id, title: id, publisher: "Test Publisher", url: `https://example.test/${id}`, publishedAt: "2026-09-02", type: "reporting" });
const base = (id, source = official(id)) => ({
  id, headline: `Distinct ${id} development`, primarySource: source, confirmedFacts: [`A distinct ${id} fact was announced.`],
  publicSummary: `Rockstar announced a distinct ${id} detail that materially changes what players currently know.`,
  existingPagesAffected: ["gta-6/characters/lucia-caminos"], freshness: 90, importance: 70, userUsefulness: 80,
});

test("major official announcement can pass the standalone gate", () => {
  const result = evaluateNewsBrief({ ...base("major-announcement"), importance: 95, standaloneArticle: { justified: true, destination: "/gta-6/news/major-announcement", reason: "A major official change has independent reader value." } }, []);
  assert.ok(result.decisions.includes("PUBLISH_STANDALONE"));
  assert.ok(result.decisions.includes("UPDATE_EXISTING"));
});

test("small official detail updates its existing page instead of creating a URL", () => {
  const result = evaluateNewsBrief(base("small-detail"), []);
  assert.ok(result.decisions.includes("UPDATE_EXISTING"));
  assert.ok(!result.decisions.includes("PUBLISH_STANDALONE"));
  assert.equal(result.existingPagesAffected[0], "gta-6/characters/lucia-caminos");
});

test("Netflix audience intelligence updates existing coverage without creating a duplicate URL", () => {
  const record = newsIntelligenceRecords.find((item) => item.id === "extended-look-netflix-views-2026-09-01");
  assert.ok(record);
  assert.ok(record.decisions.includes("UPDATE_EXISTING"));
  assert.ok(record.decisions.includes("ADD_INTERNAL_LINK"));
  assert.ok(record.decisions.includes("FLAG_OPPORTUNITY"));
  assert.ok(!record.decisions.includes("PUBLISH_STANDALONE"));
  assert.deepEqual(record.existingPagesAffected.sort(), ["gta-6", "gta-6/guides/extended-look-breakdown", "gta-6/trailers"].sort());
  assert.match(record.publicSummary, /31\.1 million.*14 million.*87 of 93/is);
  assert.equal(record.socialOpportunity?.destination, "/gta-6/guides/extended-look-breakdown");
  assert.ok(rankedPublicNews(10).some((item) => item.id === record.id));
  const duplicate = evaluateNewsBrief(netflixExtendedLookBrief, newsIntelligenceRecords);
  assert.deepEqual(duplicate.decisions, ["NO_MEANINGFUL_CHANGE"]);
});

test("DualSense announcement updates buying pages and keeps both official product images on one existing destination", () => {
  const record = newsIntelligenceRecords.find((item) => item.id === "gta-vi-limited-edition-dualsense-2026-09-03");
  assert.ok(record);
  assert.ok(record.decisions.includes("UPDATE_EXISTING"));
  assert.ok(record.decisions.includes("ADD_MEDIA_RELATIONSHIP"));
  assert.ok(record.decisions.includes("ADD_INTERNAL_LINK"));
  assert.ok(record.decisions.includes("FLAG_OPPORTUNITY"));
  assert.ok(!record.decisions.includes("PUBLISH_STANDALONE"));
  assert.ok(record.existingPagesAffected.includes("gta-6/best-controller"));
  assert.ok(record.existingPagesAffected.includes("gta-6/buy-smart"));
  assert.match(record.publicSummary, /Black and White.*\$84\.99.*September 10.*November 19/is);
  assert.equal(record.socialOpportunity?.destination, "/gta-6/best-controller");
  assert.equal(publicNewsDestination(record), "/gta-6/best-controller");
  assert.equal(publicNewsAttribution(record), "Official Sony Interactive Entertainment source");
  assert.equal(rankedPublicNews(1)[0].id, record.id);
  const duplicate = evaluateNewsBrief(dualSenseControllerBrief, newsIntelligenceRecords);
  assert.deepEqual(duplicate.decisions, ["NO_MEANINGFUL_CHANGE"]);
});

test("Miami-Dade opposition is accepted but the existing publication threshold withholds a new URL", () => {
  const record = newsIntelligenceRecords.find((item) => item.id === "miami-dade-vice-city-marketing-opposition-2026-09-03");
  assert.ok(record);
  assert.ok(record.decisions.includes("UPDATE_EXISTING"));
  assert.ok(record.decisions.includes("ADD_INTERNAL_LINK"));
  assert.ok(record.decisions.includes("FLAG_OPPORTUNITY"));
  assert.ok(!record.decisions.includes("PUBLISH_STANDALONE"));
  assert.match(record.publicSummary, /opposed.*reported.*nothing has been formally agreed or approved.*Rockstar has not announced/is);
  assert.equal(publicNewsDestination(record), "/gta-6/news");
  assert.equal(publicNewsAttribution(record), "Official Miami-Dade County source");
  const duplicate = evaluateNewsBrief(miamiDadeViceCityBrief, newsIntelligenceRecords);
  assert.deepEqual(duplicate.decisions, ["NO_MEANINGFUL_CHANGE"]);
});

test("third-party reporting remains attributed and updates a matching page", () => {
  const result = evaluateNewsBrief(base("reported-detail", reporting("reported-detail")), []);
  assert.equal(result.sourceType, "reporting");
  assert.ok(result.decisions.includes("UPDATE_EXISTING"));
  assert.ok(!result.decisions.includes("PUBLISH_STANDALONE"));
});

test("an unconfirmed claim is held and cannot publish", () => {
  const item = base("rumor", { ...reporting("rumor"), type: "community" });
  const result = evaluateNewsBrief({ ...item, confirmedFacts: [], unconfirmedClaims: ["An anonymous post makes an unsupported claim."], standaloneArticle: { justified: true, destination: "/gta-6/news/rumor", reason: "It is being discussed." }, importance: 95 }, []);
  assert.deepEqual(result.decisions, ["HOLD_UNCONFIRMED"]);
  assert.equal(result.evidence, "UNCONFIRMED");
});

test("duplicate information creates no page and no public summary", () => {
  const known = newsIntelligenceRecords[0];
  const result = evaluateNewsBrief({ ...base("duplicate", known.primarySource), headline: known.headline }, newsIntelligenceRecords);
  assert.deepEqual(result.decisions, ["NO_MEANINGFUL_CHANGE"]);
  assert.equal(result.publicSummary, "");
});

test("a shared reference URL does not collapse distinct news into a duplicate", () => {
  const sharedReference = official("shared-reference");
  const existing = evaluateNewsBrief({ ...base("controller-event"), headline: "Sony announces a limited controller", confirmedFacts: ["Sony priced a new controller at $84.99."], sourceUrls: [sharedReference.url] }, []);
  const next = evaluateNewsBrief({ ...base("airport-event"), headline: "County officials oppose an airport proposal", confirmedFacts: ["Two county officials opposed a proposed airport campaign."], sourceUrls: [sharedReference.url] }, [existing]);
  assert.ok(next.decisions.includes("UPDATE_EXISTING"));
  assert.ok(!next.decisions.includes("NO_MEANINGFUL_CHANGE"));
});

test("an outdated fact is marked for correction on the existing page", () => {
  const result = evaluateNewsBrief({ ...base("date-correction"), comparison: { kind: "stale", previous: "Old date", changed: "New official date" } }, []);
  assert.ok(result.decisions.includes("CORRECT_STALE"));
  assert.ok(result.decisions.includes("UPDATE_EXISTING"));
});

test("a brief with no material change creates no public work", () => {
  const result = evaluateNewsBrief({ ...base("no-change"), existingPagesAffected: [], seoOpportunity: null, socialOpportunity: null, commercialImplications: [], standaloneArticle: { justified: false, destination: "", reason: "No reader-facing change." } }, []);
  assert.deepEqual(result.decisions, ["NO_MEANINGFUL_CHANGE"]);
});

test("Pink Slip and the news feed read the same accepted ranking", () => {
  const ranked = rankedPublicNews(2);
  const answer = latestNewsAnswer();
  assert.ok(ranked.length >= 2);
  assert.ok(answer.text.includes(ranked[0].publicSummary));
  assert.equal(answer.destination, ranked[0].standaloneArticle.destination || ranked[0].seoOpportunity?.destination);
});

test("the public news hub is chronological", () => {
  const feed = chronologicalPublicNews();
  for (let index = 1; index < feed.length; index += 1) assert.ok(feed[index - 1].originalPublicationDate >= feed[index].originalPublicationDate);
});

test("public summaries must pass the editorial gate before standalone publication", () => {
  assert.equal(publicCopyPassesEditorial("Primary claim evidence verified source trail."), false);
  assert.equal(publicCopyPassesEditorial("Rockstar showed Jason and Lucia together in new official footage from Leonida."), true);
  const result = evaluateNewsBrief({ ...base("bad-copy"), publicSummary: "Primary claim evidence verified source trail.", importance: 99, standaloneArticle: { justified: true, destination: "/gta-6/news/bad-copy", reason: "Major event." } }, []);
  assert.ok(!result.decisions.includes("PUBLISH_STANDALONE"));
});

test("deduplicates affected pages and internal links", () => {
  const result = evaluateNewsBrief({ ...base("dedupe-links"), existingPagesAffected: ["gta-6/characters/lucia-caminos", "gta-6/characters/lucia-caminos"], internalLinkOpportunities: ["Link Lucia", "Link Lucia"] }, []);
  assert.deepEqual(result.existingPagesAffected, ["gta-6/characters/lucia-caminos", "gta-6/characters"]);
  assert.equal(result.internalLinkOpportunities.filter((item) => item === "Link Lucia").length, 1);
  assert.equal(new Set(result.internalLinkOpportunities).size, result.internalLinkOpportunities.length);
});

test("accepted entity facts propagate to their parent hub, Pink Slip and internal links", () => {
  const plan = propagationTargetsFor(["gta-6/vehicles/55-vapid-stanier"]);
  assert.deepEqual(plan.directlyAffected, ["gta-6/vehicles/55-vapid-stanier"]);
  assert.deepEqual(plan.parentHubs, ["gta-6/vehicles"]);
  assert.equal(plan.pinkSlip, true);
  assert.equal(plan.newsHub, true);
  assert.deepEqual(plan.internalLinks, [{ parent: "gta-6/vehicles", child: "gta-6/vehicles/55-vapid-stanier" }]);
});

test("accepted buying facts reach Buy Smart without creating a new URL", () => {
  const result = evaluateNewsBrief({ ...base("edition-change"), existingPagesAffected: ["gta-6/editions"] }, []);
  assert.ok(result.existingPagesAffected.includes("gta-6/editions"));
  assert.ok(result.existingPagesAffected.includes("gta-6/buy-smart"));
  assert.ok(!result.decisions.includes("PUBLISH_STANDALONE"));
});
