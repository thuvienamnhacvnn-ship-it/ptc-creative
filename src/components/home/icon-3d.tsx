"use client";

import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  icon: LucideIcon;
  color: string;
  active?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Stagger delay for entrance (ms) */
  delay?: number;
};

/**
 * Isometric 3D icon cube — used on Solutions constellation
 * CSS-only 3 faces + floating Lucide glyph
 */
export function Icon3D({
  icon: Icon,
  color,
  active = false,
  size = "md",
  className,
  delay = 0,
}: Props) {
  const dim =
    size === "lg" ? "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]" : size === "sm" ? "h-11 w-11" : "h-14 w-14 sm:h-16 sm:w-16";

  return (
    <span
      className={cn(
        "icon3d group/icon relative inline-flex items-center justify-center",
        dim,
        active && "is-active",
        className
      )}
      style={
        {
          ["--i3d"]: color,
          ["--i3d-delay"]: `${delay}ms`,
        } as CSSProperties
      }
    >
      {/* Glow under cube */}
      <span className="icon3d__glow" aria-hidden />

      {/* Isometric cube */}
      <span className="icon3d__cube" aria-hidden>
        <span className="icon3d__face icon3d__face--top" />
        <span className="icon3d__face icon3d__face--left" />
        <span className="icon3d__face icon3d__face--right" />
      </span>

      {/* Glyph floating above */}
      <span className="icon3d__glyph">
        <Icon className="h-[42%] w-[42%]" strokeWidth={1.75} />
      </span>

      {/* Shine sweep */}
      <span className="icon3d__shine" aria-hidden />
    </span>
  );
}
