import type { LabOption, LabPreset, LocalizedString } from "@/types";

export const labIndustries: LabOption[] = [
  { id: "restaurant", label: { vi: "Nhà hàng / F&B", de: "Restaurant / F&B" } },
  { id: "nail", label: { vi: "Nail Studio", de: "Nagelstudio" } },
  { id: "salon", label: { vi: "Salon / Spa", de: "Salon / Spa" } },
  { id: "shop", label: { vi: "Shop / Retail", de: "Shop / Retail" } },
  { id: "dental", label: { vi: "Nha khoa", de: "Zahnarztpraxis" } },
  { id: "logistics", label: { vi: "Logistics", de: "Logistik" } },
  { id: "enterprise", label: { vi: "Doanh nghiệp", de: "Unternehmen" } },
];

export const labProjects: LabOption[] = [
  { id: "launch", label: { vi: "Khai trương / Launch", de: "Eröffnung / Launch" } },
  { id: "rebrand", label: { vi: "Rebrand / Refresh", de: "Rebrand / Refresh" } },
  { id: "facade", label: { vi: "Mặt tiền & Signage", de: "Fassade & Signage" } },
  { id: "digital", label: { vi: "Website & Platform", de: "Website & Plattform" } },
  { id: "full", label: { vi: "Full stack (offline + online)", de: "Full Stack (offline + online)" } },
];

export const labGoals: LabOption[] = [
  { id: "visibility", label: { vi: "Tăng nhận diện đường phố", de: "Straßensichtbarkeit" } },
  { id: "leads", label: { vi: "Tăng lead / booking", de: "Mehr Leads / Buchungen" } },
  { id: "consistency", label: { vi: "Đồng bộ brand multi-touch", de: "Multi-Touch Brand-Konsistenz" } },
  { id: "premium", label: { vi: "Nâng định vị premium", de: "Premium-Positionierung" } },
];

export const labBudgets: LabOption[] = [
  { id: "s", label: { vi: "< 5.000 €", de: "< 5.000 €" } },
  { id: "m", label: { vi: "5.000 – 15.000 €", de: "5.000 – 15.000 €" } },
  { id: "l", label: { vi: "15.000 – 40.000 €", de: "15.000 – 40.000 €" } },
  { id: "xl", label: { vi: "40.000 €+", de: "40.000 €+" } },
];

export const moduleMeta: Record<
  string,
  { title: LocalizedString; code: string; color: string }
> = {
  branding: {
    title: { vi: "Branding", de: "Branding" },
    code: "BRD",
    color: "from-violet-600/30 to-violet-900/40",
  },
  menu: {
    title: { vi: "Menu / Price List", de: "Menü / Preisliste" },
    code: "PRT",
    color: "from-orange-600/30 to-amber-900/40",
  },
  signage: {
    title: { vi: "Signage / Lightbox", de: "Signage / Leuchtkasten" },
    code: "SGN",
    color: "from-yellow-500/20 to-zinc-900/50",
  },
  cnc: {
    title: { vi: "CNC / 3D Letters", de: "CNC / 3D-Buchstaben" },
    code: "CNC",
    color: "from-sky-600/25 to-slate-900/50",
  },
  website: {
    title: { vi: "Website", de: "Website" },
    code: "WEB",
    color: "from-blue-600/25 to-indigo-950/50",
  },
  booking: {
    title: { vi: "Booking Platform", de: "Buchungsplattform" },
    code: "BKG",
    color: "from-cyan-600/20 to-slate-900/50",
  },
  gmb: {
    title: { vi: "Google Business", de: "Google Business" },
    code: "LOC",
    color: "from-emerald-600/25 to-zinc-900/50",
  },
  marketing: {
    title: { vi: "Local Marketing", de: "Local Marketing" },
    code: "MKT",
    color: "from-rose-600/25 to-zinc-900/50",
  },
  wrap: {
    title: { vi: "Fleet Wrap", de: "Flottenfolierung" },
    code: "FLT",
    color: "from-indigo-600/25 to-zinc-900/50",
  },
  wayfinding: {
    title: { vi: "Wayfinding", de: "Wegeleitsystem" },
    code: "WAY",
    color: "from-teal-600/25 to-zinc-900/50",
  },
  print: {
    title: { vi: "Print System", de: "Print-System" },
    code: "PRN",
    color: "from-fuchsia-600/20 to-zinc-900/50",
  },
};

/** Demo resolution engine — pure UI, no backend */
export function resolveLabStack(
  industryId: string,
  projectId: string,
  goalId: string,
  budgetId: string
): { modules: string[]; summary: LocalizedString } {
  const base: Record<string, string[]> = {
    restaurant: ["branding", "menu", "signage", "website", "gmb", "marketing"],
    nail: ["branding", "menu", "signage", "booking", "gmb", "marketing"],
    salon: ["branding", "print", "wayfinding", "website", "marketing"],
    shop: ["branding", "cnc", "signage", "website", "marketing"],
    dental: ["branding", "wayfinding", "print", "website", "gmb"],
    logistics: ["branding", "wrap", "website", "print", "marketing"],
    enterprise: ["branding", "website", "print", "marketing", "cnc"],
  };

  let modules = [...(base[industryId] ?? ["branding", "website"])];

  if (projectId === "facade") {
    modules = ["signage", "cnc", "branding", ...modules.filter((m) => !["signage", "cnc", "branding"].includes(m))].slice(0, 5);
  }
  if (projectId === "digital") {
    modules = ["website", "booking", "gmb", "marketing", "branding"].filter((m, i, a) => a.indexOf(m) === i).slice(0, 5);
  }
  if (projectId === "rebrand") {
    modules = ["branding", ...modules.filter((m) => m !== "branding")];
  }
  if (goalId === "leads" && !modules.includes("website")) modules.unshift("website");
  if (goalId === "visibility" && !modules.includes("signage")) modules.unshift("signage");
  if (budgetId === "s") modules = modules.slice(0, 3);
  if (budgetId === "m") modules = modules.slice(0, 4);
  if (budgetId === "xl" && !modules.includes("cnc")) modules.push("cnc");

  const summary: LocalizedString = {
    vi: `Stack ${industryId} · ${projectId} — ${modules.length} modules được ưu tiên theo mục tiêu ${goalId} và ngân sách ${budgetId}.`,
    de: `Stack ${industryId} · ${projectId} — ${modules.length} Module priorisiert nach Ziel ${goalId} und Budget ${budgetId}.`,
  };

  return { modules: [...new Set(modules)], summary };
}

export const labPresets: LabPreset[] = [
  {
    industryId: "restaurant",
    projectId: "launch",
    modules: ["branding", "menu", "signage", "website", "gmb", "marketing"],
    summary: {
      vi: "Launch F&B Berlin: brand → menu → signage → web → local growth.",
      de: "F&B-Launch Berlin: Brand → Menü → Signage → Web → Local Growth.",
    },
  },
];

/** Keyword demo for hero idea input */
export function resolveIdeaDemo(idea: string): string[] {
  const q = idea.toLowerCase();
  if (q.includes("nail") || q.includes("móng")) {
    return ["branding", "menu", "signage", "booking", "gmb", "marketing"];
  }
  if (q.includes("salon") || q.includes("spa") || q.includes("hair")) {
    return ["branding", "wayfinding", "signage", "website", "marketing"];
  }
  if (q.includes("dental") || q.includes("nha") || q.includes("zahn")) {
    return ["branding", "wayfinding", "print", "website", "gmb"];
  }
  if (q.includes("logist") || q.includes("fleet") || q.includes("xe")) {
    return ["branding", "wrap", "website", "print", "marketing"];
  }
  if (q.includes("shop") || q.includes("retail") || q.includes("cửa hàng")) {
    return ["branding", "cnc", "signage", "website", "marketing"];
  }
  // default restaurant / general business
  return ["branding", "menu", "signage", "website", "gmb", "marketing"];
}
