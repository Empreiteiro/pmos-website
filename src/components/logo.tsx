import Image from "next/image";

/**
 * Brand mark + wordmark.
 *
 * Uses /public/raidho-mark.png — the Raidho rune rendered black on
 * transparent background. The `.logo-mark` class (in globals.css) inverts
 * the color in dark mode so the rune reads white, and keeps it black in
 * light mode.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label="PMOS"
    >
      <Image
        src="/raidho-mark.png"
        alt=""
        width={68}
        height={140}
        priority
        className="logo-mark h-[22px] w-auto"
      />
      <span
        className="serif text-[1.1rem] tracking-tight"
        style={{ letterSpacing: "-0.02em" }}
      >
        PMOS
      </span>
    </span>
  );
}
