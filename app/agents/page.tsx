/* Prebuilt agents (/agents) — replaces the Voices & Sounds page. The pitch:
   adopt an agent Callio has already built and governed for your vertical and
   run it without going through intake. Financial Services is live; other
   verticals are signaled as coming.

   The page practices what Callio sells: self-service first. The lead is the
   playable governed dispute call (the page's strongest asset) with the two
   primary CTAs attached at peak intent; the FAQ absorbs the questions that
   would otherwise force a sales call; talking to us is the escape hatch at
   the bottom, not the front door.

   Structure: split hero (scenario copy + CTAs left, the agent's aura demo
   right) -> voice gallery (Sol / Sam / James in the Voices-page lv-vtile
   treatment, no provider badges) -> the governance story for the compliance
   reader -> the home page's verticals section minus Financial Services ->
   self-service FAQ accordion (first item open) -> final CTA.

   PLACEHOLDERS (marked): demo audio is the governed-sample stand-in until
   the produced call ships (scripts/generate-fs-demo-call.mjs); the
   get-started route is a stub; TRY_HREF shares the site's existing /start
   destination; Sam/James gallery sample URLs follow the callio
   produced-audio convention but are unverified from this environment. */

import type { Metadata } from "next"
import Link from "next/link"
import { Route, ScrollText, ShieldCheck } from "lucide-react"
import ScrollReveal from "@/components/ScrollReveal"
import DemoCallPlayer from "@/components/agents/DemoCallPlayer"
import AgentsVoicesGallery from "@/components/agents/AgentsVoicesGallery"
import AgentsFaq from "@/components/agents/AgentsFaq"
import VerticalsSection from "@/components/VerticalsSection"

export const metadata: Metadata = {
  title: "Agents",
  description:
    "Prebuilt, governed AI agents by vertical. Financial Services is live: a dispute-call agent that verifies before it discloses, stays on brand under stress, and is ready to adopt without an intake engagement.",
}

const DARK = "#2b2a25"

/* Try path: the site's existing try destination. Get-started: route stub,
   checkout mechanics to be designed. Both placeholders, both marked. */
const TRY_HREF = "/start"
const GET_STARTED_HREF = "/agents/get-started"
const CONTACT_HREF = "mailto:info@lyricvoices.ai?subject=Prebuilt%20FS%20agent"

/* The governance cells follow the home page's Brand Governance Layer cell
   anatomy (GovernanceGrid): icon, mono name, serif tagline with the italic
   emphasis, body — rendered here in the dark regime. */
const GOVERNANCE = [
  {
    icon: ShieldCheck,
    name: "Verification",
    tagline: (
      <>
        Verify before <em>disclose</em>.
      </>
    ),
    body:
      "Identity checks are enforced in code. The agent cannot access or reveal account details until verification passes, regardless of model behavior or channel.",
  },
  {
    icon: Route,
    name: "Workflow",
    tagline: (
      <>
        Character that stays <em>consistent</em>.
      </>
    ),
    body:
      "Each agent follows a governed workflow specific to its vertical. It does not improvise steps, tone, or disclosures. Every interaction follows the same pattern, so the experience is predictable and stable.",
  },
  {
    icon: ScrollText,
    name: "Accountability",
    tagline: (
      <>
        Every interaction <em>accountable</em>.
      </>
    ),
    body:
      "Each call, chat, or SMS records what was said, which disclosures were delivered, and which spec version governed it. Compliance always has a clear answer.",
  },
] as const

const FAQ = [
  {
    q: "What does the agent include out of the box?",
    a: "The governed Financial Services build: the verify-before-disclose call flow, dispute and hold handling, disclosure delivery, and FS pronunciation and voice-output standards. You choose one of three produced voices, Sol, Sam, or James, each delivering the same governed agent. It is the same agent behind the demo on this page, governed by the full Callio Financial Services spec.",
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
    q: "How is it priced?",
    a: "Governance uses our agent-based model: you pay by the number of agents you govern. See the pricing page for the details, including how prebuilt vertical agents are priced.",
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

export default function AgentsPage() {
  return (
    <main className="lv-agents">
      {/* ── Split hero (the callio build's layout): copy panel left, the demo
           stage right — Chat / Voice toggle, orb-led voice mode by default. ── */}
      <section className="lv-agents-hero">
        {/* Same ground as the home hero (lv-floret-ground) so the band under
            the nav reads continuous with the rest of the site's top. */}
        <div className="lv-agents-hero-left lv-floret-ground">
          <div className="lv-agents-hero-copy">
            <ScrollReveal>
              <div className="lv-philosophy-eyebrow">
                <span className="lv-eyebrow-dot" aria-hidden="true" />
                <span>Prebuilt agents &middot; Financial Services</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h1 className="lv-agents-headline">
                A caller reports a charge they{" "}
                <em>don&rsquo;t recognize</em>.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="lv-agents-sub">
                Here&rsquo;s how the governed Financial Services agent handles
                it. It is live, consistent, and ready to deploy without an
                intake engagement.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={280}>
              <div className="lv-cta-row lv-agents-cta-row">
                <Link href={GET_STARTED_HREF} className="lv-cta lv-agents-cta-primary">
                  Get started with this agent
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="lv-agents-hero-right">
          <ScrollReveal delay={160}>
            <DemoCallPlayer />
          </ScrollReveal>
        </div>
      </section>

      {/* ── The voices: the gallery-tile treatment. No provider badges. ── */}
      <section className="lv-agents-roster">
        <div className="lv-agents-inner-narrow">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>The agents</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="lv-agents-section-head">
              Same agent. <em>You choose who delivers it.</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <AgentsVoicesGallery />
          </ScrollReveal>
        </div>
      </section>

      {/* ── The governance story, for the compliance reader. Dark. ── */}
      <section className="lv-agents-gov" style={{ background: DARK }}>
        <div className="lv-agents-inner-wide">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>The proof behind the proof</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="lv-agents-section-head lv-agents-section-head-cream">
              What <em>governed</em> means for these agents.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={180}>
            <p className="lv-agents-gov-supporting">
              These agents are built on Callio&apos;s governance layer. Each one
              enforces the same rules for verification, workflow, and
              accountability across phone, chat, and SMS. When you select a
              pre-built agent, you&apos;re choosing behavior that is consistent,
              compliant, and repeatable from the first interaction to the
              thousandth.
            </p>
          </ScrollReveal>

          <div className="lv-agents-gov-grid">
            {GOVERNANCE.map((g, i) => {
              const Icon = g.icon
              return (
                <ScrollReveal key={g.name} delay={220 + i * 90}>
                  <div className="lv-agents-gov-item">
                    <span className="lv-cap-icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={2.25} />
                    </span>
                    <p className="lv-cap-name">{g.name}</p>
                    <h3 className="lv-cap-tagline">{g.tagline}</h3>
                    <p className="lv-cap-body">{g.body}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── The verticals: the home page's section layout, reframed as the
           line this agent is first of — prebuilt agents for these verticals
           are coming. FS excluded (this page covers it); dots off, the
           three cards fit one view. ── */}
      <VerticalsSection
        exclude={["Financial Services"]}
        eyebrow="Verticals"
        headline={
          <>
            Financial Services is live.
            <br />
            <em>More are on the way.</em>
          </>
        }
        supporting="The Financial Services agent is the first in the lineup. Pre-built governed agents for additional verticals are already in development, and each will be ready to adopt the same way."
        allComingSoon
        showDots={false}
        fit
      />

      {/* ── Self-service FAQ: accordion, first item open. ── */}
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

      {/* ── Final CTA: try / adopt primary, talk-to-us the escape hatch. ── */}
      <section className="lv-final" style={{ background: DARK }}>
        <ScrollReveal>
          <div className="lv-philosophy-eyebrow lv-final-eyebrow">
            <span className="lv-eyebrow-dot" aria-hidden="true" />
            <span>Prebuilt &middot; governed &middot; ready</span>
          </div>
          <h2>
            <span className="lv-final-line">The agent is built.</span>
            <br />
            <span className="lv-final-line">
              <em>Make it yours.</em>
            </span>
          </h2>
          <div className="lv-cta-row lv-cta-row-center">
            <Link href={GET_STARTED_HREF} className="lv-cta lv-about-close-cta">
              Get started
            </Link>
            <Link href={TRY_HREF} className="lv-cta lv-agents-cta-outline-dark">
              Try it live
            </Link>
          </div>
          <p className="lv-about-hiring">
            Questions the FAQ did not answer?{" "}
            <a href={CONTACT_HREF} className="lv-about-hiring-link">
              Talk to us
            </a>
            .
          </p>
        </ScrollReveal>
      </section>
    </main>
  )
}
