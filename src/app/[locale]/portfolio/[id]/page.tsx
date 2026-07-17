import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getPortfolioItem, portfolio } from "@/data/portfolio";
import { buildMetadata } from "@/lib/seo";
import { localePath, t, cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/types";

export function generateStaticParams() {
  return portfolio.flatMap((p) => [
    { locale: "vi", id: p.id },
    { locale: "de", id: p.id },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) return {};
  const item = getPortfolioItem(id);
  if (!item) return {};
  return buildMetadata({
    locale: raw,
    title: t(item.title, raw),
    description: t(item.description, raw),
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const item = getPortfolioItem(id);
  if (!item) notFound();

  return (
    <div className="border-b border-border">
      <div className={cn("relative min-h-[42vh] bg-gradient-to-br", item.gradient)}>
        <div className="absolute inset-0 bg-tech-grid opacity-40" />
        <Container className="relative flex min-h-[42vh] flex-col justify-end py-12 text-white">
          <p className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">
            Case · {item.category}
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
            {t(item.title, locale)}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            {t(item.description, locale)}
          </p>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-px border border-border bg-border lg:grid-cols-3">
          <MetaBlock label={dict.common.industry} value={item.industry} />
          <MetaBlock label={dict.common.servicesUsed} value={item.services.join(" · ")} />
          <MetaBlock label={dict.common.duration} value={t(item.duration, locale)} />
          <MetaBlock
            label={dict.common.materials}
            value={t(item.materials, locale)}
            className="lg:col-span-2"
          />
          <MetaBlock label={dict.common.result} value={t(item.result, locale)} />
        </div>

        <div className="mt-8 grid gap-px border border-border bg-border lg:grid-cols-2">
          <div className="bg-elevated p-6 sm:p-8">
            <p className="spec">{dict.common.before}</p>
            <p className="mt-3 text-lg font-medium">{t(item.beforeLabel, locale)}</p>
          </div>
          <div className="bg-card p-6 sm:p-8">
            <p className="spec text-accent">{dict.common.after}</p>
            <p className="mt-3 text-lg font-medium">{t(item.afterLabel, locale)}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          <Button href={localePath(locale, "/contact")}>{dict.home.heroCtaPrimary}</Button>
          <Button href={localePath(locale, "/portfolio")} variant="outline">
            {dict.common.back}
          </Button>
          <Link href={localePath(locale, "/")} className="px-3 py-2 text-sm text-muted hover:text-foreground">
            Home
          </Link>
        </div>
      </Container>
    </div>
  );
}

function MetaBlock({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("bg-card p-5 sm:p-6", className)}>
      <dt className="spec">{label}</dt>
      <dd className="mt-2 text-sm font-medium capitalize sm:text-base">{value}</dd>
    </div>
  );
}
