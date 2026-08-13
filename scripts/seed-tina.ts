/**
 * One-time migration: converts the original hardcoded article data
 * (src/data/articles-fallback.ts) into TinaCMS markdown files under content/articles.
 *
 * Run: npm run seed
 */
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { fallbackArticles, type Article } from '../src/data/articles-fallback';

const outDir = join(process.cwd(), 'content/articles');

mkdirSync(outDir, { recursive: true });

for (const file of readdirSync(outDir).filter((f) => f.endsWith('.md'))) {
  rmSync(join(outDir, file));
}

const frontmatter = (a: Article) => {
  const fm: Record<string, unknown> = {
    slug: a.slug,
    title: a.title,
    description: a.description,
    image: a.image,
    category: a.category,
    readTime: a.readTime,
    date: a.date,
    tags: a.tags,
    relatedGear: a.relatedGear,
  };
  if (a.lang) fm.lang = a.lang;
  return fm;
};

for (const article of fallbackArticles) {
  const file = join(outDir, `${article.slug}.md`);
  writeFileSync(file, matter.stringify(article.content, frontmatter(article)));
}

console.log(`Seeded ${fallbackArticles.length} articles -> ${outDir}`);
