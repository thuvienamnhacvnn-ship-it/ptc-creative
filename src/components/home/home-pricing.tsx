"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Clock3 } from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { pricingCategories } from "@/data/pricing";
import { getIcon } from "@/lib/icons";
import { localePath, t, tList, cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Giá tham khảo theo module — professional pricing board
 */
export function HomePricing({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const reduce = useReducedMotion();
  const [moduleId, setModuleId] = useState(pricingCategories[0]?.id ?? "web");

  const category =
    pricingCategories.find((c) => c.id === moduleId) ?? pricingCategories[0]!;
  const accent = category.color;
  const Icon = getIcon(category.icon);

  return (
    <Section
      className="home-stage-fill flex h-full min-h-0 flex-col border-0 py-0"
      contained={false}
    >
      <div
        className="px-board relative flex h-full min-h-0 w-full flex-col overflow-hidden"
        style={{ ["--px"]: accent } as CSSProperties}
      >
        <Container className="relative z-10 flex h-full min-h-0 w-full max-w-none flex-col px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          {/* Header */}
          <header className="flex shrink-0 flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 max-w-2xl">
              <div className="flex items-center gap-2">
                <span
                  className="h-1 w-1 rounded-full"
                  style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
                />
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase sm:text-[11px]">
                  08 · {dict.pricing.badge}
                </p>
              </div>
              <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {dict.pricing.title}
              </h2>
              <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-white/48">
                {dict.pricing.subtitle}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] tracking-wide text-white/40 uppercase">
                {dict.pricing.refLabel}
              </span>
              <Link
                href={localePath(locale, "/pricing")}
                className="group inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-white"
              >
                {dict.common.viewAll}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </header>

          {/* Module selector — professional segment control */}
          <div
            className="mt-4 flex shrink-0 gap-0 overflow-x-auto border border-white/[0.08] bg-transparent p-0.5 no-scrollbar"
            role="tablist"
            aria-label={dict.pricing.modulesLabel}
          >
            {pricingCategories.map((mod) => {
              const on = mod.id === moduleId;
              const ModIcon = getIcon(mod.icon);
              return (
                <button
                  key={mod.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setModuleId(mod.id)}
                  className={cn(
                    "relative flex min-w-0 flex-1 items-center justify-center gap-1.5 px-2.5 py-2.5 text-[11px] font-medium tracking-wide transition-all sm:gap-2 sm:px-3 sm:text-xs md:text-sm",
                    on
                      ? "bg-white/[0.08] text-white"
                      : "text-white/45 hover:bg-white/[0.03] hover:text-white/75"
                  )}
                >
                  {on && (
                    <span
                      className="absolute inset-x-2 bottom-0 h-0.5"
                      style={{ background: mod.color }}
                    />
                  )}
                  <ModIcon
                    className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"
                    style={{ color: on ? mod.color : undefined }}
                    strokeWidth={1.75}
                  />
                  <span className="truncate">{t(mod.title, locale)}</span>
                </button>
              );
            })}
          </div>

          {/* Module context strip */}
          <div className="mt-3 flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 border-b border-white/[0.06] pb-2.5">
            <span
              className="flex h-7 w-7 items-center justify-center"
              style={{
                background: `${accent}18`,
                color: accent,
                border: `1px solid ${accent}35`,
              }}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
            </span>
            <p className="min-w-0 flex-1 text-sm text-white/55">
              {t(category.short, locale)}
            </p>
            {category.scopeNote && (
              <p className="hidden max-w-xs text-right text-[11px] leading-snug text-white/30 lg:block">
                {t(category.scopeNote, locale)}
              </p>
            )}
          </div>

          {/* Tier cards */}
          <div className="mt-3 min-h-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={category.id}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.28, ease }}
                className="grid h-full min-h-0 gap-2.5 sm:grid-cols-3 sm:gap-3"
              >
                {category.tiers.map((tier, idx) => {
                  const feats = tList(tier.features, locale).slice(0, 5);
                  const hot = !!tier.highlighted;
                  return (
                    <article
                      key={tier.id}
                      className={cn(
                        "px-board__card relative flex min-h-0 flex-col border p-4 sm:p-5",
                        hot
                          ? "border-white/18 bg-white/[0.04]"
                          : "border-white/[0.08] bg-transparent"
                      )}
                      style={
                        hot
                          ? {
                              borderColor: `${accent}45`,
                            }
                          : undefined
                      }
                    >
                      {/* Index + badge */}
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono text-[10px] tabular-nums text-white/30">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        {hot && (
                          <span
                            className="px-2 py-0.5 text-[9px] font-semibold tracking-[0.12em] text-black uppercase"
                            style={{ background: accent }}
                          >
                            {dict.pricing.popular}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-2 text-base font-semibold tracking-tight text-white sm:text-lg">
                        {t(tier.name, locale)}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/42 sm:text-[13px]">
                        {t(tier.description, locale)}
                      </p>

                      {/* Price block */}
                      <div className="mt-4 border-y border-white/[0.06] py-3">
                        <p className="font-mono text-[9px] tracking-[0.14em] text-white/30 uppercase">
                          {dict.pricing.fromLabel}
                        </p>
                        <p className="mt-0.5 flex items-baseline gap-1">
                          <span className="text-3xl font-semibold tracking-tight tabular-nums text-white sm:text-[2rem]">
                            {tier.priceFrom}
                          </span>
                          <span
                            className="text-sm font-medium"
                            style={{ color: accent }}
                          >
                            {t(tier.unit, locale)}
                          </span>
                        </p>
                        {tier.timeline && (
                          <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-white/45">
                            <Clock3
                              className="h-3 w-3"
                              style={{ color: accent }}
                            />
                            {t(tier.timeline, locale)}
                          </p>
                        )}
                      </div>

                      <ul className="mt-3 min-h-0 flex-1 space-y-2">
                        {feats.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2 text-[12px] leading-snug text-white/62 sm:text-[13px]"
                          >
                            <Check
                              className="mt-0.5 h-3.5 w-3.5 shrink-0"
                              style={{ color: accent }}
                              strokeWidth={2.25}
                            />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={localePath(
                          locale,
                          `/contact?module=${category.id}&tier=${tier.id}`
                        )}
                        className={cn(
                          "mt-4 inline-flex min-h-10 w-full items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-semibold tracking-tight transition-all",
                          hot
                            ? "text-black hover:opacity-90"
                            : "border border-white/12 text-white/75 hover:border-white/25 hover:bg-white/[0.04] hover:text-white"
                        )}
                        style={
                          hot
                            ? {
                                background: accent,
                                boxShadow: `0 8px 24px ${accent}30`,
                              }
                            : undefined
                        }
                      >
                        {dict.pricing.cta}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Disclaimer */}
          <footer className="mt-3 flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-2.5">
            <p className="text-[11px] leading-relaxed text-white/32 sm:text-xs">
              {dict.pricing.note}
            </p>
            <p className="font-mono text-[10px] tracking-wide text-white/25 uppercase">
              Berlin · Richtpreis
            </p>
          </footer>
        </Container>
      </div>
    </Section>
  );
}
