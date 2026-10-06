// SEO in-article image plan - batch 1 (first 20 articles, admin order = date desc).
// Shared source of truth for scripts/fetch-seo-images.mjs (Pollinations download)
// and scripts/apply-seo-images.mjs (markdown insertion).
//
// Rules encoded here:
//   - alt text: unique, keyword-rich, <= 125 chars, written in the article's own
//     language (ms articles get Bahasa Melayu alt/caption, en get English).
//   - caption: one contextual sentence, also carries a secondary keyword.
//   - prompt: Pollinations prompt, product/concept photography, NO text/signage/
//     watermark, NO groups of people (project rule).
//   - afterH2: 1-indexed H2 heading in the markdown body after which the image
//     line is inserted (image illustrates that section).

export const batch1 = [
  {
    slug: 'thailand-camera-gear',
    lang: 'en',
    images: [
      {
        file: 'thailand-camera-gear-bangkok-camera-store.jpg',
        afterH2: 2,
        alt: 'Camera store display case in Bangkok packed with mirrorless bodies and lenses',
        caption: "Bangkok's camera floors run 10-20% below Malaysian retail before the tax refund.",
        prompt:
          'photograph of a bright camera shop display cabinet in Bangkok Thailand, rows of mirrorless cameras and lenses behind glass, warm retail lighting, product photography, no text, no signage, no watermark, no people',
      },
      {
        file: 'thailand-camera-gear-price-comparison.jpg',
        afterH2: 4,
        alt: 'Two different-sized mirrorless camera bodies side by side on a wooden table',
        caption: 'The gap only works if you were flying there anyway - add the flight and it disappears.',
        prompt:
          'two mirrorless cameras of different sizes placed side by side on a wooden table, one large body and one compact body, top down product photo, soft daylight, no text, no logos, no watermark, no people',
      },
    ],
  },
  {
    slug: 'camera-rental-vs-buy-malaysia',
    lang: 'ms',
    images: [
      {
        file: 'camera-rental-vs-buy-kaunter-sewa.jpg',
        afterH2: 2,
        alt: 'Kamera mirrorless dan lens disiapkan untuk disewa di kaunter sewa kamera Malaysia',
        caption: 'Sewa bulanan biasanya 15-20% daripada harga beli - sesuai bila projek dah confirm.',
        prompt:
          'product photo of a mirrorless camera and two lenses arranged neatly on a counter with a small blank rental tag, clean studio lighting, muted background, no text, no watermark, no people',
      },
      {
        file: 'camera-rental-vs-buy-kira-kos.jpg',
        afterH2: 4,
        alt: 'Kamera, kalkulator dan wang tunai mengira kos sewa berbanding beli',
        caption: 'Kira kos setiap projek, bukan kos sebulan - itu yang tentukan sewa atau beli.',
        prompt:
          'top down photo of a camera body, a pocket calculator and folded banknotes on a desk, soft window light, minimal composition, no readable text, no watermark, no people',
      },
    ],
  },
  {
    slug: 'kamera-bawah-rm2000-malaysia',
    lang: 'ms',
    images: [
      {
        file: 'kamera-bawah-rm2000-senarai-mirrorless.jpg',
        afterH2: 2,
        alt: 'Beberapa badan kamera mirrorless bawah RM2,000 disusun untuk perbandingan',
        caption: 'Semua badan ni boleh dapat di bawah RM2,000 kalau sabar cari second hand.',
        prompt:
          'three modern mirrorless digital cameras with grip and lens attached standing in a row on a light grey surface, full camera bodies seen from the front, product comparison photography, even studio lighting, no logos, no text, no watermark, no people',
      },
      {
        file: 'kamera-bawah-rm2000-skrin-terbuka.jpg',
        afterH2: 7,
        alt: 'Kamera mirrorless bawah RM2,000 dengan skrin terbuka di atas meja',
        caption: 'Flip screen dan berat badan beza antara kau bawak keluar atau simpan dalam beg.',
        prompt:
          'close up product photo of a compact mirrorless camera with its flip-out screen open, resting on a desk, shallow depth of field, blank screen, no text, no watermark, no people',
      },
    ],
  },
  {
    slug: 'japan-camera-market',
    lang: 'en',
    images: [
      {
        file: 'japan-camera-market-tokyo-used-store.jpg',
        afterH2: 2,
        alt: 'Tokyo camera shop aisle lined with used camera cabinets and lens shelves',
        caption: "Japan's used gear is graded honestly - mint really does mean mint.",
        prompt:
          'photograph of a Japanese camera store aisle with glass cabinets full of used cameras and lenses, clean fluorescent lighting, no text, no signage, no watermark, no people',
      },
      {
        file: 'japan-camera-market-used-grading.jpg',
        afterH2: 4,
        alt: 'Used camera body with inspection loupe and blank grading card on a shop counter',
        caption: 'Add import duty and shipping and Japan still wins on high-end bodies.',
        prompt:
          'product photo of a used black camera body with a magnifying loupe and a blank card on a counter, macro detail, soft light, no readable text, no watermark, no people',
      },
    ],
  },
  {
    slug: 'harga-sony-camera-malaysia',
    lang: 'ms',
    images: [
      {
        file: 'harga-sony-camera-malaysia-model-popular.jpg',
        afterH2: 2,
        alt: 'Badan kamera mirrorless Sony dan lens E-mount tersusun di atas meja studio',
        caption: 'A6100 dan ZV-E10 kekal dua pilihan paling laris untuk creator Malaysia.',
        prompt:
          'product photo of a mirrorless camera body with several compact lenses arranged on a dark table, studio lighting, no logos, no text, no watermark, no people',
      },
      {
        file: 'harga-sony-vs-canon-malaysia.jpg',
        afterH2: 5,
        alt: 'Perbandingan dua badan kamera Sony dan Canon di samping lens masing-masing',
        caption: 'Sensor sama kuat - beza sebenar ada pada lens dan ergonomik tangan kau.',
        prompt:
          'two mirrorless camera bodies from different brands placed side by side with their lenses, top down product shot on a grey backdrop, no logos, no text, no watermark, no people',
      },
    ],
  },
  {
    slug: 'indonesia-camera-gear',
    lang: 'en',
    images: [
      {
        file: 'indonesia-camera-gear-jakarta-store.jpg',
        afterH2: 2,
        alt: 'Camera retail counter in Jakarta with bodies and lenses under glass',
        caption: "Jakarta's camera malls price close to KL once you skip the tourist rows.",
        prompt:
          'photograph of a camera retail counter in Jakarta Indonesia, glass display with cameras and lenses, warm mall lighting, no text, no signage, no watermark, no people',
      },
      {
        file: 'indonesia-camera-gear-price-comparison.jpg',
        afterH2: 4,
        alt: 'Camera body with Indonesian rupiah notes and a notebook for price checking',
        caption: 'Compare in ringgit before you fly - some bodies are cheaper at home.',
        prompt:
          'flat lay of a camera body beside blurred banknotes and a small notebook on a wooden table, daylight, no readable text, no watermark, no people',
      },
    ],
  },
  {
    slug: 'harga-canon-camera-malaysia',
    lang: 'ms',
    images: [
      {
        file: 'harga-canon-camera-malaysia-60d.jpg',
        afterH2: 2,
        alt: 'Badan kamera Canon 60D dengan lens 50mm di atas meja kayu',
        caption: '60D masih balik modal RM500 dalam satu sesi graduation mini.',
        prompt:
          'product photo of an older DSLR camera body with a small 50mm prime lens on a wooden desk, warm light, no logos, no text, no watermark, no people',
      },
      {
        file: 'harga-canon-camera-malaysia-lensa-murah.jpg',
        afterH2: 4,
        alt: 'Tiga lensa prime dipaparkan di atas permukaan gelap',
        caption: 'Kit lens murah okay untuk mula - upgrade lepas kau dah ada gig tetap.',
        prompt:
          'three camera prime lenses standing in a row on a dark surface, product photography, dramatic soft lighting, no logos, no text, no watermark, no people',
      },
    ],
  },
  {
    slug: 'dji-vs-instax360-malaysia',
    lang: 'ms',
    images: [
      {
        file: 'dji-vs-instax360-kamera-360.jpg',
        afterH2: 2,
        alt: 'Kamera 360 dengan lens fisheye besar untuk konten creator Malaysia',
        caption: 'Kamera 360 bagi kesan reframing yang drone tak boleh buat dalam rumah.',
        prompt:
          'a rectangular black 360 degree action camera standing upright showing two round fisheye lenses, placed beside a small folded drone on a plain light desk, sharp product photography, studio lighting, no logos, no text, no watermark, no people',
      },
      {
        file: 'dji-vs-instax360-meja-creator.jpg',
        afterH2: 4,
        alt: 'Drone lipat dan kamera 360 di atas meja kerja content creator',
        caption: 'Drone untuk luar dan skala; 360 untuk konten dekat dan editing laju.',
        prompt:
          'top down photo of a folded compact drone and a 360 camera on a creator desk next to a smartphone with a blank screen, clean workspace, no text, no watermark, no people',
      },
    ],
  },
  {
    slug: 'cara-mula-photography-dengan-rm500',
    lang: 'ms',
    images: [
      {
        file: 'cara-mula-photography-rm500-gear.jpg',
        afterH2: 2,
        alt: 'Kamera DSLR entry level, lens kit dan kad memori mengikut bajet RM500',
        caption: 'RM500 cukup untuk badan terpakai dan kit lens - skill datang kemudian.',
        prompt:
          'entry level DSLR camera with kit lens, memory card and battery laid out on a desk, budget photography kit, soft daylight, no logos, no text, no watermark, no people',
      },
      {
        file: 'cara-mula-photography-rm500-portfolio.jpg',
        afterH2: 6,
        alt: 'Kamera DSLR terpakai di samping sampul bayaran kerja fotografi',
        caption: 'Client pertama biasanya datang dari satu gambar yang kau tunjuk dekat phone.',
        prompt:
          'used DSLR camera lying next to a plain paper envelope and a printed photograph on a desk, warm side light, no readable text, no watermark, no people',
      },
    ],
  },
  {
    slug: 'camera-untuk-youtube-malaysia',
    lang: 'ms',
    images: [
      {
        file: 'camera-untuk-youtube-malaysia-setup.jpg',
        afterH2: 2,
        alt: 'Setup rakaman YouTube dengan kamera pada tripod, ring light dan mikrofon',
        caption: 'Ring light dan mic RM80 dah naikkan kualiti lebih daripada upgrade kamera.',
        prompt:
          'small home video setup: mirrorless camera on a tripod facing a desk, ring light and a shotgun microphone, cozy room, blank screens, no text, no watermark, no people',
      },
      {
        file: 'camera-untuk-youtube-malaysia-lighting.jpg',
        afterH2: 4,
        alt: 'Lampu panel LED menerangi meja rakaman untuk video YouTube',
        caption: 'Dua lampu murah mengalahkan satu lampu mahal - bayang bawah dagu hilang.',
        prompt:
          'LED panel light and a small softbox illuminating an empty desk filming area, behind the scenes studio, no text, no watermark, no people',
      },
    ],
  },
  {
    slug: 'cara-buat-duit-dengan-photography',
    lang: 'ms',
    images: [
      {
        file: 'cara-buat-duit-dengan-photography-pendapatan.jpg',
        afterH2: 2,
        alt: 'Kamera DSLR di samping kalkulator dan kertas penyata pendapatan',
        caption: 'Photographer sambilan di KL biasanya kumpul RM1,500-3,000 sebulan.',
        prompt:
          'top down photo of a DSLR camera, a calculator and printed sheets of paper on a desk, warm light, blurred unreadable numbers, no watermark, no people',
      },
      {
        file: 'cara-buat-duit-dengan-photography-beg-gear.jpg',
        afterH2: 4,
        alt: 'Beg galas kamera mengandungi badan DSLR, lens dan flash kecil untuk kerja pertama',
        caption: 'Mula dengan satu pakej mudah: badan, satu lens, satu flash kecil.',
        prompt:
          'camera bag open with a DSLR body, one lens and a small flash packed inside, ready for a shoot, daylight, no logos, no text, no watermark, no people',
      },
    ],
  },
  {
    slug: 'camera-roi-calculator-malaysia',
    lang: 'ms',
    images: [
      {
        file: 'camera-roi-calculator-malaysia-kalkulator.jpg',
        afterH2: 2,
        alt: 'Kamera mirrorless, kalkulator dan wang tunai mengira ROI kamera',
        caption: 'Masukkan harga beli, kos aksesori dan bilangan gig - keluaran dia bulan untuk balik modal.',
        prompt:
          'flat lay of a mirrorless camera, a calculator and banknotes on a desk next to a laptop edge, top down, no readable text, no watermark, no people',
      },
      {
        file: 'camera-roi-calculator-malaysia-kos-tersembunyi.jpg',
        afterH2: 6,
        alt: 'Aksesori kamera seperti bateri tambahan, kad memori dan beg di samping badan kamera',
        caption: 'Bateri, kad memori dan beg biasanya tambah 20% lagi dekat kos pertama.',
        prompt:
          'camera accessories arranged beside a camera body: spare battery, memory cards, camera strap and a small bag, product flat lay, no logos, no text, no watermark, no people',
      },
    ],
  },
  {
    slug: 'best-vlogging-camera-malaysia',
    lang: 'ms',
    images: [
      {
        file: 'best-vlogging-camera-malaysia-senarai.jpg',
        afterH2: 2,
        alt: 'Lima kamera vlogging kompak disusun bersebelahan untuk perbandingan',
        caption: 'Flip screen, mic input dan berat badan - tiga benda yang tentukan pilihan.',
        prompt:
          'five compact vlogging cameras lined up in a row on a light grey background, product comparison shot, even lighting, no logos, no text, no watermark, no people',
      },
      {
        file: 'best-vlogging-camera-malaysia-setup.jpg',
        afterH2: 4,
        alt: 'Kamera vlogging pada tripod kecil dengan mikrofon lavalier dan skrin terbuka',
        caption: 'Bawah RM2,500 dah boleh dapat kamera dan mic - itu yang penting untuk mula.',
        prompt:
          'compact camera with flip screen mounted on a small tabletop tripod with a lavalier microphone beside it, product photo, clean background, blank screen, no text, no watermark, no people',
      },
    ],
  },
  {
    slug: 'kamera-second-hand-malaysia',
    lang: 'ms',
    images: [
      {
        file: 'kamera-second-hand-malaysia-kaunter.jpg',
        afterH2: 2,
        alt: 'Beberapa kamera terpakai disusun di atas kain gelap di kaunter kedai kamera',
        caption: 'Harga masuk akal = 60-75% harga asal, ikut tahun dan berapa banyak shutter.',
        prompt:
          'several used cameras arranged on a dark velvet cloth on a shop counter, soft overhead light, no price tags, no text, no watermark, no people',
      },
      {
        file: 'kamera-second-hand-malaysia-semak-mount.jpg',
        afterH2: 4,
        alt: 'Badan kamera terpakai tanpa lens memaparkan mount untuk pemeriksaan sebelum beli',
        caption: 'Semak jamur lens, mount longgar dan fungsi sebelum bayar tunai.',
        prompt:
          'used camera body with the lens detached showing the lens mount, a small flashlight lying beside it on a table, macro detail, no hands, no text, no watermark, no people',
      },
    ],
  },
  {
    slug: 'berapa-gig-untuk-bayar-camera',
    lang: 'ms',
    images: [
      {
        file: 'berapa-gig-untuk-bayar-camera-senario.jpg',
        afterH2: 2,
        alt: 'Kamera DSLR dan lens di atas meja bersama kalkulator untuk kiraan ROI',
        caption: 'Tiga senario, satu jawapan: makin mahal badan, makin banyak gig kena ambil.',
        prompt:
          'DSLR camera with a lens and a calculator on a wooden desk, warm daylight, no readable text, no watermark, no people',
      },
      {
        file: 'berapa-gig-untuk-bayar-camera-beg-aksesori.jpg',
        afterH2: 5,
        alt: 'Beg kamera terbuka dengan lens dan aksesori menunjukkan kos tambahan tersembunyi',
        caption: 'Beli lens sebelum bayar balik badan - sebab paling biasa ROI melewat.',
        prompt:
          'open camera bag with two lenses and accessories inside, top down on a wooden floor, no logos, no text, no watermark, no people',
      },
    ],
  },
  {
    slug: 'best-camera-content-creator-malaysia',
    lang: 'ms',
    images: [
      {
        file: 'best-camera-content-creator-malaysia-top5.jpg',
        afterH2: 2,
        alt: 'Tiga badan kamera mirrorless untuk content creator disusun di atas meja gelap',
        caption: 'Pilihan ROI bukan kamera paling mahal - yang mana balik modal paling laju.',
        prompt:
          'three mirrorless camera bodies arranged diagonally on a dark desk, product photography, no logos, no text, no watermark, no people',
      },
      {
        file: 'best-camera-content-creator-malaysia-meja-kerja.jpg',
        afterH2: 4,
        alt: 'Kamera mirrorless dengan skrin terbuka dan mikrofon kecil di meja kerja creator',
        caption: 'Beli ikut klien yang kau nak, bukan ikut spek yang kau suka baca.',
        prompt:
          'mirrorless camera with flip screen open and a small microphone attached, sitting on a creator desk, blank screen, no text, no watermark, no people',
      },
    ],
  },
  {
    slug: 'kamera-untuk-photography-malaysia',
    lang: 'ms',
    images: [
      {
        file: 'kamera-untuk-photography-malaysia-dua-lens.jpg',
        afterH2: 1,
        alt: 'Kamera mirrorless dengan dua lens berbeza untuk potret dan landskap',
        caption: 'Satu badan, dua lens - dah tutup keperluan potret dan landskap.',
        prompt:
          'mirrorless camera body with two different lenses placed beside it on a stone surface, product photo, soft daylight, no logos, no text, no watermark, no people',
      },
      {
        file: 'kamera-untuk-photography-malaysia-senarai-gaya.jpg',
        afterH2: 2,
        alt: 'Susunan tiga kamera bersaiz berbeza mengikut gaya photography di atas meja putih',
        caption: 'Potret, landskap, street - setiap gaya ada badan yang lebih sesuai.',
        prompt:
          'overhead arrangement of three different cameras of varying sizes on a white table, product flat lay, no logos, no text, no watermark, no people',
      },
    ],
  },
  {
    slug: 'kamera-untuk-side-income-malaysia',
    lang: 'ms',
    images: [
      {
        file: 'kamera-untuk-side-income-malaysia-pendapatan.jpg',
        afterH2: 2,
        alt: 'Kamera DSLR di samping wang tunai dan buku catatan kerja sambilan',
        caption: 'Dua gig sebulan dah boleh tutup kos kamera terpakai kelas pertengahan.',
        prompt:
          'top down photo of a DSLR camera with folded banknotes and a small notebook on a desk, warm light, no readable text, no watermark, no people',
      },
      {
        file: 'kamera-untuk-side-income-malaysia-beg-gig.jpg',
        afterH2: 4,
        alt: 'Beg kamera dengan badan kamera dan flash kecil bersedia untuk gig pertama',
        caption: 'Mulakan dengan satu pakej yang mudah dijual: potret mini session.',
        prompt:
          'a camera bag with a DSLR body and a small speedlight flash next to it, ready for a shoot, daylight, no logos, no text, no watermark, no people',
      },
    ],
  },
  {
    slug: 'mic-terbaik-tiktok-live-malaysia',
    lang: 'ms',
    images: [
      {
        file: 'mic-terbaik-tiktok-live-malaysia-senarai.jpg',
        afterH2: 2,
        alt: 'Tiga jenis mikrofon - shotgun, wireless dan lapel disusun di atas meja',
        caption: 'Wireless clip-on paling mudah untuk live seorang diri.',
        prompt:
          'three different microphones arranged on a desk: a shotgun mic, a wireless transmitter pack and a lavalier mic, product photography, no logos, no text, no watermark, no people',
      },
      {
        file: 'mic-terbaik-tiktok-live-malaysia-setup.jpg',
        afterH2: 4,
        alt: 'Phone pada tripod dengan mikrofon wireless dan lampu untuk live TikTok',
        caption: 'Mic dulu, cahaya kemudian - audio buruk buat orang scroll cepat.',
        prompt:
          'smartphone mounted on a tripod with a wireless microphone receiver attached and a small LED light beside it, live streaming setup, blank phone screen, no text, no watermark, no people',
      },
    ],
  },
  {
    slug: 'philippines-vlogging-gear',
    lang: 'en',
    images: [
      {
        file: 'philippines-vlogging-gear-manila-camera-store.jpg',
        afterH2: 2,
        alt: 'Camera store counter in Manila with bodies and lenses in a glass cabinet',
        caption: "Manila's camera floors price slightly under KL on entry bodies.",
        prompt:
          'photograph of a camera store counter in Manila Philippines, glass cabinet with cameras and lenses, bright retail lighting, no text, no signage, no watermark, no people',
      },
      {
        file: 'philippines-vlogging-gear-creator-desk.jpg',
        afterH2: 5,
        alt: 'Simple vlogging desk setup with camera, phone tripod and light in a small room',
        caption: 'Filipino creators win on consistency, not gear - same budget, more uploads.',
        prompt:
          'small vlogging corner: camera on a tripod, ring light and phone holder in a compact room, warm evening light, blank screens, no text, no watermark, no people',
      },
    ],
  },
];
