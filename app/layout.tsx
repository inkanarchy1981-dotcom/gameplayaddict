import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: { default: siteConfig.defaultMetadata.title, template: `%s | ${siteConfig.brandName}` },
  description: siteConfig.defaultMetadata.description,
  applicationName: siteConfig.brandName,
  other: { "codex-preview": "development" },
  alternates: { canonical: "/" },
  openGraph: { title: siteConfig.defaultMetadata.title, description: siteConfig.defaultMetadata.description, type: siteConfig.openGraph.type, locale: siteConfig.openGraph.locale, siteName: siteConfig.openGraph.siteName, images: [{ url: "/og.png", width: 1200, height: 630, alt: "GameplayAddict — Play Leonida Smarter" }] },
  twitter: { card: "summary_large_image", title: siteConfig.defaultMetadata.title, description: siteConfig.defaultMetadata.description, images: ["/og.png"] },
  icons: { icon: siteConfig.logos.mark, shortcut: siteConfig.logos.mark },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const adPreviewBoot = "try{if(new URLSearchParams(location.search).get('adPreview')==='1')document.documentElement.dataset.adPreview='1'}catch(e){}";
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: adPreviewBoot }} /></head><body className="antialiased">{children}</body></html>;
}
