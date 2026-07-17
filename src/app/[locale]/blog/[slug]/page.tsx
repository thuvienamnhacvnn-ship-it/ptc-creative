import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { blogPosts, getPost } from "@/data/blog";
import { localePath, t } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { CtaBanner } from "@/components/shared/cta-banner";
import type { Locale } from "@/types";

export function generateStaticParams() {
  return blogPosts.flatMap((p) =>
    ["vi", "de"].map((locale) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    locale: raw,
    title: t(post.title, raw),
    description: t(post.excerpt, raw),
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const post = getPost(slug);
  if (!post) notFound();
  const dict = getDictionary(locale);
  const paragraphs = t(post.content, locale).split("\n\n");

  return (
    <>
      <div className="border-b border-border">
        <div className={`h-48 bg-gradient-to-br ${post.gradient} sm:h-64`} />
        <Container className="-mt-16 pb-12">
          <article className="rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-10 lg:p-12">
            <Link
              href={localePath(locale, "/blog")}
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {dict.nav.blog}
            </Link>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
              <span className="text-accent">{t(post.category, locale)}</span>
              <span>·</span>
              <time dateTime={post.date}>{post.date}</time>
              <span>·</span>
              <span>
                {post.readTime} {dict.common.minutes}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {t(post.title, locale)}
            </h1>
            <p className="mt-4 text-lg text-muted">{t(post.excerpt, locale)}</p>
            <div className="prose-ptc mt-10 max-w-none">
              {paragraphs.map((block, i) => {
                if (block.startsWith("**") && block.endsWith("**")) {
                  return (
                    <h2 key={i} className="mb-3 mt-8 text-xl font-semibold text-foreground">
                      {block.replace(/\*\*/g, "")}
                    </h2>
                  );
                }
                if (block.match(/^\d+\./m) || block.startsWith("- ")) {
                  const lines = block.split("\n");
                  return (
                    <ul key={i} className="mb-5 list-disc space-y-1 pl-5">
                      {lines.map((line, j) => (
                        <li key={j}>
                          {line.replace(/^- /, "").replace(/^\d+\.\s*/, "").replace(/\*\*/g, "")}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i}>
                    {block.split(/(\*\*[^*]+\*\*)/g).map((part, k) =>
                      part.startsWith("**") && part.endsWith("**") ? (
                        <strong key={k}>{part.slice(2, -2)}</strong>
                      ) : (
                        <span key={k}>{part}</span>
                      )
                    )}
                  </p>
                );
              })}
            </div>
          </article>
        </Container>
      </div>
      <CtaBanner
        locale={locale}
        title={dict.home.ctaTitle}
        subtitle={dict.home.ctaSubtitle}
        button={dict.home.ctaButton}
      />
    </>
  );
}
