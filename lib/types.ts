export type EvidenceState =
  | "OFFICIAL_CONFIRMED"
  | "OFFICIAL_OBSERVED"
  | "SUPPORTED_INFERENCE"
  | "UNCONFIRMED"
  | "COMMUNITY_SUBMITTED"
  | "DISPUTED"
  | "UNKNOWN";

export type PublicationState = "INDEXABLE" | "NOINDEX";

export type Source = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  publishedAt: string;
  lastVerified: string;
  official: boolean;
};

export type MediaAsset = {
  id: string;
  subjectType: "game" | "character" | "location" | "vehicle" | "weapon" | "video" | "accessory";
  subjectId: string;
  title: string;
  caption?: string;
  assetType: "OFFICIAL_SCREENSHOT" | "OFFICIAL_VIDEO" | "OFFICIAL_ARTWORK" | "OFFICIAL_PRODUCT_IMAGE";
  sourceUrl: string;
  sourcePublisher: "Rockstar Games" | "Sony Interactive Entertainment";
  sourceDate: string;
  verification: "OFFICIAL_CONFIRMED";
  usageRole: "HERO" | "CARD" | "GALLERY" | "GRID_PREVIEW" | "EDITORIAL";
  sortOrder: number;
  imageUrl?: string;
  youtubeId?: string;
  editorialUsageNotes: string;
  usageClearance: "OFFICIAL_SHARE_ASSET" | "EMBED_ALLOWED" | "LINK_ONLY";
};

export type ContentFamily =
  | "core"
  | "characters"
  | "locations"
  | "vehicles"
  | "businesses"
  | "features"
  | "commercial"
  | "editorial"
  | "questions"
  | "trust"
  | "operator";

export type ContentRecord = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  directAnswer: string;
  family: ContentFamily;
  evidence: EvidenceState;
  publication: PublicationState;
  updatedAt: string;
  facts: Array<{ label: string; value: string }>;
  sections: Array<{ heading: string; body: string }>;
  sourceIds: string[];
  related: string[];
  searchTerms: string[];
  crew: "cipher" | "pink-slip" | "onyx" | "slick";
  map?: { x: number; y: number; category: "region" | "location" | "business" | "activity" };
};

export type CommercialOffer = {
  id: string;
  merchant: string;
  program: string;
  merchantUrl: string;
  affiliateUrl: string | null;
  eligibility: "DIRECT" | "REQUIRES_APPROVAL";
  approvalStatus: "NOT_APPLIED" | "APPROVED";
  price: string | null;
  priceTimestamp: string;
  category: string;
  disclosureRequired: boolean;
  active: boolean;
  sourceId: string;
};

export type AnalyticsEventName =
  | "page_view"
  | "search"
  | "cipher_question"
  | "pink_slip_question"
  | "map_open"
  | "map_marker_select"
  | "map_filter"
  | "guide_open"
  | "affiliate_click"
  | "merchant_click"
  | "preorder_click"
  | "ad_slot_view_candidate"
  | "email_signup"
  | "next_play_click"
  | "related_entity_click"
  | "share"
  | "discovery_submit";
