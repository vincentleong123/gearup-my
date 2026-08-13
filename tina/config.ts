import { defineConfig } from 'tinacms';

const slugify = (value?: string) =>
  (value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');

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
            options: ['guide', 'inspiration', 'comparison', 'gear'],
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
          { type: 'string', name: 'tags', label: 'Tags', list: true },
          {
            type: 'string',
            name: 'relatedGear',
            label: 'Related gear slugs',
            list: true,
            description: 'Slugs from /gear, e.g. nikon-d3100-review-malaysia-second-hand-price',
          },
          { type: 'rich-text', name: 'body', label: 'Content', isBody: true },
        ],
      },
    ],
  },
});
