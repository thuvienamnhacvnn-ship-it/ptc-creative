"use client";

import {
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import type { Locale, ServiceItem } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { services } from "@/data/services";
import { getIcon } from "@/lib/icons";
import { localePath, t, tList, cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

const HOLD_MS = 5000;
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Dịch vụ — SPECTRUM layout
 * 6 dải màu dọc: inactive = rail hẹp, active = panel bung full nội dung
 * Hover gáy → title dịch vụ cỡ lớn, chếch phải phía trên layout
 */
export function HomeServices({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const previewIdx = hovered ?? active;
  const preview = services[previewIdx] ?? services[0]!;
  const previewTitle = t(preview.title, locale);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % services.length);
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  return (
    <Section
      className="home-stage-fill flex h-full min-h-0 flex-col border-0 py-0"
      contained={false}
    >
      <div
        className="svc-spectrum relative flex h-full min-h-0 w-full flex-col"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          setHovered(null);
        }}
      >
        {/* Một khung: title đầu layout + spectrum cùng trục padding */}
        <Container className="relative z-10 flex h-full min-h-0 w-full max-w-none flex-col px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <header className="relative z-[5] shrink-0">
            <div className="relative z-[2] flex items-start justify-between gap-3">
              <div className="min-w-0 max-w-[min(100%,22rem)] sm:max-w-sm lg:max-w-md">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.7)]" />
                  <p className="text-[11px] font-medium tracking-[0.22em] text-white/40 uppercase">
                    05 · {dict.nav.services}
                  </p>
                </div>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {dict.home.servicesTitle}
                </h2>
                {dict.home.servicesSubtitle && (
                  <p className="mt-1 line-clamp-2 max-w-xl text-sm leading-relaxed text-white/42 sm:text-[15px]">
                    {dict.home.servicesSubtitle}
                  </p>
                )}
              </div>
              <Link
                href={localePath(locale, "/services")}
                className="group inline-flex shrink-0 items-center gap-1.5 border border-white/12 bg-black/25 px-3 py-2 text-sm text-white/60 transition-colors hover:border-white/25 hover:text-white"
              >
                {dict.nav.allServices}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Cụm title lớn — hover gáy hiển thị ngay, chếch phải phía trên */}
            <div
              className="svc-spectrum__hero-title pointer-events-none absolute top-10 right-0 z-[1] flex max-w-[min(92%,40rem)] flex-col items-end sm:top-11 sm:max-w-[min(68%,48rem)] lg:max-w-[min(64%,52rem)]"
              aria-live="polite"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={preview.slug}
                  initial={
                    reduce
                      ? false
                      : { opacity: 0, x: 40, y: -10, rotate: 5, skewX: -3 }
                  }
                  animate={{ opacity: 1, x: 0, y: 0, rotate: -3.5, skewX: -9 }}
                  exit={
                    reduce
                      ? undefined
                      : { opacity: 0, x: 32, y: -8, rotate: -7, skewX: -12 }
                  }
                  transition={{ duration: 0.22, ease }}
                  className="svc-spectrum__hero-title-cluster relative origin-top-right text-right"
                  style={
                    {
                      ["--svc"]: preview.color,
                    } as CSSProperties
                  }
                >
                  <span className="svc-spectrum__hero-title-idx font-mono">
                    {String(previewIdx + 1).padStart(2, "0")} · SVC
                  </span>
                  {/* Ghost layer — cụm title */}
                  <span className="svc-spectrum__hero-title-ghost" aria-hidden>
                    {previewTitle}
                  </span>
                  <span className="svc-spectrum__hero-title-main">
                    {previewTitle}
                  </span>
                  <span
                    className="svc-spectrum__hero-title-rule"
                    style={{ background: preview.color }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </header>

          <div className="relative mt-3 flex min-h-0 flex-1 gap-1 sm:gap-1.5">
            {services.map((s, i) => (
              <SpectrumRail
                key={s.slug}
                service={s}
                index={i}
                active={i === active}
                locale={locale}
                reduce={!!reduce}
                onSelect={() => setActive(i)}
                onHover={() => setHovered(i)}
                onLeave={() => setHovered(null)}
                paused={paused}
              />
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
}

function SpectrumRail({
  service,
  index,
  active,
  locale,
  reduce,
  onSelect,
  onHover,
  onLeave,
  paused,
}: {
  service: ServiceItem;
  index: number;
  active: boolean;
  locale: Locale;
  reduce: boolean;
  onSelect: () => void;
  onHover: () => void;
  onLeave: () => void;
  paused: boolean;
}) {
  const Icon = getIcon(service.icon);
  const color = service.color;
  const caps = tList(service.capabilities, locale).slice(0, 3);

  return (
    <motion.button
      type="button"
      layout
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className={cn(
        "svc-spectrum__rail group relative flex min-h-0 overflow-hidden text-left outline-none",
        "focus-visible:ring-2 focus-visible:ring-white/40",
        active
          ? "svc-spectrum__rail--active flex-[3.2] sm:flex-[3.8]"
          : "flex-[0.55] sm:flex-[0.7] hover:flex-[0.9]"
      )}
      style={
        {
          ["--svc"]: color,
          ["--rail-i"]: index,
        } as CSSProperties
      }
      transition={
        reduce
          ? { duration: 0 }
          : { layout: { duration: 0.55, ease } }
      }
      aria-pressed={active}
      aria-label={t(service.title, locale)}
    >
      {/* Shine edge */}
      <span className="svc-spectrum__edge" aria-hidden />
      <span className="svc-spectrum__sheen" aria-hidden />

      {/* Background media / color */}
      <div className="absolute inset-0">
        {active ? (
          <ServiceCover service={service} />
        ) : (
          <div
            className="svc-spectrum__idle-bg absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${color}66 0%, ${color}22 40%, #060b14 100%)`,
            }}
          />
        )}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: active
              ? `linear-gradient(160deg, ${color}40 0%, transparent 40%),
                 linear-gradient(to top, #050a12f0 0%, #050a1288 35%, transparent 65%)`
              : `linear-gradient(to top, #050a12e6, transparent 55%)`,
          }}
        />
        {/* Particle dots */}
        <span className="svc-spectrum__particles" aria-hidden />
      </div>

      {/* Collapsed spine — chỉ icon; hover: icon lắc */}
      <div
        className={cn(
          "svc-spectrum__spine relative z-10 flex h-full w-full flex-col items-center",
          active && "pointer-events-none scale-95 opacity-0"
        )}
      >
        <span className="svc-spectrum__idx font-mono tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="svc-spectrum__spine-mid flex min-h-0 flex-1 flex-col items-center justify-center">
          <span className="svc-spectrum__icon-wrap" aria-hidden>
            <Icon className="svc-spectrum__icon" style={{ color }} strokeWidth={1.75} />
          </span>
        </div>

        <span
          className="svc-spectrum__dot"
          style={{ background: color }}
          aria-hidden
        />
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.4, ease, delay: 0.08 }}
            className="absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-6 lg:p-8"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="min-w-0 max-w-xl">
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-10 w-10 items-center justify-center"
                    style={{ background: `${color}30`, color }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs tracking-[0.16em] uppercase" style={{ color }}>
                    {String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
                  {t(service.title, locale)}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
                  {t(service.short, locale)}
                </p>
                <ul className="mt-3 hidden space-y-1 sm:block">
                  {caps.map((c) => (
                    <li key={c} className="flex gap-2 text-sm text-white/60">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color }} />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={localePath(locale, `/services/${service.slug}`)}
                onClick={(e) => e.stopPropagation()}
                className="svc-spectrum__cta group/cta inline-flex min-h-11 shrink-0 items-center gap-2 px-5 py-2.5 text-sm font-semibold text-black"
                style={{ background: color }}
              >
                {locale === "de" ? "Mehr erfahren" : "Xem chi tiết"}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </Link>
            </div>

            {/* Auto progress */}
            {!reduce && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
                <motion.span
                  key={`${service.slug}-${paused}`}
                  className="block h-full origin-left"
                  style={{ background: color }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: paused ? 0 : 1 }}
                  transition={{ duration: HOLD_MS / 1000, ease: "linear" }}
                />
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function ServiceCover({ service }: { service: ServiceItem }) {
  // Probe local: cover.png → cover.jpg → cover.webp → gallery
  const base = service.cover?.replace(/\.(png|jpg|jpeg|webp)$/i, "") ?? "";
  const candidates = [
    service.cover,
    base ? `${base}.png` : "",
    base ? `${base}.jpg` : "",
    base ? `${base}.jpeg` : "",
    base ? `${base}.webp` : "",
    ...(service.gallery ?? []),
  ].filter(Boolean) as string[];
  const unique = [...new Set(candidates)];
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(unique.length === 0);
  const src = !failed && unique[idx] ? unique[idx] : null;

  const onError = useCallback(() => {
    setIdx((i) => {
      if (i + 1 < unique.length) return i + 1;
      setFailed(true);
      return i;
    });
  }, [unique.length]);

  if (!src) {
    return (
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(145deg, ${service.color}50, #070c16 75%)`,
        }}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={src}
      src={src}
      alt={service.slug}
      className="absolute inset-0 h-full w-full object-cover object-center"
      onError={onError}
    />
  );
}
