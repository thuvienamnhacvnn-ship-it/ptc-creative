"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Locale } from "@/types";
import { localePath } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { useAi } from "@/components/providers/ai-provider";

const ease = [0.22, 1, 0.36, 1] as const;

export function CtaBanner({
  locale,
  title,
  subtitle,
  button,
}: {
  locale: Locale;
  title: string;
  subtitle: string;
  button: string;
}) {
  const { setOpen } = useAi();
  const reduce = useReducedMotion();

  return (
    <Section className="home-stage-fill flex h-full flex-col justify-center border-0 py-0" contained={false}>
      <Container className="flex h-full max-h-full flex-col justify-center py-2 sm:py-3">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease }}
          className="group relative flex min-h-0 flex-1 flex-col justify-center overflow-hidden bg-transparent px-6 py-8 text-white sm:px-10 sm:py-10"
        >
          <div className="pointer-events-none absolute inset-0 bg-tech-grid-fine opacity-35 transition-opacity duration-500 group-hover:opacity-50" />
          <div className="pointer-events-none absolute -right-20 -top-10 h-64 w-64 rounded-full bg-[rgba(26,74,140,0.45)] blur-3xl transition-transform duration-700 group-hover:scale-110" />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
                Next signal
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">{subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                href={localePath(locale, "/contact")}
                size="lg"
                className="btn-premium group/btn shrink-0 shadow-md shadow-accent/25"
              >
                {button}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="btn-premium border-white/20 text-white hover:border-accent hover:text-accent"
                onClick={() => setOpen(true)}
              >
                <Sparkles className="h-4 w-4" />
                AI
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
