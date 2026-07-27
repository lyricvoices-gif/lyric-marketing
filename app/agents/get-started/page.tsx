/* Get-started stub (/agents/get-started) — DELIBERATE PLACEHOLDER.

   The adopt path from the FS Agents page lands here. Pricing and checkout
   mechanics are not yet decided; this stub keeps the CTA a real route (not
   a dead link) and tells the visitor exactly where things stand, with the
   human escape hatch. The real get-started flow replaces this page. */

import type { Metadata } from "next"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "Get started",
  description:
    "Adopt the prebuilt, governed Financial Services agent. The self-serve flow is being finished; reach us directly in the meantime.",
  robots: { index: false },
}

export default function AgentsGetStartedPage() {
  return (
    <main className="lv-agents-start">
      <section className="lv-agents-start-hero">
        <div className="lv-agents-inner-narrow">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>Get started &middot; Financial Services agent</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="lv-agents-headline">
              The self-serve flow is <em>almost here</em>.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={180}>
            <p className="lv-agents-sub">
              Adoption for the prebuilt FS agent is being finished, pricing
              and setup included. Until it ships, we will set you up
              directly: write to us and we will get your agent running.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={260}>
            <div className="lv-cta-row">
              <a
                href="mailto:info@lyricvoices.ai?subject=Adopt%20the%20FS%20agent"
                className="lv-cta lv-agents-cta-primary"
              >
                Adopt the FS agent
              </a>
              <Link href="/agents" className="lv-cta lv-agents-cta-outline">
                Back to the agent
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
