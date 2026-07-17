"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hasPermission } from "@/lib/rbac";
import { profileSchema, appointmentSchema, feedbackSchema } from "@/lib/validations/profile";
import type { ActionResult } from "@/actions/auth";
import type { AppointmentStatus } from "@prisma/client";

export async function updateProfileAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "unauthorized" };

  const parsed = profileSchema.safeParse({
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    accountType: String(formData.get("accountType") ?? "PERSONAL"),
    companyName: String(formData.get("companyName") ?? ""),
    address: String(formData.get("address") ?? ""),
    preferredLocale: String(formData.get("preferredLocale") ?? "vi"),
  });
  if (!parsed.success) {
    return {
      ok: false,
      error: "validation",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone || null,
      accountType: parsed.data.accountType,
      preferredLocale: parsed.data.preferredLocale,
    },
  });

  if (parsed.data.companyName) {
    await prisma.company.upsert({
      where: { userId: session.user.id },
      update: { name: parsed.data.companyName },
      create: { userId: session.user.id, name: parsed.data.companyName },
    });
  }

  if (parsed.data.address) {
    const primary = await prisma.address.findFirst({
      where: { userId: session.user.id, isPrimary: true },
    });
    if (primary) {
      await prisma.address.update({
        where: { id: primary.id },
        data: { line1: parsed.data.address },
      });
    } else {
      await prisma.address.create({
        data: {
          userId: session.user.id,
          line1: parsed.data.address,
          city: "—",
          postalCode: "00000",
          country: "DE",
          isPrimary: true,
        },
      });
    }
  }

  revalidatePath("/[locale]/dashboard", "layout");
  return { ok: true, message: "profile_updated" };
}

export async function getDashboardStats(userId: string) {
  const [totalQuotes, pendingQuotes, activeProjects, upcomingAppointments, unreadNotifications] =
    await Promise.all([
      prisma.quoteRequest.count({ where: { userId } }),
      prisma.quoteRequest.count({
        where: {
          userId,
          status: { in: ["SUBMITTED", "REVIEWING", "QUOTED", "NEED_MORE_INFO"] },
        },
      }),
      prisma.project.count({
        where: {
          ownerId: userId,
          status: { in: ["PLANNING", "IN_PROGRESS", "REVIEW", "REVISION", "PRODUCTION"] },
        },
      }),
      prisma.appointment.count({
        where: {
          userId,
          status: { in: ["PENDING", "CONFIRMED", "RESCHEDULED"] },
          startsAt: { gte: new Date() },
        },
      }),
      prisma.notification.count({ where: { userId, readAt: null } }),
    ]);

  const recentActivity = await prisma.auditLog.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return {
    totalQuotes,
    pendingQuotes,
    activeProjects,
    upcomingAppointments,
    unreadNotifications,
    recentActivity,
    notifications,
  };
}

export async function createAppointmentAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id || !hasPermission(session.user.role, "appointments:own")) {
    return { ok: false, error: "unauthorized" };
  }

  const parsed = appointmentSchema.safeParse({
    title: String(formData.get("title") ?? ""),
    notes: String(formData.get("notes") ?? "") || undefined,
    startsAt: String(formData.get("startsAt") ?? ""),
    endsAt: String(formData.get("endsAt") ?? ""),
    location: String(formData.get("location") ?? "") || undefined,
    projectId: String(formData.get("projectId") ?? "") || undefined,
  });
  if (!parsed.success) {
    return {
      ok: false,
      error: "validation",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const startsAt = new Date(parsed.data.startsAt);
  const endsAt = new Date(parsed.data.endsAt);
  if (!(endsAt > startsAt)) return { ok: false, error: "invalid_range" };

  await prisma.appointment.create({
    data: {
      userId: session.user.id,
      title: parsed.data.title,
      notes: parsed.data.notes,
      startsAt,
      endsAt,
      location: parsed.data.location,
      projectId: parsed.data.projectId || null,
      status: "PENDING",
    },
  });

  await prisma.notification.create({
    data: {
      userId: session.user.id,
      type: "APPOINTMENT",
      titleVi: "Lịch hẹn đã tạo",
      titleDe: "Termin erstellt",
      bodyVi: `Lịch “${parsed.data.title}” đang chờ xác nhận.`,
      bodyDe: `Termin „${parsed.data.title}“ wartet auf Bestätigung.`,
      href: "/dashboard/appointments",
    },
  });

  revalidatePath("/[locale]/dashboard", "layout");
  return { ok: true, message: "appointment_created" };
}

export async function updateAppointmentStatusAction(
  id: string,
  status: AppointmentStatus
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "unauthorized" };

  const appt = await prisma.appointment.findUnique({ where: { id } });
  if (!appt) return { ok: false, error: "not_found" };

  const isOwner = appt.userId === session.user.id;
  const isStaff = hasPermission(session.user.role, "appointments:manage");
  if (!isOwner && !isStaff) return { ok: false, error: "unauthorized" };
  if (isOwner && !isStaff && !["CANCELLED", "RESCHEDULED", "PENDING"].includes(status)) {
    return { ok: false, error: "unauthorized" };
  }

  await prisma.appointment.update({ where: { id }, data: { status } });
  revalidatePath("/[locale]/dashboard", "layout");
  return { ok: true, message: "appointment_updated" };
}

export async function markNotificationReadAction(id: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "unauthorized" };
  await prisma.notification.updateMany({
    where: { id, userId: session.user.id },
    data: { readAt: new Date() },
  });
  revalidatePath("/[locale]/dashboard", "layout");
  return { ok: true };
}

export async function submitFeedbackAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "unauthorized" };

  const parsed = feedbackSchema.safeParse({
    projectId: String(formData.get("projectId") ?? ""),
    rating: formData.get("rating") || undefined,
    message: String(formData.get("message") ?? ""),
  });
  if (!parsed.success) return { ok: false, error: "validation" };

  const project = await prisma.project.findUnique({ where: { id: parsed.data.projectId } });
  if (!project || project.ownerId !== session.user.id) return { ok: false, error: "not_found" };

  await prisma.projectComment.create({
    data: {
      projectId: parsed.data.projectId,
      userId: session.user.id,
      body: parsed.data.message,
      isFeedback: true,
      rating: parsed.data.rating,
    },
  });

  revalidatePath("/[locale]/dashboard", "layout");
  return { ok: true, message: "feedback_sent" };
}
