export type Locale = "vi" | "de";

export type LocalizedString = Record<Locale, string>;

export type LocalizedStringArray = Record<Locale, string[]>;

export interface NavItem {
  href: string;
  labelKey: string;
  children?: { href: string; labelKey: string; descKey?: string }[];
}

export interface ServiceItem {
  slug: string;
  icon: string;
  title: LocalizedString;
  short: LocalizedString;
  description: LocalizedString;
  capabilities: LocalizedStringArray;
  benefits: LocalizedStringArray;
  submenu: { slug: string; title: LocalizedString }[];
  visual: "cnc" | "signage" | "print" | "brand" | "web" | "growth";
  specs: string[];
  /** Brand accent for this service (hex) */
  color: string;
  /** Cover + gallery under public/media/services/... */
  cover: string;
  gallery: string[];
}

/** One deep solution pillar within an industry stack */
export interface IndustrySolutionPillar {
  id: string;
  title: LocalizedString;
  desc: LocalizedString;
  /** Related service slugs under /services/... */
  services?: string[];
  /** Deep feature bullets for home explorer */
  features?: LocalizedStringArray;
  /** Outcome / impact of this pillar */
  impact?: LocalizedString;
}

export interface IndustryItem {
  slug: string;
  icon: string;
  title: LocalizedString;
  short: LocalizedString;
  description: LocalizedString;
  painPoints: LocalizedStringArray;
  deliverables: LocalizedStringArray;
  package: LocalizedString;
  modules: string[];
  palette: string;
  /** Accent hex for UI chrome */
  color?: string;
  /** Deep solution pillars (signage, digital, ops…) */
  solutions: IndustrySolutionPillar[];
  /** Expected outcomes / KPIs */
  outcomes: LocalizedStringArray;
  /** Typical delivery window */
  timeline: LocalizedString;
  /** Who this stack fits */
  idealFor: LocalizedStringArray;
  /**
   * Local media folder under public/
   * e.g. media/solutions/restaurant
   */
  mediaFolder: string;
  /** Cover image path under public/ */
  cover: string;
  /** Gallery stills */
  gallery: string[];
  /** Optional hero / process video */
  video?: string;
  /** Poster for video */
  videoPoster?: string;
}

export type PortfolioCategory = "website" | "cnc" | "print" | "signage";

export interface PortfolioItem {
  id: string;
  title: LocalizedString;
  category: PortfolioCategory;
  industry: string;
  description: LocalizedString;
  tags: string[];
  gradient: string;
  services: string[];
  materials: LocalizedString;
  duration: LocalizedString;
  result: LocalizedString;
  beforeLabel: LocalizedString;
  afterLabel: LocalizedString;
  /** Cover image for filmstrip / hero */
  cover?: string;
  coverCandidates?: string[];
  /** Full illustration gallery (preferred paths) */
  gallery?: string[];
  galleryCandidates?: string[];
  /** Optional before / after photos for lens */
  beforeImage?: string;
  beforeCandidates?: string[];
  afterImage?: string;
  afterCandidates?: string[];
}

export interface PricingTier {
  id: string;
  name: LocalizedString;
  priceFrom: string;
  unit: LocalizedString;
  description: LocalizedString;
  features: LocalizedStringArray;
  highlighted?: boolean;
  /** Typical delivery window for this tier */
  timeline?: LocalizedString;
  /** Ideal client / use case */
  bestFor?: LocalizedString;
}

export interface PricingCategory {
  id: string;
  title: LocalizedString;
  /** One-line module pitch */
  short: LocalizedString;
  icon: string;
  /** Accent hex for UI */
  color: string;
  /** What moves the final quote */
  drivers?: LocalizedStringArray;
  /** Module-level scope note */
  scopeNote?: LocalizedString;
  tiers: PricingTier[];
}

export type BlogCategoryKey = "marketing" | "tax" | "business" | "germany";

export interface BlogPost {
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString;
  category: LocalizedString;
  /** Filter key aligned with platform blog taxonomy */
  categoryKey: BlogCategoryKey;
  date: string;
  readTime: number;
  gradient: string;
}

export interface FaqItem {
  id: string;
  category: string;
  question: LocalizedString;
  answer: LocalizedString;
}

export interface TeamMember {
  id: string;
  name: string;
  fullName?: LocalizedString;
  role: LocalizedString;
  /** Short specialty line */
  focus?: LocalizedString;
  bio: LocalizedString;
  initials: string;
  /** Staff code e.g. PTC-01 */
  code?: string;
  department?: LocalizedString;
  location?: string;
  /** City / country display */
  basedIn?: LocalizedString;
  email?: string;
  /** Direct phone (display or E.164) — falls back to SITE.phone */
  phone?: string;
  /** Phone display label e.g. +49 … */
  phoneDisplay?: string;
  /** Zalo chat / OA link — falls back to SITE.social.zalo */
  zalo?: string;
  /** Years in the field */
  experienceYears?: number;
  /** Joined PTC year */
  joinYear?: number;
  languages?: LocalizedStringArray;
  skills?: LocalizedStringArray;
  expertise?: LocalizedStringArray;
  education?: LocalizedString;
  availability?: LocalizedString;
  workMode?: LocalizedString;
  /** Primary portrait under public/ e.g. /media/team/phu.jpg */
  photo?: string;
  /** Ordered fallbacks if primary missing */
  photoCandidates?: string[];
  /** Intro / profile video under public/ e.g. /media/team/phu.mp4 */
  video?: string;
  videoCandidates?: string[];
  gradient?: string;
}

export interface LabOption {
  id: string;
  label: LocalizedString;
}

export interface LabPreset {
  industryId: string;
  projectId: string;
  modules: string[];
  summary: LocalizedString;
}
