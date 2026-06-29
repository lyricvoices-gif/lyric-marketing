/* Section 5 — Build the voice spec (Sonic). An inspectable preview of what a
   brand actually configures: the real spec dimensions, shown as a sample spec
   sheet. Less abstract than a skeleton, so an enterprise buyer can see the
   product, but still a read-only illustration, not a working intake.

   It reflects the intake model: ask the facts with a questionnaire, then show and
   pick for taste (recognition over recall). The picks become the spec. It never
   asks the brand to describe its voice in adjectives.

   Guardrail: Sonic codifies the brand voice. No approval workflows, escalation
   routing, or agent-build machinery here. Sample content is the fictional
   Cascade / Caldera Bank used elsewhere on the page. Funnels to /start via the
   section CTA. */

import type { ReactNode } from "react"

const DIMENSIONS: ReadonlyArray<{ label: string; render: ReactNode }> = [
  {
    label: "Tone range",
    render: (
      <div className="lv-spec-range" aria-hidden="true">
        <span className="lv-spec-range-end">Warm</span>
        <span className="lv-spec-range-track">
          <span className="lv-spec-range-mark" style={{ left: "42%" }} />
        </span>
        <span className="lv-spec-range-end">Direct</span>
      </div>
    ),
  },
  {
    label: "Lexicon",
    render: (
      <div className="lv-spec-lex">
        <span className="lv-spec-lex-group">
          <span className="lv-spec-lex-tag">Approved</span>
          <span className="lv-spec-chip is-approved">Annual Percentage Rate</span>
          <span className="lv-spec-chip is-approved">posted</span>
          <span className="lv-spec-chip is-approved">you&rsquo;re all set</span>
        </span>
        <span className="lv-spec-lex-group">
          <span className="lv-spec-lex-tag">Banned</span>
          <span className="lv-spec-chip is-banned">no worries</span>
          <span className="lv-spec-chip is-banned">yep</span>
          <span className="lv-spec-chip is-banned">emoji</span>
        </span>
      </div>
    ),
  },
  {
    label: "Required disclosures",
    render: <p className="lv-spec-quote">&ldquo;This call may be recorded.&rdquo; Exact, every time.</p>,
  },
  {
    label: "Approved examples",
    render: <p className="lv-spec-quote">&ldquo;Your payment posted today. You&rsquo;re all set.&rdquo;</p>,
  },
  {
    label: "Channel constraints",
    render: (
      <p className="lv-spec-text">
        SMS under 160 characters, no emoji. Voice spells out figures. Email keeps
        the full closing.
      </p>
    ),
  },
  {
    label: "Pronunciation, pacing, register",
    render: (
      <p className="lv-spec-text">
        Caldera, said kal-DEH-ruh. Measured pace. Composed register.
      </p>
    ),
  },
]

const REGISTER_OPTIONS = ["Composed and warm", "Brisk and upbeat", "Plain and direct"]
const PICKED = 0

export default function SonicPreview() {
  return (
    <div className="lv-spec">
      <div className="lv-spec-bar">
        <span className="lv-spec-bar-name">Brand voice spec</span>
        <span className="lv-spec-bar-tag">Sample</span>
      </div>

      {/* Show, don't ask: pick the one that sounds like you. */}
      <div className="lv-spec-pick">
        <span className="lv-spec-pick-q">Pick the register that sounds like you</span>
        <div className="lv-spec-pick-opts">
          {REGISTER_OPTIONS.map((o, i) => (
            <span key={o} className={`lv-spec-opt${i === PICKED ? " is-picked" : ""}`}>
              {o}
            </span>
          ))}
        </div>
      </div>

      <dl className="lv-spec-dims">
        {DIMENSIONS.map((d) => (
          <div className="lv-spec-dim" key={d.label}>
            <dt className="lv-spec-dim-label">{d.label}</dt>
            <dd className="lv-spec-dim-value">{d.render}</dd>
          </div>
        ))}
      </dl>

      <p className="lv-spec-note">
        Facts by questionnaire. Taste by ear. Your picks become the spec.
      </p>
    </div>
  )
}
