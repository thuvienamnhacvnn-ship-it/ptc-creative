import { auth } from "@/auth";
import { redirect } from "next/navigation";
import type { Role } from "@prisma/client";
import {
  canAccessAdmin,
  canAccessPortal,
  hasPermission,
  type Permission,
} from "@/lib/rbac";

export async function getSession() {
  return auth();
}

export async function requireUser(locale = "vi") {
  const session = await auth();
  if (!session?.user?.id) {
    redirect(`/${locale}/login`);
  }
  if (!canAccessPortal(session.user.role)) {
    redirect(`/${locale}`);
  }
  return session;
}

export async function requirePermission(permission: Permission, locale = "vi") {
  const session = await requireUser(locale);
  if (!hasPermission(session.user.role, permission)) {
    redirect(`/${locale}/dashboard`);
  }
  return session;
}

export async function requireAdmin(locale = "vi") {
  const session = await auth();
  if (!session?.user?.id) {
    redirect(`/${locale}/login`);
  }
  const role = session.user.role as Role;
  if (!canAccessAdmin(role) && role !== "STAFF") {
    // Staff can access limited admin ops area under /admin with server checks per page
    redirect(`/${locale}/dashboard`);
  }
  if (role === "USER" || role === "GUEST") {
    redirect(`/${locale}/dashboard`);
  }
  // USER blocked from admin
  if (!canAccessAdmin(role) && role !== "STAFF") {
    redirect(`/${locale}/dashboard`);
  }
  return session;
}

export async function requireRoles(roles: Role[], locale = "vi") {
  const session = await auth();
  if (!session?.user?.id || !roles.includes(session.user.role)) {
    redirect(`/${locale}/login`);
  }
  return session;
}
