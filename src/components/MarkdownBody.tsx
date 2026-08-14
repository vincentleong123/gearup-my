import type { ReactElement, ReactNode } from 'react';
import type { Figure as FigureType } from './Figure';
import Figure from './Figure';
import ImageCurationBlock from './ImageCurationBlock';
import type { ImageCurationBlock as ImageCurationItem } from '@/data/content';
import { curationMarkerMatch } from '@/data/content';

const INLINE_RE = /\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;

/** Render inline markdown (bold, italic, code, links) into React nodes. */
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let key = 0;
  let last = 0;
  let m: RegExpExecArray | null;
  INLINE_RE.lastIndex = 0;
  while ((m = INLINE_RE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] !== undefined) nodes.push(<strong key={key++}>{m[1]}</strong>);
    else if (m[2] !== undefined) nodes.push(<em key={key++}>{m[2]}</em>);
    else if (m[3] !== undefined)
      nodes.push(
        <code key={key++} className="px-1.5 py-0.5 rounded bg-zinc-900 text-pink-300 text-[0.9em] font-mono">
          {m[3]}
        </code>,
      );
    else
      nodes.push(
        <a key={key++} href={m[5]} target="_blank" rel="noopener noreferrer" className="text-amber-300 underline decoration-amber-500/50 underline-offset-2 hover:text-amber-200">
          {m[4]}
        </a>,
      );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function isImageLine(line: string): { alt: string; src: string } | null {
  const m = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  return m ? { alt: m[1], src: m[2] } : null;
}

/**
 * Shared article/security body renderer.
 *
 * - Renders headings, tables, lists, images and paragraphs (existing site
 *   behavior preserved).
 * - `[IMAGE CURATION #n]` lines insert curated image blocks (placeholder until
 *   a real image is added via the CMS panel).
 */
export default function MarkdownBody({
  content,
  figures = [],
  imageCuration = [],
  className = 'prose prose-invert prose-zinc max-w-none',
}: {
  content: string;
  figures?: FigureType[];
  imageCuration?: ImageCurationItem[];
  className?: string;
}) {
  const lines = content.split('\n');
  let headingCount = 0;
  let figIdx = 0;
  const out: ReactElement[] = [];

  lines.forEach((line, i) => {
    const curation = curationMarkerMatch(line);
    if (curation) {
      const idx = curation[1] ? Number(curation[1]) - 1 : 0;
      out.push(
        <ImageCurationBlock
          key={`cur-${i}`}
          item={imageCuration[idx]}
          fallbackLabel={imageCuration[idx] ? 'Image curation' : 'Image curation — add this block in the CMS panel'}
        />,
      );
      return;
    }

    if (line.startsWith('## ') || line.startsWith('### ')) {
      headingCount += 1;
      if (headingCount > 1 && figures.length > 0) {
        const fig = figures[figIdx % figures.length];
        figIdx += 1;
        out.push(<Figure key={`fig-${i}`} figure={fig} />);
      }
      const isH2 = line.startsWith('## ');
      const text = line.replace(/^#+ /, '');
      out.push(
        isH2 ? (
          <h2 key={i} className="text-2xl font-bold mt-10 mb-4">
            {text}
          </h2>
        ) : (
          <h3 key={i} className="text-xl font-bold mt-8 mb-3">
            {text}
          </h3>
        ),
      );
      return;
    }

    if (line.startsWith('**') && line.endsWith('**')) {
      out.push(
        <h3 key={i} className="text-xl font-bold mt-6 mb-3">
          {line.replace(/\*\*/g, '')}
        </h3>,
      );
      return;
    }

    const imageLine = isImageLine(line);
    if (imageLine) {
      out.push(<Figure key={i} figure={{ src: imageLine.src, alt: imageLine.alt }} />);
      return;
    }

    if (line.startsWith('|')) {
      const cells = line.split('|').filter(Boolean);
      if (cells.length > 0 && !line.includes('---')) {
        const isHeader = i > 0 && lines[i - 1]?.startsWith('|---');
        out.push(
          <div
            key={i}
            className={`flex gap-4 py-2 ${isHeader ? 'mt-6 rounded-t-lg bg-zinc-900/70 font-bold text-amber-300' : 'border-b border-zinc-800'}`}
          >
            {cells.map((c, j) => (
              <div key={j} className={`flex-1 text-sm ${j === 0 ? (isHeader ? '' : 'font-semibold') : ''}`}>
                {c.trim()}
              </div>
            ))}
          </div>,
        );
      }
      return;
    }

    if (line.startsWith('- **')) {
      const match = line.match(/- \*\*(.+?)\*\*(.*)/);
      if (match) {
        out.push(
          <li key={i} className="text-zinc-100 mb-1 ml-4">
            <strong>{match[1]}</strong>
            {renderInline(match[2])}
          </li>,
        );
      }
      return;
    }

    if (line.startsWith('- ')) {
      out.push(
        <li key={i} className="text-zinc-100 mb-1 ml-4">
          {renderInline(line.slice(2))}
        </li>,
      );
      return;
    }

    if (/^\d+\.\s/.test(line)) {
      out.push(
        <li key={i} className="text-zinc-100 mb-2 ml-4 list-decimal">
          {renderInline(line.replace(/^\d+\.\s/, ''))}
        </li>,
      );
      return;
    }

    if (line.trim() === '') {
      out.push(<br key={i} />);
      return;
    }

    out.push(
      <p key={i} className="text-zinc-100 leading-relaxed mb-4 text-lg">
        {renderInline(line)}
      </p>,
    );
  });

  return <div className={className}>{out}</div>;
}
