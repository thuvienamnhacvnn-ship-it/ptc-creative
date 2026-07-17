import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { BLOG_CATEGORIES, getPostsByCategory } from "@/data/blog";
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
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[10px] tracking-wider text-muted uppercase">
            {dict.blog.categoriesLabel}
          </span>
          <Link
            href={localePath(locale, "/blog")}
            className={cn(
              "border px-3 py-1.5 text-xs font-medium transition-colors",
              !cat
                ? "border-accent bg-accent text-white"
                : "border-border text-muted hover:border-accent/40 hover:text-accent"
            )}
          >
            {dict.common.filterAll}
          </Link>
          {BLOG_CATEGORIES.map((c) => (
            <Link
              key={c.key}
              href={localePath(locale, `/blog?cat=${c.key}`)}
              className={cn(
                "border px-3 py-1.5 text-xs font-medium transition-colors",
                cat === c.key
                  ? "border-accent bg-accent text-white"
                  : "border-border text-muted hover:border-accent/40 hover:text-accent"
              )}
            >
              {t(c.title, locale)}
            </Link>
          ))}
        </div>

        {featured && (
          <Link
            href={localePath(locale, `/blog/${featured.slug}`)}
            className="group mb-10 grid overflow-hidden border border-border bg-card lg:grid-cols-2"
          >
            <div
              className={`relative min-h-[220px] bg-gradient-to-br ${featured.gradient} lg:min-h-[320px]`}
            >
              <div className="absolute left-4 top-4 border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-medium tracking-wide text-white uppercase backdrop-blur-sm">
                {dict.blog.featured}
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                <span className="text-accent">{t(featured.category, locale)}</span>
                <span>·</span>
                <time>{featured.date}</time>
                <span>·</span>
                <span>
                  {featured.readTime} {dict.common.minutes}
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight group-hover:text-accent sm:text-3xl">
                {t(featured.title, locale)}
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                {t(featured.excerpt, locale)}
              </p>
              <span className="mt-5 text-sm font-medium text-accent">
                {dict.common.readMore} →
              </span>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={localePath(locale, `/blog/${post.slug}`)}
                className="group flex flex-col border border-border bg-card transition-colors hover:border-accent/40"
              >
                <div className={`h-32 bg-gradient-to-br ${post.gradient}`} />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                    <span className="text-accent">{t(post.category, locale)}</span>
                    <span>·</span>
                    <time>{post.date}</time>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight group-hover:text-accent">
                    {t(post.title, locale)}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted">
                    {t(post.excerpt, locale)}
                  </p>
                  <span className="mt-auto pt-4 text-sm font-medium text-accent">
                    {dict.common.readMore} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <p className="border border-dashed border-border py-16 text-center text-muted">
            {dict.common.noResults}
          </p>
        )}
      </Section>
    </>
  );
}
