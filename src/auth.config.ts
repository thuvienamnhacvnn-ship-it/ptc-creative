import type { NextAuthConfig } from "next-auth";
import type { Role } from "@prisma/client";

declare module "next-auth" {
  interface User {
    role?: Role;
    preferredLocale?: "vi" | "de";
  }
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: Role;
      preferredLocale: "vi" | "de";
      image?: string | null;
    };
  }
}

/**
 * Edge-compatible auth config (no Prisma / Node crypto).
 * Full providers live in auth.ts
 */
export const authConfig = {
  pages: {
    signIn: "/vi/login",
    error: "/vi/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30d default; remember-me extends via cookie
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const path = request.nextUrl.pathname;
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;

      const isAdmin = path.includes("/admin");
      const isPortal =
        path.includes("/dashboard") ||
        path.includes("/portal") ||
        path.includes("/quotes") ||
        path.includes("/projects") ||
        path.includes("/appointments");

      if (isAdmin) {
        if (!isLoggedIn) return false;
        return role === "EDITOR" || role === "ADMIN" || role === "SUPER_ADMIN" || role === "STAFF";
      }

      if (isPortal) {
        return isLoggedIn;
      }

      return true;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.preferredLocale = user.preferredLocale;
      }
      if (trigger === "update" && session) {
        token.name = session.name ?? token.name;
        token.preferredLocale = session.preferredLocale ?? token.preferredLocale;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as Role) ?? "USER";
        session.user.preferredLocale = (token.preferredLocale as "vi" | "de") ?? "vi";
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
