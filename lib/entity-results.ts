export type RichEntity = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  detail?: string;
  status: "Official name" | "Official product" | "Confirmed by Rockstar" | "Shown in official footage";
  mediaId?: string;
  gridHref?: string;
};

export const characterResults: RichEntity[] = [
  { id: "lucia", title: "Lucia Caminos", slug: "gta-6/characters/lucia-caminos", summary: "A playable protagonist, a fighter fresh out of prison and Jason's partner.", detail: "Lucia and Jason can work together or move through Leonida independently.", status: "Official name", mediaId: "lucia-01" },
  { id: "jason", title: "Jason Duval", slug: "gta-6/characters/jason-duval", summary: "A playable protagonist, an ex-military drug runner and Lucia's partner.", detail: "Rockstar places their relationship at the center of GTA VI's story.", status: "Official name", mediaId: "jason-01" },
  { id: "cal", title: "Cal Hampton", slug: "gta-6/characters/cal-hampton", summary: "A member of the supporting cast whose full role is still unrevealed.", detail: "His official gallery shows rural, nightlife and poolside scenes.", status: "Official name", mediaId: "cal-01" },
  { id: "boobie", title: "Boobie Ike", slug: "gta-6/characters/boobie-ike", summary: "A Vice City businessman tied to nightlife, music and Dre'Quan Priest.", detail: "Rockstar connects him to Jack of Hearts and Only Raw Records.", status: "Official name", mediaId: "boobie-01" },
  { id: "drequan", title: "Dre'Quan Priest", slug: "gta-6/characters/drequan-priest", summary: "A music-focused hustler working through Only Raw Records.", detail: "He is linked to Boobie Ike and rap duo Real Dimez.", status: "Official name", mediaId: "drequan-01" },
  { id: "real-dimez", title: "Real Dimez", slug: "gta-6/characters/real-dimez", summary: "Bae-Luxe and Roxy, longtime friends who perform as a rap duo.", detail: "Their story connects to Dre'Quan Priest and Only Raw Records.", status: "Official name", mediaId: "real-dimez-01" },
  { id: "raul", title: "Raul Bautista", slug: "gta-6/characters/raul-bautista", summary: "An experienced bank robber whose official profile emphasizes charm and risk.", detail: "Rockstar has not revealed his specific scores or mission role.", status: "Official name", mediaId: "raul-01" },
  { id: "brian", title: "Brian Heder", slug: "gta-6/characters/brian-heder", summary: "A named supporting character seen around vehicles and tropical settings.", detail: "His wider role in Jason and Lucia's story remains unrevealed.", status: "Official name", mediaId: "brian-01" },
];

export const namedVehicleResults: RichEntity[] = [
  { id: "stanier", title: "'55 Vapid Stanier", slug: "gta-6/vehicles/55-vapid-stanier", summary: "A classic car included in the Vintage Vice City Pack.", detail: "Rockstar names it in current preorder material.", status: "Official name", mediaId: "stanier-01" },
  { id: "cheetah", title: "'95 Grotti Cheetah", slug: "gta-6/vehicles/sports-cars", summary: "A white performance car shown in current Ultimate Edition imagery.", detail: "The name comes directly from Rockstar's sales material.", status: "Official name", mediaId: "cheetah-01" },
  { id: "ganado", title: "Vapid Ganado Retro Build", slug: "gta-6/vehicles/off-road", summary: "A yellow-and-red off-road build shown in Ultimate Edition material.", detail: "Rockstar supplies the vehicle name with the official image.", status: "Official name", mediaId: "ganado-01" },
  { id: "dominator-buggy", title: "'67 Vapid Dominator Buggy", slug: "gta-6/vehicles/off-road", summary: "An off-road buggy pictured moving through wet, unpaved terrain.", detail: "Rockstar names it in current Ultimate Edition material.", status: "Official name", mediaId: "buggy-01" },
];

export const dualSenseControllerResults: RichEntity[] = [
  {
    id: "dualsense-gta6-black",
    title: "GTA VI Black Limited Edition DualSense",
    slug: "gta-6/best-controller",
    summary: "Sony's darker Vice City nightlife design, priced at $84.99 in the U.S.",
    detail: "Preorders open September 10. In supported PlayStation Direct markets, the Black edition is sold there exclusively; select retailers carry it in other regions.",
    status: "Official product",
    mediaId: "dualsense-gta6-black",
  },
  {
    id: "dualsense-gta6-white",
    title: "GTA VI White Limited Edition DualSense",
    slug: "gta-6/best-controller",
    summary: "Sony's lighter Vice City daybreak design, priced at $84.99 in the U.S.",
    detail: "Preorders open September 10 through PlayStation Direct and participating retailers, with availability varying by region.",
    status: "Official product",
    mediaId: "dualsense-gta6-white",
  },
];

export const observedVehicleCategories = [
  { title: "Sports and performance cars", href: "/gta-6/vehicles/sports-cars", detail: "Performance shapes appear throughout Vice City; most visible models still lack official names." },
  { title: "Classic cars", href: "/gta-6/vehicles/classics", detail: "Rockstar's Vintage Vice City material establishes the classic-car theme." },
  { title: "Police and emergency vehicles", href: "/gta-6/vehicles/police", detail: "Marked police vehicles appear in pursuit scenes, but the full fleet is unknown." },
  { title: "Motorcycles", href: "/gta-6/vehicles/motorcycles", detail: "Street and off-road motorcycles appear in city and rural imagery." },
  { title: "Off-road vehicles", href: "/gta-6/vehicles/off-road", detail: "Rural and wilderness scenes show vehicles built for mud and uneven ground." },
  { title: "Public and utility transport", href: "/gta-6/vehicles/public-transport", detail: "Buses, work trucks and industrial transport appear across Leonida." },
  { title: "Boats and airboats", href: "/gta-6/vehicles/boats", detail: "The coast, Leonida Keys and Grassrivers show several kinds of watercraft." },
  { title: "Aircraft", href: "/gta-6/vehicles/aircraft", detail: "Planes and helicopters appear in official scenes; the flyable roster is not published." },
];

export const locationResults: RichEntity[] = [
  { id: "vice-city", title: "Vice City", slug: "gta-6/locations/vice-city", summary: "GTA VI's principal modern coastal city and its best-established urban setting.", status: "Official name", mediaId: "vice-city-01", gridHref: "/gta-6/map?place=gta-6%2Flocations%2Fvice-city" },
  { id: "leonida-keys", title: "Leonida Keys", slug: "gta-6/locations/leonida-keys", summary: "A tropical island region shaped by bridges, boats and coastal settlements.", status: "Official name", mediaId: "keys-01", gridHref: "/gta-6/map?place=gta-6%2Flocations%2Fleonida-keys" },
  { id: "grassrivers", title: "Grassrivers", slug: "gta-6/locations/grassrivers", summary: "Leonida's wetland region, shown with waterways, wildlife and airboats.", status: "Official name", mediaId: "grassrivers-01", gridHref: "/gta-6/map?place=gta-6%2Flocations%2Fgrassrivers" },
  { id: "port-gellhorn", title: "Port Gellhorn", slug: "gta-6/locations/port-gellhorn", summary: "A rougher coastal region built around the remains of a former tourist destination.", status: "Official name", mediaId: "port-01", gridHref: "/gta-6/map?place=gta-6%2Flocations%2Fport-gellhorn" },
  { id: "ambrosia", title: "Ambrosia", slug: "gta-6/locations/ambrosia", summary: "An inland region tied to industry, sugar production and working communities.", status: "Official name", mediaId: "ambrosia-01", gridHref: "/gta-6/map?place=gta-6%2Flocations%2Fambrosia" },
  { id: "mount-kalaga", title: "Mount Kalaga National Park", slug: "gta-6/locations/mount-kalaga", summary: "The northern wilderness region, with forests, rocky terrain and outdoor activity.", status: "Official name", mediaId: "kalaga-01", gridHref: "/gta-6/map?place=gta-6%2Flocations%2Fmount-kalaga" },
];

export const featureResults: RichEntity[] = [
  { id: "switching", title: "Jason and Lucia switching", slug: "gta-6/features/dual-protagonists", summary: "The pair can be controlled together or independently, including driver-and-passenger changes during action.", status: "Confirmed by Rockstar" },
  { id: "body", title: "Body, exercise and rest", slug: "gta-6/features/body-weight-exercise", summary: "Food changes weight, exercise changes muscle tone and long periods without rest affect appearance.", status: "Confirmed by Rockstar" },
  { id: "social", title: "Phone and social feeds", slug: "gta-6/features/social-media", summary: "The in-game phone contains working social feeds, including use from the passenger seat.", status: "Confirmed by Rockstar" },
  { id: "reactions", title: "NPC and world reactions", slug: "gta-6/features/npcs-world-reactions", summary: "People react more closely to visible behavior, such as carrying a rifle openly.", status: "Confirmed by Rockstar" },
  { id: "racing", title: "Racing", slug: "gta-6/features/racing", summary: "Racing appears in official footage, though its full structure and rewards remain unknown.", status: "Shown in official footage" },
  { id: "basketball", title: "Basketball", slug: "gta-6/features/basketball", summary: "Basketball appears in official footage; Rockstar has not detailed its controls or progression.", status: "Shown in official footage" },
  { id: "scuba", title: "Scuba diving", slug: "gta-6/features/scuba-diving", summary: "Underwater activity appears in official footage, without a full explanation of its rules.", status: "Shown in official footage" },
  { id: "kayaking", title: "Kayaking", slug: "gta-6/features/kayaking", summary: "Kayaking appears in official footage and current vehicle imagery.", status: "Shown in official footage" },
];

export const richEntityBySlug = (slug: string) => [...characterResults, ...namedVehicleResults, ...dualSenseControllerResults, ...locationResults, ...featureResults].find((entity) => entity.slug === slug);
