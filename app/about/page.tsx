import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About",
  description: "Lyric is a design-led AI company creating expressive voices performed by professional actors.",
}

export default function AboutPage() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────
          HEADER — dark, tight
      ───────────────────────────────────────────────────────────────────── */}
      <section style={{ background: "#2a2622", padding: "100px 32px 80px" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#4a4540",
              marginBottom: "20px",
            }}
          >
            About
          </p>
          <h1
            style={{
              fontSize: "clamp(32px, 4.5vw, 60px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "#faf9f7",
              margin: "0 0 24px",
              lineHeight: 1.05,
              maxWidth: "720px",
            }}
          >
            Voice is a design problem.
            <br />
            <span style={{ color: "#B8955A" }}>We built the solution.</span>
          </h1>
          <p
            style={{
              fontSize: "17px",
              color: "#756d65",
              lineHeight: 1.65,
              maxWidth: "520px",
              margin: 0,
            }}
          >
            AI voices were getting more realistic, but less considered. Everything
            sounded fine, yet nothing sounded intentional. Lyric was created to
            change that.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          MANIFESTO — two-col light
      ───────────────────────────────────────────────────────────────────── */}
      <section style={{ background: "#faf9f7", padding: "100px 32px" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
            <div>
              <p
                style={{
                  fontSize: "15px",
                  color: "#4a4540",
                  lineHeight: 1.8,
                  margin: "0 0 24px",
                }}
              >
                We didn&apos;t start Lyric because we wanted to build another voice
                company. We started it because we were frustrated by how voice was
                being treated in the industry. Reduced to output. Tuned for novelty.
                Optimized for speed, but disconnected from intent.
              </p>
              <p
                style={{
                  fontSize: "15px",
                  color: "#4a4540",
                  lineHeight: 1.8,
                  margin: "0 0 24px",
                }}
              >
                Voices cloned from data, then dropped into products without context,
                responsibility, or care. It wasn&apos;t a technology problem. It was a
                design problem.
              </p>
              <p style={{ fontSize: "15px", color: "#4a4540", lineHeight: 1.8, margin: 0 }}>
                Most voice tools today ask you to adapt to them. You test phrases. You
                adjust sliders. You listen, tweak, regenerate, repeat. And somehow,
                the burden of authorship ends up on you. We believed there was another
                way.
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: "15px",
                  color: "#4a4540",
                  lineHeight: 1.8,
                  margin: "0 0 24px",
                }}
              >
                Lyric is built around the idea that voices should be composed, not
                cloned. Designed with a point of view. Shaped for specific environments.
                Built for how they&apos;re meant to be used, not how fast they can be
                generated.
              </p>
              <p
                style={{
                  fontSize: "15px",
                  color: "#4a4540",
                  lineHeight: 1.8,
                  margin: "0 0 24px",
                }}
              >
                Each Lyric Edition is crafted with intention. A voice that knows when
                to lead, when to soften, and when to stay out of the way.
              </p>
              <p style={{ fontSize: "15px", color: "#4a4540", lineHeight: 1.8, margin: "0 0 40px" }}>
                Lyric is for brands, creators, and teams who care about how they sound.
                Who believe voice is part of design, not an afterthought. If that&apos;s
                you, you&apos;re exactly where you&apos;re meant to be.
              </p>

              {/* Signature */}
              <div>
                <div style={{ marginBottom: "8px" }}>
                  <Image
                    src="/images/about_signature.webp"
                    alt="Michael Lang signature"
                    width={160}
                    height={60}
                    style={{ height: "44px", width: "auto", opacity: 0.7 }}
                  />
                </div>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#2a2622", margin: "0 0 2px" }}>
                  Michael Lang
                </p>
                <p style={{ fontSize: "12px", color: "#b5aca3", margin: 0 }}>Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          TEAM — composer-style grid
      ───────────────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#faf9f7",
          borderTop: "1px solid #eae4de",
          padding: "80px 32px",
        }}
      >
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "40px",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#b5aca3",
                margin: 0,
              }}
            >
              The team
            </p>
            <p style={{ fontSize: "13px", color: "#756d65", margin: 0 }}>
              Co-founded by AI designers from Amazon, Apple, and Google
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {[
              { img: "/images/founders_1.webp", name: "Michael Lang", role: "Founder & CEO" },
              { img: "/images/founders_2.webp", name: "Co-founder", role: "Design Lead" },
              { img: "/images/founders_3.webp", name: "Co-founder", role: "Engineering" },
              { img: "/images/founders_4.webp", name: "Co-founder", role: "Voice Direction" },
            ].map((p, i) => (
              <div
                key={i}
                style={{
                  background: "#ffffff",
                  border: "1px solid #eae4de",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    aspectRatio: "1",
                    overflow: "hidden",
                    background: "#eae4de",
                  }}
                >
                  <Image
                    src={p.img}
                    alt={p.name}
                    width={280}
                    height={280}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#2a2622",
                      margin: "0 0 2px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {p.name}
                  </p>
                  <p style={{ fontSize: "12px", color: "#b5aca3", margin: 0 }}>{p.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          LOCATIONS — dark
      ───────────────────────────────────────────────────────────────────── */}
      <section style={{ background: "#2a2622", padding: "80px 32px" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#4a4540",
              marginBottom: "32px",
            }}
          >
            Locations
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {[
              {
                city: "San Francisco",
                label: "Lyric HQ",
                address: "14 Hanbury Street\nSan Francisco, CA 94105",
                img: "/images/about_5.jpg",
              },
              {
                city: "Atlanta",
                label: "Lyric South",
                address: "3017 Bolling Way\nAtlanta, GA 30305",
                img: "/images/about_3.webp",
              },
            ].map((loc) => (
              <div
                key={loc.city}
                style={{
                  background: "rgba(234,228,222,0.04)",
                  border: "1px solid rgba(234,228,222,0.08)",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                  <Image
                    src={loc.img}
                    alt={loc.city}
                    width={540}
                    height={304}
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                  />
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#faf9f7",
                      margin: "0 0 2px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {loc.city}{" "}
                    <span style={{ fontWeight: 400, color: "#756d65" }}>· {loc.label}</span>
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#4a4540",
                      margin: 0,
                      whiteSpace: "pre-line",
                      lineHeight: 1.6,
                    }}
                  >
                    {loc.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          CTA
      ───────────────────────────────────────────────────────────────────── */}
      <section style={{ background: "#faf9f7", padding: "80px 32px 100px" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "40px 48px",
              background: "#2a2622",
              borderRadius: "16px",
              gap: "32px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#faf9f7",
                  margin: "0 0 6px",
                  letterSpacing: "-0.02em",
                }}
              >
                Hear what intentional voice sounds like.
              </p>
              <p style={{ fontSize: "14px", color: "#756d65", margin: 0 }}>
                All five voices are in the composer, ready to play.
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <a
                href="https://composer.lyricvoices.ai"
                style={{
                  padding: "11px 22px",
                  borderRadius: "100px",
                  fontSize: "13px",
                  fontWeight: 500,
                  background: "#faf9f7",
                  color: "#2a2622",
                  whiteSpace: "nowrap",
                }}
              >
                Open the composer
              </a>
              <Link
                href="/editions"
                style={{
                  padding: "11px 22px",
                  borderRadius: "100px",
                  fontSize: "13px",
                  fontWeight: 400,
                  background: "rgba(234,228,222,0.08)",
                  color: "#b5aca3",
                  border: "1px solid rgba(234,228,222,0.1)",
                  whiteSpace: "nowrap",
                }}
              >
                Browse editions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
