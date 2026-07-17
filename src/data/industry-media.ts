/**
 * Media library for industry solutions.
 *
 * Primary (thả file vào đây):
 *   public/media/solutions/{slug}/
 *     cover.jpg | cover.png | cover.webp
 *     1.jpg … 6.jpg
 *     hero.mp4 | demo.mp4 | process.mp4
 *     poster.jpg
 *
 * Fallback demo: public/media/services/* (đã có ảnh)
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

const exts = ["jpg", "jpeg", "png", "webp"] as const;

function stills(pathNoExt: string): string[] {
  return exts.map((e) => `${pathNoExt}.${e}`);
}

function sol(folder: string, name: string): string[] {
  return stills(`/media/solutions/${folder}/${name}`);
}

function svc(folder: string, name: string): string[] {
  return stills(`/media/services/${folder}/${name}`);
}

function videos(folder: string): string[] {
  return [
    `/media/solutions/${folder}/hero.mp4`,
    `/media/solutions/${folder}/demo.mp4`,
    `/media/solutions/${folder}/process.mp4`,
    `/media/solutions/${folder}/hero.webm`,
    `/media/solutions/${folder}/1.mp4`,
    // service loops as soft fallback if present later
    `/media/services/werbetechnik/cover.mp4`,
    `/media/services/website/cover.mp4`,
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
  const folders = SERVICE_FALLBACK[slug] ?? ["branding", "website", "cnc", "printing"];
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
      `/media/services/${f}/3.jpg`,
      `/media/services/${f}/4.jpg`
    );
  }
  return out;
}

export function industryMedia(slug: string): IndustryMediaPaths {
  const folder = slug;
  const galleryNames = ["1", "2", "3", "4", "5", "6"] as const;

  const coverCandidates = [
    ...sol(folder, "cover"),
    ...sol(folder, "hero"),
    ...sol(folder, "1"),
    ...serviceGallery(slug).slice(0, 8),
  ];

  const galleryPreferred = galleryNames.flatMap((n) => [
    `/media/solutions/${folder}/${n}.jpg`,
    `/media/solutions/${folder}/${n}.png`,
  ]);

  const galleryFallback = serviceGallery(slug);

  const galleryCandidates = galleryNames.map((n, i) => {
    const fromSol = sol(folder, n);
    // each slot also tries a service still
    const fb = galleryFallback.slice(i * 2, i * 2 + 4);
    return [...fromSol, ...fb];
  });

  // Flatten preferred display list (unique order)
  const galleryDisplay = [
    ...galleryPreferred,
    ...galleryFallback,
  ].filter((v, i, a) => a.indexOf(v) === i);

  return {
    folder: `media/solutions/${folder}`,
    cover: `/media/solutions/${folder}/cover.jpg`,
    coverCandidates,
    gallery: galleryDisplay.slice(0, 12),
    galleryCandidates,
    video: `/media/solutions/${folder}/hero.mp4`,
    videoCandidates: videos(folder),
    poster: `/media/solutions/${folder}/poster.jpg`,
    posterCandidates: [
      ...sol(folder, "poster"),
      ...sol(folder, "cover"),
      ...serviceGallery(slug).slice(0, 4),
    ],
  };
}
