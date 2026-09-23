import type { Metadata } from "next";
/* eslint-disable @next/next/no-img-element -- official remote media is pre-sized and the hosted runtime does not provide an image optimizer */
import Link from "next/link";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { BuySmart, ContentHeader, Countdown, Footer, GridMap } from "@/components/Experience";
import { AssistantSurface, CommercialDecisionTool, MobileNav, SearchSurface } from "@/components/ProductSurfaces";
import { contentRepository } from "@/lib/repository";
import { mediaFor, officialMedia, primaryMediaFor } from "@/lib/media";
import { siteConfig } from "@/site.config";
import type { ContentRecord } from "@/lib/types";
import { evidenceLabel } from "@/lib/public-language";
import { chronologicalPublicNews, publicNewsAttribution, publicNewsDestination } from "@/lib/news-intelligence";
import { canonicalRedirects } from "@/lib/indexing";
import { HubEntityShowcase } from "@/components/EntityShowcase";

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() { return contentRepository.all().map((record) => ({ slug: record.slug.split("/") })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const requestedSlug = slug.join("/");
  if (requestedSlug === "crew") return { title: "Ask Pink Slip", robots: { index: false, follow: true } };
  const redirectTarget = canonicalRedirects[requestedSlug];
  if (redirectTarget) return { alternates: { canonical: `/${redirectTarget}` }, robots: { index: false, follow: true } };
  const record = contentRepository.bySlug(requestedSlug);
  if (!record) return { title: "Not found", robots: { index: false, follow: false } };
  const media = primaryMediaFor(record.slug);
  return {
    title: record.title,
    description: record.description,
    alternates: { canonical: `/${record.slug}` },
    robots: { index: record.publication === "INDEXABLE", follow: true },
    openGraph: { title: record.title, description: record.description, type: record.family === "trust" ? "website" : "article", url: `/${record.slug}`, images: media?.imageUrl ? [{ url: media.imageUrl, alt: `${media.title}, official media from ${media.sourcePublisher}` }] : [] },
    twitter: { card: media?.imageUrl ? "summary_large_image" : "summary", title: record.title, description: record.description, images: media?.imageUrl ? [media.imageUrl] : [] },
  };
}

const entityFamilies = new Set(["characters", "locations", "vehicles", "businesses"]);

function SourcePanel({ record }: { record: ContentRecord }) {
  const sourceList = contentRepository.sourcesFor(record);
  return <section className="source-panel"><h3>Sources</h3>{sourceList.length ? sourceList.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.id}><span>{source.publisher}</span>{source.title}<small>Checked {source.lastVerified}</small></a>) : null}</section>;
}

function RelatedPanel({ record }: { record: ContentRecord }) {
  const related = [...new Set(record.related)].filter((slug) => slug !== record.slug).map((slug) => contentRepository.bySlug(slug)).filter(Boolean);
  if (!related.length) return null;
  return <section className="related-panel"><h3>Keep reading</h3>{related.map((item) => item ? <Link href={`/${item.slug}`} key={item.slug}>{item.title}<small>{evidenceLabel(item.evidence)}</small></Link> : null)}</section>;
}

function PinkSlipPrompt({ record }: { record: ContentRecord }) {
  return <section className="crew-read crew-read--pink-slip"><span>Ask Pink Slip</span><p>Want a quick answer about {record.title}?</p><Link href={`/cipher?q=${encodeURIComponent(record.title)}`}>Ask Pink Slip <ArrowRight size={14} /></Link></section>;
}

function MediaHero({ record }: { record: ContentRecord }) {
  const media = primaryMediaFor(record.slug);
  if (!media?.imageUrl) return <div className={`entity-visual entity-visual--empty entity-visual--${record.family}`}><strong>Rockstar has not published an official image for this subject.</strong></div>;
  return <figure className="entity-visual"><img src={media.imageUrl} alt={`${media.title}, official media from ${media.sourcePublisher}`} /><figcaption><span>Official media</span><a href={media.sourceUrl} target="_blank" rel="noreferrer">{media.title} · {media.sourcePublisher} <ExternalLink size={13} /></a></figcaption></figure>;
}

function OfficialGallery({ record }: { record: ContentRecord }) {
  const media = mediaFor(record.slug);
  if (!media.length) return null;
  return <section className="media-gallery"><header><span>Official media</span><h2>See what was announced</h2></header><div>{media.map((asset) => asset.imageUrl ? <figure key={asset.id}><img src={asset.imageUrl} loading="lazy" alt={`${asset.title}, official media from ${asset.sourcePublisher}`} /><figcaption><div><b>{asset.title}</b><p>{asset.caption}</p></div><a href={asset.sourceUrl} target="_blank" rel="noreferrer">View at {asset.sourcePublisher} <ExternalLink size={12} /></a></figcaption></figure> : null)}</div></section>;
}

const videoBriefs: Record<string, { kicker: string; summary: string; details: string[]; links: Array<[string, string]> }> = {
  "extended-look": { kicker: "August 27, 2026 · In-game PS5 footage", summary: "Rockstar's newest official presentation is the clearest current view of GTA VI's world, cast, vehicles and activities.", details: ["Captured entirely from in-game footage on PlayStation 5", "Officially published by Rockstar Games", "Shows racing, basketball, kayaking and underwater activity"], links: [["Lucia", "/gta-6/characters/lucia-caminos"], ["Jason", "/gta-6/characters/jason-duval"], ["Extended Look breakdown", "/gta-6/guides/extended-look-breakdown"]] },
  "trailer-2": { kicker: "May 6, 2025 · Official trailer", summary: "Trailer 2 expands Jason and Lucia's story context and supplies source material for multiple character, region and vehicle dossiers.", details: ["Official Rockstar Games upload", "Jason and Lucia story focus", "Source for character and world observations"], links: [["Jason", "/gta-6/characters/jason-duval"], ["Lucia", "/gta-6/characters/lucia-caminos"], ["Trailer 2 breakdown", "/gta-6/guides/trailer-2-breakdown"]] },
  "trailer-1": { kicker: "December 4, 2023 · Official trailer", summary: "The first official trailer established Lucia, Vice City and Rockstar's modern Leonida setting.", details: ["Official Rockstar Games upload", "First GTA VI trailer", "Vice City and Leonida visual foundation"], links: [["Vice City", "/gta-6/locations/vice-city"], ["Trailer 1 vehicles", "/gta-6/vehicles/trailer-1"], ["Reveal timeline", "/gta-6/reveal-timeline"]] },
};

function OfficialVideoHub() {
  const videos = officialMedia.filter((asset) => asset.subjectId === "gta-6/trailers" && asset.youtubeId).sort((a, b) => a.sortOrder - b.sortOrder);
  return <section className="video-hub"><header><span>Official Rockstar videos</span><h2>GTA VI,<br />from the source.</h2><p>Watch each release, then open the related people, places and breakdowns.</p></header>{videos.map((video, index) => { const brief = videoBriefs[video.id]; return <article className={index === 0 ? "video-file video-file--featured" : "video-file"} key={video.id}><div className="video-frame"><iframe loading={index === 0 ? "eager" : "lazy"} src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0`} title={`${video.title} by Rockstar Games`} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div><div className="video-intel"><span>{brief.kicker}</span><h3>{video.title}</h3><p>{brief.summary}</p><ul>{brief.details.map((detail) => <li key={detail}><ShieldCheck size={13} />{detail}</li>)}</ul><nav>{brief.links.map(([label, href]) => <Link key={href} href={href}>{label}<ArrowRight size={13} /></Link>)}</nav><a href={video.sourceUrl} target="_blank" rel="noreferrer">Open official source <ExternalLink size={13} /></a></div></article>; })}</section>;
}

function NewsFeed() {
  const items = chronologicalPublicNews();
  return <section className="news-feed" aria-label="Latest GTA VI news">{items.map((item) => {
    const destination = publicNewsDestination(item);
    const media = item.existingPagesAffected.map((slug) => primaryMediaFor(slug)).find(Boolean);
    return <article key={item.id}>
      {media?.imageUrl ? <img src={media.imageUrl} alt={`${media.title}, official media from ${media.sourcePublisher}`} loading="lazy" /> : null}
      <div><time dateTime={item.originalPublicationDate}>{new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${item.originalPublicationDate}T00:00:00Z`))}</time>
        <h2>{item.headline}</h2><p>{item.publicSummary}</p>
        <span>{publicNewsAttribution(item)}</span>
        {destination ? <Link href={destination}>Read more <ArrowRight size={14} /></Link> : null}
      </div>
    </article>;
  })}</section>;
}

function FactStrip({ record }: { record: ContentRecord }) {
  const facts = record.facts.filter((fact) => !/^(evidence|confidence|verification)$/i.test(fact.label));
  return facts.length ? <dl className="fact-strip">{facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl> : null;
}

function StandardSections({ record, limit = record.sections.length }: { record: ContentRecord; limit?: number }) {
  return <>{record.sections.slice(0, limit).map((section, index) => <section className="article-section" key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p>{index === 0 ? <AdSlot kind="ARTICLE_MID" enabled={false} /> : index === 2 ? <AdSlot kind="ARTICLE_LATE" enabled={false} /> : null}</section>)}</>;
}

function ReleaseIntelligence({ record }: { record: ContentRecord }) {
  return <section className="launch-board"><Countdown /><div className="launch-facts"><span>Rockstar release details</span><h2>Plan for launch</h2><div><article><small>Release date</small><strong>{siteConfig.release.display}</strong><p>Confirmed by Rockstar · checked Aug 30, 2026</p></article><article><small>Platforms</small><strong>PS5 · Xbox Series X|S</strong><p>No PC launch date announced</p></article><article><small>Preorder</small><strong>Live</strong><p>Standard and Ultimate editions</p></article></div><nav><Link href="/gta-6/preorder">Open preorder center <ArrowRight size={14} /></Link><Link href="/gta-6/editions">Compare editions <ArrowRight size={14} /></Link></nav></div><p className="launch-answer">{record.directAnswer}</p></section>;
}

function OfficialVideoStory({ record }: { record: ContentRecord }) {
  const isExtended = record.slug.includes("extended-look");
  const isTrailerOne = record.slug.includes("trailer-1");
  const video = officialMedia.find((asset) => asset.id === (isExtended ? "extended-look" : record.slug.includes("trailer-1") ? "trailer-1" : "trailer-2"));
  const summary = isExtended
    ? "Rockstar identifies this as in-game PlayStation 5 footage. The page separates visible activities from mechanics the presentation does not explain."
    : isTrailerOne
      ? "Published December 4, 2023, the first trailer introduced Lucia and Rockstar's modern Vice City and Leonida setting."
      : "Published May 6, 2025, Trailer 2 brought Jason and Lucia's partnership and the wider supporting cast into sharper focus.";
  return <><section className="editorial-video"><div><span>Official Rockstar Games video</span><h2>{video?.title ?? "Official presentation"}</h2><p>{summary}</p><a href={video?.sourceUrl} target="_blank" rel="noreferrer">Official source <ExternalLink size={13} /></a></div><iframe loading="lazy" src={`https://www.youtube-nocookie.com/embed/${video?.youtubeId}?rel=0`} title={`${video?.title} by Rockstar Games`} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></section>{isExtended ? <OfficialGallery record={record} /> : null}</>;
}

function CommercePanel() {
  const offers = contentRepository.offers();
  return <section className="commerce-panel"><strong>Direct merchant routes</strong><p>No affiliate approval is claimed. Prices appear only when the cited merchant publishes one.</p>{offers.map((offer) => <a href={offer.merchantUrl} target="_blank" rel="sponsored nofollow noreferrer" key={offer.id}>{offer.merchant} · {offer.price ?? "Check current price"}<ExternalLink size={14} /></a>)}</section>;
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const requestedSlug = slug.join("/");
  if (requestedSlug === "crew") redirect("/cipher");
  const redirectTarget = canonicalRedirects[requestedSlug];
  if (redirectTarget) permanentRedirect(`/${redirectTarget}`);
  const record = contentRepository.bySlug(requestedSlug);
  if (!record) notFound();
  const isMap = record.slug === "gta-6/map";
  const isBuySmart = record.slug === "gta-6/buy-smart";
  const isCipher = record.slug === "cipher";
  const isSearch = record.slug === "search";
  const isRelease = record.slug === "gta-6/release-date" || record.slug === "gta-6/countdown";
  const isTrailers = record.slug === "gta-6/trailers";
  const isNews = record.slug === "gta-6/news";
  const isEntity = (entityFamilies.has(record.family) || record.slug === "gta-6/features/weapons") && !isMap;
  const isCharacter = record.family === "characters";
  const isLocation = record.family === "locations";
  const isCommercial = record.family === "commercial" || record.slug === "gta-6/preorder" || record.slug === "gta-6/editions";
  const isQuestion = record.family === "questions";
  const isVideoEditorial = record.family === "editorial" && (record.slug.includes("trailer-1") || record.slug.includes("trailer-2") || record.slug.includes("extended-look"));
  const isTrust = record.family === "trust";
  const hasLongTitle = record.title.length >= 38;
  const schema = {
    "@context": "https://schema.org",
    "@type": isQuestion ? "FAQPage" : isTrust ? "WebPage" : "Article",
    headline: record.title,
    description: record.description,
    dateModified: record.updatedAt,
    isPartOf: { "@type": "WebSite", name: siteConfig.brandName, url: siteConfig.domain },
    author: { "@type": "Organization", name: siteConfig.brandName },
    mainEntity: isQuestion ? [{ "@type": "Question", name: record.title, acceptedAnswer: { "@type": "Answer", text: record.directAnswer } }] : undefined,
  };

  if (isCipher || isSearch) return <div className="content-page app-page"><ContentHeader /><main>{isCipher ? <AssistantSurface /> : <SearchSurface />}</main>{isSearch ? <MobileNav /> : null}</div>;

  if (isTrust) return <div className="content-page content-page--trust"><ContentHeader />
    <div className="content-breadcrumbs content-breadcrumbs--trust"><Link href="/">Home</Link><span>/</span>Trust &amp; policy</div>
    <main className="trust-page">
      <header className="trust-hero"><span>GameplayAddict</span><h1>{record.title}</h1><p>{record.directAnswer}</p><small>Last updated September 3, 2026</small></header>
      <article className="trust-body">{record.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}</article>
    </main><Footer /><MobileNav /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /></div>;

  return <div className={`content-page content-page--${record.family}`}><ContentHeader />
    <div className="content-breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/gta-6">GTA VI</Link><span>/</span>{record.family}</div>
    <main>
      {isMap || isCommercial || isRelease || isQuestion ? <header className={`utility-route-head utility-route-head--${isMap ? "map" : isCommercial ? "commercial" : isRelease ? "release" : "answer"}${hasLongTitle ? " page-heading--long" : ""}`}><div><span className="content-kicker">{record.eyebrow}</span><h1>{record.title}</h1>{!isQuestion ? <p>{record.description}</p> : null}</div></header>
        : isEntity ? <header className="entity-hero"><MediaHero record={record} /><div className="entity-title"><span className="content-kicker">{record.eyebrow}</span><h1>{record.title}</h1><p>{record.description}</p><div className="claim-state"><ShieldCheck size={15} /><span>{evidenceLabel(record.evidence)}</span></div></div></header>
          : <header className={`content-hero${hasLongTitle ? " page-heading--long" : ""}`}><div><span className="content-kicker">{record.eyebrow}</span><h1>{record.title}</h1><p className="lede">{record.description}</p></div></header>}

      {isMap ? <div className="content-interactive map-product"><GridMap /></div> : null}
      {isBuySmart ? <div className="content-interactive"><BuySmart /></div> : null}
      {isRelease ? <div className="content-interactive"><ReleaseIntelligence record={record} /></div> : null}
      {isTrailers ? <div className="content-interactive"><OfficialVideoHub /></div> : isVideoEditorial ? <div className="content-interactive"><OfficialVideoStory record={record} /></div> : null}
      {isNews ? <div className="content-interactive"><NewsFeed /></div> : null}
      {isCommercial && !isBuySmart ? <div className="content-interactive"><CommercialDecisionTool slug={record.slug} /></div> : null}

      {!isMap && !isBuySmart && !isNews ? <div className={`content-main ${isQuestion ? "content-main--answer" : ""}`}><article>
        {isQuestion ? <section className="answer-first"><h2>{record.directAnswer}</h2><p>{evidenceLabel(record.evidence)}</p></section> : !isRelease && !isCommercial ? <section className="direct-answer"><p>{record.directAnswer}</p></section> : null}
        {!isQuestion ? <FactStrip record={record} /> : null}
        {!isQuestion ? <HubEntityShowcase slug={record.slug} /> : null}
        {isEntity ? isCharacter
          ? <><StandardSections record={record} /><OfficialGallery record={record} /><PinkSlipPrompt record={record} /></>
          : isLocation
            ? <><StandardSections record={record} /><OfficialGallery record={record} /><PinkSlipPrompt record={record} /></>
            : <><OfficialGallery record={record} /><StandardSections record={record} /><PinkSlipPrompt record={record} /></>
          : isCommercial ? <><section className="purchase-brief"><span>What you need to know</span><p>{record.directAnswer}</p></section>{mediaFor(record.slug).length ? <OfficialGallery record={record} /> : null}<StandardSections record={record} /></>
            : isQuestion ? null
              : <StandardSections record={record} />}
      </article><aside><SourcePanel record={record} /><RelatedPanel record={record} />{isCommercial ? <CommercePanel /> : !isEntity ? <PinkSlipPrompt record={record} /> : null}</aside></div> : null}
    </main><Footer /><MobileNav /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /></div>;
}
