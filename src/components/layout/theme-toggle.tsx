"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ variant = "default" }: { variant?: "default" | "header" }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isHeader = variant === "header";

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(
          "flex items-center justify-center border",
          isHeader ? "h-8 w-8 border-[#2a4a72]/70" : "h-9 w-9 rounded-full border-border"
        )}
        aria-label="Toggle theme"
      />
    );
  }

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex items-center justify-center border transition-all duration-250",
        isHeader
          ? "group/hbtn h-8 w-8 border-[#2a4a72]/70 bg-[#0a1628]/80 text-[#9eb6d4] hover:border-accent/50 hover:bg-accent/10 hover:text-accent hover:shadow-[0_0_16px_rgba(255,77,0,0.2)]"
          : "h-9 w-9 rounded-full border-border bg-card text-foreground hover:border-accent/50 hover:text-accent"
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-3.5 w-3.5 transition-transform duration-300 group-hover/hbtn:rotate-45" />
      ) : (
        <Moon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/hbtn:-rotate-12" />
      )}
    </button>
  );
}
