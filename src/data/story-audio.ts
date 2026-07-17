import type { Locale } from "@/types";

/**
 * AI voice narration for "Câu chuyện PTC".
 * File local: public/media/story/Story.mp3
 *
 * Optional renames / extras (fallback order):
 *   Story.mp3 · story.mp3 · story-vi.mp3 · story-de.mp3
 *   + .m4a / .ogg / .wav
 */
const SHARED_CANDIDATES = [
  "/media/story/Story.mp3",
  "/media/story/story.mp3",
  "/media/story/Story.m4a",
  "/media/story/story.m4a",
  "/media/story/Story.ogg",
  "/media/story/story.ogg",
  "/media/story/Story.wav",
  "/media/story/story.wav",
] as const;

export const STORY_AUDIO: Record<
  Locale,
  { primary: string; candidates: string[]; label: string }
> = {
  vi: {
    primary: "/media/story/Story.mp3",
    candidates: [
      ...SHARED_CANDIDATES,
      "/media/story/story-vi.mp3",
      "/media/story/story-vi.m4a",
      "/media/story/story-vi.ogg",
      "/media/story/story-vi.wav",
    ],
    label: "AI Voice · VI",
  },
  de: {
    primary: "/media/story/Story.mp3",
    candidates: [
      "/media/story/story-de.mp3",
      "/media/story/story-de.m4a",
      "/media/story/story-de.ogg",
      "/media/story/story-de.wav",
      ...SHARED_CANDIDATES,
    ],
    label: "AI Voice · DE",
  },
};

export function getStoryAudio(locale: Locale) {
  return STORY_AUDIO[locale] ?? STORY_AUDIO.vi;
}
