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
  { name: "NICE CXone", src: "/images/logos/nice-cxone.svg", scale: 1 },
  { name: "Salesforce", src: "/images/logos/salesforce.svg", scale: 1.15 },
]

const SYNTH: Mark[] = [
  { name: "Gemini", src: "/images/logos/gemini.svg", scale: 1.3 },
  { name: "ElevenLabs", src: "/images/logos/elevenlabs.svg", scale: 1 },
  { name: "OpenAI", src: "/images/logos/openai.svg", scale: 1.3 },
]

const LOGO_BASE = 24

/* Dot-separated tier sub-line. Items and middot separators share one
   inline-flex row (align-items: center) so the dots sit vertically leveled
   with the text regardless of the mono glyph's own metrics. */
function DotList({ items }: { items: string[] }) {
  return (
    <span className="lv-int-tier-sub lv-int-tier-sub-list">
      {items.flatMap((item, i) =>
        i === 0
          ? [<span key={item}>{item}</span>]
          : [
              <span key={`${item}-dot`} className="lv-int-tier-dot" aria-hidden="true">
                ·
              </span>,
              <span key={item}>{item}</span>,
            ],
      )}
    </span>
  )
}

function Marks({ items }: { items: Mark[] }) {
  return (
    <>
      {items.map((m) =>
        m.src ? (
          <span
            key={m.name}
            className="lv-int-mark lv-int-mark-logo"
            data-tooltip={m.name}
            tabIndex={0}
            aria-label={m.name}
          >
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
            <h2 className="lv-int-headline">Orchestrate your entire agentic comms stack.</h2>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p className="lv-int-supporting">
              Callio is the governance layer above your models, voice engines,
              and channels. You define your brand voice once, and Callio holds
              every agent to it on the phone, in your app, over SMS, chat, and
              email. When you change providers, your brand voice stays the same
              because the spec lives with you, not with the engine.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={140}>
          <div className="lv-int-wall">
            <div className="lv-int-group">
              <div className="lv-int-tier-head">
                <span className="lv-int-tier-label">Infrastructure</span>
                <DotList items={["telephony", "messaging", "email", "CRM"]} />
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

        <ScrollReveal delay={160}>
          <p className="lv-int-note">Open API and webhooks cover the rest.</p>
        </ScrollReveal>
      </div>
    </section>
  )
}
