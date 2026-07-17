import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { team } from "@/data/team";
import { localePath, t } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/animated-section";

export function HomeAbout({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = dict.home;
  const a = dict.about;
  const steps = h.processSteps.slice(0, 4);

  return (
    <Section id="intro" className="border-b border-border">
      <Container>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="spec mb-3">05 — Giới thiệu</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {h.aboutTitle}
            </h2>
            <p className="mt-3 text-muted leading-relaxed">{h.aboutSubtitle}</p>
          </div>
          <Button href={localePath(locale, "/about")} variant="outline" size="sm">
            {dict.common.learnMore}
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Story */}
          <AnimatedSection className="border border-border bg-card/50 p-6 lg:col-span-5 lg:p-8">
            <p className="font-mono text-[10px] tracking-wider text-accent uppercase">
              {a.storyTitle}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{a.storyP1}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{a.storyP2}</p>
            <Link
              href={localePath(locale, "/about#story")}
              className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
            >
              {dict.common.readMore}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </AnimatedSection>

          {/* Process */}
          <AnimatedSection delay={0.08} className="lg:col-span-4">
            <div className="border border-border bg-elevated/30 p-6 lg:h-full lg:p-8">
              <p className="font-mono text-[10px] tracking-wider text-accent uppercase">
                {a.processTitle}
              </p>
              <ol className="mt-4 space-y-3">
                {steps.map((s, i) => (
                  <li key={s.code} className="flex gap-3 border-b border-border/60 pb-3 last:border-0 last:pb-0">
                    <span className="font-mono text-[10px] text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{s.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link
                href={localePath(locale, "/about#process")}
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
              >
                {dict.common.viewAll}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </AnimatedSection>

          {/* Team strip */}
          <AnimatedSection delay={0.12} className="lg:col-span-3">
            <div className="border border-border bg-card/50 p-6 lg:h-full lg:p-8">
              <p className="font-mono text-[10px] tracking-wider text-accent uppercase">
                {a.teamTitle}
              </p>
              <p className="mt-2 text-xs text-muted">{a.teamSubtitle}</p>
              <div className="mt-5 space-y-3">
                {team.slice(0, 4).map((m) => (
                  <div key={m.id} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-accent/30 bg-accent/10 text-[10px] font-semibold text-accent">
                      {m.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{m.name}</p>
                      <p className="truncate text-[11px] text-muted">{t(m.role, locale)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href={localePath(locale, "/about#team")}
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
              >
                {dict.common.viewAll}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </Section>
  );
}
