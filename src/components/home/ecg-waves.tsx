"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Gauge,
  Maximize2,
  Palette,
  Power,
  RotateCw,
  Waves,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type WaveStyle = "ecg" | "sine" | "square" | "saw" | "pulse" | "noise";
export type WaveSpeed = "slow" | "medium" | "fast";
export type WaveColorKey = "orange" | "blue" | "cyan" | "violet" | "lime";

const COLORS: Record<
  WaveColorKey,
  { solid: string; soft: string; glow: string; label: string }
> = {
  orange: {
    solid: "#ff4d00",
    soft: "#ffb089",
    glow: "rgba(255,77,0,0.22)",
    label: "Cam",
  },
  blue: {
    solid: "#409cff",
    soft: "#8cc8ff",
    glow: "rgba(64,156,255,0.22)",
    label: "Xanh",
  },
  cyan: {
    solid: "#00dcd2",
    soft: "#78fff5",
    glow: "rgba(0,220,210,0.18)",
    label: "Cyan",
  },
  violet: {
    solid: "#b464ff",
    soft: "#d2a0ff",
    glow: "rgba(180,100,255,0.18)",
    label: "Tím",
  },
  lime: {
    solid: "#a0ff3c",
    soft: "#c8ff8c",
    glow: "rgba(160,255,60,0.16)",
    label: "Lime",
  },
};

const SPEEDS: Record<WaveSpeed, { pan: number; dash: number; label: string }> = {
  slow: { pan: 28, dash: 18, label: "Chậm" },
  medium: { pan: 14, dash: 10, label: "Vừa" },
  fast: { pan: 7, dash: 5, label: "Nhanh" },
};

const STYLES: { id: WaveStyle; label: string }[] = [
  { id: "ecg", label: "ECG" },
  { id: "sine", label: "Sine" },
  { id: "square", label: "Vuông" },
  { id: "saw", label: "Răng cưa" },
  { id: "pulse", label: "Pulse" },
  { id: "noise", label: "Noise" },
];

const ANGLE_PRESETS = [-45, -30, -15, 0, 15, 30, 36, 45] as const;
const SIZE_PRESETS = [50, 75, 100, 125, 150, 200] as const;

/** Auto-hide open panel after this idle time (ms) */
const IDLE_HIDE_MS = 3500;

const PERIOD = 160;
const PERIODS = 14;
const VB_H = 100;
const MID = 50;
function periodPath(style: WaveStyle, mid = MID, period = PERIOD): string {
  switch (style) {
    case "ecg":
      return [
        `M0 ${mid}`,
        `L${period * 0.18} ${mid}`,
        `L${period * 0.24} ${mid}`,
        `L${period * 0.28} ${mid - 14}`,
        `L${period * 0.32} ${mid + 22}`,
        `L${period * 0.38} ${mid - 28}`,
        `L${period * 0.44} ${mid + 8}`,
        `L${period * 0.48} ${mid}`,
        `L${period * 0.68} ${mid}`,
        `L${period * 0.74} ${mid}`,
        `L${period * 0.78} ${mid - 6}`,
        `L${period * 0.82} ${mid}`,
        `L${period} ${mid}`,
      ].join(" ");
    case "sine": {
      const n = 40;
      const pts: string[] = [];
      for (let i = 0; i <= n; i++) {
        const x = (i / n) * period;
        const y = mid + Math.sin((i / n) * Math.PI * 2) * 22;
        pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`);
      }
      return pts.join(" ");
    }
    case "square":
      return [
        `M0 ${mid + 18}`,
        `L${period * 0.01} ${mid + 18}`,
        `L${period * 0.01} ${mid - 18}`,
        `L${period * 0.5} ${mid - 18}`,
        `L${period * 0.5} ${mid + 18}`,
        `L${period * 0.99} ${mid + 18}`,
        `L${period * 0.99} ${mid - 18}`,
        `L${period} ${mid - 18}`,
      ].join(" ");
    case "saw":
      return `M0 ${mid + 20} L${period * 0.94} ${mid - 20} L${period * 0.94} ${mid + 20} L${period} ${mid + 20}`;
    case "pulse":
      return [
        `M0 ${mid}`,
        `L${period * 0.3} ${mid}`,
        `L${period * 0.33} ${mid - 28}`,
        `L${period * 0.38} ${mid}`,
        `L${period * 0.66} ${mid}`,
        `L${period * 0.69} ${mid - 14}`,
        `L${period * 0.72} ${mid}`,
        `L${period} ${mid}`,
      ].join(" ");
    case "noise": {
      const seeds = [0, 6, -10, 15, -18, 8, -4, 20, -12, 5, -14, 10, 0];
      return seeds
        .map((s, i) => {
          const x = (i / (seeds.length - 1)) * period;
          const y = mid + s * 1.4;
          return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
        })
        .join(" ");
    }
    default:
      return `M0 ${mid} L${period} ${mid}`;
  }
}

function buildContinuousPath(style: WaveStyle, count: number): string {
  const parts: string[] = [];
  for (let i = 0; i < count; i++) {
    const offset = i * PERIOD;
    const shifted = periodPath(style)
      .split(/(?=[ML])/)
      .filter(Boolean)
      .map((cmd, idx) => {
        const m = cmd.match(/^([ML])\s*([\d.-]+)\s+([\d.-]+)/);
        if (!m) return cmd;
        const x = parseFloat(m[2]) + offset;
        const y = m[3];
        const letter = i > 0 && idx === 0 ? "L" : m[1];
        return `${letter}${x.toFixed(2)} ${y}`;
      })
      .join(" ");
    parts.push(shifted);
  }
  return parts.join(" ");
}

function clampAngle(n: number) {
  return Math.max(-90, Math.min(90, Math.round(n)));
}

function clampSize(n: number) {
  return Math.max(40, Math.min(220, Math.round(n)));
}

type Props = {
  reduceMotion?: boolean | null;
  locale?: "vi" | "de";
};

export function EcgWaves({ reduceMotion, locale = "vi" }: Props) {
  const uid = useId().replace(/:/g, "");
  const [style, setStyle] = useState<WaveStyle>("ecg");
  const [color, setColor] = useState<WaveColorKey>("orange");
  const [speed, setSpeed] = useState<WaveSpeed>("medium");
  const [angle, setAngle] = useState(0);
  /** Wave size as percent (100 = default) */
  const [size, setSize] = useState(100);
  /** Panel open (full controls) vs collapsed arrow only */
  const [open, setOpen] = useState(false);
  /** Master on/off for wave field */
  const [fxOn, setFxOn] = useState(true);

  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const palette = COLORS[color];
  const speedCfg = SPEEDS[speed];
  const stripW = PERIODS * PERIOD;
  const sizeFactor = size / 100;

  const pathD = useMemo(() => buildContinuousPath(style, PERIODS), [style]);
  const previewD = useMemo(() => periodPath(style), [style]);

  const rows = [
    { top: "28%", opacity: 0.95, width: 2.4, factor: 1, soft: false },
    { top: "50%", opacity: 0.55, width: 1.5, factor: 1.15, soft: true },
    { top: "72%", opacity: 0.32, width: 1.1, factor: 1.3, soft: true },
  ];

  const labels =
    locale === "de"
      ? {
          panel: "Wellen",
          color: "Farbe",
          speed: "Tempo",
          style: "Stil",
          angle: "Winkel",
          size: "Größe",
          open: "Steuerung öffnen",
          close: "Steuerung schließen",
          fx: "Effekt",
          fxOn: "Effekt an",
          fxOff: "Effekt aus",
          toggleFx: "Effekt ein/aus",
        }
      : {
          panel: "Sóng",
          color: "Màu",
          speed: "Tốc độ",
          style: "Kiểu",
          angle: "Góc xoay",
          size: "Kích thước",
          open: "Mở bảng điều khiển",
          close: "Đóng bảng điều khiển",
          fx: "Hiệu ứng",
          fxOn: "Đang bật",
          fxOff: "Đang tắt",
          toggleFx: "Bật/tắt hiệu ứng",
        };

  const animate = !reduceMotion && fxOn;

  const clearIdle = useCallback(() => {
    if (idleTimer.current) {
      clearTimeout(idleTimer.current);
      idleTimer.current = null;
    }
  }, []);

  const scheduleHide = useCallback(() => {
    clearIdle();
    idleTimer.current = setTimeout(() => {
      setOpen(false);
    }, IDLE_HIDE_MS);
  }, [clearIdle]);

  /** Reset idle clock while panel is open / user is interacting */
  const bumpActivity = useCallback(() => {
    if (!open) return;
    scheduleHide();
  }, [open, scheduleHide]);

  useEffect(() => {
    if (open) {
      scheduleHide();
    } else {
      clearIdle();
    }
    return clearIdle;
  }, [open, scheduleHide, clearIdle]);

  // Close when clicking outside the dock
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const el = dockRef.current;
      if (el && !el.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const rangeStyle = {
    ["--range-accent"]: palette.solid,
  } as CSSProperties;

  return (
    <>
      {/* Wave field — hidden when master FX is off */}
      {fxOn && (
        <div
          className="pointer-events-none absolute inset-0 z-[20] overflow-hidden"
          aria-hidden
        >
          <div
            className="absolute left-1/2 top-1/2 h-[165%] w-[165%]"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg) scale(${sizeFactor})`,
              transformOrigin: "center center",
              transition: reduceMotion
                ? undefined
                : "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div
              className="absolute inset-x-0 top-1/2 h-36 -translate-y-1/2"
              style={{
                background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${palette.glow}, transparent 72%)`,
              }}
            />

            {rows.map((row, idx) => {
              const panSec = speedCfg.pan * row.factor;
              const stroke = row.soft ? palette.soft : palette.solid;
              return (
                <div
                  key={idx}
                  className="absolute left-0 right-0 h-[100px] -translate-y-1/2"
                  style={{
                    top: row.top,
                    opacity: row.opacity,
                  }}
                >
                  <div
                    className={cn(
                      "banner-wave-track",
                      animate && "banner-wave-pan"
                    )}
                    style={
                      {
                        ["--wave-pan-duration"]: `${panSec}s`,
                      } as CSSProperties
                    }
                  >
                    {[0, 1].map((copy) => (
                      <div key={copy} className="banner-wave-half">
                        <svg
                          className="h-full w-full"
                          viewBox={`0 0 ${stripW} ${VB_H}`}
                          preserveAspectRatio="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <linearGradient
                              id={`bw-fade-${uid}-${idx}-${copy}`}
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop
                                offset="0%"
                                stopColor={stroke}
                                stopOpacity="0.15"
                              />
                              <stop
                                offset="12%"
                                stopColor={stroke}
                                stopOpacity="1"
                              />
                              <stop
                                offset="88%"
                                stopColor={stroke}
                                stopOpacity="1"
                              />
                              <stop
                                offset="100%"
                                stopColor={stroke}
                                stopOpacity="0.15"
                              />
                            </linearGradient>
                          </defs>
                          <path
                            d={pathD}
                            fill="none"
                            stroke={stroke}
                            strokeWidth={row.width + 3}
                            strokeOpacity={0.18}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                          />
                          <path
                            d={pathD}
                            fill="none"
                            stroke={`url(#bw-fade-${uid}-${idx}-${copy})`}
                            strokeWidth={row.width}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                            className={animate ? "banner-wave-dash" : undefined}
                            style={
                              animate
                                ? ({
                                    ["--wave-dash-duration"]: `${speedCfg.dash}s`,
                                  } as CSSProperties)
                                : undefined
                            }
                          />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Arrow trigger + sliding panel */}
      <div className="pointer-events-none absolute inset-0 z-[50]">
        <div
          ref={dockRef}
          className="pointer-events-auto absolute right-0 bottom-[4.25rem] flex items-end sm:bottom-[5rem]"
          onMouseEnter={bumpActivity}
          onMouseMove={bumpActivity}
          onFocusCapture={bumpActivity}
          onPointerDown={bumpActivity}
          onKeyDown={bumpActivity}
        >
          {/* Panel body — slides in from the right */}
          <div
            className={cn(
              "origin-bottom-right overflow-hidden border border-white/20 bg-[#060b14]/95 shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              open
                ? "mr-0 max-h-[min(70vh,520px)] w-[min(calc(100vw-3.5rem),292px)] translate-x-0 opacity-100"
                : "pointer-events-none mr-0 max-h-0 w-0 translate-x-3 border-transparent opacity-0 shadow-none"
            )}
            aria-hidden={!open}
          >
            <div className="w-[min(calc(100vw-3.5rem),292px)]">
              <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
                <Waves
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color: fxOn ? palette.solid : "rgba(255,255,255,0.35)" }}
                />
                <span className="font-mono text-[10px] tracking-[0.14em] text-white/90 uppercase">
                  {labels.panel}
                </span>
                <span className="ml-auto font-mono text-[9px] text-white/40 tabular-nums">
                  {fxOn ? `${size}% · ${angle}°` : labels.fxOff}
                </span>
              </div>

              <div className="max-h-[min(58vh,440px)] space-y-3.5 overflow-y-auto px-3 py-3">
                {/* Master FX toggle */}
                <div>
                  <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[9px] tracking-wider text-white/45 uppercase">
                    <Power className="h-3 w-3" />
                    {labels.fx}
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={fxOn}
                    aria-label={labels.toggleFx}
                    title={labels.toggleFx}
                    onClick={() => setFxOn((v) => !v)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 border px-3 py-2.5 text-left transition-colors",
                      fxOn
                        ? "border-accent/50 bg-accent/15 text-white"
                        : "border-white/15 bg-black/30 text-white/55 hover:border-white/25 hover:text-white/80"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={cn(
                          "flex h-7 w-7 items-center justify-center border",
                          fxOn
                            ? "border-accent/40 bg-accent text-white"
                            : "border-white/15 bg-white/5 text-white/40"
                        )}
                      >
                        <Power className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-xs font-medium">
                        {fxOn ? labels.fxOn : labels.fxOff}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "relative h-5 w-9 shrink-0 rounded-full transition-colors",
                        fxOn ? "bg-accent" : "bg-white/15"
                      )}
                      aria-hidden
                    >
                      <span
                        className={cn(
                          "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
                          fxOn ? "left-4" : "left-0.5"
                        )}
                      />
                    </span>
                  </button>
                </div>

                {/* Color */}
                <div>
                  <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[9px] tracking-wider text-white/45 uppercase">
                    <Palette className="h-3 w-3" />
                    {labels.color}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(Object.keys(COLORS) as WaveColorKey[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        title={COLORS[key].label}
                        aria-label={COLORS[key].label}
                        onClick={() => setColor(key)}
                        className={cn(
                          "h-6 w-6 border transition-transform hover:scale-110",
                          color === key
                            ? "border-white ring-1 ring-white/60"
                            : "border-white/25"
                        )}
                        style={{ backgroundColor: COLORS[key].solid }}
                      />
                    ))}
                  </div>
                </div>

                {/* Speed */}
                <div>
                  <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[9px] tracking-wider text-white/45 uppercase">
                    <Gauge className="h-3 w-3" />
                    {labels.speed}
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {(Object.keys(SPEEDS) as WaveSpeed[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSpeed(key)}
                        className={cn(
                          "px-1.5 py-1.5 font-mono text-[10px] transition-colors",
                          speed === key
                            ? "bg-accent text-white"
                            : "border border-white/15 text-white/55 hover:border-white/30 hover:text-white"
                        )}
                      >
                        {SPEEDS[key].label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style */}
                <div>
                  <div className="mb-1.5 font-mono text-[9px] tracking-wider text-white/45 uppercase">
                    {labels.style}
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {STYLES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setStyle(s.id)}
                        className={cn(
                          "px-1 py-1.5 text-[10px] font-medium transition-colors",
                          style === s.id
                            ? "border border-accent/60 bg-accent/15 text-accent"
                            : "border border-white/12 text-white/55 hover:border-white/25 hover:text-white"
                        )}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider text-white/45 uppercase">
                      <Maximize2 className="h-3 w-3" />
                      {labels.size}
                    </span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={40}
                        max={220}
                        step={5}
                        value={size}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (Number.isFinite(v)) setSize(clampSize(v));
                        }}
                        className="banner-wave-angle-input w-14 border border-white/15 bg-black/40 px-1.5 py-0.5 text-right font-mono text-[11px] text-white tabular-nums outline-none focus:border-accent/50"
                        aria-label={labels.size}
                      />
                      <span className="font-mono text-[10px] text-white/40">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={220}
                    step={5}
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="banner-wave-range w-full"
                    style={rangeStyle}
                    aria-label={labels.size}
                  />
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {SIZE_PRESETS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        className={cn(
                          "min-w-[2.4rem] px-1.5 py-1 font-mono text-[9px] tabular-nums transition-colors",
                          size === s
                            ? "border border-accent/50 bg-accent/15 text-accent"
                            : "border border-white/10 text-white/45 hover:border-white/25 hover:text-white"
                        )}
                      >
                        {s}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Angle */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider text-white/45 uppercase">
                      <RotateCw className="h-3 w-3" />
                      {labels.angle}
                    </span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={-90}
                        max={90}
                        step={1}
                        value={angle}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (Number.isFinite(v)) setAngle(clampAngle(v));
                        }}
                        className="banner-wave-angle-input w-14 border border-white/15 bg-black/40 px-1.5 py-0.5 text-right font-mono text-[11px] text-white tabular-nums outline-none focus:border-accent/50"
                        aria-label={labels.angle}
                      />
                      <span className="font-mono text-[10px] text-white/40">°</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={-90}
                    max={90}
                    step={1}
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="banner-wave-range w-full"
                    style={rangeStyle}
                    aria-label={labels.angle}
                  />
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {ANGLE_PRESETS.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => setAngle(a)}
                        className={cn(
                          "min-w-[2.25rem] px-1.5 py-1 font-mono text-[9px] tabular-nums transition-colors",
                          angle === a
                            ? "border border-accent/50 bg-accent/15 text-accent"
                            : "border border-white/10 text-white/45 hover:border-white/25 hover:text-white"
                        )}
                      >
                        {a}°
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="border border-white/10 bg-black/55 px-2 py-1.5">
                  <svg
                    className="mx-auto origin-center"
                    style={{
                      height: `${Math.round(28 * Math.min(1.4, sizeFactor))}px`,
                      width: "100%",
                      transform: `rotate(${angle * 0.12}deg)`,
                    }}
                    viewBox={`0 0 ${PERIOD} ${VB_H}`}
                    preserveAspectRatio="none"
                  >
                    <path
                      d={previewD}
                      fill="none"
                      stroke={palette.solid}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow-only trigger (always visible) */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "relative flex h-11 w-9 shrink-0 items-center justify-center border border-white/25 bg-[#060b14]/92 text-white/80 shadow-[0_10px_28px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all hover:border-accent/50 hover:text-white",
              open && "border-accent/40 bg-accent/15 text-accent",
              !fxOn && !open && "opacity-70"
            )}
            style={{ borderRight: "none" }}
            title={open ? labels.close : labels.open}
            aria-label={open ? labels.close : labels.open}
            aria-expanded={open}
          >
            {open ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft
                className="h-4 w-4"
                style={{ color: fxOn ? palette.solid : "rgba(255,255,255,0.4)" }}
              />
            )}
            {/* Status dot: green when FX on, muted when off */}
            <span
              className={cn(
                "absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full",
                fxOn ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" : "bg-white/25"
              )}
              aria-hidden
            />
          </button>
        </div>
      </div>
    </>
  );
}
