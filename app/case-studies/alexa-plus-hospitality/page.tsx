import type { Metadata } from "next"
import CaseStudyImage from "@/components/CaseStudyImage"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "Alexa+ Enterprise — The Hospitality Agent",
  description:
    "A case study on leading the design of the Alexa+ Enterprise Hospitality Agent: a multimodal GenAI experience that makes hotel and cruise stays feel personal.",
}

// ── Base palette ──────────────────────────────────────────────────────────────
// White ground. Amazon's product ink and restrained grays, not the retail palette.
const WHITE = "#FFFFFF" // ground
const INK = "#0F1111" // primary text (amazon.com body ink)
const SUB = "#565959" // secondary text
const INK_DIM = "rgba(15, 17, 17, 0.55)" // captions, labels
const INK_FAINT = "rgba(15, 17, 17, 0.12)" // hairlines
const MEDIA_BG = "#F2F3F3" // light gray behind device mockups

// ── Accent ────────────────────────────────────────────────────────────────────
// Alexa's light-ring cyan, used sparingly as a typographic / rule accent only.
const ALEXA = "#00A8E1"
const NEAR_BLACK = "#0F1111" // pull quotes

// ── Assets ────────────────────────────────────────────────────────────────────
// Device captures, served locally from public/case-studies/alexa-plus-hospitality/.
// Brand-campaign video is hotlinked (matches the vignettes hosting pattern).
const A = "/case-studies/alexa-plus-hospitality"
const ASSETS = {
  welcome: `${A}/welcome-hero.webp`,
  home: `${A}/home.webp`,
  homeAmbient: `${A}/home-ambient.webp`,
  excursions: `${A}/excursions.webp`,
  diningList: `${A}/dining-list.webp`,
  diningDetail: `${A}/dining-detail.webp`,
  checkout: `${A}/checkout.webp`,
  cards: `${A}/cards.webp`,
  campaign:
    "https://pub-b4a7e083f0084e77858de3be500c7acd.r2.dev/pete_davidson_alexa_ad.mp4",
}

const credits = [
  { label: "Role", value: "Lead Intelligence Designer" },
  { label: "Industry", value: "Consumer GenAI" },
  { label: "Year", value: "2025" },
  { label: "Designer", value: "Michael Lang" },
]

const services = [
  "Multimodal Design",
  "Conversational AI",
  "Exemplar Writing",
  "Visual Design",
  "Rapid Prototyping",
]

export default function AlexaHospitalityCaseStudy() {
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
          color: ${ALEXA};
        }
        /* Drop cap on the lede */
        .cs-lede {
          font-size: 23px !important;
          line-height: 1.6 !important;
        }
        .cs-lede::first-letter {
          font-family: var(--font-display);
          float: left;
          font-size: 124px;
          line-height: 0.66;
          font-weight: 500;
          padding: 20px 16px 0 0;
          color: ${INK};
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
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${INK_DIM};
        }
        /* Contained media pairing, 50/50 */
        .cs-pair {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
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
          .cs-fill img, .cs-fill video { height: auto; aspect-ratio: 16 / 9; }
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
        <span className="cs-runhead">Alexa+ Enterprise</span>
        <span className="cs-runhead">Case Study · 2025</span>
      </div>
      <div style={{ maxWidth: "1100px", margin: "20px auto 0", padding: "0 24px" }}>
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
                  background: ALEXA,
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
                Hospitality AI Agent
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
                maxWidth: "15ch",
              }}
            >
              The{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400 }}>Hospitality</em>{" "}
              Agent
            </h1>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(21px, 2.8vw, 30px)",
                fontWeight: 400,
                lineHeight: 1.32,
                color: SUB,
                margin: "0 0 56px",
                maxWidth: "32ch",
              }}
            >
              An Alexa+ agent that makes hotel and <br />
              cruise stays feel personal.
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
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      fontWeight: 400,
                      letterSpacing: "0.18em",
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
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                fontWeight: 400,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: INK_DIM,
                margin: "20px 0 0",
              }}
            >
              {services.join("  ·  ")}
            </p>
          </ScrollReveal>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════════
          HERO — the welcome moment
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "56px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <Media src={ASSETS.welcome} aspect="16 / 9" />
            <p className="cs-caption" style={{ textAlign: "center" }}>
              The welcome. The first thing a guest sees when they walk into the
              room.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MOVEMENT 1 — leading the design (lede + drop cap)
      ════════════════════════════════════════════════════════════════════ */}
      <Prose top="104px">
        <ScrollReveal>
          <p className="cs-lede">
            For Alexa+ Enterprise Hospitality Agent, I led the design of how
            GenAI could make hotel and cruise stays feel more personal and human.
            Partnering with science and engineering teams, I guided the agent from
            its earliest concepts into a working experience.
          </p>
        </ScrollReveal>
      </Prose>

      {/* ════════════════════════════════════════════════════════════════════
          THE WORKING EXPERIENCE — the home screen, two registers
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "56px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <div className="cs-pair">
              <Media src={ASSETS.home} fill />
              <Media src={ASSETS.homeAmbient} fill />
            </div>
            <p className="cs-caption" style={{ textAlign: "center" }}>
              The home screen. Itinerary, recommendations, and the day ahead, in
              one calm surface.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PULL QUOTE
      ════════════════════════════════════════════════════════════════════ */}
      <PullQuote>
        A stay that feels effortless and thoughtful from the moment they walk
        through the door.
      </PullQuote>

      {/* ════════════════════════════════════════════════════════════════════
          MOVEMENT 2 — guest scenarios that train the model
      ════════════════════════════════════════════════════════════════════ */}
      <Prose top="0px">
        <ScrollReveal>
          <p>
            I created guest scenarios that trained the LLM to understand customer
            intent, respond with warmth, and handle real moments, like booking a
            table, planning an excursion, or helping someone unwind at the end of
            a long day.
          </p>
        </ScrollReveal>
      </Prose>

      {/* ════════════════════════════════════════════════════════════════════
          SPREAD — planning an excursion
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "96px 24px 0" }}>
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
                <Media src={ASSETS.excursions} aspect="16 / 9" />
                <p className="cs-caption">
                  Planning an excursion. The agent reads intent, then lays out
                  real options.
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
                Like booking a table, planning an excursion, or helping someone
                unwind at the end of a long day.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          DINING — list + detail, then the checkout moment
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "56px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <div className="cs-pair">
              <Media src={ASSETS.diningList} fill />
              <Media src={ASSETS.diningDetail} fill />
            </div>
            <p className="cs-caption" style={{ textAlign: "center" }}>
              Booking a table. From the full restaurant list down to a single
              recommendation.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ padding: "24px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <Media src={ASSETS.checkout} aspect="16 / 9" />
            <p className="cs-caption" style={{ textAlign: "center" }}>
              Closing the loop. A clear total, charged to the room, confirmed in
              one turn.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <PullQuote>Understand customer intent, respond with warmth.</PullQuote>

      {/* ════════════════════════════════════════════════════════════════════
          MOVEMENT 3 — the multimodal experience and the story
      ════════════════════════════════════════════════════════════════════ */}
      <Prose top="0px">
        <ScrollReveal>
          <p>
            As the agent took shape, I designed the multimodal experiences that
            guided guests through each moment with both voice and touch. I then
            created story-led demonstrations that helped partners see what their
            brand feels like through Alexa+. These stories showed how an AI agent
            can welcome guests, remove small stresses, and create a stay that
            feels effortless and thoughtful from the moment they walk through the
            door.
          </p>
        </ScrollReveal>
      </Prose>

      {/* ════════════════════════════════════════════════════════════════════
          MULTIMODAL — the card system, voice and touch
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "56px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <Media src={ASSETS.cards} aspect="16 / 9" />
            <p className="cs-caption" style={{ textAlign: "center" }}>
              The card system. Each moment is built to be answered by voice or
              resolved by touch.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          BRAND REGISTER — the Alexa+ launch campaign, for context
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "56px 0 0" }}>
        <ScrollReveal>
          <Media src={ASSETS.campaign} aspect="16 / 9" />
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
            <p className="cs-caption" style={{ textAlign: "center" }}>
              The platform the agent lives inside. The Alexa+ launch campaign.
            </p>
          </div>
        </ScrollReveal>
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
              background: ALEXA,
              margin: "0 auto 28px",
            }}
          />
          <p className="cs-runhead" style={{ margin: 0 }}>
            Michael Lang · Alexa+ Enterprise · 2025
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
  const mediaStyle: React.CSSProperties = fill
    ? { display: "block", width: "100%" }
    : { display: "block", width: "100%", aspectRatio: aspect, objectFit: "cover" }
  const wrapStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    background: MEDIA_BG,
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
      <CaseStudyImage src={src} style={mediaStyle} />
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
