/**
 * CAPABILITY STACK · LIVE — config & local media map
 *
 * Thay media: copy file vào public/media/capability/{layerId}/
 * Tên file được probe theo thứ tự (video -> image candidates).
 * Xem public/media/capability/README.md
 */

export type CapabilityLayerId = "brand" | "material" | "production" | "digital" | "growth";

export type CapabilityMedia = {
  /** Ưu tiên 1 — video nền (muted loop) */
  videos?: string[];
  /** Ưu tiên 2 — ảnh nền (thử lần lượt đến khi load được) */
  images?: string[];
  /** Overlay phụ (logo mark, texture…) */
  overlays?: string[];
};

export type BrandTrait = {
  id: string;
  title: { vi: string; de: string };
  desc: { vi: string; de: string };
  code: string;
};

/** Tính năng / DNA của lớp Brand */
export const BRAND_TRAITS: BrandTrait[] = [
  {
    id: "identity",
    code: "ID",
    title: { vi: "Hệ nhận diện", de: "Identitätssystem" },
    desc: {
      vi: "Logo mark, khoảng cách an toàn, biến thể solid / outline / mono — một hệ thống scale từ biển hiệu đến UI.",
      de: "Logo-Marke, Schutzraum, Varianten solid / outline / mono — ein System von Schild bis UI.",
    },
  },
  {
    id: "typography",
    code: "TYPE",
    title: { vi: "Typography", de: "Typography" },
    desc: {
      vi: "Display mạnh cho headline, sans hình học cho UI, mono cho thông số kỹ thuật — hierarchy rõ, hỗ trợ VI + DE.",
      de: "Starkes Display, geometrische Sans für UI, Mono für Specs — klare Hierarchie, VI + DE.",
    },
  },
  {
    id: "form",
    code: "FORM",
    title: { vi: "Hình khối", de: "Formensprache" },
    desc: {
      vi: "Vuông cắt, góc sắc, module lặp — ngôn ngữ hình học industrial, không bo tròn agency.",
      de: "Scharfe Kanten, modulare Blöcke — industrielle Formensprache, kein Agentur-Rundungen.",
    },
  },
  {
    id: "color",
    code: "CLR",
    title: { vi: "Màu & token", de: "Farbe & Tokens" },
    desc: {
      vi: "Graphite + warm white + một signal accent (electric orange) — dùng có chủ đích, không gradient rẻ tiền.",
      de: "Graphite + warm white + ein Signal-Akzent — gezielt, keine billigen Gradients.",
    },
  },
];

/** Candidate paths per layer — first existing file wins */
function layerMedia(id: CapabilityLayerId): CapabilityMedia {
  const base = `/media/capability/${id}`;
  return {
    videos: [`${base}/loop.mp4`, `${base}/loop.webm`, `${base}/1.mp4`],
    images: [
      `${base}/1.png`,
      `${base}/1.jpg`,
      `${base}/1.jpeg`,
      `${base}/1.webp`,
      `${base}/poster.jpg`,
      `${base}/poster.png`,
      `${base}/poster.webp`,
    ],
    overlays: [`${base}/mark.svg`, `${base}/mark.png`],
  };
}

export const CAPABILITY_MEDIA: Record<CapabilityLayerId, CapabilityMedia> = {
  brand: layerMedia("brand"),
  material: layerMedia("material"),
  production: layerMedia("production"),
  digital: layerMedia("digital"),
  growth: layerMedia("growth"),
};

export type LayerRuntime = {
  id: CapabilityLayerId;
  index: number;
  label: string;
  desc: string;
  depth: number;
  hue: string;
};

/** Kiểm tra media local có load được không (client) */
export function probeMedia(url: string): Promise<boolean> {
  if (!url) return Promise.resolve(false);
  const lower = url.toLowerCase();
  if (lower.endsWith(".mp4") || lower.endsWith(".webm")) {
    return new Promise((resolve) => {
      const v = document.createElement("video");
      v.preload = "metadata";
      v.onloadedmetadata = () => resolve(true);
      v.onerror = () => resolve(false);
      v.src = url;
    });
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

/** Probe list — return first working URL */
export async function probeFirst(urls?: string[]): Promise<string | undefined> {
  if (!urls?.length) return undefined;
  for (const url of urls) {
    if (await probeMedia(url)) return url;
  }
  return undefined;
}
