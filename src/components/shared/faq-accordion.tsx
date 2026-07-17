"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  CircleDollarSign,
  Globe,
  HelpCircle,
  Package,
  Settings2,
  Truck,
} from "lucide-react";
import type { Locale } from "@/types";
import { faqItems, faqCategories } from "@/data/faq";
import { t, cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const CAT_META: Record<
  string,
  { color: string; icon: typeof HelpCircle }
> = {
  general: { color: "#818cf8", icon: HelpCircle },
  production: { color: "#409cff", icon: Settings2 },
  web: { color: "#38bdf8", icon: Globe },
  pricing: { color: "#fbbf24", icon: CircleDollarSign },
  delivery: { color: "#34d399", icon: Truck },
};

type Props = {
  locale: Locale;
  /** Limit items (home snap stage) */
  limit?: number;
  /** Dark glass board style for home */
  variant?: "page" | "board";
  className?: string;
};

/**
 * FAQ accordion — tech/professional layout
 * · Category filter chips with color + icon
 * · Indexed Q&A cards, smooth expand
 */
export function FaqAccordion({
  locale,
  limit,
  variant = "page",
  className,
}: Props) {
  const reduce = useReducedMotion();
  const [cat, setCat] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered =
    cat === "all" ? faqItems : faqItems.filter((f) => f.category === cat);
  const list = typeof limit === "number" ? filtered.slice(0, limit) : filtered;

  // Open first of filtered set when filter changes
  useEffect(() => {
    setOpenId(list[0]?.id ?? null);
  }, [cat]); // eslint-disable-line react-hooks/exhaustive-deps

  const board = variant === "board";
  const accent =
    cat === "all"
      ? "#818cf8"
      : (CAT_META[cat]?.color ?? "#818cf8");

  return (
    <div
      className={cn("faq-acc", board && "faq-acc--board", className)}
      style={{ ["--fa"]: accent } as CSSProperties}
    >
      {/* Category filter */}
      <div
        className={cn(
          "mb-3 flex flex-wrap gap-1.5 sm:mb-4",
          board && "shrink-0"
        )}
        role="tablist"
        aria-label={locale === "de" ? "FAQ Kategorien" : "Danh mục FAQ"}
      >
        <CatChip
          active={cat === "all"}
          onClick={() => setCat("all")}
          color="#818cf8"
          board={board}
        >
          <Package className="h-3.5 w-3.5" strokeWidth={1.75} />
          {locale === "vi" ? "Tất cả" : "Alle"}
          <span
            className={cn(
              "ml-0.5 font-mono text-[10px] opacity-70",
              board ? "text-inherit" : ""
            )}
          >
            {faqItems.length}
          </span>
        </CatChip>
        {faqCategories.map((c) => {
          const meta = CAT_META[c.id] ?? {
            color: "#818cf8",
            icon: HelpCircle,
          };
          const Icon = meta.icon;
          const count = faqItems.filter((f) => f.category === c.id).length;
          return (
            <CatChip
              key={c.id}
              active={cat === c.id}
              onClick={() => setCat(c.id)}
              color={meta.color}
              board={board}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              {c[locale]}
              <span className="ml-0.5 font-mono text-[10px] opacity-70">
                {count}
              </span>
            </CatChip>
          );
        })}
      </div>

      {/* Items */}
      <div
        className={cn(
          "space-y-2",
          board && "min-h-0 flex-1 space-y-1.5 overflow-y-auto no-scrollbar pr-0.5"
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((item, idx) => {
            const open = openId === item.id;
            const meta = CAT_META[item.category];
            const col = meta?.color ?? accent;
            return (
              <motion.div
                key={item.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.22, ease }}
                className={cn(
                  "faq-acc__item overflow-hidden border transition-colors",
                  board
                    ? open
                      ? "border-white/15 bg-white/[0.06]"
                      : "border-white/[0.07] bg-transparent hover:border-white/12 hover:bg-white/[0.03]"
                    : open
                      ? "border-border bg-card shadow-sm"
                      : "border-border bg-card/80 hover:border-foreground/15"
                )}
                style={
                  open
                    ? {
                        borderColor: `${col}45`,
                        boxShadow: board
                          ? `inset 3px 0 0 ${col}`
                          : `0 0 0 1px ${col}22`,
                      }
                    : undefined
                }
              >
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-start gap-3 text-left transition-colors",
                    board ? "px-3 py-3 sm:px-3.5 sm:py-3.5" : "px-4 py-4 sm:px-5"
                  )}
                  onClick={() => setOpenId(open ? null : item.id)}
                  aria-expanded={open}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center font-mono text-[10px] font-semibold tabular-nums",
                      board
                        ? open
                          ? "text-black"
                          : "text-white/45"
                        : open
                          ? "text-black"
                          : "text-muted"
                    )}
                    style={
                      open
                        ? { background: col }
                        : board
                          ? {
                              background: "rgba(255,255,255,0.05)",
                              border: `1px solid ${col}33`,
                              color: col,
                            }
                          : {
                              background: `${col}12`,
                              border: `1px solid ${col}28`,
                              color: col,
                            }
                    }
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block text-sm font-medium leading-snug tracking-tight sm:text-[15px]",
                        board
                          ? open
                            ? "text-white"
                            : "text-white/80"
                          : "text-foreground"
                      )}
                    >
                      {t(item.question, locale)}
                    </span>
                    {!open && (
                      <span
                        className={cn(
                          "mt-1 hidden font-mono text-[10px] tracking-wide uppercase sm:block",
                          board ? "text-white/30" : "text-muted"
                        )}
                        style={{ color: board ? undefined : col }}
                      >
                        {faqCategories.find((c) => c.id === item.category)?.[
                          locale
                        ] ?? item.category}
                      </span>
                    )}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border transition-all",
                      board
                        ? "border-white/10 text-white/45"
                        : "border-border text-muted",
                      open && "rotate-0"
                    )}
                    style={
                      open
                        ? {
                            borderColor: `${col}50`,
                            color: col,
                            background: board
                              ? `${col}18`
                              : `${col}10`,
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
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease }}
                      className="overflow-hidden"
                    >
                      <div
                        className={cn(
                          "border-t text-sm leading-relaxed",
                          board
                            ? "border-white/[0.07] px-3 pb-3.5 pt-0 sm:px-3.5 sm:pb-4"
                            : "border-border px-4 pb-4 pt-0 sm:px-5 sm:pb-5"
                        )}
                      >
                        <div
                          className={cn(
                            "ml-10 pt-3 sm:ml-10",
                            board ? "text-white/58" : "text-muted"
                          )}
                        >
                          {t(item.answer, locale)}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {list.length === 0 && (
          <p
            className={cn(
              "border border-dashed py-10 text-center text-sm",
              board
                ? "border-white/10 text-white/40"
                : "border-border text-muted"
            )}
          >
            {locale === "de" ? "Keine Einträge." : "Không có câu hỏi."}
          </p>
        )}
      </div>
    </div>
  );
}

function CatChip({
  children,
  active,
  onClick,
  color,
  board,
}: {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
  color: string;
  board?: boolean;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 border px-2.5 py-1.5 text-[11px] font-medium tracking-wide transition-all sm:text-xs",
        active
          ? "text-black"
          : board
            ? "border-white/10 bg-transparent text-white/50 hover:border-white/20 hover:text-white/80"
            : "border-border bg-card text-muted hover:border-foreground/20 hover:text-foreground"
      )}
      style={
        active
          ? { background: color, borderColor: color }
          : board
            ? { borderColor: `${color}28` }
            : { borderColor: `${color}35` }
      }
    >
      {children}
    </button>
  );
}
