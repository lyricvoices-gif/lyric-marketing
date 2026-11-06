import Link from "next/link"
import type { Metadata } from "next"
import AudioCompare from "@/components/home/editorial/AudioCompare"
import CallioTour from "@/components/home/editorial/CallioTour"
import { LyricGovernedDemo } from "@/components/home/AgentsScenario"
import { FS_HERO_DEMO } from "@/components/home/governed-demo"

export const metadata: Metadata = {
  title: { absolute: "Lyric — One brand voice. Every agent." },
  description:
    "The brand-governance layer for AI agents. Callio turns your business standards into governed behavior across voice, text, models, and speech engines.",
}

function SectionLabel({
  number,
  children,
}: {
  number: string
  children: React.ReactNode
}) {
  return (
    <p className="le-section-label">
      <span>{number}</span>
      {children}
    </p>
  )
}
function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>
}

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        href="/fonts/timeless/TimelessSerif-Regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/timeless/TimelessSans-GroteskRegular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <section className="le-hero le-wrap" aria-labelledby="home-title">
        <p className="le-hero-kicker le-label" data-reveal>
          AI communication governance for the enterprise
        </p>
        <h1 id="home-title" data-reveal data-reveal-delay="90">
          One brand voice.
          <br />
          <em>Every agent.</em>
        </h1>
        <div className="le-hero-bottom" data-reveal data-reveal-delay="180">
          <div className="le-hero-copy">
            <p>
              Turn your brand, policy, and service standards into behavior every
              AI agent can follow. That’s Callio.
            </p>
            <div className="le-actions">
              <a className="le-button" href="#system">
                Explore Callio <Arrow />
              </a>
              <a
                className="le-text-link"
                href="mailto:info@lyricvoices.ai?subject=Enterprise%20AI%20agents"
              >
                Talk to our team <Arrow diagonal />
              </a>
            </div>
          </div>
        </div>
        <div
          className="le-buyer-path"
          aria-label="Explore Lyric"
          data-reveal
          data-reveal-delay="270"
        >
          <a href="#evidence">
            <span>01</span> Hear the difference <Arrow />
          </a>
          <a href="#system">
            <span>02</span> Build your standard <Arrow />
          </a>
          <a href="#conversation">
            <span>03</span> See it in action <Arrow />
          </a>
        </div>
      </section>

      <section
        id="evidence"
        tabIndex={-1}
        className="le-wrap le-section le-proof-section"
        aria-labelledby="evidence-title"
      >
        <AudioCompare
          introduction={
            <>
              <SectionLabel number="01">Hear the difference</SectionLabel>
              <h2 id="evidence-title">
                Same question.
                <br />
                <em>A different standard.</em>
              </h2>
              <p>
                One question. Two ways to answer. Play each response and follow
                the words.
              </p>
            </>
          }
        />
      </section>

      <section
        id="system"
        tabIndex={-1}
        className="le-system"
        aria-labelledby="system-title"
      >
        <div className="le-wrap le-section">
          <div className="le-compact-heading" data-reveal>
            <div>
              <SectionLabel number="02">Build your standard</SectionLabel>
              <h2 id="system-title">
                Your standards.
                <br />
                <em>Ready for your agents.</em>
              </h2>
            </div>
            <p>
              From guided intake to an implementation-ready specification with
              Callio, our intake agent. Explore the actual workflow.
            </p>
            <Link href="/callio" className="le-text-link le-system-link">
              Explore Callio <Arrow diagonal />
            </Link>
          </div>
          <CallioTour />
        </div>
      </section>

      <section
        id="conversation"
        tabIndex={-1}
        className="le-conversation le-wrap le-section"
        aria-labelledby="conversation-title"
      >
        <div className="le-conversation-intro" data-reveal>
          <SectionLabel number="03">See it in action</SectionLabel>
          <h2 id="conversation-title">
            The foundation
            <br />
            <em>is already built.</em>
          </h2>
          <p>
            Start with a governed Financial Services foundation. Hear it handle
            a disputed charge, from disclosure to resolution.
          </p>
          <Link href="/agents" className="le-text-link">
            Explore pre-built agents <Arrow />
          </Link>
        </div>
        <div className="le-demo" data-reveal data-reveal-delay="90">
          <LyricGovernedDemo demo={FS_HERO_DEMO} autoPlay={false} />
          <p className="le-demo-caption">
            Recorded demonstration · Oakhaven Capital scenario
          </p>
          <details className="le-full-transcript">
            <summary>
              Read the full transcript <span aria-hidden="true">+</span>
            </summary>
            <ol>
              {FS_HERO_DEMO.transcript.map((turn) => (
                <li key={turn.id}>
                  <span className="le-label">{turn.role}</span>
                  <p>{turn.text}</p>
                  {turn.annotations?.map((note) => (
                    <span className="le-transcript-note" key={note.label}>
                      ↳ {note.label}
                    </span>
                  ))}
                </li>
              ))}
            </ol>
          </details>
        </div>
      </section>
      <section
        className="le-quote-section le-wrap"
        data-reveal
        aria-label="Regulatory context"
      >
        <span className="le-label">Why the standard matters</span>
        <figure>
          <blockquote>
            “A poorly deployed chatbot can lead to customer frustration, reduced
            trust, and even <em>violations of the law.</em>”
          </blockquote>
          <figcaption>
            <span>Rohit Chopra</span>
            <span>Then Director, Consumer Financial Protection Bureau</span>
            <a
              className="le-text-link"
              href="https://www.consumerfinance.gov/archive/newsroom/cfpb-issue-spotlight-analyzes-artificial-intelligence-chatbots-in-banking/"
              target="_blank"
              rel="noreferrer"
            >
              June 6, 2023 · Read the source <Arrow diagonal />
            </a>
          </figcaption>
        </figure>
      </section>

      <section
        className="le-credibility le-wrap"
        data-reveal
        aria-label="Founder experience"
      >
        <p className="le-label">
          Our founders shaped <br />
          agentic communications at
        </p>
        <p>
          Google <span>·</span> JBL <span>·</span> United Airlines{" "}
          <span>·</span> Virgin Atlantic <span>·</span> Verizon <span>·</span>{" "}
          BMW Group <span>·</span> AppFolio <span>·</span> Meta
        </p>
      </section>

      <section
        id="get-started"
        className="le-launch le-wrap le-section"
        aria-labelledby="launch-title"
      >
        <div className="le-compact-heading" data-reveal>
          <div>
            <SectionLabel number="04">Your next step</SectionLabel>
            <h2 id="launch-title">
              Start with one workflow.
              <br />
              <em>Make the standard yours.</em>
            </h2>
          </div>
          <a
            className="le-button"
            href="mailto:info@lyricvoices.ai?subject=Enterprise%20AI%20agents"
          >
            Talk to our team <Arrow diagonal />
          </a>
        </div>
        <div className="le-launch-paths" data-reveal data-reveal-delay="90">
          <Link href="/start">
            <span className="le-label">For your existing agents</span>
            <span className="le-launch-name">
              Build with Callio <Arrow diagonal />
            </span>
            <span>Define your brand’s governed specification.</span>
          </Link>
          <Link href="/agents">
            <span className="le-label">For a new deployment</span>
            <span className="le-launch-name">
              Start with a pre-built agent <Arrow diagonal />
            </span>
            <span>Adapt the Financial Services foundation.</span>
          </Link>
        </div>
        <div className="le-launch-bottom" data-reveal>
          <p className="le-caption">
            Property Management, Travel & Hospitality, and Healthcare
            foundations are in development. Custom Callio intakes are available.
          </p>
          <Link href="/pricing" className="le-text-link">
            Explore pricing <Arrow />
          </Link>
        </div>
      </section>
    </>
  )
}
