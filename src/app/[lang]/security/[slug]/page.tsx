import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { visibleSecuritySystems, type SecuritySystem } from '@/data/security';
import { articles } from '@/data/articles';
import { gearList } from '@/data/gear';
import { securityImg, imgUrl } from '@/data/images';
import { calcSecurityRoi, formatRoiMoney, SECURITY_ROI_DISCLAIMER } from '@/lib/security';
import { formatPrice } from '@/lib/utils';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import MarkdownBody from '@/components/MarkdownBody';
import { type Lang } from '@/i18n/langs';
import { BASE_URL, langAlternates, withLang } from '@/lib/lang';
import { getPostType } from '@/admin/types';
import { readPost } from '@/lib/cms/fs';

interface Props {
  params: Promise<{ lang: string; slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateStaticParams() {
  return visibleSecuritySystems().map(s => ({ lang: s.lang ?? 'en', slug: s.slug }));
}

const realLang = (s: { lang?: 'en' | 'ms' | 'zh' }): Lang => s.lang ?? 'en';

async function previewSystem(slug: string): Promise<SecuritySystem | null> {
  if (process.env.NODE_ENV !== 'development') return null;
  const type = getPostType('securitySystem');
  if (!type) return null;
  try {
    const post = await readPost(type, slug);
    const v = post.values;
    return {
      slug: post.slug,
      title: String(v.title || slug),
      description: String(v.description || ''),
      content: String(v.body || ''),
      image: String(v.image || ''),
      category: String(v.category || 'factory-security'),
      status: (v.status as SecuritySystem['status']) || 'draft',
      date: String(v.date || ''),
      ...(v.updatedAt ? { updatedAt: String(v.updatedAt).slice(0, 10) } : {}),
      ...(v.reviewedAt ? { reviewedAt: String(v.reviewedAt).slice(0, 10) } : {}),
      ...(v.author ? { author: String(v.author) } : {}),
      tags: Array.isArray(v.tags) ? v.tags.map(String) : [],
      lang: (v.lang as SecuritySystem['lang']) || 'en',
      readTime: Number(v.readTime) || 5,
      ...(v.scheduledAt ? { scheduledAt: String(v.scheduledAt).slice(0, 10) } : {}),
      ...(v.environment ? { environment: String(v.environment) } : {}),
      ...(v.deployment ? { deployment: String(v.deployment) } : {}),
      ...(v.systemLineup ? { systemLineup: String(v.systemLineup) } : {}),
      ...(v.systemCost ? { systemCost: Number(v.systemCost) } : {}),
      ...(v.installationCost ? { installationCost: Number(v.installationCost) } : {}),
      ...(v.maintenanceCost ? { maintenanceCost: Number(v.maintenanceCost) } : {}),
      ...(v.usefulLife ? { usefulLife: Number(v.usefulLife) } : {}),
      cameras: Array.isArray(v.cameras) ? (v.cameras as SecuritySystem['cameras']) : [],
      aiFeatures: Array.isArray(v.aiFeatures) ? v.aiFeatures.map(String) : [],
      ...(v.storage ? { storage: v.storage as SecuritySystem['storage'] } : {}),
      ...(v.networking ? { networking: v.networking as SecuritySystem['networking'] } : {}),
      ...(v.incidentRoi ? { incidentRoi: v.incidentRoi as SecuritySystem['incidentRoi'] } : {}),
      relatedGear: Array.isArray(v.relatedGear) ? v.relatedGear.map(String) : [],
      relatedArticles: Array.isArray(v.relatedArticles) ? v.relatedArticles.map(String) : [],
      ...(v.seoTitle ? { seoTitle: String(v.seoTitle) } : {}),
      ...(v.seoDescription ? { seoDescription: String(v.seoDescription) } : {}),
      ...(Array.isArray(v.imageCuration) ? { imageCuration: v.imageCuration as SecuritySystem['imageCuration'] } : {}),
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const system = visibleSecuritySystems().find(s => s.slug === slug);
  if (!system) return {};
  const rl = realLang(system);
  return {
    title: system.seoTitle || `${system.title} | Kameralog Malaysia`,
    description: system.seoDescription || system.description,
    openGraph: { title: system.title, description: system.seoDescription || system.description },
    ...langAlternates(rl, `/security/${system.slug}`, [rl]),
  };
}

const AI_LABELS: Record<string, string> = {
  'facial-recognition': 'Facial recognition',
  'lpr-anpr': 'LPR / ANPR',
  'line-crossing': 'Line crossing',
  loitering: 'Loitering',
  'people-counting': 'People counting',
  intrusion: 'Intrusion',
  'motion-tracking': 'Motion tracking',
  'two-way-audio': 'Two-way audio',
  'alarm-integration': 'Alarm integration',
  'smart-search': 'Smart search',
  'event-playback': 'Event playback',
  'remote-access': 'Remote access',
  cybersecurity: 'Cybersecurity',
};

function RoiPanel({ s }: { s: SecuritySystem }) {
  const roi = calcSecurityRoi({
    ...s.incidentRoi,
    systemCost: s.systemCost,
    installationCost: s.installationCost,
    maintenanceCost: s.maintenanceCost,
  });
  if (!roi) return null;
  return (
    <div className="my-12 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-zinc-900/40 to-zinc-900/40 p-6">
      <div className="flex items-center gap-2 mb-1">
        <h2 className="text-2xl font-bold">Incident exposure — the honest ROI</h2>
      </div>
      <p className="text-sm text-zinc-400 mb-6">{s.incidentRoi?.incidentType ? `Scenario: ${s.incidentRoi.incidentType}` : 'Scenario estimate — not a guarantee of prevented incidents.'}</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl bg-zinc-950/60 border border-zinc-800 p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Monthly loss exposure</div>
          <div className="text-2xl font-black text-red-400">{formatRoiMoney(roi.monthlyLossExposure)}</div>
          <div className="text-xs text-zinc-500">before the system</div>
        </div>
        <div className="rounded-xl bg-zinc-950/60 border border-zinc-800 p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Est. avoided loss / mo</div>
          <div className="text-2xl font-black text-cyan-400">{formatRoiMoney(roi.monthlyEstimatedSavings)}</div>
          <div className="text-xs text-zinc-500">at {s.incidentRoi?.preventionRate ?? 0}% prevention expectation</div>
        </div>
        <div className="rounded-xl bg-zinc-950/60 border border-zinc-800 p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Total cost</div>
          <div className="text-2xl font-black text-zinc-100">{formatRoiMoney(roi.totalCost)}</div>
          <div className="text-xs text-zinc-500">
            {s.systemCost ? `hardware ${formatRoiMoney(s.systemCost)}` : ''}
            {s.systemCost && s.installationCost ? ' + ' : ''}
            {s.installationCost ? `install ${formatRoiMoney(s.installationCost)}` : ''}
          </div>
        </div>
        <div className="rounded-xl bg-zinc-950/60 border border-zinc-800 p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Theoretical payback</div>
          <div className="text-2xl font-black text-zinc-100">
            {roi.theoreticalPaybackMonths !== null ? `${roi.theoreticalPaybackMonths.toFixed(1)} mo` : '—'}
          </div>
          <div className="text-xs text-zinc-500">if losses avoided as estimated</div>
        </div>
      </div>

      {s.incidentRoi?.notes && <p className="mt-5 text-sm text-zinc-300 border-l-2 border-zinc-700 pl-4">{s.incidentRoi.notes}</p>}
      <p className="mt-4 text-xs text-zinc-500 leading-relaxed">{roi.disclaimer}</p>
    </div>
  );
}

function FleetTable({ s }: { s: SecuritySystem }) {
  if (!s.cameras.length) return null;
  const total = s.cameras.reduce((acc, c) => acc + (c.quantity ?? 1) * (c.unitPriceNew ?? 0), 0);
  return (
    <div className="my-12">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-2xl font-bold">Camera fleet</h2>
        {s.systemLineup && <span className="text-xs font-bold px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">{s.systemLineup}</span>}
      </div>
      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="bg-zinc-900/80 text-left text-xs uppercase tracking-wider text-zinc-500">
              <th className="px-4 py-3">Model</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3 text-center">Qty</th>
              <th className="px-4 py-3">Resolution</th>
              <th className="px-4 py-3">Night vision</th>
              <th className="px-4 py-3">AI detection</th>
              <th className="px-4 py-3 text-right">Unit (new)</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {s.cameras.map((c, i) => {
              const qty = c.quantity ?? 1;
              const unit = c.unitPriceNew ?? 0;
              return (
                <tr key={i} className="bg-zinc-900/30 hover:bg-zinc-900/60 transition-colors">
                  <td className="px-4 py-3 font-semibold text-zinc-100">
                    {c.model || '—'}
                    {c.poe && <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">PoE</span>}
                    {c.wifi && <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/25">WiFi</span>}
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{c.role || '—'}</td>
                  <td className="px-4 py-3 text-center text-zinc-200">{qty}</td>
                  <td className="px-4 py-3 text-zinc-300">{c.resolution || '—'}</td>
                  <td className="px-4 py-3 text-zinc-300">{c.nightVision || '—'}</td>
                  <td className="px-4 py-3 text-zinc-300">{c.aiDetection || '—'}</td>
                  <td className="px-4 py-3 text-right text-zinc-200">{unit ? `RM${unit.toLocaleString('en-MY')}` : '—'}</td>
                  <td className="px-4 py-3 text-right font-bold text-zinc-100">{unit ? `RM${(qty * unit).toLocaleString('en-MY')}` : '—'}</td>
                </tr>
              );
            })}
          </tbody>
          {total > 0 && (
            <tfoot>
              <tr className="bg-zinc-900/80">
                <td colSpan={7} className="px-4 py-3 text-right text-xs uppercase tracking-wider text-zinc-500 font-bold">Hardware total</td>
                <td className="px-4 py-3 text-right font-black text-cyan-400">{formatRoiMoney(total)}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}

function SpecStrip({ s }: { s: SecuritySystem }) {
  const items: Array<[string, string]> = [];
  if (s.networking?.poe) items.push(['PoE', 'Power + data over one cable']);
  if (s.networking?.wifi) items.push(['WiFi', 'Plug-in cameras, no cabling']);
  if (s.networking?.nvr) items.push(['NVR', `Central recorder${s.networking.nvrChannels ? ` — ${s.networking.nvrChannels}ch` : ''}`]);
  if (s.storage) {
    if (s.storage.localTB) items.push(['Storage', `${s.storage.localTB}TB local` + (s.storage.cloud ? ' + cloud' : '')]);
    else if (s.storage.cloud) items.push(['Storage', 'Cloud backup']);
  }
  if (s.usefulLife) items.push(['Lifespan', `~${s.usefulLife} years`]);
  if (s.maintenanceCost) items.push(['Maintenance', `${formatRoiMoney(s.maintenanceCost)}/yr`]);
  if (!items.length) return null;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-8">
      {items.map(([k, v]) => (
        <div key={k} className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">{k}</div>
          <div className="font-semibold text-zinc-100">{v}</div>
        </div>
      ))}
    </div>
  );
}

export default async function SecurityDetailPage({ params, searchParams }: Props) {
  const { lang, slug } = await params;
  const sp = await searchParams;
  const isPreview = process.env.NODE_ENV === 'development' && sp?.preview === '1';

  let system = visibleSecuritySystems().find(s => s.slug === slug);
  if (isPreview) {
    const preview = await previewSystem(slug);
    if (preview) system = preview;
  }
  if (!system) notFound();
  if (!isPreview && lang !== realLang(system)) redirect(withLang(realLang(system), `/security/${system.slug}`));

  const heroImg = system.image ? imgUrl(system.image) : securityImg(system.slug);
  const relatedGear = gearList.filter(g => system.relatedGear.includes(g.slug));
  const relatedArticles = articles.filter(a => system.relatedArticles.includes(a.slug));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: system.title,
    description: system.description,
    datePublished: system.date,
    dateModified: system.reviewedAt || system.updatedAt || system.date,
    author: system.author
      ? { '@type': 'Person', name: system.author }
      : { '@type': 'Organization', name: 'Kameralog Malaysia' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}${withLang(lang, `/security/${system.slug}`)}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <article className="min-h-screen pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href={withLang(lang, '/')} className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href={withLang(lang, '/security')} className="hover:text-white transition-colors">Security</Link>
            <span>/</span>
            <span className="text-zinc-100 line-clamp-1">{system.title}</span>
          </nav>

          <div className="mb-10">
            <div className="h-48 md:h-64 rounded-2xl overflow-hidden relative mb-6 bg-zinc-900">
              {heroImg ? (
                <img src={heroImg} alt={system.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full grid place-items-center text-5xl">🛡️</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-500 mb-4 flex-wrap">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 uppercase">{system.category}</span>
              {system.environment && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 uppercase">{system.environment}</span>
              )}
              {system.deployment && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 uppercase">{system.deployment.replace('-', ' · ')}</span>
              )}
              {system.lang === 'ms' && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 uppercase">Bahasa Melayu</span>
              )}
              <span>{system.date}</span>
              <span>·</span>
              <span>{system.readTime} min read</span>
              {system.author && <span>·</span>}
              {system.author && <span className="text-zinc-300">{system.author}</span>}
              {system.reviewedAt && <span className="text-xs text-zinc-600">· updated {system.reviewedAt}</span>}
              {isPreview && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">Preview</span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">{system.title}</h1>
            <p className="text-xl text-zinc-200">{system.description}</p>
          </div>

          <SpecStrip s={system} />

          <RoiPanel s={system} />

          {system.aiFeatures.length > 0 && (
            <div className="my-8">
              <h2 className="text-2xl font-bold mb-4">AI features</h2>
              <div className="flex flex-wrap gap-2">
                {system.aiFeatures.map(f => (
                  <span key={f} className="text-xs font-bold px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/25">
                    {AI_LABELS[f] || f}
                  </span>
                ))}
              </div>
            </div>
          )}

          <MarkdownBody content={system.content} imageCuration={system.imageCuration} />

          <FleetTable s={system} />

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12 pt-8 border-t border-zinc-800">
              <h2 className="text-2xl font-bold mb-6">Related Guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {relatedArticles.map(a => (
                  <Link key={a.slug} href={withLang(lang, `/blog/${a.slug}`)} className="block bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 hover:border-cyan-500/30 transition-all group">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-bold group-hover:text-cyan-300 transition-colors">{a.title}</h3>
                    </div>
                    <p className="text-sm text-zinc-200 line-clamp-2">{a.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Gear */}
          {relatedGear.length > 0 && (
            <div className="mt-12 pt-8 border-t border-zinc-800">
              <h2 className="text-2xl font-bold mb-6">Related Gear</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {relatedGear.map(g => (
                  <Link key={g.slug} href={withLang('en', `/gear/${g.slug}`)} className="block bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 hover:border-cyan-500/30 transition-all group">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-bold group-hover:text-cyan-300 transition-colors">{g.name}</h3>
                      <span className="text-green-400 font-bold text-sm">{formatPrice(g.priceUsed)}</span>
                    </div>
                    <p className="text-sm text-zinc-200 line-clamp-2">{g.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {system.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-zinc-800">
              <div className="flex flex-wrap gap-2">
                {system.tags.map(t => (
                  <span key={t} className="text-xs text-zinc-500 bg-zinc-800/50 px-3 py-1.5 rounded-full">#{t}</span>
                ))}
              </div>
            </div>
          )}

          <p className="mt-8 text-xs text-zinc-600 leading-relaxed border-t border-zinc-800/60 pt-6">{SECURITY_ROI_DISCLAIMER}</p>
        </div>
      </article>
      <Footer />
    </>
  );
}
