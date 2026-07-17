"use server";

import { revalidatePath } from "next/cache";
import type { Prisma, QuoteStatus } from "@prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hasPermission } from "@/lib/rbac";
import { generateReference } from "@/lib/tokens";
import { quoteRequestSchema } from "@/lib/validations/quote";
import { audit } from "@/lib/audit";
import { sendEmail } from "@/lib/email";
import { emails } from "@/lib/email-templates";
import type { ActionResult } from "@/actions/auth";
import type { Locale } from "@/types";

function parseSpecs(category: string, formData: FormData): unknown {
  if (category === "CNC" || category === "PRINTING" || category === "WERBETECHNIK") {
    return {
      productType: String(formData.get("productType") ?? ""),
      material: String(formData.get("material") ?? ""),
      widthMm: formData.get("widthMm"),
      heightMm: formData.get("heightMm"),
      depthMm: formData.get("depthMm") || undefined,
      thicknessMm: formData.get("thicknessMm"),
      quantity: formData.get("quantity"),
      color: String(formData.get("color") ?? ""),
      processType: String(formData.get("processType") ?? ""),
      finish: String(formData.get("finish") ?? ""),
      designFileNote: String(formData.get("designFileNote") ?? "") || undefined,
      deliveryMode: String(formData.get("deliveryMode") ?? "") || undefined,
      location: String(formData.get("location") ?? "") || undefined,
      deadline: String(formData.get("deadline") ?? "") || undefined,
      notes: String(formData.get("notes") ?? "") || undefined,
    };
  }
  if (category === "WEBSITE") {
    return {
      industry: String(formData.get("industry") ?? ""),
      siteType: String(formData.get("siteType") ?? "corporate"),
      goals: formData.getAll("goals").map(String),
      pageCount: formData.get("pageCount"),
      features: formData.getAll("features").map(String),
      languages: formData.getAll("languages").map(String),
      referenceSites: String(formData.get("referenceSites") ?? "") || undefined,
      budget: String(formData.get("budget") ?? "") || undefined,
      deadline: String(formData.get("deadline") ?? "") || undefined,
      notes: String(formData.get("notes") ?? "") || undefined,
    };
  }
  if (category === "MARKETING") {
    return {
      industry: String(formData.get("industry") ?? ""),
      customerArea: String(formData.get("customerArea") ?? ""),
      goals: formData.getAll("goals").map(String),
      currentChannels: formData.getAll("currentChannels").map(String),
      websiteUrl: String(formData.get("websiteUrl") ?? "") || undefined,
      adBudget: String(formData.get("adBudget") ?? "") || undefined,
      campaignDuration: String(formData.get("campaignDuration") ?? "") || undefined,
      kpis: formData.getAll("kpis").map(String),
      notes: String(formData.get("notes") ?? "") || undefined,
    };
  }
  if (category === "BRANDING") {
    return {
      projectScope: String(formData.get("projectScope") ?? ""),
      hasExistingBrand: String(formData.get("hasExistingBrand") ?? "no"),
      deliverables: formData.getAll("deliverables").map(String),
      industry: String(formData.get("industry") ?? "") || undefined,
      notes: String(formData.get("notes") ?? "") || undefined,
      deadline: String(formData.get("deadline") ?? "") || undefined,
    };
  }
  return {};
}

export async function upsertQuoteRequestAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult & { id?: string; reference?: string }> {
  const session = await auth();
  if (!session?.user?.id || !hasPermission(session.user.role, "quotes:own")) {
    return { ok: false, error: "unauthorized" };
  }

  const categoryCode = String(formData.get("categoryCode") ?? formData.get("serviceCategory") ?? "");
  const status = String(formData.get("status") ?? "DRAFT") as "DRAFT" | "SUBMITTED";
  const id = String(formData.get("id") ?? "") || undefined;

  const payload = {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? "") || undefined,
    categoryCode,
    serviceId: String(formData.get("serviceId") ?? "") || undefined,
    budgetRange: String(formData.get("budgetRange") ?? "") || undefined,
    timeline: String(formData.get("timeline") ?? "") || undefined,
    deadline: String(formData.get("deadline") ?? "") || undefined,
    location: String(formData.get("location") ?? "") || undefined,
    companyName: String(formData.get("companyName") ?? "") || undefined,
    contactPhone: String(formData.get("contactPhone") ?? "") || undefined,
    locale: String(formData.get("locale") ?? "vi"),
    status,
    specs: parseSpecs(categoryCode, formData),
  };

  const parsed = quoteRequestSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      error: "validation",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = parsed.data;
  const specsJson = data.specs as Prisma.InputJsonValue;
  const deadline = data.deadline ? new Date(data.deadline) : null;

  if (id) {
    const existing = await prisma.quoteRequest.findUnique({ where: { id } });
    if (!existing || existing.userId !== session.user.id) return { ok: false, error: "not_found" };
    if (!["DRAFT", "NEED_MORE_INFO"].includes(existing.status) && data.status === "DRAFT") {
      return { ok: false, error: "invalid_status" };
    }

    const nextStatus: QuoteStatus =
      data.status === "SUBMITTED" ? "SUBMITTED" : (existing.status === "NEED_MORE_INFO" ? "SUBMITTED" : "DRAFT");

    const updated = await prisma.quoteRequest.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        categoryCode: data.categoryCode,
        serviceId: data.serviceId || null,
        budgetRange: data.budgetRange,
        timeline: data.timeline,
        deadline,
        location: data.location ?? (data.specs as { location?: string }).location,
        companyName: data.companyName,
        contactPhone: data.contactPhone,
        locale: data.locale,
        specs: specsJson,
        status: nextStatus,
        submittedAt: nextStatus === "SUBMITTED" ? new Date() : existing.submittedAt,
      },
    });

    await audit({
      userId: session.user.id,
      action: nextStatus === "SUBMITTED" ? "quote.submitted" : "quote.updated",
      entity: "QuoteRequest",
      entityId: updated.id,
      quoteRequestId: updated.id,
    });

    if (nextStatus === "SUBMITTED") {
      const user = await prisma.user.findUnique({ where: { id: session.user.id } });
      if (user) {
        const mail = emails.quoteSubmitted(data.locale as Locale, user.name, updated.reference);
        await sendEmail({ to: user.email, ...mail });
      }
      await prisma.notification.create({
        data: {
          userId: session.user.id,
          type: "QUOTE",
          titleVi: "Yêu cầu báo giá đã gửi",
          titleDe: "Angebotsanfrage gesendet",
          bodyVi: `Yêu cầu ${updated.reference} đã vào pipeline.`,
          bodyDe: `Anfrage ${updated.reference} ist im Pipeline.`,
          href: `/dashboard/quotes/${updated.id}`,
        },
      });
      await prisma.lead.create({
        data: {
          reference: generateReference("LD"),
          source: "QUOTE",
          status: "NEW",
          name: session.user.name,
          email: session.user.email,
          company: data.companyName,
          locale: data.locale,
          ownerId: session.user.id,
          quoteRequestId: updated.id,
          score: 50,
        },
      }).catch(() => null);
    }

    revalidatePath("/[locale]/dashboard", "layout");
    return { ok: true, id: updated.id, reference: updated.reference, message: "quote_saved" };
  }

  const created = await prisma.quoteRequest.create({
    data: {
      reference: generateReference("QR"),
      userId: session.user.id,
      title: data.title,
      description: data.description,
      categoryCode: data.categoryCode,
      serviceId: data.serviceId || null,
      budgetRange: data.budgetRange,
      timeline: data.timeline,
      deadline,
      location: data.location,
      companyName: data.companyName,
      contactPhone: data.contactPhone,
      locale: data.locale,
      specs: specsJson,
      status: data.status === "SUBMITTED" ? "SUBMITTED" : "DRAFT",
      submittedAt: data.status === "SUBMITTED" ? new Date() : null,
    },
  });

  await audit({
    userId: session.user.id,
    action: data.status === "SUBMITTED" ? "quote.submitted" : "quote.draft",
    entity: "QuoteRequest",
    entityId: created.id,
    quoteRequestId: created.id,
  });

  if (data.status === "SUBMITTED") {
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (user) {
      await sendEmail({
        to: user.email,
        ...emails.quoteSubmitted(data.locale as Locale, user.name, created.reference),
      });
    }
  }

  revalidatePath("/[locale]/dashboard", "layout");
  return { ok: true, id: created.id, reference: created.reference, message: "quote_saved" };
}

export async function respondToQuoteAction(
  quoteId: string,
  decision: "ACCEPT" | "REJECT",
  reason?: string
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "unauthorized" };

  const quote = await prisma.quote.findUnique({
    where: { id: quoteId },
    include: { quoteRequest: true },
  });
  if (!quote || quote.quoteRequest.userId !== session.user.id) {
    return { ok: false, error: "not_found" };
  }
  if (quote.acceptedAt || quote.rejectedAt) return { ok: false, error: "already_decided" };

  if (decision === "ACCEPT") {
    const project = await prisma.$transaction(async (tx) => {
      await tx.quote.update({ where: { id: quoteId }, data: { acceptedAt: new Date() } });
      await tx.quoteRequest.update({
        where: { id: quote.quoteRequestId },
        data: { status: "CONVERTED_TO_PROJECT" },
      });
      return tx.project.create({
        data: {
          reference: generateReference("PRJ"),
          title: quote.quoteRequest.title,
          ownerId: session.user.id,
          quoteRequestId: quote.quoteRequestId,
          status: "PLANNING",
          progress: 5,
          description: quote.notesVi ?? quote.notesDe,
        },
      });
    });

    await prisma.notification.create({
      data: {
        userId: session.user.id,
        type: "PROJECT",
        titleVi: "Dự án đã được tạo",
        titleDe: "Projekt erstellt",
        bodyVi: `Dự án ${project.reference} đã mở từ báo giá.`,
        bodyDe: `Projekt ${project.reference} aus Angebot erstellt.`,
        href: `/dashboard/projects/${project.id}`,
      },
    });

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (user) {
      await sendEmail({
        to: user.email,
        ...emails.projectCreated(user.preferredLocale as Locale, user.name, project.reference),
      });
    }
  } else {
    await prisma.$transaction([
      prisma.quote.update({
        where: { id: quoteId },
        data: { rejectedAt: new Date(), rejectReason: reason },
      }),
      prisma.quoteRequest.update({
        where: { id: quote.quoteRequestId },
        data: { status: "REJECTED" },
      }),
    ]);
  }

  revalidatePath("/[locale]/dashboard", "layout");
  return { ok: true, message: decision === "ACCEPT" ? "quote_accepted" : "quote_rejected" };
}

export async function getMyQuotes() {
  const session = await auth();
  if (!session?.user?.id) return [];
  return prisma.quoteRequest.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      quotes: { orderBy: { version: "desc" }, take: 1, include: { items: true } },
      service: { include: { translations: true } },
      files: true,
    },
  });
}
