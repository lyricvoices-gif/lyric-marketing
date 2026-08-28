import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import CallioIntakeTeaser from "@/components/callio/CallioIntakeTeaser"
import CallioHearIt from "@/components/callio/CallioHearIt"

export const metadata: Metadata = {
  title: "Callio | AI Communication Governance",
  description:
    "Turn brand, compliance, CX, and workflow rules into one portable communication standard for every AI agent.",
}

const LIFECYCLE = [
  { number: "01", title: "Author", body: "Turn business rules into an implementation-ready specification." },
  { number: "02", title: "Govern", body: "Apply the standard before a response reaches the customer." },
  { number: "03", title: "Evaluate", body: "Find the moments where voice, language, or behavior drifts." },
  { number: "04", title: "Implement", body: "Carry the standard across the stack you already use." },
] as const

function Eyebrow({ children, dark = false }: { children: string; dark?: boolean }) {
  return <div className={`lv-c5-eyebrow${dark ? " is-dark" : ""}`}><span aria-hidden="true" />{children}</div>
}

function ProductCapture({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="lv-c5-capture">
      <div className="lv-c5-capture-bar" aria-hidden="true"><span><i /><i /><i /></span><b>callio.lyricvoices.ai</b><span /></div>
      <Image src={src} alt={alt} width={3200} height={2000} sizes="(max-width: 760px) 100vw, 68vw" />
    </div>
  )
}

export default function CallioPage() {
  return (
    <main className="lv-c5">
      <section className="lv-c5-hero">
        <div className="lv-c5-wrap lv-c5-hero-copy">
          <ScrollReveal><Eyebrow dark>Callio</Eyebrow></ScrollReveal>
          <ScrollReveal delay={80}><h1>Make your standard <em>operational.</em></h1></ScrollReveal>
          <ScrollReveal delay={150}><p>Callio turns brand, compliance, CX, and workflow rules into one portable specification for every agent.</p></ScrollReveal>
          <ScrollReveal delay={220}>
            <div className="lv-c5-actions">
              <Link className="lv-c5-button is-primary" href="/start">Build your spec</Link>
              <Link className="lv-c5-button is-outline" href="/contact">Talk to us</Link>
            </div>
          </ScrollReveal>
        </div>
        <div className="lv-c5-wrap lv-c5-hero-product"><CallioIntakeTeaser /></div>
      </section>

      <section className="lv-c5-lifecycle">
        <div className="lv-c5-wrap lv-c5-section-grid">
          <div className="lv-c5-lockup">
            <ScrollReveal><Eyebrow>One standard. Every agent.</Eyebrow><h2>One spec.<br /><em>Four jobs.</em></h2><p>Define the standard once. Keep it working everywhere.</p></ScrollReveal>
          </div>
          <ol className="lv-c5-sequence" role="list">
            {LIFECYCLE.map((item, index) => (
              <ScrollReveal key={item.number} delay={70 + index * 55}>
                <li><span aria-hidden="true">{item.number}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="lv-c5-product-story">
        <div className="lv-c5-wrap">
          <article className="lv-c5-product-chapter">
            <ScrollReveal className="lv-c5-lockup"><Eyebrow>The intake</Eyebrow><h2>Start with what must be true.</h2><p>Set the industry, channels, workflows, and required language. Callio builds the foundation as you answer.</p></ScrollReveal>
            <ScrollReveal delay={100} className="lv-c5-product-visual"><ProductCapture src="/images/callio-product/foundation.png" alt="Callio building a Financial Services foundation with pronunciation, disclosure, output, and pacing rules." /></ScrollReveal>
          </article>
          <article className="lv-c5-product-chapter is-reverse">
            <ScrollReveal className="lv-c5-lockup"><Eyebrow>Brand voice</Eyebrow><h2>Shape how it should sound.</h2><p>Choose clear options. Hear the result. Keep what fits your institution.</p></ScrollReveal>
            <ScrollReveal delay={100} className="lv-c5-product-visual"><ProductCapture src="/images/callio-product/tone-traits.png" alt="Callio presenting authentic tone options beside the developing specification." /></ScrollReveal>
          </article>
        </div>
      </section>

      <section className="lv-c5-proof" id="hear">
        <div className="lv-c5-wrap">
          <div className="lv-c5-proof-intro">
            <ScrollReveal className="lv-c5-lockup">
              <Eyebrow dark>Proof in practice</Eyebrow>
              <h2>Hear the standard hold.</h2>
              <p>
                A customer asks about a credit‑card rate. One response stays
                within the specification. The other drifts. The contrast makes
                the standard clear.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={120}><CallioHearIt /></ScrollReveal>
        </div>
      </section>

      <section className="lv-c5-portable">
        <div className="lv-c5-wrap lv-c5-portable-grid">
          <ScrollReveal className="lv-c5-lockup"><Eyebrow dark>Portable by design</Eyebrow><h2>A standard you can move.</h2><p>The specification is yours. Models, speech providers, and channels can change without redefining how your institution communicates.</p></ScrollReveal>
          <ScrollReveal delay={100} className="lv-c5-portable-visual"><ProductCapture src="/images/callio-product/spec-complete.png" alt="The complete human-readable Callio specification with industry, channels, company, voice, delivery settings, and agent persona." /></ScrollReveal>
        </div>
        <div className="lv-c5-wrap lv-c5-portability-line" aria-label="Callio portability model">
          <div><span>01</span><b>Your standard</b><small>One owned specification</small></div><i aria-hidden="true">→</i>
          <div><span>02</span><b>Any provider</b><small>Models · TTS · STT</small></div><i aria-hidden="true">→</i>
          <div><span>03</span><b>Every channel</b><small>Voice · chat · messaging</small></div>
        </div>
      </section>

      <section className="lv-c5-start">
        <div className="lv-c5-wrap lv-c5-start-grid">
          <ScrollReveal className="lv-c5-lockup"><Eyebrow>How to begin</Eyebrow><h2>Start from where you are.</h2><p>Use an existing foundation or bring the agent stack you already run.</p></ScrollReveal>
          <div className="lv-c5-paths">
            <ScrollReveal><article><span>01</span><p>Pre-built foundation</p><h3>Start with the standard already built.</h3><p>Tailor a governed Financial Services foundation to your institution.</p><Link href="/agents">Explore the foundation ↗</Link></article></ScrollReveal>
            <ScrollReveal delay={70}><article><span>02</span><p>Your existing agent</p><h3>Bring what you already run.</h3><p>Keep your models, providers, and channels. Add the Callio standard.</p><Link href="/contact">Talk to us ↗</Link></article></ScrollReveal>
          </div>
        </div>
      </section>

      <section className="lv-final" style={{ background: "#2b2a25" }}>
        <ScrollReveal>
          <div className="lv-philosophy-eyebrow lv-final-eyebrow">
            <span className="lv-eyebrow-dot" aria-hidden="true" />
            <span>Callio</span>
          </div>
          <h2>
            <span className="lv-final-line">One standard.</span>
            <br />
            <span className="lv-final-line"><em>Every agent.</em></span>
          </h2>
          <p className="lv-callio-final-sub">Build the specification that keeps them aligned.</p>
          <div className="lv-cta-row lv-cta-row-center">
            <Link href="/start" className="lv-cta lv-about-close-cta">Build your spec</Link>
            <Link href="/contact" className="lv-cta lv-agents-cta-outline-dark">Talk to us</Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
