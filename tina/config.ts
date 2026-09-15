import { defineConfig } from 'tinacms';

const slugify = (value?: string) =>
  (value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const CREATOR_CATEGORIES = [
  'mirrorless', 'dslr', 'vlogging', 'action-cam', '360-camera', 'drone',
  'lens', 'gimbal', 'microphone', 'creator-gear', 'phone', 'other',
];

const ARTICLE_FORMATS = ['guide', 'inspiration', 'comparison', 'gear'];

const SECURITY_CATEGORIES = [
  'cctv', 'factory-security', 'warehouse-security', 'retail-security',
  'office-security', 'ai-surveillance', 'nvr', 'poe', 'access-control',
  'perimeter', 'home-security', 'business-security',
];

const GEAR_CATEGORIES = ['camera', 'mobile', 'drone', 'action', 'audio', 'security', 'dashcam'];

const ENVIRONMENTS = ['factory', 'warehouse', 'retail', 'office', 'home', 'outdoor', 'mixed'];

const DEPLOYMENTS = ['nvr-poe', 'wifi', 'cloud', 'hybrid'];

const AI_FEATURES = [
  'facial-recognition', 'lpr-anpr', 'line-crossing', 'loitering',
  'people-counting', 'intrusion', 'motion-tracking', 'two-way-audio',
  'alarm-integration', 'smart-search', 'event-playback', 'remote-access', 'cybersecurity',
];

const imageCurationFields = [
  { type: 'string', name: 'caption', label: 'Caption' },
  { type: 'string', name: 'context', label: 'Context' },
  { type: 'string', name: 'purpose', label: 'Purpose', options: ['hero', 'inline', 'gallery', 'sidebar'] },
  { type: 'string', name: 'position', label: 'Position', description: 'e.g. After intro, Before conclusion' },
  { type: 'string', name: 'alt', label: 'Alt text' },
  { type: 'string', name: 'credit', label: 'Photo credit' },
  { type: 'string', name: 'sourceUrl', label: 'Source URL' },
  { type: 'string', name: 'filename', label: 'Filename', description: 'Local file in public/images/' },
  { type: 'string', name: 'aspectRatio', label: 'Aspect ratio', options: ['16/9', '4/3', '1/1', '3/2'] },
  { type: 'string', name: 'notes', label: 'Notes', ui: { component: 'textarea' } },
  { type: 'boolean', name: 'active', label: 'Active' },
];

export default defineConfig({
  branch:
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    'main',

  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      // ──────────────────────────────────────────────────────
      // Articles
      // ──────────────────────────────────────────────────────
      {
        name: 'article',
        label: 'Articles',
        path: 'content/articles',
        format: 'md',
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => slugify((values?.slug as string) || (values?.title as string)),
          },
          itemProps: (item) => ({
            label: `${item?.title ?? item?._sys?.filename ?? 'Untitled'}`,
          }),
        },
        fields: [
          {
            type: 'string',
            name: 'slug',
            label: 'Slug',
            required: true,
            description: 'URL slug, e.g. content-creator-malaysia-no-money-start',
          },
          { type: 'string', name: 'title', label: 'Title', required: true, isTitle: true },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'image',
            label: 'Image path',
            description: 'e.g. /blog/start-zero.jpg',
          },
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            required: true,
            options: ARTICLE_FORMATS,
          },
          {
            type: 'string',
            name: 'verticalCategory',
            label: 'Vertical category',
            description: 'Creator sub-niche for filtering',
            options: CREATOR_CATEGORIES,
          },
          {
            type: 'number',
            name: 'readTime',
            label: 'Read time (minutes)',
            required: true,
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Publish date',
            required: true,
            ui: { dateFormat: 'YYYY-MM-DD' },
          },
          {
            type: 'string',
            name: 'lang',
            label: 'Language',
            description: 'Leave empty for English',
            options: ['ms', 'zh'],
          },
          {
            type: 'string',
            name: 'status',
            label: 'Status',
            options: ['published', 'draft', 'scheduled'],
          },
          { type: 'string', name: 'author', label: 'Author' },
          { type: 'string', name: 'tags', label: 'Tags', list: true },
          {
            type: 'string',
            name: 'relatedGear',
            label: 'Related gear slugs',
            list: true,
            description: 'Slugs from /gear, e.g. nikon-d3100-review-malaysia-second-hand-price',
          },
          {
            type: 'string',
            name: 'relatedArticles',
            label: 'Related article slugs',
            list: true,
          },
          {
            type: 'string',
            name: 'seoTitle',
            label: 'SEO title override',
            description: 'If set, used in <title> and OpenGraph instead of title',
          },
          {
            type: 'string',
            name: 'seoDescription',
            label: 'SEO description override',
            description: 'If set, used in meta description instead of description',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'featuredImage',
            label: 'Featured image override',
            description: 'Override hero image for card/thumbnail display',
          },
          {
            type: 'string',
            name: 'gallery',
            label: 'Image gallery',
            list: true,
            description: 'Paths to gallery images',
          },
          {
            type: 'datetime',
            name: 'updatedAt',
            label: 'Last updated',
            ui: { dateFormat: 'YYYY-MM-DD' },
          },
          {
            type: 'datetime',
            name: 'reviewedAt',
            label: 'Reviewed at',
            description: 'Date content was fact-checked',
            ui: { dateFormat: 'YYYY-MM-DD' },
          },
          {
            type: 'object',
            name: 'roiCreator',
            label: 'ROI Calculator',
            description: 'Gear ROI data for the calculator widget',
            fields: [
              { type: 'string', name: 'gearSlug', label: 'Gear slug', description: 'e.g. sony-a6100-review-malaysia-second-hand' },
              { type: 'number', name: 'priceUsed', label: 'Used price (MYR)' },
              { type: 'number', name: 'gigRate', label: 'Gig rate (MYR)' },
              { type: 'number', name: 'gigsToBreakEven', label: 'Gigs to break even' },
            ],
          },
          {
            type: 'object',
            name: 'imageCuration',
            label: 'Image Curation',
            description: 'Control where images appear in the article body',
            list: true,
            fields: imageCurationFields,
          },
          {
            type: 'object',
            name: 'qaPairs',
            label: 'Q&A Pairs (SEO)',
            description: 'Questions people actually search + answers. Shows as accordion at bottom of article.',
            list: true,
            fields: [
              { type: 'string', name: 'question', label: 'Question', required: true },
              { type: 'string', name: 'answer', label: 'Answer', required: true, ui: { component: 'textarea' } },
            ],
          },
          { type: 'rich-text', name: 'body', label: 'Content', isBody: true },
        ],
      },

      // ──────────────────────────────────────────────────────
      // Security Systems
      // ──────────────────────────────────────────────────────
      {
        name: 'securitySystem',
        label: 'Security Systems',
        path: 'content/security',
        format: 'md',
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => slugify((values?.slug as string) || (values?.title as string)),
          },
          itemProps: (item) => ({
            label: `${item?.title ?? item?._sys?.filename ?? 'Untitled'}`,
          }),
        },
        fields: [
          {
            type: 'string',
            name: 'slug',
            label: 'Slug',
            required: true,
          },
          { type: 'string', name: 'title', label: 'Title', required: true, isTitle: true },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'image',
            label: 'Image path',
            description: 'e.g. /security/hikvision-setup.jpg',
          },
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            required: true,
            options: SECURITY_CATEGORIES,
          },
          {
            type: 'string',
            name: 'status',
            label: 'Status',
            options: ['published', 'draft', 'scheduled'],
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Publish date',
            required: true,
            ui: { dateFormat: 'YYYY-MM-DD' },
          },
          {
            type: 'string',
            name: 'lang',
            label: 'Language',
            options: ['en', 'ms', 'zh'],
          },
          {
            type: 'number',
            name: 'readTime',
            label: 'Read time (minutes)',
            required: true,
          },
          { type: 'string', name: 'author', label: 'Author' },
          { type: 'string', name: 'tags', label: 'Tags', list: true },
          {
            type: 'datetime',
            name: 'updatedAt',
            label: 'Last updated',
            ui: { dateFormat: 'YYYY-MM-DD' },
          },
          {
            type: 'datetime',
            name: 'reviewedAt',
            label: 'Reviewed at',
            ui: { dateFormat: 'YYYY-MM-DD' },
          },
          {
            type: 'string',
            name: 'environment',
            label: 'Environment',
            options: ENVIRONMENTS,
          },
          {
            type: 'string',
            name: 'deployment',
            label: 'Deployment type',
            options: DEPLOYMENTS,
          },
          {
            type: 'string',
            name: 'systemLineup',
            label: 'System lineup',
            description: 'e.g. 8-camera NVR kit, 4-camera WiFi kit',
          },
          { type: 'number', name: 'systemCost', label: 'System cost (MYR)' },
          { type: 'number', name: 'installationCost', label: 'Installation cost (MYR)' },
          { type: 'number', name: 'maintenanceCost', label: 'Annual maintenance (MYR)' },
          {
            type: 'number',
            name: 'usefulLife',
            label: 'Useful life (years)',
          },
          {
            type: 'object',
            name: 'cameras',
            label: 'Cameras',
            list: true,
            fields: [
              { type: 'string', name: 'model', label: 'Model' },
              { type: 'string', name: 'role', label: 'Role / placement' },
              { type: 'number', name: 'quantity', label: 'Quantity' },
              { type: 'string', name: 'resolution', label: 'Resolution' },
              { type: 'string', name: 'nightVision', label: 'Night vision' },
              { type: 'string', name: 'aiDetection', label: 'AI detection' },
              { type: 'number', name: 'unitPriceNew', label: 'Unit price new (MYR)' },
              { type: 'number', name: 'unitPriceUsed', label: 'Unit price used (MYR)' },
              { type: 'boolean', name: 'poe', label: 'PoE' },
              { type: 'boolean', name: 'wifi', label: 'WiFi' },
            ],
          },
          {
            type: 'string',
            name: 'aiFeatures',
            label: 'AI features',
            list: true,
            options: AI_FEATURES,
          },
          {
            type: 'object',
            name: 'storage',
            label: 'Storage',
            fields: [
              { type: 'number', name: 'localTB', label: 'Local (TB)' },
              { type: 'boolean', name: 'cloud', label: 'Cloud backup' },
            ],
          },
          {
            type: 'object',
            name: 'networking',
            label: 'Networking',
            fields: [
              { type: 'boolean', name: 'poe', label: 'PoE' },
              { type: 'boolean', name: 'wifi', label: 'WiFi' },
              { type: 'boolean', name: 'nvr', label: 'NVR' },
              { type: 'number', name: 'nvrChannels', label: 'NVR channels' },
            ],
          },
          {
            type: 'object',
            name: 'incidentRoi',
            label: 'Incident ROI',
            description: 'Estimated loss prevention value',
            fields: [
              { type: 'string', name: 'incidentType', label: 'Incident type' },
              { type: 'number', name: 'dailyLossEstimate', label: 'Daily loss estimate (MYR)' },
              { type: 'number', name: 'incidentsPerMonth', label: 'Incidents per month' },
              { type: 'number', name: 'preventionRate', label: 'Prevention rate (%)' },
              { type: 'string', name: 'notes', label: 'Notes', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'string',
            name: 'relatedGear',
            label: 'Related gear slugs',
            list: true,
          },
          {
            type: 'string',
            name: 'relatedArticles',
            label: 'Related article slugs',
            list: true,
          },
          {
            type: 'string',
            name: 'seoTitle',
            label: 'SEO title override',
          },
          {
            type: 'string',
            name: 'seoDescription',
            label: 'SEO description override',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'featuredImage',
            label: 'Featured image override',
          },
          {
            type: 'string',
            name: 'gallery',
            label: 'Image gallery',
            list: true,
          },
          {
            type: 'object',
            name: 'imageCuration',
            label: 'Image Curation',
            list: true,
            fields: imageCurationFields,
          },
          { type: 'rich-text', name: 'body', label: 'Content', isBody: true },
        ],
      },

      // ──────────────────────────────────────────────────────
      // Gear Reviews
      // ──────────────────────────────────────────────────────
      {
        name: 'gear',
        label: 'Gear Reviews',
        path: 'content/gear',
        format: 'md',
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => slugify((values?.slug as string) || (values?.name as string)),
          },
          itemProps: (item) => ({
            label: `${item?.name ?? item?._sys?.filename ?? 'Untitled'}`,
          }),
        },
        fields: [
          {
            type: 'string',
            name: 'slug',
            label: 'Slug',
            required: true,
            description: 'URL slug, e.g. sony-a6100-review-malaysia-second-hand',
          },
          { type: 'string', name: 'name', label: 'Product name', required: true, isTitle: true },
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            required: true,
            options: GEAR_CATEGORIES,
          },
          {
            type: 'string',
            name: 'level',
            label: 'Skill level',
            required: true,
            options: ['beginner', 'mid', 'pro'],
          },
          {
            type: 'number',
            name: 'priceNew',
            label: 'Price new (MYR)',
            required: true,
          },
          {
            type: 'number',
            name: 'priceUsed',
            label: 'Price used (MYR)',
            required: true,
          },
          { type: 'string', name: 'type', label: 'Type', description: 'e.g. Mirrorless, DSLR, Action cam, Dome, Bullet' },
          { type: 'string', name: 'sensor', label: 'Sensor', description: 'e.g. APS-C, Full-frame, 1/1.7"' },
          { type: 'string', name: 'video', label: 'Video specs', description: 'e.g. 4K30, 1080p60' },
          { type: 'string', name: 'weight', label: 'Weight', description: 'e.g. 450g, 1.2kg' },
          {
            type: 'number',
            name: 'rating',
            label: 'Rating (0-100)',
            required: true,
            description: 'Overall score out of 100',
          },
          {
            type: 'number',
            name: 'roiScore',
            label: 'ROI score (0-100)',
            required: true,
            description: 'Return on investment score',
          },
          {
            type: 'string',
            name: 'excerpt',
            label: 'Excerpt',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'rich-text',
            name: 'content',
            label: 'Full review',
            isBody: true,
          },
          {
            type: 'string',
            name: 'pros',
            label: 'Pros',
            list: true,
          },
          {
            type: 'string',
            name: 'cons',
            label: 'Cons',
            list: true,
          },
          {
            type: 'string',
            name: 'roiDesc',
            label: 'ROI description',
            description: 'How this gear pays for itself',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'usedTip',
            label: 'Used buying tip',
            description: 'What to check when buying second-hand',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'creatorUses',
            label: 'Creator use cases',
            list: true,
            description: 'How creators use this gear',
          },
        ],
      },
    ],
  },
});
