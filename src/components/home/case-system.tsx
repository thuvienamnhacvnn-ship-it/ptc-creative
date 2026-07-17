"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Pause,
  Play,
  Sparkles,
} from "lucide-react";
import type { Locale, PortfolioCategory } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { portfolio } from "@/data/portfolio";
import { localePath, t, cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const ease = [0.22, 1, 0.36, 1] as const;
const HOLD_MS = 5500;

const CATEGORIES: {
  key: "all" | PortfolioCategory;
  label: { vi: string; de: string };
}[] = [
  { key: "all", label: { vi: "Tất cả", de: "Alle" } },
  { key: "website", label: { vi: "Website", de: "Website" } },
  { key: "cnc", label: { vi: "CNC", de: "CNC" } },
  { key: "print", label: { vi: "Print", de: "Print" } },
  { key: "signage", label: { vi: "Signage", de: "Signage" } },
];

/**
 * Portfolio — Kinetic Deck
 * · Media full-bleed + glass HUD
 * · Auto-play / pause · prev-next
 * · Filmstrip case động, cân đều
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
  const [dir, setDir] = useState(1);

  const items = useMemo(
    () =>
      filter === "all"
        ? portfolio
        : portfolio.filter((p) => p.category === filter),
    [filter]
  );

  useEffect(() => {
    setActive(0);
    setTick((t) => t + 1);
  }, [filter]);

  const count = items.length;
  const item = items[active] ?? items[0];

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
  }, [paused, reduce, count, active]);

  if (!item) return null;

  const caseNo = portfolio.findIndex((p) => p.id === item.id) + 1 || active + 1;
  const prevItem = items[(active - 1 + count) % count];
  const nextItem = items[(active + 1) % count];

  return (
    <Section
      className="home-stage-fill flex h-full min-h-0 flex-col border-0 py-0"
      contained={false}
    >
      <div
        className="pf-kinetic relative flex h-full min-h-0 w-full flex-col overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Dynamic ambient from active cover */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[#0c0a08]" />
          <AmbientBg
            key={item.id}
            src={item.cover}
            candidates={item.coverCandidates}
            gradient={item.gradient}
          />
          <div className="absolute inset-0 bg-[#0c0a08]/75" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_55%_40%,rgba(251,191,36,0.12),transparent_60%)]" />
        </div>

        <Container className="relative z-10 flex h-full min-h-0 w-full max-w-none flex-col px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          {/* Header */}
          <header className="flex shrink-0 flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.75)]" />
                <p className="text-[11px] font-medium tracking-[0.22em] text-white/40 uppercase">
                  07 · {locale === "de" ? "Kinetic works" : "Kinetic works"}
                </p>
              </div>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {dict.home.portfolioTitle}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Filters */}
              <div
                className="inline-flex flex-wrap gap-0.5 rounded-sm border border-white/[0.1] bg-black/40 p-0.5 backdrop-blur-sm"
                role="tablist"
                aria-label={locale === "de" ? "Kategorie" : "Danh mục"}
              >
                {CATEGORIES.map((c) => {
                  const on = filter === c.key;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setFilter(c.key)}
                      className={cn(
                        "px-2.5 py-1.5 text-[11px] font-medium tracking-wide transition-colors sm:text-xs",
                        on
                          ? "bg-amber-400 text-black"
                          : "text-white/50 hover:bg-white/[0.06] hover:text-white/85"
                      )}
                    >
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
                    ? "border-amber-400/50 bg-amber-400/15 text-amber-300"
                    : "border-white/15 text-white/55 hover:border-amber-400/40 hover:text-amber-200"
                )}
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
                className="group hidden items-center gap-1.5 border border-white/12 bg-black/30 px-3 py-2 text-sm text-white/60 transition-colors hover:border-amber-400/40 hover:text-amber-200 sm:inline-flex"
              >
                {dict.common.viewAll}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </header>

          {/* Kinetic stage */}
          <div className="relative mt-3 min-h-0 flex-1">
            <div className="pf-kinetic__stage relative flex h-full min-h-0 overflow-hidden border border-white/[0.1] bg-black/40">
              {/* Peek prev / next (desktop) */}
              {prevItem && count > 1 && (
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="pf-kinetic__peek pf-kinetic__peek--prev absolute top-0 bottom-0 left-0 z-[5] hidden w-[4.5rem] items-stretch lg:flex"
                  aria-label="Previous case"
                >
                  <span className="relative my-3 ml-2 w-full overflow-hidden border border-white/10 opacity-40 transition-opacity hover:opacity-80">
                    <SmartImage
                      src={prevItem.cover}
                      candidates={prevItem.coverCandidates}
                      alt=""
                      gradient={prevItem.gradient}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <span className="absolute inset-0 bg-black/50" />
                  </span>
                </button>
              )}
              {nextItem && count > 1 && (
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="pf-kinetic__peek pf-kinetic__peek--next absolute top-0 bottom-0 right-0 z-[5] hidden w-[4.5rem] items-stretch lg:flex"
                  aria-label="Next case"
                >
                  <span className="relative my-3 mr-2 w-full overflow-hidden border border-white/10 opacity-40 transition-opacity hover:opacity-80">
                    <SmartImage
                      src={nextItem.cover}
                      candidates={nextItem.coverCandidates}
                      alt=""
                      gradient={nextItem.gradient}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <span className="absolute inset-0 bg-black/50" />
                  </span>
                </button>
              )}

              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={item.id}
                  custom={dir}
                  initial={
                    reduce
                      ? { opacity: 0 }
                      : { opacity: 0, x: dir > 0 ? 48 : -48, scale: 1.03 }
                  }
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={
                    reduce
                      ? { opacity: 0 }
                      : { opacity: 0, x: dir > 0 ? -36 : 36, scale: 0.99 }
                  }
                  transition={{ duration: 0.45, ease }}
                  className="absolute inset-0"
                >
                  <SmartImage
                    src={item.cover}
                    candidates={item.coverCandidates}
                    alt={t(item.title, locale)}
                    gradient={item.gradient}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* Kinetic overlays */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/30" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25" />
                  <div className="pf-kinetic__scan pointer-events-none absolute inset-0" />

                  {/* Giant index */}
                  <span
                    className="pointer-events-none absolute top-2 right-4 select-none font-mono text-[5rem] font-semibold leading-none tracking-tighter text-white/[0.08] sm:top-3 sm:right-6 sm:text-[7rem]"
                    aria-hidden
                  >
                    {String(caseNo).padStart(2, "0")}
                  </span>

                  {/* Content HUD */}
                  <div className="absolute inset-0 z-[2] flex flex-col justify-between p-4 sm:p-5 lg:px-20 lg:py-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-amber-400 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider text-black uppercase">
                        {item.category}
                      </span>
                      <span className="border border-white/15 bg-black/40 px-2.5 py-1 font-mono text-[10px] text-white/70 capitalize backdrop-blur-sm">
                        {item.industry}
                      </span>
                      <span className="font-mono text-[11px] tabular-nums text-white/40">
                        {String(active + 1).padStart(2, "0")} /{" "}
                        {String(count).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="max-w-xl">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
                        <span className="inline-flex items-center gap-1.5 text-amber-300/90">
                          <Clock3 className="h-3.5 w-3.5" />
                          {t(item.duration, locale)}
                        </span>
                        <span className="hidden h-3 w-px bg-white/15 sm:block" />
                        <span className="inline-flex max-w-xs items-center gap-1.5 truncate">
                          <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                          <span className="truncate">{t(item.result, locale)}</span>
                        </span>
                      </div>

                      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-[2.1rem] md:leading-tight">
                        {t(item.title, locale)}
                      </h3>
                      <p className="mt-2 line-clamp-2 max-w-lg text-sm leading-relaxed text-white/60 sm:text-[15px]">
                        {t(item.description, locale)}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="border border-white/12 bg-white/[0.05] px-2 py-0.5 text-[11px] text-white/55 backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Before → After kinetic line */}
                      <div className="mt-4 hidden items-stretch gap-0 sm:flex">
                        <div className="min-w-0 flex-1 border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-sm">
                          <p className="font-mono text-[9px] tracking-wider text-white/35 uppercase">
                            {dict.common.before}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-white/55">
                            {t(item.beforeLabel, locale)}
                          </p>
                        </div>
                        <div className="flex w-8 shrink-0 items-center justify-center bg-amber-400/15">
                          <ArrowRight className="h-3.5 w-3.5 text-amber-400" />
                        </div>
                        <div className="min-w-0 flex-1 border border-amber-400/30 bg-amber-400/10 px-3 py-2 backdrop-blur-sm">
                          <p className="font-mono text-[9px] tracking-wider text-amber-400/90 uppercase">
                            {dict.common.after}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-white/80">
                            {t(item.afterLabel, locale)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => go(-1)}
                          className="flex h-10 w-10 items-center justify-center border border-white/15 bg-black/40 text-white/70 backdrop-blur-sm transition-colors hover:border-white/30 hover:text-white"
                          aria-label="Previous"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => go(1)}
                          className="flex h-10 w-10 items-center justify-center border border-white/15 bg-black/40 text-white/70 backdrop-blur-sm transition-colors hover:border-white/30 hover:text-white"
                          aria-label="Next"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </button>

                        {/* Auto progress */}
                        <div className="mx-1 hidden h-0.5 min-w-[5rem] flex-1 overflow-hidden bg-white/10 sm:block sm:max-w-[10rem]">
                          {!reduce && !paused && count > 1 ? (
                            <motion.div
                              key={tick}
                              className="h-full bg-amber-400"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{
                                duration: HOLD_MS / 1000,
                                ease: "linear",
                              }}
                            />
                          ) : (
                            <div className="h-full w-1/4 bg-amber-400/50" />
                          )}
                        </div>

                        <Link
                          href={localePath(locale, `/portfolio/${item.id}`)}
                          className="inline-flex min-h-10 items-center gap-1.5 bg-amber-400 px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
                        >
                          {dict.common.viewProject}
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dynamic filmstrip — equal cases */}
          <div className="mt-3 shrink-0">
            <nav
              className="pf-kinetic__strip grid w-full gap-1.5 sm:gap-2"
              aria-label="Cases"
              style={{
                gridTemplateColumns: `repeat(${Math.max(count, 1)}, minmax(0, 1fr))`,
              }}
            >
              {items.map((p, i) => {
                const on = i === active;
                const n = portfolio.findIndex((x) => x.id === p.id) + 1;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setDir(i > active ? 1 : -1);
                      setActive(i);
                      setTick((t) => t + 1);
                      setPaused(true);
                    }}
                    className={cn(
                      "pf-kinetic__thumb group relative flex min-h-[3.25rem] w-full min-w-0 overflow-hidden border transition-all duration-300 sm:min-h-[4rem]",
                      on
                        ? "border-amber-400 z-[1] scale-[1.02] shadow-[0_8px_28px_rgba(251,191,36,0.2)]"
                        : "border-white/10 opacity-70 hover:opacity-100 hover:border-white/25"
                    )}
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
                        "absolute inset-0 transition-colors",
                        on
                          ? "bg-gradient-to-t from-black/90 via-black/30 to-transparent"
                          : "bg-black/45 group-hover:bg-black/30"
                      )}
                    />
                    {on && !reduce && !paused && (
                      <motion.span
                        key={`bar-${tick}-${p.id}`}
                        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-amber-400"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: HOLD_MS / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                    <span className="relative z-[1] mt-auto flex w-full items-end justify-between gap-1 p-1.5 sm:p-2">
                      <span
                        className={cn(
                          "font-mono text-[9px] tabular-nums",
                          on ? "text-amber-300" : "text-white/50"
                        )}
                      >
                        {String(n).padStart(2, "0")}
                      </span>
                      <span className="hidden truncate text-right text-[10px] font-medium text-white/80 sm:block">
                        {t(p.title, locale).split("—")[0]?.trim()}
                      </span>
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </Container>
      </div>
    </Section>
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
      className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-md"
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
