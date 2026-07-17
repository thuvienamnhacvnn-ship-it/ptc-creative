"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Locale, PortfolioCategory } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { portfolio } from "@/data/portfolio";
import { t, localePath, cn } from "@/lib/utils";

const cats: (PortfolioCategory | "all")[] = ["all", "website", "cnc", "print", "signage"];

function isCat(v: string | null): v is PortfolioCategory {
  return v === "website" || v === "cnc" || v === "print" || v === "signage";
}

export function PortfolioFilter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const search = useSearchParams();
  const fromUrl = search.get("cat");
  const [active, setActive] = useState<PortfolioCategory | "all">(
    isCat(fromUrl) ? fromUrl : "all"
  );

  useEffect(() => {
    if (isCat(fromUrl)) setActive(fromUrl);
  }, [fromUrl]);

  const items = useMemo(
    () => (active === "all" ? portfolio : portfolio.filter((p) => p.category === active)),
    [active]
  );

  const labels = dict.portfolio.filters;

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-1.5">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={cn(
              "border px-4 py-2 text-sm font-medium transition-colors",
              active === c
                ? "border-accent bg-accent text-white"
                : "border-border bg-card text-muted hover:border-foreground/20 hover:text-foreground"
            )}
          >
            {labels[c]}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="border border-dashed border-border py-16 text-center text-muted">
          {dict.common.noResults}
        </p>
      ) : (
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link
              key={p.id}
              href={localePath(locale, `/portfolio/${p.id}`)}
              className="group bg-card transition-colors hover:bg-elevated"
            >
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${p.gradient}`}>
                <div className="absolute inset-0 bg-tech-grid-fine opacity-30" />
                <div className="absolute bottom-3 left-3 flex gap-1.5">
                  <span className="border border-white/15 bg-black/40 px-2 py-1 font-mono text-[10px] tracking-wide text-white uppercase">
                    {p.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold tracking-tight group-hover:text-accent">
                  {t(p.title, locale)}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
                  {t(p.description, locale)}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.services.map((s) => (
                    <span
                      key={s}
                      className="border border-border px-2 py-0.5 font-mono text-[10px] text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
