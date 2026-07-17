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
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Layers,
  Pause,
  Play,
  Sparkles,
} from "lucide-react";
import type { Locale, PortfolioCategory, PortfolioItem } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { portfolio } from "@/data/portfolio";
import { localePath, t, cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

/** Soft ease-out for image crossfades */
const fadeEase = [0.33, 1, 0.68, 1] as const;
const HOLD_MS = 6000;
const FADE_MS = 0.62;

const CAT_COLOR: Record<PortfolioCategory | "all", string> = {
  all: "#ff4d6d",
  website: "#38bdf8",
  cnc: "#a3e635",
  print: "#fbbf24",
  signage: "#c084fc",
};

const CATEGORIES: {
  key: "all" | PortfolioCategory;
  label: { vi: string; de: string };
}[] = [
  { key: "all", label: { vi: "Tất cả", de: "Alle" } },
  { key: "website", label: { vi: "Web", de: "Web" } },
  { key: "cnc", label: { vi: "CNC", de: "CNC" } },
  { key: "print", label: { vi: "Print", de: "Print" } },
  { key: "signage", label: { vi: "Signage", de: "Signage" } },
];

/**
 * Portfolio — ATELIER FRAME
 * Layout độc đáo:
 * · Spine film dọc (trái) — chọn case
 * · Khung media cắt chéo + layer stack 3D
 * · Dossier card nổi (phải / dưới)
 * · Palette rose × lime × violet — khác hẳn section khác
 */
export function CaseSystem({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<"all" | PortfolioCategory>("all");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const items = useMemo(
    () =>
      filter === "all"
        ? portfolio
        : portfolio.filter((p) => p.category === filter),
    [filter]
  );

  useEffect(() => {
    setDir(1);
    setActive(0);
    setTick((t) => t + 1);
  }, [filter]);

  const count = items.length;
  const item = items[active] ?? items[0];
  const accent = item ? CAT_COLOR[item.category] : CAT_COLOR.all;

  const select = useCallback(
    (i: number) => {
      setDir(i >= active ? 1 : -1);
      setActive(i);
      setTick((t) => t + 1);
      setPaused(true);
    },
    [active]
  );

  const go = useCallback(
    (d: 1 | -1) => {
      if (count < 1) return;
      setDir(d);
      setActive((i) => (i + d + count) % count);
      setTick((t) => t + 1);
      setPaused(true);
    },
    [count]
  );

  useEffect(() => {
    if (paused || reduce || count < 2) return;
    const id = window.setInterval(() => {
      setDir(1);
      setActive((i) => (i + 1) % count);
      setTick((t) => t + 1);
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [paused, reduce, count]);

  // Depth stack: current + next unique cases
  const stack = useMemo(() => {
    const out: PortfolioItem[] = [];
    for (let o = 0; o < Math.min(3, count); o++) {
      const it = items[(active + o) % count];
      if (it && !out.some((x) => x.id === it.id)) out.push(it);
    }
    return out;
  }, [items, active, count]);

  if (!item) return null;

  const caseNo = portfolio.findIndex((p) => p.id === item.id) + 1 || active + 1;

  return (
    <Section
      className="home-stage-fill flex h-full min-h-0 flex-col border-0 py-0"
      contained={false}
    >
      <div
        className="pf-atelier relative flex h-full min-h-0 w-full flex-col overflow-hidden"
        style={
          {
            ["--pa"]: accent,
            ["--pa-soft"]: `${accent}33`,
          } as CSSProperties
        }
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Ambient — soft crossfade with case */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[#0a0610]" />
          <div className="absolute inset-0 overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                key={`amb-${item.id}`}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: FADE_MS * 1.1, ease: fadeEase }}
              >
                <AmbientBg
                  src={item.cover}
                  candidates={item.coverCandidates}
                  gradient={item.gradient}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0610]/80 via-[#12081a]/78 to-[#080610]/88" />
          <motion.div
            className="absolute -left-[15%] top-[-10%] h-[55%] w-[50%] blur-3xl opacity-80"
            animate={{
              background: `radial-gradient(circle, ${accent}30, transparent 70%)`,
            }}
            transition={{ duration: FADE_MS, ease: fadeEase }}
          />
          <div
            className="absolute -right-[10%] bottom-[-5%] h-[45%] w-[40%] blur-3xl opacity-60"
            style={{
              background:
                "radial-gradient(circle, rgba(163,230,53,0.12), transparent 70%)",
            }}
          />
          <div className="pf-atelier__grid absolute inset-0" />
          <div className="pf-atelier__noise absolute inset-0 opacity-[0.04]" />
        </div>

        <Container className="relative z-10 flex h-full min-h-0 w-full max-w-none flex-col px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          {/* Header — exhibition style */}
          <header className="flex shrink-0 flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="pf-atelier__dot h-1.5 w-1.5 rounded-full"
                  style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
                />
                <p className="text-[11px] font-medium tracking-[0.22em] text-white/40 uppercase">
                  07 · {locale === "de" ? "Atelier" : "Atelier"}
                </p>
              </div>
              <h2 className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-0 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {dict.home.portfolioTitle}
                <span
                  className="font-mono text-sm font-normal tracking-wider tabular-nums sm:text-base"
                  style={{ color: accent }}
                >
                  {String(caseNo).padStart(2, "0")}
                  <span className="text-white/25">
                    /{String(portfolio.length).padStart(2, "0")}
                  </span>
                </span>
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Category as color chips */}
              <div
                className="flex flex-wrap gap-1"
                role="tablist"
                aria-label={locale === "de" ? "Kategorie" : "Danh mục"}
              >
                {CATEGORIES.map((c) => {
                  const on = filter === c.key;
                  const col = CAT_COLOR[c.key];
                  return (
                    <button
                      key={c.key}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setFilter(c.key)}
                      className={cn(
                        "pf-atelier__cat inline-flex items-center gap-1.5 border px-2.5 py-1.5 text-[11px] font-semibold tracking-wide uppercase transition-all sm:text-xs",
                        on
                          ? "text-black"
                          : "border-white/10 bg-black/30 text-white/50 hover:border-white/20 hover:text-white/85"
                      )}
                      style={
                        on
                          ? {
                              background: col,
                              borderColor: col,
                              boxShadow: `0 0 20px ${col}44`,
                            }
                          : { borderColor: `${col}28` }
                      }
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: on ? "#000" : col }}
                      />
                      {c.label[locale]}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => {
                  setPaused((p) => !p);
                  setTick((t) => t + 1);
                }}
                className={cn(
                  "flex h-9 w-9 items-center justify-center border transition-colors",
                  paused
                    ? "border-white/30 bg-white/10 text-white"
                    : "border-white/12 text-white/50 hover:border-white/25 hover:text-white"
                )}
                style={
                  paused
                    ? { borderColor: `${accent}66`, color: accent }
                    : undefined
                }
                aria-label={paused ? "Play" : "Pause"}
              >
                {paused ? (
                  <Play className="h-3.5 w-3.5 fill-current" />
                ) : (
                  <Pause className="h-3.5 w-3.5" />
                )}
              </button>

              <Link
                href={localePath(locale, "/portfolio")}
                className="group hidden items-center gap-1.5 border border-white/12 bg-black/35 px-3 py-2 text-sm text-white/60 transition-colors hover:text-white sm:inline-flex"
                style={{ borderColor: `${accent}33` }}
              >
                {dict.common.viewAll}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </header>

          {/* Main atelier stage */}
          <div className="mt-3 grid min-h-0 flex-1 gap-3 lg:grid-cols-12 lg:gap-4">
            {/* ── Vertical film spine ── */}
            <nav
              className="pf-atelier__spine no-scrollbar flex shrink-0 gap-1.5 overflow-x-auto lg:col-span-2 lg:flex-col lg:gap-1.5 lg:overflow-y-auto lg:overflow-x-hidden"
              aria-label="Cases"
            >
              {items.map((p, i) => {
                const on = i === active;
                const n = portfolio.findIndex((x) => x.id === p.id) + 1;
                const col = CAT_COLOR[p.category];
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => select(i)}
                    className={cn(
                      "pf-atelier__frame group relative flex min-w-[4.5rem] shrink-0 flex-col overflow-hidden border transition-all duration-300 sm:min-w-[5.25rem] lg:min-h-0 lg:min-w-0 lg:w-full lg:flex-1 lg:max-h-[5.5rem]",
                      on
                        ? "border-transparent z-[1]"
                        : "border-white/10 opacity-65 hover:opacity-100 hover:border-white/25"
                    )}
                    style={
                      on
                        ? {
                            boxShadow: `0 0 0 1.5px ${col}, 0 10px 28px ${col}30`,
                          }
                        : undefined
                    }
                    aria-current={on ? "true" : undefined}
                    title={t(p.title, locale)}
                  >
                    <SmartImage
                      src={p.cover}
                      candidates={p.coverCandidates}
                      alt=""
                      gradient={p.gradient}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <span
                      className={cn(
                        "absolute inset-0",
                        on
                          ? "bg-gradient-to-t from-black/85 via-black/25 to-transparent"
                          : "bg-black/50 group-hover:bg-black/35"
                      )}
                    />
                    {/* film sprocket marks */}
                    <span className="pf-atelier__sprocket absolute inset-y-1 left-0.5 flex flex-col justify-between" aria-hidden>
                      <span />
                      <span />
                      <span />
                    </span>
                    <span className="relative z-[1] mt-auto flex w-full items-end justify-between gap-1 p-1.5">
                      <span
                        className="font-mono text-[10px] font-bold tabular-nums"
                        style={{ color: on ? col : "rgba(255,255,255,0.55)" }}
                      >
                        {String(n).padStart(2, "0")}
                      </span>
                      <span
                        className="hidden truncate text-[9px] font-medium uppercase tracking-wide text-white/70 lg:block"
                        style={{ color: on ? col : undefined }}
                      >
                        {p.category}
                      </span>
                    </span>
                    {on && !reduce && !paused && count > 1 && (
                      <motion.span
                        key={`prog-${tick}-${p.id}`}
                        className="absolute inset-x-0 bottom-0 h-0.5 origin-left"
                        style={{ background: col }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: HOLD_MS / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* ── Center: angled media stack ── */}
            <div className="relative min-h-0 lg:col-span-6 xl:col-span-7">
              <div className="pf-atelier__stage relative h-full min-h-[240px] overflow-hidden sm:min-h-[280px]">
                {/* Depth cards — fade/slide gently */}
                {!reduce &&
                  stack.slice(1).map((s, i) => (
                    <motion.div
                      key={`stack-${s.id}`}
                      className="pf-atelier__depth pointer-events-none absolute inset-0 overflow-hidden border border-white/10"
                      initial={false}
                      animate={{
                        x: (i + 1) * 10,
                        y: (i + 1) * 8,
                        scale: 1 - (i + 1) * 0.04,
                        opacity: 0.32 - i * 0.1,
                      }}
                      transition={{ duration: FADE_MS, ease: fadeEase }}
                      style={{ zIndex: 1 - i }}
                    >
                      <SmartImage
                        src={s.cover}
                        candidates={s.coverCandidates}
                        alt=""
                        gradient={s.gradient}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <span className="absolute inset-0 bg-black/50" />
                    </motion.div>
                  ))}

                {/* Static shell keeps clip-path stable; images crossfade inside */}
                <div
                  className="pf-atelier__hero relative z-[2] h-full min-h-[240px] overflow-hidden border border-white/15 sm:min-h-[280px]"
                  style={{
                    boxShadow: `0 0 0 1px ${accent}22, 0 28px 70px rgba(0,0,0,0.5)`,
                  }}
                >
                  <AnimatePresence initial={false} custom={dir}>
                    <motion.div
                      key={item.id}
                      custom={dir}
                      variants={{
                        enter: (d: 1 | -1) =>
                          reduce
                            ? { opacity: 0 }
                            : {
                                opacity: 0,
                                x: d * 28,
                                scale: 1.03,
                              },
                        center: {
                          opacity: 1,
                          x: 0,
                          scale: 1,
                        },
                        exit: (d: 1 | -1) =>
                          reduce
                            ? { opacity: 0 }
                            : {
                                opacity: 0,
                                x: d * -18,
                                scale: 1.015,
                              },
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: FADE_MS,
                        ease: fadeEase,
                        opacity: { duration: FADE_MS * 0.85, ease: fadeEase },
                      }}
                      className="pf-atelier__slide absolute inset-0"
                    >
                      {/* Ken Burns settle on enter */}
                      <motion.div
                        className="absolute inset-0 will-change-transform"
                        initial={reduce ? false : { scale: 1.07 }}
                        animate={{ scale: 1 }}
                        transition={{
                          duration: reduce ? 0 : 1.15,
                          ease: fadeEase,
                        }}
                      >
                        <SmartImage
                          src={item.cover}
                          candidates={item.coverCandidates}
                          alt={t(item.title, locale)}
                          gradient={item.gradient}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </motion.div>

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/30" />
                      <div
                        className="pointer-events-none absolute inset-0 transition-[background] duration-500"
                        style={{
                          background: `linear-gradient(125deg, ${accent}28 0%, transparent 45%, rgba(163,230,53,0.08) 100%)`,
                        }}
                      />
                      <div className="pf-atelier__cut pointer-events-none absolute inset-0" />

                      <span
                        className="pointer-events-none absolute -right-2 -bottom-4 select-none font-mono text-[7rem] font-black leading-none tracking-tighter text-white/[0.07] sm:text-[9rem] lg:text-[11rem]"
                        aria-hidden
                      >
                        {String(caseNo).padStart(2, "0")}
                      </span>

                      <div className="absolute top-3 left-3 z-[3] flex flex-wrap items-center gap-1.5 sm:top-4 sm:left-4">
                        <span
                          className="px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-black uppercase"
                          style={{ background: accent }}
                        >
                          {item.category}
                        </span>
                        <span className="border border-white/20 bg-black/50 px-2.5 py-1 font-mono text-[10px] text-white/75 capitalize backdrop-blur-sm">
                          {item.industry}
                        </span>
                      </div>

                      <div className="absolute right-3 bottom-3 z-[3] flex gap-1.5 sm:right-4 sm:bottom-4">
                        <button
                          type="button"
                          onClick={() => go(-1)}
                          className="flex h-10 w-10 items-center justify-center border border-white/20 bg-black/55 text-white/75 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
                          aria-label="Previous"
                        >
                          <span className="font-mono text-xs">←</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => go(1)}
                          className="flex h-10 w-10 items-center justify-center border border-white/20 bg-black/55 text-white/75 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
                          aria-label="Next"
                          style={{ borderColor: `${accent}55` }}
                        >
                          <span
                            className="font-mono text-xs"
                            style={{ color: accent }}
                          >
                            →
                          </span>
                        </button>
                      </div>

                      <div className="absolute bottom-3 left-3 z-[3] max-w-[70%] sm:bottom-4 sm:left-4 lg:max-w-[55%]">
                        <p
                          className="font-mono text-[10px] tracking-[0.16em] uppercase"
                          style={{ color: accent }}
                        >
                          Case {String(caseNo).padStart(2, "0")}
                        </p>
                        <h3 className="mt-0.5 text-lg font-semibold leading-tight tracking-tight text-white sm:text-xl md:text-2xl">
                          {t(item.title, locale)}
                        </h3>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* ── Dossier panel ── */}
            <div className="flex min-h-0 flex-col lg:col-span-4 xl:col-span-3">
              <AnimatePresence mode="wait" initial={false}>
                <motion.aside
                  key={item.id}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: FADE_MS * 0.75, ease: fadeEase }}
                  className="pf-atelier__dossier flex h-full min-h-0 flex-col border border-white/10 bg-black/45"
                  style={{
                    boxShadow: `inset 3px 0 0 ${accent}, 0 20px 48px rgba(0,0,0,0.35)`,
                  }}
                >
                  <div className="shrink-0 border-b border-white/[0.07] px-3.5 py-2.5 sm:px-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] text-white/45 uppercase">
                        <Layers className="h-3.5 w-3.5" style={{ color: accent }} />
                        {locale === "de" ? "Dossier" : "Hồ sơ case"}
                      </p>
                      <span
                        className="font-mono text-[11px] font-bold tabular-nums"
                        style={{ color: accent }}
                      >
                        {String(active + 1).padStart(2, "0")}/
                        {String(count).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3.5 no-scrollbar sm:p-4">
                    <div>
                      <h3 className="text-base font-semibold leading-snug tracking-tight text-white sm:text-lg">
                        {t(item.title, locale)}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/52">
                        {t(item.description, locale)}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <MetaChip
                        icon={<Clock3 className="h-3.5 w-3.5" style={{ color: accent }} />}
                        label={locale === "de" ? "Dauer" : "Thời gian"}
                        value={t(item.duration, locale)}
                      />
                      <MetaChip
                        icon={<Sparkles className="h-3.5 w-3.5" style={{ color: accent }} />}
                        label={locale === "de" ? "Impact" : "Kết quả"}
                        value={t(item.result, locale)}
                      />
                    </div>

                    {/* Before → After */}
                    <div className="overflow-hidden border border-white/[0.08]">
                      <div className="grid grid-cols-[1fr_auto_1fr]">
                        <div className="bg-white/[0.03] px-2.5 py-2">
                          <p className="font-mono text-[8px] tracking-wider text-white/35 uppercase">
                            {dict.common.before}
                          </p>
                          <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-white/55">
                            {t(item.beforeLabel, locale)}
                          </p>
                        </div>
                        <div
                          className="flex w-7 items-center justify-center"
                          style={{ background: `${accent}22` }}
                        >
                          <ArrowRight
                            className="h-3.5 w-3.5"
                            style={{ color: accent }}
                          />
                        </div>
                        <div
                          className="px-2.5 py-2"
                          style={{ background: `${accent}12` }}
                        >
                          <p
                            className="font-mono text-[8px] tracking-wider uppercase"
                            style={{ color: accent }}
                          >
                            {dict.common.after}
                          </p>
                          <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-white/80">
                            {t(item.afterLabel, locale)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="border px-2 py-0.5 text-[11px] text-white/60"
                          style={{ borderColor: `${accent}30` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Materials */}
                    <div className="border-t border-white/[0.06] pt-2.5">
                      <p className="font-mono text-[9px] tracking-[0.14em] text-white/35 uppercase">
                        {dict.common.materials}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-white/55">
                        {t(item.materials, locale)}
                      </p>
                    </div>
                  </div>

                  {/* CTA footer */}
                  <div className="shrink-0 space-y-2 border-t border-white/[0.07] p-3 sm:p-3.5">
                    {!reduce && count > 1 && (
                      <div className="h-0.5 overflow-hidden bg-white/10">
                        {!paused ? (
                          <motion.div
                            key={tick}
                            className="h-full origin-left"
                            style={{ background: accent }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                              duration: HOLD_MS / 1000,
                              ease: "linear",
                            }}
                          />
                        ) : (
                          <div
                            className="h-full w-1/3 opacity-50"
                            style={{ background: accent }}
                          />
                        )}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={localePath(locale, `/portfolio/${item.id}`)}
                        className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
                        style={{
                          background: accent,
                          boxShadow: `0 8px 24px ${accent}40`,
                        }}
                      >
                        {dict.common.viewProject}
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={localePath(locale, "/portfolio")}
                        className="inline-flex min-h-10 items-center justify-center border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-white/65 transition-colors hover:border-white/30 hover:text-white"
                      >
                        {dict.common.viewAll}
                      </Link>
                    </div>
                  </div>
                </motion.aside>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}

function MetaChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactElement;
  label: string;
  value: string;
}) {
  return (
    <div className="border border-white/[0.07] bg-white/[0.03] px-2.5 py-2">
      <p className="flex items-center gap-1 font-mono text-[8px] tracking-wider text-white/35 uppercase">
        {icon}
        {label}
      </p>
      <p className="mt-1 line-clamp-2 text-xs leading-snug text-white/75">{value}</p>
    </div>
  );
}

function AmbientBg({
  src,
  candidates,
  gradient,
}: {
  src?: string;
  candidates?: string[];
  gradient: string;
}) {
  return (
    <SmartImage
      src={src}
      candidates={candidates}
      alt=""
      gradient={gradient}
      className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-md"
    />
  );
}

function SmartImage({
  src,
  candidates,
  alt,
  gradient,
  className,
}: {
  src?: string;
  candidates?: string[];
  alt: string;
  gradient: string;
  className?: string;
}) {
  const list = useMemo(() => {
    const raw = [...(candidates ?? []), src].filter(Boolean) as string[];
    return [...new Set(raw)];
  }, [src, candidates]);

  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(list.length === 0);
  const current = !failed && list[idx] ? list[idx] : null;

  useEffect(() => {
    setIdx(0);
    setFailed(list.length === 0);
  }, [list]);

  if (!current) {
    return (
      <div
        className={cn("bg-gradient-to-br", gradient, className)}
        role="img"
        aria-label={alt || undefined}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={current}
      src={current}
      alt={alt}
      className={className}
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
