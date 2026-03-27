import type { Metadata } from "next"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Behind the voices, the craft, and the decisions that shape how Lyric sounds.",
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const LIGHT  = "#f5f3ef"
const GOLD   = "#c9a96e"
const TEXT1  = "#1a1a18"
const TEXT2  = "#4a4a45"
const TEXT3  = "#9c958f"
const BORDER = "#e5dfd5"

const display = { fontFamily: "var(--font-display)" } as const
const label = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: TEXT3,
}

// ─── Stories data ─────────────────────────────────────────────────────────────

const stories = [
  {
    slug: "the-artists-behind-the-voice",
    eyebrow: "Voice & Craft",
    title: "The artists behind the voice",
    description:
      "How Lyric works with professional actors to create voices that perform with intention, not just accuracy.",
    date: "March 2026",
    featured: true,
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StoriesIndex() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: LIGHT, padding: "104px 48px 64px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <ScrollReveal>
            <p style={{ ...label, marginBottom: "20px" }}>Stories</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h1
              style={{
                ...display,
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 600,
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: TEXT1,
                margin: "0 0 20px",
                maxWidth: "640px",
              }}
            >
              Behind the sound.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p
              style={{
                fontSize: "17px",
                color: TEXT2,
                lineHeight: 1.6,
                maxWidth: "480px",
                margin: 0,
              }}
            >
              The people, the process, and the point of view behind every Lyric
              voice.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stories grid */}
      <section
        style={{
          background: LIGHT,
          borderTop: `1px solid ${BORDER}`,
          padding: "64px 48px 96px",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          {stories.map((story, i) => (
            <ScrollReveal key={story.slug} delay={i * 80}>
              <Link
                href={`/stories/${story.slug}`}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <article
                  className="lyric-story-card"
                  style={{
                    padding: "40px 0",
                    borderBottom: `1px solid ${BORDER}`,
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "48px",
                    alignItems: "start",
                  }}
                >
                  <div>
                    <p
                      style={{
                        ...label,
                        color: GOLD,
                        marginBottom: "16px",
                      }}
                    >
                      {story.eyebrow}
                    </p>
                    <h2
                      style={{
                        ...display,
                        fontSize: "clamp(26px, 3vw, 38px)",
                        fontWeight: 600,
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                        color: TEXT1,
                        margin: "0 0 12px",
                      }}
                    >
                      {story.title}
                    </h2>
                    <p
                      style={{
                        fontSize: "15px",
                        color: TEXT2,
                        lineHeight: 1.6,
                        margin: 0,
                        maxWidth: "520px",
                      }}
                    >
                      {story.description}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "12px",
                      paddingTop: "4px",
                    }}
                  >
                    <span style={{ fontSize: "13px", color: TEXT3 }}>
                      {story.date}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        color: TEXT2,
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      Read story →
                    </span>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <style>{`
        .lyric-story-card {
          transition: opacity 0.2s ease;
        }
        .lyric-story-card:hover {
          opacity: 0.75;
        }
      `}</style>
    </>
  )
}
