import type { Metadata } from "next"
import Link from "next/link"

import AgentChannelDemo from "@/components/agents/AgentChannelDemo"
import AgentsFaq from "@/components/agents/AgentsFaq"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "Pre-built Agent Foundations",
  description:
    "Start with a governed Financial Services agent foundation, then tailor its behavior, workflows, policies, and voice to your institution.",
}

const FOUNDATION_SYSTEM = [
  ["Behavior", "Tone, response shape, and judgment under pressure"],
  ["Guardrails", "Boundaries for what the agent will and will not do"],
  ["Workflows", "Defined paths for common, high-stakes interactions"],
  ["Escalation", "Clear rules for when a person needs to take over"],
  ["Exemplars", "Concrete examples of responses that meet the standard"],
  ["Evaluation", "Criteria for detecting drift after launch"],
] as const

const TAILOR_ITEMS = [
  "Your brand voice",
  "Your policies and terminology",
  "Your systems and escalation paths",
] as const

/* Every pricing answer here must match /pricing: a one-time purchase, no
   recurring license, no agent-count billing, the eval layer included. */
const FAQ = [
  {
    q: "What does the agent include out of the box?",
    a: "The governed Financial Services build: the verify-before-disclose call flow, dispute and hold handling, disclosure delivery, and FS pronunciation and voice-output standards. You choose one of three produced voices, Sol, Sam, or James, each delivering the same governed agent, all governed by the full Callio Financial Services spec.",
  },
  {
    q: "How is it priced?",
    a: "It is $40,000, one time. There is no recurring license, no activation fee, no platform fee, and no tiers by company size. The eval layer is included. The pricing page states the price and what the purchase delivers.",
  },
  {
    q: "What do you provide, and what does your team approve?",
    a: "The agent arrives fully governed by Callio. What your team approves is the exact language it is legally required to say: your disclosure lines, your identity-verification requirements, and your brand name and terms. Callio governs how the agent behaves; your legal and compliance team approves the specific words behind that behavior.",
  },
  {
    q: "How does it connect to our systems?",
    a: "The agent sits on top of your existing telephony and account systems rather than replacing them. Verification checks and account lookups call your endpoints at call time, so your systems of record stay where they are. And because the governance layer is vendor-agnostic across models and speech engines, you are not locked into a single provider either.",
  },
  {
    q: "What about data and compliance?",
    a: "Callio governs what the agent is allowed to say and keeps a record of how it said it. That is brand and behavior governance, not a security or compliance certification, and it does not replace your own controls. Your account systems and customer data stay in your stack. The agent reads from them at call time through your integration, so Callio is not a store or a processor of your customer data.",
  },
  {
    q: "Can we change the voice or the wording?",
    a: "Both. Choose Sol, Sam, or James for delivery, and your own disclosure and verification wording is what the agent uses. The governance holds either way, whichever voice you pick and whatever your legal and compliance team approves.",
  },
]

function Eyebrow({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <div className={`lv-philosophy-eyebrow lv-agents-v3-eyebrow${dark ? " is-dark" : ""}`}>
      <span className="lv-eyebrow-dot" aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}

export default function AgentsPage() {
  return (
    <main className="lv-agents-v2 lv-agents-v3">
      <section className="lv-agents-v3-hero lv-floret-ground">
        <div className="lv-agents-v3-wrap">
          <div className="lv-agents-v3-hero-copy">
            <ScrollReveal>
              <Eyebrow>Pre-built agent foundations</Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h1>Start with the standard already built.</h1>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <p>
                Financial Services is Lyric&apos;s first pre-built foundation: governed
                behavior, workflows, guardrails, and evaluation criteria ready to
                tailor to your institution.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="lv-agents-v3-actions">
                <Link href="#experience" className="lv-agents-v3-primary-link">
                  Experience the foundation
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={180} distance={24}>
            <div className="lv-agents-v3-foundation-line" aria-label="What the Financial Services foundation includes">
              <span>Financial Services foundation</span>
              <ul>
                <li>Behavior</li>
                <li>Workflows</li>
                <li>Guardrails</li>
                <li>Evaluation</li>
              </ul>
              <strong>Ready to tailor</strong>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="experience" className="lv-agents-v3-section lv-agents-v3-experience">
        <div className="lv-agents-v3-wrap">
          <ScrollReveal>
            <div className="lv-agentstory-header lv-agents-v3-experience-head">
              <Eyebrow>Financial Services</Eyebrow>
              <h2 className="lv-agentstory-headline">See the standard in action.</h2>
              <p className="lv-agentstory-supporting">
                A dispute makes the foundation visible: the agent verifies access,
                uses approved terminology, and explains the resolution path.
              </p>
              <div
                className="lv-cxp-intro-points lv-agentstory-points"
                aria-label="Behaviors demonstrated"
              >
                <span>Verify before access</span>
                <span>Approved terminology</span>
                <span>Resolution explained</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={140} distance={22}>
            <AgentChannelDemo />
          </ScrollReveal>
        </div>
      </section>

      <section className="lv-agents-v3-section lv-agents-v3-system">
        <div className="lv-agents-v3-wrap lv-agents-v3-system-grid">
          <ScrollReveal>
            <div className="lv-agents-v3-system-intro">
              <Eyebrow>Inside the foundation</Eyebrow>
              <h2>Six decisions, already governed.</h2>
              <p>
                Your team begins with an operating standard, not an empty prompt.
              </p>
            </div>
          </ScrollReveal>

          <div className="lv-agents-v3-system-list">
            {FOUNDATION_SYSTEM.map(([title, body], index) => (
              <ScrollReveal key={title} delay={index * 45}>
                <article>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="lv-agents-v3-section lv-agents-v3-lifecycle">
        <div className="lv-agents-v3-wrap lv-agents-v3-lifecycle-layout">
          <ScrollReveal>
            <div className="lv-agents-v3-lifecycle-intro">
              <Eyebrow>Governed from the start</Eyebrow>
              <h2>Make it yours. Keep it governed.</h2>
              <p>
                Start with the Financial Services foundation, then adapt it to your
                institution. Behavior, workflows, and evaluation remain governed by that
                same standard in every conversation after launch.
              </p>
              <div className="lv-agents-v3-lifecycle-groups">
                <h3>What you tailor</h3>
                <ul>
                  {TAILOR_ITEMS.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Self-service FAQ: accordion, first item open. Pricing answers stay
          in lockstep with /pricing. */}
      <section className="lv-agents-faq">
        <div className="lv-agents-inner-narrow">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>FAQs</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="lv-agents-section-head">
              The answers, <em>self-served</em>.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <AgentsFaq items={FAQ} />
          </ScrollReveal>
        </div>
      </section>

      <section className="lv-agents-v3-close">
        <div className="lv-agents-v3-wrap">
          <ScrollReveal>
            <div className="lv-agents-v3-close-inner">
              <Eyebrow dark>Ready to begin</Eyebrow>
              <h2>
                <span className="lv-agents-v3-close-line">A governed foundation,</span>
                <br />
                <span>ready to use.</span>
              </h2>
              <div className="lv-agents-v3-close-actions">
                <Link href="/pricing" className="lv-agents-v3-close-button">
                  Explore Pre‑built Agents <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
