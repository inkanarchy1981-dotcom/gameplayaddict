import { contentRepository } from "./repository";
import type { ContentRecord, EvidenceState, Source } from "./types";

export type NewsSourceType = "official" | "reporting" | "community";
export type NewsDecision =
  | "UPDATE_EXISTING" | "STRENGTHEN_SOURCE" | "CORRECT_STALE"
  | "ADD_MEDIA_RELATIONSHIP" | "ADD_INTERNAL_LINK" | "FLAG_OPPORTUNITY"
  | "PUBLISH_STANDALONE" | "NO_MEANINGFUL_CHANGE" | "HOLD_UNCONFIRMED" | "HOLD_EDITORIAL";

export type NewsSource = Pick<Source, "id" | "title" | "publisher" | "url" | "publishedAt"> & {
  type: NewsSourceType;
};

export type NewsIntelligenceRecord = {
  id: string;
  headline: string;
  dateDiscovered: string;
  originalPublicationDate: string;
  primarySource: NewsSource;
  secondarySources: NewsSource[];
  sourceUrls: string[];
  sourceType: NewsSourceType;
  evidence: EvidenceState;
  confirmedFacts: string[];
  observedDetails: string[];
  supportedInference: string[];
  unconfirmedClaims: string[];
  affectedCharacters: string[];
  affectedLocations: string[];
  affectedVehicles: string[];
  affectedFeatures: string[];
  releasePreorderPlatformImplications: string[];
  commercialImplications: string[];
  seoOpportunity: { intent: string; destination: string; createNewPage: boolean } | null;
  socialOpportunity: { hook: string; videoAngle: string; keyFact: string; visualSource: string | null; destination: string } | null;
  existingPagesAffected: string[];
  newMediaRelationships: string[];
  internalLinkOpportunities: string[];
  standaloneArticle: { justified: boolean; destination: string; reason: string };
  freshness: number;
  importance: number;
  confidence: number;
  userUsefulness: number;
  decisions: NewsDecision[];
  publicSummary: string;
  comparison?: { kind: "new" | "stronger_source" | "stale" | "duplicate" | "unchanged"; previous?: string; changed?: string };
};

export type IncomingNewsBrief = Partial<Omit<NewsIntelligenceRecord, "id" | "decisions">> & {
  id?: string;
  headline: string;
  primarySource: NewsSource;
};

const source = (id: string, title: string, publisher: string, url: string, publishedAt: string, type: NewsSourceType): NewsSource => ({ id, title, publisher, url, publishedAt, type });

const rockstarExtended = source("rockstar-extended", "Grand Theft Auto VI: An Extended Look", "Rockstar Games", "https://www.rockstargames.com/newswire/article/9k2kaa1o3297k9/grand-theft-auto-vi-an-extended-look", "2026-08-27", "official");
const rockstarRelease = source("rockstar-release", "Grand Theft Auto VI is Now Set to Launch November 19, 2026", "Rockstar Games", "https://www.rockstargames.com/newswire/article/ak3ak31a49a221/grand-theft-auto-vi-is-now-set-to-launch-november-19-2026", "2025-11-06", "official");
const rockstarPreorder = source("rockstar-preorder", "Pre-Order Grand Theft Auto VI", "Rockstar Games", "https://store.rockstargames.com/game/buy-gta-vi", "2026-06-24", "official");
const dazedInterview = source("dazed-rockstar-interview", "GTAVI: An exclusive deep dive into the video game of the decade", "Dazed", "https://www.dazeddigital.com/life-culture/article/70859/1/gta-6-grand-theft-auto-vi-rockstar-exclusive-deep-dive-game-unparalleled-world", "2026-08-26", "reporting");

const seedNewsIntelligenceRecords: NewsIntelligenceRecord[] = [
  {
    id: "extended-look-2026-08-27",
    headline: "Rockstar publishes an extended look at GTA VI",
    dateDiscovered: "2026-08-27",
    originalPublicationDate: "2026-08-27",
    primarySource: rockstarExtended,
    secondarySources: [], sourceUrls: [rockstarExtended.url], sourceType: "official", evidence: "OFFICIAL_CONFIRMED",
    confirmedFacts: ["Rockstar published a new GTA VI presentation captured entirely from in-game footage on PlayStation 5."],
    observedDetails: ["The presentation shows Jason, Lucia, Leonida locations, vehicles and activities."], supportedInference: [], unconfirmedClaims: [],
    affectedCharacters: ["gta-6/characters/lucia-caminos", "gta-6/characters/jason-duval"],
    affectedLocations: ["gta-6/locations/vice-city"], affectedVehicles: [],
    affectedFeatures: ["gta-6/features/dual-protagonists", "gta-6/features/body-weight-exercise", "gta-6/features/social-media", "gta-6/features/npcs-world-reactions"],
    releasePreorderPlatformImplications: ["The footage was captured on PlayStation 5."], commercialImplications: [],
    seoOpportunity: { intent: "GTA VI Extended Look breakdown", destination: "/gta-6/guides/extended-look-breakdown", createNewPage: false },
    socialOpportunity: { hook: "Rockstar just gave GTA VI its clearest gameplay presentation yet.", videoAngle: "Show three confirmed details from the Extended Look in 20 seconds.", keyFact: "Rockstar says the presentation was captured entirely from in-game PS5 footage.", visualSource: rockstarExtended.url, destination: "/gta-6/guides/extended-look-breakdown" },
    existingPagesAffected: ["gta-6/guides/extended-look-breakdown", "gta-6/trailers", "gta-6/characters/lucia-caminos", "gta-6/characters/jason-duval", "gta-6/features"],
    newMediaRelationships: ["Connect official Extended Look footage to its breakdown and affected entity pages."], internalLinkOpportunities: ["Link the breakdown to Lucia, Jason and the feature pages shown in the presentation."],
    standaloneArticle: { justified: true, destination: "/gta-6/guides/extended-look-breakdown", reason: "The official presentation introduces multiple material developments and supports a scene-by-scene explanation." },
    freshness: 100, importance: 100, confidence: 100, userUsefulness: 100, decisions: ["UPDATE_EXISTING", "ADD_MEDIA_RELATIONSHIP", "ADD_INTERNAL_LINK", "PUBLISH_STANDALONE", "FLAG_OPPORTUNITY"],
    publicSummary: "Rockstar’s Extended Look is the clearest official view of GTA VI so far. It uses in-game PlayStation 5 footage and adds useful detail about Jason, Lucia, Leonida and several gameplay features.",
  },
  {
    id: "developer-interview-systems-2026-08-26",
    headline: "Rockstar developers explain several GTA VI gameplay features",
    dateDiscovered: "2026-09-01", originalPublicationDate: "2026-08-26",
    primarySource: dazedInterview, secondarySources: [], sourceUrls: [dazedInterview.url], sourceType: "reporting", evidence: "OFFICIAL_CONFIRMED",
    confirmedFacts: ["Rockstar developers described protagonist switching, body changes, working social feeds and more reactive pedestrians."],
    observedDetails: [], supportedInference: [], unconfirmedClaims: [],
    affectedCharacters: ["gta-6/characters/lucia-caminos", "gta-6/characters/jason-duval"], affectedLocations: [], affectedVehicles: [],
    affectedFeatures: ["gta-6/features/dual-protagonists", "gta-6/features/body-weight-exercise", "gta-6/features/social-media", "gta-6/features/npcs-world-reactions"],
    releasePreorderPlatformImplications: [], commercialImplications: [],
    seoOpportunity: { intent: "specific GTA VI gameplay features", destination: "/gta-6/features", createNewPage: false },
    socialOpportunity: { hook: "Rockstar developers have explained how four GTA VI features work.", videoAngle: "Summarize character switching, body changes, phone feeds and pedestrian reactions.", keyFact: "The interview adds developer descriptions beyond what can be inferred from footage alone.", visualSource: rockstarExtended.url, destination: "/gta-6/features" },
    existingPagesAffected: ["gta-6/features", "gta-6/features/dual-protagonists", "gta-6/features/body-weight-exercise", "gta-6/features/social-media", "gta-6/features/npcs-world-reactions", "gta-6/characters/lucia-caminos", "gta-6/characters/jason-duval"],
    newMediaRelationships: [], internalLinkOpportunities: ["Connect the feature hub to the four detailed feature pages."],
    standaloneArticle: { justified: false, destination: "/gta-6/features", reason: "The facts strengthen existing feature and character pages without requiring another overlapping URL." },
    freshness: 92, importance: 88, confidence: 92, userUsefulness: 94, decisions: ["UPDATE_EXISTING", "STRENGTHEN_SOURCE", "ADD_INTERNAL_LINK", "FLAG_OPPORTUNITY"],
    publicSummary: "Rockstar developers have added concrete detail about switching between Jason and Lucia, changes to their bodies, working phone feeds and how people react to visible behavior.",
  },
  {
    id: "preorder-program-2026-06-24",
    headline: "GTA VI preorders and editions are live",
    dateDiscovered: "2026-06-24", originalPublicationDate: "2026-06-24",
    primarySource: rockstarPreorder, secondarySources: [], sourceUrls: [rockstarPreorder.url], sourceType: "official", evidence: "OFFICIAL_CONFIRMED",
    confirmedFacts: ["Rockstar lists Standard and Ultimate editions and the current preorder program."], observedDetails: [], supportedInference: [], unconfirmedClaims: [],
    affectedCharacters: [], affectedLocations: [], affectedVehicles: [], affectedFeatures: [],
    releasePreorderPlatformImplications: ["Preorder and edition details affect launch planning."], commercialImplications: ["Update Pink Slip's edition and preorder decisions using official storefront details."],
    seoOpportunity: { intent: "GTA VI editions and preorder", destination: "/gta-6/editions", createNewPage: false },
    socialOpportunity: { hook: "GTA VI now has official edition and preorder details.", videoAngle: "Explain the practical difference between Standard and Ultimate in 20 seconds.", keyFact: "Rockstar lists Standard and Ultimate editions.", visualSource: rockstarPreorder.url, destination: "/gta-6/editions" },
    existingPagesAffected: ["gta-6/preorder", "gta-6/editions", "gta-6/preorder-bonuses", "gta-6/buy-smart"], newMediaRelationships: [], internalLinkOpportunities: ["Connect preorder, edition and buying pages."],
    standaloneArticle: { justified: false, destination: "/gta-6/editions", reason: "The existing commercial pages answer the buying questions directly." },
    freshness: 55, importance: 85, confidence: 100, userUsefulness: 90, decisions: ["UPDATE_EXISTING", "FLAG_OPPORTUNITY"],
    publicSummary: "Rockstar’s official store now lists GTA VI’s Standard and Ultimate editions. The useful next step is comparing the included extras before choosing one.",
  },
  {
    id: "release-date-2025-11-06",
    headline: "Rockstar moves GTA VI to November 19, 2026",
    dateDiscovered: "2025-11-06", originalPublicationDate: "2025-11-06",
    primarySource: rockstarRelease, secondarySources: [], sourceUrls: [rockstarRelease.url], sourceType: "official", evidence: "OFFICIAL_CONFIRMED",
    confirmedFacts: ["Rockstar lists November 19, 2026 as the GTA VI release date."], observedDetails: [], supportedInference: [], unconfirmedClaims: [],
    affectedCharacters: [], affectedLocations: [], affectedVehicles: [], affectedFeatures: [],
    releasePreorderPlatformImplications: ["Release and countdown pages must use November 19, 2026."], commercialImplications: ["Launch-planning and preorder advice must use the current date."],
    seoOpportunity: { intent: "GTA VI release date", destination: "/gta-6/release-date", createNewPage: false },
    socialOpportunity: null, existingPagesAffected: ["gta-6/release-date", "gta-6/countdown", "gta-6/preorder"], newMediaRelationships: [], internalLinkOpportunities: [],
    standaloneArticle: { justified: false, destination: "/gta-6/release-date", reason: "The established release page is the strongest destination for the corrected date." },
    freshness: 20, importance: 100, confidence: 100, userUsefulness: 100, decisions: ["CORRECT_STALE", "UPDATE_EXISTING"],
    publicSummary: "Rockstar currently lists November 19, 2026 as the GTA VI release date for PlayStation 5 and Xbox Series X|S.",
  },
];

const normalize = (value: string) => value.toLowerCase().replace(/^https?:\/\/(?:www\.)?/, "").replace(/[’']/g, "'").replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim();
const fingerprint = (brief: Pick<IncomingNewsBrief, "headline" | "confirmedFacts" | "observedDetails">) => normalize([brief.headline, ...(brief.confirmedFacts ?? []), ...(brief.observedDetails ?? [])].join(" "));
const tokens = (value: string) => new Set(normalize(value).split(" ").filter((token) => token.length > 2));
const overlap = (left: string, right: string) => { const a = tokens(left); const b = tokens(right); return [...a].filter((token) => b.has(token)).length / Math.max(1, Math.min(a.size, b.size)); };

const commercialPages = new Set(["gta-6/preorder", "gta-6/editions", "gta-6/platforms", "gta-6/ps5", "gta-6/xbox", "gta-6/ps5-vs-xbox", "gta-6/best-storage", "gta-6/ps5-ssd", "gta-6/preload", "gta-6/code-in-box"]);

export function propagationTargetsFor(slugs: string[], pages: ContentRecord[] = contentRepository.all()) {
  const available = new Set(pages.map((page) => page.slug));
  const directlyAffected = [...new Set(slugs)].filter((slug) => available.has(slug));
  const parentHubs = new Set<string>();
  for (const slug of directlyAffected) {
    if (slug.startsWith("gta-6/characters/")) parentHubs.add("gta-6/characters");
    if (slug.startsWith("gta-6/locations/")) parentHubs.add("gta-6/locations");
    if (slug.startsWith("gta-6/vehicles/")) parentHubs.add("gta-6/vehicles");
    if (slug.startsWith("gta-6/features/")) parentHubs.add("gta-6/features");
    if (commercialPages.has(slug)) parentHubs.add("gta-6/buy-smart");
    if (slug.includes("trailer") || slug.includes("extended-look")) parentHubs.add("gta-6/trailers");
  }
  const relevantParents = [...parentHubs].filter((slug) => available.has(slug) && !directlyAffected.includes(slug));
  return {
    directlyAffected,
    parentHubs: relevantParents,
    pinkSlip: true,
    newsHub: available.has("gta-6/news"),
    internalLinks: relevantParents.flatMap((parent) => directlyAffected.map((child) => ({ parent, child }))),
  };
}

export function evaluateNewsBrief(brief: IncomingNewsBrief, existing = newsIntelligenceRecords, pages: ContentRecord[] = contentRepository.all()): NewsIntelligenceRecord {
  const pageSlugs = new Set(pages.map((page) => page.slug));
  const propagation = propagationTargetsFor(brief.existingPagesAffected ?? [], pages);
  const affected = [...propagation.directlyAffected, ...propagation.parentHubs].filter((slug) => pageSlugs.has(slug));
  const sourceUrls = [...new Set([brief.primarySource.url, ...(brief.secondarySources ?? []).map((item) => item.url), ...(brief.sourceUrls ?? [])])];
  const duplicate = existing.find((record) => record.primarySource.url === brief.primarySource.url || overlap(fingerprint(record), fingerprint(brief)) >= .82);
  const unconfirmedOnly = (brief.unconfirmedClaims?.length ?? 0) > 0 && !(brief.confirmedFacts?.length || brief.observedDetails?.length);
  const material = Boolean(affected.length || brief.standaloneArticle?.justified || brief.commercialImplications?.length || brief.seoOpportunity || brief.socialOpportunity);
  const editorialPass = publicCopyPassesEditorial(brief.publicSummary ?? "");
  const decisions: NewsDecision[] = duplicate ? ["NO_MEANINGFUL_CHANGE"] : unconfirmedOnly ? ["HOLD_UNCONFIRMED"] : !material ? ["NO_MEANINGFUL_CHANGE"] : [affected.length ? "UPDATE_EXISTING" : "FLAG_OPPORTUNITY"];
  if (!duplicate && !unconfirmedOnly && brief.comparison?.kind === "stale") decisions.push("CORRECT_STALE");
  if (!duplicate && !unconfirmedOnly && brief.comparison?.kind === "stronger_source") decisions.push("STRENGTHEN_SOURCE");
  if (!duplicate && !unconfirmedOnly && brief.newMediaRelationships?.length) decisions.push("ADD_MEDIA_RELATIONSHIP");
  if (!duplicate && !unconfirmedOnly && (brief.internalLinkOpportunities?.length || propagation.internalLinks.length)) decisions.push("ADD_INTERNAL_LINK");
  if (!duplicate && !unconfirmedOnly && (brief.seoOpportunity || brief.socialOpportunity || brief.commercialImplications?.length)) decisions.push("FLAG_OPPORTUNITY");
  if (!duplicate && !unconfirmedOnly && editorialPass && brief.standaloneArticle?.justified && (brief.importance ?? 0) >= 80 && (brief.userUsefulness ?? 0) >= 70) decisions.push("PUBLISH_STANDALONE");
  if (!editorialPass) decisions.splice(0, decisions.length, "HOLD_EDITORIAL");
  return {
    id: brief.id ?? `${normalize(brief.headline).replaceAll(" ", "-")}-${brief.originalPublicationDate ?? brief.primarySource.publishedAt}`,
    headline: brief.headline, dateDiscovered: brief.dateDiscovered ?? brief.primarySource.publishedAt, originalPublicationDate: brief.originalPublicationDate ?? brief.primarySource.publishedAt,
    primarySource: brief.primarySource, secondarySources: brief.secondarySources ?? [], sourceUrls, sourceType: brief.primarySource.type,
    evidence: brief.evidence ?? (unconfirmedOnly ? "UNCONFIRMED" : brief.primarySource.type === "official" ? "OFFICIAL_CONFIRMED" : "SUPPORTED_INFERENCE"),
    confirmedFacts: brief.confirmedFacts ?? [], observedDetails: brief.observedDetails ?? [], supportedInference: brief.supportedInference ?? [], unconfirmedClaims: brief.unconfirmedClaims ?? [],
    affectedCharacters: brief.affectedCharacters ?? [], affectedLocations: brief.affectedLocations ?? [], affectedVehicles: brief.affectedVehicles ?? [], affectedFeatures: brief.affectedFeatures ?? [],
    releasePreorderPlatformImplications: brief.releasePreorderPlatformImplications ?? [], commercialImplications: brief.commercialImplications ?? [],
    seoOpportunity: brief.seoOpportunity ?? null, socialOpportunity: brief.socialOpportunity ?? null, existingPagesAffected: affected,
    newMediaRelationships: brief.newMediaRelationships ?? [], internalLinkOpportunities: [...new Set([
      ...(brief.internalLinkOpportunities ?? []),
      ...propagation.internalLinks.map(({ parent, child }) => `Connect /${parent} to /${child}.`),
    ])],
    standaloneArticle: brief.standaloneArticle ?? { justified: false, destination: affected[0] ? `/${affected[0]}` : "", reason: "No distinct standalone reader need was established." },
    freshness: brief.freshness ?? 0, importance: brief.importance ?? 0, confidence: brief.confidence ?? (brief.primarySource.type === "official" ? 100 : 70), userUsefulness: brief.userUsefulness ?? 0, decisions: [...new Set(decisions)],
    publicSummary: duplicate || !editorialPass ? "" : brief.publicSummary ?? "", comparison: duplicate ? { kind: "duplicate" } : brief.comparison,
  };
}

const netflixTopTen = source("netflix-top-ten-2026-09-01", "Grand Theft Auto VI: An Extended Look Soars to No. 1 in This Week's Top 10", "Netflix", "https://www.netflix.com/tudum/articles/top-10-august-24-2026", "2026-09-01", "official");
const rockstarExtendedNowPlaying = source("rockstar-extended-now-playing", "Grand Theft Auto VI: An Extended Look — Now Playing", "Rockstar Games", "https://www.rockstargames.com/newswire/article/4k138k8okkk483/grand-theft-auto-vi-an-extended-look-now-playing", "2026-08-27", "official");
const guardianExtended = source("guardian-extended-phenomenon", "Grand Theft Auto VI is a phenomenon — but there is much more to the gaming world", "The Guardian", "https://www.theguardian.com/games/2026/sep/02/pushing-buttons-newsletter-grand-theft-auto-vi-cultural-phenomenon", "2026-09-02", "reporting");

export const netflixExtendedLookBrief: IncomingNewsBrief = {
  id: "extended-look-netflix-views-2026-09-01",
  headline: "GTA VI: An Extended Look leads Netflix with 31.1 million weekly views",
  dateDiscovered: "2026-09-03",
  originalPublicationDate: "2026-09-01",
  primarySource: netflixTopTen,
  secondarySources: [rockstarExtendedNowPlaying, guardianExtended],
  sourceUrls: [netflixTopTen.url, "https://www.netflix.com/tudum/top10", rockstarExtendedNowPlaying.url, "https://www.rockstargames.com/VI/", guardianExtended.url],
  sourceType: "official",
  evidence: "OFFICIAL_CONFIRMED",
  confirmedFacts: [
    "Netflix recorded 31.1 million views for Grand Theft Auto VI: An Extended Look during August 24–30, 2026.",
    "The presentation ranked first on Netflix's English-language film list.",
    "Netflix reported that it reached number one in 87 of 93 countries tracked globally.",
    "Rockstar says the presentation was captured entirely from in-game PlayStation 5 footage.",
    "Rockstar continues to list November 19, 2026 as the release date for PlayStation 5 and Xbox Series X|S.",
  ],
  observedDetails: ["The 27-minute presentation debuted on August 27, partway through Netflix's August 24–30 reporting window.", "Netflix reports 14 million viewing hours for the presentation."],
  supportedInference: ["The audience performance supports prominent placement of existing Extended Look coverage.", "The attention creates a timely internal-linking opportunity for existing trailer, platform, preorder and setup content."],
  unconfirmedClaims: [], affectedCharacters: [], affectedLocations: [], affectedVehicles: [], affectedFeatures: ["Grand Theft Auto VI: An Extended Look", "official video coverage"],
  releasePreorderPlatformImplications: ["No verified change to the November 19, 2026 release date, supported platforms, editions, preorder terms, bonuses, pricing or preload timing."],
  commercialImplications: ["Strengthen contextual links from the Extended Look coverage to existing PS5, Xbox, preorder and setup pages without claiming a new offer."],
  seoOpportunity: { intent: "GTA VI Extended Look views", destination: "/gta-6/guides/extended-look-breakdown", createNewPage: false },
  socialOpportunity: { hook: "GTA VI's Extended Look pulled 31.1 million Netflix views in four days.", videoAngle: "Lead with the 31.1 million views and number-one finish, then clarify that the release plan did not change.", keyFact: "Netflix ranked the presentation first on its English-language film list and in 87 of 93 tracked countries.", visualSource: rockstarExtendedNowPlaying.url, destination: "/gta-6/guides/extended-look-breakdown" },
  existingPagesAffected: ["gta-6/guides/extended-look-breakdown", "gta-6/trailers", "gta-6"],
  newMediaRelationships: ["Keep the accepted audience update connected to Rockstar's official Extended Look media."],
  internalLinkOpportunities: ["Connect the Extended Look page to current platform, preorder and setup guidance."],
  standaloneArticle: { justified: false, destination: "/gta-6/guides/extended-look-breakdown", reason: "The audience figures strengthen the existing Extended Look page without creating a distinct search need." },
  freshness: 88, importance: 78, confidence: 98, userUsefulness: 86,
  publicSummary: "GTA VI: An Extended Look drew 31.1 million Netflix views and 14 million viewing hours during August 24–30. It ranked first on Netflix's English-language film list and in 87 of 93 tracked countries. Rockstar's November 19, 2026 release date, platforms, editions, prices and preorder terms did not change.",
  comparison: { kind: "new", changed: "Netflix published the first weekly audience figures for the Extended Look." },
};

const acceptedNetflixRecord = evaluateNewsBrief(netflixExtendedLookBrief, seedNewsIntelligenceRecords);

const playStationDualSenseAnnouncement = source(
  "playstation-dualsense-gta6",
  "First look at the Grand Theft Auto VI Limited-Edition DualSense Wireless Controllers",
  "Sony Interactive Entertainment",
  "https://blog.playstation.com/2026/09/03/first-look-at-the-grand-theft-auto-vi-limited-edition-dualsense-wireless-controllers/",
  "2026-09-03",
  "official",
);
const playStationStateOfPlay = source(
  "playstation-state-of-play-2026-09-03",
  "State of Play & State of Play Japan: all announcements, trailers",
  "Sony Interactive Entertainment",
  "https://blog.playstation.com/2026/09/03/state-of-play-state-of-play-japan-all-announcements-trailers/",
  "2026-09-03",
  "official",
);
const rockstarViReference = source(
  "rockstar-vi-reference-2026-09-03",
  "Grand Theft Auto VI",
  "Rockstar Games",
  "https://www.rockstargames.com/VI/",
  "2026-09-03",
  "official",
);

export const dualSenseControllerBrief: IncomingNewsBrief = {
  id: "gta-vi-limited-edition-dualsense-2026-09-03",
  headline: "Sony reveals two GTA VI limited-edition DualSense controllers",
  dateDiscovered: "2026-09-04",
  originalPublicationDate: "2026-09-03",
  primarySource: playStationDualSenseAnnouncement,
  secondarySources: [playStationStateOfPlay, rockstarViReference],
  sourceUrls: [playStationDualSenseAnnouncement.url, playStationStateOfPlay.url, "https://direct.playstation.com/", "https://www.rockstargames.com/VI/"],
  sourceType: "official",
  evidence: "OFFICIAL_CONFIRMED",
  confirmedFacts: [
    "Sony announced DualSense Wireless Controller – Grand Theft Auto VI Black Limited Edition.",
    "Sony announced DualSense Wireless Controller – Grand Theft Auto VI White Limited Edition.",
    "Both controllers launch starting November 19, 2026 and cost $84.99 each at the recommended U.S. retail price.",
    "Preorders begin September 10, 2026 at 10:00 a.m. local time, with U.S. PlayStation Direct orders opening at 7:00 a.m. PT and 10:00 a.m. ET.",
    "Both controllers have a shimmering color-shifting finish, molded palm-tree details and official GTA VI branding.",
    "Sony states that GTA VI supports DualSense haptic feedback and adaptive-trigger resistance.",
    "The White Limited Edition has broader participating-retailer distribution than the Black Limited Edition in supported markets.",
  ],
  observedDetails: [
    "The White design uses a lighter Vice City beach and daybreak treatment.",
    "The Black design uses a darker Vice City nightlife treatment.",
    "Sony supplied downloadable official product images with the announcement.",
  ],
  supportedInference: [
    "The September 10 preorder opening creates an immediate buying decision for PS5 players who want a GTA VI-themed controller.",
    "Availability monitoring is more useful than a generic controller recommendation because Sony describes both designs as limited quantity.",
  ],
  unconfirmedClaims: [
    "No sellout timing or future restock schedule is confirmed.",
    "No participating U.S. retailers beyond PlayStation Direct are named in the announcement.",
    "GameplayAddict has no affiliate relationship attached to these controllers.",
  ],
  affectedCharacters: ["gta-6/characters/jason-duval", "gta-6/characters/lucia-caminos"],
  affectedLocations: ["gta-6/locations/vice-city"],
  affectedVehicles: [],
  affectedFeatures: ["DualSense haptic feedback", "DualSense adaptive triggers", "PlayStation 5 accessory support"],
  releasePreorderPlatformImplications: ["The controllers launch alongside GTA VI on November 19, 2026. The announcement does not change the game's release date, supported platforms, editions, bonuses or preload timing."],
  commercialImplications: [
    "Add both controllers to Pink Slip's buying answer and the existing controller guide.",
    "Keep the $84.99 price dated September 3, 2026 and route readers to PlayStation directly unless an approved affiliate offer becomes available.",
    "Distinguish the Black edition's narrower distribution from the White edition's broader availability without promising stock.",
  ],
  seoOpportunity: { intent: "GTA VI DualSense controller preorder and Black versus White comparison", destination: "/gta-6/best-controller", createNewPage: false },
  socialOpportunity: {
    hook: "GTA VI now has two official DualSense controllers—Black for Vice City nights, White for daybreak.",
    videoAngle: "Compare the official Black and White controller images, then show the $84.99 price and September 10 preorder time in 20 seconds.",
    keyFact: "Both controllers cost $84.99 in the U.S. and launch starting November 19, with different distribution rules.",
    visualSource: playStationDualSenseAnnouncement.url,
    destination: "/gta-6/best-controller",
  },
  existingPagesAffected: ["gta-6/best-controller", "gta-6/buy-smart", "gta-6/ps5", "gta-6/preorder"],
  newMediaRelationships: ["Attach Sony's official Black and White product images to the existing GTA VI controller guide and freshness answer."],
  internalLinkOpportunities: [
    "Connect the controller guide to Buy Smart, the PS5 page and the preorder center.",
    "Use the controller guide as the single destination from homepage Live Intel and Pink Slip's freshness answer.",
  ],
  standaloneArticle: { justified: false, destination: "/gta-6/best-controller", reason: "The announcement directly strengthens the existing controller guide and buying paths without creating a distinct permanent URL." },
  freshness: 99,
  importance: 86,
  confidence: 99,
  userUsefulness: 94,
  publicSummary: "Sony has announced Black and White GTA VI Limited Edition DualSense controllers for $84.99 each in the U.S. Preorders open September 10, and both launch starting November 19. White is planned for PlayStation Direct and participating retailers; in supported Direct markets, Black is exclusive there. The announcement does not change GTA VI's release date, editions, pricing or preorder terms.",
  comparison: { kind: "new", changed: "Sony announced the first official GTA VI-branded controllers, their price, preorder time and distribution rules." },
};

const acceptedDualSenseControllerRecord = evaluateNewsBrief(dualSenseControllerBrief, [...seedNewsIntelligenceRecords, acceptedNetflixRecord]);

const miamiDadeStatement = source(
  "miami-dade-gta-vi-opposition-2026-09-03",
  "Commissioner Juan Carlos Bermudez and Sheriff Rosie Cordero-Stutz Call on Miami-Dade County to Reject Use of County Resources to Promote Grand Theft Auto VI",
  "Miami-Dade County",
  "https://www.miamidade.gov/global/release.page?Mduid_release=rel1788447602441436",
  "2026-09-03",
  "official",
);
const axiosMiamiProposal = source(
  "axios-miami-gta-vi-proposal-2026-08-28",
  "How Miami could get a Grand Theft Auto-themed transformation",
  "Axios Miami",
  "https://www.axios.com/local/miami/2026/08/28/grand-theft-auto-miami-rockstar-games-marketing-vice-city",
  "2026-08-28",
  "reporting",
);
const axiosMiamiOpposition = source(
  "axios-miami-gta-vi-opposition-2026-09-03",
  "Miami-Dade sheriff slams Grand Theft Auto marketing proposal",
  "Axios Miami",
  "https://www.axios.com/local/miami/2026/09/03/miami-grand-theft-auto-police-backlash-marketing",
  "2026-09-03",
  "reporting",
);
const cbsMiamiOpposition = source(
  "cbs-miami-gta-vi-opposition-2026-09-03",
  "Miami-Dade commissioner says proposed GTA VI partnership glorifies violence against police, pedestrians",
  "CBS News Miami",
  "https://www.cbsnews.com/miami/news/miami-dade-grand-theft-auto-partnership-pushback-september-2026/",
  "2026-09-03",
  "reporting",
);

export const miamiDadeViceCityBrief: IncomingNewsBrief = {
  id: "miami-dade-vice-city-marketing-opposition-2026-09-03",
  headline: "Miami-Dade officials oppose reported GTA VI Vice City marketing campaign",
  dateDiscovered: "2026-09-07",
  originalPublicationDate: "2026-09-03",
  primarySource: miamiDadeStatement,
  secondarySources: [axiosMiamiProposal, axiosMiamiOpposition, cbsMiamiOpposition, rockstarViReference],
  sourceUrls: [miamiDadeStatement.url, axiosMiamiProposal.url, axiosMiamiOpposition.url, cbsMiamiOpposition.url, rockstarViReference.url],
  sourceType: "official",
  evidence: "OFFICIAL_CONFIRMED",
  confirmedFacts: [
    "Miami-Dade Commissioner Juan Carlos Bermudez and Sheriff Rosie Cordero-Stutz issued an official statement on September 3 opposing the potential use of county property and resources to promote GTA VI.",
    "Their statement refers to reports that the mayor's office is exploring a partnership with Rockstar Games.",
    "The official statement specifically mentions the reported possibility of temporarily branding Miami International Airport as Vice City Airport.",
    "Axios reported that a spokesperson for the mayor's office confirmed discussions with Rockstar Games and said nothing had been formally agreed or approved.",
    "Rockstar has not publicly announced or confirmed a partnership.",
  ],
  observedDetails: [
    "Axios reported preliminary county concepts involving airport and transit branding as well as proposed public-infrastructure improvements.",
    "The public disagreement weighs possible revenue and tourism benefits against objections to associating county institutions with Grand Theft Auto's criminal subject matter.",
  ],
  supportedInference: [
    "The real-Miami and fictional-Vice-City connection gives the controversy a distinct reader interest beyond the evergreen Vice City page.",
    "Any future campaign coverage should wait for a formal announcement or approval before presenting locations or activations as real.",
  ],
  unconfirmedClaims: [
    "Rockstar's participation in or acceptance of the proposal is not confirmed.",
    "No campaign scope, budget, installation list or activation date is confirmed.",
    "Temporary Vice City branding at Miami International Airport is not approved.",
    "GameplayAddict has no sponsorship or commercial relationship connected to the proposal.",
  ],
  affectedCharacters: [],
  affectedLocations: ["gta-6/locations/vice-city"],
  affectedVehicles: [],
  affectedFeatures: [],
  releasePreorderPlatformImplications: ["The disagreement does not change GTA VI's November 19, 2026 release date, PS5 and Xbox Series X|S platforms, editions, pricing, preorder bonuses or November 12 preload timing."],
  commercialImplications: ["Do not display campaign locations, partner branding, tickets or offers unless Rockstar or Miami-Dade formally confirms them."],
  seoOpportunity: { intent: "GTA VI Miami partnership and Vice City Airport proposal", destination: "/gta-6/news/miami-dade-vice-city-airport-proposal", createNewPage: true },
  socialOpportunity: {
    hook: "Miami could receive Vice City branding, but two county officials are pushing back.",
    videoAngle: "Explain the reported airport proposal, the official opposition and the fact that nothing has been approved in 20 seconds.",
    keyFact: "Miami-Dade officials publicly opposed a reported GTA VI marketing proposal that has not been approved or announced by Rockstar.",
    visualSource: "https://www.rockstargames.com/VI/",
    destination: "/gta-6/news",
  },
  existingPagesAffected: ["gta-6/news", "gta-6/locations/vice-city", "gta-6/reveal-timeline"],
  newMediaRelationships: [],
  internalLinkOpportunities: ["Connect the news feed to the existing Vice City page without changing that page's main search intent."],
  standaloneArticle: {
    justified: true,
    destination: "/gta-6/news/miami-dade-vice-city-airport-proposal",
    reason: "The official public opposition to a reported real-world Miami campaign is a distinct event, but the current importance score remains below the existing standalone publication threshold.",
  },
  freshness: 82,
  importance: 74,
  confidence: 90,
  userUsefulness: 85,
  publicSummary: "Miami-Dade Commissioner Juan Carlos Bermudez and Sheriff Rosie Cordero-Stutz have opposed a reported GTA VI marketing proposal that could include temporary Vice City branding at Miami International Airport. Axios says the mayor's office confirmed discussions with Rockstar, but nothing has been formally agreed or approved, and Rockstar has not announced a partnership.",
  comparison: { kind: "new", changed: "Two Miami-Dade officials issued a public statement opposing the reported proposal after local reporting disclosed the discussions." },
};

const acceptedMiamiDadeRecord = evaluateNewsBrief(miamiDadeViceCityBrief, [...seedNewsIntelligenceRecords, acceptedNetflixRecord, acceptedDualSenseControllerRecord]);
export const newsIntelligenceRecords: NewsIntelligenceRecord[] = [...seedNewsIntelligenceRecords, acceptedNetflixRecord, acceptedDualSenseControllerRecord, acceptedMiamiDadeRecord];

export function publicCopyPassesEditorial(value: string): boolean {
  const text = normalize(value);
  if (!text) return false;
  const blocked = ["current status", "what to do with this", "primary claim", "evidence", "why this answer holds", "verified source trail", "source aware", "comprehensive guide", "delve into", "it is important to note"];
  return text.split(" ").length >= 8 && !blocked.some((phrase) => text.includes(normalize(phrase)));
}

export function rankedPublicNews(limit = 6): NewsIntelligenceRecord[] {
  return newsIntelligenceRecords
    .filter((record) => record.publicSummary && !record.decisions.includes("HOLD_UNCONFIRMED") && !record.decisions.includes("NO_MEANINGFUL_CHANGE"))
    .sort((a, b) => b.originalPublicationDate.localeCompare(a.originalPublicationDate) || (b.freshness + b.importance + b.userUsefulness + b.confidence) - (a.freshness + a.importance + a.userUsefulness + a.confidence))
    .slice(0, limit);
}

export function chronologicalPublicNews(limit = 20): NewsIntelligenceRecord[] {
  return newsIntelligenceRecords
    .filter((record) => record.publicSummary && !record.decisions.includes("HOLD_UNCONFIRMED") && !record.decisions.includes("NO_MEANINGFUL_CHANGE"))
    .sort((a, b) => b.originalPublicationDate.localeCompare(a.originalPublicationDate))
    .slice(0, limit);
}

export function publicNewsDestination(record: NewsIntelligenceRecord): string {
  if (record.decisions.includes("PUBLISH_STANDALONE") && record.standaloneArticle.destination) return record.standaloneArticle.destination;
  if (record.seoOpportunity && !record.seoOpportunity.createNewPage) return record.seoOpportunity.destination;
  const existing = record.existingPagesAffected.find((slug) => contentRepository.bySlug(slug)?.publication === "INDEXABLE");
  return existing ? `/${existing}` : "/gta-6/news";
}

export function publicNewsAttribution(record: NewsIntelligenceRecord): string {
  if (record.primarySource.publisher === "Rockstar Games") return "Confirmed by Rockstar";
  if (record.primarySource.type === "official") return `Official ${record.primarySource.publisher} source`;
  return `Reported by ${record.primarySource.publisher}`;
}

export function latestNewsAnswer(): { text: string; destination: string; record?: NewsIntelligenceRecord } {
  const top = rankedPublicNews(1);
  return {
    text: top[0]?.publicSummary ?? "There isn't a new verified GTA VI development to report right now.",
    destination: top[0] ? publicNewsDestination(top[0]) : "/gta-6/news",
    record: top[0],
  };
}

export function latestNewsForTopic(topic: string): NewsIntelligenceRecord | undefined {
  const q = normalize(topic);
  return rankedPublicNews(20).find((record) => normalize([record.headline, ...record.affectedFeatures, ...record.affectedLocations, ...record.confirmedFacts].join(" ")).includes(q));
}
