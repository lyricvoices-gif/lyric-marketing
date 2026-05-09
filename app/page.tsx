import Link from "next/link"
import type React from "react"
import HomeHero from "@/components/HomeHero"
import ListenSection from "@/components/ListenSection"
import LogoMarquee from "@/components/LogoMarquee"
import MobileStickyCTA from "@/components/MobileStickyCTA"
import NotesSection from "@/components/NotesSection"
import ProductsSection from "@/components/ProductsSection"
import ScrollHighlightText from "@/components/ScrollHighlightText"
import ScrollReveal from "@/components/ScrollReveal"

const DARK = "#2b2a25"
const LIGHT = "#f5f3ef"
const GOLD = "#c9a96e"
const TEXT1 = "#1a1a18"
const TEXT2 = "#4a4a45"
const TEXT3 = "#8b8378"
const BORDER = "#ded7ca"

const label = {
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0",
  textTransform: "uppercase" as const,
}

function CTA({
  href,
  children,
  variant = "dark",
}: {
  href: string
  children: React.ReactNode
  variant?: "dark" | "light" | "outline"
}) {
  const isMail = href.startsWith("mailto:")
  const isExternal = href.startsWith("http")
  /* Light-variant pills sit on dark grounds (Work With Us, final CTA).
     Filled with warm off-white and set in dark olive — the brand-palette
     equivalent of the prompt's olive-on-cream pill, inverted for dark
     backgrounds where olive-on-dark lands too low-contrast. */
  const style = {
    minHeight: "54px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 24px",
    borderRadius: "100px",
    fontSize: "15px",
    fontWeight: 500,
    letterSpacing: "0",
    background:
      variant === "light"
        ? "var(--bg-light)"
        : variant === "dark"
          ? "var(--olive)"
          : "transparent",
    color:
      variant === "light"
        ? "var(--olive)"
        : variant === "dark"
          ? "var(--bg-light)"
          : "inherit",
    border: variant === "outline" ? "1px solid currentColor" : "1px solid transparent",
    transition: "background 0.22s ease, color 0.22s ease, transform 0.22s ease",
  }

  const className = `lv-cta lv-cta-${variant}`

  if (isMail || isExternal) {
    return (
      <a
        href={href}
        className={className}
        style={style}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  )
}

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section id="manifesto" className="lv-philosophy">
        <ScrollReveal>
          <div className="lv-philosophy-eyebrow">
            <span className="lv-eyebrow-dot" aria-hidden="true" />
            <span>Manifesto</span>
          </div>
        </ScrollReveal>

        {/* Per-paragraph ScrollHighlightText: words start dim and lift to
            full opacity tied to scroll position — each line "highlights"
            word-by-word as the reader scrolls past it. Editorial pacing
            for the manifesto specifically; not used elsewhere on the page. */}
        <div className="lv-philosophy-flow">
          <div className="lv-philosophy-movement">
            <ScrollHighlightText>The voice layer of AI is being commoditized.</ScrollHighlightText>
            <ScrollHighlightText>Most platforms treat it as a feature, an afterthought, a string to ship under a button.</ScrollHighlightText>
            <ScrollHighlightText><em>We don&apos;t agree with that.</em></ScrollHighlightText>
          </div>

          <div className="lv-philosophy-movement">
            <ScrollHighlightText>Voice deserves craft. Voice deserves artistry.</ScrollHighlightText>
            <ScrollHighlightText>And voice artists deserve what music artists fought for in the streaming age.</ScrollHighlightText>
            <ScrollHighlightText>Attribution, rights, ongoing compensation in the systems they power.</ScrollHighlightText>
          </div>

          <div className="lv-philosophy-movement">
            <ScrollHighlightText>We&apos;re not just building voices. We&apos;re setting the standard for how voice AI should be implemented.</ScrollHighlightText>
            <ScrollHighlightText>How a brand uses voice AI shapes how the people who hear it perceive AI itself.</ScrollHighlightText>
          </div>

          <div className="lv-philosophy-movement">
            <ScrollHighlightText>Done badly, voice AI flattens, cheapens, and reinforces the rhetoric that AI is here to replace people.</ScrollHighlightText>
            <ScrollHighlightText>Done well, with human artistry at the center, AI elevates rather than replaces.</ScrollHighlightText>
            <ScrollHighlightText>That isn&apos;t a marketing position. It&apos;s a stance on <em>what AI should be</em>.</ScrollHighlightText>
          </div>
        </div>
      </section>

      <LogoMarquee />

      <ProductsSection />

      <ListenSection />

      <section className="lv-audiences" style={{ background: DARK }}>
        <div className="lv-audiences-inner">
          <ScrollReveal>
            <div className="lv-audiences-header">
              <div className="lv-philosophy-eyebrow">
                <span className="lv-eyebrow-dot" aria-hidden="true" />
                <span>Work with us</span>
              </div>
              <h2 className="lv-audiences-headline">
                Three ways to <em>partner</em>.
              </h2>
              <p className="lv-audiences-subline">
                For artists, brands, and researchers ready to build something
                with Lyric.
              </p>
            </div>
          </ScrollReveal>

          <div className="lv-audiences-grid">
            <div className="lv-audience-block">
              <ScrollReveal>
                <span className="lv-audience-number">01</span>
                <p className="lv-audience-label" style={label}>
                  For artists
                </p>
                <h2>
                  Your voice <em>belongs</em> to you.
                </h2>
                <p className="lv-audience-body">
                  Lyric brings real voice artists into the AI era as creative
                  partners on the imprint. You direct the performance, retain
                  your rights, and earn as your voice carries forward.
                </p>
                <CTA href="/for-artists" variant="light">
                  Apply to the Imprint
                </CTA>
              </ScrollReveal>
            </div>

            <div className="lv-audience-block">
              <ScrollReveal delay={90}>
                <span className="lv-audience-number">02</span>
                <p className="lv-audience-label" style={label}>
                  For brands
                </p>
                <h2>
                  License the <em>artist</em>. Not the <em>algorithm</em>.
                </h2>
                <p className="lv-audience-body">
                  Build sonic identity with voices from the imprint. Directed
                  by professional artists, documented consent, transparent
                  sourcing, and clear rights for deployment.
                </p>
                <CTA href="/for-brands" variant="light">
                  License from the Imprint
                </CTA>
              </ScrollReveal>
            </div>

            <div className="lv-audience-block">
              <ScrollReveal delay={180}>
                <span className="lv-audience-number">03</span>
                <p className="lv-audience-label" style={label}>
                  For researchers
                </p>
                <h2>
                  Performance-grade <em>voice datasets</em>.
                </h2>
                <p className="lv-audience-body">
                  SCOR is a dataset product built from real voice artist
                  sessions on the imprint. Anchor passages, directed emotional
                  range, full performance metadata. Every dataset is
                  defensibly sourced.
                </p>
                <CTA href="/score" variant="light">
                  Explore SCOR
                </CTA>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <NotesSection />

      <section className="lv-final" style={{ background: DARK }}>
        <ScrollReveal>
          <div className="lv-philosophy-eyebrow lv-final-eyebrow">
            <span className="lv-eyebrow-dot" aria-hidden="true" />
            <span>AI-era voice artistry</span>
          </div>
          <h2>The voice-first era is here. <em>Build it differently.</em></h2>
          <div className="lv-cta-row lv-cta-row-center">
            <CTA href="/for-brands" variant="light">
              License a voice
            </CTA>
            <CTA href="/for-artists" variant="outline">
              Partner with Lyric
            </CTA>
          </div>
        </ScrollReveal>
      </section>

      <MobileStickyCTA />
    </>
  )
}
