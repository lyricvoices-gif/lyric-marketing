/* ─────────────────────────────────────────────────────────────────────────
   PRICING — single source of truth for /pricing. These are starting points;
   edit them here and nothing else needs to change.

   Steering relationship (the important part, not the exact figures):
   - ANNUAL is the loud default. The entry annual price (1 agent) sits about at
     the one-time Foundation price, so subscribing reads as "the Foundation plus a
     year of governance, for about what you'd pay once."
   - MONTHLY is intentionally demoted to a quiet secondary line (monthlyFrom),
     never an equal toggle.
   - The per-agent ladder is VALUE-BASED: the per-agent cost DROPS as you scale
     (1 agent $1,490/yr ≈ $1,490 each; 5 agents $4,950/yr ≈ $990 each; 20 agents
     $14,900/yr ≈ $745 each). Above 20 agents routes to Enterprise.
   ───────────────────────────────────────────────────────────────────────── */

export type AgentTierKey = "1" | "5" | "20"

type AgentTier = { key: AgentTierKey; label: string }

export const PRICING: {
  foundation: { amount: string; billing: string }
  governance: {
    annual: Record<AgentTierKey, string>
    monthlyFrom: string
    agentTiers: AgentTier[]
    aboveLabel: string
  }
  enterprise: { amount: string }
} = {
  // One-time deliverable. The anchor the annual subscription is measured against.
  foundation: { amount: "$1,200", billing: "one-time" },

  governance: {
    // Annual = the loud default. Per-agent cost drops as the fleet grows.
    annual: { "1": "$1,490", "5": "$4,950", "20": "$14,900" },
    // Monthly = quiet secondary line beneath the annual price (entry/1 agent).
    monthlyFrom: "$149",
    agentTiers: [
      { key: "1", label: "1 agent" },
      { key: "5", label: "5 agents" },
      { key: "20", label: "20 agents" },
    ],
    // Above the top ladder rung, go to Enterprise.
    aboveLabel: "Above 20 agents",
  },

  enterprise: { amount: "Custom" },
}
