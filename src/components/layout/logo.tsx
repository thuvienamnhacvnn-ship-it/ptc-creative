import Link from "next/link";
import { localePath, cn } from "@/lib/utils";
import type { Locale } from "@/types";

export function Logo({
  locale,
  className = "",
  compact = false,
}: {
  locale: Locale;
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href={localePath(locale)}
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="PTC Creative"
    >
      <span
        className={cn(
          "flex items-center justify-center border border-accent bg-accent font-bold tracking-tight text-white shadow-[0_0_18px_rgba(255,77,0,0.28)] transition-all duration-300 group-hover:scale-[1.04] group-hover:shadow-[0_0_28px_rgba(255,77,0,0.5)]",
          compact ? "h-7 w-7 text-[10px]" : "h-8 w-8 text-[11px]"
        )}
      >
        PTC
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-semibold tracking-tight text-[#eef4fc] transition-colors duration-200 group-hover:text-white",
            compact ? "text-[13px]" : "text-[14px]"
          )}
        >
          PTC Creative
        </span>
        <span className="mt-0.5 font-mono text-[8px] font-medium tracking-[0.18em] text-[#6b8ab0] uppercase transition-colors duration-200 group-hover:text-accent/80">
          Berlin · DE
        </span>
      </span>
    </Link>
  );
}
