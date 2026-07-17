"use client";

import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Clock3, Info } from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { pricingCategories } from "@/data/pricing";
import { getIcon } from "@/lib/icons";
import { localePath, t, tList, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Trang /pricing — bảng giá chuyên nghiệp theo module
 */
export function PricingTabs({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(pricingCategories[0]?.id ?? "web");
  const category =
    pricingCategories.find((c) => c.id === active) ?? pricingCategories[0]!;
  const accent = category.color;
  const Icon = getIcon(category.icon);

  return (
    <div
      className="px-board-page mx-auto max-w-6xl"
      style={{ ["--px"]: accent } as CSSProperties}
    >
      {/* Module tabs */}
      <div
        className="flex flex-wrap justify-center gap-0 border border-border bg-elevated/40 p-1"
        role="tablist"
        aria-label={dict.pricing.modulesLabel}
      >
        {pricingCategories.map((c) => {
          const on = active === c.id;
          const TabIcon = getIcon(c.icon);
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(c.id)}
              className={cn(
                "relative inline-flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium transition-colors sm:px-5",
                on
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted hover:text-foreground"
              )}
            >
              <TabIcon
                className="h-4 w-4"
                style={{ color: on ? c.color : undefined }}
                strokeWidth={1.75}
              />
              {t(c.title, locale)}
              {on && (
                <span
                  className="absolute inset-x-3 bottom-0 h-0.5"
                  style={{ background: c.color }}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={category.id}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.3, ease }}
        >
          {/* Module intro */}
          <div className="mt-8 flex flex-col items-center text-center sm:mt-10">
            <span
              className="flex h-12 w-12 items-center justify-center"
              style={{
                background: `${accent}14`,
                color: accent,
                border: `1px solid ${accent}30`,
              }}
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <p className="mt-3 font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
              Module · {category.id}
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              {t(category.title, locale)}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              {t(category.short, locale)}
            </p>
            {category.scopeNote && (
              <p className="mt-3 flex max-w-lg items-start gap-2 text-left text-xs text-muted sm:text-center">
                <Info
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60"
                  style={{ color: accent }}
                />
                <span>{t(category.scopeNote, locale)}</span>
              </p>
            )}
          </div>

          {/* Tiers */}
          <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:gap-5">
            {category.tiers.map((tier, idx) => {
              const feats = tList(tier.features, locale).slice(0, 6);
              const hot = !!tier.highlighted;
              return (
                <article
                  key={tier.id}
                  className={cn(
                    "relative flex flex-col border bg-card p-6 sm:p-8",
                    hot ? "z-[1] shadow-lg lg:-mt-2 lg:mb-[-0.5rem] lg:pb-9" : "border-border"
                  )}
                  style={
                    hot
                      ? {
                          borderColor: `${accent}55`,
                          boxShadow: `0 20px 50px ${accent}12, 0 0 0 1px ${accent}20`,
                        }
                      : undefined
                  }
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] tabular-nums text-muted">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {hot && (
                      <span
                        className="px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.1em] text-black uppercase"
                        style={{ background: accent }}
                      >
                        {dict.pricing.popular}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-xl font-semibold tracking-tight">
                    {t(tier.name, locale)}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {t(tier.description, locale)}
                  </p>

                  <div className="mt-6 border-y border-border py-5">
                    <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                      {dict.pricing.fromLabel}
                    </p>
                    <p className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-4xl font-semibold tracking-tight tabular-nums">
                        {tier.priceFrom}
                      </span>
                      <span
                        className="text-base font-medium"
                        style={{ color: accent }}
                      >
                        {t(tier.unit, locale)}
                      </span>
                    </p>
                    {tier.timeline && (
                      <p className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-muted">
                        <Clock3
                          className="h-3.5 w-3.5"
                          style={{ color: accent }}
                        />
                        {t(tier.timeline, locale)}
                      </p>
                    )}
                    {tier.bestFor && (
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">
                        {t(tier.bestFor, locale)}
                      </p>
                    )}
                  </div>

                  <ul className="mt-6 flex-1 space-y-2.5">
                    {feats.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-muted"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{ color: accent }}
                          strokeWidth={2.25}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    href={localePath(
                      locale,
                      `/contact?module=${category.id}&tier=${tier.id}`
                    )}
                    variant={hot ? "primary" : "outline"}
                    className="mt-8 w-full"
                  >
                    {dict.pricing.cta}
                  </Button>
                </article>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Trust / disclaimer */}
      <div className="mt-12 border border-border bg-elevated/30 px-5 py-4 text-center sm:px-8">
        <p className="text-sm text-muted">{dict.pricing.note}</p>
        <p className="mt-1.5 font-mono text-[10px] tracking-[0.16em] text-muted/70 uppercase">
          {dict.pricing.refLabel} · Berlin · DE
        </p>
      </div>
    </div>
  );
}
