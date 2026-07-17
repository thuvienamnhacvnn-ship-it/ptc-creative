import type { IndustryItem } from "@/types";
import { industryMedia } from "@/data/industry-media";

function withMedia(
  slug: string,
  rest: Omit<
    IndustryItem,
    "mediaFolder" | "cover" | "gallery" | "video" | "videoPoster" | "slug"
  >
): IndustryItem {
  const m = industryMedia(slug);
  return {
    slug,
    ...rest,
    mediaFolder: m.folder,
    cover: m.cover,
    gallery: m.gallery,
    video: m.video,
    videoPoster: m.poster,
  };
}

/**
 * Giải pháp theo ngành — PTC Creative (Berlin)
 * Media local: public/media/solutions/{slug}/
 */
export const industries: IndustryItem[] = [
  withMedia("restaurant", {
    icon: "UtensilsCrossed",
    palette: "warm",
    color: "#f5b041",
    modules: ["branding", "menu", "signage", "website", "gmb", "marketing"],
    title: { vi: "Nhà hàng / F&B", de: "Restaurant / F&B" },
    short: {
      vi: "Menu, biển hiệu, không gian & online — trải nghiệm F&B nhất quán từ vỉa hè đến đặt bàn.",
      de: "Menü, Beschilderung, Raum & Online — konsistentes F&B vom Gehweg bis zur Reservierung.",
    },
    description: {
      vi: "Stack F&B cho Berlin: nhận diện, menu print–digital, biển mặt tiền/lightbox, website đặt bàn, Google Business và creative mùa vụ. Một hệ thống giúp nhà hàng nổi bật trên phố và chuyển đổi online.",
      de: "F&B-Stack für Berlin: Identität, Menü Print–Digital, Fassade/Lightbox, Reservierungs-Web, Google Business und Saison-Creatives. Ein System für Straßensichtbarkeit und Online-Conversion.",
    },
    painPoints: {
      vi: [
        "Biển mờ, khó nhận diện từ đường / ban đêm",
        "Menu in và digital không đồng bộ brand",
        "Website chậm, không mobile, thiếu đặt bàn",
        "Thiếu creative mùa vụ / set menu / event",
        "Google Maps & review không được chăm",
      ],
      de: [
        "Schwache Straßensichtbarkeit / nachts unsichtbar",
        "Inkonsistente Speisekarten Print & Digital",
        "Langsame Website ohne Reservierung",
        "Fehlende Saison- und Event-Creatives",
        "Google Maps & Reviews ungenutzt",
      ],
    },
    deliverables: {
      vi: [
        "Logo / brand refresh F&B",
        "Menu design + print + QR digital",
        "Biển mặt tiền, cửa kính, lightbox",
        "Website / landing đặt bàn",
        "GMB setup + social kit launch",
      ],
      de: [
        "Logo / Brand-Refresh F&B",
        "Menü Design + Druck + QR Digital",
        "Fassade, Fenster, Lightbox",
        "Website / Reservierungs-Landing",
        "GMB Setup + Social-Kit Launch",
      ],
    },
    package: {
      vi: "Stack Restaurant: nhận diện + menu + signage + web trong một timeline — brief → mockup → sản xuất → launch.",
      de: "Restaurant-Stack: Identität + Menü + Signage + Web in einem Timeline — Brief → Mockup → Fertigung → Launch.",
    },
    timeline: {
      vi: "3–6 tuần (tùy scope biển & web)",
      de: "3–6 Wochen (je nach Schilder- & Web-Scope)",
    },
    idealFor: {
      vi: ["Nhà hàng mới mở", "Rebrand F&B", "Chuỗi 2–5 điểm", "Pop-up / concept store ẩm thực"],
      de: ["Neueröffnung", "F&B-Rebrand", "2–5 Standorte", "Food-Pop-up / Concept"],
    },
    outcomes: {
      vi: [
        "Nhận diện đường phố rõ hơn 20–40m",
        "Menu & brand đồng bộ mọi touchpoint",
        "Tăng booking / walk-in qua web + Maps",
        "Campaign mùa vụ chạy nhanh hơn",
      ],
      de: [
        "Bessere Sichtbarkeit 20–40 m",
        "Menü & Marke an allen Touchpoints",
        "Mehr Buchungen über Web + Maps",
        "Schnellere Saison-Kampagnen",
      ],
    },
    solutions: [
      {
        id: "identity-menu",
        title: { vi: "Brand & Menu System", de: "Brand- & Menü-System" },
        desc: {
          vi: "Logo, palette, typography F&B; menu à la carte / set / drinks đồng bộ print và QR tablet.",
          de: "Logo, Palette, F&B-Typografie; Speisekarten (à la carte / Set / Drinks) Print + QR.",
        },
        services: ["branding", "printing"],
      },
      {
        id: "facade-signage",
        title: { vi: "Mặt tiền & Werbetechnik", de: "Fassade & Werbetechnik" },
        desc: {
          vi: "Chữ nổi, lightbox, decal cửa, bảng giờ mở cửa — tối ưu góc nhìn và quy định Berlin.",
          de: "3D-Buchstaben, Lightbox, Fensterfolie, Öffnungszeiten — Sichtlinien & Berliner Vorgaben.",
        },
        services: ["werbetechnik", "cnc-manufacturing"],
      },
      {
        id: "digital-booking",
        title: { vi: "Web đặt bàn & Local SEO", de: "Reservierungs-Web & Local SEO" },
        desc: {
          vi: "Landing/website mobile-first, CTA đặt bàn, Google Business, schema local.",
          de: "Mobile-first Website, Reservierungs-CTA, Google Business, Local Schema.",
        },
        services: ["website", "marketing"],
      },
      {
        id: "seasonal-growth",
        title: { vi: "Creative mùa vụ & Ads", de: "Saison-Creatives & Ads" },
        desc: {
          vi: "Bộ visual launch, event, happy hour; template social + retargeting local.",
          de: "Launch-, Event- und Happy-Hour-Visuals; Social-Templates + Local Retargeting.",
        },
        services: ["marketing", "branding"],
      },
    ],
  }),

  withMedia("nail", {
    icon: "Sparkles",
    palette: "rose",
    color: "#ff6bb5",
    modules: ["branding", "menu", "signage", "booking", "gmb", "marketing"],
    title: { vi: "Nail Studio", de: "Nagelstudio" },
    short: {
      vi: "Aesthetic premium: không gian, lightbox, price board và booking web — online–offline một look.",
      de: "Premium-Ästhetik: Raum, Lightbox, Preistafel und Buchungsweb — Online–Offline ein Look.",
    },
    description: {
      vi: "Nail studio cạnh tranh bằng visual. PTC dựng brand kit, biển sáng, bảng giá, website booking và feed Instagram khớp không gian thật tại Berlin.",
      de: "Nagelstudios gewinnen über Visuals. PTC liefert Brand-Kit, Leuchtschilder, Preistafel, Buchungsweb und Instagram-Feed passend zum Studio in Berlin.",
    },
    painPoints: {
      vi: [
        "Look generic — khó premium pricing",
        "Biển nhỏ, thiếu lightbox ban đêm",
        "Đặt lịch rối / chỉ inbox Instagram",
        "Instagram đẹp nhưng offline lệch brand",
        "Price list in kém, hay lỗi thời",
      ],
      de: [
        "Generischer Look — schwer Premium-Preise",
        "Kleine Schilder ohne Licht",
        "Buchung nur über Instagram-DM",
        "Instagram ≠ Studio vor Ort",
        "Veraltete Preisliste",
      ],
    },
    deliverables: {
      vi: [
        "Brand kit aesthetic",
        "Lightbox / neon / chữ mica",
        "Price board + service menu",
        "Booking website",
        "Social templates theo season",
      ],
      de: [
        "Aesthetic Brand-Kit",
        "Lightbox / Neon / Acryl-Schrift",
        "Preistafel + Service-Menü",
        "Buchungswebsite",
        "Saisonale Social-Templates",
      ],
    },
    package: {
      vi: "Stack Nail: aesthetic online–offline trong 3–5 tuần.",
      de: "Nail-Stack: Online-Offline-Ästhetik in 3–5 Wochen.",
    },
    timeline: {
      vi: "3–5 tuần",
      de: "3–5 Wochen",
    },
    idealFor: {
      vi: ["Nail studio mới", "Nâng cấp premium", "Studio trong mall / phố thương mại"],
      de: ["Neues Studio", "Premium-Upgrade", "Mall / Einkaufsstraße"],
    },
    outcomes: {
      vi: [
        "Vibe premium hỗ trợ tăng giá dịch vụ",
        "Booking 24/7 giảm tin nhắn lặp",
        "Feed & cửa hàng cùng một ngôn ngữ hình",
        "Biển sáng tăng walk-in buổi tối",
      ],
      de: [
        "Premium-Wahrnehmung stützt Preise",
        "24/7-Buchung, weniger DMs",
        "Feed und Studio eine Bildsprache",
        "Lichtschilder für Abend-Walk-ins",
      ],
    },
    solutions: [
      {
        id: "beauty-ci",
        title: { vi: "Beauty CI & Mood", de: "Beauty-CI & Mood" },
        desc: {
          vi: "Palette, type, pattern, photography direction cho nail / beauty.",
          de: "Palette, Type, Pattern, Foto-Richtung für Nail / Beauty.",
        },
        services: ["branding"],
      },
      {
        id: "glow-signage",
        title: { vi: "Glow Signage", de: "Glow-Signage" },
        desc: {
          vi: "Lightbox, neon flex, bảng mica sáng — signature điểm mặt tiền.",
          de: "Lightbox, Neon-Flex, Acryl-Leuchttafeln — Signature an der Fassade.",
        },
        services: ["werbetechnik", "cnc-manufacturing"],
      },
      {
        id: "booking-web",
        title: { vi: "Booking Platform", de: "Buchungsplattform" },
        desc: {
          vi: "Web đặt lịch, service menu, portfolio nail art, tích hợp Maps.",
          de: "Online-Buchung, Service-Menü, Nail-Art-Portfolio, Maps-Anbindung.",
        },
        services: ["website"],
      },
      {
        id: "content-system",
        title: { vi: "Content & Launch Kit", de: "Content- & Launch-Kit" },
        desc: {
          vi: "Template IG/TikTok, before-after frame, promo opening.",
          de: "IG/TikTok-Templates, Before-After-Frames, Opening-Promo.",
        },
        services: ["marketing", "branding"],
      },
    ],
  }),

  withMedia("salon", {
    icon: "Scissors",
    palette: "soft",
    color: "#c77dff",
    modules: ["branding", "print", "wayfinding", "website", "marketing"],
    title: { vi: "Salon / Spa", de: "Salon / Spa" },
    short: {
      vi: "Không gian thư giãn, brand mềm, wayfinding trong tiệm và marketing retention.",
      de: "Wohlfühlräume, sanfte Marke, Indoor-Wegeleitung und Retention-Marketing.",
    },
    description: {
      vi: "Hair salon & spa: CI dịu, signage nội thất, brochure/service menu, website đặt lịch và chiến dịch giữ chân khách tại Đức.",
      de: "Hair & Spa: ruhige Identität, Indoor-Signage, Broschüren/Service-Menü, Buchungsweb und Retention in DE.",
    },
    painPoints: {
      vi: [
        "Không gian thiếu điểm nhấn brand",
        "Brochure / menu dịch vụ lỗi thời",
        "Khó upsell gói treatment",
        "Local SEO & review yếu",
        "Khách mới khó hiểu flow trong spa",
      ],
      de: [
        "Raum ohne Markenpräsenz",
        "Veraltete Broschüren / Menüs",
        "Upsells schwierig",
        "Schwaches Local SEO",
        "Gäste finden den Flow nicht",
      ],
    },
    deliverables: {
      vi: [
        "CI mềm / spa identity",
        "Indoor signage & wayfinding",
        "Service menu + print kit",
        "Website / booking",
        "Google Business + email/SMS template",
      ],
      de: [
        "Weiches Spa-CI",
        "Indoor-Signage & Wegeleitung",
        "Service-Menü + Print-Kit",
        "Website / Buchung",
        "Google Business + CRM-Templates",
      ],
    },
    package: {
      vi: "Stack Salon: brand + print + digital premium.",
      de: "Salon-Stack: Brand + Print + Digital Premium.",
    },
    timeline: {
      vi: "4–7 tuần",
      de: "4–7 Wochen",
    },
    idealFor: {
      vi: ["Hair salon", "Day spa", "Nail & hair combo", "Wellness studio"],
      de: ["Friseursalon", "Day Spa", "Nail & Hair Combo", "Wellness-Studio"],
    },
    outcomes: {
      vi: [
        "Trải nghiệm khách mượt hơn trong không gian",
        "Tăng average ticket qua menu/upsell",
        "Booking online ổn định",
        "Brand spa nhất quán offline–online",
      ],
      de: [
        "Flüssigeres Gästeerlebnis",
        "Höherer Average Ticket",
        "Stabile Online-Buchungen",
        "Konsistente Spa-Marke",
      ],
    },
    solutions: [
      {
        id: "soft-brand",
        title: { vi: "Soft Brand System", de: "Soft-Brand-System" },
        desc: {
          vi: "Identity dịu, photography, packaging nhỏ (card, pouch).",
          de: "Ruhige Identität, Fotografie, Klein-Packaging (Karte, Pouch).",
        },
        services: ["branding", "printing"],
      },
      {
        id: "spatial-sign",
        title: { vi: "Spatial Signage", de: "Raum-Signage" },
        desc: {
          vi: "Wayfinding phòng, reception desk, treatment zone labels.",
          de: "Raum-Wegeleitung, Empfang, Treatment-Zonen.",
        },
        services: ["werbetechnik", "cnc-manufacturing"],
      },
      {
        id: "service-menu",
        title: { vi: "Service Menu & Print", de: "Service-Menü & Print" },
        desc: {
          vi: "Bảng giá, brochure gói, loyalty card.",
          de: "Preise, Paket-Broschüren, Loyalty-Karte.",
        },
        services: ["printing", "branding"],
      },
      {
        id: "retention",
        title: { vi: "Web & Retention", de: "Web & Retention" },
        desc: {
          vi: "Booking site, review loop, remarketing soft cho spa.",
          de: "Buchungsweb, Review-Loop, sanftes Spa-Remarketing.",
        },
        services: ["website", "marketing"],
      },
    ],
  }),

  withMedia("shop", {
    icon: "ShoppingBag",
    palette: "cool",
    color: "#3dc4ff",
    modules: ["branding", "cnc", "signage", "website", "marketing"],
    title: { vi: "Shop / Retail", de: "Shop / Retail" },
    short: {
      vi: "POS, biển, packaging — conversion từ vỉa hè đến quầy thanh toán.",
      de: "POS, Schilder, Packaging — Conversion vom Gehweg bis zur Kasse.",
    },
    description: {
      vi: "Retail visual merchandising: facade, window, POS CNC, price tags, packaging và campaign sale — tối ưu chuyển đổi tại điểm bán Berlin.",
      de: "Retail Visual Merchandising: Fassade, Schaufenster, CNC-POS, Preisschilder, Packaging und Sale-Kampagnen für Conversion am POS.",
    },
    painPoints: {
      vi: [
        "Mặt tiền / cửa sổ yếu",
        "POS lộn xộn, thiếu hierarchy",
        "Packaging không memorable",
        "Thiếu campaign visual sale/season",
        "Web shop & offline brand lệch",
      ],
      de: [
        "Schwache Fassade / Schaufenster",
        "Unruhiger POS ohne Hierarchie",
        "Austauschbares Packaging",
        "Fehlende Sale-/Saison-Visuals",
        "Online-Shop ≠ Offline-Marke",
      ],
    },
    deliverables: {
      vi: [
        "Facade & window graphics",
        "POS CNC / display",
        "Price tags & shelf talkers",
        "Packaging system",
        "Campaign assets + landing",
      ],
      de: [
        "Fassade & Fensterfolien",
        "POS CNC / Display",
        "Preisschilder & Shelf Talker",
        "Packaging-System",
        "Kampagnen-Assets + Landing",
      ],
    },
    package: {
      vi: "Stack Retail: từ vỉa hè đến quầy.",
      de: "Retail-Stack: von der Straße bis zur Kasse.",
    },
    timeline: {
      vi: "3–8 tuần (campaign có thể song song)",
      de: "3–8 Wochen (Kampagnen parallel möglich)",
    },
    idealFor: {
      vi: ["Boutique", "Convenience / specialty shop", "Pop-up retail", "Chuỗi nhỏ"],
      de: ["Boutique", "Specialty Shop", "Retail-Pop-up", "Kleine Kette"],
    },
    outcomes: {
      vi: [
        "Tăng stop-rate cửa sổ",
        "POS rõ → tăng basket size",
        "Packaging hỗ trợ unboxing & share",
        "Campaign launch nhanh theo mùa",
      ],
      de: [
        "Höhere Schaufenster-Stop-Rate",
        "Klarer POS → größerer Warenkorb",
        "Packaging für Unboxing & Share",
        "Schnellere Saison-Kampagnen",
      ],
    },
    solutions: [
      {
        id: "facade-window",
        title: { vi: "Facade & Window", de: "Fassade & Fenster" },
        desc: {
          vi: "Decal, vinyl, hanging mobile, seasonal window story.",
          de: "Folie, Vinyl, Hängeelemente, saisonale Schaufenster-Story.",
        },
        services: ["werbetechnik", "printing"],
      },
      {
        id: "pos-cnc",
        title: { vi: "POS CNC & Display", de: "POS CNC & Display" },
        desc: {
          vi: "Kệ, counter topper, logo 3D, acrylic stands.",
          de: "Regale, Counter-Topper, 3D-Logo, Acryl-Ständer.",
        },
        services: ["cnc-manufacturing", "branding"],
      },
      {
        id: "pack-price",
        title: { vi: "Packaging & Price System", de: "Packaging & Preissystem" },
        desc: {
          vi: "Túi, hộp, tem, price hierarchy theo category.",
          de: "Tüten, Boxen, Labels, Preis-Hierarchie nach Kategorie.",
        },
        services: ["printing", "branding"],
      },
      {
        id: "retail-campaign",
        title: { vi: "Retail Campaign + Web", de: "Retail-Kampagne + Web" },
        desc: {
          vi: "Sale visual, email/social, mini landing promo.",
          de: "Sale-Visuals, E-Mail/Social, Mini-Promo-Landing.",
        },
        services: ["marketing", "website"],
      },
    ],
  }),

  withMedia("dental", {
    icon: "HeartPulse",
    palette: "clinical",
    color: "#2ee6c8",
    modules: ["branding", "wayfinding", "print", "website", "gmb"],
    title: { vi: "Nha khoa / Praxis", de: "Zahnarztpraxis" },
    short: {
      vi: "Trust, sạch, chuyên nghiệp — medical brand, wayfinding và local presence.",
      de: "Vertrauen, Klarheit — Medical Brand, Wegeleitung und Local Presence.",
    },
    description: {
      vi: "Phòng khám nha khoa / y tế: CI y tế tin cậy, biển & wayfinding, brochure bệnh nhân, website dịch vụ và Google Business tối ưu tìm kiếm local tại Đức.",
      de: "Zahn- / Arztpraxis: vertrauenswürdiges Medical-CI, Schilder & Wegeleitung, Patienten-Broschüren, Service-Web und Local Google Business in DE.",
    },
    painPoints: {
      vi: [
        "Website không tạo cảm giác tin cậy",
        "Khó tìm biển / lối vào praxis",
        "Print rời rạc, form & brochure cũ",
        "Yếu local search & review",
        "Thông tin dịch vụ / bảo hiểm khó hiểu",
      ],
      de: [
        "Website ohne Vertrauen",
        "Praxis schwer findbar",
        "Inkonsistente Printmedien",
        "Schwache Local Search",
        "Leistungen / Kasse unklar kommuniziert",
      ],
    },
    deliverables: {
      vi: [
        "Medical CI",
        "Outdoor + indoor signage",
        "Wayfinding phòng",
        "Service website + team pages",
        "Patient print kit",
      ],
      de: [
        "Medical CI",
        "Outdoor- + Indoor-Signage",
        "Raum-Wegeleitung",
        "Service-Website + Team",
        "Patienten-Print-Kit",
      ],
    },
    package: {
      vi: "Stack Dental: trust 360° — từ cửa đến web.",
      de: "Dental-Stack: 360° Vertrauen — von der Tür bis zum Web.",
    },
    timeline: {
      vi: "4–8 tuần",
      de: "4–8 Wochen",
    },
    idealFor: {
      vi: ["Zahnarztpraxis", "Phòng khám đa khoa nhỏ", "Orthodontie", "Praxis mới / chuyển địa điểm"],
      de: ["Zahnarztpraxis", "Kleine Gemeinschaftspraxis", "KFO", "Neupraxis / Umzug"],
    },
    outcomes: {
      vi: [
        "Tăng cảm nhận chuyên môn & tin cậy",
        "Bệnh nhân tìm đúng lối / phòng",
        "Lead form & gọi điện rõ CTA",
        "Maps ranking local tốt hơn",
      ],
      de: [
        "Mehr Professionalität & Vertrauen",
        "Patienten finden Räume leichter",
        "Klare CTAs für Anruf / Formular",
        "Besseres Local Ranking",
      ],
    },
    solutions: [
      {
        id: "medical-ci",
        title: { vi: "Medical Brand System", de: "Medical-Brand-System" },
        desc: {
          vi: "CI sạch, iconography y tế, tone of voice an toàn–thân thiện.",
          de: "Klares CI, medizinische Ikonografie, sicherer–freundlicher Ton.",
        },
        services: ["branding"],
      },
      {
        id: "clinic-sign",
        title: { vi: "Clinic Signage & Wayfinding", de: "Praxis-Signage & Wegeleitung" },
        desc: {
          vi: "Biển praxis, phòng, vệ sinh, emergency — chuẩn DE.",
          de: "Praxisschilder, Räume, WC, Notfall — DE-konform.",
        },
        services: ["werbetechnik", "cnc-manufacturing"],
      },
      {
        id: "patient-print",
        title: { vi: "Patient Print Kit", de: "Patienten-Print-Kit" },
        desc: {
          vi: "Brochure dịch vụ, aftercare card, form branded.",
          de: "Leistungsbroschüren, Aftercare-Karten, Branded Forms.",
        },
        services: ["printing"],
      },
      {
        id: "trust-web",
        title: { vi: "Trust Website & GMB", de: "Trust-Website & GMB" },
        desc: {
          vi: "Web dịch vụ, team, FAQ bảo hiểm; Google Business tối ưu.",
          de: "Leistungsweb, Team, Kassen-FAQ; optimiertes Google Business.",
        },
        services: ["website", "marketing"],
      },
    ],
  }),

  withMedia("logistics", {
    icon: "Truck",
    palette: "industrial",
    color: "#8b95ff",
    modules: ["branding", "wrap", "website", "print", "marketing"],
    title: { vi: "Logistics / Fleet", de: "Logistik / Flotte" },
    short: {
      vi: "Fleet wrap, safety signage, B2B web — brand vận hành rõ và chuyên nghiệp.",
      de: "Flottenfolierung, Safety-Signage, B2B-Web — klare operative Marke.",
    },
    description: {
      vi: "Doanh nghiệp logistics & vận tải: hệ fleet wrap, biển kho, safety boards, brochure B2B và corporate website pitch khách lớn tại Đức.",
      de: "Logistik & Transport: Flotten-Wrap, Lagerbeschilderung, Safety-Boards, B2B-Broschüren und Corporate Web für Großkunden in DE.",
    },
    painPoints: {
      vi: [
        "Fleet không đồng bộ brand",
        "Kho thiếu wayfinding / safety",
        "Web B2B yếu, khó pitch",
        "Brochure & proposal trông nghiệp dư",
        "Thiếu template marketing tender",
      ],
      de: [
        "Inkonsistente Flotte",
        "Lager ohne Wegeleitung / Safety",
        "Schwache B2B-Website",
        "Unprofessionelle Broschüren",
        "Keine Tender-Marketing-Templates",
      ],
    },
    deliverables: {
      vi: [
        "Fleet wrap system (multi-vehicle)",
        "Warehouse signage",
        "Safety boards",
        "B2B website",
        "Pitch brochure / one-pager",
      ],
      de: [
        "Flotten-Wrap (Mehrfahrzeug)",
        "Lager-Signage",
        "Safety-Boards",
        "B2B-Website",
        "Pitch-Broschüre / One-Pager",
      ],
    },
    package: {
      vi: "Stack Logistics: brand vận hành từ xe → kho → web.",
      de: "Logistik-Stack: operative Marke Flotte → Lager → Web.",
    },
    timeline: {
      vi: "4–10 tuần (fleet theo số xe)",
      de: "4–10 Wochen (Flotte nach Fahrzeugzahl)",
    },
    idealFor: {
      vi: ["Công ty vận tải", "Last-mile", "Kho / fulfillment", "Fleet SME"],
      de: ["Spedition", "Last-Mile", "Lager / Fulfillment", "KMU-Flotte"],
    },
    outcomes: {
      vi: [
        "Fleet = billboard di động nhất quán",
        "An toàn & định hướng trong kho tốt hơn",
        "Pitch B2B chuyên nghiệp hơn",
        "Web hỗ trợ lead doanh nghiệp",
      ],
      de: [
        "Flotte als konsistente mobile Billboard",
        "Bessere Safety & Orientierung im Lager",
        "Professionellere B2B-Pitches",
        "Web generiert Business-Leads",
      ],
    },
    solutions: [
      {
        id: "fleet-wrap",
        title: { vi: "Fleet Wrap System", de: "Flotten-Wrap-System" },
        desc: {
          vi: "Template wrap theo loại xe, guideline màu, production files.",
          de: "Wrap-Templates je Fahrzeugtyp, Farb-Guidelines, Produktionsdaten.",
        },
        services: ["werbetechnik", "branding"],
      },
      {
        id: "warehouse",
        title: { vi: "Warehouse & Safety Signage", de: "Lager- & Safety-Signage" },
        desc: {
          vi: "Zone, aisle, safety ISO-style boards, loading bay.",
          de: "Zonen, Gänge, Safety-Boards, Laderampen.",
        },
        services: ["werbetechnik", "printing"],
      },
      {
        id: "b2b-web",
        title: { vi: "B2B Website & Pitch", de: "B2B-Website & Pitch" },
        desc: {
          vi: "Corporate site, case/capability, brochure PDF.",
          de: "Corporate Site, Capabilities, Pitch-PDF.",
        },
        services: ["website", "printing"],
      },
      {
        id: "tender-mkt",
        title: { vi: "Tender & Local Marketing", de: "Tender- & Local Marketing" },
        desc: {
          vi: "One-pager, LinkedIn/B2B creatives, local awareness.",
          de: "One-Pager, LinkedIn/B2B-Creatives, lokale Sichtbarkeit.",
        },
        services: ["marketing", "branding"],
      },
    ],
  }),

  withMedia("enterprise", {
    icon: "Building2",
    palette: "graphite",
    color: "#a8b8d0",
    modules: ["branding", "website", "print", "marketing", "cnc"],
    title: { vi: "Doanh nghiệp / SME", de: "Unternehmen / KMU" },
    short: {
      vi: "SME & B2B: identity, office branding, corporate web và sales kit.",
      de: "KMU & B2B: Identität, Office-Branding, Corporate Web und Sales-Kit.",
    },
    description: {
      vi: "Doanh nghiệp vừa và nhỏ tại Đức: brand system gọn, office signage, website tin cậy, stationery và sales deck — professionalize toàn bộ điểm chạm trong một chương trình.",
      de: "KMU in DE: schlankes Brand-System, Office-Signage, vertrauenswürdige Website, Stationery und Sales Deck — alle Touchpoints in einem Programm.",
    },
    painPoints: {
      vi: [
        "Brand rời rạc giữa slide, web, biển",
        "Văn phòng thiếu CI / reception yếu",
        "Website lỗi thời",
        "Sales deck & proposal yếu",
        "Social / hiring brand không rõ",
      ],
      de: [
        "Zersplitterte Marke (Deck, Web, Schild)",
        "Büro ohne CI / schwacher Empfang",
        "Veraltete Website",
        "Schwache Sales Decks",
        "Unklare Employer / Social Brand",
      ],
    },
    deliverables: {
      vi: [
        "Brand system & guidelines",
        "Office signage / reception",
        "Corporate website",
        "Stationery + templates",
        "Sales & social kit",
      ],
      de: [
        "Brand-System & Guidelines",
        "Büro-Signage / Empfang",
        "Corporate Website",
        "Geschäftsausstattung + Templates",
        "Sales- & Social-Kit",
      ],
    },
    package: {
      vi: "Stack Enterprise SME: professionalize brand một chương trình.",
      de: "KMU-Stack: Marke professionalisieren in einem Programm.",
    },
    timeline: {
      vi: "5–10 tuần",
      de: "5–10 Wochen",
    },
    idealFor: {
      vi: ["SME Berlin / DE", "Startup scale", "B2B services", "Office fit-out branding"],
      de: ["KMU Berlin / DE", "Scale-up", "B2B-Services", "Office Fit-out Branding"],
    },
    outcomes: {
      vi: [
        "Một nguồn truth cho brand",
        "Văn phòng thể hiện đúng định vị",
        "Web hỗ trợ sales & hiring",
        "Team dùng template thống nhất",
      ],
      de: [
        "Eine Brand-Source-of-Truth",
        "Büro spiegelt Positionierung",
        "Web stützt Sales & Hiring",
        "Team nutzt einheitliche Templates",
      ],
    },
    solutions: [
      {
        id: "brand-system",
        title: { vi: "Brand System", de: "Brand-System" },
        desc: {
          vi: "Logo, type, color, grid, do/don't guidelines.",
          de: "Logo, Type, Farbe, Raster, Do/Don't-Guidelines.",
        },
        services: ["branding"],
      },
      {
        id: "office-brand",
        title: { vi: "Office Branding", de: "Office-Branding" },
        desc: {
          vi: "Reception, wayfinding, meeting room names, acrylic logo wall.",
          de: "Empfang, Wegeleitung, Meetingräume, Acryl-Logowand.",
        },
        services: ["cnc-manufacturing", "werbetechnik"],
      },
      {
        id: "corp-web",
        title: { vi: "Corporate Website", de: "Corporate Website" },
        desc: {
          vi: "Site đa ngôn ngữ (DE/EN/VI), case, career, contact.",
          de: "Mehrsprachige Site (DE/EN/VI), Cases, Karriere, Kontakt.",
        },
        services: ["website"],
      },
      {
        id: "sales-kit",
        title: { vi: "Sales & Marketing Kit", de: "Sales- & Marketing-Kit" },
        desc: {
          vi: "Pitch deck, one-pager, LinkedIn/social, email signature.",
          de: "Pitch Deck, One-Pager, LinkedIn/Social, E-Mail-Signatur.",
        },
        services: ["marketing", "printing", "branding"],
      },
    ],
  }),
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
