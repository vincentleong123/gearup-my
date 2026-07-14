import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-black text-lg mb-3">
              <span>📸</span>
              <span>GearUp</span>
              <span className="text-xs bg-gradient-to-r from-red-500 to-pink-600 text-white px-2 py-0.5 rounded-md font-bold">MY</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Helping Malaysian creators find gear that pays for itself. Real reviews, real prices, real earnings.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-300 mb-3 uppercase tracking-wider">Explore</h4>
            <div className="space-y-2">
              <Link href="/#gear" className="block text-sm text-zinc-400 hover:text-white transition-colors">Gear Reviews</Link>
              <Link href="/#creators" className="block text-sm text-zinc-400 hover:text-white transition-colors">Creator Stories</Link>
              <Link href="/#calculator" className="block text-sm text-zinc-400 hover:text-white transition-colors">ROI Calculator</Link>
              <Link href="/blog" className="block text-sm text-zinc-400 hover:text-white transition-colors">Blog & Guides</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-300 mb-3 uppercase tracking-wider">Popular Gear</h4>
            <div className="space-y-2">
              <Link href="/gear/nikon-d3100-review-malaysia-second-hand-price" className="block text-sm text-zinc-400 hover:text-white transition-colors">Nikon D3100 Review</Link>
              <Link href="/gear/sony-a6100-review-malaysia-second-hand" className="block text-sm text-zinc-400 hover:text-white transition-colors">Sony A6100 Review</Link>
              <Link href="/gear/insta360-x4-review-malaysia" className="block text-sm text-zinc-400 hover:text-white transition-colors">Insta360 X4 Review</Link>
              <Link href="/gear/dji-mini-4-pro-review-malaysia" className="block text-sm text-zinc-400 hover:text-white transition-colors">DJI Mini 4 Pro Review</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800/50 mt-8 pt-8 text-center text-sm text-zinc-600">
          © 2026 GearUp Malaysia. Prices in Ringgit Malaysia (MYR). Earnings based on creator estimates. Always verify second-hand gear before buying.
        </div>
      </div>
    </footer>
  );
}
