/* PREVIEW ONLY — unlinked route for reviewing voice-roster layout
   explorations against the current treatment. Renders the current
   gallery plus each candidate variant as full-width sections with a
   mono label between them. Delete (or prune to the chosen variant)
   once a direction is picked. Not linked from nav; never deployed
   into a user journey. */

import type { Metadata } from "next"
import AgentsVoicesGallery from "@/components/agents/AgentsVoicesGallery"
import RosterVariantA from "@/components/agents/roster-variants/RosterVariantA"
import RosterVariantB from "@/components/agents/roster-variants/RosterVariantB"

export const metadata: Metadata = {
  title: "Roster layout preview — Lyric",
  robots: { index: false, follow: false },
}

function Label({ children }: { children: string }) {
  return (
    <div
      style={{
        maxWidth: 1060,
        margin: "0 auto",
        padding: "18px 24px 0",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "#61644C",
      }}
    >
      {children}
    </div>
  )
}

function Head() {
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 24px" }}>
      <h2 className="lv-agents-section-head" style={{ marginTop: 10 }}>
        Same agent. <em>You choose who delivers it.</em>
      </h2>
    </div>
  )
}

export default function RosterPreviewPage() {
  return (
    <main style={{ background: "var(--bg-light)", paddingBottom: 120 }}>
      <section id="current" style={{ padding: "40px 0 60px" }}>
        <Label>Current — gallery tiles</Label>
        <Head />
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 24px" }}>
          <AgentsVoicesGallery />
        </div>
      </section>

      <section id="variant-a" style={{ padding: "40px 0 60px", borderTop: "1px solid var(--border)" }}>
        <Label>Variant A</Label>
        <Head />
        <RosterVariantA />
      </section>

      <section id="variant-b" style={{ padding: "40px 0 60px", borderTop: "1px solid var(--border)" }}>
        <Label>Variant B</Label>
        <Head />
        <RosterVariantB />
      </section>
    </main>
  )
}
