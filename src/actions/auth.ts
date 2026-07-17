"use server";

import { AuthError } from "next-auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { generateToken, hashToken } from "@/lib/tokens";
import { sendEmail } from "@/lib/email";
import { emails } from "@/lib/email-templates";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/lib/validations/auth";
import { signIn, signOut, auth } from "@/auth";
import { audit } from "@/lib/audit";
import type { Locale } from "@/types";

export type ActionResult = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  message?: string;
};

function appUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export async function registerAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
    accountType: String(formData.get("accountType") ?? "PERSONAL"),
    companyName: String(formData.get("companyName") ?? ""),
    address: String(formData.get("address") ?? ""),
    preferredLocale: String(formData.get("preferredLocale") ?? "vi"),
    termsAccepted: formData.get("termsAccepted") === "on" || formData.get("termsAccepted") === "true",
    privacyAccepted:
      formData.get("privacyAccepted") === "on" || formData.get("privacyAccepted") === "true",
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: "validation",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const h = await headers();
  const ip = clientIp(h);
  const limited = await rateLimit({
    key: `register:${ip}`,
    limit: 5,
    windowMs: 60 * 60 * 1000,
    ip,
  });
  if (!limited.ok) return { ok: false, error: "rate_limited" };

  const email = parsed.data.email.toLowerCase();
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return { ok: false, error: "email_taken" };

  const passwordHash = await hashPassword(parsed.data.password);
  const now = new Date();

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name: parsed.data.name,
      phone: parsed.data.phone,
      accountType: parsed.data.accountType,
      preferredLocale: parsed.data.preferredLocale,
      role: "USER",
      termsAcceptedAt: now,
      privacyAcceptedAt: now,
      company:
        parsed.data.accountType === "BUSINESS" && parsed.data.companyName
          ? { create: { name: parsed.data.companyName } }
          : undefined,
      addresses: {
        create: {
          line1: parsed.data.address,
          city: "—",
          postalCode: "00000",
          country: "DE",
          isPrimary: true,
        },
      },
      consentLogs: {
        create: [
          { type: "terms", granted: true, version: "1.0", ip },
          { type: "privacy", granted: true, version: "1.0", ip },
        ],
      },
    },
  });

  const token = generateToken();
  await prisma.emailVerificationToken.create({
    data: {
      userId: user.id,
      token: hashToken(token),
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  const locale = parsed.data.preferredLocale as Locale;
  const url = `${appUrl()}/${locale}/verify-email?token=${token}`;
  await sendEmail({ to: user.email, ...emails.verifyAccount(locale, user.name, url) });
  await audit({ userId: user.id, action: "auth.register", entity: "User", entityId: user.id, ip });

  return { ok: true, message: "register_success" };
}

export async function loginAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = loginSchema.safeParse({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    remember: formData.get("remember") === "on" || formData.get("remember") === "true",
  });
  if (!parsed.success) {
    return {
      ok: false,
      error: "validation",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      remember: parsed.data.remember ? "true" : "false",
      redirect: false,
    });
    return { ok: true, message: "login_success" };
  } catch (e) {
    if (e instanceof AuthError) {
      const causeMsg = String((e.cause as { err?: Error })?.err?.message ?? e.message ?? "");
      if (causeMsg.includes("EMAIL_NOT_VERIFIED")) return { ok: false, error: "email_not_verified" };
      if (causeMsg.includes("RATE_LIMITED")) return { ok: false, error: "rate_limited" };
      return { ok: false, error: "invalid_credentials" };
    }
    const err = e as { cause?: { err?: { message?: string } }; message?: string; digest?: string };
    if (String(err?.message ?? "").includes("NEXT_REDIRECT") || err?.digest?.includes("NEXT_REDIRECT")) {
      throw e;
    }
    const causeMsg = err?.cause?.err?.message ?? err?.message ?? "";
    if (causeMsg.includes("EMAIL_NOT_VERIFIED")) return { ok: false, error: "email_not_verified" };
    if (causeMsg.includes("RATE_LIMITED")) return { ok: false, error: "rate_limited" };
    return { ok: false, error: "invalid_credentials" };
  }
}

export async function logoutAction() {
  await signOut({ redirect: false });
  return { ok: true as const };
}

export async function verifyEmailAction(token: string): Promise<ActionResult> {
  if (!token) return { ok: false, error: "invalid_token" };
  const hashed = hashToken(token);
  const record = await prisma.emailVerificationToken.findUnique({ where: { token: hashed } });
  if (!record || record.expires < new Date()) return { ok: false, error: "invalid_token" };

  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { emailVerified: new Date() },
    }),
    prisma.emailVerificationToken.deleteMany({ where: { userId: record.userId } }),
  ]);
  await audit({ userId: record.userId, action: "auth.email_verified", entity: "User", entityId: record.userId });
  return { ok: true, message: "email_verified" };
}

export async function forgotPasswordAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = forgotPasswordSchema.safeParse({ email: String(formData.get("email") ?? "") });
  if (!parsed.success) return { ok: false, error: "validation" };

  const h = await headers();
  const ip = clientIp(h);
  const limited = await rateLimit({ key: `forgot:${ip}`, limit: 5, windowMs: 60 * 60 * 1000, ip });
  if (!limited.ok) return { ok: false, error: "rate_limited" };

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  if (user) {
    const token = generateToken();
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token: hashToken(token),
        expires: new Date(Date.now() + 60 * 60 * 1000),
      },
    });
    const locale = user.preferredLocale as Locale;
    const url = `${appUrl()}/${locale}/reset-password?token=${token}`;
    await sendEmail({ to: user.email, ...emails.resetPassword(locale, user.name, url) });
  }
  return { ok: true, message: "reset_sent" };
}

export async function resetPasswordAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = resetPasswordSchema.safeParse({
    token: String(formData.get("token") ?? ""),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
  });
  if (!parsed.success) {
    return {
      ok: false,
      error: "validation",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const hashed = hashToken(parsed.data.token);
  const record = await prisma.passwordResetToken.findUnique({ where: { token: hashed } });
  if (!record || record.expires < new Date() || record.usedAt) {
    return { ok: false, error: "invalid_token" };
  }

  const passwordHash = await hashPassword(parsed.data.password);
  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
  ]);
  return { ok: true, message: "password_reset" };
}

export async function setAiConsentAction(granted: boolean): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "unauthorized" };
  const h = await headers();
  await prisma.user.update({
    where: { id: session.user.id },
    data: { aiConsentAt: granted ? new Date() : null },
  });
  await prisma.consentLog.create({
    data: {
      userId: session.user.id,
      type: "ai_processing",
      granted,
      version: "1.0",
      ip: clientIp(h),
    },
  });
  return { ok: true };
}

export async function requestAccountDeletionAction(): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "unauthorized" };
  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      deletedAt: new Date(),
      isActive: false,
      email: `deleted+${session.user.id}@invalid.local`,
      name: "Deleted User",
      phone: null,
      passwordHash: null,
    },
  });
  await audit({ userId: session.user.id, action: "gdpr.delete_request", entity: "User", entityId: session.user.id });
  await signOut({ redirect: false });
  return { ok: true, message: "account_deleted" };
}

export async function exportMyDataAction(): Promise<ActionResult & { data?: unknown }> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "unauthorized" };
  const data = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      company: true,
      addresses: true,
      quoteRequests: true,
      projectsOwned: true,
      appointments: true,
      consentLogs: true,
      notifications: { take: 100 },
    },
  });
  await audit({ userId: session.user.id, action: "gdpr.export", entity: "User", entityId: session.user.id });
  return { ok: true, data };
}

export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.id) return null;
  return prisma.user.findUnique({
    where: { id: session.user.id },
    include: { company: true, addresses: true },
  });
}
