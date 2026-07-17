import type { Locale } from "@/types";

/**
 * Meta quy trình làm việc — ảnh, thời gian, crew, outputs
 * Ảnh ưu tiên: public/media/process/p{n}.png (p1–p4)
 * Fallback: process/{n}.* rồi public/media/services/...
 */

export type ProcessMeta = {
  id: string;
  color: string;
  icon: "Antenna" | "LayoutTemplate" | "Factory" | "Rocket";
  /** Candidate image paths (ordered) */
  images: string[];
  duration: Record<Locale, string>;
  crew: string;
  outputs: Record<Locale, string[]>;
  note: Record<Locale, string>;
  materials: Record<Locale, string[]>;
};

function processStill(n: number, service: string, alt?: string): string[] {
  const pBase = `/media/process/p${n}`;
  const base = `/media/process/${n}`;
  const svc = `/media/services/${service}`;
  const paths = [
    `${pBase}.png`,
    `${pBase}.jpg`,
    `${pBase}.jpeg`,
    `${pBase}.webp`,
    `${base}.jpg`,
    `${base}.jpeg`,
    `${base}.png`,
    `${base}.webp`,
    `${svc}/${service}.png`,
    `${svc}/${service}.jpg`,
    `${svc}/cover.jpg`,
    `${svc}/cover.png`,
    `${svc}/1.jpg`,
    `${svc}/2.jpg`,
  ];
  if (alt) {
    paths.push(
      `/media/services/${alt}/${alt}.png`,
      `/media/services/${alt}/cover.jpg`,
      `/media/services/${alt}/cover.png`,
      `/media/services/${alt}/1.jpg`
    );
  }
  return paths;
}

export const processMeta: ProcessMeta[] = [
  {
    id: "signal",
    color: "#38bdf8",
    icon: "Antenna",
    images: processStill(1, "marketing", "website"),
    duration: { vi: "1–3 ngày", de: "1–3 Tage" },
    crew: "Phú · Tuyên · Chung",
    outputs: {
      vi: ["Brief chốt", "Ràng buộc mặt bằng", "Mục tiêu tăng trưởng"],
      de: ["Finales Briefing", "Raum-Constraints", "Growth-Ziele"],
    },
    note: {
      vi: "Thu thập tín hiệu từ thị trường Berlin — không bắt đầu sản xuất khi brief còn mơ hồ.",
      de: "Signale aus dem Berliner Markt — keine Fertigung bei unklarem Brief.",
    },
    materials: {
      vi: ["Site survey", "Brief form", "Moodboard"],
      de: ["Site Survey", "Brief-Formular", "Moodboard"],
    },
  },
  {
    id: "system",
    color: "#a78bfa",
    icon: "LayoutTemplate",
    images: processStill(2, "branding", "website"),
    duration: { vi: "3–10 ngày", de: "3–10 Tage" },
    crew: "Chung · Tuyên",
    outputs: {
      vi: ["Brand system", "Layout không gian", "Kiến trúc số"],
      de: ["Brand-System", "Raumlayout", "Digitale Architektur"],
    },
    note: {
      vi: "Hệ thống nhận diện + vật liệu + digital stack cùng một bản thiết kế.",
      de: "Identität, Material und Digital-Stack in einem Entwurf.",
    },
    materials: {
      vi: ["Logo / CI", "Material swatch", "Wireframe"],
      de: ["Logo / CI", "Materialmuster", "Wireframe"],
    },
  },
  {
    id: "fabricate",
    color: "#fbbf24",
    icon: "Factory",
    images: processStill(3, "cnc", "werbetechnik"),
    duration: { vi: "5–20 ngày", de: "5–20 Tage" },
    crew: "Phú · Tuyên",
    outputs: {
      vi: ["CNC / print", "Werbetechnik", "QA Berlin"],
      de: ["CNC / Print", "Werbetechnik", "QA Berlin"],
    },
    note: {
      vi: "Biến bản vẽ thành vật thể — CNC, in ấn, biển hiệu theo chuẩn DE.",
      de: "Zeichnung wird physisch — CNC, Druck, Schilder nach DE-Standard.",
    },
    materials: {
      vi: ["Acrylic / Alu", "Print proof", "Montage kit"],
      de: ["Acryl / Alu", "Druckproof", "Montage-Kit"],
    },
  },
  {
    id: "launch",
    color: "#ff4d00",
    icon: "Rocket",
    images: processStill(4, "website", "marketing"),
    duration: { vi: "2–7 ngày", de: "2–7 Tage" },
    crew: "Tuyên · Chung",
    outputs: {
      vi: ["Web / booking", "Local presence", "Chiến dịch launch"],
      de: ["Web / Booking", "Local Presence", "Launch-Kampagne"],
    },
    note: {
      vi: "Đưa brand vào thị trường: online + offline đồng bộ một câu chuyện.",
      de: "Marke in den Markt: Online + Offline, eine Story.",
    },
    materials: {
      vi: ["Live site", "GMB / Maps", "Campaign kit"],
      de: ["Live-Site", "GMB / Maps", "Kampagnen-Kit"],
    },
  },
];
