"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LocaleToggle } from "./locale-toggle";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEMO_LINK_PROPS } from "@/lib/links";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useLocale } from "./locale-provider";

const FEATURE_ROUTES = [
  "/features/discover",
  "/features/aggregate",
  "/features/prds",
  "/features/sources",
];
const DOCS_ROUTES = ["/docs"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<null | "features" | "docs">(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { t } = useLocale();

  const NAV = useMemo(
    () => ({
      features: {
        label: t.nav.features,
        items: t.nav.featuresItems.map((it, i) => ({
          title: it.title,
          description: it.description,
          href: FEATURE_ROUTES[i],
        })),
      },
      docs: {
        label: t.nav.docs,
        items: t.nav.docsItems.map((it, i) => ({
          title: it.title,
          description: it.description,
          href: DOCS_ROUTES[i] ?? "/docs",
        })),
      },
    }),
    [t]
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    if (!dropdownRef.current || reducedMotion) return;
    const el = dropdownRef.current.querySelector<HTMLDivElement>(
      "[data-dropdown-panel]"
    );
    if (!el) return;
    if (open) {
      el.style.clipPath = "inset(0% 0% 0% 0%)";
      el.style.opacity = "1";
      el.style.pointerEvents = "auto";
    } else {
      el.style.clipPath = "inset(0% 0% 100% 0%)";
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
    }
  }, [open, reducedMotion]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled
            ? "border-b border-[var(--border-soft)] backdrop-blur-xl bg-[color-mix(in_oklab,var(--bg-primary)_78%,transparent)]"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="container-app flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--fg-primary)]"
            aria-label="PMOS — home"
          >
            <Logo />
          </Link>

          <nav
            ref={dropdownRef}
            className="hidden lg:flex items-center gap-1 relative"
            aria-label={t.nav.primary}
          >
            {(["features"] as const).map((key) => (
              <button
                key={key}
                className={cn(
                  "inline-flex items-center gap-1 px-3 py-2 rounded-full text-sm text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors",
                  open === key && "text-[var(--fg-primary)] bg-[var(--bg-secondary)]"
                )}
                aria-expanded={open === key}
                aria-haspopup="true"
                onClick={() => setOpen(open === key ? null : key)}
              >
                {NAV[key].label}
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-300",
                    open === key && "rotate-180"
                  )}
                />
              </button>
            ))}
            <button
              className={cn(
                "inline-flex items-center gap-1 px-3 py-2 rounded-full text-sm text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors",
                open === "docs" && "text-[var(--fg-primary)] bg-[var(--bg-secondary)]"
              )}
              aria-expanded={open === "docs"}
              aria-haspopup="true"
              onClick={() => setOpen(open === "docs" ? null : "docs")}
            >
              {NAV.docs.label}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-300",
                  open === "docs" && "rotate-180"
                )}
              />
            </button>
            <div
              data-dropdown-panel
              className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+0.75rem)] w-[min(92vw,780px)]"
              style={{
                clipPath: "inset(0% 0% 100% 0%)",
                opacity: 0,
                pointerEvents: "none",
                transition: reducedMotion
                  ? "none"
                  : "clip-path 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 250ms ease",
              }}
            >
              <div className="surface p-6 md:p-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {open &&
                    NAV[open].items.map((it) => (
                      <Link
                        key={it.title}
                        href={it.href}
                        onClick={() => setOpen(null)}
                        className="group rounded-xl p-4 hover:bg-[var(--bg-tertiary)] transition-colors border border-transparent hover:border-[var(--border-soft)]"
                      >
                        <div className="text-[var(--fg-primary)] text-[0.95rem] font-medium">
                          {it.title}
                        </div>
                        <div className="text-[var(--fg-secondary)] text-sm mt-1 leading-snug">
                          {it.description}
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <LocaleToggle />
            <ThemeToggle />
            <a {...DEMO_LINK_PROPS} className="btn btn-primary">
              {t.nav.getDemo}
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <LocaleToggle />
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-[var(--border)] text-[var(--fg-primary)]"
              aria-label={mobileOpen ? t.nav.close : t.nav.open}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <Hamburger open={mobileOpen} />
            </button>
          </div>
        </div>
      </header>

      <div
        aria-hidden={!mobileOpen}
        className="fixed inset-0 z-40 lg:hidden"
        style={{
          pointerEvents: mobileOpen ? "auto" : "none",
          background: "var(--bg-primary)",
          clipPath: mobileOpen ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          transition: reducedMotion
            ? "none"
            : "clip-path 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="container-app pt-24 pb-12 flex flex-col gap-3">
          <MobileGroup label={t.nav.features} items={NAV.features.items} onNavigate={() => setMobileOpen(false)} />
          <MobileGroup label={t.nav.docs} items={NAV.docs.items} onNavigate={() => setMobileOpen(false)} />
          <div className="mt-6 flex flex-col gap-2">
            <a {...DEMO_LINK_PROPS} className="btn btn-primary w-full">
              {t.nav.getDemo}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function Hamburger({ open }: { open: boolean }) {
  const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
  return (
    <span className="relative block h-3.5 w-4">
      <span
        className="absolute left-0 top-0 h-[1.5px] w-full bg-current origin-center"
        style={{
          transform: open ? "translateY(6px) rotate(45deg)" : "translateY(0) rotate(0)",
          transition: `transform 500ms ${ease}`,
        }}
      />
      <span
        className="absolute left-0 top-1/2 -translate-y-1/2 h-[1.5px] w-full bg-current"
        style={{
          opacity: open ? 0 : 1,
          transition: `opacity 200ms ease`,
        }}
      />
      <span
        className="absolute left-0 bottom-0 h-[1.5px] w-full bg-current origin-center"
        style={{
          transform: open
            ? "translateY(-6px) rotate(-45deg)"
            : "translateY(0) rotate(0)",
          transition: `transform 500ms ${ease}`,
        }}
      />
    </span>
  );
}

function MobileGroup({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: Array<{ title: string; description: string; href: string }>;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--border-soft)]">
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 text-lg serif text-[var(--fg-primary)]"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown
          className="h-4 w-4 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        />
      </button>
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? 600 : 0,
          transition: "max-height 300ms ease",
        }}
      >
        <div className="pb-3 px-4 space-y-2">
          {items.map((it) => (
            <a
              key={it.title}
              href={it.href}
              onClick={onNavigate}
              className="block rounded-lg px-3 py-2 hover:bg-[var(--bg-secondary)]"
            >
              <div className="text-[var(--fg-primary)] text-sm font-medium">
                {it.title}
              </div>
              <div className="text-[var(--fg-secondary)] text-xs leading-snug">
                {it.description}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
