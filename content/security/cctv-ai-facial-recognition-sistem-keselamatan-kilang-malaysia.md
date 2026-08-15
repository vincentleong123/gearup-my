---
slug: cctv-ai-facial-recognition-sistem-keselamatan-kilang-malaysia
title: 'CCTV AI Malaysia: Facial Recognition & Sistem Keselamatan Kilang (Fleet Review)'
description: Review sistem penuh CCTV AI untuk kilang Malaysia — 16 kamera Hikvision, facial recognition, ANPR/LPR, line-crossing dan people counting. Berapa kos sebenar, apa yang AI boleh dan TAK boleh buat, realiti false positives, dan keperluan PDPA untuk data biometrik.
image: /blog/cctv-ai-facial-recognition-sistem-keselamatan-kilang-malaysia.jpg
category: factory-security
status: published
date: 2026-08-16
updatedAt: 2026-08-16
author: Kameralog Editorial
lang: ms
readTime: 14
tags:
  - cctv-ai
  - facial-recognition
  - hikvision
  - keselamatan-kilang
  - anpr
  - poe
  - malaysia
environment: factory
deployment: nvr-poe
systemLineup: 16-kamera AI fleet (Hikvision AcuSense)
systemCost: 11000
installationCost: 4000
maintenanceCost: 1200
usefulLife: 6
cameras:
  - model: DS-2CD2T86FWDV2-I8 (8MP bullet varifocal)
    role: Main gate — ANPR/LPR
    quantity: 1
    resolution: 8MP
    nightVision: 60m IR
    aiDetection: LPR, human, vehicle
    unitPriceNew: 550
    poe: true
  - model: DS-2CD2T86FWDV2-I8 (8MP bullet varifocal)
    role: Perimeter — boundary & intrusion
    quantity: 4
    resolution: 8MP
    nightVision: 60m IR
    aiDetection: Intrusion, line-crossing
    unitPriceNew: 500
    poe: true
  - model: DS-2CD2146G2-I (4MP AcuSense dome)
    role: Factory floor — human/vehicle detection
    quantity: 6
    resolution: 4MP
    nightVision: 30m IR
    aiDetection: Human, vehicle, line-crossing
    unitPriceNew: 350
    poe: true
  - model: DS-2CD2746FWD-IZS (4MP varifocal dome)
    role: Restricted areas — face capture
    quantity: 2
    resolution: 4MP
    nightVision: 30m IR
    aiDetection: Face, intrusion
    unitPriceNew: 650
    poe: true
  - model: DS-2CD6825G0 (people counting)
    role: Staff entrance — people counting
    quantity: 2
    resolution: 2MP
    aiDetection: People counting
    unitPriceNew: 700
    poe: true
  - model: DS-7616NXI-I2/S (16-ch AcuSense NVR + 16TB)
    role: Central recording + AI
    quantity: 1
    unitPriceNew: 3500
    poe: true
aiFeatures:
  - facial-recognition
  - lpr-anpr
  - line-crossing
  - loitering
  - people-counting
  - intrusion
  - smart-search
  - event-playback
  - remote-access
  - cybersecurity
storage:
  localTB: 16
  cloud: true
networking:
  poe: true
  wifi: false
  nvr: true
  nvrChannels: 16
incidentRoi:
  incidentType: Pencurian stok + akses tanpa kebenaran ke kawasan larangan
  dailyLossEstimate: 200
  incidentsPerMonth: 3
  preventionRate: 60
  notes: 'Scenario kilang bersaiz sederhana. Exposure ≈ RM600/bulan sebelum sistem. 60% prevention expectation (bukan jaminan) ≈ RM360/bulan avoided loss. Nilai tidak langsung: pengurangan premium insurans, penyelesaian pertikaian lebih cepat, dan masa siasatan yang dijimatkan. Data biometrik (wajah) adalah data sensitif di bawah PDPA 2024 — consent dan notis diperlukan.'
relatedGear:
  - hikvision-ds-2cd1023-review-malaysia
relatedArticles:
  - cctv-home-security-camera-guide-malaysia
  - cctv-installer-gig-side-hustle-malaysia
  - harga-cctv-kedai-runcit-malaysia-roi
seoTitle: CCTV AI Malaysia — Sistem Facial Recognition Kilang (Fleet Review 2026)
seoDescription: Berapa kos sistem CCTV AI untuk kilang Malaysia? 16 kamera Hikvision dengan facial recognition, ANPR dan people counting. Realiti false positives, keperluan PDPA untuk data biometrik, dan kiraan ROI.
imageCuration:
  - caption: Bilik kawalan kilang dengan dinding monitor menunjukkan bounding box AI pada wajah dan kenderaan
    context: Bilik kawalan keselamatan
    purpose: hero
    position: Selepas intro
    alt: Bilik kawalan CCTV AI
    credit: Unsplash
    sourceUrl: https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=630&fit=crop
    aspectRatio: 16/9
    notes: Ganti dengan foto bilik kawalan tempatan bila ada
    active: true
  - caption: Kamera varifocal di pintu masuk kilang untuk tangkap nombor plat pada waktu malam
    context: Pintu masuk / main gate
    purpose: spec-detail
    position: Selepas bahagian ANPR
    alt: Kamera ANPR di pintu masuk kilang
    sourceUrl: ''
    aspectRatio: 16/9
    notes: Belum disumber
    active: true
  - caption: Zon kawasan larangan dengan garis lantai, kamera AI overhead, signage keselamatan
    context: Kawasan larangan dalam kilang
    purpose: section-intro
    position: Selepas bahagian kawasan larangan
    alt: Kawasan larangan kilang dengan CCTV
    sourceUrl: ''
    aspectRatio: 16/9
    notes: Belum disumber
    active: true
---

Seorang pengurus kilang tak tanya *"boleh tak aku afford ni?"* Dia tanya: **"Apa jadi kalau aku TAK beli ni?"**

Bila stok hilang, pekerja masuk kawasan larangan, atau kenderaan keluar masuk tanpa rekod — kos dia bukan harga kamera. Kos dia adalah stok, masa siasatan, insurans, dan reputasi.

Artikel ni review **sistem penuh** — bukan satu kamera. Ini fleet 16 kamera Hikvision dengan AI, untuk kilang bersaiz sederhana di Malaysia, dan dia akan jujur tentang apa yang teknologi ni BOLEH dan TAK BOLEH buat.

Sebab ada banyak mitos dalam dunia CCTV AI. Jom pecahkan.

[IMAGE CURATION #1]

## Kenapa AI penting: masalah false positives

Ini mungkin fakta paling berguna dalam artikel ni.

Kamera motion detection biasa, di kilang yang sibuk, menjana **beratus-ratus alert sehari** — bayang bergerak, cahaya bertukar, serangga, lampu kereta luar. 95% lebih daripada alert tu adalah sampah. Operator cepat letih, ignore semuanya, dan theft sebenar tenggelam.

Sistem AI (seperti Hikvision **AcuSense**) menapis ni dengan **deteksi manusia/kenderaan di dalam kamera** — bukan perbandingan piksel semata. Hasilnya:

- Dari 500 alert sampah → **3–10 alert sebenar**
- Operator boleh baca semua dalam 5 minit pagi
- Theft sebenar tak tenggelam

Inilah perbezaan sebenar "CCTV AI" dengan kamera murah dengan label "motion detection". Ini bukan pasal gimik. Ini pasal **sama ada sistem tu boleh dipakai atau hanya hiasan**.

## Fleet mengikut zon: apa AI buat di mana

Satu-satu kamera punya satu kerja. Sistem punya banyak kerja. Ini pecahan mengikut zon:

| Zon | Kamera | AI utama | Kenapa |
| --- | --- | --- | --- |
| Pintu utama | 8MP varifocal + IR | ANPR/LPR | Rekod plat setiap kenderaan keluar masuk |
| Perimeter | 8MP varifocal | Intrusion, line-crossing | Amaran sebelum orang sampai ke bangunan |
| Lantai kilang | 4MP AcuSense dome | Human, vehicle | Kurangkan false positives di kawasan sibuk |
| Kawasan larangan | 4MP varifocal dome | Face capture | Siapa masuk bilik stor/bahan bahaya |
| Pintu pekerja | 2MP people counting | People counting | Keselamatan + data tenaga kerja |
| Pusat | 16-ch NVR + 16TB | Smart search | Cari event dalam saat, bukan jam |

Jumlah hardware ≈ **RM11,000**. Tambah cabling dan pemasangan ≈ **RM4,000**. Total sekitar **RM15,000** — jumlah yang munasabah untuk kilang yang stok bocornya RM200 sehari.

## Realiti facial recognition: jangan percaya filem

Facial recognition ni hype paling besar dalam CCTV. Orang fikir: kamera boleh scan ramai-ramai, kenal pencuri dalam crowd, macam dalam filem.

Realitinya, ia berfungsi — dalam keadaan tertentu:

- **Wajah mesti depan kamera** (frontal), bukan sisi, bukan atas kepala
- **Angle kurang dari ~20 darjah** dari paksi kamera
- **Tinggi wajah dalam frame ≥ 100–150 piksel** — dekat, bukan dari 20 meter
- **Cahaya cukup** — malam dengan IR masih cabaran
- **Galeri wajah kena ada** — kau kena masukkan dulu wajah staf yang sah, baru sistem boleh kata "orang ni BUKAN dalam senarai"

Guna yang betul: **kawasan larangan**. Sebagai contoh, bilik stor stok mahal atau bilik bahan kimia. Sistem face capture boleh memberitahu *"seseorang masuk, dan muka dia bukan dalam senarai dibenarkan"* dalam masa beberapa saat, sambil rakam muka tu untuk siasatan.

Jangan guna untuk: "scan seluruh kilang dan kenal mana-mana pencuri yang pernah masuk" — itu takkan jadi macam dalam filem, dan kosnya mahal.

Dan penting: **data biometrik (wajah) adalah data sensitif di bawah PDPA 2024** di Malaysia. Menggunakan facial recognition bermakna kau kena:
- Maklumkan dan dapatkan kebenaran pekerja
- Letak notis jelas di pintu masuk
- Hadkan tempoh simpanan rakaman
- Hadkan siapa yang boleh akses galeri wajah

Bukan maksudnya jangan guna. Maksudnya guna dengan betul dan dokumentasi.

## ANPR/LPR: nombor plat yang sebenarnya boleh dipercayai

Kalau facial recognition ada syarat ketat, **ANPR/LPR (nombor plat) jauh lebih praktikal** untuk kilang.

Sebab plat nombor adalah objek standard — pantulan tinggi, format tetap, tak berubah. Sistem boleh baca plat pada kelajuan dan waktu malam dengan syarat:

- **Lens varifocal (6–12mm)** — bukan lens lebar 2.8mm. Kamera kena fokus ke lorong spesifik, bukan seluruh kawasan.
- **IR illuminator** untuk malam
- **Shutter speed cukup laju** untuk kenderaan bergerak
- **Sudut tuju yang betul** — plat kena datang hampir terus ke kamera

Guna ANPR untuk: rekod siapa masuk setiap hari, bandingkan dengan senarai kenderaan vendor, dan bila ada insiden, jawab *"lori tu masuk pukul berapa, siapa driver?"* dalam beberapa minit.

Ini salah satu ROI paling cepat dalam sistem kilang — bukan sebab ia halang curi, tapi sebab ia **jimatkan jam-jam siasatan**.

## People counting: keselamatan pekerja yang jarang dibincangkan

Satu fungsi AI yang selalu terlepas dalam review: **people counting** di pintu pekerja.

Guna dia:
- **Sasaran kehadiran** — jumlah pekerja sebenar berbanding rekod
- **Keselamatan** — kalau berlaku kecemasan/letupan kecil, kau tahu bilangan orang yang berada di dalam dan belum keluar
- **Pematuhan** — rekod siapa masuk kawasan dengan had kapasiti (contoh bilik pengurusan bahan)

Banyak kilang mula dengan anti-kecurian dan akhirnya sedar people counting memberi data untuk keselamatan pekerja — yang mana satu insiden boleh jauh lebih mahal dari mana-mana stok.

## Storage: berapa 16 kamera perlukan?

Orang selalu beli NVR tanpa kira storage. Ini matematik cepat:

- 16 kamera, purata 4MP, H.265, ~3Mbps ≈ **~21GB sejam** (semua sekali)
- Sehari ≈ **~500GB**
- 16TB ≈ **~30 hari rakaman**

Kalau kau nak 90 hari (sesetengah industri perlu), kau perlukan ~45TB — atau pilih rakaman "event sahaja" (motion/AI trigger) yang boleh jimat 70–90% storage. **Rakaman event + AI** adalah kombinasi yang kebanyakan kilang sepatutnya guna.

Dan untuk kritikal (insiden, bukti), ada satu fungsi yang jarang disebut: **cloud/offsite backup untuk event penting**. Kalau NVR dicuri atau rosak, kau masih ada bukti.

## Cybersecurity: kamera kau boleh jadi senjata hacker

Bahagian paling tak glamor tapi paling penting: **kamera CCTV adalah komputer di dinding kau.**

- **Tukar password default** dari hari pertama. Kamera yang tinggal `admin/admin` adalah botnet yang menunggu. Hikvision ada kes CVE terkenal berkaitan credential default.
- **Asingkan VLAN** — letak kamera pada rangkaian berasingan dari sistem akaun/HR kilang. Satu kamera di-hack ≠ seluruh kilang kena.
- **Matikan UPnP** pada NVR/router.
- **Kemas kini firmware** secara berkala.
- **Hadkan akses** — siapa boleh tengok rakaman? Satu-dua orang, dengan log.

Sistem keselamatan yang tak secure adalah ironi paling mahal.

[IMAGE CURATION #2]

## ROI: kiraan jujur untuk kilang

| Item | Amount |
| --- | --- |
| Anggaran hilang sehari (stok + kawasan larangan) | RM200 |
| Insiden sebulan | 3 |
| Exposure bulanan | RM600 |
| Anggaran prevention rate | 60% |
| Anggaran kerugian dielak sebulan | RM360 |

Sistem + pemasangan ≈ **RM15,000**. Secara teori, balik modal sekitar **3.5 tahun** dari kerugian yang mungkin dielak — TAPI itu hanya satu bahagian cerita.

Nilai yang tidak masuk dalam jadual tapi mungkin lebih besar:

- **Premium insurans** — kebanyakan insurer beri diskaun untuk sistem CCTV dengan rakaman. Tanya broker kau.
- **Masa siasatan** — ANPR + smart search mengubah siasatan dari 3 hari menjadi 30 minit.
- **Penyelesaian pertikaian** — vendor kata dia hantar, kau kata tak sampai? Rakaman jawab. Ini yang ramai owner kata "sebab sebenar kami pasang".
- **Keselamatan pekerja** — satu insiden yang boleh dielak bernilai lebih dari semua kamera dalam sistem.

## Checklist sebelum kau beli sistem AI

1. **AcuSense atau DeepinMind?** — AcuSense (deteksi manusia/kenderaan per-kamera) cukup untuk kebanyakan kilang dan jauh lebih murah. DeepinMind (analytics pusat penuh) untuk keperluan khusus macam face recognition skala besar. Jangan overbuy.
2. **NVR channel** — beli 16-ch walaupun pasang 8 sekarang. Expandasi jauh lebih murah dari ganti NVR.
3. **UPS** — NVR mesti hidup masa putus elektrik. Rakaman malam adalah rakaman paling penting.
4. **Siapa baca alert?** — AI paling hebat pun tak guna kalau takde orang check event pagi. Tetapkan tanggungjawab.
5. **PDPA** — notis, consent untuk biometrik, had tempoh simpanan. Dapatkan nasihat compliance sebelum pasang face recognition.
6. **Cat6 + PoE switch** — satu kabel per kamera, kualiti kabel betul. Jangan jimat kat sini.

[IMAGE CURATION #3]

## Kesimpulan

Sistem CCTV AI untuk kilang bukan pasal "kamera mana paling bagus". Ia pasal **menyusun teknologi mengikut masalah** — ANPR di pintu, intrusion di perimeter, face di kawasan larangan, counting di pintu pekerja, dan manusia yang betul membaca alert.

Dan ia pasal jujur: AI tak hentikan semua kecurian, facial recognition bukan macam filem, dan biometrik ada harga compliance. Tapi sistem yang direka dengan betul boleh menukar kilang dari "kita tak tahu apa yang berlaku" kepada "kita boleh tahu dalam beberapa minit".

Itu nilai sebenar. Dan untuk pengurus yang tanya *"apa jadi kalau aku tak beli?"* — jawapan dia selalunya lebih mahal dari RM15,000.

> Senario illustrative untuk kilang Malaysia bersaiz sederhana. Angka adalah anggaran untuk perancangan, bukan jaminan mana-mana insiden akan berlaku atau berhenti. Untuk facial recognition, pastikan pematuhan PDPA dan dapatkan quotation installer bertauliah sebelum membeli.
