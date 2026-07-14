import { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RoiCalculator from '@/components/RoiCalculator';

export const metadata: Metadata = {
  title: 'ROI Calculator for Content Creation Gear — Breakeven in Ringgit Malaysia | GearUp MY',
  description: 'Calculate how many paid gigs it takes to break even on any camera, drone, or content creation gear. Prices in MYR.',
  openGraph: { title: 'ROI Calculator — GearUp Malaysia', description: 'See how fast your gear pays for itself. Free ROI calculator for Malaysian creators.' },
};

export default function CalculatorPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <Nav />
      <RoiCalculator />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 text-sm text-zinc-400">
          <h3 className="font-bold text-zinc-300 mb-2">How to use this calculator</h3>
          <ol className="space-y-2 list-decimal ml-4">
            <li>Enter the price of the gear you want to buy (use second-hand price — it&apos;s smarter)</li>
            <li>Enter how much you charge per gig (e.g., RM300 for a real estate walkthrough)</li>
            <li>Enter how many gigs you can realistically do per month</li>
            <li>The calculator shows how many months to break even</li>
          </ol>
          <p className="mt-4 text-zinc-500 italic">Tip: Most gear under RM2,000 breaks even in 1-3 months with consistent weekend work.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
