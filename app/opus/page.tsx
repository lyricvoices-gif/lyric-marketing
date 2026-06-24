/* Opus product page — problem-first spine. This is a category-defining page, so
   it leads with the problem the buyer hasn't named yet (their agents are
   multiplying and drifting off-brand) and then reveals Opus as the layer that
   holds all of them to one voice. Six movements:

     1) Hero        — name the problem
     2) Hear it     — the voice, before/after (the visceral proof)
     3) How it works— the mechanism (Codify / Govern / Port)
     4) Meet Sonic  — how you get your spec (the on-ramp; preview, funnels to /start)
     5) See it in text — cross-agent consistency (text governance, no audio)
     6) CTA         — funnel to "Try for free"

   Built on the live Lyric tokens only (cream / olive / near-black / gold), the
   shared GT Super + GT America + Instrument Serif faces, and the existing
   ScrollReveal + nav + footer. All scoped styles live under .lv-opus-* in
   globals.css. Copy register: flat, declarative, no em dashes, no exclamation
   points. The engine-agnostic point is folded into the Port step as one line on
   purpose; this page does not pull in homepage modules. */

import type { Metadata } from "next"
import type { CSSProperties, ReactNode } from "react"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import OpusHearIt from "@/components/opus/OpusHearIt"
import OpusDriftVisual from "@/components/hero/OpusDriftVisual"

export const metadata: Metadata = {
  title: "Opus",
  description:
    "Your agents are multiplying. Opus is the layer that holds all of them to one brand voice, across every model and engine you run.",
}

const DARK = "#2b2a25"
const START = "/start"

/* Pill CTA, mirroring the homepage / pricing Final CTA buttons so closing and
   hero CTAs read identically across the site. */
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

/* Mono small-caps eyebrow, dot + label, in the site's editorial register. */
function Eyebrow({ label, onDark = false }: { label: string; onDark?: boolean }) {
  return (
    <div className={`lv-philosophy-eyebrow lv-opus-eyebrow${onDark ? " is-dark" : ""}`}>
      <span className="lv-eyebrow-dot" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

/* Movement 3 — the mechanism. Plain numbered steps, no dimension-list repeats. */
const STEPS = [
  {
    n: "01",
    title: "Codify",
    body:
      "Opus turns your brand's voice into a portable spec. Persona, lexicon, pronunciation, the words you say and the ones you don't.",
  },
  {
    n: "02",
    title: "Govern",
    body:
      "Every agent is held to that spec at the point of generation, so it stays on brand before a word reaches the customer.",
  },
  {
    n: "03",
    title: "Port",
    body:
      "The spec rides above the language model and the speech engine. It works with whatever model and engine you already run. Change either one and the brand voice stays the same.",
  },
]

/* Movement 4 — Sonic intake starters. Static mock; the first tile reads as
   pre-selected to show recognition-over-recall, but nothing is interactive here.
   The whole section is a preview that funnels to /start. */
const STARTERS = [
  { label: "Refi qualifier", hint: "Mortgage", selected: true },
  { label: "Patient intake", hint: "Healthcare", selected: false },
  { label: "Claims intake", hint: "Insurance", selected: false },
  { label: "Custom", hint: "Start blank", selected: false },
]

/* Movement 5 — channel-distinct chat bubbles. Styled to read as SMS vs web chat
   while staying on the Lyric palette; deliberately NOT iMessage blue. */
type Channel = "sms" | "web"
function Bubble({ channel, children }: { channel: Channel; children: ReactNode }) {
  return (
    <div className={`lv-opus-bubble lv-opus-bubble-${channel}`}>
      <span className="lv-opus-bubble-tag">{channel === "sms" ? "SMS" : "Web chat"}</span>
      <p className="lv-opus-bubble-text">{children}</p>
    </div>
  )
}

export default function OpusPage() {
  return (
    <main className="lv-opus">
      {/* ── Movement 1 — Hero. Name the problem. The type carries the claim;
            the drift visual proves it — three agents answering one question in
            three voices (call, then chat, then SMS). ── */}
      <section className="lv-opus-hero">
        <div className="lv-opus-wrap lv-opus-hero-grid">
          <div className="lv-opus-hero-copy">
            <ScrollReveal>
              <Eyebrow label="Opus" />
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <h1 className="lv-opus-hero-head">
                Your agents are multiplying. They don&rsquo;t sound like the{" "}
                <em>same company</em>.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={220}>
              <p className="lv-opus-hero-sub">
                Every channel adds another agent. Each one drifts a little
                further from your brand. Opus is the layer that holds all of them
                to one voice.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={320}>
              <div className="lv-cta-row">
                <CTA href={START} variant="dark">
                  Try for free
                </CTA>
              </div>
            </ScrollReveal>
          </div>

          <div className="lv-opus-hero-demo">
            <OpusDriftVisual />
          </div>
        </div>
      </section>

      {/* ── Movement 2 — Hear it. Before/after voice, the visceral proof. ── */}
      <section className="lv-opus-hear">
        <div className="lv-opus-wrap">
          <ScrollReveal>
            <Eyebrow label="Hear it" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p className="lv-opus-hear-framing">
              Same bank. Same questions. The agents work. They just don&rsquo;t
              sound like the same company.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <OpusHearIt />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Movement 3 — How it works. The mechanism, on a near-black chapter
            ground for weight. ── */}
      <section className="lv-opus-how" style={{ background: DARK }}>
        <div className="lv-opus-wrap">
          <ScrollReveal>
            <Eyebrow label="How it works" onDark />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2 className="lv-opus-how-head">
              One spec. Every agent held to it.
            </h2>
          </ScrollReveal>
          <div className="lv-opus-steps">
            {STEPS.map((s, i) => (
              <ScrollReveal key={s.n} delay={180 + i * 90}>
                <div className="lv-opus-step">
                  <span className="lv-opus-step-n">{s.n}</span>
                  <h3 className="lv-opus-step-title">{s.title}</h3>
                  <p className="lv-opus-step-body">{s.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={460}>
            <p className="lv-opus-how-position">
              We direct the engines. <em>We are not one of them.</em>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Movement 4 — Meet Sonic. The on-ramp. Static preview that funnels
            to /start; Sonic codifies your brand voice, it does not build agents. ── */}
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
              Sonic is the guided intake. It doesn&rsquo;t ask you to describe
              your voice in adjectives. It shows you options and you pick the ones
              that sound like you. Your choices become the spec. A few minutes in,
              you have a governed voice for your first agent.
            </p>
          </ScrollReveal>

          {/* Static mock of the intake's first screen: recognition over recall.
              This is a preview only, not a working intake.
              links to /start — Sonic intake flow (not yet built). */}
          <ScrollReveal delay={280}>
            <Link href={START} className="lv-opus-sonic-mock" aria-label="Preview the Sonic intake, opens Try for free">
              <span className="lv-opus-mock-prompt">Where should we start?</span>
              <span className="lv-opus-tiles">
                {STARTERS.map((t) => (
                  <span
                    key={t.label}
                    className={`lv-opus-tile${t.selected ? " is-selected" : ""}`}
                  >
                    <span className="lv-opus-tile-label">{t.label}</span>
                    <span className="lv-opus-tile-hint">{t.hint}</span>
                  </span>
                ))}
              </span>
              <span className="lv-opus-mock-note">Preview. The intake opens in Try for free.</span>
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={360}>
            <div className="lv-cta-row">
              <CTA href={START} variant="dark">
                Try Sonic free
              </CTA>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Movement 5 — See it in text. Cross-agent consistency, built as styled
            markup, no audio. ── */}
      <section className="lv-opus-proof">
        <div className="lv-opus-wrap">
          <ScrollReveal>
            <Eyebrow label="In text" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p className="lv-opus-proof-framing">
              Same brand. Three agents. One question:{" "}
              <em>&ldquo;Did my payment go through?&rdquo;</em>
            </p>
          </ScrollReveal>

          <div className="lv-opus-proof-grid">
            <ScrollReveal delay={200}>
              <div className="lv-opus-proof-col lv-opus-proof-before">
                <p className="lv-opus-proof-label">
                  Ungoverned <span>Three agents, three personalities</span>
                </p>
                <Bubble channel="sms">yep payment went thru 👍 you&rsquo;re good</Bubble>
                <Bubble channel="web">
                  I have confirmed receipt of your remittance. The transaction has
                  been successfully processed and posted to your account.
                </Bubble>
                <Bubble channel="sms">
                  Hi! So I checked and yes it looks like it went through okay 😊 let
                  me know if you need anything else!!
                </Bubble>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="lv-opus-proof-col lv-opus-proof-after">
                <p className="lv-opus-proof-label">
                  Governed <span>Three agents, one brand</span>
                </p>
                <Bubble channel="sms">Your payment posted today. You&rsquo;re all set.</Bubble>
                <Bubble channel="web">
                  Your payment posted today. You&rsquo;re all set. You can see it in
                  your account under Activity.
                </Bubble>
                <Bubble channel="sms">Your payment posted today. You&rsquo;re all set.</Bubble>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={380}>
            <p className="lv-opus-proof-caption">
              Governance adapts to the channel without losing the brand. The web
              chat can say more. The voice never changes.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Movement 6 — Closing CTA. Funnel to Try for free. Reuses the shared
            .lv-final composition on a near-black ground. ── */}
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
          <div className="lv-cta-row lv-cta-row-center">
            <CTA href={START} variant="light">
              Try for free
            </CTA>
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
