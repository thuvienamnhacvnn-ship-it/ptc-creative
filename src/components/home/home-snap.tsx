"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Boxes,
  CircleHelp,
  Factory,
  Home,
  Images,
  Layers,
  Mail,
  Newspaper,
  Rocket,
  Users,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type HomeTheme =
  | "hero"
  | "story"
  | "team"
  | "process"
  | "services"
  | "solutions"
  | "portfolio"
  | "pricing"
  | "blog"
  | "faq"
  | "contact"
  | "cta";

const THEME_LABEL: Record<HomeTheme, { vi: string; de: string }> = {
  hero: { vi: "Home", de: "Home" },
  story: { vi: "Câu chuyện", de: "Story" },
  team: { vi: "Nhân sự", de: "Team" },
  process: { vi: "Quy trình", de: "Prozess" },
  services: { vi: "Dịch vụ", de: "Leistungen" },
  solutions: { vi: "Giải pháp", de: "Lösungen" },
  portfolio: { vi: "Portfolio", de: "Portfolio" },
  pricing: { vi: "Bảng giá", de: "Preise" },
  blog: { vi: "Blog", de: "Blog" },
  faq: { vi: "FAQ", de: "FAQ" },
  contact: { vi: "Liên hệ", de: "Kontakt" },
  cta: { vi: "Bắt đầu", de: "Start" },
};

/** Tech rail icons per section */
const THEME_ICON: Record<HomeTheme, LucideIcon> = {
  hero: Home,
  story: BookOpen,
  team: Users,
  process: Factory,
  services: Layers,
  solutions: Boxes,
  portfolio: Images,
  pricing: Wallet,
  blog: Newspaper,
  faq: CircleHelp,
  contact: Mail,
  cta: Rocket,
};

const WHEEL_LOCK_MS = 900;
const TOUCH_LOCK_MS = 700;
const WHEEL_THRESHOLD = 18;

function isScrollableEl(el: HTMLElement) {
  const style = window.getComputedStyle(el);
  const oy = style.overflowY;
  if (oy !== "auto" && oy !== "scroll" && oy !== "overlay") return false;
  return el.scrollHeight > el.clientHeight + 2;
}

/** Nested scrollable inside a section that can still move in `dir` (+1 down / -1 up) */
function nestedCanScroll(target: EventTarget | null, dir: 1 | -1): boolean {
  let node = target instanceof HTMLElement ? target : null;
  while (node && !node.classList?.contains("home-snap-section")) {
    if (isScrollableEl(node)) {
      const max = node.scrollHeight - node.clientHeight;
      if (dir > 0 && node.scrollTop < max - 1) return true;
      if (dir < 0 && node.scrollTop > 1) return true;
    }
    node = node.parentElement;
  }
  return false;
}

/**
 * Full-page snap root:
 * - Dedicated scroller (not window) so snap never “trượt” giữa 2 section
 * - Wheel / keys / touch: 1 gesture = đúng 1 section, có lock
 */
export function HomeSnapRoot({
  children,
  locale = "vi",
  sections,
}: {
  children: ReactNode;
  locale?: "vi" | "de";
  sections: { id: string; theme: HomeTheme }[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const lockRef = useRef(false);
  const touchY = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const count = sections.length;

  const setIndex = useCallback(
    (next: number, behavior: ScrollBehavior = "smooth") => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const clamped = Math.max(0, Math.min(count - 1, next));
      indexRef.current = clamped;
      setActive(clamped);
      const top = clamped * scroller.clientHeight;
      scroller.scrollTo({ top, behavior });
    },
    [count]
  );

  const lock = useCallback((ms: number) => {
    lockRef.current = true;
    window.setTimeout(() => {
      lockRef.current = false;
    }, ms);
  }, []);

  /** Sync index + hard-align to exact frame (no half-page) */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let raf = 0;
    let settleTimer = 0;

    const alignExact = () => {
      const h = scroller.clientHeight || 1;
      const i = Math.round(scroller.scrollTop / h);
      const clamped = Math.max(0, Math.min(count - 1, i));
      const target = clamped * h;
      indexRef.current = clamped;
      setActive(clamped);
      if (Math.abs(scroller.scrollTop - target) > 1) {
        scroller.scrollTo({ top: target, behavior: "auto" });
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = scroller.clientHeight || 1;
        const i = Math.round(scroller.scrollTop / h);
        const clamped = Math.max(0, Math.min(count - 1, i));
        if (clamped !== indexRef.current) {
          indexRef.current = clamped;
          setActive(clamped);
        }
      });
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(alignExact, 120);
    };

    const onScrollEnd = () => alignExact();

    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("scrollend", onScrollEnd as EventListener);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settleTimer);
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("scrollend", onScrollEnd as EventListener);
    };
  }, [count]);

  /** Resize: re-align current section to exact frame */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const realign = () => {
      const h = scroller.clientHeight;
      scroller.scrollTo({ top: indexRef.current * h, behavior: "auto" });
    };

    const ro = new ResizeObserver(realign);
    ro.observe(scroller);
    window.addEventListener("orientationchange", realign);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", realign);
    };
  }, []);

  /** Body lock + mode class + header offset */
  useEffect(() => {
    document.documentElement.classList.add("home-snap-mode");
    document.body.classList.add("home-snap-mode");
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const syncHeader = () => {
      const header =
        document.querySelector<HTMLElement>("header.header-shell") ??
        document.querySelector<HTMLElement>("header");
      const h = header?.getBoundingClientRect().height ?? 64;
      document.documentElement.style.setProperty("--home-header-h", `${Math.round(h)}px`);
    };
    syncHeader();
    window.addEventListener("resize", syncHeader);

    return () => {
      document.documentElement.classList.remove("home-snap-mode");
      document.body.classList.remove("home-snap-mode");
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      document.documentElement.style.removeProperty("--home-header-h");
      window.removeEventListener("resize", syncHeader);
    };
  }, []);

  /** Wheel: one notch = one section (no multi-skip / no half frame) */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onWheel = (e: WheelEvent) => {
      // trackpad inertia: ignore tiny residual deltas while locked
      if (lockRef.current) {
        e.preventDefault();
        return;
      }

      const dy = e.deltaY;
      if (Math.abs(dy) < WHEEL_THRESHOLD) return;

      const dir: 1 | -1 = dy > 0 ? 1 : -1;

      // Allow inner lists/FAQ to scroll first
      if (nestedCanScroll(e.target, dir)) return;

      const next = indexRef.current + dir;
      if (next < 0 || next >= count) {
        // at edge: swallow so page doesn't rubber-band into footer mid-section
        e.preventDefault();
        return;
      }

      e.preventDefault();
      lock(WHEEL_LOCK_MS);
      setIndex(next, "smooth");
    };

    scroller.addEventListener("wheel", onWheel, { passive: false });
    return () => scroller.removeEventListener("wheel", onWheel);
  }, [count, lock, setIndex]);

  /** Keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if ((e.target as HTMLElement)?.isContentEditable) return;

      if (lockRef.current) {
        if (
          e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "PageDown" ||
          e.key === "PageUp" ||
          e.key === " "
        ) {
          e.preventDefault();
        }
        return;
      }

      let dir = 0;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") dir = 1;
      if (e.key === "ArrowUp" || e.key === "PageUp") dir = -1;
      if (!dir) return;

      const next = indexRef.current + dir;
      if (next < 0 || next >= count) return;
      e.preventDefault();
      lock(WHEEL_LOCK_MS);
      setIndex(next, "smooth");
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, lock, setIndex]);

  /** Touch swipe */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onStart = (e: TouchEvent) => {
      touchY.current = e.touches[0]?.clientY ?? null;
    };

    const onEnd = (e: TouchEvent) => {
      if (touchY.current == null || lockRef.current) {
        touchY.current = null;
        return;
      }
      const y = e.changedTouches[0]?.clientY;
      if (y == null) return;
      const dy = touchY.current - y;
      touchY.current = null;
      if (Math.abs(dy) < 48) return;

      const dir: 1 | -1 = dy > 0 ? 1 : -1;
      if (nestedCanScroll(e.target, dir)) return;

      const next = indexRef.current + dir;
      if (next < 0 || next >= count) return;
      lock(TOUCH_LOCK_MS);
      setIndex(next, "smooth");
    };

    scroller.addEventListener("touchstart", onStart, { passive: true });
    scroller.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      scroller.removeEventListener("touchstart", onStart);
      scroller.removeEventListener("touchend", onEnd);
    };
  }, [count, lock, setIndex]);

  const go = useCallback(
    (id: string) => {
      const i = sections.findIndex((s) => s.id === id);
      if (i < 0) return;
      lock(WHEEL_LOCK_MS);
      setIndex(i, "smooth");
    },
    [sections, lock, setIndex]
  );

  return (
    <div className="home-snap-root">
      {/* Shared space void — same as §12, fixed so every section feels continuous */}
      <div className="home-space-void" aria-hidden>
        <div className="home-space-void__base" />
        <div className="home-space-void__nebula" />
        <div className="home-space-void__stars" />
        <div className="home-space-void__grid" />
      </div>

      <div
        ref={scrollerRef}
        className="home-snap-scroller"
        tabIndex={0}
        aria-label={locale === "de" ? "Startseite Abschnitte" : "Các section trang chủ"}
      >
        {children}
      </div>

      {/* Left tech rail — home + section icons */}
      <nav
        className="home-snap-rail"
        aria-label={locale === "de" ? "Navigation Abschnitte" : "Menu section"}
      >
        <div className="home-snap-rail__track" aria-hidden>
          <span
            className="home-snap-rail__progress"
            style={{
              height: `${count > 1 ? (active / (count - 1)) * 100 : 0}%`,
            }}
          />
        </div>

        <div className="home-snap-rail__list">
          {sections.map((s, i) => {
            const label = THEME_LABEL[s.theme][locale];
            const Icon = THEME_ICON[s.theme] ?? Home;
            const on = active === i;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => go(s.id)}
                className={cn("home-snap-rail__btn", on && "is-active")}
                aria-label={label}
                aria-current={on ? "true" : undefined}
                title={label}
              >
                <span className="home-snap-rail__icon" aria-hidden>
                  <Icon className="h-3.5 w-3.5" strokeWidth={on ? 2.25 : 1.75} />
                </span>
                <span className="home-snap-rail__tip">
                  <span className="home-snap-rail__tip-idx">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {label}
                </span>
                {on && <span className="home-snap-rail__pulse" aria-hidden />}
              </button>
            );
          })}
        </div>

        <span className="home-snap-rail__meta" aria-hidden>
          {String(active + 1).padStart(2, "0")}
          <span>/</span>
          {String(count).padStart(2, "0")}
        </span>
      </nav>
    </div>
  );
}

/**
 * Full-viewport free canvas (no section frame).
 * Always edge-to-edge under the snap scroller — ambient theme only.
 */
export function HomeStage({
  id,
  theme,
  children,
  bleed = true,
  className,
  stageClassName,
  index,
}: {
  id: string;
  theme: HomeTheme;
  children: ReactNode;
  /** @deprecated always full-bleed free layout */
  bleed?: boolean;
  className?: string;
  stageClassName?: string;
  index?: string;
}) {
  const decorId = useId();

  return (
    <section
      id={id}
      data-theme={theme}
      className={cn(
        "home-snap-section home-snap-section--bleed",
        `home-theme-${theme}`,
        className
      )}
    >
      {/* Per-section color decor removed — shared home-space-void is the only bg */}
      <div className="home-theme-decor" aria-hidden data-decor={decorId} />

      {index && (
        <span className="home-theme-index" aria-hidden>
          {index}
        </span>
      )}

      <div className={cn("home-snap-bleed", stageClassName)}>
        {children}
      </div>
    </section>
  );
}

export function useHomeSections() {
  return useMemo(
    () =>
      [
        { id: "banner", theme: "hero" as const },
        { id: "story", theme: "story" as const },
        { id: "team", theme: "team" as const },
        { id: "process", theme: "process" as const },
        { id: "services", theme: "services" as const },
        { id: "solutions", theme: "solutions" as const },
        { id: "portfolio", theme: "portfolio" as const },
        { id: "pricing", theme: "pricing" as const },
        { id: "blog", theme: "blog" as const },
        { id: "faq", theme: "faq" as const },
        { id: "contact", theme: "contact" as const },
        { id: "cta", theme: "cta" as const },
      ] as const,
    []
  );
}
