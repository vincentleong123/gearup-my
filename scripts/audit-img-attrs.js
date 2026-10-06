// Audit: every <img> on key pages - object-fit present? declared width/height
// aspect truthful vs real file dims? Files served from /blog /wikimedia /gigs /gear.
const s = require('sharp');

(async () => {
  const pages = [
    'http://localhost:3002/',
    'http://localhost:3002/en/blog/nikon-z5iic-canon-r8-mark-ii-buy-window-malaysia-2026',
    'http://localhost:3002/en/blog',
    'http://localhost:3002/en/gear',
    'http://localhost:3002/en/gigs',
  ];
  for (const u of pages) {
    const h = await (await fetch(u, { headers: { 'user-agent': 'Mozilla/5.0' } })).text();
    const imgs = [...h.matchAll(/<img\s+([^>]+)>/g)].map((m) => m[1]);
    console.log('== ' + u + ' imgs=' + imgs.length);
    let issues = 0;
    for (const a of imgs) {
      const src = (a.match(/src="([^"]+)"/) || [])[1];
      const w = (a.match(/width="(\d+)"/) || [])[1];
      const ht = (a.match(/height="(\d+)"/) || [])[1];
      const cls = (a.match(/class="([^"]+)"/) || [])[1] || '';
      const cover = /object-(cover|contain|fill|scale-down|none)/.test(cls + a);
      if (!cover) { console.log('  NO-OBJECT-FIT: ' + src); issues++; }
      if (!src) continue;
      let real = null;
      if (/^\/(blog|wikimedia|gigs|gear)\//.test(src)) {
        const p = 'public' + src.split('?')[0];
        try { const m = await s(p).metadata(); real = m.width + 'x' + m.height; }
        catch (e) { real = 'MISSING'; }
      }
      if (!real) continue;
      if (real === 'MISSING') { console.log('  FILE-MISSING ' + src); issues++; continue; }
      const [rw, rh] = real.split('x').map(Number);
      if (w && ht) {
        const da = +w / +ht, ra = rw / rh;
        if (Math.abs(da - ra) / ra > 0.02) {
          console.log('  ASPECT-MISMATCH attrs=' + w + 'x' + ht + ' real=' + real + ' cover=' + cover + ' src=' + src);
          issues++;
        }
      } else {
        console.log('  NO-ATTRS real=' + real + ' src=' + src);
      }
    }
    console.log('  issues=' + issues);
  }
})().catch((e) => console.log('E', e.message));
