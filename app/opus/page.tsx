/* Opus product page — the enterprise creative environment that comes
   with every Lyric voice license. Two tools: Composer (audio
   generation) and Direction (parameter configuration). Direction is
   exclusive to Lyric imprint voices, which is the strategic anchor.
   The page closes by routing brands to /imprint/license for inquiry. */

import type { Metadata } from "next"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "Opus",
  description:
    "Opus is Lyric's enterprise creative environment. Composer for directed audio generation, Direction for parameter configuration, both for imprint voices.",
}

const C = {
  bg: "var(--bg-light)",
  text: "var(--text-1)",
  olive: "var(--olive)",
  border: "var(--border)",
  gold: "var(--gold)",
  sage: "var(--sage)",
}

export default function OpusPage() {
  return (
    <main style={{ background: C.bg, color: C.text }}>
      {/* Section 1 — Hero */}
      <section
        style={{
          padding: "140px 24px 96px",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <ScrollReveal>
            <Eyebrow label="Opus" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 6vw, 72px)",
                fontWeight: 500,
                lineHeight: 1.02,
                letterSpacing: "-0.005em",
                color: C.olive,
                margin: "0 0 22px",
              }}
            >
              <em>Opus</em>.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p
              style={{
                fontSize: "20px",
                lineHeight: 1.5,
                color: C.olive,
                opacity: 0.86,
                margin: "0 0 28px",
                maxWidth: "640px",
              }}
            >
              Direct the performance. Configure the deployment.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={320}>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: C.text,
                opacity: 0.78,
                margin: 0,
                maxWidth: "640px",
              }}
            >
              Opus is Lyric's enterprise creative environment for working
              with imprint voices. Two tools, one workspace: Composer for
              generating directed audio content, and Direction for tuning
              voices to your specific deployment context.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 2 — Composer.
          Dark olive ground gives this section the visual weight of a
          chapter break (mirrors the home page Products / Audiences /
          Final CTA rhythm). The videos ARE Composer here, not a
          separate "what you'll make" splash — they're the section's
          visualization. Direction (next section) stays text-only until
          its own video treatment exists; when that lands, it gets a
          symmetrical dark moment. */}
      <section
        style={{
          background: "#2b2a25",
          color: C.bg,
          padding: "120px 24px",
          borderTop: "1px solid rgba(255, 248, 236, 0.08)",
          borderBottom: "1px solid rgba(255, 248, 236, 0.08)",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <ScrollReveal>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                margin: "0 0 22px",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: C.gold,
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: C.bg,
                }}
              >
                Composer
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(34px, 5vw, 56px)",
                fontWeight: 500,
                lineHeight: 1.04,
                letterSpacing: "-0.005em",
                color: C.bg,
                margin: "0 0 22px",
                maxWidth: "780px",
              }}
            >
              Direction is part of the format.{" "}
              <em style={{ color: C.gold }}>Not a setting.</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.7,
                color: "rgba(255, 248, 236, 0.82)",
                margin: 0,
                maxWidth: "640px",
              }}
            >
              Composer is where voice direction becomes audio output.
              Most AI voice tools give you a slider. Opus gives you a
              script you can direct, sentence by sentence. Watch what
              that looks like.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={320}>
            <div className="lv-opus-storyboard">
              <StoryboardTile
                src="/videos/voice-selection.mp4"
                aria="Selecting a voice in the Opus Composer"
                caption="Five real voice artists, ready when you are."
              />
              <StoryboardTile
                src="/videos/script.mp4"
                aria="Writing a script in the Opus Composer"
                caption="Your script becomes the canvas."
              />
              <StoryboardTile
                src="/videos/emotional-tag.mp4"
                aria="Tagging a phrase with an emotion mark"
                caption="Inline emotion marks."
              />
              <StoryboardTile
                src="/videos/generation.mp4"
                aria="Generating audio from a directed script"
                caption="Broadcast-ready audio in seconds."
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 3 — Direction */}
      <ToolSection
        eyebrow="Direction"
        headline={<>Configure the <em>deployment</em>.</>}
        body="Direction is for fine-tuning a Lyric voice to your specific implementation context. Tell us how you want the voice to sound, where it will be deployed, and what edge cases it needs to handle. Through a real-time conversational interface, Direction translates your creative vision into the exact voice parameters your engineering team needs to deploy consistently across mobile apps, call centers, customer service systems, and any other dynamic voice application."
        useCases={[
          "Call center and customer service voice agents",
          "Mobile app conversational interfaces",
          "Property management and hospitality voice systems",
          "In-product voice assistants",
          "Any deployment requiring real-time, dynamic voice generation with consistent character",
        ]}
        howItWorks={[
          "Tell us how you want the voice to sound and where it will be deployed.",
          "Our AI agent collaborates with you in real time to refine the parameters.",
          "Receive a locked configuration ready for your engineering team to implement.",
        ]}
      />

      {/* Section 4 — Direction is exclusive to Lyric voices.
          Dark olive ground (the second rhythm break on this page)
          since this is the strategic anchor: why Direction is only
          available for imprint voices. */}
      <section
        style={{
          background: "#2b2a25",
          color: C.bg,
          padding: "120px 24px",
          borderTop: "1px solid rgba(255, 248, 236, 0.08)",
          borderBottom: "1px solid rgba(255, 248, 236, 0.08)",
        }}
      >
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <ScrollReveal>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                margin: "0 0 22px",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: C.gold,
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: C.bg,
                }}
              >
                Why this matters
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 500,
                lineHeight: 1.06,
                color: C.bg,
                margin: "0 0 28px",
                maxWidth: "720px",
              }}
            >
              Direction is exclusive to Lyric voices.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.7,
                color: "rgba(255, 248, 236, 0.82)",
                margin: 0,
                maxWidth: "720px",
              }}
            >
              Direction is available only for voices on the Lyric imprint.
              Every voice on the imprint is built with a professional
              voice artist who consented to the licensing structure,
              retains rights to their voice, and earns ongoing
              compensation for every deployment. When you use Direction,
              you are not configuring a generic AI voice. You are tuning
              a real artist's voice within a partnership they shaped.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 5 — Access */}
      <section
        style={{
          padding: "96px 24px",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <ScrollReveal>
            <Eyebrow label="Access" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px, 3.4vw, 36px)",
                fontWeight: 500,
                lineHeight: 1.08,
                color: C.olive,
                margin: "0 0 22px",
              }}
            >
              How to get into Opus.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: C.text,
                opacity: 0.82,
                margin: "0 0 24px",
              }}
            >
              Opus is included with every Lyric voice licensing agreement.
              Pricing for licensing is custom-quoted based on tier, scope,
              and deployment context.
            </p>
            <Link href="/imprint/license" className="lv-link-cta">
              Inquire about licensing{" "}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 6 — Closing */}
      <section style={{ padding: "120px 24px" }}>
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <ScrollReveal>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(22px, 2.8vw, 30px)",
                fontWeight: 400,
                lineHeight: 1.4,
                color: C.olive,
                margin: 0,
              }}
            >
              Brands know what they want their voice to sound like. They
              know how it should feel to their customers. What most brands
              lack is the expertise to translate that creative vision
              into the technical parameters that make it real. Opus is
              where that translation happens.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}

function Eyebrow({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        margin: "0 0 22px",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: C.sage,
        }}
      />
      <span
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: C.olive,
        }}
      >
        {label}
      </span>
    </div>
  )
}

function StoryboardTile({
  src,
  aria,
  caption,
}: {
  src: string
  aria: string
  caption: string
}) {
  return (
    <figure className="lv-opus-storyboard-tile">
      <div className="lv-opus-storyboard-frame">
        <video
          src={src}
          aria-label={aria}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
      <figcaption className="lv-opus-storyboard-caption">{caption}</figcaption>
    </figure>
  )
}

function ToolSection({
  eyebrow,
  headline,
  body,
  useCases,
  howItWorks,
}: {
  eyebrow: string
  headline: React.ReactNode
  body: string
  useCases: string[]
  howItWorks?: string[]
}) {
  return (
    <section
      style={{
        padding: "96px 24px",
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <ScrollReveal>
          <Eyebrow label={eyebrow} />
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4.6vw, 52px)",
              fontWeight: 500,
              lineHeight: 1.04,
              color: C.olive,
              margin: "0 0 24px",
              maxWidth: "720px",
            }}
          >
            {headline}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={220}>
          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.7,
              color: C.text,
              opacity: 0.82,
              margin: "0 0 48px",
              maxWidth: "720px",
            }}
          >
            {body}
          </p>
        </ScrollReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: howItWorks
              ? "repeat(auto-fit, minmax(280px, 1fr))"
              : "1fr",
            gap: "48px",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: C.gold,
                margin: "0 0 16px",
              }}
            >
              Use cases
            </p>
            <ul style={{ margin: 0, padding: "0 0 0 20px" }}>
              {useCases.map((u, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: C.text,
                    opacity: 0.82,
                    marginBottom: "10px",
                  }}
                >
                  {u}
                </li>
              ))}
            </ul>
          </div>

          {howItWorks && (
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: C.gold,
                  margin: "0 0 16px",
                }}
              >
                How it works
              </p>
              <ol style={{ margin: 0, padding: "0 0 0 20px" }}>
                {howItWorks.map((s, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.7,
                      color: C.text,
                      opacity: 0.82,
                      marginBottom: "10px",
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
