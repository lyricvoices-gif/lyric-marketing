/* ─────────────────────────────────────────────────────────────────────────
   PLACEHOLDER PRICING — single source of truth for /pricing.
   Replace these values with real numbers; nothing else needs to change.

   Steering relationship (this is the important part, not the exact figures):
   the ANNUAL Governance first-year price (entry, "up to 1 agent") sits CLOSE TO
   or JUST ABOVE the one-time Output price, so subscribing reads as "the output
   plus a year of ongoing governance, for about what you'd pay once." Annual is
   the anchor shown by default; monthly is the secondary option. Keep that
   output ⇄ annual relationship when swapping in real numbers.
   ───────────────────────────────────────────────────────────────────────── */

export type AgentTierKey = "1" | "5" | "20"

type AgentTier = { key: AgentTierKey; label: string }

export const PRICING: {
  output: { amount: string; billing: string }
  governance: {
    annual: Record<AgentTierKey, string>
    monthly: Record<AgentTierKey, string>
    agentTiers: AgentTier[]
  }
  enterprise: { amount: string }
} = {
  // One-time deliverable. The anchor the annual subscription is measured against.
  output: { amount: "$1,200", billing: "one-time" },

  governance: {
    // Annual = primary anchor. Entry (up to 1 agent) sits just above Output above.
    annual: { "1": "$1,490", "5": "$3,990", "20": "$9,990" },
    // Monthly = secondary option (intentionally not the headline framing).
    monthly: { "1": "$149", "5": "$399", "20": "$999" },
    agentTiers: [
      { key: "1", label: "Up to 1 agent" },
      { key: "5", label: "Up to 5 agents" },
      { key: "20", label: "Up to 20 agents" },
    ],
  },

  enterprise: { amount: "Custom" },
}
