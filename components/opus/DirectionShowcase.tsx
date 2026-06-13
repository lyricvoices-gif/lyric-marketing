/* Direction's single consolidated section on the Opus page — the
   symmetrical counterpart to Composer's dark storyboard chapter, on the
   same dark-olive ground so the two tools read as matching movements.

   One section carries everything Direction needs on this page:
   headline and body state the trade, the product frame shows the
   reimagined session canvas (ink interior, the product's own studio
   palette), the three numbered steps double as the frame's captions,
   the deploys line compresses the use cases, and a short coda carries
   the exclusivity argument that previously had its own section.

   The frame is a CSS recreation honest to the product; real captures
   can replace the composition later without changing the section.
   Motion is ambient only (breathing session dot), so this stays a
   server component. */

import ScrollReveal from "@/components/ScrollReveal"
import Isotype from "@/components/Isotype"

const SNAPSHOT_ROWS: ReadonlyArray<[string, string]> = [
  ["Voice", "Morgan · The Anchor"],
  ["Emotional core", "Calm 0.72 · Confidence 0.64 · Warmth 0.56"],
  ["Pacing", "Measured, medium pause density"],
  ["Edge cases", "Slow down for escalations, acknowledge directly"],
]

const STEPS = [
  {
    num: "01",
    title: "Describe",
    line: "Where the voice lives, what it must carry, the edge cases it will meet. Type it or say it.",
  },
  {
    num: "02",
    title: "Refine",
    line: "The agent translates creative language into parameters. Hear previews, adjust, repeat.",
  },
  {
    num: "03",
    title: "Lock",
    line: "One locked JSON specification, versioned and ready for engineering.",
  },
]

export default function DirectionShowcase() {
  return (
    <section className="lv-dirshow">
      <div className="lv-dirshow-inner">
        <ScrollReveal>
          <div className="lv-dirshow-eyebrow">
            <span className="lv-dirshow-eyebrow-dot" aria-hidden="true" />
            <span>Direction</span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <h2 className="lv-dirshow-headline">
            Creative direction in. <em>Deployment spec out.</em>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={220}>
          <p className="lv-dirshow-body">
            One conversation, no panels to learn. Describe the deployment
            in your own words, by keyboard or by voice, and the agent
            translates it into parameters you can hear, refine, and lock.
            What leaves the session is a configuration your engineering
            team can deploy without interpretation.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={320}>
          <div className="lv-dirshow-frame" aria-label="The Direction session canvas">
            <div className="lv-dirshow-bar">
              <span className="lv-dirshow-brand">
                <Isotype size={18} color="#F0E8D5" />
                <span className="lv-dirshow-brand-name">Opus</span>
                <span className="lv-dirshow-brand-product">Direction</span>
              </span>
              <span className="lv-dirshow-session">
                <span className="lv-dirshow-session-dot" aria-hidden="true" />
                In progress
              </span>
            </div>

            <div className="lv-dirshow-thread">
              <div className="lv-dirshow-turn lv-dirshow-turn-agent">
                <Isotype size={14} color="rgba(240, 232, 213, 0.85)" style={{ marginTop: 4 }} />
                <p>
                  Where will this voice live, and what does it need to make
                  a customer feel?
                </p>
              </div>

              <div className="lv-dirshow-turn lv-dirshow-turn-brand">
                <p>
                  Our banking app&rsquo;s support flow. Composed, reassuring
                  under pressure.
                </p>
              </div>

              <div className="lv-dirshow-turn lv-dirshow-turn-agent">
                <Isotype size={14} color="rgba(240, 232, 213, 0.85)" style={{ marginTop: 4 }} />
                <div className="lv-dirshow-turn-body">
                  <p>Heard. Here is where the configuration stands.</p>
                  <dl className="lv-dirshow-snapshot">
                    {SNAPSHOT_ROWS.map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="lv-dirshow-locked">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <rect x="4" y="11" width="16" height="9" rx="2" />
                      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                    <span className="lv-dirshow-locked-title">Configuration locked</span>
                    <span className="lv-dirshow-locked-meta">JSON spec · ready for engineering</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lv-dirshow-dock">
              <span className="lv-dirshow-dock-glyph" aria-hidden="true">+</span>
              <span className="lv-dirshow-dock-placeholder">
                Describe the deployment, tone, edge cases, or constraints.
              </span>
              <span className="lv-dirshow-dock-icon" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="3" width="6" height="11" rx="3" />
                  <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                </svg>
              </span>
              <span className="lv-dirshow-dock-send" aria-hidden="true">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* The process steps double as the frame's captions: each maps
            to what the composition above just showed. */}
        <div className="lv-dirshow-steps">
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 80}>
              <div className="lv-dirshow-step">
                <p className="lv-dirshow-step-num">{step.num}</p>
                <h3 className="lv-dirshow-step-title">{step.title}</h3>
                <p className="lv-dirshow-step-line">{step.line}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={240}>
          <p className="lv-dirshow-deploys">
            <span className="lv-dirshow-deploys-label">Where it deploys</span>
            Call centers · Customer service agents · Mobile apps ·
            Hospitality systems · In-product assistants · Any real-time
            voice surface that has to stay in character
          </p>
        </ScrollReveal>

        {/* Exclusivity coda — the strategic anchor, condensed from its
            former standalone section. */}
        <ScrollReveal delay={120}>
          <div className="lv-dirshow-coda">
            <p className="lv-dirshow-coda-label">
              <span className="lv-dirshow-eyebrow-dot" aria-hidden="true" />
              <span>Why this matters</span>
            </p>
            <p className="lv-dirshow-coda-body">
              Direction is exclusive to voices on the Lyric imprint. Every
              one is built with a professional voice artist who consented
              to the licensing structure, retains rights to their voice,
              and earns ongoing compensation for every deployment. You are
              not configuring a generic AI voice. You are tuning a real
              artist&rsquo;s voice within a partnership they shaped.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
