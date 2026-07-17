import type { PortfolioItem } from "@/types";

/**
 * Portfolio — quy chuẩn media
 *
 * Ảnh case: public/media/portfolio/{id}/
 *   cover.jpg|png|webp
 *   1.jpg … 6.jpg
 *   before.jpg · after.jpg
 *
 * Fallback demo: public/media/services/{folder}/
 * Map: public/media/portfolio/README.md
 */

const EXTS = ["jpg", "jpeg", "png", "webp"] as const;

function variants(pathNoExt: string): string[] {
  return EXTS.map((e) => `${pathNoExt}.${e}`);
}

function unique(paths: string[]): string[] {
  return [...new Set(paths.filter(Boolean))];
}

type Seed = {
  folder: string;
  service: string;
  serviceAlt?: string;
};

function buildMedia(seed: Seed) {
  const base = `/media/portfolio/${seed.folder}`;
  const svc = `/media/services/${seed.service}`;
  const alt = seed.serviceAlt
    ? `/media/services/${seed.serviceAlt}`
    : null;

  const coverCandidates = unique([
    ...variants(`${base}/cover`),
    `${svc}/${seed.service}.png`,
    `${svc}/${seed.service}.jpg`,
    ...variants(`${svc}/cover`),
    `${svc}/1.jpg`,
    `${svc}/1.png`,
  ]);

  const galleryPreferred = [1, 2, 3, 4, 5, 6].map(
    (n) => `${base}/${n}.jpg`
  );

  const galleryCandidates = unique([
    ...[1, 2, 3, 4, 5, 6].flatMap((n) => variants(`${base}/${n}`)),
    `${svc}/${seed.service}.png`,
    ...variants(`${svc}/cover`),
    `${svc}/1.jpg`,
    `${svc}/2.jpg`,
    `${svc}/3.jpg`,
    `${svc}/4.jpg`,
    ...(alt
      ? [
          `${alt}/${seed.serviceAlt}.png`,
          ...variants(`${alt}/cover`),
          `${alt}/1.jpg`,
          `${alt}/2.jpg`,
        ]
      : []),
  ]);

  const beforeCandidates = unique([
    ...variants(`${base}/before`),
    `${svc}/${seed.service}.png`,
    `${svc}/4.jpg`,
    `${svc}/3.jpg`,
  ]);

  const afterCandidates = unique([
    ...variants(`${base}/after`),
    ...variants(`${base}/cover`),
    `${svc}/${seed.service}.png`,
    ...variants(`${svc}/cover`),
    `${svc}/1.jpg`,
  ]);

  return {
    cover: coverCandidates[0]!,
    coverCandidates,
    gallery: galleryPreferred,
    galleryCandidates,
    beforeImage: beforeCandidates[0],
    beforeCandidates,
    afterImage: afterCandidates[0],
    afterCandidates,
  };
}

const MEDIA = {
  p1: buildMedia({ folder: "p1", service: "werbetechnik", serviceAlt: "cnc" }),
  p2: buildMedia({ folder: "p2", service: "website", serviceAlt: "branding" }),
  p3: buildMedia({ folder: "p3", service: "cnc", serviceAlt: "printing" }),
  p4: buildMedia({ folder: "p4", service: "printing", serviceAlt: "branding" }),
  p5: buildMedia({ folder: "p5", service: "werbetechnik", serviceAlt: "marketing" }),
  p6: buildMedia({ folder: "p6", service: "website", serviceAlt: "marketing" }),
  p7: buildMedia({ folder: "p7", service: "cnc", serviceAlt: "werbetechnik" }),
  p8: buildMedia({ folder: "p8", service: "printing", serviceAlt: "branding" }),
} as const;

export const portfolio: PortfolioItem[] = [
  {
    id: "p1",
    title: {
      vi: "Saigon House — Facade System",
      de: "Saigon House — Fassadensystem",
    },
    category: "signage",
    industry: "restaurant",
    description: {
      vi: "Hệ mặt tiền + lightbox chữ nổi aluminium/acrylic — đọc được từ 40m trên phố Berlin.",
      de: "Fassade + Leuchtbuchstaben Aluminium/Acryl — lesbar aus 40m in Berlin.",
    },
    tags: ["Lightbox", "Facade", "Acrylic"],
    gradient: "from-amber-950 via-stone-900 to-black",
    services: ["Branding", "Werbetechnik", "CNC"],
    materials: {
      vi: "Aluminium 3mm · Acrylic opal · LED module 6500K",
      de: "Aluminium 3mm · Opal-Acryl · LED 6500K",
    },
    duration: { vi: "4 tuần", de: "4 Wochen" },
    result: {
      vi: "+38% walk-in tuần đầu sau lắp (báo cáo khách).",
      de: "+38% Walk-ins in der ersten Woche (Kundenreport).",
    },
    beforeLabel: {
      vi: "Biển vinyl mờ, không đèn",
      de: "Matte Vinyl-Schilder, kein Licht",
    },
    afterLabel: {
      vi: "Hệ chữ nổi + lightbox đồng bộ CI",
      de: "3D-Buchstaben + Lightbox, CI-konform",
    },
    ...MEDIA.p1,
  },
  {
    id: "p2",
    title: {
      vi: "Nagelstudio Luxe — Booking OS",
      de: "Nagelstudio Luxe — Booking OS",
    },
    category: "website",
    industry: "nail",
    description: {
      vi: "Website booking tối giản, motion tinh tế, local SEO và Google Business sync.",
      de: "Minimal Booking-Web, feine Motion, Local SEO und Google-Business-Sync.",
    },
    tags: ["Next.js", "Booking", "SEO"],
    gradient: "from-rose-950 via-neutral-900 to-black",
    services: ["Branding", "Website", "Marketing"],
    materials: {
      vi: "Design system tokens · Component library · Core Web Vitals",
      de: "Design-Tokens · Component Library · Core Web Vitals",
    },
    duration: { vi: "3 tuần", de: "3 Wochen" },
    result: {
      vi: "62% booking online trong tháng 2.",
      de: "62% Online-Buchungen im 2. Monat.",
    },
    beforeLabel: {
      vi: "Instagram-only, không booking",
      de: "Nur Instagram, keine Buchung",
    },
    afterLabel: {
      vi: "Platform booking + brand kit",
      de: "Booking-Plattform + Brand-Kit",
    },
    ...MEDIA.p2,
  },
  {
    id: "p3",
    title: {
      vi: "Retail POS — Modular CNC",
      de: "Retail POS — Modular CNC",
    },
    category: "cnc",
    industry: "shop",
    description: {
      vi: "Kệ display phay CNC acrylic + gỗ sồi, module thay theo campaign.",
      de: "CNC-Displays Acryl + Eiche, kampagnenmodular.",
    },
    tags: ["CNC", "POS", "Modular"],
    gradient: "from-sky-950 via-slate-900 to-black",
    services: ["CNC", "Branding", "Printing"],
    materials: {
      vi: "Oak veneer · Clear acrylic 8mm · Hidden fasteners",
      de: "Eichenfurnier · Klaracryl 8mm · Verdeckte Verbinder",
    },
    duration: { vi: "2.5 tuần", de: "2,5 Wochen" },
    result: {
      vi: "Setup campaign 15 phút / store.",
      de: "Kampagnen-Setup 15 Min. / Store.",
    },
    beforeLabel: {
      vi: "POS tạm, không brand",
      de: "Provisorisches POS, kein Brand",
    },
    afterLabel: {
      vi: "Hệ module có guideline lắp",
      de: "Modulares System mit Montage-Guide",
    },
    ...MEDIA.p3,
  },
  {
    id: "p4",
    title: {
      vi: "Dental+ — Clinical Identity",
      de: "Dental+ — Clinical Identity",
    },
    category: "print",
    industry: "dental",
    description: {
      vi: "Logo, brochure dịch vụ, card, folder — tone y tế sạch, tin cậy.",
      de: "Logo, Servicebroschüre, Karten, Mappen — klares medizinisches CI.",
    },
    tags: ["Branding", "Print", "Medical"],
    gradient: "from-teal-950 via-slate-900 to-black",
    services: ["Branding", "Printing", "Website"],
    materials: {
      vi: "Uncoated 300gsm · Soft-touch · Spot UV mark",
      de: "Uncoated 300g · Soft-Touch · Spot-UV-Marke",
    },
    duration: { vi: "3 tuần", de: "3 Wochen" },
    result: {
      vi: "NPS reception materials +1.2 (survey nội bộ).",
      de: "NPS Empfangsmaterial +1,2 (interne Umfrage).",
    },
    beforeLabel: {
      vi: "Template generic phòng khám",
      de: "Generische Praxis-Templates",
    },
    afterLabel: {
      vi: "Hệ CI + print + web đồng bộ",
      de: "CI + Print + Web synchron",
    },
    ...MEDIA.p4,
  },
  {
    id: "p5",
    title: {
      vi: "Logistics Nord — Fleet Signal",
      de: "Logistics Nord — Fleet Signal",
    },
    category: "signage",
    industry: "logistics",
    description: {
      vi: "Fleet wrap 12 unit, guideline màu & layout nhất quán toàn đội xe.",
      de: "12-Fahrzeug-Flotte mit konsistentem Farb- und Layoutsystem.",
    },
    tags: ["Vehicle Wrap", "Fleet", "B2B"],
    gradient: "from-indigo-950 via-zinc-900 to-black",
    services: ["Branding", "Werbetechnik", "Marketing"],
    materials: {
      vi: "Cast vinyl · Laminate UV · Contour cut",
      de: "Cast-Folie · UV-Laminat · Konturschnitt",
    },
    duration: { vi: "5 tuần", de: "5 Wochen" },
    result: {
      vi: "Nhận diện brand trên đường cao tốc — 12 rolling billboards.",
      de: "Markenpräsenz auf der Autobahn — 12 rollende Billboards.",
    },
    beforeLabel: {
      vi: "Xe trắng / logo nhỏ",
      de: "Weiße Fahrzeuge / kleines Logo",
    },
    afterLabel: {
      vi: "Hệ wrap + safety marks",
      de: "Wrap-System + Safety Marks",
    },
    ...MEDIA.p5,
  },
  {
    id: "p6",
    title: {
      vi: "B2B Corporate Web Platform",
      de: "B2B Corporate Web Platform",
    },
    category: "website",
    industry: "enterprise",
    description: {
      vi: "Website đa trang, case studies, form lead, dark/light, chuẩn SEO.",
      de: "Multipage-Website, Cases, Lead-Formulare, Dark/Light, SEO-ready.",
    },
    tags: ["Corporate", "Lead Gen", "UI"],
    gradient: "from-violet-950 via-neutral-950 to-black",
    services: ["Website", "Branding", "Marketing"],
    materials: {
      vi: "App-like IA · Motion system · Analytics events",
      de: "App-ähnliche IA · Motion-System · Analytics-Events",
    },
    duration: { vi: "6 tuần", de: "6 Wochen" },
    result: {
      vi: "Lead form completion +27%.",
      de: "Lead-Formular-Completion +27%.",
    },
    beforeLabel: {
      vi: "Brochure site cũ",
      de: "Alte Broschüren-Website",
    },
    afterLabel: {
      vi: "Product-feel platform",
      de: "Product-feel Plattform",
    },
    ...MEDIA.p6,
  },
  {
    id: "p7",
    title: {
      vi: "Salon Essence — 3D CNC Letters",
      de: "Salon Essence — 3D-CNC-Buchstaben",
    },
    category: "cnc",
    industry: "salon",
    description: {
      vi: "Chữ nổi phay CNC sơn matt, backlight LED, lắp mặt tiền salon.",
      de: "Matt lackierte CNC-Buchstaben mit LED-Backlight an der Fassade.",
    },
    tags: ["3D Letters", "LED", "CNC"],
    gradient: "from-fuchsia-950 via-stone-950 to-black",
    services: ["CNC", "Werbetechnik", "Branding"],
    materials: {
      vi: "PVC / ALU composite · Matt lacquer · LED edge",
      de: "PVC / ALU-Verbund · Mattlack · LED-Kante",
    },
    duration: { vi: "2 tuần", de: "2 Wochen" },
    result: {
      vi: "Photo-ops facade — organic social tăng rõ tuần 1.",
      de: "Foto-Fassade — organische Social-Reichweite Woche 1.",
    },
    beforeLabel: { vi: "Decal phẳng", de: "Flache Folie" },
    afterLabel: {
      vi: "Chữ nổi depth 40mm",
      de: "3D-Buchstaben 40mm Tiefe",
    },
    ...MEDIA.p7,
  },
  {
    id: "p8",
    title: {
      vi: "Cafe Bloom — Print & Packaging",
      de: "Cafe Bloom — Print & Packaging",
    },
    category: "print",
    industry: "restaurant",
    description: {
      vi: "Catalogue mùa, hộp takeaway, sticker series — màu brand chuẩn.",
      de: "Saisonkatalog, Takeaway-Boxen, Sticker-Serie — farbverbindlich.",
    },
    tags: ["Packaging", "Catalogue", "F&B"],
    gradient: "from-orange-950 via-stone-900 to-black",
    services: ["Printing", "Branding"],
    materials: {
      vi: "Food-safe ink · Kraft board · Spot color",
      de: "Lebensmittelechte Farbe · Kraftkarton · Sonderfarbe",
    },
    duration: { vi: "2 tuần", de: "2 Wochen" },
    result: {
      vi: "Unboxing share rate tăng trên social (qualitative).",
      de: "Höhere Unboxing-Shares in Social (qualitativ).",
    },
    beforeLabel: {
      vi: "Bao bì generic",
      de: "Generische Verpackung",
    },
    afterLabel: {
      vi: "Pack system theo season",
      de: "Saisonales Pack-System",
    },
    ...MEDIA.p8,
  },
];

export function getPortfolioItem(id: string) {
  return portfolio.find((p) => p.id === id);
}

/** Gallery paths for thumbs (primary names; SmartImage falls through candidates) */
export function portfolioGallery(item: PortfolioItem): string[] {
  if (item.gallery?.length) return item.gallery;
  if (item.cover) return [item.cover];
  return [];
}

export function portfolioCoverList(item: PortfolioItem): string[] {
  if (item.coverCandidates?.length) return item.coverCandidates;
  if (item.cover) return [item.cover];
  return [];
}
