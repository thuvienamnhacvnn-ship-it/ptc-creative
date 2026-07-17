import type { FaqItem } from "@/types";

export const faqItems: FaqItem[] = [
  {
    id: "f1",
    category: "general",
    question: {
      vi: "PTC Creative phục vụ khu vực nào?",
      de: "In welchen Regionen ist PTC Creative tätig?",
    },
    answer: {
      vi: "Chúng tôi phục vụ toàn Đức. Sản xuất & lắp đặt ưu tiên các bang trung tâm; dự án website/branding triển khai remote toàn quốc. Liên hệ để xác nhận lead time theo địa điểm.",
      de: "Wir sind deutschlandweit tätig. Fertigung & Montage priorisieren zentrale Regionen; Web/Branding remote bundesweit. Lead Time je Standort auf Anfrage.",
    },
  },
  {
    id: "f2",
    category: "general",
    question: {
      vi: "Có nhận dự án nhỏ không?",
      de: "Nehmen Sie auch kleine Projekte an?",
    },
    answer: {
      vi: "Có. Từ namecard, biển cửa nhỏ đến chương trình brand 360°. Mọi dự án đều đi qua tư vấn để tối ưu ngân sách.",
      de: "Ja — von Visitenkarten und kleinen Schildern bis 360°-Brand-Programme. Jedes Projekt startet mit Beratung zur Budgetoptimierung.",
    },
  },
  {
    id: "f3",
    category: "production",
    question: {
      vi: "Lead time CNC / biển hiệu trung bình bao lâu?",
      de: "Wie lang ist die typische Lieferzeit für CNC / Schilder?",
    },
    answer: {
      vi: "Prototype CNC: khoảng 3–10 ngày làm việc tuỳ phức tạp. Biển hiệu tiêu chuẩn: 1–3 tuần sau chốt thiết kế. Dự án facade lớn có thể 3–6 tuần. Timeline chính thức ghi trong báo giá.",
      de: "CNC-Prototyp: ca. 3–10 Werktage. Standard-Schilder: 1–3 Wochen nach Designfreigabe. Große Fassaden: 3–6 Wochen. Finaler Timeline im Angebot.",
    },
  },
  {
    id: "f4",
    category: "production",
    question: {
      vi: "Tôi cần cung cấp file gì cho sản xuất?",
      de: "Welche Dateien brauche ich für die Produktion?",
    },
    answer: {
      vi: "Tốt nhất: vector (AI, PDF, SVG, DXF) hoặc CAD (STEP). Ảnh raster độ phân giải cao có thể dùng nhưng cần redraw. PTC hỗ trợ chuẩn hoá file production-ready.",
      de: "Ideal: Vektor (AI, PDF, SVG, DXF) oder CAD (STEP). Hochauflösende Rasterbilder möglich, oft mit Redraw. PTC liefert produktionsreife Aufbereitung.",
    },
  },
  {
    id: "f5",
    category: "web",
    question: {
      vi: "Website dùng công nghệ gì?",
      de: "Welche Technologien nutzen Sie für Websites?",
    },
    answer: {
      vi: "Chủ yếu Next.js, TypeScript, Tailwind — hiệu năng cao, SEO tốt, dễ bảo trì. Có thể tích hợp CMS hoặc form theo nhu cầu.",
      de: "Primär Next.js, TypeScript, Tailwind — Performance, SEO, Wartbarkeit. CMS und Formulare nach Bedarf.",
    },
  },
  {
    id: "f6",
    category: "web",
    question: {
      vi: "Có hỗ trợ đa ngôn ngữ (DE/EN/VI) không?",
      de: "Unterstützen Sie Mehrsprachigkeit (DE/EN/VI)?",
    },
    answer: {
      vi: "Có. Chúng tôi triển khai i18n từ đầu (routing, metadata, hreflang) — phổ biến với doanh nghiệp phục vụ cộng đồng đa ngôn ngữ tại Đức.",
      de: "Ja. i18n von Anfang an (Routing, Metadata, hreflang) — ideal für mehrsprachige Zielgruppen in Deutschland.",
    },
  },
  {
    id: "f7",
    category: "pricing",
    question: {
      vi: "Bảng giá trên web có phải giá cuối?",
      de: "Sind die Web-Preise Endpreise?",
    },
    answer: {
      vi: "Đây là giá tham khảo “từ”. Báo giá chính thức phụ thuộc scope, vật liệu, số lượng, lắp đặt và tiến độ. Tư vấn & báo giá chi tiết miễn phí.",
      de: "Es sind „ab“-Richtpreise. Final hängt von Scope, Material, Menge, Montage und Termin ab. Beratung & detailliertes Angebot kostenlos.",
    },
  },
  {
    id: "f8",
    category: "pricing",
    question: {
      vi: "Hình thức thanh toán?",
      de: "Welche Zahlungsbedingungen gelten?",
    },
    answer: {
      vi: "Thường: đặt cọc khi chốt, thanh toán phần còn lại khi bàn giao (hoặc milestone theo hợp đồng). Chi tiết ghi trong offer/invoice.",
      de: "Üblich: Anzahlung bei Auftrag, Rest bei Übergabe (oder Meilensteine laut Vertrag). Details im Angebot/Invoice.",
    },
  },
  {
    id: "f9",
    category: "delivery",
    question: {
      vi: "Có lắp đặt tận nơi không?",
      de: "Übernehmen Sie die Montage vor Ort?",
    },
    answer: {
      vi: "Có, với các hạng mục signage/CNC phù hợp. Chi phí lắp đặt & đi lại tính theo địa điểm và độ phức tạp.",
      de: "Ja, bei passenden Signage/CNC-Gewerken. Montage- und Anfahrtskosten je Standort und Komplexität.",
    },
  },
  {
    id: "f10",
    category: "delivery",
    question: {
      vi: "Bảo hành sản phẩm thế nào?",
      de: "Welche Garantie gibt es auf Produkte?",
    },
    answer: {
      vi: "Bảo hành vật liệu & gia công theo từng hạng mục (thường 12–24 tháng với điều kiện sử dụng đúng). LED/điện có bảo hành riêng của linh kiện.",
      de: "Material- und Fertigungsgarantie je Position (meist 12–24 Monate bei bestimmungsgemäßem Gebrauch). LED/Elektronik nach Komponentenhersteller.",
    },
  },
];

export const faqCategories = [
  { id: "general", vi: "Chung", de: "Allgemein" },
  { id: "production", vi: "Sản xuất", de: "Fertigung" },
  { id: "web", vi: "Website", de: "Website" },
  { id: "pricing", vi: "Báo giá", de: "Preise" },
  { id: "delivery", vi: "Giao hàng & lắp đặt", de: "Lieferung & Montage" },
] as const;
