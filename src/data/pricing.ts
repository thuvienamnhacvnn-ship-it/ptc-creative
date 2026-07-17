import type { PricingCategory } from "@/types";

export const pricingCategories: PricingCategory[] = [
  {
    id: "web",
    title: { vi: "Website", de: "Website" },
    tiers: [
      {
        id: "web-starter",
        name: { vi: "Starter", de: "Starter" },
        priceFrom: "1.490",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Landing / one-page chuyên nghiệp cho SMEs.",
          de: "Professionelle Landing / One-Pager für KMU.",
        },
        features: {
          vi: ["1–5 sections", "Mobile responsive", "Form liên hệ", "SEO cơ bản", "Bàn giao 2–3 tuần"],
          de: ["1–5 Sektionen", "Mobile responsive", "Kontaktformular", "Basis-SEO", "2–3 Wochen"],
        },
      },
      {
        id: "web-business",
        name: { vi: "Business", de: "Business" },
        priceFrom: "3.900",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Corporate multi-page, animation, SEO technical.",
          de: "Corporate Multipage, Animation, technisches SEO.",
        },
        features: {
          vi: ["6–12 trang", "UI custom", "Blog ready", "Analytics", "SEO technical", "3–6 tuần"],
          de: ["6–12 Seiten", "Custom UI", "Blog-ready", "Analytics", "Technisches SEO", "3–6 Wochen"],
        },
        highlighted: true,
      },
      {
        id: "web-premium",
        name: { vi: "Premium", de: "Premium" },
        priceFrom: "7.500",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Website cao cấp, i18n, design system, performance top.",
          de: "Premium-Website, i18n, Designsystem, Top-Performance.",
        },
        features: {
          vi: ["Không giới hạn page (scope)", "i18n", "Motion design", "Design system", "Ưu tiên support"],
          de: ["Seiten nach Scope", "i18n", "Motion Design", "Designsystem", "Priority Support"],
        },
      },
    ],
  },
  {
    id: "print",
    title: { vi: "Print", de: "Print" },
    tiers: [
      {
        id: "print-starter",
        name: { vi: "Starter", de: "Starter" },
        priceFrom: "180",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Bộ card + flyer cơ bản.",
          de: "Basis-Set Karten + Flyer.",
        },
        features: {
          vi: ["Namecard design + print", "Flyer A5", "File print-ready", "1 vòng sửa"],
          de: ["Visitenkarte Design + Druck", "Flyer A5", "Druckfertige Dateien", "1 Korrekturschleife"],
        },
      },
      {
        id: "print-business",
        name: { vi: "Business", de: "Business" },
        priceFrom: "650",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Brochure + ấn phẩm sales.",
          de: "Broschüre + Sales-Unterlagen.",
        },
        features: {
          vi: ["Brochure 8–12 trang", "Folder", "Quản lý màu brand", "2 vòng sửa"],
          de: ["Broschüre 8–12 Seiten", "Mappe", "Farbmanagement", "2 Korrekturen"],
        },
        highlighted: true,
      },
      {
        id: "print-premium",
        name: { vi: "Premium", de: "Premium" },
        priceFrom: "1.800",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Packaging + series ấn phẩm cao cấp.",
          de: "Packaging + Premium-Printserie.",
        },
        features: {
          vi: ["Packaging design", "Veredelung options", "Series assets", "Production management"],
          de: ["Packaging-Design", "Veredelungsoptionen", "Asset-Serie", "Produktionsmanagement"],
        },
      },
    ],
  },
  {
    id: "signage",
    title: { vi: "Signage", de: "Signage" },
    tiers: [
      {
        id: "sign-starter",
        name: { vi: "Starter", de: "Starter" },
        priceFrom: "490",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Biển mica/aluminium cửa hàng nhỏ.",
          de: "Acryl-/Alu-Schild für kleine Flächen.",
        },
        features: {
          vi: ["Thiết kế 2D", "Sản xuất 1 biển", "Lắp đặt cơ bản", "Bảo hành vật liệu"],
          de: ["2D-Design", "1 Schild Produktion", "Basis-Montage", "Materialgarantie"],
        },
      },
      {
        id: "sign-business",
        name: { vi: "Business", de: "Business" },
        priceFrom: "2.200",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Facade + lightbox / chữ nổi.",
          de: "Fassade + Leuchtkasten / 3D-Buchstaben.",
        },
        features: {
          vi: ["Survey mặt tiền", "Mockup 3D", "Lightbox hoặc 3D letters", "Lắp đặt chuyên nghiệp"],
          de: ["Fassaden-Survey", "3D-Mockup", "Leuchtkasten oder 3D-Buchstaben", "Profi-Montage"],
        },
        highlighted: true,
      },
      {
        id: "sign-premium",
        name: { vi: "Premium", de: "Premium" },
        priceFrom: "5.500",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Full wayfinding + exterior system.",
          de: "Volles Wegeleitsystem + Außenwerbung.",
        },
        features: {
          vi: ["Multi-location system", "Wayfinding", "Lighting design", "Maintenance plan"],
          de: ["Multi-Standort-System", "Wegeleitung", "Lichtkonzept", "Wartungsplan"],
        },
      },
    ],
  },
  {
    id: "package",
    title: { vi: "Gói trọn", de: "Pakete" },
    tiers: [
      {
        id: "pkg-starter",
        name: { vi: "Launch", de: "Launch" },
        priceFrom: "2.900",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Logo + card + biển cơ bản + landing.",
          de: "Logo + Karten + Basis-Schild + Landing.",
        },
        features: {
          vi: ["Logo kit", "Namecard", "1 biển cửa", "Landing page", "Social avatar kit"],
          de: ["Logo-Kit", "Visitenkarten", "1 Türschild", "Landingpage", "Social-Avatar-Kit"],
        },
      },
      {
        id: "pkg-growth",
        name: { vi: "Growth", de: "Growth" },
        priceFrom: "7.900",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Brand + web + signage cho cửa hàng đang scale.",
          de: "Brand + Web + Signage für wachsende Shops.",
        },
        features: {
          vi: ["Full CI", "Corporate web", "Facade signage", "Print set", "1 tháng content"],
          de: ["Volles CI", "Corporate Web", "Fassadenbeschilderung", "Print-Set", "1 Monat Content"],
        },
        highlighted: true,
      },
      {
        id: "pkg-flagship",
        name: { vi: "Flagship", de: "Flagship" },
        priceFrom: "15.000",
        unit: { vi: "€", de: "€" },
        description: {
          vi: "Chương trình brand 360° + production.",
          de: "360°-Markenprogramm + Produktion.",
        },
        features: {
          vi: ["Strategy + brand", "Web premium", "CNC/signage system", "Marketing Q1", "Dedicated PM"],
          de: ["Strategie + Brand", "Premium-Web", "CNC/Signage-System", "Marketing Q1", "Dedizierter PM"],
        },
      },
    ],
  },
];
