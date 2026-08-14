/**
 * Kameralog CMS — post-type registry.
 *
 * The site runs multiple editorial businesses under one roof. Each post type
 * (vertical) owns its own categories, custom fields, ROI model and editorial
 * language. This registry is the single source of truth for the admin panel,
 * the save API and the content sync pipeline. Adding a new vertical later
 * means adding one entry here — no new plumbing required.
 *
 * Pure module: safe to import from both server (route handlers) and client
 * (admin forms).
 */

export const BODY_FIELD = 'body';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'boolean'
  | 'date'
  | 'select'
  | 'multiselect'
  | 'list'
  | 'object';

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  hint?: string;
  required?: boolean;
  defaultValue?: unknown;
  /** Nested fields for object / list-of-objects fields */
  fields?: FieldDef[];
  /** Hide the field unless `values[showWhen.field] === equals` */
  showWhen?: { field: string; equals: unknown };
}

export interface PostTypeDef {
  id: string;
  label: string;
  singular: string;
  description: string;
  icon: string;
  folder: string;
  /** Frontmatter field that drives the per-vertical category tree */
  categoryField: string;
  /** Per-vertical category tree — NEVER shared between post types */
  categories: string[];
  categoriesHint?: string;
  fields: FieldDef[];
}

export const CREATOR_CATEGORIES = [
  'mirrorless',
  'dslr',
  'vlogging',
  'action-cam',
  '360-camera',
  'drone',
  'lens',
  'gimbal',
  'microphone',
  'creator-gear',
  'phone',
  'other',
] as const;

export const ARTICLE_FORMATS = ['guide', 'comparison', 'gear', 'inspiration'] as const;

export const SECURITY_CATEGORIES = [
  'cctv',
  'factory-security',
  'warehouse-security',
  'retail-security',
  'office-security',
  'ai-surveillance',
  'nvr',
  'poe',
  'access-control',
  'perimeter',
  'home-security',
  'business-security',
] as const;

export const ENVIRONMENTS = ['factory', 'warehouse', 'retail', 'office', 'home', 'outdoor', 'mixed'] as const;

export const DEPLOYMENTS = ['nvr-poe', 'wifi', 'cloud', 'hybrid'] as const;

export const AI_FEATURES = [
  'facial-recognition',
  'lpr-anpr',
  'line-crossing',
  'loitering',
  'people-counting',
  'intrusion',
  'motion-tracking',
  'two-way-audio',
  'alarm-integration',
  'smart-search',
  'event-playback',
  'remote-access',
  'cybersecurity',
] as const;

export const STATUSES = ['published', 'draft', 'scheduled'] as const;

export const LANGS = ['en', 'ms', 'zh'] as const;

const imageCurationFields: FieldDef[] = [
  { name: 'caption', label: 'Caption', type: 'text', hint: 'One line the reader sees under the image' },
  { name: 'context', label: 'Context', type: 'textarea', hint: 'Where this image lives (e.g. factory floor, CCTV monitoring room)' },
  { name: 'purpose', label: 'Purpose', type: 'select', options: ['hero', 'section-intro', 'comparison', 'spec-detail', 'roi-illustration', 'behind-the-scenes', 'gallery'] },
  { name: 'position', label: 'Body position', type: 'text', placeholder: 'After paragraph ~3, or [IMAGE CURATION #n] marker index' },
  { name: 'alt', label: 'Alt text', type: 'text' },
  { name: 'credit', label: 'Credit', type: 'text', hint: 'Photographer / licence (required for attribution)' },
  { name: 'sourceUrl', label: 'Source URL', type: 'text' },
  { name: 'filename', label: 'Local filename', type: 'text', placeholder: 'public/blog/my-image.jpg' },
  { name: 'aspectRatio', label: 'Aspect ratio', type: 'select', options: ['16/9', '4/3', '3/2', '1/1', '9/16'] },
  { name: 'notes', label: 'Editor notes', type: 'textarea' },
  { name: 'active', label: 'Active', type: 'boolean', defaultValue: true },
];

const articleFields: FieldDef[] = [
  { name: 'slug', label: 'Slug', type: 'text', required: true, hint: 'URL segment, lowercase with dashes', placeholder: 'best-mirrorless-camera-malaysia-2026' },
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Excerpt / meta description', type: 'textarea', required: true },
  { name: 'image', label: 'Hero image', type: 'text', hint: 'Unsplash id, local /blog path, or full URL' },
  { name: 'category', label: 'Article format', type: 'select', options: [...ARTICLE_FORMATS], required: true, hint: 'Drives the blog filter chips' },
  { name: 'verticalCategory', label: 'Vertical category', type: 'select', options: [...CREATOR_CATEGORIES], hint: 'Hobbyist/creator taxonomy — separate from the Security vertical' },
  { name: 'status', label: 'Status', type: 'select', options: [...STATUSES], defaultValue: 'draft', hint: 'Draft = hidden from the site. Published = visible after build.' },
  { name: 'date', label: 'Publish date', type: 'date', hint: 'Displayed on the article; also used for ordering' },
  { name: 'publishDate', label: 'Publish date (alias)', type: 'date' },
  { name: 'scheduledAt', label: 'Scheduled publish', type: 'date' },
  { name: 'updatedAt', label: 'Last updated', type: 'date' },
  { name: 'reviewedAt', label: 'Reviewed on', type: 'date', hint: 'Editorial review / freshness' },
  { name: 'author', label: 'Author', type: 'text' },
  { name: 'tags', label: 'Tags', type: 'list' },
  { name: 'relatedGear', label: 'Related gear slugs', type: 'list', hint: 'Slugs from src/data/gear.ts' },
  { name: 'relatedArticles', label: 'Related article slugs', type: 'list' },
  { name: 'lang', label: 'Real content language', type: 'select', options: [...LANGS], defaultValue: 'en' },
  { name: 'readTime', label: 'Read time (min)', type: 'number' },
  { name: 'seoTitle', label: 'SEO title', type: 'text' },
  { name: 'seoDescription', label: 'SEO description', type: 'textarea' },
  { name: 'featuredImage', label: 'Featured image (optional override)', type: 'text' },
  { name: 'gallery', label: 'Gallery images', type: 'list' },
  {
    name: 'roiCreator',
    label: 'Creator ROI (gig-to-gear)',
    type: 'object',
    fields: [
      { name: 'gearSlug', label: 'Gear slug', type: 'text', hint: 'Which gear this pays off' },
      { name: 'priceUsed', label: 'Second-hand price (RM)', type: 'number' },
      { name: 'gigRate', label: 'Average gig rate (RM)', type: 'number' },
      { name: 'gigsToBreakEven', label: 'Gigs to break even', type: 'number', hint: 'Auto ≈ priceUsed ÷ gigRate' },
    ],
  },
  { name: 'imageCuration', label: 'Image curation blocks', type: 'list', hint: 'Rendered at [IMAGE CURATION #n] markers in the body', fields: imageCurationFields },
];

const securitySystemFields: FieldDef[] = [
  { name: 'slug', label: 'Slug', type: 'text', required: true, hint: 'URL segment, lowercase with dashes', placeholder: 'hikvision-8-camera-nvr-factory-malaysia' },
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Excerpt / meta description', type: 'textarea', required: true },
  { name: 'image', label: 'Hero image', type: 'text', hint: 'Unsplash id, local path, or full URL' },
  { name: 'category', label: 'Security category', type: 'select', options: [...SECURITY_CATEGORIES], required: true, hint: 'Security vertical taxonomy — isolated from Creator categories' },
  { name: 'status', label: 'Status', type: 'select', options: [...STATUSES], defaultValue: 'draft' },
  { name: 'date', label: 'Publish date', type: 'date', hint: 'Displayed on the page; also used for ordering' },
  { name: 'publishDate', label: 'Publish date (alias)', type: 'date' },
  { name: 'scheduledAt', label: 'Scheduled publish', type: 'date' },
  { name: 'updatedAt', label: 'Last updated', type: 'date' },
  { name: 'reviewedAt', label: 'Reviewed on', type: 'date' },
  { name: 'author', label: 'Author', type: 'text' },
  { name: 'tags', label: 'Tags', type: 'list' },
  { name: 'lang', label: 'Real content language', type: 'select', options: [...LANGS], defaultValue: 'en' },
  { name: 'readTime', label: 'Read time (min)', type: 'number' },
  { name: 'environment', label: 'Environment', type: 'select', options: [...ENVIRONMENTS], hint: 'Where the system is deployed' },
  { name: 'deployment', label: 'Deployment model', type: 'select', options: [...DEPLOYMENTS] },
  { name: 'systemLineup', label: 'System lineup', type: 'text', placeholder: '8-camera NVR kit', hint: 'e.g. "8-camera NVR kit"' },
  {
    name: 'systemCost',
    label: 'System cost (RM)',
    type: 'number',
    hint: 'Hardware total, used by the ROI panel',
  },
  {
    name: 'installationCost',
    label: 'Installation cost (RM)',
    type: 'number',
  },
  {
    name: 'maintenanceCost',
    label: 'Maintenance / year (RM)',
    type: 'number',
  },
  {
    name: 'cameras',
    label: 'Camera fleet',
    type: 'list',
    fields: [
      { name: 'model', label: 'Model', type: 'text' },
      { name: 'role', label: 'Role', type: 'text', placeholder: 'Main gate, loading bay, cashier...' },
      { name: 'quantity', label: 'Quantity', type: 'number' },
      { name: 'resolution', label: 'Resolution', type: 'text', placeholder: '4MP / 8MP' },
      { name: 'nightVision', label: 'Night vision', type: 'text', placeholder: '30m IR / colour night vision' },
      { name: 'aiDetection', label: 'AI detection', type: 'text', placeholder: 'Human, LPR, line-crossing' },
      { name: 'unitPriceNew', label: 'Unit price new (RM)', type: 'number' },
      { name: 'unitPriceUsed', label: 'Unit price used (RM)', type: 'number' },
      { name: 'poe', label: 'PoE', type: 'boolean', defaultValue: false },
      { name: 'wifi', label: 'WiFi', type: 'boolean', defaultValue: false },
    ],
  },
  {
    name: 'aiFeatures',
    label: 'AI features',
    type: 'multiselect',
    options: [...AI_FEATURES],
  },
  {
    name: 'storage',
    label: 'Storage',
    type: 'object',
    fields: [
      { name: 'localTB', label: 'Local storage (TB)', type: 'number' },
      { name: 'cloud', label: 'Cloud backup', type: 'boolean', defaultValue: false },
    ],
  },
  {
    name: 'networking',
    label: 'Networking',
    type: 'object',
    fields: [
      { name: 'poe', label: 'PoE', type: 'boolean', defaultValue: false },
      { name: 'wifi', label: 'WiFi', type: 'boolean', defaultValue: false },
      { name: 'nvr', label: 'NVR', type: 'boolean', defaultValue: false },
      { name: 'nvrChannels', label: 'NVR channels', type: 'number' },
    ],
  },
  {
    name: 'incidentRoi',
    label: 'Incident / exposure ROI',
    type: 'object',
    hint: 'Exposure-based model. Never claim the camera WILL prevent a specific loss — present estimates and scenarios.',
    fields: [
      { name: 'incidentType', label: 'Incident type', type: 'text', placeholder: 'Night theft from loading bay' },
      { name: 'dailyLossEstimate', label: 'Estimated daily loss (RM)', type: 'number' },
      { name: 'incidentsPerMonth', label: 'Incidents per month', type: 'number' },
      { name: 'preventionRate', label: 'Estimated prevention rate (%)', type: 'number', hint: 'Your expectation of avoided incidents, not a guarantee' },
      { name: 'notes', label: 'Scenario notes', type: 'textarea' },
    ],
  },
  { name: 'relatedGear', label: 'Related gear slugs', type: 'list' },
  { name: 'relatedArticles', label: 'Related article slugs', type: 'list' },
  { name: 'seoTitle', label: 'SEO title', type: 'text' },
  { name: 'seoDescription', label: 'SEO description', type: 'textarea' },
  { name: 'featuredImage', label: 'Featured image (optional override)', type: 'text' },
  { name: 'gallery', label: 'Gallery images', type: 'list' },
  { name: 'imageCuration', label: 'Image curation blocks', type: 'list', fields: imageCurationFields },
];

export const POST_TYPES: Record<string, PostTypeDef> = {
  article: {
    id: 'article',
    label: 'Creator Articles',
    singular: 'Article',
    description: 'Hobbyist & creator camera editorial — mirrorless, DSLR, vlogging, action cams, drones, lenses. Reader question: "Can I afford this? How many gigs to break even?"',
    icon: '📷',
    folder: 'articles',
    categoryField: 'verticalCategory',
    categories: [...CREATOR_CATEGORIES],
    categoriesHint: 'Hobbyist taxonomy — never mixed with the Security vertical.',
    fields: articleFields,
  },
  securitySystem: {
    id: 'securitySystem',
    label: 'Security Systems',
    singular: 'Security system',
    description: 'Commercial security camera systems for factories, warehouses, retail & offices. Reader question: "What happens if I DON\'T buy this?" Incident/exposure-based ROI.',
    icon: '🛡️',
    folder: 'security',
    categoryField: 'category',
    categories: [...SECURITY_CATEGORIES],
    categoriesHint: 'Security vertical taxonomy — isolated from Creator categories.',
    fields: securitySystemFields,
  },
};

export function getPostType(id: string): PostTypeDef | null {
  return POST_TYPES[id] || null;
}

export function postTypeIds(): string[] {
  return Object.keys(POST_TYPES);
}

export function allCategories(postType: PostTypeDef): string[] {
  return postType.categories;
}

/* ------------------------------------------------------------------ */
/* Serialization helpers                                               */
/* ------------------------------------------------------------------ */

/** Strip "body" so it lives in the markdown body, not frontmatter. */
export function frontmatterFieldNames(fields: FieldDef[]): string[] {
  return fields.map(f => f.name).filter(n => n !== BODY_FIELD);
}

/** values -> frontmatter object (omits empty values to keep git diffs clean). */
export function valuesToFrontmatter(values: Record<string, unknown>, fields: FieldDef[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const field of fields) {
    if (field.name === BODY_FIELD) continue;
    const v = values[field.name];
    if (v === undefined || v === null || v === '') continue;
    if (Array.isArray(v) && v.length === 0) continue;
    if (typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0) continue;
    out[field.name] = v;
  }
  return out;
}

/** frontmatter -> values (fills defaults, coerces primitives). */
export function frontmatterToValues(
  data: Record<string, unknown>,
  fields: FieldDef[],
  body = '',
): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  for (const field of fields) {
    const raw = data[field.name];
    const def = field.defaultValue;
    values[field.name] = normalizeFieldValue(field, raw === undefined ? def : raw);
  }
  if (body !== undefined) values[BODY_FIELD] = body;
  return values;
}

function normalizeFieldValue(field: FieldDef, raw: unknown): unknown {
  if (raw === undefined || raw === null) return undefined;
  switch (field.type) {
    case 'number':
      return typeof raw === 'number' ? raw : Number(raw) || 0;
    case 'boolean':
      return raw === true || raw === 'true' || raw === 1;
    case 'list':
      return Array.isArray(raw) ? raw : typeof raw === 'string' && raw ? [raw] : [];
    case 'object':
    case undefined:
      if (Array.isArray(raw)) return raw.map(item => normalizeObject(item, field.fields || []));
      return normalizeObject(raw, field.fields || []);
    default:
      return raw;
  }
}

function normalizeObject(raw: unknown, fields: FieldDef[]): Record<string, unknown> {
  const obj = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    out[f.name] = normalizeFieldValue(f, obj[f.name]);
  }
  return out;
}
