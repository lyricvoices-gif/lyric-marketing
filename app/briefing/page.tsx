import type { Metadata } from "next"
import Image from "next/image"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "The Lyric Briefing",
  description: "Every morning, Morgan delivers a curated briefing on the state of AI. Signal, not noise.",
}

const DARK   = "#2b2a25"
const LIGHT  = "#f5f3ef"
const GOLD   = "#c9a96e"
const TEXT1  = "#1a1a18"
const TEXT2  = "#4a4a45"
const TEXT3  = "#9c958f"
const BORDER = "#e5dfd5"

const SUBSTACK_URL = "https://thelyricbriefing.substack.com"

const episodes = [
  {
    title: "Anthropic Sues the Pentagon, OpenAI Buys a Security Firm & AI Enters the War Room",
    date: "March 9, 2026",
    description: "The AI industry woke up this Monday morning with a sharp reminder that the gap between building powerful technology and controlling its destiny has never felt wider.",
    url: "https://thelyricbriefing.substack.com/p/ep-04-march-9-2026",
    image: "/images/floret-morgan.jpg",
  },
  {
    title: "Anthropic vs. the Pentagon, OpenAI's GPT-5.4 and the Race to IPO, Netflix Bets on AI Filmmaking",
    date: "March 6, 2026",
    description: "The AI industry's most consequential week continues. Anthropic's $200M Pentagon contract collapses and Dario Amodei goes to war with the DoD over its supply chain risk designation.",
    url: "https://thelyricbriefing.substack.com/p/ep-04-march-6-2026",
    image: "/images/floret-hex.jpg",
  },
  {
    title: "Anthropic Adds Voice to Claude Code, OpenAI Cuts the Sycophancy and a Dad Sues Google Over Gemini",
    date: "March 4, 2026",
    description: "The AI industry is generating its own weather systems. Anthropic quietly drops voice mode into Claude Code and changes how developers work forever.",
    url: "https://thelyricbriefing.substack.com/p/ep-01-march-4-2026",
    image: "/images/floret-nova.jpg",
  },
]

export default function BriefingPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          1 · HERO — dark, split editorial layout
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: DARK,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          overflow: "hidden",
        }}
      >
        {/* Left: text */}
        <div
          style={{
            padding: "120px 64px 120px 96px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <ScrollReveal>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: TEXT3,
                marginBottom: "28px",
              }}
            >
              ✦ Daily AI Briefing
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(38px, 5vw, 72px)",
                fontWeight: 600,
                fontStyle: "normal",
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
                color: LIGHT,
                margin: "0 0 28px",
              }}
            >
              Your morning,<br />
              finally{" "}
              <em style={{ fontStyle: "italic", color: GOLD }}>anchored.</em>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p
              style={{
                fontSize: "16px",
                color: "rgba(245,243,239,0.5)",
                lineHeight: 1.75,
                margin: "0 0 40px",
                maxWidth: "420px",
              }}
            >
              Every morning, Morgan delivers a curated briefing on the state of AI. Written for founders, designers, and builders who need signal, not noise.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "13px 28px",
                borderRadius: "100px",
                fontSize: "15px",
                fontWeight: 500,
                background: LIGHT,
                color: DARK,
                letterSpacing: "-0.01em",
                width: "fit-content",
              }}
            >
              Subscribe on Substack
            </a>
          </ScrollReveal>
        </div>

        {/* Right: editorial image */}
        <div style={{ position: "relative" }}>
          <Image
            src="/images/floret-hex.jpg"
            alt=""
            fill
            sizes="50vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* Blend gradient into dark background on left edge */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, #2b2a25 0%, rgba(43,42,37,0.25) 30%, transparent 60%)",
            }}
          />
          {/* Subtle dark tint to deepen the image */}
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(43,42,37,0.28)" }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2 · MORGAN AS HOST — light
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: LIGHT, padding: "104px 48px 96px" }}>
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "96px",
            alignItems: "center",
          }}
        >
          {/* Left: image */}
          <ScrollReveal>
            <div
              style={{
                position: "relative",
                aspectRatio: "4 / 5",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/floret-13.jpg"
                alt="The Lyric Briefing"
                fill
                sizes="50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </ScrollReveal>

          {/* Right: editorial text */}
          <ScrollReveal delay={80}>
            <div>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: TEXT3,
                  marginBottom: "20px",
                }}
              >
                Your Host
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 600,
                  fontStyle: "normal",
                  letterSpacing: "-0.02em",
                  lineHeight: 0.95,
                  color: TEXT1,
                  margin: "0 0 28px",
                }}
              >
                Morgan is{" "}
                <em style={{ fontStyle: "italic", color: GOLD }}>The Anchor.</em>
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  color: TEXT2,
                  lineHeight: 1.8,
                  margin: "0 0 36px",
                }}
              >
                Morgan doesn&apos;t just deliver the briefing. She carries it. Her voice is authoritative without being cold, warm without losing its edge. As The Anchor of Edition 01, she was built for moments that need to be believed. Every episode is written to be heard, not skimmed, and her delivery is the reason it lands the way it does.
              </p>

              {/* Pull quote */}
              <blockquote
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(18px, 2vw, 24px)",
                  fontStyle: "italic",
                  color: TEXT1,
                  lineHeight: 1.45,
                  margin: "0 0 36px",
                  paddingLeft: "20px",
                  borderLeft: `2px solid ${GOLD}`,
                }}
              >
                &ldquo;Good morning. Here&apos;s what moved in AI overnight, and why it matters to how you&apos;ll work by the end of this week.&rdquo;
              </blockquote>

              {/* Metadata row */}
              <div style={{ display: "flex", gap: "0", alignItems: "center" }}>
                {[
                  { label: "Format", value: "Audio + Text" },
                  { label: "Frequency", value: "Daily" },
                  { label: "Listen on", value: "Substack · Spotify · Apple" },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    style={{
                      borderLeft: i > 0 ? `1px solid ${BORDER}` : "none",
                      paddingLeft: i > 0 ? "24px" : 0,
                      paddingRight: "24px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: TEXT3,
                        margin: "0 0 4px",
                      }}
                    >
                      {item.label}
                    </p>
                    <p style={{ fontSize: "13px", color: TEXT1, margin: 0 }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3 · RECENT EPISODES — dark
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: DARK, padding: "96px 48px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>

          {/* Section label row */}
          <ScrollReveal>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: TEXT3, margin: 0 }}>
                Recent Episodes
              </p>
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "13px", color: TEXT3, letterSpacing: "-0.01em" }}
              >
                Browse all →
              </a>
            </div>
          </ScrollReveal>

          {/* Asymmetric episode grid */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px" }}>

            {/* Featured episode — left, full height */}
            <ScrollReveal>
              <a
                href={episodes[0].url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", textDecoration: "none", height: "100%" }}
              >
                <div
                  style={{
                    position: "relative",
                    borderRadius: "20px",
                    overflow: "hidden",
                    height: "100%",
                    minHeight: "560px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "40px",
                  }}
                >
                  <Image
                    src={episodes[0].image}
                    alt=""
                    fill
                    sizes="(max-width: 1120px) 67vw, 747px"
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(43,42,37,0.96) 0%, rgba(43,42,37,0.5) 45%, rgba(43,42,37,0.1) 100%)",
                    }}
                  />
                  <div style={{ position: "relative" }}>
                    <p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,243,239,0.4)", margin: "0 0 12px" }}>
                      {episodes[0].date}
                    </p>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(22px, 2.5vw, 32px)",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        lineHeight: 1.2,
                        color: LIGHT,
                        margin: "0 0 14px",
                        maxWidth: "520px",
                      }}
                    >
                      {episodes[0].title}
                    </h3>
                    <p style={{ fontSize: "14px", color: "rgba(245,243,239,0.5)", lineHeight: 1.6, margin: 0, maxWidth: "480px" }}>
                      {episodes[0].description}
                    </p>
                  </div>
                </div>
              </a>
            </ScrollReveal>

            {/* Two stacked smaller cards — right */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {episodes.slice(1).map((ep, i) => (
                <ScrollReveal key={ep.url} delay={(i + 1) * 80}>
                  <a
                    href={ep.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "block", textDecoration: "none" }}
                  >
                    <div
                      style={{
                        position: "relative",
                        borderRadius: "20px",
                        overflow: "hidden",
                        minHeight: "274px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        padding: "24px",
                      }}
                    >
                      <Image
                        src={ep.image}
                        alt=""
                        fill
                        sizes="(max-width: 1120px) 33vw, 373px"
                        style={{ objectFit: "cover" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to top, rgba(43,42,37,0.96) 0%, rgba(43,42,37,0.55) 50%, rgba(43,42,37,0.1) 100%)",
                        }}
                      />
                      <div style={{ position: "relative" }}>
                        <p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,243,239,0.4)", margin: "0 0 8px" }}>
                          {ep.date}
                        </p>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(15px, 1.4vw, 18px)",
                            fontWeight: 500,
                            letterSpacing: "-0.01em",
                            lineHeight: 1.25,
                            color: LIGHT,
                            margin: 0,
                          }}
                        >
                          {ep.title}
                        </h3>
                      </div>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4 · WHAT YOU GET — light, three columns
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: LIGHT, padding: "96px 48px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <ScrollReveal>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 600,
                fontStyle: "normal",
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
                color: TEXT1,
                margin: "0 0 64px",
                maxWidth: "480px",
              }}
            >
              A briefing worth making room for.
            </h2>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "48px" }}>
            {[
              {
                label: "Daily Signal",
                heading: "Curated AI news that actually matters.",
                copy: "Every episode is built around what moves, not what trends. Morgan selects the stories that will shape how you work, build, and make decisions. The noise stays out.",
              },
              {
                label: "Morgan's Voice",
                heading: "Heard, not read. Made for your morning.",
                copy: "The briefing is designed to fit the moments you already have. Your commute, your first coffee, the quiet before the day starts. It delivers in five minutes what most newsletters take twenty to cover.",
              },
              {
                label: "Built for Builders",
                heading: "For the people AI will affect most.",
                copy: "Founders, designers, and product teams are making consequential decisions about AI every week. The Lyric Briefing gives you the context to make those decisions from a position of clarity, not anxiety.",
              },
            ].map((col, i) => (
              <ScrollReveal key={col.label} delay={i * 80}>
                <div>
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: GOLD,
                      margin: "0 0 16px",
                    }}
                  >
                    {col.label}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(20px, 2vw, 26px)",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.2,
                      color: TEXT1,
                      margin: "0 0 16px",
                    }}
                  >
                    {col.heading}
                  </h3>
                  <p style={{ fontSize: "14px", color: TEXT2, lineHeight: 1.75, margin: 0 }}>
                    {col.copy}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5 · SUBSCRIBE CALLOUT — dark, full-bleed image
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          padding: "120px 24px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/floret-morgan.jpg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(43,42,37,0.84)",
          }}
        />

        <div style={{ position: "relative" }}>
          <ScrollReveal>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 5vw, 72px)",
                fontWeight: 600,
                fontStyle: "normal",
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
                color: LIGHT,
                margin: "0 auto 24px",
                maxWidth: "760px",
              }}
            >
              Every morning, one voice<br />
              you can actually{" "}
              <em style={{ fontStyle: "italic", color: GOLD }}>trust.</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p
              style={{
                fontSize: "16px",
                color: "rgba(245,243,239,0.45)",
                lineHeight: 1.6,
                margin: "0 auto 40px",
                maxWidth: "360px",
              }}
            >
              Free to subscribe. Delivered every morning.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <div style={{ marginBottom: "20px" }}>
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "14px 32px",
                  borderRadius: "100px",
                  fontSize: "15px",
                  fontWeight: 500,
                  background: LIGHT,
                  color: DARK,
                  letterSpacing: "-0.01em",
                }}
              >
                Subscribe on Substack
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p
              style={{
                fontSize: "12px",
                color: "rgba(245,243,239,0.22)",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              Narrated by Morgan · The Lyric Briefing · Published daily
            </p>
          </ScrollReveal>
        </div>
      </section>

    </>
  )
}
