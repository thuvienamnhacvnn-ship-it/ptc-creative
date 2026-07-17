"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock3 } from "lucide-react";
import type { BlogCategoryKey, Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { BLOG_CATEGORIES, blogPosts } from "@/data/blog";
import { blogCatColor } from "@/data/blog-meta";
import { localePath, t, cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

const ease = [0.22, 1, 0.36, 1] as const;

function formatDate(date: string, locale: Locale) {
  try {
    return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

/**
 * Blog & kiến thức vận hành — editorial knowledge board
 * Featured + list · filter theo chủ đề · palette indigo dusk
 */
export function HomeBlog({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<BlogCategoryKey | "all">("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? blogPosts
        : blogPosts.filter((p) => p.categoryKey === filter),
    [filter]
  );

  const featured = filtered[0];
  const rest = filtered.slice(1, 4);
  const accent = featured
    ? blogCatColor(featured.categoryKey)
    : "#818cf8";

  return (
    <Section
      className="home-stage-fill flex h-full min-h-0 flex-col border-0 py-0"
      contained={false}
    >
      <div
        className="blog-board relative flex h-full min-h-0 w-full flex-col overflow-hidden"
        style={{ ["--ba"]: accent } as CSSProperties}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[#0a0c14]" />
          <div
            className="absolute -left-[10%] top-[-5%] h-[50%] w-[45%] blur-3xl opacity-70"
            style={{
              background: `radial-gradient(circle, ${accent}18, transparent 68%)`,
            }}
          />
          <div className="absolute right-0 bottom-0 h-[40%] w-[35%] bg-[radial-gradient(circle,rgba(244,114,182,0.08),transparent_70%)] blur-3xl" />
          <div className="blog-board__grid absolute inset-0 opacity-[0.05]" />
        </div>

        <Container className="relative z-10 flex h-full min-h-0 w-full max-w-none flex-col px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          {/* Header */}
          <header className="flex shrink-0 flex-wrap items-end justify-between gap-3">
            <div className="min-w-0 max-w-2xl">
              <div className="flex items-center gap-2">
                <BookOpen
                  className="h-3.5 w-3.5"
                  style={{ color: accent }}
                  strokeWidth={1.75}
                />
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase sm:text-[11px]">
                  09 · {dict.nav.blog}
                </p>
              </div>
              <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {dict.home.blogTitle}
              </h2>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/48">
                {dict.home.blogSubtitle}
              </p>
            </div>
            <Link
              href={localePath(locale, "/blog")}
              className="group inline-flex items-center gap-1.5 border border-white/12 bg-black/30 px-3 py-2 text-sm text-white/60 transition-colors hover:border-white/25 hover:text-white"
            >
              {dict.blog.allPosts}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </header>

          {/* Topic filters */}
          <div
            className="mt-3 flex shrink-0 flex-wrap gap-1.5"
            role="tablist"
            aria-label={dict.blog.categoriesLabel}
          >
            <FilterChip
              active={filter === "all"}
              onClick={() => setFilter("all")}
              color="#818cf8"
              label={dict.common.filterAll}
            />
            {BLOG_CATEGORIES.map((c) => {
              const col = blogCatColor(c.key);
              const short =
                locale === "de"
                  ? c.title.de.split(" ")[0]
                  : c.title.vi.split(" ")[0];
              return (
                <FilterChip
                  key={c.key}
                  active={filter === c.key}
                  onClick={() => setFilter(c.key)}
                  color={col}
                  label={short ?? t(c.title, locale)}
                  title={t(c.title, locale)}
                />
              );
            })}
          </div>

          {/* Editorial layout */}
          <div className="mt-3 grid min-h-0 flex-1 gap-3 lg:grid-cols-12 lg:gap-4">
            <AnimatePresence mode="wait">
              {featured ? (
                <motion.div
                  key={`${filter}-${featured.slug}`}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="contents"
                >
                  {/* Featured */}
                  <Link
                    href={localePath(locale, `/blog/${featured.slug}`)}
                    className="blog-board__featured group relative flex min-h-0 flex-col overflow-hidden border border-white/[0.09] bg-black/40 lg:col-span-7"
                    style={{
                      boxShadow: `0 0 0 1px ${blogCatColor(featured.categoryKey)}14`,
                    }}
                  >
                    <div
                      className={cn(
                        "relative min-h-[140px] flex-1 bg-gradient-to-br sm:min-h-[160px] lg:min-h-0",
                        featured.gradient
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 sm:top-4 sm:left-4">
                        <span
                          className="px-2 py-0.5 text-[10px] font-semibold tracking-wide text-black uppercase"
                          style={{
                            background: blogCatColor(featured.categoryKey),
                          }}
                        >
                          {dict.blog.featured}
                        </span>
                        <span className="border border-white/15 bg-black/45 px-2 py-0.5 font-mono text-[10px] text-white/70 backdrop-blur-sm">
                          {t(featured.category, locale)}
                        </span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/45">
                          <time dateTime={featured.date}>
                            {formatDate(featured.date, locale)}
                          </time>
                          <span className="text-white/25">·</span>
                          <span className="inline-flex items-center gap-1">
                            <Clock3 className="h-3 w-3" />
                            {featured.readTime} {dict.common.minutes}
                          </span>
                        </div>
                        <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-white sm:text-xl md:text-2xl">
                          {t(featured.title, locale)}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 max-w-lg text-sm leading-relaxed text-white/55">
                          {t(featured.excerpt, locale)}
                        </p>
                        <span
                          className="mt-3 inline-flex items-center gap-1 text-sm font-medium"
                          style={{ color: blogCatColor(featured.categoryKey) }}
                        >
                          {dict.common.readMore}
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Side list */}
                  <div className="flex min-h-0 flex-col gap-2 lg:col-span-5">
                    {rest.length > 0 ? (
                      rest.map((post, i) => {
                        const col = blogCatColor(post.categoryKey);
                        return (
                          <Link
                            key={post.slug}
                            href={localePath(locale, `/blog/${post.slug}`)}
                            className="blog-board__row group flex min-h-0 flex-1 gap-3 border border-white/[0.07] bg-black/35 p-3 transition-colors hover:border-white/15 hover:bg-white/[0.04] sm:p-3.5"
                          >
                            <div
                              className={cn(
                                "relative h-full min-h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden sm:w-24",
                                "bg-gradient-to-br",
                                post.gradient
                              )}
                            >
                              <span
                                className="absolute bottom-1 left-1 font-mono text-[9px] font-bold tabular-nums text-white/80"
                                style={{ textShadow: "0 1px 4px #000" }}
                              >
                                {String(i + 2).padStart(2, "0")}
                              </span>
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col justify-center">
                              <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-white/40">
                                <span style={{ color: col }}>
                                  {t(post.category, locale)}
                                </span>
                                <span className="text-white/20">·</span>
                                <time dateTime={post.date}>
                                  {formatDate(post.date, locale)}
                                </time>
                                <span className="text-white/20">·</span>
                                <span>
                                  {post.readTime} {dict.common.minutes}
                                </span>
                              </div>
                              <h3 className="mt-1 line-clamp-2 text-sm font-semibold tracking-tight text-white/90 transition-colors group-hover:text-white sm:text-[15px]">
                                {t(post.title, locale)}
                              </h3>
                              <p className="mt-1 line-clamp-1 text-xs text-white/40 sm:line-clamp-2">
                                {t(post.excerpt, locale)}
                              </p>
                            </div>
                          </Link>
                        );
                      })
                    ) : (
                      <div className="flex flex-1 items-center justify-center border border-dashed border-white/10 px-4 text-center text-sm text-white/40">
                        {locale === "de"
                          ? "Weitere Artikel im Archiv."
                          : "Xem thêm bài trong thư viện blog."}
                      </div>
                    )}

                    <Link
                      href={localePath(
                        locale,
                        filter === "all" ? "/blog" : `/blog?cat=${filter}`
                      )}
                      className="shrink-0 border border-white/10 bg-white/[0.03] px-3 py-2.5 text-center text-xs font-medium text-white/50 transition-colors hover:border-white/20 hover:text-white sm:text-sm"
                    >
                      {dict.blog.allPosts}
                      {filter !== "all" && (
                        <span className="text-white/30">
                          {" "}
                          ·{" "}
                          {t(
                            BLOG_CATEGORIES.find((c) => c.key === filter)
                              ?.title ?? { vi: "", de: "" },
                            locale
                          )}
                        </span>
                      )}
                      {" →"}
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full flex items-center justify-center border border-dashed border-white/10 py-16 text-sm text-white/40"
                >
                  {dict.common.noResults}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </div>
    </Section>
  );
}

function FilterChip({
  active,
  onClick,
  color,
  label,
  title,
}: {
  active: boolean;
  onClick: () => void;
  color: string;
  label: string;
  title?: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      title={title}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 border px-2.5 py-1.5 text-[11px] font-medium tracking-wide transition-all sm:text-xs",
        active
          ? "text-black"
          : "border-white/10 bg-black/30 text-white/50 hover:border-white/20 hover:text-white/80"
      )}
      style={
        active
          ? { background: color, borderColor: color }
          : { borderColor: `${color}28` }
      }
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: active ? "#000" : color }}
      />
      {label}
    </button>
  );
}
