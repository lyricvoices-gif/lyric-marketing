import Link from "next/link"
import type React from "react"
import HomeHero from "@/components/HomeHero"
import LogoCycler from "@/components/LogoCycler"
import MobileStickyCTA from "@/components/MobileStickyCTA"
import ScrollHighlightText from "@/components/ScrollHighlightText"
import ScrollReveal from "@/components/ScrollReveal"

/* Homepage — Lyric as a brand-governance layer for AI agents.

   Voice and TTS generation have commoditized; governing brand personality
   across an enterprise's agents has not. The page makes that argument in
   order: the drift problem, where Lyric sits (the control plane), how it
   works, and what it governs.

   The previous voice-artist-platform sections are preserved, not deleted:
     - the original hero / manifesto / audiences / final CTA copy lives in
       components/home-archive/HomeVoiceArtistSections.tsx
     - the Imprint / Score / Opus scrollytelling (ProductsSection), the
       artist index (ListenSection), and the editorial teaser (NotesSection)
       remain as their own component files, simply no longer imported here.
   Opus is kept live: it is the Direction product, and "See how it works"
   points to /opus. */

const DARK = "#2b2a25"

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
      <HomeHero />

      {/* The problem: brand voice drift. Per-line ScrollHighlightText lifts
          each line word-by-word as the reader scrolls past it — the same
          editorial pacing the manifesto used, now carrying the thesis. */}
      <section id="thesis" className="lv-philosophy">
        <ScrollReveal>
          <div className="lv-philosophy-eyebrow">
            <span className="lv-eyebrow-dot" aria-hidden="true" />
            <span>The problem</span>
          </div>
        </ScrollReveal>

        <div className="lv-philosophy-flow">
          <div className="lv-philosophy-movement">
            <ScrollHighlightText>Enterprises are deploying AI agents faster than they can govern them.</ScrollHighlightText>
            <ScrollHighlightText>A web assistant. A phone line. An in-app helper.</ScrollHighlightText>
            <ScrollHighlightText>Each one was built by a different team, on a different model, with a different voice.</ScrollHighlightText>
            <ScrollHighlightText>To the customer, they sound like <em>different companies</em>.</ScrollHighlightText>
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

      <LogoCycler />

      {/* The control plane + how it works. Olive chapter break (the hard
          cream→olive edge carries over from the old Products section). The
          centered header states where Lyric sits; the three blocks below
          give the mechanism. Reuses the audiences grid on the olive ground:
          the audience-block styles are cream-on-dark and read on olive. */}
      <section className="lv-products">
        <div className="lv-products-header">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>The control plane</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2 className="lv-products-headline">
              We direct the engines. We are not <em>one of them</em>.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p className="lv-products-supporting">
              Lyric sits above the language model and the speech engine. It does
              not generate text or audio. It codifies a brand&apos;s persona into
              a portable spec and holds every agent to it. We do not compete on
              inference quality. We are the layer that keeps the systems on
              brand.
            </p>
          </ScrollReveal>
        </div>

        <div className="lv-audiences-inner">
          <div className="lv-audiences-grid">
            <div className="lv-audience-block">
              <ScrollReveal>
                <span className="lv-audience-number">01</span>
                <p className="lv-audience-label" style={label}>
                  Codify
                </p>
                <h2>
                  Capture the <em>persona</em>.
                </h2>
                <p className="lv-audience-body">
                  Pronunciation of brand and industry terms, pacing, emotional
                  register, word choice, disclosure rules. One source of truth,
                  versioned, for how the brand should sound and speak.
                </p>
              </ScrollReveal>
            </div>

            <div className="lv-audience-block">
              <ScrollReveal delay={90}>
                <span className="lv-audience-number">02</span>
                <p className="lv-audience-label" style={label}>
                  Govern
                </p>
                <h2>
                  Hold every agent in <em>tolerance</em>.
                </h2>
                <p className="lv-audience-body">
                  Every agent runs against the spec. Output that drifts outside
                  brand tolerance is caught and corrected before a customer
                  hears it. The same standard, applied everywhere.
                </p>
              </ScrollReveal>
            </div>

            <div className="lv-audience-block">
              <ScrollReveal delay={180}>
                <span className="lv-audience-number">03</span>
                <p className="lv-audience-label" style={label}>
                  Port
                </p>
                <h2>
                  Stay <em>vendor agnostic</em>.
                </h2>
                <p className="lv-audience-body">
                  The spec is portable. Move from one speech provider to another
                  and the brand voice holds. ElevenLabs, Hume, Microsoft, and
                  whatever comes next.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* What Lyric governs — the two dimensions, sound and communication,
          made concrete as three control surfaces. Dark interlude. */}
      <section className="lv-audiences" style={{ background: DARK }}>
        <div className="lv-audiences-inner">
          <ScrollReveal>
            <div className="lv-audiences-header">
              <div className="lv-philosophy-eyebrow">
                <span className="lv-eyebrow-dot" aria-hidden="true" />
                <span>What it governs</span>
              </div>
              <h2 className="lv-audiences-headline">
                How it <em>sounds</em>. How it <em>communicates</em>.
              </h2>
              <p className="lv-audiences-subline">
                Two dimensions, held to the same brand spec across every agent
                and every engine.
              </p>
            </div>
          </ScrollReveal>

          <div className="lv-audiences-grid">
            <div className="lv-audience-block">
              <ScrollReveal>
                <span className="lv-audience-number">01</span>
                <p className="lv-audience-label" style={label}>
                  How it sounds
                </p>
                <h2>
                  Say the <em>words</em> right.
                </h2>
                <p className="lv-audience-body">
                  Brand names and industry terms, pronounced correctly every
                  time. The vocabulary that signals an agent knows the domain it
                  is speaking in.
                </p>
              </ScrollReveal>
            </div>

            <div className="lv-audience-block">
              <ScrollReveal delay={90}>
                <span className="lv-audience-number">02</span>
                <p className="lv-audience-label" style={label}>
                  How it sounds
                </p>
                <h2>
                  Hold the <em>register</em>.
                </h2>
                <p className="lv-audience-body">
                  Pacing, emphasis, and emotional range kept within a defined
                  band. Calm where it should be calm. Never flat, never
                  overplayed.
                </p>
              </ScrollReveal>
            </div>

            <div className="lv-audience-block">
              <ScrollReveal delay={180}>
                <span className="lv-audience-number">03</span>
                <p className="lv-audience-label" style={label}>
                  How it communicates
                </p>
                <h2>
                  Stay on <em>message</em>.
                </h2>
                <p className="lv-audience-body">
                  Word choice, tone, and the handling of disclosure. What an
                  agent says, and what it must not, kept inside brand and inside
                  policy.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="lv-final" style={{ background: DARK }}>
        <ScrollReveal>
          <div className="lv-philosophy-eyebrow lv-final-eyebrow">
            <span className="lv-eyebrow-dot" aria-hidden="true" />
            <span>The brand-governance layer for AI agents</span>
          </div>
          <h2>The engines are commoditized. The <em>brand</em> is not.</h2>
          <div className="lv-cta-row lv-cta-row-center">
            <CTA href="mailto:info@lyricvoices.ai?subject=Lyric%20access" variant="light">
              Request access
            </CTA>
            <CTA href="/opus" variant="outline">
              See how it works
            </CTA>
          </div>
        </ScrollReveal>
      </section>

      <MobileStickyCTA />
    </>
  )
}
