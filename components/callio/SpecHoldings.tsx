/* What-you-hold visual: the spec's shape and the obligations by owner.
   Deliberately abstract inline SVG: the spec itself is generated in the app
   and is not shown on this page, so fields render as unlabeled rows, never as
   values. Every number renders from INTAKE_FACTS. */

import { INTAKE_FACTS } from "@/components/callio/intake-facts"

const F = INTAKE_FACTS

const OWNERS = [
  { label: "Your counsel", count: F.obligations.counsel },
  { label: "Your team", count: F.obligations.institution },
  { label: "Shared counsel and team", count: F.obligations.sharedCounselInstitution },
  { label: "The intake, as it grows", count: F.obligations.intake },
]

export default function SpecHoldings() {
  const W = 560
  return (
    <svg
      viewBox={`0 0 ${W} 260`}
      role="img"
      aria-label={`The governed specification: ${F.spec.fields} fields of brand intent, and ${F.obligations.total} named obligations emitted empty with owners recorded: ${OWNERS.map((o) => `${o.label} ${o.count}`).join(", ")}.`}
      className="lv-cin-svg"
    >
      {/* The spec card: abstract field rows, no values. */}
      <rect x="0" y="0" width="240" height="248" rx="14" className="lv-cin-svg-card" />
      <text x="20" y="32" className="lv-cin-svg-card-title">
        The spec
      </text>
      <text x="20" y="52" className="lv-cin-svg-card-sub">
        {F.spec.fields} fields of brand intent
      </text>
      {Array.from({ length: F.spec.fields }, (_, i) => (
        <g key={i}>
          <rect x="20" y={68 + i * 21} width="8" height="8" rx="4" className="lv-cin-svg-dot" />
          <rect
            x="38"
            y={68 + i * 21}
            width={i % 3 === 0 ? 150 : i % 3 === 1 ? 118 : 88}
            height="8"
            rx="4"
            className="lv-cin-svg-fieldbar"
          />
        </g>
      ))}
      {/* EXEMPLAR SLOT (what-you-hold visual) — when exemplars land in the
          spec, add the exemplars block beneath the field rows here, driven by
          INTAKE_FACTS.spec. */}

      {/* Obligations by owner. */}
      <text x="280" y="32" className="lv-cin-svg-card-title">
        {F.obligations.total} named obligations
      </text>
      <text x="280" y="52" className="lv-cin-svg-card-sub">
        emitted empty, owner recorded
      </text>
      {OWNERS.map((o, i) => {
        const y = 76 + i * 46
        return (
          <g key={o.label}>
            <text x="280" y={y + 8} className="lv-cin-svg-label">
              {o.label}
            </text>
            <g>
              {Array.from({ length: o.count }, (_, j) => (
                <rect
                  key={j}
                  x={280 + j * 22}
                  y={y + 16}
                  width="16"
                  height="10"
                  rx="5"
                  className="lv-cin-svg-slot"
                />
              ))}
            </g>
          </g>
        )
      })}
    </svg>
  )
}
