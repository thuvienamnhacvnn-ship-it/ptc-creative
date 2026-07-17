import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { requireRoles } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/container";
import { localePath } from "@/lib/utils";
import type { Locale } from "@/types";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const session = await requireRoles(
    ["STAFF", "EDITOR", "ADMIN", "SUPER_ADMIN"],
    locale
  );

  const [
    newLeads,
    newQuotes,
    quotesWaiting,
    activeProjects,
    aiCount,
    contactsOpen,
    topServices,
    revenueAgg,
  ] = await Promise.all([
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.quoteRequest.count({ where: { status: "SUBMITTED" } }),
    prisma.quoteRequest.count({ where: { status: "QUOTED" } }),
    prisma.project.count({
      where: { status: { in: ["PLANNING", "IN_PROGRESS", "REVIEW", "PRODUCTION"] } },
    }),
    prisma.aIConversation.count({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    }),
    prisma.contactSubmission.count({ where: { handled: false } }),
    prisma.quoteRequest.groupBy({
      by: ["categoryCode"],
      _count: true,
      orderBy: { _count: { categoryCode: "desc" } },
      take: 5,
    }),
    prisma.quote.aggregate({ _sum: { amountCents: true }, where: { acceptedAt: { not: null } } }),
  ]);

  const quoted = await prisma.quoteRequest.count({
    where: { status: { in: ["QUOTED", "ACCEPTED", "CONVERTED_TO_PROJECT", "REJECTED"] } },
  });
  const won = await prisma.quoteRequest.count({
    where: { status: { in: ["ACCEPTED", "CONVERTED_TO_PROJECT"] } },
  });
  const conversion = quoted > 0 ? Math.round((won / quoted) * 100) : 0;
  const revenue = (revenueAgg._sum.amountCents ?? 0) / 100;

  const modules = [
    { href: "/admin/leads", label: "Leads", roles: ["STAFF", "ADMIN", "SUPER_ADMIN"] },
    { href: "/admin/quotes", label: "Quotes", roles: ["STAFF", "ADMIN", "SUPER_ADMIN"] },
    { href: "/admin/projects", label: "Projects", roles: ["STAFF", "ADMIN", "SUPER_ADMIN"] },
    { href: "/admin/contacts", label: "Contacts", roles: ["STAFF", "ADMIN", "SUPER_ADMIN"] },
    { href: "/admin/services", label: "Services CMS", roles: ["EDITOR", "ADMIN", "SUPER_ADMIN"] },
    { href: "/admin/blog", label: "Blog CMS", roles: ["EDITOR", "ADMIN", "SUPER_ADMIN"] },
    { href: "/admin/faq", label: "FAQ", roles: ["EDITOR", "ADMIN", "SUPER_ADMIN"] },
    { href: "/admin/media", label: "Media", roles: ["EDITOR", "STAFF", "ADMIN", "SUPER_ADMIN"] },
    { href: "/admin/users", label: "Users", roles: ["ADMIN", "SUPER_ADMIN"] },
    { href: "/admin/ai", label: "AI Activity", roles: ["ADMIN", "SUPER_ADMIN", "STAFF"] },
    { href: "/admin/settings", label: "Settings", roles: ["SUPER_ADMIN", "ADMIN"] },
    { href: "/admin/audit", label: "Audit Logs", roles: ["ADMIN", "SUPER_ADMIN"] },
  ].filter((m) => m.roles.includes(session.user.role));

  return (
    <div className="min-h-screen border-b border-border py-10">
      <Container>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="spec">Console · {session.user.role}</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">{dict.admin.title}</h1>
          </div>
          <Link href={localePath(locale, "/dashboard")} className="text-sm text-accent">
            ← Workspace
          </Link>
        </div>

        <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: dict.admin.newLeads, value: String(newLeads) },
            { label: locale === "de" ? "Neue Anfragen" : "Báo giá mới", value: String(newQuotes) },
            { label: locale === "de" ? "Wartet auf Antwort" : "Chờ phản hồi", value: String(quotesWaiting) },
            { label: dict.admin.activeProjects, value: String(activeProjects) },
            { label: dict.admin.revenue, value: `€${revenue.toLocaleString("de-DE")}` },
            { label: dict.admin.conversion, value: `${conversion}%` },
            { label: "AI (7d)", value: String(aiCount) },
            { label: "Contacts open", value: String(contactsOpen) },
          ].map((k) => (
            <div key={k.label} className="bg-card p-5">
              <div className="text-2xl font-semibold tracking-tight">{k.value}</div>
              <div className="mt-1 font-mono text-[10px] tracking-wide text-muted uppercase">
                {k.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="border border-border bg-card p-5">
            <h2 className="text-sm font-semibold">{locale === "de" ? "Top Services" : "Top dịch vụ"}</h2>
            <ul className="mt-4 space-y-2">
              {topServices.length === 0 ? (
                <li className="text-sm text-muted">{dict.common.empty}</li>
              ) : (
                topServices.map((s) => (
                  <li key={s.categoryCode ?? "—"} className="flex justify-between text-sm">
                    <span className="font-mono">{s.categoryCode ?? "—"}</span>
                    <span className="text-muted">{s._count}</span>
                  </li>
                ))
              )}
            </ul>
          </section>

          <section className="border border-border bg-card p-5">
            <h2 className="text-sm font-semibold">{locale === "de" ? "Module" : "Modules"}</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {modules.map((m) => (
                <Link
                  key={m.href}
                  href={localePath(locale, m.href)}
                  className="border border-border px-3 py-2 text-sm hover:border-accent hover:text-accent"
                >
                  {m.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
