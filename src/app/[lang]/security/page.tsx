import type { Metadata } from 'next';
import Link from 'next/link';
import { visibleSecuritySystems, type SecuritySystem } from '@/data/security';
import { securityImg, imgUrl } from '@/data/images';
import { calcSecurityRoi, formatRoiMoney } from '@/lib/security';
import { T } from '@/components/T';
import { langAlternates, withLang } from '@/lib/lang';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: 'Business Security Camera Systems Malaysia — Cost & ROI | Kameralog',
    description: 'Commercial CCTV systems for factories, warehouses, retail and offices in Malaysia. Real hardware lineups, prices in RM, and honest incident-exposure ROI thinking.',
    openGraph: { title: 'Security Camera Systems Malaysia — Kameralog', description: 'Factory, warehouse, retail & office CCTV systems with RM pricing and honest ROI.' },
    ...langAlternates(lang, '/security'),
  };
}

function heroSrc(s: SecuritySystem): string {
  if (s.image) return imgUrl(s.image);
  return securityImg(s.slug);
}

function AiChips({ s }: { s: SecuritySystem }) {
  const labels: Record<string, string> = {
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
  const shown = s.aiFeatures.slice(0, 3).map(f => labels[f] || f);
  if (s.aiFeatures.length > 3) shown.push(`+${s.aiFeatures.length - 3}`);
  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map(a => (
        <span key={a} className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/25">
          {a}
        </span>
      ))}
    </div>
  );
}

export default async function SecurityPage({ params }: Props) {
  const { lang } = await params;
  const systems = visibleSecuritySystems();

  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 text-sm text-cyan-400 font-semibold mb-4">
            🛡️ <T k="security.hero.badge" en="Commercial CCTV Desk" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            <T k="security.hero.head" en="What happens if you" />{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-500">
              <T k="security.hero.accent" en="don't buy it?" />
            </span>
          </h1>
          <p className="text-zinc-200 max-w-2xl mx-auto text-lg">
            <T
              k="security.hero.desc"
              en="Security camera systems for Malaysian factories, warehouses, retail and offices. Real hardware lineups, Ringgit pricing, and honest incident-exposure ROI — not marketing maths."
            />
          </p>
        </div>

        {systems.length === 0 && (
          <p className="text-center text-zinc-500 py-20">No security systems published yet — check back soon.</p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map(s => {
            const roi = calcSecurityRoi({
              ...s.incidentRoi,
              systemCost: s.systemCost,
              installationCost: s.installationCost,
            });
            return (
              <Link
                key={s.slug}
                href={withLang(lang, `/security/${s.slug}`)}
                className="group bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="h-44 relative bg-zinc-900 overflow-hidden">
                  {heroSrc(s) ? (
                    <img src={heroSrc(s)} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-4xl">🛡️</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 uppercase tracking-wide">
                    {s.category}
                  </span>
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider">
                      {s.environment && <span className="px-2 py-0.5 rounded bg-zinc-950/70 text-zinc-300">{s.environment}</span>}
                      {s.deployment && <span className="px-2 py-0.5 rounded bg-zinc-950/70 text-zinc-300">{s.deployment.replace('-', ' · ')}</span>}
                    </div>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h2 className="font-black leading-snug group-hover:text-cyan-300 transition-colors">{s.title}</h2>
                  <p className="text-sm text-zinc-300 line-clamp-2">{s.description}</p>
                  <AiChips s={s} />

                  <div className="mt-auto pt-3 border-t border-zinc-800/60 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Hardware + install</div>
                      <div className="font-black text-zinc-100">
                        {s.systemCost || s.installationCost ? formatRoiMoney((s.systemCost || 0) + (s.installationCost || 0)) : '—'}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Est. avoided loss / mo</div>
                      <div className="font-black text-cyan-400">
                        {roi?.monthlyEstimatedSavings ? formatRoiMoney(roi.monthlyEstimatedSavings) : '—'}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-14 max-w-3xl mx-auto bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 text-sm text-zinc-400 leading-relaxed">
          <span className="font-bold text-zinc-200">Honest security ROI:</span> these systems are priced against loss exposure, not guaranteed savings. A camera system de-risks incidents — it does not guarantee any specific theft will be prevented. Figures are planning estimates; always quote with your installer and check with your insurer.
        </div>
      </div>
    </main>
  );
}
