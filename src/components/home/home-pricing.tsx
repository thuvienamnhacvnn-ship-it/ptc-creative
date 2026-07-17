import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { pricingCategories } from "@/data/pricing";
import { localePath, t } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/animated-section";

export function HomePricing({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const preview = pricingCategories.slice(0, 4);

  return (
    <Section className="home-stage-fill flex h-full flex-col justify-center border-0 bg-transparent py-0">
      <Container className="home-stage-scroll flex h-full max-h-full flex-col justify-center py-2 sm:py-3">
        <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
          <AnimatedSection className="max-w-2xl">
            <p className="spec mb-1.5 text-slate-300">08 — {dict.nav.pricing}</p>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
              {dict.pricing.title}
            </h2>
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{dict.pricing.subtitle}</p>
          </AnimatedSection>
          <Button href={localePath(locale, "/pricing")} variant="outline" size="sm">
            {dict.common.viewAll}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((cat) => {
            const tier = cat.tiers.find((x) => x.highlighted) ?? cat.tiers[0];
            return (
              <Link
                key={cat.id}
                href={localePath(locale, "/pricing")}
                className="group border border-border bg-card/60 p-5 transition-colors hover:border-accent/40"
              >
                <p className="font-mono text-[10px] tracking-wider text-muted uppercase">
                  {t(cat.title, locale)}
                </p>
                <p className="mt-3 text-sm text-muted">{t(tier.name, locale)}</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">
                  <span className="text-sm font-normal text-muted">{dict.common.from} </span>
                  {tier.priceFrom}
                  <span className="ml-0.5 text-base text-accent">{t(tier.unit, locale)}</span>
                </p>
                <p className="mt-3 line-clamp-2 text-xs text-muted">
                  {t(tier.description, locale)}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent">
                  {dict.pricing.cta}
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
