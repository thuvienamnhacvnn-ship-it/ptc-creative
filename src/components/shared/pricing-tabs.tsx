"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { pricingCategories } from "@/data/pricing";
import { localePath, t, tList, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function PricingTabs({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [active, setActive] = useState(pricingCategories[0].id);
  const category = pricingCategories.find((c) => c.id === active) ?? pricingCategories[0];

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {pricingCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(c.id)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-medium transition-all",
              active === c.id
                ? "border-accent bg-accent text-black"
                : "border-border bg-card text-muted hover:border-accent/40"
            )}
          >
            {t(c.title, locale)}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {category.tiers.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              "relative flex flex-col rounded-2xl border bg-card p-6 sm:p-8",
              tier.highlighted
                ? "border-accent shadow-lg shadow-accent/10 ring-1 ring-accent/30"
                : "border-border"
            )}
          >
            {tier.highlighted && (
              <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-0.5 text-[11px] font-semibold tracking-wide text-black uppercase">
                {dict.pricing.popular}
              </span>
            )}
            <h3 className="text-lg font-semibold">{t(tier.name, locale)}</h3>
            <p className="mt-1 text-sm text-muted">{t(tier.description, locale)}</p>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-sm text-muted">{dict.common.from}</span>
              <span className="text-3xl font-semibold tracking-tight">
                {tier.priceFrom}
              </span>
              <span className="text-sm text-muted">{t(tier.unit, locale)}</span>
            </div>
            <ul className="mt-6 flex-1 space-y-2.5">
              {tList(tier.features, locale).map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              href={localePath(locale, "/contact")}
              variant={tier.highlighted ? "primary" : "outline"}
              className="mt-8 w-full"
            >
              {dict.pricing.cta}
            </Button>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted">{dict.pricing.note}</p>
    </div>
  );
}
