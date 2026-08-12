import Image from "next/image"
import Link from "next/link"

import ScrollReveal from "@/components/ScrollReveal"
import InsideCallioWalkthrough from "@/components/home/InsideCallioWalkthrough"

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

          <InsideCallioWalkthrough />
        </div>
      </section>
    </>
  )
}
