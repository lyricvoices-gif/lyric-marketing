/* Prebuilt agents (/agents) — replaces the Voices & Sounds page. The pitch:
   adopt an agent Callio has already built and governed for your vertical and
   run it without going through intake. Financial Services is live; other
   verticals are signaled as coming.

   The page practices what Callio sells: self-service first. The lead is the
   playable governed dispute call (the page's strongest asset) with the two
   primary CTAs attached at peak intent; the FAQ absorbs the questions that
   would otherwise force a sales call; talking to us is the escape hatch at
   the bottom, not the front door.

   Structure: scenario-framed demo + what-to-listen-for -> CTAs -> voice
   roster (Sol / Sam / James, no provider badges) -> the governance story for
   the compliance reader -> coming-soon verticals -> self-service FAQ (the
   pricing page's Q&A pattern) -> final CTA.

   Voice accents reuse the existing per-voice tokens (VOICE_COLORS): Sol
   takes Morgan's gold (the Anchor's authority), Sam takes Atlas green
   (crisp, clear), James takes Riven russet (refined depth).

   PLACEHOLDERS (marked): demo audio is the governed-sample stand-in until
   the produced call ships (scripts/generate-fs-demo-call.mjs); the
   get-started route is a stub; TRY_HREF shares the site's existing /start
   destination; Sam/James roster sample URLs follow the callio produced-audio
   convention but are unverified from this environment. */

import type { Metadata } from "next"
import Link from "next/link"
import type { CSSProperties } from "react"
import ScrollReveal from "@/components/ScrollReveal"
import DemoCallPlayer from "@/components/agents/DemoCallPlayer"
import RosterSamplePlay from "@/components/agents/RosterSamplePlay"
import { VOICE_COLORS } from "@/components/listen/data"

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

/* Produced-audio convention from the callio pipeline:
   {AUDIO_BASE}/phone/{token}_default.mp3. Sol has no static sample yet;
   her card points at the demo call above. */
const AUDIO_BASE = "https://pub-9142daf6eac140228b494c56e7b13b22.r2.dev/phone"

const VOICES = [
  {
    id: "sol",
    name: "Sol",
    character: "Senior, warm, unhurried",
    accent: VOICE_COLORS.morgan,
    body:
      "The voice of a senior client services professional at a financial institution. Someone who has been doing this for fifteen years and has time for you.",
    sample: null,
  },
  {
    id: "sam",
    name: "Sam",
    character: "Crisp, conversational, efficient",
    accent: VOICE_COLORS.atlas,
    body:
      "American and direct. Sam keeps the call moving without ever sounding rushed, and says the hard terms plainly.",
    sample: `${AUDIO_BASE}/sam_default.mp3`,
  },
  {
    id: "james",
    name: "James",
    character: "British, refined, polished",
    accent: VOICE_COLORS.riven,
    body:
      "Measured and precise. James brings a formal register for institutions whose brand leans traditional.",
    sample: `${AUDIO_BASE}/james_default.mp3`,
  },
] as const

const LISTEN_FOR = [
  {
    label: "Acknowledge before process",
    body: "She meets the situation first. The workflow starts only after the caller has been heard.",
  },
  {
    label: "Verify before disclose",
    body: "No account detail crosses her lips until identity is confirmed. A hard gate, not a habit.",
  },
  {
    label: "Careful before reassuring",
    body: "She will not call it fraud before it is confirmed. Comfort never outruns the facts.",
  },
  {
    label: "Composed throughout",
    body: "The register holds from hello to resolution, under a stressed caller, at every turn.",
  },
] as const

const GOVERNANCE = [
  {
    title: "Verify before disclose, enforced in code",
    body:
      "Identity verification is a gate in the call flow, not a suggestion to the model. The agent cannot read an account detail before the gate passes, on any call, in any mood the model is in.",
  },
  {
    title: "Character that cannot drift",
    body:
      "Sol's register, acknowledge, verify, review, resolve, is specified in the governed spec, not improvised per call. The thousandth call sounds like the first one.",
  },
  {
    title: "Every call accountable",
    body:
      "Each call records what was said, which disclosures were delivered, and which spec version governed it. When compliance asks why the agent said something, there is an answer.",
  },
] as const

const VERTICALS = [
  { name: "Financial Services", status: "live" },
  { name: "Property Management", status: "soon" },
  { name: "Travel & Hospitality", status: "soon" },
  { name: "Healthcare", status: "soon" },
] as const

const FAQ = [
  {
    q: "What does the agent include out of the box?",
    a: "The governed Financial Services build: the verify-before-disclose call flow, dispute and hold handling, the FS pronunciation and voice output standards, disclosure delivery, and a produced voice (Sol, Sam, or James) held to the governed register. It is the same agent behind the demo on this page.",
  },
  {
    q: "What do we still provide?",
    a: "The words your counsel owns: your exact disclosure lines and your identity-verification policy, plus your brand name and terms. The agent arrives governed; your counsel approves the specific language it is required to say.",
  },
  {
    q: "How does it connect to our systems?",
    a: "The agent sits above your telephony and account systems. Verification checks and account lookups call your endpoints at call time; the governance layer stays vendor-agnostic across models and speech engines, so it is not a rip-and-replace of your stack.",
  },
  {
    q: "How is it priced?",
    a: "Governance is priced by the number of agents you govern, the same agent-based model on our pricing page. Specific pricing for prebuilt vertical agents is being finalized; the get-started flow will carry it when it ships.",
  },
  {
    q: "What about data and compliance?",
    a: "Callio governs what the agent says and records how it said it. It is brand-voice governance monitoring, not security or compliance certification. Your account systems and customer data stay in your stack; the agent reads from them at call time through your integration.",
  },
  {
    q: "Can we change the voice or the wording?",
    a: "Both. Pick Sol, Sam, or James for delivery, and your counsel's disclosure and verification wording drops into the spec. The governed register holds either way.",
  },
] as const

export default function AgentsPage() {
  return (
    <main className="lv-agents">
      {/* ── The lead: scenario, then the governed call you can play. ── */}
      <section className="lv-agents-hero">
        <div className="lv-agents-inner">
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
                This is how a governed Financial Services agent handles it.
                Already built, already governed, ready to adopt without an
                intake engagement.
              </p>
            </ScrollReveal>

            {/* Peak intent: the CTAs live with the demo. */}
            <ScrollReveal delay={280}>
              <div className="lv-cta-row lv-agents-cta-row">
                <Link href={TRY_HREF} className="lv-cta lv-agents-cta-primary">
                  Try the agent live
                </Link>
                <Link href={GET_STARTED_HREF} className="lv-cta lv-agents-cta-outline">
                  Get started with this agent
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={340}>
              <div className="lv-agents-listenfor">
                <p className="lv-agents-listenfor-head">What to listen for</p>
                {LISTEN_FOR.map((l) => (
                  <div key={l.label} className="lv-agents-listenfor-item">
                    <span className="lv-agents-listenfor-dot" aria-hidden="true" />
                    <div>
                      <p className="lv-agents-listenfor-label">{l.label}</p>
                      <p className="lv-agents-listenfor-body">{l.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={160}>
            <DemoCallPlayer />
          </ScrollReveal>
        </div>
      </section>

      {/* ── The roster: you choose who delivers it. No provider badges. ── */}
      <section className="lv-agents-roster">
        <div className="lv-agents-inner-narrow">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>The voices</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="lv-agents-section-head">
              Same agent. <em>You choose who delivers it.</em>
            </h2>
          </ScrollReveal>

          <div className="lv-agents-voices">
            {VOICES.map((v, i) => (
              <ScrollReveal key={v.id} delay={i * 90}>
                <div
                  className="lv-agents-voice"
                  style={{ ["--voice-accent" as string]: v.accent } as CSSProperties}
                >
                  <div className="lv-agents-voice-head">
                    <span className="lv-agents-voice-dot" aria-hidden="true" />
                    <h3 className="lv-agents-voice-name">{v.name}</h3>
                  </div>
                  <p className="lv-agents-voice-character">{v.character}</p>
                  <p className="lv-agents-voice-body">{v.body}</p>
                  {v.sample ? (
                    <RosterSamplePlay name={v.name} src={v.sample} />
                  ) : (
                    <a className="lv-agents-voice-hear" href="#top">
                      Sol carries the call above
                    </a>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── The governance story, for the compliance reader. Dark. ── */}
      <section className="lv-agents-gov" style={{ background: DARK }}>
        <div className="lv-agents-inner-narrow">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>The proof behind the proof</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="lv-agents-section-head lv-agents-section-head-cream">
              What <em>governed</em> means here.
            </h2>
          </ScrollReveal>

          <div className="lv-agents-gov-grid">
            {GOVERNANCE.map((g, i) => (
              <ScrollReveal key={g.title} delay={140 + i * 90}>
                <div className="lv-agents-gov-item">
                  <h3 className="lv-agents-gov-title">{g.title}</h3>
                  <p className="lv-agents-gov-body">{g.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── The line this page is first of. ── */}
      <section className="lv-agents-verticals">
        <div className="lv-agents-inner-narrow">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>Verticals</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="lv-agents-section-head">
              Financial Services is live. <em>More are coming.</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <div className="lv-agents-vert-rows">
              {VERTICALS.map((v) => (
                <div key={v.name} className="lv-agents-vert-row">
                  <span className="lv-agents-vert-name">{v.name}</span>
                  {v.status === "live" ? (
                    <span className="lv-agents-vert-live">
                      <span className="lv-agents-vert-live-dot" aria-hidden="true" />
                      Live
                    </span>
                  ) : (
                    <span className="lv-agents-vert-soon">Coming soon</span>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Self-service FAQ: the pricing page's Q&A pattern. ── */}
      <section className="lv-pricing-faq lv-agents-faq">
        <div className="lv-agents-inner-narrow">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>Before you ask sales</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="lv-agents-section-head">
              The answers, <em>self-served</em>.
            </h2>
          </ScrollReveal>
          <dl className="lv-pricing-faq-list">
            {FAQ.map((item, i) => (
              <ScrollReveal key={item.q} delay={120 + i * 60}>
                <div className="lv-pricing-faq-item">
                  <dt className="lv-pricing-faq-q">{item.q}</dt>
                  <dd className="lv-pricing-faq-a">{item.a}</dd>
                </div>
              </ScrollReveal>
            ))}
          </dl>
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
