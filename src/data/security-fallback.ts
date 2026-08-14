import type { ImageCurationBlock } from './content';

export interface SecurityCamera {
  model?: string;
  role?: string;
  quantity?: number;
  resolution?: string;
  nightVision?: string;
  aiDetection?: string;
  unitPriceNew?: number;
  unitPriceUsed?: number;
  poe?: boolean;
  wifi?: boolean;
}

export interface SecurityIncidentRoi {
  incidentType?: string;
  dailyLossEstimate?: number;
  incidentsPerMonth?: number;
  preventionRate?: number;
  notes?: string;
}

export interface SecuritySystem {
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  status?: 'draft' | 'scheduled' | 'published';
  date: string;
  updatedAt?: string;
  reviewedAt?: string;
  author?: string;
  tags: string[];
  lang?: 'en' | 'ms' | 'zh';
  readTime: number;
  scheduledAt?: string;
  environment?: string;
  deployment?: string;
  systemLineup?: string;
  systemCost?: number;
  installationCost?: number;
  maintenanceCost?: number;
  usefulLife?: number;
  cameras: SecurityCamera[];
  aiFeatures: string[];
  storage?: { localTB?: number; cloud?: boolean };
  networking?: { poe?: boolean; wifi?: boolean; nvr?: boolean; nvrChannels?: number };
  incidentRoi?: SecurityIncidentRoi;
  relatedGear: string[];
  relatedArticles: string[];
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: string;
  gallery?: string[];
  imageCuration?: ImageCurationBlock[];
}

export const fallbackSecuritySystems: SecuritySystem[] = [
  {
    slug: 'hikvision-8-camera-nvr-factory-malaysia',
    title: 'Hikvision 8-Camera NVR System for a Malaysian Factory — Full Breakdown',
    description: 'An 8-camera PoE CCTV system for a factory floor, main gate and loading bay. What it protects, what it costs in RM, and how to think about incident exposure vs actual savings.',
    image: 'photo-1517245386807-bb43f82c33c4?w=1200&h=630&fit=crop',
    category: 'factory-security',
    status: 'published',
    date: '2026-08-10',
    updatedAt: '2026-08-14',
    author: 'Kameralog Editorial',
    tags: ['hikvision', 'nvr', 'poe', 'factory', 'malaysia'],
    readTime: 11,
    environment: 'factory',
    deployment: 'nvr-poe',
    systemLineup: '8-camera NVR kit',
    systemCost: 4200,
    installationCost: 1500,
    maintenanceCost: 400,
    usefulLife: 5,
    cameras: [
      { model: 'DS-2CD2T46WDV3 (4MP bullet)', role: 'Main gate — LPR', quantity: 1, resolution: '4MP', nightVision: '40m IR', aiDetection: 'Human, vehicle, LPR', unitPriceNew: 380, poe: true },
      { model: 'DS-2CD2146G2 (4MP dome)', role: 'Factory floor', quantity: 4, resolution: '4MP', nightVision: '30m IR', aiDetection: 'Human, line-crossing', unitPriceNew: 290, poe: true },
      { model: 'DS-2CD1T43G0 (3MP bullet)', role: 'Loading bay', quantity: 2, resolution: '3MP', nightVision: '30m IR', aiDetection: 'Human, intrusion', unitPriceNew: 220, poe: true },
      { model: 'DS-7608NI-K2 (8-ch NVR)', role: 'NVR + 4TB HDD', quantity: 1, resolution: '', nightVision: '', aiDetection: '', unitPriceNew: 1150, poe: true },
    ],
    aiFeatures: ['intrusion', 'line-crossing', 'lpr-anpr', 'people-counting', 'smart-search', 'event-playback', 'remote-access'],
    storage: { localTB: 4, cloud: false },
    networking: { poe: true, wifi: false, nvr: true, nvrChannels: 8 },
    incidentRoi: {
      incidentType: 'Night theft from the loading bay',
      dailyLossEstimate: 200,
      incidentsPerMonth: 2,
      preventionRate: 60,
      notes: 'Scenario estimate for a mid-size Johor factory. Exposure ≈ RM400/month before the system. A 60% prevention expectation (not a guarantee) gives ≈ RM240/month of estimated avoided loss. Payback is theoretical — treat it as "possible loss exposure" the system de-risks, not a promise it will prevent any specific theft.',
    },
    relatedGear: ['hikvision-ds-2cd1023-review-malaysia'],
    relatedArticles: ['cctv-home-security-camera-guide-malaysia', 'cctv-installer-gig-side-hustle-malaysia'],
    content: `A factory manager doesn't ask "can I afford this?" — they ask **"what happens if I don't buy this?"**

This guide breaks down an 8-camera Hikvision PoE system the way a factory buyer in Malaysia actually thinks: what it protects, what it costs in Ringgit, and how to estimate incident exposure honestly.

[IMAGE CURATION #1]

## What the system covers

For a mid-size factory you want three zones covered:

- **Main gate** — number plate capture (LPR) so you know every vehicle that enters
- **Factory floor** — line-crossing and intrusion detection on the production area
- **Loading bay** — the #1 spot for overnight theft and inventory disputes

## The Hikvision 8-channel kit

- 1x 4MP bullet with LPR at the gate (RM380)
- 4x 4MP domes on the floor (RM290 each)
- 2x 3MP bullets at the loading bay (RM220 each)
- 1x 8-channel NVR with 4TB HDD (RM1,150)

Total hardware ≈ **RM4,200**. Add cabling and install ≈ **RM1,500**.

## How to read the ROI honestly

Security ROI is exposure-based, not gig-based. The numbers below are a **scenario estimate** — they are not a guarantee that cameras will prevent any specific theft.

| Item | Amount |
| --- | --- |
| Estimated daily loss, loading bay theft | RM200 |
| Incidents per month | 2 |
| Monthly loss exposure | RM400 |
| Estimated prevention rate | 60% |
| Estimated avoided loss / month | RM240 |

If the whole system (hardware + install) is RM5,700, that's roughly **24 months of estimated avoided loss** — and that's before you count the deterrence, insurance discounts and faster dispute resolution, which many buyers report as the real reason they install CCTV.

## Key buying questions for a factory

- Does the NVR support enough channels for future cameras? (8ch leaves no headroom — start at 16ch)
- Are your cameras PoE? One Cat6 cable per camera is far easier to maintain in a factory
- Will the footage survive a power cut? Add a UPS for the NVR
- Who reviews the alerts? AI detection only helps if someone actually watches the events

[IMAGE CURATION #2]

> Illustrative scenario for a Johor factory. Figures are estimates for planning, not a promise that any specific theft will be prevented. Always quote with your installer before purchase.`,
  },
  {
    slug: 'tapo-4-camera-wifi-retail-shop-malaysia',
    title: 'Tapo 4-Camera WiFi CCTV for a Malaysian Retail Shop — What It Actually Protects',
    description: 'A RM1,000-level WiFi camera system for a shoplot, stall or mini-market. Cheap to install, no cabling, app alerts on your phone. Honest look at what WiFi CCTV can and can\'t do.',
    image: 'photo-1557597774-9d273605dfa9?w=1200&h=630&fit=crop',
    category: 'retail-security',
    status: 'published',
    date: '2026-08-12',
    author: 'Kameralog Editorial',
    tags: ['tapo', 'wifi', 'retail', 'shop', 'malaysia'],
    readTime: 8,
    environment: 'retail',
    deployment: 'wifi',
    systemLineup: '4-camera WiFi kit',
    systemCost: 1000,
    installationCost: 250,
    maintenanceCost: 120,
    usefulLife: 3,
    cameras: [
      { model: 'Tapo C220 (2K pan/tilt)', role: 'Counter + cash area', quantity: 1, resolution: '2K', nightVision: 'Colour night vision', aiDetection: 'Motion, human, sound', unitPriceNew: 219, wifi: true },
      { model: 'Tapo C210 (1080p pan/tilt)', role: 'Sales floor', quantity: 2, resolution: '1080p', nightVision: 'IR', aiDetection: 'Motion, human', unitPriceNew: 129, wifi: true },
      { model: 'Tapo C120 (2K fixed)', role: 'Back door / stock room', quantity: 1, resolution: '2K', nightVision: 'IR', aiDetection: 'Motion, human', unitPriceNew: 169, wifi: true },
    ],
    aiFeatures: ['motion-tracking', 'two-way-audio', 'remote-access', 'event-playback', 'smart-search'],
    storage: { localTB: 1, cloud: true },
    networking: { poe: false, wifi: true, nvr: false },
    incidentRoi: {
      incidentType: 'Cash theft + shoplifting at the counter',
      dailyLossEstimate: 80,
      incidentsPerMonth: 4,
      preventionRate: 40,
      notes: 'Small-shop scenario. Shoplifting is usually under-reported; RM80/day of stock + cash loss is a plausible mid-range exposure. A 40% prevention expectation (not a guarantee) ≈ RM128/month avoided. The biggest practical win for a shoplot is usually deterrence plus being able to settle disputes with video evidence.',
    },
    relatedGear: ['tapo-c210-review-malaysia', 'tapo-c220-review-malaysia'],
    relatedArticles: ['cctv-vs-dashcam-malaysia'],
    content: `A shoplot owner in KL often starts with one camera behind the counter — then realises the back door and the aisle corners are blind spots.

This is a realistic **RM1,000-level WiFi system** for a retail shop, built on Tapo cameras you can set up in an afternoon.

[IMAGE CURATION #1]

## Why WiFi makes sense for a shop

- No cabling — plug into any power socket, connect to your shop's WiFi
- App alerts — you see motion events on your phone before you even arrive
- Cheap to expand — add a camera anywhere coverage is missing
- DIY install — no contractor needed

## The honest limits

- WiFi is shared with your customer WiFi — a busy shop will degrade video quality
- No PoE/NVR central recording by default — depends on the microSD in each camera
- If the router dies, the cameras go offline

## Sample layout

| Position | Camera | Purpose |
| --- | --- | --- |
| Counter | Tapo C220 2K pan/tilt | Cash area + two-way talk |
| Sales floor | Tapo C210 x2 | Aisles, blind corners |
| Back door | Tapo C120 2K fixed | Stock room access |

## Exposure vs savings — the honest version

| Item | Amount |
| --- | --- |
| Estimated daily loss (shoplifting + cash) | RM80 |
| Incidents per month | 4 |
| Monthly loss exposure | RM320 |
| Estimated prevention rate | 40% |
| Estimated avoided loss / month | RM128 |

System cost ≈ RM1,250 installed. At RM128/month of estimated avoided loss that's a ~10 month theoretical payback — but most shop owners report the real value is **deterrence and being able to show the video when there's a dispute**.

[IMAGE CURATION #2]

> Illustrative shop scenario. Estimates are for planning — CCTV does not guarantee any specific loss will be prevented.`,
  },
  {
    slug: 'reolink-4-camera-poe-warehouse-malaysia',
    title: 'Reolink 4-Camera PoE System for a Warehouse — Security Without a Big Contract',
    description: 'A DIY-friendly PoE CCTV setup for a warehouse using Reolink NVRs and cameras. Central recording, no monthly fees, human/vehicle detection. Built for Malaysian warehouses that want ownership, not contracts.',
    image: 'photo-1567581935884-3349723552ca?w=1200&h=630&fit=crop',
    category: 'warehouse-security',
    status: 'published',
    date: '2026-08-14',
    author: 'Kameralog Editorial',
    tags: ['reolink', 'poe', 'nvr', 'warehouse', 'malaysia'],
    readTime: 9,
    environment: 'warehouse',
    deployment: 'nvr-poe',
    systemLineup: '4-camera PoE NVR kit',
    systemCost: 2200,
    installationCost: 800,
    maintenanceCost: 250,
    usefulLife: 4,
    cameras: [
      { model: 'RLN8-410 (8-ch NVR, 2TB)', role: 'Central recording', quantity: 1, resolution: '', nightVision: '', aiDetection: '', unitPriceNew: 700, poe: true },
      { model: 'RLC-810A (8MP bullet)', role: 'Loading dock', quantity: 2, resolution: '8MP', nightVision: '30m IR', aiDetection: 'Person, vehicle', unitPriceNew: 280, poe: true },
      { model: 'RLC-842A (8MP bullet, varifocal)', role: 'Racking aisles', quantity: 2, resolution: '8MP', nightVision: '30m IR', aiDetection: 'Person, vehicle', unitPriceNew: 350, poe: true },
    ],
    aiFeatures: ['intrusion', 'smart-search', 'event-playback', 'remote-access', 'cybersecurity'],
    storage: { localTB: 2, cloud: false },
    networking: { poe: true, wifi: false, nvr: true, nvrChannels: 8 },
    incidentRoi: {
      incidentType: 'Overnight stock loss from the loading dock',
      dailyLossEstimate: 150,
      incidentsPerMonth: 3,
      preventionRate: 55,
      notes: 'Warehouse scenario. Exposure ≈ RM450/month. At a 55% prevention expectation (not a guarantee) ≈ RM248/month avoided. Central NVR recording means you also keep evidence for insurance and police reports.',
    },
    relatedGear: ['hikvision-ds-2cd1023-review-malaysia'],
    relatedArticles: ['cctv-home-security-camera-guide-malaysia'],
    content: `Some warehouse owners want the peace of mind of ownership: **your own NVR, your own hard drive, no monthly subscription**.

Reolink is the brand that makes this practical in Malaysia — PoE cameras, an 8-channel NVR, and person/vehicle detection without a cloud contract.

[IMAGE CURATION #1]

## The kit

- 1x Reolink RLN8-410 NVR with 2TB drive (RM700)
- 2x RLC-810A 8MP bullets at the loading dock (RM280 each)
- 2x RLC-842A varifocal bullets along the racking aisles (RM350 each)

Hardware ≈ **RM2,200**. DIY cabling + install ≈ RM800 if you run the Cat6 yourself.

## Why warehouse owners pick this route

- **No monthly fees** — the NVR records locally to your own hard drive
- **One cable per camera** — PoE carries power + data
- **Person/vehicle detection** — fewer false alarms than pure motion detection
- **Local evidence** — footage for insurance claims and police reports

## The exposure math

| Item | Amount |
| --- | --- |
| Estimated daily loss (overnight stock) | RM150 |
| Incidents per month | 3 |
| Monthly loss exposure | RM450 |
| Estimated prevention rate | 55% |
| Estimated avoided loss / month | RM248 |

Total ≈ RM3,000 installed. At RM248/month of estimated avoided loss, theoretical payback is ~12 months. The unquantifiable value: **insurance premiums often drop, and disputes get settled with footage instead of words**.

## What to watch for

- Buy the NVR with enough channels — 8ch now means you won't re-buy when you expand
- Use a UPS on the NVR so recording survives a power cut
- Keep the admin password long and change it from factory default

[IMAGE CURATION #2]

> Illustrative warehouse scenario. Figures are planning estimates — CCTV does not guarantee prevention of any specific loss.`,
  },
];
