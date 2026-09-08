/* Get-started stub (/agents/get-started) — DELIBERATE PLACEHOLDER.

   The checkout path from /pricing lands here. The price is settled ($40,000
   one time, stated on /pricing); only self-serve checkout mechanics are
   unfinished. This stub keeps the CTA a real route (not a dead link) and
   tells the visitor exactly where things stand, with the human escape
   hatch. The real checkout flow replaces this page. */

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
              Self-serve checkout for the prebuilt FS agent is being
              finished. The price is on the pricing page: $40,000, one time,
              nothing recurring. Until checkout ships, the purchase happens
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
