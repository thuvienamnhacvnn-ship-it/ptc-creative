"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight, AlertCircle } from "lucide-react";
import type { Locale } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/vi";
import { useAi } from "@/components/providers/ai-provider";
import { moduleMeta } from "@/data/lab";
import { localePath, t, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type State = "idle" | "loading" | "success" | "error";

export function AiPanel({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { open, setOpen, seedIdea, setSeedIdea } = useAi();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [state, setState] = useState<State>("idle");
  const [streamText, setStreamText] = useState("");
  const [modules, setModules] = useState<string[]>([]);
  const [brief, setBrief] = useState("");
  const [missing, setMissing] = useState<string[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>();

  useEffect(() => {
    if (seedIdea) {
      setInput(seedIdea);
      setSeedIdea("");
    }
  }, [seedIdea, setSeedIdea]);

  useEffect(() => {
    document.body.classList.toggle("ai-panel-open", open);
    return () => document.body.classList.remove("ai-panel-open");
  }, [open]);

  const analyze = async (text?: string) => {
    const idea = (text ?? input).trim();
    if (!idea) {
      setState("error");
      return;
    }
    setState("loading");
    setModules([]);
    setBrief("");
    setMissing([]);
    setStreamText("");

    try {
      // Structured brief
      const briefRes = await fetch("/api/ai/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, locale }),
      });
      const briefJson = (await briefRes.json()) as {
        ok: boolean;
        data?: {
          requestedServices: string[];
          missingInformation: string[];
          industry: string;
          location: string;
          goals: string[];
        };
      };

      // Streaming chat
      const chatRes = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: idea,
          locale,
          conversationId,
          sessionId: typeof window !== "undefined" ? sessionStorage.getItem("ptc-ai-sid") ?? undefined : undefined,
        }),
      });
      const cid = chatRes.headers.get("X-Conversation-Id");
      if (cid) setConversationId(cid);
      if (typeof window !== "undefined" && !sessionStorage.getItem("ptc-ai-sid")) {
        sessionStorage.setItem("ptc-ai-sid", crypto.randomUUID());
      }

      if (chatRes.body) {
        const reader = chatRes.body.getReader();
        const decoder = new TextDecoder();
        let full = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          full += decoder.decode(value, { stream: true });
          setStreamText(full);
        }
        setBrief(full);
      }

      if (briefJson.ok && briefJson.data) {
        setModules(briefJson.data.requestedServices);
        setMissing(briefJson.data.missingInformation);
        if (!streamText && !brief) {
          setBrief(
            locale === "de"
              ? `Branche: ${briefJson.data.industry || "—"}. Standort: ${briefJson.data.location || "—"}.`
              : `Ngành: ${briefJson.data.industry || "—"}. Địa điểm: ${briefJson.data.location || "—"}.`
          );
        }
      }

      setState("success");
    } catch {
      setState("error");
    }
  };

  const convert = () => {
    setOpen(false);
    router.push(localePath(locale, "/dashboard/quotes/new"));
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close overlay"
            className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={dict.ai.title}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className={cn(
              "fixed inset-y-0 right-0 z-[70] flex w-full max-w-lg flex-col border-l border-border bg-card shadow-craft",
              "sm:max-w-md md:max-w-lg"
            )}
          >
            <header className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <h2 className="text-base font-semibold tracking-tight">{dict.ai.title}</h2>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted">{dict.ai.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-border p-2 text-muted hover:text-foreground"
                aria-label={dict.ai.close}
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
              <div>
                <label className="spec mb-2 block" htmlFor="ai-input">
                  Idea
                </label>
                <textarea
                  id="ai-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={dict.ai.placeholder}
                  rows={4}
                  className="w-full resize-none border border-border bg-background px-3 py-2.5 text-sm outline-none ring-accent focus:ring-2"
                />
                <Button
                  className="mt-2 w-full"
                  onClick={() => void analyze()}
                  disabled={state === "loading"}
                >
                  {state === "loading" ? dict.ai.thinking : dict.ai.send}
                </Button>
              </div>

              <div>
                <p className="spec mb-2">{dict.ai.suggested}</p>
                <div className="flex flex-col gap-1.5">
                  {dict.ai.suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setInput(s);
                        void analyze(s);
                      }}
                      className="border border-border bg-elevated px-3 py-2.5 text-left text-xs leading-snug text-muted transition-colors hover:border-accent/40 hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {state === "idle" && <p className="text-sm text-muted">{dict.ai.empty}</p>}

              {state === "error" && (
                <div className="flex items-start gap-2 border border-danger/30 bg-danger/10 px-3 py-3 text-sm text-danger">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  {dict.common.error}
                </div>
              )}

              {state === "loading" && (
                <div className="space-y-2">
                  <div className="h-3 w-2/3 animate-pulse bg-elevated" />
                  <div className="h-3 w-full animate-pulse bg-elevated" />
                  <div className="h-3 w-5/6 animate-pulse bg-elevated" />
                  {streamText && (
                    <p className="whitespace-pre-wrap text-sm text-muted">{streamText}</p>
                  )}
                </div>
              )}

              {state === "success" && (
                <div className="space-y-5">
                  <div>
                    <p className="spec mb-2">{dict.ai.briefTitle}</p>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                      {brief || streamText}
                    </p>
                    <p className="mt-2 font-mono text-[10px] text-muted">
                      {locale === "de"
                        ? "Vorläufig — keine Preise/Fristen. Server-side Gemini + Fallback."
                        : "Sơ bộ — không giá/deadline. Gemini server-side + fallback."}
                    </p>
                  </div>
                  {modules.length > 0 && (
                    <div>
                      <p className="spec mb-2">{dict.ai.servicesTitle}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {modules.map((m) => {
                          const meta = moduleMeta[m];
                          return (
                            <span
                              key={m}
                              className="border border-border bg-background px-2 py-1 font-mono text-[11px]"
                            >
                              <span className="text-accent">{meta?.code ?? m.slice(0, 3).toUpperCase()}</span>
                              <span className="mx-1 text-border">/</span>
                              {meta ? t(meta.title, locale) : m}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {missing.length > 0 && (
                    <div>
                      <p className="spec mb-2">{dict.ai.missingTitle}</p>
                      <ul className="space-y-1.5">
                        {missing.map((m) => (
                          <li key={m} className="flex gap-2 text-sm text-muted">
                            <span className="mt-1.5 h-1 w-1 shrink-0 bg-warning" />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            <footer className="border-t border-border p-4">
              <Button className="w-full" onClick={convert} disabled={state !== "success"}>
                {dict.ai.convertCta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
