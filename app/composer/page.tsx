import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import VoiceCarousel from "@/components/VoiceCarousel"
import VariantComparisons from "@/components/VariantComparisons"
import HowItWorksAnimations from "@/components/ComposerAnimations"

export const metadata: Metadata = {
  title: "Composer",
  description: "Give your voice a direction. Then write.",
}

const DARK   = "#2b2a25"
const LIGHT  = "#f5f3ef"
const GOLD   = "#c9a96e"
const TEXT1  = "#1a1a18"
const TEXT2  = "#4a4a45"
const TEXT3  = "#9c958f"
const BORDER = "#e5dfd5"

export default function ComposerPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          1 · HERO — pure editorial, dark
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: DARK, paddingTop: "104px", paddingBottom: "96px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 48px", textAlign: "center" }}>
          <ScrollReveal>
            <p style={{
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em",
              textTransform: "uppercase", color: TEXT3, marginBottom: "28px",
            }}>
              ✦ Composer
            </p>
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 5vw, 72px)",
              fontWeight: 600,
              fontStyle: "normal",
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
              color: LIGHT,
              margin: "0 auto 24px",
              maxWidth: "640px",
            }}>
              Before you write the line,<br />
              set the{" "}
              <em style={{ fontStyle: "italic", color: GOLD }}>direction.</em>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p style={{
              fontSize: "16px",
              color: "rgba(245,243,239,0.45)",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: "400px",
              marginLeft: "auto",
              marginRight: "auto",
            }}>
              Pick a voice. Choose an intent. Then write.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2 · DIRECTION — the differentiator
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: LIGHT, padding: "96px 48px 80px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>

          {/* Header */}
          <ScrollReveal>
            <div style={{ marginBottom: "56px" }}>
              <p style={{
                fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
                textTransform: "uppercase", color: TEXT3, marginBottom: "20px",
              }}>
                What makes Lyric different
              </p>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 600,
                fontStyle: "normal",
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
                color: TEXT1,
                margin: 0,
                maxWidth: "620px",
              }}>
                Output is not the same as{" "}
                <em style={{ fontStyle: "italic", color: GOLD }}>performance.</em>
              </h2>
            </div>
          </ScrollReveal>

          {/* Three-way audio comparison */}
          <ScrollReveal delay={80}>
            <VariantComparisons />
          </ScrollReveal>

          {/* Explanation */}
          <ScrollReveal delay={160}>
            <p style={{
              fontSize: "15px",
              color: TEXT2,
              lineHeight: 1.75,
              margin: "48px 0 0",
              maxWidth: "680px",
            }}>
              Each of Lyric&apos;s voices ships with three distinct tonal directions. The intent is set
              before you write, so the same line reads and sounds entirely different depending
              on how it&apos;s directed.
            </p>
          </ScrollReveal>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3 · FIVE VOICES — dark, animated single-voice carousel
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: DARK, padding: "0" }}>

        {/* Section header */}
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "80px 48px 0" }}>
          <ScrollReveal>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <div>
                <p style={{
                  fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
                  textTransform: "uppercase", color: TEXT3, marginBottom: "12px",
                }}>
                  Edition 01
                </p>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 600,
                  fontStyle: "normal",
                  letterSpacing: "-0.02em",
                  lineHeight: 0.95,
                  color: LIGHT,
                  margin: 0,
                }}>
                  Five voices.{" "}
                  <em style={{ fontStyle: "italic", color: "rgba(245,243,239,0.4)" }}>
                    Fifteen directions.
                  </em>
                </h2>
              </div>
              <Link
                href="/editions"
                style={{
                  fontSize: "13px",
                  color: TEXT3,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                View Editions →
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Animated carousel */}
        <VoiceCarousel />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4 · HOW DIRECTING WORKS — light, 3-step with animated UI glimpses
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: LIGHT, padding: "96px 48px 0" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>

          <ScrollReveal>
            <p style={{
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", color: TEXT3, marginBottom: "20px",
            }}>
              How it works
            </p>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 3.5vw, 46px)",
              fontWeight: 600,
              fontStyle: "normal",
              letterSpacing: "-0.02em",
              lineHeight: 1.0,
              color: TEXT1,
              margin: "0 0 64px",
              maxWidth: "540px",
            }}>
              Direction happens{" "}
              <em style={{ fontStyle: "italic", color: GOLD }}>before</em>
              <br />
              you write a single word.
            </h2>
          </ScrollReveal>

          <HowItWorksAnimations />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5 · WHO LYRIC IS BUILT FOR — light, continues from step 4
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: LIGHT, padding: "0 48px 96px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "64px" }}>
            <ScrollReveal>
              <p style={{
                fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
                textTransform: "uppercase", color: TEXT3, marginBottom: "48px",
              }}>
                Built for
              </p>
            </ScrollReveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "48px" }}>
              {[
                {
                  label: "Brands",
                  heading: "Sound is a brand decision, not a setting.",
                  copy: "The voice you choose is as intentional as your visual identity. Lyric gives your brand a consistent sonic character that can perform across every moment it appears in, from product to campaign to content.",
                },
                {
                  label: "Creators",
                  heading: "Give your work a presence, not just an output.",
                  copy: "When you control how a voice sounds, not just what it says, your work stops feeling generated. Lyric gives you the craft layer that separates direction from delivery.",
                },
                {
                  label: "Product Teams",
                  heading: "Voice is part of how your product works.",
                  copy: "Whether you're building in-product narration, onboarding flows, or async updates, Lyric gives your team voices with real performance range, not just text-to-speech.",
                },
              ].map((item, i) => (
                <ScrollReveal key={item.label} delay={i * 80}>
                  <div>
                    <p style={{
                      fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
                      textTransform: "uppercase", color: GOLD, margin: "0 0 16px",
                    }}>
                      {item.label}
                    </p>
                    <h3 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(20px, 2vw, 26px)",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.2,
                      color: TEXT1,
                      margin: "0 0 16px",
                    }}>
                      {item.heading}
                    </h3>
                    <p style={{ fontSize: "14px", color: TEXT2, lineHeight: 1.75, margin: 0 }}>
                      {item.copy}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          6 · PRE-FOOTER CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: DARK, padding: "72px 24px 48px", textAlign: "center" }}>
        <ScrollReveal>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 4vw, 58px)",
            fontWeight: 600,
            color: LIGHT,
            margin: "0 auto 20px",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            maxWidth: "720px",
          }}>
            Ready to hear Lyric
            <br />in action?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <p style={{
            fontSize: "16px", color: "rgba(245,243,239,0.5)",
            lineHeight: 1.5, maxWidth: "380px", margin: "0 auto 36px",
          }}>
            Try the composer and experience how Lyric voices perform in real moments.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "40px" }}>
            <a
              href="https://composer.lyricvoices.ai"
              style={{
                padding: "13px 26px",
                borderRadius: "100px",
                fontSize: "15px",
                fontWeight: 500,
                background: LIGHT,
                color: DARK,
                letterSpacing: "-0.01em",
              }}
            >
              Try the composer
            </a>
            <Link
              href="/pricing"
              style={{
                padding: "13px 26px",
                borderRadius: "100px",
                fontSize: "15px",
                fontWeight: 400,
                background: "rgba(245,243,239,0.07)",
                color: "rgba(245,243,239,0.6)",
                border: "1px solid rgba(245,243,239,0.12)",
                letterSpacing: "-0.01em",
              }}
            >
              View pricing
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={240}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
            <div style={{ display: "flex" }}>
              {[
                { src: "/images/brand_1.jpg", alt: "Brand photography" },
                { src: "/images/brand_2.jpg", alt: "FLORET botanicals" },
              ].map((img, i) => (
                <div
                  key={img.src}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: `2px solid ${DARK}`,
                    marginLeft: i === 0 ? 0 : "-12px",
                    background: "#d4c9bc",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={40}
                    height={40}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
            <p style={{ fontSize: "12px", color: "rgba(245,243,239,0.38)", margin: 0, letterSpacing: "0.01em" }}>
              ✦ Shaped by designers behind AI products at top brands.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
