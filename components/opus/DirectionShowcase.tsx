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
import DirectionCanvas from "@/components/opus/DirectionCanvas"

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
          <DirectionCanvas />
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
