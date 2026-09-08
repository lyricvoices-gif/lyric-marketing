"use client"

import Image from "next/image"
import React from "react"

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

const PORTABILITY_GROUPS = [
  {
    label: "Models",
    providers: [
      { name: "Anthropic", src: "/images/logos/anthropic.svg", className: "is-anthropic", width: 24 },
      { name: "Kimi K3", src: "/images/logos/kimi.svg", className: "is-kimi", width: 24 },
    ],
  },
  {
    label: "Voice / TTS",
    providers: [
      { name: "ElevenLabs", src: "/images/logos/elevenlabs.svg", className: "is-elevenlabs", width: 24 },
      { name: "Cartesia", src: "/images/logos/cartesia.svg", className: "is-cartesia", width: 26 },
      { name: "OpenAI", src: "/images/logos/openai.svg", className: "is-openai", width: 24 },
    ],
  },
  {
    label: "Infrastructure",
    providers: [
      { name: "Twilio", src: "/images/logos/twilio.svg", className: "is-twilio", width: 72 },
      { name: "Vonage", src: "/images/logos/vonage.svg", className: "is-vonage", width: 28 },
    ],
  },
] as const

const PORTABILITY_ROTATION_MS = 3200

function PortabilityVisual() {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [inView, setInView] = React.useState(false)
  const [pointerPaused, setPointerPaused] = React.useState(false)
  const [focusPaused, setFocusPaused] = React.useState(false)
  const [reducedMotion, setReducedMotion] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncPreference = () => setReducedMotion(media.matches)
    syncPreference()
    media.addEventListener("change", syncPreference)
    return () => media.removeEventListener("change", syncPreference)
  }, [])

  React.useEffect(() => {
    const root = rootRef.current
    if (!root || !("IntersectionObserver" in window)) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.34 },
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    if (reducedMotion || !inView || pointerPaused || focusPaused) return
    const timer = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % PORTABILITY_GROUPS.length),
      PORTABILITY_ROTATION_MS,
    )
    return () => window.clearInterval(timer)
  }, [focusPaused, inView, pointerPaused, reducedMotion])

  return (
    <div
      ref={rootRef}
      className={`lv-cxp-port-ui${reducedMotion ? " is-reduced" : ""}`}
      role="group"
      aria-label="Callio works across your stack"
      aria-describedby="lv-cxp-port-summary"
      onMouseEnter={() => setPointerPaused(true)}
      onMouseLeave={() => setPointerPaused(false)}
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocusPaused(false)
        }
      }}
    >
      <p className="lv-cxp-port-lead">
        <span>Your stack remains yours. One standard across</span>{" "}
        {reducedMotion ? (
          <strong className="lv-cxp-port-cycle-static">Models, Voice / TTS, and Infrastructure.</strong>
        ) : (
          <span className="lv-cxp-port-cycle-label" aria-hidden="true">
            {PORTABILITY_GROUPS.map((group, index) => (
              <strong className={index === activeIndex ? "is-active" : ""} key={group.label}>
                {group.label}
              </strong>
            ))}
          </span>
        )}
      </p>

      <p className="lv-cxp-port-sr" id="lv-cxp-port-summary">
        Compatible provider examples by category. Models: Anthropic and Kimi K3. Voice and text to speech: ElevenLabs, Cartesia, and OpenAI. Infrastructure: Twilio and Vonage.
      </p>

      <div className="lv-cxp-port-examples">
        <div className="lv-cxp-port-groups" aria-label="Example compatible providers by category">
          {PORTABILITY_GROUPS.map((group, index) => {
            const isActive = index === activeIndex
            const isAvailable = reducedMotion || isActive
            return (
              <div
                className={`lv-cxp-port-group${isActive ? " is-active" : ""}`}
                aria-hidden={isAvailable ? undefined : true}
                key={group.label}
              >
                <div className="lv-cxp-port-group-marks">
                  {group.providers.map((provider) => (
                    <span
                      className={`lv-cxp-port-mark is-logo ${provider.className}`}
                      role="img"
                      aria-label={provider.name}
                      tabIndex={isAvailable ? 0 : -1}
                      key={provider.name}
                    >
                      <Image src={provider.src} alt="" aria-hidden="true" width={provider.width} height={24} />
                      <span className="lv-cxp-port-tooltip" aria-hidden="true">{provider.name}</span>
                    </span>
                  ))}
                </div>
                <span className="lv-cxp-port-group-label">{group.label}</span>
              </div>
            )
          })}
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
