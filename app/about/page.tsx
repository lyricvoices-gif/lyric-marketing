import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "About",
  description: "Lyric is a design-led AI company creating expressive voices performed by professional actors.",
}

const DARK   = "#2b2a25"
const LIGHT  = "#f5f3ef"
const TEXT1  = "#1a1a18"
const TEXT2  = "#4a4a45"
const TEXT3  = "#9c958f"
const BORDER = "#e5dfd5"

export default function AboutPage() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────
          HERO + BRAND STORY — single continuous light section
      ───────────────────────────────────────────────────────────────────── */}
      <section style={{ background: LIGHT, padding: "104px 48px 80px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>

          {/* Centered eyebrow + headline + intro */}
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: "72px" }}>
              <p style={{
                fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
                textTransform: "uppercase", color: TEXT3, marginBottom: "20px",
              }}>
                About
              </p>
              <h1 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 5vw, 68px)",
                fontWeight: 600,
                fontStyle: "normal",
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
                color: TEXT1,
                margin: "0 auto 28px",
                maxWidth: "760px",
              }}>
                Lyric started with a simple{" "}
                <em>frustration.</em>
              </h1>
              <p style={{
                fontSize: "17px", color: TEXT2, lineHeight: 1.7,
                maxWidth: "520px", margin: "0 auto",
              }}>
                AI voices were getting more realistic, but less considered. Everything sounded fine, yet nothing sounded intentional.<br />Lyric was created to change that. We&apos;re building voice systems that respect performance, emotion, and restraint, because how something is said still matters.
              </p>
            </div>
          </ScrollReveal>

          {/* 3-image row */}
          <ScrollReveal delay={80}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
              marginBottom: "80px",
            }}>
              {[
                { src: "/images/about_1.jpg", alt: "Brand photography" },
                { src: "/images/about_2.webp", alt: "Soft botanicals" },
                { src: "/images/about_3.webp", alt: "Studio session" },
              ].map((img, i) => (
                <ScrollReveal key={img.src} delay={i * 80}>
                  <div style={{ aspectRatio: "3/4", overflow: "hidden", borderRadius: "4px" }}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={360}
                      height={480}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>

          {/* Two-column prose */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
          }}>
            <ScrollReveal>
              <div>
                <p style={{ fontSize: "15px", color: TEXT2, lineHeight: 1.8, margin: "0 0 24px" }}>
                  We didn&apos;t start Lyric because we wanted to build another voice company.<br />We started it because we were frustrated by how voice was being treated in the industry. Reduced to output. Tuned for novelty. Optimized for speed, but disconnected from intent. Voices cloned from data, then dropped into products without context, responsibility, or care.
                </p>
                <p style={{ fontSize: "15px", color: TEXT2, lineHeight: 1.8, margin: "0 0 24px" }}>
                  It wasn&apos;t a technology problem. It was a design problem.
                </p>
                <p style={{ fontSize: "15px", color: TEXT2, lineHeight: 1.8, margin: "0 0 24px" }}>
                  Most voice tools today ask you to adapt to them. You test phrases in a composer. You adjust sliders. You listen, tweak, regenerate, repeat.<br />You try to imagine how a voice might sound inside your product, brand, or experience. And somehow, the burden of authorship ends up on you.
                </p>
                <p style={{ fontSize: "15px", color: TEXT2, lineHeight: 1.8, margin: 0 }}>
                  We believed there was another way.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <div>
                <p style={{ fontSize: "15px", color: TEXT2, lineHeight: 1.8, margin: "0 0 24px" }}>
                  Lyric is built around the idea that voices should be composed, not cloned. Designed with a point of view. Shaped for specific environments. Tuned for how they&apos;re meant to be used, not how fast they can be generated. Each Lyric Edition is crafted with intention. A voice that knows when to lead, when to soften, and when to stay out of the way.
                </p>
                <p style={{ fontSize: "15px", color: TEXT2, lineHeight: 1.8, margin: "0 0 24px" }}>
                  That&apos;s why we show our voices in their element. In motion. In context. In the moments they were designed for. Not as raw output, but as part of a living system. Because voice isn&apos;t something you test in isolation. It&apos;s something you experience.
                </p>
                <p style={{ fontSize: "15px", color: TEXT2, lineHeight: 1.8, margin: "0 0 48px" }}>
                  Lyric is for brands, creators, and teams who care about how they sound. Who believe voice is part of design, not an afterthought. If that&apos;s you, you&apos;re exactly where you&apos;re meant to be.
                </p>

                {/* Signature */}
                <div>
                  <p style={{
                    fontFamily: "var(--font-signature)",
                    fontSize: "30px",
                    color: TEXT1,
                    margin: "0 0 8px",
                    lineHeight: 1,
                  }}>
                    Michael Lang
                  </p>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: TEXT1, margin: "0 0 2px" }}>
                    Michael Lang
                  </p>
                  <p style={{ fontSize: "12px", color: TEXT3, margin: 0 }}>Founder</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          LOCATIONS — light, dotted map left / content + thumbnails right
      ───────────────────────────────────────────────────────────────────── */}
      <section style={{ background: LIGHT, borderTop: `1px solid ${BORDER}`, padding: "80px 48px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

            {/* Left: dotted map */}
            <ScrollReveal>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  src="/images/about_4.svg"
                  alt="Location map"
                  width={420}
                  height={420}
                  style={{ width: "100%", maxWidth: "340px", height: "auto", opacity: 0.5 }}
                />
              </div>
            </ScrollReveal>

            {/* Right: label + headline + subtext + photo cards */}
            <ScrollReveal delay={80}>
              <div>
                <p style={{
                  fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
                  textTransform: "uppercase", color: TEXT3, marginBottom: "16px",
                }}>
                  Our Locations
                </p>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 3.5vw, 48px)",
                  fontWeight: 600,
                  fontStyle: "normal",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  color: TEXT1,
                  margin: "0 0 16px",
                }}>
                  From SFO to the world.
                </h2>
                <p style={{
                  fontSize: "15px", color: TEXT2, lineHeight: 1.7,
                  margin: "0 0 40px", maxWidth: "380px",
                }}>
                  Lyric lives where voices matter most. In moments shaped by place,
                  pace, and intent.
                </p>

                {/* Photo thumbnails */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  {[
                    {
                      img: "/images/about_5.jpg",
                      city: "San Francisco",
                      label: "Lyric HQ",
                      address: "14 Hanbury Street\nSan Francisco, CA 94105",
                    },
                    {
                      img: "/images/about_6.jpg.webp",
                      city: "Atlanta",
                      label: "Lyric South",
                      address: "3017 Bolling Way\nAtlanta, GA 30305",
                    },
                  ].map((loc) => (
                    <div key={loc.city}>
                      <div style={{
                        aspectRatio: "4/3",
                        overflow: "hidden",
                        borderRadius: "6px",
                        marginBottom: "12px",
                        background: BORDER,
                      }}>
                        <Image
                          src={loc.img}
                          alt={loc.city}
                          width={260}
                          height={195}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <p style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        color: TEXT1,
                        margin: "0 0 2px",
                        letterSpacing: "-0.01em",
                      }}>
                        {loc.city}
                      </p>
                      <p style={{ fontSize: "12px", color: TEXT3, margin: "0 0 6px" }}>{loc.label}</p>
                      <p style={{
                        fontSize: "12px", color: TEXT2, lineHeight: 1.6,
                        margin: 0, whiteSpace: "pre-line",
                      }}>
                        {loc.address}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FULL CTA — matches home page pattern
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: DARK, padding: "72px 24px 48px", textAlign: "center" }}>
        <ScrollReveal>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 4vw, 58px)",
              fontWeight: 600,
              color: "#f5f3ef",
              margin: "0 auto 20px",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              maxWidth: "720px",
            }}
          >
            Ready to hear Lyric
            <br />
            in action?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <p style={{ fontSize: "16px", color: "rgba(245,243,239,0.5)", lineHeight: 1.5, maxWidth: "380px", margin: "0 auto 36px" }}>
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
                background: "#f5f3ef",
                color: DARK,
                letterSpacing: "-0.01em",
              }}
            >
              Try the composer
            </a>
            <Link
              href="/editions"
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
              Learn how Lyric works
            </Link>
          </div>
        </ScrollReveal>

        {/* Founder row */}
        <ScrollReveal delay={240}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
            <div style={{ display: "flex" }}>
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: `2px solid ${DARK}`,
                    marginLeft: n === 1 ? 0 : "-10px",
                    background: "#d4c9bc",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={`/images/founders_${n}.webp`}
                    alt=""
                    width={36}
                    height={36}
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
