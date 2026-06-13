/* Opus product page — the enterprise creative environment that comes
   with every Lyric voice license. Two tools: Composer (audio
   generation) and Direction (parameter configuration). Direction is
   exclusive to Lyric imprint voices, which is the strategic anchor.
   The page closes by routing brands to /imprint/license for inquiry. */

import type { Metadata } from "next"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import ScrollHighlightText from "@/components/ScrollHighlightText"
import TwoPathsForward from "@/components/TwoPathsForward"
import DirectionShowcase from "@/components/opus/DirectionShowcase"

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
          visualization. Direction gets its symmetrical dark moment in
          the next section (DirectionShowcase, same dark-olive ground). */}
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

      {/* Interlude — the translation quote, moved up to sit between the
          two product chapters. A cream breather that frames both tools
          and gives Composer (dark olive) and Direction (dark ink) clear
          separation and air. */}
      <section style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <ScrollHighlightText
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
          </ScrollHighlightText>
        </div>
      </section>

      {/* Section 3 — Direction. Consolidated dark chapter, now on the
          studio-ink ground (the product's own palette) to differentiate
          it from Composer's dark olive. Eyebrow + headline + body, the
          live session canvas as the visualization, three numbered steps
          doubling as captions, the deploys line, and the exclusivity
          coda that previously held its own section. */}
      <DirectionShowcase />

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

      {/* Section 7 — Two paths forward.
          The shared conversion bookend (components/TwoPathsForward.tsx):
          dark olive Final-CTA composition with two pill buttons,
          mirroring the home page's "voice-first era" close. Also used
          at the bottom of /imprint. */}
      <TwoPathsForward />
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
