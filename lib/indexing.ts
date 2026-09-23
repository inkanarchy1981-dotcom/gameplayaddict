import type { PublicationState } from "./types";

export type IndexDisposition = "INDEX" | "NOINDEX" | "MERGE_REDIRECT" | "REMOVE";

export const canonicalRedirects: Record<string, string> = {
  "gta-6/countdown": "gta-6/release-date",
  "gta-6/preorder-bonuses": "gta-6/preorder",
  "gta-6/confirmed-features": "gta-6/features",
  "gta-6/discoveries": "gta-6/guides/extended-look-breakdown",
  "gta-6/where-to-preorder": "gta-6/preorder",
  "gta-6/standard-vs-ultimate": "gta-6/editions",
  "gta-6/release-preparation": "gta-6/guides/launch-day-checklist",
  "gta-6/guides/launch-timeline": "gta-6/reveal-timeline",
  "gta-6/questions/is-gta-6-coming-to-pc": "gta-6/platforms",
  "gta-6/questions/is-gta-6-on-ps4": "gta-6/platforms",
  "gta-6/questions/is-gta-6-on-xbox-one": "gta-6/platforms",
  "gta-6/questions/when-can-gta-6-preload": "gta-6/preload",
  "gta-6/questions/where-is-gta-6-set": "gta-6/locations/leonida",
  "gta-6/questions/who-is-lucia": "gta-6/characters/lucia-caminos",
  "gta-6/questions/who-is-jason": "gta-6/characters/jason-duval",
  "gta-6/questions/is-vice-city-in-gta-6": "gta-6/locations/vice-city",
  "gta-6/questions/how-much-is-gta-6": "gta-6/preorder",
  "gta-6/questions/is-gta-6-single-player": "gta-6/features/single-player",
  "gta-6/questions/who-are-gta-6-protagonists": "gta-6/characters",
  "gta-6/questions/does-gta-6-have-a-disc": "gta-6/code-in-box",
  "gta-6/questions/what-is-leonida": "gta-6/locations/leonida",
  "gta-6/questions/what-is-in-ultimate-edition": "gta-6/editions",
  "gta-6/questions/how-big-is-gta-6-map": "gta-6/guides/map-estimates-explained",
  "gta-6/questions/does-gta-6-have-online": "gta-6/features/gta-online",
  "gta-6/vehicles/emergency": "gta-6/vehicles/police",
};

export const noindexSlugs = new Set([
  "cipher", "search", "operator", "contact", "privacy", "terms", "affiliate-disclosure", "independent-fan-disclaimer",
  "gta-6/locations/leonida-waterways",
  "gta-6/vehicles/utility",
  "gta-6/businesses",
  "gta-6/best-headset", "gta-6/best-controller", "gta-6/best-monitor", "gta-6/best-tv", "gta-6/gaming-setup", "gta-6/budget-setup", "gta-6/premium-setup", "gta-6/accessories",
  "gta-6/guides/evidence-standard", "gta-6/guides/spoiler-policy",
]);

export const removedSlugs = new Set<string>();

export const indexSlugs = new Set([
  "gta-6/features/gta-online",
  "gta-6/questions/is-gta-6-crossplay",
  "gta-6/questions/gta-6-download-size",
]);

export function dispositionFor(slug: string, fallback: PublicationState): IndexDisposition {
  if (removedSlugs.has(slug)) return "REMOVE";
  if (canonicalRedirects[slug]) return "MERGE_REDIRECT";
  if (indexSlugs.has(slug)) return "INDEX";
  if (noindexSlugs.has(slug) || fallback === "NOINDEX") return "NOINDEX";
  return "INDEX";
}

export function publicationFor(slug: string, fallback: PublicationState): PublicationState {
  return dispositionFor(slug, fallback) === "INDEX" ? "INDEXABLE" : "NOINDEX";
}
