import type { Metadata } from "next"
import Link from "next/link"

import AgentChannelDemo from "@/components/agents/AgentChannelDemo"
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
                Our Financial Services foundation comes with domain knowledge,
                governed behavior, workflows, guardrails, and evaluation criteria
                built in&mdash;ready to use as-is or tailor to your institution.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="lv-agents-v3-actions">
                <Link href="#experience" className="lv-agents-v3-primary-link">
                  Experience Financial Services
                </Link>
              </div>
            </ScrollReveal>
          </div>
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
              <h2>
                Built for the domain.
                <br />
                Governed from the start.
              </h2>
              <p>
                Financial-services knowledge is built in, along with the operating
                standard for how the agent behaves, responds, escalates, and stays
                within bounds.
              </p>
            </div>
          </ScrollReveal>

          <div className="lv-agents-v3-system-list">
            {FOUNDATION_SYSTEM.map(([title, body], index) => (
              <ScrollReveal key={title} delay={index * 45}>
                <article>
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
