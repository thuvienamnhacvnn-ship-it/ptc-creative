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
  Check,
  ChevronDown,
  Clock3,
  Layers,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { industries } from "@/data/industries";
import { industryMedia } from "@/data/industry-media";
import { getPillarDepth } from "@/data/industry-pillar-depth";
import { getService } from "@/data/services";
import { getIcon } from "@/lib/icons";
import { localePath, t, tList, cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const ease = [0.22, 1, 0.36, 1] as const;

/** Icon gợi ý theo pillar id — fallback service icon */
const PILLAR_ICON: Record<string, string> = {
  "identity-menu": "Palette",
  "facade-signage": "Signpost",
  "digital-booking": "Monitor",
  "seasonal-growth": "Megaphone",
  "beauty-ci": "Sparkles",
  "glow-signage": "Signpost",
  "booking-web": "Monitor",
  "content-system": "Megaphone",
  "soft-brand": "Palette",
  "spatial-sign": "Signpost",
  "service-menu": "Printer",
  retention: "Monitor",
  "facade-window": "Signpost",
  "pos-cnc": "Factory",
  "pack-price": "Printer",
  "retail-campaign": "Megaphone",
  "medical-ci": "Palette",
  "clinic-sign": "Signpost",
  "patient-print": "Printer",
  "trust-web": "Monitor",
  "fleet-wrap": "Truck",
  warehouse: "Signpost",
  "b2b-web": "Monitor",
  "tender-mkt": "Megaphone",
  "brand-system": "Palette",
  "office-brand": "Building2",
  "corp-web": "Monitor",
  "sales-kit": "Megaphone",
};

function pillarIcon(id: string, services?: string[]): LucideIcon {
  if (PILLAR_ICON[id]) return getIcon(PILLAR_ICON[id]!);
  const first = services?.[0] ? getService(services[0]) : undefined;
  return getIcon(first?.icon ?? "Layers");
}

function pillarFeatures(
  id: string,
  services: string[] | undefined,
  locale: Locale,
  fallbackDesc: string
): string[] {
  const depth = getPillarDepth(id);
  if (depth?.features) return tList(depth.features, locale).slice(0, 3);
  const fromSvc = (services ?? [])
    .flatMap((sSlug) => {
      const svc = getService(sSlug);
      return svc ? tList(svc.capabilities, locale).slice(0, 2) : [];
    })
    .slice(0, 3);
  return fromSvc.length ? fromSvc : [fallbackDesc];
}

/**
 * Giải pháp theo ngành — Sector Prism (upgraded)
 * · Media cinematic + glass card
 * · Giải pháp chuyên sâu: icon + accordion + CTA
 * · Swatch ngành polish
 */
export function IndustryEnvironments({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const reduce = useReducedMotion();
  const [slug, setSlug] = useState(industries[0]?.slug ?? "restaurant");
  const [openId, setOpenId] = useState<string | null>(
    industries[0]?.solutions?.[0]?.id ?? null
  );

  const current = industries.find((i) => i.slug === slug) ?? industries[0]!;
  const media = useMemo(() => industryMedia(current.slug), [current.slug]);
  const accent = current.color ?? "#22d3ee";
  const solutions = (current.solutions ?? []).slice(0, 4);
  const outcomes = tList(current.outcomes, locale).slice(0, 2);
  const modules = current.modules.slice(0, 5);
  const idx = industries.findIndex((i) => i.slug === slug);
  const Icon = getIcon(current.icon);

  useEffect(() => {
    const first =
      industries.find((i) => i.slug === slug)?.solutions?.[0]?.id ?? null;
    setOpenId(first);
  }, [slug]);

  return (
    <Section
      className="home-stage-fill flex h-full min-h-0 flex-col border-0 py-0"
      contained={false}
    >
      <div
        className="ind-prism relative flex h-full min-h-0 w-full flex-col overflow-hidden"
        style={
          {
            ["--ia"]: accent,
            ["--ia-soft"]: `${accent}28`,
            ["--ia-glow"]: `${accent}40`,
          } as CSSProperties
        }
      >
        {/* Ambient — multi-hue electric */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[#070b18]" />
          <AmbientCover candidates={media.coverCandidates} accent={accent} />
          <div className="absolute inset-0 bg-gradient-to-br from-[#070b18]/70 via-[#0a1224]/78 to-[#0c0a1a]/82" />
          <div
            className="absolute -right-[8%] top-[-6%] h-[58%] w-[48%] opacity-95 blur-3xl transition-[background] duration-700"
            style={{
              background: `radial-gradient(circle, ${accent}38, transparent 68%)`,
            }}
          />
          <div
            className="absolute -left-[10%] top-[8%] h-[42%] w-[36%] opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(34,211,238,0.22), transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-[-8%] left-[20%] h-[38%] w-[42%] opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(192,38,211,0.18), transparent 70%)",
            }}
          />
          <div
            className="absolute right-[10%] bottom-[5%] h-[32%] w-[30%] opacity-55 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(251,113,133,0.16), transparent 70%)",
            }}
          />
          <div className="ind-prism__grid absolute inset-0" />
          <div className="ind-prism__scanline absolute inset-x-0 top-0" />
        </div>

        <Container className="relative z-10 flex h-full min-h-0 w-full max-w-none flex-col px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          {/* Header */}
          <header className="flex shrink-0 items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="ind-prism__pulse h-1.5 w-1.5 rounded-full"
                  style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
                />
                <p className="text-[11px] font-medium tracking-[0.22em] text-white/40 uppercase">
                  06 · {locale === "de" ? "Branchen-Stacks" : "Sector stacks"}
                </p>
              </div>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {dict.home.industriesTitle}
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/42 sm:text-[15px]">
                {dict.home.industriesSubtitle}
              </p>
            </div>
            <Link
              href={localePath(locale, "/solutions")}
              className="ind-prism__header-cta group inline-flex shrink-0 items-center gap-1.5 border bg-black/30 px-3.5 py-2 text-sm text-white/70 backdrop-blur-sm transition-all hover:text-white"
              style={{
                borderColor: `${accent}40`,
                boxShadow: `0 0 0 1px ${accent}12`,
              }}
            >
              {dict.nav.allSolutions}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </header>

          {/* Main stage */}
          <div className="mt-3 grid min-h-0 flex-1 gap-3 lg:grid-cols-12 lg:gap-4">
            {/* Media + glass */}
            <div className="relative min-h-0 lg:col-span-7 xl:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.slug}
                  initial={reduce ? false : { opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.4, ease }}
                  className="ind-prism__stage relative h-full min-h-[220px] overflow-hidden border border-white/[0.1] sm:min-h-[260px]"
                  style={{
                    boxShadow: `0 0 0 1px ${accent}1a, 0 28px 64px rgba(0,0,0,0.42)`,
                  }}
                >
                  <CoverImage
                    candidates={media.coverCandidates}
                    title={t(current.title, locale)}
                    accent={accent}
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b18]/92 via-[#0a1224]/40 to-[#0c0a1a]/45" />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-95 transition-[background] duration-500"
                    style={{
                      background: `linear-gradient(118deg, ${accent}42 0%, transparent 40%, rgba(168,85,247,0.12) 62%, rgba(7,11,24,0.45) 100%)`,
                    }}
                  />
                  <div className="ind-prism__slash pointer-events-none absolute inset-y-0 right-[28%] w-px sm:right-[32%]" />

                  <span
                    className="pointer-events-none absolute top-2 right-3 select-none font-mono text-[4.5rem] font-semibold leading-none tracking-tighter text-white/[0.07] sm:top-3 sm:right-5 sm:text-[6rem]"
                    aria-hidden
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div className="absolute top-3 left-3 z-[2] flex items-center gap-2 sm:top-4 sm:left-4">
                    <span
                      className="ind-prism__icon-badge flex h-11 w-11 items-center justify-center text-black sm:h-12 sm:w-12"
                      style={{
                        background: accent,
                        boxShadow: `0 10px 28px ${accent}55`,
                      }}
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
                    </span>
                    <span className="hidden border border-white/15 bg-black/50 px-2.5 py-1 font-mono text-[10px] tracking-wider text-white/80 backdrop-blur-md sm:inline">
                      {String(idx + 1).padStart(2, "0")} /{" "}
                      {String(industries.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Module chips top-right */}
                  <div className="absolute top-3 right-3 z-[2] hidden max-w-[46%] flex-wrap justify-end gap-1 sm:top-4 sm:right-4 md:flex">
                    {modules.slice(0, 3).map((m) => (
                      <span
                        key={m}
                        className="border border-white/12 bg-black/45 px-1.5 py-0.5 font-mono text-[9px] tracking-wide text-white/55 uppercase backdrop-blur-sm"
                        style={{ borderColor: `${accent}28` }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <div className="absolute inset-x-3 bottom-3 z-[2] sm:inset-x-auto sm:left-4 sm:right-auto sm:bottom-4 sm:w-[min(100%,24rem)]">
                    <div
                      className="ind-prism__glass border p-3.5 sm:p-4"
                      style={{ borderColor: `${accent}55` }}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-black uppercase"
                          style={{ background: accent }}
                        >
                          <Clock3 className="h-3 w-3" />
                          {t(current.timeline, locale)}
                        </span>
                        {outcomes[0] && (
                          <span className="line-clamp-1 text-[11px] text-white/50">
                            {outcomes[0]}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        {t(current.title, locale)}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/55">
                        {t(current.short, locale)}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Link
                          href={localePath(locale, `/solutions/${current.slug}`)}
                          className="ind-prism__cta group/cta inline-flex min-h-9 items-center gap-1.5 px-3.5 py-1.5 text-sm font-semibold text-black transition-transform hover:opacity-95 active:scale-[0.98]"
                          style={{
                            background: accent,
                            boxShadow: `0 8px 22px ${accent}40`,
                          }}
                        >
                          {dict.home.industriesViewDetail}
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                        </Link>
                        <Link
                          href={localePath(locale, "/contact")}
                          className="inline-flex min-h-9 items-center gap-1 border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-white/65 transition-colors hover:border-white/30 hover:text-white sm:text-sm"
                        >
                          {dict.solutions.detailCta}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Giải pháp chuyên sâu */}
            <div className="flex min-h-0 flex-col lg:col-span-5 xl:col-span-4">
              <div className="ind-deep flex min-h-0 flex-1 flex-col overflow-hidden border">
                {/* Panel header */}
                <div className="ind-deep__head shrink-0 border-b border-white/[0.07] px-3.5 py-3 sm:px-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center"
                        style={{
                          background: `${accent}22`,
                          color: accent,
                          border: `1px solid ${accent}40`,
                        }}
                      >
                        <Layers className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold tracking-[0.14em] text-white/80 uppercase">
                          {dict.home.industriesSolutions}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-white/40">
                          {t(current.title, locale)}
                        </p>
                      </div>
                    </div>
                    <span
                      className="shrink-0 px-2 py-0.5 font-mono text-[10px] font-semibold tabular-nums text-black"
                      style={{ background: accent }}
                    >
                      {solutions.length}
                    </span>
                  </div>
                </div>

                {/* Accordion list */}
                <ul className="ind-deep__list min-h-0 flex-1 space-y-1.5 overflow-y-auto p-2 no-scrollbar sm:p-2.5">
                  {solutions.map((s, n) => {
                    const open = openId === s.id;
                    const feats = pillarFeatures(
                      s.id,
                      s.services,
                      locale,
                      t(s.desc, locale)
                    );
                    const PillarIcon = pillarIcon(s.id, s.services);
                    const related = (s.services ?? [])
                      .map((sid) => getService(sid))
                      .filter((x): x is NonNullable<typeof x> => Boolean(x))
                      .slice(0, 3);

                    return (
                      <li key={s.id}>
                        <div
                          className={cn(
                            "ind-deep__card overflow-hidden border transition-all duration-300",
                            open
                              ? "border-white/15 bg-white/[0.07]"
                              : "border-white/[0.07] bg-white/[0.025] hover:border-white/12 hover:bg-white/[0.04]"
                          )}
                          style={
                            open
                              ? {
                                  borderColor: `${accent}45`,
                                  boxShadow: `0 0 0 1px ${accent}18, inset 3px 0 0 ${accent}`,
                                }
                              : undefined
                          }
                        >
                          <button
                            type="button"
                            onClick={() => setOpenId(open ? null : s.id)}
                            className="ind-deep__row flex w-full items-start gap-2.5 px-2.5 py-2.5 text-left sm:gap-3 sm:px-3 sm:py-3"
                            aria-expanded={open}
                          >
                            <span
                              className={cn(
                                "flex h-9 w-9 shrink-0 items-center justify-center transition-colors sm:h-10 sm:w-10",
                                open ? "text-black" : ""
                              )}
                              style={
                                open
                                  ? {
                                      background: accent,
                                      boxShadow: `0 6px 16px ${accent}40`,
                                    }
                                  : {
                                      background: `${accent}18`,
                                      color: accent,
                                      border: `1px solid ${accent}30`,
                                    }
                              }
                            >
                              <PillarIcon
                                className="h-4 w-4 sm:h-[1.1rem] sm:w-[1.1rem]"
                                strokeWidth={1.75}
                              />
                            </span>

                            <span className="min-w-0 flex-1 pt-0.5">
                              <span className="flex items-center gap-2">
                                <span
                                  className="font-mono text-[9px] font-semibold tracking-wider tabular-nums"
                                  style={{
                                    color: open
                                      ? accent
                                      : "rgba(255,255,255,0.35)",
                                  }}
                                >
                                  {String(n + 1).padStart(2, "0")}
                                </span>
                                <span
                                  className={cn(
                                    "text-[13px] font-semibold leading-snug tracking-tight sm:text-[15px]",
                                    open ? "text-white" : "text-white/82"
                                  )}
                                >
                                  {t(s.title, locale)}
                                </span>
                              </span>
                              {!open && (
                                <span className="mt-1 line-clamp-1 block text-xs leading-relaxed text-white/42 sm:text-[13px]">
                                  {t(s.desc, locale)}
                                </span>
                              )}
                            </span>

                            <span
                              className={cn(
                                "mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-white/10 text-white/45 transition-all",
                                open && "border-white/20 text-white/80"
                              )}
                              style={
                                open
                                  ? {
                                      background: `${accent}22`,
                                      borderColor: `${accent}40`,
                                      color: accent,
                                    }
                                  : undefined
                              }
                            >
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 transition-transform duration-300",
                                  open && "rotate-180"
                                )}
                              />
                            </span>
                          </button>

                          <AnimatePresence initial={false}>
                            {open && (
                              <motion.div
                                initial={
                                  reduce
                                    ? false
                                    : { height: 0, opacity: 0 }
                                }
                                animate={{ height: "auto", opacity: 1 }}
                                exit={
                                  reduce
                                    ? undefined
                                    : { height: 0, opacity: 0 }
                                }
                                transition={{ duration: 0.28, ease }}
                                className="overflow-hidden"
                              >
                                <div className="border-t border-white/[0.07] px-3 pt-2.5 pb-3 sm:px-3.5 sm:pb-3.5">
                                  <p className="text-sm leading-relaxed text-white/55">
                                    {t(s.desc, locale)}
                                  </p>

                                  {feats.length > 0 && (
                                    <ul className="mt-2.5 space-y-1.5">
                                      {feats.map((f) => (
                                        <li
                                          key={f}
                                          className="flex items-start gap-2 text-[13px] leading-snug text-white/72"
                                        >
                                          <Check
                                            className="mt-0.5 h-3.5 w-3.5 shrink-0"
                                            style={{ color: accent }}
                                            strokeWidth={2.4}
                                          />
                                          {f}
                                        </li>
                                      ))}
                                    </ul>
                                  )}

                                  {/* Service chips */}
                                  {related.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                      {related.map((svc) => {
                                        const SIcon = getIcon(svc.icon);
                                        return (
                                          <Link
                                            key={svc.slug}
                                            href={localePath(
                                              locale,
                                              `/services/${svc.slug}`
                                            )}
                                            className="ind-deep__svc group/svc inline-flex items-center gap-1.5 border bg-black/30 px-2 py-1 text-[11px] text-white/65 transition-colors hover:text-white"
                                            style={{
                                              borderColor: `${svc.color}35`,
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            <SIcon
                                              className="h-3 w-3"
                                              style={{ color: svc.color }}
                                              strokeWidth={1.75}
                                            />
                                            <span className="max-w-[6.5rem] truncate">
                                              {t(svc.title, locale)}
                                            </span>
                                          </Link>
                                        );
                                      })}
                                    </div>
                                  )}

                                  {/* CTA buttons */}
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    <Link
                                      href={localePath(
                                        locale,
                                        `/solutions/${current.slug}`
                                      )}
                                      className="inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-black transition-opacity hover:opacity-90 sm:flex-none sm:text-sm"
                                      style={{
                                        background: accent,
                                        boxShadow: `0 6px 18px ${accent}38`,
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Sparkles className="h-3.5 w-3.5" />
                                      {locale === "de"
                                        ? "Stack öffnen"
                                        : "Xem full stack"}
                                      <ArrowUpRight className="h-3.5 w-3.5" />
                                    </Link>
                                    <Link
                                      href={localePath(locale, "/contact")}
                                      className="inline-flex min-h-9 items-center justify-center gap-1.5 border border-white/14 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-white/28 hover:text-white sm:text-sm"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      {locale === "de" ? "Brief senden" : "Gửi brief"}
                                      <ArrowRight className="h-3.5 w-3.5" />
                                    </Link>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Industry swatches */}
          <div className="ind-prism__footer mt-3 shrink-0 border-t border-white/[0.08] pt-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="font-mono text-[9px] tracking-[0.16em] text-white/35 uppercase">
                {locale === "de" ? "Branchen wählen" : "Chọn ngành nghề"}
              </p>
              <p className="font-mono text-[10px] tabular-nums text-white/30">
                {String(idx + 1).padStart(2, "0")} /{" "}
                {String(industries.length).padStart(2, "0")}
              </p>
            </div>
            <nav
              className="ind-prism__swatches grid w-full gap-1.5 sm:gap-2"
              aria-label={locale === "de" ? "Branchen" : "Ngành nghề"}
              style={
                {
                  gridTemplateColumns: `repeat(${industries.length}, minmax(0, 1fr))`,
                } as CSSProperties
              }
            >
              {industries.map((ind, i) => {
                const SwIcon = getIcon(ind.icon);
                const on = ind.slug === slug;
                const col = ind.color ?? accent;
                const shortName =
                  t(ind.title, locale).split(/[|/]/)[0]?.trim() ??
                  t(ind.title, locale);
                return (
                  <button
                    key={ind.slug}
                    type="button"
                    onClick={() => setSlug(ind.slug)}
                    className={cn(
                      "ind-prism__swatch group relative flex min-h-[3.75rem] w-full min-w-0 flex-col items-center justify-center gap-0.5 border px-1 py-1.5 transition-all sm:min-h-[4.5rem] sm:gap-1 sm:px-1.5 sm:py-2 md:min-h-[4.85rem] md:px-2 md:py-2.5",
                      on
                        ? "border-white/25 bg-white/[0.1] text-white"
                        : "border-white/[0.08] bg-black/35 text-white/50 hover:border-white/18 hover:bg-white/[0.05] hover:text-white/85"
                    )}
                    style={
                      on
                        ? {
                            borderColor: `${col}70`,
                            boxShadow: `0 0 0 1px ${col}28, 0 10px 24px ${col}18`,
                          }
                        : undefined
                    }
                    aria-pressed={on}
                    title={t(ind.title, locale)}
                  >
                    <span
                      className="absolute inset-x-0 top-0 h-[3px] transition-opacity"
                      style={{
                        background: col,
                        opacity: on ? 1 : 0.35,
                      }}
                      aria-hidden
                    />
                    <span
                      className={cn(
                        "flex h-7 w-7 items-center justify-center transition-all sm:h-8 sm:w-8 md:h-9 md:w-9",
                        on ? "text-black scale-105" : "group-hover:scale-105"
                      )}
                      style={
                        on
                          ? {
                              background: col,
                              boxShadow: `0 6px 16px ${col}40`,
                            }
                          : { background: `${col}1a`, color: col }
                      }
                    >
                      <SwIcon
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                        strokeWidth={1.75}
                      />
                    </span>
                    <span
                      className="hidden font-mono text-[9px] tracking-wider tabular-nums sm:block"
                      style={{ color: on ? col : "rgba(255,255,255,0.32)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="w-full truncate px-0.5 text-center text-[9px] font-medium leading-tight sm:text-[10px] md:text-[11px]">
                      {shortName}
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

function AmbientCover({
  candidates,
  accent,
}: {
  candidates: string[];
  accent: string;
}) {
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(candidates.length === 0);
  const src = !failed && candidates[idx] ? candidates[idx] : null;

  useEffect(() => {
    setIdx(0);
    setFailed(candidates.length === 0);
  }, [candidates]);

  if (!src) {
    return (
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `linear-gradient(135deg, ${accent}40, transparent 60%)`,
        }}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={src}
      src={src}
      alt=""
      className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-sm"
      onError={() => {
        if (idx + 1 < candidates.length) setIdx((i) => i + 1);
        else setFailed(true);
      }}
    />
  );
}

function CoverImage({
  candidates,
  title,
  accent,
}: {
  candidates: string[];
  title: string;
  accent: string;
}) {
  return (
    <FallbackImage
      candidates={candidates}
      alt={title}
      className="absolute inset-0 h-full w-full object-cover"
      fallback={
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(145deg, ${accent}50, #0a1224 72%)`,
          }}
        />
      }
    />
  );
}

function FallbackImage({
  candidates,
  alt,
  className,
  fallback,
}: {
  candidates: string[];
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}) {
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(candidates.length === 0);
  const src = !failed && candidates[idx] ? candidates[idx] : null;

  useEffect(() => {
    setIdx(0);
    setFailed(candidates.length === 0);
  }, [candidates]);

  const onError = useCallback(() => {
    setIdx((i) => {
      if (i + 1 < candidates.length) return i + 1;
      setFailed(true);
      return i;
    });
  }, [candidates.length]);

  if (!src) return <>{fallback}</>;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={src}
      src={src}
      alt={alt}
      className={className}
      onError={onError}
    />
  );
}
