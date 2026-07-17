import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { CtaBanner } from "@/components/shared/cta-banner";
import { HomeTeam } from "@/components/home/home-team";
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
    title: dict.meta.aboutTitle,
    description: dict.meta.aboutDesc,
    path: "/about",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const a = dict.about;
  const story = dict.home.story;

  const values = [
    { title: a.value1Title, desc: a.value1Desc },
    { title: a.value2Title, desc: a.value2Desc },
    { title: a.value3Title, desc: a.value3Desc },
    { title: a.value4Title, desc: a.value4Desc },
  ];

  const process = dict.home.processSteps.map((step, i) => ({
    n: String(i + 1).padStart(2, "0"),
    title: step.title,
    desc: step.desc,
  }));

  return (
    <>
      <PageHero badge={a.badge} title={story.title} subtitle={story.lead} />

      <Section id="story" className="scroll-mt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <AnimatedSection className="lg:col-span-4">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {story.title}
            </h2>
            <div className="mt-6 grid grid-cols-3 gap-2 border border-border bg-card/40 p-3">
              {story.pillars.map((p) => (
                <div key={p.label} className="text-center">
                  <p className="font-mono text-[10px] tracking-wider text-muted uppercase">
                    {p.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold">{p.value}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="space-y-4 text-muted leading-relaxed lg:col-span-8">
            <p>{story.p1}</p>
            <p>{story.p2}</p>
            <p>{story.p3}</p>
            <p>{story.p4}</p>
          </AnimatedSection>
        </div>
      </Section>

      <Section className="bg-elevated/40">
        <AnimatedSection className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {a.valuesTitle}
          </h2>
        </AnimatedSection>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="border border-border bg-card p-6">
              <div className="mb-3 h-1 w-8 bg-accent" />
              <h3 className="font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Reuse home team portraits for 3 founders */}
      <HomeTeam locale={locale} dict={dict} />

      <Section id="process" className="scroll-mt-24 bg-elevated/40">
        <AnimatedSection className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {a.processTitle}
          </h2>
        </AnimatedSection>
        <div className="grid gap-4 md:grid-cols-2">
          {process.map((s) => (
            <div key={s.n} className="flex gap-4 border border-border bg-card p-6">
              <span className="font-mono text-sm font-medium text-accent">{s.n}</span>
              <div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CtaBanner
        locale={locale}
        title={dict.home.ctaTitle}
        subtitle={dict.home.ctaSubtitle}
        button={dict.home.ctaButton}
      />
    </>
  );
}
