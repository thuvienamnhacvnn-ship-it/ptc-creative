/**
 * Home banner full-bleed 16:9 slides.
 * Ảnh local: public/media/banner/{1-6}.png
 * Video optional: public/media/banner/slide-{n}.mp4
 */

export type BannerSlide = {
  id: string;
  /** Video full-bleed (muted loop) — ưu tiên nếu load được */
  video?: string;
  /** Ảnh slide */
  image?: string;
  /** Nhãn nhỏ trên slide (optional) */
  label?: { vi: string; de: string };
  /** Màu overlay gradient (accent tint) */
  tint?: string;
};

export const BANNER_SLIDES: BannerSlide[] = [
  {
    id: "s1",
    image: "/media/banner/1.png",
    video: "/media/banner/slide-1.mp4",
    label: { vi: "Creative platform", de: "Creative Platform" },
    tint: "rgba(255,77,0,0.2)",
  },
  {
    id: "s2",
    image: "/media/banner/2.png",
    video: "/media/banner/slide-2.mp4",
    label: { vi: "CNC & manufacturing", de: "CNC & Manufacturing" },
    tint: "rgba(20,40,70,0.32)",
  },
  {
    id: "s3",
    image: "/media/banner/3.png",
    video: "/media/banner/slide-3.mp4",
    label: { vi: "Werbetechnik", de: "Werbetechnik" },
    tint: "rgba(255,77,0,0.16)",
  },
  {
    id: "s4",
    image: "/media/banner/4.png",
    video: "/media/banner/slide-4.mp4",
    label: { vi: "Printing", de: "Printing" },
    tint: "rgba(30,50,90,0.28)",
  },
  {
    id: "s5",
    image: "/media/banner/5.png",
    video: "/media/banner/slide-5.mp4",
    label: { vi: "Branding & website", de: "Branding & Website" },
    tint: "rgba(255,77,0,0.18)",
  },
  {
    id: "s6",
    image: "/media/banner/6.png",
    video: "/media/banner/slide-6.mp4",
    label: { vi: "Marketing", de: "Marketing" },
    tint: "rgba(15,35,60,0.3)",
  },
];

/** Fallback gradient nếu không load được media */
export const BANNER_FALLBACK_GRADIENT =
  "linear-gradient(135deg, #03060d 0%, #0a1628 35%, #122a4a 65%, #050810 100%)";
