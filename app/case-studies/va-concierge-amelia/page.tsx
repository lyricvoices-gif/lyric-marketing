import type { Metadata } from "next"
import CaseStudyImage from "@/components/CaseStudyImage"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "Virgin Atlantic Concierge — AI Agent Amelia",
  description:
    "A case study on creating Amelia, Virgin Atlantic's AI travel concierge: persona, voice, dialog, and a multimodal interface across web, mobile, and at-home Alexa.",
}

// ── Base palette ──────────────────────────────────────────────────────────────
// White ground. Editorial ink and restrained warm grays, not a brand takeover.
const WHITE = "#FFFFFF" // ground
const INK = "#161310" // primary text (warm near-black, never pure black)
const SUB = "#5A554F" // secondary text
const INK_DIM = "rgba(22, 19, 16, 0.55)" // captions, labels
const INK_FAINT = "rgba(22, 19, 16, 0.12)" // hairlines
const MEDIA_BG = "#F4F2EF" // soft gray behind captures

// ── Accent ────────────────────────────────────────────────────────────────────
// Virgin Atlantic signature red. A considered accent only: dots, rules, inline
// emphasis. Never a dominant fill or background.
const RED = "#E10A0A"
const NEAR_BLACK = "#161310" // pull quotes

// ── Assets ────────────────────────────────────────────────────────────────────
// Captures served locally from public/case-studies/va-concierge-amelia/.
// Brand film is hotlinked (matches the existing case-study hosting pattern).
const A = "/case-studies/va-concierge-amelia"
const ASSETS = {
  heroPoster: `${A}/hero-poster.webp`,
  persona: `${A}/img-06.png`,
  webEscape: `${A}/img-02.png`,
  webPlanning: `${A}/img-03.png`,
  mobile: `${A}/img-05.png`,
  alexaMeal: `${A}/img-01.png`,
  journey: `${A}/img-07.png`,
  alexaBooking: `${A}/img-04.png`,
  alexaCocktails: `${A}/img-08.png`,
  film:
    "https://pub-b4a7e083f0084e77858de3be500c7acd.r2.dev/virgin_atlantic_see_the_world.mp4",
}

const credits = [
  { label: "Client", value: "Virgin Atlantic" },
  { label: "Industry", value: "Consumer GenAI" },
  { label: "Year", value: "2024" },
  { label: "Designer", value: "Michael Lang" },
]

const services = [
  "Multimodal Design",
  "Conversational AI",
  "Exemplar Writing",
  "Visual Design",
  "Rapid Prototyping",
]

export default function VAConciergeCaseStudy() {
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
          color: ${RED};
        }
        /* Drop cap on the lede */
        .cs-lede {
          font-size: 23px !important;
          line-height: 1.6 !important;
        }
        .cs-lede::first-letter {
          font-family: var(--font-display);
          float: left;
          font-size: 118px;
          line-height: 0.7;
          font-weight: 500;
          padding: 16px 8px 0 0;
          color: ${RED};
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
          /* When the spread stacks, the aside reads as a standalone statement.
             Match its top gap to the 96px breathing room below it so it sits
             symmetrically between the image and the next movement. */
          .cs-spread { grid-template-columns: 1fr !important; gap: 96px !important; }
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
        <span className="cs-runhead">Virgin Atlantic</span>
        <span className="cs-runhead">Case Study · 2024</span>
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
                  background: RED,
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
                AI Agent Amelia
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
                maxWidth: "13ch",
              }}
            >
              Virgin Atlantic{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400 }}>Concierge</em>
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
                maxWidth: "30ch",
              }}
            >
              A travel companion that feels warm, <br />
              personal, and unmistakably theirs.
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
          HERO — the brand film Amelia lives inside
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "56px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <Media src={ASSETS.film} poster={ASSETS.heroPoster} aspect="16 / 9" />
            <p className="cs-caption" style={{ textAlign: "center" }}>
              See the world. The Virgin Atlantic brand film, and the spirit Amelia
              was built to carry.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MOVEMENT 1 — creating the persona (lede + drop cap)
      ════════════════════════════════════════════════════════════════════ */}
      <Prose top="104px">
        <ScrollReveal>
          <p className="cs-lede">
            Virgin Atlantic wanted to create a travel companion that felt warm,
            personal, and unmistakably theirs, and I was brought in to help bring
            that vision to life. I created the airline&apos;s AI persona, later
            named Amelia, shaping her personality, voice, dialog flow, and
            multimodal interface across web, mobile, and at-home Alexa
            experiences.
          </p>
        </ScrollReveal>
      </Prose>

      {/* ════════════════════════════════════════════════════════════════════
          THE PERSONA — the bible that defined Amelia
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "56px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <Media src={ASSETS.persona} aspect="16 / 9" />
            <p className="cs-caption" style={{ textAlign: "center" }}>
              The persona. Character, tone of voice, personality traits, and the
              do&apos;s and don&apos;ts that gave Amelia a point of view.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PULL QUOTE
      ════════════════════════════════════════════════════════════════════ */}
      <PullQuote>
        A thoughtful guide who could inspire new trips, ease stressful moments,
        and carry the spirit of Virgin.
      </PullQuote>

      {/* ════════════════════════════════════════════════════════════════════
          MOVEMENT 2 — the guide
      ════════════════════════════════════════════════════════════════════ */}
      <Prose top="0px">
        <ScrollReveal>
          <p>
            My focus was to make her feel like a thoughtful guide who could
            inspire new trips, ease stressful moments, and carry the spirit of
            Virgin through every conversation.
          </p>
        </ScrollReveal>
      </Prose>

      {/* ════════════════════════════════════════════════════════════════════
          ON THE WEB — inspiration to a planned trip
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "56px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <div className="cs-pair">
              <Media src={ASSETS.webEscape} fill />
              <Media src={ASSETS.webPlanning} fill />
            </div>
            <p className="cs-caption" style={{ textAlign: "center" }}>
              On the web. From an open prompt, looking for an escape, to dates,
              fares, and a planned trip.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ON MOBILE — the concierge in the hand
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "56px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <Media src={ASSETS.mobile} aspect="16 / 9" />
            <p className="cs-caption" style={{ textAlign: "center" }}>
              On mobile. The same guide, in the hand, from a good morning to a
              last-minute flight.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SPREAD — at-home Alexa, the easing of a small moment
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
                <Media src={ASSETS.alexaMeal} aspect="4 / 3" />
                <p className="cs-caption">
                  At home on Alexa. Amelia opens the meal choice with a question,
                  not a form.
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
                Carry the spirit of Virgin through every conversation.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MOVEMENT 3 — defining how she speaks, and the story that sold it
      ════════════════════════════════════════════════════════════════════ */}
      <Prose top="96px">
        <ScrollReveal>
          <p>
            To help leaders truly understand the experience, I defined how Amelia
            should speak, act, and respond. This meant crafting the core scripts,
            example dialogs, emotional cues, and interaction patterns that
            established her character and guided the entire product team. I then
            designed expressive, high-fidelity interactions and worked with Virgin
            executives to shape cinematic storytelling that showed Amelia
            supporting travelers from inspiration to boarding. This work played a
            key role in securing Virgin Atlantic as a new partner for the Alexa
            Enterprise business.
          </p>
        </ScrollReveal>
      </Prose>

      {/* ════════════════════════════════════════════════════════════════════
          THE JOURNEY — interaction patterns across the trip
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "56px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <Media src={ASSETS.journey} aspect="16 / 9" />
            <p className="cs-caption" style={{ textAlign: "center" }}>
              The interaction patterns. One traveler archetype mapped from
              pre-flight to loyalty, across every surface.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          THE EXEMPLARS — high-fidelity at-home moments
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "56px 24px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <ScrollReveal>
            <div className="cs-pair">
              <Media src={ASSETS.alexaBooking} fill />
              <Media src={ASSETS.alexaCocktails} fill />
            </div>
            <p className="cs-caption" style={{ textAlign: "center" }}>
              The exemplars. Flex options offered plainly, a status perk offered
              warmly. Expressive interactions that show the brand, not just the
              flow.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PULL QUOTE
      ════════════════════════════════════════════════════════════════════ */}
      <PullQuote>From inspiration to boarding.</PullQuote>

      {/* ════════════════════════════════════════════════════════════════════
          COLOPHON — quiet end mark
      ════════════════════════════════════════════════════════════════════ */}
      <footer style={{ padding: "0 24px 120px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: RED,
              margin: "0 auto 28px",
            }}
          />
          <p className="cs-runhead" style={{ margin: 0 }}>
            Michael Lang · Virgin Atlantic · 2024
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
  poster,
}: {
  src: string
  aspect?: string
  fill?: boolean
  poster?: string
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
        <video
          src={src}
          poster={poster}
          playsInline
          muted
          autoPlay
          loop
          preload="auto"
          style={mediaStyle}
        />
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
