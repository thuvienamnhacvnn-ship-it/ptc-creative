import { prisma } from "@/lib/prisma";
import type { Locale } from "@/types";

function tr<T extends { locale: string }>(rows: T[], locale: Locale): T | undefined {
  return rows.find((r) => r.locale === locale) ?? rows.find((r) => r.locale === "vi") ?? rows[0];
}

export async function dbAvailable(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

export async function getPublishedServices(locale: Locale) {
  const rows = await prisma.service.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { sortOrder: "asc" },
    include: { translations: true, category: { include: { translations: true } } },
  });
  return rows.map((s) => {
    const t = tr(s.translations, locale)!;
    return {
      id: s.id,
      slug: t?.slug ?? s.slug,
      icon: s.icon ?? "Factory",
      visual: s.visual ?? "cnc",
      specs: s.specs,
      categoryCode: s.category.code,
      title: t?.title ?? s.slug,
      short: t?.short ?? "",
      description: t?.description ?? "",
      capabilities: t?.capabilities ?? [],
      benefits: t?.benefits ?? [],
      translationComplete: s.translations.length >= 2,
    };
  });
}

export async function getServiceBySlug(slug: string, locale: Locale) {
  const byTrans = await prisma.serviceTranslation.findFirst({
    where: { slug, locale },
    include: {
      service: {
        include: { translations: true, category: true, seo: true },
      },
    },
  });
  if (byTrans?.service.status === "PUBLISHED") {
    const s = byTrans.service;
    const t = tr(s.translations, locale)!;
    return {
      id: s.id,
      slug: t.slug,
      icon: s.icon,
      visual: s.visual,
      specs: s.specs,
      categoryCode: s.category.code,
      title: t.title,
      short: t.short,
      description: t.description,
      capabilities: t.capabilities,
      benefits: t.benefits,
      seo: s.seo,
      translationComplete: s.translations.length >= 2,
    };
  }
  const s = await prisma.service.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: { translations: true, category: true, seo: true },
  });
  if (!s) return null;
  const t = tr(s.translations, locale)!;
  return {
    id: s.id,
    slug: t?.slug ?? s.slug,
    icon: s.icon,
    visual: s.visual,
    specs: s.specs,
    categoryCode: s.category.code,
    title: t?.title ?? s.slug,
    short: t?.short ?? "",
    description: t?.description ?? "",
    capabilities: t?.capabilities ?? [],
    benefits: t?.benefits ?? [],
    seo: s.seo,
    translationComplete: s.translations.length >= 2,
  };
}

export async function getPublishedIndustries(locale: Locale) {
  const rows = await prisma.industry.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { sortOrder: "asc" },
    include: { translations: true },
  });
  return rows.map((i) => {
    const t = tr(i.translations, locale)!;
    return {
      id: i.id,
      slug: t?.slug ?? i.slug,
      icon: i.icon ?? "Building2",
      palette: i.palette ?? "graphite",
      modules: i.modules,
      title: t?.title ?? i.slug,
      short: t?.short ?? "",
      description: t?.description ?? "",
      painPoints: t?.painPoints ?? [],
      deliverables: t?.deliverables ?? [],
      package: t?.packageText ?? "",
      translationComplete: i.translations.length >= 2,
    };
  });
}

export async function getIndustryBySlug(slug: string, locale: Locale) {
  const byTrans = await prisma.industryTranslation.findFirst({
    where: { slug, locale },
    include: { industry: { include: { translations: true, seo: true } } },
  });
  const industry = byTrans?.industry ?? (await prisma.industry.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: { translations: true, seo: true },
  }));
  if (!industry || industry.status !== "PUBLISHED") return null;
  const t = tr(industry.translations, locale)!;
  return {
    id: industry.id,
    slug: t?.slug ?? industry.slug,
    icon: industry.icon,
    palette: industry.palette,
    modules: industry.modules,
    title: t?.title ?? industry.slug,
    short: t?.short ?? "",
    description: t?.description ?? "",
    painPoints: t?.painPoints ?? [],
    deliverables: t?.deliverables ?? [],
    package: t?.packageText ?? "",
    seo: industry.seo,
    translationComplete: industry.translations.length >= 2,
  };
}

export async function getPortfolio(locale: Locale) {
  const rows = await prisma.portfolioProject.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
    include: {
      translations: true,
      industry: { include: { translations: true } },
      services: { include: { service: { include: { translations: true } } } },
    },
  });
  return rows.map((p) => {
    const t = tr(p.translations, locale)!;
    return {
      id: p.id,
      slug: t?.slug ?? p.slug,
      category: p.category,
      industry: p.industry ? tr(p.industry.translations, locale)?.title ?? "" : "",
      title: t?.title ?? p.slug,
      description: t?.description ?? "",
      materials: t?.materials ?? "",
      duration: t?.duration ?? "",
      result: t?.result ?? "",
      beforeLabel: t?.beforeLabel ?? "",
      afterLabel: t?.afterLabel ?? "",
      tags: p.tags,
      gradient: p.gradient ?? "from-zinc-900 to-black",
      services: p.services.map((s) => tr(s.service.translations, locale)?.title ?? s.service.slug),
      translationComplete: p.translations.length >= 2,
    };
  });
}

export async function getPortfolioBySlug(slug: string, locale: Locale) {
  const byTrans = await prisma.portfolioTranslation.findFirst({
    where: { slug, locale },
    include: {
      project: {
        include: {
          translations: true,
          industry: { include: { translations: true } },
          services: { include: { service: { include: { translations: true } } } },
          media: true,
          seo: true,
        },
      },
    },
  });
  const p =
    byTrans?.project ??
    (await prisma.portfolioProject.findFirst({
      where: { slug, status: "PUBLISHED" },
      include: {
        translations: true,
        industry: { include: { translations: true } },
        services: { include: { service: { include: { translations: true } } } },
        media: true,
        seo: true,
      },
    }));
  if (!p || p.status !== "PUBLISHED") return null;
  const t = tr(p.translations, locale)!;
  return {
    id: p.id,
    slug: t?.slug ?? p.slug,
    category: p.category,
    industry: p.industry ? tr(p.industry.translations, locale)?.title ?? "" : "",
    title: t?.title ?? p.slug,
    description: t?.description ?? "",
    materials: t?.materials ?? "",
    duration: t?.duration ?? "",
    result: t?.result ?? "",
    beforeLabel: t?.beforeLabel ?? "",
    afterLabel: t?.afterLabel ?? "",
    tags: p.tags,
    gradient: p.gradient ?? "from-zinc-900 to-black",
    services: p.services.map((s) => tr(s.service.translations, locale)?.title ?? s.service.slug),
    media: p.media,
    seo: p.seo,
    translationComplete: p.translations.length >= 2,
  };
}

export async function getFaqs(locale: Locale) {
  const rows = await prisma.fAQ.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { sortOrder: "asc" },
    include: { translations: true },
  });
  return rows.map((f) => {
    const t = tr(f.translations, locale)!;
    return {
      id: f.id,
      category: f.category,
      question: t?.question ?? "",
      answer: t?.answer ?? "",
      translationComplete: f.translations.length >= 2,
    };
  });
}

export async function getBlogPosts(locale: Locale) {
  const rows = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    include: { translations: true },
  });
  return rows.map((b) => {
    const t = tr(b.translations, locale)!;
    return {
      slug: t?.slug ?? b.slug,
      title: t?.title ?? b.slug,
      excerpt: t?.excerpt ?? "",
      category: t?.category ?? "",
      date: b.publishedAt?.toISOString().slice(0, 10) ?? "",
      readTime: b.readTime,
      gradient: b.gradient ?? "from-zinc-900 to-black",
      translationComplete: b.translations.length >= 2,
    };
  });
}

export async function getBlogBySlug(slug: string, locale: Locale) {
  const byTrans = await prisma.blogTranslation.findFirst({
    where: { slug, locale },
    include: { post: { include: { translations: true, seo: true } } },
  });
  const post =
    byTrans?.post ??
    (await prisma.blogPost.findFirst({
      where: { slug, status: "PUBLISHED" },
      include: { translations: true, seo: true },
    }));
  if (!post || post.status !== "PUBLISHED") return null;
  const t = tr(post.translations, locale)!;
  return {
    slug: t?.slug ?? post.slug,
    title: t?.title ?? post.slug,
    excerpt: t?.excerpt ?? "",
    content: t?.content ?? "",
    category: t?.category ?? "",
    date: post.publishedAt?.toISOString().slice(0, 10) ?? "",
    readTime: post.readTime,
    gradient: post.gradient ?? "from-zinc-900 to-black",
    seo: post.seo,
    translationComplete: post.translations.length >= 2,
  };
}

export async function getPricing(locale: Locale) {
  const plans = await prisma.pricingPlan.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { sortOrder: "asc" },
    include: { translations: true },
  });
  const byCat = new Map<string, typeof plans>();
  for (const p of plans) {
    const list = byCat.get(p.categoryCode) ?? [];
    list.push(p);
    byCat.set(p.categoryCode, list);
  }
  return Array.from(byCat.entries()).map(([categoryCode, tiers]) => ({
    id: categoryCode,
    title: categoryCode,
    tiers: tiers.map((tier) => {
      const t = tr(tier.translations, locale)!;
      return {
        id: tier.id,
        name: t?.name ?? tier.slug,
        priceFrom: tier.priceFrom,
        unit: t?.unit ?? "",
        description: t?.description ?? "",
        features: t?.features ?? [],
        highlighted: tier.highlighted,
      };
    }),
  }));
}

export async function getTeam(locale: Locale) {
  const rows = await prisma.teamMember.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { sortOrder: "asc" },
    include: { translations: true },
  });
  return rows.map((m) => {
    const t = tr(m.translations, locale)!;
    return {
      id: m.id,
      name: m.name,
      initials: m.initials,
      role: t?.role ?? "",
      bio: t?.bio ?? "",
      imageUrl: m.imageUrl,
    };
  });
}

export async function getLegal(slug: string, locale: Locale) {
  const page = await prisma.page.findFirst({
    where: { key: slug, status: "PUBLISHED" },
    include: { translations: true, seo: true },
  });
  if (!page) return null;
  const t = tr(page.translations, locale)!;
  return {
    title: t?.title ?? slug,
    body: t?.body ?? "",
    slug: t?.slug ?? slug,
    seo: page.seo,
  };
}
