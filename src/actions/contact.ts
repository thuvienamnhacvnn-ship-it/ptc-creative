"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";
import { emails } from "@/lib/email-templates";
import { generateReference } from "@/lib/tokens";
import { z } from "zod";
import type { ActionResult } from "@/actions/auth";
import type { Locale } from "@/types";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  company: z.string().max(200).optional(),
  service: z.string().max(120).optional(),
  message: z.string().min(10).max(5000),
  locale: z.enum(["vi", "de"]).default("vi"),
});

export async function submitContactAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = schema.safeParse({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? "") || undefined,
    company: String(formData.get("company") ?? "") || undefined,
    service: String(formData.get("service") ?? "") || undefined,
    message: String(formData.get("message") ?? ""),
    locale: String(formData.get("locale") ?? "vi"),
  });
  if (!parsed.success) return { ok: false, error: "validation" };

  const h = await headers();
  const ip = clientIp(h);
  const limited = await rateLimit({ key: `contact:${ip}`, limit: 8, windowMs: 60 * 60 * 1000, ip });
  if (!limited.ok) return { ok: false, error: "rate_limited" };

  const submission = await prisma.contactSubmission.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      phone: parsed.data.phone,
      company: parsed.data.company,
      service: parsed.data.service,
      message: parsed.data.message,
      locale: parsed.data.locale,
    },
  });

  await prisma.lead.create({
    data: {
      reference: generateReference("LD"),
      source: "CONTACT",
      status: "NEW",
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      phone: parsed.data.phone,
      company: parsed.data.company,
      locale: parsed.data.locale,
      contactId: submission.id,
      score: 40,
    },
  });

  await sendEmail({
    to: parsed.data.email,
    ...emails.contactReceived(parsed.data.locale as Locale, parsed.data.name),
  });

  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    await sendEmail({
      to: adminEmail,
      ...emails.adminNewLead(parsed.data.name, parsed.data.email, "CONTACT"),
    });
  }

  return { ok: true, message: "contact_sent" };
}
