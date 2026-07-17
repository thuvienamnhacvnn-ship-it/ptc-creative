"use client";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** denser grid lines */
  dense?: boolean;
  /** show floating horizon glow */
  glow?: boolean;
  /** subtle perspective floor */
  floor?: boolean;
};

/**
 * Simulated 3D space: deep black + blue grid (caro).
 * Pure CSS — no WebGL.
 */
export function GridSpace3D({
  className,
  dense = false,
  glow = true,
  floor = true,
}: Props) {
  const cell = dense ? 28 : 40;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-[#02060d]",
        className
      )}
      aria-hidden
    >
      {/* Deep space base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040a14] via-[#02060d] to-[#010308]" />

      {/* Vertical wall grid (perspective) */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 140, 255, 0.22) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 140, 255, 0.14) 1px, transparent 1px)
          `,
          backgroundSize: `${cell}px ${cell}px`,
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 45%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 45%, black 20%, transparent 75%)",
        }}
      />

      {/* Perspective floor grid */}
      {floor && (
        <div
          className="absolute inset-x-[-20%] bottom-0 h-[55%] origin-bottom"
          style={{
            transform: "perspective(600px) rotateX(58deg)",
            transformOrigin: "center bottom",
          }}
        >
          <div
            className="h-full w-full opacity-70"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(64, 156, 255, 0.35) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(64, 156, 255, 0.28) 1px, transparent 1px)
              `,
              backgroundSize: `${cell * 1.1}px ${cell * 1.1}px`,
              maskImage:
                "linear-gradient(to top, black 0%, black 35%, transparent 95%)",
              WebkitMaskImage:
                "linear-gradient(to top, black 0%, black 35%, transparent 95%)",
            }}
          />
          {/* vanishing center line */}
          <div className="absolute inset-x-0 top-0 mx-auto h-full w-px bg-gradient-to-t from-[rgba(64,156,255,0.5)] to-transparent" />
        </div>
      )}

      {/* Horizon line */}
      <div className="absolute inset-x-0 top-[46%] h-px bg-gradient-to-r from-transparent via-[rgba(80,160,255,0.45)] to-transparent" />

      {/* Blue ambient glows */}
      {glow && (
        <>
          <div className="absolute left-1/2 top-[42%] h-40 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(30,90,180,0.2)] blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-32 w-1/2 rounded-full bg-[rgba(20,70,160,0.15)] blur-3xl" />
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[rgba(255,77,0,0.06)] blur-3xl" />
        </>
      )}

      {/* Subtle scan pulse */}
      <div className="grid-space-scan absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(100,180,255,0.5)] to-transparent" />
    </div>
  );
}
