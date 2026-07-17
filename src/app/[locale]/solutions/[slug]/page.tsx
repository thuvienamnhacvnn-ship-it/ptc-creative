import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Clock3,
  FolderOpen,
  Target,
} from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { industries, getIndustry } from "@/data/industries";
import { industryMedia } from "@/data/industry-media";
import { moduleMeta } from "@/data/lab";
import { getIcon } from "@/lib/icons";
import { localePath, t, tList } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CtaBanner } from "@/components/shared/cta-banner";
import { IndustryDetailMedia } from "@/components/solutions/industry-detail-media";
import type { Locale } from "@/types";

export function generateStaticParams() {
  return industries.flatMap((i) =>
    ["vi", "de"].map((locale) => ({ locale, slug: i.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const industry = getIndustry(slug);
  if (!industry) return {};
  return buildMetadata({
    locale: raw,
    title: `${t(industry.title, raw)} | PTC Creative`,
    description: t(industry.short, raw),
    path: `/solutions/${slug}`,
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const industry = getIndustry(slug);
  if (!industry) notFound();
  const dict = getDictionary(locale);
  const Icon = getIcon(industry.icon);
  const media = industryMedia(industry.slug);
  const accent = industry.color ?? "#ff4d00";
  const solutions = industry.solutions ?? [];
  const outcomes = tList(industry.outcomes, locale);
  const pains = tList(industry.painPoints, locale);
  const delivers = tList(industry.deliverables, locale);
  const ideals = tList(industry.idealFor, locale);

  return (
    <>
      <div className="border-b border-border bg-glow">
        <Section className="pb-10 pt-10 sm:pt-14">
          <Link
            href={localePath(locale, "/solutions")}
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {dict.nav.solutions}
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <Badge className="mb-4">
                <Icon className="h-3 w-3" />
                {dict.solutions.badge} · {industry.slug}
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {t(industry.title, locale)}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                {t(industry.description, locale)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1 font-mono text-[11px] text-muted">
                  <Clock3 className="h-3.5 w-3.5 text-accent" />
                  {t(industry.timeline, locale)}
                </span>
                {ideals.map((x) => (
                  <span
                    key={x}
                    className="border border-border px-2.5 py-1 text-[11px] text-muted"
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-full max-w-md">
              <IndustryDetailMedia
                media={media}
                title={t(industry.title, locale)}
                palette={industry.palette}
                accent={accent}
                locale={locale}
                labels={{
                  media: dict.solutions.media,
                  folder: dict.home.industriesFolder,
                  video: dict.home.industriesVideo,
                }}
              />
            </div>
          </div>
        </Section>
      </div>

      <Section>
        <div className="mb-3 flex items-center gap-2">
          <Target className="h-4 w-4 text-accent" />
          <h2 className="text-xl font-semibold">{dict.solutions.pillars}</h2>
        </div>
        <p className="mb-6 max-w-2xl text-sm text-muted">{dict.solutions.processNote}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {solutions.map((s, i) => (
            <div
              key={s.id}
              className="border border-border bg-card p-5 transition-colors hover:border-accent/30"
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center font-mono text-xs font-semibold"
                  style={{
                    background: `${accent}18`,
                    color: accent,
                    border: `1px solid ${accent}40`,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold tracking-tight">
                    {t(s.title, locale)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {t(s.desc, locale)}
                  </p>
                  {s.services && s.services.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {s.services.map((svc) => (
                        <Link
                          key={svc}
                          href={localePath(locale, `/services/${svc}`)}
                          className="inline-flex items-center gap-0.5 border border-border px-2 py-0.5 font-mono text-[10px] text-muted hover:border-accent/40 hover:text-accent"
                        >
                          {svc}
                          <ArrowUpRight className="h-2.5 w-2.5" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div>
            <h2 className="text-lg font-semibold">{dict.common.painPoints}</h2>
            <ul className="mt-4 space-y-2">
              {pains.map((p) => (
                <li
                  key={p}
                  className="border border-border bg-card px-3 py-2.5 text-sm text-muted"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">{dict.common.deliverables}</h2>
            <ul className="mt-4 space-y-2">
              {delivers.map((d) => (
                <li key={d} className="flex gap-2 text-sm text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">{dict.solutions.outcomes}</h2>
            <ul className="mt-4 space-y-2">
              {outcomes.map((o) => (
                <li key={o} className="flex gap-2 text-sm text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border border-accent/30 bg-accent-muted p-6 sm:p-8">
          <h2 className="text-lg font-semibold">{dict.common.ourPackage}</h2>
          <p className="mt-2 leading-relaxed text-muted">
            {t(industry.package, locale)}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {industry.modules.map((m) => (
              <span
                key={m}
                className="border border-border bg-card/60 px-2 py-1 font-mono text-[10px] text-muted"
              >
                {moduleMeta[m] ? t(moduleMeta[m].title, locale) : m}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted">
            <FolderOpen className="h-3.5 w-3.5 text-accent" />
            {dict.home.industriesFolder}:
            <code className="text-accent">public/{media.folder}/</code>
          </div>
          <Button href={localePath(locale, "/contact")} className="mt-6">
            {dict.solutions.detailCta}
          </Button>
        </div>
      </Section>

      <CtaBanner
        locale={locale}
        title={dict.home.ctaTitle}
        subtitle={dict.home.ctaSubtitle}
        button={dict.home.ctaButton}
      />
    </>
  );
}
