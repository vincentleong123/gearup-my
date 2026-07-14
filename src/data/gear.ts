export interface GearItem {
  slug: string;
  name: string;
  category: 'camera' | 'mobile' | 'drone' | 'action';
  image: string;
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
  usedTip: string;
  creatorUses: string[];
}

export const gearList: GearItem[] = [
  {
    slug: 'nikon-d3100-review-malaysia-second-hand-price',
    name: 'Nikon D3100',
    category: 'camera',
    image: '/gear/nikon-d3100.jpg',
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

Real creator example: **Aiman Roslan** started his car review channel with a D3100 and a RM40 tripod. Within 6 months, he was earning RM1,500-2,000 per month from ads and sponsorship. His total starter cost was under RM600.`,
    pros: ['Cheapest usable camera in MY market', 'Good image quality for the price', 'Huge used lens ecosystem', 'Takes great photos for thumbnails'],
    cons: ['No flip screen', '1080p only (no 4K)', 'Poor low-light without fast lens', 'No microphone jack'],
    usedTip: 'Check shutter count under 50k, test for mould on lens, offer RM350 cash',
    creatorUses: ['aiman-roslan', 'sarah-azman'],
  },
  {
    slug: 'sony-a6100-review-malaysia-second-hand',
    name: 'Sony A6100',
    category: 'camera',
    image: '/gear/sony-a6100.jpg',
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
    pros: ['Best autofocus in its price class', '4K video with no crop', 'Flip-up screen for vlogging', 'Microphone jack', 'Compact and lightweight'],
    cons: ['No in-body stabilization', 'Plastic build', 'No headphone jack', 'Overheats in 4K after 30min'],
    usedTip: 'Test 4K recording for 20min to check overheating, bring a lens to test AF, check sensor dust',
    creatorUses: ['fikri-haron', 'diana-ishak'],
  },
  {
    slug: 'iphone-15-content-creation-malaysia',
    name: 'iPhone 15 (Base)',
    category: 'mobile',
    image: '/gear/iphone-15.jpg',
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
    pros: ['Already in your pocket = zero upfront cost', 'Excellent video quality for social', 'Huge app ecosystem', 'iCloud backup', 'Familiar interface'],
    cons: ['Small sensor limits low-light', 'No optical zoom (digital only)', 'Battery drains fast in 4K', 'Overheats in direct sun'],
    usedTip: 'Check battery health (>85%), confirm iCloud is unlocked, test all cameras',
    creatorUses: ['aina-syazwani', 'tim-rahman'],
  },
  {
    slug: 'insta360-x4-review-malaysia',
    name: 'Insta360 X4',
    category: 'action',
    image: '/gear/insta360-x4.jpg',
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
    pros: ['Unique 360 content no other camera can do', 'Invisible selfie stick effect', 'Reframe after shooting (saves time)', 'Waterproof', 'Great for social media vertical video'],
    cons: ['Stitching required in app', 'Lower quality than traditional action cam', 'Battery heats up quickly', 'Learning curve for editing'],
    usedTip: 'Check lens for scratches (cannot be replaced), test stitching in app, demand original box',
    creatorUses: ['zamri-nasir', 'alif-hakim'],
  },
  {
    slug: 'dji-osmo-action-5-pro-review',
    name: 'DJI Osmo Action 5 Pro',
    category: 'action',
    image: '/gear/osmo-action-5.jpg',
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
    pros: ['Front + back screens for vlogging', 'Best-in-class stabilization', 'Great battery life', 'Waterproof 20m', 'DJI Mimo app is excellent'],
    cons: ['Smaller sensor than phone', 'Color science not as natural as GoPro', 'Limited in very low light', 'Accessories ecosystem smaller than GoPro'],
    usedTip: 'Check for sticky buttons, test front screen for scratches, ensure USB-C charges properly',
    creatorUses: ['alif-hakim', 'farid-johari'],
  },
  {
    slug: 'dji-mini-4-pro-review-malaysia',
    name: 'DJI Mini 4 Pro',
    category: 'drone',
    image: '/gear/dji-mini-4-pro.jpg',
    priceNew: 3999,
    priceUsed: 2900,
    type: 'Drone < 250g',
    sensor: '1/1.3" 48MP',
    video: '4K 100fps',
    weight: '249g',
    rating: 4.7,
    roiScore: 89,
    level: 'mid',
    excerpt: 'Under 250g = no drone license needed in Malaysia. This is the gateway drone for creators. Second-hand RM2,500-RM3,200. Real estate, events, weddings — clients pay premium for aerial.',
    content: `The DJI Mini 4 Pro is the most popular drone for Malaysian content creators, and for good reason. At just 249g, it falls under the limit requiring a drone license from the Malaysian Civil Aviation Authority (CAAM). You can fly it commercially without a license (as long as you follow basic safety rules).

**Malaysia second-hand market:** RM2,500-RM3,200 on Mudah.my, Carousell, and the DJI Malaysia groups on Facebook. Look for the Fly More Combo which includes extra batteries and a charging hub.

**The earning potential:**
- Real estate aerial photos/video: RM300-600 per property
- Wedding aerial shots: RM500-800 per wedding
- Event coverage (marathons, festivals): RM400-1,000 per event
- Construction progress documentation: RM200-500 per visit
- Resort/hotel promotional content: RM1,000-3,000 per project

**Real creator story — Amir Shah:** Amir bought a Mini 4 Pro Fly More Combo used for RM2,800. He created a simple Facebook page called "Aerial Views Malaysia" and posted 3 sample videos of his local area. Within 2 weeks, a property developer contacted him to shoot 5 landed properties at RM400 each. He earned RM2,000 in his first month. His parents stopped asking when he'd get a "real job."

**The "no license" advantage:** Unlike the Mavic 3 series which requires CAAM registration and a drone license (costing RM500-1,000 and 2-3 months processing), the Mini 4 Pro can be flown same-day after purchase. This is huge for Tim and Ahmad if they're strapped for cash and time.`,
    pros: ['No license required under 250g', 'Omni-directional obstacle sensing', '4K 100fps slow motion', 'Excellent image quality for the size', 'Portable and quiet'],
    cons: ['Wind limits (cannot fly in strong wind)', 'Smaller sensor than Mavic series', 'Battery life ~34min', 'Cannot fly in rain'],
    usedTip: 'Check gimbal for scratches, test all obstacle sensors, demand Fly More Combo for extra batteries',
    creatorUses: ['amir-shah', 'rizuan-mustafa'],
  },
  {
    slug: 'dji-mavic-3-classic-review-malaysia',
    name: 'DJI Mavic 3 Classic',
    category: 'drone',
    image: '/gear/mavic-3-classic.jpg',
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
    pros: ['4/3 sensor = cinema quality', '5.1K 10-bit video', '46min battery life', 'Excellent wind resistance', 'Professional image quality'],
    cons: ['Requires CAAM drone license', 'Heavy (895g)', 'Expensive', 'Larger = more intimidating in public', 'ND filters required for video'],
    usedTip: 'CAAM license required for >250g — factor in RM500-800 cost. Check for gimbal issues common on used units.',
    creatorUses: ['rizuan-mustafa', 'amir-shah'],
  },
  {
    slug: 'canon-eos-r50-review-malaysia',
    name: 'Canon EOS R50',
    category: 'camera',
    image: '/gear/canon-r50.jpg',
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
    pros: ['Beautiful Canon color science', 'Flip-out screen for vlogging', 'Excellent Dual Pixel AF', 'Lightweight and compact', 'Great for beginners'],
    cons: ['Limited RF-S lens selection', 'Kit lens is slow (f/6.3)', 'No IBIS', '4K has slight crop', 'RF lenses more expensive than EF'],
    usedTip: 'Check for kit lens wobble common on 18-45mm, test eye AF in video mode, bring an SD card',
    creatorUses: ['sarah-azman', 'diana-ishak'],
  },
  {
    slug: 'xiaomi-14-ultra-review-malaysia',
    name: 'Xiaomi 14 Ultra',
    category: 'mobile',
    image: '/gear/xiaomi-14-ultra.jpg',
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
    pros: ['1-inch sensor best-in-class for phone', 'Leica optics and color science', '5x optical zoom', 'Excellent low-light', 'Charges and edits in one device'],
    cons: ['MIUI software still has bloatware', 'No eSIM on some Malaysia units', 'Heavy compared to other phones', 'Video stabilization not as good as iPhone', 'Resale value drops fast'],
    usedTip: 'Check for MIUI account lock, inspect Leica lens glass for scratches, test all 4 cameras',
    creatorUses: ['tim-rahman', 'aina-syazwani'],
  },
  {
    slug: 'sony-zv-e10-review-malaysia-second-hand',
    name: 'Sony ZV-E10',
    category: 'camera',
    image: '/gear/sony-zv-e10.jpg',
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
    pros: ['Built for content creators specifically', 'Product Showcase Mode is incredible for reviews', 'Background defocus button', 'Directional mic included', 'Flip-out screen', 'Great starter price used'],
    cons: ['No viewfinder', 'Plastic build', 'No IBIS', '4K 30fps limit (no 60fps)', 'Battery life average'],
    usedTip: 'Test Product Showcase Mode, check the directional mic for wind damage, ensure flip screen hinge is tight',
    creatorUses: ['diana-ishak', 'fikri-haron'],
  },
  {
    slug: 'gopro-hero-13-review-malaysia',
    name: 'GoPro Hero 13',
    category: 'action',
    image: '/gear/gopro-hero-13.jpg',
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
- Driving/car content (suction cup mount)
- Water park/pool content (waterproof)
- Gym workout videos (tripod or chest mount)
- Motorcycle/cycling content
- Behind-the-scenes of photo shoots

**Earning with a GoPro:**
- RM200-400: A day of automotive content for a car dealer
- RM300-500: A week of construction progress POV
- RM150-300: A single cooking tutorial POV
- RM100-200: B-roll footage for corporate videos
- RM400-800/month: Regular content for a car workshop or gym

**The "mounted camera" advantage:** A GoPro on a chest mount or head mount lets you shoot hands-free content that looks immersive. This is content that's hard to create with a phone or DSLR — giving you a unique selling point.`,
    pros: ['Best action cam ecosystem', 'HyperSmooth 6.0 stabilization', 'Waterproof 10m', 'Huge mount selection on Shopee/Lazada', 'Built-in mounting'],
    cons: ['Small sensor struggles in low light', 'Battery life ~60min recording', 'Expensive new', 'GoPro subscription is pushed aggressively', 'Minor upgrade from Hero 12'],
    usedTip: 'Check for overheating (record 4K for 20min), inspect lens for scratches, ensure Bluetooth/WiFi works',
    creatorUses: ['farid-johari', 'zamri-nasir'],
  },
];

export const categories = [
  { id: 'all', label: 'All Gear' },
  { id: 'camera', label: 'Cameras & DSLR' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'drone', label: 'Drones' },
  { id: 'action', label: 'Action / 360°' },
] as const;

export function getGearBySlug(slug: string) {
  return gearList.find(g => g.slug === slug) || null;
}

export function getGearByCategory(cat: string) {
  if (cat === 'all') return gearList;
  return gearList.filter(g => g.category === cat);
}
