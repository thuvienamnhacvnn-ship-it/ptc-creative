import type { BlogCategoryKey, BlogPost } from "@/types";

export const BLOG_CATEGORIES: {
  key: BlogCategoryKey;
  title: { vi: string; de: string };
}[] = [
  { key: "marketing", title: { vi: "Marketing", de: "Marketing" } },
  { key: "tax", title: { vi: "Thuế", de: "Steuern" } },
  { key: "business", title: { vi: "Doanh nghiệp", de: "Unternehmen" } },
  {
    key: "germany",
    title: { vi: "Kinh nghiệm kinh doanh tại Đức", de: "Business in Deutschland" },
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "marketing-khai-truong-cua-hang",
    title: {
      vi: "Marketing khai trương cửa hàng: gói 30 ngày",
      de: "Eröffnungsmarketing: 30-Tage-Plan",
    },
    excerpt: {
      vi: "Từ teaser social, biển tạm, flyer, đến Google post — lịch 30 ngày thực chiến.",
      de: "Von Social-Teasern und Temporärschildern bis Google Posts — 30 Tage Praxisplan.",
    },
    content: {
      vi: `**Ngày -30 đến -14:** chốt brand, sản xuất biển, thiết kế creative, setup Google Business.
**Ngày -14 đến -1:** teaser social, flyer khu vực, influencer local (nếu phù hợp), landing voucher.
**Ngày 0:** event, photo/video, stories realtime, biển & POS sẵn sàng.
**Ngày +1 đến +14:** retargeting, review request, offer “tuần khai trương”.

PTC sản xuất asset in-house (print + signage + web) nên timeline gọn và đồng bộ visual.`,
      de: `**Tag -30 bis -14:** Brand final, Schilderproduktion, Creatives, Google Business.
**Tag -14 bis -1:** Social-Teaser, Gebietsflyer, lokale Creator, Voucher-Landing.
**Tag 0:** Event, Foto/Video, Stories, POS bereit.
**Tag +1 bis +14:** Retargeting, Reviews, Eröffnungsangebote.

PTC produziert Assets inhouse — kompakter Timeline, konsistente Visuals.`,
    },
    category: { vi: "Marketing", de: "Marketing" },
    categoryKey: "marketing",
    date: "2026-03-05",
    readTime: 6,
    gradient: "from-emerald-800/60 to-neutral-900",
  },
  {
    slug: "google-ads-local-business-duc",
    title: {
      vi: "Google Ads cho local business tại Đức: ngân sách hợp lý",
      de: "Google Ads für Local Business in DE: sinnvolles Budget",
    },
    excerpt: {
      vi: "Search + Local campaigns, conversion tracking và creative đồng bộ với biển hiệu offline.",
      de: "Search + Local, Conversion-Tracking und Creatives abgestimmt mit Offline-Schildern.",
    },
    content: {
      vi: `Local Ads hiệu quả khi landing page, Google Business và biển hiệu nói cùng một thông điệp.

Checklist:
1. Keyword theo khu vực + dịch vụ
2. Call / direction extension
3. Landing mobile-first
4. UTM + conversion (form, call)
5. Creative khớp CI offline

PTC kết nối marketing digital với production assets — giảm lệch brand giữa online và mặt tiền.`,
      de: `Local Ads wirken, wenn Landingpage, Google Business und Schilder dieselbe Botschaft tragen.

Checkliste:
1. Standort- + Service-Keywords
2. Call-/Routen-Extensions
3. Mobile-first Landing
4. UTM + Conversions
5. Creatives = Offline-CI

PTC verknüpft Digital-Marketing mit Produktionsassets.`,
    },
    category: { vi: "Marketing", de: "Marketing" },
    categoryKey: "marketing",
    date: "2026-05-20",
    readTime: 5,
    gradient: "from-blue-800/60 to-neutral-900",
  },
  {
    slug: "thue-doanh-nghiep-nho-duc-checklist",
    title: {
      vi: "Checklist thuế cho SME mới tại Đức (góc nhìn vận hành)",
      de: "Steuer-Checkliste für neue KMU in DE (operativ)",
    },
    excerpt: {
      vi: "Impressum, hoá đơn, VAT/USt, lưu chứng từ — những điểm brand & web phải chuẩn trước khi scale.",
      de: "Impressum, Rechnungen, USt, Belege — was Marke & Web vor dem Scale sauber brauchen.",
    },
    content: {
      vi: `Bài viết mang tính **thông tin vận hành**, không thay thế tư vấn thuế.

Khi dựng brand / website / print cho SME tại Đức, nên chuẩn bị:
- Impressum & Datenschutz đúng
- Mẫu hoá đơn / offer có đủ thông tin pháp lý
- Phân biệt B2B / B2C trên web
- Lưu file production & contract theo năm tài chính

PTC hỗ trợ template visual & web structure; bạn phối hợp Steuerberater cho phần số liệu.`,
      de: `Dieser Text ist **operativ informativ**, kein Steuerberatung-Ersatz.

Beim Aufbau von Marke/Web/Print für KMU in DE:
- korrektes Impressum & Datenschutz
- Angebots-/Rechnungsvorlagen mit Pflichtangaben
- B2B/B2C-Klarheit im Web
- Archivierung von Production-Files & Verträgen

PTC liefert visuelle Templates & Web-Struktur — Zahlen mit dem Steuerberater.`,
    },
    category: { vi: "Thuế", de: "Steuern" },
    categoryKey: "tax",
    date: "2026-04-02",
    readTime: 6,
    gradient: "from-amber-800/60 to-neutral-900",
  },
  {
    slug: "xay-he-nhan-dien-sme",
    title: {
      vi: "Xây hệ nhận diện cho SME: từ logo đến điểm chạm",
      de: "Markensystem für KMU: vom Logo bis zum Touchpoint",
    },
    excerpt: {
      vi: "Logo, name card, biển, web — thứ tự triển khai giúp doanh nghiệp nhỏ không lãng phí ngân sách.",
      de: "Logo, Visitenkarte, Schild, Web — Reihenfolge, damit KMU Budget nicht verbrennen.",
    },
    content: {
      vi: `Thứ tự gợi ý cho SME:
1. Logo + màu + font cơ bản
2. Name card / stationery
3. Biển / cửa kính (nếu có mặt tiền)
4. Website 1–5 trang + Google Business
5. Print menu / brochure
6. Ads khi conversion path đã sẵn

PTC gói branding + production + digital trong một pipeline để tránh làm lại.`,
      de: `Empfohlene Reihenfolge für KMU:
1. Logo + Farbe + Basis-Fonts
2. Visitenkarte / Stationery
3. Schild / Fenster (bei Laden)
4. Website 1–5 Seiten + Google Business
5. Menü / Broschüre
6. Ads wenn Conversion-Pfad steht

PTC bündelt Branding + Produktion + Digital.`,
    },
    category: { vi: "Doanh nghiệp", de: "Unternehmen" },
    categoryKey: "business",
    date: "2026-03-22",
    readTime: 5,
    gradient: "from-rose-800/60 to-neutral-900",
  },
  {
    slug: "website-local-business-duc",
    title: {
      vi: "Website cho local business tại Đức: checklist 2026",
      de: "Website für lokale Businesses in DE: Checkliste 2026",
    },
    excerpt: {
      vi: "Tốc độ, mobile, Google Business, impressum, conversion — những gì local brand không thể thiếu.",
      de: "Speed, Mobile, Google Business, Impressum, Conversion — unverzichtbar für Local Brands.",
    },
    content: {
      vi: `Local business tại Đức cạnh tranh mạnh trên Google Maps và mobile search. Website cần:

1. **Core Web Vitals** tốt
2. **NAP nhất quán** (Name, Address, Phone)
3. **Impressum & Datenschutz** đúng luật
4. **CTA rõ**: gọi, chỉ đường, form
5. **Ảnh thật** không gian & sản phẩm
6. **Schema LocalBusiness**
7. **Đồng bộ** với biển hiệu & print

PTC thiết kế website gắn với hệ brand offline.`,
      de: `Lokale Businesses in DE konkurrieren stark auf Maps und Mobile. Websites brauchen:

1. gute **Core Web Vitals**
2. konsistente **NAP-Daten**
3. korrektes **Impressum & Datenschutz**
4. klare **CTAs**
5. **echte Fotos**
6. **LocalBusiness-Schema**
7. **visuelle Konsistenz** mit Schildern & Print

PTC verbindet Web mit Offline-Brand.`,
    },
    category: { vi: "Kinh nghiệm kinh doanh tại Đức", de: "Business in Deutschland" },
    categoryKey: "germany",
    date: "2026-04-10",
    readTime: 7,
    gradient: "from-violet-800/60 to-neutral-900",
  },
  {
    slug: "chon-vat-lieu-bien-hieu-duc",
    title: {
      vi: "Chọn vật liệu biển hiệu phù hợp khí hậu Đức",
      de: "Schildermaterialien für das deutsche Klima wählen",
    },
    excerpt: {
      vi: "Aluminium, acrylic, dibond hay inox? Hướng dẫn chọn vật liệu bền cho outdoor signage tại DE.",
      de: "Aluminium, Acryl, Dibond oder Edelstahl? Leitfaden für langlebige Außenschilder in DE.",
    },
    content: {
      vi: `Khí hậu Đức có mưa, sương muối và chênh lệch nhiệt độ lớn. Biển hiệu ngoài trời cần vật liệu và hoàn thiện phù hợp.

**Aluminium** nhẹ, chống gỉ tốt.
**Acrylic (PMMA)** cho lightbox và chữ nổi.
**Dibond / composite** ổn định kích thước.
**Inox** cao cấp, bền.

PTC khảo sát hiện trạng, đề xuất vật liệu theo ngân sách và tuổi thọ, rồi sản xuất–lắp đặt trọn gói.`,
      de: `Das deutsche Klima verlangt passende Materialien.

**Aluminium**, **Acryl**, **Dibond**, **Edelstahl** — je nach Einsatz.

PTC analysiert vor Ort und liefert Fertigung plus Montage.`,
    },
    category: { vi: "Kinh nghiệm kinh doanh tại Đức", de: "Business in Deutschland" },
    categoryKey: "germany",
    date: "2026-05-12",
    readTime: 6,
    gradient: "from-amber-800/60 to-neutral-900",
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPostsByCategory(key?: string | null) {
  if (!key) return blogPosts;
  return blogPosts.filter((p) => p.categoryKey === key);
}
