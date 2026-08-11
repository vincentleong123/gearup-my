'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/i18n/context';
import { withLang } from '@/lib/lang';

const presets = [
  { label: 'Nikon D3100', price: 450 },
  { label: 'Sony A6100', price: 1600 },
  { label: 'Insta360 X4', price: 2000 },
  { label: 'DJI Mini 4 Pro', price: 2900 },
];

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
  tint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (v: number) => void;
  tint: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-zinc-200 font-semibold uppercase tracking-wider">{label}</label>
        <span className={`text-lg font-black ${tint}`}>{value.toLocaleString()}{suffix}</span>
      </div>
      <input
        type="range"
        className="gu-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        aria-label={label}
      />
      <div className="flex justify-between text-[10px] text-zinc-600 mt-1">
        <span>{min.toLocaleString()}{suffix}</span>
        <span>{max.toLocaleString()}{suffix}</span>
      </div>
    </div>
  );
}

export default function RoiCalculator() {
  const { t, lang } = useLang();
  const [price, setPrice] = useState(1600);
  const [rate, setRate] = useState(300);
  const [gigs, setGigs] = useState(4);

  const { monthly, months, gigsToBreakeven, annual, verdict, verdictTone } = useMemo(() => {
    const monthly = rate * gigs;
    const months = monthly > 0 ? price / monthly : 0;
    const gigsToBreakeven = rate > 0 ? price / rate : 0;
    const annual = monthly * 12;
    let verdict: string;
    let tone: 'green' | 'amber' | 'red';
    if (months <= 1) {
      verdict = t('calc.verdict.fire', "🔥 You'll break even within a month. Start NOW.");
      tone = 'green';
    } else if (months <= 3) {
      verdict = t('calc.verdict.solid', "💪 Solid ROI. A few weekends of work and it's paid off.");
      tone = 'green';
    } else if (months <= 6) {
      verdict = t('calc.verdict.reasonable', '👍 Reasonable. Consistent work will make this work.');
      tone = 'amber';
    } else {
      verdict = t('calc.verdict.cheaper', '⏳ Consider cheaper gear or raise your rates.');
      tone = 'red';
    }
    return { monthly, months, gigsToBreakeven, annual, verdict, verdictTone: tone };
  }, [price, rate, gigs, t]);

  const barWidth = Math.min(100, Math.round((months / 12) * 100));
  const toneStyles = {
    green: { bar: 'bg-green-400', ring: 'from-green-400 to-emerald-500', text: 'text-green-400', border: 'border-green-500/30' },
    amber: { bar: 'bg-amber-400', ring: 'from-amber-400 to-orange-500', text: 'text-amber-400', border: 'border-amber-500/30' },
    red: { bar: 'bg-red-400', ring: 'from-red-400 to-pink-500', text: 'text-red-400', border: 'border-red-500/30' },
  }[verdictTone];

  return (
    <section id="calculator" className="py-16 md:py-24 bg-gradient-to-b from-transparent to-amber-500/[0.03]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 text-sm text-amber-400 font-semibold mb-5">
              🧮 {t('calc.badge', 'ROI Calculator')}
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              {t('calc.head', 'Will Your Gear')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">{t('calc.headAccent', 'Pay For Itself?')}</span>
            </h2>
            <p className="text-zinc-200 text-lg">{t('calc.desc', 'How many gigs will it take to break even on your gear? Calculate in Ringgit Malaysia.')}</p>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <span className="text-xs text-zinc-500 self-center font-semibold uppercase tracking-wider mr-1">{t('calc.quickPick', 'Quick pick:')}</span>
            {presets.map(p => (
              <button
                key={p.label}
                onClick={() => setPrice(p.price)}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                  price === p.price
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 border-transparent shadow-lg shadow-amber-500/25'
                    : 'bg-zinc-800/60 text-zinc-100 border-zinc-700/60 hover:text-white hover:border-amber-500/40'
                }`}
              >
                {p.label} · RM {p.price.toLocaleString()}
              </button>
            ))}
          </div>

          <div className="gradient-border rounded-2xl bg-zinc-900/70 p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-7">
                <Slider
                  label={t('calc.gearPrice', 'Gear Price (RM)')}
                  value={price}
                  min={100}
                  max={6000}
                  step={50}
                  suffix=""
                  onChange={setPrice}
                  tint="text-amber-400"
                />
                <Slider
                  label={t('calc.ratePerGig', 'Your Rate Per Gig (RM)')}
                  value={rate}
                  min={50}
                  max={1000}
                  step={10}
                  suffix=""
                  onChange={setRate}
                  tint="text-pink-400"
                />
                <Slider
                  label={t('calc.gigsPerMonth', 'Gigs Per Month')}
                  value={gigs}
                  min={1}
                  max={12}
                  step={1}
                  suffix=""
                  onChange={setGigs}
                  tint="text-green-400"
                />
              </div>

              <div className="flex flex-col justify-center text-center md:border-l border-zinc-800 md:pl-10">
                <div className={`mb-2 text-sm font-bold uppercase tracking-wider ${toneStyles.text}`}>{t('calc.timeToBreakeven', 'Time to breakeven')}</div>
                <div className={`text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r ${toneStyles.ring} leading-none`}>
                  {months.toFixed(1)}
                </div>
                <div className="text-zinc-200 mt-2 text-lg font-semibold">{t('calc.monthsLabel', 'months')}</div>

                <div className="mt-6 space-y-2.5 text-sm text-zinc-200">
                  <div className="flex justify-between"><span>{t('calc.revenueMonth', 'Revenue per month')}</span><strong className="text-white">RM {monthly.toLocaleString()}</strong></div>
                  <div className="flex justify-between"><span>{t('calc.gigsToBreakeven', 'Gigs to breakeven')}</span><strong className="text-white">{Math.ceil(gigsToBreakeven)} {t('calc.gigsUnit', 'gigs')}</strong></div>
                  <div className="flex justify-between"><span>{t('calc.annualPotential', 'Annual potential')}</span><strong className="text-green-400">RM {annual.toLocaleString()}</strong></div>
                </div>

                <div className="mt-5">
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mb-1.5">
                    <div className={`h-full rounded-full ${toneStyles.bar} transition-all duration-500`} style={{ width: `${Math.max(3, barWidth)}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-600">
                    <span>0 mo</span>
                    <span>12 mo</span>
                  </div>
                </div>

                <div className={`mt-5 text-sm font-semibold px-4 py-3 rounded-xl border bg-zinc-950/50 ${toneStyles.border}`}>
                  {verdict}
                </div>

                <Link
                  href={withLang(lang, '/blog/content-creator-gear-roi-malaysia-calculator')}
                  className="mt-4 text-xs text-zinc-500 hover:text-amber-300 transition-colors font-semibold"
                >
                  {t('calc.readGuide', 'How we calculate this → read the ROI guide')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
