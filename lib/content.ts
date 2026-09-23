import type { CommercialOffer, ContentFamily, ContentRecord, EvidenceState, Source } from "./types";
import { canonicalRedirects, publicationFor } from "./indexing";

export const sources: Source[] = [
  {
    id: "rockstar-hub",
    title: "Grand Theft Auto VI",
    publisher: "Rockstar Games",
    url: "https://www.rockstargames.com/VI",
    publishedAt: "2023-12-04",
    lastVerified: "2026-08-30",
    official: true,
  },
  {
    id: "rockstar-release",
    title: "Grand Theft Auto VI is Now Set to Launch November 19, 2026",
    publisher: "Rockstar Games",
    url: "https://www.rockstargames.com/newswire/article/ak3ak31a49a221/grand-theft-auto-vi-is-now-set-to-launch-november-19-2026",
    publishedAt: "2025-11-06",
    lastVerified: "2026-08-30",
    official: true,
  },
  {
    id: "rockstar-preorder",
    title: "Pre-Order Grand Theft Auto VI",
    publisher: "Rockstar Games",
    url: "https://store.rockstargames.com/game/buy-gta-vi",
    publishedAt: "2026-06-24",
    lastVerified: "2026-08-30",
    official: true,
  },
  {
    id: "rockstar-leonida",
    title: "Only in Leonida",
    publisher: "Rockstar Games",
    url: "https://www.rockstargames.com/VI/only-in-leonida",
    publishedAt: "2025-05-06",
    lastVerified: "2026-08-30",
    official: true,
  },
  {
    id: "rockstar-media",
    title: "GTA VI Screenshots",
    publisher: "Rockstar Games",
    url: "https://www.rockstargames.com/VI/media/screenshots",
    publishedAt: "2026-08-06",
    lastVerified: "2026-08-30",
    official: true,
  },
  {
    id: "rockstar-extended",
    title: "Grand Theft Auto VI: An Extended Look",
    publisher: "Rockstar Games",
    url: "https://www.rockstargames.com/newswire/article/9k2kaa1o3297k9/grand-theft-auto-vi-an-extended-look",
    publishedAt: "2026-08-27",
    lastVerified: "2026-08-30",
    official: true,
  },
  {
    id: "playstation-store",
    title: "Grand Theft Auto VI",
    publisher: "PlayStation Store",
    url: "https://store.playstation.com/en-us/concept/10000730",
    publishedAt: "2026-06-25",
    lastVerified: "2026-08-30",
    official: true,
  },
  {
    id: "playstation-dualsense-gta6",
    title: "First look at the Grand Theft Auto VI Limited-Edition DualSense Wireless Controllers",
    publisher: "Sony Interactive Entertainment",
    url: "https://blog.playstation.com/2026/09/03/first-look-at-the-grand-theft-auto-vi-limited-edition-dualsense-wireless-controllers/",
    publishedAt: "2026-09-03",
    lastVerified: "2026-09-04",
    official: true,
  },
  {
    id: "playstation-state-of-play-2026-09-03",
    title: "State of Play & State of Play Japan: all announcements, trailers",
    publisher: "Sony Interactive Entertainment",
    url: "https://blog.playstation.com/2026/09/03/state-of-play-state-of-play-japan-all-announcements-trailers/",
    publishedAt: "2026-09-03",
    lastVerified: "2026-09-04",
    official: true,
  },
  {
    id: "miami-dade-gta-vi-opposition-2026-09-03",
    title: "Commissioner Juan Carlos Bermudez and Sheriff Rosie Cordero-Stutz Call on Miami-Dade County to Reject Use of County Resources to Promote Grand Theft Auto VI",
    publisher: "Miami-Dade County",
    url: "https://www.miamidade.gov/global/release.page?Mduid_release=rel1788447602441436",
    publishedAt: "2026-09-03",
    lastVerified: "2026-09-07",
    official: true,
  },
  {
    id: "axios-miami-gta-vi-proposal-2026-08-28",
    title: "How Miami could get a Grand Theft Auto-themed transformation",
    publisher: "Axios Miami",
    url: "https://www.axios.com/local/miami/2026/08/28/grand-theft-auto-miami-rockstar-games-marketing-vice-city",
    publishedAt: "2026-08-28",
    lastVerified: "2026-09-07",
    official: false,
  },
  {
    id: "axios-miami-gta-vi-opposition-2026-09-03",
    title: "Miami-Dade sheriff slams Grand Theft Auto marketing proposal",
    publisher: "Axios Miami",
    url: "https://www.axios.com/local/miami/2026/09/03/miami-grand-theft-auto-police-backlash-marketing",
    publishedAt: "2026-09-03",
    lastVerified: "2026-09-07",
    official: false,
  },
  {
    id: "cbs-miami-gta-vi-opposition-2026-09-03",
    title: "Miami-Dade commissioner says proposed GTA VI partnership glorifies violence against police, pedestrians",
    publisher: "CBS News Miami",
    url: "https://www.cbsnews.com/miami/news/miami-dade-grand-theft-auto-partnership-pushback-september-2026/",
    publishedAt: "2026-09-03",
    lastVerified: "2026-09-07",
    official: false,
  },
  {
    id: "dazed-rockstar-interview",
    title: "GTAVI: An exclusive deep dive into the video game of the decade",
    publisher: "Dazed",
    url: "https://www.dazeddigital.com/life-culture/article/70859/1/gta-6-grand-theft-auto-vi-rockstar-exclusive-deep-dive-game-unparalleled-world",
    publishedAt: "2026-08-26",
    lastVerified: "2026-09-01",
    official: false,
  },
  {
    id: "tomshardware-performance-report",
    title: "GTA VI console performance report",
    publisher: "Tom's Hardware",
    url: "https://www.tomshardware.com/video-games/grand-theft-auto-6-will-run-at-only-30-fps-on-consoles-at-launch-no-performance-mode-promised-even-the-souped-up-ps5-pro-might-not-get-60-fps-support",
    publishedAt: "2026-08-29",
    lastVerified: "2026-09-01",
    official: false,
  },
  {
    id: "netflix-top-ten-2026-09-01",
    title: "Grand Theft Auto VI: An Extended Look Soars to No. 1 in This Week's Top 10",
    publisher: "Netflix",
    url: "https://www.netflix.com/tudum/articles/top-10-august-24-2026",
    publishedAt: "2026-09-01",
    lastVerified: "2026-09-03",
    official: true,
  },
  {
    id: "adsense-policy",
    title: "AdSense Program policies",
    publisher: "Google",
    url: "https://support.google.com/adsense/answer/48182",
    publishedAt: "2026-01-01",
    lastVerified: "2026-08-30",
    official: true,
  },
];

type Seed = {
  slug: string;
  title: string;
  answer: string;
  evidence?: EvidenceState;
  sourceIds?: string[];
  crew?: ContentRecord["crew"];
  facts?: Array<{ label: string; value: string }>;
  map?: ContentRecord["map"];
  description?: string;
  sections?: ContentRecord["sections"];
};

type EditorialProfile = {
  description: string;
  facts?: ContentRecord["facts"];
  sections: ContentRecord["sections"];
};

const characterEditorial: Record<string, EditorialProfile> = {
  "gta-6/characters": {
    description: "Rockstar has named eight GTA VI characters. Lucia Caminos and Jason Duval lead the story, while the supporting cast reaches into robbery, music, nightlife and local business.",
    facts: [{ label: "Named cast", value: "8 people" }, { label: "Protagonists", value: "Lucia · Jason" }, { label: "Official gallery", value: "Available" }],
    sections: [
      { heading: "The central pair", body: "Lucia Caminos and Jason Duval anchor Rockstar's story material. Their shared scenes establish a close criminal partnership; the full shape and outcome of that story remain unreleased." },
      { heading: "Music and business", body: "Boobie Ike is tied to Dre'Quan Priest, Jack of Hearts and Only Raw Records. Dre'Quan works with rap duo Real Dimez, whose members Bae-Luxe and Roxy have been friends since high school." },
      { heading: "The rest of the revealed cast", body: "Raul Bautista is an experienced bank robber. Cal Hampton and Brian Heder also have official profiles and image galleries, although much of their role in Jason and Lucia's story remains unreleased." },
    ],
  },
  "gta-6/characters/lucia-caminos": {
    description: "Lucia Caminos is GTA VI's fighter fresh out of prison and one half of its playable couple. She can work alongside Jason Duval or move through Leonida independently.",
    facts: [{ label: "Role", value: "Playable protagonist" }, { label: "Known background", value: "Fighter · recently imprisoned" }, { label: "Playable partner", value: "Jason Duval" }],
    sections: [
      { heading: "Appearance", body: "Official portraits show Lucia with dark hair pulled back and a practical, athletic wardrobe. The gallery moves from an institutional interior to poolside, street, nightclub and driving scenes." },
      { heading: "Known backstory", body: "Rockstar's developers describe Lucia as a fighter fresh out of prison. Official material connects that imprisonment to Leonida Penitentiary and shows her trying to turn hard-earned survival into a better plan." },
      { heading: "Relationships", body: "Lucia and Jason are GTA's first lead playable couple. Players can keep them together or let either protagonist operate independently; Rockstar calls the story a Bonnie-and-Clyde-type narrative, but has not revealed how player choices change the relationship." },
      { heading: "Official appearances", body: "Lucia appears in Rockstar's character collection, launch artwork, official trailers and the extended presentation. Those sources support her identity and central role without revealing the full mission sequence." },
      { heading: "Still unknown", body: "Rockstar has not disclosed Lucia's complete history, player-specific abilities, progression path or story outcome." },
    ],
  },
  "gta-6/characters/jason-duval": {
    description: "Jason Duval is GTA VI's ex-military drug runner and Lucia Caminos's playable partner. Players can control the pair together or send Jason into Leonida on his own.",
    facts: [{ label: "Role", value: "Playable protagonist" }, { label: "Known background", value: "Ex-military drug runner" }, { label: "Playable partner", value: "Lucia Caminos" }],
    sections: [
      { heading: "Appearance", body: "Rockstar's stills show Jason with close-cropped hair and understated casual clothing. He is pictured driving, beside an off-road motorcycle, at a crowded bar and masked near the water." },
      { heading: "Known backstory", body: "Rockstar's developers identify Jason as an ex-military drug runner. His service history, route into the drug trade and the point where he met Lucia have not been disclosed." },
      { heading: "Relationships", body: "Lucia is both Jason's romantic partner and the other playable lead. The control system allows Jason to drive while Lucia uses the in-game phone, then lets the player swap seats and roles during a chase." },
      { heading: "Official appearances", body: "Jason appears in the character collection, official trailers, promotional art and the extended presentation. The gallery records specific scenes without assigning unrevealed missions to them." },
      { heading: "Still unknown", body: "Rockstar has not published Jason's full biography, unique player systems, progression details or ending." },
    ],
  },
  "gta-6/characters/cal-hampton": {
    description: "Cal Hampton is a named supporting character in Rockstar's cast. His official images place him in rural daylight, a neon-lit gathering and a deliberately playful pool scene.",
    facts: [{ label: "Role", value: "Supporting cast" }, { label: "Portrait set", value: "3 official stills" }, { label: "Story scope", value: "Partly unrevealed" }],
    sections: [
      { heading: "Appearance", body: "Cal is shown with a beard, glasses and casual clothes suited to Leonida's heat. The official gallery gives him a relaxed visual presence rather than an action-heavy introduction." },
      { heading: "Known backstory", body: "Rockstar has named and profiled Cal, but the current record does not support a detailed plot summary or a player-facing function." },
      { heading: "Relationships", body: "No relationship should be added to this file unless Rockstar's character material names it directly. Shared settings alone are not enough." },
      { heading: "Official appearances", body: "His three published stills are the strongest visual source currently attached to this dossier." },
      { heading: "Still unknown", body: "Cal's mission involvement, broader history and final place in the story remain unpublished." },
    ],
  },
  "gta-6/characters/boobie-ike": {
    description: "Boobie Ike is a Vice City businessman with ties to nightlife and music. Rockstar connects him directly to Dre'Quan Priest and frames him inside the city's club economy.",
    facts: [{ label: "Role", value: "Business figure" }, { label: "Known connection", value: "Dre'Quan Priest" }, { label: "Associated venue", value: "Jack of Hearts" }],
    sections: [
      { heading: "Appearance", body: "Boobie's portraits favor patterned clothing, jewelry and saturated club lighting. One official still places the Jack of Hearts name directly behind him." },
      { heading: "Known backstory", body: "Rockstar presents Boobie as an established local operator whose interests reach into Vice City business and music." },
      { heading: "Relationships", body: "Dre'Quan Priest is Boobie Ike's clearest named connection. Jack of Hearts and Only Raw Records place that relationship inside Vice City's music business." },
      { heading: "Official appearances", body: "The character collection shows Boobie at a neon-lit table, outside Jack of Hearts and inside a club." },
      { heading: "Still unknown", body: "Ownership mechanics, player access, payouts and mission structure connected to his businesses are not published." },
    ],
  },
  "gta-6/characters/drequan-priest": {
    description: "Dre'Quan Priest is a music-focused hustler working through Only Raw Records. Rockstar links him to Boobie Ike and the rap duo Real Dimez.",
    facts: [{ label: "Role", value: "Music entrepreneur" }, { label: "Label", value: "Only Raw Records" }, { label: "Known artists", value: "Real Dimez" }],
    sections: [
      { heading: "Appearance", body: "Dre'Quan's official images place him in performance and nightlife settings, often under purple stage light and close to artists." },
      { heading: "Known backstory", body: "Rockstar's profile centers his ambition in music rather than supplying a wider criminal biography." },
      { heading: "Relationships", body: "Only Raw Records connects Dre'Quan to Real Dimez, while Boobie Ike provides the established business link." },
      { heading: "Official appearances", body: "His gallery shows him with Real Dimez, near a live stage and inside a performance venue." },
      { heading: "Still unknown", body: "The label's player-facing role, revenue systems and mission access have not been announced." },
    ],
  },
  "gta-6/characters/real-dimez": {
    description: "Real Dimez are Bae-Luxe and Roxy, longtime friends who perform as a rap duo. Rockstar places them inside the Only Raw Records story with Dre'Quan Priest.",
    facts: [{ label: "Members", value: "Bae-Luxe · Roxy" }, { label: "Role", value: "Rap duo" }, { label: "Label", value: "Only Raw Records" }],
    sections: [
      { heading: "Appearance", body: "The official stills present the duo together in studio, performance and car scenes, with coordinated styling and vivid music-video lighting." },
      { heading: "Known backstory", body: "Rockstar identifies Bae-Luxe and Roxy as friends since high school whose earlier local hit preceded their link to Only Raw Records." },
      { heading: "Relationships", body: "Dre'Quan Priest and Only Raw Records are the supported music-business connections. Broader alliances are not assumed from shared scenes." },
      { heading: "Official appearances", body: "Their three-character-gallery images cover a studio portrait, a live performance and a night scene viewed through a car window." },
      { heading: "Still unknown", body: "Rockstar has not detailed their mission role, playable activities or the label's business systems." },
    ],
  },
  "gta-6/characters/raul-bautista": {
    description: "Raul Bautista is an experienced bank robber in Rockstar's revealed cast. His official profile emphasizes charm and calculated risk rather than disclosing specific scores.",
    facts: [{ label: "Role", value: "Bank robber" }, { label: "Portrait set", value: "3 official stills" }, { label: "Mission details", value: "Unknown" }],
    sections: [
      { heading: "Appearance", body: "Raul is shown in polished casual clothing across a cool-lit portrait, a car interior and a room containing equipment." },
      { heading: "Known backstory", body: "Rockstar describes him as seasoned, confident and increasingly willing to raise the stakes. No robbery name, target or payout is supplied." },
      { heading: "Relationships", body: "The current verified record does not name a specific partnership beyond his place in the revealed cast." },
      { heading: "Official appearances", body: "The attached character stills are the primary visual evidence for Raul; scene context should not be promoted into a mission claim." },
      { heading: "Still unknown", body: "His connection to Jason and Lucia, mission sequence and gameplay function remain unrevealed." },
    ],
  },
  "gta-6/characters/brian-heder": {
    description: "Brian Heder is one of Rockstar's named supporting characters. His official gallery places him around vehicles and tropical outdoor settings, while his wider story role remains limited in the published record.",
    facts: [{ label: "Role", value: "Supporting cast" }, { label: "Official stills", value: "3 cataloged" }, { label: "Detailed biography", value: "Not yet published here" }],
    sections: [
      { heading: "Appearance", body: "Brian is shown as an older man in casual clothes, pictured driving, outdoors at night and holding paperwork inside a vehicle." },
      { heading: "Known backstory", body: "The current dossier has strong visual coverage but only a limited supported biography, so it does not assign him an unverified occupation or mission chain." },
      { heading: "Relationships", body: "Any link to another character or business must come from Rockstar's published profile, not from proximity in a still." },
      { heading: "Official appearances", body: "Rockstar's character collection includes three published images of Brian in Leonida settings." },
      { heading: "Still unknown", body: "Brian's full history, alliances and player-facing role have not been established." },
    ],
  },
};

const locationEditorial: Record<string, EditorialProfile> = {
  "gta-6/locations": {
    description: "Rockstar has named six major Leonida regions, from Vice City's coast and the island roads of the Keys to Grassrivers wetlands, Ambrosia industry and Mount Kalaga wilderness.",
    facts: [{ label: "Named regions", value: "6" }, { label: "Primary city", value: "Vice City" }, { label: "Published map", value: "Not yet" }],
    sections: [
      { heading: "Six different faces of Leonida", body: "Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga National Park each receive a distinct official visual treatment." },
      { heading: "Named places inside the regions", body: "Leonida Penitentiary is tied directly to Lucia's history. Brian's Boat Works and Thrillbilly Mud Club sit within the Keys material, Uncle Jack's Liquor appears in Port Gellhorn and Allied Crystal Sugar anchors Ambrosia." },
      { heading: "Explore them in The Grid", body: "The Grid opens each named place and region from one map. Its markers are approximate because Rockstar has not published final borders, roads or distances." },
    ],
  },
  "gta-6/map": {
    description: "Explore Rockstar's named Leonida regions on a searchable browsing map. Marker positions are approximate because Rockstar has not published the final game map.",
    facts: [{ label: "Map type", value: "Evidence schematic" }, { label: "Official geometry", value: "Not published" }, { label: "Named regions", value: "6" }],
    sections: [
      { heading: "What the map can answer", body: "Use category filters and marker search to move among officially named regions and places with attached records." },
      { heading: "What the map cannot answer", body: "Rockstar has not released a complete authoritative map, so the interface does not claim exact coastlines, scale, roads or distances." },
    ],
  },
  "gta-6/locations/vice-city": {
    description: "Vice City is GTA VI's principal coastal city, shown through beaches, towers, highways, nightlife and dense street life across Rockstar's official media.",
    facts: [{ label: "Place type", value: "Major city" }, { label: "State", value: "Leonida" }, { label: "Grid position", value: "Schematic" }],
    sections: [
      { heading: "A city built around the coast", body: "Rockstar's images pair a broad oceanfront with high-rise districts, bridges and multilane roads. Palm-lined streets and crowded beaches establish the city's modern tropical character." },
      { heading: "What Rockstar has shown", body: "Official material moves between daylight leisure, neon nightlife, traffic, storefronts and emergency scenes. Those images establish variety, not a complete district list." },
      { heading: "Connections across the cast", body: "Lucia and Jason appear repeatedly in Vice City settings. Boobie Ike, Dre'Quan Priest and Real Dimez connect the city to its club and music scenes." },
      { heading: "The reported Miami marketing proposal", body: "Miami-Dade officials are publicly debating a reported GTA VI campaign that could include temporary Vice City branding at Miami International Airport. Nothing has been approved, and Rockstar has not announced a partnership." },
      { heading: "Open Vice City in The Grid", body: "The city node connects to beaches, businesses and nearby region files. Its plotted position is a navigation aid rather than Rockstar-published coordinates." },
    ],
  },
  "gta-6/locations/leonida": {
    description: "Leonida is Rockstar's fictional state around Vice City. Official region pages move from island roads and wetlands to industrial towns, rough coastal settlements and mountain country.",
    facts: [{ label: "Place type", value: "Fictional state" }, { label: "Named regions", value: "6" }, { label: "Central city", value: "Vice City" }],
    sections: [
      { heading: "More than Vice City", body: "Leonida's published imagery includes the Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga in addition to the city itself." },
      { heading: "Visual range", body: "Rockstar contrasts tropical coastline with wetlands, sugar industry, older roadside development and wooded high country." },
      { heading: "Geography still withheld", body: "The official material names and depicts regions but does not supply a final full map, exact borders or an area measurement." },
      { heading: "Use the Grid as an index", body: "The Grid groups the named sectors and opens their evidence files. It is deliberately schematic until Rockstar publishes authoritative geometry." },
    ],
  },
  "gta-6/locations/leonida-keys": {
    description: "The Leonida Keys are Rockstar's tropical island region, pictured through low bridges, open water, boats and settlements spread along the coast.",
    facts: [{ label: "Place type", value: "Island region" }, { label: "Visual anchors", value: "Bridges · boats · water" }, { label: "Grid position", value: "Schematic" }],
    sections: [
      { heading: "Roads over water", body: "Official views emphasize causeways, low islands and the close relationship between homes, roads and the sea." },
      { heading: "What appears in the region", body: "Boats, motorcycles and waterfront properties appear in the Keys material. The images support a water-oriented setting, not a complete activity list." },
      { heading: "Known connections", body: "Brian's Boat Works and the Thrillbilly Mud Club are named files associated with the wider Keys material." },
      { heading: "Before using the Grid", body: "The Keys node is positioned for orientation only. Individual islands, routes and travel times are not official map claims." },
    ],
  },
  "gta-6/locations/grassrivers": {
    description: "Grassrivers is Leonida's wetland region, shown through shallow waterways, airboats, wildlife and settlements adapted to the swamp.",
    facts: [{ label: "Place type", value: "Wetland region" }, { label: "Observed transport", value: "Airboats" }, { label: "Exact boundaries", value: "Unknown" }],
    sections: [
      { heading: "Water defines the landscape", body: "Rockstar's region imagery favors low horizons, dense vegetation and channels cutting through the wetlands." },
      { heading: "What the images support", body: "Airboats and wildlife are visibly present. Their controls, species systems and activity structure are not fully described." },
      { heading: "A distinct Leonida sector", body: "Grassrivers supplies a rural water environment that contrasts with Vice City's beaches and Ambrosia's industry." },
      { heading: "Grid note", body: "The marker connects the wetland records but does not assert an official shoreline or navigable network." },
    ],
  },
  "gta-6/locations/port-gellhorn": {
    description: "Port Gellhorn is Rockstar's weathered coastal region, presented through motels, strip malls, roadside businesses and the remains of an older tourist economy.",
    facts: [{ label: "Place type", value: "Coastal region" }, { label: "Known business", value: "Uncle Jack's Liquor" }, { label: "Grid position", value: "Schematic" }],
    sections: [
      { heading: "A coast past its prime", body: "The official visual language is worn rather than glamorous: low-rise development, dated signage and hard-edged roadside spaces replace Vice City's skyline." },
      { heading: "What Rockstar has shown", body: "Published images establish the region's atmosphere and built environment. They do not define every neighborhood, interior or activity." },
      { heading: "Named connection", body: "Uncle Jack's Liquor is one of the businesses attached to Port Gellhorn's official world material." },
      { heading: "Grid note", body: "The western placement helps separate this sector from Vice City in the interface; it is not an official distance or border." },
    ],
  },
  "gta-6/locations/ambrosia": {
    description: "Ambrosia is Leonida's industrial inland region, with sugar production, freight infrastructure and working communities at the center of its official imagery.",
    facts: [{ label: "Place type", value: "Industrial region" }, { label: "Named operation", value: "Allied Crystal Sugar" }, { label: "Exact scale", value: "Unknown" }],
    sections: [
      { heading: "Industry sets the scene", body: "Rockstar depicts processing structures, heavy equipment and transport links rather than the resort imagery used for the coast." },
      { heading: "What is actually named", body: "Allied Crystal Sugar anchors Ambrosia's published identity. The record does not convert that business into a confirmed player-owned operation." },
      { heading: "Connection to wider Leonida", body: "Ambrosia expands the setting beyond tourism and nightlife by showing the industrial work that supports the state." },
      { heading: "Grid note", body: "Its inland node is schematic. Official roads, borders and travel times have not been supplied." },
    ],
  },
  "gta-6/locations/mount-kalaga": {
    description: "Mount Kalaga National Park is Rockstar's northern wilderness region, pictured with forest, elevation and outdoor recreation far from Vice City's streets.",
    facts: [{ label: "Place type", value: "National park" }, { label: "Setting", value: "Northern wilderness" }, { label: "Map scale", value: "Unknown" }],
    sections: [
      { heading: "Leonida at higher ground", body: "The official stills use wooded slopes, open viewpoints and rugged terrain to distinguish Mount Kalaga from the state's low coastal regions." },
      { heading: "Observed outdoor activity", body: "Rockstar's material supports an outdoor recreation setting. Specific systems, routes, rewards and access rules require later confirmation." },
      { heading: "Regional contrast", body: "Mount Kalaga gives the revealed world a wilderness counterpoint to Vice City, the Keys and Grassrivers." },
      { heading: "Grid note", body: "The northern node is an editorial orientation choice, not Rockstar-published latitude, border or distance." },
    ],
  },
  "gta-6/locations/leonida-penitentiary": {
    description: "Leonida Penitentiary is the official institution tied directly to Lucia Caminos's revealed history and her first major promotional imagery.",
    facts: [{ label: "Place type", value: "Correctional facility" }, { label: "Known character", value: "Lucia Caminos" }, { label: "Exact location", value: "Unpublished" }],
    sections: [
      { heading: "Lucia's clearest location link", body: "Rockstar's biography places Lucia inside the penitentiary before the central partnership with Jason unfolds." },
      { heading: "What the visual shows", body: "Lucia's lead portrait uses an institutional interior. It supports the prison connection without revealing a mission, layout or escape sequence." },
      { heading: "What remains withheld", body: "The facility's exact region, map footprint, accessible areas and gameplay role have not been published." },
      { heading: "Grid note", body: "The marker exists to connect Lucia's dossier with this place file. Its coordinates are not official." },
    ],
  },
  "gta-6/locations/vice-city-beaches": {
    description: "Vice City's beaches are repeatedly visible in official footage, with crowded sand, oceanfront roads and high-rises forming one of the game's clearest visual signatures.",
    facts: [{ label: "Evidence", value: "Officially observed" }, { label: "Setting", value: "Vice City coast" }, { label: "District borders", value: "Unknown" }],
    sections: [
      { heading: "A busy public waterfront", body: "The official scenes show swimmers, beachgoers, traffic and towers sharing the same coastal strip." },
      { heading: "Observation, not a boundary", body: "The imagery proves that beachfront life matters to Vice City's presentation. It does not publish a district name, exact extent or complete activity list." },
      { heading: "Connected files", body: "Use the Vice City and waterway dossiers for broader urban and coastal context." },
      { heading: "Grid note", body: "The beach marker is a visual index point, not a surveyed shoreline." },
    ],
  },
  "gta-6/locations/leonida-waterways": {
    description: "Water runs through Rockstar's Leonida material, from city marinas and the Keys to airboat channels in Grassrivers. The final navigable network is still unpublished.",
    facts: [{ label: "Evidence", value: "Officially observed" }, { label: "Visible craft", value: "Boats · airboats" }, { label: "Full network", value: "Unknown" }],
    sections: [
      { heading: "Different water environments", body: "Official scenes include open coast, island crossings, urban waterfronts and inland wetlands rather than one uniform boating setting." },
      { heading: "What can be said now", body: "Watercraft and water travel are visible. Exact access, vehicle lists, hazards and underwater systems require their own evidence." },
      { heading: "Regional connections", body: "Vice City, Leonida Keys and Grassrivers provide the strongest attached place files for the water network." },
      { heading: "Grid note", body: "The interface uses water-themed connections for exploration; it does not trace official navigable channels." },
    ],
  },
};

const commercialDirections: Record<string, [string, string, string, string, string]> = {
  "gta-6/buy-smart": [
    "Keep working gear unless there is a real gap. For PS5 players who want official GTA VI styling, Sony's new Black and White Limited Edition DualSense controllers cost $84.99 each in the U.S.; preorders open September 10.",
    "The limited-edition controller decision",
    "Choose White if broader retailer availability matters. In supported PlayStation Direct markets, the Black edition is sold there exclusively; it reaches select retailers in other regions. Both launch starting November 19, with exact availability varying by country.",
    "When keeping your controller wins",
    "Both limited editions use standard DualSense features plus the GTA VI finish and molded palm details. If your current controller works and the design is not worth $84.99 to you, keep it.",
  ],
  "gta-6/where-to-preorder": [
    "Choose the edition first, then use Rockstar or the storefront attached to your platform. Current GameplayAddict links are direct merchant routes, not affiliate links.",
    "Start with the edition",
    "Standard and Ultimate have different prices and digital extras. Decide whether those extras matter before comparing retailers.",
    "Storefront check",
    "Confirm platform, region, code format, delivery method and refund terms on the final merchant page.",
  ],
  "gta-6/standard-vs-ultimate": [
    "The U.S. price gap is $20: Standard is $79.99 and Ultimate is $99.99. Buy Ultimate only for its disclosed digital extras, not for assumed early access.",
    "What the extra $20 buys",
    "Compare Rockstar's named vehicles, weapons, apparel and other digital content line by line. The base game remains the core purchase.",
    "Edition check",
    "Verify that the storefront description, platform and region still match before checkout.",
  ],
  "gta-6/ps5": [
    "PS5 is a confirmed GTA VI launch platform. Sony also says the game uses DualSense haptic feedback and adaptive-trigger resistance.",
    "Two official controller options",
    "Sony prices the GTA VI Black and White Limited Edition DualSense controllers at $84.99 each in the U.S. Orders open September 10, ahead of their limited-quantity release beginning November 19.",
    "Black or White",
    "The White edition goes to PlayStation Direct and participating retailers. In supported PlayStation Direct markets, the Black edition is exclusive to Direct; select retailers carry it in other regions.",
  ],
  "gta-6/xbox": [
    "Xbox Series X|S is in Rockstar's confirmed launch lineup; Xbox One is not. Match the purchase to the Series console and account region you actually use.",
    "Series X or Series S",
    "Base the decision on your existing hardware, storage and display rather than an unannounced GTA VI performance comparison.",
    "Xbox check",
    "Confirm the edition, region, delivery format and current terms on the official storefront.",
  ],
  "gta-6/ps5-vs-xbox": [
    "For GTA VI, the smarter console is usually the current-generation system already in your home. Rockstar has not published a final platform performance comparison.",
    "Compare the ecosystem you use",
    "Account library, storage, controller preference, display support and household sharing are known decision factors; rumor-level frame-rate claims are not.",
    "Switch only for a real gain",
    "Price the full change, including accessories and subscriptions, before moving platforms for one game.",
  ],
  "gta-6/best-headset": [
    "Start with platform, budget, wired or wireless preference, microphone needs and comfort. GTA VI does not require a special headset.",
    "Comfort wins long sessions",
    "Reject models that do not fit your console or become uncomfortable quickly. Microphone clarity and easy returns matter more than themed branding.",
    "Headset check",
    "Confirm connection type, console compatibility, battery expectations and warranty with the manufacturer or merchant.",
  ],
  "gta-6/best-controller": [
    "Sony has announced GTA VI Black and White Limited Edition DualSense controllers for PS5 at $84.99 each in the U.S. Preorders open September 10, and both launch starting November 19 in limited quantities.",
    "Which color is easier to buy",
    "White is planned for PlayStation Direct and participating retailers. In supported PlayStation Direct markets, Black is a Direct exclusive; Sony says select retailers will carry it in other regions.",
    "What the extra money buys",
    "Both use a shimmering color-shifting finish, molded palm-tree details and official GTA VI branding. They remain DualSense controllers, so keep your current pad if the design is not worth replacing working hardware.",
  ],
  "gta-6/best-monitor": [
    "Match a monitor to your console, desk distance and room before comparing peak specifications. No unannounced GTA VI mode should drive the purchase.",
    "Size the screen to the desk",
    "Resolution, console-supported refresh modes, HDR performance and input behavior matter only when the screen also fits your viewing distance.",
    "Display check",
    "Confirm ports, supported console signals, return terms and measured performance from current sources.",
  ],
  "gta-6/best-tv": [
    "Choose a TV for the room first: viewing distance, glare, size and low-latency gaming behavior should lead the shortlist.",
    "Picture quality in your room",
    "Strong HDR, usable game mode and suitable HDMI support matter more than marketing labels tied to an unreleased performance target.",
    "Television check",
    "Confirm the exact model year, port capabilities, warranty and current price before purchase.",
  ],
  "gta-6/best-storage": [
    "Rockstar has not published GTA VI's final install size. Plan from your console, current free space, wider library and budget instead of using rumor as a capacity target.",
    "Leave room for the library",
    "Count the games you want installed at launch, then add margin for updates and captures. A larger drive is useful only if it solves that actual shortage.",
    "Storage check",
    "Verify the drive against Sony or Microsoft's current compatibility requirements before comparing merchant prices.",
  ],
  "gta-6/ps5-ssd": [
    "A PS5 expansion drive should meet Sony's published M.2 requirements. No reliable GTA VI-specific capacity can be recommended until Rockstar states the install size.",
    "Compatibility before capacity",
    "Check interface, supported dimensions, cooling guidance and usable space against Sony's current documentation.",
    "SSD check",
    "Confirm the exact model number, heatsink configuration, warranty and merchant return terms.",
  ],
  "gta-6/gaming-setup": [
    "Build around the PS5 or Xbox Series X|S and display you already own. Spend only where storage, audio, seating, power or connectivity is genuinely weak.",
    "Audit the room",
    "List the problem you notice now—full storage, poor dialogue clarity, discomfort or unreliable networking—before shopping for a solution.",
    "Setup check",
    "Test cable length, port availability, power protection and physical fit before buying accessories.",
  ],
  "gta-6/budget-setup": [
    "A budget setup protects working equipment and fixes one high-impact gap at a time. Cosmetic upgrades come after compatibility and comfort.",
    "Spend in priority order",
    "Keep the console and display, then address storage pressure, broken controls or unusable audio according to the budget entered in Buy Smart.",
    "Budget check",
    "Compare the full delivered price, warranty and return policy rather than the headline discount alone.",
  ],
  "gta-6/premium-setup": [
    "Premium should mean measurable comfort, picture, audio, storage and reliability—not a pile of expensive accessories.",
    "Pay for the improvement",
    "Name the benefit each upgrade adds to the room. If the difference cannot be explained or tested, leave it off the build.",
    "Premium check",
    "Confirm exact model numbers and policies; high price does not remove compatibility risk.",
  ],
  "gta-6/accessories": [
    "Treat every accessory as optional until it solves a platform, comfort, storage or reliability problem you actually have.",
    "Utility earns the slot",
    "Charging, cables, cases and stands should fit the console and room without blocking ventilation or duplicating included equipment.",
    "Accessory check",
    "Verify dimensions, power requirements, warranty and return terms for the exact product version.",
  ],
  "gta-6/release-preparation": [
    "Prepare the account and console before launch week: confirm platform, edition, storage margin, updates and the official preload date.",
    "Do the free checks first",
    "Recover account access, install system updates and clear unwanted files before buying new hardware.",
    "Launch-week check",
    "Revisit Rockstar and the platform store for final preload, region and delivery instructions.",
  ],
  "gta-6/gift-guide": [
    "Before buying a GTA VI gift, verify the recipient's console, account region, preferred edition and comfort with a download code.",
    "Avoid the platform mistake",
    "PS5 and Xbox Series X|S purchases are not interchangeable. Ask directly rather than guessing from an older console in the room.",
    "Gift check",
    "Confirm refund restrictions, delivery method and whether the code is locked to a store region.",
  ],
  "gta-6/preload": [
    "Rockstar currently lists November 12, 2026 for GTA VI preload. That prepares the files; it does not grant early play.",
    "Prepare for November 12",
    "Check account access, power settings, network stability and free space before the preload window opens.",
    "Timing check",
    "Verify the date and local storefront instructions again near launch in case Rockstar updates them.",
  ],
  "gta-6/code-in-box": [
    "Rockstar's current physical listing contains a download code rather than a disc. That changes resale, lending and offline-install expectations.",
    "Know what is in the case",
    "A code must be redeemed through the matching platform account and region; it is not a playable disc copy.",
    "Format check",
    "Read the retailer listing for code delivery, region restrictions, returns and internet requirements before purchase.",
  ],
};

const vehicleOpeners: Record<string, string> = {
  "gta-6/vehicles": "Rockstar has shown cars, motorcycles, police vehicles, buses, work trucks, boats, airboats and aircraft across Vice City and the wider state of Leonida.",
  "gta-6/vehicles/cars": "Official streets and promotional scenes show a wide range of cars, from everyday traffic to performance shapes. Rockstar has not published a complete final model list.",
  "gta-6/vehicles/motorcycles": "Motorcycles appear in city, rural and character-focused imagery. This file records the visible class without inventing handling, price or availability.",
  "gta-6/vehicles/boats": "Boats and other watercraft appear from Vice City's waterfront to the Keys and Grassrivers, supporting a varied water-transport picture.",
  "gta-6/vehicles/aircraft": "Aircraft are visible in official media, but Rockstar has not yet documented the flyable roster, ownership rules or performance.",
  "gta-6/vehicles/emergency": "Police and emergency vehicles appear in official scenes. Their equipment and pursuit behavior need separate evidence from their visual presence.",
  "gta-6/vehicles/sports-cars": "Performance-styled cars are easy to spot in official media; exact model names, rankings and speed figures are not equally secure.",
  "gta-6/vehicles/classics": "Classic-car imagery now includes one model Rockstar names directly: the '55 Vapid Stanier in the Vintage Vice City preorder pack.",
  "gta-6/vehicles/off-road": "Rural and wilderness images contain off-road vehicles suited to mud and uneven terrain, without establishing fixed spawn locations.",
  "gta-6/vehicles/public-transport": "Official scenes establish buses and transit infrastructure as part of Leonida's streetscape; player use and route systems remain unannounced.",
  "gta-6/vehicles/utility": "Work trucks and utility vehicles help define Leonida's industrial and roadside environments. Their interactive roles have not been specified.",
  "gta-6/vehicles/police": "Police vehicles are plainly visible during official pursuit scenes, while the final fleet and wanted-system rules remain incomplete.",
  "gta-6/vehicles/55-vapid-stanier": "The '55 Vapid Stanier is one of the few vehicles Rockstar has named in current GTA VI sales material, where it appears inside the Vintage Vice City pack.",
  "gta-6/vehicles/trailer-1": "This scene-by-scene vehicle index stays at the level Trailer 1 can support: visible class first, exact model only when the evidence is strong enough.",
  "gta-6/vehicles/trailer-2": "Trailer 2 broadens the vehicle evidence across character, street and criminal scenes without publishing final specifications.",
  "gta-6/vehicles/extended-look": "The extended presentation adds new road, water and activity scenes to the vehicle record; it does not turn every background vehicle into a confirmed catalog entry.",
};

const vehicleSections: Record<string, ContentRecord["sections"]> = {
  "gta-6/vehicles/cars": [
    { heading: "Identification", body: "The car file distinguishes everyday sedans, coupes, convertibles, performance shapes and other visible road classes before attempting model names." },
    { heading: "Official appearances", body: "Vice City traffic, character driving scenes and edition images supply the strongest official car views currently cataloged." },
    { heading: "Observed details", body: "Body shape, paint, visible branding and scene use can be recorded from a clear frame without implying performance." },
    { heading: "Still unknown", body: "Rockstar has not released the complete car list, prices, handling values, upgrades or spawn tables." },
  ],
  "gta-6/vehicles/motorcycles": [
    { heading: "Identification", body: "Official material supports off-road and street-oriented motorcycles, including the named Dinka Enduro in edition imagery." },
    { heading: "Official appearances", body: "Jason's lead portrait, rural rider scenes and promotional item images provide several distinct motorcycle views." },
    { heading: "Observed details", body: "Tires, riding posture and visible body style can distinguish broad use without proving handling or availability." },
    { heading: "Still unknown", body: "The final motorcycle roster, purchase prices, upgrades, performance and fixed locations are unpublished." },
  ],
  "gta-6/vehicles/boats": [
    { heading: "Identification", body: "The watercraft record includes speedboat, kayak and airboat imagery, with exact names used only where Rockstar supplies them." },
    { heading: "Official appearances", body: "The Shitzu Squalo and Crest Kayak appear in product media, while regional stills show additional craft around the Keys and Grassrivers." },
    { heading: "Observed details", body: "Hull type, passenger position and water setting are visible; vehicle ownership and control rules are not." },
    { heading: "Still unknown", body: "Rockstar has not published the full fleet, marina access, watercraft upgrades, prices or spawn behavior." },
  ],
  "gta-6/vehicles/aircraft": [
    { heading: "Identification", body: "Official images show large passenger aircraft and helicopters, but the catalog does not assume that every background aircraft is player-controlled." },
    { heading: "Official appearances", body: "Vice City's skyline and Mount Kalaga's valley supply the clearest attached aircraft scenes." },
    { heading: "Observed details", body: "Aircraft class and setting can be described when the silhouette is clear; cockpit, capacity and flight behavior cannot." },
    { heading: "Still unknown", body: "The flyable lineup, airports, ownership, prices and performance specifications have not been announced." },
  ],
  "gta-6/vehicles/emergency": [
    { heading: "Identification", body: "Marked police and emergency response vehicles are visible in official scenes, with category labels kept broader than uncertain model matches." },
    { heading: "Official appearances", body: "Pursuit footage and night images lit by emergency colors establish their presence across the public visual record." },
    { heading: "Observed details", body: "Livery, lights and visible equipment can be noted; dispatch behavior and interaction systems require other evidence." },
    { heading: "Still unknown", body: "Rockstar has not documented the complete emergency fleet, service roles, customization or response rules." },
  ],
  "gta-6/vehicles/sports-cars": [
    { heading: "Identification", body: "The official Ultimate Edition material names the '95 Grotti Cheetah, while other performance cars stay at category level unless a badge or listing resolves them." },
    { heading: "Official appearances", body: "Four Cheetah images cover the waterfront exterior, rear bodywork, side intake and red-trimmed cabin." },
    { heading: "Observed details", body: "The gallery supports styling and visible trim, not a ranking against other cars." },
    { heading: "Still unknown", body: "Top speed, acceleration, upgrade ceilings, purchase price and base-game acquisition remain unpublished." },
  ],
  "gta-6/vehicles/classics": [
    { heading: "Identification", body: "The classic category has one direct Rockstar name in the current record: the '55 Vapid Stanier from the Vintage Vice City pack." },
    { heading: "Official appearances", body: "The pack imagery shows the Stanier exterior at night and a separate cabin view." },
    { heading: "Observed details", body: "Period styling and visible interior features support the classic label without supplying driving behavior." },
    { heading: "Still unknown", body: "Other classic models, restoration systems, prices, upgrades and availability outside edition content are not confirmed." },
  ],
  "gta-6/vehicles/off-road": [
    { heading: "Identification", body: "Rockstar's product imagery names the Vapid Ganado Retro Build and '67 Vapid Dominator Buggy, while regional stills add broader dirt-oriented vehicles." },
    { heading: "Official appearances", body: "Edition images and the rural galleries show off-road machines on wet tracks, rocky terrain and open roadside areas." },
    { heading: "Observed details", body: "Raised bodywork, tires and terrain support intended use visually; they do not establish physics or class balance." },
    { heading: "Still unknown", body: "Off-road races, modification depth, final pricing and reliable spawn locations have not been published." },
  ],
  "gta-6/vehicles/public-transport": [
    { heading: "Identification", body: "Buses and transit infrastructure appear as parts of the urban setting, but visible public transport does not by itself confirm a usable network." },
    { heading: "Official appearances", body: "Street and elevated city views provide the most useful transit context currently attached to the site." },
    { heading: "Observed details", body: "Vehicle type, road position and surrounding infrastructure can be noted without inferring stops or schedules." },
    { heading: "Still unknown", body: "Player access, fares, route maps, timetables and fast-travel functions remain unannounced." },
  ],
  "gta-6/vehicles/utility": [
    { heading: "Identification", body: "Pickups, work trucks and industrial vehicles are grouped by visible use rather than uncertain manufacturer or model claims." },
    { heading: "Official appearances", body: "Ambrosia's industrial scenes and other roadside images provide the strongest utility-vehicle context." },
    { heading: "Observed details", body: "Cargo areas, equipment and work settings can be described; interactive job functions cannot be assumed." },
    { heading: "Still unknown", body: "Ownership, commercial use, upgrades, pricing and work activities tied to these vehicles are not documented." },
  ],
  "gta-6/vehicles/police": [
    { heading: "Identification", body: "Police cars can be recognized through markings and emergency lighting, while exact models require a clear official name or image." },
    { heading: "Official appearances", body: "Pursuit scenes and character stills with red and blue light establish a visible law-enforcement vehicle presence." },
    { heading: "Observed details", body: "Lights, livery and scene behavior are observations; wanted levels and police tactics belong to the separate systems record." },
    { heading: "Still unknown", body: "The final patrol fleet, special units, equipment, vehicle access and escalation rules have not been released." },
  ],
  "gta-6/vehicles/trailer-1": [
    { heading: "Scenes reviewed", body: "Trailer 1 moves through beach traffic, city roads, boats and emergency scenes, giving a broad first look at Leonida transport." },
    { heading: "Identification rule", body: "The inventory keeps partial or fast-moving vehicles at category level instead of assigning confident model names from a few frames." },
    { heading: "Observed details", body: "Traffic density and vehicle variety are visible presentation details, not published spawn or handling data." },
    { heading: "Still unknown", body: "The debut trailer does not establish the final fleet, economy, customization or acquisition rules." },
  ],
  "gta-6/vehicles/trailer-2": [
    { heading: "Scenes reviewed", body: "Trailer 2 adds character-driven driving, street movement and criminal situations to the vehicle evidence." },
    { heading: "Identification rule", body: "A model label is used only when branding, shape and official context are strong enough; a familiar silhouette alone is not decisive." },
    { heading: "Observed details", body: "The footage supports vehicle class and scene use while leaving speed, damage and upgrade behavior unexplained." },
    { heading: "Still unknown", body: "Rockstar has not turned Trailer 2 into a final catalog of prices, dealerships, garages or spawn points." },
  ],
  "gta-6/vehicles/extended-look": [
    { heading: "Scenes reviewed", body: "The extended presentation supplies longer looks at road, water and activity-related transport than the short trailers." },
    { heading: "Identification rule", body: "Longer footage can improve confidence in a category, but an unsupported model name remains unsupported." },
    { heading: "Observed details", body: "Movement, setting and visible participation may be described without inventing statistics or unlock conditions." },
    { heading: "Still unknown", body: "The presentation does not disclose the complete vehicle economy, upgrade catalog, ownership limits or world locations." },
  ],
};

const editorialDirections: Record<string, EditorialProfile> = {
  "gta-6/guides/everything-rockstar-confirmed": {
    description: "GTA VI is set for November 19, 2026 on PS5 and Xbox Series X|S, led by Jason and Lucia across six named Leonida regions. Standard and Ultimate editions are available to preorder.",
    sections: [
      { heading: "Launch facts that are settled", body: "Rockstar lists November 19, 2026 for PlayStation 5 and Xbox Series X|S. Preorders cover Standard and Ultimate editions, while a PC date remains unannounced." },
      { heading: "The revealed world and cast", body: "Lucia Caminos and Jason Duval lead a story set across Vice City and five other named Leonida regions, supported by six named members of the wider cast." },
      { heading: "What official media adds", body: "Two trailers, the extended presentation and Rockstar's still library show people, places, vehicles and activities. Visible scenes remain observations unless Rockstar describes the underlying system." },
    ],
  },
  "gta-6/guides/every-character-revealed": {
    description: "Rockstar has named eight GTA VI characters: Lucia Caminos, Jason Duval, Cal Hampton, Boobie Ike, Dre'Quan Priest, Real Dimez, Raul Bautista and Brian Heder.",
    sections: [
      { heading: "Lucia and Jason", body: "Rockstar positions Lucia Caminos and Jason Duval as the central pair and repeatedly shows them together under pressure." },
      { heading: "Business and music connections", body: "Boobie Ike, Dre'Quan Priest and Real Dimez connect the revealed cast to Vice City's nightlife and music economy." },
      { heading: "The remaining supporting cast", body: "Cal Hampton, Raul Bautista and Brian Heder have official profiles and galleries, but large parts of their story function remain unreleased." },
    ],
  },
  "gta-6/guides/every-location-revealed": {
    description: "Rockstar has named Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga, plus places including Leonida Penitentiary and Vice City's beaches.",
    sections: [
      { heading: "Vice City and the coast", body: "Vice City supplies the clearest urban setting, while the Leonida Keys extend the tropical coast through bridges, islands and watercraft." },
      { heading: "Wetlands, industry and worn resorts", body: "Grassrivers, Ambrosia and Port Gellhorn introduce swamp, sugar production and older roadside communities." },
      { heading: "North to Mount Kalaga", body: "Mount Kalaga National Park completes the named regional set with forest and higher terrain. Exact borders and total map area remain unpublished." },
    ],
  },
  "gta-6/guides/every-vehicle-observed": {
    description: "Rockstar has shown cars, motorcycles, police vehicles, buses, work trucks, boats, airboats and aircraft. Current sales material also names several individual vehicles.",
    sections: [
      { heading: "Cars with official names", body: "The Vintage Vice City material names the '55 Vapid Stanier, while edition imagery names the '95 Grotti Cheetah, Vapid Ganado Retro Build and '67 Vapid Dominator Buggy. Other cars remain identified by visible category when Rockstar has not supplied a name." },
      { heading: "Road, work and emergency traffic", body: "Official scenes show motorcycles, marked police vehicles, buses, pickups and industrial transport across Vice City, Ambrosia and the rural regions." },
      { heading: "Boats, airboats and aircraft", body: "The coast, Leonida Keys and Grassrivers show several kinds of watercraft, while aircraft appear above the state. Rockstar has not published the complete fleet, prices, performance figures, upgrades or spawn locations." },
    ],
  },
  "gta-6/guides/trailer-1-breakdown": {
    description: "Trailer 1 introduces Lucia and modern Leonida through beaches, nightlife, crowds, wildlife, traffic and vertical social-video scenes.",
    sections: [
      { heading: "The opening signal", body: "Lucia appears in an institutional setting before the trailer moves outward into Vice City's coast and public life." },
      { heading: "A city watched through phones", body: "Vertical clips, public recordings and fast-cut social posts shape how Leonida is presented, without defining the final player-facing system." },
      { heading: "What the first trailer established", body: "Vice City, Lucia, crowded outdoor spaces, vehicles and wildlife all enter the official record here; plot sequence and mechanics remain largely withheld." },
    ],
  },
  "gta-6/guides/trailer-2-breakdown": {
    description: "Trailer 2 puts Jason and Lucia's partnership at the center, then widens the view to supporting characters, criminal pressure and more of Leonida.",
    sections: [
      { heading: "Jason enters the foreground", body: "Driving, domestic and criminal scenes give Jason a stronger presence while keeping Lucia beside him as the central partner." },
      { heading: "The supporting network grows", body: "Rockstar's wider character material connects the pair to friends, robbers, businesses and the music scene." },
      { heading: "What remains a scene, not a system", body: "Weapons, vehicles, interiors and pursuits are visible; their rules, progression and availability are not fully specified by the trailer alone." },
    ],
  },
  "gta-6/guides/extended-look-breakdown": {
    description: "Rockstar's 27-minute presentation uses in-game PlayStation 5 footage to show more of Jason, Lucia, Leonida and its activities. Its first partial week on Netflix produced 31.1 million views.",
    sections: [
      { heading: "A longer in-game view", body: "The presentation is identified by Rockstar as captured from in-game PlayStation 5 footage, giving individual scenes more context than a short reveal trailer." },
      { heading: "Activities visible on screen", body: "Racing, basketball, scuba diving and kayaking appear in the footage. Their full controls, progression and rewards are not all explained." },
      { heading: "31.1 million Netflix views", body: "Netflix counted 31.1 million views and 14 million viewing hours during August 24–30, even though the presentation debuted on August 27. It ranked first on Netflix's English-language film list and reached number one in 87 of 93 tracked countries." },
      { heading: "What the footage leaves open", body: "The presentation does not explain every activity's controls, progression, rewards or availability, so those details remain unknown." },
    ],
  },
  "gta-6/guides/launch-timeline": {
    description: "Follow Rockstar's official reveal sequence through Trailer 2, date changes, preorder launch and the extended presentation.",
    sections: [
      { heading: "Reveal to world expansion", body: "Trailer 1 established Lucia and Leonida; Trailer 2 and the character and region pages added Jason, the wider cast and named sectors." },
      { heading: "The launch date record", body: "Rockstar now lists November 19, 2026. Earlier dates remain part of the history, not the current countdown target." },
      { heading: "The buying phase", body: "Preorders and edition details turn announcement history into platform, price, preload and format decisions for launch." },
    ],
  },
  "gta-6/guides/evidence-standard": {
    description: "A practical test for GTA VI claims: identify the exact statement, find the primary source and label observation or uncertainty without upgrading it.",
    sections: [
      { heading: "Start with the claim", body: "A page-level topic can contain both known and unknown details. Verify the specific sentence rather than applying one broad badge to everything." },
      { heading: "Statements and observations differ", body: "Rockstar naming a feature is stronger than a similar-looking action in a scene. Both can be useful when labeled precisely." },
      { heading: "Silence is not confirmation", body: "Missing PC timing, map measurements or install size should stay unknown until an official source publishes them." },
    ],
  },
  "gta-6/guides/map-estimates-explained": {
    description: "Community map work can aid orientation, but Rockstar has not released a complete authoritative GTA VI map or official area figure.",
    sections: [
      { heading: "What estimates can do", body: "Scene matching and relative placement can suggest relationships between places when the method and uncertainty remain visible." },
      { heading: "What estimates cannot prove", body: "They do not establish final coastlines, scale, road layout, travel time or total playable area." },
      { heading: "Why The Grid stays schematic", body: "GameplayAddict uses named nodes and source-linked dossiers instead of presenting fan geometry as Rockstar's map." },
    ],
  },
  "gta-6/guides/launch-day-checklist": {
    description: "A short launch plan for account access, preload, free space, system updates and official status checks—before buying extra hardware.",
    sections: [
      { heading: "Before preload", body: "Confirm the correct platform account, edition and delivery format, then recover access and install console updates." },
      { heading: "Make space carefully", body: "Rockstar has not published the final install size, so clear unused games and leave practical margin instead of trusting circulating figures." },
      { heading: "On launch day", body: "Check Rockstar and the platform service for live status before changing network or hardware settings." },
    ],
  },
  "gta-6/guides/spoiler-policy": {
    description: "GameplayAddict separates pre-release facts from post-release story detail and will place clear spoiler gates around plot-sensitive material.",
    sections: [
      { heading: "Before release", body: "Official biographies and trailers can be discussed without inventing hidden motives, missions or outcomes." },
      { heading: "After release", body: "Story pages should signal spoiler depth before revealing mission or ending information and keep neutral utility routes available." },
      { heading: "Corrections and reader control", body: "Labels should change when context changes, and accidental spoilers should be corrected as publication defects." },
    ],
  },
};

const specialEditorial: Record<string, EditorialProfile> = {
  "gta-6/features": {
    description: "Rockstar has described protagonist switching, visible body changes, working phone feeds and a more reactive world. Official footage also shows racing, basketball, scuba diving and kayaking.",
    facts: [{ label: "Confirmed systems", value: "Switching · body · phone · reactions" }, { label: "Playable leads", value: "Jason · Lucia" }, { label: "Unreleased details", value: "Labeled on each page" }],
    sections: [
      { heading: "Control two lives", body: "Jason and Lucia can travel together or split up. During shared action, control can move between the driver and passenger instead of locking the player into one fixed role." },
      { heading: "Habits leave a mark", body: "Food changes weight, exercise builds visible muscle tone and long periods without rest affect the protagonists' appearance. Rockstar has not published numerical meters or recovery times." },
      { heading: "Leonida notices", body: "Working social feeds bring the phone into play, while pedestrians and the wider city respond more realistically to behavior such as carrying a rifle openly." },
      { heading: "Activities already shown", body: "Racing, basketball, scuba diving and kayaking appear in official footage. Rockstar has not yet explained every activity's controls, rewards or place in progression." },
    ],
  },
  "gta-6/features/dual-protagonists": {
    description: "Jason and Lucia can be controlled as a couple or independently. In shared action, the player can switch between driving, using the phone and firing from the passenger seat.",
    facts: [{ label: "Playable leads", value: "Jason · Lucia" }, { label: "Travel", value: "Together or independently" }, { label: "Action switching", value: "Driver · passenger" }],
    sections: [
      { heading: "How switching works", body: "Rockstar's developers describe fluid control during shared scenes: Jason may drive while Lucia checks the phone, then the player can move to the passenger role to return fire during a pursuit." },
      { heading: "Together is not mandatory", body: "The pair can play as a couple or go off independently. That confirms separate control without revealing every restriction on distance, missions or mid-activity switching." },
      { heading: "What remains unknown", body: "Rockstar has not published the full switching interface, cooldowns, AI-partner commands or the exact situations that prevent a swap." },
    ],
  },
  "gta-6/features/body-weight-exercise": {
    description: "Food changes Jason and Lucia's weight, exercise visibly builds and tones muscle, and extended time without rest alters how they look.",
    facts: [{ label: "Food", value: "Affects weight" }, { label: "Exercise", value: "Builds visible muscle" }, { label: "Lost rest", value: "Changes appearance" }],
    sections: [
      { heading: "Three confirmed body changes", body: "Eating, training and going without sleep produce visible effects on both protagonists. These are described as interactive systems, not details inferred from a trailer frame." },
      { heading: "What a long run costs", body: "Staying away from bed while fleeing police or continuing a multi-day bender affects Jason and Lucia's features. The interview does not specify whether the effect changes health, stamina or dialogue." },
      { heading: "No numbers yet", body: "Rockstar has not disclosed calorie values, workout routines, body-state limits, stat bonuses or how quickly sleep reverses fatigue." },
    ],
  },
  "gta-6/features/social-media": {
    description: "GTA VI's in-game phone contains working social-media feeds. Lucia can scroll while Jason drives, and Real Dimez's rise is reflected through viral posts.",
    facts: [{ label: "Phone feed", value: "Working social media" }, { label: "Usable while riding", value: "Confirmed example" }, { label: "Story connection", value: "Real Dimez" }],
    sections: [
      { heading: "More than trailer framing", body: "Earlier footage showed vertical clips; Rockstar's developer interview goes further by identifying functioning feeds inside the phone." },
      { heading: "A passenger-seat use case", body: "One published example has Lucia scrolling while Jason drives to a job. Real Dimez's music story also develops through viral in-game posts." },
      { heading: "Still unrevealed", body: "Posting tools, account control, comments, algorithms, rewards and the amount of player-created content have not been explained." },
    ],
  },
  "gta-6/features/wanted-system": {
    description: "Leonida reacts more realistically to player behavior. Carrying a rifle openly is enough to draw a response, but Rockstar has not published the complete wanted-level rules.",
    facts: [{ label: "World response", value: "More reactive" }, { label: "Named example", value: "Openly carried rifle" }, { label: "Wanted levels", value: "Full rules unknown" }],
    sections: [
      { heading: "Behavior matters before a chase", body: "Rockstar's developers use walking down the street with a rifle as an example of an action the city will notice. That suggests consequences can begin before a traditional police pursuit." },
      { heading: "NPCs are part of the response", body: "A dedicated development effort focuses on pedestrians whose appearance, movement, interaction and expression fit their surroundings more closely than in earlier games." },
      { heading: "Do not invent the escalation ladder", body: "The interview does not establish star counts, witness timing, disguises, facial recognition, search zones or how police remember a suspect." },
    ],
  },
  "gta-6/features/relationship-system": {
    description: "Rockstar describes deep relationship mechanics around Jason and Lucia, whose playable-couple story responds to choices. The exact variables and outcomes remain unrevealed.",
    facts: [{ label: "Lead dynamic", value: "Playable couple" }, { label: "Choice effects", value: "Confirmed in principle" }, { label: "Meters and endings", value: "Unknown" }],
    sections: [
      { heading: "The relationship is playable", body: "Jason and Lucia can act together or independently, and Rockstar says their choices can carry consequences deeper than the studio's earlier honor systems." },
      { heading: "Story first", body: "The protagonists are written characters rather than empty avatars. Player freedom is intended to coexist with their established identities and shared fugitive story." },
      { heading: "What Rockstar has not shown", body: "No affection meter, breakup path, romance menu, dialogue tree or ending condition has been published." },
    ],
  },
  "gta-6/features/npcs-world-reactions": {
    description: "GTA VI's pedestrians are built to look, move and react with more local detail, supported by a Rockstar branch focused largely on the in-game population.",
    facts: [{ label: "Population goal", value: "Most detailed and varied yet" }, { label: "Dedicated team", value: "Rockstar LA branch" }, { label: "Reaction model", value: "More realistic" }],
    sections: [
      { heading: "Local identity goes beyond clothing", body: "Rockstar combines appearance, movement, interaction and expression so pedestrians fit places ranging from Little Cuba to Mount Kalaga." },
      { heading: "A team built around pedestrians", body: "Rockstar says one Los Angeles branch works almost entirely on NPCs, while new tools and pipelines expand the variety of the population." },
      { heading: "What scale does not prove", body: "Team size and visual variety do not establish a published NPC count, daily schedules, memory duration or a complete reaction catalog." },
    ],
  },
  "gta-6/features/console-performance": {
    description: "The console build shown during Rockstar's August preview ran at 30 FPS. Rockstar has not promised a 60 FPS or performance mode for launch.",
    facts: [{ label: "Preview build", value: "30 FPS" }, { label: "60 FPS mode", value: "Not promised" }, { label: "PS5 Pro mode", value: "Unannounced" }],
    sections: [
      { heading: "What was actually reported", body: "A creator invited to Rockstar North said the demonstrated console build ran at 30 FPS and that development leadership would not commit to another mode. This is a preview report, not a published technical specification from Rockstar." },
      { heading: "What buyers should assume today", body: "Plan around the demonstrated 30 FPS target unless Rockstar announces a change. Do not buy a PS5 Pro solely for an unconfirmed GTA VI performance mode." },
      { heading: "Resolution and later modes remain open", body: "Rockstar has not supplied final resolution targets, a 40 FPS option, a 60 FPS mode or platform-by-platform performance details." },
    ],
  },
  "gta-6/release-date": {
    description: "Rockstar currently sets GTA VI for Thursday, November 19, 2026 on PlayStation 5 and Xbox Series X|S. The launch board below keeps the date, platform and preorder status together.",
    sections: [
      { heading: "Latest verified change", body: "The November 19, 2026 date is the live Rockstar date used by GameplayAddict's countdown and launch guidance." },
      { heading: "What launch information is still open", body: "A PC date and final download size remain unannounced; storefront timing can still vary by region." },
    ],
  },
  "gta-6/countdown": {
    description: "The live countdown targets Rockstar's November 19, 2026 release date for PS5 and Xbox Series X|S and changes only when the official date record changes.",
    sections: [
      { heading: "Countdown target", body: "The timer ends at the configured launch date rather than an older trailer window or retailer estimate." },
      { heading: "Use the final week", body: "Check account access, preload guidance, free space and official service status before changing hardware or network settings." },
    ],
  },
  "gta-6/preorder": {
    description: "Compare the current Standard and Ultimate listings, choose the correct platform and open a direct official storefront. GameplayAddict claims no approved affiliate relationship.",
    sections: [
      { heading: "Choose edition before retailer", body: "The U.S. listings place Standard at $79.99 and Ultimate at $99.99. Judge the extra $20 against Rockstar's disclosed digital content." },
      { heading: "Controller preorders are separate", body: "Sony's $84.99 GTA VI Black and White Limited Edition DualSense controllers open for preorder September 10. U.S. PlayStation Direct orders begin at 7:00 a.m. PT / 10:00 a.m. ET, with limited quantities and region-dependent availability." },
    ],
  },
  "gta-6/editions": {
    description: "Standard includes the base game; Ultimate adds Rockstar's named digital vehicles, weapons, apparel and other extras. The current U.S. difference is $20.",
    sections: [
      { heading: "Standard is the baseline", body: "Choose Standard when the game itself is the priority and the disclosed digital extras do not justify another $20." },
      { heading: "Ultimate is an extras decision", body: "Choose Ultimate only after checking each included item and the current regional storefront description; no early access is assumed." },
    ],
  },
  "gta-6/preorder-bonuses": {
    description: "Rockstar's current preorder material names the Vintage Vice City Pack and an eligible digital-preorder month of GTA+. Storefront and regional terms still matter.",
    sections: [
      { heading: "What is named", body: "The Vintage Vice City Pack contains disclosed themed content, including the '55 Vapid Stanier; eligible digital orders also reference one month of GTA+." },
      { heading: "Read the storefront terms", body: "Bonus eligibility, redemption, account region and timing should be checked on the exact merchant listing before purchase." },
    ],
  },
  "gta-6/trailers": {
    description: "Watch Rockstar's Extended Look, Trailer 2 and Trailer 1 in publication order, then open the people, places and vehicle records each video supports.",
    sections: [
      { heading: "Extended Look · August 27, 2026", body: "Rockstar identifies the presentation as captured entirely from in-game PlayStation 5 footage. Netflix later counted 31.1 million views and 14 million viewing hours during August 24–30, ranking it first on the English-language film list." },
      { heading: "Trailer 2 · May 6, 2025", body: "The second trailer places Jason and Lucia's partnership in the foreground and expands the supporting cast and regional context." },
      { heading: "Trailer 1 · December 4, 2023", body: "The debut trailer established Lucia, Vice City and modern Leonida through coastal, nightlife, traffic and social-video scenes." },
    ],
  },
  "gta-6/features/weapons": {
    description: "Rockstar names the Hawk & Little Morgan Revolvers and personalized weapon variants in current GTA VI sales material; most weapon statistics and unlock conditions remain unpublished.",
    facts: [{ label: "Named item", value: "Hawk & Little Morgan Revolvers" }, { label: "Source type", value: "Official edition material" }, { label: "Stats and unlocks", value: "Unknown" }],
    sections: [
      { heading: "Identification", body: "The named revolvers and Vintage Vice City weapon pattern come from Rockstar's edition description. Broader weapon classes seen in footage are observations unless named separately." },
      { heading: "Official appearances", body: "Promotional item imagery supports the look of the disclosed variants; action scenes support only what can be seen in the frame." },
      { heading: "Observed details", body: "Characters carry firearms in official stills and video, but a visible weapon does not establish damage, recoil, price or ownership." },
      { heading: "Still unknown", body: "Rockstar has not published the complete arsenal, customization rules, unlock paths, economy or final statistics." },
    ],
  },
};

const legacyEditorial: Record<string, EditorialProfile> = {
  "gta-6": {
    description: "GTA VI launches November 19, 2026 on PS5 and Xbox Series X|S. Jason and Lucia lead a story across six named Leonida regions, with Standard and Ultimate editions now available to preorder.",
    sections: [
      { heading: "Launch", body: "GTA VI is scheduled for November 19, 2026 on PlayStation 5 and Xbox Series X|S. Rockstar has not announced a PC date." },
      { heading: "People and place", body: "Lucia Caminos and Jason Duval lead the game across Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga. Six supporting characters have also received official profiles." },
      { heading: "What Rockstar has shown", body: "Two trailers and the Extended Look cover the cast, vehicles and activities including racing, basketball, kayaking and scuba diving. Developer interviews add details about character switching, body changes, phone feeds and NPC reactions." },
      { heading: "The latest audience result", body: "Netflix recorded 31.1 million views for the Extended Look during August 24–30, placing it first on the English-language film list. The result did not bring a new release date, platform, price or preorder announcement." },
      { heading: "Buying and preload", body: "Standard costs $79.99 and Ultimate costs $99.99 in current U.S. listings. Rockstar lists November 12, 2026 for preload, one week before release." },
    ],
  },
  "gta-6/platforms": {
    description: "GTA VI launches on PS5 and Xbox Series X|S. Rockstar has not announced versions for PC, PS4 or Xbox One.",
    sections: [
      { heading: "Confirmed consoles", body: "Rockstar and the current store listings name PlayStation 5 and Xbox Series X|S for the November 2026 release." },
      { heading: "Older consoles", body: "PS4 and Xbox One are absent from the announced lineup. No last-generation version has been promised." },
      { heading: "PC", body: "A PC edition may be widely expected, but Rockstar has not provided a PC release date or specifications." },
    ],
  },
  "gta-6/screenshots": {
    description: "Rockstar's official still library shows the cast and named Leonida regions without relying on leaks, fan art or generated scenes.",
    sections: [
      { heading: "Character galleries", body: "Lucia, Jason and the six revealed supporting characters each have official images connected to their profiles." },
      { heading: "Leonida galleries", body: "Vice City, the Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga appear in Rockstar's regional collections." },
      { heading: "Vehicles and activities", body: "The official image collections also show road traffic, motorcycles, boats, aircraft, police vehicles and different parts of Leonida's outdoor life." },
    ],
  },
  "gta-6/reveal-timeline": {
    description: "Follow GTA VI from its December 2023 debut through Trailer 2, release-date changes, preorders, the August 2026 Extended Look and September's official product and public-response news.",
    sections: [
      { heading: "December 4, 2023", body: "Trailer 1 introduced Lucia, Vice City and modern Leonida through beaches, traffic, nightlife, wildlife and phone-shot clips." },
      { heading: "May 6, 2025", body: "Trailer 2 placed Jason beside Lucia and expanded the supporting cast, criminal pressure and regional imagery." },
      { heading: "August 27, 2026", body: "Rockstar published the 27-minute Extended Look, captured from in-game PlayStation 5 footage. Netflix later reported 31.1 million views during its first partial week." },
      { heading: "September 3, 2026", body: "Sony announced two $84.99 GTA VI Limited Edition DualSense controllers. The same day, two Miami-Dade officials publicly opposed a separate reported marketing proposal that has not been approved or announced by Rockstar." },
    ],
  },
  "gta-6/confirmed-features": {
    description: "Rockstar has described protagonist switching, visible body changes, working phone feeds and a world that reacts more closely to player behavior.",
    sections: [
      { heading: "Jason and Lucia", body: "The protagonists can move through Leonida together or independently, with control changing between driver and passenger during shared action." },
      { heading: "Bodies and habits", body: "Food affects weight, exercise changes muscle tone and going too long without rest alters the protagonists' appearance." },
      { heading: "A more reactive Leonida", body: "The phone includes working social feeds, while pedestrians can respond to visible behavior such as carrying a rifle openly." },
    ],
  },
  "gta-6/confirmed-vs-rumored": {
    description: "Release date, launch consoles, named characters and named regions come from Rockstar. Map size, final download size and many circulating feature lists do not.",
    sections: [
      { heading: "Confirmed", body: "Rockstar currently supports the November 19, 2026 date, PS5 and Xbox Series X|S, Jason and Lucia, six named regions and the disclosed editions." },
      { heading: "Shown, but not fully explained", body: "Racing, basketball, kayaking, scuba diving, wildlife and multiple interiors appear in official footage without complete rules or progression details." },
      { heading: "Still unconfirmed", body: "Exact map measurements, final install size, PC timing, crossplay and a complete online plan remain unannounced." },
    ],
  },
  "gta-6/faq": {
    description: "Quick answers on GTA VI's release, consoles, price, protagonists, setting, preload, physical format and the biggest remaining unknowns.",
    sections: [
      { heading: "When and where", body: "GTA VI is scheduled for November 19, 2026 on PS5 and Xbox Series X|S. The story is set in Leonida and centers on Vice City." },
      { heading: "Who you play", body: "Jason Duval and Lucia Caminos are the two central protagonists and can be controlled together or independently." },
      { heading: "What remains open", body: "Rockstar has not published a PC date, final download size, crossplay plan or complete online feature set." },
    ],
  },
  "gta-6/news": {
    description: "The latest GTA VI developments include Sony's two limited-edition DualSense controllers and official Miami-Dade opposition to a reported, unapproved Vice City marketing proposal.",
    sections: [],
  },
  "gta-6/discoveries": {
    description: "Explore specific people, places, vehicles and activities visible in Rockstar's trailers, screenshots and Extended Look.",
    sections: [
      { heading: "Recent additions", body: "The Extended Look adds visible racing, basketball, kayaking and underwater activity alongside longer views of Jason, Lucia and Leonida." },
      { heading: "What a scene can establish", body: "A clear frame can support a character, place, vehicle class or visible action. It cannot establish rewards, mission structure or final availability by itself." },
    ],
  },
  "gta-6/guides": {
    description: "Choose a guide for the cast, locations, vehicles, official videos, launch preparation or claims that still need confirmation.",
    sections: [
      { heading: "Cast, places and vehicles", body: "The collection covers all eight named characters, six major Leonida regions, officially named vehicles and the broader classes visible in Rockstar's footage." },
      { heading: "Trailers and gameplay", body: "Trailer 1, Trailer 2 and the Extended Look each have focused breakdowns, while feature pages cover switching, body changes, phones, NPC reactions and activities shown on screen." },
      { heading: "Prepare for launch", body: "Release, edition, preload, storage and launch-day guides turn the current announcements into practical decisions." },
    ],
  },
  "gta-6/features/interiors": {
    description: "Official footage moves through homes, bars, businesses and other indoor spaces, but Rockstar has not published an enterable-building count.",
    sections: [
      { heading: "What is visible", body: "Jason and Lucia appear inside domestic, nightlife, retail and institutional settings across Rockstar's videos and stills." },
      { heading: "What remains unknown", body: "The footage does not establish which buildings can be entered freely, how interiors load or whether every visible room is playable." },
    ],
  },
  "gta-6/features/wildlife": {
    description: "Alligators and other animals appear across Leonida's wetlands, coast and populated areas in official material.",
    sections: [
      { heading: "Leonida's animal life", body: "Rockstar uses wildlife to distinguish the state, especially in Grassrivers and coastal scenes." },
      { heading: "Interaction is only partly known", body: "Animals are visible, but species counts, hunting, taming, rewards and complete behavior rules have not been published." },
    ],
  },
  "gta-6/features/transportation": {
    description: "Cars, motorcycles, boats, airboats and aircraft establish travel by road, water and air across Leonida.",
    sections: [
      { heading: "A state built around movement", body: "Urban traffic, island bridges, wetlands and northern wilderness give the visible transport classes different settings." },
      { heading: "No complete network yet", body: "Rockstar has not detailed public-transit use, vehicle ownership limits, fast travel or the final playable fleet." },
    ],
  },
  "gta-6/features/robberies": {
    description: "Crime is central to Jason and Lucia's story, and Rockstar describes Raul Bautista as an experienced bank robber.",
    sections: [
      { heading: "What the story establishes", body: "Official material shows the protagonists under criminal pressure and connects them with a supporting character known for high-stakes robberies." },
      { heading: "The activity rules are unreleased", body: "Mission planning, crew selection, payout splits, repeatable scores and failure consequences have not been explained." },
    ],
  },
  "gta-6/features/customization": {
    description: "Rockstar's edition material names outfits, hairstyles, vehicle items and a weapon pattern, confirming several customization categories.",
    sections: [
      { heading: "Named customization", body: "The disclosed extras cover personal appearance, weapons and vehicles rather than proving a complete editor or upgrade tree." },
      { heading: "Depth remains unknown", body: "Rockstar has not shown every shop, price, color option, body editor or rule for changing the protagonists' appearance." },
    ],
  },
  "gta-6/features/racing": {
    description: "Racing appears in the Extended Look, with vehicles competing on screen in official in-game footage.",
    sections: [{ heading: "Still to be explained", body: "Rockstar has not published event classes, entry rules, rewards, online support or how racing fits into progression." }],
  },
  "gta-6/features/basketball": {
    description: "Basketball is visible in the Extended Look, confirming its presence on screen without defining the player's control.",
    sections: [{ heading: "What the clip does not answer", body: "The presentation leaves match formats, playable courts, controls, opponents and rewards unexplained." }],
  },
  "gta-6/features/scuba-diving": {
    description: "The Extended Look includes underwater activity, establishing scuba imagery without revealing equipment or mission structure.",
    sections: [{ heading: "Underwater questions", body: "Rockstar has not explained dive limits, hazards, gear progression, salvage or how much of Leonida's water can be explored." }],
  },
  "gta-6/features/kayaking": {
    description: "A kayak appears in official material, adding a quiet human-powered craft to Leonida's visible water travel.",
    sections: [{ heading: "Availability is unknown", body: "The footage does not establish where kayaks can be found, whether they can be owned or what activities use them." }],
  },
  "gta-6/features/properties": {
    description: "Ultimate Edition materials mention garages and property-adjacent extras, but Rockstar has not detailed a base-game ownership economy.",
    sections: [{ heading: "Do not assume a property empire", body: "Buying homes, earning passive income, upgrading businesses and managing garages remain unconfirmed as general gameplay systems." }],
  },
  "gta-6/features/gta-online": {
    description: "Rockstar has not announced a launch date, name or full feature set for an online mode tied to GTA VI.",
    sections: [{ heading: "Single-player comes first", body: "Current sales material identifies GTA VI as a single-player experience. Any separate online rollout, migration plan or crossplay support remains unknown." }],
  },
  "gta-6/questions/is-gta-6-on-ps4": {
    description: "PS4 is not included in Rockstar's announced GTA VI launch lineup.",
    sections: [{ heading: "Supported consoles", body: "The current launch announcement names PlayStation 5 and Xbox Series X|S only." }],
  },
  "gta-6/questions/is-gta-6-on-xbox-one": {
    description: "Xbox One is not included in Rockstar's announced GTA VI launch lineup.",
    sections: [{ heading: "Xbox release", body: "Rockstar currently names Xbox Series X|S, not Xbox One, for November 19, 2026." }],
  },
  "gta-6/questions/what-is-leonida": {
    description: "Leonida is Rockstar's fictional Florida-inspired state containing Vice City and five other named major regions.",
    sections: [{ heading: "Named regions", body: "Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga form the current official regional list." }],
  },
  "gta-6/questions/what-is-in-ultimate-edition": {
    description: "Ultimate combines the base game with Rockstar's named premium vehicles, weapons, apparel and other digital extras.",
    sections: [{ heading: "Before choosing Ultimate", body: "Compare the exact regional storefront list with Standard; the edition does not promise early access." }],
  },
  "about": {
    description: "We built GameplayAddict for people who want useful GTA VI answers without having to sort facts from rumors themselves.",
    sections: [
      { heading: "What we're building", body: "You can meet the revealed cast, explore named places in The Grid, follow meaningful news, compare editions and ask Pink Slip a question. We add a page when it gives a reader something useful, not simply because another GTA VI keyword exists." },
      { heading: "How we handle early information", body: "GTA VI is still changing before launch. We use Rockstar's announcements and official footage first, identify outside reporting when it matters and say when something hasn't been confirmed. That keeps a trailer detail from quietly turning into a promised feature." },
      { heading: "We're independent", body: "GameplayAddict isn't operated by or affiliated with Rockstar Games or Take-Two Interactive. Official screenshots and videos remain their property, and we credit and link the original source." },
    ],
  },
  "contact": {
    description: "Found a mistake, a stronger source or a rights issue? We want to hear about it, but our public inbox isn't active yet.",
    sections: [
      { heading: "What to include", body: "For a correction, save the page address, the sentence that needs attention and the strongest original source you have. For a rights concern, identify the image or video and explain your relationship to it." },
      { heading: "Contact availability", body: "We haven't connected a public contact address or form yet, so please don't submit personal information through Pink Slip, search or the alerts box. We'll publish the working contact method here when it's ready." },
      { heading: "Game and account support", body: "GameplayAddict can't help with Rockstar accounts, purchases or technical support. Those requests should go directly to Rockstar Support." },
    ],
  },
  "privacy": {
    description: "This policy explains what GameplayAddict may collect, why we use it and the choices you have when visiting our site.",
    sections: [
      { heading: "Information you choose to enter", body: "Questions entered for Pink Slip and searches are processed so the site can return the result you asked for. Our email-alert service isn't connected, and an address entered there is not stored or subscribed." },
      { heading: "Basic site and analytics data", body: "Hosting and analytics providers may receive ordinary technical information such as your browser, device, referring page, approximate network location, time of visit and the pages or controls you use. We use this information to understand traffic and find broken pages or navigation." },
      { heading: "Cookies and advertising", body: "GameplayAddict may use third-party vendors, including Google, to serve advertising. Google and its partners may use cookies to show ads based on visits to this and other websites. You can manage personalized advertising at adssettings.google.com, and Google's advertising privacy information is available at policies.google.com/technologies/ads. We don't control cookies placed by third-party advertisers." },
      { heading: "Children's privacy", body: "GameplayAddict isn't directed to children under 13, and we don't knowingly collect personal information from children under 13. If we learn that such information was collected, we'll take reasonable steps to remove it." },
      { heading: "Links to other websites", body: "We link to Rockstar Games, Take-Two Interactive, console storefronts, retailers and other publishers. Their privacy practices apply once you leave GameplayAddict, so review their policies before providing information or making a purchase." },
      { heading: "Your choices", body: "You can block or clear cookies through your browser and use Google's ad settings to limit personalized advertising. Blocking cookies may affect some site or advertising features." },
      { heading: "Your consent", body: "By using GameplayAddict, you consent to this privacy policy." },
      { heading: "Changes to this policy", body: "We may update this policy when the site, its providers or legal requirements change. The current version will remain posted here with its last-updated date." },
      { heading: "Contact", body: "Our public privacy inbox isn't active yet. Until it is, don't send personal information through Pink Slip, search or the alerts box. We'll add the working contact method here when it becomes available." },
    ],
  },
  "affiliate-disclosure": {
    description: "Some links may eventually earn GameplayAddict a commission, but only when a real affiliate relationship exists and the link is clearly disclosed.",
    sections: [
      { heading: "What that means today", body: "The current GTA VI store links are direct merchant links. We don't claim a commission, partnership or special price where none has been approved." },
      { heading: "How we'll label paid links", body: "If a link can earn a commission, we'll place a clear disclosure close to it. The price you pay shouldn't increase because of the referral." },
      { heading: "How we make recommendations", body: "A product has to fit the reader's platform, budget and actual need before earning a recommendation. Commission never turns an incompatible or poor-value option into our pick." },
    ],
  },
  "editorial-policy": {
    description: "We publish GTA VI coverage to answer real player questions, not to fill the site with pages that repeat the same announcement.",
    sections: [
      { heading: "What earns publication", body: "A page should add a clear answer, useful context, a comparison, an explanation or a decision a reader can act on. If a small detail only improves an existing page, we update that page instead of creating another headline." },
      { heading: "How we use sources", body: "Rockstar announcements, official footage and storefront listings support confirmed facts. We identify outside reporting and keep rumors labeled. Seeing something in a trailer can support a visual observation, but it doesn't prove every rule behind a game mechanic." },
      { heading: "Corrections", body: "When a stronger source appears or Rockstar changes a detail, we update the affected answer. We would rather correct one useful page than leave several conflicting versions online." },
      { heading: "Money and editorial judgment", body: "Advertising or affiliate links don't decide what we say. Buying recommendations must still fit the reader's platform, budget and needs, and paid relationships must be disclosed." },
    ],
  },
  "verification-policy": {
    description: "We tell readers how certain a GTA VI claim is because trailers, reporting and official announcements don't all prove the same thing.",
    sections: [
      { heading: "Confirmed by Rockstar", body: "We use this when Rockstar or an official storefront directly names the date, platform, person, place, edition or other detail." },
      { heading: "Shown in official footage", body: "A trailer or screenshot can establish what appears on screen. It can't, by itself, prove controls, rewards, mission structure or how often an activity occurs." },
      { heading: "Reported, not confirmed", body: "Credible reporting can add useful context, but we name the publisher and keep the claim separate from Rockstar-confirmed information." },
      { heading: "Not confirmed yet", body: "When Rockstar hasn't supplied the answer—such as final download size or PC timing—we say so. Guessing would be faster, but it wouldn't help the reader." },
    ],
  },
  "independent-fan-disclaimer": {
    description: "GameplayAddict is an independent fan publication. Rockstar Games and Take-Two Interactive don't operate, sponsor or endorse this site.",
    sections: [
      { heading: "Names, trademarks and media", body: "Grand Theft Auto, GTA VI and related names, trademarks, screenshots and videos belong to their respective owners. We use credited official material for reporting, commentary and reference, and link back to the original source where useful." },
      { heading: "Why this matters", body: "GameplayAddict can explain official announcements and help readers find information, but we can't speak for Rockstar, provide account support or guarantee that pre-release details won't change." },
    ],
  },
  "terms": {
    description: "These terms set the basic rules for using GameplayAddict and explain the limits of an independent pre-release gaming publication.",
    sections: [
      { heading: "Independent fan site", body: "GameplayAddict isn't affiliated with, sponsored by, endorsed by or operated by Rockstar Games, Take-Two Interactive or their subsidiaries. Grand Theft Auto, GTA VI and related official media belong to their respective owners." },
      { heading: "Accuracy and changes", body: "We make reasonable efforts to source our coverage, but pre-release information can change. We don't promise that every detail will remain current or complete, and we correct pages when stronger information becomes available." },
      { heading: "Links, stores and advertising", body: "GameplayAddict may link to official pages, storefronts, retailers and advertising partners. We don't control their prices, availability, products, terms or privacy practices. Affiliate-eligible links will be disclosed when a real relationship exists." },
      { heading: "Using the site", body: "Don't disrupt the site, submit unlawful material or republish our original writing as your own. Pink Slip, search and other interactive features are provided for ordinary personal use." },
      { heading: "Ownership", body: "Our original writing, design and GameplayAddict branding belong to GameplayAddict. Rockstar and Take-Two retain ownership of their trademarks, screenshots, trailers and other official material." },
      { heading: "No warranties", body: "GameplayAddict is provided as is. To the extent allowed by law, we aren't responsible for losses caused by relying on pre-release information, using third-party sites or making purchases through external links." },
      { heading: "Changes to these terms", body: "We may update these terms as the site changes. Continued use after an update means you accept the revised terms." },
      { heading: "Contact", body: "Our public contact channel isn't active yet. We'll publish a working address or form here when it becomes available." },
    ],
  },
};

const familyCopy: Record<ContentFamily, { eyebrow: string }> = {
  core: { eyebrow: "GTA VI" }, characters: { eyebrow: "Character" }, locations: { eyebrow: "Location" },
  vehicles: { eyebrow: "Vehicle" }, businesses: { eyebrow: "Business" }, features: { eyebrow: "Gameplay" },
  commercial: { eyebrow: "Buy smart" }, editorial: { eyebrow: "Guide" }, questions: { eyebrow: "Answer" },
  trust: { eyebrow: "GameplayAddict" }, operator: { eyebrow: "Operations" },
};

function vehicleProfile(seed: Seed): EditorialProfile | undefined {
  const description = vehicleOpeners[seed.slug];
  if (!description) return undefined;
  const commonFacts: ContentRecord["facts"] = [
    { label: "Evidence", value: (seed.evidence ?? "OFFICIAL_OBSERVED").replaceAll("_", " ") },
    { label: "Performance data", value: "Not published" },
    { label: "Source", value: seed.slug.endsWith("55-vapid-stanier") ? "Rockstar preorder material" : "Rockstar official media" },
  ];
  if (seed.slug === "gta-6/vehicles/55-vapid-stanier") return {
    description,
    facts: [{ label: "Identification", value: "Rockstar named" }, { label: "Model", value: "'55 Vapid Stanier" }, { label: "Edition link", value: "Vintage Vice City pack" }],
    sections: [
      { heading: "Named by Rockstar", body: "The current preorder description identifies the '55 Vapid Stanier directly, so this file does not depend on visual model matching." },
      { heading: "Where it appears", body: "Rockstar lists the car inside the Vintage Vice City pack attached to current preorder material." },
      { heading: "What the listing supports", body: "The name and pack relationship are confirmed. A marketing image can support visible styling, not handling or performance." },
      { heading: "Still unknown", body: "Top speed, upgrades, acquisition outside the pack, resale value and spawn behavior have not been published." },
    ],
  };
  const specificSections = vehicleSections[seed.slug];
  if (specificSections) return { description, facts: commonFacts, sections: specificSections };
  if (seed.slug.includes("trailer-") || seed.slug.endsWith("extended-look")) return {
    description,
    facts: commonFacts,
    sections: [
      { heading: "Scenes reviewed", body: `${seed.title} groups road, water, air and background traffic only where the official video provides a usable view.` },
      { heading: "Identification rule", body: `${seed.title} records a clear category before a model name; ambiguous badges, partial silhouettes and community guesses stay unconfirmed.` },
      { heading: "Observed details", body: `Frames in ${seed.title} may support body style, setting and visible use, but not price, speed, handling or availability.` },
      { heading: "Still unknown", body: `${seed.title} does not publish a complete fleet, vehicle economy, upgrade path or spawn table.` },
    ],
  };
  if (seed.slug === "gta-6/vehicles") return {
    description,
    facts: [{ label: "Coverage", value: "Road · water · air" }, { label: "Named vehicles", value: "4 in current sales material" }, { label: "Final fleet", value: "Unpublished" }],
    sections: [
      { heading: "Vehicles Rockstar has named", body: "Current sales material names the '55 Vapid Stanier, '95 Grotti Cheetah, Vapid Ganado Retro Build and '67 Vapid Dominator Buggy." },
      { heading: "What appears across Leonida", body: "Vice City footage includes dense road traffic, sports cars, motorcycles, buses and police vehicles. Ambrosia adds industrial transport, while the Keys and Grassrivers show boats and airboats; aircraft appear in several official scenes." },
      { heading: "What remains unknown", body: "Rockstar has not published the complete vehicle list, prices, performance figures, upgrades, dealerships or spawn locations." },
    ],
  };
  return {
    description,
    facts: commonFacts,
    sections: [
      { heading: "Identification", body: `${seed.title} is tracked at the narrowest level Rockstar's images support; its visible class is not promoted to an exact model without stronger evidence.` },
      { heading: "Official appearances", body: `Rockstar trailers, screenshots and the extended presentation supply the visual record for ${seed.title.toLowerCase()}. Each attached image retains its source.` },
      { heading: "Observed details", body: `For ${seed.title.toLowerCase()}, the scene, body style and visible use may be described, while the same frame cannot establish performance, ownership or final availability.` },
      { heading: "Still unknown", body: `Rockstar has not published complete statistics, prices, upgrades or spawn information for ${seed.title.toLowerCase()}.` },
    ],
  };
}

function commercialProfile(seed: Seed): EditorialProfile | undefined {
  const direction = commercialDirections[seed.slug];
  if (!direction) return undefined;
  const [description, firstHeading, firstBody, secondHeading, secondBody] = direction;
  return {
    description,
    sections: [{ heading: firstHeading, body: firstBody }, { heading: secondHeading, body: secondBody }],
  };
}

function editorialProfileFor(family: ContentFamily, seed: Seed): EditorialProfile | undefined {
  return seed.description && seed.sections
    ? { description: seed.description, facts: seed.facts, sections: seed.sections }
    : characterEditorial[seed.slug]
      ?? locationEditorial[seed.slug]
      ?? editorialDirections[seed.slug]
      ?? specialEditorial[seed.slug]
      ?? legacyEditorial[seed.slug]
      ?? (family === "vehicles" ? vehicleProfile(seed) : undefined)
      ?? (family === "commercial" ? commercialProfile(seed) : undefined);
}

function buildRecord(family: ContentFamily, seed: Seed): ContentRecord {
  const copy = familyCopy[family];
  const sourcesForRecord = seed.sourceIds ?? ["rockstar-hub"];
  const isUnknown = seed.evidence === "UNKNOWN" || seed.evidence === "UNCONFIRMED";
  const editorial = editorialProfileFor(family, seed);
  return {
    slug: seed.slug,
    title: seed.title,
    eyebrow: copy.eyebrow,
    description: editorial?.description ?? seed.description ?? "",
    directAnswer: seed.answer,
    family,
    evidence: seed.evidence ?? "OFFICIAL_CONFIRMED",
    publication: publicationFor(seed.slug, family === "operator" || isUnknown ? "NOINDEX" : "INDEXABLE"),
    updatedAt: ["gta-6/news", "gta-6/locations/vice-city", "gta-6/reveal-timeline"].includes(seed.slug) ? "2026-09-07" : family === "trust" || ["gta-6", "gta-6/trailers", "gta-6/guides/extended-look-breakdown"].includes(seed.slug) ? "2026-09-03" : ["gta-6/preorder", "gta-6/buy-smart", "gta-6/ps5", "gta-6/best-controller"].includes(seed.slug) ? "2026-09-04" : "2026-08-30",
    facts: editorial?.facts ?? seed.facts ?? [
      { label: "Evidence", value: (seed.evidence ?? "OFFICIAL_CONFIRMED").replaceAll("_", " ") },
      { label: "Last verified", value: "August 30, 2026" },
      { label: "Primary source", value: sources.find((source) => source.id === sourcesForRecord[0])?.publisher ?? "Rockstar Games" },
    ],
    sections: editorial?.sections ?? seed.sections ?? [],
    sourceIds: sourcesForRecord,
    related: [],
    searchTerms: `${seed.title} ${seed.answer}`.toLowerCase().split(/\W+/).filter(Boolean),
    crew: seed.crew ?? (family === "commercial" ? "pink-slip" : family === "locations" ? "slick" : family === "characters" ? "onyx" : "cipher"),
    map: seed.map,
  };
}

const coreSeeds: Seed[] = [
  { slug: "gta-6", title: "GTA VI Hub", answer: "GTA VI launches November 19, 2026 for PlayStation 5 and Xbox Series X|S. Lucia Caminos and Jason Duval lead the story across six named Leonida regions, and Rockstar has shown several gameplay systems and activities.", sourceIds: ["rockstar-hub", "rockstar-release", "netflix-top-ten-2026-09-01"] },
  { slug: "gta-6/release-date", title: "GTA VI Release Date", answer: "Rockstar currently lists Thursday, November 19, 2026 as the GTA VI release date.", sourceIds: ["rockstar-release"] },
  { slug: "gta-6/countdown", title: "GTA VI Release Countdown", answer: "The countdown targets November 19, 2026 and is configuration-driven so a future official change updates the product consistently.", sourceIds: ["rockstar-release"] },
  { slug: "gta-6/platforms", title: "GTA VI Platforms", answer: "The confirmed launch platforms are PlayStation 5 and Xbox Series X|S; no PC, PS4, or Xbox One launch version is currently announced.", sourceIds: ["rockstar-hub"] },
  { slug: "gta-6/preorder", title: "GTA VI Preorder Center", answer: "Game preorders are live for Standard and Ultimate editions. Sony's two $84.99 GTA VI Limited Edition DualSense controllers open for preorder September 10 and launch starting November 19.", sourceIds: ["rockstar-preorder", "playstation-store", "playstation-dualsense-gta6"], crew: "pink-slip" },
  { slug: "gta-6/editions", title: "GTA VI Editions Compared", answer: "The official U.S. prices are $79.99 for Standard and $99.99 for Ultimate; the $20 difference should be judged against the disclosed digital extras.", sourceIds: ["rockstar-preorder"], crew: "pink-slip" },
  { slug: "gta-6/preorder-bonuses", title: "GTA VI Preorder Bonuses", answer: "Official preorder materials list the Vintage Vice City Pack and, for eligible digital preorders, one month of GTA+; terms vary by storefront and region.", sourceIds: ["rockstar-preorder", "playstation-store"], crew: "pink-slip" },
  { slug: "gta-6/trailers", title: "Official GTA VI Trailers", answer: "Rockstar has released Trailer 1, Trailer 2 and an Extended Look captured from in-game PlayStation 5 footage.", sourceIds: ["rockstar-hub", "rockstar-extended", "netflix-top-ten-2026-09-01"] },
  { slug: "gta-6/screenshots", title: "Official GTA VI Screenshots", answer: "Rockstar's official images cover Jason, Lucia, the six supporting characters, six major Leonida regions and a wide range of vehicles and settings.", sourceIds: ["rockstar-media"] },
  { slug: "gta-6/reveal-timeline", title: "GTA VI Reveal Timeline", answer: "The timeline connects Rockstar's official reveal, Trailer 2, release-date changes, preorder launch, the Extended Look and September 2026 product and public-response news.", sourceIds: ["rockstar-hub", "rockstar-release", "rockstar-preorder", "rockstar-extended", "playstation-dualsense-gta6", "miami-dade-gta-vi-opposition-2026-09-03", "axios-miami-gta-vi-proposal-2026-08-28"] },
  { slug: "gta-6/confirmed-features", title: "Confirmed GTA VI Features", answer: "Rockstar has described protagonist switching, body changes, working phone feeds and a more reactive world; official footage also shows activities whose full rules remain unreleased.", sourceIds: ["rockstar-hub", "rockstar-extended"] },
  { slug: "gta-6/confirmed-vs-rumored", title: "GTA VI Confirmed vs Rumored", answer: "Rockstar has confirmed the release date, launch consoles, protagonists, named regions and editions. Final map size, download size, PC timing, crossplay and the complete online plan remain unannounced.", sourceIds: ["rockstar-hub"] },
  { slug: "gta-6/faq", title: "GTA VI FAQ", answer: "GTA VI launches November 19, 2026 on PS5 and Xbox Series X|S, stars Jason and Lucia, and takes place across Vice City and the wider state of Leonida.", sourceIds: ["rockstar-hub", "rockstar-preorder"] },
  { slug: "gta-6/news", title: "GTA VI News", answer: "Sony has announced two GTA VI Limited Edition DualSense controllers, while Miami-Dade officials have opposed a separate reported Vice City marketing proposal that remains unapproved.", description: "Follow the GTA VI developments that change what players know, from official product announcements to substantial reporting and public statements.", sourceIds: ["playstation-dualsense-gta6", "miami-dade-gta-vi-opposition-2026-09-03", "axios-miami-gta-vi-proposal-2026-08-28", "axios-miami-gta-vi-opposition-2026-09-03"] },
  { slug: "gta-6/discoveries", title: "GTA VI Discoveries", answer: "Rockstar's official footage shows identifiable people, locations, vehicle classes and activities, including racing, basketball, kayaking and scuba diving in the Extended Look.", evidence: "OFFICIAL_OBSERVED", sourceIds: ["rockstar-media", "rockstar-extended"], crew: "slick" },
  { slug: "gta-6/guides", title: "GTA VI Guides", answer: "Find the eight named characters, six Leonida regions, vehicle categories, official video breakdowns, gameplay features and practical launch advice in one guide collection.", sourceIds: ["rockstar-hub", "rockstar-leonida"] },
  { slug: "cipher", title: "Ask Pink Slip", answer: "Ask Pink Slip about GTA VI and get a direct answer, map action, official image or buying recommendation when GameplayAddict has one.", sourceIds: [] },
  { slug: "search", title: "Search GameplayAddict", answer: "Site-wide search indexes characters, locations, vehicles, businesses, features, guides, discoveries, questions, and commercial decision pages.", sourceIds: [] },
];

const characterSeeds: Seed[] = [
  { slug: "gta-6/characters", title: "GTA VI Characters", answer: "Rockstar's revealed cast includes protagonists Lucia Caminos and Jason Duval plus Cal Hampton, Boobie Ike, Dre'Quan Priest, Real Dimez, Raul Bautista, and Brian Heder." },
  { slug: "gta-6/characters/lucia-caminos", title: "Lucia Caminos", answer: "Lucia is a playable protagonist, a fighter fresh out of prison and Jason's partner in GTA VI's central fugitive story." },
  { slug: "gta-6/characters/jason-duval", title: "Jason Duval", answer: "Jason is a playable protagonist, an ex-military drug runner and Lucia's partner in GTA VI's central fugitive story." },
  { slug: "gta-6/characters/cal-hampton", title: "Cal Hampton", answer: "Cal Hampton is part of Rockstar's officially revealed supporting cast; this dossier limits itself to Rockstar's published description and appearances." },
  { slug: "gta-6/characters/boobie-ike", title: "Boobie Ike", answer: "Boobie Ike is an officially revealed Vice City figure connected to business, music, and Dre'Quan Priest." },
  { slug: "gta-6/characters/drequan-priest", title: "Dre'Quan Priest", answer: "Dre'Quan Priest is a hustler pursuing music through Only Raw Records and is connected to Real Dimez and Boobie Ike." },
  { slug: "gta-6/characters/real-dimez", title: "Real Dimez", answer: "Real Dimez are Bae-Luxe and Roxy, longtime friends and rappers signed to Only Raw Records after an earlier local hit." },
  { slug: "gta-6/characters/raul-bautista", title: "Raul Bautista", answer: "Raul Bautista is an experienced bank robber whose official profile emphasizes confidence, charm, cunning, and escalating risk." },
  { slug: "gta-6/characters/brian-heder", title: "Brian Heder", answer: "Brian Heder is an officially revealed supporting character; any role beyond Rockstar's published material remains unknown." },
].map((seed) => ({ ...seed, sourceIds: seed.slug.endsWith("lucia-caminos") || seed.slug.endsWith("jason-duval") ? ["rockstar-leonida", "dazed-rockstar-interview"] : ["rockstar-leonida"], crew: "onyx" as const }));

const locationSeeds: Seed[] = [
  { slug: "gta-6/locations", title: "GTA VI Locations", answer: "Rockstar has named six major Leonida regions: Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia, and Mount Kalaga National Park.", map: { x: 49, y: 54, category: "region" } },
  { slug: "gta-6/map", title: "The Grid — GTA VI Map", answer: "The Grid is a functional evidence schematic of officially named regions, not a claim to reproduce Rockstar's unreleased full map.", map: { x: 50, y: 50, category: "region" } },
  { slug: "gta-6/locations/vice-city", title: "Vice City", answer: "Vice City is the principal modern coastal city in GTA VI and the best-established setting in official media.", sourceIds: ["rockstar-leonida", "rockstar-media", "miami-dade-gta-vi-opposition-2026-09-03", "axios-miami-gta-vi-proposal-2026-08-28"], map: { x: 69, y: 72, category: "region" } },
  { slug: "gta-6/locations/leonida", title: "State of Leonida", answer: "Leonida is Rockstar's fictional Florida-inspired state encompassing Vice City and multiple distinct regions.", map: { x: 52, y: 50, category: "region" } },
  { slug: "gta-6/locations/leonida-keys", title: "Leonida Keys", answer: "The Leonida Keys are an officially named island region associated with water, bridges, boats, and tropical settlement.", map: { x: 72, y: 88, category: "region" } },
  { slug: "gta-6/locations/grassrivers", title: "Grassrivers", answer: "Grassrivers is Rockstar's wetland region, shown with waterways, wildlife, and swamp culture.", map: { x: 37, y: 67, category: "region" } },
  { slug: "gta-6/locations/port-gellhorn", title: "Port Gellhorn", answer: "Port Gellhorn is an officially named coastal region presented as a rougher former tourist destination.", map: { x: 24, y: 51, category: "region" } },
  { slug: "gta-6/locations/ambrosia", title: "Ambrosia", answer: "Ambrosia is an officially named Leonida region tied to industry, sugar production, and inland communities.", map: { x: 46, y: 32, category: "region" } },
  { slug: "gta-6/locations/mount-kalaga", title: "Mount Kalaga National Park", answer: "Mount Kalaga National Park is the officially named northern wilderness region, shown with forested terrain and outdoor activity.", map: { x: 43, y: 14, category: "region" } },
  { slug: "gta-6/locations/leonida-penitentiary", title: "Leonida Penitentiary", answer: "Leonida Penitentiary is an official location directly connected to Lucia's revealed story.", map: { x: 57, y: 43, category: "location" } },
  { slug: "gta-6/locations/vice-city-beaches", title: "Vice City Beaches", answer: "Official media establishes crowded beachfronts and coastal leisure in Vice City, while exact district borders remain unpublished.", evidence: "OFFICIAL_OBSERVED", map: { x: 81, y: 68, category: "location" } },
  { slug: "gta-6/locations/leonida-waterways", title: "Leonida Waterways", answer: "Official footage supports extensive coastal and inland water travel, but the full navigable network and boundaries remain unknown.", evidence: "OFFICIAL_OBSERVED", map: { x: 56, y: 70, category: "location" } },
].map((seed): Seed => ({ ...seed, evidence: seed.evidence as EvidenceState | undefined, map: seed.map as ContentRecord["map"], sourceIds: ["rockstar-leonida", "rockstar-media"], crew: "slick" }));

const vehicleTopics: Array<[string, string, string]> = [
  ["vehicles", "GTA VI Vehicles", "Rockstar has shown cars, motorcycles, police vehicles, buses, work trucks, boats, airboats and aircraft, and has officially named the '55 Vapid Stanier, '95 Grotti Cheetah, Vapid Ganado Retro Build and '67 Vapid Dominator Buggy."],
  ["vehicles/cars", "GTA VI Cars", "Cars are extensively visible in official GTA VI media, but a complete official model list and final performance statistics have not been published."],
  ["vehicles/motorcycles", "GTA VI Motorcycles", "Motorcycles appear in official media; model names, handling values, and spawn points should remain unclaimed until sourced."],
  ["vehicles/boats", "GTA VI Boats", "Boats and other watercraft are visible across official Leonida footage, supporting water travel without confirming the full fleet."],
  ["vehicles/aircraft", "GTA VI Aircraft", "Aircraft appear in official media, but the complete flyable lineup and acquisition rules are not yet published."],
  ["vehicles/emergency", "GTA VI Emergency Vehicles", "Police and emergency vehicles are visible in official material; equipment and pursuit behavior require separate evidence."],
  ["vehicles/sports-cars", "GTA VI Sports Cars", "Performance-styled cars are visible, but top speeds, upgrade ceilings, and rankings are unknown before testing."],
  ["vehicles/classics", "GTA VI Classic Cars", "The official Vintage Vice City preorder pack names a '55 Vapid Stanier and establishes a classic-car theme."],
  ["vehicles/off-road", "GTA VI Off-Road Vehicles", "Official region imagery supports off-road vehicles in rural and wilderness settings without proving specific spawn locations."],
  ["vehicles/public-transport", "GTA VI Public Transport", "Official media shows transit context, but usable routes, schedules, and player interaction are not fully explained."],
  ["vehicles/utility", "GTA VI Utility Vehicles", "Work and utility vehicles appear in the world imagery; their ownership and gameplay functions remain unknown."],
  ["vehicles/police", "GTA VI Police Vehicles", "Police vehicles are observed in official footage; a complete pursuit fleet and wanted-system specification are not published."],
  ["vehicles/55-vapid-stanier", "'55 Vapid Stanier", "The '55 Vapid Stanier is officially named in the Vintage Vice City preorder materials."],
  ["vehicles/trailer-1", "Vehicles Seen in GTA VI Trailer 1", "Trailer 1 shows road traffic, motorcycles, boats, police vehicles and performance-styled cars without publishing final-game statistics."],
  ["vehicles/trailer-2", "Vehicles Seen in GTA VI Trailer 2", "Trailer 2 adds character-driven driving, street traffic and criminal scenes while leaving many exact vehicle models unconfirmed."],
  ["vehicles/extended-look", "Vehicles in the GTA VI Extended Look", "This inventory tracks vehicles visible in Rockstar's August 2026 presentation while keeping exact specifications unknown."],
];

const businessSeeds: Seed[] = [
  { slug: "gta-6/businesses", title: "GTA VI Businesses & Brands", answer: "Official character and region pages name multiple businesses and organizations; their full player-facing functions are not yet documented." },
  { slug: "gta-6/businesses/only-raw-records", title: "Only Raw Records", answer: "Only Raw Records is the music label associated with Dre'Quan Priest and Real Dimez." },
  { slug: "gta-6/businesses/jack-of-hearts", title: "Jack of Hearts", answer: "Jack of Hearts is an officially presented Vice City venue connected to Boobie Ike and Dre'Quan Priest." },
  { slug: "gta-6/businesses/brians-boat-works", title: "Brian's Boat Works", answer: "Brian's Boat Works is a named business associated with Brian Heder and the Leonida Keys." },
  { slug: "gta-6/businesses/uncle-jacks-liquor", title: "Uncle Jack's Liquor", answer: "Uncle Jack's Liquor is a named Port Gellhorn business visible in official world material." },
  { slug: "gta-6/businesses/allied-crystal-sugar", title: "Allied Crystal Sugar", answer: "Allied Crystal Sugar is an industrial operation tied to the Ambrosia region in official material." },
  { slug: "gta-6/businesses/thrillbilly-mud-club", title: "Thrillbilly Mud Club", answer: "Thrillbilly Mud Club is a named Leonida Keys activity venue; exact gameplay rewards and access are unknown." },
  { slug: "gta-6/businesses/boobie-ike-enterprises", title: "Boobie Ike's Business Network", answer: "Rockstar describes Boobie Ike as a local Vice City businessman connected to Jack of Hearts, Only Raw Records and Dre'Quan Priest." },
].map((seed) => ({ ...seed, sourceIds: ["rockstar-leonida"], crew: "pink-slip" as const }));

const featureTopics: Array<[string, string, string, EvidenceState?]> = [
  ["features", "GTA VI Systems & Features", "Rockstar has now described character switching, body changes, working social feeds and a more reactive world; each page separates those facts from what remains unknown."],
  ["features/single-player", "GTA VI Single-Player Story", "Official preorder copy describes GTA VI as a single-player experience centered on Jason and Lucia."],
  ["features/dual-protagonists", "GTA VI Character Switching", "Jason and Lucia can be controlled together or independently, including driver-to-passenger role changes during shared action."],
  ["features/body-weight-exercise", "GTA VI Weight, Exercise & Rest System", "Food affects weight, exercise changes muscle tone and long periods without rest alter Jason and Lucia's appearance."],
  ["features/wanted-system", "GTA VI Wanted System & World Reactions", "Leonida responds more realistically to player behavior such as openly carrying a rifle, while the complete police escalation rules remain unpublished."],
  ["features/npcs-world-reactions", "GTA VI NPCs & World Reactions", "Rockstar built new population tools and a dedicated pedestrian team to make NPC appearance, movement and responses more locally specific."],
  ["features/interiors", "GTA VI Interiors", "Official scenes show multiple interiors; Rockstar has not published a count or promised that every building is enterable.", "OFFICIAL_OBSERVED"],
  ["features/wildlife", "GTA VI Wildlife", "Official Leonida media visibly includes wildlife, while species behavior and gameplay systems remain only partly explained.", "OFFICIAL_OBSERVED"],
  ["features/transportation", "GTA VI Transportation", "Official footage establishes road, water, and air transport, not a complete list of usable systems.", "OFFICIAL_OBSERVED"],
  ["features/social-media", "GTA VI Phone & Social Media System", "The in-game phone has working social feeds that can be used from the passenger seat; posting controls and player-created content remain unexplained."],
  ["features/relationship-system", "GTA VI Relationship System", "Jason and Lucia are a playable couple whose choices have relationship consequences, but Rockstar has not shown meters, branching rules or endings."],
  ["features/console-performance", "GTA VI 30 FPS & Performance Modes", "The console preview build ran at 30 FPS; Rockstar has not promised a 60 FPS, 40 FPS or PS5 Pro mode."],
  ["features/robberies", "Robberies in GTA VI", "Official story and character material establishes criminal scores and a seasoned bank robber; activity structure and payouts remain unknown."],
  ["features/weapons", "GTA VI Weapons & Official Items", "Rockstar officially names the Hawk & Little Morgan Revolvers, personalized weapon variants, and a Vintage Vice City weapon pattern; broader weapon stats, unlocks, pricing, and availability remain unpublished."],
  ["features/customization", "GTA VI Customization", "Official preorder materials name outfits, hairstyles, vehicle-related items, and a weapon pattern, confirming customization categories without revealing full depth."],
  ["features/racing", "Racing in GTA VI", "Official 2026 presentation footage visibly includes racing, but event count, classes, and rewards are not yet documented.", "OFFICIAL_OBSERVED"],
  ["features/basketball", "Basketball in GTA VI", "Basketball appears in official presentation footage; the scope of player control and progression is not fully explained.", "OFFICIAL_OBSERVED"],
  ["features/scuba-diving", "Scuba Diving in GTA VI", "Underwater activity appears in official footage, supporting exploration while leaving equipment and mission details unknown.", "OFFICIAL_OBSERVED"],
  ["features/kayaking", "Kayaking in GTA VI", "Kayaking appears in official materials, but availability and mechanics have not been fully detailed.", "OFFICIAL_OBSERVED"],
  ["features/properties", "Properties in GTA VI", "Official Ultimate Edition materials reference garages and property-adjacent content, but the base-game ownership system remains unclear.", "SUPPORTED_INFERENCE"],
  ["features/gta-online", "GTA VI Online Mode", "Rockstar has not announced a GTA VI online launch date or complete multiplayer feature set.", "UNKNOWN"],
];

const commercialTopics: Array<[string, string, string]> = [
  ["buy-smart", "Pink Slip's Buy Smart", "Keep the PS5 or Xbox Series X|S already in your home. If you want Sony's official GTA VI DualSense design, Black and White Limited Editions cost $84.99 each and open for preorder September 10."],
  ["where-to-preorder", "Where to Preorder GTA VI", "Use Rockstar, PlayStation, Xbox, or a verified retailer listing; all current links are direct merchant links with no claimed affiliate relationship."],
  ["standard-vs-ultimate", "GTA VI Standard vs Ultimate", "Standard is $79.99 and Ultimate is $99.99 in the U.S.; pay the extra $20 only if the disclosed digital extras matter to you."],
  ["ps5", "GTA VI on PS5", "GTA VI is confirmed for PS5. Sony says it supports DualSense haptic feedback and adaptive-trigger resistance, and two $84.99 limited-edition controllers launch starting November 19."],
  ["xbox", "GTA VI on Xbox Series X|S", "GTA VI is confirmed for Xbox Series X|S; Xbox One is not in the announced launch lineup."],
  ["ps5-vs-xbox", "PS5 vs Xbox for GTA VI", "Choose based on the console you own, storage, display, controller preference, and household ecosystem—not unsupported frame-rate claims."],
  ["best-headset", "Best Headset Criteria for GTA VI", "Prioritize comfort, platform compatibility, a clear mic, and honest return terms; no headset is labeled a GTA VI performance requirement."],
  ["best-controller", "GTA VI Limited Edition DualSense Controllers", "Sony's GTA VI Black and White Limited Edition DualSense controllers cost $84.99 each in the U.S. Preorders open September 10, with both launching starting November 19."],
  ["best-monitor", "Best Monitor Criteria for GTA VI", "Focus on console-compatible resolution, refresh support, HDR quality, input latency, and screen size instead of chasing unconfirmed game modes."],
  ["best-tv", "Best TV Criteria for GTA VI", "A strong gaming TV needs low-latency mode, good HDR, suitable size, and the correct HDMI features for your console."],
  ["best-storage", "Storage Planning for GTA VI", "The final install size is not officially confirmed, so buy compatible storage based on your wider library and leave margin rather than trusting rumor."],
  ["ps5-ssd", "PS5 SSD Guide for GTA VI", "Any expansion should meet Sony's current PS5 requirements; GameplayAddict does not claim a GTA VI-specific capacity before Rockstar publishes one."],
  ["gaming-setup", "GTA VI Gaming Setup", "Build around your existing console and display first, then fix the actual bottleneck—storage, audio, seating, power, or connectivity."],
  ["budget-setup", "Budget GTA VI Setup", "A budget build should preserve the console and display you already own and spend only on a verified gap."],
  ["premium-setup", "Premium GTA VI Setup", "A premium setup should improve measurable comfort, picture, audio, storage, and reliability—not collect expensive logos."],
  ["accessories", "GTA VI Accessories", "Accessories are optional; compatibility, warranty, comfort, and real utility outrank themed marketing."],
  ["release-preparation", "GTA VI Release Preparation", "Confirm your platform, edition, account access, storage margin, updates, and preload window before launch week."],
  ["gift-guide", "GTA VI Gift Guide", "Verify the recipient's platform, region, edition preference, and digital-code comfort before buying anything."],
  ["preload", "GTA VI Preload Guide", "Rockstar currently lists November 12, 2026 for preload; preload does not mean early access."],
  ["code-in-box", "GTA VI Code-in-Box Explained", "Rockstar's current physical-format listing contains a download code rather than a disc, so resale and offline expectations should be checked before purchase."],
];

const editorialTopics: Array<[string, string, string]> = [
  ["everything-rockstar-confirmed", "Everything Rockstar Has Confirmed About GTA VI", "GTA VI launches November 19, 2026 on PS5 and Xbox Series X|S, stars Jason and Lucia, spans six named Leonida regions and currently has Standard and Ultimate editions."],
  ["every-character-revealed", "Every GTA VI Character Revealed So Far", "Rockstar has named Lucia Caminos, Jason Duval, Cal Hampton, Boobie Ike, Dre'Quan Priest, Real Dimez, Raul Bautista and Brian Heder."],
  ["every-location-revealed", "Every GTA VI Location Revealed So Far", "Rockstar has named six major Leonida regions and several places within them, including Leonida Penitentiary, Brian's Boat Works and Allied Crystal Sugar."],
  ["every-vehicle-observed", "Every GTA VI Vehicle Category Observed So Far", "Rockstar has shown cars, motorcycles, police vehicles, buses, work trucks, boats, airboats and aircraft, while current sales material names several individual vehicles."],
  ["trailer-1-breakdown", "GTA VI Trailer 1 Evidence Breakdown", "The first trailer establishes Leonida, Vice City, Lucia, social-video culture, crowds, wildlife, vehicles, and coastal life."],
  ["trailer-2-breakdown", "GTA VI Trailer 2 Evidence Breakdown", "Trailer 2 deepens Jason and Lucia's relationship, supporting cast, criminal pressure, and the wider world."],
  ["extended-look-breakdown", "GTA VI Extended Look Breakdown", "Rockstar's 27-minute in-game PS5 presentation shows Jason, Lucia, racing, basketball, kayaking and underwater activity. Netflix recorded 31.1 million views in its first partial week."],
  ["launch-timeline", "The Road to GTA VI Launch", "This timeline connects Rockstar's announcements to practical player decisions and identifies what still needs confirmation."],
  ["evidence-standard", "How to Verify a GTA VI Claim", "Check whether the claim is stated, observed, inferred, unconfirmed, disputed, or unknown—then follow the source."],
  ["map-estimates-explained", "Why GTA VI Map Estimates Are Not Official", "Community maps can be useful orientation tools, but Rockstar has not published a final full-map image or official area measurement."],
  ["launch-day-checklist", "GTA VI Launch-Day Checklist", "A calm launch plan covers account access, preload, storage, updates, display settings, and official status pages."],
  ["spoiler-policy", "GameplayAddict GTA VI Spoiler Policy", "Pre-release pages avoid invented plot detail; post-release story coverage will use clear spoiler gates and route-level labels."],
];

const questionTopics: Array<[string, string, string, EvidenceState?]> = [
  ["is-gta-6-coming-to-pc", "Is GTA VI Coming to PC?", "No PC release date is officially announced. Only PS5 and Xbox Series X|S are confirmed for November 19, 2026.", "UNKNOWN"],
  ["is-gta-6-on-ps4", "Is GTA VI on PS4?", "No. PS4 is not in Rockstar's announced GTA VI launch platforms."],
  ["is-gta-6-on-xbox-one", "Is GTA VI on Xbox One?", "No. Xbox One is not in Rockstar's announced GTA VI launch platforms."],
  ["when-can-gta-6-preload", "When Can GTA VI Preload?", "Rockstar currently lists November 12, 2026 for preload, one week before launch."],
  ["where-is-gta-6-set", "Where Is GTA VI Set?", "GTA VI is set in the fictional state of Leonida, centered on Vice City and extending across several named regions."],
  ["who-is-lucia", "Who Is Lucia Caminos?", "Lucia is one of GTA VI's two central protagonists and an officially profiled character with ties to Leonida Penitentiary."],
  ["who-is-jason", "Who Is Jason Duval?", "Jason is one of GTA VI's two central protagonists and Lucia's partner in the central story."],
  ["is-vice-city-in-gta-6", "Is Vice City in GTA VI?", "Yes. Vice City is the primary named city in Rockstar's official GTA VI material."],
  ["how-big-is-gta-6-map", "How Big Is the GTA VI Map?", "Rockstar has not published an official area measurement, so precise square-mile or multiplier claims are estimates.", "UNKNOWN"],
  ["how-much-is-gta-6", "How Much Does GTA VI Cost?", "The official U.S. prices are $79.99 Standard and $99.99 Ultimate; regional prices and taxes vary."],
  ["does-gta-6-have-online", "Does GTA VI Have Online Multiplayer?", "Rockstar has not published a launch date or complete feature specification for a GTA VI online mode.", "UNKNOWN"],
  ["is-gta-6-single-player", "Is GTA VI Single-Player?", "Yes. Rockstar's current sales description identifies GTA VI as a single-player experience."],
  ["who-are-gta-6-protagonists", "Who Are the GTA VI Protagonists?", "Jason Duval and Lucia Caminos are the two central protagonists."],
  ["does-gta-6-have-a-disc", "Does GTA VI Come on Disc?", "Rockstar's current physical listing is code-in-box without a disc."],
  ["what-is-leonida", "What Is Leonida in GTA VI?", "Leonida is GTA VI's fictional Florida-inspired state and the broader setting around Vice City."],
  ["what-is-in-ultimate-edition", "What Is in GTA VI Ultimate Edition?", "Ultimate includes the base game plus Rockstar's disclosed premium vehicles, weapons, apparel, and other digital content threaded through the story."],
  ["is-gta-6-crossplay", "Will GTA VI Have Crossplay?", "Rockstar has not announced GTA VI crossplay.", "UNKNOWN"],
  ["gta-6-download-size", "What Is the GTA VI Download Size?", "Rockstar has not published the final download size; exact numbers circulating without a current official listing are unconfirmed.", "UNKNOWN"],
];

const trustSeeds: Seed[] = [
  { slug: "about", title: "About GameplayAddict", answer: "We're an independent GTA VI publication built to help players find clear answers, official imagery and useful launch information without treating rumors as facts." },
  { slug: "contact", title: "Contact GameplayAddict", answer: "Our public contact inbox isn't active yet. We'll publish a working correction, rights and business contact here when it's ready." },
  { slug: "privacy", title: "Privacy Policy", answer: "GameplayAddict may receive basic hosting and analytics data, while questions and searches are used to return the feature a visitor requested." },
  { slug: "terms", title: "Terms of Use", answer: "By using GameplayAddict, you agree to use the site lawfully and understand that pre-release information and third-party offers can change." },
  { slug: "affiliate-disclosure", title: "Affiliate Disclosure", answer: "If GameplayAddict can earn a commission from a link, we'll disclose it clearly; current GTA VI store links don't claim an affiliate relationship." },
  { slug: "editorial-policy", title: "Editorial Policy", answer: "We publish information that answers a real player question, identify the source behind it and correct the page when stronger facts appear." },
  { slug: "verification-policy", title: "Source & Verification Policy", answer: "We separate Rockstar confirmations, details visible in official footage, outside reporting and information that simply isn't confirmed yet." },
  { slug: "independent-fan-disclaimer", title: "Independent Fan Disclaimer", answer: "GameplayAddict is an independent fan publication, not an official Rockstar Games or Take-Two Interactive website." },
].map((seed) => ({ ...seed, sourceIds: [] }));

const records: ContentRecord[] = [
  ...coreSeeds.map((seed) => buildRecord("core", seed)),
  ...characterSeeds.map((seed) => buildRecord("characters", seed)),
  ...locationSeeds.map((seed) => buildRecord("locations", seed)),
  ...vehicleTopics.map(([path, title, answer], index) =>
    buildRecord("vehicles", {
      slug: `gta-6/${path}`,
      title,
      answer,
      evidence: path === "vehicles/55-vapid-stanier" ? "OFFICIAL_CONFIRMED" : "OFFICIAL_OBSERVED",
      sourceIds: path === "vehicles/55-vapid-stanier" ? ["rockstar-preorder"] : ["rockstar-media", "rockstar-extended"],
      crew: index % 3 === 0 ? "pink-slip" : "slick",
    }),
  ),
  ...businessSeeds.map((seed) => buildRecord("businesses", seed)),
  ...featureTopics.map(([path, title, answer, evidence]) => buildRecord("features", {
    slug: `gta-6/${path}`,
    title,
    answer,
    evidence,
    sourceIds: path === "features/console-performance"
      ? ["tomshardware-performance-report", "rockstar-extended"]
      : ["features", "features/dual-protagonists", "features/body-weight-exercise", "features/wanted-system", "features/npcs-world-reactions", "features/social-media", "features/relationship-system"].includes(path)
        ? ["dazed-rockstar-interview", "rockstar-extended", "rockstar-media"]
        : ["rockstar-extended", "rockstar-media"],
  })),
  ...commercialTopics.map(([path, title, answer]) => buildRecord("commercial", { slug: `gta-6/${path}`, title, answer, sourceIds: ["rockstar-preorder", "playstation-store", ...(["buy-smart", "ps5", "best-controller"].includes(path) ? ["playstation-dualsense-gta6", "playstation-state-of-play-2026-09-03"] : [])], crew: "pink-slip" })),
  ...editorialTopics.map(([path, title, answer]) => buildRecord("editorial", { slug: `gta-6/guides/${path}`, title, answer, sourceIds: ["rockstar-hub", "rockstar-leonida", "rockstar-media", ...(path === "extended-look-breakdown" ? ["netflix-top-ten-2026-09-01"] : [])], crew: path.includes("map") ? "slick" : "cipher" })),
  ...questionTopics.map(([path, title, answer, evidence]) => buildRecord("questions", { slug: `gta-6/questions/${path}`, title, answer, evidence, sourceIds: ["rockstar-hub", "rockstar-preorder"], crew: path.includes("price") || path.includes("cost") ? "pink-slip" : "cipher" })),
  ...trustSeeds.map((seed) => buildRecord("trust", seed)),
  buildRecord("operator", { slug: "operator", title: "Content Operations", answer: "Review source, entity, guide, map, commercial, verification, and publication records through one constrained editorial workflow.", evidence: "UNKNOWN", sourceIds: ["rockstar-hub"] }),
];

const relatedOverrides: Record<string, string[]> = {
  "gta-6": ["gta-6/characters", "gta-6/locations", "gta-6/features"],
  "gta-6/release-date": ["gta-6/countdown", "gta-6/platforms", "gta-6/preorder"],
  "gta-6/countdown": ["gta-6/release-date", "gta-6/preload", "gta-6/release-preparation"],
  "gta-6/platforms": ["gta-6/ps5", "gta-6/xbox", "gta-6/ps5-vs-xbox"],
  "gta-6/preorder": ["gta-6/editions", "gta-6/preorder-bonuses", "gta-6/where-to-preorder"],
  "gta-6/editions": ["gta-6/standard-vs-ultimate", "gta-6/preorder-bonuses", "gta-6/preorder"],
  "gta-6/trailers": ["gta-6/guides/extended-look-breakdown", "gta-6/guides/trailer-2-breakdown", "gta-6/guides/trailer-1-breakdown"],
  "gta-6/guides/extended-look-breakdown": ["gta-6/platforms", "gta-6/preorder", "gta-6/buy-smart"],
  "gta-6/screenshots": ["gta-6/characters", "gta-6/locations", "gta-6/vehicles"],
  "gta-6/reveal-timeline": ["gta-6/trailers", "gta-6/release-date", "gta-6/news"],
  "gta-6/confirmed-features": ["gta-6/features", "gta-6/features/dual-protagonists", "gta-6/features/body-weight-exercise"],
  "gta-6/confirmed-vs-rumored": ["gta-6/confirmed-features", "gta-6/questions/gta-6-download-size", "gta-6/questions/how-big-is-gta-6-map"],
  "gta-6/faq": ["gta-6/release-date", "gta-6/platforms", "gta-6/characters"],
  "gta-6/news": ["gta-6/guides/extended-look-breakdown", "gta-6/features", "gta-6/reveal-timeline"],
  "gta-6/discoveries": ["gta-6/screenshots", "gta-6/trailers", "gta-6/features"],
  "gta-6/guides": ["gta-6/guides/everything-rockstar-confirmed", "gta-6/guides/extended-look-breakdown", "gta-6/guides/launch-day-checklist"],
  "gta-6/characters": ["gta-6/characters/lucia-caminos", "gta-6/characters/jason-duval", "gta-6/guides/every-character-revealed"],
  "gta-6/locations": ["gta-6/locations/vice-city", "gta-6/locations/leonida", "gta-6/guides/every-location-revealed"],
  "gta-6/locations/vice-city": ["gta-6/news", "gta-6/map", "gta-6/locations"],
  "gta-6/vehicles": ["gta-6/vehicles/sports-cars", "gta-6/vehicles/off-road", "gta-6/guides/every-vehicle-observed"],
  "gta-6/features": ["gta-6/features/dual-protagonists", "gta-6/features/body-weight-exercise", "gta-6/features/social-media"],
  "gta-6/buy-smart": ["gta-6/editions", "gta-6/platforms", "gta-6/best-storage"],
  "gta-6/best-controller": ["gta-6/buy-smart", "gta-6/ps5", "gta-6/preorder"],
  "gta-6/guides/every-vehicle-observed": ["gta-6/vehicles", "gta-6/vehicles/sports-cars", "gta-6/vehicles/off-road"],
};

const relatedStopWords = new Set(["gta", "vi", "the", "in", "for", "and", "official", "guide", "what", "is", "does", "have", "rockstar", "game", "games", "current", "published", "remains", "unknown", "material", "media", "shown", "visible"]);
const relationTerms = (record: ContentRecord) => new Set(record.searchTerms.filter((term) => term.length > 2 && !relatedStopWords.has(term)));
const slugs = new Set(records.map((record) => record.slug));
for (const record of records) {
  const explicit = relatedOverrides[record.slug];
  if (explicit) {
    record.related = [...new Set(explicit.map((slug) => canonicalRedirects[slug] ?? slug))]
      .filter((slug) => slug !== record.slug && slugs.has(slug) && records.find((candidate) => candidate.slug === slug)?.publication === "INDEXABLE");
    continue;
  }
  const terms = relationTerms(record);
  record.related = records
    .filter((candidate) => candidate.slug !== record.slug && candidate.publication === "INDEXABLE")
    .map((candidate) => {
      const shared = [...relationTerms(candidate)].filter((term) => terms.has(term)).length;
      return { slug: candidate.slug, score: shared };
    })
    .filter((candidate) => candidate.score >= 2)
    .sort((left, right) => right.score - left.score || left.slug.localeCompare(right.slug))
    .slice(0, 3)
    .map((candidate) => candidate.slug);
}

export const contentRecords = records;

export const commercialOffers: CommercialOffer[] = [
  {
    id: "rockstar-standard",
    merchant: "Rockstar Store",
    program: "Direct merchant link",
    merchantUrl: "https://store.rockstargames.com/game/buy-gta-vi",
    affiliateUrl: null,
    eligibility: "REQUIRES_APPROVAL",
    approvalStatus: "NOT_APPLIED",
    price: "$79.99 USD",
    priceTimestamp: "2026-08-30",
    category: "game-preorder",
    disclosureRequired: false,
    active: true,
    sourceId: "rockstar-preorder",
  },
  {
    id: "playstation-ultimate",
    merchant: "PlayStation Store",
    program: "Direct merchant link",
    merchantUrl: "https://store.playstation.com/en-us/concept/10000730",
    affiliateUrl: null,
    eligibility: "REQUIRES_APPROVAL",
    approvalStatus: "NOT_APPLIED",
    price: "$99.99 USD",
    priceTimestamp: "2026-08-30",
    category: "game-preorder",
    disclosureRequired: false,
    active: true,
    sourceId: "playstation-store",
  },
];

export const competitiveMatrix = [
  { competitor: "GTA6Database", strength: "Broad pre-release map and location inventory", gap: "Conventional database journey; limited personalized next-action routing", advantage: "Crew handoffs, evidence-first recommendations, mobile-first decision flow" },
  { competitor: "GTADB", strength: "Deep cross-game structured database and search", gap: "Utility is database-led rather than GTA VI companion-led", advantage: "Focused GTA VI intent paths, Buy Smart, source status, and next-action architecture" },
  { competitor: "GTA6MAP.IO", strength: "Fast map-first experience and concise launch facts", gap: "Limited assistant, commerce, and personalized workflow depth", advantage: "Functional evidence schematic connected to entities, Crew, search, and commerce" },
  { competitor: "GTABase", strength: "Large editorial archive and vehicle research", gap: "Mixes official material with leak-led coverage and dense legacy layouts", advantage: "Explicit evidence states, cleaner mobile decisions, and no leaked-media dependency" },
  { competitor: "GrandTheft.gg", strength: "Wide planned taxonomy", gap: "Load-dependent database presentation and thin visible guidance", advantage: "Immediate answers, durable static routes, and meaningful safe fallbacks" },
] as const;
