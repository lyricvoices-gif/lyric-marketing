import Link from "next/link"
import CallioIntakeVideo from "@/components/home/CallioIntakeVideo"
import ScrollReveal from "@/components/ScrollReveal"

const CALLIO_FEATURES = [
  {
    number: "01",
    title: "Author",
    body: "Turn real workflows into an implementation-ready specification.",
  },
  {
    number: "02",
    title: "Govern",
    body: "Hold voice and text to approved behavior before they reach a customer.",
  },
  {
    number: "03",
    title: "Evaluate",
    body: "Measure adherence over time and surface the moments that drift.",
  },
  {
    number: "04",
    title: "Implement",
    body: "Carry the standard into the models, providers, and infrastructure you use.",
  },
] as const

function Eyebrow({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <div className={`lv-cxp-eyebrow${dark ? " is-dark" : ""}`}>
      <span aria-hidden="true" />
      {children}
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
                  Callio turns how your business expects AI agents to behave into a governed
                  specification they can follow across voice and text.
                </p>
                <div className="lv-cxp-intro-points" aria-label="Callio product outcomes">
                  <span>Clear behavior</span>
                  <span>Portable controls</span>
                  <span>Observable adherence</span>
                </div>
                <Link href="/callio" className="lv-link-cta lv-cxp-intro-link">
                  Explore Callio <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} className="lv-cxp-reveal-full">
            <div className="lv-cxp-browser-shell lv-cxp-product-shell" data-callio-screenshot-slot>
              <div className="lv-cxp-browser-bar" aria-hidden="true">
                <div className="lv-cxp-browser-dots"><span /><span /><span /></div>
                <div className="lv-cxp-browser-address">app.callio.ai</div>
                <div className="lv-cxp-browser-spacer" />
              </div>
              <div className="lv-cxp-browser-screen">
                {/* Authentic Callio capture: the live intake recording shared
                    with /callio's hero. */}
                <CallioIntakeVideo />
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200} className="lv-cxp-reveal-full">
            <div className="lv-cxp-feature-register" aria-label="Inside Callio">
              {CALLIO_FEATURES.map((feature) => (
                <article key={feature.number} className="lv-cxp-feature-anchor">
                  <p className="lv-cxp-feature-anchor-meta">{feature.number}</p>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
