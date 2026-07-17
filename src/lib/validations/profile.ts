import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(6).max(40).optional().or(z.literal("")),
  accountType: z.enum(["PERSONAL", "BUSINESS"]),
  companyName: z.string().max(200).optional().or(z.literal("")),
  address: z.string().max(400).optional().or(z.literal("")),
  preferredLocale: z.enum(["vi", "de"]),
});

export const appointmentSchema = z.object({
  title: z.string().min(3).max(200),
  notes: z.string().max(2000).optional(),
  startsAt: z.string().datetime({ offset: true }).or(z.string().min(10)),
  endsAt: z.string().datetime({ offset: true }).or(z.string().min(10)),
  location: z.string().max(300).optional(),
  projectId: z.string().optional(),
});

export const feedbackSchema = z.object({
  projectId: z.string(),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  message: z.string().min(3).max(3000),
});

export const designReviewSchema = z.object({
  projectId: z.string(),
  reviewId: z.string(),
  status: z.enum(["APPROVED", "CHANGES_REQUESTED"]),
  comment: z.string().max(3000).optional(),
});
