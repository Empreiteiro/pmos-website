"use client";

import { useGsapParallax } from "@/hooks/use-gsap-parallax";

export function PreFooter() {
  const ref = useGsapParallax<HTMLDivElement>(40);
  return (
    <section
      aria-hidden
      className="relative overflow-hidden pt-20 md:pt-28 pb-10 md:pb-16"
    >
      <div className="container-app">
        <div ref={ref} className="will-change-transform">
          <div
            className="serif text-[clamp(4rem,20vw,18rem)] leading-[0.9] tracking-[-0.04em] text-[var(--fg-primary)] select-none"
            style={{
              fontFeatureSettings: "'ss01'",
            }}
          >
            PMOS
          </div>
        </div>
      </div>
    </section>
  );
}
