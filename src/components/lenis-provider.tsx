"use client";

import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Initializes Lenis smooth scroll. Disabled under prefers-reduced-motion.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    let rafId: number;
    let cleanup: (() => void) | undefined;

    (async () => {
      const mod = await import("lenis");
      const Lenis = mod.default;
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        wheelMultiplier: 1,
        touchMultiplier: 1.25,
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      try {
        const stModule = await import("gsap/ScrollTrigger");
        const gsapModule = await import("gsap");
        const gsap = gsapModule.gsap || gsapModule.default;
        const ScrollTrigger = stModule.ScrollTrigger || stModule.default;
        gsap.registerPlugin(ScrollTrigger);
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((t: number) => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
      } catch {
        /* noop */
      }

      cleanup = () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    })();

    return () => cleanup?.();
  }, [reducedMotion]);

  return <>{children}</>;
}
