import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { requireUser } from "@/lib/session";
import { getDashboardStats } from "@/actions/portal";
import { getMyQuotes } from "@/actions/quotes";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { localePath, cn } from "@/lib/utils";
import type { Locale } from "@/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const session = await requireUser(locale);
  const stats = await getDashboardStats(session.user.id);
  const quotes = await getMyQuotes();
  const projects = await prisma.project.findMany({
    where: { ownerId: session.user.id },
    orderBy: { updatedAt: "desc" },
    take: 5,
  });
  const appointments = await prisma.appointment.findMany({
    where: { userId: session.user.id, startsAt: { gte: new Date() } },
    orderBy: { startsAt: "asc" },
    take: 5,
  });

  const cards = [
    { label: dict.dashboard.quotes, value: stats.totalQuotes },
    { label: dict.dashboard.openQuotes, value: stats.pendingQuotes },
    { label: dict.dashboard.projects, value: stats.activeProjects },
    { label: locale === "de" ? "Termine" : "Lịch hẹn", value: stats.upcomingAppointments },
  ];

  return (
    <div className="border-b border-border py-10 sm:py-14">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="spec">Workspace</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">{dict.dashboard.welcome}</h1>
            <p className="mt-1 text-sm text-muted">{session.user.email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button href={localePath(locale, "/dashboard/quotes/new")}>
              {dict.dashboard.newProject}
            </Button>
            <Button href={localePath(locale, "/dashboard/profile")} variant="outline">
              {dict.dashboard.settings}
            </Button>
            {(session.user.role === "ADMIN" ||
              session.user.role === "SUPER_ADMIN" ||
              session.user.role === "EDITOR" ||
              session.user.role === "STAFF") && (
              <Button href={localePath(locale, "/admin")} variant="outline">
                Admin
              </Button>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.label} className="bg-card p-5">
              <div className="text-2xl font-semibold">{c.value}</div>
              <div className="mt-1 font-mono text-[10px] tracking-wide text-muted uppercase">
                {c.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="border border-border bg-card lg:col-span-2">
            <header className="flex items-center justify-between border-b border-border px-5 py-3">
              <h2 className="text-sm font-semibold">{dict.dashboard.recentProjects}</h2>
              <Link href={localePath(locale, "/dashboard/quotes")} className="text-xs text-accent">
                {dict.common.viewAll}
              </Link>
            </header>
            {quotes.length === 0 ? (
              <p className="p-5 text-sm text-muted">{dict.dashboard.emptyQuotes}</p>
            ) : (
              <ul className="divide-y divide-border">
                {quotes.slice(0, 6).map((q) => (
                  <li key={q.id}>
                    <Link
                      href={localePath(locale, `/dashboard/quotes/${q.id}`)}
                      className="flex flex-col gap-1 px-5 py-4 hover:bg-elevated/50 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <div className="font-mono text-[10px] text-muted">{q.reference}</div>
                        <div className="text-sm font-medium">{q.title}</div>
                      </div>
                      <span className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase">
                        {q.status}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="border border-border bg-card">
            <header className="border-b border-border px-5 py-3">
              <h2 className="text-sm font-semibold">{dict.dashboard.messages}</h2>
            </header>
            {stats.notifications.length === 0 ? (
              <p className="p-5 text-sm text-muted">{dict.dashboard.emptyMessages}</p>
            ) : (
              <ul className="divide-y divide-border">
                {stats.notifications.slice(0, 6).map((n) => (
                  <li key={n.id} className="px-5 py-3">
                    <div className={cn("text-sm font-medium", !n.readAt && "text-accent")}>
                      {locale === "de" ? n.titleDe : n.titleVi}
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted">
                      {locale === "de" ? n.bodyDe : n.bodyVi}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="border border-border bg-card">
            <header className="border-b border-border px-5 py-3">
              <h2 className="text-sm font-semibold">{dict.dashboard.projects}</h2>
            </header>
            {projects.length === 0 ? (
              <p className="p-5 text-sm text-muted">{dict.dashboard.emptyProjects}</p>
            ) : (
              <ul className="divide-y divide-border">
                {projects.map((p) => (
                  <li key={p.id} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <div className="font-mono text-[10px] text-muted">{p.reference}</div>
                      <div className="text-sm font-medium">{p.title}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[10px] text-muted">{p.status}</div>
                      <div className="text-xs text-accent">{p.progress}%</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="border border-border bg-card">
            <header className="flex items-center justify-between border-b border-border px-5 py-3">
              <h2 className="text-sm font-semibold">
                {locale === "de" ? "Termine" : "Lịch hẹn"}
              </h2>
              <Link
                href={localePath(locale, "/dashboard/appointments")}
                className="text-xs text-accent"
              >
                {dict.common.viewAll}
              </Link>
            </header>
            {appointments.length === 0 ? (
              <p className="p-5 text-sm text-muted">
                {locale === "de" ? "Keine Termine." : "Chưa có lịch hẹn."}
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {appointments.map((a) => (
                  <li key={a.id} className="px-5 py-3 text-sm">
                    <div className="font-medium">{a.title}</div>
                    <div className="text-xs text-muted">
                      {a.startsAt.toISOString().slice(0, 16).replace("T", " ")} · {a.status}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <nav className="mt-8 flex flex-wrap gap-2 text-sm">
          {[
            { href: "/dashboard/quotes", label: dict.dashboard.quotes },
            { href: "/dashboard/projects", label: dict.dashboard.projects },
            { href: "/dashboard/appointments", label: locale === "de" ? "Termine" : "Lịch hẹn" },
            { href: "/dashboard/notifications", label: dict.dashboard.messages },
            { href: "/dashboard/profile", label: dict.dashboard.settings },
          ].map((l) => (
            <Link
              key={l.href}
              href={localePath(locale, l.href)}
              className="border border-border px-3 py-1.5 text-muted hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
    </div>
  );
}
