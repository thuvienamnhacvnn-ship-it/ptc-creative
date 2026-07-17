"use client";

import { useCallback, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { STORY_FOUNDERS_PHOTO } from "@/data/story-media";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { StoryAiAudio } from "@/components/home/story-ai-audio";

const ease = [0.22, 1, 0.36, 1] as const;

const CHAPTERS = {
  vi: [
    { tag: "01", title: "Khoảng trống", sub: "Thị trường rời rạc" },
    { tag: "02", title: "Ba người", sub: "Bau · Tech · Visual" },
    { tag: "03", title: "Hạt giống", sub: "Precision · Technology · Creative" },
    { tag: "04", title: "Hôm nay", sub: "Platform Berlin" },
  ],
  de: [
    { tag: "01", title: "Marktlücke", sub: "Zersplitterte Anbieter" },
    { tag: "02", title: "Drei Gründer", sub: "Bau · Tech · Visual" },
    { tag: "03", title: "Ursprung", sub: "Precision · Technology · Creative" },
    { tag: "04", title: "Heute", sub: "Platform Berlin" },
  ],
} as const;

/** Palette gáy — content + filler */
const TONES = [
  { base: "#2a1f16", mid: "#3d2e20", top: "#52402c" },
  { base: "#1c2834", mid: "#2a3a4a", top: "#3a4e62" },
  { base: "#261c22", mid: "#3a2a32", top: "#4e3a44" },
  { base: "#1c2822", mid: "#2a3a32", top: "#3a4e44" },
  { base: "#2c2418", mid: "#403428", top: "#544838" },
  { base: "#222028", mid: "#322e3a", top: "#423e4e" },
  { base: "#1e2420", mid: "#2e3630", top: "#3e4a42" },
  { base: "#2a221c", mid: "#3c3028", top: "#4e4034" },
] as const;

type ShelfItem =
  | { kind: "content"; chapterIndex: number; tone: number; h: number }
  | { kind: "filler"; tone: number; h: number; w: number };

/**
 * Kệ chuẩn: filler xen kẽ content
 * f · 01 · f · 02 · f · 03 · f · 04 · f
 */
function buildShelf(): ShelfItem[] {
  /* Gáy lớn hơn — vẫn tỉ lệ kệ sách thật */
  const heights = [112, 124, 104, 130, 116, 122, 108, 128, 118];
  const fillers = [14, 16, 13, 15, 14];
  const items: ShelfItem[] = [];
  let t = 0;
  for (let i = 0; i < 4; i++) {
    items.push({
      kind: "filler",
      tone: t++ % TONES.length,
      h: heights[(i * 2) % heights.length]!,
      w: fillers[i]!,
    });
    items.push({
      kind: "content",
      chapterIndex: i,
      tone: t++ % TONES.length,
      h: heights[(i * 2 + 1) % heights.length]! + 8,
    });
  }
  items.push({
    kind: "filler",
    tone: t % TONES.length,
    h: heights[8]!,
    w: fillers[4]!,
  });
  return items;
}

/**
 * Câu chuyện PTC
 * · 2 cột cân (vuông góc)
 * · Text thu gọn (measure)
 * · Kệ sách tiêu chuẩn: gáy nhỏ, filler xen kẽ
 */
export function HomeStory({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const s = dict.home.story;
  const reduce = useReducedMotion();
  const chapters = CHAPTERS[locale] ?? CHAPTERS.vi;
  const body = [s.p1, s.p2, s.p3, s.p4];
  const [active, setActive] = useState(0);
  const chapter = chapters[active] ?? chapters[0];
  const text = body[active] ?? body[0];
  const shelf = useMemo(() => buildShelf(), []);

  const titleParts = s.title.trim().split(/\s+/);
  const titleTail = titleParts.pop() ?? "";
  const titleHead = titleParts.join(" ");

  return (
    <Section
      className="home-stage-fill flex h-full min-h-0 flex-col border-0 py-0"
      contained={false}
    >
      <Container className="flex h-full min-h-0 w-full max-w-none flex-col px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
        <div className="story-atelier relative flex min-h-0 flex-1 flex-col">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute left-[8%] top-[12%] h-36 w-36 rounded-full bg-amber-500/[0.05] blur-3xl" />
            <div className="absolute bottom-[10%] right-[15%] h-40 w-40 rounded-full bg-orange-600/[0.04] blur-3xl" />
          </div>

          {/* Meta */}
          <div className="relative z-10 mb-3 flex shrink-0 items-center justify-between gap-3 sm:mb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.24em] text-amber-300/80 uppercase">
                01
              </span>
              <span className="h-3 w-px bg-white/15" />
              <span className="font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">
                {locale === "de" ? "Origin" : "Câu chuyện"}
              </span>
              <span className="hidden font-mono text-[10px] text-white/25 sm:inline">
                · Berlin
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden font-mono text-[10px] tabular-nums text-white/30 sm:inline">
                <span className="text-amber-300/85">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="text-white/20"> — 04</span>
              </span>
              <StoryAiAudio
                locale={locale}
                iconOnly
                className="story-ai-audio--spotlight scale-90"
                labels={{
                  play: s.audioPlay,
                  pause: s.audioPause,
                  listening: s.audioListening,
                  missing: s.audioMissing,
                  error: s.audioError,
                }}
              />
            </div>
          </div>

          {/*
            Ảnh founders full-height (kích thước lớn như trước)
            + nội dung sát bên — gap nhỏ, cân 2 bên
          */}
          <div className="relative z-10 grid min-h-0 flex-1 grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-5 xl:gap-6">
            {/* Ảnh 3 founders — full cột trái, full chiều cao stage */}
            <figure className="story-atelier__photo group/photo relative min-h-[280px] overflow-hidden sm:min-h-[340px] lg:min-h-0 lg:h-full">
              <FoundersPhoto
                alt={
                  locale === "de"
                    ? "Die drei Gründer von PTC Creative"
                    : "Ba nhà sáng lập PTC Creative"
                }
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-black/85 via-black/35 to-transparent px-5 pb-5 pt-16 sm:px-6 sm:pb-6 sm:pt-20">
                <p className="font-mono text-[10px] tracking-[0.2em] text-amber-200/75 uppercase sm:text-[11px]">
                  Founders · Berlin
                </p>
                <p className="mt-1.5 text-base font-semibold tracking-wide text-white sm:text-lg">
                  Mr. Phú · Mr. Tuyên · Mr. Chung
                </p>
              </figcaption>
            </figure>

            {/* Cột phải — sát banner */}
            <div className="flex min-h-0 min-w-0 flex-col justify-center">
              <div className="story-atelier__panel flex h-full min-h-0 w-full max-w-xl flex-col xl:max-w-2xl">
                {/* Text block */}
                <header className="shrink-0">
                  <h2 className="text-balance text-[clamp(1.55rem,2.6vw,2.15rem)] font-semibold leading-[1.12] tracking-tight text-[#f4ebe0]">
                    {titleHead}{" "}
                    <span className="text-amber-400/95">{titleTail}</span>
                  </h2>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-white/50 sm:text-[15px] sm:leading-relaxed">
                    {s.lead}
                  </p>
                </header>

                <div className="mt-5 min-h-0 flex-1 border-t border-white/[0.08] pt-4">
                  <AnimatePresence mode="wait">
                    <motion.article
                      key={active}
                      initial={reduce ? false : { opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -3 }}
                      transition={{ duration: 0.26, ease }}
                      className="flex h-full min-h-0 flex-col"
                    >
                      <div className="mb-2 flex items-center gap-2.5">
                        <span className="font-mono text-[11px] tracking-[0.18em] text-amber-400/85 uppercase">
                          {chapter.tag}
                        </span>
                        <span className="h-px w-5 bg-amber-400/30" />
                        <span className="truncate font-mono text-[10px] tracking-wider text-white/30 uppercase">
                          {chapter.sub}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold tracking-tight text-[#f4ebe0] sm:text-xl">
                        {chapter.title}
                      </h3>
                      <p className="mt-2.5 min-h-0 flex-1 overflow-y-auto text-[14px] leading-[1.72] text-white/60 no-scrollbar sm:text-[15px] sm:leading-[1.75]">
                        {text}
                      </p>
                    </motion.article>
                  </AnimatePresence>
                </div>

                {/* Kệ sách — khu vực lớn hơn */}
                <div className="mt-5 shrink-0">
                  <p className="mb-2.5 font-mono text-[9px] tracking-[0.18em] text-white/35 uppercase sm:text-[10px]">
                    {locale === "de" ? "Kapitel wählen" : "Chọn chương"}
                  </p>

                  <div className="story-bookshelf">
                    <nav
                      className="story-bookshelf__row relative z-[1] flex items-end justify-center gap-1 sm:gap-1.5"
                      aria-label={locale === "de" ? "Kapitel" : "Chương"}
                    >
                      {shelf.map((item, idx) => {
                        const tone = TONES[item.tone] ?? TONES[0];
                        if (item.kind === "filler") {
                          return (
                            <span
                              key={`f-${idx}`}
                              aria-hidden
                              className="story-book-spine story-book-spine--filler relative shrink-0 overflow-hidden"
                              style={{
                                width: `${item.w}px`,
                                height: `${item.h}px`,
                                background: `linear-gradient(180deg, ${tone.mid} 0%, ${tone.base} 100%)`,
                              }}
                            >
                              <span className="absolute inset-y-0 left-0 w-[35%] bg-gradient-to-r from-white/[0.08] to-transparent" />
                              <span className="absolute inset-x-0 top-[18%] h-px bg-white/[0.06]" />
                              <span className="absolute inset-x-0 bottom-[14%] h-px bg-white/[0.05]" />
                            </span>
                          );
                        }

                        const c = chapters[item.chapterIndex]!;
                        const on = active === item.chapterIndex;
                        return (
                          <button
                            key={c.tag}
                            type="button"
                            onClick={() => setActive(item.chapterIndex)}
                            aria-pressed={on}
                            aria-label={`${c.tag} ${c.title}`}
                            title={c.title}
                            className={cn(
                              "story-book-spine story-book-spine--content group relative flex shrink-0 flex-col items-center overflow-hidden transition-transform duration-200 ease-out",
                              on
                                ? "z-[2] -translate-y-1.5"
                                : "hover:-translate-y-1"
                            )}
                            style={{
                              width: on ? 36 : 32,
                              height: on ? item.h + 10 : item.h,
                              background: on
                                ? `linear-gradient(180deg, ${tone.top} 0%, ${tone.mid} 50%, ${tone.base} 100%)`
                                : `linear-gradient(180deg, ${tone.mid} 0%, ${tone.base} 100%)`,
                              boxShadow: on
                                ? "0 8px 18px rgba(0,0,0,0.4), 0 0 0 1px rgba(251,191,36,0.35)"
                                : "0 4px 10px rgba(0,0,0,0.28), inset 0 0 0 1px rgba(255,255,255,0.05)",
                            }}
                          >
                            <span className="pointer-events-none absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-white/[0.1] to-transparent" />
                            <span
                              className={cn(
                                "relative z-[1] mt-2 font-mono text-[9px] font-medium tracking-wider sm:text-[10px]",
                                on ? "text-white/90" : "text-white/40"
                              )}
                            >
                              {c.tag}
                            </span>
                            <span
                              className={cn(
                                "relative z-[1] mt-1.5 flex flex-1 items-center justify-center pb-2",
                                on
                                  ? "text-[#fff8ee]"
                                  : "text-white/60 group-hover:text-white/80"
                              )}
                            >
                              <span className="story-book-spine__label text-[11px] font-semibold leading-none tracking-wide sm:text-xs">
                                {c.title}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </nav>
                    <div className="story-bookshelf__ledge" aria-hidden />
                  </div>

                  {/* Bảng tên nhân vật — lớn hơn */}
                  <ul className="mt-4 grid grid-cols-3 gap-2 border-t border-white/[0.08] pt-4 sm:gap-2.5">
                    {s.pillars.map((p) => (
                      <li
                        key={p.label}
                        className="border border-white/[0.08] bg-white/[0.03] px-2.5 py-2.5 text-center sm:px-3 sm:py-3"
                      >
                        <p className="font-mono text-[9px] tracking-[0.14em] text-amber-400/80 uppercase sm:text-[10px]">
                          {p.label}
                        </p>
                        <p className="mt-1 truncate text-[12px] font-semibold text-white/75 sm:text-[13px]">
                          {p.value}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function useFallbackSrc(candidates: readonly string[]) {
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(candidates.length === 0);
  const src = !failed && candidates[idx] ? candidates[idx] : null;

  const onError = useCallback(() => {
    setIdx((i) => {
      if (i + 1 < candidates.length) return i + 1;
      setFailed(true);
      return i;
    });
  }, [candidates.length]);

  return { src, onError, failed };
}

function FoundersPhoto({ alt }: { alt: string }) {
  const base = useFallbackSrc(STORY_FOUNDERS_PHOTO.baseCandidates);
  const hover = useFallbackSrc(STORY_FOUNDERS_PHOTO.hoverCandidates);

  return (
    <>
      <div className="absolute inset-0 bg-[#0c0907]" />
      {base.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={base.src}
          src={base.src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover object-center"
          onError={base.onError}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex -space-x-2">
            {["PH", "TY", "CH"].map((ini) => (
              <span
                key={ini}
                className="flex h-11 w-11 items-center justify-center border border-white/12 bg-black/40 text-[11px] font-semibold text-white/80"
              >
                {ini}
              </span>
            ))}
          </div>
        </div>
      )}
      {hover.src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={hover.src}
          src={hover.src}
          alt=""
          aria-hidden
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-center",
            "opacity-0 transition-opacity duration-500 ease-out",
            "group-hover/photo:opacity-100"
          )}
          onError={hover.onError}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/25" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.08]" />
    </>
  );
}
