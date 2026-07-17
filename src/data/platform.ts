/**
 * Canonical platform sitemap — used by header mega-menu, footer, and home map.
 * Keep style/paths aligned with App Router routes.
 */

export type PlatformLink = {
  href: string;
  title: { vi: string; de: string };
};

export const ABOUT_LINKS: PlatformLink[] = [
  {
    href: "/about#story",
    title: { vi: "Câu chuyện PTC", de: "Unsere Geschichte" },
  },
  {
    href: "/about#team",
    title: { vi: "Đội ngũ", de: "Team" },
  },
  {
    href: "/about#process",
    title: { vi: "Quy trình làm việc", de: "Arbeitsprozess" },
  },
];

export const PORTFOLIO_LINKS: PlatformLink[] = [
  {
    href: "/portfolio?cat=website",
    title: { vi: "Website", de: "Website" },
  },
  {
    href: "/portfolio?cat=cnc",
    title: { vi: "CNC", de: "CNC" },
  },
  {
    href: "/portfolio?cat=print",
    title: { vi: "Print", de: "Print" },
  },
  {
    href: "/portfolio?cat=signage",
    title: { vi: "Signage", de: "Signage" },
  },
];

export const BLOG_CATEGORY_LINKS: PlatformLink[] = [
  {
    href: "/blog?cat=marketing",
    title: { vi: "Marketing", de: "Marketing" },
  },
  {
    href: "/blog?cat=tax",
    title: { vi: "Thuế", de: "Steuern" },
  },
  {
    href: "/blog?cat=business",
    title: { vi: "Doanh nghiệp", de: "Unternehmen" },
  },
  {
    href: "/blog?cat=germany",
    title: { vi: "Kinh nghiệm kinh doanh tại Đức", de: "Business in Deutschland" },
  },
];

export const PRIMARY_NAV = [
  { href: "/about", key: "about" as const },
  { href: "/services", key: "services" as const },
  { href: "/solutions", key: "solutions" as const },
  { href: "/portfolio", key: "portfolio" as const },
  { href: "/pricing", key: "pricing" as const },
  { href: "/blog", key: "blog" as const },
  { href: "/faq", key: "faq" as const },
  { href: "/contact", key: "contact" as const },
];
