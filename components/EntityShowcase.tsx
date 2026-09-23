/* eslint-disable @next/next/no-img-element -- official remote media is source-linked and pre-sized */
import Link from "next/link";
import { ArrowRight, ExternalLink, MapPinned } from "lucide-react";
import { characterResults, featureResults, locationResults, namedVehicleResults, observedVehicleCategories, type RichEntity } from "@/lib/entity-results";
import { officialMedia } from "@/lib/media";

export function EntityCards({ entities, compact = false }: { entities: RichEntity[]; compact?: boolean }) {
  return <div className={`entity-card-grid${compact ? " entity-card-grid--compact" : ""}`}>
    {entities.map((entity) => {
      const media = entity.mediaId ? officialMedia.find((asset) => asset.id === entity.mediaId) : undefined;
      return <article className="entity-answer-card" key={entity.id}>
        {media?.imageUrl ? <figure><img src={media.imageUrl} width="1280" height="720" loading="lazy" alt={`${entity.title}, official media from ${media.sourcePublisher}`} /><figcaption><a href={media.sourceUrl} target="_blank" rel="noreferrer">Official {media.sourcePublisher} image <ExternalLink size={11} /></a></figcaption></figure> : null}
        <div><span>{entity.status}</span><h3>{entity.title}</h3><p>{entity.summary}</p>{entity.detail ? <small>{entity.detail}</small> : null}<nav><Link href={`/${entity.slug}`}>More about {entity.title} <ArrowRight size={13} /></Link>{entity.gridHref ? <Link href={entity.gridHref}><MapPinned size={13} /> Open on The Grid</Link> : null}</nav></div>
      </article>;
    })}
  </div>;
}

export function HubEntityShowcase({ slug }: { slug: string }) {
  const isVehicles = slug === "gta-6/vehicles" || slug === "gta-6/guides/every-vehicle-observed";
  const isCharacters = slug === "gta-6/characters" || slug === "gta-6/guides/every-character-revealed";
  const isLocations = slug === "gta-6/locations" || slug === "gta-6/guides/every-location-revealed";
  const isFeatures = slug === "gta-6/features" || slug === "gta-6/confirmed-features";
  if (!isVehicles && !isCharacters && !isLocations && !isFeatures) return null;

  if (isVehicles) return <section className="hub-showcase"><header><span>Vehicles with official names</span><h2>The four cars Rockstar has named</h2><p>These names come from Rockstar&apos;s current sales material. The images below show the matching vehicle, not a generic car from the same class.</p></header><EntityCards entities={namedVehicleResults} /><section className="observed-groups"><header><span>Also seen in official media</span><h2>Vehicle classes across Leonida</h2><p>Rockstar has shown these broader groups, but many individual models still don&apos;t have confirmed names.</p></header><div>{observedVehicleCategories.map((group) => <Link href={group.href} key={group.href}><h3>{group.title}</h3><p>{group.detail}</p><span>See what was shown <ArrowRight size={13} /></span></Link>)}</div></section></section>;
  if (isCharacters) return <section className="hub-showcase"><header><span>Rockstar&apos;s revealed cast</span><h2>Meet the eight named characters</h2><p>Lucia and Jason lead the story. The wider cast reaches into robbery, music, nightlife and Vice City business.</p></header><EntityCards entities={characterResults} /></section>;
  if (isLocations) return <section className="hub-showcase"><header><span>Six named regions</span><h2>See Leonida, then open it on The Grid</h2><p>Each image comes from the matching official regional gallery. Grid markers are for orientation and don&apos;t claim unreleased coordinates.</p></header><EntityCards entities={locationResults} /></section>;
  return <section className="hub-showcase"><header><span>What Rockstar has shown or described</span><h2>Gameplay details with real substance</h2><p>Some are described working features; others are visible activities whose controls and rewards remain unknown.</p></header><EntityCards entities={featureResults} /></section>;
}
