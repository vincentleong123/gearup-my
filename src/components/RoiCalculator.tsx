'use client';

import { useState } from 'react';

export default function RoiCalculator() {
  const [price, setPrice] = useState(2000);
  const [rate, setRate] = useState(300);
  const [gigs, setGigs] = useState(4);

  const monthly = rate * gigs;
  const months = monthly > 0 ? price / monthly : 0;
  const annual = monthly * 12;

  return (
    <section id="calculator" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              ROI <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Calculator</span>
            </h2>
            <p className="text-zinc-400 text-lg">How many gigs will it take to break even on your gear? Calculate in Ringgit Malaysia.</p>
          </div>
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-zinc-400 font-semibold mb-2 uppercase tracking-wider">Gear Price (RM)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3.5 text-white text-xl font-bold focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 font-semibold mb-2 uppercase tracking-wider">Your Rate Per Gig (RM)</label>
                  <input
                    type="number"
                    value={rate}
                    onChange={e => setRate(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3.5 text-white text-xl font-bold focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 font-semibold mb-2 uppercase tracking-wider">Gigs Per Month</label>
                  <input
                    type="number"
                    value={gigs}
                    onChange={e => setGigs(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3.5 text-white text-xl font-bold focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center text-center md:border-l border-zinc-800 md:pl-8">
                <div className="mb-6">
                  <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">{months.toFixed(1)}</div>
                  <div className="text-zinc-400 mt-2 text-lg">months to breakeven</div>
                </div>
                <div className="space-y-2 text-sm text-zinc-400">
                  <div>Revenue per month: <strong className="text-white">RM {monthly.toLocaleString()}</strong></div>
                  <div>Breakeven amount: <strong className="text-white">RM {price.toLocaleString()}</strong></div>
                  <div>Annual potential: <strong className="text-green-400">RM {annual.toLocaleString()}</strong></div>
                  <div className="pt-4 text-xs text-zinc-500 italic">
                    {months <= 1 ? '🔥 You\'ll break even within a month! Start NOW.' :
                     months <= 3 ? '💪 Solid ROI. A few weekends of work and it\'s paid off.' :
                     months <= 6 ? '👍 Reasonable. Consistent work will make this work.' :
                     '⏳ Consider a cheaper gear option or raising your rates.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
