"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Circle,
  Focus,
  Pause,
  Play,
  RotateCcw,
  Square,
  Triangle,
  Type,
} from "lucide-react";
import type { Locale } from "@/types";
import {
  BRAND_TRAITS,
  CAPABILITY_MEDIA,
  probeFirst,
  type BrandTrait,
  type CapabilityLayerId,
} from "@/data/capability-stack";
import { cn } from "@/lib/utils";

type LayerInput = { id: string; label: string; desc: string };

type Props = {
  locale: Locale;
  layers: LayerInput[];
};

/** Resolved local media URLs for a layer */
type ResolvedMedia = {
  video?: string;
  image?: string;
  overlay?: string;
};

const DEPTH_STEP = 56;
const LAYER_ORDER: CapabilityLayerId[] = [
  "brand",
  "material",
  "production",
  "digital",
  "growth",
];

export function CapabilityStack3D({ locale, layers }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [brandTrait, setBrandTrait] = useState(0);
  const [shapeFocus, setShapeFocus] = useState<"cube" | "tri" | "circle" | "type" | null>(
    null
  );
  const [mediaReady, setMediaReady] = useState<Record<string, ResolvedMedia>>({});

  const rotX = useMotionValue(12);
  const rotY = useMotionValue(-18);
  const springX = useSpring(rotX, { stiffness: 90, damping: 18 });
  const springY = useSpring(rotY, { stiffness: 90, damping: 18 });
  const floorRotX = useTransform(springX, (v) => v + 68);

  const dragOrigin = useRef({ x: 0, y: 0, rx: 0, ry: 0 });

  const resolvedLayers = useMemo(
    () =>
      layers.map((l, i) => ({
        ...l,
        id: (LAYER_ORDER[i] ?? l.id) as CapabilityLayerId,
        index: i,
      })),
    [layers]
  );

  const activeLayer = resolvedLayers[active] ?? resolvedLayers[0];
  const activeId = activeLayer?.id as CapabilityLayerId;

  // Probe local media once (supports 1.png, poster.jpg, loop.mp4, ...)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const next: Record<string, ResolvedMedia> = {};
      for (const id of LAYER_ORDER) {
        const m = CAPABILITY_MEDIA[id];
        next[id] = {
          video: await probeFirst(m.videos),
          image: await probeFirst(m.images),
          overlay: await probeFirst(m.overlays),
        };
      }
      if (!cancelled) setMediaReady(next);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto rotate
  useEffect(() => {
    if (!autoRotate || dragging) return;
    const t = window.setInterval(() => {
      rotY.set(rotY.get() + 0.35);
    }, 40);
    return () => window.clearInterval(t);
  }, [autoRotate, dragging, rotY]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => (a + 1) % resolvedLayers.length);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => (a - 1 + resolvedLayers.length) % resolvedLayers.length);
      }
      if (e.key === " ") {
        e.preventDefault();
        setAutoRotate((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [resolvedLayers.length]);

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("[data-ui]")) return;
    setDragging(true);
    setAutoRotate(false);
    dragOrigin.current = {
      x: e.clientX,
      y: e.clientY,
      rx: rotX.get(),
      ry: rotY.get(),
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - dragOrigin.current.x;
    const dy = e.clientY - dragOrigin.current.y;
    rotY.set(dragOrigin.current.ry + dx * 0.25);
    rotX.set(Math.max(-28, Math.min(32, dragOrigin.current.rx - dy * 0.2)));
  };

  const onPointerUp = () => setDragging(false);

  const resetView = () => {
    rotX.set(12);
    rotY.set(-18);
    setActive(0);
    setShapeFocus(null);
    setBrandTrait(0);
  };

  const trait = BRAND_TRAITS[brandTrait];

  return (
    <div className="relative w-full border border-border bg-[#050a12] text-white">
      {/* Header HUD */}
      <div className="absolute left-3 top-3 z-30 flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-widest text-white/50 uppercase">
        <span className="h-1.5 w-1.5 bg-accent signal-dot" />
        CAPABILITY STACK | LIVE | 3D
      </div>
      <div className="absolute right-3 top-3 z-30 flex items-center gap-1" data-ui>
        <HudBtn
          label={autoRotate ? "Pause orbit" : "Play orbit"}
          onClick={() => setAutoRotate((v) => !v)}
        >
          {autoRotate ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </HudBtn>
        <HudBtn label="Reset" onClick={resetView}>
          <RotateCcw className="h-3.5 w-3.5" />
        </HudBtn>
        <span className="ml-1 hidden font-mono text-[10px] text-white/35 sm:inline">
          PTC / ENGINE v2
        </span>
      </div>

      {/* 3D stage */}
      <div
        ref={stageRef}
        className={cn(
          "relative aspect-[4/3] w-full touch-none select-none overflow-hidden sm:aspect-[16/11]",
          dragging ? "cursor-grabbing" : "cursor-grab"
        )}
        style={{ perspective: 1100 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="pointer-events-none absolute inset-0 bg-tech-grid-fine opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,77,0,0.08),transparent_60%)]" />

        {/* Floor grid in 3D */}
        <motion.div
          className="absolute left-1/2 top-[58%] h-[220px] w-[140%] origin-center"
          style={{
            rotateX: floorRotX,
            rotateY: springY,
            x: "-50%",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="h-full w-full border border-white/5 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />
        </motion.div>

        {/* Stack of layers */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            rotateX: springX,
            rotateY: springY,
            transformStyle: "preserve-3d",
          }}
        >
          {resolvedLayers.map((layer, i) => {
            const isActive = active === i;
            const z = (i - 2) * DEPTH_STEP;
            const ready = mediaReady[layer.id] ?? {};

            return (
              <motion.button
                key={layer.id}
                type="button"
                data-ui
                onClick={() => setActive(i)}
                className={cn(
                  "absolute w-[78%] max-w-lg overflow-hidden border text-left outline-none",
                  "focus-visible:ring-2 focus-visible:ring-accent"
                )}
                style={{
                  transform: `translateZ(${z}px)`,
                  transformStyle: "preserve-3d",
                  zIndex: isActive ? 40 : 10 + i,
                  borderColor: isActive ? "var(--accent)" : "rgba(255,255,255,0.12)",
                }}
                animate={{
                  scale: isActive ? 1.04 : 0.94,
                  opacity: isActive ? 1 : 0.55,
                  y: isActive ? -6 : i * 2,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
              >
                {/* Media / procedural bg */}
                <LayerMediaBackground
                  layerId={layer.id}
                  ready={ready}
                  active={isActive}
                />

                <div className="relative z-10 flex items-start justify-between gap-3 p-4 sm:p-5">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.2em] text-white/40">
                      L{String(i + 1).padStart(2, "0")} | {layer.id.toUpperCase()}
                    </div>
                    <div className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
                      {layer.label}
                    </div>
                    <div className="mt-1 max-w-[16rem] text-xs text-white/55 sm:text-sm">
                      {layer.desc}
                    </div>
                  </div>
                  <MiniGlyph id={layer.id} active={isActive} />
                </div>

                {isActive && (
                  <div className="absolute bottom-2 right-2 z-10 font-mono text-[9px] tracking-wider text-accent">
                    FOCUS
                  </div>
                )}
              </motion.button>
            );
          })}

          {/* Brand 3D objects when brand active */}
          {activeId === "brand" && (
            <BrandSpace3D
              locale={locale}
              trait={trait}
              traitIndex={brandTrait}
              shapeFocus={shapeFocus}
              onTrait={setBrandTrait}
              onShape={setShapeFocus}
            />
          )}
        </motion.div>

        {/* Hint */}
        <div className="pointer-events-none absolute bottom-3 left-3 z-20 font-mono text-[9px] tracking-wide text-white/35">
          DRAG orbit | CLICK layer | ARROWS switch | SPACE pause
        </div>
      </div>

      {/* Layer tabs */}
      <div
        className="flex gap-px overflow-x-auto border-t border-white/10 bg-black/40 no-scrollbar"
        data-ui
      >
        {resolvedLayers.map((l, i) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "min-w-[4.5rem] flex-1 px-2 py-2.5 text-left transition-colors sm:px-3",
              active === i ? "bg-accent/15 text-accent" : "text-white/45 hover:bg-white/5 hover:text-white"
            )}
          >
            <div className="font-mono text-[9px] tracking-wider">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="truncate text-xs font-medium">{l.label}</div>
          </button>
        ))}
      </div>

      {/* Brand detail panel */}
      {activeId === "brand" && (
        <BrandDetailPanel
          locale={locale}
          trait={trait}
          traitIndex={brandTrait}
          onTrait={setBrandTrait}
          shapeFocus={shapeFocus}
          onShape={setShapeFocus}
          mediaReady={mediaReady.brand}
        />
      )}

      {/* Other layer info strip */}
      {activeId !== "brand" && activeLayer && (
        <div className="border-t border-white/10 bg-black/30 px-4 py-3" data-ui>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] tracking-[0.16em] text-accent uppercase">
                Active | {activeLayer.label}
              </p>
              <p className="mt-1 max-w-xl text-sm text-white/60">{activeLayer.desc}</p>
            </div>
            <MediaPathHint layerId={activeId} ready={mediaReady[activeId]} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Brand 3D floating objects ─── */

function BrandSpace3D({
  locale,
  trait,
  traitIndex,
  shapeFocus,
  onTrait,
  onShape,
}: {
  locale: Locale;
  trait: BrandTrait;
  traitIndex: number;
  shapeFocus: "cube" | "tri" | "circle" | "type" | null;
  onTrait: (i: number) => void;
  onShape: (s: "cube" | "tri" | "circle" | "type" | null) => void;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Floating PTC mark */}
      <motion.div
        className="pointer-events-auto absolute left-[18%] top-[22%]"
        style={{ transform: "translateZ(120px)" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <button
          type="button"
          data-ui
          onClick={() => {
            onShape("cube");
            onTrait(0);
          }}
          className={cn(
            "flex h-16 w-16 items-center justify-center border-2 bg-accent/90 text-sm font-bold tracking-tight text-white shadow-[0_20px_40px_rgba(0,0,0,0.45)] transition-transform hover:scale-105",
            shapeFocus === "cube" && "ring-2 ring-white"
          )}
          style={{ transform: "rotateY(-18deg) rotateX(8deg)" }}
          aria-label="Brand mark"
        >
          PTC
        </button>
      </motion.div>

      {/* Type plate */}
      <motion.div
        className="pointer-events-auto absolute right-[12%] top-[28%]"
        style={{ transform: "translateZ(90px) rotateY(22deg)" }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <button
          type="button"
          data-ui
          onClick={() => {
            onShape("type");
            onTrait(1);
          }}
          className={cn(
            "border border-white/20 bg-black/55 px-3 py-2 text-left backdrop-blur-sm transition-colors hover:border-accent",
            shapeFocus === "type" && "border-accent"
          )}
        >
          <div className="text-2xl font-semibold tracking-tight leading-none">Aa</div>
          <div className="mt-1 font-mono text-[9px] tracking-widest text-white/45">
            TYPE SCALE
          </div>
        </button>
      </motion.div>

      {/* Triangle form */}
      <motion.button
        type="button"
        data-ui
        className="pointer-events-auto absolute bottom-[30%] left-[28%]"
        style={{ transform: "translateZ(70px)" }}
        animate={{ rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        onClick={() => {
          onShape("tri");
          onTrait(2);
        }}
      >
        <Triangle
          className={cn(
            "h-12 w-12 text-white/70 transition-colors",
            shapeFocus === "tri" && "text-accent"
          )}
          strokeWidth={1.25}
        />
      </motion.button>

      {/* Circle / color */}
      <motion.button
        type="button"
        data-ui
        className="pointer-events-auto absolute bottom-[26%] right-[22%]"
        style={{ transform: "translateZ(100px)" }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3.5, repeat: Infinity }}
        onClick={() => {
          onShape("circle");
          onTrait(3);
        }}
      >
        <span
          className={cn(
            "block h-10 w-10 rounded-full border-2 border-white/30 bg-accent/80",
            shapeFocus === "circle" && "ring-2 ring-white ring-offset-2 ring-offset-black"
          )}
        />
      </motion.button>

      {/* Floating trait chip */}
      <div
        className="pointer-events-none absolute left-1/2 top-[12%] -translate-x-1/2 border border-accent/40 bg-black/60 px-3 py-1.5 font-mono text-[10px] tracking-wider text-accent backdrop-blur-sm"
        style={{ transform: "translateZ(140px) translateX(-50%)" }}
      >
        BRAND | {trait.code} | {trait.title[locale]}
      </div>
    </div>
  );
}

/* ─── Brand detail ─── */

function BrandDetailPanel({
  locale,
  trait,
  traitIndex,
  onTrait,
  shapeFocus,
  onShape,
  mediaReady,
}: {
  locale: Locale;
  trait: BrandTrait;
  traitIndex: number;
  onTrait: (i: number) => void;
  shapeFocus: string | null;
  onShape: (s: "cube" | "tri" | "circle" | "type" | null) => void;
  mediaReady?: ResolvedMedia;
}) {
  const candidates = CAPABILITY_MEDIA.brand;
  return (
    <div className="border-t border-white/10 bg-black/40 px-4 py-4" data-ui>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
          Brand DNA | Interactive
        </p>
        <MediaPathHint layerId="brand" ready={mediaReady} />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {BRAND_TRAITS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              onTrait(i);
              if (t.id === "identity") onShape("cube");
              if (t.id === "typography") onShape("type");
              if (t.id === "form") onShape("tri");
              if (t.id === "color") onShape("circle");
            }}
            className={cn(
              "inline-flex items-center gap-1.5 border px-2.5 py-1.5 text-xs transition-colors",
              traitIndex === i
                ? "border-accent bg-accent/15 text-accent"
                : "border-white/15 text-white/55 hover:border-white/30 hover:text-white"
            )}
          >
            <span className="font-mono text-[9px]">{t.code}</span>
            {t.title[locale]}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h3 className="text-base font-semibold tracking-tight">{trait.title[locale]}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-white/60">{trait.desc[locale]}</p>

          {/* Interactive type / form preview */}
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => {
                onShape("type");
                onTrait(1);
              }}
              className={cn(
                "border border-white/10 bg-white/5 p-3 text-left transition-colors hover:border-accent/50",
                shapeFocus === "type" && "border-accent"
              )}
            >
              <Type className="mb-2 h-4 w-4 text-accent" />
              <div className="text-2xl font-semibold leading-none tracking-tight">Impact</div>
              <div className="mt-1 font-mono text-[9px] text-white/40">DISPLAY / 700</div>
            </button>
            <button
              type="button"
              onClick={() => {
                onShape("cube");
                onTrait(0);
              }}
              className={cn(
                "border border-white/10 bg-white/5 p-3 text-left transition-colors hover:border-accent/50",
                shapeFocus === "cube" && "border-accent"
              )}
            >
              <Square className="mb-2 h-4 w-4 text-accent" />
              <div className="flex gap-1">
                <span className="h-6 w-6 bg-accent" />
                <span className="h-6 w-6 border border-white/30" />
                <span className="h-6 w-6 bg-white/20" />
              </div>
              <div className="mt-2 font-mono text-[9px] text-white/40">MARK | MODULE</div>
            </button>
            <button
              type="button"
              onClick={() => {
                onShape("circle");
                onTrait(3);
              }}
              className={cn(
                "border border-white/10 bg-white/5 p-3 text-left transition-colors hover:border-accent/50",
                shapeFocus === "circle" && "border-accent"
              )}
            >
              <Circle className="mb-2 h-4 w-4 text-accent" />
              <div className="flex gap-1">
                <span className="h-5 w-5 rounded-full bg-[#0e0f11] ring-1 ring-white/20" />
                <span className="h-5 w-5 rounded-full bg-[#f4f2ee] ring-1 ring-white/20" />
                <span className="h-5 w-5 rounded-full bg-accent" />
              </div>
              <div className="mt-2 font-mono text-[9px] text-white/40">TOKEN | SIGNAL</div>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="border border-white/10 bg-white/[0.03] p-3">
            <p className="font-mono text-[9px] tracking-wider text-white/40 uppercase">
              Local media paths
            </p>
            <ul className="mt-2 space-y-1.5 font-mono text-[10px] text-white/50">
              <PathRow
                path={mediaReady?.video ?? candidates.videos?.[0]}
                ok={Boolean(mediaReady?.video)}
                label="video"
              />
              <PathRow
                path={mediaReady?.image ?? candidates.images?.[0]}
                ok={Boolean(mediaReady?.image)}
                label="image"
              />
              <PathRow
                path={mediaReady?.overlay ?? candidates.overlays?.[0]}
                ok={Boolean(mediaReady?.overlay)}
                label="overlay"
              />
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-white/35">
              {locale === "de"
                ? "Dateien als 1.png / poster.jpg / loop.mp4 in public/media/capability/{layer}/ ablegen."
                : "Dat file 1.png / poster.jpg / loop.mp4 vao public/media/capability/{layer}/."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PathRow({
  path,
  ok,
  label,
}: {
  path?: string;
  ok?: boolean;
  label: string;
}) {
  if (!path) return null;
  const statusNote = ok ? "" : " | missing -> procedural";
  return (
    <li className="flex items-start gap-2">
      <span
        className={cn(
          "mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full",
          ok ? "bg-success" : "bg-white/25"
        )}
      />
      <span>
        <span className="text-white/30">{label}: </span>
        <span className={ok ? "text-white/70" : "text-white/35"}>
          {path}
          {statusNote}
        </span>
      </span>
    </li>
  );
}

function MediaPathHint({
  layerId,
  ready,
}: {
  layerId: CapabilityLayerId;
  ready?: ResolvedMedia;
}) {
  const m = CAPABILITY_MEDIA[layerId];
  const has = Boolean(ready?.video || ready?.image);
  const hint = ready?.image ?? ready?.video ?? m.images?.[0] ?? m.videos?.[0];
  return (
    <div className="font-mono text-[9px] tracking-wide text-white/35">
      {has ? (
        <span className="text-success/80" title={hint}>
          MEDIA | LOCAL
        </span>
      ) : (
        <span title={hint}>MEDIA | PROCEDURAL</span>
      )}
    </div>
  );
}

/* ─── Layer media bg ─── */

function LayerMediaBackground({
  layerId,
  ready,
  active,
}: {
  layerId: CapabilityLayerId;
  ready?: ResolvedMedia;
  active: boolean;
}) {
  if (ready?.video) {
    return (
      <>
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          src={ready.video}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </>
    );
  }
  if (ready?.image) {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ready.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />
        {ready.overlay && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={ready.overlay}
            alt=""
            className="pointer-events-none absolute right-4 top-4 h-10 w-10 object-contain opacity-80"
          />
        )}
      </>
    );
  }

  // Procedural gradients per layer
  const gradients: Record<CapabilityLayerId, string> = {
    brand: "linear-gradient(135deg,#1a1c20 0%,#2a1830 45%,#1a1c20 100%)",
    material: "linear-gradient(135deg,#2a241c 0%,#1a1c20 50%,#1c1814 100%)",
    production: "linear-gradient(135deg,#1c2228 0%,#121418 100%)",
    digital: "linear-gradient(135deg,#141820 0%,#1a1e28 100%)",
    growth: "linear-gradient(135deg,#1a1410 0%,#221810 100%)",
  };

  return (
    <div
      className="absolute inset-0"
      style={{
        background: gradients[layerId],
        opacity: active ? 1 : 0.9,
      }}
    >
      {layerId === "brand" && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-6 top-6 h-16 w-16 border border-white/20" />
          <div className="absolute bottom-8 right-10 h-10 w-10 bg-accent/40" />
          <div className="absolute right-1/3 top-1/3 font-mono text-[10px] tracking-[0.3em] text-white/20">
            ID | TYPE | FORM
          </div>
        </div>
      )}
      {layerId === "material" && (
        <div className="absolute inset-x-0 bottom-0 flex h-1/2 flex-col opacity-40">
          <div className="texture-wood flex-1" />
          <div className="texture-acrylic flex-1" />
          <div className="texture-metal flex-1" />
        </div>
      )}
      {layerId === "production" && (
        <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 400 200">
          <path
            d="M20 160 C80 40 140 180 200 90 S320 40 380 120"
            fill="none"
            stroke="#FF4D00"
            strokeWidth="1.5"
            className={active ? "cut-path" : undefined}
          />
        </svg>
      )}
      {layerId === "digital" && (
        <div className="absolute inset-4 grid grid-cols-6 grid-rows-4 gap-1 opacity-30">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className={i % 3 === 0 ? "bg-accent/40" : "bg-white/10"} />
          ))}
        </div>
      )}
      {layerId === "growth" && (
        <div className="absolute inset-x-6 bottom-6 flex h-16 items-end gap-1 opacity-50">
          {[30, 45, 40, 60, 55, 75, 70, 90].map((h, i) => (
            <div key={i} className="flex-1 bg-accent/60" style={{ height: `${h}%` }} />
          ))}
        </div>
      )}
    </div>
  );
}

function MiniGlyph({ id, active }: { id: string; active: boolean }) {
  if (id === "brand") {
    return (
      <div className="grid h-12 w-12 grid-cols-2 gap-0.5 opacity-90">
        <div className={cn("bg-accent", !active && "opacity-60")} />
        <div className="border border-white/25" />
        <div className="border border-white/25" />
        <div className="bg-white/20" />
      </div>
    );
  }
  if (id === "material") {
    return (
      <div className="flex h-12 w-12 flex-col gap-0.5 overflow-hidden">
        <div className="texture-wood h-3.5 w-full" />
        <div className="texture-acrylic h-3.5 w-full" />
        <div className="texture-metal h-3.5 w-full" />
      </div>
    );
  }
  return (
    <Focus
      className={cn("h-5 w-5", active ? "text-accent" : "text-white/30")}
      strokeWidth={1.5}
    />
  );
}

function HudBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-8 w-8 items-center justify-center border border-white/15 bg-black/40 text-white/70 transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </button>
  );
}
