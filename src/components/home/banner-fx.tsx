"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  Aperture,
  Eye,
  Gauge,
  Hexagon,
  Orbit,
  Power,
  Radar,
  RotateCcw,
  Shuffle,
  Sparkles,
  Waypoints,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type FxMode =
  | "orbit"
  | "mesh"
  | "prism"
  | "trace"
  | "bloom"
  | "radar";

export type FxColorKey = "orange" | "blue" | "cyan" | "violet" | "lime" | "auto";
export type FxSpeed = "slow" | "medium" | "fast";
export type FxDensity = "eco" | "balanced" | "rich";
export type FxAnchor = "center" | "right" | "left";
export type FxPreset = "studio" | "signal" | "soft" | "cnc" | "night";

const STORAGE_KEY = "ptc-banner-fx-v2";
const IDLE_HIDE_MS = 4200;
const AUTO_CYCLE_MS = 9000;

const COLORS: Record<
  Exclude<FxColorKey, "auto">,
  { solid: string; soft: string; glow: string; label: { vi: string; de: string } }
> = {
  orange: {
    solid: "#ff4d00",
    soft: "#ffb089",
    glow: "rgba(255,77,0,0.26)",
    label: { vi: "Cam", de: "Orange" },
  },
  blue: {
    solid: "#409cff",
    soft: "#8cc8ff",
    glow: "rgba(64,156,255,0.24)",
    label: { vi: "Xanh", de: "Blau" },
  },
  cyan: {
    solid: "#00dcd2",
    soft: "#78fff5",
    glow: "rgba(0,220,210,0.22)",
    label: { vi: "Cyan", de: "Cyan" },
  },
  violet: {
    solid: "#b464ff",
    soft: "#d2a0ff",
    glow: "rgba(180,100,255,0.22)",
    label: { vi: "Tím", de: "Violett" },
  },
  lime: {
    solid: "#a0ff3c",
    soft: "#c8ff8c",
    glow: "rgba(160,255,60,0.18)",
    label: { vi: "Lime", de: "Lime" },
  },
};

const AUTO_PALETTE: Exclude<FxColorKey, "auto">[] = [
  "orange",
  "cyan",
  "violet",
  "blue",
  "lime",
];

const SPEEDS: Record<
  FxSpeed,
  { mult: number; label: { vi: string; de: string } }
> = {
  slow: { mult: 1.65, label: { vi: "Chậm", de: "Langsam" } },
  medium: { mult: 1, label: { vi: "Vừa", de: "Mittel" } },
  fast: { mult: 0.52, label: { vi: "Nhanh", de: "Schnell" } },
};

const DENSITY: Record<
  FxDensity,
  { label: { vi: string; de: string }; rings: number; nodes: number; beams: number }
> = {
  eco: {
    label: { vi: "Eco", de: "Eco" },
    rings: 2,
    nodes: 8,
    beams: 3,
  },
  balanced: {
    label: { vi: "Cân", de: "Balance" },
    rings: 4,
    nodes: 12,
    beams: 5,
  },
  rich: {
    label: { vi: "Đầy", de: "Voll" },
    rings: 5,
    nodes: 16,
    beams: 7,
  },
};

const MODES: {
  id: FxMode;
  label: { vi: string; de: string };
  icon: typeof Orbit;
}[] = [
  { id: "orbit", label: { vi: "Orbit", de: "Orbit" }, icon: Orbit },
  { id: "mesh", label: { vi: "Mesh", de: "Netz" }, icon: Waypoints },
  { id: "prism", label: { vi: "Prism", de: "Prisma" }, icon: Aperture },
  { id: "trace", label: { vi: "Trace", de: "Pfad" }, icon: Hexagon },
  { id: "bloom", label: { vi: "Bloom", de: "Bloom" }, icon: Sparkles },
  { id: "radar", label: { vi: "Radar", de: "Radar" }, icon: Radar },
];

const PRESETS: Record<
  FxPreset,
  {
    label: { vi: string; de: string };
    mode: FxMode;
    color: FxColorKey;
    speed: FxSpeed;
    density: FxDensity;
    intensity: number;
    anchor: FxAnchor;
    reverse: boolean;
  }
> = {
  studio: {
    label: { vi: "Studio", de: "Studio" },
    mode: "orbit",
    color: "orange",
    speed: "medium",
    density: "balanced",
    intensity: 70,
    anchor: "center",
    reverse: false,
  },
  signal: {
    label: { vi: "Signal", de: "Signal" },
    mode: "radar",
    color: "cyan",
    speed: "fast",
    density: "balanced",
    intensity: 80,
    anchor: "right",
    reverse: false,
  },
  soft: {
    label: { vi: "Soft", de: "Soft" },
    mode: "bloom",
    color: "violet",
    speed: "slow",
    density: "eco",
    intensity: 45,
    anchor: "center",
    reverse: false,
  },
  cnc: {
    label: { vi: "CNC", de: "CNC" },
    mode: "trace",
    color: "blue",
    speed: "medium",
    density: "rich",
    intensity: 75,
    anchor: "center",
    reverse: false,
  },
  night: {
    label: { vi: "Night", de: "Night" },
    mode: "mesh",
    color: "lime",
    speed: "slow",
    density: "eco",
    intensity: 55,
    anchor: "left",
    reverse: true,
  },
};

type Persisted = {
  mode: FxMode;
  color: FxColorKey;
  speed: FxSpeed;
  density: FxDensity;
  intensity: number;
  anchor: FxAnchor;
  reverse: boolean;
  autoCycle: boolean;
  fxOn: boolean;
};

const DEFAULTS: Persisted = {
  mode: "orbit",
  color: "orange",
  speed: "medium",
  density: "balanced",
  intensity: 68,
  anchor: "center",
  reverse: false,
  autoCycle: false,
  fxOn: true,
};

function loadPrefs(): Persisted {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

function savePrefs(p: Persisted) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

type Props = {
  reduceMotion?: boolean | null;
  locale?: "vi" | "de";
};

/**
 * Banner atmosphere FX — refined + smart controls
 */
export function BannerFx({ reduceMotion, locale = "vi" }: Props) {
  const uid = useId().replace(/:/g, "");
  const [prefs, setPrefs] = useState<Persisted>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState(false);
  const [autoColorIdx, setAutoColorIdx] = useState(0);
  const [docHidden, setDocHidden] = useState(false);

  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  // hydrate from localStorage once
  useEffect(() => {
    setPrefs(loadPrefs());
    setHydrated(true);
  }, []);

  // persist
  useEffect(() => {
    if (!hydrated) return;
    savePrefs(prefs);
  }, [prefs, hydrated]);

  // pause when tab hidden
  useEffect(() => {
    const onVis = () => setDocHidden(document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const {
    mode,
    color,
    speed,
    density,
    intensity,
    anchor,
    reverse,
    autoCycle,
    fxOn,
  } = prefs;

  const patch = useCallback((partial: Partial<Persisted>) => {
    setPrefs((p) => ({ ...p, ...partial }));
  }, []);

  // auto color cycle when color === auto
  useEffect(() => {
    if (color !== "auto" || reduceMotion || !fxOn || docHidden) return;
    const id = window.setInterval(() => {
      setAutoColorIdx((i) => (i + 1) % AUTO_PALETTE.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [color, reduceMotion, fxOn, docHidden]);

  // auto mode cycle
  useEffect(() => {
    if (!autoCycle || reduceMotion || !fxOn || docHidden) return;
    const id = window.setInterval(() => {
      setPrefs((p) => {
        const idx = MODES.findIndex((m) => m.id === p.mode);
        const next = MODES[(idx + 1) % MODES.length]!.id;
        return { ...p, mode: next };
      });
    }, AUTO_CYCLE_MS);
    return () => window.clearInterval(id);
  }, [autoCycle, reduceMotion, fxOn, docHidden]);

  const resolvedColorKey: Exclude<FxColorKey, "auto"> =
    color === "auto" ? AUTO_PALETTE[autoColorIdx]! : color;
  const palette = COLORS[resolvedColorKey];
  const speedMult = SPEEDS[speed].mult;
  const dens = DENSITY[density];
  const animate = !reduceMotion && fxOn && !docHidden;
  const opacity = Math.max(0.15, Math.min(1, intensity / 100));

  const labels =
    locale === "de"
      ? {
          panel: "Atmosphäre",
          color: "Farbe",
          speed: "Tempo",
          style: "Modus",
          density: "Dichte",
          intensity: "Intensität",
          anchor: "Position",
          presets: "Presets",
          smart: "Smart",
          autoCycle: "Auto-Modus",
          reverse: "Umkehren",
          autoColor: "Auto-Farbe",
          reset: "Reset",
          open: "Steuerung öffnen",
          close: "Schließen",
          fxOn: "An",
          fxOff: "Aus",
          toggleFx: "Effekt ein/aus",
          center: "Mitte",
          left: "Links",
          right: "Rechts",
        }
      : {
          panel: "Bầu khí quyển",
          color: "Màu",
          speed: "Tốc độ",
          style: "Chế độ",
          density: "Mật độ",
          intensity: "Cường độ",
          anchor: "Vị trí",
          presets: "Preset",
          smart: "Thông minh",
          autoCycle: "Tự đổi mode",
          reverse: "Đảo chiều",
          autoColor: "Màu auto",
          reset: "Đặt lại",
          open: "Mở điều khiển",
          close: "Đóng",
          fxOn: "Bật",
          fxOff: "Tắt",
          toggleFx: "Bật/tắt hiệu ứng",
          center: "Giữa",
          left: "Trái",
          right: "Phải",
        };

  const clearIdle = useCallback(() => {
    if (idleTimer.current) {
      clearTimeout(idleTimer.current);
      idleTimer.current = null;
    }
  }, []);

  const scheduleHide = useCallback(() => {
    clearIdle();
    idleTimer.current = setTimeout(() => setOpen(false), IDLE_HIDE_MS);
  }, [clearIdle]);

  const bumpActivity = useCallback(() => {
    if (!open) return;
    scheduleHide();
  }, [open, scheduleHide]);

  useEffect(() => {
    if (open) scheduleHide();
    else clearIdle();
    return clearIdle;
  }, [open, scheduleHide, clearIdle]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const applyPreset = (id: FxPreset) => {
    const pr = PRESETS[id];
    patch({
      mode: pr.mode,
      color: pr.color,
      speed: pr.speed,
      density: pr.density,
      intensity: pr.intensity,
      anchor: pr.anchor,
      reverse: pr.reverse,
      autoCycle: false,
      fxOn: true,
    });
    bumpActivity();
  };

  const shuffleSmart = () => {
    const modes = MODES.map((m) => m.id);
    const colors = Object.keys(COLORS) as Exclude<FxColorKey, "auto">[];
    const densKeys = Object.keys(DENSITY) as FxDensity[];
    const speeds = Object.keys(SPEEDS) as FxSpeed[];
    const anchors: FxAnchor[] = ["center", "left", "right"];
    patch({
      mode: modes[Math.floor(Math.random() * modes.length)]!,
      color: colors[Math.floor(Math.random() * colors.length)]!,
      density: densKeys[Math.floor(Math.random() * densKeys.length)]!,
      speed: speeds[Math.floor(Math.random() * speeds.length)]!,
      anchor: anchors[Math.floor(Math.random() * anchors.length)]!,
      intensity: 50 + Math.floor(Math.random() * 40),
      reverse: Math.random() > 0.5,
      fxOn: true,
    });
    bumpActivity();
  };

  const cssVars = {
    ["--bfx-c"]: palette.solid,
    ["--bfx-soft"]: palette.soft,
    ["--bfx-glow"]: palette.glow,
    ["--bfx-speed"]: String(speedMult),
    ["--bfx-dir"]: reverse ? "-1" : "1",
    ["--bfx-opacity"]: String(opacity),
  } as CSSProperties;

  const fieldProps = {
    uid,
    palette,
    animate,
    dens,
    reverse,
    anchor,
  };

  return (
    <>
      {fxOn && (
        <div
          className={cn(
            "banner-fx pointer-events-none absolute inset-0 z-[20] overflow-hidden",
            animate && "banner-fx--live"
          )}
          style={{
            ...cssVars,
            opacity,
            contain: "layout paint style",
          }}
          aria-hidden
        >
          {mode === "orbit" && <OrbitField {...fieldProps} />}
          {mode === "mesh" && <MeshField {...fieldProps} />}
          {mode === "prism" && <PrismField {...fieldProps} />}
          {mode === "trace" && <TraceField {...fieldProps} />}
          {mode === "bloom" && <BloomField {...fieldProps} />}
          {mode === "radar" && <RadarField {...fieldProps} />}
        </div>
      )}

      {/* Control dock */}
      <div
        ref={dockRef}
        className="pointer-events-auto absolute right-3 bottom-20 z-[40] sm:right-5 sm:bottom-24 lg:right-8 lg:bottom-28"
        onPointerMove={bumpActivity}
        onFocusCapture={bumpActivity}
      >
        <div className="flex flex-col items-end gap-2">
          {open && (
            <div
              className="banner-fx-dock w-[min(100vw-1.5rem,19rem)] max-h-[min(70vh,28rem)] overflow-y-auto border border-white/12 bg-black/78 p-3 shadow-2xl backdrop-blur-md no-scrollbar"
              style={{
                boxShadow: `0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px ${palette.solid}22`,
              }}
            >
              {/* Header */}
              <div className="mb-2.5 flex items-center justify-between gap-2">
                <p className="font-mono text-[10px] tracking-[0.16em] text-white/50 uppercase">
                  {labels.panel}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      patch({ fxOn: !fxOn });
                      bumpActivity();
                    }}
                    className={cn(
                      "inline-flex items-center gap-1 border px-1.5 py-1 font-mono text-[10px] transition-colors",
                      fxOn ? "text-white/85" : "border-white/10 text-white/40"
                    )}
                    style={
                      fxOn
                        ? {
                            borderColor: `${palette.solid}55`,
                            color: palette.solid,
                          }
                        : undefined
                    }
                    aria-label={labels.toggleFx}
                  >
                    <Power className="h-3 w-3" />
                    {fxOn ? labels.fxOn : labels.fxOff}
                  </button>
                </div>
              </div>

              {/* Smart presets */}
              <SectionLabel>{labels.presets}</SectionLabel>
              <div className="mb-3 flex flex-wrap gap-1">
                {(Object.keys(PRESETS) as FxPreset[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => applyPreset(id)}
                    className="border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-white/60 transition-colors hover:border-white/25 hover:text-white"
                  >
                    {PRESETS[id].label[locale]}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={shuffleSmart}
                  className="inline-flex items-center gap-1 border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-white/60 transition-colors hover:border-white/25 hover:text-white"
                  title="Shuffle"
                >
                  <Shuffle className="h-3 w-3" />
                  Mix
                </button>
              </div>

              {/* Modes */}
              <SectionLabel>{labels.style}</SectionLabel>
              <div className="mb-3 grid grid-cols-3 gap-1">
                {MODES.map((m) => {
                  const on = mode === m.id;
                  const MIcon = m.icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        patch({ mode: m.id, autoCycle: false });
                        bumpActivity();
                      }}
                      className={cn(
                        "flex flex-col items-center gap-0.5 border px-1 py-1.5 text-[9px] font-medium transition-colors",
                        on
                          ? "text-black"
                          : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/80"
                      )}
                      style={
                        on
                          ? {
                              background: palette.solid,
                              borderColor: palette.solid,
                            }
                          : undefined
                      }
                    >
                      <MIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
                      {m.label[locale]}
                    </button>
                  );
                })}
              </div>

              {/* Color */}
              <SectionLabel>{labels.color}</SectionLabel>
              <div className="mb-3 flex flex-wrap items-center gap-1.5">
                {(Object.keys(COLORS) as Exclude<FxColorKey, "auto">[]).map(
                  (k) => {
                    const c = COLORS[k];
                    const on = color === k;
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => {
                          patch({ color: k });
                          bumpActivity();
                        }}
                        className={cn(
                          "h-6 w-6 border transition-transform",
                          on
                            ? "scale-110 ring-2 ring-white/45"
                            : "border-white/15"
                        )}
                        style={{ background: c.solid }}
                        title={c.label[locale]}
                        aria-label={c.label[locale]}
                      />
                    );
                  }
                )}
                <button
                  type="button"
                  onClick={() => {
                    patch({ color: "auto" });
                    bumpActivity();
                  }}
                  className={cn(
                    "inline-flex h-6 items-center gap-1 border px-1.5 font-mono text-[9px]",
                    color === "auto"
                      ? "border-white/40 text-white"
                      : "border-white/15 text-white/45"
                  )}
                  title={labels.autoColor}
                >
                  <Zap className="h-3 w-3" style={{ color: palette.solid }} />
                  Auto
                </button>
              </div>

              {/* Speed */}
              <SectionLabel>{labels.speed}</SectionLabel>
              <div className="mb-3 flex gap-1">
                {(Object.keys(SPEEDS) as FxSpeed[]).map((s) => {
                  const on = speed === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        patch({ speed: s });
                        bumpActivity();
                      }}
                      className={cn(
                        "flex-1 border px-1 py-1 font-mono text-[10px] transition-colors",
                        on
                          ? "text-black"
                          : "border-white/10 text-white/45 hover:text-white/75"
                      )}
                      style={
                        on
                          ? {
                              background: palette.solid,
                              borderColor: palette.solid,
                            }
                          : undefined
                      }
                    >
                      {SPEEDS[s].label[locale]}
                    </button>
                  );
                })}
              </div>

              {/* Density */}
              <SectionLabel>
                <Gauge className="mr-1 inline h-3 w-3 opacity-60" />
                {labels.density}
              </SectionLabel>
              <div className="mb-3 flex gap-1">
                {(Object.keys(DENSITY) as FxDensity[]).map((d) => {
                  const on = density === d;
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        patch({ density: d });
                        bumpActivity();
                      }}
                      className={cn(
                        "flex-1 border px-1 py-1 font-mono text-[10px] transition-colors",
                        on
                          ? "text-black"
                          : "border-white/10 text-white/45 hover:text-white/75"
                      )}
                      style={
                        on
                          ? {
                              background: palette.solid,
                              borderColor: palette.solid,
                            }
                          : undefined
                      }
                    >
                      {DENSITY[d].label[locale]}
                    </button>
                  );
                })}
              </div>

              {/* Intensity */}
              <SectionLabel>
                <Eye className="mr-1 inline h-3 w-3 opacity-60" />
                {labels.intensity} · {intensity}%
              </SectionLabel>
              <input
                type="range"
                min={20}
                max={100}
                step={5}
                value={intensity}
                onChange={(e) => {
                  patch({ intensity: Number(e.target.value) });
                  bumpActivity();
                }}
                className="banner-fx-range mb-3 w-full"
                style={
                  {
                    ["--range-accent"]: palette.solid,
                  } as CSSProperties
                }
              />

              {/* Anchor */}
              <SectionLabel>{labels.anchor}</SectionLabel>
              <div className="mb-3 flex gap-1">
                {(
                  [
                    ["left", labels.left],
                    ["center", labels.center],
                    ["right", labels.right],
                  ] as const
                ).map(([id, lab]) => {
                  const on = anchor === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        patch({ anchor: id });
                        bumpActivity();
                      }}
                      className={cn(
                        "flex-1 border px-1 py-1 font-mono text-[10px] transition-colors",
                        on
                          ? "text-black"
                          : "border-white/10 text-white/45 hover:text-white/75"
                      )}
                      style={
                        on
                          ? {
                              background: palette.solid,
                              borderColor: palette.solid,
                            }
                          : undefined
                      }
                    >
                      {lab}
                    </button>
                  );
                })}
              </div>

              {/* Smart toggles */}
              <SectionLabel>{labels.smart}</SectionLabel>
              <div className="mb-2 flex flex-col gap-1.5">
                <ToggleRow
                  label={labels.autoCycle}
                  on={autoCycle}
                  accent={palette.solid}
                  onClick={() => {
                    patch({ autoCycle: !autoCycle });
                    bumpActivity();
                  }}
                />
                <ToggleRow
                  label={labels.reverse}
                  on={reverse}
                  accent={palette.solid}
                  onClick={() => {
                    patch({ reverse: !reverse });
                    bumpActivity();
                  }}
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setPrefs(DEFAULTS);
                  bumpActivity();
                }}
                className="mt-1 flex w-full items-center justify-center gap-1.5 border border-white/10 py-1.5 font-mono text-[10px] text-white/45 transition-colors hover:border-white/25 hover:text-white/75"
              >
                <RotateCcw className="h-3 w-3" />
                {labels.reset}
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "flex h-10 w-10 items-center justify-center border bg-black/55 text-white/75 backdrop-blur-md transition-all hover:text-white",
              open ? "border-white/30" : "border-white/15"
            )}
            style={
              open || fxOn
                ? { borderColor: `${palette.solid}50`, color: palette.soft }
                : undefined
            }
            aria-expanded={open}
            aria-label={open ? labels.close : labels.open}
          >
            {open ? (
              <span className="font-mono text-xs">×</span>
            ) : (
              <Orbit className="h-4 w-4" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-1.5 font-mono text-[9px] tracking-wider text-white/35 uppercase">
      {children}
    </p>
  );
}

function ToggleRow({
  label,
  on,
  accent,
  onClick,
}: {
  label: string;
  on: boolean;
  accent: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-left text-[11px] text-white/65 transition-colors hover:bg-white/[0.05]"
    >
      <span>{label}</span>
      <span
        className={cn(
          "relative h-4 w-7 border transition-colors",
          on ? "border-transparent" : "border-white/20 bg-black/40"
        )}
        style={on ? { background: accent } : undefined}
      >
        <span
          className={cn(
            "absolute top-0.5 h-2.5 w-2.5 bg-white transition-all",
            on ? "left-3.5" : "left-0.5"
          )}
        />
      </span>
    </button>
  );
}

type FieldProps = {
  uid: string;
  palette: (typeof COLORS)[Exclude<FxColorKey, "auto">];
  animate: boolean;
  dens: (typeof DENSITY)[FxDensity];
  reverse: boolean;
  anchor: FxAnchor;
};

function anchorClass(anchor: FxAnchor) {
  if (anchor === "left") return "justify-start pl-[6%] sm:pl-[10%]";
  if (anchor === "right") return "justify-end pr-[6%] sm:pr-[10%]";
  return "justify-center";
}

function OrbitField({ uid, palette, animate, dens, reverse, anchor }: FieldProps) {
  const rings = useMemo(() => {
    const base = [16, 26, 38, 50, 60];
    return base.slice(0, dens.rings);
  }, [dens.rings]);

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center",
        anchorClass(anchor)
      )}
    >
      <div
        className="absolute h-[min(88vmin,680px)] w-[min(88vmin,680px)]"
        style={{
          background: `radial-gradient(circle, ${palette.glow} 0%, transparent 58%)`,
        }}
      />
      <svg
        className="h-[min(90vmin,700px)] w-[min(90vmin,700px)] will-change-transform"
        viewBox="0 0 200 200"
      >
        <defs>
          <linearGradient id={`orb-g-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.solid} stopOpacity="0.12" />
            <stop offset="50%" stopColor={palette.solid} stopOpacity="0.9" />
            <stop offset="100%" stopColor={palette.soft} stopOpacity="0.18" />
          </linearGradient>
        </defs>
        {rings.map((r, i) => (
          <g key={r}>
            <g
              className={animate ? "banner-fx-spin-svg" : undefined}
              style={
                {
                  ["--bfx-spin"]: `${18 + i * 7}s`,
                  ["--bfx-dir"]: reverse
                    ? i % 2 === 0
                      ? "-1"
                      : "1"
                    : i % 2 === 0
                      ? "1"
                      : "-1",
                } as CSSProperties
              }
            >
              <circle
                cx="100"
                cy="100"
                r={r}
                fill="none"
                stroke={`url(#orb-g-${uid})`}
                strokeWidth={i === Math.min(2, rings.length - 1) ? 1.15 : 0.55}
                strokeDasharray={i % 2 === 0 ? "2.5 5" : undefined}
                opacity={0.32 + i * 0.1}
              />
            </g>
            <g
              className={animate ? "banner-fx-spin-svg" : undefined}
              style={
                {
                  ["--bfx-spin"]: `${9 + i * 3.5}s`,
                  ["--bfx-dir"]: reverse
                    ? i % 2
                      ? "1"
                      : "-1"
                    : i % 2
                      ? "-1"
                      : "1",
                  filter: `drop-shadow(0 0 3px ${palette.solid})`,
                } as CSSProperties
              }
            >
              <circle
                cx={100 + r}
                cy="100"
                r={1.2 + i * 0.2}
                fill={palette.solid}
              />
            </g>
          </g>
        ))}
        <circle cx="100" cy="100" r="2.8" fill={palette.solid} opacity="0.9">
          {animate && (
            <animate
              attributeName="r"
              values="2;3.4;2"
              dur="2.6s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </svg>
    </div>
  );
}

function MeshField({ uid, palette, animate, dens, anchor }: FieldProps) {
  const allNodes = useMemo(
    () =>
      [
        [18, 28],
        [42, 16],
        [68, 26],
        [88, 20],
        [24, 52],
        [50, 46],
        [74, 56],
        [90, 50],
        [14, 76],
        [40, 80],
        [62, 74],
        [86, 78],
        [55, 33],
        [33, 40],
        [70, 40],
        [48, 66],
      ] as [number, number][],
    []
  );
  const nodes = allNodes.slice(0, dens.nodes);
  const links = useMemo(() => {
    const out: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const [x1, y1] = nodes[i]!;
        const [x2, y2] = nodes[j]!;
        const d = Math.hypot(x1 - x2, y1 - y2);
        if (d < 32) out.push([i, j]);
      }
    }
    return out.slice(0, dens.nodes + 8);
  }, [nodes, dens.nodes]);

  return (
    <div className={cn("absolute inset-0 flex", anchorClass(anchor))}>
      <svg
        className="h-full w-full max-w-5xl"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id={`mesh-glow-${uid}`}>
            <stop offset="0%" stopColor={palette.solid} stopOpacity="0.4" />
            <stop offset="100%" stopColor={palette.solid} stopOpacity="0" />
          </radialGradient>
        </defs>
        {links.map(([a, b], i) => {
          const [x1, y1] = nodes[a]!;
          const [x2, y2] = nodes[b]!;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={palette.solid}
              strokeWidth="0.14"
              opacity={0.3}
              className={animate ? "banner-fx-pulse-line" : undefined}
              style={{ animationDelay: `${(i % 8) * 0.1}s` }}
            />
          );
        })}
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <circle
              cx={x}
              cy={y}
              r="2"
              fill={`url(#mesh-glow-${uid})`}
              className={animate ? "banner-fx-breathe" : undefined}
              style={{ animationDelay: `${i * 0.12}s` }}
            />
            <circle cx={x} cy={y} r="0.5" fill={palette.soft} />
          </g>
        ))}
      </svg>
    </div>
  );
}

function PrismField({ palette, animate, dens, reverse, anchor }: FieldProps) {
  const beams = useMemo(() => {
    const base = [
      { rot: -28, top: 8, w: 55, d: 0 },
      { rot: 12, top: 28, w: 70, d: 0.7 },
      { rot: -8, top: 48, w: 48, d: 1.3 },
      { rot: 22, top: 66, w: 62, d: 0.35 },
      { rot: -15, top: 82, w: 40, d: 1.0 },
      { rot: 8, top: 18, w: 35, d: 1.6 },
      { rot: -20, top: 58, w: 50, d: 0.5 },
    ];
    return base.slice(0, dens.beams).map((b) => ({
      ...b,
      rot: reverse ? -b.rot : b.rot,
    }));
  }, [dens.beams, reverse]);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden",
        anchor === "left" && "origin-left scale-x-100",
        anchor === "right" && "origin-right"
      )}
    >
      {beams.map((b, i) => (
        <div
          key={i}
          className={cn(
            "absolute left-[-15%] h-[1.5px] origin-left will-change-opacity",
            animate && "banner-fx-beam"
          )}
          style={{
            top: `${b.top}%`,
            width: `${b.w}%`,
            transform: `rotate(${b.rot}deg)`,
            background: `linear-gradient(90deg, transparent, ${palette.solid}, ${palette.soft}aa, transparent)`,
            boxShadow: `0 0 18px ${palette.glow}`,
            animationDelay: `${b.d}s`,
            opacity: 0.5,
          }}
        />
      ))}
      {[...Array(Math.min(6, dens.beams + 1))].map((_, i) => (
        <div
          key={`s-${i}`}
          className={cn(
            "absolute h-14 w-px opacity-35",
            animate && "banner-fx-shard"
          )}
          style={{
            left: `${14 + i * 13}%`,
            top: `${12 + (i % 3) * 20}%`,
            background: `linear-gradient(180deg, transparent, ${palette.solid}, transparent)`,
            transform: `rotate(${-22 + i * 7}deg)`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}

function TraceField({ uid, palette, animate, dens, reverse, anchor }: FieldProps) {
  const path =
    dens.rings >= 4
      ? "M50 12 L82 30 L82 70 L50 88 L18 70 L18 30 Z M50 28 L68 38 L68 62 L50 72 L32 62 L32 38 Z M30 50 L70 50 M50 30 L50 70"
      : "M50 18 L78 34 L78 66 L50 82 L22 66 L22 34 Z M35 50 L65 50 M50 35 L50 65";

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center",
        anchorClass(anchor)
      )}
    >
      <svg
        className="h-[min(78vmin,540px)] w-[min(78vmin,540px)]"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id={`tr-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={palette.soft} stopOpacity="0.25" />
            <stop offset="50%" stopColor={palette.solid} stopOpacity="1" />
            <stop offset="100%" stopColor={palette.soft} stopOpacity="0.25" />
          </linearGradient>
        </defs>
        {(dens.rings >= 3 ? [25, 50, 75] : [50]).map((v) => (
          <g key={v} opacity="0.12" stroke={palette.soft} strokeWidth="0.18">
            <line x1={v} y1="8" x2={v} y2="92" />
            <line x1="8" y1={v} x2="92" y2={v} />
          </g>
        ))}
        <path
          d={path}
          fill="none"
          stroke={`url(#tr-${uid})`}
          strokeWidth="0.85"
          strokeLinecap="square"
          className={animate ? "banner-fx-draw" : undefined}
          style={{ strokeDasharray: 280 } as CSSProperties}
        />
        <path
          d={path}
          fill="none"
          stroke={palette.solid}
          strokeWidth="2.2"
          strokeOpacity="0.1"
          className={animate ? "banner-fx-draw" : undefined}
          style={{ strokeDasharray: 280 } as CSSProperties}
        />
        {animate && (
          <circle r="1.5" fill={palette.solid}>
            <animateMotion
              dur={`${reverse ? 10 : 7.5}s`}
              repeatCount="indefinite"
              path={path}
              keyPoints={reverse ? "1;0" : "0;1"}
              keyTimes="0;1"
              calcMode="linear"
            />
          </circle>
        )}
      </svg>
    </div>
  );
}

function BloomField({ palette, animate, dens, anchor }: FieldProps) {
  const blobs = useMemo(() => {
    const base = [
      { x: "22%", y: "30%", s: 260 },
      { x: "70%", y: "24%", s: 200 },
      { x: "55%", y: "66%", s: 280 },
      { x: "28%", y: "72%", s: 180 },
      { x: "78%", y: "58%", s: 160 },
      { x: "48%", y: "42%", s: 140 },
    ];
    return base.slice(0, Math.max(3, dens.beams));
  }, [dens.beams]);

  return (
    <div className={cn("absolute inset-0", anchor !== "center" && "opacity-95")}>
      {blobs.map((b, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full opacity-50 blur-3xl will-change-transform",
            animate && "banner-fx-bloom"
          )}
          style={{
            left: b.x,
            top: b.y,
            width: b.s,
            height: b.s,
            marginLeft: -b.s / 2,
            marginTop: -b.s / 2,
            background: `radial-gradient(circle, ${palette.glow} 0%, transparent 70%)`,
            animationDelay: `${i * 0.45}s`,
            mixBlendMode: "screen",
          }}
        />
      ))}
      <div
        className={cn(
          "absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-2xl",
          animate && "banner-fx-breathe"
        )}
        style={{
          background: `radial-gradient(circle, ${palette.solid}55, transparent 70%)`,
        }}
      />
    </div>
  );
}

function RadarField({ uid, palette, animate, dens, reverse, anchor }: FieldProps) {
  const pings = useMemo(() => {
    const base = [
      { x: 62, y: 38 },
      { x: 40, y: 55 },
      { x: 72, y: 62 },
      { x: 35, y: 32 },
      { x: 58, y: 70 },
      { x: 78, y: 42 },
    ];
    return base.slice(0, Math.min(6, dens.nodes / 2 + 1));
  }, [dens.nodes]);

  const rings = dens.rings >= 4 ? [12, 24, 36, 44] : [16, 30, 42];

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center",
        anchorClass(anchor === "center" ? "right" : anchor)
      )}
    >
      <svg
        className="h-[min(82vmin,600px)] w-[min(82vmin,600px)] opacity-90"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient
            id={`rad-sw-${uid}`}
            x1="50%"
            y1="50%"
            x2="100%"
            y2="50%"
          >
            <stop offset="0%" stopColor={palette.solid} stopOpacity="0.5" />
            <stop offset="100%" stopColor={palette.solid} stopOpacity="0" />
          </linearGradient>
        </defs>
        {rings.map((r) => (
          <circle
            key={r}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={palette.solid}
            strokeWidth="0.22"
            opacity={0.22}
          />
        ))}
        <line
          x1="50"
          y1="8"
          x2="50"
          y2="92"
          stroke={palette.solid}
          strokeWidth="0.12"
          opacity="0.18"
        />
        <line
          x1="8"
          y1="50"
          x2="92"
          y2="50"
          stroke={palette.solid}
          strokeWidth="0.12"
          opacity="0.18"
        />
        <g
          className={animate ? "banner-fx-spin-svg" : undefined}
          style={
            {
              ["--bfx-spin"]: "4.2s",
              ["--bfx-dir"]: reverse ? "-1" : "1",
            } as CSSProperties
          }
        >
          <path
            d="M50 50 L50 8 A42 42 0 0 1 85 65 Z"
            fill={`url(#rad-sw-${uid})`}
            opacity="0.75"
          />
        </g>
        {pings.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r="1.1"
              fill={palette.soft}
              className={animate ? "banner-fx-ping" : undefined}
              style={{ animationDelay: `${i * 0.55}s` }}
            />
            <circle
              cx={p.x}
              cy={p.y}
              r="2.8"
              fill="none"
              stroke={palette.solid}
              strokeWidth="0.28"
              className={animate ? "banner-fx-ping-ring" : undefined}
              style={{ animationDelay: `${i * 0.55}s` }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export { BannerFx as EcgWaves };
