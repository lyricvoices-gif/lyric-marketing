/* Integrations — section 7. Ecosystem compatibility, not a list of shipped
   first-party connectors. The layout expresses the positioning literally:
   Lyric is the intelligence layer BETWEEN telephony infrastructure and the
   synthesis engines it governs. Infrastructure on top, Lyric in the middle,
   synthesis below, joined by whisper-subtle connectors.

   The two groups stay visually and conceptually separate so a reader never
   confuses a telephony vendor with a synthesis engine. Brand names are set
   as text wordmarks (no official logo assets are in the repo); the cells
   accept real SVGs later without changing the layout. Off-white ground so
   the wordmarks read cleanly and the section is distinct from the cream eval
   section above it.

   Reveals use the shared ScrollReveal (reduced-motion handled there); the
   connectors are static hairlines, kept faint on purpose. */

import ScrollReveal from "@/components/ScrollReveal"

const INFRA = ["Twilio", "Five9", "NICE CXone", "Salesforce"]
const SYNTH = ["Hume", "ElevenLabs", "Fish Audio"]

export default function IntegrationsSection() {
  return (
    <section className="lv-int-section">
      <div className="lv-int-inner">
        <div className="lv-int-header">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>Integrations</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2 className="lv-int-headline">Orchestrate your entire voice stack.</h2>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p className="lv-int-supporting">
              Lyric acts as the intelligence layer between your existing
              telephony infrastructure and your choice of voice synthesis
              models. Whether you are scaling across Twilio, Five9, or NICE
              CXone, we ensure your brand voice is consistent, compliant, and
              perfectly tuned every time.
            </p>
          </ScrollReveal>
        </div>

        <div className="lv-int-stack">
          <ScrollReveal delay={120}>
            <div className="lv-int-tier">
              <div className="lv-int-tier-head">
                <span className="lv-int-tier-label">Infrastructure</span>
                <span className="lv-int-tier-sub">telephony, contact center, CRM</span>
              </div>
              <div className="lv-int-marks">
                {INFRA.map((name) => (
                  <span key={name} className="lv-int-mark">
                    {name}
                  </span>
                ))}
              </div>
              <p className="lv-int-point">
                <span className="lv-int-point-label">Infrastructure Ready</span>
                Built to integrate with your existing contact-center stack via
                Twilio, Five9, NICE CXone, and Salesforce.
              </p>
            </div>
          </ScrollReveal>

          <span className="lv-int-connector" aria-hidden="true" />

          <ScrollReveal delay={160}>
            <div className="lv-int-core">
              <div className="lv-int-core-head">
                <span className="lv-int-core-name">Lyric</span>
                <span className="lv-int-core-tag">Governance layer</span>
              </div>
              <p className="lv-int-point">
                <span className="lv-int-point-label">Open Governance API</span>
                Use our REST API and webhooks to configure emotional
                adjustments, pronunciation overrides, and brand safety checks
                across your call flow.
              </p>
            </div>
          </ScrollReveal>

          <span className="lv-int-connector" aria-hidden="true" />

          <ScrollReveal delay={200}>
            <div className="lv-int-tier">
              <div className="lv-int-tier-head">
                <span className="lv-int-tier-label">Synthesis engines</span>
                <span className="lv-int-tier-sub">the voice models Lyric governs</span>
              </div>
              <div className="lv-int-marks">
                {SYNTH.map((name) => (
                  <span key={name} className="lv-int-mark">
                    {name}
                  </span>
                ))}
                <span className="lv-int-mark lv-int-mark-own">or your own models</span>
              </div>
              <p className="lv-int-point">
                <span className="lv-int-point-label">Model Agnostic</span>
                Route your calls through your preferred synthesis engines, Hume,
                ElevenLabs, Fish Audio, or your own proprietary models, while
                maintaining your brand&apos;s unique identity.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={140}>
          <p className="lv-int-note">Open API and webhooks cover the rest.</p>
        </ScrollReveal>
      </div>
    </section>
  )
}
