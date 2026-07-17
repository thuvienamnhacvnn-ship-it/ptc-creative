"use client";

import type { CSSProperties } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Locale } from "@/types";
import { SITE } from "@/lib/constants";
import { localePath, t } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { useAi } from "@/components/providers/ai-provider";

/** Footer strip — abstract marks (static SVG, no CSS 3D) */
const ABSTRACT = [
  { id: "a", color: "#ff4d00", label: "Design", kind: "cube" as const },
  { id: "b", color: "#fbbf24", label: "Print", kind: "prism" as const },
  { id: "c", color: "#409cff", label: "Build", kind: "ring" as const },
  { id: "d", color: "#34d399", label: "Grow", kind: "sphere" as const },
];

/**
 * Final stage — dark space, text + buttons only (no glass panel).
 * Performance: static stars (no glow/filter), few layers, almost no animation.
 */
export function CtaBanner({
  locale,
  title,
  subtitle,
  button,
}: {
  locale: Locale;
  title: string;
  subtitle: string;
  button: string;
}) {
  const { setOpen } = useAi();

  return (
    <Section
      className="home-stage-fill flex h-full min-h-0 flex-col border-0 py-0"
      contained={false}
    >
      <div className="cta-v3d relative z-[2] flex h-full min-h-0 w-full flex-col overflow-hidden">
        {/* Space bg is shared via home-space-void — section only holds content */}
        <Container className="relative z-10 flex h-full min-h-0 w-full max-w-none flex-col px-4 py-3 sm:px-6 sm:py-4 lg:px-10">
          {/* Text + buttons only — no panel */}
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center text-center">
            <p className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-accent/90 uppercase sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              12 · Deep space
            </p>

            <h2 className="cta-v3d__title mt-5 max-w-4xl text-balance text-[clamp(1.85rem,4.8vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-white">
              {title}
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/45 sm:mt-5 sm:text-[15px]">
              {subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
              <Button
                href={localePath(locale, "/contact")}
                size="lg"
                className="cta-v3d__btn cta-v3d__btn--primary btn-premium group/btn min-h-12 px-8 text-sm sm:px-9 sm:text-base"
              >
                {button}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="cta-v3d__btn btn-premium min-h-12 border-white/15 bg-transparent px-6 text-sm text-white/90 hover:border-accent/50 hover:bg-white/[0.04] hover:text-accent sm:text-base"
                onClick={() => setOpen(true)}
              >
                <Sparkles className="h-4 w-4" />
                AI Assistant
              </Button>
            </div>
          </div>

          <footer className="cta-v3d__foot relative z-10 shrink-0">
            <div className="flex items-end justify-center gap-5 sm:gap-8 md:gap-10">
              {ABSTRACT.map((obj) => (
                <div
                  key={obj.id}
                  className="group flex flex-col items-center gap-1.5"
                  style={{ ["--ac"]: obj.color } as CSSProperties}
                >
                  <FootMark kind={obj.kind} color={obj.color} />
                  <span
                    className="font-mono text-[9px] tracking-[0.16em] uppercase text-white/35 transition-colors group-hover:text-white/70 sm:text-[10px]"
                    style={{ color: undefined }}
                  >
                    <span style={{ color: obj.color, opacity: 0.65 }}>{obj.label}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col items-center gap-2 border-t border-white/[0.06] pt-3 sm:mt-5 sm:flex-row sm:justify-between sm:gap-3 sm:pt-3.5">
              <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
                <span className="inline-flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center bg-accent text-[8px] font-bold text-black">
                    PTC
                  </span>
                  <span className="text-[12px] font-semibold tracking-tight text-white/70">
                    PTC Creative
                  </span>
                </span>
                <span className="text-white/15">·</span>
                <span className="font-mono text-[10px] text-white/30">Berlin</span>
                <span className="hidden text-white/15 sm:inline">·</span>
                <span className="hidden max-w-[14rem] truncate text-[11px] text-white/25 sm:inline">
                  {t(SITE.tagline, locale)}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 font-mono text-[10px] text-white/30">
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {SITE.email}
                </a>
                <span className="text-white/12">·</span>
                <a
                  href={`tel:${SITE.phoneE164}`}
                  className="transition-colors hover:text-accent"
                >
                  {SITE.phone}
                </a>
                <span className="hidden text-white/12 sm:inline">·</span>
                <span className="hidden sm:inline">{t(SITE.hours, locale)}</span>
              </div>
            </div>
          </footer>
        </Container>
      </div>
    </Section>
  );
}

function FootMark({
  kind,
  color,
}: {
  kind: "cube" | "prism" | "ring" | "sphere";
  color: string;
}) {
  if (kind === "sphere") {
    return (
      <span
        className="block h-7 w-7 rounded-full sm:h-8 sm:w-8"
        style={{
          background: `radial-gradient(circle at 32% 28%, ${color}, color-mix(in srgb, ${color} 45%, #000))`,
        }}
      />
    );
  }
  if (kind === "prism") {
    return (
      <svg viewBox="0 0 32 32" width="28" height="28" className="sm:h-8 sm:w-8">
        <polygon
          points="16,3 29,28 3,28"
          fill="none"
          stroke={color}
          strokeWidth="1.2"
          opacity="0.75"
        />
      </svg>
    );
  }
  if (kind === "ring") {
    return (
      <svg viewBox="0 0 32 32" width="28" height="28" className="sm:h-8 sm:w-8">
        <ellipse
          cx="16"
          cy="16"
          rx="12"
          ry="5"
          fill="none"
          stroke={color}
          strokeWidth="1.2"
          opacity="0.8"
          transform="rotate(-24 16 16)"
        />
        <circle cx="16" cy="16" r="2" fill={color} opacity="0.7" />
      </svg>
    );
  }
  /* cube — flat 2D diamond mark (no CSS 3D) */
  return (
    <svg viewBox="0 0 32 32" width="28" height="28" className="sm:h-8 sm:w-8">
      <rect
        x="7"
        y="7"
        width="18"
        height="18"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        opacity="0.75"
        transform="rotate(12 16 16)"
      />
    </svg>
  );
}
