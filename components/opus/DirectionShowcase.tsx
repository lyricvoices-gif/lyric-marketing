/* Direction's "symmetrical dark moment" on the Opus page — the
   counterpart to Composer's video storyboard section. No product videos
   exist for Direction yet, so this is a full-scale CSS recreation of the
   reimagined canvas: studio-ink ground, the conversational column brands
   know from Claude / ChatGPT / Gemini, sage-quote brand turns, a
   parameter snapshot mid-thread, the gold locked-configuration payoff,
   and the free-text dock with the voice-reply mic. Screens stay honest
   to the product; real captures can replace the composition later
   without changing the section.

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

const CAPTIONS = [
  "Answer by typing, or speak and review the transcript before it sends.",
  "Creative language becomes deployable parameters, in the thread.",
  "Lock the spec. Your engineering team takes it from there.",
]

export default function DirectionShowcase() {
  return (
    <section className="lv-dirshow">
      <div className="lv-dirshow-inner">
        <ScrollReveal>
          <div className="lv-dirshow-eyebrow">
            <span className="lv-dirshow-eyebrow-dot" aria-hidden="true" />
            <span>Direction, in session</span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <h2 className="lv-dirshow-headline">
            A conversation that ends in a <em>specification</em>.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={220}>
          <p className="lv-dirshow-body">
            Direction works the way your team already works with AI: one
            conversation, full width, no panels to learn. You describe the
            deployment in your own words, by keyboard or by voice. The
            agent translates it into parameters you can hear, refine, and
            lock.
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

        <ScrollReveal delay={420}>
          <div className="lv-dirshow-captions">
            {CAPTIONS.map((caption) => (
              <p key={caption} className="lv-dirshow-caption">
                {caption}
              </p>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
