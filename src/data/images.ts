// Curated Unsplash photo IDs — each chosen to authentically represent the subject
// All photos are CC0 / Unsplash license — free for commercial use

// Scenario references: real-world search terms you can paste into Google/IG/TikTok:
// "iPhone natural window light selfie", "Nikon D3100 kit lens photo",
// "Sony A6100 flip screen vlog", "Insta360 X4 invisible stick Malaysia",
// "DJI Mini 4 Pro aerial Malaysia", "GoPro Hero chest mount POV car",
// "food overhead phone mount tiktok", "ring light desk setup malaysia",
// "lapel microphone review setup", "used camera shop malaysia mudah"

export const scenarioRefs: Record<string, string[]> = {
  // Each scenario has multiple image references from Unsplash
  'iphone-window-light': [
    'photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop',       // woman by window natural light
    'photo-1517841905240-472988babdf9?w=600&h=800&fit=crop',       // portrait natural window
    'photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop',       // girl natural light selfie
  ],
  'nikon-d3100-starter': [
    'photo-1516035066931-62601d7af140?w=800&h=600&fit=crop',       // old camera
    'photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop',       // budget camera setup
  ],
  'sony-a6100-vlog': [
    'photo-1526170335885-b1a6b9f9e2a9?w=800&h=600&fit=crop',        // camera on tripod
    'photo-1510127033240-b0af7c0ae506?w=800&h=600&fit=crop',        // mirrorless camera
  ],
  'insta360-action': [
    'photo-1625719497441-c1b0c6af22fb?w=800&h=600&fit=crop',        // action cam
    'photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop',           // mountain bike action
  ],
  'drone-aerial-malaysia': [
    'photo-1506943057087-5f4d4f5c0b7a?w=800&h=600&fit=crop',        // drone aerial island
    'photo-1473969631238-f77a905dcd47?w=800&h=600&fit=crop',        // aerial city
  ],
  'gopro-chest-mount': [
    'photo-1625719497441-c1b0c6af22fb?w=800&h=600&fit=crop',
    'photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',           // car driving
  ],
  'food-overhead': [
    'photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',        // food plating
    'photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',        // food top down
  ],
  'desk-setup-ring-light': [
    'photo-1498049794561-7780b7230f7d?w=800&h=600&fit=crop',        // desk computer
    'photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',        // desk with keyboard
  ],
  'lapel-mic-audio': [
    'photo-1478737270239-2f02b77fc618?w=800&h=600&fit=crop',        // microphone
    'photo-1590602847861-f357a9332bbc?w=800&h=600&fit=crop',        // recording setup
  ],
  'used-camera-shop': [
    'photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',        // electronics desk
    'photo-1510127033240-b0af7c0ae506?w=800&h=600&fit=crop',        // camera
  ],
  'beauty-review-setup': [
    'photo-1487412912498-0447578fcca8?w=800&h=600&fit=crop',        // makeup
    'photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop',        // portrait
  ],
  'car-review-pov': [
    'photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',           // car interior
    'photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop',        // driving
  ],
  'travel-vlog-malaysia': [
    'photo-1488085061387-422e29b40080?w=800&h=600&fit=crop',        // travel
    'photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',        // beach
  ],
  // ===== Gig scenarios (for gig pages + curation wall) =====
  'gig-graduation': [
    'photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',        // caps thrown
    'photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop',        // ceremony
    'photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop',        // graduate portrait
  ],
  'gig-gala': [
    'photo-1511578314322-379afb476865?w=800&h=600&fit=crop',        // event dinner
    'photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',        // crowd confetti
    'photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop',        // party lights
  ],
  'gig-portrait': [
    'photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop',        // woman portrait
    'photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',        // man portrait
    'photo-1524504388940-b1c1722653e1?w=800&h=600&fit=crop',        // fashion portrait
    'photo-1517841905240-472988babdf9?w=800&h=600&fit=crop',        // window portrait
  ],
  'gig-wedding': [
    'photo-1519741497674-611481863552?w=800&h=600&fit=crop',        // couple
    'photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop',        // wedding party
    'photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop',        // rings
  ],
  'gig-video': [
    'photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop',        // film set camera
    'photo-1520612150153-f8aa1f461f4e?w=800&h=600&fit=crop',        // film production
    'photo-1536240478700-b869070f9279?w=800&h=600&fit=crop',        // editing timeline
  ],
  'gig-product': [
    'photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',        // watch product shot
    'photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',        // headphones product
    'photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop',           // sneaker product
  ],
  'gig-realestate': [
    'photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',           // modern house
    'photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',        // luxury home
    'photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',        // house exterior
  ],
  'gig-food': [
    'photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',        // food plating
    'photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',        // food top down
    'photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',        // healthy bowl
  ],
  'gig-corporate': [
    'photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',        // conference audience
    'photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop',        // stage speaker
    'photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',        // meeting hands
  ],
  'gig-photobooth': [
    'photo-1464349153735-7db50ed83c84?w=800&h=600&fit=crop',        // party
    'photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop',        // birthday decor
    'photo-1513151233558-d860c5398176?w=800&h=600&fit=crop',        // confetti celebration
  ],
};

// For each gear slug, map to the relevant scenario keys
export const gearScenarios: Record<string, string[]> = {
  'nikon-d3100-review-malaysia-second-hand-price': ['nikon-d3100-starter', 'used-camera-shop'],
  'sony-a6100-review-malaysia-second-hand': ['sony-a6100-vlog', 'desk-setup-ring-light'],
  'iphone-15-content-creation-malaysia': ['iphone-window-light', 'beauty-review-setup'],
  'insta360-x4-review-malaysia': ['insta360-action'],
  'dji-osmo-action-5-pro-review-malaysia': ['insta360-action'],
  'dji-mini-4-pro-review-malaysia': ['drone-aerial-malaysia', 'travel-vlog-malaysia'],
  'dji-mavic-3-classic-review-malaysia': ['drone-aerial-malaysia'],
  'canon-r50-review-malaysia': ['sony-a6100-vlog', 'food-overhead'],
  'xiaomi-14-ultra-review-malaysia': ['iphone-window-light'],
  'sony-zv-e10-review-malaysia': ['sony-a6100-vlog', 'lapel-mic-audio'],
  'gopro-hero-13-review-malaysia': ['gopro-chest-mount', 'car-review-pov'],
};

export const images = {
  gear: {
    'nikon-d3100-review-malaysia-second-hand-price': 'photo-1516035066931-62601d7af140?w=800&h=600&fit=crop',
    'sony-a6100-review-malaysia-second-hand': 'photo-1510127033240-b0af7c0ae506?w=800&h=600&fit=crop',
    'iphone-15-content-creation-malaysia': 'photo-1598387993441-a364f854c3e1?w=800&h=600&fit=crop',
    'insta360-x4-review-malaysia': 'photo-1625719497441-c1b0c6af22fb?w=800&h=600&fit=crop',
    'dji-osmo-action-5-pro-review-malaysia': 'photo-1589782183178-9d7c3d2d490d?w=800&h=600&fit=crop',
    'dji-mini-4-pro-review-malaysia': 'photo-1506943057087-5f4d4f5c0b7a?w=800&h=600&fit=crop',
    'dji-mavic-3-classic-review-malaysia': 'photo-1508615033588-8c5557eaf6b7?w=800&h=600&fit=crop',
    'canon-r50-review-malaysia': 'photo-1510127033240-b0af7c0ae506?w=800&h=600&fit=crop',
    'xiaomi-14-ultra-review-malaysia': 'photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop',
    'sony-zv-e10-review-malaysia': 'photo-1526170335885-b1a6b9f9e2a9?w=800&h=600&fit=crop',
    'gopro-hero-13-review-malaysia': 'photo-1625719497441-c1b0c6af22fb?w=800&h=600&fit=crop',
  },
  creators: {
    'aiman-roslan': 'photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    'sarah-azman': 'photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    'fikri-haron': 'photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    'aina-syazwani': 'photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    'zamri-nasir': 'photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    'amir-ishak': 'photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    'diana-ishak': 'photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    'farid-hassan': 'photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    'tim-rahman': 'photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  },
  niches: {
    'food-review': 'photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop',
    'tech-review': 'photo-1498049794561-7780b7230f7d?w=1200&h=800&fit=crop',
    'beauty-fashion': 'photo-1487412912498-0447578fcca8?w=1200&h=800&fit=crop',
    'travel': 'photo-1488085061387-422e29b40080?w=1200&h=800&fit=crop',
    'automotive': 'photo-1544636331-e26879cd4d9b?w=1200&h=800&fit=crop',
    'daily-vlog': 'photo-1492725764893-90b379c2b6e7?w=1200&h=800&fit=crop',
  },
  blog: {
    'content-creator-malaysia-no-money-start': 'photo-1486312338219-ce68d2c6f44d?w=1200&h=630&fit=crop',
    'nikon-d3100-vs-sony-a6100-which-better-malaysia': 'photo-1516035066931-62601d7af140?w=1200&h=630&fit=crop',
    'content-creator-gear-roi-malaysia-calculator': 'photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop',
    'insta360-x4-vs-gopro-hero-13-vs-dji-osmo-action-5-pro': 'photo-1625719497441-c1b0c6af22fb?w=1200&h=630&fit=crop',
    'used-camera-buying-guide-malaysia-mudah-carousell': 'photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop',
    'camera-paid-for-part-time-gigs-malaysia': 'photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop',
    'graduation-photography-malaysia-guide': 'photo-1523050854058-8df90110c9f1?w=1200&h=630&fit=crop',
    'wedding-photography-side-hustle-malaysia': 'photo-1519741497674-611481863552?w=1200&h=630&fit=crop',
    'gala-dinner-event-photography-malaysia': 'photo-1511578314322-379afb476865?w=1200&h=630&fit=crop',
    'sony-zv-e10-vs-sony-a6100-which-buy-malaysia': 'photo-1510127033240-b0af7c0ae506?w=1200&h=630&fit=crop',
    'canon-eos-r50-vs-sony-a6100-which-better-malaysia': 'photo-1516035066931-62601d7af140?w=1200&h=630&fit=crop',
    'best-budget-lapel-microphone-malaysia-audio-guide': 'photo-1478737270239-2f02b77fc618?w=1200&h=630&fit=crop',
    'best-tripod-phone-camera-malaysia-guide': 'photo-1526170335885-b1a6b9f9e2a9?w=1200&h=630&fit=crop',
    'budget-lighting-setup-content-creation-malaysia': 'photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop',
    'iphone-vs-mirrorless-camera-content-creation-malaysia': 'photo-1598387993441-a364f854c3e1?w=1200&h=630&fit=crop',
    'free-video-editing-software-malaysia-beginners': 'photo-1536240478700-b869070f9279?w=1200&h=630&fit=crop',
    'youtube-thumbnails-that-get-clicks-malaysia': 'photo-1526374965328-7f61d4dc18c5?w=1200&h=630&fit=crop',
    'tiktok-reels-shorts-strategy-malaysia-2026': 'photo-1522202176988-66273c2fd55f?w=1200&h=630&fit=crop',
    'food-content-creation-gig-malaysia': 'photo-1414235077428-338989a2e8c0?w=1200&h=630&fit=crop',
    'real-estate-media-gig-malaysia': 'photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop',
    'product-photography-ecommerce-gig-malaysia': 'photo-1505740420928-5e560c06d30e?w=1200&h=630&fit=crop',
  },
  categories: {
    camera: 'photo-1516035066931-62601d7af140?w=800&h=600&fit=crop',
    mobile: 'photo-1598387993441-a364f854c3e1?w=800&h=600&fit=crop',
    drone: 'photo-1506943057087-5f4d4f5c0b7a?w=800&h=600&fit=crop',
    action: 'photo-1625719497441-c1b0c6af22fb?w=800&h=600&fit=crop',
  },
  hero: 'photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop',
  cta: 'photo-1554224155-8d04cb21cd6c?w=1920&h=800&fit=crop',
} as const;

export function imgUrl(path: string, w = 800, h = 600): string {
  // Accepts a full Unsplash path like "photo-XXXXX?w=800&h=600&fit=crop"
  // or a shorthand slug
  const base = 'https://images.unsplash.com/';
  if (path.startsWith('photo-')) {
    return base + path;
  }
  return base + path;
}

export function gearImg(slug: string): string {
  const key = slug as keyof typeof images.gear;
  return images.gear[key] ? imgUrl(images.gear[key]) : '';
}

export function creatorImg(slug: string): string {
  const key = slug as keyof typeof images.creators;
  return images.creators[key] ? imgUrl(images.creators[key]) : '';
}

export function nicheImg(slug: string): string {
  const key = slug as keyof typeof images.niches;
  return images.niches[key] ? imgUrl(images.niches[key], 1200, 800) : '';
}

export function blogImg(slug: string): string {
  const key = slug as keyof typeof images.blog;
  return images.blog[key] ? imgUrl(images.blog[key], 1200, 630) : '';
}

export function categoryImg(cat: string): string {
  const key = cat as keyof typeof images.categories;
  return images.categories[key] ? imgUrl(images.categories[key]) : '';
}

export function heroImg(): string {
  return imgUrl(images.hero, 1920, 1080);
}

export function ctaImg(): string {
  return imgUrl(images.cta, 1920, 800);
}

// Get scenario reference images for a specific gear slug
export function getGearScenarios(slug: string): { label: string; images: string[] }[] {
  const scenarioKeys = gearScenarios[slug] || [];
  return scenarioKeys.map(key => ({
    label: scenarioLabels[key] || key,
    images: (scenarioRefs[key] || []).map(p => imgUrl(p)),
  }));
}

const scenarioLabels: Record<string, string> = {
  'iphone-window-light': 'iPhone + Natural Window Light',
  'nikon-d3100-starter': 'Budget DSLR Starter Setup',
  'sony-a6100-vlog': 'Mirrorless Vlogging Setup',
  'insta360-action': 'Action Camera POV',
  'drone-aerial-malaysia': 'Drone Aerial View Malaysia',
  'gopro-chest-mount': 'Chest Mount POV',
  'food-overhead': 'Overhead Food Photography',
  'desk-setup-ring-light': 'Desk + Ring Light Setup',
  'lapel-mic-audio': 'Lapel Mic Recording',
  'used-camera-shop': 'Buying Used Camera',
  'beauty-review-setup': 'Beauty Review Lighting',
  'car-review-pov': 'Car Review POV',
  'travel-vlog-malaysia': 'Travel Vlogging Malaysia',
  'gig-graduation': 'Graduation Shoot',
  'gig-gala': 'Gala Dinner & Events',
  'gig-portrait': 'Portrait Sessions',
  'gig-wedding': 'Wedding Coverage',
  'gig-video': 'Video Content for Business',
  'gig-product': 'Product Photography',
  'gig-realestate': 'Real Estate Media',
  'gig-food': 'Food & Beverage Content',
  'gig-corporate': 'Corporate & Conferences',
  'gig-photobooth': 'Photo Booths & Events',
};

// ===== Gig imagery =====

const gigImageMap: Record<string, string[]> = {
  'graduation-photography': ['gig-graduation'],
  'gala-dinner-event': ['gig-gala'],
  'portrait-photography': ['gig-portrait'],
  'wedding-coverage': ['gig-wedding'],
  'video-content-business': ['gig-video'],
  'product-photography': ['gig-product'],
  'real-estate-media': ['gig-realestate'],
  'food-content': ['gig-food'],
  'corporate-event-coverage': ['gig-corporate'],
  'photo-booth-events': ['gig-photobooth'],
};

export function gigImg(slug: string, w = 1200, h = 700): string {
  const keys = gigImageMap[slug] || [];
  const first = keys[0] && scenarioRefs[keys[0]];
  const path = first && first[0] ? first[0] : 'photo-1516035066931-62601d7af140?w=1200&h=700&fit=crop';
  return imgUrl(path.replace(/\?w=\d+&h=\d+&fit=crop/, `?w=${w}&h=${h}&fit=crop`));
}

export function gigScenes(slug: string): { label: string; images: string[] }[] {
  const keys = gigImageMap[slug] || [];
  return keys.map(key => ({
    label: scenarioLabels[key] || key,
    images: (scenarioRefs[key] || []).map(p => imgUrl(p)),
  }));
}

export function gigGalleryImages(slug: string): string[] {
  const scenes = gigScenes(slug);
  return scenes.flatMap(s => s.images);
}
