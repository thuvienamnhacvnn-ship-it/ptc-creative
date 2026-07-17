"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, RotateCcw } from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import {
  labBudgets,
  labGoals,
  labIndustries,
  labProjects,
  moduleMeta,
  resolveLabStack,
} from "@/data/lab";
import { localePath, t, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { useAi } from "@/components/providers/ai-provider";
import { GridBox3D } from "@/components/home/grid-box-3d";

export function ProjectLab({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { openWithIdea } = useAi();
  const [industry, setIndustry] = useState(labIndustries[0].id);
  const [project, setProject] = useState(labProjects[0].id);
  const [goal, setGoal] = useState(labGoals[0].id);
  const [budget, setBudget] = useState(labBudgets[1].id);
  const [result, setResult] = useState<ReturnType<typeof resolveLabStack> | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setResult(null);
    window.setTimeout(() => {
      setResult(resolveLabStack(industry, project, goal, budget));
      setLoading(false);
    }, 650);
  };

  const reset = () => {
    setIndustry(labIndustries[0].id);
    setProject(labProjects[0].id);
    setGoal(labGoals[0].id);
    setBudget(labBudgets[1].id);
    setResult(null);
  };

  return (
    <Section id="project-lab" className="border-b border-border bg-elevated/40" contained={false}>
      <Container>
        <div className="max-w-2xl">
          <p className="spec mb-3">02 — Project Lab</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{dict.home.labTitle}</h2>
          <p className="mt-3 text-muted">{dict.home.labSubtitle}</p>
        </div>

        <div className="mt-10 grid gap-px border border-border bg-border lg:grid-cols-12">
          {/* Controls */}
          <div className="space-y-6 bg-card p-5 sm:p-7 lg:col-span-5">
            <Field
              label={dict.home.labIndustry}
              value={industry}
              onChange={setIndustry}
              options={labIndustries.map((o) => ({ id: o.id, label: t(o.label, locale) }))}
            />
            <Field
              label={dict.home.labProject}
              value={project}
              onChange={setProject}
              options={labProjects.map((o) => ({ id: o.id, label: t(o.label, locale) }))}
            />
            <Field
              label={dict.home.labGoal}
              value={goal}
              onChange={setGoal}
              options={labGoals.map((o) => ({ id: o.id, label: t(o.label, locale) }))}
            />
            <Field
              label={dict.home.labBudget}
              value={budget}
              onChange={setBudget}
              options={labBudgets.map((o) => ({ id: o.id, label: t(o.label, locale) }))}
            />

            <div className="flex flex-wrap gap-2 pt-2">
              <Button onClick={generate} disabled={loading}>
                <FlaskConical className="h-4 w-4" />
                {loading ? dict.common.loading : dict.home.labGenerate}
              </Button>
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
                {dict.home.labReset}
              </Button>
            </div>
          </div>

          {/* Solution stack stage — FP 3D grid box */}
          <div className="relative isolate min-h-[480px] overflow-hidden border-t border-border bg-[#01040a] lg:col-span-7 lg:border-l lg:border-t-0">
            <GridBox3D intensity="medium" className="z-0" />

            <div className="relative z-10 flex min-h-[480px] flex-col p-5 text-white sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] text-[rgba(120,180,255,0.65)] uppercase">
                    {dict.home.labResultTitle}
                  </div>
                  <p className="mt-0.5 font-mono text-[9px] tracking-wider text-white/35">
                    3D BOX · FIRST PERSON
                  </p>
                </div>
                <div className="border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent">
                  SIMULATION
                </div>
              </div>

              {loading && (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
                  <div className="h-8 w-8 animate-spin border border-[rgba(100,160,255,0.25)] border-t-accent" />
                  <p className="text-sm text-white/55">{dict.common.loading}</p>
                </div>
              )}

              {!loading && !result && (
                <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
                  <div className="max-w-xs border border-[rgba(80,140,220,0.2)] bg-black/35 px-5 py-6 backdrop-blur-sm">
                    <p className="font-mono text-[10px] tracking-[0.18em] text-[rgba(120,180,255,0.5)] uppercase">
                      Solution stack
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/50">
                      {dict.home.labResultEmpty}
                    </p>
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {!loading && result && (
                  <motion.div
                    key={result.modules.join("-")}
                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-5 flex flex-1 flex-col"
                  >
                    <p className="max-w-lg text-sm text-white/70">{t(result.summary, locale)}</p>
                    <p className="mt-5 font-mono text-[10px] tracking-widest text-[rgba(120,180,255,0.45)] uppercase">
                      {dict.home.labModules}
                    </p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {result.modules.map((m, i) => {
                        const meta = moduleMeta[m];
                        return (
                          <motion.div
                            key={m}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                            className="border border-[rgba(80,150,255,0.2)] bg-black/45 p-4 backdrop-blur-sm"
                          >
                            <div className="font-mono text-[10px] text-accent">
                              {meta?.code ?? "MOD"}
                            </div>
                            <div className="mt-1 text-sm font-semibold">
                              {meta ? t(meta.title, locale) : m}
                            </div>
                            <div className="mt-2 h-px w-8 bg-accent/60" />
                          </motion.div>
                        );
                      })}
                    </div>
                    <div className="mt-auto flex flex-wrap gap-2 pt-8">
                      <Button
                        href={localePath(locale, "/contact")}
                        className="bg-accent text-white hover:bg-accent-hover"
                      >
                        {dict.home.heroCtaPrimary}
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:border-accent hover:text-accent"
                        onClick={() =>
                          openWithIdea(
                            `${t(labIndustries.find((i) => i.id === industry)!.label, locale)} · ${t(
                              labProjects.find((p) => p.id === project)!.label,
                              locale
                            )}`
                          )
                        }
                      >
                        {dict.nav.openAi}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Field({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
}) {
  return (
    <div>
      <label className="spec mb-2 block">{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            className={cn(
              "border px-3 py-2 text-left text-xs font-medium transition-colors sm:text-sm",
              value === o.id
                ? "border-accent bg-accent-muted text-foreground"
                : "border-border bg-background text-muted hover:border-foreground/20 hover:text-foreground"
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
