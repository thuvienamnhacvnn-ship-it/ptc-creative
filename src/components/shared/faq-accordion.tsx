"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/types";
import { faqItems, faqCategories } from "@/data/faq";
import { t, cn } from "@/lib/utils";

export function FaqAccordion({ locale }: { locale: Locale }) {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);
  const [cat, setCat] = useState<string>("all");

  const filtered =
    cat === "all" ? faqItems : faqItems.filter((f) => f.category === cat);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <Chip active={cat === "all"} onClick={() => setCat("all")}>
          {locale === "vi" ? "Tất cả" : "Alle"}
        </Chip>
        {faqCategories.map((c) => (
          <Chip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
            {c[locale]}
          </Chip>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((item) => {
          const open = openId === item.id;
          return (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-card overflow-hidden"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpenId(open ? null : item.id)}
                aria-expanded={open}
              >
                <span className="font-medium tracking-tight">
                  {t(item.question, locale)}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted transition-transform",
                    open && "rotate-180 text-accent"
                  )}
                />
              </button>
              {open && (
                <div className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted">
                  {t(item.answer, locale)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
        active
          ? "border-accent bg-accent text-black"
          : "border-border bg-card text-muted hover:border-accent/40"
      )}
    >
      {children}
    </button>
  );
}
