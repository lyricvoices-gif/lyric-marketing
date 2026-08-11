import Image from "next/image"
import Link from "next/link"

import { AgentAudioVisualizerWave } from "@/components/agents-ui/agent-audio-visualizer-wave"
import ScrollReveal from "@/components/ScrollReveal"

function Eyebrow({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <div className={`lv-cxp-eyebrow${dark ? " is-dark" : ""}`}>
      <span aria-hidden="true" />
      {children}
    </div>
  )
}

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

function GovernVisual() {
  return (
    <div className="lv-cxp-govern-ui" aria-label="Illustration of the voice and text specification">
      <div className="lv-cxp-govern-top">
        <span>Voice + text spec</span>
        <span><i aria-hidden="true" /> Specified</span>
      </div>
      <AgentAudioVisualizerWave
        state="speaking"
        color="#FA954C"
        colorShift={0.3}
        lineWidth={2}
        volume={0.75}
        className="lv-cxp-livekit-wave"
        aria-hidden="true"
      />
      <div className="lv-cxp-govern-tags">
        <span>Disclosure present</span>
        <span>Terminology approved</span>
        <span>Tone: calm</span>
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
          {Array.from({ length: 10 }, (_, index) => <span key={index} />)}
        </div>
      </div>
      <div className="lv-cxp-drift-alert">
        <span className="lv-cxp-drift-dot" aria-hidden="true" />
        <div>
          <strong>Drift flagged</strong>
          <span>Pacing moved outside the approved range.</span>
        </div>
        <small>Output 24</small>
      </div>
    </div>
  )
}

function PortabilityVisual() {
  return (
    <div className="lv-cxp-port-ui" aria-label="Illustration of Callio working across an existing technology stack">
      <div className="lv-cxp-port-adapter">
        <div>
          <span>Callio</span>
          <strong>Implementation adapter</strong>
        </div>
        <p>Maps the governed specification into the stack you choose.</p>
      </div>

      <div className="lv-cxp-port-examples">
        <div className="lv-cxp-port-examples-head">
          <span>Compatible by design</span>
          <small>Examples</small>
        </div>
        <div className="lv-cxp-port-groups" aria-label="Example compatible providers by category">
          <div className="lv-cxp-port-group">
            <div className="lv-cxp-port-group-marks">
              <span className="lv-cxp-port-mark is-logo is-anthropic">
                <Image src="/images/logos/anthropic.svg" alt="Anthropic" width={24} height={24} />
              </span>
              <span className="lv-cxp-port-mark is-logo is-kimi">
                <Image src="/images/logos/kimi.svg" alt="Kimi K3" width={24} height={24} />
              </span>
            </div>
            <span className="lv-cxp-port-group-label">Models</span>
          </div>

          <div className="lv-cxp-port-group">
            <div className="lv-cxp-port-group-marks">
              <span className="lv-cxp-port-mark is-logo is-elevenlabs">
                <Image src="/images/logos/elevenlabs.svg" alt="ElevenLabs" width={24} height={24} />
              </span>
              <span className="lv-cxp-port-mark is-logo is-cartesia">
                <Image src="/images/logos/cartesia.svg" alt="Cartesia" width={26} height={24} />
              </span>
              <span className="lv-cxp-port-mark is-logo is-openai">
                <Image src="/images/logos/openai.svg" alt="OpenAI" width={24} height={24} />
              </span>
            </div>
            <span className="lv-cxp-port-group-label">Voice / TTS</span>
          </div>

          <div className="lv-cxp-port-group">
            <div className="lv-cxp-port-group-marks">
              <span className="lv-cxp-port-mark is-logo is-twilio">
                <Image src="/images/logos/twilio.svg" alt="Twilio" width={72} height={24} />
              </span>
              <span className="lv-cxp-port-mark is-logo is-vonage">
                <Image src="/images/logos/vonage.svg" alt="Vonage" width={28} height={24} />
              </span>
            </div>
            <span className="lv-cxp-port-group-label">Infrastructure</span>
          </div>
        </div>
      </div>

      <div className="lv-cxp-port-footer is-simple">
        <strong>Your stack remains yours.</strong>
      </div>
    </div>
  )
}

export default function CallioProductStory() {
  return (
    <>
      <section className="lv-cxp-intro" aria-labelledby="meet-callio-title">
        <div className="lv-cxp-wrap">
          <ScrollReveal className="lv-cxp-reveal-full">
            <div className="lv-cxp-intro-head">
              <div>
                <Eyebrow dark>One standard. Every agent.</Eyebrow>
                <h2 id="meet-callio-title">Meet Callio.</h2>
              </div>
              <div className="lv-cxp-intro-copy">
                <p>
                  Callio turns how your business should communicate into a governed
                  specification your AI agents can follow across voice and text.
                </p>
                <div className="lv-cxp-intro-points" aria-label="Callio product outcomes">
                  <span>Clear behavior</span>
                  <span>Portable controls</span>
                  <span>Measured adherence</span>
                </div>
                <Link href="/callio" className="lv-splitdemo-link">
                  See how it works <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} className="lv-cxp-reveal-full">
            <div className="lv-cxp-browser-shell" data-callio-screenshot-slot>
              <div className="lv-cxp-browser-bar" aria-hidden="true">
                <div className="lv-cxp-browser-dots"><span /><span /><span /></div>
                <div className="lv-cxp-browser-address">app.callio.ai</div>
                <div className="lv-cxp-browser-spacer" />
              </div>
              <div className="lv-cxp-browser-screen">
                {/* Authentic Callio capture. Replace only this Image source when refreshed. */}
                <Image
                  src="/images/home/callio-product-sol-confirmation.png"
                  alt="Callio confirming Sol as the governed voice for a financial-services agent"
                  width={1355}
                  height={900}
                  sizes="(max-width: 1120px) 94vw, 1120px"
                  priority={false}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="lv-cxp-features">
        <div className="lv-cxp-wrap">
          <ScrollReveal className="lv-cxp-reveal-full">
            <div className="lv-cxp-features-head">
              <div>
                <Eyebrow>Inside Callio</Eyebrow>
                <h2>Define the standard. Hold the line.</h2>
              </div>
              <p>
                From authoring through deployment and evaluation, every layer is
                built around one outcome: the agent behaves the way your business approved.
              </p>
            </div>
          </ScrollReveal>

          <div className="lv-cxp-feature-grid">
            <ScrollReveal className="lv-cxp-feature-reveal is-author">
              <article className="lv-cxp-feature is-author">
                <div className="lv-cxp-feature-copy">
                  <span>01 · Author the behavior</span>
                  <h3>Turn real workflows into a specification.</h3>
                  <p>
                    Capture how your business actually handles customer moments,
                    then make that logic portable and implementation ready.
                  </p>
                </div>
                <AuthoringVisual />
              </article>
            </ScrollReveal>

            <ScrollReveal delay={90} className="lv-cxp-feature-reveal is-govern">
              <article className="lv-cxp-feature is-govern">
                <div className="lv-cxp-feature-copy">
                  <span>02 · One standard across channels</span>
                  <h3>Voice and text, governed the same way.</h3>
                  <p>
                    Tone, terminology, required disclosures, and behavior are
                    specified once and carried into how the agent is
                    instructed, so voice and text hold the same approved
                    standard.
                  </p>
                </div>
                <GovernVisual />
              </article>
            </ScrollReveal>

            <ScrollReveal className="lv-cxp-feature-reveal is-verify">
              <article className="lv-cxp-feature is-verify">
                <div className="lv-cxp-feature-copy">
                  <span>03 · Prove it over time</span>
                  <h3>See when behavior holds and where it drifts.</h3>
                  <p>
                    The included evaluation and monitoring layer checks adherence
                    outside the live interaction. Use it when you want it.
                  </p>
                </div>
                <VerifyVisual />
              </article>
            </ScrollReveal>

            <ScrollReveal delay={90} className="lv-cxp-feature-reveal is-port">
              <article className="lv-cxp-feature is-port">
                <div className="lv-cxp-feature-copy">
                  <span>04 · Work in your stack</span>
                  <h3>Change the engine. Keep the standard.</h3>
                  <p>
                    Implementation-ready specs that work across any model, speech
                    provider, and channel. Swap the underlying components; the
                    evaluation layer confirms the standard holds.
                  </p>
                </div>
                <PortabilityVisual />
              </article>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
