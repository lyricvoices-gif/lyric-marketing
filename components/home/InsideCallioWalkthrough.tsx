import Image from "next/image"

import ScrollReveal from "@/components/ScrollReveal"
import GovernConversationVisual from "@/components/home/GovernConversationVisual"

function AuthoringVisual() {
  return (
    <div className="lv-cxp-author-ui" aria-label="Illustration of governance authoring">
      <div className="lv-cxp-author-prompt">
        <span>Interaction to govern</span>
        <p>Customer reports an unrecognized transaction.</p>
      </div>
      <div className="lv-cxp-author-arrow" aria-hidden="true">↓</div>
      <div className="lv-cxp-author-rules">
        <span>Specification generated</span>
        <div><i aria-hidden="true" /> Verify identity before account detail</div>
        <div><i aria-hidden="true" /> Use approved dispute terminology</div>
        <div><i aria-hidden="true" /> Condition liability on investigation</div>
      </div>
    </div>
  )
}

function VerifyVisual() {
  return (
    <div className="lv-cxp-verify-ui" aria-label="Illustration of evaluation and drift monitoring">
      <div className="lv-cxp-verify-head">
        <div>
          <span>Example evaluation</span>
          <strong>Agent behavior over time</strong>
        </div>
        <span className="lv-cxp-verify-status">Monitoring on</span>
      </div>
      <div className="lv-cxp-chart" aria-hidden="true">
        <div className="lv-cxp-chart-band" />
        <div className="lv-cxp-chart-line">
          {Array.from({ length: 10 }, (_, index) => (
            <span key={index}>
              {index === 6 && <em>Drift flagged</em>}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function PortabilityVisual() {
  return (
    <div className="lv-cxp-port-ui" aria-label="Illustration of Callio working across an existing technology stack">
      <p className="lv-cxp-port-lead">Your stack remains yours.</p>

      <div className="lv-cxp-port-examples">
        <div className="lv-cxp-port-groups" aria-label="Example compatible providers by category">
          <div className="lv-cxp-port-group">
            <div className="lv-cxp-port-group-marks">
              <span className="lv-cxp-port-mark is-logo is-anthropic" tabIndex={0}>
                <Image src="/images/logos/anthropic.svg" alt="Anthropic" width={24} height={24} />
              </span>
              <span className="lv-cxp-port-mark is-logo is-kimi" tabIndex={0}>
                <Image src="/images/logos/kimi.svg" alt="Kimi K3" width={24} height={24} />
              </span>
            </div>
            <span className="lv-cxp-port-group-label">Models</span>
          </div>

          <div className="lv-cxp-port-group">
            <div className="lv-cxp-port-group-marks">
              <span className="lv-cxp-port-mark is-logo is-elevenlabs" tabIndex={0}>
                <Image src="/images/logos/elevenlabs.svg" alt="ElevenLabs" width={24} height={24} />
              </span>
              <span className="lv-cxp-port-mark is-logo is-cartesia" tabIndex={0}>
                <Image src="/images/logos/cartesia.svg" alt="Cartesia" width={26} height={24} />
              </span>
              <span className="lv-cxp-port-mark is-logo is-openai" tabIndex={0}>
                <Image src="/images/logos/openai.svg" alt="OpenAI" width={24} height={24} />
              </span>
            </div>
            <span className="lv-cxp-port-group-label">Voice / TTS</span>
          </div>

          <div className="lv-cxp-port-group">
            <div className="lv-cxp-port-group-marks">
              <span className="lv-cxp-port-mark is-logo is-twilio" tabIndex={0}>
                <Image src="/images/logos/twilio.svg" alt="Twilio" width={72} height={24} />
              </span>
              <span className="lv-cxp-port-mark is-logo is-vonage" tabIndex={0}>
                <Image src="/images/logos/vonage.svg" alt="Vonage" width={28} height={24} />
              </span>
            </div>
            <span className="lv-cxp-port-group-label">Infrastructure</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const FEATURES = [
  {
    id: "author",
    number: "01",
    label: "Author the behavior",
    headline: "Turn real workflows into a specification.",
    body: "Capture how your business handles customer moments, then make that logic portable and implementation ready.",
    visual: <AuthoringVisual />,
  },
  {
    id: "govern",
    number: "02",
    label: "Govern every response",
    headline: "Keep voice and text inside the lines.",
    body: "Hold tone, terminology, disclosures, and behavior to the approved standard before an answer reaches the customer.",
    visual: <GovernConversationVisual />,
  },
  {
    id: "verify",
    number: "03",
    label: "Prove it over time",
    headline: "See when behavior holds and where it drifts.",
    body: "The included evaluation layer checks adherence over time and flags the moments that move outside the standard.",
    visual: <VerifyVisual />,
  },
  {
    id: "port",
    number: "04",
    label: "Work in your stack",
    headline: "Change the engine. Keep the standard.",
    body: "Implementation-ready specs work across your model, speech provider, channel, and infrastructure.",
    visual: <PortabilityVisual />,
  },
] as const

export default function InsideCallioWalkthrough() {
  return (
    <div className="lv-cxp-editorial-features">
      {FEATURES.map((feature, index) => (
        <article
          className={`lv-cxp-editorial-feature is-${feature.id}${index % 2 === 1 ? " is-reverse" : ""}`}
          key={feature.id}
        >
          <ScrollReveal className="lv-cxp-editorial-copy">
            <span>{feature.number} · {feature.label}</span>
            <h3>{feature.headline}</h3>
            <p>{feature.body}</p>
          </ScrollReveal>
          <ScrollReveal delay={90} className="lv-cxp-editorial-visual">
            {feature.visual}
          </ScrollReveal>
        </article>
      ))}
    </div>
  )
}
