import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/ui/section";
import { PricingTabs } from "@/components/shared/pricing-tabs";
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
    title: dict.meta.pricingTitle,
    description: dict.meta.pricingDesc,
    path: "/pricing",
  });
}

export default async function PricingPage({
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
        badge={dict.pricing.badge}
        title={dict.pricing.title}
        subtitle={dict.pricing.subtitle}
      />
      <Section>
        <PricingTabs locale={locale} dict={dict} />
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
