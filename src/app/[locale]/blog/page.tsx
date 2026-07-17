import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { BLOG_CATEGORIES, getPostsByCategory } from "@/data/blog";
import { blogCatColor } from "@/data/blog-meta";
import { localePath, t, cn } from "@/lib/utils";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/ui/section";
import type { Locale } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return buildMetadata({
    locale: raw,
    title: dict.meta.blogTitle,
    description: dict.meta.blogDesc,
    path: "/blog",
  });
}

function formatDate(date: string, locale: Locale) {
  try {
    return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ cat?: string }>;
}) {
  const { locale: raw } = await params;
  const { cat } = await searchParams;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const posts = getPostsByCategory(cat);
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        badge={dict.blog.badge}
        title={dict.blog.title}
        subtitle={dict.blog.subtitle}
      />
      <Section>
        <div className="mx-auto max-w-6xl">
          {/* Filters */}
          <div className="mb-10 flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
              {dict.blog.categoriesLabel}
            </span>
            <Link
              href={localePath(locale, "/blog")}
              className={cn(
                "border px-3.5 py-1.5 text-xs font-medium transition-colors",
                !cat
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:border-foreground/30 hover:text-foreground"
              )}
            >
              {dict.common.filterAll}
            </Link>
            {BLOG_CATEGORIES.map((c) => {
              const col = blogCatColor(c.key);
              const on = cat === c.key;
              return (
                <Link
                  key={c.key}
                  href={localePath(locale, `/blog?cat=${c.key}`)}
                  className={cn(
                    "inline-flex items-center gap-1.5 border px-3.5 py-1.5 text-xs font-medium transition-colors",
                    on
                      ? "text-black"
                      : "border-border text-muted hover:border-foreground/30 hover:text-foreground"
                  )}
                  style={
                    on
                      ? { background: col, borderColor: col }
                      : { borderColor: `${col}40` }
                  }
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: on ? "#000" : col }}
                  />
                  {t(c.title, locale)}
                </Link>
              );
            })}
          </div>

          {featured && (
            <Link
              href={localePath(locale, `/blog/${featured.slug}`)}
              className="group mb-10 grid overflow-hidden border border-border bg-card transition-shadow hover:shadow-lg lg:grid-cols-2"
            >
              <div
                className={cn(
                  "relative min-h-[240px] bg-gradient-to-br lg:min-h-[340px]",
                  featured.gradient
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20" />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="border border-white/25 bg-black/45 px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase backdrop-blur-sm">
                    {dict.blog.featured}
                  </span>
                  <span
                    className="px-3 py-1 text-[11px] font-semibold text-black uppercase"
                    style={{ background: blogCatColor(featured.categoryKey) }}
                  >
                    {t(featured.category, locale)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                  <time dateTime={featured.date}>
                    {formatDate(featured.date, locale)}
                  </time>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3 w-3" />
                    {featured.readTime} {dict.common.minutes}
                  </span>
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight transition-colors group-hover:opacity-90 sm:text-3xl">
                  {t(featured.title, locale)}
                </h2>
                <p className="mt-3 text-muted leading-relaxed">
                  {t(featured.excerpt, locale)}
                </p>
                <span
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: blogCatColor(featured.categoryKey) }}
                >
                  {dict.common.readMore}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          )}

          {rest.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => {
                const col = blogCatColor(post.categoryKey);
                return (
                  <Link
                    key={post.slug}
                    href={localePath(locale, `/blog/${post.slug}`)}
                    className="group flex flex-col border border-border bg-card transition-all hover:border-foreground/15 hover:shadow-md"
                  >
                    <div
                      className={cn(
                        "relative h-36 bg-gradient-to-br",
                        post.gradient
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span
                        className="absolute bottom-3 left-3 px-2 py-0.5 text-[10px] font-semibold text-black uppercase"
                        style={{ background: col }}
                      >
                        {t(post.category, locale)}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                        <time dateTime={post.date}>
                          {formatDate(post.date, locale)}
                        </time>
                        <span>·</span>
                        <span>
                          {post.readTime} {dict.common.minutes}
                        </span>
                      </div>
                      <h3 className="mt-2 text-lg font-semibold tracking-tight transition-opacity group-hover:opacity-90">
                        {t(post.title, locale)}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                        {t(post.excerpt, locale)}
                      </p>
                      <span
                        className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-medium"
                        style={{ color: col }}
                      >
                        {dict.common.readMore}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {posts.length === 0 && (
            <p className="border border-dashed border-border py-16 text-center text-muted">
              {dict.common.noResults}
            </p>
          )}
        </div>
      </Section>
    </>
  );
}
