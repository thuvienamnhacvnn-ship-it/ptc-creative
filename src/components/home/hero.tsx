"use client";

import { useCallback, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Sparkles,
} from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { localePath, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAi } from "@/components/providers/ai-provider";
import {
  BANNER_FALLBACK_GRADIENT,
  BANNER_SLIDES,
  type BannerSlide,
} from "@/data/banner-slides";
import { BannerFx } from "@/components/home/banner-fx";

const ease = [0.22, 1, 0.36, 1] as const;
const SLIDE_MS = 7000;

const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0, filter: "blur(8px)" },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.65, delay: 0.14 + i * 0.07, ease },
  }),
};

function useMediaResolved(slides: BannerSlide[]) {
  const [resolved, setResolved] = useState<
    Record<string, { type: "video" | "image" | "none"; src?: string }>
  >({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const next: typeof resolved = {};
      for (const s of slides) {
        if (s.video) {
          const ok = await new Promise<boolean>((resolve) => {
            const v = document.createElement("video");
            v.preload = "metadata";
            v.onloadedmetadata = () => resolve(true);
            v.onerror = () => resolve(false);
            v.src = s.video!;
          });
          if (ok) {
            next[s.id] = { type: "video", src: s.video };
            continue;
          }
        }
        if (s.image) {
          const ok = await new Promise<boolean>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = s.image!;
          });
          if (ok) {
            next[s.id] = { type: "image", src: s.image };
            continue;
          }
        }
        next[s.id] = { type: "none" };
      }
      if (!cancelled) setResolved(next);
    })();
    return () => {
      cancelled = true;
    };
  }, [slides]);

  return resolved;
}

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = dict.home;
  const { setOpen } = useAi();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const media = useMediaResolved(BANNER_SLIDES);

  const count = BANNER_SLIDES.length;
  const slide = BANNER_SLIDES[index];
  const currentMedia = media[slide.id];

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((i) => (i + dir + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (paused || reduce) return;
    const t = window.setInterval(() => go(1), SLIDE_MS);
    return () => window.clearInterval(t);
  }, [paused, reduce, go, index]);

  const titleWords = `${h.heroTitle} ${h.heroTitleAccent}`.split(" ");
  const accentSet = new Set(h.heroTitleAccent.split(" "));

  return (
    <section className="relative h-full min-h-0 w-full overflow-hidden bg-transparent text-white">
      <div className="banner-stage h-full min-h-0 w-full max-h-none">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={slide.id}
            custom={direction}
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.05, x: direction > 0 ? 36 : -36 }
            }
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.02, x: direction > 0 ? -36 : 36 }
            }
            transition={{ duration: 0.85, ease }}
            className="absolute inset-0 z-0"
          >
            {currentMedia?.type === "video" && currentMedia.src ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={currentMedia.src}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : currentMedia?.type === "image" && currentMedia.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentMedia.src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: BANNER_FALLBACK_GRADIENT }}
              />
            )}

            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(100deg, rgba(3,8,18,0.9) 0%, rgba(3,8,18,0.55) 40%, rgba(3,8,18,0.25) 72%, rgba(3,8,18,0.45) 100%), linear-gradient(180deg, rgba(3,8,18,0.35) 0%, transparent 32%, rgba(3,8,18,0.65) 100%), radial-gradient(ellipse at 68% 42%, ${slide.tint ?? "transparent"}, transparent 58%)`,
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-tech-grid-fine opacity-[0.08]" />
          </motion.div>
        </AnimatePresence>

        {/* Lớp phủ xanh đen 30% — làm tối media, nổi bật chữ + CTA */}
        <div
          className="pointer-events-none absolute inset-0 z-[15]"
          style={{ backgroundColor: "rgba(3, 10, 20, 0.3)" }}
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-0 z-30 flex flex-col">
          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-8 sm:px-8 sm:pt-10 lg:px-12 lg:pt-12">
            <div className="banner-copy group/copy pointer-events-auto max-w-[36rem] lg:max-w-[40rem]">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.45, ease }}
                className={cn(
                  "mb-3 inline-flex items-center gap-2 border border-white/12 bg-black/40 px-2.5 py-1 backdrop-blur-md sm:mb-4 sm:px-3 sm:py-1.5",
                  "transition-all duration-300",
                  "group-hover/copy:border-accent/45 group-hover/copy:bg-accent/10 group-hover/copy:shadow-[0_0_24px_rgba(255,77,0,0.15)]"
                )}
              >
                <span className="signal-dot h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover/copy:scale-125" />
                <span className="font-mono text-[9px] tracking-[0.18em] text-white/65 uppercase transition-colors duration-300 group-hover/copy:tracking-[0.22em] group-hover/copy:text-accent sm:text-[10px]">
                  {h.heroBadge}
                </span>
              </motion.div>

              <h1 className="text-[clamp(2rem,4.8vw,3.85rem)] font-semibold leading-[1.05] tracking-tight">
                <span className="sr-only">
                  {h.heroTitle} {h.heroTitleAccent}
                </span>
                <span aria-hidden className="flex flex-wrap gap-x-[0.26em] gap-y-0.5">
                  {titleWords.map((word, i) => {
                    const isAccent = accentSet.has(word);
                    return (
                      <span
                        key={`${word}-${i}`}
                        className="inline-block overflow-hidden pb-0.5"
                      >
                        <motion.span
                          custom={i}
                          variants={wordVariants}
                          initial={reduce ? false : "hidden"}
                          animate="visible"
                          whileHover={
                            reduce
                              ? undefined
                              : {
                                  y: -4,
                                  scale: 1.04,
                                  color: isAccent ? "#ff6a2e" : "#ffffff",
                                  textShadow: isAccent
                                    ? "0 0 28px rgba(255,77,0,0.55)"
                                    : "0 0 20px rgba(255,255,255,0.2)",
                                  transition: {
                                    type: "spring",
                                    stiffness: 420,
                                    damping: 22,
                                  },
                                }
                          }
                          className={cn(
                            "banner-title-word inline-block cursor-default will-change-transform",
                            "transition-[filter] duration-300",
                            isAccent
                              ? "text-accent drop-shadow-[0_0_24px_rgba(255,77,0,0.3)]"
                              : "text-white",
                            "group-hover/copy:drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]"
                          )}
                          style={
                            !reduce
                              ? { transitionDelay: `${i * 30}ms` }
                              : undefined
                          }
                        >
                          {word}
                        </motion.span>
                      </span>
                    );
                  })}
                </span>
              </h1>

              <motion.div
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.48, duration: 0.6, ease }}
                className={cn(
                  "mt-3 h-px w-14 origin-left bg-gradient-to-r from-accent to-transparent sm:mt-4 sm:w-20",
                  "transition-all duration-500 ease-out",
                  "group-hover/copy:w-28 group-hover/copy:from-accent group-hover/copy:via-accent/60 group-hover/copy:to-transparent sm:group-hover/copy:w-36"
                )}
              />

              <motion.p
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48, duration: 0.5, ease }}
                className={cn(
                  "mt-3 max-w-md text-[13px] leading-relaxed text-white/68 sm:mt-4 sm:max-w-lg sm:text-sm md:text-[15px] md:leading-relaxed",
                  "transition-all duration-300",
                  "group-hover/copy:translate-x-0.5 group-hover/copy:text-white/88"
                )}
              >
                {h.heroSubtitle}
              </motion.p>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.45, ease }}
                className="mt-5 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-2.5"
              >
                <Button
                  href={localePath(locale, "/contact")}
                  size="sm"
                  className="btn-premium group h-10 px-5 text-sm shadow-lg shadow-accent/25 transition-transform duration-300 group-hover/copy:-translate-y-0.5 sm:h-11 sm:px-6"
                >
                  {h.heroCtaPrimary}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button
                  href={localePath(locale, "/services")}
                  variant="outline"
                  size="sm"
                  className="btn-premium h-10 border-white/20 bg-white/[0.04] px-4 text-sm text-white backdrop-blur-sm transition-transform duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent group-hover/copy:-translate-y-0.5 sm:h-11 sm:px-5"
                >
                  {h.heroCtaSecondary}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="btn-premium h-10 px-3 text-sm text-white/75 transition-transform duration-300 hover:bg-white/10 hover:text-white group-hover/copy:-translate-y-0.5 sm:h-11"
                  onClick={() => setOpen(true)}
                >
                  <Sparkles className="h-3.5 w-3.5 text-accent transition-transform duration-300 group-hover/copy:rotate-12" />
                  {h.heroCtaAi}
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="pointer-events-auto mx-auto w-full max-w-7xl px-5 pb-4 sm:px-8 sm:pb-5 lg:px-12 lg:pb-6">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.4 }}
              className="flex items-end justify-between gap-4 border-t border-white/10 pt-3 sm:pt-4"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[9px] tracking-[0.16em] text-white/40 uppercase sm:text-[10px]">
                    {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                  </span>
                  {slide.label && (
                    <span className="border border-white/12 bg-black/35 px-2 py-0.5 font-mono text-[9px] tracking-wider text-white/55 uppercase">
                      {slide.label[locale]}
                    </span>
                  )}
                </div>
                <div className="flex max-w-xs gap-1.5 sm:max-w-sm">
                  {BANNER_SLIDES.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-label={`Slide ${i + 1}`}
                      onClick={() => {
                        setDirection(i > index ? 1 : -1);
                        setIndex(i);
                      }}
                      className="relative h-0.5 flex-1 overflow-hidden bg-white/15 transition-colors hover:bg-white/25"
                    >
                      <motion.span
                        className="absolute inset-y-0 left-0 bg-accent"
                        initial={false}
                        animate={{
                          width: i === index ? "100%" : i < index ? "100%" : "0%",
                          opacity: i === index || i < index ? 1 : 0.35,
                        }}
                        transition={
                          i === index && !paused && !reduce
                            ? { duration: SLIDE_MS / 1000, ease: "linear" }
                            : { duration: 0.35 }
                        }
                        key={`${s.id}-${index}-${paused}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => go(-1)}
                  className="flex h-9 w-9 items-center justify-center border border-white/15 bg-black/40 text-white/75 backdrop-blur-sm transition-all duration-200 hover:border-accent/60 hover:bg-accent/10 hover:text-accent sm:h-10 sm:w-10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label={paused ? "Play" : "Pause"}
                  onClick={() => setPaused((p) => !p)}
                  className="flex h-9 w-9 items-center justify-center border border-white/15 bg-black/40 text-white/75 backdrop-blur-sm transition-all duration-200 hover:border-accent/60 hover:bg-accent/10 hover:text-accent sm:h-10 sm:w-10"
                >
                  {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => go(1)}
                  className="flex h-9 w-9 items-center justify-center border border-white/15 bg-black/40 text-white/75 backdrop-blur-sm transition-all duration-200 hover:border-accent/60 hover:bg-accent/10 hover:text-accent sm:h-10 sm:w-10"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        <BannerFx reduceMotion={reduce} locale={locale} />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[45] h-px bg-gradient-to-r from-transparent via-accent/55 to-transparent" />
      </div>

      <div className="border-b border-border bg-[#0a1220]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8">
          {[
            { v: "200+", l: h.statsProjects },
            { v: "7+", l: h.statsIndustries },
            { v: "8+", l: h.statsYears },
            { v: "150+", l: h.statsClients },
          ].map((s) => (
            <div key={s.l} className="flex items-baseline gap-2">
              <span className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                {s.v}
              </span>
              <span className="font-mono text-[10px] tracking-wide text-muted uppercase">
                {s.l}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
