import type { Role } from "@prisma/client";

export const ROLE_RANK: Record<Role, number> = {
  GUEST: 0,
  USER: 1,
  STAFF: 2,
  EDITOR: 3,
  ADMIN: 4,
  SUPER_ADMIN: 5,
};

export type Permission =
  | "portal:access"
  | "quotes:own"
  | "quotes:manage"
  | "projects:own"
  | "projects:assigned"
  | "projects:manage"
  | "appointments:own"
  | "appointments:manage"
  | "content:read"
  | "content:write"
  | "users:manage"
  | "admin:access"
  | "settings:manage"
  | "ai:use";

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  GUEST: ["content:read"],
  USER: [
    "content:read",
    "portal:access",
    "quotes:own",
    "projects:own",
    "appointments:own",
    "ai:use",
  ],
  STAFF: [
    "content:read",
    "portal:access",
    "quotes:own",
    "quotes:manage",
    "projects:own",
    "projects:assigned",
    "appointments:own",
    "appointments:manage",
    "ai:use",
  ],
  EDITOR: [
    "content:read",
    "content:write",
    "portal:access",
    "admin:access",
    "ai:use",
  ],
  ADMIN: [
    "content:read",
    "content:write",
    "portal:access",
    "quotes:manage",
    "projects:manage",
    "appointments:manage",
    "users:manage",
    "admin:access",
    "ai:use",
  ],
  SUPER_ADMIN: [
    "content:read",
    "content:write",
    "portal:access",
    "quotes:manage",
    "projects:manage",
    "appointments:manage",
    "users:manage",
    "admin:access",
    "settings:manage",
    "ai:use",
  ],
};

export function hasPermission(role: Role | null | undefined, permission: Permission): boolean {
  if (!role) return permission === "content:read";
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function hasMinRole(role: Role | null | undefined, min: Role): boolean {
  if (!role) return false;
  return ROLE_RANK[role] >= ROLE_RANK[min];
}

export function canAccessAdmin(role: Role | null | undefined): boolean {
  return hasPermission(role, "admin:access");
}

export function canAccessPortal(role: Role | null | undefined): boolean {
  return hasPermission(role, "portal:access");
}

/** Translation completeness helper for bilingual CMS fields */
export function translationGaps(fields: Record<string, string | null | undefined>): string[] {
  return Object.entries(fields)
    .filter(([, v]) => !v || !String(v).trim())
    .map(([k]) => k);
}
