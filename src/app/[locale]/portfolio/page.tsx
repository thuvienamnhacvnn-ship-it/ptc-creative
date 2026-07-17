import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/ui/section";
import { PortfolioFilter } from "@/components/shared/portfolio-filter";
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
    title: dict.meta.portfolioTitle,
    description: dict.meta.portfolioDesc,
    path: "/portfolio",
  });
}

export default async function PortfolioPage({
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
        badge={dict.portfolio.badge}
        title={dict.portfolio.title}
        subtitle={dict.portfolio.subtitle}
      />
      <Section>
        <Suspense fallback={<div className="py-12 text-center text-sm text-muted">…</div>}>
          <PortfolioFilter locale={locale} dict={dict} />
        </Suspense>
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
