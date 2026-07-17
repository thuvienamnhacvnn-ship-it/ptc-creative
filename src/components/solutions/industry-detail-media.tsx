"use client";

import { useCallback, useEffect, useState } from "react";
import { FolderOpen, ImageIcon, Play } from "lucide-react";
import type { Locale } from "@/types";
import type { IndustryMediaPaths } from "@/data/industry-media";
import { cn } from "@/lib/utils";

const palettes: Record<string, string> = {
  warm: "from-amber-950 via-stone-900 to-neutral-950",
  rose: "from-rose-950 via-neutral-900 to-black",
  soft: "from-fuchsia-950 via-stone-950 to-zinc-950",
  cool: "from-sky-950 via-slate-900 to-black",
  clinical: "from-teal-950 via-slate-900 to-zinc-950",
  industrial: "from-indigo-950 via-zinc-900 to-black",
  graphite: "from-zinc-900 via-neutral-950 to-black",
};

type Props = {
  media: IndustryMediaPaths;
  title: string;
  palette: string;
  accent: string;
  locale: Locale;
  labels: { media: string; folder: string; video: string };
};

export function IndustryDetailMedia({
  media,
  title,
  palette,
  accent,
  locale,
  labels,
}: Props) {
  const [mode, setMode] = useState<"cover" | "video" | number>("cover");

  return (
    <div className="overflow-hidden border border-border bg-card">
      <div
        className={cn(
          "relative aspect-[16/10] bg-gradient-to-br",
          palettes[palette] ?? palettes.graphite
        )}
      >
        {mode === "video" ? (
          <VideoPlayer
            candidates={media.videoCandidates}
            posterCandidates={[...media.posterCandidates, ...media.coverCandidates]}
            locale={locale}
          />
        ) : (
          <Still
            candidates={
              mode === "cover"
                ? media.coverCandidates
                : media.galleryCandidates[mode] ?? media.coverCandidates
            }
            alt={title}
            folder={media.folder}
            name={mode === "cover" ? "cover" : String(Number(mode) + 1)}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        <span className="absolute left-2 top-2 border border-white/15 bg-black/50 px-1.5 py-0.5 font-mono text-[8px] tracking-wider text-white/80 uppercase">
          {labels.media}
        </span>
      </div>

      <div className="flex gap-1.5 overflow-x-auto border-t border-border p-2 no-scrollbar">
        <Thumb active={mode === "cover"} onClick={() => setMode("cover")}>
          <Mini candidates={media.coverCandidates} />
        </Thumb>
        <Thumb active={mode === "video"} onClick={() => setMode("video")}>
          <span className="flex h-full w-full items-center justify-center bg-black/40">
            <Play className="h-3.5 w-3.5 fill-current text-accent" />
          </span>
        </Thumb>
        {media.galleryCandidates.map((c, i) => (
          <Thumb key={i} active={mode === i} onClick={() => setMode(i)}>
            <Mini candidates={c} />
          </Thumb>
        ))}
      </div>

      <div className="flex items-center gap-1.5 border-t border-border px-2.5 py-2 font-mono text-[9px] text-muted">
        <FolderOpen className="h-3 w-3 shrink-0 text-accent" style={{ color: accent }} />
        <span className="truncate">
          {labels.folder}: public/{media.folder}/
        </span>
      </div>
    </div>
  );
}

function Thumb({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-12 w-16 shrink-0 overflow-hidden border",
        active ? "border-accent" : "border-border opacity-80 hover:opacity-100"
      )}
    >
      {children}
    </button>
  );
}

function Mini({ candidates }: { candidates: string[] }) {
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);
  const src = !failed ? candidates[idx] : null;
  if (!src) {
    return <span className="block h-full w-full bg-white/5" />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className="h-full w-full object-cover"
      onError={() => {
        if (idx + 1 < candidates.length) setIdx((i) => i + 1);
        else setFailed(true);
      }}
    />
  );
}

function Still({
  candidates,
  alt,
  folder,
  name,
}: {
  candidates: string[];
  alt: string;
  folder: string;
  name: string;
}) {
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(candidates.length === 0);
  const src = !failed ? candidates[idx] : null;

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

  if (!src) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-center">
        <ImageIcon className="h-7 w-7 text-white/25" />
        <p className="font-mono text-[9px] text-white/40">
          {name}.jpg
        </p>
        <p className="text-[10px] text-white/30">public/{folder}/</p>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={src}
      src={src}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover"
      onError={onError}
    />
  );
}

function VideoPlayer({
  candidates,
  posterCandidates,
  locale,
}: {
  candidates: string[];
  posterCandidates: string[];
  locale: Locale;
}) {
  const [vIdx, setVIdx] = useState(0);
  const [missing, setMissing] = useState(candidates.length === 0);
  const [pIdx, setPIdx] = useState(0);
  const src = !missing ? candidates[vIdx] : null;
  const poster = posterCandidates[pIdx];

  useEffect(() => {
    setVIdx(0);
    setMissing(candidates.length === 0);
  }, [candidates]);

  if (!src) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-3 text-center">
        <Play className="h-7 w-7 text-white/30" />
        <p className="text-[11px] text-white/50">
          {locale === "de" ? "Video folgt" : "Video sẽ gắn sau"}
        </p>
        <code className="font-mono text-[9px] text-accent">hero.mp4</code>
      </div>
    );
  }

  return (
    <video
      key={src}
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      poster={poster}
      controls
      playsInline
      muted
      onError={() => {
        if (vIdx + 1 < candidates.length) setVIdx((i) => i + 1);
        else setMissing(true);
      }}
    />
  );
}
