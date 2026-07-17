import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { localePath } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/animated-section";

export function HomeFaq({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section className="home-stage-fill flex h-full flex-col justify-center border-0 py-0">
      <Container className="home-stage-scroll flex h-full max-h-full flex-col justify-center py-2 sm:py-3">
        <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
          <AnimatedSection className="max-w-2xl">
            <p className="spec mb-1.5 text-indigo-200">10 — {dict.nav.faq}</p>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
              {dict.faq.title}
            </h2>
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{dict.faq.subtitle}</p>
          </AnimatedSection>
          <Button href={localePath(locale, "/faq")} variant="outline" size="sm">
            {dict.common.viewAll}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </div>
        <FaqAccordion locale={locale} />
        <p className="mt-6 text-center text-sm text-muted">
          {dict.faq.stillTitle}{" "}
          <Link href={localePath(locale, "/contact")} className="text-accent hover:underline">
            {dict.nav.contact}
          </Link>
        </p>
      </Container>
    </Section>
  );
}
