"use client";
/* eslint-disable @next/next/no-img-element -- native image delivery avoids an unsupported runtime optimizer; assets are pre-sized WebP */

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Crosshair,
  Layers3,
  Map as MapIcon,
  Menu,
  Search,
  ShieldCheck,
  ShoppingBag,
  Zap,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { AdSlot } from "@/components/AdSlot";
import { contentRepository } from "@/lib/repository";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/site.config";
import type { ContentRecord } from "@/lib/types";
import { mediaFor, officialMedia, primaryMediaFor } from "@/lib/media";
import { MobileNav } from "@/components/ProductSurfaces";
import { PinkSlipHost } from "@/components/PinkSlipHost";
import { evidenceLabel } from "@/lib/public-language";
import { publicNewsAttribution, publicNewsDestination, rankedPublicNews } from "@/lib/news-intelligence";

const nav = [
  ["Home", "/"],
  ["The Grid", "/gta-6/map"],
  ["Ask Pink Slip", "/cipher"],
  ["Guides", "/gta-6/guides/everything-rockstar-confirmed"],
  ["Preorder", "/gta-6/preorder"],
] as const;

function Logo() {
  return <Link href="/" className="brand" aria-label="GameplayAddict home"><img src={siteConfig.logos.wordmark} alt="GameplayAddict" width={260} height={38} /></Link>;
}

export function Header({ onSearch }: { onSearch: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Logo />
      <nav aria-label="Primary navigation">
        {nav.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
      </nav>
      <div className="header-actions">
        <button className="icon-button" onClick={onSearch} aria-label="Search GameplayAddict"><Search size={19} /></button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="icon-button mobile-menu" aria-label="Open navigation"><Menu size={20} /></SheetTrigger>
          <SheetContent className="mobile-sheet" side="right">
            <SheetHeader>
              <SheetTitle><img src={siteConfig.logos.wordmark} alt="GameplayAddict" width={230} height={34} /></SheetTitle>
              <SheetDescription>Search GTA VI characters, places, vehicles and guides</SheetDescription>
            </SheetHeader>
            <nav className="sheet-nav" aria-label="Mobile navigation">
              {nav.map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)}>{label}<ChevronRight size={18} /></Link>)}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function SearchPalette({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => contentRepository.search(query).filter((record) => !["crew", "cipher"].includes(record.slug)), [query]);
  useEffect(() => { if (query) track("search", { query }); }, [query]);
  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Search GameplayAddict" description="Search characters, locations, vehicles, features, buying guides, and official sources.">
      <CommandInput value={query} onValueChange={setQuery} placeholder="Search characters, map, vehicles, preorder…" />
      <CommandList>
        <CommandEmpty>No verified result. Try a broader term.</CommandEmpty>
        <CommandGroup heading={query ? `${results.length} verified results` : "Quick routes"}>
          {(query ? results : contentRepository.all().filter((record) => !["crew", "cipher"].includes(record.slug)).slice(0, 8)).map((record) => (
            <CommandItem key={record.slug} value={`${record.title} ${record.slug}`} onSelect={() => { window.location.href = `/${record.slug}`; setOpen(false); }}>
              <span className={`evidence-dot evidence-dot--${record.evidence.toLowerCase()}`} />
              <span><strong>{record.title}</strong><small>{evidenceLabel(record.evidence)}</small></span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function Countdown() {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const tick = () => {
      const delta = Math.max(0, new Date(siteConfig.release.iso).getTime() - Date.now());
      setRemaining({ days: Math.floor(delta / 86400000), hours: Math.floor(delta / 3600000) % 24, mins: Math.floor(delta / 60000) % 60, secs: Math.floor(delta / 1000) % 60 });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);
  return <div className="countdown" aria-label={`Countdown to ${siteConfig.release.display}`}><span className="countdown-label">Launch window</span><div>{Object.entries(remaining).map(([label, value]) => <span key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></span>)}</div><p>{siteConfig.release.display} · PS5 · Xbox Series X|S</p></div>;
}

function GridMap({ compact = false }: { compact?: boolean }) {
  const markers = useMemo(() => contentRepository.all().filter((record) => record.map), []);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [selected, setSelected] = useState<ContentRecord | null>(markers.find((record) => record.slug.endsWith("vice-city")) ?? markers[2] ?? null);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const visible = markers.filter((record) => (filter === "all" || record.map?.category === filter) && record.title.toLowerCase().includes(query.toLowerCase()));
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("place");
    const match = requested ? markers.find((record) => record.slug === requested) : null;
    if (!match) return;
    const timer = window.setTimeout(() => {
      setSelected(match);
      setQuery(match.title);
      setFilter(match.map?.category ?? "all");
      track("map_marker_select", { slug: match.slug, source: "pink-slip" });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [markers]);
  const zoom = (delta: number) => setScale((value) => Math.min(2.2, Math.max(.75, Number((value + delta).toFixed(2)))));
  return (
    <section className={`grid-system ${compact ? "grid-system--compact" : ""}`} id="grid">
      <div className="grid-head"><div><span className="section-kicker">Explore Leonida</span><h2>The Grid</h2><p>Rockstar&apos;s named regions, arranged for browsing—not presented as the final game map.</p></div><div className="map-search"><Search size={16} /><input aria-label="Search map markers" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Grid" /></div></div>
      <div className="grid-layout">
        <div className="map-shell">
          <div className="map-toolbar" aria-label="Map filters">
            {[["all", "All"], ["region", "Regions"], ["location", "Places"]].map(([value, label]) => <button key={value} className={filter === value ? "active" : ""} onClick={() => { setFilter(value); track("map_filter", { filter: value }); }}>{label}</button>)}
          </div>
          <div
            className="map-canvas"
            onPointerDown={(e) => { if ((e.target as HTMLElement).closest("button")) return; e.currentTarget.setPointerCapture(e.pointerId); drag.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y }; }}
            onPointerMove={(e) => { if (drag.current) setOffset({ x: drag.current.ox + e.clientX - drag.current.x, y: drag.current.oy + e.clientY - drag.current.y }); }}
            onPointerUp={() => { drag.current = null; }}
            onWheel={(e) => { e.preventDefault(); zoom(e.deltaY > 0 ? -.1 : .1); }}
            role="application"
            aria-label="Interactive schematic map of officially named GTA VI regions"
          >
            <div className="map-land" style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}>
              <div className="coast coast-a" /><div className="coast coast-b" /><div className="coast coast-c" /><div className="waterway waterway-a" /><div className="waterway waterway-b" /><div className="road road-a" /><div className="road road-b" /><div className="road road-c" />
              {visible.map((record) => <button key={record.slug} className={`marker marker--${record.map?.category} ${selected?.slug === record.slug ? "selected" : ""}`} style={{ left: `${record.map?.x}%`, top: `${record.map?.y}%` }} onClick={(e) => { e.stopPropagation(); setSelected(record); track("map_marker_select", { slug: record.slug }); }} aria-label={`Select ${record.title}`}><span /><small>{record.title}</small></button>)}
              <span className="map-label map-label--vice">VICE CITY</span><span className="map-label map-label--north">NORTH LEONIDA</span><span className="map-label map-label--keys">THE KEYS</span>
            </div>
            <div className="map-zoom"><button onClick={() => zoom(.15)} aria-label="Zoom in"><ZoomIn size={18} /></button><button onClick={() => zoom(-.15)} aria-label="Zoom out"><ZoomOut size={18} /></button><button onClick={() => { setOffset({ x: 0, y: 0 }); setScale(1); }} aria-label="Reset map"><Crosshair size={18} /></button></div>
            <div className="map-legend"><span><i className="legend-official" /> Official name</span><span><i className="legend-schematic" /> Schematic position</span></div>
          </div>
        </div>
        <aside className="marker-drawer" aria-live="polite">
          {selected ? <>{primaryMediaFor(selected.slug)?.imageUrl ? <figure className="drawer-media"><img src={primaryMediaFor(selected.slug)?.imageUrl} alt={`${primaryMediaFor(selected.slug)?.title}, official Rockstar Games screenshot`} loading="lazy" /><figcaption><b>{primaryMediaFor(selected.slug)?.title}</b><span>{primaryMediaFor(selected.slug)?.caption}</span></figcaption></figure> : <div className="drawer-media drawer-media--empty"><span>No official image is available for this place.</span></div>}<span className="evidence-chip">{evidenceLabel(selected.evidence)}</span><h3>{selected.title}</h3><p>{selected.directAnswer}</p><dl>{selected.facts.slice(0, 3).map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl><Link href={`/${selected.slug}`} onClick={() => track("map_open", { slug: selected.slug })}>Open the full page <ArrowRight size={16} /></Link></> : <p>Select a marker to see what Rockstar has shown.</p>}
        </aside>
      </div>
    </section>
  );
}

function BuySmart() {
  const [budget, setBudget] = useState([300]);
  const [platform, setPlatform] = useState("PS5");
  const [owned, setOwned] = useState(["Console"]);
  const needs = ["Storage", "Headset", "Controller", "Display"];
  const priorityCopy: Record<string, string> = {
    Storage: "Match capacity to your platform and wider library",
    Headset: "Balance comfort, mic clarity, and platform support",
    Controller: "Prioritize platform fit, comfort, and serviceability",
    Display: "Check console features, room size, and viewing distance",
  };
  const recommendations = needs.filter((need) => !owned.includes(need)).slice(0, budget[0] < 180 ? 1 : budget[0] < 400 ? 2 : 3);
  return (
    <section className="buy-smart" id="buy-smart">
      <div className="pink-slip-art"><img src="/crew/web/pink-slip.webp" alt="Pink Slip, GameplayAddict host" className="fill-image crew-web-art" loading="lazy" /></div>
      <div className="buy-panel">
        <span className="section-kicker">Pink Slip · Buying & value</span><h2>Buy smart. <em>Not loud.</em></h2><p>Tell me what you own and your budget. I’ll show you what is worth considering next.</p>
        <div className="budget-row"><label>Budget <strong>${budget[0]}</strong></label><Slider value={budget} onValueChange={setBudget} min={50} max={1200} step={25} aria-label="Setup budget" /></div>
        <div className="platform-row" role="group" aria-label="Platform">{["PS5", "Xbox Series X|S"].map((item) => <button key={item} onClick={() => setPlatform(item)} className={platform === item ? "active" : ""}>{item}</button>)}</div>
        <fieldset><legend>Already own</legend><div className="owned-grid">{["Console", "Storage", "Headset", "Controller", "Display"].map((item) => <label key={item}><input type="checkbox" checked={owned.includes(item)} onChange={() => setOwned((items) => items.includes(item) ? items.filter((value) => value !== item) : [...items, item])} /><span>{item}</span></label>)}</div></fieldset>
        <div className="smart-result"><span>What to consider first · {platform}</span>{recommendations.length ? recommendations.map((item, index) => <Link href={`/gta-6/${item === "Display" ? "best-tv" : `best-${item.toLowerCase()}`}`} key={item}><b>0{index + 1}</b><span><strong>{item}</strong><small>{priorityCopy[item]}</small></span><ChevronRight size={17} /></Link>) : <p>Your listed setup covers the core categories. Keep the money until a real gap appears.</p>}</div>
        <small className="commercial-note">No affiliate partnerships are claimed. Prices are shown only where an official source currently publishes them.</small>
      </div>
    </section>
  );
}

function IntelRail() {
  const intel = rankedPublicNews(4);
  return <section className="intel-section"><div className="section-heading wide"><span>Latest GTA VI updates</span></div><div className="intel-stack">{intel.map((item, index) => { const href = publicNewsDestination(item); return <Link href={href} className="intel-item" key={item.id}><span>0{index + 1}</span><div><i>{publicNewsAttribution(item)}</i><h3>{item.headline}</h3><p>{item.publicSummary}</p></div><ArrowRight size={19} /></Link>; })}</div></section>;
}

function GuideMarquee() {
  const guides = contentRepository.byFamily("editorial").slice(0, 8);
  const visualBySlug: Record<string, string> = {
    "gta-6/guides/everything-rockstar-confirmed": "extended-look-still-02",
    "gta-6/guides/every-character-revealed": "lucia-01",
    "gta-6/guides/every-location-revealed": "vice-city-03",
    "gta-6/guides/every-vehicle-observed": "cheetah-01",
    "gta-6/guides/trailer-1-breakdown": "vice-city-01",
    "gta-6/guides/trailer-2-breakdown": "extended-look-still-01",
    "gta-6/guides/extended-look-breakdown": "extended-look-still-03",
    "gta-6/guides/launch-timeline": "jason-01",
  };
  return <section className="guide-section"><div className="section-heading wide"><span>Field Guides</span><p>Each guide uses relevant official imagery, never random wallpaper.</p></div><div className="guide-grid">{guides.map((guide, index) => { const visual = officialMedia.find((asset) => asset.id === visualBySlug[guide.slug]); return <Link href={`/${guide.slug}`} key={guide.slug} className={index === 0 ? "guide-feature" : "guide-card"}>{visual?.imageUrl ? <><img src={visual.imageUrl} alt={`${visual.title}, official GTA VI media by Rockstar Games`} loading="lazy" /><i className="guide-shade" /></> : null}<div className="guide-copy"><span>{guide.eyebrow}</span><h3>{guide.title}</h3><p>{guide.directAnswer}</p>{visual ? <small>{visual.title} · Rockstar Games</small> : null}<strong>Read file <ArrowRight size={15} /></strong></div></Link>; })}</div></section>;
}

function OfficialSignal() {
  return <section className="official-signal"><div><span className="section-kicker">Latest from Rockstar · Aug 27</span><h2>An Extended<br />Look.</h2><p>Captured entirely from in-game PlayStation 5 footage. GameplayAddict links the presentation to the people, places and features it shows.</p><Link href="/gta-6/trailers">Open all official videos <ArrowRight size={16} /></Link></div><div className="official-video"><iframe loading="lazy" src="https://www.youtube-nocookie.com/embed/GVTE_MuInQg?rel=0" title="Grand Theft Auto VI: An Extended Look by Rockstar Games" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div></section>;
}

function MediaPulse() {
  const files = [
    { record: contentRepository.bySlug("gta-6/characters/lucia-caminos"), label: "Current character file", media: mediaFor("gta-6/characters/lucia-caminos")[2] },
    { record: contentRepository.bySlug("gta-6/locations/vice-city"), label: "Current region file", media: mediaFor("gta-6/locations/vice-city")[2] },
  ].filter((file) => file.record && file.media?.imageUrl);
  return <section className="media-pulse"><header><span>Official GTA VI media</span><h2>People. Places. Proof.</h2><Link href="/gta-6/screenshots">Browse official images <ArrowRight size={14} /></Link></header><div>{files.map(({ record, label, media }) => <Link href={`/${record!.slug}`} key={record!.slug}><img src={media.imageUrl} alt={`${media.title}, official GTA VI screenshot by Rockstar Games`} loading="lazy" /><span>{label}</span><h3>{record!.title}</h3><p>{record!.directAnswer}</p><b>See details <ArrowRight size={13} /></b></Link>)}</div></section>;
}

function AlertSignup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const submit = async () => {
    if (!email.includes("@")) { setMessage("Enter a valid email address."); return; }
    const response = await fetch("/api/intel-alerts", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email }) });
    const data = await response.json() as { message: string };
    setMessage(data.message);
    if (response.ok) track("email_signup");
  };
  return <section className="alert-section"><div className="launch-status"><span>Launch status</span><strong>{siteConfig.release.display}</strong><p>PS5 · Xbox Series X|S</p><div><b>Preload</b><small>November 12, 2026</small></div><Link href="/gta-6/release-date">See launch details <ArrowRight size={14} /></Link></div><div><span className="section-kicker">GTA VI Alerts</span><h2>Signal, not noise.</h2><p>Major Rockstar news, preorder changes, price drops, release updates and new guides.</p><div className="signup-row"><label className="sr-only" htmlFor="alert-email">Email address</label><input id="alert-email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com" /><button onClick={submit}>Request alerts <ArrowRight size={17} /></button></div><small aria-live="polite">{message || "Nothing is sent until alerts are available."}</small></div></section>;
}

export function Footer() {
  const groups = [
    [siteConfig.footerLabels.intelligence, [["GTA VI Hub", "/gta-6"], ["The Grid", "/gta-6/map"], ["Characters", "/gta-6/characters"], ["Vehicles", "/gta-6/vehicles"]]],
    [siteConfig.footerLabels.commerce, [["Preorder", "/gta-6/preorder"], ["Buy Smart", "/gta-6/buy-smart"], ["Setup Guide", "/gta-6/gaming-setup"], ["Storage", "/gta-6/best-storage"]]],
    [siteConfig.footerLabels.trust, [["About", "/about"], ["Editorial", "/editorial-policy"], ["Verification", "/verification-policy"], ["Disclosure", "/affiliate-disclosure"]]],
  ] as const;
  return <footer><div className="footer-brand"><Logo /><p>{siteConfig.legalDisclaimer}</p></div>{groups.map(([label, links]) => <div key={label}><strong>{label}</strong>{links.map(([text, href]) => <Link key={text} href={href}>{text}</Link>)}</div>)}<div className="footer-bottom"><span>© 2026 {siteConfig.brandName}</span><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/contact">Contact</Link></div></footer>;
}

export function HomeExperience() {
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    const listener = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key === "k") { event.preventDefault(); setSearchOpen(true); } };
    window.addEventListener("keydown", listener); return () => window.removeEventListener("keydown", listener);
  }, []);
  return (
    <div className="site-shell">
      <Header onSearch={() => setSearchOpen(true)} /><SearchPalette open={searchOpen} setOpen={setSearchOpen} />
      <main>
        <section className="hero">
          <img src="https://www.rockstargames.com/VI/_next/static/media/Jason_Duval_01.07m377xeb6jhq.jpg?akim=1&imdensity=1&imwidth=1920" alt="Jason Duval in an official Grand Theft Auto VI screenshot published by Rockstar Games" width={1920} height={1080} fetchPriority="high" className="hero-bg fill-image" />
          <div className="hero-scan" /><div className="hero-content"><span className="hero-label"><i /> GTA VI · Before launch</span><h1>Play Leonida<br /><em>smarter.</em></h1><p>Rockstar facts, official images and practical launch prep—without turning rumors into features.</p><div className="hero-actions"><Link href="/cipher" className="button-primary"><ShoppingBag size={19} /> Ask Pink Slip <ArrowRight size={17} /></Link><Link href="/gta-6/map" className="button-ghost"><MapIcon size={18} /> Open The Grid</Link></div><div className="hero-proof"><span><ShieldCheck /> Sources attached</span><span><Zap /> Built for mobile</span><span><Layers3 /> 100+ useful pages</span></div><a className="hero-attribution" href="https://www.rockstargames.com/VI/media/screenshots" target="_blank" rel="noreferrer">Official GTA VI screenshot · Rockstar Games</a></div>
          <div className="hero-side"><Countdown /><div className="confidence-card"><div><ShieldCheck /><span><b>Confirmed</b><small>Rockstar Games</small></span></div><p>Release date, platforms, prices, preorders and named locations checked August 30, 2026.</p><Link href="/verification-policy">How facts are checked <ArrowRight size={14} /></Link></div></div>
        </section>
        <div className="experience-wrap"><PinkSlipHost compact /><GridMap compact /><OfficialSignal /><MediaPulse /><AdSlot kind="CONTENT_BREAK" enabled={false} /><IntelRail /><BuySmart /><AdSlot kind="DESKTOP_INLINE" enabled={false} /><GuideMarquee /><AdSlot kind="CONTENT_BREAK" enabled={false} /><AlertSignup /></div>
      </main><Footer /><MobileNav />
    </div>
  );
}

export function ContentSearchButton() {
  const [open, setOpen] = useState(false);
  return <><button className="icon-button" onClick={() => setOpen(true)} aria-label="Search"><Search size={19} /></button><SearchPalette open={open} setOpen={setOpen} /></>;
}

export function ContentHeader() {
  const [open, setOpen] = useState(false);
  return <><Header onSearch={() => setOpen(true)} /><SearchPalette open={open} setOpen={setOpen} /></>;
}

export { GridMap, BuySmart };
