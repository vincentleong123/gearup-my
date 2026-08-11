import { GearItem } from './gear';

// ============================================================
// Gig-to-Gear data: real part-time jobs that pay for cameras.
// Rates are 2026 estimates for the Malaysian market (MYR).
// ============================================================

export interface Gig {
  slug: string;
  title: string;
  emoji: string;
  tagline: string;
  description: string;
  difficulty: 'easy' | 'moderate' | 'hard';
  rateMin: number;
  rateMax: number;
  rateUnit: string;
  timeEstimate: string;
  peakSeason: string;
  demand: string;
  starterGearSlugs: string[];
  upgradeGearSlugs: string[];
  deliverables: string[];
  howToGetGigs: string[];
  tips: string[];
  sampleGig: { headline: string; story: string; earnings: string };
  hashtags: string[];
  searchTerms: string[];
}

export const gigs: Gig[] = [
  {
    slug: 'graduation-photography',
    title: 'Graduation & Convocation Photography',
    emoji: '🎓',
    tagline: 'The easiest first gig in Malaysia. Every semester, thousands of families need a "shot of the day."',
    description:
      'Convocation season is a cash machine for camera owners. Students and families are willing to pay RM200-450 for a proper graduation photo package because it only happens once (or twice) in their life. No complex briefs, no hard deadlines — just portraits, group shots, and candids. It is the single best "first gig" to buy your first camera.',
    difficulty: 'easy',
    rateMin: 200,
    rateMax: 450,
    rateUnit: 'per shoot (2-3 hours)',
    timeEstimate: '2-3 hours',
    peakSeason: 'June-July, Sep-Nov, Dec (per university intake)',
    demand: 'Very high — 2-3 waves of convocation per year',
    starterGearSlugs: ['iphone-15-content-creation-malaysia', 'nikon-d3100-review-malaysia-second-hand-price'],
    upgradeGearSlugs: ['sony-a6100-review-malaysia-second-hand', 'canon-eos-r50-review-malaysia'],
    deliverables: [
      '10-20 edited portrait shots (single, family, friends)',
      'Candid ceremony moments at the main hall',
      'Digital delivery via Google Drive within 24-48 hours',
      'Optional: printed photos (partner with a print shop, charge extra)',
    ],
    howToGetGigs: [
      'Post in university Facebook groups and WhatsApp class groups: "Convocation shoot — RMXXX package"',
      'Offer a 3-student bundle deal in the same friend circle — split the session cost',
      'Put up a simple flyer at the gown-rental shops near campus (they see every graduand)',
      'Partner with a makeup artist — MUA clients are literally preparing for photos',
      'Publish 3 sample grad photos on your Instagram/TikTok with the hashtags below',
    ],
    tips: [
      'Shoot at the exact spot everyone wants: the stage exit, the lawn, and the archway',
      'Golden hour (6-7pm) gives free professional lighting outside the hall',
      'Deliver "teasers" within 2 hours — a fast first photo gets you referred',
      'Offer a family group photo add-on for RM50 — parents never refuse',
      'Bring a flash or use burst mode on your phone — the hall is dark and fast-moving',
      'Collect contact numbers with permission and follow up during the NEXT wave',
    ],
    sampleGig: {
      headline: 'One Saturday at UM convocation = RM750',
      story:
        'Aiman set up near the Dewan Tunku Canselor exit with his Nikon D3100. He offered RM150 for a 15-photo mini package to 5 families, and upsold every one a RM50 family group shot. By 5pm he had shot 7 mini packages.',
      earnings: 'RM1,050 for 6 hours — his RM400 camera was 38% paid off in ONE day',
    },
    hashtags: ['convocation', 'graduationmalaysia', 'konvo', 'utmgrad', 'umgrad', 'graduationphotography'],
    searchTerms: ['graduation photography Malaysia', 'convocation shoot KL', 'UM konvo photography package', 'graduation photoshoot Malaysia price'],
  },
  {
    slug: 'gala-dinner-event',
    title: 'Gala Dinner & Event Coverage',
    emoji: '🍾',
    tagline: 'Corporate dinners, awards nights, Chinese New Year dinners — events pay big and repeat every year.',
    description:
      'Every company in Malaysia holds at least one big dinner a year — award nights, CNY dinners, anniversaries, fundraisers. Event organisers are ALWAYS looking for a photographer who will deliver 100+ clean photos by the next morning. One booking chain often repeats annually, giving you a predictable RM300-600 per event.',
    difficulty: 'moderate',
    rateMin: 300,
    rateMax: 600,
    rateUnit: 'per event (3-5 hours)',
    timeEstimate: '3-5 hours + 2 hours editing',
    peakSeason: 'Nov-Dec (award nights), Feb (CNY), year-round for corporate',
    demand: 'Year-round, spikes Nov-Feb',
    starterGearSlugs: ['nikon-d3100-review-malaysia-second-hand-price', 'iphone-15-content-creation-malaysia'],
    upgradeGearSlugs: ['sony-a6100-review-malaysia-second-hand', 'sony-zv-e10-review-malaysia-second-hand'],
    deliverables: [
      '100-200 edited photos: red carpet, table shots, stage moments, candids',
      'A clean, branded Google Drive gallery next-day',
      'Optional add-on: 60-second event recap video (+RM150)',
    ],
    howToGetGigs: [
      'Pitch the event planner or public relations firm first, not the company directly',
      'Send a one-page "event coverage" menu to wedding/hall venues — they book photographers for clients',
      'Walk around gala nights handing a QR card that links to your sample gallery',
      'Volunteer for ONE charity gala for free (or cheap) — the photos get shared to every sponsor company',
      'Ask each satisfied client for a referral: "do you know another company doing an event soon?"',
    ],
    tips: [
      'Arrive 30 min early to test low-light settings at the actual venue',
      'Shoot the red carpet/welcome line first — it is when outfits are freshest',
      'Deliver the VIP shots (MD, CEO, guest of honour) FIRST — that is what the organiser checks',
      'Shoot RAW + JPEG; keep JPEG for fast delivery, RAW for paid prints',
      'Use a lapel recorder to capture speeches — useful if you upsell the recap video',
    ],
    sampleGig: {
      headline: 'Charity gala → 4 corporate bookings',
      story:
        'Sarah shot a charity dinner at a KL hotel for RM400. Her photos were shared in the sponsor WhatsApp groups, and within a month three companies asked for quotes on their own award nights at RM550-600 each.',
      earnings: 'RM2,000+ in one month from a single referral chain',
    },
    hashtags: ['galadinner', 'corporateevent', 'eventphotography', 'cnydinner', 'awardsnight', 'kl events', 'eventcoverage'],
    searchTerms: ['gala dinner photographer Malaysia', 'corporate event photography KL price', 'event photographer Malaysia rate', 'award night photographer'],
  },
  {
    slug: 'portrait-photography',
    title: 'Portrait Photography',
    emoji: '🧑‍🎨',
    tagline: 'LinkedIn headshots, family portraits, "aesthetic" shots for creators — steady weekend money.',
    description:
      'People in Malaysia pay for good portraits every day: LinkedIn headshots for professionals, family portraits for Hari Raya, Chinese New Year and Deepavali, dating-app photos, and content creators who need profile pics. A 1-2 hour session costs almost nothing to run — your time is the only overhead.',
    difficulty: 'easy',
    rateMin: 150,
    rateMax: 400,
    rateUnit: 'per session (1-2 hours)',
    timeEstimate: '1-2 hours',
    peakSeason: 'Year-round; spikes before Hari Raya, CNY, Deepavali',
    demand: 'Steady — recurring every holiday',
    starterGearSlugs: ['iphone-15-content-creation-malaysia', 'nikon-d3100-review-malaysia-second-hand-price'],
    upgradeGearSlugs: ['sony-a6100-review-malaysia-second-hand', 'canon-eos-r50-review-malaysia'],
    deliverables: [
      '10-20 edited portraits',
      'A themed mini session (e.g. Raya, birthday, professional headshot)',
      'Retouching on the best 5 shots (skin smoothing, blemish removal)',
      'Print-ready + social-ready file sizes',
    ],
    howToGetGigs: [
      'Post a "Raya portrait session" offer 6 weeks before Hari Raya — sell 20 slots before the week hits',
      'Offer free headshots to 5 professionals you know (HR people, salespeople) in exchange for referrals',
      'List a "portrait session" service on Carousell and Mudah with 3 samples',
      'Team up with salons, barbers and makeup artists — their clients want the "after" shot',
      'Shoot mini-sessions back-to-back (30 min each) on a single Saturday to multiply income',
    ],
    tips: [
      'Natural window light beats any cheap flash — position your subject facing a window',
      'A 50mm (or 35mm on a crop sensor) lens is the only lens you need for portraits',
      'Shoot 1.5x more frames than you plan to deliver; clients only see your best',
      'Charge a RM50 retouch add-on per extra photo — easy upsell',
      'Create a simple contract with "8 photos included, extra RM10 each" to avoid disputes',
    ],
    sampleGig: {
      headline: 'Raya season = RM1,200 in two weekends',
      story:
        'Diana booked 12 mini-sessions at RM100 each (30 min, 8 photos) the two weekends before Hari Raya. Eight clients added the RM50 "family group photo" add-on. Total: RM1,600 for 4 days of work — one month after buying her used ZV-E10.',
      earnings: 'RM1,600 over 4 days — enough to cover a used prime lens',
    },
    hashtags: ['portraitphotography', 'rayaphoto', 'malaysiaportrait', 'headshot', 'familyportrait', 'portraitsession'],
    searchTerms: ['portrait photographer Malaysia price', 'Hari Raya photo shoot KL', 'family portrait Malaysia', 'headshot photographer Malaysia'],
  },
  {
    slug: 'wedding-coverage',
    title: 'Wedding Coverage',
    emoji: '💍',
    tagline: 'The biggest payday per gig in Malaysia. Start as a second shooter, graduate to lead photographer.',
    description:
      'Weddings are the highest-paying gig on this list — RM1,000-2,500 for a lead photographer, RM300-500 for a second shooter. The smart entry path: become a reliable second shooter first (you earn while learning with zero risk), then take lead gigs once you have a portfolio of real wedding photos.',
    difficulty: 'hard',
    rateMin: 300,
    rateMax: 2500,
    rateUnit: 'per wedding (second shooter RM300-500, lead RM1,000-2,500)',
    timeEstimate: '6-12 hours (full day)',
    peakSeason: 'Year-round; spikes Nov-Feb and weekends',
    demand: 'Very high — couples book 6-12 months ahead',
    starterGearSlugs: ['sony-a6100-review-malaysia-second-hand', 'nikon-d3100-review-malaysia-second-hand-price'],
    upgradeGearSlugs: ['canon-eos-r50-review-malaysia', 'sony-zv-e10-review-malaysia-second-hand'],
    deliverables: [
      'Second shooter: 150-300 raw photos, specific shot list (groom prep, guest candids)',
      'Lead: 300-600 edited photos, ceremony + reception, 3-6 week delivery',
      'Optional: engagement pre-shoot + printed album upsell',
    ],
    howToGetGigs: [
      'Message established wedding photographers offering second-shooter services — start at RM250-300',
      'Join "Wedding Photography Malaysia" Facebook groups and answer SOS calls for backup shooters',
      'Shoot 2-3 free/cheap weddings for friends for portfolio, then raise prices',
      'Partner with wedding vendors: bridal boutiques, makeup artists, emcees, banquet halls',
      'Collect the FULL email list of every couple you meet — retarget them at CNY for family shoots',
    ],
    tips: [
      'Shoot with two cards (or two bodies) and back up on the spot — one corrupted card ends careers',
      'Never miss: the ring shot, the couple portraits, the parents, the cake cut, the first dance',
      'A 50mm f/1.8 lens is the single best wedding investment',
      'Charge travel + a refundable RM300 retainer to lock the date',
      'Send 10 "teaser" photos within 24 hours — it is your #1 marketing tool',
    ],
    sampleGig: {
      headline: 'Second shooter to lead in 6 weddings',
      story:
        'Fikri shot as a second shooter for RM300 a wedding while building his portfolio. By wedding #4 he took a lead gig at RM1,200. Within 6 months, two venues were recommending him to couples — a RM800-1,500 referral chain.',
      earnings: 'RM1,000-2,500 per lead wedding — a used A6100 pays off in 1-2 weddings',
    },
    hashtags: ['weddingphotography', 'malaysiawedding', 'kenduri', 'nikahphotography', 'weddingvideographer', 'persandingan'],
    searchTerms: ['wedding photographer Malaysia price', 'wedding photographer rate KL', 'second shooter wedding Malaysia', 'nikah photography package'],
  },
  {
    slug: 'video-content-business',
    title: 'Video Content for Businesses',
    emoji: '🎬',
    tagline: 'Every restaurant, workshop and boutique needs weekly content — and none of them can film it.',
    description:
      'This is the highest-volume gig on the list. Malaysian small businesses know they need TikTok and Reels content but have zero time or skill to make it. A RM500-1,500/month retainer for "8 videos + 12 posts a month" is nothing to a shop that already spends RM2,000 on ads. Sign 3 clients and your gear is paid forever.',
    difficulty: 'moderate',
    rateMin: 500,
    rateMax: 1500,
    rateUnit: 'per month (retainer) or RM200-600 per video',
    timeEstimate: '8-10 hours per client per month',
    peakSeason: 'Year-round — businesses always need content',
    demand: 'Extremely high — hardest part is picking clients',
    starterGearSlugs: ['iphone-15-content-creation-malaysia', 'sony-a6100-review-malaysia-second-hand'],
    upgradeGearSlugs: ['sony-zv-e10-review-malaysia-second-hand', 'dji-osmo-action-5-pro-review'],
    deliverables: [
      '8-12 vertical videos (TikTok/Reels) per month per client',
      '12 still photos + 3 caption ideas',
      'A monthly "content calendar" so the business knows what posts when',
    ],
    howToGetGigs: [
      'Shoot 2 free sample Reels for a restaurant you like, send them, then pitch a retainer',
      'Walk into 5 local businesses with your phone — "I make your Reels for RM500/month"',
      'Offer a 1-month trial at 50% — once they see the views, they never cancel',
      'Bundle: content retainer + RM200 per live-event coverage',
      'Ask every client for 1 referral — "refer a friend, get a free video"',
    ],
    tips: [
      'Batch-shoot a month of content in ONE 3-hour visit — 12 videos, 30 clips, 40 photos',
      'Always show the price in content — "RM6.50 Nasi Lemak" posts outperform vague ones',
      'Reuse clips across TikTok, Reels, Shorts and Facebook — 4x the reach for zero extra work',
      'Use trending Malaysian sounds for the first 2 seconds of every Reel',
      'Deliver on the 1st of the month, every month, without fail — reliability is your moat',
    ],
    sampleGig: {
      headline: '3 retainers = a paid-off A6100 in 2 months',
      story:
        'Fikri signed a mamak (RM700), a gym (RM800) and a boutique (RM600) on RM500-800 retainers after showing each a 30-second sample Reel. Total RM2,100/month recurring — his used A6100 was paid off by month two, then became pure profit.',
      earnings: 'RM1,500-3,000/month recurring from 2-4 retainer clients',
    },
    hashtags: ['socialmediamarketing', 'reelsmalaysia', 'fbreel', 'contentcreator', 'videocontent', 'umkm', 'bisnes'],
    searchTerms: ['social media content creator Malaysia', 'Reels content package Malaysia price', 'TikTok content creator rate Malaysia', 'content retainer Malaysia'],
  },
  {
    slug: 'product-photography',
    title: 'Product & E-commerce Photography',
    emoji: '📦',
    tagline: 'Shopee and TikTok Shop sellers NEED clean product shots — and there are hundreds of thousands of them.',
    description:
      'Malaysia has one of the world\'s most active e-commerce markets. Every seller needs crisp white-background product photos for Shopee, Lazada and TikTok Shop listings, plus lifestyle shots for ads. You can run this gig from your kitchen table with a RM150 lightbox — or your phone and a window.',
    difficulty: 'easy',
    rateMin: 200,
    rateMax: 500,
    rateUnit: 'per product set (10-20 shots)',
    timeEstimate: '1-3 hours per set',
    peakSeason: 'Year-round; spikes before 9.9, 11.11, 12.12 sales',
    demand: 'Very high — endless sellers',
    starterGearSlugs: ['iphone-15-content-creation-malaysia', 'xiaomi-14-ultra-review-malaysia'],
    upgradeGearSlugs: ['sony-a6100-review-malaysia-second-hand', 'canon-eos-r50-review-malaysia'],
    deliverables: [
      '10-20 clean shots: white background, angles, details, and 2 lifestyle shots',
      'Size-consistent files ready for Shopee/Lazada upload',
      'Optional: 15-second video loop for TikTok Shop (+RM100)',
    ],
    howToGetGigs: [
      'Approach small sellers on Shopee — search your local product category and message sellers with bad photos',
      'List "e-commerce product photography" on Carousell — sellers browse there too',
      'Partner with a seller who has a big catalogue and offer a per-product volume rate',
      'Shoot 3 sample "before vs after" transformations and post them as content',
      'Attend a vendor night market (pasar malam) — every stall owner has a product line',
    ],
    tips: [
      'A window + white foam board (RM8) = 90% of a professional lightbox',
      'Shoot tethered to your phone for instant review with the seller',
      'Keep the same angle and scale across a product line — professional sellers pay more for consistency',
      'Charge a RM50 styling fee for flat-lay lifestyle shots',
      'Deliver within 48 hours — fast turnaround wins repeat orders',
    ],
    sampleGig: {
      headline: 'One seller, 60 products, RM1,200',
      story:
        'Zamri offered a phone-case seller a volume deal: RM20 per product at a 60-product catalogue. Shooting 20 products per weekend, he cleared the catalogue in 3 weeks for RM1,200 — mostly with his phone and a foam board.',
      earnings: 'RM1,200 from one seller — repeatable with the next 10 sellers',
    },
    hashtags: ['productphotography', 'shopeeseller', 'tiktokshopmalaysia', 'ecommerce', 'productshot', 'whitebackground'],
    searchTerms: ['product photography Malaysia price', 'ecommerce photography KL', 'Shopee seller photography service', 'product photography package'],
  },
  {
    slug: 'real-estate-media',
    title: 'Real Estate & Property Media',
    emoji: '🏡',
    tagline: 'Agents pay RM250-600 per property — and every good listing needs photos, video, and 360 tours.',
    description:
      'Property agents and developers are among the highest-paying and most reliable clients in Malaysia. Every listing — from a flat to a luxury condo — needs a photo set, a walkthrough video, and increasingly a 360° tour. A used Insta360 X4 and a drone make you the one-person studio they cannot find elsewhere.',
    difficulty: 'moderate',
    rateMin: 250,
    rateMax: 600,
    rateUnit: 'per property (photos + video walkthrough)',
    timeEstimate: '1-2 hours per property',
    peakSeason: 'Year-round; spikes before weekends and school holidays',
    demand: 'High — agents always need fresh listings',
    starterGearSlugs: ['iphone-15-content-creation-malaysia', 'insta360-x4-review-malaysia'],
    upgradeGearSlugs: ['dji-mini-4-pro-review-malaysia', 'dji-osmo-action-5-pro-review'],
    deliverables: [
      '15-30 interior/exterior photos (wide-angle corrected)',
      '1 walkthrough video (60-90 seconds)',
      'Optional: 360° virtual tour (Insta360) or aerial shots (drone)',
      'Next-day delivery so the agent can list fast',
    ],
    howToGetGigs: [
      'DM 10 property agents on Facebook/Instagram with 1 sample property video',
      'Offer a "first listing free" trial to the agent with the most inventory in your area',
      'Attend open-house previews and hand the agent your one-page menu',
      'Partner with a housing developer\'s sales gallery — they need weekly content',
      'Post 2 aerial/walkthrough samples of your own neighbourhood with #propertyvideomalaysia',
    ],
    tips: [
      'Use a wide lens (16-18mm) — narrow lenses make rooms look small and agents hate that',
      'Shoot at 10am and 4pm — rooms are brightest before it gets harsh',
      'Stage-lite: switch on every light, open every curtain, move nothing heavy',
      'The 360 tour is your upsell: charge RM100 more and it makes the listing premium',
      'A drone shot of the neighbourhood schools/pools adds RM100 of perceived value',
    ],
    sampleGig: {
      headline: '8 properties in month one',
      story:
        'Zamri DM\'d 25 property agents with a 60-second 360 walkthrough sample. Eight replied. At RM300-400 each with the video add-on, he banked RM2,400 in his first month — fully paying off his used Insta360 X4.',
      earnings: 'RM2,400/month from one pitch message — gear paid off in month one',
    },
    hashtags: ['propertymalaysia', 'propertyvideo', 'realestatemalaysia', 'virtualtour', '360tour', 'propertyagent'],
    searchTerms: ['property photography Malaysia price', 'real estate videographer KL', '360 virtual tour Malaysia', 'property agent photography service'],
  },
  {
    slug: 'aerial-drone-media',
    title: 'Aerial & Drone Media',
    emoji: '🚁',
    tagline: 'Drones are Malaysia\'s highest-demand skill gap — estates, resorts and agents cannot find anyone who can fly.',
    description:
      'Aerial content is the fastest-growing premium gig in Malaysia. Plantation owners want crop-health flyovers, resorts want promo footage, property agents want roof-to-roadwalk shots, and construction firms want progress documentation. Under 250g drones (like the Mini 4 Pro) sit in the lighter CAAM class — no Remote Pilot License, but check the current registration rules before you fly commercially. Every shoot takes 1-2 hours and pays RM400-1,200.',
    difficulty: 'moderate',
    rateMin: 400,
    rateMax: 1200,
    rateUnit: 'per shoot (1-2 hours)',
    timeEstimate: '1-2 hours + 30 min editing',
    peakSeason: 'Year-round; spikes during construction seasons and resort bookings',
    demand: 'Growing fast — most agents, estates and resorts have no drone operator on call',
    starterGearSlugs: ['dji-mini-4-pro-review-malaysia', 'iphone-15-content-creation-malaysia'],
    upgradeGearSlugs: ['dji-mavic-3-classic-review-malaysia', 'insta360-x4-review-malaysia'],
    deliverables: [
      '3-6 minutes of edited aerial footage (4K), split into vertical + horizontal versions',
      '5-10 still aerial photos (for listings, brochures, or Instagram)',
      'A clean "no-fly safe" disclaimer and CAAM rule checklist for the client',
      'Next-day delivery via Google Drive',
    ],
    howToGetGigs: [
      'Walk into 5 plantations, resorts or construction sites near you and show 30 seconds of aerial footage on your phone',
      'Post 3 aerial clips of your own area on TikTok/Facebook with #aerialmalaysia — owners will find you',
      'DM property agents with a 60-second sample of a landed property from above',
      'Offer a discounted "first flyover" to a resort — then upsell a monthly retainer',
      'Partner with wedding videographers who don\'t have drone coverage',
    ],
    tips: [
      'Under 250g = no Remote Pilot License (still check CAAM registration rules). Above 250g (e.g. Mavic 3) requires a license — factor RM500-800 into pricing',
      'Fly at sunrise or golden hour — flat midday light makes footage look cheap',
      'Master 5 moves: reveal, orbit, fly-through, rise-and-look, and the "pull back" — that is 80% of paid work',
      'Always shoot with the ND filter on in bright Malaysian sun to avoid jittery footage',
      'Check your no-fly zones (KLIA area, military bases) with the DJI Fly app BEFORE quoting',
      'Deliver vertical (9:16) and horizontal (16:9) versions — clients always ask for both',
    ],
    sampleGig: {
      headline: 'One estate flyover → a construction retainer',
      story:
        'Rizuan offered a plantation owner near Ipoh a RM400 flyover to check a new sapling block. The owner showed it to a cousin who was managing a housing development — and within two weeks Rizuan signed a RM1,500/month construction-progress retainer, plus RM500 per extra resort shoot.',
      earnings: 'RM1,900 in month one from a single RM400 first gig',
    },
    hashtags: ['dronemalaysia', 'aerialmalaysia', 'dronevideo', 'plantation', 'dronefootage', 'constructionmalaysia', 'aerialphotography'],
    searchTerms: ['drone videographer Malaysia', 'aerial photography price Malaysia', 'plantation drone survey Malaysia', 'construction progress drone Malaysia', 'resort drone video Malaysia'],
  },
  {
    slug: 'food-content',
    title: 'Food & Beverage Content',
    emoji: '🍜',
    tagline: 'Malaysians scroll food content all day — cafes and restaurants will trade you meals first, then cash.',
    description:
      'Food is the most-viewed content niche in Malaysia, and F&B owners know it. Start by getting free meals for content (your first "payment"), then convert owners into RM150-400 per session, or RM300-800/month retainers. The entry barrier is literally zero — your phone on a napkin works.',
    difficulty: 'easy',
    rateMin: 150,
    rateMax: 400,
    rateUnit: 'per session, or RM300-800/month retainer',
    timeEstimate: '1-2 hours per session',
    peakSeason: 'Year-round',
    demand: 'Very high — every cafe and mamak is a client',
    starterGearSlugs: ['iphone-15-content-creation-malaysia', 'sony-a6100-review-malaysia-second-hand'],
    upgradeGearSlugs: ['canon-eos-r50-review-malaysia', 'dji-osmo-action-5-pro-review'],
    deliverables: [
      'Overhead flat-lay + close-up food shots',
      '8-12 vertical clips for Reels/TikTok',
      'Optional: "eating experience" walkthrough with audio',
    ],
    howToGetGigs: [
      'DM cafes that post their own bad photos with one of your sample food shots',
      'Offer a "free shoot, you pay for my meal" first session — most say yes',
      'Batch shoot 3 cafes in one afternoon to make it efficient',
      'Offer owners a monthly retainer with before/after follower numbers as proof',
      'Review the hidden gem cafes in your area — owners will start contacting you',
    ],
    tips: [
      'Shoot food at 45° or overhead; window-side tables give the best light',
      'Capture the sizzle/steam/sizzling sound — audio drives food TikTok',
      'Mention the price in every video — Malaysian audiences demand it',
      'Film the food being picked up and dipped — motion beats static shots',
      'Deliver one teaser Reel the same day to hook the owner',
    ],
    sampleGig: {
      headline: 'Free lunches turned into a RM800 retainer',
      story:
        'Sarah shot 4 free Reels for a Bangsar cafe to build her food portfolio. The cafe\'s views jumped, and within a month she signed them for RM800/month — 8 Reels, 12 photos, one content calendar.',
      earnings: 'RM800/month recurring + free food at 3 other cafes',
    },
    hashtags: ['foodmalaysia', 'foodreview', 'kafekl', 'mamak', 'foodtiktok', 'nasi lemak', 'klfoodie'],
    searchTerms: ['food photography Malaysia', 'food content creator KL', 'cafe content package Malaysia', 'food videographer Malaysia'],
  },
  {
    slug: 'corporate-event-coverage',
    title: 'Corporate & Conference Coverage',
    emoji: '🏢',
    tagline: 'Conferences, seminars, product launches and company events — paid in hours, booked in seasons.',
    description:
      'Malaysia\'s corporate event calendar is packed: conferences at KLCC, product launches, seminars, AGMs and team-building days. Companies usually book photographers for the full day and expect prompt, organised delivery. It is steadier and less stressful than weddings, and pays RM400-1,000 per day.',
    difficulty: 'moderate',
    rateMin: 400,
    rateMax: 1000,
    rateUnit: 'per event (half day RM400-600, full day RM800-1,000)',
    timeEstimate: '4-8 hours',
    peakSeason: 'Mar-May & Sep-Nov (conference seasons)',
    demand: 'Good — agencies need cover all year',
    starterGearSlugs: ['nikon-d3100-review-malaysia-second-hand-price', 'sony-a6100-review-malaysia-second-hand'],
    upgradeGearSlugs: ['canon-eos-r50-review-malaysia', 'sony-zv-e10-review-malaysia-second-hand'],
    deliverables: [
      'Speaker close-ups, crowd reactions, networking candids',
      'Branded quick gallery same-day (VIP shots first)',
      'Optional: 2-3 minute event recap video',
    ],
    howToGetGigs: [
      'Register with corporate event/PR agencies that subcontract photographers',
      'Search "conference" on Eventbrite Malaysia and message organisers',
      'Offer a discounted "day rate" to venues like convention centres',
      'Collect business cards at every event — 6 months later they need the next one',
      'Specialise in one vertical (tech conferences, medical seminars) to be remembered',
    ],
    tips: [
      'Confirm the shot list and VIP list with the organiser 2 days before',
      'Shoot from both sides of the stage — speakers face the crowd, crowd faces the stage',
      'Use burst mode during applause for the "clapping hands" money shot',
      'Number your photos to the schedule — organisers match them to talks',
      'Send a 30-photo preview gallery same evening — same-day service wins renewals',
    ],
    sampleGig: {
      headline: 'A conference day = 2 sessions + 1 video upsell',
      story:
        'Fikri covered a fintech conference at RM800 for the day, added a RM300 recap video, and the organiser booked him for their second city event the following month at the same rate.',
      earnings: 'RM1,100 in one day + a guaranteed repeat booking',
    },
    hashtags: ['conferencemalaysia', 'corporateevent', 'eventphotography', 'seminar', 'productlaunch', 'klcc'],
    searchTerms: ['conference photographer Malaysia', 'corporate event photography KL rate', 'seminar photographer Malaysia', 'product launch photographer'],
  },
  {
    slug: 'photo-booth-events',
    title: 'Photo Booth & Event Booths',
    emoji: '📸',
    tagline: 'Weddings, birthday parties and corporate functions pay RM400-800 for a photo booth — and it is fun.',
    description:
      'Photo booths are the most "productised" gig on this list: a fixed package, a fixed price, instant prints, and a social gallery. With a phone, a ring light, a backdrop and a partner printer (or an Insta360 X4), you can run RM400-800 booths every weekend. Parents pay premium at kids\' parties; companies pay premium at family days.',
    difficulty: 'moderate',
    rateMin: 400,
    rateMax: 800,
    rateUnit: 'per event (2-4 hours, incl. instant prints)',
    timeEstimate: '3-4 hours incl. setup',
    peakSeason: 'Wedding season + school holidays + CNY',
    demand: 'High on weekends',
    starterGearSlugs: ['iphone-15-content-creation-malaysia', 'insta360-x4-review-malaysia'],
    upgradeGearSlugs: ['dji-osmo-action-5-pro-review', 'gopro-hero-13-review-malaysia'],
    deliverables: [
      'Unlimited photo sessions with a themed backdrop + props',
      'Instant print strips (via a mini printer or print-shop partner)',
      'Digital gallery link shared to guests the same night',
    ],
    howToGetGigs: [
      'Partner with a print shop to rent a printer — they get volume, you get zero capex',
      'Offer a "photo booth + instant prints" package to wedding planners',
      'Pitch kids\' party organisers (birthday party planners) — parents love print strips',
      'Rent props in bulk for CNY/Raya and advertise "festive photo booth"',
      'Share 1 behind-the-scenes Reel per booth — event planners search Instagram',
    ],
    tips: [
      'Price: RM400-800 including 3 hours, prints, and a digital gallery',
      'Set up near the entrance or the dessert table — the two busiest spots',
      'Test the printer with 5 prints BEFORE guests arrive',
      'Use a ring light for that glossy "event" look',
      'Upsell a branded frame overlay with the event logo (+RM50)',
    ],
    sampleGig: {
      headline: 'Weekend booths = RM1,600',
      story:
        'Zamri ran two photo booths in one weekend: a wedding at RM700 and a 6-year-old\'s birthday at RM500, each with instant prints via his print-shop partner and an Insta360 X4 for 360 booth selfies.',
      earnings: 'RM1,200/weekend — repeatable every weekend of peak season',
    },
    hashtags: ['photobooth', 'photoboothmalaysia', 'eventphotobooth', 'birthdayphotobooth', 'weddingphotobooth'],
    searchTerms: ['photo booth rental Malaysia price', 'photo booth hire KL', 'birthday photo booth Malaysia', 'event photo booth package'],
  },
];

// ============================================================
// 2026 Malaysia creative services rate card (for the hub page)
// ============================================================

export interface RateRow {
  service: string;
  entry: string;
  typical: string;
  premium: string;
  time: string;
  demand: string;
}

export const rateCard: RateRow[] = [
  { service: '🎓 Graduation / Convocation', entry: 'RM150', typical: 'RM200-300', premium: 'RM450', time: '2-3 hrs', demand: 'Seasonal' },
  { service: '🍾 Gala dinner / awards night', entry: 'RM250', typical: 'RM300-450', premium: 'RM600', time: '3-5 hrs', demand: 'Year-end peak' },
  { service: '🧑‍🎨 Portrait session', entry: 'RM100', typical: 'RM150-250', premium: 'RM400', time: '1-2 hrs', demand: 'Holiday spikes' },
  { service: '💍 Wedding (second shooter)', entry: 'RM250', typical: 'RM300-500', premium: 'RM500', time: '6-12 hrs', demand: 'Weekends' },
  { service: '💍 Wedding (lead photographer)', entry: 'RM800', typical: 'RM1,000-1,800', premium: 'RM2,500+', time: 'Full day', demand: 'Books ahead' },
  { service: '🎬 Social media retainer', entry: 'RM300', typical: 'RM500-800', premium: 'RM1,500', time: '8-10 hrs/mo', demand: 'Year-round' },
  { service: '🎬 One-off brand video', entry: 'RM200', typical: 'RM300-600', premium: 'RM1,000', time: '2-4 hrs', demand: 'Year-round' },
  { service: '📦 Product / e-commerce set', entry: 'RM100', typical: 'RM200-300', premium: 'RM500', time: '1-3 hrs', demand: 'Sale season peaks' },
  { service: '🏡 Property media (per listing)', entry: 'RM200', typical: 'RM250-400', premium: 'RM600', time: '1-2 hrs', demand: 'Year-round' },
  { service: '🏡 Property aerial (drone)', entry: 'RM300', typical: 'RM400-600', premium: 'RM800', time: '1 hr', demand: 'Year-round' },
  { service: '🍜 F&B content session', entry: 'RM100', typical: 'RM150-300', premium: 'RM400', time: '1-2 hrs', demand: 'Year-round' },
  { service: '🏢 Corporate / conference day', entry: 'RM400', typical: 'RM600-800', premium: 'RM1,000', time: '4-8 hrs', demand: 'Conference seasons' },
  { service: '📸 Photo booth (per event)', entry: 'RM300', typical: 'RM400-600', premium: 'RM800', time: '3-4 hrs', demand: 'Weekends' },
  { service: '📸 Real estate 360° tour', entry: 'RM250', typical: 'RM300-500', premium: 'RM600', time: '1 hr', demand: 'Year-round' },
  { service: '🚁 Aerial / drone shoot', entry: 'RM250', typical: 'RM400-600', premium: 'RM1,200', time: '1-2 hrs', demand: 'Year-round' },
];

// ============================================================
// Helpers
// ============================================================

export function getGigBySlug(slug: string) {
  return gigs.find(g => g.slug === slug) || null;
}

export function getGigsForGear(slug: string): Gig[] {
  return gigs.filter(g =>
    g.starterGearSlugs.includes(slug) || g.upgradeGearSlugs.includes(slug)
  );
}

export interface PayoffPath {
  gig: Gig;
  minGigs: number; // gigs needed at the BEST rate
  maxGigs: number; // gigs needed at the ENTRY rate
  note: string;
}

export function getPayoffPath(gear: GearItem): PayoffPath[] {
  if (!gear.priceUsed || gear.priceUsed <= 0) return [];
  const price = gear.priceUsed;
  return gigs
    .map(gig => {
      if (gig.rateMax <= 0) return null;
      const minGigs = Math.ceil(price / gig.rateMax);
      const maxGigs = Math.max(minGigs, Math.ceil(price / gig.rateMin));
      return {
        gig,
        minGigs,
        maxGigs,
        note: `${minGigs === maxGigs ? minGigs : minGigs + '-' + maxGigs} gigs`,
      };
    })
    .filter((p): p is PayoffPath => p !== null)
    .sort((a, b) => a.minGigs - b.minGigs)
    .slice(0, 4);
}

export const difficultyMeta: Record<Gig['difficulty'], { label: string; color: string }> = {
  easy: { label: '🟢 Easy entry', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  moderate: { label: '🟡 Moderate', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  hard: { label: '🔴 Expert-level', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
};
