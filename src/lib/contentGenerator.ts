/**
 * Content Generator — Lazy Creator Mode
 * Auto-generates article templates from minimal input
 * User provides: YouTube URL, title, main points
 * System generates: Full article with SEO structure, headings, examples
 */

export interface ContentInputMinimal {
  title: string;
  videoUrl?: string;
  mainPoints: string[]; // 3-5 bullet points
  category: 'guide' | 'inspiration' | 'comparison' | 'gear';
  gearRelated?: string[]; // gear slugs
}

export interface GeneratedArticle {
  title: string;
  slug: string;
  description: string;
  content: string;
  tags: string[];
  readTime: number;
  category: 'guide' | 'inspiration' | 'comparison' | 'gear';
  relatedGear: string[];
}

// Template: Turn YouTube URL into article
export function generateFromYouTubeUrl(
  videoUrl: string,
  title: string,
  mainPoints: string[],
  category: 'guide' | 'inspiration' | 'comparison' | 'gear'
): GeneratedArticle {
  const videoId = extractYouTubeId(videoUrl);
  const slug = titleToSlug(title);
  const readTime = estimateReadTime(mainPoints);

  // Detect type from title
  const isReview = title.toLowerCase().includes('review') || title.toLowerCase().includes('vs');
  const isGuide = category === 'guide' || title.toLowerCase().includes('how to');

  const description = generateDescription(title, mainPoints);
  const content = generateFullArticle(title, mainPoints, category, videoId);
  const tags = generateTags(title, category);

  return {
    title,
    slug,
    description,
    content,
    tags,
    readTime,
    category,
    relatedGear: [], // User fills this in manually if needed
  };
}

// Template: Generate from TikTok creator stats
export function generateCreatorInspirationArticle(
  creatorName: string,
  earnings: number,
  monthsToProfit: number,
  mainGear: string[], // e.g., ['sony-a6100', 'dji-mini-4-pro']
  mainPoints: string[]
): GeneratedArticle {
  const title = `${creatorName} Went from Zero to RM${earnings}/Month with ${mainGear[0] ? 'a ' + mainGear[0].replace('-', ' ').toUpperCase() : 'Nothing'}`;
  const slug = titleToSlug(title);
  const readTime = estimateReadTime(mainPoints);

  const description = `${creatorName} earned RM${earnings}/month in just ${monthsToProfit} months. Here's exactly what they did and what gear they used.`;
  const content = generateCreatorStoryTemplate(
    creatorName,
    earnings,
    monthsToProfit,
    mainGear,
    mainPoints
  );
  const tags = ['inspiration', 'success-story', 'earnings', creatorName.toLowerCase().replace(' ', '-')];

  return {
    title,
    slug,
    description,
    content,
    tags,
    readTime,
    category: 'inspiration',
    relatedGear: mainGear,
  };
}

// Template: Quick gear comparison (minimal input)
export function generateGearComparisonQuick(
  gear1: { name: string; price: number; prosCount: number },
  gear2: { name: string; price: number; prosCount: number },
  mainPoints: string[],
  winner?: string
): GeneratedArticle {
  const title = `${gear1.name} vs ${gear2.name}: Which Should You Buy in Malaysia 2026?`;
  const slug = titleToSlug(title);
  const readTime = estimateReadTime(mainPoints);

  const description = `Head-to-head: ${gear1.name} (RM${gear1.price}) vs ${gear2.name} (RM${gear2.price}). We break down the winner for Malaysian creators.`;
  const content = generateComparisonArticle(gear1, gear2, mainPoints, winner);
  const tags = ['comparison', gear1.name.toLowerCase(), gear2.name.toLowerCase(), 'budget'];

  return {
    title,
    slug,
    description,
    content,
    tags,
    readTime,
    category: 'comparison',
    relatedGear: [],
  };
}

// Template: Price comparison with ROI
export function generatePriceComparisonArticle(
  productName: string,
  prices: { retailer: string; price: number }[],
  earningPotential: number,
  mainPoints: string[]
): GeneratedArticle {
  const avgPrice = Math.round(
    prices.reduce((sum, p) => sum + p.price, 0) / prices.length
  );
  const title = `${productName} Price Comparison Malaysia 2026: Where to Buy (RM${avgPrice} Average)`;
  const slug = titleToSlug(title);
  const readTime = estimateReadTime(mainPoints);

  const description = `Shopping for a ${productName}? We compared prices at Shopee, Lazada, Mudah.my, and physical stores. Save up to RM${Math.max(...prices.map(p => p.price)) - Math.min(...prices.map(p => p.price))}.`;
  const content = generatePriceGuide(productName, prices, earningPotential, mainPoints);
  const tags = ['price-comparison', 'shopping', 'deals', productName.toLowerCase()];

  return {
    title,
    slug,
    description,
    content,
    tags,
    readTime,
    category: 'gear',
    relatedGear: [],
  };
}

// ─── INTERNAL HELPERS ───

function extractYouTubeId(url: string): string {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
  const match = url.match(regex);
  return match ? match[1] : '';
}

function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60);
}

function estimateReadTime(points: string[]): number {
  const avgCharsPerMin = 200;
  const totalChars = points.reduce((sum, p) => sum + p.length, 0) + 500;
  return Math.max(3, Math.ceil(totalChars / avgCharsPerMin));
}

function generateDescription(title: string, points: string[]): string {
  const firstPoint = points[0] || '';
  return `${title.replace(/[?!]$/, '')}. ${firstPoint}. Learn the full story.`.slice(
    0,
    155
  );
}

function generateTags(title: string, category: string): string[] {
  const titleWords = title
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(w => w.length > 3 && !['that', 'this', 'with', 'from', 'your'].includes(w))
    .slice(0, 3);

  return [category, ...titleWords, 'malaysia', '2026'];
}

function generateFullArticle(
  title: string,
  points: string[],
  category: string,
  videoId: string
): string {
  let content = `# ${title}\n\n`;

  if (videoId) {
    content += `> **Watch this on YouTube:** https://youtube.com/watch?v=${videoId}\n\n`;
  }

  content += `## Overview\n\n`;
  content += `${points[0] || 'This is a detailed guide for Malaysian content creators.'}\n\n`;

  content += `## Key Points\n\n`;
  points.forEach((point, i) => {
    content += `${i + 1}. ${point}\n`;
  });

  content += `\n## Detailed Breakdown\n\n`;
  points.forEach((point) => {
    const heading = point.split(':')[0].trim();
    content += `### ${heading}\n\n`;
    content += `${point}\n\n`;
  });

  content += `## Bottom Line\n\n`;
  content += `${points[0]?.substring(0, 100)}... This matters for Malaysian creators because the market is growing rapidly.\n\n`;

  content += `## Next Steps\n\n`;
  content += `- Try implementing the first step this week\n`;
  content += `- Come back and share your results\n`;
  content += `- Scale what works\n`;

  return content;
}

function generateCreatorStoryTemplate(
  creatorName: string,
  earnings: number,
  monthsToProfit: number,
  mainGear: string[],
  mainPoints: string[]
): string {
  let content = `# How ${creatorName} Earned RM${earnings}/Month in ${monthsToProfit} Months\n\n`;

  content += `${creatorName} started with nothing. Today, they're earning RM${earnings}/month from content creation. Here's exactly what they did.\n\n`;

  content += `## The Setup\n\n`;
  content += `**Main gear:**\n`;
  mainGear.forEach(gear => {
    content += `- ${gear.replace(/-/g, ' ').toUpperCase()}\n`;
  });

  content += `\n**Time invested:** ${monthsToProfit} months to profitability\n`;
  content += `**Monthly earnings:** RM${earnings}\n\n`;

  content += `## The Strategy\n\n`;
  mainPoints.forEach((point, i) => {
    content += `### ${i + 1}. ${point}\n\n`;
    content += `${point.toLowerCase()}\n\n`;
  });

  content += `## The Timeline\n\n`;
  for (let month = 1; month <= Math.min(monthsToProfit, 6); month++) {
    const monthEarning = Math.round((earnings / monthsToProfit) * month);
    content += `**Month ${month}:** RM${monthEarning} earned\n`;
  }

  content += `\n## What You Can Learn\n\n`;
  content += `If you're in Malaysia and want to replicate this success:\n`;
  content += `1. Start with exactly what they started with\n`;
  content += `2. Pick a specific niche (not "content creation" — be specific)\n`;
  content += `3. Post consistently for 30 days before buying any gear\n`;
  content += `4. Track what works and double down\n`;

  return content;
}

function generateComparisonArticle(
  gear1: { name: string; price: number; prosCount: number },
  gear2: { name: string; price: number; prosCount: number },
  mainPoints: string[],
  winner?: string
): string {
  let content = `# ${gear1.name} vs ${gear2.name}\n\n`;
  content += `**Quick answer:** `;
  if (winner === gear1.name) {
    content += `${gear1.name} if budget is tight. ${gear2.name} if you need professional features.\n\n`;
  } else if (winner === gear2.name) {
    content += `${gear2.name} is the better value. ${gear1.name} is only worth it if you specifically need X.\n\n`;
  } else {
    content += `Depends on your use case — see below.\n\n`;
  }

  content += `| Feature | ${gear1.name} | ${gear2.name} |\n`;
  content += `|---------|${'-'.repeat(gear1.name.length)}|${'-'.repeat(gear2.name.length)}|\n`;
  content += `| Price (MYR) | RM${gear1.price} | RM${gear2.price} |\n`;
  content += `| Best for | ? | ? |\n\n`;

  content += `## Detailed Comparison\n\n`;
  mainPoints.forEach((point) => {
    content += `### ${point}\n\n`;
  });

  content += `## Verdict\n\n`;
  content += `Choose ${gear1.name} if you have less than RM${gear1.price}.\n`;
  content += `Choose ${gear2.name} if you have RM${gear2.price} or more.\n`;

  return content;
}

function generatePriceGuide(
  productName: string,
  prices: { retailer: string; price: number }[],
  earningPotential: number,
  mainPoints: string[]
): string {
  const cheapest = Math.min(...prices.map(p => p.price));
  const mostExpensive = Math.max(...prices.map(p => p.price));
  const savings = mostExpensive - cheapest;

  let content = `# Where to Buy ${productName} in Malaysia (Best Prices)\n\n`;
  content += `**Price range:** RM${cheapest} - RM${mostExpensive}\n`;
  content += `**Potential savings:** Up to RM${savings}\n`;
  content += `**Payback time:** With RM${earningPotential}/month income, breaks even in ${Math.ceil(cheapest / earningPotential)} month(s)\n\n`;

  content += `## Price Comparison\n\n`;
  content += `| Retailer | Price (MYR) | Availability | Recommendation |\n`;
  content += `|----------|-------------|--------------|----------------|\n`;

  prices.forEach(p => {
    content += `| ${p.retailer} | RM${p.price} | ? | ? |\n`;
  });

  content += `\n## Where to Buy\n\n`;
  mainPoints.forEach((point, i) => {
    content += `${i + 1}. ${point}\n`;
  });

  content += `\n## Pro Tips\n\n`;
  content += `- Check Shopee and Lazada for current promos (change weekly)\n`;
  content += `- Ask for bundle discounts if buying gear + accessories\n`;
  content += `- Used ${productName} on Mudah.my often RM40-50% cheaper\n`;
  content += `- Join Malaysia content creator groups for group buys\n`;

  return content;
}
