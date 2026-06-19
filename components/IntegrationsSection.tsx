/* Integrations — section 7. A calm, flat integrations wall. Lyric's layer
   position is already established earlier on the page, so this section does
   not re-diagram the architecture: the "between" idea lives in the headline
   and body, not in the layout.

   One bordered container holds two clearly-labeled groups (Infrastructure
   and Synthesis engines). The three points sit below as brief supporting
   text, not anchored to a tier. Ecosystem compatibility, not shipped
   first-party connectors: brand names are text wordmarks (no official logo
   assets in the repo); cells accept real SVGs later. Off-white ground so the
   wordmarks read cleanly. Reveals use the shared ScrollReveal. */

import ScrollReveal from "@/components/ScrollReveal"

/* Real logos for the brands we have assets for; NICE CXone has no asset yet,
   so it stays a text wordmark. Per-logo scale balances optical weight across
   marks and wordmarks (same idea as the founders cycler). Logos render in
   their own colors. */
type Mark = { name: string; src?: string; scale?: number }

const INFRA: Mark[] = [
  { name: "Twilio", src: "/images/logos/twilio.svg", scale: 1 },
  { name: "Five9", src: "/images/logos/five9.svg", scale: 1.05 },
  { name: "NICE CXone" },
  { name: "Salesforce", src: "/images/logos/salesforce.svg", scale: 1.15 },
]

const SYNTH: Mark[] = [
  { name: "Hume", src: "/images/logos/hume.svg", scale: 1.1 },
  { name: "ElevenLabs", src: "/images/logos/elevenlabs.svg", scale: 1 },
  { name: "Fish Audio", src: "/images/logos/fish-audio.svg", scale: 1.1 },
]

const LOGO_BASE = 24

function Marks({ items }: { items: Mark[] }) {
  return (
    <>
      {items.map((m) =>
        m.src ? (
          <span key={m.name} className="lv-int-mark lv-int-mark-logo">
            <img
              src={m.src}
              alt={m.name}
              style={{ height: `${LOGO_BASE * (m.scale ?? 1)}px` }}
            />
          </span>
        ) : (
          <span key={m.name} className="lv-int-mark">
            {m.name}
          </span>
        ),
      )}
    </>
  )
}

const POINTS = [
  {
    label: "Infrastructure Ready",
    body: "Built to integrate with your existing contact-center stack via Twilio, Five9, NICE CXone, and Salesforce.",
  },
  {
    label: "Model Agnostic",
    body: "Route your calls through your preferred synthesis engines, Hume, ElevenLabs, Fish Audio, or your own proprietary models, while maintaining your brand’s unique identity.",
  },
  {
    label: "Open Governance API",
    body: "Use our REST API and webhooks to configure emotional adjustments, pronunciation overrides, and brand safety checks across your call flow.",
  },
]

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

        <ScrollReveal delay={140}>
          <div className="lv-int-wall">
            <div className="lv-int-group">
              <div className="lv-int-tier-head">
                <span className="lv-int-tier-label">Infrastructure</span>
                <span className="lv-int-tier-sub">telephony, contact center, CRM</span>
              </div>
              <div className="lv-int-marks">
                <Marks items={INFRA} />
              </div>
            </div>

            <div className="lv-int-group">
              <div className="lv-int-tier-head">
                <span className="lv-int-tier-label">Synthesis engines</span>
                <span className="lv-int-tier-sub">the voice models Lyric governs</span>
              </div>
              <div className="lv-int-marks">
                <Marks items={SYNTH} />
                <span className="lv-int-mark lv-int-mark-own">or your own models</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="lv-int-points">
          {POINTS.map((p, i) => (
            <ScrollReveal key={p.label} delay={120 + i * 80}>
              <div className="lv-int-point-block">
                <span className="lv-int-point-label">{p.label}</span>
                <p className="lv-int-point">{p.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={160}>
          <p className="lv-int-note">Open API and webhooks cover the rest.</p>
        </ScrollReveal>
      </div>
    </section>
  )
}
