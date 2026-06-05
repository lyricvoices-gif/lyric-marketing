import type { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "Lyric — Voice as a Compositional Medium",
  description:
    "A case study on cofounding Lyric: a voice platform where the ethical architecture and the product architecture are the same argument.",
}

// ── Daylight tokens (design.md §3.2 / §11.1) ───────────────────────────────────
const BG_LIGHT = "#FFF8EC" // warm off-white ground, the "cream"
const OLIVE = "#5A5E43" // primary text / headings on cream
const TEXT_1 = "#1C1A17" // body where olive is too soft
const TEXT_2 = "#6B6257" // secondary text
const OLIVE_DIM = "rgba(90, 94, 67, 0.62)" // captions, labels
const OLIVE_FAINT = "rgba(90, 94, 67, 0.16)" // hairlines
const SAGE = "#C1C17E" // primary accent
const GOLD = "#F3D171" // secondary accent, pull-quote warmth
const NEAR_BLACK = "#141410" // pull quotes (design.md: never pure black)

// ── Voice character palette (primary accent system) ────────────────────────────
// Mirrors the canonical gradientFrom values in lyric-composer/lib/voiceData.ts —
// that file is the single source of truth for voice color. The two apps are
// separate Next projects and cannot share a module at build time, so this is the
// single update point on the marketing side.
const VOICE_COLORS = [
  { name: "Morgan", role: "The Anchor", color: "#C4977F" },
  { name: "Nova", role: "The Intimist", color: "#A8B59A" },
  { name: "Atlas", role: "The Guide", color: "#9D9B92" },
  { name: "Riven", role: "The Narrator", color: "#9C8275" },
  { name: "Hex", role: "The Wildcard", color: "#B87A5C" },
]

// ── Assets ─────────────────────────────────────────────────────────────────────
// Composer captures, served locally from public/case-studies/lyric/.
const A = "/case-studies/lyric"
const ASSETS = {
  hero: `${A}/reel.mp4`,
  interface: `${A}/voice-selection.mp4`,
  interfaceStill: `${A}/voices.png`,
  variants: `${A}/generation.mp4`,
  intent: `${A}/script.mp4`,
  intentStill: `${A}/script-tags.png`,
}

const credits = [
  { label: "Words & Design", value: "Michael Lang" },
  { label: "Role", value: "Cofounder, Lead Intelligence Designer" },
  { label: "Year", value: "2026" },
  { label: "Client", value: "Lyric Voices" },
]

export default function LyricCaseStudy() {
  return (
    <article style={{ background: BG_LIGHT, minHeight: "100vh" }}>
      <style>{`
        .cs-prose p {
          font-family: var(--font-body);
          font-size: 18px;
          line-height: 1.75;
          color: ${TEXT_1};
          margin: 0;
        }
        .cs-prose em {
          font-style: italic;
          color: ${OLIVE};
        }
        /* Drop cap on the lede */
        .cs-lede {
          font-size: 23px !important;
          line-height: 1.6 !important;
        }
        .cs-lede::first-letter {
          font-family: var(--font-display);
          float: left;
          font-size: 155px;
          line-height: 0.66;
          font-weight: 500;
          margin: 5px 16px 0 6px;
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
        /* Contained video + image pairing, 50/50 */
        .cs-pair {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          align-items: stretch;
        }
        .cs-fill { height: 100%; }
        .cs-fill img, .cs-fill video {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media (max-width: 760px) {
          .cs-lede::first-letter { font-size: 64px; }
          .cs-spread { grid-template-columns: 1fr !important; }
          .cs-pair { grid-template-columns: 1fr; }
          .cs-fill { height: auto; }
          .cs-fill img, .cs-fill video { height: auto; aspect-ratio: 16 / 10; }
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
      <div style={{ maxWidth: "1100px", margin: "20px auto 0", padding: "0 24px" }}>
        <div style={{ height: "1px", background: OLIVE_FAINT }} />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          MASTHEAD — title, subtitle, credits
      ════════════════════════════════════════════════════════════════════ */}
      <header style={{ padding: "72px 24px 0" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <ScrollReveal>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "0 0 32px",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: SAGE,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: OLIVE,
                }}
              >
                The Composer
              </span>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(46px, 8vw, 104px)",
                fontWeight: 500,
                lineHeight: 0.98,
                letterSpacing: "-0.01em",
                color: OLIVE,
                margin: "0 0 28px",
                maxWidth: "15ch",
              }}
            >
              Voice as a{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400 }}>
                compositional
              </em>{" "}
              medium.
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
              Cofounding a platform where the ethics <br />
              and the product are the same argument.
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
          HERO — wide opening visual
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "56px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <Media src={ASSETS.hero} aspect="16 / 9" />
            <p className="cs-caption" style={{ textAlign: "center" }}>
              Inside the studio. Every voice on Lyric is performed by a real
              artist who shaped it.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MOVEMENT 1 — the commodification problem (lede + drop cap)
      ════════════════════════════════════════════════════════════════════ */}
      <Prose top="104px">
        <ScrollReveal>
          <p className="cs-lede">
            Voice AI had a commodification problem, and I watched it happen from
            the inside. Working as a lead intelligence designer in enterprise
            environments, I saw organizations reach for the same shelf of
            synthetic voices, uniform, unlicensed, artistically hollow, and call
            it a solution. The artists whose performances trained those models
            saw nothing. The teams deploying them had no meaningful way to shape
            what they were building. The tool and the ethics were both broken.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <p>
            That observation became Lyric. I cofounded the platform not as a
            technical exercise but as a response to a design failure: the
            absence of a system that treated voice as a compositional medium and
            artists as partners rather than source material. The foundation we
            built was intentional. Every voice on Lyric was performed by a real
            artist who shaped it, named it, and earns from every deployment. That
            ethical structure was not separate from the product. It was the
            product&apos;s premise.
          </p>
        </ScrollReveal>

        {/* Voice character palette — the primary accent system, as a motif */}
        <ScrollReveal>
          <div style={{ paddingTop: "8px" }}>
            <div
              style={{
                display: "flex",
                gap: "20px 36px",
                flexWrap: "wrap",
                alignItems: "baseline",
              }}
            >
              {VOICE_COLORS.map((v) => (
                <span
                  key={v.name}
                  style={{ display: "flex", alignItems: "baseline", gap: "10px" }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: v.color,
                      transform: "translateY(1px)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontSize: "18px",
                      color: OLIVE,
                    }}
                  >
                    {v.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9.5px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: OLIVE_DIM,
                    }}
                  >
                    {v.role}
                  </span>
                </span>
              ))}
            </div>
            <p className="cs-caption">
              Edition 01. Five artists, five owned models.
            </p>
          </div>
        </ScrollReveal>
      </Prose>

      {/* ════════════════════════════════════════════════════════════════════
          PULL QUOTE
      ════════════════════════════════════════════════════════════════════ */}
      <PullQuote>The tool and the ethics were both broken.</PullQuote>

      {/* ════════════════════════════════════════════════════════════════════
          FULL-BLEED — the composer interface
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "40px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <div className="cs-pair">
              <Media src={ASSETS.interface} fill />
              <Media src={ASSETS.interfaceStill} />
            </div>
            <p className="cs-caption" style={{ textAlign: "center" }}>
              The composer. Closer to working with a sound designer than filling
              a form field.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MOVEMENT 2 — the composer interface
      ════════════════════════════════════════════════════════════════════ */}
      <Prose top="96px">
        <ScrollReveal>
          <p>
            The composer followed from that premise. Each voice in the edition
            was built for a specific use case, not pulled from a catalog of
            thousands. Inside the composer, the user directs the voice the way a
            producer would in a studio session: shaping the read, adjusting the
            performance, refining until the output fits the work. The result is
            audio that sounds like it was made for the brand, because the
            direction came from the brand.
          </p>
        </ScrollReveal>
      </Prose>

      {/* ════════════════════════════════════════════════════════════════════
          SPREAD — asymmetric two-column, intent capture
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
                <Media src={ASSETS.variants} aspect="16 / 10" />
                <p className="cs-caption">
                  Generating variants. The user shapes and refines rather than
                  selecting from a shelf.
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
                The tool captures creative intent, then surfaces the right voice
                for the work.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MOVEMENT 3 — the same argument
      ════════════════════════════════════════════════════════════════════ */}
      <Prose top="104px">
        <ScrollReveal>
          <p>
            The ethics are not a layer on top of the product. They are the
            product. A real artist performed the voice. A real user directs it.
            That chain is what makes the output worth anything.
          </p>
        </ScrollReveal>
      </Prose>

      <PullQuote>Artists build the voices. Users compose with them.</PullQuote>

      {/* ════════════════════════════════════════════════════════════════════
          CLOSING VISUAL
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "40px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <div className="cs-pair">
              <Media src={ASSETS.intent} fill />
              <Media src={ASSETS.intentStill} />
            </div>
            <p className="cs-caption" style={{ textAlign: "center" }}>
              Capturing creative intent. The premise made operational.
            </p>
          </ScrollReveal>
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
              borderRadius: "50%",
              background: SAGE,
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

function Media({
  src,
  aspect,
  fill = false,
}: {
  src: string
  aspect?: string
  fill?: boolean
}) {
  const isVideo = /\.(mp4|mov|m4v|webm)(\?|$)/i.test(src)
  // In fill mode, sizing (height / aspect) is driven by the .cs-fill CSS so the
  // element can match its grid sibling's height and restack on mobile.
  const mediaStyle: React.CSSProperties = fill
    ? { display: "block", width: "100%" }
    : { display: "block", width: "100%", aspectRatio: aspect, objectFit: "cover" }
  const wrapStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    background: OLIVE,
  }
  if (isVideo) {
    return (
      <div className={fill ? "cs-fill" : undefined} style={wrapStyle}>
        <video src={src} playsInline muted autoPlay loop preload="auto" style={mediaStyle} />
      </div>
    )
  }
  return (
    <div className={fill ? "cs-fill" : undefined} style={wrapStyle}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" style={mediaStyle} />
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
