/**
 * Central place for outbound links used across the marketing site.
 * If the demo channel changes, update here — everything else follows.
 */

const DEMO_WHATSAPP_NUMBER = "5534996521315";
const DEMO_PREFILL =
  "Olá! Gostaria de conhecer o PMOS e agendar um demo.";

export const DEMO_URL = `https://wa.me/${DEMO_WHATSAPP_NUMBER}?text=${encodeURIComponent(
  DEMO_PREFILL
)}`;

export const DEMO_LINK_PROPS = {
  href: DEMO_URL,
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
