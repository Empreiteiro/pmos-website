"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Reveal-on-scroll for children marked with `.reveal-init` inside a container.
 */
export function useGsapReveal<T extends HTMLElement = HTMLElement>(
  options: { stagger?: number; y?: number; start?: string } = {}
) {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap || gsapModule.default;
      const ScrollTrigger = stModule.ScrollTrigger || stModule.default;
      gsap.registerPlugin(ScrollTrigger);

      const items = el.querySelectorAll<HTMLElement>(".reveal-init");

      if (reducedMotion) {
        items.forEach((n) => {
          n.style.opacity = "1";
          n.style.transform = "none";
        });
        return;
      }

      const ctx = gsap.context(() => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: options.stagger ?? 0.08,
          scrollTrigger: {
            trigger: el,
            start: options.start ?? "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.set(items, {
          opacity: 0,
          y: options.y ?? 24,
        });
      }, el);

      cleanup = () => {
        ctx.revert();
      };
    })();

    return () => cleanup?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return ref;
}
