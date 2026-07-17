"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Maximize2,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { services } from "@/data/services";
import {
  SERVICE_VIDEO_TOPICS,
  getTopicBySlug,
  resolveTopicMedia,
} from "@/data/service-videos";
import { localePath, t, cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { GridSpace3D } from "@/components/home/grid-space-3d";

export function ServiceEcosystem({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [active, setActive] = useState(SERVICE_VIDEO_TOPICS[0].slug);
  const current = services.find((s) => s.slug === active) ?? services[0];
  const topic = getTopicBySlug(active);

  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [media, setMedia] = useState<{ video?: string; poster?: string }>({});
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setPlaying(true);
    (async () => {
      const resolved = await resolveTopicMedia(getTopicBySlug(active));
      if (!cancelled) {
        setMedia(resolved);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [active]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !media.video) return;
    el.muted = muted;
    if (playing) void el.play().catch(() => setPlaying(false));
    else el.pause();
  }, [media.video, playing, muted, active]);

  const togglePlay = () => setPlaying((p) => !p);
  const toggleMute = () => setMuted((m) => !m);

  const fullscreen = () => {
    const node = stageRef.current;
    if (!node) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void node.requestFullscreen?.();
    }
  };

  const activeIndex = SERVICE_VIDEO_TOPICS.findIndex((x) => x.slug === active);

  return (
    <Section id="ecosystem" className="border-b border-border" contained={false}>
      <Container>
        {/* Single cinema frame: header + video + topic bar */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden border border-border bg-[#04080f] shadow-craft"
        >
          {/* ── Header bar ── */}
          <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#060b14]/95 px-3 py-2.5 sm:px-4">
            {/* Left: compact title */}
            <div className="min-w-0">
              <p className="font-mono text-[9px] tracking-[0.16em] text-accent uppercase">
                01
              </p>
              <h2 className="truncate text-sm font-semibold tracking-tight text-white sm:text-[15px]">
                {dict.home.ecosystemTitle}
              </h2>
            </div>

            {/* Right: video helpers */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
              <span className="mr-1 hidden font-mono text-[10px] text-white/35 sm:inline">
                {String(activeIndex + 1).padStart(2, "0")}/06
              </span>

              {media.video && (
                <>
                  <HeaderBtn
                    label={playing ? "Pause" : "Play"}
                    onClick={togglePlay}
                  >
                    {playing ? (
                      <Pause className="h-3.5 w-3.5" />
                    ) : (
                      <Play className="h-3.5 w-3.5" />
                    )}
                  </HeaderBtn>
                  <HeaderBtn
                    label={muted ? "Unmute" : "Mute"}
                    onClick={toggleMute}
                  >
                    {muted ? (
                      <VolumeX className="h-3.5 w-3.5" />
                    ) : (
                      <Volume2 className="h-3.5 w-3.5" />
                    )}
                  </HeaderBtn>
                </>
              )}

              <HeaderBtn label="Fullscreen" onClick={fullscreen}>
                <Maximize2 className="h-3.5 w-3.5" />
              </HeaderBtn>

              <Link
                href={localePath(locale, `/services/${current.slug}`)}
                className="ml-0.5 hidden items-center gap-1 border border-white/15 px-2.5 py-1.5 text-[11px] font-medium text-white/75 transition-colors hover:border-accent hover:text-accent sm:inline-flex"
              >
                {dict.common.learnMore}
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* ── Video stage ── */}
          <div ref={stageRef} className="relative aspect-[16/9] w-full overflow-hidden bg-[#02060d]">
            {/* 3D black + blue grid space (always behind media) */}
            <GridSpace3D dense glow floor />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 z-[1]"
              >
                {loading && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="h-7 w-7 animate-spin border border-[rgba(100,160,255,0.25)] border-t-accent" />
                  </div>
                )}

                {!loading && media.video ? (
                  <video
                    ref={videoRef}
                    key={media.video}
                    className="h-full w-full object-cover"
                    src={media.video}
                    poster={media.poster}
                    autoPlay
                    muted={muted}
                    loop
                    playsInline
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                  />
                ) : !loading && media.poster ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={media.poster}
                    alt={t(current.title, locale)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  !loading && (
                    <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
                      <p className="font-mono text-[10px] tracking-[0.22em] text-[rgba(120,180,255,0.55)] uppercase">
                        {topic.code} · 3D SPACE
                      </p>
                      <p className="mt-2 text-base font-semibold tracking-tight text-white/85">
                        {t(current.title, locale)}
                      </p>
                      <p className="mt-2 font-mono text-[10px] text-white/30">
                        /media/services/{topic.folder}/intro.mp4
                      </p>
                    </div>
                  )
                )}

                {(media.video || media.poster) && (
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Soft caption on video */}
            <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-10 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active + "-cap"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-md"
                >
                  <p className="font-mono text-[9px] tracking-[0.16em] text-accent uppercase">
                    {topic.code}
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {t(current.title, locale)}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-white/55">
                    {t(current.short, locale)}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Bottom menu: 6 topics evenly spaced ── */}
          <nav
            className="grid grid-cols-3 border-t border-white/10 bg-[#060b14] sm:grid-cols-6"
            role="tablist"
            aria-label={dict.home.ecosystemSelect}
          >
            {SERVICE_VIDEO_TOPICS.map((topicItem, idx) => {
              const svc = services.find((s) => s.slug === topicItem.slug);
              const isActive = topicItem.slug === active;
              return (
                <button
                  key={topicItem.slug}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(topicItem.slug)}
                  className={cn(
                    "relative flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 border-white/10 px-1 py-2.5 text-center transition-colors sm:min-h-[3.5rem] sm:px-2",
                    idx % 3 !== 2 && "border-r sm:border-r",
                    idx < 3 && "border-b sm:border-b-0",
                    // equal vertical dividers on sm+
                    "sm:border-b-0",
                    idx !== SERVICE_VIDEO_TOPICS.length - 1 && "sm:border-r",
                    isActive
                      ? "bg-white/[0.06] text-white"
                      : "text-white/45 hover:bg-white/[0.03] hover:text-white/80"
                  )}
                >
                  {isActive && (
                    <span className="absolute inset-x-0 top-0 h-0.5 bg-accent" />
                  )}
                  <span
                    className={cn(
                      "font-mono text-[9px] tracking-[0.12em]",
                      isActive ? "text-accent" : "text-white/30"
                    )}
                  >
                    {topicItem.code}
                  </span>
                  <span
                    className={cn(
                      "max-w-full truncate text-[10px] font-medium leading-tight sm:text-[11px]",
                      isActive && "text-white"
                    )}
                  >
                    {svc ? t(svc.title, locale) : topicItem.code}
                  </span>
                </button>
              );
            })}
          </nav>
        </motion.div>

        {/* Mobile learn more */}
        <div className="mt-3 flex justify-end sm:hidden">
          <Link
            href={localePath(locale, `/services/${current.slug}`)}
            className="inline-flex items-center gap-1 text-xs font-medium text-accent"
          >
            {dict.common.learnMore}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}

function HeaderBtn({
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
      aria-label={label}
      title={label}
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center border border-white/12 text-white/65 transition-colors hover:border-accent/50 hover:text-accent"
    >
      {children}
    </button>
  );
}
