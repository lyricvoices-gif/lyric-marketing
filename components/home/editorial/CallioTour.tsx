"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import DemoTabs from "./DemoTabs"

const steps = [
  {
    label: "Set the standard",
    title: "Start with your business.",
    body: "Choose your industry and channels. Callio brings the relevant disclosures, terminology, and delivery standards into the specification.",
    output: "Industry foundation + company context",
  },
  {
    label: "Shape the behavior",
    title: "Make the voice your own.",
    body: "Select a voice. Set warmth, pacing, energy, and vocabulary. Voice and text share one governed standard.",
    output: "Voice selection + delivery rules",
  },
  {
    label: "Review & implement",
    title: "Inspect what your agents will follow.",
    body: "Review and refine the completed specification before implementation. Take the approved behavior into your models and infrastructure.",
    output: "Governed specification + implementation adapter",
  },
] as const

export default function CallioTour() {
  const [selected, setSelected] = useState(0)
  const video = useRef<HTMLVideoElement>(null)
  const step = steps[selected]

  function selectStep(index: number) {
    if (index === selected) return
    video.current?.pause()
    setSelected(index)
  }

  return (
    <div className="le-product-tour" data-reveal data-reveal-delay="90">
      <DemoTabs
        id="tour"
        label="Explore the Callio workflow"
        items={steps.map((item) => item.label)}
        selected={selected}
        onSelect={selectStep}
        showNumbers={false}
      />
      <div
        id="tour-panel"
        role="tabpanel"
        aria-labelledby={`tour-tab-${selected}`}
        tabIndex={0}
        className="le-tour-panel"
      >
        <div className="le-tour-copy">
          <span className="le-label">In Callio</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
          <div className="le-tour-output">
            <span className="le-label">Your output</span>
            <p>{step.output}</p>
          </div>
          {selected === 2 ? (
            <Link href="/start" className="le-text-link">
              Start your specification <span aria-hidden="true">↗</span>
            </Link>
          ) : (
            <button
              type="button"
              className="le-text-link le-tour-next"
              onClick={() => selectStep(selected + 1)}
            >
              Next: {steps[selected + 1].label.toLowerCase()}{" "}
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
        <figure className="le-tour-capture">
          <div className="le-tour-browser">
            <div className="le-tour-browser-bar" aria-hidden="true">
              <span className="le-tour-browser-dots">
                <i />
                <i />
                <i />
              </span>
              <span>callio.lyricvoices.ai</span>
              <span />
            </div>
            <video
              key={selected}
              ref={video}
              controls
              playsInline
              preload="metadata"
              poster="/images/callio/intake-recording-poster.jpg"
              aria-label="Callio intake preview: business and channel setup"
              aria-describedby="tour-recording-caption"
            >
              <source src="/videos/callio-intake.webm" type="video/webm" />
              <source src="/videos/callio-intake.mp4" type="video/mp4" />
              <a href="/videos/callio-intake.mp4">
                Watch the business setup recording
              </a>
            </video>
          </div>
          <figcaption id="tour-recording-caption">
            Callio intake preview · Business and channel setup · 10 seconds · No
            audio
          </figcaption>
        </figure>
      </div>
    </div>
  )
}
