import type { Metadata } from "next"
import Link from "next/link"
import AnchorLink from "@/components/AnchorLink"
import LogoCycler from "@/components/LogoCycler"
import ScrollReveal from "@/components/ScrollReveal"
import SpokenClock from "@/components/SpokenClock"

export const metadata: Metadata = {
  title: { absolute: "Michael Lang · Intelligence Designer" },
  description:
    "An index of work in voice, agents, and multimodal intelligence. Six studies for Amazon, JBL, Virgin Atlantic, and Lyric.",
}

// ── Type system ───────────────────────────────────────────────────────────────
// Neue Montreal carries the page: Bold oblique caps for headlines, Medium for
// titles and body emphasis, Light Italic for the quiet editorial moments. The
// metadata register (runheads, years, clients, the clock) pairs it with a
// system mono, in the production-house tradition.
const SANS = `"Neue Montreal", "Helvetica Neue", Helvetica, Arial, sans-serif`
const MONO = `ui-monospace, "SF Mono", SFMono-Regular, Menlo, monospace`

// ── Grounds ───────────────────────────────────────────────────────────────────
// Primarily dark, with the designer's paper as the editorial interlude.
const DARK = "#131210" // warm near-black, never pure black
const LIGHT = "#F5F3EF"
const LIGHT_DIM = "rgba(245, 243, 239, 0.6)"
const MEDIA_DARK = "#1D1C19"

// ── The six accents ───────────────────────────────────────────────────────────
// Each case study's own color. The swatches are the index of the practice.
const SAGE = "#C1C17E" // Lyric, the composer
const GOLD = "#8A7340" // Lyric, the vignettes and the Briefing
const ALEXA = "#00A8E1" // both Alexa+ studies
const VIRGIN = "#E10A0A" // Virgin Atlantic
const JBL = "#cf4d1c" // Harman / JBL

const ACCENTS = [SAGE, GOLD, ALEXA, ALEXA, VIRGIN, JBL]

// ── Hero film ─────────────────────────────────────────────────────────────────
// The Alexa+ launch campaign, from the hospitality study.
const HERO_FILM = "/case-studies/landing/pete-davidson-alexa-ad.mp4"

// ── Selected work — card grid: thumbnail, title, description, hover badge ────
// Badge ink flips dark or light per accent luminance so every chip stays legible.
function badgeInk(hex: string): string {
  const n = parseInt(hex.slice(1), 16)
  const lum =
    0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)
  return lum > 150 ? "#131210" : "#F5F3EF"
}

const selected = [
  {
    title: "Voice as a Compositional Medium",
    desc: "Cofounding a platform where the ethics and the product are the same argument.",
    badge: "Voice Platform",
    href: "/case-studies/lyric",
    accent: SAGE,
    src: "/case-studies/lyric/reel.mp4",
    kind: "video" as const,
  },
  {
    title: "The Vignettes and The Briefing",
    desc: "Building an editorial system around an AI voice platform.",
    badge: "Editorial",
    href: "/case-studies/vignettes",
    accent: GOLD,
    src: "/case-studies/vignettes/lets-vogue-loop.mp4",
    kind: "video" as const,
  },
  {
    title: "The Hospitality Agent",
    desc: "An Alexa+ agent that makes hotel and cruise stays feel personal.",
    badge: "Multimodal Agent",
    href: "/case-studies/alexa-plus-hospitality",
    accent: ALEXA,
    src: "/case-studies/alexa-plus-hospitality/welcome-hero.webp",
    kind: "image" as const,
  },
  {
    title: "The Vignettes",
    desc: "What a brand would feel like as a living voice experience.",
    badge: "Narrative Design",
    href: "/case-studies/alexa-plus-vignettes",
    accent: ALEXA,
    src: "/case-studies/alexa-plus-vignettes/hospitality-phones.png",
    kind: "image" as const,
  },
  {
    title: "Virgin Atlantic Concierge",
    desc: "A travel companion that feels warm, personal, and unmistakably theirs.",
    badge: "AI Concierge",
    href: "/case-studies/va-concierge-amelia",
    accent: VIRGIN,
    src: "/case-studies/va-concierge-amelia/hero-poster.webp",
    kind: "image" as const,
  },
  {
    title: "JBL Authentics",
    desc: "Two competing voice assistants, living on the same speaker.",
    badge: "Multi-Agent",
    href: "/case-studies/jbl-authentics",
    accent: JBL,
    src: "/case-studies/jbl-authentics/authentics-home.jpg",
    kind: "image" as const,
  },
]


export default function PortfolioIndexPage() {
  return (
    <article
      style={
        {
          background: DARK,
          minHeight: "100vh",
          "--pf-sans": SANS,
          "--pf-mono": MONO,
        } as React.CSSProperties
      }
    >
      <style>{`
        #work, #about {
          scroll-margin-top: 12px;
        }
        .pf-runhead {
          font-family: ${MONO};
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        /* ── Hero ── */
        .pf-hero-top {
          position: absolute;
          top: 28px;
          left: 32px;
          right: 32px;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        .pf-hero-band {
          position: absolute;
          left: 0;
          right: 0;
          top: 52%;
          z-index: 2;
          padding: 0 32px;
          display: grid;
          grid-template-columns: 1.3fr 0.45fr 0.45fr 1.5fr;
          gap: 24px;
          align-items: start;
        }
        .pf-hero-name {
          font-family: ${SANS};
          font-size: 23px;
          font-weight: 700;
          letter-spacing: 0.01em;
          color: ${LIGHT};
          margin: 0;
        }
        .pf-hero-link {
          font-family: ${MONO};
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${LIGHT_DIM};
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .pf-hero-link:hover {
          color: ${LIGHT};
        }
        .pf-hero-bio {
          font-family: ${SANS};
          font-size: 17px;
          font-weight: 500;
          line-height: 1.7;
          color: rgba(245, 243, 239, 0.94);
          margin: 0;
          max-width: 46ch;
        }
        .pf-hero-bio em {
          font-style: italic;
        }
        .pf-scrollcue {
          position: absolute;
          left: 50%;
          bottom: 26px;
          z-index: 2;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .pf-scrollcue-label {
          font-family: ${MONO};
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: ${LIGHT_DIM};
        }
        .pf-mouse {
          box-sizing: border-box;
          width: 24px;
          height: 38px;
          border: 1.5px solid rgba(245, 243, 239, 0.75);
          border-radius: 13px;
          display: flex;
          justify-content: center;
          padding-top: 7px;
          transition: border-color 0.25s ease;
        }
        .pf-scrollcue:hover .pf-mouse {
          border-color: ${LIGHT};
        }
        .pf-mouse-wheel {
          width: 3px;
          height: 7px;
          border-radius: 2px;
          background: ${LIGHT};
          animation: pf-wheel 2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }
        @keyframes pf-wheel {
          0% { transform: translateY(0); opacity: 1; }
          55% { transform: translateY(12px); opacity: 0; }
          70% { transform: translateY(0); opacity: 0; }
          85%, 100% { transform: translateY(0); opacity: 1; }
        }
        /* ── Section rhythm: long editorial approach into each chapter ── */
        .pf-sec-work {
          padding: 248px 24px 0;
        }
        .pf-sec-about {
          padding: 264px 24px 152px;
        }
        @media (max-width: 760px) {
          .pf-sec-work { padding-top: 150px; }
          .pf-sec-about { padding-top: 160px; }
        }
        /* ── Selected work wall ── */
        .sw-head {
          font-family: ${SANS};
          font-size: clamp(34px, 4.4vw, 60px);
          font-weight: 700;
          font-style: italic;
          line-height: 0.94;
          letter-spacing: -0.01em;
          color: ${LIGHT};
          margin: 0 0 56px;
        }
        .sw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px 24px;
        }
        .sw-card {
          display: block;
          text-decoration: none;
        }
        .sw-media-wrap {
          display: block;
          overflow: hidden;
          background: ${MEDIA_DARK};
        }
        .sw-media-wrap img,
        .sw-media-wrap video {
          display: block;
          width: 100%;
          aspect-ratio: 3 / 2;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sw-card:hover .sw-media-wrap img,
        .sw-card:hover .sw-media-wrap video {
          transform: scale(1.03);
        }
        .sw-card-title {
          display: block;
          font-family: ${SANS};
          font-size: 17px;
          font-weight: 500;
          line-height: 1.35;
          color: ${LIGHT};
          margin: 16px 0 0;
        }
        .sw-card-desc {
          display: block;
          font-family: ${SANS};
          font-size: 14.5px;
          font-weight: 400;
          line-height: 1.55;
          color: ${LIGHT_DIM};
          margin: 6px 0 0;
          max-width: 46ch;
        }
        .sw-badge {
          display: inline-block;
          margin-top: 14px;
          padding: 5px 11px;
          border-radius: 999px;
          background: var(--acc);
          color: var(--badge-ink);
          font-family: ${SANS};
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.01em;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .sw-card:hover .sw-badge,
        .sw-card:focus-visible .sw-badge {
          opacity: 1;
          transform: none;
        }
        /* ── About ── */
        .ab-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 64px;
          align-items: start;
        }
        .ab-head {
          font-family: ${SANS};
          font-size: clamp(34px, 4.4vw, 60px);
          font-weight: 700;
          font-style: italic;
          line-height: 0.98;
          letter-spacing: -0.01em;
          color: ${LIGHT};
          margin: 0;
          max-width: 12ch;
        }
        .ab-copy {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 46ch;
        }
        .ab-copy p {
          font-family: ${SANS};
          font-size: 15.5px;
          font-weight: 500;
          line-height: 1.7;
          color: rgba(245, 243, 239, 0.9);
          margin: 0;
        }
        /* ── Logo marquee inside About ── */
        #about .lv-logos {
          padding: 104px 0 0;
          background: transparent;
        }
        #about .lv-logos-row {
          padding: 0;
        }
        #about .lv-logos-credit {
          font-family: ${SANS};
          color: ${LIGHT_DIM};
        }
        #about .lv-logos-mark {
          filter: brightness(0) invert(0.8) sepia(0.04);
          opacity: 0.8;
        }
        /* ── Logo marquee inside About ── */
        #about .lv-logos {
          padding: 104px 0 0;
          background: transparent;
        }
        #about .lv-logos-row {
          padding: 0;
        }
        #about .lv-logos-credit {
          font-family: ${SANS};
          color: ${LIGHT_DIM};
        }
        #about .lv-logos-mark {
          filter: brightness(0) invert(0.8) sepia(0.04);
          opacity: 0.8;
        }
        #about .lv-cycler-slot {
          min-width: 0;
        }
        @media (max-width: 768px) {
          #about .lv-cycler {
            gap: 18px;
          }
        }
        /* ── Colophon ── */
        .pf-colophon {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 10px 12px;
        }
        .pf-colophon-mail {
          color: ${LIGHT_DIM};
          text-decoration: none;
          text-transform: none;
          transition: color 0.25s ease;
        }
        .pf-colophon-mail:hover {
          color: ${LIGHT};
        }
        .pf-soc {
          display: inline-flex;
          align-items: center;
          gap: 14px;
        }
        .pf-soc a {
          color: ${LIGHT_DIM};
          display: inline-flex;
          transition: color 0.25s ease;
        }
        .pf-soc a:hover {
          color: ${LIGHT};
        }
        .pf-soc svg {
          width: 15px;
          height: 15px;
          display: block;
          fill: currentColor;
        }
        .pf-dot-cycle {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin: 0 auto 28px;
          animation: pf-dot-cycle 15s ease-in-out infinite;
        }
        @keyframes pf-dot-cycle {
          0%, 14% { background: ${SAGE}; }
          20%, 34% { background: ${GOLD}; }
          40%, 54% { background: ${ALEXA}; }
          60%, 74% { background: ${VIRGIN}; }
          80%, 94% { background: ${JBL}; }
          100% { background: ${SAGE}; }
        }
        @media (max-width: 1100px) {
          .sw-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .ab-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 980px) {
          .pf-hero-band {
            top: auto;
            bottom: 120px;
            grid-template-columns: 1fr;
            gap: 18px;
          }
        }
        @media (max-width: 680px) {
          .sw-grid { grid-template-columns: 1fr; }
        }
        @media (hover: none) {
          .sw-badge {
            opacity: 1;
            transform: none;
          }
        }
        @media (max-width: 760px) {
          .pf-hero-loc,
          .pf-hero-right {
            display: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .pf-dot-cycle { animation: none; background: ${GOLD}; }
          .pf-mouse-wheel { animation: none; }
          .sw-card .sw-media-wrap img, .sw-card .sw-media-wrap video { transition: none; }
          .sw-card:hover .sw-media-wrap img, .sw-card:hover .sw-media-wrap video { transform: none; }
          .sw-badge { transition: none; }
        }
      `}</style>

      {/* ════════════════════════════════════════════════════════════════════
          HERO — the campaign film, the name, the practice
      ════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          height: "100svh",
          minHeight: "640px",
          overflow: "hidden",
          background: DARK,
        }}
      >
        <video
          src={HERO_FILM}
          playsInline
          muted
          autoPlay
          loop
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Legibility scrim */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(rgba(12, 12, 10, 0.3), rgba(12, 12, 10, 0.25) 55%, rgba(12, 12, 10, 0.62))",
          }}
        />

        {/* Top row: the six dots, the discipline, the years */}
        <div className="pf-hero-top">
          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span aria-hidden="true" style={{ display: "flex", gap: "6px" }}>
              {ACCENTS.map((c, i) => (
                <span
                  key={i}
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: c,
                  }}
                />
              ))}
            </span>
            <span className="pf-runhead pf-hero-loc" style={{ color: LIGHT }}>
              Based in Atlanta, GA
            </span>
          </span>
          <span className="pf-runhead pf-hero-right" style={{ color: LIGHT_DIM }}>
            Index of Work · 2024–2026
          </span>
        </div>

        {/* The band: name, sections, bio */}
        <div className="pf-hero-band">
          <div>
            <h1 className="pf-hero-name">Michael Lang</h1>
            <span
              className="pf-runhead"
              style={{ color: LIGHT_DIM, display: "block", marginTop: "10px" }}
            >
              Intelligence Designer
            </span>
          </div>
          <AnchorLink href="#work" className="pf-hero-link">
            Work
          </AnchorLink>
          <AnchorLink href="#about" className="pf-hero-link">
            About
          </AnchorLink>
          <p className="pf-hero-bio">
            Michael Lang is a Multimodal Intelligence Designer who creates at
            the intersection of AI, voice, and <em>human emotion</em>.
          </p>
        </div>

        {/* Scroll cue */}
        <AnchorLink className="pf-scrollcue" href="#work" ariaLabel="Scroll to selected work">
          <span className="pf-mouse" aria-hidden="true">
            <span className="pf-mouse-wheel" />
          </span>
          <span className="pf-scrollcue-label">Scroll</span>
        </AnchorLink>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SELECTED WORK — a wall of stills; the cursor is the light
      ════════════════════════════════════════════════════════════════════ */}
      <section id="work" className="pf-sec-work" style={{ background: DARK }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <ScrollReveal distance={44}>
            <h2 className="sw-head">Selected Work</h2>
          </ScrollReveal>
          <div className="sw-grid">
            {selected.map((s, i) => (
              <ScrollReveal key={s.href} delay={i * 80} distance={32}>
                <Link
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sw-card"
                  style={
                    {
                      "--acc": s.accent,
                      "--badge-ink": badgeInk(s.accent),
                    } as React.CSSProperties
                  }
                >
                  <span className="sw-media-wrap">
                    {s.kind === "video" ? (
                      <video
                        src={s.src}
                        playsInline
                        muted
                        autoPlay
                        loop
                        preload="metadata"
                      />
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={s.src} alt={s.title} loading="lazy" />
                    )}
                  </span>
                  <span className="sw-card-title">{s.title}</span>
                  <span className="sw-card-desc">{s.desc}</span>
                  <span className="sw-badge">{s.badge}</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ABOUT — humanizing AI experiences
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="about"
        className="pf-sec-about"
        style={{ background: DARK }}
      >
        <div className="ab-grid" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <ScrollReveal distance={44}>
            <h2 className="ab-head">Humanizing AI Experiences</h2>
          </ScrollReveal>
          <ScrollReveal delay={120} distance={44}>
            <div className="ab-copy">
              <p>
                I&apos;m Michael Lang, a Multimodal Intelligence Designer who
                brings human warmth to the world of GenAI. My work is all about
                designing multimodal experiences for Alexa+ Enterprise, blending
                product design, with storytelling and business vision.
              </p>
              <p>
                When a hotel group or travel brand wants to imagine their own
                Alexa+ powered experience, I create the story that makes it real.
                I write vignettes, design interactions, and direct creative
                videos that help partners see how Alexa+ can transform guest
                experiences. It&apos;s not just about the tech, it&apos;s about
                making every interaction feel human, memorable, and meaningful.
              </p>
            </div>
          </ScrollReveal>
        </div>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <ScrollReveal distance={36}>
            <LogoCycler credit="Shaping AI experiences for" />
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          COLOPHON — the six accents, one dot
      ════════════════════════════════════════════════════════════════════ */}
      <footer style={{ padding: "144px 24px 120px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <ScrollReveal distance={28}>
          <div className="pf-dot-cycle" aria-hidden="true" />
          <div className="pf-colophon">
            <span className="pf-runhead" style={{ color: LIGHT_DIM }}>
              Michael Lang
            </span>
            <span className="pf-runhead" style={{ color: LIGHT_DIM }} aria-hidden="true">
              ·
            </span>
            <a
              className="pf-runhead pf-colophon-mail"
              href="mailto:sirmikeybucks@gmail.com"
            >
              sirmikeybucks@gmail.com
            </a>
            <span className="pf-runhead" style={{ color: LIGHT_DIM }} aria-hidden="true">
              ·
            </span>
            <span className="pf-soc">
              <a
                href="https://linkedin.com/in/mikeybucks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/lyricvoices.ai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://thelyricbriefing.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Substack"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.539 24V10.812H1.46zM22.539 0H1.46v2.836h21.08V0z" />
                </svg>
              </a>
            </span>
            <span className="pf-runhead" style={{ color: LIGHT_DIM }} aria-hidden="true">
              ·
            </span>
            <span className="pf-runhead" style={{ color: LIGHT_DIM }}>
              MMXXVI
            </span>
          </div>
          </ScrollReveal>
        </div>
      </footer>

      <SpokenClock />
    </article>
  )
}
