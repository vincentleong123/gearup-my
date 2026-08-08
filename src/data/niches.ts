export interface Niche {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  bestGearSlugs: string[];
  starterCost: number;
  earningPotential: string;
  tips: string[];
  contentIdeas: string[];
}

export const niches: Niche[] = [
  {
    slug: 'food-review',
    title: 'Food Review',
    tagline: 'Review mamak, cafes, and restaurants from KL to Penang',
    description: 'Malaysians LOVE food content. From Nasi Lemak reviews to hidden kopitiam gems, food content is the easiest niche to start because every eat-out is content. Restaurants will happily feed you for a review — that is your first "payment" before you ever see cash.',
    image: '🍜',
    bestGearSlugs: ['iphone-15-content-creation-malaysia', 'sony-a6100-review-malaysia-second-hand', 'canon-eos-r50-review-malaysia'],
    starterCost: 0,
    earningPotential: 'RM 1,500 – 4,000/month',
    tips: [
      'Shoot in natural daylight — sit near windows for the best lighting',
      'Get a cheap phone mount (RM10) for stable overhead shots of food',
      'Record the sizzle sounds — ASMR food audio performs well on TikTok',
      'Mention the price in your video — Malaysians love transparent pricing',
      'Post at 11am or 6pm — right before lunch and dinner when people are hungry',
      'Tag the restaurant location — boosts local discoverability on IG',
    ],
    contentIdeas: [
      'RM10 vs RM50 Nasi Lemak challenge',
      'Hidden kedai kopi in [your area] series',
      'Halal food court review walkthrough',
      'Best roti canai in KL — ranking video',
      'Mamak kopi tasting blindfolded',
    ],
  },
  {
    slug: 'tech-review',
    title: 'Tech Review',
    tagline: 'Gadget and tech reviews for the Malaysian audience',
    description: 'Malaysians love tech but hate overpaying. Your job is to review gadgets and answer the one question every Malaysian has: "Confirm boleh pakai ke?" — "Is this actually worth my money?" Tech reviewers in Malaysia earn through affiliate links (Shopee/TikTok Shop) and brand sponsorships.',
    image: '💻',
    bestGearSlugs: ['sony-a6100-review-malaysia-second-hand', 'canon-eos-r50-review-malaysia', 'xiaomi-14-ultra-review-malaysia'],
    starterCost: 1600,
    earningPotential: 'RM 2,000 – 6,000/month',
    tips: [
      'Use Product Showcase Mode if using a ZV-E10 — instant pro look for hands-on shots',
      'Include Shopee/Lazada affiliate links in every video description',
      'Film a "first unboxing" video within 24 hours of getting any new gadget',
      'Compare with previous models — "Dulu vs Sekarang" videos get views',
      'Test in real Malaysian conditions: heat, humidity, 5G coverage',
      'Always show the price in Ringgit — price is the #1 question in comments',
    ],
    contentIdeas: [
      '[Gadget] vs [Gadget] — which one for Malaysia?',
      'Unboxing + first setup in 10 minutes',
      'Budget Xiaomi vs iPhone camera test',
      'Is this Shopee gadget worth RM50? series',
      'Real vs fake accessories from SS18 comparison',
    ],
  },
  {
    slug: 'beauty-fashion',
    title: 'Beauty & Fashion',
    tagline: 'Skincare, makeup, and OOTD content for the Malaysian girlies',
    description: 'Beauty and fashion is the biggest content category in Malaysia — and the most profitable. Brands like Wardah, Safi, L\'Oréal Malaysia, and local fashion houses pay RM300-2,000 per post depending on your following. The key: consistency and lighting.',
    image: '💄',
    bestGearSlugs: ['iphone-15-content-creation-malaysia', 'sony-zv-e10-review-malaysia-second-hand', 'canon-eos-r50-review-malaysia'],
    starterCost: 0,
    earningPotential: 'RM 2,000 – 8,000/month',
    tips: [
      'Natural window light is better than any ring light — shoot facing a window',
      'Use Portrait mode on iPhone for try-on hauls (blurs the messy room behind)',
      'Review affordable Malaysian brands first — your audience loves RM20-50 finds',
      'Before/after comparisons drive insane engagement on TikTok',
      'Film at 4K 30fps then slow down 80% in editing for aesthetic transitions',
      'Collab with Watsons and Guardian hauls — these perform well',
    ],
    contentIdeas: [
      'RM20 vs RM200 foundation — can you tell the difference?',
      'My Watsons skincare routine under RM100',
      'Halal makeup review — local brands worth trying',
      'OOTD: Baju Raya collection under RM200',
      'Shopee beauty haul — is it legit?',
    ],
  },
  {
    slug: 'travel',
    title: 'Travel Vlogging',
    tagline: 'Explore Malaysia and SEA with your camera',
    description: 'Malaysia is a travel content goldmine. From the beaches of Perhentian to the highlands of Cameron, there is endless content. Travel vloggers earn through hotel sponsorships, tourism board collaborations, and YouTube ad revenue. Start with weekend trips near your town.',
    image: '🌴',
    bestGearSlugs: ['dji-mini-4-pro-review-malaysia', 'insta360-x4-review-malaysia', 'iphone-15-content-creation-malaysia'],
    starterCost: 2500,
    earningPotential: 'RM 1,500 – 5,000/month',
    tips: [
      'Drone shots = 10x more views. DJI Mini 4 Pro under 250g no license needed',
      'Film B-roll: shoes walking, food being made, wind in trees, hands holding tickets',
      'Use a chest mount for walking POV — GoPro or phone mount from Shopee RM30',
      'Record ambient audio (street sounds, nature, pasar malam) — layer under voiceover',
      'Post 1-2 second clips on TikTok Reels with trending Malaysia sounds',
      'Ask hotels for media rates — "I\'m creating content about [destination]" works',
    ],
    contentIdeas: [
      '[City] travel guide: what to eat in 24 hours',
      'Backpacking Malaysia on RM100/day',
      'First time in [destination] — honest review',
      'Hidden gems near Kuala Lumpur under 2 hours',
      'Budget hotel vs luxury resort — worth the price?',
    ],
  },
  {
    slug: 'daily-vlog',
    title: 'Daily Vlog',
    tagline: 'Day in the life content that people actually watch',
    description: 'Daily vlogging is the most personal niche. Malaysians love watching "real" content — going to work, buying nasi lemak, dealing with KL traffic, weekend plans. The barrier to entry is zero. Your phone is enough. Your life is the content.',
    image: '🎬',
    bestGearSlugs: ['iphone-15-content-creation-malaysia', 'sony-a6100-review-malaysia-second-hand', 'sony-zv-e10-review-malaysia-second-hand'],
    starterCost: 0,
    earningPotential: 'RM 1,000 – 3,000/month',
    tips: [
      'Your phone camera IS good enough. Do NOT buy gear before your first 20 videos',
      'Film in vertical format for TikTok/IG and horizontal for YouTube — or both',
      'Intro hook in first 3 seconds: "Guys, you won\'t believe what happened today"',
      'Show REAL Malaysia: traffic jams, hujan panas, kopitiam breakfast',
      'Upload 3x a week minimum — consistency beats quality when starting',
      'Talk to camera like you\'re texting a friend — natural Manglish works best',
    ],
    contentIdeas: [
      'Day in the life of a jobless fresh grad in KL',
      'Hari minggu saya: bangun lambat, mamak, Netflix',
      'My morning routine (practical, not aesthetic)',
      'Balik kampung vlog — the journey, the food, the family',
      'How I spend RM50 in a day in KL',
    ],
  },
];
