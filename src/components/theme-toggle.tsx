"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle, mounted } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted
          ? `Switch to ${theme === "dark" ? "light" : "dark"} mode`
          : "Switch theme"
      }
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:bg-[var(--bg-secondary)] transition-colors ${className}`}
    >
      <Sun
        className="h-4 w-4 absolute transition-all duration-300"
        style={{
          opacity: mounted && theme === "light" ? 1 : 0,
          transform:
            mounted && theme === "light" ? "rotate(0deg) scale(1)" : "rotate(-45deg) scale(0.6)",
        }}
        aria-hidden
      />
      <Moon
        className="h-4 w-4 absolute transition-all duration-300"
        style={{
          opacity: !mounted || theme === "dark" ? 1 : 0,
          transform:
            !mounted || theme === "dark" ? "rotate(0deg) scale(1)" : "rotate(45deg) scale(0.6)",
        }}
        aria-hidden
      />
    </button>
  );
}
