// ============================================================
// GEAR LIBRARY 2010 → 2026
// A curated archive of the cameras, lenses, flashes, gimbals,
// audio, lights, drones and accessories that defined the last
// 16 years of Malaysian shooting — with realistic local
// second-hand price bands (Mudah/Carousell/SGTAM bands, not
// shop retail) so every entry stays useful for buy decisions.
// ============================================================

export type LibCat =
  | 'dslr' | 'mirrorless' | 'lens' | 'flash' | 'adapter' | 'gimbal'
  | 'tripod' | 'audio' | 'lighting' | 'filter' | 'storage' | 'battery'
  | 'bag' | 'drone' | 'action' | 'phone' | 'monitor';

export interface LibraryEntry {
  id: string;
  brand: string;
  name: string;
  cat: LibCat;
  year: number;
  mount?: string;
  used: string;
  note: string;
}

export const LIB_CAT_LABEL: Record<LibCat, string> = {
  dslr: 'DSLR',
  mirrorless: 'Mirrorless',
  lens: 'Lens',
  flash: 'Flash & Trigger',
  adapter: 'Mount Adapter',
  gimbal: 'Gimbal',
  tripod: 'Tripod & Support',
  audio: 'Audio',
  lighting: 'Lighting',
  filter: 'Filter',
  storage: 'Storage',
  battery: 'Power',
  bag: 'Bag',
  drone: 'Drone',
  action: 'Action Camera',
  phone: 'Phone Gear',
  monitor: 'Monitor',
};

export const LIB_ERAS: { id: string; label: string; years: number[]; blurb: string }[] = [
  { id: '2010-13', label: '2010–2013', years: [2010, 2011, 2012, 2013], blurb: 'DSLR peak. Canon & Nikon own the wedding circuit; the A7 turn mirrorless from toy into tool.' },
  { id: '2014-17', label: '2014–2017', years: [2014, 2015, 2016, 2017], blurb: 'Mirrorless grows up: GH4 brings 4K to the masses, A7 III becomes everyone’s "next camera", Godox kills the flash monopoly.' },
  { id: '2018-21', label: '2018–2021', years: [2018, 2019, 2020, 2021], blurb: 'Every brand drops its native mount. DJI gimbals & Mini series rewrite the aerial gig. COVID pushes everyone freelance.' },
  { id: '2022-26', label: '2022–2026', years: [2022, 2023, 2024, 2025, 2026], blurb: 'AI autofocus everywhere, CFexpress becomes the norm, and phones challenge cameras under RM2,000.' },
];

export const gearLibrary: LibraryEntry[] = [
  // ===== DSLR ERA — Canon =====
  { id: 'canon-550d', brand: 'Canon', name: 'EOS 550D / Rebel T2i', cat: 'dslr', year: 2010, mount: 'EF/EF-S', used: 'RM250–450', note: 'The 2010 starter king — thousands of Malaysian creators shot their first portfolio on this body.' },
  { id: 'canon-600d', brand: 'Canon', name: 'EOS 600D / T3i', cat: 'dslr', year: 2011, mount: 'EF/EF-S', used: 'RM300–500', note: 'Flip-screen of its generation; still hireable as a warm-up body for studio sessions.' },
  { id: 'canon-650d', brand: 'Canon', name: 'EOS 650D / T4i', cat: 'dslr', year: 2012, mount: 'EF/EF-S', used: 'RM350–600', note: 'First Rebel with touchscreen + hybrid AF for video focus pulls.' },
  { id: 'canon-700d', brand: 'Canon', name: 'EOS 700D / T5i', cat: 'dslr', year: 2013, mount: 'EF/EF-S', used: 'RM400–700', note: 'Lived on as a starter-package body with the 18-55 STM for years after.' },
  { id: 'canon-60d', brand: 'Canon', name: 'EOS 60D', cat: 'dslr', year: 2010, mount: 'EF/EF-S', used: 'RM350–600', note: 'First mid-tier flip-screen DSLR — a graduation-shoot staple at RM150/day.' },
  { id: 'canon-70d', brand: 'Canon', name: 'EOS 70D', cat: 'dslr', year: 2013, mount: 'EF/EF-S', used: 'RM700–1,100', note: 'Dual Pixel CMOS AF made live-view video focusing genuinely usable.' },
  { id: 'canon-80d', brand: 'Canon', name: 'EOS 80D', cat: 'dslr', year: 2016, mount: 'EF/EF-S', used: 'RM1,200–1,700', note: 'The last Canon aps-c workhorse before mirrorless took the march.' },
  { id: 'canon-7d', brand: 'Canon', name: 'EOS 7D', cat: 'dslr', year: 2009, mount: 'EF/EF-S', used: 'RM450–800', note: '8 fps sports body with zero AF refinement; still a used-deal legend.' },
  { id: 'canon-7d2', brand: 'Canon', name: 'EOS 7D Mark II', cat: 'dslr', year: 2014, mount: 'EF/EF-S', used: 'RM1,600–2,300', note: 'NFL-grade AF in an aps-c — event-second-shooter favourite well into 2022.' },
  { id: 'canon-5d2', brand: 'Canon', name: 'EOS 5D Mark II', cat: 'dslr', year: 2008, mount: 'EF', used: 'RM800–1,400', note: 'The camera that made everyone’s wedding video look "cinematic" — still bought for its colour science.' },
  { id: 'canon-5d3', brand: 'Canon', name: 'EOS 5D Mark III', cat: 'dslr', year: 2012, mount: 'EF', used: 'RM2,200–3,200', note: 'The 2010s workhorse: Malaysian wedding shooters carried one into 2020.' },
  { id: 'canon-6d', brand: 'Canon', name: 'EOS 6D', cat: 'dslr', year: 2012, mount: 'EF', used: 'RM1,000–1,600', note: 'Compact full-frame for the price of a phone — the "I need bokeh now" gateway.' },
  { id: 'canon-6d2', brand: 'Canon', name: 'EOS 6D Mark II', cat: 'dslr', year: 2017, mount: 'EF', used: 'RM2,400–3,200', note: 'Flip-screen full-frame; still a favourite for graduation + event combos.' },
  { id: 'canon-1dx', brand: 'Canon', name: 'EOS-1D X', cat: 'dslr', year: 2011, mount: 'EF', used: 'RM2,500–4,000', note: 'Flagship tank — mostly bought second-hand by serious event centres.' },
  { id: 'canon-90d', brand: 'Canon', name: 'EOS 90D', cat: 'dslr', year: 2019, mount: 'EF/EF-S', used: 'RM2,800–3,800', note: 'Last aps-c flagship DSLR: 32.5MP + uncropped 4K — still entirely sensible today.' },
  { id: 'canon-200d', brand: 'Canon', name: 'EOS 200D / SL2', cat: 'dslr', year: 2017, mount: 'EF/EF-S', used: 'RM600–1,000', note: 'Tiny starter DSLR that made vlogging on a viewfinder possible.' },
  { id: 'canon-850d', brand: 'Canon', name: 'EOS 850D / T8i', cat: 'dslr', year: 2020, mount: 'EF/EF-S', used: 'RM1,500–2,200', note: 'Last Rebel release — bought mostly by students avoiding mirrorless menus.' },
  { id: 'canon-1500d', brand: 'Canon', name: 'EOS 1500D / 2000D', cat: 'dslr', year: 2018, mount: 'EF/EF-S', used: 'RM450–750', note: 'Bundle-price king in Malaysian camera shops for half a decade.' },

  // ===== DSLR ERA — Nikon =====
  { id: 'nikon-d3100', brand: 'Nikon', name: 'D3100', cat: 'dslr', year: 2010, mount: 'F', used: 'RM250–450', note: 'Our #1 "start from RM0" pick years running — proven 1080p, rocks-cheap F-mount glass.' },
  { id: 'nikon-d3200', brand: 'Nikon', name: 'D3200', cat: 'dslr', year: 2012, mount: 'F', used: 'RM300–550', note: '24MP sensor in a starter body — sharper files than twice-its-price rivals.' },
  { id: 'nikon-d3300', brand: 'Nikon', name: 'D3300', cat: 'dslr', year: 2014, mount: 'F', used: 'RM400–650', note: 'Removable AA filter made this the sharpest starter ever at its price band.' },
  { id: 'nikon-d3400', brand: 'Nikon', name: 'D3400', cat: 'dslr', year: 2016, mount: 'F', used: 'RM450–750', note: 'Bluetooth SnapBridge, 1,200-shot battery — the Hermit-floor classroom body.' },
  { id: 'nikon-d3500', brand: 'Nikon', name: 'D3500', cat: 'dslr', year: 2018, mount: 'F', used: 'RM550–900', note: 'The beginner-camera chart topper for 5 straight years worldwide.' },
  { id: 'nikon-d5200', brand: 'Nikon', name: 'D5200 / D5300', cat: 'dslr', year: 2012, mount: 'F', used: 'RM350–700', note: 'Flip-screen 24MP starter with phase AF — the graduation-gig starter of 2015.' },
  { id: 'nikon-d5600', brand: 'Nikon', name: 'D5600', cat: 'dslr', year: 2016, mount: 'F', used: 'RM900–1,400', note: 'Mid-2010s student favourite before the Z30 took over.' },
  { id: 'nikon-d7100', brand: 'Nikon', name: 'D7100', cat: 'dslr', year: 2013, mount: 'F', used: 'RM800–1,300', note: '24MP no-OVF enthusiast body that photographers shot weddings balanced on.' },
  { id: 'nikon-d7200', brand: 'Nikon', name: 'D7200', cat: 'dslr', year: 2015, mount: 'F', used: 'RM1,100–1,700', note: 'Bombproof enthusiast body — still the last "two-card-slot" aps-c Nikon DSLR.' },
  { id: 'nikon-d750', brand: 'Nikon', name: 'D750', cat: 'dslr', year: 2014, mount: 'F', used: 'RM1,800–2,700', note: 'Half the weight, most of the 5D III image — Malaysian wedding shooters’ default upgrade.' },
  { id: 'nikon-d610', brand: 'Nikon', name: 'D610', cat: 'dslr', year: 2013, mount: 'F', used: 'RM1,200–1,900', note: 'The cheapest FX entrance at its time; 24MP files still print fine.' },
  { id: 'nikon-d810', brand: 'Nikon', name: 'D810', cat: 'dslr', year: 2014, mount: 'F', used: 'RM2,200–3,300', note: '36MP studio monster for product photographers who hate paying GFX money.' },
  { id: 'nikon-d850', brand: 'Nikon', name: 'D850', cat: 'dslr', year: 2017, mount: 'F', used: 'RM4,500–6,500', note: 'The greatest DSLR ever made, full-stop. Still a top choice for architecture 2026.' },
  { id: 'nikon-d7500', brand: 'Nikon', name: 'D7500', cat: 'dslr', year: 2017, mount: 'F', used: 'RM1,800–2,600', note: 'D500-lite: blazing AF + weather seal for motor-sport freelancers.' },
  { id: 'nikon-d500', brand: 'Nikon', name: 'D500', cat: 'dslr', year: 2016, mount: 'F', used: 'RM3,000–4,200', note: '10 fps sports aps-c — the birds-in-flight king used across Sabah & Sarawak.' },
  { id: 'nikon-df', brand: 'Nikon', name: 'DF', cat: 'dslr', year: 2013, mount: 'F', used: 'RM1,500–2,500', note: 'Retro dials full-frame; Instagram nostalgia body with serious AF inside.' },
  { id: 'nikon-p1000', brand: 'Nikon', name: 'P1000', cat: 'dslr', year: 2017, mount: 'Fixed', used: 'RM2,000–3,200', note: '125x superzoom — moon-shot content in a single body.' },

  // ===== DSLR ERA — Sony SLT / Pentax =====
  { id: 'sony-a55', brand: 'Sony', name: 'A55 / A33 (SLT)', cat: 'dslr', year: 2010, mount: 'A', used: 'RM250–450', note: 'Electronically-piloted translucent mirror — the A7 lineage’s true grandparent.' },
  { id: 'sony-a77', brand: 'Sony', name: 'A77 / A77 II', cat: 'dslr', year: 2011, mount: 'A', used: 'RM500–900', note: '24MP SLT with continuous EVF focus — underrated video tool of its era.' },
  { id: 'sony-a99', brand: 'Sony', name: 'A99 / A99 II', cat: 'dslr', year: 2012, mount: 'A', used: 'RM1,800–3,000', note: 'Sony’s full-frameest DSLR-era flagship; the last SLT flagship that mattered.' },
  { id: 'pentax-k3', brand: 'Pentax', name: 'K-3 / K-3 II', cat: 'dslr', year: 2013, mount: 'K', used: 'RM800–1,500', note: 'Weather-sealed aps-c with in-body shake reduction — the brand the internet loves.' },
  { id: 'pentax-k1', brand: 'Pentax', name: 'K-1 / K-1 II', cat: 'dslr', year: 2016, mount: 'K', used: 'RM2,300–3,800', note: 'Full-frame DSLR with the best build-per-ringgit of the final DSLR decade.' },

  // ===== MIRRORLESS — Sony =====
  { id: 'sony-nex5', brand: 'Sony', name: 'NEX-5 / NEX-5N', cat: 'mirrorless', year: 2010, mount: 'E', used: 'RM200–400', note: 'Pocketable 1080p video in 2010 — Malaysian vlogging before the word went big.' },
  { id: 'sony-nex7', brand: 'Sony', name: 'NEX-7', cat: 'mirrorless', year: 2011, mount: 'E', used: 'RM500–900', note: '24MP + tri-nav dials; what pros demanded before full-frame mirrorless arrived.' },
  { id: 'sony-a6000', brand: 'Sony', name: 'A6000', cat: 'mirrorless', year: 2014, mount: 'E (APS-C)', used: 'RM450–800', note: 'The best-selling mirrorless of all time, and the RM0-to-portfolio upgrade for countless creators here.' },
  { id: 'sony-a6300', brand: 'Sony', name: 'A6300', cat: 'mirrorless', year: 2016, mount: 'E (APS-C)', used: 'RM900–1,400', note: '4K + weather seal at a starter price — took event second-shooting wireless.' },
  { id: 'sony-a6400', brand: 'Sony', name: 'A6400', cat: 'mirrorless', year: 2019, mount: 'E (APS-C)', used: 'RM1,400–2,000', note: 'Real-time eye AF at aps-c prices — Malaysia’s default beginner mirrorless 2020–2023.' },
  { id: 'sony-a6600', brand: 'Sony', name: 'A6600', cat: 'mirrorless', year: 2019, mount: 'E (APS-C)', used: 'RM2,600–3,400', note: 'IBIS + big battery in an A6-line body — spent its life in minority.' },
  { id: 'sony-a6700', brand: 'Sony', name: 'A6700', cat: 'mirrorless', year: 2023, mount: 'E (APS-C)', used: 'RM4,200–5,500', note: 'AI subject AF + full-frame codecs in the little brother everyone wanted.' },
  { id: 'sony-a7', brand: 'Sony', name: 'A7', cat: 'mirrorless', year: 2013, mount: 'E (FE)', used: 'RM600–1,100', note: 'The mirrorless world’s big-bang opening shot — cheap full-frame today.' },
  { id: 'sony-a7ii', brand: 'Sony', name: 'A7 II', cat: 'mirrorless', year: 2014, mount: 'E (FE)', used: 'RM900–1,500', note: 'First IBIS full-frame; your best under-RM1,500 bokeh ticket in 2026.' },
  { id: 'sony-a7iii', brand: 'Sony', name: 'A7 III', cat: 'mirrorless', year: 2018, mount: 'E (FE)', used: 'RM3,500–4,500', note: 'The camera every Malaysian freelancer rented first. Dual-slot + blinding battery.' },
  { id: 'sony-a7iv', brand: 'Sony', name: 'A7 IV', cat: 'mirrorless', year: 2021, mount: 'E (FE)', used: 'RM6,500–8,000', note: 'The 2020s do-it-all workhorse: photo + streaming + 10-bit 4K video — used by studio managers here.' },
  { id: 'sony-a7c', brand: 'Sony', name: 'A7C / A7C II', cat: 'mirrorless', year: 2020, mount: 'E (FE)', used: 'RM3,500–5,000', note: 'Smallest full-frame — travel creators who hate weight bought it instantly.' },
  { id: 'sony-a7riii', brand: 'Sony', name: 'A7R III / A7R IV', cat: 'mirrorless', year: 2017, mount: 'E (FE)', used: 'RM3,500–6,000', note: '42/61MP resolution bench — the product-photographer studio pick' },
  { id: 'sony-a7rv', brand: 'Sony', name: 'A7R V', cat: 'mirrorless', year: 2022, mount: 'E (FE)', used: 'RM11,000–14,500', note: 'AI subject AF, 61MP, pixel-shift — the studio chat’s current flex.' },
  { id: 'sony-a7sii', brand: 'Sony', name: 'A7S II', cat: 'mirrorless', year: 2015, mount: 'E (FE)', used: 'RM1,500–2,400', note: 'Low-light video built a generation of Malaysian night-market vlogs.' },
  { id: 'sony-a7siii', brand: 'Sony', name: 'A7S III', cat: 'mirrorless', year: 2020, mount: 'E (FE)', used: 'RM8,000–10,500', note: 'The wedding-video camera of the decade: 12-bit 4K60, marvellous IBIS.' },
  { id: 'sony-a9', brand: 'Sony', name: 'A9 / A9 II', cat: 'mirrorless', year: 2017, mount: 'E (FE)', used: 'RM5,500–8,500', note: 'Blackout-free stacked sensor — sports photographers’ entry into the e-mount flagpoles.' },
  { id: 'sony-a9iii', brand: 'Sony', name: 'A9 III', cat: 'mirrorless', year: 2024, mount: 'E (FE)', used: 'RM22,000-26,000', note: '120fps global shutter (a world first) — Sabah birding tournaments fell in love.' },
  { id: 'sony-a1', brand: 'Sony', name: 'A1', cat: 'mirrorless', year: 2021, mount: 'E (FE)', used: 'RM16,000–21,000', note: 'Everything flagship: 50MP + 10 fps stacked full-frame; agency rental kits.' },
  { id: 'sony-fx3', brand: 'Sony', name: 'FX3 / FX30', cat: 'mirrorless', year: 2021, mount: 'E (Cine)', used: 'RM12,000–19,000', note: 'Cinema-line bodies for commercial video crews — the S-log studio standard.' },
  { id: 'sony-zve10', brand: 'Sony', name: 'ZV-E10 / ZV-E10 II', cat: 'mirrorless', year: 2021, mount: 'E (APS-C)', used: 'RM1,500–2,500', note: 'The TikTok-shop phenomenon — product-livestream lighting kit cameras.' },
  { id: 'sony-zv1', brand: 'Sony', name: 'ZV-1 / ZV-1 II', cat: 'mirrorless', year: 2020, mount: 'Fixed', used: 'RM1,200–1,900', note: 'Pocket vlogger with a product-showcase button; shopping sellers’ default.' },
  { id: 'sony-rx100', brand: 'Sony', name: 'RX100 IV / VA', cat: 'mirrorless', year: 2015, mount: 'Fixed', used: 'RM900–1,600', note: '24fps stacked compact that out-zoomed expectations for years.' },

  // ===== MIRRORLESS — Canon =====
  { id: 'canon-m', brand: 'Canon', name: 'EOS M / M10', cat: 'mirrorless', year: 2012, mount: 'EF-M', used: 'RM250–500', note: 'Cheap glass adapter path; the EF-M second-hand market stays alive through 2026.' },
  { id: 'canon-m50', brand: 'Canon', name: 'EOS M50 II', cat: 'mirrorless', year: 2018, mount: 'EF-M', used: 'RM900–1,500', note: 'Every 2019–2022 beginner’s first camera; the EF-M 15-45 kit ruled marketplaces.' },
  { id: 'canon-m6ii', brand: 'Canon', name: 'EOS M6 Mark II', cat: 'mirrorless', year: 2019, mount: 'EF-M', used: 'RM1,600–2,400', note: '32.5MP beast in a no-EVF shell; YouTube product reviewers loved it.' },
  { id: 'canon-r', brand: 'Canon', name: 'EOS R / RP', cat: 'mirrorless', year: 2018, mount: 'RF', used: 'RM1,200–2,000', note: 'Canon RF chapter one; the RP is still the cheapest full-frame usable in Malaysia.' },
  { id: 'canon-r5', brand: 'Canon', name: 'EOS R5 / R5 Mark II', cat: 'mirrorless', year: 2020, mount: 'RF', used: 'RM11,000–18,000', note: '45MP 8K flagship that reset what a hybrid could do — agency event main bodies.' },
  { id: 'canon-r6', brand: 'Canon', name: 'EOS R6 / R6 Mark II', cat: 'mirrorless', year: 2020, mount: 'RF', used: 'RM5,500–9,500', note: 'Everyone’s high-fps full-frame pick once prices normalised 2022.' },
  { id: 'canon-r3', brand: 'Canon', name: 'EOS R3', cat: 'mirrorless', year: 2021, mount: 'RF', used: 'RM14,000–18,000', note: 'Eye-control AF sports flagship — automotive & motorsport shooters here.' },
  { id: 'canon-r8', brand: 'Canon', name: 'EOS R8', cat: 'mirrorless', year: 2023, mount: 'RF', used: 'RM4,000–5,200', note: 'R6 II sensor at half the body weight; the sensible 2024 full-frame buy.' },
  { id: 'canon-r7', brand: 'Canon', name: 'EOS R7', cat: 'mirrorless', year: 2022, mount: 'RF', used: 'RM3,800–5,000', note: 'The aps-c heir to the 7D II that everyone demanded — wildlife & sports.' },
  { id: 'canon-r10', brand: 'Canon', name: 'EOS R10', cat: 'mirrorless', year: 2022, mount: 'RF', used: 'RM2,000–2,800', note: 'Starter RF body with 15 fps — the fresh-grad gig kit standard.' },
  { id: 'canon-r50', brand: 'Canon', name: 'EOS R50 / R100 / R50 V', cat: 'mirrorless', year: 2023, mount: 'RF', used: 'RM1,100–1,900', note: 'The 2023–2026 beginner trio; R50 V is Canon’s TikTok-native pocket body.' },
  { id: 'canon-r1', brand: 'Canon', name: 'EOS R1', cat: 'mirrorless', year: 2024, mount: 'RF', used: 'RM32,000+', note: 'Canon’s first RF flagship for Olympics-plate shooters; rare but seen here.' },
  { id: 'canon-g7x', brand: 'Canon', name: 'PowerShot G7X II / III', cat: 'mirrorless', year: 2016, mount: 'Fixed', used: 'RM1,100–1,800', note: 'Rebelliously popular among café vloggers; the streaming-workhorse compact.' },

  // ===== MIRRORLESS — Nikon Z =====
  { id: 'nikon-z50', brand: 'Nikon', name: 'Z50 / Z50 II', cat: 'mirrorless', year: 2019, mount: 'Z', used: 'RM1,500–2,800', note: 'The Z-mount beginner duo — Z50 II (2024) brought AI AF to the aps-c crowd.' },
  { id: 'nikon-z30', brand: 'Nikon', name: 'Z30', cat: 'mirrorless', year: 2022, mount: 'Z', used: 'RM1,200–1,800', note: 'Vlogger-shaped Z body with the best flip screen of the starter trio.' },
  { id: 'nikon-zfc', brand: 'Nikon', name: 'Zfc', cat: 'mirrorless', year: 2021, mount: 'Z', used: 'RM1,800–2,500', note: 'FM2-rivalling retro looks; lifestyle-content gold in Kuala Lumpur cafés.' },
  { id: 'nikon-zf', brand: 'Nikon', name: 'Zf', cat: 'mirrorless', year: 2023, mount: 'Z', used: 'RM7,500–9,500', note: 'Full-frame retro dials + class-leading AF — the Malaysian photographers’ 2024 crush.' },
  { id: 'nikon-z5', brand: 'Nikon', name: 'Z5 / Z5 II', cat: 'mirrorless', year: 2020, mount: 'Z', used: 'RM2,300–4,000', note: 'The under-RM3,000 full-frame ticket that quietly won value charts.' },
  { id: 'nikon-z6', brand: 'Nikon', name: 'Z6 / Z6 II / Z6 III', cat: 'mirrorless', year: 2018, mount: 'Z', used: 'RM2,500–8,000', note: 'Video-leaning 24MP all-rounder line; Z6 III’s 6K internal RAW set records.' },
  { id: 'nikon-z7', brand: 'Nikon', name: 'Z7 / Z7 II', cat: 'mirrorless', year: 2018, mount: 'Z', used: 'RM4,000–7,000', note: '45MP resolution line — the landscape/architecture Z pick.' },
  { id: 'nikon-z8', brand: 'Nikon', name: 'Z8', cat: 'mirrorless', year: 2023, mount: 'Z', used: 'RM14,000–17,500', note: 'Z9 squeezed smaller; no-mechanical-shutter sports/resolution hybrid.' },
  { id: 'nikon-z9', brand: 'Nikon', name: 'Z9', cat: 'mirrorless', year: 2021, mount: 'Z', used: 'RM19,000–25,000', note: 'Flagship without a shutter at all — Malaysia’s own agency houses own a pair.' },
  { id: 'nikon-z63', brand: 'Nikon', name: 'Z6 III / ZR', cat: 'mirrorless', year: 2025, mount: 'Z', used: 'RM10,000–14,000', note: 'The 2025 RED-brained hybrid: internal RAW 6K, screamer video specs.' },

  // ===== MIRRORLESS — Fujifilm =====
  { id: 'fuji-x100', brand: 'Fujifilm', name: 'X100 / X100S / X100F', cat: 'mirrorless', year: 2010, mount: 'Fixed', used: 'RM800–2,000', note: 'The street-photography cult line — X100F carries the pre-V generation.' },
  { id: 'fuji-x100v', brand: 'Fujifilm', name: 'X100V / X100VI', cat: 'mirrorless', year: 2020, mount: 'Fixed', used: 'RM4,500–7,500', note: 'The 2023–2025 TikTok celebrity camera — resale stayed above retail for 2 years.' },
  { id: 'fuji-xt1', brand: 'Fujifilm', name: 'X-T1 / X-T2', cat: 'mirrorless', year: 2014, mount: 'X', used: 'RM500–1,300', note: 'Weather-sealed X-line; put Fuji on the map for working wedding shooters.' },
  { id: 'fuji-xt3', brand: 'Fujifilm', name: 'X-T3', cat: 'mirrorless', year: 2018, mount: 'X', used: 'RM1,800–2,600', note: '4K/60 + film-sim colour — the 2019–2022 Fuji value sweet spot.' },
  { id: 'fuji-xt4', brand: 'Fujifilm', name: 'X-T4', cat: 'mirrorless', year: 2020, mount: 'X', used: 'RM3,200–4,500', note: 'IBIS + flip screen; video crews kept these in the bag for commercial work.' },
  { id: 'fuji-xt5', brand: 'Fujifilm', name: 'X-T5', cat: 'mirrorless', year: 2022, mount: 'X', used: 'RM6,500–8,500', note: '40MP travel-street flagship of the X generation.' },
  { id: 'fuji-xt50', brand: 'Fujifilm', name: 'X-T50 / X-T30', cat: 'mirrorless', year: 2019, mount: 'X', used: 'RM1,700–3,000', note: 'Beginner APSC with knobs; X-T50 added IBIS in 2024.' },
  { id: 'fuji-xpro', brand: 'Fujifilm', name: 'X-Pro1 / X-Pro3', cat: 'mirrorless', year: 2012, mount: 'X', used: 'RM800–2,800', note: 'Hybrid rangefinder viewfinder line — the photographers’ photographers’ body.' },
  { id: 'fuji-xe4', brand: 'Fujifilm', name: 'X-S10 / X-E4 / X-M5', cat: 'mirrorless', year: 2020, mount: 'X', used: 'RM1,400–2,400', note: 'Compact value line; X-M5 (2024) is the new vlogger-Mini with giant sensor.' },
  { id: 'fuji-xh2s', brand: 'Fujifilm', name: 'X-H2 / X-H2S', cat: 'mirrorless', year: 2022, mount: 'X', used: 'RM7,000–10,000', note: 'Stacked 6K open-gate video flagship pairs + 40MP photo version.' },
  { id: 'fuji-gfx', brand: 'Fujifilm', name: 'GFX 50S / 100 / 100 II', cat: 'mirrorless', year: 2017, mount: 'G', used: 'RM8,000–20,000', note: 'Medium format atouser prices; product + fashion studios moved over.' },

  // ===== MIRRORLESS — Panasonic / Olympus / OM / Leica etc =====
  { id: 'pan-gh4', brand: 'Panasonic', name: 'GH4', cat: 'mirrorless', year: 2014, mount: 'MFT', used: 'RM500–900', note: 'First mirrorless with internal 4K — Malaysian indie film crews started here.' },
  { id: 'pan-gh5', brand: 'Panasonic', name: 'GH5 / GH5S', cat: 'mirrorless', year: 2017, mount: 'MFT', used: 'RM1,100–2,000', note: 'The video-creator legend — unlimited recording, 10-bit, heavy-duty IBIS.' },
  { id: 'pan-gh6', brand: 'Panasonic', name: 'GH6 / GH7', cat: 'mirrorless', year: 2022, mount: 'MFT', used: 'RM3,000–6,500', note: '5.8K + open-gate codec twins; GH7 added phase AF (finally).' },
  { id: 'pan-s5', brand: 'Panasonic', name: 'S5 / S5 II / S5 IIX', cat: 'mirrorless', year: 2020, mount: 'L', used: 'RM2,800–5,500', note: 'The under-RM4,000 full-frame video sleeper of 2023–2025.' },
  { id: 'pan-g9', brand: 'Panasonic', name: 'G9 / G9 II', cat: 'mirrorless', year: 2017, mount: 'MFT', used: 'RM1,500–3,000', note: '80MP high-res mode wildlife/studio, then phase-AF in the II.' },
  { id: 'oly-em1', brand: 'Olympus', name: 'OM-D E-M1 II / III', cat: 'mirrorless', year: 2016, mount: 'MFT', used: 'RM1,000–2,000', note: 'Sports-grade MFT flagship; the current OM-1 lineage begins here.' },
  { id: 'om-1', brand: 'OM System', name: 'OM-1 / OM-1 II', cat: 'mirrorless', year: 2022, mount: 'MFT', used: 'RM4,000–7,000', note: 'The Olympus rebirth: weather-sealed computing photography, bird/animal AI AF, the working OM-1 II (2024).' },
  { id: 'oly-pen', brand: 'Olympus', name: 'PEN E-PL / E-P7', cat: 'mirrorless', year: 2013, mount: 'MFT', used: 'RM250–600', note: 'Stylistically-small MFT bodies — café content era’s first love.' },
  { id: 'leica-q', brand: 'Leica', name: 'Q / Q2 / Q3', cat: 'mirrorless', year: 2015, mount: 'Fixed', used: 'RM6,000–22,000', note: 'The expensive fixed-lens street-status camera; boutique sells them here.' },
  { id: 'hasselblad-x2d', brand: 'Hasselblad', name: 'X1D / X2D 100C', cat: 'mirrorless', year: 2016, mount: 'XCD', used: 'RM25,000+', note: '100MP medium format that top product studios rent, few ever buy.' },
  { id: 'sigma-fp', brand: 'Sigma', name: 'fp / fp L', cat: 'mirrorless', year: 2019, mount: 'L', used: 'RM2,800–4,500', note: 'Smallest full-frame box camera; RAW video hacks made it a cult rig.' },
  { id: 'ricoh-griii', brand: 'Ricoh', name: 'GR II / GR III / GR IIIx', cat: 'mirrorless', year: 2015, mount: 'Fixed', used: 'RM2,000–3,800', note: 'The pocket street-camera of the TikTok decades — resale stayed silly.' },

  // ===== LENSES — Canon EF =====
  { id: 'canon-50-18-stm', brand: 'Canon', name: 'EF 50mm f/1.8 STM', cat: 'lens', year: 2015, mount: 'EF', used: 'RM150–300', note: '"Nifty-fifty" II of the internet age — everyone’s first blurry-background lens.' },
  { id: 'canon-18-55', brand: 'Canon', name: 'EF-S 18-55mm f/3.5-5.6 IS', cat: 'lens', year: 2010, mount: 'EF-S', used: 'RM80–200', note: 'The kit lens that accidentally taught composition to a generation.' },
  { id: 'canon-10-18', brand: 'Canon', name: 'EF-S 10-18mm f/4.5-5.6 IS STM', cat: 'lens', year: 2014, mount: 'EF-S', used: 'RM300–500', note: 'Cheapest ultra-wide for real-estate room shots — carried by every property shooter.' },
  { id: 'canon-85-18', brand: 'Canon', name: 'EF 85mm f/1.8 USM', cat: 'lens', year: 2010, mount: 'EF', used: 'RM400–650', note: 'Portrait marker under RM500 used; focus ring still magic after 15 years.' },
  { id: 'canon-70-200-f4', brand: 'Canon', name: 'EF 70-200mm f/4L IS USM', cat: 'lens', year: 2006, mount: 'EF', used: 'RM900–1,500', note: 'The affordable L: stage compression without paying the f/2.8 tax.' },
  { id: 'canon-24-105', brand: 'Canon', name: 'EF 24-105mm f/4L IS USM', cat: 'lens', year: 2005, mount: 'EF', used: 'RM700–1,200', note: 'One-lens travel/event standard; still part of every 5D III kit.' },

  // ===== LENSES — Canon RF =====
  { id: 'canon-rf-50-18', brand: 'Canon', name: 'RF 50mm f/1.8 STM', cat: 'lens', year: 2020, mount: 'RF', used: 'RM450–650', note: 'RF nifty; thousands of R10/R50 kits shipped with it.' },
  { id: 'canon-rf-35-18', brand: 'Canon', name: 'RF 35mm f/1.8 IS Macro STM', cat: 'lens', year: 2019, mount: 'RF', used: 'RM700–950', note: 'Tiny RF prime with macro + IS — street/BTS favourite.' },
  { id: 'canon-rf-24-105', brand: 'Canon', name: 'RF 24-105mm f/4L IS USM', cat: 'lens', year: 2018, mount: 'RF', used: 'RM2,800–3,800', note: 'The R-body bundle workhorse; the 2024 hybrid used market pushed it cheap.' },
  { id: 'canon-rf-15-35', brand: 'Canon', name: 'RF 15-35mm f/2.8L IS', cat: 'lens', year: 2019, mount: 'RF', used: 'RM5,000–6,500', note: 'Real-estate interior + event-wide L glass with IS for the RF crowd.' },
  { id: 'canon-rf-28-70', brand: 'Canon', name: 'RF 28-70mm f/2L USM', cat: 'lens', year: 2018, mount: 'RF', used: 'RM8,500–11,000', note: 'Two-point-eight through the whole range; studio + event dream in one.' },
  { id: 'canon-rf-100-500', brand: 'Canon', name: 'RF 100-500mm f/4.5-7.1L', cat: 'lens', year: 2020, mount: 'RF', used: 'RM6,500–8,000', note: 'The R7 wildlife/motorsport combo for long-lens shooters here.' },

  // ===== LENSES — Nikon F + Z =====
  { id: 'nikon-50-18g', brand: 'Nikon', name: 'AF-S 50mm f/1.8G', cat: 'lens', year: 2011, mount: 'F', used: 'RM250–400', note: 'Nikon’s nifty — the D3x00 graduates’ first prime.' },
  { id: 'nikon-35-18g', brand: 'Nikon', name: 'AF-S 35mm f/1.8G DX', cat: 'lens', year: 2009, mount: 'F (DX)', used: 'RM200–350', note: 'Budget walk-around DX prime; café + streetwork sold it.' },
  { id: 'nikon-18-55', brand: 'Nikon', name: 'AF-P 18-55mm VR', cat: 'lens', year: 2016, mount: 'F', used: 'RM80–180', note: 'Silent AF kit lens; graduation-day workhorse part number.' },
  { id: 'nikon-200-500', brand: 'Nikon', name: 'AF-S 200-500mm f/5.6E VR', cat: 'lens', year: 2015, mount: 'F', used: 'RM2,000–3,000', note: 'Sports/wildlife jump for D7500/D500 owners; Borneo birding favourite.' },
  { id: 'nikon-70-200-f4', brand: 'Nikon', name: 'AF-S 70-200mm f/4G VR', cat: 'lens', year: 2012, mount: 'F', used: 'RM1,500–2,200', note: 'Light long zoom for event + graduation compressed portraits.' },
  { id: 'nikon-z-50-18s', brand: 'Nikon', name: 'NIKKOR Z 50mm f/1.8 S', cat: 'lens', year: 2018, mount: 'Z', used: 'RM900–1,200', note: 'First-party S prime value benchmark; Zf/Z6 II weddings love it.' },
  { id: 'nikon-z-24-70-f4', brand: 'Nikon', name: 'NIKKOR Z 24-70mm f/4 S', cat: 'lens', year: 2018, mount: 'Z', used: 'RM1,000–1,500', note: 'Z-kit standard zoom; the 2023 used flood made it a bargain.' },
  { id: 'nikon-z-70-200', brand: 'Nikon', name: 'NIKKOR Z 70-200mm f/2.8 S', cat: 'lens', year: 2020, mount: 'Z', used: 'RM8,000–10,000', note: 'Flagship-length S zoom for events + sports with pinpoint AF.' },
  { id: 'nikon-z-180-600', brand: 'Nikon', name: 'NIKKOR Z 180-600mm f/5.6-6.3 VR', cat: 'lens', year: 2023, mount: 'Z', used: 'RM4,500–5,800', note: 'The zoom everyone wanted: 600mm under RM5,000 for Z8/Z6 III owners.' },

  // ===== LENSES — Sony E/FE =====
  { id: 'sony-28-70', brand: 'Sony', name: 'FE 28-70mm f/3.5-5.6 OSS', cat: 'lens', year: 2013, mount: 'E (FE)', used: 'RM300–500', note: 'The cheap full-frame kit zoom; keeps A7 II bodies alive for beginners.' },
  { id: 'sony-50-18', brand: 'Sony', name: 'FE 50mm f/1.8', cat: 'lens', year: 2016, mount: 'E (FE)', used: 'RM350–550', note: 'Metal-mount nifty that made A7 II + bokeh an entry combo.' },
  { id: 'sony-85-18', brand: 'Sony', name: 'FE 85mm f/1.8', cat: 'lens', year: 2017, mount: 'E (FE)', used: 'RM1,000–1,400', note: 'Portrait benchmark — bokeh + AF at hobbyist money.' },
  { id: 'sony-24-70-gm', brand: 'Sony', name: 'FE 24-70mm f/2.8 GM / GM II', cat: 'lens', year: 2016, mount: 'E (FE)', used: 'RM4,500–9,000', note: 'Event main zoom; GM II’s weight loss made flight-gig sets lighter.' },
  { id: 'sony-70-200-gm', brand: 'Sony', name: 'FE 70-200mm f/2.8 GM OSS II', cat: 'lens', year: 2016, mount: 'E (FE)', used: 'RM6,000–9,500', note: 'Stage-sports + stage-long-zoom mainstay for video crews.' },
  { id: 'sony-24-105', brand: 'Sony', name: 'FE 24-105mm f/4 G OSS', cat: 'lens', year: 2017, mount: 'E (FE)', used: 'RM2,200–3,000', note: 'The all-day single-lens choice for travel + corporate gigs.' },
  { id: 'sony-16-55', brand: 'Sony', name: 'E 16-55mm f/2.8 G', cat: 'lens', year: 2019, mount: 'E (APS-C)', used: 'RM2,200–3,000', note: 'APS-C pro zoom for A6400/A6700 content creators.' },
  { id: 'sony-11-18', brand: 'Sony', name: 'E 11mm f/1.8 / 15mm f/1.4 G', cat: 'lens', year: 2022, mount: 'E (APS-C)', used: 'RM1,800–2,800', note: 'Wide-and-fast APS-C options born for vlogger wide angles.' },
  { id: 'sony-200-600', brand: 'Sony', name: 'FE 200-600mm f/5.6-6.3 G', cat: 'lens', year: 2019, mount: 'E (FE)', used: 'RM4,000–5,500', note: 'The 600mm value ticket; birding tripods across Sabah carry it.' },
  { id: 'sony-16-35-gm', brand: 'Sony', name: 'FE 16-35mm f/2.8 GM', cat: 'lens', year: 2017, mount: 'E (FE)', used: 'RM5,500–7,000', note: 'Interiors, mosques, ballrooms — the pro ultra-wide for Sony crews.' },

  // ===== LENSES — Fujifilm X =====
  { id: 'fuji-35-14', brand: 'Fujifilm', name: 'XF 35mm f/1.4 R', cat: 'lens', year: 2011, mount: 'X', used: 'RM700–1,000', note: 'The "Fuji look" origin lens — slow AF, gloriously imperfect rendering.' },
  { id: 'fuji-56-12', brand: 'Fujifilm', name: 'XF 56mm f/1.2 R APD', cat: 'lens', year: 2013, mount: 'X', used: 'RM1,800–2,800', note: 'The APS-C portrait legend of the decade; wedding shooters swore by it.' },
  { id: 'fuji-18-55', brand: 'Fujifilm', name: 'XF 18-55mm f/2.8-4 OIS', cat: 'lens', year: 2012, mount: 'X', used: 'RM400–700', note: 'The kit lens that acts like f/2.8: built-in OIS + optical excellence.' },
  { id: 'fuji-23-f2', brand: 'Fujifilm', name: 'XF 23mm f/2 R WR', cat: 'lens', year: 2016, mount: 'X', used: 'RM900–1,300', note: 'Quiet, weather-sealed 35mm-equiv — the X100 alternative for X-T bodies.' },
  { id: 'fuji-90-f2', brand: 'Fujifilm', name: 'XF 90mm f/2 R LM WR', cat: 'lens', year: 2015, mount: 'X', used: 'RM1,800–2,500', note: 'Long portrait/compression lens with tack-fast focus motors.' },
  { id: 'fuji-33-14', brand: 'Fujifilm', name: 'XF 33mm f/1.4 R LM WR', cat: 'lens', year: 2021, mount: 'X', used: 'RM3,000–4,000', note: 'Modern 50mm-eq: fast AF, perfect matched flare, big price.' },

  // ===== LENSES — MFT =====
  { id: 'oly-45-18', brand: 'Olympus', name: 'M.Zuiko 45mm f/1.8', cat: 'lens', year: 2011, mount: 'MFT', used: 'RM250–400', note: 'The RM-portrait MFT classic — still unbeatable value on a PEN body.' },
  { id: 'oly-12-40', brand: 'Olympus', name: 'M.Zuiko 12-40mm f/2.8 Pro', cat: 'lens', year: 2013, mount: 'MFT', used: 'RM1,200–1,800', note: 'IP53-rated all-weather mid zoom; the OM-1 partner for working MFT.' },
  { id: 'oly-75-18', brand: 'Olympus', name: 'M.Zuiko 75mm f/1.8', cat: 'lens', year: 2012, mount: 'MFT', used: 'RM1,400–1,900', note: 'Stage portrait lens beloved for events at 150mm-equivalent.' },
  { id: 'pan-25-17', brand: 'Panasonic', name: 'LUMIX 25mm f/1.7 ASPH', cat: 'lens', year: 2015, mount: 'MFT', used: 'RM150–250', note: 'Pocket-change nifty for young GH/GX creators.' },
  { id: 'pan-12-35', brand: 'Panasonic', name: 'LUMIX 12-35mm f/2.8 II', cat: 'lens', year: 2011, mount: 'MFT', used: 'RM1,200–1,800', note: 'Video-crew standard wide zoom; dual IS pairs beautifully with GH bodies.' },

  // ===== LENSES — Sigma (third-party) =====
  { id: 'sigma-18-35-art', brand: 'Sigma', name: '18-35mm f/1.8 Art', cat: 'lens', year: 2013, mount: 'Sigma/EF', used: 'RM1,400–2,000', note: 'The fastest zoom ever built at f/1.8 aps-c — took over low-light video rigs worldwide.' },
  { id: 'sigma-35-art', brand: 'Sigma', name: '35mm f/1.4 Art', cat: 'lens', year: 2012, mount: 'Sigma/EF', used: 'RM800–1,200', note: 'The lens that made "third-party = pro optical" a mainstream belief.' },
  { id: 'sigma-24-70-art', brand: 'Sigma', name: '24-70mm f/2.8 Art / DG DN II', cat: 'lens', year: 2017, mount: 'Sigma/E/L', used: 'RM1,800–4,000', note: 'Workhorse zoom at 40% of first-party money; mirrorless II is tack sharp.' },
  { id: 'sigma-85-art', brand: 'Sigma', name: '85mm f/1.4 Art / DN', cat: 'lens', year: 2016, mount: 'Sigma/E', used: 'RM1,400–2,500', note: 'Portrait flex of the Art era; the DN version cut weight 570g.' },
  { id: 'sigma-56-dn', brand: 'Sigma', name: '56mm f/1.4 DC DN', cat: 'lens', year: 2020, mount: 'E/EF-M/L/MFT', used: 'RM700–950', note: 'The aps-c portrait staple for Sony/Canon/Fuji M-Lens adopters.' },
  { id: 'sigma-30-dn', brand: 'Sigma', name: '30mm f/1.4 DC DN', cat: 'lens', year: 2016, mount: 'E/EF-M', used: 'RM550–750', note: 'Small-dark aps-c walk-around for content creator starters.' },
  { id: 'sigma-16-dn', brand: 'Sigma', name: '16mm f/1.4 DC DN', cat: 'lens', year: 2016, mount: 'E/EF-M', used: 'RM600–850', note: 'Fast, cheap ultra-wide prime for vlog shots on aps-c bodies.' },
  { id: 'sigma-18-50-dn', brand: 'Sigma', name: '18-50mm f/2.8 DC DN', cat: 'lens', year: 2022, mount: 'E/L', used: 'RM1,300–1,700', note: 'Tiny constant-aperture kit upgrade; critical for R50/Z30 class bodies.' },
  { id: 'sigma-150-600', brand: 'Sigma', name: '150-600mm f/5-6.3 Contemporary', cat: 'lens', year: 2014, mount: 'Sigma/Nikon/EF', used: 'RM1,800–2,600', note: 'The RM2k wildlife jump; Tengkera wetlands regulars use them.' },
  { id: 'sigma-135-art', brand: 'Sigma', name: '135mm f/1.8 Art', cat: 'lens', year: 2017, mount: 'Sigma/E', used: 'RM3,000–4,200', note: 'Marriage of bokeh milliseconds and sports-grade AF.' },

  // ===== LENSES — Tamron =====
  { id: 'tamron-28-75', brand: 'Tamron', name: '28-75mm f/2.8 / G2', cat: 'lens', year: 2018, mount: 'E (FE)', used: 'RM1,400–2,500', note: 'The E-mount G2 zoom that undercut everyone; second-shooter standard.' },
  { id: 'tamron-17-28', brand: 'Tamron', name: '17-28mm f/2.8 Di III', cat: 'lens', year: 2019, mount: 'E (FE)', used: 'RM1,300–1,900', note: 'Compact f/2.8 ultra-wide for A7 III managers.' },
  { id: 'tamron-70-180', brand: 'Tamron', name: '70-180mm f/2.8 Di III VXD', cat: 'lens', year: 2020, mount: 'E (FE)', used: 'RM2,400–3,400', note: 'Featherweight telephoto that made travel-compression a norm.' },
  { id: 'tamron-17-70', brand: 'Tamron', name: '17-70mm f/2.8 Di III-A VC RXD', cat: 'lens', year: 2020, mount: 'E/V', used: 'RM1,500–2,200', note: 'First true f/2.8 aps-c 4.1x zoom with Vibration Compensation.' },
  { id: 'tamron-28-200', brand: 'Tamron', name: '28-200mm f/2.8-5.6 Di III RXD', cat: 'lens', year: 2019, mount: 'E (FE)', used: 'RM1,300–1,900', note: 'Travel-madness zoom: 2.8 at wide, 200mm at palm size.' },
  { id: 'tamron-150-500', brand: 'Tamron', name: '150-500mm f/5-6.7 Di III VC VXD', cat: 'lens', year: 2021, mount: 'E (FE)', used: 'RM3,500–4,500', note: 'Sony-mount wildlife 500mm without flagship prices.' },
  { id: 'tamron-90-macro', brand: 'Tamron', name: '90mm f/2.8 Di VC USD Macro', cat: 'lens', year: 2014, mount: 'EF/Nikon', used: 'RM700–1,100', note: 'The DSLR-era 1:1 macro with VC that studios bought a dozen of.' },
  { id: 'tamron-20-40', brand: 'Tamron', name: '20-40mm f/2.8 Di III VXD', cat: 'lens', year: 2023, mount: 'E (FE)', used: 'RM2,400–3,000', note: 'Palm-sized f/2.8 mid zoom for gimbal + handheld work.' },

  // ===== LENSES — Samyang / Tokina / Laowa / Irix =====
  { id: 'samyang-12-mft', brand: 'Samyang', name: '12mm f/2.0 NCS CS', cat: 'lens', year: 2014, mount: 'MFT/E/FX', used: 'RM400–650', note: 'The go-wide astro lens for GH/GX creators.' },
  { id: 'samyang-85-14', brand: 'Samyang', name: '85mm f/1.4 / 14mm f/2.8', cat: 'lens', year: 2010, mount: 'EF/Nikon/E', used: 'RM500–900', note: 'Manual cinema-sense glass popular for wedding entrance videos.' },
  { id: 'tokina-11-16', brand: 'Tokina', name: 'AT-X 11-16mm f/2.8 Pro DX', cat: 'lens', year: 2010, mount: 'EF/Nikon', used: 'RM400–700', note: 'The DSLR-era wide-force for real estate; still floating around Shopee.' },
  { id: 'laowa-9mm', brand: 'Laowa', name: '9mm f/2.8 Zero-D', cat: 'lens', year: 2018, mount: 'E/FX/MFT', used: 'RM1,000–1,400', note: 'The widest rectilinear aps-c: car-fit, room-fit, mosque interiors.' },
  { id: 'laowa-100-2x', brand: 'Laowa', name: '100mm f/2.8 2X Ultra Macro', cat: 'lens', year: 2019, mount: 'E/EF/Nikon', used: 'RM1,600–2,200', note: '2x magnification — watch-strap, ring-detail product work.' },
  { id: 'laowa-probe', brand: 'Laowa', name: '24mm f/14 Probe', cat: 'lens', year: 2018, mount: 'Multi', used: 'RM3,000–4,500', note: 'The commercial-food lens — ant POV shots in every food ad of the era.' },
  { id: 'irix-11', brand: 'Irix', name: '11mm f/4 Blackstone', cat: 'lens', year: 2016, mount: 'EF/Nikon', used: 'RM900–1,400', note: 'Architecture killer with focus lock and printed focus scale.' },

  // ===== LENSES — Viltrox / 7Artisans / TTArtisan / Meike / Yongnuo =====
  { id: 'viltrox-85-18', brand: 'Viltrox', name: '85mm f/1.8 STM', cat: 'lens', year: 2018, mount: 'E/FX/Z', used: 'RM500–750', note: 'The lens that legitimized Chinese autofocus portrait glass worldwide.' },
  { id: 'viltrox-33-14', brand: 'Viltrox', name: '33mm f/1.4 STM', cat: 'lens', year: 2021, mount: 'E/FX/Z', used: 'RM550–800', note: 'APS-C 50mm-eq AF prime that gave Sony/Fuji starters a pro look.' },
  { id: 'viltrox-75-12', brand: 'Viltrox', name: 'AF 75mm f/1.2 Pro', cat: 'lens', year: 2024, mount: 'FX/E/Z', used: 'RM1,800–2,400', note: 'f/1.2 AF at one-fifth Leica money — the 2024 aps-c flex.' },
  { id: 'viltrox-speed', brand: 'Viltrox', name: 'EF-EOS M2 Speed Booster', cat: 'adapter', year: 2020, mount: 'EF-M', used: 'RM350–500', note: 'Full-frame glass + one-stop faster on aps-c EF-M bodies.' },
  { id: 'seven-27-28', brand: '7Artisans / TTArtisan', name: '7Artisans 27mm f/2.8 AF / TT 35mm f/1.8', cat: 'lens', year: 2023, mount: 'E/FX/Z/MFT', used: 'RM250–450', note: 'Shopee-era pancake AF primes that made a whole crop of tiny kits possible.' },
  { id: 'tt-90-125', brand: 'TTArtisan', name: '90mm f/1.25', cat: 'lens', year: 2023, mount: 'E/Z/FX', used: 'RM1,200–1,700', note: 'Crazy-fast portrait prime at triple-exposure value.' },
  { id: 'yongnuo-50', brand: 'Yongnuo', name: 'YN 50mm f/1.8 II', cat: 'lens', year: 2015, mount: 'EF/E', used: 'RM120–250', note: 'The RM-nifty classic for cash-flow-aware creators; focus could be fiction.' },
  { id: 'meike-85', brand: 'Meike', name: 'MK 85mm f/1.8', cat: 'lens', year: 2020, mount: 'E/FX/Z', used: 'RM400–600', note: 'Budget AF portrait prime that made Fuji starters dream.' },
  { id: 'zeiss-batis', brand: 'Zeiss', name: 'Batis 25mm f/2 / 85mm f/1.8', cat: 'lens', year: 2015, mount: 'E (FE)', used: 'RM2,000–3,500', note: 'Autofocus Zeiss with an OLED distance readout — premium early E-mount optics.' },
  { id: 'sigma-iop', brand: 'Sigma', name: '45mm f/2.8 DG DN | Contemporary', cat: 'lens', year: 2019, mount: 'E/L', used: 'RM700–950', note: 'The fp-camera partner pancake; beautifully damped manual rings.' },

  // ===== FLASH / TRIGGERS =====
  { id: 'canon-600ex', brand: 'Canon', name: 'Speedlite 600EX-RT / II', cat: 'flash', year: 2012, mount: 'EF/RF', used: 'RM1,000–1,600', note: 'The original radio-TTL event flashback standard.' },
  { id: 'canon-430ex', brand: 'Canon', name: 'Speedlite 430EX III-RT', cat: 'flash', year: 2015, mount: 'EF/RF', used: 'RM600–900', note: 'Second-body radio flash; graduation backdrops loved it.' },
  { id: 'nikon-sb700', brand: 'Nikon', name: 'SB-700 AF Speedlight', cat: 'flash', year: 2010, mount: 'F/Z', used: 'RM500–800', note: 'The best-balanced mid-tier Nikon event flash; veterans still refuse to swap.' },
  { id: 'nikon-sb500', brand: 'Nikon', name: 'SB-500 / SB-5000', cat: 'flash', year: 2015, mount: 'F/Z', used: 'RM500–1,300', note: 'TTL + radio-commander options; the SB-5000\u2019s cooling band redefined speedlights.' },
  { id: 'godox-tt600', brand: 'Godox', name: 'TT600 / TT600S', cat: 'flash', year: 2015, mount: 'Multi', used: 'RM180–280', note: 'Manual 2.4GHz workhorse — the flash that broke the brand-price barrier.' },
  { id: 'godox-tt685', brand: 'Godox', name: 'TT685 II / TT685 II Z', cat: 'flash', year: 2016, mount: 'Multi', used: 'RM280–420', note: 'Brand-specific TTL + high-speed-sync at hobby money — an event-floor staple.' },
  { id: 'godox-v860', brand: 'Godox', name: 'V860 II / III / III Z', cat: 'flash', year: 2019, mount: 'Multi', used: 'RM450–750', note: 'Li-ion round-head speedlight that replaced AA trays with one cell.' },
  { id: 'godox-ad200', brand: 'Godox', name: 'AD200 / AD200 Pro', cat: 'flash', year: 2017, mount: 'Multi', used: 'RM700–1,100', note: 'Pocket 200Ws — hired everywhere from outdoor portraits to corporate ballrooms.' },
  { id: 'godox-ad400', brand: 'Godox', name: 'AD400 Pro', cat: 'flash', year: 2019, mount: 'Multi', used: 'RM1,600–2,200', note: '400Ws battery monolight; studio-tent cross-check standard.' },
  { id: 'godox-ad600', brand: 'Godox', name: 'AD600 Pro', cat: 'flash', year: 2018, mount: 'Multi', used: 'RM2,600–3,400', note: 'The outdoor-power main light; every rental shelf here stocked it.' },
  { id: 'godox-x3', brand: 'Godox', name: 'X3 / XPro / X2T trigger', cat: 'flash', year: 2016, mount: 'Multi', used: 'RM300–550', note: 'Touchscreen X3 (2023) ended knob-fumbling on live event floors.' },
  { id: 'profoto-a1', brand: 'Profoto', name: 'A1 / A10 / B10X', cat: 'flash', year: 2017, mount: 'Multi', used: 'RM3,500–8,000', note: 'The shiny-battery luxury flash elite luxury agencies capture with.' },
  { id: 'yong-y560', brand: 'Yongnuo', name: 'YN560 IV', cat: 'flash', year: 2015, mount: 'Multi', used: 'RM120–200', note: 'Bare manual power from anywhere; student photo-club torque.' },
  { id: 'neewer-750', brand: 'Neewer', name: 'Vision4 / 750II', cat: 'flash', year: 2019, mount: 'Multi', used: 'RM250–400', note: 'Battery monolights that made home-studio product tables possible.' },

  // ===== ADAPTERS =====
  { id: 'ftz', brand: 'Nikon', name: 'FTZ / FTZ II', cat: 'adapter', year: 2018, mount: 'F→Z', used: 'RM500–800', note: 'Let thousands of F-mount lenses live again on Z bodies.' },
  { id: 'canon-eosr-mount', brand: 'Canon', name: 'Mount Adapter EF-EOS R', cat: 'adapter', year: 2018, mount: 'EF→RF', used: 'RM350–550', note: 'Canon’s own bridge; sold off second-hand as 2020 buyers moved native RF.' },
  { id: 'metabones', brand: 'Metabones', name: 'Speed Booster ULTRA 0.71x', cat: 'adapter', year: 2013, mount: 'EF→E', used: 'RM1,500–2,500', note: 'Shrunk full-frame to aps-c while adding a stop — the GH4 secret weapon of 2014.' },
  { id: 'sigma-mc11', brand: 'Sigma', name: 'MC-11 Mount Converter', cat: 'adapter', year: 2016, mount: 'EF→E', used: 'RM500–800', note: 'Sigma EF glass onto Sony E with real AF — the budget-mirrorless cheat.' },
  { id: 'fringer', brand: 'Fringer', name: 'Fringer EF-FX Pro II', cat: 'adapter', year: 2017, mount: 'EF→X', used: 'RM1,000–1,500', note: 'The mysterious adapter Fuji shooters stalked when no native AF existed.' },

  // ===== GIMBALS =====
  { id: 'ronin-m', brand: 'DJI', name: 'Ronin-M', cat: 'gimbal', year: 2014, mount: '—', used: 'RM700–1,200', note: 'First brushless handheld rig for indie film; 8kg payload era.' },
  { id: 'ronin-s', brand: 'DJI', name: 'Ronin-S', cat: 'gimbal', year: 2018, mount: '—', used: 'RM500–800', note: 'Single-hand DSLR stabilizer that replaced sliders on wedding day 2.' },
  { id: 'rs2', brand: 'DJI', name: 'RS 2 / RS 3 / RS 3 Pro', cat: 'gimbal', year: 2020, mount: '—', used: 'RM900–2,200', note: 'Touchscreen + LiDAR focus track; commercial video crews standard' },
  { id: 'rs4', brand: 'DJI', name: 'RS 4 / RS 4 Pro', cat: 'gimbal', year: 2023, mount: '—', used: 'RM1,100–2,600', note: '2024–2026 mainstay; the RS 4 Pro carries heavier cine builds with third-axis lock.' },
  { id: 'crane2', brand: 'Zhiyun', name: 'Crane 2 / Crane 3S', cat: 'gimbal', year: 2017, mount: '—', used: 'RM400–900', note: 'The RM-1k DSLR alternatives that undercut Ronin pricing for years.' },
  { id: 'weebill2', brand: 'Zhiyun', name: 'WEEBILL 2 / S / LAB', cat: 'gimbal', year: 2021, mount: '—', used: 'RM700–1,100', note: 'Screen-flap gimbal with follow-focus wheel; creative freelancer craze.' },
  { id: 'smooth5', brand: 'Zhiyun', name: 'Smooth 5 / 5S', cat: 'phone', year: 2020, mount: '—', used: 'RM300–500', note: 'Phone filmmaking went cinematic; influencer-crafted vertical footage.' },
  { id: 'osmo-mobile', brand: 'DJI', name: 'Osmo Mobile 3 / 6 / SE', cat: 'phone', year: 2019, mount: '—', used: 'RM150–400', note: 'Social-feed stabilizer that made every auntie’s travel reel glide.' },
  { id: 'insta360-flow', brand: 'Insta360', name: 'Flow / Flow 2 Pro', cat: 'phone', year: 2023, mount: '—', used: 'RM300–550', note: 'Self-extending selfie-stick gimbal; 2024 livestream-sellers adopted it big.' },
  { id: 'feiyu-scorp', brand: 'FeiyuTech', name: 'SCORP / AK2000S', cat: 'gimbal', year: 2022, mount: '—', used: 'RM500–900', note: 'Budget workhorse with a dual quick-plate design for busy run-and-gun days.' },
  { id: 'crane-m2', brand: 'Zhiyun', name: 'Crane-M2 / M3', cat: 'gimbal', year: 2019, mount: '—', used: 'RM250–450', note: 'Palm gimbal for phones + compact bodies + action cams; travel-friendly.' },

  // ===== TRIPODS =====
  { id: 'manfrotto-055', brand: 'Manfrotto', name: '055 + 405 / XPRO', cat: 'tripod', year: 2010, mount: '—', used: 'RM600–1,100', note: 'Studio-staple aluminium that outlives its owners.' },
  { id: 'manfrotto-befree', brand: 'Manfrotto', name: 'Befree Advanced', cat: 'tripod', year: 2014, mount: '—', used: 'RM400–650', note: 'The travel tripod a flight gig can actually carry onboard.' },
  { id: 'peak-design-tp', brand: 'Peak Design', name: 'Travel Tripod', cat: 'tripod', year: 2019, mount: '—', used: 'RM1,600–2,200', note: 'The crowdfunding-campaign king; fits in a tote — priced like a lens.' },
  { id: 'benro-tortoise', brand: 'Benro', name: 'Tortoise 14C / Mach3', cat: 'tripod', year: 2019, mount: '—', used: 'RM900–1,500', note: 'Carbon value pick for drag-and-shoot land works.' },
  { id: 'sirui-am', brand: 'Sirui', name: 'AM-254 / A-10T', cat: 'tripod', year: 2017, mount: '—', used: 'RM350–650', note: 'Local-favourite carbon at RM-rates; often seen at pasar malam shoot days.' },
  { id: 'ulanzi-claw', brand: 'Ulanzi', name: 'Claw Quick Release + F38', cat: 'tripod', year: 2020, mount: '—', used: 'RM80–200', note: 'The Shopee quick-release system that took over creator backpacks.' },

  // ===== AUDIO =====
  { id: 'rode-videomicro', brand: 'Rode', name: 'VideoMicro / VideoMicro II', cat: 'audio', year: 2015, mount: '—', used: 'RM150–350', note: 'USB-C shotgun for phones... the sound upgrade half of all YouTube rigs.' },
  { id: 'rode-go', brand: 'Rode', name: 'Wireless GO / GO II / GO III', cat: 'audio', year: 2019, mount: '—', used: 'RM350–950', note: 'Mic-on-camera culture collapsed into these clip-on TX bodies.' },
  { id: 'rode-lavplus', brand: 'Rode', name: 'smartLav+', cat: 'audio', year: 2014, mount: '—', used: 'RM120–200', note: 'Clip-on phone lav — the corporate-interview budget pick.' },
  { id: 'dji-mic', brand: 'DJI', name: 'DJI Mic / Mic 2 / Mic Mini', cat: 'audio', year: 2021, mount: '—', used: 'RM450–1,400', note: 'Magnetic-clip wireless that pairs by touch — Mic 2’s onboard recording saves re-takes.' },
  { id: 'lark-m2', brand: 'Hollyland', name: 'Lark M1 / M2 / Max', cat: 'audio', year: 2021, mount: '—', used: 'RM250–700', note: 'The affordable wireless that undercut Rode GO pricing here.' },
  { id: 'deity-d3', brand: 'Deity', name: 'V-Mic D3 Pro / D4', cat: 'audio', year: 2019, mount: '—', used: 'RM350–550', note: 'Filmmaker-grade shotgun with zero-gain-step design.' },
  { id: 'zoom-h4n', brand: 'Zoom', name: 'H4n Pro / H5 / H1n', cat: 'audio', year: 2016, mount: '—', used: 'RM250–550', note: 'A field-recorder XLR box — podcast & documentary interview rig.' },
  { id: 'senn-mke400', brand: 'Sennheiser', name: 'MKE 400 (2022)', cat: 'audio', year: 2011, mount: '—', used: 'RM350–600', note: 'The 2022 MK 400 II added built-in shock mount; canon of event audio.' },
  { id: 'comica-boomx', brand: 'Comica', name: 'BOOMX-D / Vimo S', cat: 'audio', year: 2020, mount: '—', used: 'RM150–350', note: 'Shopee-cheap dual-channel wireless that basically dominated starter kits.' },
  { id: 'sony-ukec', brand: 'Sony', name: 'ECM-B10 / ECM-W2BT', cat: 'audio', year: 2020, mount: 'Multi-Interface', used: 'RM500–900', note: 'MI-hotshot digital shotgun that rides Sony bodies with no cables.' },
  { id: 'irig-mic', brand: 'IK Multimedia', name: 'iRig Mic Cast 2', cat: 'audio', year: 2017, mount: '—', used: 'RM100–180', note: 'Pocket condenser for phone interviews when budgets were tighter.' },
  { id: 'tascam-dr', brand: 'Tascam', name: 'DR-05X / DR-10L', cat: 'audio', year: 2016, mount: '—', used: 'RM200–400', note: 'DR-10L rides on the talent, docks the lav, records a backup track.' },

  // ===== LIGHTING =====
  { id: 'aputure-120d', brand: 'Aputure', name: '120D / 120D II', cat: 'lighting', year: 2017, mount: 'Bowens', used: 'RM1,400–2,600', note: 'The indie-film COB that defined "cinematic" for commercial crews here.' },
  { id: 'aputure-600d', brand: 'Aputure', name: '600D Pro / LS 600c Pro', cat: 'lighting', year: 2021, mount: 'Bowens', used: 'RM4,500–8,000', note: 'Sun-simulators for big-room interviews; production houses own 2-3.' },
  { id: 'aputure-mc', brand: 'Aputure', name: 'MC RGBWW', cat: 'lighting', year: 2020, mount: '—', used: 'RM250–400', note: 'Pocket RGB that hid in every BTS shot nobody noticed.' },
  { id: 'amaran-100', brand: 'Amaran', name: '100d / 200x S', cat: 'lighting', year: 2021, mount: 'Bowens', used: 'RM400–800', note: 'Aputure’s budget brand: the affordable 5600K mains power every home set.' },
  { id: 'godox-sl60', brand: 'Godox', name: 'SL60W / SL150 III', cat: 'lighting', year: 2016, mount: 'Bowens', used: 'RM250–600', note: 'THE starter COB — half of Malaysia’s product tables run one of these.' },
  { id: 'godox-ml60', brand: 'Godox', name: 'ML60 II Bi / M600D', cat: 'lighting', year: 2022, mount: 'Bowens', used: 'RM500–1,400', note: 'Battery-ready COB line that made location LEd work actually portable.' },
  { id: 'nanlite-forza', brand: 'Nanlite', name: 'Forza 60B / 300 II', cat: 'lighting', year: 2021, mount: 'Bowens', used: 'RM800–2,500', note: 'Slim-head battery COBs popular for run-and-gun food & product ads.' },
  { id: 'nanlite-pavo', brand: 'Nanlite', name: 'PavoTube II 6C / 30X', cat: 'lighting', year: 2020, mount: '—', used: 'RM350–1,300', note: 'RGB tubes that dressed car interiors and mirror reflections everywhere.' },
  { id: 'zhiyun-molus', brand: 'Zhiyun', name: 'Molus G200 / X100', cat: 'lighting', year: 2023, mount: '—', used: 'RM700–1,400', note: 'Pocket-power 100–200W COBs that redefined weight expectations.' },
  { id: 'neewer-ring', brand: 'Neewer', name: '18" Ring Light Kit', cat: 'lighting', year: 2016, mount: '—', used: 'RM80–180', note: 'The beauty-creator starter kit that filled a thousand makeup rooms.' },
  { id: 'godox-sz150', brand: 'Godox', name: 'SZ150R Zoom', cat: 'lighting', year: 2023, mount: 'Bowens', used: 'RM800–1,200', note: 'Motorized zoom COB that beams patterns on studio walls.' },

  // ===== FILTERS =====
  { id: 'kf-nd', brand: 'K&F Concept', name: 'Nano-X Variable ND', cat: 'filter', year: 2018, mount: 'Multi', used: 'RM80–200', note: 'Affordable glass that made blurry-water shots a Shopee-cart click.' },
  { id: 'hoya-hd', brand: 'Hoya', name: 'HD UV / CPL', cat: 'filter', year: 2016, mount: 'Multi', used: 'RM150–300', note: 'Hardened glass that every Malaysian starter kit owns first.' },
  { id: 'nisi-v5', brand: 'NiSi', name: 'V5/V6 Holder 100mm kit', cat: 'filter', year: 2016, mount: '100mm system', used: 'RM700–1,300', note: 'Landscape grads + ND system of the Instagram-Batu-Caves era.' },
  { id: 'cokin-p', brand: 'Cokin', name: 'P-Series Grad Kit', cat: 'filter', year: 2012, mount: 'P', used: 'RM200–400', note: 'The slide-in filter dawn-era photographers came up on.' },
  { id: 'breakthrough', brand: 'Breakthrough Photography', name: 'X2 ND / CPL', cat: 'filter', year: 2016, mount: 'Multi', used: 'RM600–900', note: 'Colour-neutral flagship glass; long-exposure purity for architecture.' },

  // ===== STORAGE =====
  { id: 'sandisk-extreme-sd', brand: 'SanDisk', name: 'Extreme PRO SD UHS-I (95MB/s)', cat: 'storage', year: 2014, mount: '—', used: 'RM60–120/128GB', note: 'The default card of DSLR-era Malaysia; still the starter-slot default today.' },
  { id: 'sandisk-uhs2', brand: 'SanDisk', name: 'Extreme PRO UHS-II 300MB/s', cat: 'storage', year: 2020, mount: '—', used: 'RM250–400/128GB', note: 'Burst-buffer recovery for Z8/A7IV shooters doing 20fps raw.' },
  { id: 'lexar-2000x', brand: 'Lexar', name: 'Professional 2000x UHS-II', cat: 'storage', year: 2016, mount: '—', used: 'RM150–300/64GB', note: '2016-era speed artists that documented half of our gig homework.' },
  { id: 'cfexpress-b', brand: 'SanDisk / Lexar', name: 'CFexpress Type B (Gold / Diamond)', cat: 'storage', year: 2019, mount: '—', used: 'RM500–1,000/512GB', note: 'R5/Z8/GH7-era norm; ejected 4K 60 RAW without breaking a sweat.' },
  { id: 'cfexpress-a', brand: 'Sony', name: 'TOUGH CFexpress Type A', cat: 'storage', year: 2021, mount: '—', used: 'RM900–1,300/160GB', note: 'Sony-only A-format; physical crush resistance more brag-worthy than big.' },
  { id: 'samsung-t7', brand: 'Samsung', name: 'T5 / T7 / T7 Shield SSD', cat: 'storage', year: 2015, mount: '—', used: 'RM200–500', note: 'Every Malaysian content-archive starts with one of these pocket lifesavers.' },
  { id: 'wise-cfe', brand: 'Wise', name: 'CFexpress 512GB Advanced', cat: 'storage', year: 2023, mount: '—', used: 'RM400–600', note: 'The budget-CFexpress that dislodged flagship pricing 2023+.' },
  { id: 'prograde-cobalt', brand: 'ProGrade', name: 'Cobalt 1700R CFexpress', cat: 'storage', year: 2023, mount: '—', used: 'RM700–1,100', note: 'Sustained-write video heroes for FX30/FX3 operators.' },
  { id: 'sandisk-microsd', brand: 'SanDisk', name: 'Extreme microSD / Endurance', cat: 'storage', year: 2016, mount: '—', used: 'RM40–90/128GB', note: 'Drone & action-cam taxes paid per gig, happily at 4K class.' },

  // ===== POWER =====
  { id: 'np-fz100', brand: 'Sony', name: 'NP-FZ100 battery (OEM / Wasabi)', cat: 'battery', year: 2018, mount: '—', used: 'RM180–350', note: 'The mirrorless-megabattery; ZV/A7/FX3 owners stock 3-4 minimum.' },
  { id: 'lp-e6nh', brand: 'Canon', name: 'LP-E6NH / LP-E17 battery', cat: 'battery', year: 2020, mount: '—', used: 'RM150–300', note: 'R-series standard — the aftermarket clones here are RM60 each and fine.' },
  { id: 'en-el15c', brand: 'Nikon', name: 'EN-EL15c battery', cat: 'battery', year: 2020, mount: '—', used: 'RM180–320', note: 'Z6/Z7/Z8 family keeps these in every pocket.' },
  { id: 'vmount', brand: 'Neewer', name: 'NP-F970 / V-Mount battery rig', cat: 'battery', year: 2015, mount: '—', used: 'RM150–450', note: 'LED-panel-on-a-stick power; every run-and-gun bag-tail has them.' },
  { id: 'anker-gan', brand: 'Anker', name: '747 GaN / Prime 100W charger', cat: 'battery', year: 2022, mount: '—', used: 'RM200–350', note: 'One charger, three bodies, zero desk-real-estate lost — modern kit staple.' },

  // ===== BAGS =====
  { id: 'pd-everyday', brand: 'Peak Design', name: 'Everyday Backpack / Sling', cat: 'bag', year: 2016, mount: '—', used: 'RM500–1,100', note: 'The indigo-orange daily-carry standard of working creators for a decade.' },
  { id: 'wandrd-prvke', brand: 'WANDRD', name: 'PRVKE 31 / Duo Day', cat: 'bag', year: 2015, mount: '—', used: 'RM500–900', note: 'Roll-top travel + drone-carrier that road-trip videomakers swore on.' },
  { id: 'lowepro-flipside', brand: 'Lowepro', name: 'Flipside 300 / 400', cat: 'bag', year: 2013, mount: '—', used: 'RM200–450', note: 'Back-opening security pack — commercial event centers bought dozens.' },
  { id: 'kf-sling-urban', brand: 'K&F Concept', name: 'Urban Wander Sling 10L', cat: 'bag', year: 2024, mount: '—', used: 'RM150–300', note: 'The Shopee-value sling carrying today’s starter mirrorless + 2 lens setup.' },

  // ===== DRONES =====
  { id: 'phantom-4', brand: 'DJI', name: 'Phantom 4 Pro', cat: 'drone', year: 2016, mount: '—', used: 'RM1,500–2,500', note: 'Era-defining aerial — made "drone shots" a line-item on every event invoice.' },
  { id: 'mavic-pro', brand: 'DJI', name: 'Mavic Pro', cat: 'drone', year: 2016, mount: '—', used: 'RM500–900', note: 'Folding-era torque; the passport-purse-fitting drone of 2017.' },
  { id: 'mavic-air', brand: 'DJI', name: 'Mavic Air 2 / Air 2S', cat: 'drone', year: 2020, mount: '—', used: 'RM1,200–2,300', note: 'The 1-inch Air 2S re-wrote aerial-photo expectations for real-estate teams.' },
  { id: 'mavic-3', brand: 'DJI', name: 'Mavic 3 / 3 Pro', cat: 'drone', year: 2021, mount: '—', used: 'RM6,500–13,000', note: 'Hasselblad colour on a pocket drone; hotel-tour reels leaned on this.' },
  { id: 'dji-mini', brand: 'DJI', name: 'Mini / Mini 2 / Mini 2 SE', cat: 'drone', year: 2020, mount: '—', used: 'RM400–1,300', note: 'Sub-250g legal class the CAAM rules treat differently here.' },
  { id: 'dji-mini-3', brand: 'DJI', name: 'Mini 3 Pro / Mini 4 Pro', cat: 'drone', year: 2022, mount: '—', used: 'RM1,800–3,200', note: 'Vertical-video social drone era begins — Mini 4 Pro (2023) still sells hard.' },
  { id: 'dji-mini-5', brand: 'DJI', name: 'Mini 5 Pro', cat: 'drone', year: 2025, mount: '—', used: 'RM2,800–3,600', note: '1-inch sensor in the sub-250g class — township viral content device.' },
  { id: 'dji-air-3', brand: 'DJI', name: 'Air 3 / Air 3S', cat: 'drone', year: 2023, mount: '—', used: 'RM4,000–6,500', note: 'Dual-camera (wide + tele) flight machine for cinematic travel work.' },
  { id: 'dji-avata', brand: 'DJI', name: 'Avata / Avata 2 / FPV', cat: 'drone', year: 2022, mount: '—', used: 'RM1,200–3,000', note: 'The FPV-blast era; 2024 Avata 2 moved the local TikTok drone-chase trend.' },
  { id: 'dji-neo', brand: 'DJI', name: 'Neo / Flip', cat: 'drone', year: 2024, mount: '—', used: 'RM400–900', note: 'Palm-launch social drone that redefined the entry category 2025.' },

  // ===== ACTION =====
  { id: 'gopro-hero-4', brand: 'GoPro', name: 'Hero 4 Black', cat: 'action', year: 2014, mount: '—', used: 'RM150–350', note: 'The 2014 PILihan of every KL moto club; adventure-video starter.' },
  { id: 'gopro-hero-8', brand: 'GoPro', name: 'Hero 8 / 9', cat: 'action', year: 2019, mount: '—', used: 'RM300–700', note: '4K60 stabilization arms-race start — mostly cheap used today.' },
  { id: 'gopro-hero-11', brand: 'GoPro', name: 'Hero 11 / 12', cat: 'action', year: 2022, mount: '—', used: 'RM600–1,400', note: 'Vertical 9:16 native capture — the creator-demand turnaround.' },
  { id: 'gopro-hero-13', brand: 'GoPro', name: 'Hero 13 Black (2024)', cat: 'action', year: 2024, mount: '—', used: 'RM1,700–2,200', note: 'Interchangeable lens set + longer burn for the FPV crowd.' },
  { id: 'insta360-one-x2', brand: 'Insta360', name: 'ONE X2 / X3 / X4', cat: 'action', year: 2020, mount: '—', used: 'RM600–1,800', note: 'Reframing after-the-fact ruined everyone’s "shoot the right angle" rule.' },
  { id: 'insta360-x5', brand: 'Insta360', name: 'X5', cat: 'action', year: 2025, mount: '—', used: 'RM2,200–2,700', note: 'Replaceable lens guards; the 2025 reframe-era’s capstone.' },
  { id: 'insta360-rs', brand: 'Insta360', name: 'ONE RS / Ace Pro 2', cat: 'action', year: 2022, mount: '—', used: 'RM900–1,900', note: 'Modular action line + Leica-branded 4K ace — a package for packrats.' },
  { id: 'osmo-action', brand: 'DJI', name: 'Osmo Action 4 / 5 Pro', cat: 'action', year: 2023, mount: '—', used: 'RM1,000–1,900', note: 'Dual-screen GoPro-killer; 5 Pro’s low-light climbs every BPM.' },
  { id: 'osmo-pocket2', brand: 'DJI', name: 'Osmo Pocket 2 / Pocket 3', cat: 'action', year: 2020, mount: '—', used: 'RM600–2,000', note: 'Pocket 3’s 1-inch sensor + rotating screen made creator-street-reels effortless.' },
  { id: 'osmo-pocket3-mod', brand: 'DJI', name: 'Pocket 3 Creator Combo', cat: 'action', year: 2024, mount: '—', used: 'RM2,200–2,600', note: 'The 2024 default walking-tour interview rig — screen rotates, sensor is 1-inch.' },

  // ===== PHONE GEAR =====
  { id: 'moment-anamorphic', brand: 'Moment', name: 'Anamorphic Phone Lens', cat: 'phone', year: 2017, mount: 'Phone case', used: 'RM300–500', note: 'Flared cinematic wides exploded phone-video expectations.' },
  { id: 'sandmarc', brand: 'Sandmarc', name: 'iPhone Telephoto 3x-6x', cat: 'phone', year: 2021, mount: 'Phone case', used: 'RM400–700', note: 'Beach-far-street-zoom for travel creators shooting handheld only.' },
  { id: 'shiftcam', brand: 'ShiftCam', name: 'ProGrip / ProLens Kit', cat: 'phone', year: 2019, mount: 'Phone case', used: 'RM500–800', note: 'Multi-lens phone rig in one grip — travel-content packs.' },

  // ===== MONITORS =====
  { id: 'atomos-ninja', brand: 'Atomos', name: 'Ninja V / Ninja Ultra', cat: 'monitor', year: 2019, mount: '—', used: 'RM900–1,500', note: '5-inch ProRes RAW monitor-recorder every indie film set parked on rigs.' },
  { id: 'smallhd-focus', brand: 'SmallHD', name: 'Focus OLED Touch', cat: 'monitor', year: 2017, mount: '—', used: 'RM600–1,100', note: 'Focus-assist + false colour for gimbal-operated crews.' },

  // ===== LEGACY MISC =====
  { id: 'canon-rebel-legacy', brand: 'Canon', name: 'EOS 1100D / 1200D', cat: 'dslr', year: 2011, mount: 'EF/EF-S', used: 'RM200–400', note: 'The RM-fotografi-student gateway still circulating in classifieds.' },
  { id: 'nikon-d90-era', brand: 'Nikon', name: 'D90 / D7000', cat: 'dslr', year: 2008, mount: 'F', used: 'RM150–450', note: 'The DSLR-into-video era parents; the D90 (2008) started 720p DSLR video.' },
  { id: 'sony-a58', brand: 'Sony', name: 'A58 / A68 (SLT)', cat: 'dslr', year: 2013, mount: 'A', used: 'RM300–550', note: 'Last mass-market A-mount bodies that regional wedding studios ran on for years.' },
];

// Totals for stats / structured data
export const libStats = {
  items: gearLibrary.length,
  brands: new Set(gearLibrary.map(g => g.brand)).size,
  dslrCount: gearLibrary.filter(g => g.cat === 'dslr').length,
  mirrorlessCount: gearLibrary.filter(g => g.cat === 'mirrorless').length,
  lensCount: gearLibrary.filter(g => g.cat === 'lens' || g.cat === 'adapter').length,
  accessoryCount: gearLibrary.filter(g => !['dslr', 'mirrorless', 'lens', 'adapter'].includes(g.cat)).length,
  span: '2010–2026',
};
