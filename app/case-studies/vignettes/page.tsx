import type { Metadata } from "next"
import CaseStudyImage from "@/components/CaseStudyImage"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "The Vignettes and The Briefing",
  description:
    "A case study on building an editorial system around a voice platform: the Lyric Voices vignettes and the daily Briefing.",
}

// ── Base palette (ground, body text, primary contrast) ────────────────────────
const LIGHT = "#f5f3ef" // warm off-white background
const OLIVE = "#2b2a25" // dark olive text
const OLIVE_DIM = "rgba(43, 42, 37, 0.58)" // captions, labels
const OLIVE_FAINT = "rgba(43, 42, 37, 0.16)" // hairlines

// ── Brand system accents ──────────────────────────────────────────────────────
const DEEP_GOLD = "#8A7340" // rules, inline emphasis
const NEAR_BLACK = "#141410" // pull quotes

// ── Voice character palettes ──────────────────────────────────────────────────
// Mirrors the canonical gradientFrom values in lyric-composer/lib/voiceData.ts —
// that file is the single source of truth for voice color. If the composer's
// palette changes, update these five constants to match. (The two apps are
// separate Next projects and cannot share a module at build time, so this is the
// single update point on the marketing side.)
const morganColor = "#C4977F"
const novaColor = "#A8B59A"
const atlasColor = "#9D9B92"
const hexColor = "#B87A5C"
const rivenColor = "#9C8275"

const credits = [
  { label: "Words & Design", value: "Michael Lang" },
  { label: "Role", value: "Founder, Designer, Creative Director" },
  { label: "Year", value: "2026" },
  { label: "Client", value: "Lyric Voices" },
]

export default function VignettesCaseStudy() {
  return (
    <article style={{ background: LIGHT, minHeight: "100vh" }}>
      <style>{`
        .cs-prose p {
          font-family: var(--font-body);
          font-size: 18px;
          line-height: 1.75;
          color: ${OLIVE};
          margin: 0;
        }
        .cs-prose em {
          font-style: italic;
          color: ${DEEP_GOLD};
        }
        /* Drop cap on the lede */
        .cs-lede {
          font-size: 23px !important;
          line-height: 1.6 !important;
        }
        .cs-lede::first-letter {
          font-family: var(--font-display);
          float: left;
          font-size: 88px;
          line-height: 0.78;
          font-weight: 500;
          padding: 6px 14px 0 0;
          color: ${OLIVE};
        }
        p.cs-caption {
          font-family: var(--font-body);
          font-style: italic;
          font-size: 13px;
          line-height: 1.5;
          letter-spacing: 0.01em;
          color: ${OLIVE_DIM};
          margin: 16px 0 0;
        }
        .cs-runhead {
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${OLIVE_DIM};
        }
        @media (max-width: 760px) {
          .cs-lede::first-letter { font-size: 64px; }
          .cs-spread { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ════════════════════════════════════════════════════════════════════
          RUNNING HEAD
      ════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "32px 24px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span className="cs-runhead">Lyric Voices</span>
        <span className="cs-runhead">Case Study · 2026</span>
      </div>
      <div
        style={{
          maxWidth: "1100px",
          margin: "20px auto 0",
          padding: "0 24px",
        }}
      >
        <div style={{ height: "1px", background: OLIVE_FAINT }} />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          MASTHEAD — title, subtitle, credits
      ════════════════════════════════════════════════════════════════════ */}
      <header style={{ padding: "72px 24px 0" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <ScrollReveal>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: DEEP_GOLD,
                margin: "0 0 32px",
              }}
            >
              Case Study — The Vignettes
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(46px, 8vw, 104px)",
                fontWeight: 500,
                lineHeight: 0.98,
                letterSpacing: "-0.01em",
                color: OLIVE,
                margin: "0 0 28px",
                maxWidth: "14ch",
              }}
            >
              The Vignettes and The{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400 }}>Briefing</em>
            </h1>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(21px, 2.8vw, 30px)",
                fontWeight: 400,
                lineHeight: 1.32,
                color: OLIVE_DIM,
                margin: "0 0 56px",
                maxWidth: "30ch",
              }}
            >
              Building an editorial system around an <br />
              AI voice platform.
            </p>
          </ScrollReveal>

          {/* Credits row, framed by hairlines */}
          <ScrollReveal>
            <div style={{ height: "1px", background: OLIVE_FAINT }} />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "40px 56px",
                padding: "24px 0",
              }}
            >
              {credits.map((c) => (
                <div key={c.label} style={{ minWidth: "0" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: OLIVE_DIM,
                      margin: "0 0 8px",
                    }}
                  >
                    {c.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "17px",
                      fontStyle: "italic",
                      lineHeight: 1.3,
                      color: OLIVE,
                      margin: 0,
                    }}
                  >
                    {c.value}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ height: "1px", background: OLIVE_FAINT }} />
          </ScrollReveal>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════════
          HERO — Open Road / Morgan, wide
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "56px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <Vignette
              src="https://pub-fd8ead8abe6a478f972065c3ba767dfa.r2.dev/F1_Lyric_ad%20(captions).MP4"
              aspect="16 / 9"
            />
            <p className="cs-caption" style={{ textAlign: "center" }}>
              Open Road. A vignette built around{" "}
              <Voice name="Morgan" color={morganColor} />.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MOVEMENT 1 — the editorial problem (lede + drop cap)
      ════════════════════════════════════════════════════════════════════ */}
      <Prose top="104px">
        <ScrollReveal>
          <p className="cs-lede">
            The composer answered a product question. The vignettes and the
            Briefing answered an editorial one.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <p>
            Once the platform existed and the artists were on it, a new problem
            emerged. The category had been trained to talk about itself in the
            language of capability.{" "}
            <em>
              Two million voices. Sub-second latency. Indistinguishable from real
              humans.
            </em>{" "}
            Every competitor was selling the same specifications in the same
            vocabulary, and the buyer was being asked to evaluate voice the way
            you evaluate compute. The category had a marketing failure to match
            its design failure. Voices were being described as features.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <p>
            I built the vignettes and the Briefing to refuse that frame, and to
            refuse it from two directions at once.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <p>
            The vignettes are short films built around individual voices on the
            platform. <Voice name="Morgan" color={morganColor} />,{" "}
            <Voice name="Nova" color={novaColor} />,{" "}
            <Voice name="Atlas" color={atlasColor} />,{" "}
            <Voice name="Hex" color={hexColor} />,{" "}
            <Voice name="Riven" color={rivenColor} />. Each one places a single
            voice in a context where it could plausibly belong.{" "}
            <em>Open Road</em> for Morgan as a Porsche film. <em>Between Points</em>{" "}
            for Nova as a tennis piece. The work is not a vehicle for the voice.
            The voice is a vehicle for the work. No on-screen explanation of how
            the platform functions, no mention of artists by name within the
            films, no competitive claims. The only branded element is the closing
            card, set in Cormorant Garamond, with the line{" "}
            <em>Composed, not cloned.</em> Everything before that point is the
            work. The argument arrives at the viewer through experience rather
            than persuasion.
          </p>
        </ScrollReveal>
      </Prose>

      {/* ════════════════════════════════════════════════════════════════════
          PULL QUOTE
      ════════════════════════════════════════════════════════════════════ */}
      <PullQuote>The voice is a vehicle for the work.</PullQuote>

      {/* ════════════════════════════════════════════════════════════════════
          FULL-BLEED — Nova / Yoga by the Sea
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "12px 0 0" }}>
        <ScrollReveal>
          <Vignette src="/Yoga by the Sea.mp4" aspect="21 / 9" />
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
            <p className="cs-caption" style={{ textAlign: "center" }}>
              Yoga by the Sea. A vignette built around{" "}
              <Voice name="Nova" color={novaColor} />.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MOVEMENT 2 — the two formats
      ════════════════════════════════════════════════════════════════════ */}
      <Prose top="96px">
        <ScrollReveal>
          <p>
            The Briefing is a daily AI news podcast narrated by Morgan, published
            every morning at six. It runs five days a week. It is not a demo. It
            is a real editorial product that has an audience, a release schedule,
            a Substack archive, and a Telegram distribution. Morgan has read it
            every morning for months. Listeners hear her voice before they hear
            most other voices in their day.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <Vignette
            src="https://pub-fd8ead8abe6a478f972065c3ba767dfa.r2.dev/Lyric%20Briefing%20-%20%22Two%20Sams%22.m4v"
            aspect="16 / 9"
          />
          <p className="cs-caption" style={{ textAlign: "center" }}>
            Two Sams. A vignette built around{" "}
            <Voice name="Morgan" color={morganColor} />.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <p>
            The two formats do different work and have to be understood together.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <p>
            The vignettes are evidence. They show what a voice can carry when
            it&apos;s been built with care, in a single short, on a single
            subject. They function as demonstration through scene. A viewer who
            sees a vignette walks away knowing what Morgan sounds like in context,
            not as a sample on a feature page but as a presence in a piece of
            work.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <p>
            The Briefing is endurance. It shows what a voice can carry when
            it&apos;s used every day, over months, across topics the writer
            couldn&apos;t have anticipated when the voice was recorded. The
            vignettes prove that a Lyric voice can hold a single scene. The
            Briefing proves it can hold a daily editorial product without
            fatiguing, without breaking, without becoming the wallpaper most
            synthetic voices become after a week. The two together make the case
            the category had stopped trying to make. That a voice can be both a
            performance and an instrument, and that the difference between those
            is whether someone built it on purpose with someone else.
          </p>
        </ScrollReveal>
      </Prose>

      {/* ════════════════════════════════════════════════════════════════════
          SPREAD — Riven / Let's Vogue, asymmetric two-column
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "104px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <div
              className="cs-spread"
              style={{
                display: "grid",
                gridTemplateColumns: "1.45fr 1fr",
                gap: "48px",
                alignItems: "center",
              }}
            >
              <div>
                <Vignette src="/vogue_vignette.mp4" aspect="16 / 10" />
                <p className="cs-caption">
                  Let&apos;s Vogue. A vignette built around{" "}
                  <Voice name="Riven" color={rivenColor} />.
                </p>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(22px, 2.4vw, 30px)",
                  fontWeight: 400,
                  lineHeight: 1.35,
                  color: OLIVE,
                  margin: 0,
                }}
              >
                Each film places one voice in a world it could plausibly belong
                to, and lets the performance do the arguing.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MOVEMENT 3 — the system, and the moat
      ════════════════════════════════════════════════════════════════════ */}
      <Prose top="104px">
        <ScrollReveal>
          <p>
            Both surfaces also do work the composer cannot do alone. The composer
            is a tool. Tools are evaluated. The vignettes are evidence, and
            evidence is felt. The Briefing is presence, and presence accumulates.
            A user who works in the composer and then hears Morgan narrate the
            news the next morning has the platform&apos;s premise confirmed in a
            register the composer itself cannot reach. The three surfaces,
            composer, vignettes, and Briefing, point at each other. A new viewer
            can enter through any one of them and find the others. They are not a
            marketing funnel. They are three faces of the same argument.
          </p>
        </ScrollReveal>
      </Prose>

      <PullQuote>The format itself is the moat.</PullQuote>

      {/* ════════════════════════════════════════════════════════════════════
          FULL-BLEED — Lyric ad, studio session
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "12px 0 0" }}>
        <ScrollReveal>
          <Vignette
            src="https://pub-fd8ead8abe6a478f972065c3ba767dfa.r2.dev/Lyric_ad%20(studio%20session).mp4"
            aspect="16 / 9"
          />
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
            <p className="cs-caption" style={{ textAlign: "center" }}>
              Studio session. The work behind the voices.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <Prose top="96px">
        <ScrollReveal>
          <p>
            The Briefing in particular is the surface that no competitor can
            replicate without rebuilding their entire model. A daily product
            narrated by a single named artist with an ongoing royalty
            relationship is structurally impossible on a platform with two
            million anonymous user-uploaded voices. Anyone who tries to copy it
            has to first do the work of treating a voice artist as a partner,
            which means they have to first stop being the kind of company they
            currently are.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <p>
            What made this work, in the end, was committing to the editorial
            position the platform was built on. Lyric is not a synthesis utility.
            It is a venue where voice artists and writers compose together. That
            premise is the whole argument, and the vignettes and the Briefing are
            how I made it audible.
          </p>
        </ScrollReveal>
      </Prose>

      {/* ════════════════════════════════════════════════════════════════════
          PROCESS — in the edit, Final Cut Pro
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "112px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ maxWidth: "760px", margin: "0 auto 64px", textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: DEEP_GOLD,
                  margin: "0 0 24px",
                }}
              >
                In the Edit
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(24px, 3vw, 38px)",
                  fontWeight: 400,
                  lineHeight: 1.3,
                  color: OLIVE,
                  margin: 0,
                }}
              >
                Every vignette and every episode of the Briefing is cut, graded,
                and finished by hand in Final Cut Pro. The craft is not
                outsourced. It is the argument.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            <ScrollReveal>
              <figure style={{ margin: 0 }}>
                <Frame
                  src="https://pub-fd8ead8abe6a478f972065c3ba767dfa.r2.dev/fc_1.png"
                  alt="A vignette being assembled on the Final Cut Pro timeline."
                />
                <p className="cs-caption" style={{ textAlign: "center" }}>
                  Cutting the F1 film in Final Cut Pro.
                </p>
              </figure>
            </ScrollReveal>
            <ScrollReveal>
              <figure style={{ margin: 0 }}>
                <Frame
                  src="https://pub-fd8ead8abe6a478f972065c3ba767dfa.r2.dev/fc_2.png"
                  alt="Color and titling work on the Hex Speaks timeline in Final Cut Pro."
                />
                <p className="cs-caption" style={{ textAlign: "center" }}>
                  Color and titling on <Voice name="Hex" color={hexColor} /> Speaks.
                </p>
              </figure>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          COLOPHON — quiet end mark
      ════════════════════════════════════════════════════════════════════ */}
      <footer style={{ padding: "96px 24px 120px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              background: DEEP_GOLD,
              margin: "0 auto 28px",
            }}
          />
          <p className="cs-runhead" style={{ margin: 0 }}>
            Michael Lang · Lyric Voices · 2026
          </p>
        </div>
      </footer>
    </article>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function Voice({ name, color }: { name: string; color: string }) {
  return <span style={{ color }}>{name}</span>
}

function Vignette({ src, aspect }: { src: string; aspect: string }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background: OLIVE,
      }}
    >
      <video
        src={src}
        playsInline
        muted
        autoPlay
        loop
        controls
        style={{
          display: "block",
          width: "100%",
          aspectRatio: aspect,
          objectFit: "cover",
        }}
      />
    </div>
  )
}

function Frame({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: "100%", overflow: "hidden", background: OLIVE }}>
      <CaseStudyImage
        src={src}
        alt={alt}
        style={{ display: "block", width: "100%", height: "auto" }}
      />
    </div>
  )
}

function Prose({ children, top }: { children: React.ReactNode; top: string }) {
  return (
    <section style={{ padding: `${top} 24px 0` }}>
      <div
        className="cs-prose"
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        {children}
      </div>
    </section>
  )
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <section style={{ padding: "88px 24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <ScrollReveal>
          <blockquote
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(30px, 4.4vw, 56px)",
              fontWeight: 500,
              lineHeight: 1.12,
              letterSpacing: "-0.005em",
              color: NEAR_BLACK,
              margin: 0,
              textAlign: "center",
            }}
          >
            {children}
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  )
}
