// Curated short-video library — the "Kameralog TV / Video Wall".
// Every entry is a real, hand-picked YouTube tutorial useful to a Malaysian
// content creator starting from zero (skills first, gear second).
//
// To add a video: paste the YouTube ID after watch?v= into `youtubeId`,
// give it a short title + description, pick a category slug from below,
// and an optional duration string. Thumbnails are auto-fetched from YouTube.

export type VideoCategory =
  | 'mobile'
  | 'portrait'
  | 'camera'
  | 'drone'
  | 'handheld'
  | 'editing'
  | 'lighting';

export interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  category: VideoCategory;
  channel: string;
  duration?: string;
  views?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

export const videoCategories: { id: VideoCategory | 'all'; label: string; emoji: string }[] = [
  { id: 'all', label: 'All Videos', emoji: '🎬' },
  { id: 'mobile', label: 'Mobile', emoji: '📱' },
  { id: 'portrait', label: 'Portrait', emoji: '🧑‍🎤' },
  { id: 'camera', label: 'DSLR & Mirrorless', emoji: '📷' },
  { id: 'drone', label: 'Drones', emoji: '🛸' },
  { id: 'handheld', label: 'Handheld & Gimbal', emoji: '🎥' },
  { id: 'editing', label: 'Editing & AI', emoji: '🎞️' },
  { id: 'lighting', label: 'Lighting', emoji: '💡' },
];

export const videos: VideoItem[] = [
  {
    id: 'mobile-pro-tips',
    youtubeId: 'Bmn_GI4xZBQ',
    title: '11 Simple Tips to Capture Professional Photos With Your Phone',
    description: 'Pro photographer walks through simple phone shooting tricks — framing, lighting, and settings that turn a RM0 phone into a paying camera.',
    category: 'mobile',
    channel: 'Alex Armitage',
    duration: '11:10',
    views: '2.1M',
    level: 'beginner',
    tags: ['phone photography', 'framing', 'settings'],
  },
  {
    id: 'mobile-pro-mode',
    youtubeId: '2VYeViNUnPI',
    title: 'Mobile Photography: Pro Mode Tutorial!',
    description: 'Master Pro Mode on any Android phone — shutter, ISO, white balance — so you stop depending on auto and start shooting for gigs.',
    category: 'mobile',
    channel: 'Saurav Sinha',
    duration: '4:11',
    views: '3.4M',
    level: 'beginner',
    tags: ['pro mode', 'manual', 'settings'],
  },
  {
    id: 'smartphone-full-potential',
    youtubeId: 'CsUbA5E2uKc',
    title: 'Unlock Your Smartphone’s Full Camera Capabilities',
    description: 'The hidden phone camera features most beginners never touch — and why they matter more than buying new gear.',
    category: 'mobile',
    channel: 'Film Avenue',
    duration: '2:09',
    views: '640K',
    level: 'beginner',
    tags: ['phone camera', 'features', 'tips'],
  },
  {
    id: 'portrait-flagship-test',
    youtubeId: 'wQkyLmU00Lg',
    title: 'Portrait Mode: Xiaomi 15 Ultra vs S25 Ultra vs Vivo X200 Pro vs iPhone 16 Pro Max vs Pro Camera!',
    description: 'Real-world portrait shootout — see whether RM8,000 phones can match a pro camera, or if a used mirrorless is still the smarter buy.',
    category: 'portrait',
    channel: 'Versus',
    duration: '9:08',
    views: '980K',
    level: 'beginner',
    tags: ['portrait', 'vs', 'phones'],
  },
  {
    id: 'ultimate-portrait-test',
    youtubeId: '49yB8uRNsZQ',
    title: 'Ultimate PORTRAIT Test! 9 Flagships vs Pro Camera',
    description: 'Nine phones against a professional camera in one portrait test — instant clarity on what actually drives client-ready portraits.',
    category: 'portrait',
    channel: 'Versus',
    duration: '7:43',
    views: '760K',
    level: 'beginner',
    tags: ['portrait', 'comparison', 'bokeh'],
  },
  {
    id: 'dji-neo-beginners',
    youtubeId: 'hXTl5k-wPxE',
    title: 'DJI Neo — Complete Beginner’s Guide',
    description: 'The RM1,000 drone that flew into every Malaysian creator’s pocket. Set-up, palm control, safety, and first-flight settings.',
    category: 'drone',
    channel: 'UAV Coach',
    duration: '17:44',
    views: '1.1M',
    level: 'beginner',
    tags: ['dji neo', 'drone', 'beginner'],
  },
  {
    id: 'dji-mini-4k-tips',
    youtubeId: 'uthJOEcMI8Y',
    title: 'DJI Mini 4K — 34 Tips & Settings',
    description: '34 practical tips for the cheapest DJI 4K drone — flight settings, gimbal behaviour, and getting stable footage cheap.',
    category: 'drone',
    channel: 'DansTube.TV',
    duration: '22:51',
    views: '880K',
    level: 'beginner',
    tags: ['dji mini 4k', 'settings', 'drone'],
  },
  {
    id: 'dji-mini-3-settings',
    youtubeId: 'wa6Ku9lAS8E',
    title: 'Get BETTER DJI Mini 3 Videos With THESE Settings',
    description: 'Colour, resolution, frame rate and exposure settings for the Mini 3 line — the difference between hobby clips and paid aerial work.',
    category: 'drone',
    channel: 'The Drone Creative',
    duration: '10:26',
    views: '420K',
    level: 'intermediate',
    tags: ['dji mini 3', 'video settings', 'drone'],
  },
  {
    id: 'osmo-mobile-6',
    youtubeId: 'VENAGLV9EJM',
    title: 'DJI Osmo Mobile 6 — Complete Tutorial',
    description: 'Gimbal basics: active tracking, gesture control, and stabilised vlogs — the same rig Malaysian food reviewers use for walking shots.',
    category: 'handheld',
    channel: 'Otto Julian',
    duration: '9:44',
    views: '390K',
    level: 'beginner',
    tags: ['gimbal', 'osmo mobile', 'vlog'],
  },
  {
    id: 'handheld-no-stabilizer',
    youtubeId: 'NvYFW7NlsH8',
    title: 'How to Get Smoother Handheld Shots Without Stabilization',
    description: 'Free camera movement tricks that need no gimbal — the single most useful skill before you spend RM800 on stabilisation gear.',
    category: 'handheld',
    channel: 'Adorama Cinema',
    duration: '0:55',
    views: '170K',
    level: 'beginner',
    tags: ['handheld', 'no gimbal', 'stabilization'],
  },
  {
    id: 'davinci-beginner-2025',
    youtubeId: 'wUYUV_F4WQo',
    title: 'DaVinci Resolve Beginner Tutorial 2025',
    description: 'Full free editing course — cut your first video, fix audio, and export properly. Resolve is free forever, so your only cost is time.',
    category: 'editing',
    channel: 'Carl Tomich',
    duration: '26:14',
    views: '510K',
    level: 'beginner',
    tags: ['davinci resolve', 'free editing', '2025'],
  },
  {
    id: 'davinci-beginner-2025-vince',
    youtubeId: '5dqn9sy82q0',
    title: 'DaVinci Resolve 2025 — Full Tutorial for Beginners',
    description: 'Start-to-finish beginner walkthrough of the free editor: import, cut, colour, text overlays, and a clean YouTube export.',
    category: 'editing',
    channel: 'Vince Opra',
    duration: '34:02',
    views: '290K',
    level: 'beginner',
    tags: ['davinci resolve', 'beginner', 'export'],
  },
  {
    id: 'color-grade-beginners',
    youtubeId: 'jK_nYq4ZpgY',
    title: 'How to Color Grade in DaVinci Resolve for Beginners',
    description: 'The fastest way to a consistent “cinematic” look without LUT packs — balance, contrast, and skin-tone basics.',
    category: 'editing',
    channel: 'Think Media',
    duration: '12:09',
    views: '346K',
    level: 'intermediate',
    tags: ['color grading', 'davinci resolve', 'cinematic'],
  },
  {
    id: 'mirrorless-beginner-guide',
    youtubeId: 'EqiprODRzW8',
    title: '10-Minute Mirrorless Camera Guide for Beginners',
    description: 'Mirrorless explained simply: what the dials do, which modes matter, and why a used mirrorless beats a new entry DSLR for content.',
    category: 'camera',
    channel: 'TVR Creators',
    duration: '10:29',
    views: '150K',
    level: 'beginner',
    tags: ['mirrorless', 'beginner', 'settings'],
  },
  {
    id: 'mirrorless-filming-guide',
    youtubeId: '6JP-qFBjEuA',
    title: 'A Beginner’s Camera Guide for Filming Videos With a Mirrorless Camera',
    description: 'Exactly how to shoot clean video on a mirrorless — focus, exposure, frame rate, and the settings cheat-sheet for first videos.',
    category: 'camera',
    channel: 'Tom Wade',
    duration: '17:32',
    views: '95K',
    level: 'beginner',
    tags: ['mirrorless', 'video', 'settings'],
  },
  {
    id: 'one-light-portraits',
    youtubeId: 'Q6mAxRzZ7-M',
    title: 'Dramatic Portraits with One Light — Lighting Setup Tutorial',
    description: 'A single light, positioned and shaped well, produces professional-looking portraits. Joel Grimes shows the one-light setup step by step.',
    category: 'lighting',
    channel: 'Westcott Lighting',
    duration: '8:47',
    views: '98K',
    level: 'intermediate',
    tags: ['one light', 'portrait', 'budget'],
  },
  {
    id: 'studio-lighting-beginners',
    youtubeId: 'ME4tAIU-crY',
    title: 'Studio Lighting for Beginners — 4 Essential Portrait Lighting Patterns',
    description: 'Butterfly, split, loop and Rembrandt — the four lighting patterns every portrait gig pays you to know.',
    category: 'lighting',
    channel: 'Westcott Lighting',
    duration: '14:21',
    views: '76K',
    level: 'beginner',
    tags: ['studio lighting', 'patterns', 'portrait'],
  },
];

export function youtubeThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function youtubeEmbed(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}`;
}
