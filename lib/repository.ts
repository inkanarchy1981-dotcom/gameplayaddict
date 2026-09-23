import { commercialOffers, contentRecords, sources } from "./content";
import type { ContentFamily, ContentRecord } from "./types";

export const contentRepository = {
  all(): ContentRecord[] {
    return contentRecords;
  },
  bySlug(slug: string): ContentRecord | undefined {
    return contentRecords.find((record) => record.slug === slug);
  },
  byFamily(family: ContentFamily): ContentRecord[] {
    return contentRecords.filter((record) => record.family === family);
  },
  indexable(): ContentRecord[] {
    return contentRecords.filter((record) => record.publication === "INDEXABLE");
  },
  search(query: string): ContentRecord[] {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return contentRecords
      .map((record) => ({
        record,
        score: terms.reduce((sum, term) => sum + (record.title.toLowerCase().includes(term) ? 4 : 0) + (record.searchTerms.includes(term) ? 2 : 0) + (record.description.toLowerCase().includes(term) ? 1 : 0), 0),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map(({ record }) => record);
  },
  sourcesFor(record: ContentRecord) {
    return sources.filter((source) => record.sourceIds.includes(source.id));
  },
  offers() {
    return commercialOffers.filter((offer) => offer.active);
  },
  stats() {
    const byFamily = contentRecords.reduce<Record<string, number>>((acc, record) => {
      acc[record.family] = (acc[record.family] ?? 0) + 1;
      return acc;
    }, {});
    return {
      total: contentRecords.length + 1,
      indexable: contentRecords.filter((record) => record.publication === "INDEXABLE").length + 1,
      noindex: contentRecords.filter((record) => record.publication === "NOINDEX").length,
      byFamily,
      sourceCount: sources.length,
      verifiedSourceLinks: contentRecords.filter((record) => record.sourceIds.length > 0).length,
    };
  },
};
