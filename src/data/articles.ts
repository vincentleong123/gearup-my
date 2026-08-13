import type { Article } from './articles-fallback';
import { fallbackArticles } from './articles-fallback';
import { generatedArticles } from './generated/articles';

export type { Article };

/**
 * Articles are managed in the CMS (TinaCMS) as markdown files under content/articles.
 * scripts/sync-content.mjs regenerates src/data/generated/articles.ts from those files.
 * If the generated file is missing or empty (e.g. fresh checkout before sync), fall back
 * to the original hardcoded data so the site always builds.
 */
export const articles: Article[] =
  generatedArticles.length > 0 ? generatedArticles : fallbackArticles;
