export const siteConfig = {
  brandName: "GameplayAddict",
  brandDisplay: "GAMEPLAY//ADDICT",
  domain: "https://gameplayaddict-gta6.ink-a.chatgpt.site",
  tagline: "Play Leonida smarter.",
  description:
    "Verified GTA VI intelligence, a source-aware map, Crew guidance, and grounded buying tools for launch day and beyond.",
  logos: { wordmark: "/brand/wordmark.svg", mark: "/brand/mark.svg" },
  socialHandles: { youtube: "", tiktok: "", instagram: "" },
  legalDisclaimer:
    "GameplayAddict is an independent fan resource and is not affiliated with, endorsed by, or operated by Rockstar Games or Take-Two Interactive.",
  emailSenderLabel: "GameplayAddict Intel",
  defaultMetadata: {
    title: "GameplayAddict — Verified GTA VI Intelligence",
    description:
      "Track official GTA VI facts, explore a source-aware Leonida schematic, ask the Crew, and prepare your launch setup.",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "GameplayAddict",
  },
  footerLabels: {
    intelligence: "Verified intelligence",
    commerce: "Buy smart",
    trust: "Trust & policy",
  },
  sponsorship: {
    enabled: false,
    surfaces: ["Presented By", "Sponsored Gear", "Partner Module", "Crew Partner", "Guide Sponsor", "Grid Sponsor"],
  },
  release: {
    iso: "2026-11-19T00:00:00-05:00",
    display: "November 19, 2026",
    preloadDisplay: "November 12, 2026",
  },
} as const;

export type SiteConfig = typeof siteConfig;
