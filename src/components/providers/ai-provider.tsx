"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type AiContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  toggle: () => void;
  seedIdea: string;
  setSeedIdea: (v: string) => void;
  openWithIdea: (idea: string) => void;
};

const AiContext = createContext<AiContextValue | null>(null);

export function AiProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [seedIdea, setSeedIdea] = useState("");

  const toggle = useCallback(() => setOpen((o) => !o), []);
  const openWithIdea = useCallback((idea: string) => {
    setSeedIdea(idea);
    setOpen(true);
  }, []);

  const value = useMemo(
    () => ({ open, setOpen, toggle, seedIdea, setSeedIdea, openWithIdea }),
    [open, seedIdea, toggle, openWithIdea]
  );

  return <AiContext.Provider value={value}>{children}</AiContext.Provider>;
}

export function useAi() {
  const ctx = useContext(AiContext);
  if (!ctx) throw new Error("useAi must be used within AiProvider");
  return ctx;
}
