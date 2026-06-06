import type { Metadata } from "next"
import CaseStudyImage from "@/components/CaseStudyImage"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "Alexa+ Enterprise — AI Agent Vignettes",
  description:
    "A case study on writing and directing the narrative vignettes that help Alexa+ Enterprise partners imagine their brand as a living voice experience.",
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
// Vignette stills, served locally from public/case-studies/alexa-plus-vignettes/.
// The brand-campaign film is hotlinked (matches the hospitality hosting pattern).
const A = "/case-studies/alexa-plus-vignettes"
const ASSETS = {
  heroRoom: `${A}/hero-room.jpg`,
  filmCouch: `${A}/film-couch.png`,
  hospitalityPhones: `${A}/hospitality-phones.png`,
  cruiseSnorkel: `${A}/cruise-snorkel.png`,
  cruiseAllure: `${A}/cruise-allure.png`,
  echoReservation: `${A}/echo-reservation.png`,
  worldcupDirections: `${A}/worldcup-directions.png`,
  worldcupRoutes: `${A}/worldcup-routes.png`,
  worldcupUber: `${A}/worldcup-uber.png`,
  culturalGuide: `${A}/cultural-guide.webp`,
  inCar: `${A}/in-car.webp`,
  homeBreakfast: `${A}/home-breakfast.png`,
  homeCouch: `${A}/home-couch.png`,
  firetvMovies: `${A}/firetv-movies.png`,
  film: "https://pub-b4a7e083f0084e77858de3be500c7acd.r2.dev/lil_wayne_alexa_ad.mp4",
}

const credits = [
  { label: "Role", value: "Multimodal Intelligence Designer" },
  { label: "Industry", value: "Consumer GenAI" },
  { label: "Year", value: "2025" },
  { label: "Designer", value: "Michael Lang" },
]

const services = [
  "Concept",
  "Multimodal Design",
  "Creative Direction",
  "Art Direction",
  "Motion Design",
  "Rapid Prototyping",
]

export default function AlexaVignettesCaseStudy() {
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
          padding: 20px 8px 0 0;
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
                AI Agent Vignettes
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
              <em style={{ fontStyle: "italic", fontWeight: 400 }}>Vignettes</em>
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
              What a brand would feel like as a <br />
              living voice experience.
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
          HERO — the brand film
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "56px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <Media src={ASSETS.film} aspect="16 / 9" />
            <p className="cs-caption" style={{ textAlign: "center" }}>
              A brand as a living voice experience. Creatively directed with a
              video production partner.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MOVEMENT 1 — the narrative approach (lede + drop cap)
      ════════════════════════════════════════════════════════════════════ */}
      <Prose top="104px">
        <ScrollReveal>
          <p className="cs-lede">
            For Alexa+ Enterprise, I helped partners imagine what their brand
            would feel like as a living voice experience. I wrote the stories that
            brought these concepts to life.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <p>
            When our business development team began a conversation with a hotel
            group, travel platform, or tourism board, I crafted narrative
            vignettes that showed how guests would discover, explore, and be cared
            for through Alexa+, using both voice and touch. This included scripted
            voice interactions, prototypes, AI persona creation, and collaborating
            with video production agencies to creatively direct marketing videos
            for verticals like hospitality and telecommunications.
          </p>
        </ScrollReveal>
      </Prose>

      {/* ════════════════════════════════════════════════════════════════════
          HOSPITALITY — the guest journey, voice and touch
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "56px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <Media src={ASSETS.hospitalityPhones} aspect="16 / 9" />
            <p className="cs-caption" style={{ textAlign: "center" }}>
              A hospitality vignette. The guest journey, from welcome to
              recommendation, told one screen at a time.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ padding: "24px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <div className="cs-pair">
              <Media src={ASSETS.cruiseSnorkel} fill />
              <Media src={ASSETS.cruiseAllure} fill />
            </div>
            <p className="cs-caption" style={{ textAlign: "center" }}>
              A cruise stay imagined for a partner. The same agent, dressed in the
              brand it lives inside.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ padding: "24px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <Media src={ASSETS.echoReservation} aspect="16 / 9" />
            <p className="cs-caption" style={{ textAlign: "center" }}>
              On the Echo Show. A reservation, in the room, answered by voice or
              resolved by touch.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PULL QUOTE
      ════════════════════════════════════════════════════════════════════ */}
      <PullQuote>
        How guests would discover, explore, and be cared for.
      </PullQuote>

      {/* ════════════════════════════════════════════════════════════════════
          MOVEMENT 2 — global events and the cultural guide
      ════════════════════════════════════════════════════════════════════ */}
      <Prose top="0px">
        <ScrollReveal>
          <p>
            I have used this narrative approach to show how Alexa+ could support
            travelers during major global events or serve as a cultural guide that
            connected visitors to local food, tours, and experiences in a new city.
          </p>
        </ScrollReveal>
      </Prose>

      {/* ════════════════════════════════════════════════════════════════════
          SPREAD — a global event, the World Cup
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
                <Media src={ASSETS.worldcupDirections} aspect="16 / 9" />
                <p className="cs-caption">
                  Supporting travelers during a major global event. The agent
                  knows the match, then the way there.
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
                Support travelers during major global events, or serve as a
                cultural guide in a new city.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ padding: "24px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <div className="cs-pair">
              <Media src={ASSETS.worldcupRoutes} fill />
              <Media src={ASSETS.worldcupUber} fill />
            </div>
            <p className="cs-caption" style={{ textAlign: "center" }}>
              Getting there. The agent lays out real options, from transit to a
              ride at the door.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ padding: "24px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <Media src={ASSETS.culturalGuide} aspect="3 / 2" />
            <p className="cs-caption" style={{ textAlign: "center" }}>
              A cultural guide. Connecting a visitor to the food, tours, and
              experiences of a new city.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PULL QUOTE
      ════════════════════════════════════════════════════════════════════ */}
      <PullQuote>More human, more welcoming, and more memorable.</PullQuote>

      {/* ════════════════════════════════════════════════════════════════════
          MOVEMENT 3 — what the vignettes do
      ════════════════════════════════════════════════════════════════════ */}
      <Prose top="0px">
        <ScrollReveal>
          <p>
            These vignettes did not just present features. They helped partners
            see how Alexa+ could make their brand feel more human, more welcoming,
            and more memorable.
          </p>
        </ScrollReveal>
      </Prose>

      {/* ════════════════════════════════════════════════════════════════════
          BEYOND TRAVEL — telecommunications and the home
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "96px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <div className="cs-pair">
              <Media src={ASSETS.homeBreakfast} fill />
              <Media src={ASSETS.homeCouch} fill />
            </div>
            <p className="cs-caption" style={{ textAlign: "center" }}>
              The telecommunications vertical. The same approach, carried into the
              living room.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ padding: "24px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <Media src={ASSETS.firetvMovies} aspect="16 / 9" />
            <p className="cs-caption" style={{ textAlign: "center" }}>
              On the screen. The agent meets people where the day already takes
              them.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          BRAND REGISTER — the film, reprised
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "56px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <Media src={ASSETS.filmCouch} aspect="16 / 9" />
            <p className="cs-caption" style={{ textAlign: "center" }}>
              The brand at ease. A still from the film the vignettes were built to
              earn.
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
