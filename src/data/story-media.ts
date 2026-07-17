/**
 * Story section media (16:9 frame)
 *
 * Ảnh founders:
 *   1a — luôn hiển thị (base)
 *   2a — chỉ hiện khi hover, phủ 100% lên trên 1a
 */
export const STORY_FOUNDERS_PHOTO = {
  /** Ảnh nền luôn hiển thị */
  base: "/media/story/1a.jpeg",
  baseCandidates: [
    "/media/story/1a.jpeg",
    "/media/story/1a.jpg",
    "/media/story/1a.png",
    "/media/story/1a.webp",
  ],
  /** Ảnh hover — cùng kích thước 100%, nằm trên base */
  hover: "/media/story/2a.png",
  hoverCandidates: [
    "/media/story/2a.png",
    "/media/story/2a.jpg",
    "/media/story/2a.jpeg",
    "/media/story/2a.webp",
  ],
} as const;
