export interface GearItem {
  slug: string;
  name: string;
  category: 'camera' | 'mobile' | 'drone' | 'action' | 'audio';
  priceNew: number;
  priceUsed: number;
  type: string;
  sensor: string;
  video: string;
  weight: string;
  rating: number;
  roiScore: number;
  level: 'beginner' | 'mid' | 'pro';
  excerpt: string;
  content: string;
  pros: string[];
  cons: string[];
  roiDesc: string;
  usedTip: string;
  creatorUses: string[];
}

export const gearList: GearItem[] = [
  {
    slug: 'nikon-d3100-review-malaysia-second-hand-price',
    name: 'Nikon D3100',
    category: 'camera',
    priceNew: 0,
    priceUsed: 450,
    type: 'Entry DSLR',
    sensor: '14.2MP DX-format CMOS',
    video: '1080p 24fps',
    weight: '505g',
    rating: 4.0,
    roiScore: 98,
    level: 'beginner',
    excerpt: 'The D3100 is the ultimate budget starter DSLR in Malaysia. At RM300-500 second-hand, it shoots clean 1080p video and works with cheap F-mount lenses. Perfect if you have zero budget.',
    content: `The Nikon D3100 is a legend in the budget content creation world. Released in 2010, this 14.2MP DX-format DSLR can be found across Malaysia — Mudah.my, Carousell, and Facebook Marketplace — for between RM300 and RM500 with the kit 18-55mm lens.

For Tim and Ahmad, this is the "I have literally no money" option. And here's the truth: the D3100 still takes beautiful images and decent 1080p video. The key is lighting. With natural window light or a cheap RM50 LED panel, you can produce content that looks like it was shot on a much more expensive camera.

**Second-hand buying tips:**
- Check the shutter count (under 50,000 is ideal)
- Make sure the LCD screen isn't scratched
- Test autofocus in live view mode (video mode)
- Look for mould on the lens — common in Malaysia's humid climate
- Bring an SD card and test shoot before buying

**Lens options under RM200:**
- Nikon 35mm f/1.8G DX (RM180-250 used) — essential for low light
- Nikon 50mm f/1.8D (RM150-200 used) — great portraits
- Kit 18-55mm (comes with camera) — fine for starting

**What you can shoot with this in 2026:**
- Product review videos (well-lit, static shots)
- Vlogs with a tripod (the D3100 has no flip screen — use your phone as monitor)
- Behind-the-scenes photos for Instagram
- Thumbnail images for YouTube

Illustrative example: **Aiman Roslan** (a fictional creator journey) started his local business review channel with a D3100 and a RM40 tripod. Within 6 months, he was earning RM1,500-2,000 per month from ads and sponsorship. His total starter cost was under RM600.`,
    roiDesc: 'Under RM500 second-hand. Aiman (illustrative) broke even in 2 weeks. Best "I have no money" starter camera in Malaysia.',
    pros: ['Cheapest usable camera in MY market', 'Good image quality for the price', 'Huge used lens ecosystem', 'Takes great photos for thumbnails'],
    cons: ['No flip screen', '1080p only (no 4K)', 'Poor low-light without fast lens', 'No microphone jack'],
    usedTip: 'Check shutter count under 50k, test for mould on lens, offer RM350 cash',
    creatorUses: ['aiman-roslan', 'sarah-azman'],
  },
  {
    slug: 'sony-a6100-review-malaysia-second-hand',
    name: 'Sony A6100',
    category: 'camera',
    priceNew: 2999,
    priceUsed: 1600,
    type: 'Mirrorless APS-C',
    sensor: '24.2MP APS-C CMOS',
    video: '4K 30fps',
    weight: '396g',
    rating: 4.5,
    roiScore: 92,
    level: 'beginner',
    excerpt: 'The best budget mirrorless for video in Malaysia. Real-time eye AF, 4K, flip-up screen. Second-hand RM1,400-RM1,800. This is Tim and Ahmad\'s ideal first real camera.',
    content: `The Sony A6100 is probably the single best value camera for new Malaysian content creators in 2026. It has the same sensor and autofocus system as the much more expensive A6400 and A6600, but costs half the price second-hand.

On Mudah.my and Carousell Malaysia, you'll find the A6100 with kit 16-50mm lens for RM1,400 to RM1,800. This is Tim and Ahmad's sweet spot — affordable enough to buy after one month of gig work, capable enough to shoot professional content.

**Why the A6100 is perfect for Tim & Ahmad:**
- Real-time Eye AF for both humans and animals — makes filming solo easy
- Flip-up screen — essential for vlogging
- 4K 30fps with no crop — cleaner than iPhone video
- Microphone jack — use with RM80 lapel mic
- Compact and light — carry everywhere

**The RM2,000 starter kit:**
- Sony A6100 body used: RM1,500
- Sigma 16mm f/1.4 (used, great for vlog): RM800
- Or kit lens (included): free
- Generic lapel mic: RM50
- Tripod: RM40
- Used SD card: RM20

**What you can earn with this setup:**
- Product review videos: RM200-500 per video
- Social media content for businesses: RM300-800 per month retainer
- Wedding second shooter: RM200-400 per event
- YouTube thumbnail photography: RM50-100 per session

Creator case study: **Fikri Haron** started with an A6100 and a single Sigma 16mm lens. He approached 15 local F&B businesses offering social media content. 3 said yes at RM500/month each. Within 2 months, his gear was paid off and he was making RM1,500/month net.`,
    roiDesc: 'Used RM1,400-1,800. Fikri paid his off in 2 months with 3 F&B clients at RM500/month each. Best value mirrorless for Malaysian creators.',
    pros: ['Best autofocus in its price class', '4K video with no crop', 'Flip-up screen for vlogging', 'Microphone jack', 'Compact and lightweight'],
    cons: ['No in-body stabilization', 'Plastic build', 'No headphone jack', 'Overheats in 4K after 30min'],
    usedTip: 'Test 4K recording for 20min to check overheating, bring a lens to test AF, check sensor dust',
    creatorUses: ['fikri-haron', 'diana-ishak'],
  },
  {
    slug: 'iphone-15-content-creation-malaysia',
    name: 'iPhone 15 (Base)',
    category: 'mobile',
    priceNew: 3799,
    priceUsed: 2600,
    type: 'Smartphone',
    sensor: '48MP Main + 12MP UW',
    video: '4K 60fps HDR',
    weight: '171g',
    rating: 4.4,
    roiScore: 95,
    level: 'beginner',
    excerpt: 'If Tim or Ahmad already owns an iPhone 15 or newer, they don\'t need to buy any camera gear. The 48MP sensor and 4K 60fps with HDR is enough to start earning immediately.',
    content: `Here's the truth that Tim and Ahmad need to hear: **if you already own an iPhone 15 or 15 Pro, you already have a professional content creation setup.** You don't need to buy anything.

The iPhone 15 base model has a 48MP main sensor that shoots 4K 60fps HDR video with excellent dynamic range. For social media content — TikTok, Instagram Reels, YouTube Shorts, Facebook videos — it's more than good enough.

**What you can shoot RIGHT NOW with just your iPhone:**
- Product reviews (use cinematic mode for b-roll)
- Day-in-the-life vlogs
- Talking head videos (front camera is 12MP 4K)
- Food content
- Unboxing videos
- Behind-the-scenes content

**Zero-cost starter kit (things you already have):**
- Your iPhone 15
- Natural window light
- Your voice (practice speaking clearly)
- Free editing app: CapCut (mobile) or DaVinci Resolve (if you have a laptop)
- A towel or books to prop the phone

**When to spend RM100:**
- RM50: Generic lapel microphone (drastic audio improvement)
- RM40: Basic phone tripod
- RM10: Phone mount adapter

Creator proof: **Aina Syazwani** started her beauty review TikTok with nothing but an iPhone 12 (older than yours!) and natural light. Within 4 months, she was earning RM2,000-3,000/month from brand deals and Shopee affiliate links. She only bought a RM50 microphone after her first RM500 month.

**The "I have an iPhone" strategy:**
Month 1: Shoot with iPhone only, post 3x/week on TikTok and IG Reels
Month 2: At RM500 saved, buy a lapel mic and tripod
Month 3: At RM1,000 saved, consider used A6100 if you want to level up
Month 6: You now have a decision — stay mobile or invest in dedicated gear`,
    roiDesc: 'Zero upfront cost if you already own one. Aina earned RM2,000/month with just her phone. Start today.',
    pros: ['Already in your pocket = zero upfront cost', 'Excellent video quality for social', 'Huge app ecosystem', 'iCloud backup', 'Familiar interface'],
    cons: ['Small sensor limits low-light', 'No optical zoom (digital only)', 'Battery drains fast in 4K', 'Overheats in direct sun'],
    usedTip: 'Check battery health (>85%), confirm iCloud is unlocked, test all cameras',
    creatorUses: ['aina-syazwani', 'tim-rahman'],
  },
  {
    slug: 'insta360-x4-review-malaysia',
    name: 'Insta360 X4',
    category: 'action',
    priceNew: 2699,
    priceUsed: 2000,
    type: '360° Action Cam',
    sensor: '1/2" 72MP (dual)',
    video: '8K 30fps 360°',
    weight: '203g',
    rating: 4.6,
    roiScore: 93,
    level: 'mid',
    excerpt: 'The Insta360 X4 creates content nobody else can. Invisible selfie stick, tiny planet, reframe after shooting. At RM2,000-2,700, it pays itself off in 1-2 months of consistent posting.',
    content: `The Insta360 X4 is a cheat code for social media content. It shoots 360° video that you can reframe later — meaning you get wide shots, tracking shots, and creative angles with zero camera operator.

**Why this is perfect for mid-level creators:**
- The "invisible selfie stick" effect makes it look like a drone is following you
- You can shoot once and export multiple aspect ratios (9:16 for TikTok/Reels, 16:9 for YouTube)
- The 8K 360 mode lets you punch in to 1080p reframed shots
- Waterproof to 10m without housing

**Second-hand in Malaysia:** RM1,800-RM2,200 on Mudah.my and Carousell. Many people buy these, use them once, and sell them.

**Content ideas that pay:**
- "Day in the life" real estate walkthroughs (agents pay RM300-500 for these)
- Car interior/exterior tours (dealers pay RM200-400)
- Gym workout videos (personal trainers need content)
- Travel vlogs with invisible selfie stick
- Group event coverage (wedding, parties, corporate events)

Creator case study: **Zamri Nasir** bought a used X4 for RM1,900 and started offering "360 real estate video tours" to property agents on Facebook. His pitch: "RM300 for a walkthrough video that makes your listing look premium." He sold 8 packages in his first month. Revenue: RM2,400. Gear paid off + RM500 profit.`,
    roiDesc: 'Used RM1,800-2,200. Zamri earned back his investment in under a month. 8 real estate gigs at RM300 each = RM2,400. Profit from day one.',
    pros: ['Unique 360 content no other camera can do', 'Invisible selfie stick effect', 'Reframe after shooting (saves time)', 'Waterproof', 'Great for social media vertical video'],
    cons: ['Stitching required in app', 'Lower quality than traditional action cam', 'Battery heats up quickly', 'Learning curve for editing'],
    usedTip: 'Check lens for scratches (cannot be replaced), test stitching in app, demand original box',
    creatorUses: ['zamri-nasir', 'alif-hakim'],
  },
  {
    slug: 'dji-osmo-action-5-pro-review',
    name: 'DJI Osmo Action 5 Pro',
    category: 'action',
    priceNew: 1999,
    priceUsed: 1400,
    type: 'Action Cam',
    sensor: '1/1.3" CMOS',
    video: '4K 120fps',
    weight: '145g',
    rating: 4.5,
    roiScore: 91,
    level: 'beginner',
    excerpt: 'Better than GoPro for most creators. Front screen for vlogging, excellent stabilization, and way better battery life. Second-hand RM1,200-RM1,600.',
    content: `The DJI Osmo Action 5 Pro is the best action camera for vloggers in 2026. Its dual screens (front + back) make it perfect for talking to camera, and the RockSteady stabilization is incredibly smooth.

**Second-hand market in Malaysia:** You can find Osmo Action 5 Pro units for RM1,200-RM1,600 on Mudah.my, Carousell, or the DJI Malaysia Buy/Sell Facebook group.

**Why choose this over a used DSLR:**
- Front screen means you can see yourself while vlogging
- Built-in stabilization means no gimbal needed
- Waterproof to 20m
- Much easier to carry everywhere
- Less intimidating for street interviews

**Earning with an action cam:**
- RM200-400: A day of B-roll footage for a corporate video
- RM300-500: A week of construction site progress videos
- RM150-300: A single POV cooking or tutorial video
- RM500-1,000/month: Regular content for a gym or sports coach

**The budget mindset:** A used Osmo Action 5 Pro at RM1,400 can be paid off with just 4-5 small gigs. If you do one gig per weekend, that's one month to breakeven.`,
    roiDesc: 'Used RM1,200-1,600. Pays off in 4-5 gigs. Front screen makes vlogging easy. Great entry action cam for Malaysian creators.',
    pros: ['Front + back screens for vlogging', 'Best-in-class stabilization', 'Great battery life', 'Waterproof 20m', 'DJI Mimo app is excellent'],
    cons: ['Smaller sensor than phone', 'Color science not as natural as GoPro', 'Limited in very low light', 'Accessories ecosystem smaller than GoPro'],
    usedTip: 'Check for sticky buttons, test front screen for scratches, ensure USB-C charges properly',
    creatorUses: ['alif-hakim', 'farid-johari'],
  },
  {
    slug: 'dji-mini-4-pro-review-malaysia',
    name: 'DJI Mini 4 Pro',
    category: 'drone',
    priceNew: 3999,
    priceUsed: 2900,
    type: 'Drone < 250g',
    sensor: '1/1.3" 48MP',
    video: '4K 100fps',
    weight: '249g',
    rating: 4.7,
    roiScore: 89,
    level: 'mid',
    excerpt: 'The under-250g gateway drone for creators. Second-hand RM2,500-RM3,200. Real estate, events, weddings — clients pay premium for aerial. Check current CAAM rules.',
    content: `The DJI Mini 4 Pro is the most popular drone for Malaysian content creators, and for good reason. At just 249g it sits in a lighter CAAM class than heavy drones like the Mavic series — fewer hoops to fly. Always check the current CAAM registration and flight rules before you take money for a job.

**Malaysia second-hand market:** RM2,500-RM3,200 on Mudah.my, Carousell, and the DJI Malaysia groups on Facebook. Look for the Fly More Combo which includes extra batteries and a charging hub.

**The earning potential:**
- Real estate aerial photos/video: RM300-600 per property
- Wedding aerial shots: RM500-800 per wedding
- Event coverage (marathons, festivals): RM400-1,000 per event
- Construction progress documentation: RM200-500 per visit
- Resort/hotel promotional content: RM1,000-3,000 per project

**Illustrative story — Amir Shah:** Amir bought a Mini 4 Pro Fly More Combo used for RM2,800. He created a simple Facebook page called "Aerial Views Malaysia" and posted 3 sample videos of his local area. Within 2 weeks, a property developer contacted him to shoot 5 landed properties at RM400 each. He earned RM2,000 in his first month. His parents stopped asking when he'd get a "real job."

**The lighter-class advantage:** The Mini 4 Pro is in the same under-250g class as the Mini 3 Pro — far fewer registration hurdles than a Mavic 3 (which needs CAAM registration and a remote pilot license). For Tim and Ahmad starting out strapped for cash and time, that lighter class is a real advantage — but the rules still apply, so check them.`,
    roiDesc: 'Used RM2,500-3,200. Under-250g class keeps hurdles low. Real estate gigs pay RM300-600 each. Amir paid his off in 6 properties.',
    pros: ['Light under-250g class', 'Omni-directional obstacle sensing', '4K 100fps slow motion', 'Excellent image quality for the size', 'Portable and quiet'],
    cons: ['Wind limits (cannot fly in strong wind)', 'Smaller sensor than Mavic series', 'Battery life ~34min', 'Cannot fly in rain'],
    usedTip: 'Check gimbal for scratches, test all obstacle sensors, demand Fly More Combo for extra batteries',
    creatorUses: ['amir-shah', 'rizuan-mustafa'],
  },
  {
    slug: 'dji-mavic-3-classic-review-malaysia',
    name: 'DJI Mavic 3 Classic',
    category: 'drone',
    priceNew: 7999,
    priceUsed: 5000,
    type: 'Pro Drone',
    sensor: '4/3 CMOS 20MP',
    video: '5.1K 50fps',
    weight: '895g',
    rating: 4.8,
    roiScore: 78,
    level: 'pro',
    excerpt: 'The 4/3 sensor Mavic 3 Classic delivers cinema-grade aerial footage. Used RM4,500-RM5,500. Requires CAAM drone license in Malaysia but the earning potential is RM3,000-8,000/month.',
    content: `The Mavic 3 Classic is for when Tim and Ahmad have outgrown the Mini 4 Pro and are ready for professional aerial cinematography. It has a 4/3 CMOS sensor — the same size as many professional cameras — and shoots 5.1K video with 10-bit color.

**Malaysia second-hand market:** RM4,500-RM5,500 for the drone + RC controller. The Fly More Combo with extra batteries and ND filters goes for RM5,500-RM6,500.

**Important: You need a CAAM drone license** for drones above 250g. This costs about RM500-800 and takes 1-2 months to process. However, the paid work you can get with a Mavic 3 justifies the effort.

**The upgraded earning potential:**
- High-end real estate (condos, luxury homes): RM800-1,500 per property
- Resort promotional videos: RM3,000-8,000 per project
- Construction/infrastructure documentation: RM500-2,000 per visit
- Cinematic wedding films: RM2,000-5,000 per wedding
- Agricultural/plantation surveys: RM1,000-3,000 per session

**When to upgrade from Mini 4 Pro to Mavic 3 Classic:**
- You're booking 5+ aerial gigs per month
- Clients are asking for cinema-grade quality
- You need to shoot in challenging wind conditions
- Your Mini 4 Pro is fully utilized and you have RM5,000 saved

**The ROI reality:** A used Mavic 3 Classic at RM5,000 requires a bigger commitment. At RM1,000 per gig average, you need 5 gigs to break even. If you're already established with a Mini 4 Pro client base, this takes 1-2 months.`,
    roiDesc: 'Used RM4,500-5,500. Pro-level aerial. Requires CAAM license. Big investment but RM1,000+ per gig. Amir upgraded after 2 months of Mini 4 Pro work.',
    pros: ['4/3 sensor = cinema quality', '5.1K 10-bit video', '46min battery life', 'Excellent wind resistance', 'Professional image quality'],
    cons: ['Requires CAAM drone license', 'Heavy (895g)', 'Expensive', 'Larger = more intimidating in public', 'ND filters required for video'],
    usedTip: 'CAAM license required for >250g — factor in RM500-800 cost. Check for gimbal issues common on used units.',
    creatorUses: ['rizuan-mustafa', 'amir-shah'],
  },
  {
    slug: 'canon-eos-r50-review-malaysia',
    name: 'Canon EOS R50',
    category: 'camera',
    priceNew: 3199,
    priceUsed: 2000,
    type: 'Mirrorless APS-C',
    sensor: '24.2MP APS-C CMOS',
    video: '4K 30fps',
    weight: '376g',
    rating: 4.3,
    roiScore: 90,
    level: 'beginner',
    excerpt: 'Canon\'s cheapest mirrorless with modern AF. 4K, flip-out screen, dual-pixel AF. Used RM1,800-RM2,200. Perfect for creators who want that Canon color science.',
    content: `The Canon EOS R50 is Canon's entry-level RF-mount mirrorless camera, and it's an excellent choice for Malaysian creators who prefer Canon's user-friendly interface and beautiful color science.

**Second-hand market in Malaysia:** RM1,800-RM2,200 with the kit 18-45mm lens. This is competitive with the Sony A6100, but some creators prefer Canon's colors and menu system.

**The Canon advantage:**
- Canon's color science gives you beautiful skin tones straight out of camera
- The flip-out fully articulating screen is perfect for self-recording
- Dual Pixel CMOS AF II is excellent for tracking faces
- RF lens mount has growing options (though RF-S lenses are still limited)
- Much easier to use than Sony for beginners

**The RF lens situation in Malaysia:**
RF-S lenses are still limited compared to Sony's E-mount. Your options:
- Kit 18-45mm f/4.5-6.3 (comes with camera) — fine for outdoors
- RF 50mm f/1.8 STM (RM500 new, RM350 used) — excellent portrait lens
- RF-S 11-22mm f/4.5-5.6 — wide angle for vlogging
- RF 35mm f/1.8 Macro (RM1,200 used) — great all-rounder
- RF-EF adapter (RM150 used) — lets you use cheap EF/EF-S lenses

**Earning with the Canon R50:**
- Portrait sessions: RM150-300 per session
- Product photography: RM200-500 per set
- YouTube videos: build your own channel
- Social media content for local businesses: RM300-800/month
- Event photography: RM200-500 per event

Creator story: **Sarah Azman** bought a used Canon R50 with kit lens for RM1,900. She started a TikTok account reviewing local cafes in KL. Within 3 months, she had 15,000 followers and cafes were paying her RM200-400 for a video. She upgraded to a used RF 50mm f/1.8 for RM350 and started offering "aesthetic cafe content" packages.`,
    roiDesc: 'Used RM1,800-2,200. Sarah paid hers off in 6 cafe shoots. Canon colours = less editing time. Great for lifestyle and food creators.',
    pros: ['Beautiful Canon color science', 'Flip-out screen for vlogging', 'Excellent Dual Pixel AF', 'Lightweight and compact', 'Great for beginners'],
    cons: ['Limited RF-S lens selection', 'Kit lens is slow (f/6.3)', 'No IBIS', '4K has slight crop', 'RF lenses more expensive than EF'],
    usedTip: 'Check for kit lens wobble common on 18-45mm, test eye AF in video mode, bring an SD card',
    creatorUses: ['sarah-azman', 'diana-ishak'],
  },
  {
    slug: 'xiaomi-14-ultra-review-malaysia',
    name: 'Xiaomi 14 Ultra',
    category: 'mobile',
    priceNew: 4999,
    priceUsed: 3200,
    type: 'Flagship Smartphone',
    sensor: '1-inch 50MP Main + Leica',
    video: '8K 30fps',
    weight: '224g',
    rating: 4.5,
    roiScore: 90,
    level: 'mid',
    excerpt: 'The 1-inch sensor Xiaomi 14 Ultra with Leica optics is the closest a phone gets to a dedicated camera. RM3,000-3,500 used. One device for everything.',
    content: `The Xiaomi 14 Ultra with its 1-inch Sony sensor and Leica optics is arguably the best camera phone for content creators who want a single-device solution. That 1-inch sensor is physically larger than what's in most point-and-shoot cameras and even some older DSLRs.

**Malaysia second-hand market:** RM3,000-RM3,500 in good condition. Many early adopters upgrade quickly, so you can find well-maintained units on Mudah.my and Carousell.

**The 1-inch sensor advantage:**
Significantly better low-light performance than any other phone
Natural depth-of-field (background blur) without portrait mode
Leica color profiles (Vibrant and Natural) save editing time
Ultra-wide, 3.2x and 5x optical zoom — versatile creative options

**Photography kit in your pocket:**
- 23mm f/1.6 main (1-inch sensor)
- 12mm f/2.2 ultra-wide
- 75mm f/1.8 3.2x telephoto
- 120mm f/2.5 5x periscope

**Earning with just a Xiaomi 14 Ultra:**
- Social media content creation: RM500-1,500/month retainer
- Product photography for e-commerce: RM200-500 per set
- Street photography/content for brands: RM300-800 per project
- Food photography for restaurants: RM200-400 per session
- Backup/second camera for events: RM150-300 per event

**For Tim and Ahmad who need versatility:** If you can only afford ONE device, the Xiaomi 14 Ultra is the best Swiss Army knife. Camera, phone, editing device, upload device — all in one. The Leica partnership means your photos have a distinctive look that stands out on social media.`,
    roiDesc: 'Used RM3,000-3,500. One device does everything. 1-inch Leica sensor rivals dedicated cameras. Great single-device solution.',
    pros: ['1-inch sensor best-in-class for phone', 'Leica optics and color science', '5x optical zoom', 'Excellent low-light', 'Charges and edits in one device'],
    cons: ['MIUI software still has bloatware', 'No eSIM on some Malaysia units', 'Heavy compared to other phones', 'Video stabilization not as good as iPhone', 'Resale value drops fast'],
    usedTip: 'Check for MIUI account lock, inspect Leica lens glass for scratches, test all 4 cameras',
    creatorUses: ['tim-rahman', 'aina-syazwani'],
  },
  {
    slug: 'sony-zv-e10-review-malaysia-second-hand',
    name: 'Sony ZV-E10',
    category: 'camera',
    priceNew: 2899,
    priceUsed: 1800,
    type: 'Vlogging Mirrorless',
    sensor: '24.2MP APS-C CMOS',
    video: '4K 30fps',
    weight: '343g',
    rating: 4.6,
    roiScore: 94,
    level: 'beginner',
    excerpt: 'The Sony ZV-E10 is built specifically for vloggers and content creators. Product showcase mode, background defocus button, and directional mic. Used RM1,600-RM2,000.',
    content: `The Sony ZV-E10 is literally designed for what Tim and Ahmad want to do: create content for social media and YouTube. It takes everything great about the Sony A6100 and adds creator-specific features.

**What makes it a creator camera:**
- **Product Showcase Mode:** The camera instantly focuses on an object you hold up — perfect for reviews and unboxing
- **Background Defocus Button:** One press to blur the background (no manual settings needed)
- **Directional Mic:** Built-in microphone that focuses on what's in front of the camera
- **Flip-out Screen:** Full articulation for self-recording
- **Tall Recording Light:** Red dot on the front so you know you're recording

**Second-hand in Malaysia:** RM1,600-RM2,000 with kit 16-50mm lens. This is the same price range as the A6100 but with creator-specific features.

**The RM2,000 complete starter kit:**
- ZV-E10 used with kit lens: RM1,800
- Generic lapel mic: RM50
- Tripod: RM40
- LED panel (small): RM60
- Extra battery: RM30
**Total: RM1,980**

**Earning potential with the ZV-E10:**
- YouTube product reviews: build your channel, monetize at 1,000 subs
- E-commerce product videos: RM150-400 per video
- Social media content for brands: RM300-600 per month retainer
- Tutorial/educational content: RM200-500 per video
- Unboxing videos (brands send you free products): free products + RM100-300

Creator case study: **Diana Ishak** bought a used ZV-E10 for RM1,700 and started a YouTube channel reviewing affordable skincare available at Watsons and Guardian. Her Product Showcase Mode made her reviews look professional. At 5 months and 8,000 subscribers, brands started sending her products. By month 8, she was earning RM1,500-2,000/month from Google AdSense and sponsorships. Total investment: RM1,700.`,
    roiDesc: 'Used RM1,600-2,000. Built for content creators. Product Showcase Mode is magic for reviews. Diana paid hers off in 3 brand deals.',
    pros: ['Built for content creators specifically', 'Product Showcase Mode is incredible for reviews', 'Background defocus button', 'Directional mic included', 'Flip-out screen', 'Great starter price used'],
    cons: ['No viewfinder', 'Plastic build', 'No IBIS', '4K 30fps limit (no 60fps)', 'Battery life average'],
    usedTip: 'Test Product Showcase Mode, check the directional mic for wind damage, ensure flip screen hinge is tight',
    creatorUses: ['diana-ishak', 'fikri-haron'],
  },
  {
    slug: 'gopro-hero-13-review-malaysia',
    name: 'GoPro Hero 13',
    category: 'action',
    priceNew: 2399,
    priceUsed: 1500,
    type: 'Action Cam',
    sensor: '1/1.9" 27MP',
    video: '5.3K 60fps',
    weight: '154g',
    rating: 4.3,
    roiScore: 86,
    level: 'beginner',
    excerpt: 'GoPro is still the king of action cam ecosystem. Used RM1,300-RM1,700. If your content involves movement, water, or adventure, this is your tool.',
    content: `The GoPro Hero 13 is the latest action camera from GoPro, and while it's an iterative update, it's still the most versatile action camera ecosystem available.

**Malaysia second-hand market:** RM1,300-RM1,700 on Mudah.my and Carousell. The HB-series lenses from Hero 12 are compatible, and the Max Lens Mod 2.0 gives you 177° field of view.

**The GoPro ecosystem advantage:**
- The mounts ecosystem is unmatched — chest mounts, helmet mounts, suction cups, clamp mounts
- Over 40 different mounting accessories available at Shopee/Lazada
- Waterproof to 10m without housing
- HyperSmooth 6.0 stabilization is incredibly smooth
- Built-in mounting fingers (no cage needed)

**Content ideas for GoPro:**
- POV cooking videos (ceiling mount or chest mount)
- Dance practice/cover videos (tripod or chest mount)
- Water park/pool content (waterproof)
- Gym workout videos (tripod or chest mount)
- Motorcycle/cycling content
- Behind-the-scenes of photo shoots

**Earning with a GoPro:**
- RM200-400: A day of POV content for a dance studio or gym
- RM300-500: A week of construction progress POV
- RM150-300: A single cooking tutorial POV
- RM100-200: B-roll footage for corporate videos
- RM400-800/month: Regular content for a gym or dance studio

**The "mounted camera" advantage:** A GoPro on a chest mount or head mount lets you shoot hands-free content that looks immersive. This is content that's hard to create with a phone or DSLR — giving you a unique selling point.`,
    roiDesc: 'Used RM1,300-1,700. Best mount ecosystem. Great for POV, dance, and action content. Farid paid his off in 3 POV brand videos.',
    pros: ['Best action cam ecosystem', 'HyperSmooth 6.0 stabilization', 'Waterproof 10m', 'Huge mount selection on Shopee/Lazada', 'Built-in mounting'],
    cons: ['Small sensor struggles in low light', 'Battery life ~60min recording', 'Expensive new', 'GoPro subscription is pushed aggressively', 'Minor upgrade from Hero 12'],
    usedTip: 'Check for overheating (record 4K for 20min), inspect lens for scratches, ensure Bluetooth/WiFi works',
    creatorUses: ['farid-johari', 'zamri-nasir'],
  },
  {
    slug: 'iphone-16-pro-content-creation-malaysia',
    name: 'iPhone 16 Pro',
    category: 'mobile',
    priceNew: 5499,
    priceUsed: 4500,
    type: 'Flagship Smartphone',
    sensor: '48MP Main + 48MP UW + 12MP 5x Tele',
    video: '4K 120fps Dolby Vision',
    weight: '199g',
    rating: 4.6,
    roiScore: 93,
    level: 'mid',
    excerpt: 'The most popular creator phone in Malaysia right now. 4K 120fps, 5x telephoto, and ProRes make it a serious camera replacement. Used RM4,200-4,800.',
    content: `The iPhone 16 Pro is the phone most Malaysian creators actually want, and for good reason: it is the most complete video tool in a pocket. 4K 120fps slow-motion, a 48MP ultra-wide, a 5x telephoto, and Apple Log for colour grading — none of the previous iPhones could do all of this.

**Malaysia market:** RM5,499 new, RM4,200-4,800 used on Mudah.my and Carousell. Most units still have >90% battery health.

**Why creators pick it:**
- 4K 120fps is a genuine superpower — dramatic slow-mo B-roll with zero effort
- Apple Log gives you proper colour grading (a real edge over Android)
- The new Camera Control button makes framing fast
- Microphone recording on the phone itself is shockingly good for run-and-gun

**The creator setup:**
- iPhone 16 Pro + RM50 lapel mic + RM40 tripod = under RM5,000 done
- CapCut Pro or Final Cut on the phone for editing
- USB-C lets you record straight to an SSD for long gigs

**Earning with it:**
- Social media content retainer: RM800-2,000/month
- Event coverage (as a photo/video phone shooter): RM300-600 per event
- Food & cafe content: RM200-500 per session
- The camera clients think "isn't a real camera" — your work changes their mind

**The honest catch:** If you already own an iPhone 15 Pro, skip the 16 Pro and buy a mic and a light instead. The jump from 15 Pro to 16 Pro is nice, not essential.`,
    roiDesc: 'Used RM4,200-4,800. Aina paid hers off in 2 content retainers at RM1,000/month. The most complete creator phone money can buy.',
    pros: ['4K 120fps slow motion', 'Apple Log colour grading', '5x telephoto + 48MP ultra-wide', 'Best video stabilisation in a phone', 'USB-C with ProRes support'],
    cons: ['Expensive even used', 'No optical beyond 5x', 'Battery drains fast recording 4K 120', 'Storage fills up fast with ProRes'],
    usedTip: 'Check battery health (>90%), confirm Apple ID is signed out, test the 5x lens for dust in the glass',
    creatorUses: ['aina-syazwani', 'tim-rahman'],
  },
  {
    slug: 'samsung-galaxy-s25-ultra-review-malaysia',
    name: 'Samsung Galaxy S25 Ultra',
    category: 'mobile',
    priceNew: 6499,
    priceUsed: 5000,
    type: 'Flagship Smartphone',
    sensor: '200MP Main + 50MP 5x Tele',
    video: '8K 30fps',
    weight: '218g',
    rating: 4.5,
    roiScore: 90,
    level: 'mid',
    excerpt: 'The 200MP beast with a built-in S Pen. Best zoom range of any phone — 3x, 5x, and 10x optical. Used RM4,600-5,400. The do-everything creator phone for Android lovers.',
    content: `The Galaxy S25 Ultra is the Android flagship for creators who want maximum flexibility. Its 200MP main sensor gives you 2x and 4x "lossless" zoom straight off the sensor, and the dedicated 3x, 5x, and 10x telephoto lenses mean you can shoot anything from wide vlogs to distant candids without moving.

**Malaysia market:** RM6,499 new, RM4,600-5,400 used. Because new Samsungs drop fast, used flagships are incredible value in Malaysia.

**The 200MP advantage:**
- Crop deep into a 200MP photo and still print/sell it
- 2x lossless zoom is perfect for product close-ups
- 10x optical zoom for events — shoot from the back row
- 8K 30fps video for clients who want "the future"

**Why Android creators pick it:**
- The S Pen is a remote shutter — set the phone down and pose
- Expert RAW mode gives full manual control
- DeX mode turns the phone into an editing desktop
- Samsung's Super HDR handles harsh Malaysian noon sun well

**Earning with it:**
- Event photography from the crowd: RM300-600 per event
- Product close-ups for e-commerce: RM150-400 per session
- Vlogs with 10x reach no compact camera can match
- 8K footage sells to wedding/corporate clients as premium

**The honest catch:** Video stabilisation trails the iPhone 16 Pro, and the S25 Ultra is heavy. If you shoot mostly handheld video, test it before committing.`,
    roiDesc: 'Used RM4,600-5,400. Fikri shot 3 corporate events at RM500 each and the phone was 1/3 paid. The zoom range alone beats most compacts.',
    pros: ['10x optical zoom range', '200MP with lossless 2x/4x crop', 'S Pen as remote shutter', '8K 30fps video', 'Great HDR in harsh sunlight'],
    cons: ['Video stabilisation trails iPhone', 'Heavy at 218g', 'Battery drains on 8K', 'Samsung value drops fast new'],
    usedTip: 'Check for screen burn-in, test all four rear cameras, confirm Knox/FRP lock is cleared',
    creatorUses: ['alif-hakim', 'farid-johari'],
  },
  {
    slug: 'google-pixel-9-pro-review-malaysia',
    name: 'Google Pixel 9 Pro',
    category: 'mobile',
    priceNew: 5499,
    priceUsed: 4200,
    type: 'Flagship Smartphone',
    sensor: '50MP Main + 48MP UW + 48MP 5x',
    video: '4K 60fps HDR',
    weight: '199g',
    rating: 4.4,
    roiScore: 88,
    level: 'mid',
    excerpt: 'The Pixel 9 Pro is the computational photography king. Its AI editing tools delete tourists, sharpen blurry faces, and fix lighting — magic for solo creators. Used RM3,900-4,500.',
    content: `The Pixel 9 Pro is not the best video camera phone. It is the best photo phone — and the smartest. Google's computational photography produces clean, natural images with zero editing, and the AI tools save creators hours they would have spent in post.

**Malaysia market:** RM5,499 new, RM3,900-4,500 used. Google's official launch in Malaysia is limited, so most units come through trusted resellers — check warranty carefully.

**What makes it special:**
- Magic Editor: remove background people, objects, and cables in seconds
- Best-in-class low light for stills — shoot the mamak at night
- Real Tone keeps skin tones honest across all skin shades
- Video Boost processes footage in the cloud for stabilised, graded clips
- The AI first edits mean a phone-only creator looks like they have a team

**The creator workflow:**
- Shoot photos on the Pixel, edit with Magic Editor on the same phone
- Video for social: 4K 60fps with excellent stabilisation
- Best paired with a phone gimbal for walk-and-talk content

**Earning with it:**
- Product & food photography that needs zero retouch: RM200-500/session
- Instagram-heavy brands value the natural look: RM500-1,000/month
- Event candids where speed matters: RM200-400 per event
- The AI edits sell themselves in previews

**The honest catch:** Video is only "very good," not best-in-class, and the Malaysian used market is thin. If you shoot 90% photos, this is the best phone for the job.`,
    roiDesc: 'Used RM3,900-4,500. Sarah shot 5 food sessions at RM250 each — paid off in under a month. The AI editing saves hours weekly.',
    pros: ['Best photo computational AI', 'Magic Editor deletes/edit anything', 'Excellent low-light stills', 'Natural colour science', 'Long software support'],
    cons: ['Video not best-in-class', 'Thin Malaysian used market', 'Limited official warranty here', 'No raw flagship zoom beyond 5x'],
    usedTip: 'Verify IMEI is clean and warranty transferable, check for a blocked bootloader, test Magic Editor before buying',
    creatorUses: ['diana-ishak'],
  },
  {
    slug: 'xiaomi-15-ultra-review-malaysia',
    name: 'Xiaomi 15 Ultra',
    category: 'mobile',
    priceNew: 5199,
    priceUsed: 3900,
    type: 'Flagship Smartphone',
    sensor: '1-inch 50MP Main + Leica + 200MP 4.3x',
    video: '8K 30fps',
    weight: '226g',
    rating: 4.5,
    roiScore: 91,
    level: 'mid',
    excerpt: 'The successor to the 14 Ultra — 1-inch Leica sensor, now with a 200MP periscope that keeps the 14 Ultra\'s killer look. Used RM3,600-4,200. The photographer\'s phone.',
    content: `The Xiaomi 15 Ultra takes everything the 14 Ultra did — the huge 1-inch Leica main sensor — and adds a 200MP 4.3x periscope. That combination means a true 1-inch sensor with real telephoto range, all in a phone.

**Malaysia market:** RM5,199 new, RM3,600-4,200 used. Same great-value used situation as the 14 Ultra — early adopters upgrade fast.

**What it does better than the 14 Ultra:**
- The 200MP periscope replaces the old 5x — sharper long zoom
- Faster main lens (f/1.63) for even better low light
- New Leica photo styles are beautiful straight out of camera
- Same superb manual camera app (a real camera interface, not a gimmick)

**The photography-kit-in-pocket pitch:**
- 23mm f/1.63 1-inch main = your "35mm"
- 14mm ultra-wide = your wide vlog lens
- 70mm + 200MP 4.3x = portraits and reach
- All of it shoots 8K 30fps video

**Earning with it:**
- Product photography with real depth of field: RM200-500/session
- Street and food content with Leica colour: RM200-400 per session
- Content retainer for a single device: RM500-1,200/month
- Backup/second shooter camera for events: RM150-300 per event

**The honest catch:** Video stabilisation is improved but still trails the iPhone, and HyperOS has more bloatware than stock Android. For stills-heavy creators it is the best value flagship in Malaysia.`,
    roiDesc: 'Used RM3,600-4,200. Tim shot 4 product sets at RM300 each — camera fully paid in 2 weekends. Leica look sells.',
    pros: ['1-inch Leica main sensor', '200MP 4.3x periscope', 'Excellent low-light', 'Real manual camera app', 'Great used value'],
    cons: ['Video stabilisation trails iPhone', 'Heavy at 226g', 'HyperOS bloatware', 'Warranty reseller-only'],
    usedTip: 'Check the Leica glass for scratches, test all 4 rear cameras, verify no MIUI account lock',
    creatorUses: ['tim-rahman'],
  },
  {
    slug: 'sony-zv-e10-ii-review-malaysia',
    name: 'Sony ZV-E10 II',
    category: 'camera',
    priceNew: 3699,
    priceUsed: 2800,
    type: 'Vlogging Mirrorless',
    sensor: '26MP APS-C BSI CMOS',
    video: '4K 60fps (6K oversampled)',
    weight: '377g',
    rating: 4.7,
    roiScore: 95,
    level: 'beginner',
    excerpt: 'The upgraded king of creator cameras. New 26MP sensor, 4K 60fps, bigger battery, and the same Product Showcase Mode that made the original famous. Used RM2,600-3,000.',
    content: `The Sony ZV-E10 II fixes everything creators complained about in the original ZV-E10: the battery, the sensor, and the frame rates. It is now the single best value creator camera in Malaysia for talking-head, review, and vlog content.

**What's new over the original:**
- 26MP BSI sensor — noticeably better low light and detail
- 4K 60fps (6K oversampled) — crisp, true-to-colour footage
- Bigger NP-FZ100 battery — a full day of shooting
- 10-bit 4:2:2 colour for serious grading
- Same beloved Product Showcase Mode and defocus button

**Malaysia market:** RM3,699 new, RM2,600-3,000 used. Since the original ZV-E10 dropped to ~RM1,600 used, the upgrade only makes sense if you earn from video.

**The creator setup:**
- ZV-E10 II used: RM2,800
- Kit 16-50mm (included) or Sigma 16mm f/1.4 for vlogs: RM800 used
- Lapel mic + tripod: RM100
- Total: under RM3,700 for a real production camera

**Earning with it:**
- Product reviews and unboxings: RM200-500 per video
- Brand social media retainer: RM800-1,500/month
- Talking-head courses and tutorials: RM300-800 per video
- The Product Showcase Mode is a sales tool on camera — it impresses clients

**The honest catch:** Still no viewfinder, and 4K 60fps needs a good SD card. If you mainly shoot photos, an A6100 or A6700 serves you better. For video, this is the one.`,
    roiDesc: 'Used RM2,600-3,000. Diana upgraded and paid it off in 3 brand retainers at RM1,000/month. The best creator camera money can buy in 2026.',
    pros: ['4K 60fps 6K-oversampled', 'Product Showcase Mode', '26MP BSI sensor', 'Bigger battery (FZ100)', '10-bit colour'],
    cons: ['No viewfinder', 'No IBIS', '4K 60 needs fast SD card', 'Plastic build'],
    usedTip: 'Test Product Showcase Mode, check the flip screen hinge, shoot 4K 60 for 10min to check overheating',
    creatorUses: ['diana-ishak', 'sarah-azman'],
  },
  {
    slug: 'dji-osmo-pocket-3-review-malaysia',
    name: 'DJI Osmo Pocket 3',
    category: 'action',
    priceNew: 2399,
    priceUsed: 1900,
    type: 'Pocket Gimbal Cam',
    sensor: '1-inch CMOS',
    video: '4K 120fps',
    weight: '179g',
    rating: 4.8,
    roiScore: 94,
    level: 'beginner',
    excerpt: 'The 1-inch pocket gimbal camera that made vlogging effortless. Built-in stabiliser, rotating screen, and 4K 120fps. Used RM1,700-2,100. The most fun gear on this site.',
    content: `The DJI Osmo Pocket 3 is the camera everyone wants to borrow. A 1-inch sensor on a motorised gimbal the size of a lipstick — you press record, it floats, and your footage looks like you hired a cameraman. It is the fastest path to "pro-looking" content in Malaysia.

**Malaysia market:** RM2,399 new, RM1,700-2,100 used. Units sell fast on Mudah.my and Carousell because it is genuinely useful — people upgrade to the Creator Combo.

**Why it is a game changer:**
- Built-in 3-axis gimbal — zero learning curve, zero tripod needed for walking shots
- 1-inch sensor beats every action cam for image quality
- Rotating touchscreen flips to selfie mode instantly
- ActiveTrack follows you while you move (walking vlogs with zero effort)
- 4K 120fps slow motion, and it fits in a pocket

**The creator setup:**
- Osmo Pocket 3 + RM50 lapel mic = a walking broadcast kit
- Great with the DJI Mimo app for quick edits on the phone
- Pair with a mini tripod base for tabletop interviews

**Earning with it:**
- Walking food tours and cafe content: RM300-600 per session
- Corporate "office tour" videos: RM400-800 per video
- Event B-roll that looks gimbal-shot: RM300-500 per event
- Vlogs — it makes posting daily actually fun

**The honest catch:** You can't change lenses, low light is good-not-great, and the built-in mic needs the wireless mic to be perfect. But for 90% of creators, this replaces three other devices.`,
    roiDesc: 'Used RM1,700-2,100. Sarah paid hers off in 4 cafe content sessions. The single most fun, most-used creator gadget in Malaysia.',
    pros: ['Built-in 3-axis gimbal', '1-inch sensor quality', 'Rotating selfie screen', 'ActiveTrack follow mode', 'Fits in a pocket'],
    cons: ['Fixed lens, no zoom to speak of', 'Average low-light', 'Needs wireless mic for best audio', 'Small screen in bright sun'],
    usedTip: 'Test the gimbal motor on all axes, check the rotating screen for cracks, ensure it records 4K without overheating',
    creatorUses: ['sarah-azman', 'zamri-nasir'],
  },
  {
    slug: 'insta360-ace-pro-2-review-malaysia',
    name: 'Insta360 Ace Pro 2',
    category: 'action',
    priceNew: 2399,
    priceUsed: 1900,
    type: 'Action Cam',
    sensor: '1/1.3" 8K CMOS + Leica',
    video: '8K 30fps',
    weight: '177g',
    rating: 4.6,
    roiScore: 92,
    level: 'mid',
    excerpt: 'The 8K Leica action cam with a flip-up screen. Best-in-class video quality for action, plus AI editing in the app. Used RM1,700-2,100.',
    content: `The Insta360 Ace Pro 2 is the action camera for creators who want image quality, not just toughness. It uses a 1/1.3-inch 8K sensor tuned with Leica, and it is the first action cam with a flip-up touchscreen — you can actually frame yourself properly.

**Malaysia market:** RM2,399 new, RM1,700-2,100 used. It is the main rival to the GoPro Hero 13/14 and DJI Osmo Action series.

**Why creators pick it:**
- 8K 30fps video — the highest quality of any action cam here
- Flip-up screen for vlogging (the original Ace Pro's killer feature)
- Leica colour profiles look cinematic straight out of camera
- AI editing in the Insta360 app turns raw clips into finished reels
- PureVideo mode is genuinely good in low light — rare for an action cam

**Earning with it:**
- POV content for workshops, gyms, and delivery riders: RM200-500 per video
- Construction and site documentation: RM300-600 per visit
- Travel and adventure reels with AI edits: RM300-800 per project
- Content retainers for businesses with physical work: RM500-1,000/month

**The honest catch:** It is chunkier than a GoPro, and 8K files eat storage and batteries. If you want 360 or the reframe magic, get the Insta360 X4 instead — this is for classic action-cam shooting.`,
    roiDesc: 'Used RM1,700-2,100. Zamri shot 5 POV workshop videos at RM350 each — paid off in 2 weeks. 8K Leica sells.',
    pros: ['8K 30fps video', 'Flip-up screen for vlogging', 'Leica colour science', 'AI editing in app', 'Good low-light for an action cam'],
    cons: ['Bulky vs GoPro', '8K drains battery and storage fast', 'No 360 mode', 'Accessories cost more than GoPro'],
    usedTip: 'Test the flip screen hinge, record 8K for 10min to check thermals, inspect the Leica lens for scratches',
    creatorUses: ['zamri-nasir'],
  },
  {
    slug: 'panasonic-lumix-s9-review-malaysia',
    name: 'Panasonic Lumix S9',
    category: 'camera',
    priceNew: 5799,
    priceUsed: 4500,
    type: 'Full-Frame Mirrorless',
    sensor: '24.2MP Full-Frame CMOS',
    video: '6K 30fps / 4K 60fps',
    weight: '403g',
    rating: 4.4,
    roiScore: 85,
    level: 'mid',
    excerpt: 'The smallest full-frame camera for creators — 403g, L-mount, and real-time LUTs baked into the camera for that film look. Used RM4,200-4,800.',
    content: `The Panasonic Lumix S9 is the tiny full-frame camera that gives creators the "film look" without a colourist. It has real-time LUT support — you load a colour profile and the camera grades your footage as you shoot. No editing, just vibes.

**Malaysia market:** RM5,799 new, RM4,200-4,800 used. It is a niche pick — but exactly the right niche for style-driven creators.

**What makes it special:**
- Smallest full-frame body with a viewfinder-less design — 403g with a real sensor
- Real-time LUTs: load a film LUT and the JPEG/video is pre-graded
- 6K open-gate for vertical-plus-horizontal framing from one take
- 5-axis IBIS for smooth handheld work
- L-mount lets you use Leica, Sigma, and Panasonic lenses

**Earning with it:**
- The film look wins brand deals for fashion and lifestyle: RM500-1,000/month
- Event and portrait work with the LUT look: RM300-600 per session
- Content for brands that want "cinematic": RM800-1,500 per project
- It impresses — clients see the footage and immediately pay for more

**The honest catch:** Single SD slot, no viewfinder, and L-mount lenses are pricier than E-mount or RF-S. If you want the film look without the editing time, this is unique. For pure value, the ZV-E10 II or A6700 beats it.`,
    roiDesc: 'Used RM4,200-4,800. Diana booked 2 fashion retainers at RM1,000/month after clients saw the LUT look. Niche but profitable.',
    pros: ['Smallest full-frame body', 'Real-time LUT film looks', '6K open-gate video', '5-axis IBIS', 'L-mount lens range'],
    cons: ['Single SD slot', 'No viewfinder', 'Pricier lenses', 'Niche — hard to resell fast'],
    usedTip: 'Test the IBIS in video mode, check LUT import works, inspect sensor for dust on a white-wall test shot',
    creatorUses: ['diana-ishak'],
  },
  {
    slug: 'sony-a6700-review-malaysia',
    name: 'Sony A6700',
    category: 'camera',
    priceNew: 6199,
    priceUsed: 4700,
    type: 'Mirrorless APS-C',
    sensor: '26MP APS-C BSI CMOS',
    video: '4K 120fps / 6K oversampled',
    weight: '493g',
    rating: 4.7,
    roiScore: 88,
    level: 'mid',
    excerpt: 'The hybrid king — Sony\'s best APS-C camera with the new AI autofocus chip, 4K 120fps, and IBIS. Used RM4,400-5,000. For creators who shoot both photos and video for money.',
    content: `The Sony A6700 is what you buy when you have outgrown the A6100 and want one camera that does everything: stills, video, low light, and speed. It has the same AI autofocus chip as Sony's pro full-frames and adds 4K 120fps and in-body stabilisation.

**Malaysia market:** RM6,199 new, RM4,400-5,000 used. The used market is healthy because it is the natural upgrade path from the A6100/ZV-E10.

**Why it is the hybrid king:**
- New AI autofocus — recognises humans, animals, birds, cars, and more
- 4K 120fps slow motion from a 6K oversampled readout
- 5-axis IBIS that actually works handheld
- 26MP BSI sensor — clean files in low light
- Weather-sealed build for Malaysian humidity

**The creator setup:**
- A6700 body used: RM4,700
- Sigma 18-50mm f/2.8 (the do-everything lens): RM1,200 used
- Or the Sigma 16mm f/1.4 for vlogs: RM800 used
- It takes every E-mount lens — your A6100 glass still works

**Earning with it:**
- Wedding second shooter: RM300-600 per event
- Corporate and event coverage: RM400-800 per event
- Hybrid photo+video retainers: RM1,000-2,000/month
- It is the camera clients take seriously at a shoot

**The honest catch:** The menu is still classic Sony fiddly, and at this price you are close to used full-frame territory. But for hybrid creator work, the A6700's AF and 4K 120 are worth it.`,
    roiDesc: 'Used RM4,400-5,000. Fikri paid his off in 3 hybrid retainers at RM1,500/month. The one-camera-does-everything upgrade.',
    pros: ['AI autofocus (animals, birds, cars)', '4K 120fps slow motion', '5-axis IBIS', '26MP BSI sensor', 'Full E-mount lens range'],
    cons: ['Fiddly Sony menus', 'Pricier than A6100', 'Overheats on long 4K 120 takes', 'Close to used full-frame money'],
    usedTip: 'Test the AI AF on people and pets, record 4K 120 for 15min to check thermals, inspect the sensor on a white wall',
    creatorUses: ['fikri-haron', 'alif-hakim'],
  },
  {
    slug: 'nikon-z50-ii-review-malaysia',
    name: 'Nikon Z50 II',
    category: 'camera',
    priceNew: 4099,
    priceUsed: 3200,
    type: 'Mirrorless APS-C',
    sensor: '20.9MP APS-C CMOS',
    video: '4K 60fps',
    weight: '495g',
    rating: 4.5,
    roiScore: 90,
    level: 'beginner',
    excerpt: 'Nikon\'s modern creator camera — same colour science as the famous Z series, now with 4K 60fps, a flippy screen, and a colour-everyone-loves look. Used RM2,900-3,400.',
    content: `The Nikon Z50 II is Nikon's answer to creators who want that warm, natural Nikon colour straight out of camera. It takes the friendly Z50 body and adds 4K 60fps, a fully articulating screen, and Nikon's improved subject detection.

**Malaysia market:** RM4,099 new, RM2,900-3,400 used. Nikon's used market in Malaysia is smaller than Sony's, so units hold value and sell fast.

**Why creators like it:**
- Nikon's signature colour science — skin tones and food look great with zero editing
- 4K 60fps video (the Z50 II's big upgrade)
- Flip-out screen for self-recording
- Improved subject-detection AF (people, pets)
- Comfortable, weather-resistant build that survives daily carry

**The creator setup:**
- Z50 II used: RM3,200
- Kit 16-50mm (included) — small and sharp
- Nikon 24mm f/1.7 DX (affordable prime): RM600 used
- Z-mount lets you adapt old F-mount lenses cheaply with the FTZ adapter

**Earning with it:**
- Food and lifestyle content with the Nikon look: RM300-600 per session
- Portrait and family sessions: RM200-400 per session
- Social media retainers for local brands: RM500-1,200/month
- A colour science that cuts your editing time in half

**The honest catch:** Z-mount DX lenses are still limited compared to Sony E-mount, and 20.9MP is lower than rivals. For shoot-and-post creators who value colour, it is a joy.`,
    roiDesc: 'Used RM2,900-3,400. Aiman shot 6 food sessions at RM350 each — paid off in 3 weeks. Nikon colour sells itself.',
    pros: ['Nikon colour science', '4K 60fps video', 'Flip-out screen', 'Improved subject AF', 'Comfortable build'],
    cons: ['Limited DX Z-mount lenses', '20.9MP lower than rivals', 'No IBIS', 'Smaller used market'],
    usedTip: 'Test subject tracking on people, check the flip screen hinge, bring an SD card and shoot 4K 60 for 10min',
    creatorUses: ['aiman-roslan'],
  },
  {
    slug: 'canon-eos-r8-review-malaysia',
    name: 'Canon EOS R8',
    category: 'camera',
    priceNew: 7999,
    priceUsed: 5800,
    type: 'Full-Frame Mirrorless',
    sensor: '24.2MP Full-Frame CMOS',
    video: '4K 60fps 6K-oversampled',
    weight: '461g',
    rating: 4.6,
    roiScore: 84,
    level: 'pro',
    excerpt: 'The cheapest way into Canon full-frame. Same sensor as the R6 II, 4K 60fps, and Canon\'s beautiful colour. Used RM5,400-6,200. The pro leap for serious gig shooters.',
    content: `The Canon EOS R8 is a full-frame camera at a crop-camera price — the cheapest path to the sensor that makes low light easy and client work look expensive. It uses the same 24.2MP sensor as the R6 Mark II.

**Malaysia market:** RM7,999 new, RM5,400-6,200 used. Full-frame used market in Malaysia is active, especially around wedding season.

**Why the jump to full-frame:**
- Low light that lets you shoot dark event halls without fear
- Shallow depth of field your crop camera can only fake
- 4K 60fps from a 6K-oversampled readout — crisp, detailed footage
- Canon's Dual Pixel AF II with eye tracking
- 461g — a full-frame camera you can actually carry all day

**Earning with it:**
- Wedding lead or second shooter: RM800-2,500 per wedding
- Event coverage in low light: RM400-800 per event
- Portrait sessions with buttery backgrounds: RM250-500 per session
- Full-frame credibility impresses corporate clients

**The honest catch:** Single SD slot, no IBIS, and RF full-frame lenses are pricey. If events and portraits are your money makers, the leap is worth every ringgit. For phone-first beginners, it is overkill.`,
    roiDesc: 'Used RM5,400-6,200. Rizuan paid his off in 2 weddings at RM1,500 each. The cheapest true pro upgrade in Malaysia.',
    pros: ['Full-frame sensor at crop price', '4K 60fps 6K-oversampled', 'Dual Pixel AF II', 'Great low light', 'Light for full-frame'],
    cons: ['Single SD slot', 'No IBIS', 'Pricier RF lenses', 'Battery life modest'],
    usedTip: 'Test AF eye tracking, check for overheating after 20min 4K, verify shutter count under 100k',
    creatorUses: ['rizuan-mustafa'],
  },
  {
    slug: 'dji-mavic-4-review-malaysia',
    name: 'DJI Mavic 4',
    category: 'drone',
    priceNew: 12499,
    priceUsed: 9000,
    type: 'Pro Drone',
    sensor: '4/3 CMOS 20MP Hasselblad',
    video: '6K 30fps',
    weight: '1110g',
    rating: 4.8,
    roiScore: 80,
    level: 'pro',
    excerpt: 'DJI\'s flagship with a Hasselblad 4/3 sensor and 6K video. The Mavic 4 is what serious aerial clients pay for. Used RM8,500-9,500. Requires a CAAM drone license.',
    content: `The DJI Mavic 4 is the flagship you hire when a client says "cinema aerial." It pairs a Hasselblad 4/3 sensor with 6K video and DJI's most advanced flight systems. If you are already earning from a Mini or Air, the Mavic 4 is the upgrade that unlocks premium clients.

**Malaysia market:** RM12,499 new, RM8,500-9,500 used with the Fly More kit. Above 250g, so you need a CAAM drone license (RM500-800, 1-2 months).

**Why pros pick it:**
- 4/3 Hasselblad sensor — the same size as professional cameras
- 6K 30fps with 10-bit colour and rich dynamic range
- Dual-camera setup: main sensor plus a medium-tele lens
- 54-minute max flight time with intelligent batteries
- Omnidirectional obstacle sensing and active tracking

**Earning with it:**
- High-end resort and property films: RM3,000-8,000 per project
- Luxury real estate aerials: RM1,000-2,000 per property
- Construction and infrastructure documentation: RM800-2,000 per visit
- Cinematic wedding films: RM2,500-5,000 per wedding

**The honest catch:** It is a serious investment and a license requirement. Do not buy the Mavic 4 until the Mini or Air is fully booked and clients are asking for cinema quality. Then it pays for itself fast.`,
    roiDesc: 'Used RM8,500-9,500. Amir landed 2 resort projects at RM4,000 each — fully paid in one month. The premium-tier aerial workhorse.',
    pros: ['4/3 Hasselblad sensor', '6K 10-bit video', 'Dual cameras (main + tele)', '54min flight time', 'Omnidirectional sensing'],
    cons: ['Expensive', 'Requires CAAM license', 'Heavy at 1110g', 'Overkill for beginners'],
    usedTip: 'Requires CAAM license — budget RM500-800. Check gimbal and prop arms, verify flight log and no crash history',
    creatorUses: ['rizuan-mustafa', 'amir-shah'],
  },
  {
    slug: 'dji-air-3s-review-malaysia',
    name: 'DJI Air 3S',
    category: 'drone',
    priceNew: 6899,
    priceUsed: 5200,
    type: 'Prosumer Drone',
    sensor: '1" + 1/1.3" dual cameras',
    video: '4K 60fps HDR',
    weight: '724g',
    rating: 4.7,
    roiScore: 85,
    level: 'mid',
    excerpt: 'The dual-camera sweet spot — a 1-inch wide plus a 70mm tele, 4K 60fps HDR, and 45min flight time. Used RM4,800-5,600. The best workhorse between the Mini and Mavic.',
    content: `The DJI Air 3S is the professional middle ground: dual cameras (a 1-inch wide and a 70mm telephoto), 4K 60fps HDR, and 45 minutes of flight time — at half the price of the Mavic 4.

**Malaysia market:** RM6,899 new, RM4,800-5,600 used. Above 250g, so it needs a CAAM drone license.

**Why it is the workhorse:**
- Dual cameras: 1-inch wide for landscape, 70mm tele for detail and safe close-ups
- 4K 60fps HDR with 10-bit colour
- 45-minute flight time — finish a whole property shoot on one battery
- Omnidirectional obstacle sensing
- Free panorama and MasterShots modes for instant client-pleasers

**Earning with it:**
- Real estate aerials: RM400-800 per property
- Construction documentation: RM500-1,500 per visit
- Resort and travel content: RM1,500-4,000 per project
- Event and wedding aerials: RM800-1,500 per event

**The honest catch:** The tele lens is great but not cinema-grade, and the license requirement is easy to forget when quoting. If the Mini 4 Pro/5 is fully booked, the Air 3S is the logical next drone.`,
    roiDesc: 'Used RM4,800-5,600. Amir did 7 property shoots at RM500 each — paid off in 3 weeks. The pro-workhorse upgrade from the Mini.',
    pros: ['Dual 1" + 70mm cameras', '4K 60fps HDR', '45min flight time', 'Omnidirectional sensing', 'Great real-estate results'],
    cons: ['Requires CAAM license', 'Not cinema-grade tele', 'Bigger to carry than Mini', 'Pricey batteries'],
    usedTip: 'Requires CAAM license. Check both gimbal cameras, test the 70mm focus, verify flight log for crash history',
    creatorUses: ['amir-shah'],
  },
  {
    slug: 'dji-mini-5-review-malaysia',
    name: 'DJI Mini 5',
    category: 'drone',
    priceNew: 3299,
    priceUsed: 2500,
    type: 'Drone < 250g',
    sensor: '1/1.3" 50MP',
    video: '4K 120fps',
    weight: '249g',
    rating: 4.7,
    roiScore: 91,
    level: 'mid',
    excerpt: 'The Mini 4 Pro successor in the under-250g class — 4K 120fps and better tracking. Check current CAAM rules before you fly. Used RM2,300-2,800.',
    content: `The DJI Mini 5 keeps everything creators loved about the Mini 4 Pro — the compact under-250g weight that keeps it in a lighter CAAM class — and adds faster video, better tracking, and smarter flight modes.

**Malaysia market:** RM3,299 new, RM2,300-2,800 used. The best-selling drone class in Malaysia for good reason.

**What's new over the Mini 4 Pro:**
- 4K 120fps slow motion
- New 50MP sensor with better low light
- Upgraded ActiveTrack for following moving subjects
- Longer battery life
- Same omni-directional obstacle sensing

**The under-250g advantage:**
- Lighter class means fewer hoops than heavy drones — but CAAM registration and where you can fly still apply, so check the current rules
- Perfect for quick client demos: "let me show you the shot right now"
- Lighter to carry, faster to deploy on a property shoot

**Earning with it:**
- Real estate aerials: RM300-600 per property
- Wedding aerial shots: RM500-800 per wedding
- Event coverage: RM400-1,000 per event
- Construction progress: RM200-500 per visit

**The honest catch:** Smaller sensor than the Air or Mavic — do not push it in low light or strong wind. For 90% of Malaysian creator work, it is all the drone you need.`,
    roiDesc: 'Used RM2,300-2,800. Amir paid his off in 5 property shoots at RM400 each. The best-selling under-250g drone in Malaysia.',
    pros: ['Under-250g class', '4K 120fps slow motion', '50MP sensor', 'Omnidirectional sensing', 'Light and portable'],
    cons: ['Check CAAM registration rules', 'Small sensor in low light', 'Wind limits', 'Battery life ~34min'],
    usedTip: 'Check gimbal for scratches, test all obstacle sensors, demand the extra battery kit',
    creatorUses: ['amir-shah', 'rizuan-mustafa'],
  },
  {
    slug: 'dji-neo-review-malaysia',
    name: 'DJI Neo',
    category: 'drone',
    priceNew: 1399,
    priceUsed: 900,
    type: 'Selfie Drone < 250g',
    sensor: '1/2" 12MP',
    video: '4K 30fps',
    weight: '135g',
    rating: 4.3,
    roiScore: 88,
    level: 'beginner',
    excerpt: 'The RM900 palm-sized selfie drone. Tap to fly, no controller needed, tracks you automatically. The cheapest way to get drone content — and a phone-vlog killer.',
    content: `The DJI Neo is the drone for creators who never planned to buy a drone. At 135g it sits in your palm, you tap a button on the drone itself, and it flies itself around you filming — no controller, no app, no pilot skills.

**Malaysia market:** RM1,399 new, RM900-1,200 used. At 135g it's in the lighter under-250g class — check current CAAM rules before flying commercially.

**What it is:**
- Palm-launch selfie drone with face tracking
- 4K 30fps and simple one-tap cinematic modes
- Works without a controller (phone or palm tap only)
- Optional voice control and palm gestures
- 18-minute flight time per battery

**Why creators buy it:**
- Instant aerial selfies and vlog b-roll with zero learning curve
- The "flying selfie stick" look that stands out on TikTok
- Cheap enough to buy as a second drone without stress
- Great for outdoor creators who shoot alone

**Earning with it:**
- Solo creator content that looks aerial: no client cost, just you
- Adds a wow shot to every property or travel video
- Perfect B-roll for vloggers and food content
- It demos well: "watch what this little thing can do"

**The honest catch:** 12MP and 4K 30 are entry-level, and it is not for real estate work — that needs a Mini. The Neo is a creator toy that pays for itself in content value, not client rates.`,
    roiDesc: 'Used RM900-1,200. Zamri adds a Neo shot to every cafe and travel reel — it is the cheapest content upgrade on this site.',
    pros: ['No license needed', 'Palm-launch, no controller', 'Auto face tracking', 'Cheap entry to aerial', 'Ultra portable (135g)'],
    cons: ['12MP / 4K 30 entry quality', '18min short flight', 'Not for professional work', 'No obstacle sensing'],
    usedTip: 'Check for crash damage on props and gimbal, verify it pairs to the app, demand 2 batteries',
    creatorUses: ['zamri-nasir', 'farid-johari'],
  },
  {
    slug: 'dji-osmo-action-4-review-malaysia',
    name: 'DJI Osmo Action 4',
    category: 'action',
    priceNew: 1699,
    priceUsed: 1200,
    type: 'Action Cam',
    sensor: '1/1.3" CMOS',
    video: '4K 120fps',
    weight: '145g',
    rating: 4.5,
    roiScore: 90,
    level: 'beginner',
    excerpt: 'The bargain action cam with the 1/1.3-inch sensor and front screen. Used RM1,000-1,400. Nearly everything the Action 5 Pro does, for less money.',
    content: `The DJI Osmo Action 4 is the sweet spot of the action cam market: the same 1/1.3-inch sensor and front+back screens as the newer Action 5 Pro, at a used price that undercuts every rival. It is the best value action cam in Malaysia.

**Malaysia market:** RM1,699 new, RM1,000-1,400 used. Huge availability on Mudah.my and Carousell.

**Why it beats new cams on value:**
- 1/1.3-inch sensor — clearly better than GoPro's smaller sensor in low light
- Front + back screens for vlogging
- RockSteady 3.0 stabilisation
- 4K 120fps slow motion
- Waterproof to 18m, and the DJI Mimo app is excellent

**Earning with it:**
- POV content for gyms, workshops, riders: RM200-500 per video
- B-roll for corporate videos: RM200-400 per day
- Regular content retainers for active businesses: RM400-800/month
- It is a second angle at events that costs you almost nothing

**The honest catch:** No GPS track overlays, and it is a step below the Action 5 Pro's battery life and colour. If the price difference is RM200, get the 5 Pro. If it is RM500+, the Action 4 is the smart buy.`,
    roiDesc: 'Used RM1,000-1,400. Farid shot 4 POV brand videos at RM300 each — paid off in 2 weekends. Best value action cam in Malaysia.',
    pros: ['1/1.3-inch sensor', 'Front + back screens', 'RockSteady 3.0 stabilisation', '4K 120fps', 'Waterproof 18m'],
    cons: ['No GPS overlays', 'Battery life below Action 5 Pro', 'Smaller ecosystem than GoPro'],
    usedTip: 'Test front screen for scratches, check buttons are clicky, record 4K for 15min to check thermals',
    creatorUses: ['farid-johari'],
  },
  {
    slug: 'gopro-hero-14-review-malaysia',
    name: 'GoPro Hero 14',
    category: 'action',
    priceNew: 2599,
    priceUsed: 1900,
    type: 'Action Cam',
    sensor: '1/1.9" 27MP',
    video: '5.7K 60fps / 4K 120fps',
    weight: '154g',
    rating: 4.4,
    roiScore: 87,
    level: 'mid',
    excerpt: 'The newest GoPro — same proven ecosystem, improved stabilization, and the endless mount range. Used RM1,700-2,100. The safe, familiar choice for action content.',
    content: `The GoPro Hero 14 is the latest king of the mount ecosystem. It is not a revolution — it is GoPro doing GoPro: proven toughness, the largest accessory range on Shopee, and incremental improvements to stabilization and video.

**Malaysia market:** RM2,599 new, RM1,700-2,100 used. The huge used pool from people upgrading every year makes Hero 13 and 14 units excellent value.

**What it brings:**
- 5.7K 60fps and 4K 120fps
- HyperSmooth stabilisation that is now nearly invisible in action
- The GoPro mount ecosystem — chest, helmet, suction, and clip mounts everywhere
- Waterproof to 10m without a case
- GP-Log for colour grading

**Earning with it:**
- Automotive POV (mount on the car): RM300-600 per video
- Motorcycle and delivery rider content: RM200-500 per video
- Sports, gym, and adventure retainers: RM500-1,000/month
- The accessory range means you can shoot angles rivals cannot

**The honest catch:** The sensor is smaller than the DJI rivals, it pushes the GoPro subscription hard, and the Hero 14 is a modest step over the Hero 13. Buy used, and you will not feel the difference.`,
    roiDesc: 'Used RM1,700-2,100. Farid paid his off in 3 POV brand videos at RM400 each. The familiar, proven action cam.',
    pros: ['5.7K 60fps / 4K 120fps', 'HyperSmooth stabilisation', 'Largest mount ecosystem', 'Waterproof 10m', 'GP-Log for grading'],
    cons: ['Smaller sensor than DJI rivals', 'Subscription pushed hard', 'Modest upgrade over Hero 13', 'Battery ~60min recording'],
    usedTip: 'Record 4K for 20min to check overheating, inspect lens glass, ensure Bluetooth/WiFi pair cleanly',
    creatorUses: ['farid-johari', 'alif-hakim'],
  },
  {
    slug: 'fujifilm-x100vi-review-malaysia',
    name: 'Fujifilm X100VI',
    category: 'camera',
    priceNew: 7199,
    priceUsed: 6200,
    type: 'Compact APS-C Fixed-Lens',
    sensor: '40.2MP APS-C X-Trans CMOS 5 HR',
    video: '6.2K 30fps / 4K 60fps',
    weight: '521g',
    rating: 4.6,
    roiScore: 70,
    level: 'mid',
    excerpt: 'The camera everyone waited two years for. 40MP, film simulations, and IBIS in a body that starts conversations. Used RM5,800-6,500. The hype is real — but it is a style camera, not a gig workhorse.',
    content: `The Fujifilm X100VI is the most hyped camera of the decade. The X100V became a TikTok icon; the X100VI turned that into two-year waiting lists and RM7k+ asking prices. In 2026 you can finally buy one used in Malaysia — for about the price of a used full-frame kit.

**Malaysia market:** RM7,199 new, RM5,800-6,500 used. Units move fast on Mudah.my and Carousell because the hype has not fully cooled.

**Why everyone is obsessed:**
- 40.2MP X-Trans sensor — a genuine leap over the X100V
- In-body stabilisation — the first X100 with IBIS
- Fujifilm film simulations (Velvia, Classic Chrome, Reala Ace) straight out of camera
- The fixed 23mm f/2 lens with a leaf shutter you barely hear
- A beautiful, carry-everywhere body that starts conversations and street shoots

**The honest truth for Malaysian creators:**
The X100VI is a content and client-wow machine, not a pay-off-fast machine. At RM6,000+ used, it is the slowest ROI item on this site. You buy it for the look, the joy of shooting, and the portrait/food content that clients notice.

**Earning with it:**
- Street and lifestyle content with an unmistakable look: RM300-600 per session
- Food and cafe photography clients pay a premium for: RM200-400 per session
- It is a walking business card — people ask what camera that is
- Hold its value — the X100 line resells at nearly new price

**Who should buy:** creators who already earn from a camera and want joy + style. **Who should skip:** Tim and Ahmad starting from zero — the D3100 or A6100 pays you back in a month; this takes years.`,
    roiDesc: 'Used RM5,800-6,500. Slow ROI but huge style and value-retention. Buy for joy and premium content, not for gig payback.',
    pros: ['40.2MP sensor', 'In-body stabilisation (first X100)', 'Beautiful film simulations', 'Compact, iconic design', 'Holds value incredibly well'],
    cons: ['Very expensive second-hand', 'Fixed 23mm lens only', 'Hype keeps prices high', 'Slow ROI for gig work'],
    usedTip: 'Check the fixed lens for dust and scratches, test IBIS in video, verify shutter count under 50k, check the top-plate dials',
    creatorUses: ['sarah-azman', 'diana-ishak'],
  },
  {
    slug: 'fujifilm-x-m5-review-malaysia',
    name: 'Fujifilm X-M5',
    category: 'camera',
    priceNew: 3899,
    priceUsed: 3200,
    type: 'Vlogging Mirrorless APS-C',
    sensor: '26.1MP APS-C X-Trans CMOS 4',
    video: '6.2K 30fps (4K 60fps)',
    weight: '355g',
    rating: 4.5,
    roiScore: 93,
    level: 'beginner',
    excerpt: 'The 2024 viral vlogging camera. 6.2K open-gate video, Fujifilm film sims, and a 355g body at a creator-friendly price. Used RM3,000-3,400. The budget way into the Fujifilm look.',
    content: `The Fujifilm X-M5 was the sleeper hit of 2024-2025. It is a lightweight vlogging mirrorless with Fujifilm's famous film simulations and open-gate 6.2K video — features creators normally pay double for. It sold out everywhere at launch; in 2026 the used market has settled into a sweet spot.

**Malaysia market:** RM3,899 new, RM3,000-3,400 used. Great availability on Mudah.my and Carousell now that the rush is over.

**Why creators love it:**
- 6.2K open-gate video — crop to vertical AND horizontal from one take
- 4K 60fps with Fujifilm's gorgeous colour science
- Film simulations (including Reala Ace) that cut editing time to zero
- 355g — the lightest vlogging kit you can carry daily
- Retro three-dial design that is genuinely fun to shoot

**The catch:**
No viewfinder and no IBIS. You are committing to screen-based shooting, and hand-held video will be shaky without a gimbal or stabilised lens. For tripod talking-head, review and product content it is perfect.

**Earning with it:**
- Brand review retainers: RM800-1,500/month
- Cafe and lifestyle content with the Fujifilm look: RM300-600 per session
- Product videos where colour sells: RM200-500 per video
- The look impresses — clients see film-sim footage and ask for more

**Who should buy:** budget creators who want the Fujifilm aesthetic and shoot mostly on a tripod. **Who should skip:** anyone shooting lots of handheld walking video — get a DJI Osmo Pocket 3 instead.`,
    roiDesc: 'Used RM3,000-3,400. Diana paid hers off in 3 brand retainers at RM1,000/month. The 2024 viral vlogging king.',
    pros: ['6.2K open-gate video', 'Fujifilm film simulations', 'Ultra-light 355g body', 'Affordable Fujifilm entry', 'Great colour out of camera'],
    cons: ['No viewfinder', 'No IBIS', 'X-mount cheap lens pool smaller than Sony', 'Menu learning curve'],
    usedTip: 'Record 6.2K for 10min to check heat, test the tilt screen hinge, bring an SD card, check no menu freeze or EVF ghosting',
    creatorUses: ['diana-ishak', 'sarah-azman'],
  },
  {
    slug: 'canon-eos-r6-mark-ii-review-malaysia',
    name: 'Canon EOS R6 Mark II',
    category: 'camera',
    priceNew: 11999,
    priceUsed: 7800,
    type: 'Full-Frame Hybrid',
    sensor: '24.2MP Full-Frame CMOS',
    video: '4K 60fps 10-bit',
    weight: '670g',
    rating: 4.8,
    roiScore: 79,
    level: 'pro',
    excerpt: 'The full-frame hybrid Malaysian wedding and event shooters trust. Reliable eye AF, 4K 60fps 10-bit, and superb low light. Used RM7,200-8,200. The pro leap for serious money.',
    content: `The Canon EOS R6 Mark II is the camera you hire when the client is paying real money. It is the full-frame hybrid that Malaysian wedding, event and corporate photographers have used for years — and the used market is finally full of well-loved units.

**Malaysia market:** RM11,999 new, RM7,200-8,200 used. Plenty of units around wedding season as pros upgrade to the R5 II or Mavic 4.

**Why pros pick it:**
- Dual Pixel CMOS AF II — eye tracking that simply does not miss
- 4K 60fps 10-bit internal recording
- Excellent high-ISO performance for dark banquet halls
- Dual SD card slots for paid-work safety
- 40fps electronic burst for event moments

**Earning with it:**
- Lead weddings: RM1,500-2,500 per wedding
- Corporate and gala events: RM600-1,200 per event
- Portrait sessions clients take seriously: RM300-600 per session
- It is the camera that makes clients comfortable paying premium rates

**The honest catch:** RF full-frame lenses are pricey, and it is heavy compared to crop bodies. At this money you should already be booking paid work. If you are starting from zero, the A6100 or R50 earns your first ringgit far sooner.

**Who should buy:** working creators upgrading for client credibility and low light. **Who should skip:** beginners — this is a tool for an already-running business.`,
    roiDesc: 'Used RM7,200-8,200. Rizuan paid his off in 3 weddings at RM1,800 each. The pro hybrid Malaysia trusts for paid events.',
    pros: ['Excellent eye-tracking AF', '4K 60fps 10-bit', 'Great low light', 'Dual SD card slots', 'Pro build quality'],
    cons: ['RF lenses are expensive', 'Heavier than crop bodies', 'Big investment', 'Overkill for beginners'],
    usedTip: 'Check shutter count under 80k, test eye AF in video mode, verify both card slots, inspect sensor on a white wall at f/16',
    creatorUses: ['rizuan-mustafa', 'amir-shah'],
  },
  {
    slug: 'sony-a7c-ii-review-malaysia',
    name: 'Sony A7C II',
    category: 'camera',
    priceNew: 9499,
    priceUsed: 6900,
    type: 'Compact Full-Frame Mirrorless',
    sensor: '33MP Full-Frame BSI CMOS',
    video: '4K 60fps 10-bit',
    weight: '514g',
    rating: 4.6,
    roiScore: 81,
    level: 'mid',
    excerpt: 'Full-frame power in a small travel body. 33MP, AI autofocus, and 7-stop IBIS with the whole E-mount ecosystem. Used RM6,500-7,300. The do-everything upgrade for growing creators.',
    content: `The Sony A7C II shrinks full-frame quality into a body barely bigger than an A6100. It pairs the AI autofocus chip from Sony's pro cameras with 33 megapixels and 7 stops of stabilisation — and it takes every E-mount lens ever made.

**Malaysia market:** RM9,499 new, RM6,500-7,300 used. A healthy used pool because it is the natural upgrade path from the A6100/ZV-E10.

**Why it is the hybrid upgrade:**
- 33MP full-frame sensor — crop, print, and sell your shots
- AI autofocus that tracks people, animals, birds and vehicles
- 7-stop IBIS for smooth handheld video
- 4K 60fps 10-bit internal recording
- Compact and light enough to carry on travel shoots

**Earning with it:**
- Corporate and event coverage: RM500-1,200 per event
- Travel and destination content retainers: RM1,000-2,500/month
- Client portraits with real full-frame depth: RM300-600 per session
- All your A6100 E-mount lenses still fit — no new glass needed

**The honest catch:** single SD card slot, a small viewfinder, and 4K 60 has noticeable rolling shutter. If you shoot demanding paid video, the A6700 or A7 IV may suit better. For most creators, this is the best all-round full-frame upgrade in Malaysia.

**Who should buy:** creators earning consistently who want a compact full-frame. **Who should skip:** beginners — the A6100 pays back far faster.`,
    roiDesc: 'Used RM6,500-7,300. Fikri paid his off in 5 corporate retainers at RM1,200/month. Compact full-frame with AI autofocus.',
    pros: ['33MP full-frame', 'AI autofocus', 'Compact and light', '7-stop IBIS', 'Full E-mount lens range'],
    cons: ['Single SD card slot', 'Small viewfinder', 'Rolling shutter at 4K 60', 'Pricey for beginners'],
    usedTip: 'Test the AI AF on faces and pets, check IBIS in video, inspect the mount for wear, verify shutter count under 50k',
    creatorUses: ['fikri-haron', 'alif-hakim'],
  },
  {
    slug: 'insta360-x5-review-malaysia',
    name: 'Insta360 X5',
    category: 'action',
    priceNew: 2999,
    priceUsed: 2400,
    type: '360° Action Cam',
    sensor: '1/2" 8K dual lens',
    video: '8K 30fps 360°',
    weight: '206g',
    rating: 4.7,
    roiScore: 92,
    level: 'mid',
    excerpt: 'The 2025 flagship 360 camera. 8K, better low light, longer battery, and the invisible selfie stick effect that sells real estate. Used RM2,200-2,600. The upgrade X4 owners are eyeing.',
    content: `The Insta360 X5 is the 2025 evolution of the X4 — the camera that turned 360 content into a Malaysian side hustle. It keeps the invisible selfie stick magic and adds 8K resolution, noticeably better low light, and a battery that finally lasts a shoot.

**Malaysia market:** RM2,999 new, RM2,200-2,600 used. Early upgraders are already listing mint X5 units on Mudah.my and Carousell.

**What is new over the X4:**
- 8K 30fps 360 video — punch in to clean 1080p reframes
- Better low light (a real gap in the X4)
- Larger battery for a full day of shooting
- Improved stitching and AI reframing in the app
- Still waterproof to 13m and uses the same popular accessories

**Earning with it:**
- Real estate 360 tours: RM300-500 per property — agents queue for these
- Automotive walkarounds: RM250-400 per video
- Group event and wedding b-roll that looks impossible to shoot: RM300-800
- Content retainers for a "unique angle": RM500-1,200/month

**The honest catch:** it is still a 360 camera — you must edit (stitch and reframe) and it is not a substitute for a traditional action cam. And 8K files eat battery and storage.

**Who should buy:** creators doing real estate, events, or wanting viral "impossible shot" content. **Who should skip:** vloggers who need a front screen — get the Osmo Action 6 Pro or Pocket 3.`,
    roiDesc: 'Used RM2,200-2,600. Zamri charged RM350/tour — 7 real estate tours paid it off. The 8K 360 that sells itself to agents.',
    pros: ['8K 360 video', 'Better low light than X4', 'Longer battery life', 'Invisible stick + reframe', 'Waterproof 13m'],
    cons: ['Stitching/editing required', 'Not a traditional action cam', 'Fragile lens caps', '8K drains battery fast'],
    usedTip: 'Check both lenses for scratches, test reframe in the app, verify battery health, demand the original box and warranty proof',
    creatorUses: ['zamri-nasir', 'alif-hakim'],
  },
  {
    slug: 'dji-osmo-action-6-pro-review',
    name: 'DJI Osmo Action 6 Pro',
    category: 'action',
    priceNew: 2099,
    priceUsed: 1600,
    type: 'Action Cam',
    sensor: '1/1.3" CMOS',
    video: '4K 120fps',
    weight: '148g',
    rating: 4.6,
    roiScore: 90,
    level: 'beginner',
    excerpt: 'The 2025 action cam to beat. Front and back screens, silky stabilisation, better colour, and long battery life. Used RM1,400-1,800. The vlogger-friendly choice over the Hero 14.',
    content: `The DJI Osmo Action 6 Pro is 2025's answer to the GoPro Hero 14 — and most creators rate it the better buy. It keeps the front screen that makes vlogging easy, improves the colour science, and runs cooler and longer than its rivals.

**Malaysia market:** RM2,099 new, RM1,400-1,800 used. The DJI Malaysia buy/sell groups are full of lightly used units.

**Why it beats the Hero 14 for most creators:**
- Front + back touchscreens — see yourself while vlogging
- RockSteady stabilisation that looks gimbal-made
- Better colour science than the Action 5 Pro
- Long battery life that survives a full shoot day
- Waterproof to 20m without a housing

**Earning with it:**
- POV content for gyms, workshops and riders: RM250-500 per video
- Corporate b-roll days: RM200-400 per day
- Content retainers for active businesses: RM400-1,000/month
- A second angle at events for almost zero extra cost

**The honest catch:** the mount ecosystem is smaller than GoPro's, and it is only a modest step over the Action 5 Pro. If the price gap is big, grab the 5 Pro instead — it is the same sensor and screens.

**Who should buy:** vloggers and POV creators who want the best all-round action cam. **Who should skip:** people already on an Action 5 Pro — the upgrade is small.`,
    roiDesc: 'Used RM1,400-1,800. Farid paid his off in 4 POV brand videos at RM350 each. The 2025 action cam to beat.',
    pros: ['Front + back screens', 'Excellent stabilisation', 'Better colour than Action 5', 'Long battery life', 'Waterproof 20m'],
    cons: ['Smaller ecosystem than GoPro', 'Modest upgrade over 5 Pro', 'Accessories cost more', 'No GPS overlays'],
    usedTip: 'Check the front screen for scratches, test all buttons, record 4K for 15min to check thermals, verify USB-C charging',
    creatorUses: ['farid-johari', 'alif-hakim'],
  },
  {
    slug: 'iphone-17-pro-content-creation-malaysia',
    name: 'iPhone 17 Pro',
    category: 'mobile',
    priceNew: 5999,
    priceUsed: 5000,
    type: 'Flagship Smartphone',
    sensor: '48MP Main + 48MP UW + 12MP 5x Tele',
    video: '8K 30fps / 4K 120fps ProRes',
    weight: '201g',
    rating: 4.7,
    roiScore: 93,
    level: 'mid',
    excerpt: 'The 2025 creator phone. 8K video, 4K 120fps slow motion, Apple Log, and the best stabilisation in a phone. Used RM4,800-5,400. The most complete camera most people will ever own.',
    content: `The iPhone 17 Pro is the phone that finally makes the dedicated camera debate interesting. 8K video, 4K 120fps slow motion, Apple Log for real colour grading, and a 48MP ultra-wide — a video tool that fits in a pocket.

**Malaysia market:** RM5,999 new, RM4,800-5,400 used. Most units on Mudah.my and Carousell still have 90%+ battery health.

**Why creators pick it:**
- 8K 30fps — footage you can crop and sell
- 4K 120fps slow motion that looks cinematic with zero effort
- Apple Log for genuine colour grading (a real edge over Android)
- Best-in-class video stabilisation for run-and-gun work
- The Camera Control button makes quick framing genuinely fast

**Earning with it:**
- Social media content retainers: RM800-2,000/month
- Event coverage as a photo/video shooter: RM300-600 per event
- Food and cafe content: RM200-500 per session
- 8K and ProRes win premium corporate and wedding b-roll

**The honest catch:** 8K and ProRes eat storage and battery fast, and it is expensive even used. If you already own a 16 Pro, skip it — the jump is nice, not essential. Buy the mic and light instead.

**Who should buy:** creators who want one device for everything. **Who should skip:** anyone on an iPhone 15 Pro or newer who shoots mostly social — your phone is already enough.`,
    roiDesc: 'Used RM4,800-5,400. Aina paid hers off in 2 retainers at RM1,500/month. The most complete creator phone in 2026.',
    pros: ['8K 30fps video', '4K 120fps slow motion', 'Apple Log grading', 'Best-in-class stabilisation', 'Long software support'],
    cons: ['Expensive even used', 'Storage fills fast at 8K', 'Battery drains on heavy video', 'No optical beyond 5x'],
    usedTip: 'Check battery health above 90%, confirm the Apple ID is signed out, test the 5x lens for dust, verify 8K records cleanly',
    creatorUses: ['aina-syazwani', 'tim-rahman'],
  },
  {
    slug: 'dji-mic-2-review-malaysia',
    name: 'DJI Mic 2',
    category: 'audio',
    priceNew: 1599,
    priceUsed: 1100,
    type: 'Wireless Microphone Kit',
    sensor: 'Dual wireless + receiver',
    video: '24-bit / 48kHz audio',
    weight: '31g per mic',
    rating: 4.7,
    roiScore: 95,
    level: 'beginner',
    excerpt: 'The wireless mic creators actually upgrade to. Touchscreen receiver, clean audio, and each transmitter doubles as a recorder. Used RM900-1,200. The best reliability upgrade for paid gigs.',
    content: `Viewers forgive grainy video. They never forgive bad audio. The DJI Mic 2 is the wireless microphone system that serious Malaysian creators graduate to — after their first RM50 generic mic dies on a paid shoot.

**Malaysia market:** RM1,599 new, RM900-1,200 used. Demand is strong, so mint units hold value on Mudah.my and Carousell.

**Why it is worth the step up:**
- Clean, reliable wireless audio with a touchscreen receiver
- Each transmitter doubles as an on-body recorder — a built-in safety net
- 30-hour battery life via the charging case
- Records up to 24-bit / 48kHz for clean, editable audio
- Pairs with phones, cameras, and computers

**Earning with it:**
- Every client video sounds professional: RM200-800 per video
- Interviews and two-person shoots become effortless
- The recording backup means you never lose a paid take
- Clients notice the difference in the first 10 seconds

**The honest catch:** it costs 10x the RM50 starter lapel mic. If you are only posting to TikTok with your phone, the RM50 wired mic is still the smart first buy. Buy the DJI Mic 2 when you are getting paid.

**Who should buy:** creators doing paid gigs. **Who should skip:** true beginners — buy the RM50 lapel mic first and bank the difference.`,
    roiDesc: 'Used RM900-1,200. Every paid gig gets cleaner audio — the cheapest reliability upgrade for working creators.',
    pros: ['Clean wireless audio', 'Transmitter doubles as recorder', 'Touchscreen receiver', '30h battery via case', 'Compact and durable'],
    cons: ['Pricier than generic sets', 'Needs charging habit', 'Wind muff needed outdoors', 'Overkill for phone-only beginners'],
    usedTip: 'Test both transmitters, check the charging case pins, verify firmware is current, test range at 20m before buying',
    creatorUses: ['diana-ishak', 'fikri-haron'],
  },
  {
    slug: 'dji-mini-3-pro-review-malaysia',
    name: 'DJI Mini 3 Pro',
    category: 'drone',
    priceNew: 2199,
    priceUsed: 1500,
    type: 'Drone < 250g',
    sensor: '1/1.3" 48MP',
    video: '4K 60fps',
    weight: '249g',
    rating: 4.4,
    roiScore: 90,
    level: 'beginner',
    excerpt: 'The 2023 classic that became 2026\'s smartest buy. Under 250g class, 4K 60fps, 48MP, and obstacle sensing — for less than half the Mini 4 Pro price. Used RM1,300-1,800. Check CAAM rules.',
    content: `The DJI Mini 3 Pro was the drone everyone bought in 2022-2023, flew a few times, and kept in the cupboard. In 2026 that cupboard is your opportunity: a capable under-250g drone at a price that finally makes sense for Malaysian creators.

**Malaysia market:** RM2,199 new, RM1,300-1,800 used. Because millions were sold, the used market is huge and prices are the lowest they will ever be.

**Why it is the smart 2026 buy:**
- Under 250g — lighter CAAM class than heavy drones (still check current registration rules)
- 4K 60fps video and 48MP photos
- Three-way obstacle sensing (yes, it has it)
- Vertical video support for TikTok and Reels
- Huge pool of spare batteries and parts on Shopee

**Earning with it:**
- Real estate aerials: RM300-500 per property
- Wedding aerial shots: RM400-700 per wedding
- Event and festival coverage: RM300-800 per event
- The cheapest entry into under-250g aerial income

**The honest catch:** it is one generation behind the Mini 4 Pro and Mini 5 — no 4K 120fps, older processor. But for the price difference (RM1,500 vs RM2,500+), most beginners should start here and upgrade with gig money.

**Who should buy:** creators who want a capable drone without the flagship price. **Who should skip:** anyone booking heavy aerial work — get the Mini 5 or Air 3S.`,
    roiDesc: 'Used RM1,300-1,800. Amir (illustrative) paid his off in 4 property shoots at RM350 each. The 2023 classic is 2026\'s smart buy.',
    pros: ['Under-250g class', '4K 60fps video', '48MP photos', 'Obstacle sensing', 'Huge cheap used market'],
    cons: ['One gen behind Mini 4/5', 'Battery ~34min', 'No 4K 120fps', 'Older processor'],
    usedTip: 'Check the gimbal for scratches, verify prop arms are straight, test obstacle sensors, demand extra batteries in the deal',
    creatorUses: ['amir-shah', 'zamri-nasir'],
  },
  {
    slug: 'gopro-hero-12-review-malaysia',
    name: 'GoPro Hero 12',
    category: 'action',
    priceNew: 2199,
    priceUsed: 950,
    type: 'Action Cam',
    sensor: '1/1.9" 27MP',
    video: '5.3K 60fps',
    weight: '154g',
    rating: 4.2,
    roiScore: 88,
    level: 'beginner',
    excerpt: 'The 2023 action cam at a 2026 bargain price. 5.3K 60fps, the endless GoPro mount ecosystem, and waterproof to 10m — for under RM1,000 used. The cheapest real POV camera in Malaysia.',
    content: `The GoPro Hero 12 is the action cam that thousands of Malaysians bought in 2023 and have since replaced. Which makes it the best-value POV camera you can buy in 2026 — under RM1,000, with the biggest accessory ecosystem in the world.

**Malaysia market:** RM2,199 new, RM850-1,100 used. The used pool from upgrade-happy owners is enormous on Mudah.my and Carousell.

**Why it is the budget POV king:**
- 5.3K 60fps video that still looks modern
- HyperSmooth stabilisation for smooth walking and driving shots
- The GoPro mount ecosystem — chest, helmet, suction, clip — all on Shopee
- Waterproof to 10m without a housing
- A fraction of the price of a Hero 13 or 14

**Earning with it:**
- Car dealer POV videos: RM250-500 per video
- Motorcycle and delivery rider content: RM200-400 per video
- Workshop and gym content retainers: RM400-800/month
- B-roll that a phone or DSLR cannot easily shoot

**The honest catch:** no front screen, small sensor in low light, and battery life around an hour. For bright, action-heavy content it is perfect; for indoor vlogging it is the wrong tool.

**Who should buy:** anyone who wants POV content for the lowest ringgit. **Who should skip:** vloggers who need a front screen — get the DJI Action 4 or 6 instead.`,
    roiDesc: 'Used RM850-1,100. The cheapest real POV camera in 2026. Farid shoots POV content that pays RM300 a video.',
    pros: ['Sub-RM1,000 used', '5.3K 60fps video', 'Huge mount ecosystem', 'Waterproof 10m', 'HyperSmooth stabilisation'],
    cons: ['No front screen', 'Small sensor in low light', 'Battery ~60min recording', 'Older processor'],
    usedTip: 'Check the lens glass for scratches, test all buttons, record 4K for 15min to check thermals, verify Bluetooth pairing',
    creatorUses: ['farid-johari'],
  },
  {
    slug: 'canon-70d-review-malaysia',
    name: 'Canon EOS 70D',
    category: 'camera',
    priceNew: 0,
    priceUsed: 1400,
    type: 'Mid-Range DSLR',
    sensor: '20.2MP APS-C CMOS',
    video: '1080p30 (Dual Pixel AF)',
    weight: '755g',
    rating: 4.3,
    roiScore: 92,
    level: 'beginner',
    excerpt: "The 60D's proper successor and the cheapest Dual Pixel AF camera in Malaysia. RM1,200–1,600 used. A photo-first event workhorse that pays for itself in 2–4 gigs.",
    content: `The Canon EOS 70D is the camera the 60D should have been — and the reason we tell Malaysian gig shooters to look past their old body. Launched in 2013, it brought two things the 60D never had: Dual Pixel CMOS AF (the autofocus that finally made live view and video usable) and a touchscreen. In 2026 it trades for RM1,200–1,600 on Mudah and Carousell, which makes it the cheapest way into Canon's modern AF.

**What you get for RM1,400 used:**
- Dual Pixel CMOS AF — touch-to-focus that actually works, in stills and video
- 20.2MP APS-C sensor and 7fps burst — plenty for events
- Flip-out touchscreen — the waist-level trick the 60D loved, now focusable by tap
- Weather-sealed magnesium body — built for Malaysian humidity
- The full EF/EF-S lens library — tens of millions of cheap used lenses

**Why it is a photo-first workhorse:**
The 70D is a stills machine. In live view, Dual Pixel AF nails focus where the 60D hunted for seconds. At events you tap a face on the touchscreen and let the camera track it. 7fps covers group shots and candids. This is the camera for graduation, gala dinners and portrait sessions.

**Where it is weak — be honest with yourself:**
- 1080p30 only, old codec — client reels will look dated
- No 4K, no IBIS, no headphone jack
- 20.2MP and an older sensor in low light — plan for a flash or a fast prime
- Heavy at 755g

**The gig math:**
Event coverage pays RM300–600 in Malaysia. At RM1,400 used, that is 2–4 events to own it outright — the fastest breakeven on any Canon DSLR you can buy. Portrait sessions at RM150–400 cover it in 4–9 sessions. Most 70D owners clear the body in a month of weekend gigs.

**Buying a used 70D:**
- Shutter count under 100k is ideal; 70Ds routinely pass 200k
- Test Dual Pixel AF in live view with a lens attached
- Check the grip rubber — it peels on old 70Ds
- Inspect the mode dial and top LCD for scratches
- Bring an SD card and shoot 1080p for 5 minutes to test recording

**Who should buy:** gig beginners on the 60D upgrade path, and anyone who shoots mostly events and portraits. **Who should skip:** creators whose main goal is video — get an A6000 or a used mirrorless instead. The 70D is a photography tool that happens to record video.`,
    roiDesc: 'Used RM1,200–1,600. Event gigs pay RM300–600 each — 2–4 events and the 70D is yours. The cheapest Dual Pixel AF camera in Malaysia.',
    pros: ['Dual Pixel AF (first of its kind)', '7fps burst', 'Flip-out touchscreen', 'Huge cheap EF lens pool', 'Weather-sealed build'],
    cons: ['1080p only', 'Old 20.2MP sensor in low light', 'Heavy at 755g', 'No IBIS, no headphone jack'],
    usedTip: 'Check shutter count under 100k, test Dual Pixel AF in live view, inspect grip rubber for peeling, shoot 1080p for 5min to test recording',
    creatorUses: [],
  },
  {
    slug: 'nikon-d7200-review-malaysia',
    name: 'Nikon D7200',
    category: 'camera',
    priceNew: 0,
    priceUsed: 1850,
    type: 'Prosumer DSLR',
    sensor: '24.2MP APS-C CMOS',
    video: '1080p60',
    weight: '765g',
    rating: 4.4,
    roiScore: 90,
    level: 'mid',
    excerpt: "Nikon's toughest APS-C DSLR — weather-sealed, dual slots, and it drives cheap old screw-drive lenses. RM1,600–2,100 used. Portrait and event money for years.",
    content: `The Nikon D7200 is the D7100 with the two weaknesses fixed — battery life and Wi-Fi — and it has stayed the favourite stills body of Malaysian portrait and event shooters since 2015. It is also the only camera on this list that drives cheap old screw-drive AF lenses, which makes a pro-quality kit absurdly affordable. Used price: RM1,600–2,100 on Mudah, Carousell and Facebook Marketplace.

**What you get for RM1,850 used:**
- 24.2MP APS-C sensor with excellent dynamic range — edit shadows without fear
- Weather-sealed, magnesium-alloy body — built like a tank
- Dual SD card slots — the safety net paid work demands
- Screw-drive AF — a RM150 50mm f/1.8D autofocuses like a lens ten times its price
- Wi-Fi and 1080p60 video — the video is fine, not great

**Why it is a stills machine:**
The D7200 is one of the last great DSLRs. The optical viewfinder, dual dials, weather sealing and dual slots make it a dependable event and portrait body. Dynamic range is genuinely class-leading for its era — you can recover blown skies and deep shadows in Lightroom. This is the camera you want when a client says "we cannot reshoot this."

**Where it shows its age:**
- No 4K — 1080p60 is the ceiling
- No flip screen — low-angle and selfie work is awkward
- Live-view AF is slow — you will shoot through the viewfinder
- Heavy at 765g

**The gig math:**
Portrait sessions pay RM150–400 and events pay RM300–600. At RM1,850 used, that is roughly 4–6 gigs to break even. It is slower to pay off than a sub-RM1,000 body, but it is also the camera you will still be using in ten years.

**Buying a used D7200:**
- Shutter count under 100k; the D7200 is rated for 150k
- Test screw-drive AF with a cheap 50mm f/1.8D before you buy
- Check the weather seals and battery door for wear
- Look for mould in the viewfinder — common in Malaysia's humidity
- Test both SD slots

**Who should buy:** portrait and event shooters who want a dependable, weather-sealed stills body. **Who should skip:** video-first creators and anyone who hates carrying a big DSLR — the A6000 or X-T2 serves you better.`,
    roiDesc: 'Used RM1,600–2,100. Portraits at RM150–400 and events at RM300–600 — 4–6 gigs to break even. The stills machine that refuses to die.',
    pros: ['24.2MP with excellent dynamic range', 'Dual SD slots', 'Weather-sealed', 'Screw-drive AF for cheap old lenses', 'Huge F-mount ecosystem'],
    cons: ['No 4K', 'No flip screen', 'Heavy at 765g', 'Slow live-view AF'],
    usedTip: 'Check shutter count under 100k, test screw-drive AF with a 50mm f/1.8D, inspect weather seals, look for mould in the viewfinder',
    creatorUses: [],
  },
  {
    slug: 'sony-a6000-review-malaysia-second-hand',
    name: 'Sony A6000',
    category: 'camera',
    priceNew: 0,
    priceUsed: 1100,
    type: 'Compact Mirrorless',
    sensor: '24.3MP APS-C CMOS',
    video: '1080p60',
    weight: '344g',
    rating: 4.4,
    roiScore: 96,
    level: 'beginner',
    excerpt: 'The tiny 2014 Sony that is still the best value used camera in Malaysia. RM900–1,300, fast AF, 11fps, pocketable. Two small-business gigs cover it.',
    content: `The Sony A6000 was the camera that made mirrorless mainstream, and in 2026 it is the single best value used camera in Malaysia. At RM900–1,300 on Mudah and Carousell, you get a 24.3MP camera with fast phase-detect autofocus, 11fps burst, and a body small enough to pocket. No other camera on this site pays for itself faster.

**What you get for RM1,100 used:**
- 179-point phase-detect AF — fast, even by 2026 standards
- 24.3MP APS-C sensor and 11fps burst — action and events covered
- Tiny 344g body — the best "carry it everywhere" camera here
- 1080p60 video with the multi-interface shoe — a real hybrid at its price
- The huge E-mount lens pool — Sony glass plus cheap Sigma and Meike primes

**Why it is the fastest-paying camera:**
Two small-business content gigs at RM500–800 each cover the body. F&B retainers, product sets, graduation mini-sessions — the A6000 is small enough to hand-hold for hours and fast enough to never miss a moment. This is the camera Tim and Ahmad should buy when their phone outgrows the job.

**What it lacks:**
- No 4K — 1080p60 only
- No microphone jack — you need the hot-shoe adapter for clean audio
- No touchscreen, tilt screen only — no flip-up selfie screen
- Older menu system and no IBIS

**The gig math:**
Product sets at RM200–500 and small-business content at RM500–800/month. At RM1,100 used, that is 2–3 gigs to break even — usually inside the first month of weekends. This is the fastest ROI on the entire site.

**Buying a used A6000:**
- Check the EVF for spots or dead pixels
- Test autofocus with a lens attached — all 179 points
- Inspect the sensor for dust at f/16 against a white wall
- Check the rubber eyecup — it creeps off on old units
- Bring two batteries — the A6000 eats them

**Who should buy:** first-time gig shooters and anyone whose phone is holding them back. **Who should skip:** videographers who need 4K and a mic jack — add the ZV-E10 instead.`,
    roiDesc: 'Used RM900–1,300. Two small-business content gigs at RM500–800 each cover it. The fastest-paying camera on this site.',
    pros: ['Fast 179-point AF', '11fps burst', 'Tiny 344g and pocketable', '24.3MP sensor', 'Huge cheap E-mount lens pool'],
    cons: ['No 4K', 'No mic jack', 'No touchscreen', 'Tilt screen only', 'Older menus'],
    usedTip: 'Check the EVF for spots, test all 179 AF points, inspect sensor dust at f/16 on a white wall, bring two batteries',
    creatorUses: [],
  },
  {
    slug: 'fujifilm-x-t2-review-malaysia',
    name: 'Fujifilm X-T2',
    category: 'camera',
    priceNew: 0,
    priceUsed: 2300,
    type: 'Mirrorless APS-C',
    sensor: '24.3MP APS-C X-Trans CMOS III',
    video: '4K 30fps',
    weight: '507g',
    rating: 4.5,
    roiScore: 89,
    level: 'mid',
    excerpt: "Fujifilm's do-both king. Weather-sealed, dual cards, 4K, and film simulations that kill editing time. RM2,000–2,600 used. The pre-wedding workhorse.",
    content: `The Fujifilm X-T2 is the do-both camera of the 2013–2019 generation. Weather-sealed, dual SD slots, 4K 30fps, and Fujifilm's film simulations that make images look finished straight out of camera. In 2026 it trades for RM2,000–2,600 used — the price of an A6100, with a build quality that feels twice the price.

**What you get for RM2,300 used:**
- 24.3MP X-Trans sensor and film simulations — Classic Chrome, Velvia and the rest, baked in
- 4K 30fps video at 100Mbps
- Weather-sealed magnesium body and dual SD slots
- Classic analog dials — you set ISO, shutter and aperture on physical rings
- 325-point phase-detect AF — fast enough for pre-wedding and events

**Why it is the do-both star:**
The film simulations are the killer feature. You shoot JPEGs that look like a colourist touched them — clients see the look and ask for more. For hybrid work (photos in the morning, a promo video in the afternoon) the X-T2 does both without compromise.

**What to know before you buy:**
- X-mount lenses are pricier than E-mount or EF — budget for the kit 18-55mm f/2.8-4, which is excellent
- No IBIS — stabilised lenses or a gimbal for handheld video
- Battery life is modest — buy two spare batteries or the battery grip
- The dials and menu have a learning curve — plan a week

**The gig math:**
Pre-wedding sessions pay RM500–1,500 and portrait sessions pay RM150–400 in Malaysia. At RM2,300 used, that is 4–6 gigs to break even. It is the slowest payoff on this page — and the only one you will never outgrow for photo work.

**Buying a used X-T2:**
- Shutter count under 80k; X-T2s are tough but check anyway
- Test every dial and the ISO knob for stiffness
- Look for weather-seal wear around the ports and battery door
- Check the sensor at f/16 on a white wall — X-Trans dust is a thing
- Bring an SD card and shoot 4K for 10 minutes to test thermals

**Who should buy:** hybrid shooters who want finished-looking photos and one camera for everything. **Who should skip:** budget-first beginners — the A6000 or 70D pays for itself first, and you can upgrade with the profits.`,
    roiDesc: 'Used RM2,000–2,600. Pre-wedding sessions pay RM500–1,500 — 4–6 gigs to break even. Film simulations cut your editing time to zero.',
    pros: ['Beautiful film simulations', '4K 30fps video', 'Weather-sealed + dual SD', 'Classic physical dials', 'Best-in-class JPEGs'],
    cons: ['X-mount lenses pricey', 'Modest battery life', 'No IBIS', 'AF trails modern bodies', 'Menu learning curve'],
    usedTip: 'Check shutter count under 80k, test all dials, inspect weather seals, check sensor dust at f/16, shoot 4K for 10min to test thermals',
    creatorUses: [],
  },
];

export const categories = [
  { id: 'all', label: 'All Gear' },
  { id: 'camera', label: 'Cameras & DSLR' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'drone', label: 'Drones' },
  { id: 'action', label: 'Action / 360°' },
  { id: 'audio', label: 'Audio' },
] as const;
export function getGearBySlug(slug: string) {
  return gearList.find(g => g.slug === slug) || null;
}

export function getGearByCategory(cat: string) {
  if (cat === 'all') return gearList;
  return gearList.filter(g => g.category === cat);
}
