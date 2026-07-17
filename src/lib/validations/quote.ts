import { z } from "zod";

export const serviceCategoryCodeSchema = z.enum([
  "CNC",
  "WERBETECHNIK",
  "PRINTING",
  "BRANDING",
  "WEBSITE",
  "MARKETING",
]);

/** CNC, Printing, Werbetechnik */
export const productionSpecsSchema = z.object({
  productType: z.string().min(1, { message: "product_type_required" }),
  material: z.string().min(1, { message: "material_required" }),
  widthMm: z.coerce.number().positive({ message: "size_required" }),
  heightMm: z.coerce.number().positive({ message: "size_required" }),
  depthMm: z.coerce.number().positive().optional(),
  thicknessMm: z.coerce.number().positive({ message: "thickness_required" }),
  quantity: z.coerce.number().int().positive({ message: "quantity_required" }),
  color: z.string().min(1, { message: "color_required" }),
  processType: z.string().min(1, { message: "process_required" }),
  finish: z.string().min(1, { message: "finish_required" }),
  designFileNote: z.string().max(1000).optional(),
  deliveryMode: z.enum(["delivery", "installation", "pickup"]).optional(),
  location: z.string().max(300).optional(),
  deadline: z.string().optional(),
  notes: z.string().max(2000).optional(),
});

export const brandingSpecsSchema = z.object({
  projectScope: z.string().min(1),
  hasExistingBrand: z.enum(["yes", "no", "partial"]),
  deliverables: z.array(z.string()).min(1),
  industry: z.string().optional(),
  notes: z.string().max(2000).optional(),
  deadline: z.string().optional(),
});

export const websiteSpecsSchema = z.object({
  industry: z.string().min(1, { message: "industry_required" }),
  siteType: z.enum(["corporate", "landing", "booking", "ecommerce", "redesign", "other"]),
  goals: z.array(z.string()).min(1, { message: "goals_required" }),
  pageCount: z.coerce.number().int().positive({ message: "pages_required" }),
  features: z.array(z.string()).default([]),
  languages: z.array(z.string()).min(1, { message: "languages_required" }),
  referenceSites: z.string().max(1000).optional(),
  budget: z.string().optional(),
  deadline: z.string().optional(),
  notes: z.string().max(2000).optional(),
});

export const marketingSpecsSchema = z.object({
  industry: z.string().min(1),
  customerArea: z.string().min(1, { message: "area_required" }),
  goals: z.array(z.string()).min(1),
  currentChannels: z.array(z.string()).default([]),
  websiteUrl: z.string().max(500).optional(),
  adBudget: z.string().optional(),
  campaignDuration: z.string().optional(),
  kpis: z.array(z.string()).default([]),
  notes: z.string().max(2000).optional(),
});

export const quoteBaseSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().max(5000).optional(),
  categoryCode: serviceCategoryCodeSchema,
  serviceId: z.string().optional(),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  deadline: z.string().optional(),
  location: z.string().max(300).optional(),
  companyName: z.string().max(200).optional(),
  contactPhone: z.string().max(40).optional(),
  locale: z.enum(["vi", "de"]).default("vi"),
  status: z.enum(["DRAFT", "SUBMITTED"]).default("DRAFT"),
});

export const quoteRequestSchema = z.intersection(
  quoteBaseSchema,
  z.discriminatedUnion("categoryCode", [
    z.object({ categoryCode: z.literal("CNC"), specs: productionSpecsSchema }),
    z.object({ categoryCode: z.literal("PRINTING"), specs: productionSpecsSchema }),
    z.object({ categoryCode: z.literal("WERBETECHNIK"), specs: productionSpecsSchema }),
    z.object({ categoryCode: z.literal("BRANDING"), specs: brandingSpecsSchema }),
    z.object({ categoryCode: z.literal("WEBSITE"), specs: websiteSpecsSchema }),
    z.object({ categoryCode: z.literal("MARKETING"), specs: marketingSpecsSchema }),
  ])
);

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
