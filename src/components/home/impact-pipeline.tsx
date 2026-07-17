"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Antenna,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Factory,
  LayoutTemplate,
  Pause,
  Play,
  Rocket,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import type { Locale } from "@/types";
import { processMeta } from "@/data/process";
import { cn, localePath } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Icon3D } from "@/components/home/icon-3d";

const ease = [0.22, 1, 0.36, 1] as const;
const STEP_MS = 5200;

const ICONS: Record<string, LucideIcon> = {
  Antenna,
  LayoutTemplate,
  Factory,
  Rocket,
};

/**
 * Quy trình làm việc — timeline chuyên nghiệp
 * · Rail 4 bước + symbol 3D
 * · Ảnh phase + thông tin đầy đủ (duration, crew, outputs, materials)
 */
export function ImpactPipeline({
  dict,
  locale = "vi",
}: {
  dict: Dictionary;
  locale?: Locale;
}) {
  const steps = dict.home.processSteps;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const count = Math.min(steps.length, processMeta.length);

  const step = steps[active]!;
  const meta = processMeta[active]!;
  const color = meta.color;
  const Icon = ICONS[meta.icon] ?? Antenna;

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % count);
      setTick((t) => t + 1);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [paused, reduce, count]);

  const select = useCallback((i: number) => {
    setActive(i);
    setTick((t) => t + 1);
    setPaused(true);
  }, []);

  const go = useCallback(
    (dir: -1 | 1) => {
      setActive((i) => (i + dir + count) % count);
      setTick((t) => t + 1);
      setPaused(true);
    },
    [count]
  );

  const outputs = meta.outputs[locale] ?? meta.outputs.vi;
  const materials = meta.materials[locale] ?? meta.materials.vi;
  const note = meta.note[locale] ?? meta.note.vi;
  const duration = meta.duration[locale] ?? meta.duration.vi;

  return (
    <Section
      className="home-stage-fill flex h-full min-h-0 flex-col border-0 py-0"
      contained={false}
    >
      <div
        className="proc-flow relative flex h-full min-h-0 w-full flex-col overflow-hidden"
        style={{ ["--pc"]: color } as CSSProperties}
      >
        <Container className="relative z-10 flex h-full min-h-0 w-full max-w-none flex-col px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          {/* Header */}
          <header className="mb-3 flex shrink-0 flex-wrap items-end justify-between gap-3 sm:mb-4">
            <div className="min-w-0 max-w-2xl">
              <p className="text-[11px] font-medium tracking-[0.2em] text-violet-300/85 uppercase">
                04 · {dict.common.process}
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {dict.home.processTitle}
              </h2>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/45 sm:text-[15px]">
                {dict.home.processSubtitle}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden border border-white/10 bg-white/[0.04] px-2.5 py-1.5 sm:block">
                <p className="font-mono text-[8px] tracking-[0.14em] text-white/35 uppercase">
                  Stage
                </p>
                <p className="font-mono text-sm font-semibold tabular-nums text-white/90">
                  <span style={{ color }}>
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/25">
                    {" "}
                    / {String(count).padStart(2, "0")}
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPaused((p) => !p);
                  setTick((t) => t + 1);
                }}
                className={cn(
                  "flex h-10 w-10 items-center justify-center border transition-colors",
                  paused
                    ? "border-accent/50 bg-accent/15 text-accent"
                    : "border-white/15 text-white/50 hover:border-violet-400/40 hover:text-violet-200"
                )}
                aria-label={paused ? "Play" : "Pause"}
              >
                {paused ? (
                  <Play className="h-4 w-4 fill-current" />
                ) : (
                  <Pause className="h-4 w-4" />
                )}
              </button>
              <Link
                href={localePath(locale, "/contact")}
                className="group hidden items-center gap-1.5 border border-white/15 px-3 py-2 text-sm text-white/70 transition-colors hover:border-accent/40 hover:text-white sm:inline-flex"
              >
                {locale === "de" ? "Brief senden" : "Gửi brief"}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </header>

          {/* Body */}
          <div
            className="grid min-h-0 flex-1 gap-3 lg:grid-cols-12 lg:gap-5"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Timeline rail */}
            <nav
              className="proc-flow__rail no-scrollbar relative flex shrink-0 gap-2 overflow-x-auto pb-0.5 lg:col-span-3 lg:flex-col lg:gap-0 lg:overflow-y-auto lg:overflow-x-hidden"
              aria-label={dict.common.process}
              role="tablist"
            >
              {/* Vertical connector (desktop) */}
              <span
                className="pointer-events-none absolute top-6 bottom-6 left-[1.65rem] hidden w-px bg-white/10 lg:block"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute top-6 left-[1.65rem] hidden w-px bg-gradient-to-b from-transparent via-current to-transparent opacity-60 lg:block"
                style={{
                  color,
                  height: `${((active + 0.5) / count) * 100}%`,
                  maxHeight: "calc(100% - 3rem)",
                }}
                aria-hidden
              />

              {steps.slice(0, count).map((s, i) => {
                const m = processMeta[i]!;
                const on = i === active;
                const done = i < active;
                const StepIcon = ICONS[m.icon] ?? Antenna;
                return (
                  <button
                    key={s.code}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => select(i)}
                    className={cn(
                      "proc-flow__step group relative flex min-w-[10.5rem] items-center gap-3 border px-2.5 py-2.5 text-left transition-all sm:min-w-[11.5rem] lg:min-w-0 lg:w-full lg:border-transparent lg:bg-transparent lg:px-0 lg:py-3",
                      on
                        ? "border-white/15 bg-white/[0.07] text-white lg:bg-white/[0.05]"
                        : "border-white/[0.06] bg-black/20 text-white/50 hover:border-white/12 hover:text-white/80 lg:hover:bg-white/[0.03]"
                    )}
                  >
                    <span className="relative z-[1] shrink-0">
                      <span
                        className={cn(
                          "flex h-11 w-11 items-center justify-center border transition-all sm:h-12 sm:w-12",
                          on
                            ? "border-transparent text-black shadow-lg"
                            : done
                              ? "border-white/15 bg-white/[0.06]"
                              : "border-white/10 bg-black/40"
                        )}
                        style={
                          on
                            ? {
                                background: m.color,
                                boxShadow: `0 8px 24px ${m.color}44`,
                              }
                            : done
                              ? { color: m.color }
                              : { color: `${m.color}99` }
                        }
                      >
                        <StepIcon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className="block font-mono text-[9px] tracking-[0.14em] uppercase"
                        style={{ color: on ? m.color : "rgba(255,255,255,0.35)" }}
                      >
                        {s.code}
                      </span>
                      <span className="mt-0.5 block truncate text-sm font-semibold">
                        {s.title}
                      </span>
                      <span className="mt-0.5 hidden truncate text-[11px] text-white/35 lg:block">
                        {m.duration[locale] ?? m.duration.vi}
                      </span>
                    </span>
                    {on && (
                      <span
                        className="hidden h-8 w-0.5 shrink-0 lg:block"
                        style={{
                          background: m.color,
                          boxShadow: `0 0 10px ${m.color}`,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Active stage panel */}
            <div className="min-h-0 lg:col-span-9">
              <AnimatePresence mode="wait">
                <motion.article
                  key={meta.id}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.32, ease }}
                  className="proc-flow__panel flex h-full min-h-0 flex-col overflow-hidden border border-white/[0.1] bg-transparent"
                  style={
                    {
                      boxShadow: `0 0 0 1px ${color}22, 0 24px 60px rgba(0,0,0,0.35)`,
                    } as CSSProperties
                  }
                >
                  <div className="grid min-h-0 flex-1 lg:grid-cols-12">
                    {/* Media */}
                    <div className="relative min-h-[180px] border-b border-white/10 sm:min-h-[220px] lg:col-span-5 lg:min-h-0 lg:border-r lg:border-b-0">
                      <StepImage
                        candidates={meta.images}
                        alt={step.title}
                        color={color}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/20 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/40" />

                      {/* Symbol overlay */}
                      <div className="absolute bottom-3 left-3 z-[1] sm:bottom-4 sm:left-4">
                        <Icon3D
                          icon={Icon}
                          color={color}
                          active
                          size="md"
                          className="drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]"
                        />
                      </div>
                      <span
                        className="absolute top-3 right-3 z-[1] px-2 py-1 font-mono text-[10px] font-semibold tracking-wider text-black uppercase"
                        style={{ background: color }}
                      >
                        {step.code}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex min-h-0 flex-col p-4 sm:p-5 lg:col-span-7 lg:p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-black"
                          style={{ background: color }}
                        >
                          <Clock3 className="h-3.5 w-3.5" />
                          {duration}
                        </span>
                        <span className="inline-flex items-center gap-1.5 border border-white/12 px-2.5 py-1 text-xs text-white/65">
                          <Users className="h-3.5 w-3.5" style={{ color }} />
                          {meta.crew}
                        </span>
                      </div>

                      <h3 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-[1.75rem]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/58 sm:text-[15px] sm:leading-relaxed">
                        {step.desc}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-white/40 sm:text-[13px]">
                        {note}
                      </p>

                      <div className="mt-4 grid min-h-0 flex-1 gap-3 sm:grid-cols-2">
                        <div className="border border-white/[0.08] bg-white/[0.03] p-3">
                          <p className="font-mono text-[9px] tracking-[0.14em] text-white/40 uppercase">
                            {locale === "de" ? "Deliverables" : "Đầu ra"}
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {outputs.map((o) => (
                              <li
                                key={o}
                                className="flex items-start gap-2 text-sm text-white/75"
                              >
                                <Check
                                  className="mt-0.5 h-3.5 w-3.5 shrink-0"
                                  style={{ color }}
                                />
                                {o}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="border border-white/[0.08] bg-white/[0.03] p-3">
                          <p className="font-mono text-[9px] tracking-[0.14em] text-white/40 uppercase">
                            {locale === "de" ? "Material / Tools" : "Vật liệu / Tool"}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {materials.map((m) => (
                              <span
                                key={m}
                                className="border border-white/10 px-2 py-1 text-[11px] text-white/65"
                                style={{ borderColor: `${color}33` }}
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                          <p className="mt-3 font-mono text-[10px] text-white/30">
                            media/process/p{active + 1}.png
                          </p>
                        </div>
                      </div>

                      {/* Footer controls */}
                      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
                        <button
                          type="button"
                          onClick={() => go(-1)}
                          className="flex h-10 w-10 items-center justify-center border border-white/12 text-white/70 hover:border-white/25 hover:text-white"
                          aria-label="Previous step"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => go(1)}
                          className="flex h-10 w-10 items-center justify-center border border-white/12 text-white/70 hover:border-white/25 hover:text-white"
                          aria-label="Next step"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>

                        {/* Auto progress */}
                        <div className="mx-1 hidden h-1 min-w-[4rem] flex-1 overflow-hidden bg-white/10 sm:block">
                          {!reduce && !paused ? (
                            <motion.div
                              key={tick}
                              className="h-full"
                              style={{ background: color }}
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{
                                duration: STEP_MS / 1000,
                                ease: "linear",
                              }}
                            />
                          ) : (
                            <div
                              className="h-full w-1/3 opacity-50"
                              style={{ background: color }}
                            />
                          )}
                        </div>

                        <Link
                          href={localePath(locale, "/contact")}
                          className="ml-auto inline-flex min-h-10 items-center gap-2 px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
                          style={{
                            background: color,
                            boxShadow: `0 8px 24px ${color}44`,
                          }}
                        >
                          {locale === "de" ? "Projekt starten" : "Bắt đầu dự án"}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}

function StepImage({
  candidates,
  alt,
  color,
}: {
  candidates: string[];
  alt: string;
  color: string;
}) {
  const list = useMemo(() => [...new Set(candidates.filter(Boolean))], [candidates]);
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(list.length === 0);
  const src = !failed && list[idx] ? list[idx] : null;

  useEffect(() => {
    setIdx(0);
    setFailed(list.length === 0);
  }, [list]);

  if (!src) {
    return (
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(145deg, ${color}55, #0a0c18 70%)`,
        }}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={src}
      src={src}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover"
      onError={() => {
        setIdx((i) => {
          if (i + 1 < list.length) return i + 1;
          setFailed(true);
          return i;
        });
      }}
    />
  );
}
