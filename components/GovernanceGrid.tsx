import type { ReactNode } from "react"
import { Activity, ArrowLeftRight, ScrollText, Target, type LucideIcon } from "lucide-react"
import ScrollReveal from "@/components/ScrollReveal"

/* Brand Governance Layer — the four capabilities as a static 2x2 grid on the
   bright surface (single column on mobile). All four are parallel and all
   four are visible at once; the earlier auto-advancing carousel imposed a
   false sequence and hid three of them behind a timer.

   Each cell: a small olive Lucide icon (stroke 2.25 so it sits well under
   the display serif), a quiet mono uppercase name, a serif tagline with the
   italic emphasis the section's headlines use, and the description. The
   vocabulary mirrors the dark proof section below (mono labels, serif with
   italics, eyebrow dot) so the two read as a matched light/dark pair. */

type Capability = {
  icon: LucideIcon
  name: string
  tagline: ReactNode
  body: string
}

const CAPABILITIES: readonly Capability[] = [
  {
    icon: ScrollText,
    name: "Capture the persona",
    tagline: (
      <>
        Your brand becomes a <em>portable specification</em>.
      </>
    ),
    body: "One versioned source of truth for how every agent should sound and speak.",
  },
  {
    icon: Target,
    name: "Govern",
    tagline: (
      <>
        Hold every agent in <em>tolerance</em>.
      </>
    ),
    body: "Every agent is conditioned against the spec at the point of generation, so it stays on brand before a word reaches the customer. The same standard, applied everywhere.",
  },
  {
    icon: ArrowLeftRight,
    name: "Port",
    tagline: (
      <>
        Stay <em>vendor agnostic</em>.
      </>
    ),
    body: "The spec is portable. Move from one speech provider to another and the brand voice holds. ElevenLabs, Hume, Microsoft, and whatever comes next.",
  },
  {
    icon: Activity,
    name: "Monitor",
    tagline: (
      <>
        Catch <em>drift</em> over time.
      </>
    ),
    body: "Every governed agent is monitored over time. Drift against the spec is caught, consistency and disclosure adherence are checked, and when something sounds off-brand, the cause is diagnosed.",
  },
] as const

export default function GovernanceGrid() {
  return (
    <div className="lv-capgrid">
      {CAPABILITIES.map((c, i) => {
        const Icon = c.icon
        return (
          <ScrollReveal key={c.name} delay={i * 90}>
            <div className="lv-cap">
              <span className="lv-cap-icon" aria-hidden="true">
                <Icon size={20} strokeWidth={2.25} />
              </span>
              <p className="lv-cap-name">{c.name}</p>
              <h3 className="lv-cap-tagline">{c.tagline}</h3>
              <p className="lv-cap-body">{c.body}</p>
            </div>
          </ScrollReveal>
        )
      })}
    </div>
  )
}
