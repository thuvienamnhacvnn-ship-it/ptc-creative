import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { industries } from "@/data/industries";
import { getIcon } from "@/lib/icons";
import { localePath, t } from "@/lib/utils";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/ui/section";
import { CtaBanner } from "@/components/shared/cta-banner";
import type { Locale } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return buildMetadata({
    locale: raw,
    title: dict.meta.solutionsTitle,
    description: dict.meta.solutionsDesc,
    path: "/solutions",
  });
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        badge={dict.solutions.badge}
        title={dict.solutions.title}
        subtitle={dict.solutions.subtitle}
      />
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => {
            const Icon = getIcon(i.icon);
            const pillars = i.solutions?.length ?? 0;
            return (
              <Link
                key={i.slug}
                href={localePath(locale, `/solutions/${i.slug}`)}
                className="group flex flex-col border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="flex h-11 w-11 items-center justify-center border border-border bg-accent-muted text-accent"
                    style={i.color ? { color: i.color, borderColor: `${i.color}44` } : undefined}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
                </div>
                <h2 className="mt-5 text-lg font-semibold tracking-tight">
                  {t(i.title, locale)}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {t(i.short, locale)}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/70 pt-3 font-mono text-[10px] text-muted">
                  <span className="text-accent">{pillars} {dict.solutions.pillars}</span>
                  <span className="text-white/20">·</span>
                  <span>{t(i.timeline, locale)}</span>
                  <span className="ml-auto truncate text-white/35">
                    media/solutions/{i.slug}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>
      <CtaBanner
        locale={locale}
        title={dict.home.ctaTitle}
        subtitle={dict.home.ctaSubtitle}
        button={dict.solutions.detailCta}
      />
    </>
  );
}
