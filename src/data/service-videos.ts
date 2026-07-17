/**
 * Service Ecosystem — đúng 1 video intro riêng cho mỗi dịch vụ.
 * KHÔNG dùng chung ảnh public (vd. 1.png).
 *
 * Local:
 *   /media/services/{folder}/intro.mp4
 *
 * Hoặc gán URL ngoài (CDN / direct mp4) vào field `video`.
 */

export type ServiceVideoTopic = {
  slug: string;
  folder: string;
  code: string;
  /**
   * Link video duy nhất của dịch vụ này.
   * Có thể là path local (/media/...) hoặc URL https://...mp4
   */
  video: string;
  /** Poster riêng (tuỳ chọn) — không dùng ảnh chung */
  poster?: string;
};

export const SERVICE_VIDEO_TOPICS: ServiceVideoTopic[] = [
  {
    slug: "cnc-manufacturing",
    folder: "cnc",
    code: "CNC",
    video: "/media/services/cnc/intro.mp4",
    poster: "/media/services/cnc/poster.jpg",
  },
  {
    slug: "werbetechnik",
    folder: "werbetechnik",
    code: "SGN",
    video: "/media/services/werbetechnik/intro.mp4",
    poster: "/media/services/werbetechnik/poster.jpg",
  },
  {
    slug: "printing",
    folder: "printing",
    code: "PRT",
    video: "/media/services/printing/intro.mp4",
    poster: "/media/services/printing/poster.jpg",
  },
  {
    slug: "branding",
    folder: "branding",
    code: "BRD",
    video: "/media/services/branding/intro.mp4",
    poster: "/media/services/branding/poster.jpg",
  },
  {
    slug: "website",
    folder: "website",
    code: "WEB",
    video: "/media/services/website/intro.mp4",
    poster: "/media/services/website/poster.jpg",
  },
  {
    slug: "marketing",
    folder: "marketing",
    code: "MKT",
    video: "/media/services/marketing/intro.mp4",
    poster: "/media/services/marketing/poster.jpg",
  },
];

export function getTopicBySlug(slug: string) {
  return SERVICE_VIDEO_TOPICS.find((t) => t.slug === slug) ?? SERVICE_VIDEO_TOPICS[0];
}

async function probeVideo(url: string): Promise<boolean> {
  if (!url) return false;
  return new Promise((resolve) => {
    const v = document.createElement("video");
    v.preload = "metadata";
    v.onloadedmetadata = () => resolve(true);
    v.onerror = () => resolve(false);
    // cache-bust local relative paths lightly
    v.src = url;
  });
}

async function probeImage(url: string): Promise<boolean> {
  if (!url) return false;
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

export async function resolveTopicMedia(topic: ServiceVideoTopic): Promise<{
  video?: string;
  poster?: string;
}> {
  const videoOk = await probeVideo(topic.video);
  const posterOk = topic.poster ? await probeImage(topic.poster) : false;
  return {
    video: videoOk ? topic.video : undefined,
    poster: posterOk ? topic.poster : undefined,
  };
}
