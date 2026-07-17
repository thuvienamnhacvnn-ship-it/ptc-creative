/**
 * Thư viện ảnh / video minh họa cho Service Ecosystem · Active Module
 *
 * Cấu trúc:
 * public/media/services/{folder}/
 *   1.jpg | 1.png | 1.mp4
 *   2.jpg | 2.mp4
 *   cover.jpg
 *   poster.jpg
 *
 * Probe theo thứ tự candidates; file không tồn tại → procedural fallback.
 */

export type ServiceMediaItem = {
  id: string;
  /** Ảnh tĩnh */
  image?: string;
  /** Video (ưu tiên hơn image nếu load được) */
  video?: string;
  /** Nhãn hiển thị */
  label: { vi: string; de: string };
  kind: "image" | "video" | "cover";
};

export type ServiceMediaLibrary = {
  /** folder under /media/services/ */
  folder: string;
  items: ServiceMediaItem[];
};

/** Map service slug → media library */
export const SERVICE_MEDIA: Record<string, ServiceMediaLibrary> = {
  "cnc-manufacturing": {
    folder: "cnc",
    items: [
      {
        id: "cover",
        image: "/media/services/cnc/cnc.png",
        video: "/media/services/cnc/cover.mp4",
        label: { vi: "Xưởng CNC", de: "CNC-Werkstatt" },
        kind: "cover",
      },
      {
        id: "1",
        image: "/media/services/cnc/1.jpg",
        video: "/media/services/cnc/1.mp4",
        label: { vi: "Phay chi tiết", de: "Frästeile" },
        kind: "image",
      },
      {
        id: "2",
        image: "/media/services/cnc/2.jpg",
        video: "/media/services/cnc/2.mp4",
        label: { vi: "Acrylic & kim loại", de: "Acryl & Metall" },
        kind: "image",
      },
      {
        id: "3",
        image: "/media/services/cnc/3.jpg",
        video: "/media/services/cnc/3.mp4",
        label: { vi: "Prototype", de: "Prototyp" },
        kind: "image",
      },
    ],
  },
  werbetechnik: {
    folder: "werbetechnik",
    items: [
      {
        id: "cover",
        image: "/media/services/werbetechnik/werbetechnik.png",
        video: "/media/services/werbetechnik/cover.mp4",
        label: { vi: "Biển hiệu mặt tiền", de: "Fassadenbeschilderung" },
        kind: "cover",
      },
      {
        id: "1",
        image: "/media/services/werbetechnik/1.jpg",
        video: "/media/services/werbetechnik/1.mp4",
        label: { vi: "Lightbox 3D", de: "3D-Leuchtkasten" },
        kind: "image",
      },
      {
        id: "2",
        image: "/media/services/werbetechnik/2.jpg",
        video: "/media/services/werbetechnik/2.mp4",
        label: { vi: "Wayfinding", de: "Wegeleitsystem" },
        kind: "image",
      },
      {
        id: "3",
        image: "/media/services/werbetechnik/3.jpg",
        video: "/media/services/werbetechnik/3.mp4",
        label: { vi: "Vehicle wrap", de: "Fahrzeugfolierung" },
        kind: "image",
      },
    ],
  },
  printing: {
    folder: "printing",
    items: [
      {
        id: "cover",
        image: "/media/services/printing/printing.png",
        video: "/media/services/printing/cover.mp4",
        label: { vi: "In lớn format", de: "Großformatdruck" },
        kind: "cover",
      },
      {
        id: "1",
        image: "/media/services/printing/1.jpg",
        video: "/media/services/printing/1.mp4",
        label: { vi: "Ấn phẩm DN", de: "Geschäftsdruck" },
        kind: "image",
      },
      {
        id: "2",
        image: "/media/services/printing/2.jpg",
        video: "/media/services/printing/2.mp4",
        label: { vi: "Packaging", de: "Packaging" },
        kind: "image",
      },
      {
        id: "3",
        image: "/media/services/printing/3.jpg",
        video: "/media/services/printing/3.mp4",
        label: { vi: "Hoàn thiện bề mặt", de: "Veredelung" },
        kind: "image",
      },
    ],
  },
  branding: {
    folder: "branding",
    items: [
      {
        id: "cover",
        image: "/media/services/branding/branding.png",
        video: "/media/services/branding/cover.mp4",
        label: { vi: "Hệ nhận diện", de: "Identitätssystem" },
        kind: "cover",
      },
      {
        id: "1",
        image: "/media/services/branding/1.jpg",
        video: "/media/services/branding/1.mp4",
        label: { vi: "Logo & mark", de: "Logo & Marke" },
        kind: "image",
      },
      {
        id: "2",
        image: "/media/services/branding/2.jpg",
        video: "/media/services/branding/2.mp4",
        label: { vi: "Guideline", de: "Guidelines" },
        kind: "image",
      },
      {
        id: "3",
        image: "/media/services/branding/3.jpg",
        video: "/media/services/branding/3.mp4",
        label: { vi: "Ứng dụng brand", de: "Brand-Anwendung" },
        kind: "image",
      },
    ],
  },
  website: {
    folder: "website",
    items: [
      {
        id: "cover",
        image: "/media/services/website/website.png",
        video: "/media/services/website/cover.mp4",
        label: { vi: "Website platform", de: "Website-Plattform" },
        kind: "cover",
      },
      {
        id: "1",
        image: "/media/services/website/1.png",
        video: "/media/services/website/1.mp4",
        label: { vi: "UI / digital craft", de: "UI / Digital craft" },
        kind: "image",
      },
      {
        id: "2",
        image: "/media/services/website/2.jpg",
        video: "/media/services/website/2.mp4",
        label: { vi: "Landing / booking", de: "Landing / Booking" },
        kind: "image",
      },
      {
        id: "3",
        image: "/media/services/website/3.jpg",
        video: "/media/services/website/3.mp4",
        label: { vi: "Motion & grid", de: "Motion & Grid" },
        kind: "image",
      },
    ],
  },
  marketing: {
    folder: "marketing",
    items: [
      {
        id: "cover",
        image: "/media/services/marketing/marketing.png",
        video: "/media/services/marketing/cover.mp4",
        label: { vi: "Growth campaigns", de: "Growth-Kampagnen" },
        kind: "cover",
      },
      {
        id: "1",
        image: "/media/services/marketing/1.jpg",
        video: "/media/services/marketing/1.mp4",
        label: { vi: "Local SEO", de: "Local SEO" },
        kind: "image",
      },
      {
        id: "2",
        image: "/media/services/marketing/2.jpg",
        video: "/media/services/marketing/2.mp4",
        label: { vi: "Social content", de: "Social Content" },
        kind: "image",
      },
      {
        id: "3",
        image: "/media/services/marketing/3.jpg",
        video: "/media/services/marketing/3.mp4",
        label: { vi: "Ads & KPI", de: "Ads & KPI" },
        kind: "image",
      },
    ],
  },
};

export function getServiceMedia(slug: string): ServiceMediaLibrary {
  return (
    SERVICE_MEDIA[slug] ?? {
      folder: slug,
      items: [],
    }
  );
}

export async function probeUrl(url: string): Promise<boolean> {
  if (!url) return false;
  const lower = url.toLowerCase();
  if (lower.endsWith(".mp4") || lower.endsWith(".webm") || lower.endsWith(".mov")) {
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

export type ResolvedServiceMedia = {
  id: string;
  src: string;
  type: "video" | "image";
  label: { vi: string; de: string };
};

/** Resolve first working video or image for each library item */
/** Try primary path + common alt extensions */
async function resolveItemSrc(
  primary?: string
): Promise<{ src: string; type: "video" | "image" } | null> {
  if (!primary) return null;
  const candidates = [primary];
  // allow .jpg/.png/.webp swap for images
  if (/\.(jpg|jpeg|png|webp)$/i.test(primary)) {
    const base = primary.replace(/\.(jpg|jpeg|png|webp)$/i, "");
    candidates.push(`${base}.jpg`, `${base}.jpeg`, `${base}.png`, `${base}.webp`);
  }
  if (/\.(mp4|webm)$/i.test(primary)) {
    const base = primary.replace(/\.(mp4|webm)$/i, "");
    candidates.push(`${base}.mp4`, `${base}.webm`);
  }
  const seen = new Set<string>();
  for (const url of candidates) {
    if (seen.has(url)) continue;
    seen.add(url);
    if (await probeUrl(url)) {
      const type = /\.(mp4|webm|mov)$/i.test(url) ? "video" : "image";
      return { src: url, type };
    }
  }
  return null;
}

export async function resolveServiceMedia(
  lib: ServiceMediaLibrary
): Promise<ResolvedServiceMedia[]> {
  const out: ResolvedServiceMedia[] = [];
  for (const item of lib.items) {
    const vid = await resolveItemSrc(item.video);
    if (vid?.type === "video") {
      out.push({ id: item.id, src: vid.src, type: "video", label: item.label });
      continue;
    }
    const img = await resolveItemSrc(item.image);
    if (img) {
      out.push({ id: item.id, src: img.src, type: img.type, label: item.label });
    }
  }
  return out;
}
