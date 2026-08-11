// ============================================================
// Hashtag Glossary — curated "posts" kept ON-SITE (no out-clicks).
//
// Each entry maps a popular Malaysian gear hashtag (like #DJIOSMO,
// #IPHONE17PRO, #NIKOND3100) to a fully on-site curated "post":
// a settings recipe, a caption, an image, and the gear it relates to.
// The gear slug links to the existing gear review + "pay-off" gig math.
//
// To add your own: pick a hashtag (or add a new one), set the gearSlug,
// write the settings recipe + caption, and reference an image from
// src/data/images.ts (via the scenario/gear helpers) or any hosted URL.
// ============================================================

import type { GearItem } from '@/data/gear';
import { getGearBySlug } from '@/data/gear';
import { gearHashtags } from '@/data/gearHashtags';
import { gearImg, imgUrl, getGearScenarios } from '@/data/images';

export type HashCategory =
  | 'phone'
  | 'camera'
  | 'action'
  | 'drone'
  | 'audio'
  | 'technique';

export interface HashPost {
  id: string;
  hashtag: string;            // e.g. "IPHONE17PRO"
  gearSlug: string;           // links to your existing gear review
  category: HashCategory;
  title: string;              // the "shot" / technique name
  caption: string;            // what/why
  settings: string[];         // the "how to achieve this shot" recipe
  image: string;              // on-site image (Unsplash / gear photo)
  tip: string;                // one-line pro tip
}

export const hashCategories: { id: HashCategory | 'all'; label: string; emoji: string }[] = [
  { id: 'all', label: 'All Hashtags', emoji: '🏷️' },
  { id: 'phone', label: 'Phones', emoji: '📱' },
  { id: 'camera', label: 'Cameras', emoji: '📷' },
  { id: 'action', label: 'Action / 360°', emoji: '🎥' },
  { id: 'drone', label: 'Drones', emoji: '🚁' },
  { id: 'audio', label: 'Audio', emoji: '🎙️' },
  { id: 'technique', label: 'Technique', emoji: '🎯' },
];

// Build a hashtag post from a gear item + a scenario image + a recipe.
// The gear's own hashtags (from gearHashtags.ts) are merged in.
function buildPost(
  gearSlug: string,
  category: HashCategory,
  title: string,
  caption: string,
  settings: string[],
  tip: string,
  image?: string,
): HashPost {
  const gear = getGearBySlug(gearSlug);
  const tags = gearHashtags[gearSlug] || [];
  const heroHashtag = (tags[0] || gearSlug.slice(0, 12).toUpperCase().replace(/[^A-Z0-9]/g, ''));
  const scenario = getGearScenarios(gearSlug);
  const firstScenarioImg = scenario[0]?.images[0];
  const img = image || firstScenarioImg || gearImg(gearSlug) || imgUrl('photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop');
  return {
    id: `hashtag-${gearSlug}`,
    hashtag: heroHashtag,
    gearSlug,
    category,
    title,
    caption,
    settings,
    tip,
    image: img,
  };
}

export const hashtagPosts: HashPost[] = [
  // ===== Phones =====
  buildPost(
    'iphone-17-pro-content-creation-malaysia',
    'phone',
    'iPhone 17 Pro — Cinematic Soft-Light Portrait',
    'The 8K / 4K 120fps phone that replaces a camera for portrait content. Use Apple Log, lock exposure on the face, and let window light do the work for a soft, film-like portrait.',
    [
      '8K 30fps or 4K 120fps for slow-mo B-roll',
      'Enable Apple Log + a LUT for a graded look',
      'Lock exposure on the face (tap & hold)',
      'Position subject 1-2m from a window, camera facing the light',
      'Keep ISO low (50-100) for clean shadow detail',
    ],
    'Turn on the Camera Control button for fast framing — tap once to lock focus, swipe to adjust exposure.',
  ),
  buildPost(
    'iphone-16-pro-content-creation-malaysia',
    'phone',
    'iPhone 16 Pro — 4K 120fps Slow-Mo Hook',
    'Make any product or food clip feel premium by opening with a 4K 120fps slow-motion shot, then cutting to normal speed. The 5x tele pulls distant detail into portrait range.',
    [
      '4K 120fps for the opening slow-mo hook',
      '5x telephoto for compression and candid reach',
      'Apple Log for colour grading headroom',
      'Shoot 0.5s of subject detail (steam, splash, motion)',
    ],
    'Slow-mo reads best when the subject fills the frame — get closer than you think.',
  ),
  buildPost(
    'samsung-galaxy-s25-ultra-review-malaysia',
    'phone',
    'Galaxy S25 Ultra — 10x Zoom Event Candid',
    'The 200MP main + 10x optical reach lets you shoot clean event candids from the back row without a long lens. Use the S Pen as a remote shutter for low-angle self-set shots.',
    [
      '10x optical zoom for distant subjects',
      '200MP mode for heavy crop-and-sell',
      'S Pen as a remote shutter (set the phone down & pose)',
      'Expert RAW for full manual control',
    ],
    'Tap the screen to set focus on the eyes, then use the S Pen to fire the shutter — zero shake.',
  ),
  buildPost(
    'google-pixel-9-pro-review-malaysia',
    'phone',
    'Pixel 9 Pro — Zero-Edit Food & Product',
    'The computational-photography king shoots clean, natural food and product shots straight out of camera. Magic Editor deletes background clutter and sharpens blur in seconds.',
    [
      'Point & shoot — the HDR does the work',
      'Magic Editor to remove background people/objects',
      'Real Tone keeps skin and food colours honest',
      '4K 60fps for social video',
    ],
    'For overhead flat-lays, hold the phone directly above and let Photo mode stabilize the framing.',
  ),
  buildPost(
    'xiaomi-15-ultra-review-malaysia',
    'phone',
    'Xiaomi 15 Ultra — 1-inch Leica Portrait',
    'The 1-inch Leica sensor gives real shallow depth of field for portraits. Use the 70mm + 200MP periscope for natural compression and creamy backgrounds.',
    [
      '70mm (3x) for natural portrait compression',
      '1-inch main at f/1.63 for shallow depth of field',
      'Leica Natural profile for skin tones',
      '200MP mode for print-ready crops',
    ],
    'Shoot at "portrait" distance (1.5-2.5m) — the Leica look is strongest there.',
  ),

  // ===== Cameras =====
  buildPost(
    'sony-zv-e10-review-malaysia-second-hand',
    'camera',
    'Sony ZV-E10 — Product Showcase Review Shot',
    'The creator camera with Product Showcase Mode built for unboxings and reviews. One button blurs the background and instantly racks focus to the product you hold up.',
    [
      'Turn ON Product Showcase Mode',
      'Press the Defocus button to blur background',
      '4K 30fps from a 24MP APS-C sensor',
      'Use a lapel mic for clean voice',
    ],
    'Hold the product in the middle third of the frame — the AF tracks it instantly.',
  ),
  buildPost(
    'sony-a6100-review-malaysia-second-hand',
    'camera',
    'Sony A6100 — 4K Flip-Screen Vlog',
    'The budget mirrorless with real-time eye AF and a flip-up screen. Ideal for talking-head vlogs where reliable face tracking matters more than specs.',
    [
      'Real-time Eye AF — tap once on the face',
      '4K 30fps for clean social video',
      'Flip-up screen for self-recording',
      'Sigma 16mm f/1.4 for low light',
    ],
    'Place the camera at eye level and lock Eye AF — steady, natural talking-head footage.',
  ),
  buildPost(
    'nikon-d3100-review-malaysia-second-hand-price',
    'camera',
    'Nikon D3100 — Budget Studio Portrait',
    'A RM450 second-hand DSLR can still produce studio-quality portraits with window light and a fast 50mm prime. Proof gear does not have to be expensive.',
    [
      '50mm f/1.8 prime for compression',
      'Window light as your key light',
      'ISO 100-400, aperture f/2.8',
      'Manual focus for pin-sharp eyes',
    ],
    'Shoot in RAW for editing headroom — the D3100 has no 4K but stills are excellent.',
  ),
  buildPost(
    'canon-eos-r50-review-malaysia',
    'camera',
    'Canon R50 — Food Flat-Lay',
    'Canon colour science makes food look appetizing straight out of camera. Shoot overhead with the flip-out screen and let the RF-S kit lens do the work.',
    [
      'Overhead angle (phone mount or tripod)',
      'Flip-out screen to frame from above',
      'Canon color profile for warm food tones',
      'Aperture f/4-5.6 for full-plate sharpness',
    ],
    'Place the dish on a clean surface near a window — overhead window light is the secret.',
  ),
  buildPost(
    'fujifilm-x100vi-review-malaysia',
    'camera',
    'Fujifilm X100VI — Street Portrait',
    'The fixed 23mm f/2 with film simulations delivers that iconic street-photo look. Use Classic Chrome or Reala Ace for a straight-out-of-camera grade.',
    [
      '23mm f/2 fixed lens',
      'Film simulation: Classic Chrome or Reala Ace',
      'In-body stabilisation for low light',
      '40MP for generous crops',
    ],
    'The fixed lens forces you to move — that is the X100 superpower. Get close.',
  ),

  // ===== Action / 360 =====
  buildPost(
    'insta360-x4-review-malaysia',
    'action',
    'Insta360 X4 — Invisible Selfie Stick Shot',
    'The 360 camera that makes a selfie stick disappear. Shoot once, reframe later — perfect for "impossible" tracking shots and real-estate walkthroughs.',
    [
      '360° mode, then reframe in the app',
      'Use the invisible selfie stick for a drone-like follow',
      '8K 30fps for clean reframes',
      'Shoot vertical for TikTok/Reels',
    ],
    'Keep the stick centered under the camera — it disappears from the 360 shot.',
  ),
  buildPost(
    'dji-osmo-action-5-pro-review',
    'action',
    'DJI Osmo Action 5 Pro — POV Vlog',
    'Front + back screens make this the vlogger-friendly action cam. RockSteady stabilisation means no gimbal needed for smooth walking shots.',
    [
      'Front screen for self-framing',
      'RockSteady stabilization on',
      '4K 60fps for smooth motion',
      'Waterproof to 20m',
    ],
    'Use the front screen to keep yourself centered while walking — instant pro vlogs.',
  ),
  buildPost(
    'gopro-hero-13-review-malaysia',
    'action',
    'GoPro Hero 13 — Chest-Mount POV',
    'The GoPro mount ecosystem unlocks chest, helmet and suction-cam angles that no other camera can match. Perfect for POV cooking, riding and workshop content.',
    [
      'Chest/helmet mount for hands-free POV',
      '5.3K 60fps for detail + slow-mo',
      'HyperSmooth 6.0 on',
      'Waterproof to 10m',
    ],
    'Mount it chest-high for immersive POV — the angle clients and viewers remember.',
  ),

  // ===== Drones =====
  buildPost(
    'dji-mini-4-pro-review-malaysia',
    'drone',
    'DJI Mini 4 Pro — Real-Estate Aerial',
    'Under 250g, light CAAM class (check current rules). Clients pay RM300-600 per property for a crisp aerial reveal, orbit and fly-through.',
    [
      'Under 250g = no Remote Pilot License',
      '4K 60fps aerial',
      'Obstacle sensing for safe low passes',
      'Sunrise/golden hour for warm light',
    ],
    'Master 3 moves — reveal, orbit, fly-through — to cover 80% of paid aerial work.',
  ),
  buildPost(
    'dji-mini-5-review-malaysia',
    'drone',
    'DJI Mini 5 — 4K 120fps Aerial',
    'The under-250g Mini with 4K 120fps slow motion. Smooth sunsets, event reveals and travel b-roll that makes clients say "whoa".',
    [
      '4K 120fps slow-mo aerial',
      '50MP stills for listings',
      'ActiveTrack follow mode',
      'No Remote Pilot License needed',
    ],
    'Fly slow and low for the most cinematic aerial — speed reads as amateur.',
  ),
  buildPost(
    'dji-neo-review-malaysia',
    'drone',
    'DJI Neo — Palm-Launch Selfie Drone',
    'The RM900 palm-sized drone that flies itself around you. No controller, no license — instant aerial selfies and vlog b-roll.',
    [
      'Palm-launch, no controller',
      'Auto face tracking',
      '4K 30fps',
      'Under 250g — no license',
    ],
    'Launch it on a clear outdoor spot and let it orbit you — instant "wow" content.',
  ),

  // ===== Audio =====
  buildPost(
    'dji-mic-2-review-malaysia',
    'audio',
    'DJI Mic 2 — Broadcast-Quality Audio',
    'Viewers forgive grainy video, never bad audio. The DJI Mic 2 gives clean wireless sound with a transmitter that doubles as an on-body recorder.',
    [
      '24-bit / 48kHz clean audio',
      'Transmitter doubles as a recorder',
      'Touchscreen receiver',
      'Pairs with phone, camera, computer',
    ],
    'Clip the mic on the collar, not the chest — 10cm from the mouth is the sweet spot.',
  ),
  buildPost(
    'sony-a6100-review-malaysia-second-hand',
    'technique',
    'Lapel Mic — Clean Interview Audio',
    'Before upgrading gear, upgrade audio. A cheap lapel mic plugged into your camera makes interviews and reviews sound professional.',
    [
      'Plug lapel mic into the mic jack',
      'Clip 10cm from the mouth',
      'Record a 5s test clip first',
      'Aim for -12dB average in editing',
    ],
    'Test the audio before every take — a silent clip is a lost client.',
  ),

  // ===== Technique =====
  buildPost(
    'dji-osmo-pocket-3-review-malaysia',
    'technique',
    'Osmo Pocket 3 — Walking Vlog',
    'The 1-inch pocket gimbal camera makes walking vlogs effortless. Built-in 3-axis gimbal, rotating screen, and ActiveTrack follow mode.',
    [
      'Built-in 3-axis gimbal',
      'Rotating screen to selfie mode',
      'ActiveTrack follow mode',
      '4K 120fps slow motion',
    ],
    'Walk steady and let ActiveTrack keep you framed — it looks like you hired a cameraman.',
  ),
  buildPost(
    'insta360-x5-review-malaysia',
    'action',
    'Insta360 X5 — 360 Real-Estate Tour',
    'The 8K 360 upgrade that sells real estate. Agents pay RM300-500 for a walkthrough that makes listings look premium.',
    [
      '8K 360 video',
      'Reframe in the app after shooting',
      'Waterproof to 13m',
      'Better low light than X4',
    ],
    'Walk the room at a slow, steady pace — the 360 tour is the upsell that wins agents.',
  ),
];

// ===== Helpers =====
export function gearForPost(post: HashPost): GearItem | null {
  return getGearBySlug(post.gearSlug);
}

export function postsForHashtag(hashtag: string): HashPost[] {
  const clean = hashtag.replace('#', '').trim().toUpperCase();
  return hashtagPosts.filter(p => p.hashtag.toUpperCase() === clean || p.gearSlug.toLowerCase().includes(clean.toLowerCase()));
}

export function allGearHashtags(): { tag: string; gearSlug: string; gearName: string }[] {
  const out: { tag: string; gearSlug: string; gearName: string }[] = [];
  for (const slug of Object.keys(gearHashtags)) {
    const gear = getGearBySlug(slug);
    if (!gear) continue;
    gearHashtags[slug].forEach(tag => {
      out.push({ tag, gearSlug: slug, gearName: gear.name });
    });
  }
  return out;
}
