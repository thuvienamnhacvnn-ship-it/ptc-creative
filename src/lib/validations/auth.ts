import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: "password_min" })
  .regex(/[A-Za-z]/, { message: "password_letter" })
  .regex(/[0-9]/, { message: "password_number" });

export const registerSchema = z
  .object({
    name: z.string().min(2, { message: "name_required" }).max(120),
    email: z.string().email({ message: "email_invalid" }).max(200),
    phone: z.string().min(6, { message: "phone_required" }).max(40),
    password: passwordSchema,
    confirmPassword: z.string(),
    accountType: z.enum(["PERSONAL", "BUSINESS"]),
    companyName: z.string().max(200).optional().or(z.literal("")),
    address: z.string().min(5, { message: "address_required" }).max(400),
    preferredLocale: z.enum(["vi", "de"]),
    termsAccepted: z.boolean(),
    privacyAccepted: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({ code: "custom", path: ["confirmPassword"], message: "password_mismatch" });
    }
    if (data.accountType === "BUSINESS" && !data.companyName?.trim()) {
      ctx.addIssue({ code: "custom", path: ["companyName"], message: "company_required" });
    }
    if (!data.termsAccepted) {
      ctx.addIssue({ code: "custom", path: ["termsAccepted"], message: "terms_required" });
    }
    if (!data.privacyAccepted) {
      ctx.addIssue({ code: "custom", path: ["privacyAccepted"], message: "privacy_required" });
    }
  });

export const loginSchema = z.object({
  email: z.string().email({ message: "email_invalid" }),
  password: z.string().min(1, { message: "password_required" }),
  remember: z.boolean().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "email_invalid" }),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(10),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "password_mismatch",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
