import type { LocalizedString, LocalizedStringArray } from "@/types";

/**
 * Chi tiết tính năng cho từng pillar "Giải pháp chuyên sâu"
 * Key = IndustrySolutionPillar.id
 */
export type PillarDepth = {
  features: LocalizedStringArray;
  impact: LocalizedString;
};

export const pillarDepth: Record<string, PillarDepth> = {
  // ── Restaurant ──
  "identity-menu": {
    features: {
      vi: [
        "Logo / palette / type F&B chuẩn in + digital",
        "Menu à la carte, set, drinks — layout hierarchy rõ",
        "QR menu tablet + print proof đồng bộ brand",
        "Template cập nhật món theo mùa / event",
      ],
      de: [
        "Logo / Palette / Type F&B für Print + Digital",
        "Menüs à la carte, Set, Drinks — klare Hierarchie",
        "QR-Tablet-Menü + Print-Proof markenkonsistent",
        "Saison-/Event-Templates für Menü-Updates",
      ],
    },
    impact: {
      vi: "Brand + menu nhất quán mọi touchpoint — từ bàn ăn đến Instagram.",
      de: "Marke + Menü an allen Touchpoints — vom Tisch bis Instagram.",
    },
  },
  "facade-signage": {
    features: {
      vi: [
        "Chữ nổi / lightbox tối ưu góc nhìn 20–40m",
        "Decal cửa kính, bảng giờ, menu board ngoài",
        "File CNC + lắp đặt theo quy định Berlin",
        "Ánh sáng ban đêm: IP / LED đúng chuẩn",
      ],
      de: [
        "3D-Buchstaben / Lightbox für 20–40 m Sichtweite",
        "Fensterfolie, Öffnungszeiten, Outdoor-Menüboard",
        "CNC-Daten + Montage nach Berliner Vorgaben",
        "Nachtlicht: IP / LED fachgerecht",
      ],
    },
    impact: {
      vi: "Mặt tiền đọc được từ phố — tăng walk-in và nhận diện ban đêm.",
      de: "Fassade von der Straße lesbar — mehr Walk-ins und Nachtsichtbarkeit.",
    },
  },
  "digital-booking": {
    features: {
      vi: [
        "Landing / website mobile-first, CTA đặt bàn rõ",
        "Tích hợp form / widget đặt chỗ",
        "Google Business + schema local SEO",
        "Tốc độ, Core Web Vitals, đa ngôn ngữ DE/VI",
      ],
      de: [
        "Mobile-first Site mit klarem Reservierungs-CTA",
        "Buchungsformular / Widget-Integration",
        "Google Business + Local Schema SEO",
        "Performance, Core Web Vitals, DE/VI",
      ],
    },
    impact: {
      vi: "Chuyển đổi online → bàn thật: Maps, web, social cùng một funnel.",
      de: "Online → Tisch: Maps, Web, Social in einem Funnel.",
    },
  },
  "seasonal-growth": {
    features: {
      vi: [
        "Bộ visual launch / happy hour / event",
        "Template IG–TikTok + size ads local",
        "Retargeting khu vực Berlin",
        "Calendar content theo mùa F&B",
      ],
      de: [
        "Launch- / Happy-Hour- / Event-Visuals",
        "IG–TikTok-Templates + Local-Ad-Formate",
        "Geo-Retargeting Berlin",
        "Saisonaler F&B-Content-Kalender",
      ],
    },
    impact: {
      vi: "Campaign mùa vụ chạy nhanh — không làm lại brand mỗi lần.",
      de: "Saison-Kampagnen schneller — ohne Marken-Rebuild.",
    },
  },

  // ── Nail ──
  "beauty-ci": {
    features: {
      vi: [
        "Palette, type, pattern aesthetic nail/beauty",
        "Photography direction before–after",
        "Brand kit cho biển, menu, feed",
        "Guideline tone & visual premium",
      ],
      de: [
        "Palette, Type, Pattern Nail/Beauty",
        "Foto-Richtung Before–After",
        "Brand-Kit für Schild, Menü, Feed",
        "Premium Tone- & Visual-Guidelines",
      ],
    },
    impact: {
      vi: "Look premium hỗ trợ pricing và consistency online–offline.",
      de: "Premium-Look stützt Preise und Online–Offline-Konsistenz.",
    },
  },
  "glow-signage": {
    features: {
      vi: [
        "Lightbox / neon flex signature mặt tiền",
        "Bảng mica sáng, logo 3D acrylic",
        "Độ sáng tối ưu studio ban đêm",
        "Sản xuất CNC + lắp Berlin",
      ],
      de: [
        "Lightbox / Neon-Flex als Fassaden-Signature",
        "Leuchtende Acryl-Tafeln, 3D-Logo",
        "Helligkeit optimiert für Abendstudio",
        "CNC-Fertigung + Montage Berlin",
      ],
    },
    impact: {
      vi: "Studio sáng = walk-in buổi tối + signature nhận diện.",
      de: "Leuchtendes Studio = Abend-Walk-ins + Wiedererkennung.",
    },
  },
  "booking-web": {
    features: {
      vi: [
        "Web đặt lịch 24/7 theo dịch vụ / technician",
        "Service menu + portfolio nail art",
        "Maps / GMB đồng bộ địa chỉ",
        "Mobile UX nhanh, giảm DM lặp",
      ],
      de: [
        "24/7-Buchung nach Service / Technician",
        "Service-Menü + Nail-Art-Portfolio",
        "Maps / GMB adresssynchron",
        "Schnelles Mobile-UX, weniger DMs",
      ],
    },
    impact: {
      vi: "Booking tự động — receptionist rảnh hơn, ít sót lịch.",
      de: "Automatische Buchung — weniger Chaos, weniger No-Shows.",
    },
  },
  "content-system": {
    features: {
      vi: [
        "Template IG/TikTok theo season",
        "Frame before–after chuẩn brand",
        "Promo opening / flash sale kit",
        "Asset pack tái sử dụng hàng tháng",
      ],
      de: [
        "Saisonale IG/TikTok-Templates",
        "Before–After-Frames im Brand-Look",
        "Opening- / Flash-Sale-Kit",
        "Wiederverwendbares Monats-Asset-Pack",
      ],
    },
    impact: {
      vi: "Feed & cửa hàng một ngôn ngữ — content không lệch brand.",
      de: "Feed und Studio eine Sprache — Content bleibt on-brand.",
    },
  },

  // ── Salon ──
  "soft-brand": {
    features: {
      vi: [
        "CI mềm / spa: type, color, mood",
        "Photography direction không gian",
        "Packaging nhỏ: card, pouch, sticker",
        "Guideline cho print & digital",
      ],
      de: [
        "Weiches Spa-CI: Type, Farbe, Mood",
        "Raum-Fotografie-Richtung",
        "Klein-Packaging: Karte, Pouch, Sticker",
        "Guidelines Print & Digital",
      ],
    },
    impact: {
      vi: "Không gian và brand cùng vibe thư giãn — tăng trust.",
      de: "Raum und Marke im gleichen Wohlfühl-Vibe.",
    },
  },
  "spatial-sign": {
    features: {
      vi: [
        "Wayfinding phòng / zone treatment",
        "Reception desk brand + welcome",
        "Label zone, locker, WC chuẩn spa",
        "Material dịu: acrylic, wood, print",
      ],
      de: [
        "Wegeleitung Räume / Treatment-Zonen",
        "Empfang mit Brand + Welcome",
        "Zone-, Locker-, WC-Labels",
        "Sanfte Materialien: Acryl, Holz, Print",
      ],
    },
    impact: {
      vi: "Khách hiểu flow trong spa — ít hỏi, trải nghiệm mượt.",
      de: "Gäste verstehen den Flow — weniger Fragen, flüssiger Besuch.",
    },
  },
  "service-menu": {
    features: {
      vi: [
        "Bảng giá / service menu hierarchy",
        "Brochure gói treatment & upsell",
        "Loyalty card / voucher design",
        "Print kit đồng bộ CI",
      ],
      de: [
        "Preis- / Service-Menü mit Hierarchie",
        "Paket-Broschüren & Upsell",
        "Loyalty-Karte / Voucher-Design",
        "Print-Kit markenkonsistent",
      ],
    },
    impact: {
      vi: "Menu rõ → upsell dễ, average ticket cao hơn.",
      de: "Klares Menü → einfachere Upsells, höherer Ticket.",
    },
  },
  retention: {
    features: {
      vi: [
        "Booking website + reminder flow",
        "Review loop sau treatment",
        "Remarketing soft (email/SMS template)",
        "Local SEO & GMB spa",
      ],
      de: [
        "Buchungsweb + Reminder-Flow",
        "Review-Loop nach Treatment",
        "Sanftes Remarketing (E-Mail/SMS)",
        "Local SEO & GMB für Spa",
      ],
    },
    impact: {
      vi: "Giữ chân khách quay lại — retention > chỉ chase new leads.",
      de: "Wiederkehrende Gäste — Retention statt nur Neukunden.",
    },
  },

  // ── Shop ──
  "facade-window": {
    features: {
      vi: [
        "Window story theo mùa / campaign",
        "Decal vinyl, hanging mobile",
        "Hierarchy thông điệp cửa sổ",
        "Tháo lắp nhanh theo sale cycle",
      ],
      de: [
        "Saisonale / Kampagnen-Schaufenster-Story",
        "Folie, Vinyl, Hängeelemente",
        "Klare Fenster-Message-Hierarchie",
        "Schneller Wechsel im Sale-Zyklus",
      ],
    },
    impact: {
      vi: "Tăng stop-rate cửa sổ — người đi phố dừng lại.",
      de: "Höhere Schaufenster-Stop-Rate — Passanten bleiben stehen.",
    },
  },
  "pos-cnc": {
    features: {
      vi: [
        "Kệ / counter topper CNC acrylic–wood",
        "Logo 3D, display module",
        "Hierarchy POS: hero / promo / price",
        "Prototype nhanh + series nhỏ",
      ],
      de: [
        "Regale / Counter-Topper CNC Acryl–Holz",
        "3D-Logo, Display-Module",
        "POS-Hierarchie: Hero / Promo / Preis",
        "Rapid Prototype + Kleinserie",
      ],
    },
    impact: {
      vi: "POS rõ ràng → tăng basket size tại quầy.",
      de: "Klarer POS → größerer Warenkorb an der Kasse.",
    },
  },
  "pack-price": {
    features: {
      vi: [
        "Hệ túi / hộp / tem theo category",
        "Price tag hierarchy & shelf talker",
        "Unboxing moment shareable",
        "Print production + finish premium",
      ],
      de: [
        "Tüten / Boxen / Labels nach Kategorie",
        "Preis-Hierarchie & Shelf Talker",
        "Shareable Unboxing-Moment",
        "Premium-Druck & Veredelung",
      ],
    },
    impact: {
      vi: "Packaging = brand media — khách mang brand ra ngoài.",
      de: "Packaging als Markenmedium — Kunden tragen die Marke mit.",
    },
  },
  "retail-campaign": {
    features: {
      vi: [
        "Sale visual offline + online khớp",
        "Mini landing promo / email kit",
        "Social & ads size pack",
        "Timeline launch song song với POS",
      ],
      de: [
        "Sale-Visuals Offline + Online abgestimmt",
        "Mini-Promo-Landing / E-Mail-Kit",
        "Social- & Ad-Format-Pack",
        "Launch parallel zum POS-Rollout",
      ],
    },
    impact: {
      vi: "Campaign mùa chạy nhanh — POS và ads cùng một story.",
      de: "Saison-Kampagnen schnell — POS und Ads eine Story.",
    },
  },

  // ── Dental ──
  "medical-ci": {
    features: {
      vi: [
        "CI y tế sạch, tin cậy, thân thiện",
        "Iconography & illustration medical",
        "Tone of voice an toàn–rõ ràng",
        "Guideline cho web, print, biển",
      ],
      de: [
        "Klares, vertrauenswürdiges Medical-CI",
        "Medizinische Ikonografie",
        "Sicherer, verständlicher Ton",
        "Guidelines für Web, Print, Schilder",
      ],
    },
    impact: {
      vi: "Cảm nhận chuyên môn từ touchpoint đầu tiên.",
      de: "Professionalität ab dem ersten Touchpoint.",
    },
  },
  "clinic-sign": {
    features: {
      vi: [
        "Biển praxis outdoor + indoor",
        "Wayfinding phòng / WC / emergency",
        "Chuẩn quy định DE & readability",
        "CNC / print / acrylic durable",
      ],
      de: [
        "Praxis-Schilder outdoor + indoor",
        "Wegeleitung Räume / WC / Notfall",
        "DE-konform & gut lesbar",
        "CNC / Print / langlebiges Acryl",
      ],
    },
    impact: {
      vi: "Bệnh nhân tìm đúng praxis & phòng — giảm stress.",
      de: "Patienten finden Praxis & Räume — weniger Stress.",
    },
  },
  "patient-print": {
    features: {
      vi: [
        "Brochure dịch vụ / điều trị",
        "Aftercare card, form branded",
        "Info bảo hiểm dễ hiểu",
        "Print kit đồng bộ medical CI",
      ],
      de: [
        "Leistungs- / Behandlungsbroschüren",
        "Aftercare-Karten, Branded Forms",
        "Verständliche Kassen-Infos",
        "Print-Kit im Medical-CI",
      ],
    },
    impact: {
      vi: "Thông tin bệnh nhân rõ — ít hỏi lặp, trust cao hơn.",
      de: "Klare Patienteninfos — weniger Rückfragen, mehr Trust.",
    },
  },
  "trust-web": {
    features: {
      vi: [
        "Web dịch vụ, team, FAQ tin cậy",
        "CTA gọi / form / chỉ đường",
        "Google Business tối ưu local",
        "Review & social proof block",
      ],
      de: [
        "Leistungsweb, Team, Vertrauens-FAQ",
        "CTA Anruf / Formular / Route",
        "Optimiertes Google Business",
        "Reviews & Social-Proof-Blöcke",
      ],
    },
    impact: {
      vi: "Lead local chất lượng — Maps + web cùng funnel.",
      de: "Qualifizierte Local Leads — Maps + Web ein Funnel.",
    },
  },

  // ── Logistics ──
  "fleet-wrap": {
    features: {
      vi: [
        "Template wrap theo loại xe",
        "Guideline màu & logo placement",
        "Production files sẵn in / dán",
        "Scale multi-vehicle nhất quán",
      ],
      de: [
        "Wrap-Templates je Fahrzeugtyp",
        "Farb- & Logo-Placement-Guidelines",
        "Produktionsfertige Print-/Foliendaten",
        "Skalierbar über die ganze Flotte",
      ],
    },
    impact: {
      vi: "Mỗi xe = billboard di động brand nhất quán.",
      de: "Jedes Fahrzeug = konsistente mobile Billboard.",
    },
  },
  warehouse: {
    features: {
      vi: [
        "Zone / aisle / loading bay signs",
        "Safety boards ISO-style",
        "Material bền kho (alum, board)",
        "Layout định hướng nhân sự & khách",
      ],
      de: [
        "Zonen- / Gang- / Laderampen-Schilder",
        "ISO-ähnliche Safety-Boards",
        "Lagerfeste Materialien",
        "Orientierung für Team & Besucher",
      ],
    },
    impact: {
      vi: "Kho an toàn, định hướng tốt — giảm lỗi vận hành.",
      de: "Sichereres, klareres Lager — weniger Ops-Fehler.",
    },
  },
  "b2b-web": {
    features: {
      vi: [
        "Corporate site capabilities / cases",
        "Pitch brochure PDF export",
        "Contact / tender CTA rõ",
        "DE-first, professional tone",
      ],
      de: [
        "Corporate Site: Capabilities / Cases",
        "Pitch-Broschüre als PDF",
        "Klare Kontakt- / Tender-CTAs",
        "DE-first, professioneller Ton",
      ],
    },
    impact: {
      vi: "Pitch B2B chuyên nghiệp — web hỗ trợ sales cycle.",
      de: "Professioneller B2B-Pitch — Web stützt den Sales-Cycle.",
    },
  },
  "tender-mkt": {
    features: {
      vi: [
        "One-pager & LinkedIn creatives",
        "Template tender / proposal visual",
        "Local awareness B2B Berlin",
        "Asset pack tái dùng sales team",
      ],
      de: [
        "One-Pager & LinkedIn-Creatives",
        "Tender- / Proposal-Visual-Templates",
        "Lokale B2B-Sichtbarkeit Berlin",
        "Wiederverwendbares Sales-Asset-Pack",
      ],
    },
    impact: {
      vi: "Team sales có kit sẵn — tender ra nhanh, đồng brand.",
      de: "Sales-Team mit fertigem Kit — schnellere Tender on-brand.",
    },
  },

  // ── Enterprise ──
  "brand-system": {
    features: {
      vi: [
        "Logo, type, color, grid system",
        "Do / don't guidelines gọn SME",
        "File pack cho team & agency",
        "Áp dụng web, slide, biển, print",
      ],
      de: [
        "Logo, Type, Farbe, Raster",
        "Schlanke Do/Don't-Guidelines für KMU",
        "Datei-Pack für Team & Agentur",
        "Für Web, Deck, Schild, Print",
      ],
    },
    impact: {
      vi: "Một nguồn truth brand — hết lệch slide / web / biển.",
      de: "Eine Brand-Source-of-Truth — keine Drift mehr.",
    },
  },
  "office-brand": {
    features: {
      vi: [
        "Reception & logo wall acrylic/CNC",
        "Wayfinding meeting / zone",
        "Meeting room names + brand detail",
        "Office fit-out visual nhất quán",
      ],
      de: [
        "Empfang & Acryl/CNC-Logowand",
        "Wegeleitung Meeting / Zonen",
        "Meetingraum-Namen + Brand-Details",
        "Konsistentes Office Fit-out",
      ],
    },
    impact: {
      vi: "Văn phòng thể hiện đúng định vị khi khách tới.",
      de: "Büro zeigt die Positionierung beim Besuch.",
    },
  },
  "corp-web": {
    features: {
      vi: [
        "Site đa ngôn ngữ DE / EN / VI",
        "Cases, career, contact clear",
        "Performance & SEO corporate",
        "CMS / update-friendly structure",
      ],
      de: [
        "Mehrsprachige Site DE / EN / VI",
        "Cases, Karriere, klarer Kontakt",
        "Corporate Performance & SEO",
        "CMS- / update-freundliche Struktur",
      ],
    },
    impact: {
      vi: "Web tin cậy hỗ trợ sales, hiring và partner.",
      de: "Vertrauenswürdige Site für Sales, Hiring, Partner.",
    },
  },
  "sales-kit": {
    features: {
      vi: [
        "Pitch deck + one-pager template",
        "LinkedIn / social employer brand",
        "Email signature & stationery",
        "Print leave-behind đồng CI",
      ],
      de: [
        "Pitch Deck + One-Pager-Templates",
        "LinkedIn / Social Employer Brand",
        "E-Mail-Signatur & Stationery",
        "Print Leave-behind im CI",
      ],
    },
    impact: {
      vi: "Team dùng template thống nhất — brand scale nội bộ.",
      de: "Team nutzt einheitliche Templates — Marke skaliert intern.",
    },
  },
};

export function getPillarDepth(id: string): PillarDepth | undefined {
  return pillarDepth[id];
}
