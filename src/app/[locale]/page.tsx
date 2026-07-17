import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/hero";
import { HomeStory } from "@/components/home/home-story";
import { HomeTeam } from "@/components/home/home-team";
import { ImpactPipeline } from "@/components/home/impact-pipeline";
import { HomeServices } from "@/components/home/home-services";
import { IndustryEnvironments } from "@/components/home/industry-environments";
import { CaseSystem } from "@/components/home/case-system";
import { HomePricing } from "@/components/home/home-pricing";
import { HomeBlog } from "@/components/home/home-blog";
import { HomeFaq } from "@/components/home/home-faq";
import { HomeContact } from "@/components/home/home-contact";
import { CtaBanner } from "@/components/shared/cta-banner";
import { HomeSnapRoot, HomeStage } from "@/components/home/home-snap";
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
    title: dict.meta.homeTitle,
    description: dict.meta.homeDesc,
  });
}

const SNAP_SECTIONS = [
  { id: "banner", theme: "hero" as const },
  { id: "story", theme: "story" as const },
  { id: "team", theme: "team" as const },
  { id: "process", theme: "process" as const },
  { id: "services", theme: "services" as const },
  { id: "solutions", theme: "solutions" as const },
  { id: "portfolio", theme: "portfolio" as const },
  { id: "pricing", theme: "pricing" as const },
  { id: "blog", theme: "blog" as const },
  { id: "faq", theme: "faq" as const },
  { id: "contact", theme: "contact" as const },
  { id: "cta", theme: "cta" as const },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  /* All sections: free full-screen canvas (no stage frames) */
  return (
    <HomeSnapRoot locale={locale} sections={SNAP_SECTIONS}>
      <HomeStage id="banner" theme="hero" bleed index="01">
        <Hero locale={locale} dict={dict} />
      </HomeStage>

      <HomeStage id="story" theme="story" bleed index="02">
        <HomeStory locale={locale} dict={dict} />
      </HomeStage>

      <HomeStage id="team" theme="team" bleed index="03">
        <HomeTeam locale={locale} dict={dict} />
      </HomeStage>

      <HomeStage id="process" theme="process" bleed index="04">
        <ImpactPipeline locale={locale} dict={dict} />
      </HomeStage>

      <HomeStage id="services" theme="services" bleed index="05">
        <HomeServices locale={locale} dict={dict} />
      </HomeStage>

      <HomeStage id="solutions" theme="solutions" bleed index="06">
        <IndustryEnvironments locale={locale} dict={dict} />
      </HomeStage>

      <HomeStage id="portfolio" theme="portfolio" bleed index="07">
        <CaseSystem locale={locale} dict={dict} />
      </HomeStage>

      <HomeStage id="pricing" theme="pricing" bleed index="08">
        <HomePricing locale={locale} dict={dict} />
      </HomeStage>

      <HomeStage id="blog" theme="blog" bleed index="09">
        <HomeBlog locale={locale} dict={dict} />
      </HomeStage>

      <HomeStage id="faq" theme="faq" bleed index="10">
        <HomeFaq locale={locale} dict={dict} />
      </HomeStage>

      <HomeStage id="contact" theme="contact" bleed index="11">
        <HomeContact locale={locale} dict={dict} />
      </HomeStage>

      <HomeStage id="cta" theme="cta" bleed index="12">
        <CtaBanner
          locale={locale}
          title={dict.home.ctaTitle}
          subtitle={dict.home.ctaSubtitle}
          button={dict.home.ctaButton}
        />
      </HomeStage>
    </HomeSnapRoot>
  );
}
