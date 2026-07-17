"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock3 } from "lucide-react";
import type { BlogCategoryKey, Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { BLOG_CATEGORIES, blogPosts } from "@/data/blog";
import { blogCatColor } from "@/data/blog-meta";
import { localePath, t, cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

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
 * §09 Blog — lean editorial on shared space void
 */
export function HomeBlog({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
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
  const accent = featured ? blogCatColor(featured.categoryKey) : "#818cf8";

  return (
    <Section
      className="home-stage-fill flex h-full min-h-0 flex-col border-0 py-0"
      contained={false}
    >
      <div
        className="blog-board relative flex h-full min-h-0 w-full flex-col"
        style={{ ["--ba"]: accent } as CSSProperties}
      >
        <Container className="relative z-10 flex h-full min-h-0 w-full max-w-none flex-col px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <header className="flex shrink-0 flex-wrap items-end justify-between gap-3">
            <div className="min-w-0 max-w-2xl">
              <div className="flex items-center gap-2">
                <BookOpen
                  className="h-3.5 w-3.5 text-white/50"
                  strokeWidth={1.75}
                />
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase sm:text-[11px]">
                  09 · {dict.nav.blog}
                </p>
              </div>
              <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {dict.home.blogTitle}
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/42">
                {dict.home.blogSubtitle}
              </p>
            </div>
            <Link
              href={localePath(locale, "/blog")}
              className="group inline-flex items-center gap-1.5 border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/55 transition-colors hover:border-white/20 hover:text-white"
            >
              {dict.blog.allPosts}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </header>

          <div
            className="mt-2.5 flex shrink-0 flex-wrap gap-1.5"
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

          <div className="mt-2.5 grid min-h-0 flex-1 gap-2.5 lg:grid-cols-12 lg:gap-3">
            {featured ? (
              <>
                <Link
                  href={localePath(locale, `/blog/${featured.slug}`)}
                  className="blog-board__featured group relative flex min-h-0 flex-col overflow-hidden border border-white/[0.08] bg-transparent lg:col-span-7"
                >
                  <div
                    className={cn(
                      "relative min-h-[130px] flex-1 bg-gradient-to-br sm:min-h-[150px] lg:min-h-0",
                      featured.gradient
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/15" />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 sm:top-4 sm:left-4">
                      <span
                        className="px-2 py-0.5 text-[10px] font-semibold tracking-wide text-black uppercase"
                        style={{
                          background: blogCatColor(featured.categoryKey),
                        }}
                      >
                        {dict.blog.featured}
                      </span>
                      <span className="border border-white/15 bg-black/50 px-2 py-0.5 font-mono text-[10px] text-white/70">
                        {t(featured.category, locale)}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/40">
                        <time dateTime={featured.date}>
                          {formatDate(featured.date, locale)}
                        </time>
                        <span className="text-white/20">·</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="h-3 w-3" />
                          {featured.readTime} {dict.common.minutes}
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-white sm:text-xl md:text-2xl">
                        {t(featured.title, locale)}
                      </h3>
                      <p className="mt-1 line-clamp-2 max-w-lg text-sm leading-relaxed text-white/50">
                        {t(featured.excerpt, locale)}
                      </p>
                      <span
                        className="mt-2.5 inline-flex items-center gap-1 text-sm font-medium"
                        style={{ color: blogCatColor(featured.categoryKey) }}
                      >
                        {dict.common.readMore}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="flex min-h-0 flex-col gap-2 lg:col-span-5">
                  {rest.length > 0 ? (
                    rest.map((post, i) => {
                      const col = blogCatColor(post.categoryKey);
                      return (
                        <Link
                          key={post.slug}
                          href={localePath(locale, `/blog/${post.slug}`)}
                          className="blog-board__row group flex min-h-0 flex-1 gap-3 border border-white/[0.07] bg-transparent p-2.5 transition-colors hover:border-white/14 hover:bg-white/[0.03] sm:p-3"
                        >
                          <div
                            className={cn(
                              "relative h-full min-h-[4rem] w-[4rem] shrink-0 overflow-hidden sm:w-20",
                              "bg-gradient-to-br",
                              post.gradient
                            )}
                          >
                            <span className="absolute bottom-1 left-1 font-mono text-[9px] font-bold tabular-nums text-white/75">
                              {String(i + 2).padStart(2, "0")}
                            </span>
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col justify-center">
                            <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-white/35">
                              <span style={{ color: col }}>
                                {t(post.category, locale)}
                              </span>
                              <span className="text-white/15">·</span>
                              <time dateTime={post.date}>
                                {formatDate(post.date, locale)}
                              </time>
                            </div>
                            <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold tracking-tight text-white/90 group-hover:text-white sm:text-[15px]">
                              {t(post.title, locale)}
                            </h3>
                            <p className="mt-0.5 line-clamp-1 text-xs text-white/38 sm:line-clamp-2">
                              {t(post.excerpt, locale)}
                            </p>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <div className="flex flex-1 items-center justify-center border border-dashed border-white/10 px-4 text-center text-sm text-white/35">
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
                    className="shrink-0 border border-white/10 bg-white/[0.03] px-3 py-2 text-center text-xs font-medium text-white/45 transition-colors hover:border-white/18 hover:text-white sm:text-sm"
                  >
                    {dict.blog.allPosts}
                    {" →"}
                  </Link>
                </div>
              </>
            ) : (
              <div className="col-span-full flex items-center justify-center border border-dashed border-white/10 py-16 text-sm text-white/35">
                {dict.common.noResults}
              </div>
            )}
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
        "inline-flex items-center gap-1.5 border px-2.5 py-1.5 text-[11px] font-medium tracking-wide transition-colors sm:text-xs",
        active
          ? "text-black"
          : "border-white/10 bg-black/35 text-white/45 hover:border-white/18 hover:text-white/75"
      )}
      style={
        active
          ? { background: color, borderColor: color }
          : { borderColor: `${color}22` }
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
