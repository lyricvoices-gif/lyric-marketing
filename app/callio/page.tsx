/* Callio product page — restructured for an enterprise buyer (CX, Compliance,
   Ops, Brand, procurement) while keeping the premium editorial mood. Ten
   sections, inspectable top to bottom:

     1) Hero            — the problem in one screen
     2) Before / after  — same question, governed vs ungoverned (the one audio module)
     3) What Callio is  — plain explanation, no metaphor
     4) How it works    — Codify / Govern / Port / Monitor (dark)
     5) Build the spec  — Sonic intake, the real spec dimensions
     6) Across channels — one voice, adapted per channel (text; voice links to §2)
     7) Architecture    — Callio sits above the model and the engine (dark)
     8) Outcomes        — one outcome per buyer
     9) Founders        — the trust beat (a decade of doing it by hand)
    10) Final CTA       — Sonic is the demo

   Guardrails: flat declarative voice, no em dashes, no exclamation points.
   Callio codifies and governs, it never builds the agent. Monitor is brand-voice
   governance monitoring, not security. No fabricated proof. Live Lyric tokens
   only; scoped styles under .lv-opus-* / .lv-callio-* / .lv-arch-* in globals.css. */

import type { Metadata } from "next"
import type { CSSProperties, ReactNode } from "react"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import CallioHearIt from "@/components/callio/CallioHearIt"
import CallioDriftVisual from "@/components/hero/CallioDriftVisual"
import CallioFlow from "@/components/callio/CallioFlow"
import CallioArchitecture from "@/components/callio/CallioArchitecture"
import SonicPreview from "@/components/callio/SonicPreview"
import InTextProof from "@/components/callio/InTextProof"

export const metadata: Metadata = {
  title: "Callio",
  description:
    "Callio keeps every AI agent aligned to one approved voice, policy, and communication standard. A vendor-agnostic governance layer above your models and speech engines.",
}

const DARK = "#2b2a25"
const START = "/start"
const CONTACT = "/contact"

/* Pill CTA, mirroring the homepage / pricing Final CTA buttons. */
function CTA({
  href,
  children,
  variant = "dark",
}: {
  href: string
  children: ReactNode
  variant?: "dark" | "light" | "outline"
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:")
  const style: CSSProperties = {
    minHeight: "54px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 24px",
    borderRadius: "100px",
    fontSize: "15px",
    fontWeight: 500,
    letterSpacing: "0",
    background:
      variant === "light"
        ? "var(--bg-light)"
        : variant === "dark"
          ? "var(--olive)"
          : "transparent",
    color:
      variant === "light"
        ? "var(--olive)"
        : variant === "dark"
          ? "var(--bg-light)"
          : "inherit",
    border: variant === "outline" ? "1px solid currentColor" : "1px solid transparent",
    transition: "background 0.22s ease, color 0.22s ease, transform 0.22s ease",
  }
  const className = `lv-cta lv-cta-${variant}`
  if (isExternal) {
    return (
      <a href={href} className={className} style={style}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  )
}

/* Mono small-caps eyebrow, dot + label. */
function Eyebrow({ label, onDark = false }: { label: string; onDark?: boolean }) {
  return (
    <div className={`lv-philosophy-eyebrow lv-opus-eyebrow${onDark ? " is-dark" : ""}`}>
      <span className="lv-eyebrow-dot" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

/* Section 8 — outcomes, one per buyer. */
const OUTCOMES = [
  { buyer: "CX", line: "A consistent customer experience across every agent and channel." },
  { buyer: "Compliance", line: "Approved language and auditable, consistent disclosures." },
  { buyer: "Ops", line: "Fewer escalations and less drift." },
  { buyer: "Brand", line: "One recognizable voice everywhere." },
]

export default function CallioPage() {
  return (
    <main className="lv-opus">
      {/* ── Section 1 — Hero. The problem in one screen: agents multiplying and
            drifting, shown live (call, then chat, then SMS) in the drift visual. ── */}
      <section className="lv-opus-hero">
        <div className="lv-opus-wrap lv-opus-hero-grid">
          <div className="lv-opus-hero-copy">
            <ScrollReveal>
              <Eyebrow label="Callio" />
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <h1 className="lv-opus-hero-head">
                Your agents are multiplying. They don&rsquo;t sound like the{" "}
                <em>same company</em>.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={220}>
              <p className="lv-opus-hero-sub">
                Callio keeps every AI agent aligned to one approved voice, policy,
                and communication standard.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={320}>
              <div className="lv-cta-row">
                <CTA href={START} variant="dark">
                  Build your voice spec
                </CTA>
                <CTA href={CONTACT} variant="outline">
                  Talk to us
                </CTA>
              </div>
            </ScrollReveal>
          </div>

          <div className="lv-opus-hero-demo">
            <CallioDriftVisual />
          </div>
        </div>
      </section>

      {/* ── Section 2 — Before / after. The one audio-grade module on the page:
            same question, ungoverned vs governed by Callio. ── */}
      <section className="lv-opus-hear" id="hear">
        <div className="lv-opus-wrap">
          <ScrollReveal>
            <Eyebrow label="Hear it" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p className="lv-opus-hear-framing">
              Your customers ask the same questions. Your agents shouldn&rsquo;t
              sound like different companies.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <CallioHearIt />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Section 3 — What Callio is. Plain explanation, no metaphor. ── */}
      <section className="lv-callio-what">
        <div className="lv-opus-wrap lv-callio-what-inner">
          <ScrollReveal>
            <Eyebrow label="What it is" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2 className="lv-callio-what-head">
              A governance layer for AI communication.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="lv-callio-what-body">
              Callio sits above your models, voice engines, and agent channels. It
              translates your brand, compliance, and CX rules into a portable
              communication spec, and holds every agent to it. It does not build
              the agent. It governs how the agents you already run sound and speak.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Section 4 — How it works. Four steps on a dark chapter ground; the
            left column frames the lifecycle, the right is the numbered list with
            the Monitor mechanism. ── */}
      <section className="lv-opus-how" style={{ background: DARK }}>
        <div className="lv-opus-wrap">
          <div className="lv-opus-how-grid">
            <div className="lv-opus-how-copy">
              <ScrollReveal>
                <Eyebrow label="How it works" onDark />
              </ScrollReveal>
              <ScrollReveal delay={120}>
                <h2 className="lv-opus-how-head">One spec. Every agent held to it.</h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="lv-opus-how-body">
                  One lifecycle. Codify the spec, govern every response, port it
                  across your stack, and monitor for drift over time.
                </p>
              </ScrollReveal>
            </div>

            <div className="lv-opus-how-list">
              <CallioFlow />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5 — Build the voice spec (Sonic). Shows the real spec
            dimensions a brand configures, not agent-build machinery. ── */}
      <section className="lv-opus-sonic">
        <div className="lv-opus-wrap">
          <ScrollReveal>
            <Eyebrow label="Sonic" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2 className="lv-opus-sonic-head">
              Tell Sonic about your brand. <em>It does the rest.</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="lv-opus-sonic-body">
              Sonic is the guided intake. It asks the facts with a short
              questionnaire, then shows you options and you pick the ones that
              sound like you. It never asks you to describe your voice in
              adjectives. Your picks become the spec.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={280}>
            <SonicPreview />
          </ScrollReveal>

          <ScrollReveal delay={360}>
            <div className="lv-cta-row">
              <CTA href={START} variant="dark">
                Build your voice spec
              </CTA>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Section 6 — Governance across channels. One voice, adapted to each
            channel. Text comparisons; the voice channel links back to §2. ── */}
      <section className="lv-opus-proof">
        <div className="lv-opus-wrap">
          <ScrollReveal>
            <Eyebrow label="Across channels" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p className="lv-opus-proof-framing">
              Same brand. Every channel. One question:{" "}
              <em>&ldquo;Did my payment go through?&rdquo;</em>
            </p>
          </ScrollReveal>

          <InTextProof />

          <ScrollReveal delay={380}>
            <p className="lv-opus-proof-caption">
              Callio does not make every answer identical. It keeps the voice
              consistent while adapting to each channel. Text drift is read. Voice
              drift is heard, in the before and after above.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Section 7 — Deployment and architecture. Callio sits above the model
            and the speech engine and directs them. Dark ground, diagram. ── */}
      <section className="lv-callio-arch" style={{ background: DARK }}>
        <div className="lv-opus-wrap">
          <ScrollReveal>
            <Eyebrow label="Architecture" onDark />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2 className="lv-callio-arch-head">
              We direct the engines. <em>We are not one of them.</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p className="lv-callio-arch-takeaway">
              Vendor-agnostic. Swap any engine and the brand voice holds. No stack
              lock-in.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={320}>
            <CallioArchitecture />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Section 8 — Outcomes by buyer. ── */}
      <section className="lv-callio-out">
        <div className="lv-opus-wrap">
          <ScrollReveal>
            <Eyebrow label="Outcomes" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2 className="lv-callio-out-head">One voice, measured four ways.</h2>
          </ScrollReveal>
          <div className="lv-callio-out-grid">
            {OUTCOMES.map((o, i) => (
              <ScrollReveal key={o.buyer} delay={180 + i * 70}>
                <div className="lv-callio-out-item">
                  <span className="lv-callio-out-buyer">{o.buyer}</span>
                  <p className="lv-callio-out-line">{o.line}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 9 — Founders. The trust beat. A decade of doing this work by
            hand, built into a system. Structural slot for logos / posture is left
            unpopulated on purpose, no placeholder logos or invented badges. ── */}
      <section className="lv-callio-founders">
        <div className="lv-opus-wrap lv-callio-founders-inner">
          <ScrollReveal>
            <Eyebrow label="Founders" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <blockquote className="lv-callio-founders-quote">
              We spent more than a decade doing this work by hand. We tuned brand
              voices across engines, caught drift by ear, and wrote the disclosure
              lines that had to be exact. <em>Callio is that practice, built into a
              system.</em>
            </blockquote>
          </ScrollReveal>
          {/* Structural slot for customer references and security posture, left
              unpopulated until they are real. Do not add placeholder logos or
              certification badges here. */}
          <div className="lv-callio-trust-slot" aria-hidden="true" />
        </div>
      </section>

      {/* ── Section 10 — Final CTA. Sonic is the demo. Build the spec, or talk to
            us. No self-serve "try for free" for a governance buyer. ── */}
      <section className="lv-final lv-opus-close" style={{ background: DARK }}>
        <ScrollReveal>
          <div className="lv-philosophy-eyebrow lv-final-eyebrow">
            <span className="lv-eyebrow-dot" aria-hidden="true" />
            <span>One brand voice, everywhere</span>
          </div>
          <h2>
            <span className="lv-final-line">All your agents,</span>
            <br />
            <span className="lv-final-line">one <em>brand voice</em>.</span>
          </h2>
          <p className="lv-callio-final-sub">
            Start with Sonic. Tell it about your brand and hear your voice take
            shape.
          </p>
          <div className="lv-cta-row lv-cta-row-center">
            <CTA href={START} variant="light">
              Build your AI comms spec
            </CTA>
            <CTA href={CONTACT} variant="outline">
              Book a call
            </CTA>
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
