/* ─────────────────────────────────────────────────────────────────────────
   PRICING — single source of truth for /pricing.

   The settled commercial model (2026-07-31): two purchase paths, both
   one-time. Prebuilt is the FS agent; custom is a governed agent authored
   for the customer's business and vertical to the same standard (NOT
   governance wrapped around an agent they already run). No subscription, no
   recurring license, no annual fee, no activation fee, no platform fee, no
   agent-count billing. Consulting is an optional add-on on either path,
   priced per engagement. The evaluation and monitoring layer is INCLUDED on
   both paths, never an upsell.
   ───────────────────────────────────────────────────────────────────────── */

export const PRICING = {
  prebuilt: { amount: "$40,000", billing: "One-time purchase" },
  custom: { amount: "$25,000", billing: "One-time purchase" },
  consulting: { amount: "Professional services", billing: "Optional" },
} as const
