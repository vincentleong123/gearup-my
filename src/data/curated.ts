// Curated visual breaks — magazine-style imagery for long-form pages.
// All IDs verified against Unsplash; captions written in the Tim & Ahmad voice.

export interface CuratedShot {
  src: string;
  alt: string;
  caption?: string;
  tags?: string[];
}

const U = 'https://images.unsplash.com/';

function shot(id: string, alt: string, caption?: string, tags?: string[]): CuratedShot {
  return { src: `${U}${id}?w=1200&h=800&fit=crop&auto=format`, alt, caption, tags };
}

// ==== People / eye candy (guys & girls creators love) ====
const people = [
  shot('photo-1494790108377-be9c29b29330', 'Creator selfie with natural light', 'No ring light needed — this is what good window light looks like.', ['naturalportrait', 'windowlight']),
  shot('photo-1524504388940-b1c1722653e1', 'Fashion-style creator portrait', 'The look clients pay for. One lens, golden hour, zero filters.', ['fashionportrait', 'modelphotography']),
  shot('photo-1517841905240-472988babdf9', 'Portrait by a window', 'Window = free softbox. Every Malaysian apartment has one.', ['portraitphotography', 'naturallight']),
  shot('photo-1531746020798-e6953c6e8e04', 'Phone selfie, golden light', 'What your front camera can do at sunset. Start here.', ['selfie', 'goldenhour']),
  shot('photo-1529626455594-4ff0802cfb7e', 'Model by window light', 'The most flattering light in photography. Free forever.', ['beautyshoot', 'modeling']),
  shot('photo-1487412912498-0447578fcca8', 'Beauty content setup', 'Beauty reviews are a top-paying Malaysian niche.', ['beautytiktok', 'makeupcontent']),
  shot('photo-1507003211169-0a1dd7228f2d', 'Male creator portrait', 'Talking-head videos need nothing more than this.', ['creatorlife', 'portrait']),
  shot('photo-1438761681033-6461ffad8d80', 'Creator with camera', 'The confidence that comes from shipping content weekly.', ['contentcreator', 'malaysia']),
  shot('photo-1506794778202-cad84cf45f1d', 'Young Malaysian creator', 'Same gear Tim & Ahmad use — a phone and a window.', ['creatorstory', 'begincamera']),
  shot('photo-1508214751196-bcfd4ca60f91', 'Model portrait, studio light', 'Studio-light portraits are the fastest-selling gig in KL.', ['studioportrait', 'modeling']),
  shot('photo-1488426862026-3ee34a7d66df', 'Golden-hour model portrait', 'Charge RM200 for this look. Golden hour is free.', ['goldenhourportrait', 'fashion']),
  shot('photo-1531123897727-8f129e1688ce', 'Beauty portrait, soft light', 'Soft light + shallow depth = the Instagram look.', ['beautyportrait', 'softlight']),
  shot('photo-1503104834685-7205e8607eb9', 'Stylish male portrait', 'Men book portraits too — grooming brands pay top RM.', ['maleportrait', 'grooming']),
  shot('photo-1521119989659-a83eee488004', 'Casual creator portrait', 'Relatable, real, bookable. Your future client avatar.', ['creatorportrait', 'casual']),
  shot('photo-1494578379344-d6c710782a3d', 'Editorial-style portrait', 'The editorial look brands in Malaysia are buying.', ['editorial', 'portraitphotography']),
  shot('photo-1552374196-c4e7ffc6e126', 'Confident model portrait', 'This is the vibe fashion clients want in 2026.', ['fashionmodel', 'portraitsession']),
  shot('photo-1544005313-94ddf0286df2', 'Soft-focus woman portrait', 'The headshot every professional woman is paying for.', ['professionalheadshot', 'beautyportrait']),
  shot('photo-1534528741775-53994a69daeb', 'Malaysian beauty portrait', 'Natural light, zero filter — the look brands book.', ['beautycontent', 'naturallight']),
  shot('photo-1580489944761-15a19d654956', 'Warm smile portrait', 'Smiles sell. This is the expression clients ask for.', ['portraitsession', 'headshot']),
  shot('photo-1548142813-c348350df52b', 'Natural beauty close-up', 'Close-up beauty content converts. RM200-400 a session.', ['beautyshoot', 'skincarecontent']),
  shot('photo-1567532939604-b6b5b0db2604', 'Fresh creator portrait', 'The bright, clean look cafes pay RM300 for.', ['creatorlife', 'socialcontent']),
  shot('photo-1573497019940-1c28c88b4f3e', 'Confident professional woman', 'Corporate headshots — a steady RM150-300 gig.', ['corporateheadshot', 'businessportrait']),
  shot('photo-1521146764736-56c929d59c83', 'Soft studio beauty portrait', 'Studio beauty = the fastest-selling look in KL.', ['studiobeauty', 'beautyportrait']),
  shot('photo-1509967419530-da38b4704bc6', 'Fashion-forward portrait', 'Fashion brands in Malaysia pay top RM for this vibe.', ['fashioncontent', 'branddeals']),
  shot('photo-1573496359142-b8d87734a5a2', 'Business woman by window', 'Window light + professional = LinkedIn gold.', ['headshot', 'windowlight']),
  shot('photo-1594744803329-e58b31de8bf5', 'Elegant portrait shot', 'The editorial look that sells on Instagram.', ['editorialportrait', 'fashionmodel']),
];

// ==== Gear & setups ====
const gearShots = [
  shot('photo-1452780212940-6f5c0d14d848', 'Vintage DSLR on a desk', 'Used cameras this age still make money in 2026.', ['usedcamera', 'budgetgear']),
  shot('photo-1495707902641-75cac588d2e9', 'Mirrorless camera ready to shoot', 'A used A6100-style mirrorless is the 2026 sweet spot.', ['mirrorless', 'secondhand']),
  shot('photo-1526170375885-4d8ecf77b99f', 'Camera on a tripod', 'Tripod + camera = your first "professional" set.', ['vlogsetup', 'cameratripod']),
  shot('photo-1478737270239-2f02b77fc618', 'Studio microphone', 'Audio beats video every time. RM50 mic changes everything.', ['audiomatters', 'lapelmic']),
  shot('photo-1526374965328-7f61d4dc18c5', 'Creator desk setup', 'Your RM0 setup: desk, laptop, phone, window.', ['desksetup', 'contentcreation']),
  shot('photo-1544348817-5f2cf14b88c8', 'Action camera', 'Chest-mount POV content pays in Malaysia.', ['actioncam', 'povcontent']),
  shot('photo-1473580044384-7ba9967e16a0', 'Drone over water', 'Aerial = clients pay premium. Mini 4 Pro needs no license.', ['dronemalaysia', 'aerialvideo']),
  shot('photo-1598387993441-a364f854c3e1', 'Smartphone videography', 'The best camera is the one in your pocket.', ['phonevideography', 'mobilecontent']),
  shot('photo-1498050108023-c5249f4df085', 'Electronics workbench', 'Checking a used camera before you pay.', ['usedcamera', 'gearcheck']),
];

// ==== Gig themes ====
const gigShots = {
  graduation: [
    shot('photo-1531545514256-b1400bc00f31', 'Graduation caps in the air', 'Malaysia shoots grads every week. RM200-400 a session.', ['graduationphotography', 'convocasimalaysia']),
    shot('photo-1541339907198-e08756dedf3f', 'Graduation ceremony', 'Peak season: March, June and December.', ['gradceremony', 'uni']),
  ],
  wedding: [
    shot('photo-1519741497674-611481863552', 'Wedding couple', 'RM500-800 per wedding in Malaysia. Steady demand.', ['weddingphotography', 'malaysiawedding']),
    shot('photo-1465495976277-4387d4b0b4c6', 'Wedding party coverage', 'Second-shooter gigs are the best way in.', ['weddingvideo', 'bridalmoment']),
  ],
  gala: [
    shot('photo-1511578314322-379afb476865', 'Gala dinner tables', 'Corporate events pay RM400-1,000 a night.', ['galaevent', 'eventphotography']),
    shot('photo-1492684223066-81342ee5ff30', 'Event crowd celebration', 'Late nights, but the cheques are real.', ['eventcoverage', 'conference']),
  ],
  food: [
    shot('photo-1414235077428-338989a2e8c0', 'Plated restaurant dish', 'Food content gigs start at RM200 a session.', ['foodcontent', 'foodphotography']),
    shot('photo-1504674900247-0877df9cc836', 'Overhead food flat lay', 'The angle clients actually ask for.', ['overheadshot', 'foodie']),
  ],
  realestate: [
    shot('photo-1560518883-ce09059eeffa', 'Modern home exterior', 'RM300-600 per property walkthrough.', ['realestatevideo', 'property']),
    shot('photo-1600596542815-ffad4c1539a9', 'Luxury home for media', 'Agents pay for video that makes listings feel premium.', ['hometour', 'realestate']),
  ],
  product: [
    shot('photo-1523275335684-37898b6baf30', 'Watch product shot', 'E-commerce product photos: RM200-500 a set.', ['productphotography', 'ecommerce']),
    shot('photo-1505740420928-5e560c06d30e', 'Headphone product shot', 'Brands in Malaysia need this weekly.', ['productvideo', 'brandcontent']),
  ],
  video: [
    shot('photo-1535016120720-40c646be5580', 'Video editing timeline', 'Editing is where half your revenue lives.', ['videography', 'editing']),
    shot('photo-1478720568477-152d9b164e26', 'Film production behind the scenes', 'Business video content is the #1 gig in 2026.', ['videoproduction', 'bts']),
  ],
  portrait: [
    shot('photo-1494790108377-be9c29b29330', 'Golden hour portrait', 'RM150-300 a session. Everyone wants one.', ['portraitsession', 'portraitmalaysia']),
  ],
};

type GigKey = keyof typeof gigShots;

// ==== Curated break for blog articles ====
export function articleFigures(slug: string): CuratedShot[] {
  const theme = articleTheme[slug];
  if (theme) return theme;
  return [
    people[(slug.length + 1) % people.length],
    gearShots[(slug.length + 3) % gearShots.length],
    people[(slug.length + 5) % people.length],
    gearShots[(slug.length + 7) % gearShots.length],
  ];
}

const articleTheme: Record<string, CuratedShot[]> = {
  'content-creator-malaysia-no-money-start': [
    people[16], gearShots[7], people[0], gearShots[4],
  ],
  'nikon-d3100-vs-sony-a6100-which-better-malaysia': [
    gearShots[0], people[17], gearShots[2], people[20],
  ],
  'content-creator-gear-roi-malaysia-calculator': [
    gearShots[1], gearShots[2], people[17], gearShots[5],
  ],
  'insta360-vs-gopro-which-buy-malaysia-2026': [
    gearShots[5], people[20], people[8], gearShots[7],
  ],
  'used-camera-buying-guide-malaysia-mudah-carousell': [
    gearShots[8], gearShots[0], people[16], gearShots[1],
  ],
  'camera-paid-for-part-time-gigs-malaysia': [
    people[17], gigShots.graduation[0], gigShots.wedding[0], gearShots[1],
  ],
  'graduation-photography-malaysia-guide': [
    gigShots.graduation[0], people[18], gigShots.graduation[1], gearShots[1],
  ],
  'wedding-photography-side-hustle-malaysia': [
    gigShots.wedding[0], people[19], gigShots.wedding[1], gearShots[1],
  ],
  'gala-dinner-event-photography-malaysia': [
    gigShots.gala[0], people[21], gigShots.gala[1], gearShots[1],
  ],
  'sony-zv-e10-vs-sony-a6100-which-buy-malaysia': [
    gearShots[1], people[20], gearShots[2], people[16],
  ],
  'canon-eos-r50-vs-sony-a6100-which-better-malaysia': [
    gearShots[1], gearShots[0], people[19], gearShots[2],
  ],
  'best-budget-lapel-microphone-malaysia-audio-guide': [
    gearShots[3], gearShots[4], people[18], gearShots[1],
  ],
  'best-tripod-phone-camera-malaysia-guide': [
    gearShots[2], gearShots[4], people[20], gearShots[7],
  ],
  'budget-lighting-setup-content-creation-malaysia': [
    gearShots[4], people[16], gearShots[8], people[17],
  ],
  'iphone-vs-mirrorless-camera-content-creation-malaysia': [
    gearShots[7], people[17], gearShots[1], people[20],
  ],
  'free-video-editing-software-malaysia-beginners': [
    gigShots.video[0], people[19], gearShots[4], gigShots.video[1],
  ],
  'youtube-thumbnails-that-get-clicks-malaysia': [
    people[18], gearShots[4], people[16], gearShots[2],
  ],
  'tiktok-reels-shorts-strategy-malaysia-2026': [
    people[16], gearShots[7], people[5], gearShots[4],
  ],
  'food-content-creation-gig-malaysia': [
    gigShots.food[0], people[20], gigShots.food[1], gearShots[7],
  ],
  'real-estate-media-gig-malaysia': [
    gigShots.realestate[0], people[24], gigShots.realestate[1], gearShots[6],
  ],
  'product-photography-ecommerce-gig-malaysia': [
    gigShots.product[0], people[22], gearShots[8], people[16],
  ],
  'turning-50-panic-content-creation-second-act': [
    people[16], gearShots[7], people[18], gearShots[4],
  ],
  'turning-50-panic-plan-content-side-hustle-malaysia': [
    people[17], gearShots[7], people[16], gigShots.food[0],
  ],
  'age-50-vs-age-25-content-creator-malaysia': [
    people[16], gearShots[7], people[20], gearShots[4],
  ],
  'midlife-crisis-camera-gear-turning-50': [
    gearShots[0], people[19], gearShots[1], people[16],
  ],
  'turning-50-second-act-gig-guide-malaysia': [
    people[21], gigShots.graduation[0], gigShots.gala[0], gearShots[1],
  ],
  'turning-50-experience-niche-content-creation': [
    people[16], gearShots[4], people[23], gearShots[7],
  ],
  'tamron-17-50mm-vc-review-malaysia': [
    gearShots[0], gearShots[8], gearShots[2], people[6],
  ],
  'nikon-d500-reality-check-2026': [
    gearShots[0], gearShots[1], people[6], gearShots[2],
  ],
  'second-hand-camera-scams-malaysia': [
    gearShots[8], gearShots[0], people[18], gearShots[1],
  ],
  'video-stabilization-ibis-gimbal-tripod-malaysia': [
    gearShots[2], gearShots[5], gearShots[4], gigShots.video[0],
  ],
  'content-calendar-malaysia-creators': [
    gearShots[4], people[18], gearShots[7], people[16],
  ],
  'drone-license-registration-malaysia-2026': [
    gearShots[6], gigShots.realestate[0], gearShots[4], people[20],
  ],
  'wedding-videography-side-hustle-malaysia': [
    gigShots.wedding[0], people[18], gigShots.wedding[1], gearShots[1],
  ],
  'photo-booth-business-malaysia': [
    gigShots.gala[1], people[20], gigShots.gala[0], gearShots[7],
  ],
  'camera-gear-maintenance-humidity-malaysia': [
    gearShots[0], gearShots[8], people[16], gearShots[1],
  ],
  'youtube-monetization-malaysia-2026': [
    gearShots[4], people[18], gearShots[7], people[20],
  ],
  'old-dslr-era-60d-d3100-gig-payoff-malaysia': [
    gearShots[0], gigShots.graduation[0], gigShots.portrait[0], gearShots[2],
  ],
  '20-best-second-hand-cameras-after-60d-malaysia': [
    gearShots[0], gearShots[1], gearShots[8], gearShots[2],
  ],
  'canon-60d-50mm-f18-photography-video-malaysia': [
    gearShots[0], people[0], gigShots.portrait[0], gearShots[2],
  ],
  'photography-vs-video-camera-malaysia-beginners': [
    gearShots[1], people[5], gearShots[3], gigShots.video[0],
  ],
  'insta360-luna-vs-dslr-photography-malaysia': [
    gearShots[5], gearShots[2], gigShots.video[0], people[8],
  ],
};

// ==== Curated breaks for gear Full Reviews ====
const gearTheme: Record<string, CuratedShot[]> = {
  'nikon-d3100-review-malaysia-second-hand-price': [
    gearShots[0], people[6], gearShots[2], people[8],
  ],
  'sony-a6100-review-malaysia-second-hand': [
    gearShots[1], people[1], gearShots[2], gigShots.video[1],
  ],
  'iphone-15-content-creation-malaysia': [
    gearShots[7], people[3], people[5], gigShots.food[1],
  ],
  'insta360-x4-review-malaysia': [
    gearShots[5], gigShots.realestate[1], people[8], gearShots[6],
  ],
  'dji-osmo-action-5-pro-review': [
    gearShots[5], people[8], gearShots[2], gigShots.video[0],
  ],
  'dji-mini-4-pro-review-malaysia': [
    gearShots[6], gigShots.realestate[0], gigShots.realestate[1], people[4],
  ],
  'dji-mavic-3-classic-review-malaysia': [
    gearShots[6], gigShots.realestate[1], gigShots.wedding[0], people[1],
  ],
  'canon-eos-r50-review-malaysia': [
    gearShots[1], gigShots.food[0], people[5], gearShots[0],
  ],
  'xiaomi-14-ultra-review-malaysia': [
    gearShots[7], gigShots.product[0], gigShots.product[1], people[0],
  ],
  'sony-zv-e10-review-malaysia-second-hand': [
    gearShots[1], people[5], gearShots[3], gigShots.video[1],
  ],
  'gopro-hero-13-review-malaysia': [
    gearShots[5], gigShots.video[1], people[8], gearShots[2],
  ],
  'iphone-16-pro-content-creation-malaysia': [
    gearShots[7], people[3], people[5], gigShots.product[1],
  ],
  'samsung-galaxy-s25-ultra-review-malaysia': [
    gearShots[7], gigShots.product[0], people[0], gigShots.food[1],
  ],
  'google-pixel-9-pro-review-malaysia': [
    gearShots[7], gigShots.product[1], people[3], gearShots[4],
  ],
  'xiaomi-15-ultra-review-malaysia': [
    gearShots[7], gigShots.product[0], gigShots.product[1], people[0],
  ],
  'sony-zv-e10-ii-review-malaysia': [
    gearShots[1], people[5], gearShots[3], gigShots.video[1],
  ],
  'dji-osmo-pocket-3-review-malaysia': [
    gearShots[2], gigShots.video[0], people[8], gearShots[4],
  ],
  'insta360-ace-pro-2-review-malaysia': [
    gearShots[5], gigShots.video[1], people[8], gearShots[2],
  ],
  'panasonic-lumix-s9-review-malaysia': [
    gearShots[1], people[20], gearShots[0], gigShots.video[0],
  ],
  'sony-a6700-review-malaysia': [
    gearShots[1], people[1], gearShots[2], gigShots.video[1],
  ],
  'nikon-z50-ii-review-malaysia': [
    gearShots[1], people[19], gearShots[0], people[16],
  ],
  'canon-eos-r8-review-malaysia': [
    gearShots[1], gigShots.wedding[0], gigShots.gala[0], people[21],
  ],
  'dji-mavic-4-review-malaysia': [
    gearShots[6], gigShots.realestate[1], gigShots.wedding[0], people[1],
  ],
  'dji-air-3s-review-malaysia': [
    gearShots[6], gigShots.realestate[0], gigShots.realestate[1], people[4],
  ],
  'dji-mini-5-review-malaysia': [
    gearShots[6], gigShots.realestate[0], gigShots.realestate[1], people[4],
  ],
  'dji-neo-review-malaysia': [
    gearShots[6], people[8], gigShots.video[0], people[3],
  ],
  'dji-osmo-action-4-review-malaysia': [
    gearShots[5], gigShots.realestate[1], people[8], gearShots[6],
  ],
  'gopro-hero-14-review-malaysia': [
    gearShots[5], gigShots.video[1], people[8], gearShots[2],
  ],
  'canon-70d-review-malaysia': [
    gearShots[0], gigShots.gala[0], gearShots[2], people[18],
  ],
  'nikon-d7200-review-malaysia': [
    gearShots[0], gigShots.portrait[0], gearShots[1], people[6],
  ],
  'sony-a6000-review-malaysia-second-hand': [
    gearShots[1], gigShots.video[1], people[8], gearShots[2],
  ],
  'fujifilm-x-t2-review-malaysia': [
    gearShots[1], gigShots.wedding[0], people[20], gearShots[0],
  ],
};

export function gearFigures(slug: string): CuratedShot[] {
  return gearTheme[slug] || [gearShots[(slug.length + 2) % gearShots.length], people[(slug.length + 4) % people.length]];
}

export { people, gearShots, gigShots };
export type { GigKey };
