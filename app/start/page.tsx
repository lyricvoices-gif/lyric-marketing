/* Custom intake stub (/start) — DELIBERATE PLACEHOLDER.

   The custom path from /pricing and /callio lands here. The guided Callio
   intake is not yet publicly routable; this stub keeps "Generate your
   governed spec" a real route (not a dead link), states where things stand,
   and opens discovery over email. The real intake flow replaces this page.
   Same conventions as /agents/get-started (noindex, mailto escape hatch). */

import type { Metadata } from "next"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "Start your governed spec",
  description:
    "Begin a custom governed agent. The guided intake is being finished; discovery starts over email in the meantime.",
  robots: { index: false },
}

export default function StartPage() {
  return (
    <main className="lv-agents-start">
      <section className="lv-agents-start-hero">
        <div className="lv-agents-inner-narrow">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>Start &middot; Custom governed agent</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="lv-agents-headline">
              The intake opens <em>soon</em>.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={180}>
            <p className="lv-agents-sub">
              The guided Callio intake is being finished. It is free to
              complete. Until it ships, discovery starts over email: write to
              us and we will begin authoring the governed spec for your
              vertical.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={260}>
            <div className="lv-cta-row">
              <a
                href="mailto:info@lyricvoices.ai?subject=Custom%20governed%20agent"
                className="lv-cta lv-agents-cta-primary"
              >
                Start over email
              </a>
              <Link href="/pricing" className="lv-cta lv-agents-cta-outline">
                Back to pricing
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
