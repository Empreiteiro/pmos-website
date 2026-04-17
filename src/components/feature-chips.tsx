"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useLocale } from "./locale-provider";

type Chip = { label: string; tooltip: string };

const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function FeatureChips() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const groupRef = useRef<HTMLDivElement | null>(null);
  const { t } = useLocale();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIdx(null);
    };
    const onClick = (e: MouseEvent) => {
      if (!groupRef.current) return;
      if (!groupRef.current.contains(e.target as Node)) setActiveIdx(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    setActiveIdx(null);
  }, [t]);

  return (
    <section
      id="chips"
      aria-labelledby="chips-heading"
      className="py-24 md:py-32 border-t border-[var(--border-soft)]"
    >
      <div className="container-app">
        <div className="max-w-3xl mb-12 md:mb-14">
          <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-tertiary)]">
            {t.home.chips.eyebrow}
          </div>
          <h2
            id="chips-heading"
            className="serif text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] mt-3 text-[var(--fg-primary)]"
          >
            {t.home.chips.heading}
          </h2>
          <p className="mt-5 text-[var(--fg-secondary)] text-lg max-w-2xl">
            {t.home.chips.lead}
          </p>
        </div>

        <div
          ref={groupRef}
          className="flex flex-wrap gap-2 md:gap-2.5 tooltip-group"
          data-open={activeIdx !== null ? "true" : "false"}
          id="chip-group"
        >
          {t.home.chips.items.map((c, i) => (
            <ChipWithTooltip
              key={c.label}
              label={c.label}
              tooltip={c.tooltip}
              open={activeIdx === i}
              onToggle={() => setActiveIdx(activeIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ChipWithTooltip({
  label,
  tooltip,
  open,
  onToggle,
}: Chip & { open: boolean; onToggle: () => void }) {
  const reducedMotion = useReducedMotion();
  const tipId = `${slug(label)}-tip`;
  const tipRef = useRef<HTMLSpanElement | null>(null);
  const [shiftX, setShiftX] = useState(0);

  useIsoLayoutEffect(() => {
    if (!open) {
      setShiftX(0);
      return;
    }
    const measure = () => {
      const el = tipRef.current;
      if (!el) return;
      const prevTransform = el.style.transform;
      el.style.transform = "translateX(-50%) scale(1)";
      const rect = el.getBoundingClientRect();
      el.style.transform = prevTransform;
      const vw =
        document.documentElement.clientWidth || window.innerWidth;
      const pad = 8;
      let shift = 0;
      if (rect.left < pad) shift = pad - rect.left;
      else if (rect.right > vw - pad) shift = vw - pad - rect.right;
      setShiftX(shift);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open]);

  return (
    <span className="relative tooltip-sibling" data-chip-open={open ? "true" : "false"}>
      <button
        type="button"
        className="chip"
        data-active={open ? "true" : "false"}
        aria-expanded={open}
        aria-describedby={open ? tipId : undefined}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        {label}
      </button>
      <span
        ref={tipRef}
        id={tipId}
        role="tooltip"
        className="absolute left-1/2 top-[calc(100%+0.5rem)] z-20 w-[min(88vw,280px)] text-center"
        style={{
          transform: `translateX(calc(-50% + ${shiftX}px)) scale(${
            open ? 1 : 0.95
          })`,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: reducedMotion
            ? "none"
            : "opacity 180ms ease, transform 180ms ease",
        }}
      >
        <span
          className="block rounded-lg px-3 py-2 text-xs leading-snug"
          style={{
            background: "var(--bg-tertiary)",
            color: "var(--fg-primary)",
            border: "1px solid var(--border)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          }}
        >
          {tooltip}
        </span>
      </span>
    </span>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
