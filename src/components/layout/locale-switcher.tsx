"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/types";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({
  locale,
  variant = "default",
}: {
  locale: Locale;
  variant?: "default" | "header";
}) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(vi|de)/, "") || "";
  const isHeader = variant === "header";

  return (
    <div
      className={cn(
        "flex items-center p-0.5 text-[10px] font-semibold uppercase tracking-wider",
        isHeader
          ? "border border-[#2a4a72]/70 bg-[#0a1628]/80"
          : "rounded-full border border-border bg-card text-xs"
      )}
    >
      {(["vi", "de"] as Locale[]).map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          className={cn(
            "px-2 py-1 transition-all duration-200",
            isHeader ? "" : "rounded-full px-2.5 py-1.5",
            locale === l
              ? isHeader
                ? "bg-accent text-white shadow-[0_0_12px_rgba(255,77,0,0.35)]"
                : "bg-accent text-black"
              : isHeader
                ? "text-[#8fa8c8] hover:bg-white/[0.06] hover:text-white"
                : "text-muted hover:text-foreground"
          )}
          hrefLang={l}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
