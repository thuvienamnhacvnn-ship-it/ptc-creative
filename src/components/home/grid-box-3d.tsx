"use client";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  intensity?: "soft" | "medium" | "strong";
};

/**
 * First-person 3D room simulation:
 * black void + blue grid on floor / ceiling / L-R walls
 * vanishing toward center. Pure CSS 3D (no WebGL).
 *
 * Note: all transforms are inline only — never mix with Tailwind translate-*
 * which would override rotateX/Y.
 */
export function GridBox3D({ className, intensity = "medium" }: Props) {
  const a =
    intensity === "strong" ? 0.45 : intensity === "soft" ? 0.2 : 0.34;
  const b =
    intensity === "strong" ? 0.28 : intensity === "soft" ? 0.12 : 0.2;

  const line = `rgba(80, 160, 255, ${a})`;
  const lineDim = `rgba(80, 160, 255, ${b})`;

  const grid = (size: number, c1: string, c2: string) => ({
    backgroundImage: `
      linear-gradient(to right, ${c1} 1px, transparent 1px),
      linear-gradient(to bottom, ${c2} 1px, transparent 1px)
    `,
    backgroundSize: `${size}px ${size}px`,
  });

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
      style={{ background: "#01040a" }}
    >
      {/* Scene with perspective */}
      <div
        className="absolute inset-0"
        style={{
          perspective: "720px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(0)",
          }}
        >
          {/* FLOOR — spreads under viewer toward horizon */}
          <div
            style={{
              position: "absolute",
              left: "-25%",
              width: "150%",
              height: "70%",
              bottom: "-5%",
              transformOrigin: "50% 0%",
              transform: "rotateX(68deg)",
              ...grid(36, line, lineDim),
              opacity: 0.9,
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 45%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 45%, transparent 100%)",
            }}
          />

          {/* CEILING */}
          <div
            style={{
              position: "absolute",
              left: "-25%",
              width: "150%",
              height: "55%",
              top: "-2%",
              transformOrigin: "50% 100%",
              transform: "rotateX(-68deg)",
              ...grid(36, line, lineDim),
              opacity: 0.75,
              WebkitMaskImage:
                "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, transparent 100%)",
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, transparent 100%)",
            }}
          />

          {/* LEFT WALL */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "52%",
              height: "100%",
              transformOrigin: "0% 50%",
              transform: "rotateY(62deg)",
              ...grid(32, lineDim, line),
              opacity: 0.85,
              WebkitMaskImage:
                "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 40%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 40%, transparent 100%)",
            }}
          />

          {/* RIGHT WALL */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "52%",
              height: "100%",
              transformOrigin: "100% 50%",
              transform: "rotateY(-62deg)",
              ...grid(32, lineDim, line),
              opacity: 0.85,
              WebkitMaskImage:
                "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 40%, transparent 100%)",
              maskImage:
                "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 40%, transparent 100%)",
            }}
          />

          {/* FAR WALL — scaled small to sit at vanishing plane */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "34%",
              height: "36%",
              marginLeft: "-17%",
              marginTop: "-18%",
              transform: "translateZ(-120px)",
              border: "1px solid rgba(80,160,255,0.35)",
              boxShadow: "0 0 48px rgba(40,100,200,0.2)",
              ...grid(24, lineDim, lineDim),
              opacity: 0.7,
            }}
          />
        </div>
      </div>

      {/* Guide rays to vanishing point (2D overlay — always reliable) */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ opacity: 0.45 }}
      >
        <defs>
          <linearGradient id="ray-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(80,160,255,0.5)" />
            <stop offset="100%" stopColor="rgba(80,160,255,0)" />
          </linearGradient>
        </defs>
        <line x1="0" y1="0" x2="50" y2="50" stroke="rgba(90,170,255,0.4)" strokeWidth="0.12" />
        <line x1="100" y1="0" x2="50" y2="50" stroke="rgba(90,170,255,0.4)" strokeWidth="0.12" />
        <line x1="0" y1="100" x2="50" y2="50" stroke="rgba(90,170,255,0.4)" strokeWidth="0.12" />
        <line x1="100" y1="100" x2="50" y2="50" stroke="rgba(90,170,255,0.4)" strokeWidth="0.12" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(100,180,255,0.28)" strokeWidth="0.1" />
        <circle cx="50" cy="50" r="0.7" fill="rgba(255,77,0,0.85)" />
      </svg>

      {/* Center depth glow */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: "40%",
          height: "30%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse, rgba(40,100,200,0.22), transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* Edge vignette so walls read as a box */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, rgba(1,4,10,0.75) 0%, transparent 18%, transparent 82%, rgba(1,4,10,0.75) 100%),
            linear-gradient(to bottom, rgba(1,4,10,0.55) 0%, transparent 22%, transparent 78%, rgba(1,4,10,0.7) 100%)
          `,
        }}
      />

      <div className="grid-space-scan absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(100,180,255,0.5)] to-transparent" />
    </div>
  );
}
