import type { Metadata } from "next"
import CaseStudyImage from "@/components/CaseStudyImage"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "JBL Authentics",
  description:
    "A case study on onboarding two competing voice assistants onto a single speaker: the JBL Authentics multi-agent experience.",
}

// ── Base palette (ground, ink, contrast) ──────────────────────────────────────
// White ground, warm near-black ink. No Lyric brand tokens here by design — this
// page lives in its own register.
const WHITE = "#ffffff" // page ground
const INK = "#1a1714" // warm near-black text
const INK_DIM = "rgba(26, 23, 20, 0.56)" // captions, labels
const INK_FAINT = "rgba(26, 23, 20, 0.12)" // hairlines

// ── JBL accent ────────────────────────────────────────────────────────────────
// A considered, slightly burnt JBL orange. Used for typographic accents, pull
// quote rules, and editorial details only — never as a dominant fill.
const ORANGE = "#cf4d1c"

const credits = [
  { label: "Design", value: "Michael Lang" },
  { label: "Year", value: "2024" },
  { label: "Industry", value: "Consumer AI App" },
  { label: "Services", value: "Conversational AI, App Design, Rapid Prototyping" },
]

export default function JBLAuthenticsCaseStudy() {
  return (
    <article style={{ background: WHITE, minHeight: "100vh" }}>
      <style>{`
        .cs-prose p {
          font-family: var(--font-body);
          font-size: 18px;
          line-height: 1.75;
          color: ${INK};
          margin: 0;
        }
        .cs-prose em {
          font-style: italic;
          color: ${ORANGE};
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
          color: ${ORANGE};
        }
        p.cs-caption {
          font-family: var(--font-body);
          font-style: italic;
          font-size: 13px;
          line-height: 1.5;
          letter-spacing: 0.01em;
          color: ${INK_DIM};
          margin: 16px 0 0;
        }
        .cs-runhead {
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${INK_DIM};
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
        <span className="cs-runhead">Harman / JBL</span>
        <span className="cs-runhead">Case Study · 2024</span>
      </div>
      <div
        style={{
          maxWidth: "1100px",
          margin: "20px auto 0",
          padding: "0 24px",
        }}
      >
        <div style={{ height: "1px", background: INK_FAINT }} />
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
                  background: ORANGE,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: INK,
                }}
              >
                Multi-Agent Speaker
              </span>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(46px, 8vw, 104px)",
                fontWeight: 500,
                lineHeight: 0.98,
                letterSpacing: "-0.01em",
                color: INK,
                margin: "0 0 28px",
                maxWidth: "14ch",
              }}
            >
              JBL{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400 }}>Authentics</em>
            </h1>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(21px, 2.8vw, 30px)",
                fontWeight: 400,
                lineHeight: 1.32,
                color: INK_DIM,
                margin: "0 0 56px",
                maxWidth: "32ch",
              }}
            >
              Two competing voice assistants, <br />
              living on the same speaker.
            </p>
          </ScrollReveal>

          {/* Credits row, framed by hairlines */}
          <ScrollReveal>
            <div style={{ height: "1px", background: INK_FAINT }} />
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
                      color: INK_DIM,
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
                      color: INK,
                      margin: 0,
                    }}
                  >
                    {c.value}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ height: "1px", background: INK_FAINT }} />
          </ScrollReveal>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════════
          HERO — Authentics at home, wide
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "56px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <Frame
              src="https://framerusercontent.com/images/9Z8NFzo1XZRrwnRIFVAkikfQE.jpg"
              alt="The JBL Authentics speaker at home, in a record-lined living room."
            />
            <p className="cs-caption" style={{ textAlign: "center" }}>
              The Authentics speaker at home, two assistants listening at once.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MOVEMENT 1 — the brief (lede + drop cap)
      ════════════════════════════════════════════════════════════════════ */}
      <Prose top="104px">
        <ScrollReveal>
          <p className="cs-lede">
            How do you introduce customers to two competing voice assistants
            living on the same speaker?
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <p>
            For the JBL Authentics line, I collaborated with Harman/JBL and Google
            to design an onboarding flow that made{" "}
            <em>Alexa + Google Assistant</em> feel seamless, balanced, and easy to
            trust.
          </p>
        </ScrollReveal>
      </Prose>

      {/* ════════════════════════════════════════════════════════════════════
          SPREAD — onboarding screens, asymmetric two-column
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
                <Frame
                  src="https://framerusercontent.com/images/prVTB2DL8flXiYcd479aR7MBhY.png"
                  alt="Two onboarding screens: enabling services, then selecting a preferred voice assistant."
                />
                <p className="cs-caption">
                  Onboarding. Customers enable both assistants, then decide how
                  they want to listen.
                </p>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(22px, 2.4vw, 30px)",
                  fontWeight: 400,
                  lineHeight: 1.35,
                  color: INK,
                  margin: 0,
                }}
              >
                Seamless, balanced, and easy to trust.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PULL QUOTE
      ════════════════════════════════════════════════════════════════════ */}
      <PullQuote>True choice, without confusion.</PullQuote>

      {/* ════════════════════════════════════════════════════════════════════
          FULL-BLEED — launch film
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "12px 0 0" }}>
        <ScrollReveal>
          <Clip src="https://pub-b4a7e083f0084e77858de3be500c7acd.r2.dev/jbl_authentics_ad.mp4" aspect="16 / 9" />
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
            <p className="cs-caption" style={{ textAlign: "center" }}>
              The launch film for the Authentics line.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MOVEMENT 2 — the system
      ════════════════════════════════════════════════════════════════════ */}
      <Prose top="96px">
        <ScrollReveal>
          <p>
            From visual attention system states to multi-agent privacy rules, the
            experience gives customers <em>true choice without confusion</em>.
            Adoption reached 80% in the first month, and the product went on to
            win a CES Innovation Award in 2024.
          </p>
        </ScrollReveal>
      </Prose>

      {/* ════════════════════════════════════════════════════════════════════
          FULL-BLEED — Google Assistant in the living room
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "104px 0 0" }}>
        <ScrollReveal>
          <Frame
            src="https://framerusercontent.com/images/2XTlAmFRY2A6HrvWsPJsDaC0.png"
            alt="The Authentics speaker answering a Google Assistant request in a living room."
            bleed
          />
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
            <p className="cs-caption" style={{ textAlign: "center" }}>
              Google Assistant, answering in the living room.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SPREAD — per-assistant settings
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "104px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <div
              className="cs-spread"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.45fr",
                gap: "48px",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(22px, 2.4vw, 30px)",
                  fontWeight: 400,
                  lineHeight: 1.35,
                  color: INK,
                  margin: 0,
                }}
              >
                From visual attention system states to multi-agent privacy rules.
              </p>
              <div>
                <Frame
                  src="https://framerusercontent.com/images/pvK37jNwNFsVsc3JtayIpgLYi9w.png"
                  alt="Per-assistant settings and music playback screens in the JBL companion app."
                />
                <p className="cs-caption">
                  Each assistant keeps its own settings and playback, legible and
                  separate.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          IN CONTEXT — the speaker in the home, two scenes
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
                  color: ORANGE,
                  margin: "0 0 24px",
                }}
              >
                In Context
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(24px, 3vw, 38px)",
                  fontWeight: 400,
                  lineHeight: 1.3,
                  color: INK,
                  margin: 0,
                }}
              >
                One speaker, either assistant, on request. The choice belongs to
                the room it sits in.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            <ScrollReveal>
              <figure style={{ margin: 0 }}>
                <Frame
                  src="https://framerusercontent.com/images/ypmd0ae1oaFSrMtXnX9nQSWKM4.jpeg"
                  alt="Asking Alexa to add an item to a shopping list, in the kitchen."
                />
                <p className="cs-caption" style={{ textAlign: "center" }}>
                  Alexa, in the kitchen.
                </p>
              </figure>
            </ScrollReveal>
            <ScrollReveal>
              <figure style={{ margin: 0 }}>
                <Frame
                  src="https://framerusercontent.com/images/vTmGQXP3mEoGVebaxxtwtKaFfEw.jpeg"
                  alt="Asking Google Assistant to turn on the lights, in the living room."
                />
                <p className="cs-caption" style={{ textAlign: "center" }}>
                  Google Assistant, in the living room.
                </p>
              </figure>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PULL QUOTE — outcome
      ════════════════════════════════════════════════════════════════════ */}
      <PullQuote>
        Adoption reached 80% in the first month, and the product won a CES
        Innovation Award in 2024.
      </PullQuote>

      {/* ════════════════════════════════════════════════════════════════════
          COLOPHON — quiet end mark
      ════════════════════════════════════════════════════════════════════ */}
      <footer style={{ padding: "96px 24px 120px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              background: ORANGE,
              margin: "0 auto 28px",
            }}
          />
          <p className="cs-runhead" style={{ margin: 0 }}>
            Michael Lang · Harman / JBL × Google · 2024
          </p>
        </div>
      </footer>
    </article>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function Clip({ src, aspect }: { src: string; aspect: string }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background: INK,
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

function Frame({ src, alt, bleed }: { src: string; alt: string; bleed?: boolean }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: bleed ? "1280px" : undefined,
        margin: bleed ? "0 auto" : undefined,
        overflow: "hidden",
        background: "#f3efe9",
      }}
    >
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
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <ScrollReveal>
          <div
            aria-hidden="true"
            style={{
              width: "44px",
              height: "2px",
              background: ORANGE,
              margin: "0 auto 36px",
            }}
          />
          <blockquote
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(30px, 4.4vw, 56px)",
              fontWeight: 500,
              lineHeight: 1.12,
              letterSpacing: "-0.005em",
              color: INK,
              margin: 0,
            }}
          >
            {children}
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  )
}
