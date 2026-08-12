import Link from "next/link"
import type React from "react"
import HomeHero from "@/components/HomeHero"
import LogoCycler from "@/components/LogoCycler"
import MobileStickyCTA from "@/components/MobileStickyCTA"
import VerticalsSection from "@/components/VerticalsSection"
import ScrollHighlightText from "@/components/ScrollHighlightText"
import ScrollReveal from "@/components/ScrollReveal"
import AgentsScenario from "@/components/home/AgentsScenario"
import CallioProductStory from "@/components/home/CallioProductStory"

/* Homepage — Lyric as a brand-governance layer for AI agents.

   Voice and TTS generation have commoditized; governing brand personality
   across an enterprise's agents has not. The page makes that argument in
   order: the drift problem, where Lyric sits (the control plane), how it
   works, and what it governs.

   The previous voice-artist-platform sections are preserved, not deleted:
     - the original hero / manifesto / audiences / final CTA copy lives in
       components/home-archive/HomeVoiceArtistSections.tsx
     - the Imprint / Score / Callio scrollytelling (ProductsSection), the
       artist index (ListenSection), and the editorial teaser (NotesSection)
       remain as their own component files, simply no longer imported here.
   Callio is kept live: it is the Direction product, and "See how it works"
   points to /callio. */

const DARK = "#2b2a25"

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
  /* Light-variant pills sit on dark grounds (final CTA). Filled with warm
     off-white and set in dark olive — the brand-palette equivalent of an
     olive-on-cream pill, inverted for dark backgrounds where olive-on-dark
     lands too low-contrast. */
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
      {/* One continuous floret gradient spans the hero, the problem section,
          and the founders strip: the wrapper paints the gradient once and the
          sections sit transparent on top, so there are no per-section seams
          before the olive chapter break. */}
      <div className="lv-floret-ground">
        <HomeHero />

        {/* The problem: brand voice drift. Per-line ScrollHighlightText lifts
            each line word-by-word as the reader scrolls past it — the same
            editorial pacing the manifesto used, now carrying the thesis. */}
        <section id="thesis" className="lv-philosophy lv-on-floret">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>The problem</span>
            </div>
          </ScrollReveal>

          <div className="lv-philosophy-flow">
            <div className="lv-philosophy-movement">
              <ScrollHighlightText>Enterprises are deploying AI agents faster than they can govern them.</ScrollHighlightText>
              <ScrollHighlightText>They answer billing questions. They qualify new leads. They take the after-hours calls.</ScrollHighlightText>
              <ScrollHighlightText>But each one was built by a different team, on a different model, with a different voice.</ScrollHighlightText>
              <ScrollHighlightText>To customers, it feels like talking to <em>different companies</em>.</ScrollHighlightText>
            </div>

            <div className="lv-philosophy-movement">
              <ScrollHighlightText>Generating speech has become cheap and good.</ScrollHighlightText>
              <ScrollHighlightText>Any team can ship a fluent voice in an afternoon.</ScrollHighlightText>
              <ScrollHighlightText>What has not been solved is <em>consistency</em>.</ScrollHighlightText>
              <ScrollHighlightText>Brand voice drift is now the default state of an enterprise&apos;s agents.</ScrollHighlightText>
            </div>

            <div className="lv-philosophy-movement">
              <ScrollHighlightText>A brand is a promise about how it will behave.</ScrollHighlightText>
              <ScrollHighlightText>When every agent keeps that promise differently, the promise erodes.</ScrollHighlightText>
              <ScrollHighlightText>Governance is the part that did not get easier.</ScrollHighlightText>
              <ScrollHighlightText><em>So we built for it.</em></ScrollHighlightText>
            </div>
          </div>
        </section>

        <LogoCycler className="lv-on-floret" />
      </div>

      {/* A distinct product chapter: high-impact Callio introduction followed
          by four purpose-built feature interfaces. */}
      <CallioProductStory />

      {/* Governed agents are the product story made practical: an open,
          transcript-first demonstration of the standard holding in action. */}
      <section className="lv-agentstory-section">
        <div className="lv-agentstory-inner">
          <ScrollReveal>
            <div className="lv-agentstory-header">
              <div className="lv-philosophy-eyebrow">
                <span className="lv-eyebrow-dot" aria-hidden="true" />
                <span>Prebuilt agents</span>
              </div>
              <h2 className="lv-agentstory-headline">Our Governed Agent, Sol.</h2>
              <p className="lv-agentstory-supporting">
                Listen to our prebuilt agent Sol navigate a financial services dispute scenario.
              </p>
              <div
                className="lv-cxp-intro-points lv-agentstory-points"
                aria-label="Governance demonstrated by Sol"
              >
                <span>Warm &amp; assured</span>
                <span>Verify before access</span>
                <span>Disclosure first</span>
              </div>
            </div>
          </ScrollReveal>

          <AgentsScenario />
        </div>
      </section>

      {/* Homepage industry framing; shared section layout and cards stay intact. */}
      <VerticalsSection
        eyebrow="Industries"
        headline={
          <>
            Industry-ready Governance
            <br />
            for Every Agent
          </>
        }
        supporting="Callio tailors its governance for each industry. It isn’t a generic template. Each industry foundation outlines the necessary workflows, controls, and terminology. It results in both a prebuilt agent ready to deploy and a starting point for a custom build."
      />

      <section className="lv-final" style={{ background: DARK }}>
        <ScrollReveal>
          <div className="lv-philosophy-eyebrow lv-final-eyebrow">
            <span className="lv-eyebrow-dot" aria-hidden="true" />
            <span>The brand-governance layer for AI agents</span>
          </div>
          <h2>
            <span className="lv-final-line">The engines</span>
            <br />
            <span className="lv-final-line">are commoditized.</span>
            <br />
            <span className="lv-final-line">The <em>brand</em> is not.</span>
          </h2>
          <div className="lv-cta-row lv-cta-row-center">
            <CTA href="/start" variant="light">
              Build your AI comms spec
            </CTA>
            <CTA href="/contact" variant="outline">
              Book a call
            </CTA>
          </div>
        </ScrollReveal>
      </section>

      <MobileStickyCTA />
    </>
  )
}
