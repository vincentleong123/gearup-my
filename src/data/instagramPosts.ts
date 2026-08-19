// Curated Instagram gear posts — the "Cameralogue" saved collection.
// Every entry is a real, live Instagram post hand-saved for camera-gear
// unboxings, lens reviews and lighting tests. Thumbnails are derived from the
// shortcode at render time (igThumb — Instagram's stable /media/?size=m
// redirect), so they never go stale; playback uses Instagram's official public
// embed (/p/<shortcode>/embed/captioned/), which works for public posts.
//
// To add a post: paste the shortcode (the ID after /p/ in the share link),
// write a short title + description, and pick a category from the list.

export type InstagramCategory =
  | 'lens'
  | 'lighting'
  | 'bag'
  | 'filter'
  | 'phone'
  | 'camera'
  | 'technique'
  | 'creator';

export interface InstagramPost {
  id: string;
  shortcode: string;
  title: string;
  caption: string;
  category: InstagramCategory;
  author: string;
  isVideo?: boolean;
  date?: string;
}

export const instagramCategories: { id: InstagramCategory | 'all'; label: string; emoji: string }[] = [
  { id: 'all', label: 'All Saved', emoji: '📌' },
  { id: 'lens', label: 'Lenses', emoji: '🔭' },
  { id: 'lighting', label: 'Lighting', emoji: '💡' },
  { id: 'bag', label: 'Bags & Cases', emoji: '🎒' },
  { id: 'filter', label: 'Filters', emoji: '🌀' },
  { id: 'camera', label: 'Cameras', emoji: '📷' },
  { id: 'phone', label: 'Phones', emoji: '📱' },
  { id: 'technique', label: 'Technique', emoji: '🎯' },
  { id: 'creator', label: 'Creators', emoji: '⭐' },
];

export const instagramPosts: InstagramPost[] = [
  {
    id: 'ig-meike-35-pro',
    shortcode: 'DZD7r-EMbCN',
    title: 'Meike 35mm f/1.8 Pro — Unboxing + Samples',
    caption: 'Unboxing the Meike 35mm f/1.8 Pro with sample photos — a compact full-frame prime worth watching for the price.',
    category: 'lens',
    author: 'Cameralogue',
  },
  {
    id: 'ig-viltrox-55-evo',
    shortcode: 'DZJMx9-Mu3X',
    title: 'Viltrox AF 55mm f/1.8 EVO — First Impressions',
    caption: 'Compact, lightweight, clean optics, and natural portrait compression at 55mm — the new EVO series is one to watch.',
    category: 'lens',
    author: 'Cameralogue',
  },
  {
    id: 'ig-astrhori-85',
    shortcode: 'DZWCa9Bs1hA',
    title: 'AstrHori 85mm f/1.8 — Unboxing',
    caption: 'Everyone knows Sony, Sigma and Viltrox… but what about AstrHori? Unboxing the 85mm f/1.8 before putting it through street tests.',
    category: 'lens',
    author: 'Cameralogue',
  },
  {
    id: 'ig-flash-plastic',
    shortcode: 'DZe3So8snid',
    title: 'Camera Flash Can Burn Plastic Bags',
    caption: 'Safety tip from the Cameralogue collection: a hot flash modifier close to plastic can literally burn it. Behind-the-scenes reality check.',
    category: 'technique',
    author: 'Cameralogue',
  },
  {
    id: 'ig-7artisans-40',
    shortcode: 'DZfCdP4MjQ8',
    title: '7Artisans 40mm f/2.5 — Tiny Lens, Big Character',
    caption: 'One of the smallest full-frame lenses for Sony — proof that the best camera is the one you actually carry everywhere.',
    category: 'lens',
    author: 'Cameralogue',
  },
  {
    id: 'ig-kf-nano-x',
    shortcode: 'DZhZ3JSs9Tq',
    title: 'K&F Concept Nano-X Series Filters',
    caption: 'Quick look at the K&F Concept Nano-X filter series — an affordable magnetic filter system for everyday shooting.',
    category: 'filter',
    author: 'Cameralogue',
  },
  {
    id: 'ig-kf-sling-bag',
    shortcode: 'DZjyTmfM03O',
    title: 'K&F Concept Urban Wander Sling Bag',
    caption: 'Packs more storage than you’d expect — the urban wander sling as a practical carry for a mirrorless body and two lenses.',
    category: 'bag',
    author: 'Cameralogue',
  },
  {
    id: 'ig-55mm-sweet-spot',
    shortcode: 'DZrafm-M4hh',
    title: 'The 55mm Focal Length Sweet Spot',
    caption: 'This 55mm focal length might be the sweet spot photographers have been ignoring — natural compression, easy outdoor use.',
    category: 'lens',
    author: 'Cameralogue',
  },
  {
    id: 'ig-gutek-t300',
    shortcode: 'DZ0tgkZMqEv',
    title: 'GUTEK T300 Hard Case — Gear Security',
    caption: '“Your camera gear is finally safer than your car.” Unboxing and setting up the rugged, customizable GUTEK T300 hard case.',
    category: 'bag',
    author: 'Cameralogue',
  },
  {
    id: 'ig-godox-x3-pro',
    shortcode: 'DZ9vak7Mhxz',
    title: 'Godox X3 Pro — Cleanest Flash Trigger Yet',
    caption: 'Tiny trigger, massive upgrade. Compact, touchscreen, and far more refined than the chunky triggers we’re used to carrying.',
    category: 'lighting',
    author: 'Cameralogue',
  },
  {
    id: 'ig-godox-ad400pro2',
    shortcode: 'DZ9_0V1MEXu',
    title: 'Godox AD400Pro II — Studio Power in a Suitcase',
    caption: 'A portable strobe built for photographers who need serious power without dragging a generator around the location.',
    category: 'lighting',
    author: 'Cameralogue',
  },
  {
    id: 'ig-meike-85-ii',
    shortcode: 'DaEdr1GMWMk',
    title: 'Meike 85mm F1.4 II — Newly Released',
    caption: 'Unboxing the new Meike 85mm F1.4 II — the focal length portrait photographers keep coming back to, now at f/1.4.',
    category: 'lens',
    author: 'Cameralogue',
  },
  {
    id: 'ig-viltrox-85-test',
    shortcode: 'DaLo3Z-s5zC',
    title: 'Viltrox 85mm — The Beauty Campaign Test',
    caption: 'One model, soft light, Viltrox 85mm — and suddenly a simple lens test looked like a beauty campaign.',
    category: 'lens',
    author: 'Cameralogue',
  },
  {
    id: 'ig-meike-35-sci-fi',
    shortcode: 'DaMBNUGMI33',
    title: 'Meike 35mm — A Sci-Fi Beauty Look',
    caption: 'This Meike 35mm test got out of hand — expected a simple lens test, not a full sci-fi beauty shoot.',
    category: 'lens',
    author: 'Cameralogue',
  },
  {
    id: 'ig-brightin-star-095',
    shortcode: 'DaOPcZ5RgKQ',
    title: 'Brightin Star 50mm F0.95 II — Unboxing',
    caption: 'A 50mm f/0.95 lens at this price? Wow. Unboxing the Brightin Star 50mm F0.95 II manual-focus prime.',
    category: 'lens',
    author: 'Cameralogue',
  },
  {
    id: 'ig-viltrox-85-pro',
    shortcode: 'DaP7cNwsGZ9',
    title: 'Viltrox 85mm F1.4 Pro — First Look',
    caption: 'Big glass, clean build, proper portrait lens feel. First look at the Viltrox 85mm F1.4 Pro on Sony E-mount.',
    category: 'lens',
    author: 'Cameralogue',
  },
  {
    id: 'ig-helios-44-2',
    shortcode: 'Daab90DsJan',
    title: 'Helios 44-2 — A 55-Year-Old Soviet Lens',
    caption: '“Modern lenses are too perfect. This 55-year-old Soviet lens has soul.” Vintage glass, swirly bokeh, zero autofocus.',
    category: 'lens',
    author: 'Cameralogue',
  },
  {
    id: 'ig-meike-85-ii-e',
    shortcode: 'Daa8v08M5JP',
    title: 'Meike 85mm F1.4 II — The Affordable Autofocus 85',
    caption: 'One of the most affordable full-frame autofocus 85mm f/1.4 portrait lenses for Sony E-mount — fast aperture, full coverage.',
    category: 'lens',
    author: 'Cameralogue',
  },
  {
    id: 'ig-street-performer-85',
    shortcode: 'DaoI5w0RsjO',
    title: 'Street Performer — Shot on 85mm f/1.4 Pro',
    caption: 'Storytelling photography at its most direct — a street performer captured on the Viltrox 85mm f/1.4 Pro.',
    category: 'lens',
    author: 'Cameralogue',
  },
  {
    id: 'ig-helios-football',
    shortcode: 'DatcOyLsVTY',
    title: 'Helios 44-2 on the A7R V — Cinematic Football',
    caption: 'A 55-year-old Soviet lens on the Sony A7R V — and somehow it made football look cinematic.',
    category: 'lens',
    author: 'Cameralogue',
  },
  {
    id: 'ig-meike-35-cinematic',
    shortcode: 'Da1GAJJMpfK',
    title: 'Meike Lens — Cinematic Portrait Frame',
    caption: 'Simply stunning — a cinematic portrait frame from the Cameralogue Meike lens collection.',
    category: 'lens',
    author: 'Cameralogue',
  },
  {
    id: 'ig-viltrox-26-evo-review',
    shortcode: 'Da0KdiisTuQ',
    title: 'Viltrox 26mm F2.8 EVO — Review',
    caption: 'Tiny full-frame lens that actually makes sense — the Viltrox 26mm F2.8 EVO pancake, reviewed.',
    category: 'lens',
    author: 'Cameralogue',
  },
  {
    id: 'ig-viltrox-26-evo-announce',
    shortcode: 'Da0H4fVERAf',
    title: 'Viltrox AF 26mm F2.8 EVO — New Arrival',
    caption: 'The new full-frame autofocus EVO series pancake — ultra-slim, all-metal, magnetic cap. US$299 / RM1.3k-class everyday lens.',
    category: 'lens',
    author: 'Viltrox Official',
  },
  {
    id: 'ig-mobile-million-views',
    shortcode: 'DaVni7lhyTI',
    title: 'How to Get 1.1 Million Views With Your Phone',
    caption: 'Step-by-step: the exact CapCut masking + keyframe trick behind a 1.1M-view phone video — screen-pull illusion included.',
    category: 'technique',
    author: 'Cameralogue',
  },
  {
    id: 'ig-sony-zve1-commercial',
    shortcode: 'DKwhC-byHH7',
    title: 'Sony ZV-E1 — Library of Fragrances Commercial',
    caption: 'A real Malaysian OOH commercial blending 3D and captured footage — shot entirely on the Sony ZV-E1 + 24-70mm GM II.',
    category: 'creator',
    author: 'Cameralogue',
  },
  {
    id: 'ig-creator-intro',
    shortcode: 'DFz2DErSUqs',
    title: 'A Creator’s Intro — Hello, 2025',
    caption: 'A short intro from the Cameralogue collection — shot with natural light, setting the tone for the year ahead.',
    category: 'creator',
    author: 'Cameralogue',
  },
  {
    id: 'ig-dji-osmo-360',
    shortcode: 'DONcVllEeV7',
    title: 'DJI Osmo 360 — The Lens-Hood Tripod',
    caption: 'A compact 360 rig that clips onto a lens hood — shooting with the Sony A7CR and 50-150mm f/2 GM. “This clamp is amazing.”',
    category: 'camera',
    author: 'Cameralogue',
  },
  {
    id: 'ig-xiaomi-17t-pro',
    shortcode: 'DYtRRfAC7li',
    title: 'Xiaomi 17T Pro — Night Photos & 5x Tele at KLCC',
    caption: 'The 17T Pro’s sensor is smaller than the 17 Ultra, but night photography is nearly as good — especially the 5x tele zoom.',
    category: 'phone',
    author: 'Cameralogue',
  },
  {
    id: 'ig-photographer-advice',
    shortcode: 'DZDRGcxodVv',
    title: 'Photographer Advice — Lighting Questions, Answered',
    caption: 'Part of a running series responding to client complaints — this instalment sets up the big lighting question.',
    category: 'technique',
    author: 'Cameralogue',
  },
  {
    id: 'ig-classic-camera',
    shortcode: 'BTp8Gq_FW_j',
    title: 'Classic Camera — From the Archive',
    caption: 'A classic camera post from the saved archive — gear history worth keeping close.',
    category: 'camera',
    author: 'Cameralogue',
  },
];

export function instagramEmbedUrl(shortcode: string): string {
  return `https://www.instagram.com/p/${shortcode}/embed/captioned/`;
}
