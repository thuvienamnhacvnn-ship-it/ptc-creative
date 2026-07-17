import type { BlogCategoryKey } from "@/types";

/** Accent + short label for blog taxonomy UI */
export const BLOG_CAT_META: Record<
  BlogCategoryKey,
  { color: string; short: { vi: string; de: string } }
> = {
  marketing: {
    color: "#34d399",
    short: { vi: "Growth & ads", de: "Growth & Ads" },
  },
  tax: {
    color: "#fbbf24",
    short: { vi: "Vận hành pháp lý", de: "Recht & Ops" },
  },
  business: {
    color: "#f472b6",
    short: { vi: "SME playbook", de: "KMU-Playbook" },
  },
  germany: {
    color: "#a78bfa",
    short: { vi: "Local DE", de: "Lokal DE" },
  },
};

export function blogCatColor(key: BlogCategoryKey | string | undefined): string {
  if (key && key in BLOG_CAT_META) {
    return BLOG_CAT_META[key as BlogCategoryKey].color;
  }
  return "#818cf8";
}
