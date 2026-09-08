import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import CallioHearIt from "@/components/callio/CallioHearIt"

export const metadata: Metadata = {
  title: "Callio",
  description:
    "Callio turns how your business should communicate into a governed specification your AI agents can follow across voice and text.",
}

const STEPS = [
  {
    number: "02",
    label: "Standards",
    title: "Author the standards every agent must follow.",
    body: "Callio brings in the relevant industry foundation, then shapes it around your company and channels. Pronunciation, required disclosures, output standards, and pacing become explicit parts of the specification.",
    image: "/images/callio/02-foundation-and-context.png",
    alt: "Callio intake showing a financial-services foundation, enterprise context, channel choices, and the developing voice specification.",
    framed: false,
  },
  {
    number: "03",
    label: "Behavior",
    title: "Select the voice. Tune how every answer behaves.",
    body: "Choose a voice fit for the deployment, then define warmth, pacing, energy, vocabulary, and text behavior. Voice and text decisions live in one governed standard.",
    image: "/images/callio/03-voice-selection.png",
    alt: "Callio voice selection screen with Sam, James, and Sol alongside the developing financial-services voice specification.",
    framed: false,
  },
  {
    number: "04",
    label: "Review and build",
    title: "Review the specification before implementation.",
    body: "The completed intake makes each decision inspectable. Review and refine it before purchase, then move forward with the governed specification and implementation adapter for your setup.",
    image: "/images/callio/04-completed-spec.png",
    alt: "Completed Callio intake showing the selected Sam voice, delivery settings, playback, editing, download, and the finished voice specification.",
    framed: true,
  },
] as const

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`lv-philosophy-eyebrow lv-callio-v2-eyebrow${dark ? " is-dark" : ""}`}>
      <span className="lv-eyebrow-dot" aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}

function ProductCapture({
  src,
  alt,
  framed,
  priority = false,
}: {
  src: string
  alt: string
  framed: boolean
  priority?: boolean
}) {
  const image = (
    <Image
      src={src}
      alt={alt}
      width={3200}
      height={2000}
      sizes="(max-width: 768px) 100vw, 62vw"
      priority={priority}
    />
  )

  if (!framed) {
    return <div className="lv-callio-v2-capture">{image}</div>
  }

  return (
    <div className="lv-callio-v2-browser">
      <div className="lv-callio-v2-browser-bar" aria-hidden="true">
        <span className="lv-callio-v2-browser-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="lv-callio-v2-browser-address">callio.lyricvoices.ai</span>
        <span className="lv-callio-v2-browser-spacer" />
      </div>
      <div className="lv-callio-v2-browser-screen">{image}</div>
    </div>
  )
}

export default function CallioPage() {
  return (
    <main className="lv-callio-page">
      <section className="lv-callio-v2-hero">
        <div className="lv-callio-v2-wrap lv-callio-v2-hero-grid">
          <div className="lv-callio-v2-hero-copy">
            <ScrollReveal>
              <Eyebrow>Callio</Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h1>The governed specification behind every AI agent.</h1>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <p>
                Callio turns how your business should communicate into a governed
                specification your AI agents can follow across voice and text.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={240}>
              <div className="lv-callio-v2-actions">
                <Link href="/start" className="lv-callio-v2-primary-link">
                  Generate your governed spec
                </Link>
                <Link href="/pricing" className="lv-callio-v2-text-link">
                  View pricing <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="lv-callio-v2-pills" aria-label="Callio outcomes">
                <span>Enterprise context</span>
                <span>Voice + text behavior</span>
                <span>Implementation-ready</span>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={120} className="lv-callio-v2-hero-visual">
            <ProductCapture
              src="/images/callio/01-begin-intake.png"
              alt="Callio guided intake landing screen."
              framed
              priority
            />
            <p className="lv-callio-v2-hero-caption">
              <span>01</span>
              Begin with a guided intake that captures your industry, enterprise
              context, use case, and channels.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="lv-callio-v2-intro">
        <div className="lv-callio-v2-wrap lv-callio-v2-intro-inner">
          <ScrollReveal>
            <Eyebrow>How Callio works</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2>From enterprise context to an implementation-ready specification.</h2>
          </ScrollReveal>
          <ScrollReveal delay={180}>
            <p>
              A guided intake captures the decisions behind your communication
              standard. Each step makes the specification more concrete, without
              asking your team to translate brand and governance requirements into
              technical configuration on its own.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="lv-callio-v2-walkthrough" aria-label="How Callio works">
        <div className="lv-callio-v2-wrap">
          {STEPS.map((step, index) => (
            <article
              className={`lv-callio-v2-step${index % 2 === 1 ? " is-reverse" : ""}`}
              key={step.number}
            >
              <ScrollReveal className="lv-callio-v2-step-copy">
                <p className="lv-callio-v2-step-index">
                  <span>{step.number}</span>
                  {step.label}
                </p>
                <h3>{step.title}</h3>
                <p className="lv-callio-v2-step-body">{step.body}</p>
              </ScrollReveal>
              <ScrollReveal delay={100} className="lv-callio-v2-step-visual">
                <ProductCapture
                  src={step.image}
                  alt={step.alt}
                  framed={step.framed}
                  priority={step.number === "02"}
                />
              </ScrollReveal>
            </article>
          ))}
        </div>
      </section>

      <section className="lv-callio-v2-proof" id="proof">
        <div className="lv-callio-v2-wrap">
          <div className="lv-callio-v2-proof-head">
            <ScrollReveal>
              <Eyebrow dark>Proof in practice</Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2>Hear the standard hold.</h2>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <p>
                A customer asks about a credit‑card rate. One response stays
                within the specification. The other drifts. The contrast makes
                the standard clear.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={240}>
            <CallioHearIt />
          </ScrollReveal>
        </div>
      </section>

      <section className="lv-callio-v2-adapter">
        <div className="lv-callio-v2-wrap">
          <div className="lv-callio-v2-adapter-copy">
            <ScrollReveal>
              <Eyebrow dark>Implementation adapter</Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2>Concrete instructions for the stack you already use.</h2>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <p>
                Complete the intake at no charge. When you purchase a custom build,
                the adapter maps the governed specification into the system prompt,
                skills, and APIs required for your setup. Your team can implement it
                in its existing stack, or add optional implementation consulting at
                checkout.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={160} className="lv-callio-v2-adapter-flow" display="grid">
            <div>
              <span>01</span>
              <strong>Governed specification</strong>
              <p>Approved language, behavior, scenarios, and evaluation standard.</p>
            </div>
            <i aria-hidden="true" />
            <div>
              <span>02</span>
              <strong>Implementation adapter</strong>
              <p>System prompt, skills, APIs, and concrete integration instructions.</p>
            </div>
            <i aria-hidden="true" />
            <div>
              <span>03</span>
              <strong>Your existing stack</strong>
              <p>Your model, speech provider, channels, and infrastructure.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="lv-final lv-callio-v2-close">
        <ScrollReveal>
          <Eyebrow dark>One standard. Every agent.</Eyebrow>
          <h2>
            <span className="lv-final-line">All your agents,</span>
            <br />
            <span className="lv-final-line">
              one <em>brand voice</em>.
            </span>
          </h2>
          <div className="lv-callio-v2-close-actions">
            <Link href="/start" className="lv-callio-v2-primary-link is-light">
              Generate your governed spec
            </Link>
            <Link href="/pricing" className="lv-callio-v2-text-link is-light">
              View pricing <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
