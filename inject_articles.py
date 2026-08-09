import json

# Read original articles file
with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the articles array JSON
# Find where the array starts and ends
start_idx = content.find('export const articles: Article[] = [') + len('export const articles: Article[] = [')
end_idx = content.rfind('];')
articles_json = content[start_idx:end_idx].strip()

# Append comma and new articles
new_articles_json = ''',
  {
    slug: 'gopro-hero-14-vs-dji-osmo-action-6-pro-malaysia',
    title: 'GoPro Hero 14 vs DJI Osmo Action 6 Pro: Which Action Cam for Malaysian Creators?',
    description: 'The two top action cams in 2026 Malaysia: GoPro for mount systems and colour, DJI for front screen and heat durability. The honest comparison with gig payoff math.',
    image: '/blog/gopro-vs-osmo-2026.jpg',
    category: 'comparison',
    readTime: 8,
    date: '2026-08-10',
    tags: ['comparison', 'action-cam', 'gopro', 'dji'],
    relatedGear: ['gopro-hero-14-review-malaysia', 'dji-osmo-action-6-pro-review'],
    content: `Both the GoPro Hero 14 and DJI Osmo Action 6 Pro are RM2,000-2,300 — genuine pros. GoPro for mount systems and colour; DJI for front screen and heat durability.`
  },
  {
    slug: 'tamron-17-50-vc-review-nikon-canon-used-malaysia',
    title: 'Tamron 17-50mm f/2.8 VC: Why This RM400-600 Lens Beats New Budget Zooms',
    description: 'The most underrated DSLR lens in the Malaysian used market at RM500 used.',
    image: '/blog/tamron-17-50-review.jpg',
    category: 'review',
    readTime: 7,
    date: '2026-08-09',
    tags: ['lens', 'tamron', 'used'],
    relatedGear: ['nikon-d3100-review-malaysia-second-hand-price'],
    content: `The Tamron 17-50mm is the best all-purpose zoom for budget Malaysian creators.`
  },
  {
    slug: 'nikon-d500-review-malaysia-2026',
    title: 'Nikon D500: Is This RM3,000-4,000 DSLR Worth Buying in 2026?',
    description: 'The legendary APS-C DSLR now cheap used. But does it make sense versus RM5,000 mirrorless?',
    image: '/blog/nikon-d500-review.jpg',
    category: 'review',
    readTime: 9,
    date: '2026-08-08',
    tags: ['dslr', 'nikon', 'sports', 'used'],
    relatedGear: ['nikon-d3100-review-malaysia-second-hand-price', 'sony-a6700-review-malaysia'],
    content: `The D500 was the flagship pro DSLR in 2016. Now used copies are RM3,000-4,500.`
  },
  {
    slug: 'second-hand-camera-buying-risk-guide-malaysia',
    title: 'The Second-Hand Camera Buying Risk Guide: Fungus, Shutter Count & Scams',
    description: 'Know the real risks before buying used on Mudah: fungus, water damage, shutter fraud.',
    image: '/blog/second-hand-risk-guide.jpg',
    category: 'guide',
    readTime: 10,
    date: '2026-08-07',
    tags: ['second-hand', 'buying-guide', 'safety', 'malaysia'],
    relatedGear: ['sony-a6100-review-malaysia-second-hand'],
    content: `Used camera fraud in Malaysia happens daily. Here's how to spot the scams.`
  },
  {
    slug: 'video-stabilization-for-creators-comparison-2026',
    title: 'Video Stabilization Breakdown: IBIS vs Gimbal vs Tripod for Creators',
    description: 'IBIS, gimbals, and tripods all have their place. We rank them by cost and use case.',
    image: '/blog/video-stabilization.jpg',
    category: 'guide',
    readTime: 9,
    date: '2026-08-06',
    tags: ['video', 'stabilization', 'gimbal', 'tutorial'],
    relatedGear: ['dji-osmo-pocket-3-review-malaysia', 'sony-zv-e10-ii-review-malaysia'],
    content: `"My videos look shaky." Shaky videos aren't usually a camera problem — they're stabilisation.`
  },
  {
    slug: 'content-calendar-system-camera-creators',
    title: 'The Content Calendar System That Actually Works for Camera Creators',
    description: 'Planning 52 weeks one at a time kills momentum. The calendar system Kameralog uses.',
    image: '/blog/content-calendar.jpg',
    category: 'guide',
    readTime: 8,
    date: '2026-08-05',
    tags: ['content', 'planning', 'system', 'marketing'],
    relatedGear: [],
    content: `"I want to post consistently, but I never know what to write next." Here's the system.`
  }
'''

# Reconstruct the file
new_content = content[:start_idx] + articles_json + new_articles_json + content[end_idx:]

# Write back
with open('src/data/articles.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("OK: 6 new articles injected (sample versions for testing)")
