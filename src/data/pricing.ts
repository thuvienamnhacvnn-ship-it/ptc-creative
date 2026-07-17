import type { PricingCategory } from "@/types";

/**
 * Giá tham khảo theo module — PTC Creative (Berlin)
 * Giá “từ” · báo giá chính thức sau brief (vật liệu / scope / lắp đặt / timeline)
 */
export const pricingCategories: PricingCategory[] = [
  {
    id: "web",
    title: { vi: "Website", de: "Website" },
    short: {
      vi: "Landing → corporate → platform: digital stack sẵn sàng chuyển đổi.",
      de: "Landing → Corporate → Platform: digitaler Stack für Conversion.",
    },
    icon: "Monitor",
    color: "#38bdf8",
    scopeNote: {
      vi: "Giá design + dev frontend; CMS/hosting/tên miền tính riêng nếu có.",
      de: "Design + Frontend-Dev; CMS/Hosting/Domain ggf. separat.",
    },
    drivers: {
      vi: ["Số trang / template", "i18n DE–VI–EN", "Integrations (booking, CRM)", "Motion & performance"],
      de: ["Seitenzahl / Templates", "i18n DE–VI–EN", "Integrationen (Booking, CRM)", "Motion & Performance"],
    },
    tiers: [
      {
        id: "web-starter",
        name: { vi: "Starter", de: "Starter" },
        priceFrom: "1.490",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Landing / one-page chuyên nghiệp cho SME ra mắt hoặc campaign.",
          de: "Professionelle Landing / One-Pager für KMU-Launch oder Kampagne.",
        },
        timeline: { vi: "2–3 tuần", de: "2–3 Wochen" },
        bestFor: {
          vi: "Pop-up, sự kiện, local service cần CTA rõ",
          de: "Pop-up, Events, Local Services mit klarem CTA",
        },
        features: {
          vi: [
            "1–5 sections, mobile-first",
            "Form liên hệ + anti-spam",
            "SEO cơ bản (meta, OG, sitemap)",
            "Analytics setup",
            "1 vòng sửa nội dung",
            "Bàn giao file + hướng dẫn",
          ],
          de: [
            "1–5 Sektionen, mobile-first",
            "Kontaktformular + Anti-Spam",
            "Basis-SEO (Meta, OG, Sitemap)",
            "Analytics-Setup",
            "1 Content-Korrekturschleife",
            "Übergabe + Kurzanleitung",
          ],
        },
      },
      {
        id: "web-business",
        name: { vi: "Business", de: "Business" },
        priceFrom: "3.900",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Corporate multi-page: UI custom, SEO technical, sẵn blog.",
          de: "Corporate Multipage: Custom UI, technisches SEO, Blog-ready.",
        },
        timeline: { vi: "3–6 tuần", de: "3–6 Wochen" },
        bestFor: {
          vi: "SME / Praxis / shop cần hiện diện tin cậy",
          de: "KMU / Praxis / Shop mit Vertrauenspräsenz",
        },
        features: {
          vi: [
            "6–12 trang (scope chốt brief)",
            "UI custom theo brand",
            "Blog / news ready",
            "SEO technical + schema",
            "Analytics + events",
            "2 vòng sửa design",
          ],
          de: [
            "6–12 Seiten (Scope im Brief)",
            "Custom UI nach Brand",
            "Blog / News ready",
            "Technisches SEO + Schema",
            "Analytics + Events",
            "2 Design-Korrekturen",
          ],
        },
        highlighted: true,
      },
      {
        id: "web-premium",
        name: { vi: "Premium", de: "Premium" },
        priceFrom: "7.500",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Website cao cấp: i18n, design system, motion, performance top.",
          de: "Premium-Site: i18n, Designsystem, Motion, Top-Performance.",
        },
        timeline: { vi: "6–10 tuần", de: "6–10 Wochen" },
        bestFor: {
          vi: "Brand flagship, multi-market, multi-language",
          de: "Flagship-Brand, Multi-Market, Mehrsprachig",
        },
        features: {
          vi: [
            "Page theo scope không giới hạn cứng",
            "i18n DE / EN / VI",
            "Motion design có kiểm soát",
            "Design system tokens",
            "Core Web Vitals ưu tiên",
            "Priority support 30 ngày",
          ],
          de: [
            "Seiten nach Scope",
            "i18n DE / EN / VI",
            "Kontrolliertes Motion Design",
            "Designsystem-Tokens",
            "Core Web Vitals priorisiert",
            "Priority Support 30 Tage",
          ],
        },
      },
    ],
  },
  {
    id: "print",
    title: { vi: "Print", de: "Print" },
    short: {
      vi: "Từ namecard đến packaging — print-ready, màu brand chuẩn DE.",
      de: "Von Visitenkarte bis Packaging — druckfertig, markentreu.",
    },
    icon: "Printer",
    color: "#fbbf24",
    scopeNote: {
      vi: "Giá design + prep file; số lượng in & giấy tính theo proof & volume.",
      de: "Design + Druckdaten; Auflage & Papier nach Proof & Volumen.",
    },
    drivers: {
      vi: ["Số SKU / trang", "Giấy & finish", "Số lượng in", "Veredelung (foil, spot UV)"],
      de: ["SKU / Seitenzahl", "Papier & Finish", "Auflage", "Veredelung (Folie, Spot-UV)"],
    },
    tiers: [
      {
        id: "print-starter",
        name: { vi: "Starter", de: "Starter" },
        priceFrom: "180",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Bộ card + flyer cơ bản — ra mắt nhanh, on-brand.",
          de: "Basis-Set Karten + Flyer — schnell, on-brand.",
        },
        timeline: { vi: "5–10 ngày", de: "5–10 Tage" },
        bestFor: {
          vi: "SME mới, event, handout local",
          de: "Neue KMU, Events, lokale Handouts",
        },
        features: {
          vi: [
            "Namecard design + file in",
            "Flyer A5 1 mặt / 2 mặt",
            "Print-ready CMYK + bleed",
            "1 vòng sửa",
            "Gợi ý giấy phổ biến DE",
          ],
          de: [
            "Visitenkarte Design + Druckdaten",
            "Flyer A5 ein-/zweiseitig",
            "Druckfertig CMYK + Beschnitt",
            "1 Korrekturschleife",
            "Papierempfehlung DE",
          ],
        },
      },
      {
        id: "print-business",
        name: { vi: "Business", de: "Business" },
        priceFrom: "650",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Brochure + ấn phẩm sales — hierarchy rõ, màu brand ổn định.",
          de: "Broschüre + Sales-Print — klare Hierarchie, stabile Markenfarbe.",
        },
        timeline: { vi: "2–4 tuần", de: "2–4 Wochen" },
        bestFor: {
          vi: "Pitch B2B, menu F&B, catalogue nhỏ",
          de: "B2B-Pitch, F&B-Menü, kleiner Katalog",
        },
        features: {
          vi: [
            "Brochure 8–12 trang",
            "Folder / cover system",
            "Quản lý màu brand",
            "2 vòng sửa",
            "Proof checklist trước in",
          ],
          de: [
            "Broschüre 8–12 Seiten",
            "Mappe / Cover-System",
            "Farbmanagement Marke",
            "2 Korrekturen",
            "Proof-Checkliste vor Druck",
          ],
        },
        highlighted: true,
      },
      {
        id: "print-premium",
        name: { vi: "Premium", de: "Premium" },
        priceFrom: "1.800",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Packaging + series ấn phẩm cao cấp, production management.",
          de: "Packaging + Premium-Serie mit Produktionsmanagement.",
        },
        timeline: { vi: "3–6 tuần", de: "3–6 Wochen" },
        bestFor: {
          vi: "Retail packaging, series multi-SKU",
          de: "Retail-Packaging, Multi-SKU-Serien",
        },
        features: {
          vi: [
            "Packaging design (dieline)",
            "Veredelung options",
            "Series asset kit",
            "Production management",
            "Supplier handoff DE",
          ],
          de: [
            "Packaging-Design (Dieline)",
            "Veredelungsoptionen",
            "Serien-Asset-Kit",
            "Produktionsmanagement",
            "Lieferanten-Übergabe DE",
          ],
        },
      },
    ],
  },
  {
    id: "signage",
    title: { vi: "Signage", de: "Signage" },
    short: {
      vi: "Biển, lightbox, wayfinding — nhìn thấy từ phố, chuẩn lắp Berlin.",
      de: "Schilder, Lightbox, Wegeleitung — straßensichtbar, Montage Berlin.",
    },
    icon: "Signpost",
    color: "#ff4d00",
    scopeNote: {
      vi: "Giá thiết kế + sản xuất cơ bản; survey phức tạp / scaffold / đêm tính riêng.",
      de: "Design + Basis-Fertigung; komplexes Survey / Gerüst / Nachtmontage extra.",
    },
    drivers: {
      vi: ["Kích thước & vật liệu", "LED / IP rating", "Chiều cao lắp", "Số điểm & wayfinding"],
      de: ["Maß & Material", "LED / IP-Klasse", "Montagehöhe", "Anzahl Punkte & Wegeleitung"],
    },
    tiers: [
      {
        id: "sign-starter",
        name: { vi: "Starter", de: "Starter" },
        priceFrom: "490",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Biển mica / aluminium cho cửa hàng nhỏ — rõ, bền, lắp nhanh.",
          de: "Acryl-/Alu-Schild für kleine Flächen — klar, robust, schnell montiert.",
        },
        timeline: { vi: "1–2 tuần", de: "1–2 Wochen" },
        bestFor: {
          vi: "Cửa nhỏ, indoor, bảng giờ / logo door",
          de: "Kleine Flächen, Indoor, Öffnungszeiten / Türlogo",
        },
        features: {
          vi: [
            "Thiết kế 2D + mockup",
            "Sản xuất 1 biển",
            "Lắp đặt cơ bản Berlin",
            "Bảo hành vật liệu (scope)",
          ],
          de: [
            "2D-Design + Mockup",
            "1 Schild Produktion",
            "Basis-Montage Berlin",
            "Materialgarantie (Scope)",
          ],
        },
      },
      {
        id: "sign-business",
        name: { vi: "Business", de: "Business" },
        priceFrom: "2.200",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Facade + lightbox / chữ nổi — đọc được từ vỉa hè ban đêm.",
          de: "Fassade + Leuchtkasten / 3D-Buchstaben — nachts vom Gehweg lesbar.",
        },
        timeline: { vi: "2–4 tuần", de: "2–4 Wochen" },
        bestFor: {
          vi: "Nhà hàng, nail, salon, shop mặt phố",
          de: "Restaurant, Nail, Salon, Ladenstraße",
        },
        features: {
          vi: [
            "Survey mặt tiền",
            "Mockup 3D",
            "Lightbox hoặc 3D letters",
            "Lắp đặt chuyên nghiệp",
            "File CNC / production",
          ],
          de: [
            "Fassaden-Survey",
            "3D-Mockup",
            "Leuchtkasten oder 3D-Buchstaben",
            "Profi-Montage",
            "CNC- / Produktionsdaten",
          ],
        },
        highlighted: true,
      },
      {
        id: "sign-premium",
        name: { vi: "Premium", de: "Premium" },
        priceFrom: "5.500",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Full wayfinding + exterior system multi-điểm.",
          de: "Volles Wegeleitsystem + Außenwerbung multi-Standort.",
        },
        timeline: { vi: "4–8 tuần", de: "4–8 Wochen" },
        bestFor: {
          vi: "Chuỗi, praxis, logistics, multi-zone",
          de: "Ketten, Praxen, Logistik, Multi-Zone",
        },
        features: {
          vi: [
            "Multi-location system map",
            "Indoor + outdoor wayfinding",
            "Lighting design",
            "Maintenance plan",
            "Phased install",
          ],
          de: [
            "Multi-Standort Systemkarte",
            "Indoor + Outdoor Wegeleitung",
            "Lichtkonzept",
            "Wartungsplan",
            "Phasen-Montage",
          ],
        },
      },
    ],
  },
  {
    id: "cnc",
    title: { vi: "CNC", de: "CNC" },
    short: {
      vi: "Gia công acrylic, alu, gỗ kỹ thuật — dung sai chặt, finish premium.",
      de: "Acryl, Alu, technisches Holz — enge Toleranzen, Premium-Oberfläche.",
    },
    icon: "Factory",
    color: "#409cff",
    scopeNote: {
      vi: "Giá theo chi tiết + vật liệu; series lớn / anodize phức tạp báo riêng.",
      de: "Preis nach Teil + Material; große Serie / komplexes Anodisieren separat.",
    },
    drivers: {
      vi: ["Vật liệu", "Độ phức tạp 2.5D/3D", "Số lượng", "Finish bề mặt"],
      de: ["Material", "Komplexität 2.5D/3D", "Stückzahl", "Oberfläche"],
    },
    tiers: [
      {
        id: "cnc-starter",
        name: { vi: "Prototype", de: "Prototype" },
        priceFrom: "120",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Prototype / 1–3 chi tiết nhỏ để chốt form & fit.",
          de: "Prototype / 1–3 Kleinteile für Form & Fit.",
        },
        timeline: { vi: "3–7 ngày", de: "3–7 Tage" },
        bestFor: {
          vi: "Test fit, mockup POS nhỏ",
          de: "Fit-Test, kleine POS-Mockups",
        },
        features: {
          vi: [
            "Phay / cắt laser theo file",
            "1–3 pcs acrylic hoặc gỗ",
            "Finish cơ bản",
            "Feedback fit",
          ],
          de: [
            "Fräsen / Laser nach Datei",
            "1–3 Stk Acryl oder Holz",
            "Basis-Finish",
            "Fit-Feedback",
          ],
        },
      },
      {
        id: "cnc-business",
        name: { vi: "Production", de: "Production" },
        priceFrom: "890",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Series nhỏ–vừa: display, kệ, logo 3D, module lắp.",
          de: "Klein- bis Mittelserie: Display, Regal, 3D-Logo, Module.",
        },
        timeline: { vi: "1–3 tuần", de: "1–3 Wochen" },
        bestFor: {
          vi: "POS, reception, logo wall module",
          de: "POS, Empfang, Logo-Wand-Module",
        },
        features: {
          vi: [
            "CAM + toolpath review",
            "Series 5–30 pcs (scope)",
            "Acrylic / alu / wood",
            "Finish mài / bóng",
            "QC dung sai",
          ],
          de: [
            "CAM + Toolpath-Review",
            "Serie 5–30 Stk (Scope)",
            "Acryl / Alu / Holz",
            "Schleifen / Polieren",
            "Toleranz-QC",
          ],
        },
        highlighted: true,
      },
      {
        id: "cnc-premium",
        name: { vi: "System", de: "System" },
        priceFrom: "2.800",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Hệ module CNC + lắp ráp — lặp lại ổn định multi-site.",
          de: "CNC-Modulsystem + Montage — wiederholbar multi-site.",
        },
        timeline: { vi: "3–6 tuần", de: "3–6 Wochen" },
        bestFor: {
          vi: "Chuỗi cửa hàng, system furniture display",
          de: "Ladenketten, Display-Systemmöbel",
        },
        features: {
          vi: [
            "Design for manufacture",
            "Module kit multi-location",
            "Assembly docs",
            "Material batch control",
            "Install support",
          ],
          de: [
            "Design for Manufacture",
            "Modul-Kit multi-Standort",
            "Montage-Dokumentation",
            "Material-Batch-Kontrolle",
            "Install-Support",
          ],
        },
      },
    ],
  },
  {
    id: "branding",
    title: { vi: "Branding", de: "Branding" },
    short: {
      vi: "Logo → CI → guideline — một nguồn truth cho print, biển, web.",
      de: "Logo → CI → Guidelines — eine Source of Truth für Print, Schild, Web.",
    },
    icon: "Palette",
    color: "#c084fc",
    scopeNote: {
      vi: "Giá creative + file pack; photoshoot / motion riêng nếu cần.",
      de: "Creative + Dateipack; Fotoshooting / Motion separat.",
    },
    drivers: {
      vi: ["Độ sâu research", "Số ứng dụng", "Ngôn ngữ (DE/VI)", "Photography direction"],
      de: ["Research-Tiefe", "Anzahl Anwendungen", "Sprachen (DE/VI)", "Foto-Richtung"],
    },
    tiers: [
      {
        id: "brand-starter",
        name: { vi: "Logo Kit", de: "Logo-Kit" },
        priceFrom: "690",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Logo + biến thể cơ bản + file sẵn dùng.",
          de: "Logo + Basisvarianten + einsatzfertige Dateien.",
        },
        timeline: { vi: "1–2 tuần", de: "1–2 Wochen" },
        bestFor: {
          vi: "Startup / shop mới cần nhận diện nhanh",
          de: "Startup / neuer Shop mit schneller ID",
        },
        features: {
          vi: [
            "Logo primary + mono",
            "Palette 3–5 màu",
            "Type pairing gợi ý",
            "File SVG / PNG / PDF",
            "1 vòng concept + 1 vòng tinh chỉnh",
          ],
          de: [
            "Logo primary + mono",
            "Palette 3–5 Farben",
            "Type-Pairing Vorschlag",
            "SVG / PNG / PDF",
            "1 Konzept + 1 Feinschliff",
          ],
        },
      },
      {
        id: "brand-business",
        name: { vi: "Identity", de: "Identity" },
        priceFrom: "2.400",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Full CI: logo system, stationery, social kit, guideline gọn.",
          de: "Volles CI: Logo-System, Stationery, Social-Kit, schlanke Guidelines.",
        },
        timeline: { vi: "3–5 tuần", de: "3–5 Wochen" },
        bestFor: {
          vi: "Rebrand SME, chuỗi nhỏ, praxis",
          de: "KMU-Rebrand, kleine Kette, Praxis",
        },
        features: {
          vi: [
            "Logo system + clear space",
            "Stationery (card, letter)",
            "Social avatar + cover",
            "Mini brand guideline (PDF)",
            "2 vòng design",
          ],
          de: [
            "Logo-System + Clear Space",
            "Stationery (Karte, Brief)",
            "Social Avatar + Cover",
            "Mini Brand Guidelines (PDF)",
            "2 Design-Runden",
          ],
        },
        highlighted: true,
      },
      {
        id: "brand-premium",
        name: { vi: "System", de: "System" },
        priceFrom: "5.900",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Brand system sâu: strategy lite, photo direction, multi-touch kit.",
          de: "Tiefes Brand-System: Strategy lite, Foto-Richtung, Multi-Touch-Kit.",
        },
        timeline: { vi: "5–8 tuần", de: "5–8 Wochen" },
        bestFor: {
          vi: "Scale multi-channel, multi-location",
          de: "Multi-Channel / Multi-Standort Scale",
        },
        features: {
          vi: [
            "Positioning workshop lite",
            "Full visual system",
            "Photo / art direction",
            "Template kit (deck, social)",
            "Do/don't + handoff team",
          ],
          de: [
            "Positioning Workshop lite",
            "Volles Visual System",
            "Foto- / Art Direction",
            "Template-Kit (Deck, Social)",
            "Do/Don't + Team-Handoff",
          ],
        },
      },
    ],
  },
  {
    id: "package",
    title: { vi: "Gói trọn", de: "Pakete" },
    short: {
      vi: "Stack online–offline một timeline — tiết kiệm hơn mua lẻ từng module.",
      de: "Online–Offline-Stack in einer Timeline — günstiger als Einzelmodule.",
    },
    icon: "Sparkles",
    color: "#34d399",
    scopeNote: {
      vi: "Gói gộp scope cố định; custom lớn chuyển sang báo giá dự án.",
      de: "Fester Scope im Paket; große Customs als Projektangebot.",
    },
    drivers: {
      vi: ["Số module gộp", "Địa điểm lắp", "Ngôn ngữ web", "Thời gian bàn giao"],
      de: ["Anzahl Module", "Montage-Standorte", "Web-Sprachen", "Lieferzeit"],
    },
    tiers: [
      {
        id: "pkg-starter",
        name: { vi: "Launch", de: "Launch" },
        priceFrom: "2.900",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Logo + card + biển cửa + landing — ra mắt gọn trong một sprint.",
          de: "Logo + Karten + Türschild + Landing — Launch in einem Sprint.",
        },
        timeline: { vi: "3–5 tuần", de: "3–5 Wochen" },
        bestFor: {
          vi: "Mở cửa hàng / soft open",
          de: "Neueröffnung / Soft Open",
        },
        features: {
          vi: [
            "Logo kit",
            "Namecard design + print file",
            "1 biển cửa cơ bản",
            "Landing page",
            "Social avatar kit",
            "1 PM đầu mối",
          ],
          de: [
            "Logo-Kit",
            "Visitenkarte + Druckdaten",
            "1 Basis-Türschild",
            "Landingpage",
            "Social-Avatar-Kit",
            "1 Ansprechpartner",
          ],
        },
      },
      {
        id: "pkg-growth",
        name: { vi: "Growth", de: "Growth" },
        priceFrom: "7.900",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Brand + web + facade signage + print — shop đang scale.",
          de: "Brand + Web + Fassade + Print — wachsender Shop.",
        },
        timeline: { vi: "5–8 tuần", de: "5–8 Wochen" },
        bestFor: {
          vi: "Rebrand + hiện diện phố + online",
          de: "Rebrand + Straßenpräsenz + Online",
        },
        features: {
          vi: [
            "Full CI (Identity tier)",
            "Corporate web (Business)",
            "Facade / lightbox scope Business",
            "Print set Business",
            "1 tháng content templates",
            "Kickoff + weekly sync",
          ],
          de: [
            "Volles CI (Identity)",
            "Corporate Web (Business)",
            "Fassade / Lightbox Business-Scope",
            "Print-Set Business",
            "1 Monat Content-Templates",
            "Kickoff + Weekly Sync",
          ],
        },
        highlighted: true,
      },
      {
        id: "pkg-flagship",
        name: { vi: "Flagship", de: "Flagship" },
        priceFrom: "15.000",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Chương trình brand 360° + production + marketing Q1.",
          de: "360°-Markenprogramm + Produktion + Marketing Q1.",
        },
        timeline: { vi: "8–12 tuần", de: "8–12 Wochen" },
        bestFor: {
          vi: "Flagship store / multi-module enterprise SME",
          de: "Flagship Store / Multi-Modul KMU",
        },
        features: {
          vi: [
            "Strategy + brand system",
            "Web premium / i18n",
            "CNC + signage system",
            "Marketing Q1 kit",
            "Dedicated PM",
            "QA + handoff checklist",
          ],
          de: [
            "Strategie + Brand-System",
            "Premium-Web / i18n",
            "CNC + Signage-System",
            "Marketing-Q1-Kit",
            "Dedizierter PM",
            "QA + Handoff-Checkliste",
          ],
        },
      },
    ],
  },
];

export function getPricingCategory(id: string) {
  return pricingCategories.find((c) => c.id === id);
}
