/**
 * Media library for industry solutions.
 *
 * Primary (thả file vào đây):
 *   public/media/solutions/{slug}/
 *     {slug}.png | {slug}.jpg     ★ cover theo tên ngành (đang dùng)
 *     cover.jpg | cover.png | cover.webp
 *     1.jpg … 6.jpg
 *     hero.mp4 | demo.mp4 | process.mp4
 *     poster.jpg
 *
 * Fallback: public/media/services/*
 * Component probe candidates; missing → gradient.
 */

export type IndustryMediaPaths = {
  folder: string;
  cover: string;
  coverCandidates: string[];
  gallery: string[];
  galleryCandidates: string[][];
  video?: string;
  videoCandidates: string[];
  poster?: string;
  posterCandidates: string[];
};

const exts = ["png", "jpg", "jpeg", "webp"] as const;

function stills(pathNoExt: string): string[] {
  return exts.map((e) => `${pathNoExt}.${e}`);
}

function sol(folder: string, name: string): string[] {
  return stills(`/media/solutions/${folder}/${name}`);
}

function unique(paths: string[]): string[] {
  return [...new Set(paths.filter(Boolean))];
}

function videos(folder: string): string[] {
  return [
    `/media/solutions/${folder}/hero.mp4`,
    `/media/solutions/${folder}/demo.mp4`,
    `/media/solutions/${folder}/process.mp4`,
    `/media/solutions/${folder}/hero.webm`,
    `/media/solutions/${folder}/1.mp4`,
  ];
}

/** Map ngành → thư mục services dùng làm minh họa tạm */
const SERVICE_FALLBACK: Record<string, string[]> = {
  restaurant: ["branding", "printing", "werbetechnik", "marketing"],
  nail: ["branding", "website", "marketing", "printing"],
  salon: ["branding", "werbetechnik", "website", "cnc"],
  shop: ["cnc", "printing", "werbetechnik", "branding"],
  dental: ["printing", "branding", "website", "marketing"],
  logistics: ["werbetechnik", "marketing", "branding", "cnc"],
  enterprise: ["website", "marketing", "branding", "printing"],
};

function serviceGallery(slug: string): string[] {
  const folders = SERVICE_FALLBACK[slug] ?? [
    "branding",
    "website",
    "cnc",
    "printing",
  ];
  const out: string[] = [];
  for (const f of folders) {
    out.push(
      `/media/services/${f}/${f}.png`,
      `/media/services/${f}/${f}.jpg`,
      `/media/services/${f}/cover.png`,
      `/media/services/${f}/cover.jpg`,
      `/media/services/${f}/1.jpg`,
      `/media/services/${f}/1.png`,
      `/media/services/${f}/2.jpg`,
      `/media/services/${f}/3.jpg`
    );
  }
  return out;
}

/**
 * Ảnh cover ưu tiên:
 * 1. {slug}/{slug}.png  (file local hiện có)
 * 2. cover / hero / 1
 * 3. fallback services
 */
export function industryMedia(slug: string): IndustryMediaPaths {
  const folder = slug;
  const galleryNames = ["1", "2", "3", "4", "5", "6"] as const;
  const svcFb = serviceGallery(slug);

  const coverCandidates = unique([
    // Local named by industry slug (restaurant.png, nail.png, …)
    ...sol(folder, folder),
    ...sol(folder, "cover"),
    ...sol(folder, "hero"),
    ...sol(folder, "main"),
    ...sol(folder, "1"),
    ...svcFb.slice(0, 8),
  ]);

  const galleryPreferred = galleryNames.flatMap((n) => [
    `/media/solutions/${folder}/${n}.png`,
    `/media/solutions/${folder}/${n}.jpg`,
    `/media/solutions/${folder}/${n}.webp`,
  ]);

  // Gallery also includes slug cover as first visual when no 1–6 yet
  const galleryDisplay = unique([
    ...sol(folder, folder),
    ...sol(folder, "cover"),
    ...galleryPreferred,
    ...svcFb,
  ]);

  const galleryCandidates = galleryNames.map((n, i) => {
    const fromSol = unique([
      ...sol(folder, n),
      // reuse industry hero as gallery fallback
      ...(i === 0 ? sol(folder, folder) : []),
      ...(i === 0 ? sol(folder, "cover") : []),
    ]);
    const fb = svcFb.slice(i * 2, i * 2 + 4);
    return unique([...fromSol, ...fb]);
  });

  return {
    folder: `media/solutions/${folder}`,
    /** Primary cover path — prefers {slug}.png convention */
    cover: `/media/solutions/${folder}/${folder}.png`,
    coverCandidates,
    gallery: galleryDisplay.slice(0, 12),
    galleryCandidates,
    video: `/media/solutions/${folder}/hero.mp4`,
    videoCandidates: videos(folder),
    poster: `/media/solutions/${folder}/poster.jpg`,
    posterCandidates: unique([
      ...sol(folder, "poster"),
      ...sol(folder, folder),
      ...sol(folder, "cover"),
      ...svcFb.slice(0, 4),
    ]),
  };
}
