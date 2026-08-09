'use client';

import { useState } from 'react';
import { generateFromYouTubeUrl, generateCreatorInspirationArticle, generateGearComparisonQuick, generatePriceComparisonArticle } from '@/lib/contentGenerator';

export default function LazyContentCreator() {
  const [mode, setMode] = useState<'quick' | 'creator-story' | 'price-compare' | 'bulk-import'>('quick');
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState<string>('');

  // ─── QUICK ARTICLE MODE ───
  const [quickForm, setQuickForm] = useState({
    title: '',
    videoUrl: '',
    mainPoints: ['', '', ''],
    category: 'guide' as const,
  });

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const article = generateFromYouTubeUrl(
        quickForm.videoUrl,
        quickForm.title,
        quickForm.mainPoints.filter(p => p.trim()),
        quickForm.category
      );
      setGenerated(JSON.stringify(article, null, 2));
    } catch (err) {
      setGenerated(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // ─── CREATOR STORY MODE ───
  const [creatorForm, setCreatorForm] = useState({
    creatorName: '',
    earnings: 5000,
    monthsToProfit: 3,
    mainGear: ['sony-a6100'],
    mainPoints: ['', '', ''],
  });

  const handleCreatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const article = generateCreatorInspirationArticle(
        creatorForm.creatorName,
        creatorForm.earnings,
        creatorForm.monthsToProfit,
        creatorForm.mainGear,
        creatorForm.mainPoints.filter(p => p.trim())
      );
      setGenerated(JSON.stringify(article, null, 2));
    } catch (err) {
      setGenerated(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // ─── PRICE COMPARISON MODE ───
  const [priceForm, setPriceForm] = useState({
    productName: '',
    prices: [{ retailer: 'Shopee', price: 0 }, { retailer: 'Lazada', price: 0 }, { retailer: 'Mudah.my', price: 0 }],
    earningPotential: 500,
    mainPoints: ['', ''],
  });

  const handlePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const article = generatePriceComparisonArticle(
        priceForm.productName,
        priceForm.prices,
        priceForm.earningPotential,
        priceForm.mainPoints.filter(p => p.trim())
      );
      setGenerated(JSON.stringify(article, null, 2));
    } catch (err) {
      setGenerated(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // ─── BULK IMPORT MODE ───
  const [bulkCSV, setBulkCSV] = useState('');
  const [bulkResults, setBulkResults] = useState<any[]>([]);

  const handleBulkImport = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Parse CSV — simple format: title,videoUrl,point1,point2,point3,category
      const lines = bulkCSV.trim().split('\n').filter(l => l);
      const results: any[] = [];

      lines.forEach((line, idx) => {
        const parts = line.split('|').map(p => p.trim());
        if (parts.length >= 5) {
          try {
            const article = generateFromYouTubeUrl(
              parts[1] || '',
              parts[0],
              [parts[2], parts[3], parts[4]].filter(p => p),
              (parts[5] as any) || 'guide'
            );
            results.push({
              idx: idx + 1,
              title: article.title,
              slug: article.slug,
              status: 'ready to add',
              data: article,
            });
          } catch (err: any) {
            results.push({
              idx: idx + 1,
              error: err.message,
              status: 'failed',
            });
          }
        }
      });

      setBulkResults(results);
      setGenerated(`${results.filter(r => !r.error).length} articles ready to add`);
    } catch (err) {
      setGenerated(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
            Lazy Content Creator 🚀
          </h1>
          <p className="text-zinc-200">Stop procrastinating. Generate articles in 30 seconds.</p>
        </div>

        {/* Mode Selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(['quick', 'creator-story', 'price-compare', 'bulk-import'] as const).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setGenerated(''); }}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                mode === m
                  ? 'bg-red-600 text-white'
                  : 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700'
              }`}
            >
              {m === 'quick' && 'Quick Article'}
              {m === 'creator-story' && 'Creator Story'}
              {m === 'price-compare' && 'Price Guide'}
              {m === 'bulk-import' && 'Bulk Import'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* FORM PANEL */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            {/* QUICK MODE */}
            {mode === 'quick' && (
              <form onSubmit={handleQuickSubmit}>
                <h2 className="text-xl font-bold mb-4">Quick Article Generator</h2>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-zinc-200 mb-1">Title</label>
                    <input
                      type="text"
                      placeholder="e.g., DJI Osmo Action 5 Pro Review for Malaysian Vloggers"
                      value={quickForm.title}
                      onChange={e => setQuickForm({ ...quickForm, title: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-500 focus:border-red-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-200 mb-1">YouTube URL (optional)</label>
                    <input
                      type="url"
                      placeholder="https://youtube.com/watch?v=..."
                      value={quickForm.videoUrl}
                      onChange={e => setQuickForm({ ...quickForm, videoUrl: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-500 focus:border-red-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-200 mb-1">Main Points (3-5)</label>
                    {quickForm.mainPoints.map((point, idx) => (
                      <input
                        key={idx}
                        type="text"
                        placeholder={`Point ${idx + 1}`}
                        value={point}
                        onChange={e => {
                          const pts = [...quickForm.mainPoints];
                          pts[idx] = e.target.value;
                          setQuickForm({ ...quickForm, mainPoints: pts });
                        }}
                        className="w-full mb-2 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-500 focus:border-red-500 outline-none"
                      />
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-200 mb-1">Category</label>
                    <select
                      value={quickForm.category}
                      onChange={e => setQuickForm({ ...quickForm, category: e.target.value as any })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:border-red-500 outline-none"
                    >
                      <option value="guide">Guide</option>
                      <option value="inspiration">Inspiration</option>
                      <option value="comparison">Comparison</option>
                      <option value="gear">Gear Review</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 text-white font-bold py-2 rounded transition-all"
                  >
                    {loading ? 'Generating...' : 'Generate Article'}
                  </button>
                </div>
              </form>
            )}

            {/* CREATOR STORY MODE */}
            {mode === 'creator-story' && (
              <form onSubmit={handleCreatorSubmit}>
                <h2 className="text-xl font-bold mb-4">Creator Inspiration Story</h2>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-zinc-200 mb-1">Creator Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Fikri Haron"
                      value={creatorForm.creatorName}
                      onChange={e => setCreatorForm({ ...creatorForm, creatorName: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-500 focus:border-red-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm text-zinc-200 mb-1">Monthly Earnings (RM)</label>
                      <input
                        type="number"
                        value={creatorForm.earnings}
                        onChange={e => setCreatorForm({ ...creatorForm, earnings: parseInt(e.target.value) })}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:border-red-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-200 mb-1">Months to Profit</label>
                      <input
                        type="number"
                        value={creatorForm.monthsToProfit}
                        onChange={e => setCreatorForm({ ...creatorForm, monthsToProfit: parseInt(e.target.value) })}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:border-red-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-200 mb-1">Main Points (strategy)</label>
                    {creatorForm.mainPoints.map((point, idx) => (
                      <input
                        key={idx}
                        type="text"
                        placeholder={`Strategy ${idx + 1}`}
                        value={point}
                        onChange={e => {
                          const pts = [...creatorForm.mainPoints];
                          pts[idx] = e.target.value;
                          setCreatorForm({ ...creatorForm, mainPoints: pts });
                        }}
                        className="w-full mb-2 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-500 focus:border-red-500 outline-none"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 text-white font-bold py-2 rounded transition-all"
                  >
                    {loading ? 'Generating...' : 'Generate Story'}
                  </button>
                </div>
              </form>
            )}

            {/* PRICE COMPARE MODE */}
            {mode === 'price-compare' && (
              <form onSubmit={handlePriceSubmit}>
                <h2 className="text-xl font-bold mb-4">Price Comparison Guide</h2>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-zinc-200 mb-1">Product Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Sony A6100"
                      value={priceForm.productName}
                      onChange={e => setPriceForm({ ...priceForm, productName: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-500 focus:border-red-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-200 mb-1">Prices by Retailer</label>
                    {priceForm.prices.map((p, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={p.retailer}
                          onChange={e => {
                            const prices = [...priceForm.prices];
                            prices[idx].retailer = e.target.value;
                            setPriceForm({ ...priceForm, prices });
                          }}
                          placeholder="Retailer"
                          className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-500 focus:border-red-500 outline-none"
                        />
                        <input
                          type="number"
                          value={p.price}
                          onChange={e => {
                            const prices = [...priceForm.prices];
                            prices[idx].price = parseInt(e.target.value);
                            setPriceForm({ ...priceForm, prices });
                          }}
                          placeholder="Price (RM)"
                          className="w-24 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-500 focus:border-red-500 outline-none"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-200 mb-1">Expected Monthly Income (RM)</label>
                    <input
                      type="number"
                      value={priceForm.earningPotential}
                      onChange={e => setPriceForm({ ...priceForm, earningPotential: parseInt(e.target.value) })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:border-red-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-200 mb-1">Key Points</label>
                    {priceForm.mainPoints.map((point, idx) => (
                      <input
                        key={idx}
                        type="text"
                        placeholder={`Tip ${idx + 1}`}
                        value={point}
                        onChange={e => {
                          const pts = [...priceForm.mainPoints];
                          pts[idx] = e.target.value;
                          setPriceForm({ ...priceForm, mainPoints: pts });
                        }}
                        className="w-full mb-2 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-500 focus:border-red-500 outline-none"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 text-white font-bold py-2 rounded transition-all"
                  >
                    {loading ? 'Generating...' : 'Generate Guide'}
                  </button>
                </div>
              </form>
            )}

            {/* BULK IMPORT MODE */}
            {mode === 'bulk-import' && (
              <form onSubmit={handleBulkImport}>
                <h2 className="text-xl font-bold mb-4">Bulk Import</h2>
                <p className="text-sm text-zinc-200 mb-3">
                  Format: <code className="bg-zinc-800 px-2 py-1 rounded">Title | URL | Point1 | Point2 | Point3 | Category</code>
                </p>

                <textarea
                  value={bulkCSV}
                  onChange={e => setBulkCSV(e.target.value)}
                  placeholder={`DJI Osmo Action 5 Pro Review | https://youtube.com/watch?v=xxx | Front screen for vlogging | RockSteady stabilization | Best battery life | gear\nSony A6100 vs Canon R50 | | Better autofocus | 4K capable | Affordable used price | comparison`}
                  className="w-full h-48 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-500 focus:border-red-500 outline-none font-mono text-sm"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 text-white font-bold py-2 rounded transition-all"
                >
                  {loading ? 'Importing...' : 'Import Articles'}
                </button>
              </form>
            )}
          </div>

          {/* OUTPUT PANEL */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Generated Output</h2>

            {!generated ? (
              <div className="text-zinc-500 text-sm p-4 bg-zinc-800 rounded">
                <p>Fill the form on the left and click generate.</p>
                <p className="mt-2">Output will appear here as JSON ready to paste into your articles.ts file.</p>
              </div>
            ) : (
              <>
                <pre className="bg-zinc-800 border border-zinc-700 rounded p-3 text-xs overflow-auto max-h-96 text-zinc-200">
                  {generated}
                </pre>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generated);
                    alert('Copied to clipboard!');
                  }}
                  className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition-all"
                >
                  Copy to Clipboard
                </button>

                {mode === 'bulk-import' && bulkResults.length > 0 && (
                  <div className="mt-4 space-y-2 max-h-64 overflow-auto">
                    <h3 className="font-bold text-sm">Results:</h3>
                    {bulkResults.map((r, i) => (
                      <div key={i} className="text-xs bg-zinc-800 p-2 rounded">
                        <span className={r.error ? 'text-red-400' : 'text-green-400'}>
                          #{r.idx}: {r.title || r.error || 'Processing'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* INFO SECTION */}
        <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-bold mb-3">How to Use This</h2>
          <ol className="space-y-2 text-sm text-zinc-100">
            <li><strong>1. Quick Mode:</strong> Paste a YouTube link + 3 key points → instant article</li>
            <li><strong>2. Creator Story:</strong> Creator name + earnings + strategy → inspiration article</li>
            <li><strong>3. Price Compare:</strong> Product name + prices from 3 retailers → ROI guide</li>
            <li><strong>4. Bulk Import:</strong> Paste 10+ rows → generate multiple articles at once</li>
            <li><strong>5. Copy & Paste:</strong> Copy the JSON output, add it to src/data/articles.ts</li>
            <li><strong>6. Rebuild:</strong> Run `npm run build` and deploy</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
