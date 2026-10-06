// Detects <img> tags with missing/empty src (silent broken renders like the
// thailand-camera-gear home crash) across every sitemap page.
const xml = await (await fetch('http://localhost:3002/sitemap.xml')).text();
const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
let bad = 0, done = 0;
for (let i = 0; i < locs.length; i += 16) {
  await Promise.all(locs.slice(i, i + 16).map(async p => {
    try {
      const h = await (await fetch(p)).text();
      done++;
      if (/<img(?![^>]*\ssrc=)[^>]*>|src=""|src='"/.test(h)) { bad++; console.log('EMPTY-SRC img @', p); }
    } catch { /* ignore */ }
  }));
}
console.log('checked', done, 'pages; empty-src pages:', bad);
