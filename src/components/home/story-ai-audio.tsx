"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Pause, Sparkles, Volume2, VolumeX } from "lucide-react";
import type { Locale } from "@/types";
import { getStoryAudio } from "@/data/story-audio";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "playing" | "paused" | "missing" | "error";

type Props = {
  locale: Locale;
  labels: {
    play: string;
    pause: string;
    listening: string;
    missing: string;
    error: string;
  };
  /** Icon-only with attention pulse (default true for story frame) */
  iconOnly?: boolean;
  className?: string;
};

/**
 * AI Audio — single attention icon, plays local /media/story/story-{locale}.*
 */
export function StoryAiAudio({
  locale,
  labels,
  iconOnly = true,
  className,
}: Props) {
  const cfg = getStoryAudio(locale);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [srcIndex, setSrcIndex] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);

  const src = cfg.candidates[srcIndex] ?? cfg.primary;

  useEffect(() => {
    const el = new Audio();
    el.preload = "metadata";
    el.src = src;
    audioRef.current = el;

    const onTime = () => {
      if (!el.duration || Number.isNaN(el.duration)) return;
      setProgress(el.currentTime / el.duration);
    };
    const onEnded = () => {
      setStatus("idle");
      setProgress(0);
    };
    const onPlay = () => setStatus("playing");
    const onPause = () => {
      if (!el.ended && el.currentTime > 0) setStatus("paused");
    };
    const onError = () => {
      setSrcIndex((i) => {
        if (i + 1 < cfg.candidates.length) return i + 1;
        setStatus("missing");
        return i;
      });
    };

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnded);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("error", onError);

    return () => {
      el.pause();
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("error", onError);
      el.src = "";
      audioRef.current = null;
    };
  }, [src, cfg.candidates.length]);

  useEffect(() => {
    setSrcIndex(0);
    setStatus("idle");
    setProgress(0);
  }, [locale]);

  const toggle = useCallback(async () => {
    const el = audioRef.current;
    if (!el || status === "missing" || status === "error") return;

    if (status === "playing") {
      el.pause();
      setStatus("paused");
      return;
    }

    setStatus("loading");
    try {
      await el.play();
      setStatus("playing");
    } catch {
      if (srcIndex + 1 < cfg.candidates.length) {
        setSrcIndex((i) => i + 1);
        setStatus("idle");
      } else {
        setStatus("missing");
      }
    }
  }, [status, srcIndex, cfg.candidates.length]);

  const isMissing = status === "missing" || status === "error";
  const isPlaying = status === "playing";
  const isLoading = status === "loading";
  const attention = !isPlaying && !isLoading && !isMissing;

  const title =
    isMissing
      ? labels.missing
      : isPlaying
        ? labels.pause
        : isLoading
          ? labels.listening
          : labels.play;

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isMissing}
      aria-pressed={isPlaying}
      aria-label={title}
      title={title}
      className={cn(
        "story-ai-audio relative flex shrink-0 items-center justify-center",
        "h-11 w-11 sm:h-12 sm:w-12",
        "border transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isPlaying
          ? "story-ai-audio--playing border-accent bg-accent text-white shadow-[0_0_28px_rgba(255,77,0,0.45)]"
          : isMissing
            ? "cursor-not-allowed border-white/15 bg-black/40 text-white/35"
            : "border-accent/50 bg-black/55 text-accent backdrop-blur-md hover:border-accent hover:bg-accent hover:text-white",
        className
      )}
    >
      {/* Attention rings — idle only */}
      {attention && (
        <>
          <span className="story-ai-ping pointer-events-none absolute inset-0 border border-accent/60" />
          <span className="story-ai-ping story-ai-ping-delay pointer-events-none absolute inset-0 border border-accent/40" />
          <span className="story-ai-glow pointer-events-none absolute -inset-3 rounded-full bg-accent/30 blur-md" />
          <span className="story-ai-spotlight-ring" />
          <span className="story-ai-spotlight-ring story-ai-spotlight-ring-2" />
        </>
      )}

      {/* Playing pulse ring */}
      {isPlaying && (
        <span className="pointer-events-none absolute -inset-1 border border-accent/50 story-ai-playing-ring" />
      )}

      {/* Badge notification dot */}
      {attention && (
        <span className="absolute -right-1 -top-1 z-[3] flex h-4 w-4 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-80" />
          <span className="relative flex h-2.5 w-2.5 items-center justify-center rounded-full bg-accent text-[7px] font-bold text-white ring-2 ring-[#060b14]">
            !
          </span>
        </span>
      )}

      {/* Sparkle mark */}
      {!isMissing && (
        <Sparkles
          className={cn(
            "absolute -left-1 -top-1 z-[2] h-3.5 w-3.5 drop-shadow-[0_0_6px_rgba(255,77,0,0.8)]",
            isPlaying ? "text-white" : "text-accent"
          )}
        />
      )}

      <span className="relative z-[1]">
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : isPlaying ? (
          <Pause className="h-5 w-5 fill-current" />
        ) : isMissing ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5 drop-shadow-[0_0_8px_rgba(255,77,0,0.5)]" />
        )}
      </span>

      {/* Tiny progress arc at bottom */}
      {(isPlaying || status === "paused") && (
        <span className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-black/30">
          <span
            className="block h-full bg-white/90 transition-[width] duration-150 ease-linear"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </span>
      )}

      {!iconOnly && (
        <span className="sr-only">{title}</span>
      )}
    </button>
  );
}
