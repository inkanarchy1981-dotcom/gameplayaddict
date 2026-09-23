"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Gamepad2, Map as MapIcon, Search, ShoppingBag } from "lucide-react";
import { PinkSlipHost } from "@/components/PinkSlipHost";
import { contentRepository } from "@/lib/repository";
import { track } from "@/lib/analytics";
import { evidenceLabel } from "@/lib/public-language";

export function AssistantSurface() { return <><PinkSlipHost /><MobileNav /></>; }

export function MobileNav() {
  const items = [
    { label: "Home", href: "/", icon: Gamepad2 },
    { label: "The Grid", href: "/gta-6/map", icon: MapIcon },
    { label: "Ask Pink Slip", href: "/cipher", icon: ShoppingBag, center: true },
    { label: "Search", href: "/search", icon: Search },
  ];
  return <nav className="mobile-bottom" aria-label="Mobile navigation">{items.map(({ label, href, icon: Icon, center }) => <Link key={label} href={href} className={center ? "bottom-cipher" : ""}><Icon /><span>{label}</span></Link>)}</nav>;
}

export function SearchSurface() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => query ? contentRepository.search(query).filter((record) => !["crew", "cipher"].includes(record.slug)) : contentRepository.all().filter((record) => ["characters", "locations", "vehicles", "commercial"].includes(record.family)).slice(0, 12), [query]);
  return <section className="search-surface"><header><span>Search GameplayAddict</span><h1>Find what you need.</h1><p>Characters, places, vehicles, launch facts, official media and buying guides.</p></header><div className="search-field"><Search /><input autoFocus value={query} onChange={(event) => { setQuery(event.target.value); track("search", { query: event.target.value }); }} placeholder="Search Lucia, Vice City, preorder, storage…" /></div><div className="search-results"><span>{query ? `${results.length} results` : "Popular pages"}</span>{results.map((record) => <Link href={`/${record.slug}`} key={record.slug}><i className={`evidence-dot evidence-dot--${record.evidence.toLowerCase()}`} /><div><strong>{record.title}</strong><p>{record.directAnswer}</p><small>{evidenceLabel(record.evidence)}</small></div><ArrowRight /></Link>)}</div></section>;
}

type ToolProps = { slug: string };
export function CommercialDecisionTool({ slug }: ToolProps) {
  const isStorage = slug.includes("storage");
  const isHeadset = slug.includes("headset");
  const [platform, setPlatform] = useState("PS5");
  const [budget, setBudget] = useState("Under $150");
  const [priority, setPriority] = useState(isStorage ? "More game space" : "Comfort");
  const output = isStorage
    ? platform === "PS5" ? "Use a compatible M.2 NVMe SSD that meets Sony’s current requirements. GTA VI’s final install size remains unknown, so choose capacity for your wider library—not a rumor." : "Xbox Series X|S optimized games require internal storage or an official Storage Expansion Card for direct play. USB storage remains useful for storing compatible titles."
    : isHeadset ? `Prioritize ${priority.toLowerCase()} and verified ${platform} compatibility. ${budget} is your ceiling; compare return terms and long-session comfort before brand extras.`
      : "Start with the platform and gap you actually have. Recommendations stay at category level until a current, sourced product shortlist is available.";
  return <section className="decision-tool"><div className="decision-head"><span>Pink Slip’s pick</span><h2>{isStorage ? "Build a storage plan" : isHeadset ? "Find your headset fit" : "Make the next purchase earn its place"}</h2></div><div className="decision-controls"><label>Platform<div>{["PS5", "Xbox Series X|S"].map((item) => <button key={item} className={platform === item ? "active" : ""} onClick={() => setPlatform(item)}>{item}</button>)}</div></label><label>Budget<div>{["Under $100", "Under $150", "$150+"].map((item) => <button key={item} className={budget === item ? "active" : ""} onClick={() => setBudget(item)}>{item}</button>)}</div></label><label>Priority<div>{(isStorage ? ["More game space", "Fast installs", "Portable backup"] : ["Comfort", "Clear mic", "Wireless", "Best value"]).map((item) => <button key={item} className={priority === item ? "active" : ""} onClick={() => setPriority(item)}>{item}</button>)}</div></label></div><div className="decision-result"><span>What I’d do</span><h3>{priority}</h3><p>{output}</p><div><CheckCircle2 /> No made-up GTA VI install size, partnership or price.</div></div></section>;
}
