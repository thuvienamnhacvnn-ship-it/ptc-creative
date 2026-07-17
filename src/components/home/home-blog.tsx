import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { BLOG_CATEGORIES, blogPosts } from "@/data/blog";
import { localePath, t } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function HomeBlog({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const posts = blogPosts.slice(0, 3);

  return (
    <Section className="home-stage-fill flex h-full flex-col justify-center border-0 bg-transparent py-0">
      <Container className="home-stage-scroll flex h-full max-h-full flex-col justify-center py-2 sm:py-3">
        <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="spec mb-1.5 text-indigo-300">09 — {dict.nav.blog}</p>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
              {dict.home.blogTitle}
            </h2>
            <p className="mt-1.5 line-clamp-2 text-sm text-muted">{dict.home.blogSubtitle}</p>
          </div>
          <Button href={localePath(locale, "/blog")} variant="outline" size="sm">
            {dict.common.viewAll}
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {BLOG_CATEGORIES.map((c) => (
            <Link
              key={c.key}
              href={localePath(locale, `/blog?cat=${c.key}`)}
              className="border border-border bg-card/50 px-3 py-1.5 font-mono text-[10px] tracking-wider text-muted uppercase transition-colors hover:border-accent/40 hover:text-accent"
            >
              {t(c.title, locale)}
            </Link>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={localePath(locale, `/blog/${post.slug}`)}
              className="group flex flex-col border border-border bg-card/60 transition-colors hover:border-accent/40"
            >
              <div
                className={`h-28 bg-gradient-to-br ${post.gradient} opacity-90 transition-opacity group-hover:opacity-100`}
              />
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center gap-2 font-mono text-[10px] text-muted uppercase">
                  <span className="text-accent">{t(post.category, locale)}</span>
                  <span>·</span>
                  <time>{post.date}</time>
                </div>
                <h3 className="mt-2 text-base font-semibold tracking-tight group-hover:text-accent">
                  {t(post.title, locale)}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">
                  {t(post.excerpt, locale)}
                </p>
                <span className="mt-auto pt-4 text-xs font-medium text-accent">
                  {dict.common.readMore} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
