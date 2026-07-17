import type { ServiceItem } from "@/types";

export const services: ServiceItem[] = [
  {
    slug: "cnc-manufacturing",
    icon: "Factory",
    visual: "cnc",
    color: "#409cff",
    cover: "/media/services/cnc/cnc.png",
    gallery: [
      "/media/services/cnc/cnc.png",
      "/media/services/cnc/cover.png",
    ],
    specs: ["TOL ±0.2mm", "ACRYL / ALU / WOOD", "2.5D–3D"],
    title: { vi: "CNC & Manufacturing", de: "CNC & Manufacturing" },
    short: {
      vi: "Gia công CNC chính xác: acrylic, kim loại, gỗ kỹ thuật, chi tiết custom.",
      de: "Präzise CNC-Fertigung: Acryl, Metall, technische Hölzer, Custom-Teile.",
    },
    description: {
      vi: "Xưởng CNC của PTC Creative sản xuất chi tiết và sản phẩm display với dung sai chặt, bề mặt hoàn thiện cao cấp — phù hợp biển hiệu, POS, nội thất thương mại và prototype.",
      de: "Unsere CNC-Fertigung liefert Display- und Bauteile mit engen Toleranzen und Premium-Oberflächen — ideal für Beschilderung, POS, Ladenbau und Prototypen.",
    },
    capabilities: {
      vi: [
        "Phay CNC 2.5D / 3D",
        "Cắt laser acrylic & kim loại mỏng",
        "Gia công nhôm, inox, nhựa kỹ thuật",
        "Hoàn thiện: mài, đánh bóng, anodize hỗ trợ",
        "Prototype nhanh & series nhỏ–vừa",
        "Lắp ráp module display / kệ / khung",
      ],
      de: [
        "CNC-Fräsen 2.5D / 3D",
        "Laserschneiden Acryl & dünnes Metall",
        "Aluminium, Edelstahl, technische Kunststoffe",
        "Oberflächen: Schleifen, Polieren, Anodisieren",
        "Rapid Prototyping & Kleinserien",
        "Montage Display-Module / Regale / Rahmen",
      ],
    },
    benefits: {
      vi: [
        "Đúng kích thước, lặp lại ổn định",
        "Vật liệu phù hợp môi trường trong/ngoài trời",
        "Tối ưu chi phí theo số lượng",
        "Phối hợp thiết kế–sản xuất một đội",
      ],
      de: [
        "Maßgenau & wiederholbar",
        "Materialwahl für Innen/Außen",
        "Kostenoptimierung nach Menge",
        "Design & Fertigung aus einer Hand",
      ],
    },
    submenu: [
      { slug: "cnc-holz", title: { vi: "CNC Holz", de: "CNC Holz" } },
      { slug: "acrylic", title: { vi: "Acrylic", de: "Acryl" } },
      { slug: "laser", title: { vi: "Laser", de: "Laser" } },
      { slug: "deco", title: { vi: "Deco", de: "Deco" } },
    ],
  },
  {
    slug: "werbetechnik",
    icon: "Signpost",
    visual: "signage",
    color: "#ff4d00",
    cover: "/media/services/werbetechnik/werbetechnik.png",
    gallery: [
      "/media/services/werbetechnik/werbetechnik.png",
      "/media/services/werbetechnik/cover.png",
    ],
    specs: ["IP65 OPT", "LED / FACE", "DE CODE"],
    title: { vi: "Werbetechnik", de: "Werbetechnik" },
    short: {
      vi: "Biển hiệu, lightbox, wayfinding, dán xe — hiện diện thương hiệu ngoài trời & trong cửa hàng.",
      de: "Schilder, Leuchtkästen, Wegeleitsysteme, Fahrzeugfolierung — Markenpräsenz indoor & outdoor.",
    },
    description: {
      vi: "Werbetechnik là cầu nối giữa brand identity và không gian thực. Chúng tôi thiết kế, sản xuất và lắp đặt hệ thống biển hiệu bền, đẹp, đúng quy chuẩn tại Đức.",
      de: "Werbetechnik verbindet Markenidentität mit realem Raum. Wir planen, fertigen und montieren langlebige, hochwertige Beschilderungssysteme nach deutschen Standards.",
    },
    capabilities: {
      vi: [
        "Biển hiệu ngoài trời / mặt tiền",
        "Lightbox & chữ nổi 3D có đèn",
        "Indoor signage & wayfinding",
        "Vehicle wrap & fleet branding",
        "Cửa kính, decal, window graphics",
        "Lắp đặt & bảo trì định kỳ",
      ],
      de: [
        "Außenwerbung / Fassadenbeschilderung",
        "Leuchtkästen & 3D-Buchstaben",
        "Indoor-Signage & Wegeleitsysteme",
        "Fahrzeugfolierung & Flottenbranding",
        "Schaufensterfolien & Window Graphics",
        "Montage & Wartung",
      ],
    },
    benefits: {
      vi: [
        "Nhận diện mạnh ngay từ vỉa hè",
        "Vật liệu chịu thời tiết Đức",
        "Thiết kế hài hoà kiến trúc",
        "Một quy trình: design → sản xuất → lắp",
      ],
      de: [
        "Starke Sichtbarkeit von der Straße",
        "Wetterfeste Materialien",
        "Architekturverträgliches Design",
        "Design → Fertigung → Montage",
      ],
    },
    submenu: [
      { slug: "3d-lettering", title: { vi: "Chữ nổi", de: "3D-Buchstaben" } },
      { slug: "advertising-signs", title: { vi: "Biển quảng cáo", de: "Werbeschilder" } },
      { slug: "lightbox", title: { vi: "Lightbox", de: "Leuchtkästen" } },
      { slug: "decal", title: { vi: "Decal", de: "Folierung / Decal" } },
    ],
  },
  {
    slug: "printing",
    icon: "Printer",
    visual: "print",
    color: "#00dcd2",
    cover: "/media/services/printing/printing.png",
    gallery: [
      "/media/services/printing/printing.png",
      "/media/services/printing/cover.png",
    ],
    specs: ["CMYK+SPOT", "300–1200 DPI", "LAM / CUT"],
    title: { vi: "Printing", de: "Printing" },
    short: {
      vi: "In lớn, ấn phẩm doanh nghiệp, packaging, sticker — chất lượng màu chuẩn brand.",
      de: "Großformat, Geschäftsdruck, Packaging, Sticker — farbverbindlich nach Brand.",
    },
    description: {
      vi: "Từ roll-up đến catalogue, từ tem nhãn đến bao bì — PTC đảm bảo màu sắc ổn định, vật liệu phù hợp và hoàn thiện chuyên nghiệp cho mọi chiến dịch.",
      de: "Von Roll-ups bis Kataloge, von Etiketten bis Verpackung — farbstabil, materialgerecht und professionell veredelt für jede Kampagne.",
    },
    capabilities: {
      vi: [
        "Large format: banner, mesh, poster",
        "Business print: card, flyer, brochure",
        "Packaging & label design/print",
        "Sticker, decal, floor graphics",
        "Hoàn thiện: cán màng, bế, ép kim",
        "Quản lý màu theo brand guideline",
      ],
      de: [
        "Großformat: Banner, Mesh, Poster",
        "Geschäftsdruck: Karten, Flyer, Broschüren",
        "Packaging & Etiketten",
        "Sticker, Decals, Bodenfolien",
        "Veredelung: Laminat, Stanzen, Heißfolie",
        "Farbmanagement nach CI",
      ],
    },
    benefits: {
      vi: [
        "Màu nhất quán multi-channel",
        "Giao hàng nhanh DE",
        "Tư vấn vật liệu tiết kiệm",
        "Tích hợp với branding & signage",
      ],
      de: [
        "Farbkonsistenz multi-channel",
        "Schnelle Lieferung DE",
        "Materialberatung",
        "Integration mit Branding & Signage",
      ],
    },
    submenu: [
      { slug: "uv-print", title: { vi: "In UV", de: "UV-Druck" } },
      { slug: "large-format", title: { vi: "In khổ lớn", de: "Großformat" } },
      { slug: "catalogue", title: { vi: "Catalogue", de: "Katalog" } },
      { slug: "menu", title: { vi: "Menu", de: "Speisekarte" } },
      { slug: "packaging", title: { vi: "Bao bì", de: "Verpackung" } },
    ],
  },
  {
    slug: "branding",
    icon: "Palette",
    visual: "brand",
    color: "#b464ff",
    cover: "/media/services/branding/branding.png",
    gallery: [
      "/media/services/branding/branding.png",
      "/media/services/branding/cover.png",
    ],
    specs: ["CI SYSTEM", "TYPE SCALE", "TOKEN SET"],
    title: { vi: "Branding", de: "Branding" },
    short: {
      vi: "Logo, CI/CD, packaging design, brand guideline — nền tảng nhận diện bền vững.",
      de: "Logo, CI/CD, Packaging-Design, Brand Guidelines — tragfähige Markenbasis.",
    },
    description: {
      vi: "Chúng tôi xây dựng hệ nhận diện rõ ràng, tối giản, dễ áp dụng trên web, in ấn và biển hiệu — giúp thương hiệu nhất quán ở mọi điểm chạm.",
      de: "Wir entwickeln klare, minimalistische Erscheinungsbilder — anwendbar auf Web, Print und Beschilderung für konsistente Touchpoints.",
    },
    capabilities: {
      vi: [
        "Logo & brand mark",
        "Corporate identity / design system",
        "Brand guideline (PDF/web)",
        "Packaging & label design",
        "Stationery & template",
        "Rebrand / refresh thương hiệu",
      ],
      de: [
        "Logo & Brand Mark",
        "Corporate Identity / Designsystem",
        "Brand Guidelines (PDF/Web)",
        "Packaging- & Etikettendesign",
        "Geschäftsausstattung & Templates",
        "Rebrand / Brand Refresh",
      ],
    },
    benefits: {
      vi: [
        "Nhận diện dễ nhớ, dễ scale",
        "File sẵn sàng cho CNC & print",
        "Giảm chi phí làm lại sau này",
        "Định vị rõ trên thị trường DE",
      ],
      de: [
        "Wiedererkennbar & skalierbar",
        "Produktionsreife Dateien",
        "Weniger Nacharbeit später",
        "Klare Positionierung im DE-Markt",
      ],
    },
    submenu: [
      { slug: "logo", title: { vi: "Logo", de: "Logo" } },
      { slug: "brand-identity", title: { vi: "Brand Identity", de: "Brand Identity" } },
      { slug: "name-card", title: { vi: "Name Card", de: "Visitenkarte" } },
    ],
  },
  {
    slug: "website",
    icon: "Monitor",
    visual: "web",
    color: "#5b8cff",
    cover: "/media/services/website/website.png",
    gallery: [
      "/media/services/website/website.png",
      "/media/services/website/cover.png",
    ],
    specs: ["12-COL GRID", "CORE WEB VITALS", "CMS-READY"],
    title: { vi: "Website", de: "Website" },
    short: {
      vi: "Corporate web, landing page, redesign — nhanh, SEO-ready, cao cấp.",
      de: "Corporate Web, Landingpages, Redesign — schnell, SEO-ready, premium.",
    },
    description: {
      vi: "Website PTC tập trung conversion và thẩm mỹ: cấu trúc rõ, tốc độ tốt, tối ưu SEO kỹ thuật, responsive hoàn hảo — phản ánh đúng chất lượng brand offline.",
      de: "Unsere Websites fokussieren Conversion und Ästhetik: klare Struktur, Performance, technisches SEO, perfekte Responsiveness — online so stark wie offline.",
    },
    capabilities: {
      vi: [
        "Corporate & multi-page website",
        "Landing page chiến dịch",
        "UI/UX design cao cấp",
        "SEO technical & content structure",
        "Tích hợp form, analytics, CMS-ready",
        "Redesign & migration",
      ],
      de: [
        "Corporate- & Multipage-Websites",
        "Kampagnen-Landingpages",
        "Premium UI/UX",
        "Technisches SEO & Content-Struktur",
        "Formulare, Analytics, CMS-ready",
        "Redesign & Migration",
      ],
    },
    benefits: {
      vi: [
        "Tăng trust & lead",
        "Đồng bộ visual với signage/print",
        "Dễ bảo trì, mở rộng",
        "Chuẩn mobile-first",
      ],
      de: [
        "Mehr Trust & Leads",
        "Visuell abgestimmt mit Signage/Print",
        "Wartbar & erweiterbar",
        "Mobile-first",
      ],
    },
    submenu: [
      { slug: "landing-page", title: { vi: "Landing Page", de: "Landingpage" } },
      { slug: "company-website", title: { vi: "Company Website", de: "Firmenwebsite" } },
      { slug: "restaurant-website", title: { vi: "Restaurant Website", de: "Restaurant-Website" } },
      { slug: "nail-salon-website", title: { vi: "Nail Salon Website", de: "Nagelstudio-Website" } },
      { slug: "e-commerce", title: { vi: "E-Commerce", de: "E-Commerce" } },
    ],
  },
  {
    slug: "marketing",
    icon: "Megaphone",
    visual: "growth",
    color: "#ff5c8a",
    cover: "/media/services/marketing/marketing.png",
    gallery: [
      "/media/services/marketing/marketing.png",
      "/media/services/marketing/cover.png",
    ],
    specs: ["LOCAL SEO", "SIGNAL / ADS", "KPI LOOP"],
    title: { vi: "Marketing", de: "Marketing" },
    short: {
      vi: "Social, content, campaign, local SEO — tăng hiện diện và khách hàng thực.",
      de: "Social, Content, Kampagnen, Local SEO — mehr Sichtbarkeit und echte Kunden.",
    },
    description: {
      vi: "Marketing tại PTC bám sát vận hành local business tại Đức: Google Business, social content, chiến dịch khai trương/mùa vụ, và creative assets sản xuất in-house.",
      de: "Marketing bei PTC orientiert sich an lokalen DE-Businesses: Google Business, Social Content, Eröffnungs-/Saisonkampagnen — mit Inhouse-Produktion der Assets.",
    },
    capabilities: {
      vi: [
        "Social media content & calendar",
        "Local SEO & Google Business",
        "Campaign creative (print + digital)",
        "Photo/video direction hỗ trợ",
        "Launch & seasonal campaigns",
        "Asset production in-house",
      ],
      de: [
        "Social-Media-Content & Kalender",
        "Local SEO & Google Business",
        "Kampagnen-Creatives (Print + Digital)",
        "Foto/Video-Direction",
        "Launch- & Saisonkampagnen",
        "Inhouse-Asset-Produktion",
      ],
    },
    benefits: {
      vi: [
        "Nội dung + vật liệu quảng cáo liền mạch",
        "Hiểu local market DE",
        "Đo lường & tối ưu liên tục",
        "Một đội creative–production",
      ],
      de: [
        "Content + Werbemittel aus einem Guss",
        "Lokaler DE-Marktbezug",
        "Messung & Optimierung",
        "Ein Creative-Production-Team",
      ],
    },
    submenu: [
      { slug: "google-ads", title: { vi: "Google Ads", de: "Google Ads" } },
      { slug: "facebook-ads", title: { vi: "Facebook Ads", de: "Facebook Ads" } },
      { slug: "seo", title: { vi: "SEO", de: "SEO" } },
      { slug: "google-business", title: { vi: "Google Business", de: "Google Business" } },
      { slug: "social-media", title: { vi: "Social Media", de: "Social Media" } },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
