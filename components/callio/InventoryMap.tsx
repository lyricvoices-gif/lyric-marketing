/* Inventory visual: the governed corpus mapped by channel reach. Inline SVG,
   diagrammatic by design (the spec itself is generated in the app and is not
   shown on this page). Every number renders from INTAKE_FACTS. */

import { INTAKE_FACTS } from "@/components/callio/intake-facts"

const F = INTAKE_FACTS

export default function InventoryMap() {
  const everywhere =
    F.governance.totalBlocks - F.governance.voiceOnlyBlocks - F.governance.textOnlyBlocks
  const rows = [
    { label: "Hold on every channel", count: everywhere, max: everywhere },
    { label: "Voice only", count: F.governance.voiceOnlyBlocks, max: everywhere },
    { label: "Text only", count: F.governance.textOnlyBlocks, max: everywhere },
  ]
  const W = 560
  const barX = 210
  const barMax = 300
  return (
    <svg
      viewBox={`0 0 ${W} 232`}
      role="img"
      aria-label={`The authored corpus by channel reach: ${everywhere} blocks hold on every channel, ${F.governance.voiceOnlyBlocks} apply only to voice, ${F.governance.textOnlyBlocks} only to text. Channel-native guidance is authored separately for SMS, email, and chat.`}
      className="lv-cin-svg"
    >
      <text x="0" y="18" className="lv-cin-svg-title">
        {F.governance.totalBlocks} authored blocks, by channel reach
      </text>
      {rows.map((r, i) => {
        const y = 44 + i * 44
        const w = Math.max(10, (r.count / r.max) * barMax)
        return (
          <g key={r.label}>
            <text x="0" y={y + 14} className="lv-cin-svg-label">
              {r.label}
            </text>
            <rect x={barX} y={y} width={barMax} height={20} rx={10} className="lv-cin-svg-track" />
            <rect x={barX} y={y} width={w} height={20} rx={10} className="lv-cin-svg-bar" />
            <text x={barX + w + 10} y={y + 14} className="lv-cin-svg-count">
              {r.count}
            </text>
          </g>
        )
      })}
      <line x1="0" y1="180" x2={W} y2="180" className="lv-cin-svg-rule" />
      <text x="0" y="204" className="lv-cin-svg-label">
        Channel-native guidance
      </text>
      {["SMS", "Email", "Chat"].map((c, i) => (
        <g key={c}>
          <rect x={barX + i * 78} y={190} width={68} height={22} rx={11} className="lv-cin-svg-chip" />
          <text x={barX + i * 78 + 34} y={205} textAnchor="middle" className="lv-cin-svg-chip-text">
            {c}
          </text>
        </g>
      ))}
      <text x="0" y="228" className="lv-cin-svg-foot">
        Plus the foundation: {F.foundation.items} governed items in {F.foundation.categories}{" "}
        categories.
      </text>
      {/* EXEMPLAR SLOT (inventory visual) — when exemplars land, add an
          exemplar row or strip here driven by INTAKE_FACTS. */}
    </svg>
  )
}
