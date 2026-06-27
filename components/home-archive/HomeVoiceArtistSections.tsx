/* PRESERVED — original voice-artist homepage content.

   When the homepage was reframed around the brand-governance positioning
   (Lyric as a vendor-agnostic control plane for AI agents), the previous
   voice-artist-platform sections were moved here so they can be restored
   or repurposed later. Nothing here is imported by app/page.tsx anymore.

   What lives in THIS file (the sections that only ever existed inline in
   app/page.tsx, so they would have been lost in the rewrite):
     - OriginalHomeHero  — the "Voice artistry in the age of AI" hero
     - OriginalManifesto — the five-movement manifesto
     - OriginalAudiences — For artists / For brands / For researchers
     - OriginalFinalCTA  — the "voice-first era is here" closing CTA

   What is NOT copied here (still preserved as their own component files,
   simply no longer imported by the homepage — re-add the import to
   restore):
     - components/ProductsSection.tsx + components/products/*  (the
       Imprint / Score / Callio scrollytelling)
     - components/ListenSection.tsx   (the artist index)
     - components/NotesSection.tsx    (the editorial teaser)
     - components/MobileStickyCTA.tsx (still used, copy updated for the
       new positioning)

   This file is intentionally self-contained and compilable so any section
   can be dropped straight back into app/page.tsx. */

import Link from "next/link"
import type React from "react"
import ScrollHighlightText from "@/components/ScrollHighlightText"
import ScrollReveal from "@/components/ScrollReveal"
import SmoothAnchor from "@/components/SmoothAnchor"

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

export function OriginalHomeHero() {
  return (
    <section className="lv-hero">
      <img
        className="lv-hero-floret"
        src="/images/floret-home-hero.jpg"
        alt=""
        aria-hidden="true"
      />
      <div className="lv-hero-statement">
        <h1>
          Voice <em>artistry</em> in the age of AI.
        </h1>
        <p className="lv-hero-supporting">
          79% of brands say AI voices should come from real, attributed voice
          artists. We built Lyric that way from the start.
        </p>
        <SmoothAnchor targetId="manifesto" offset={64} className="lv-link-cta">
          Read the manifesto <span aria-hidden="true">&rarr;</span>
        </SmoothAnchor>
      </div>
    </section>
  )
}

export function OriginalManifesto() {
  return (
    <section id="manifesto" className="lv-philosophy">
      <ScrollReveal>
        <div className="lv-philosophy-eyebrow">
          <span className="lv-eyebrow-dot" aria-hidden="true" />
          <span>Manifesto</span>
        </div>
      </ScrollReveal>

      <div className="lv-philosophy-flow">
        <div className="lv-philosophy-movement">
          <ScrollHighlightText>The voice layer of AI is being commoditized.</ScrollHighlightText>
          <ScrollHighlightText>Most platforms treat it as a feature, an afterthought, a string to ship under a button.</ScrollHighlightText>
          <ScrollHighlightText><em>We don&apos;t agree with that. Neither do brands.</em></ScrollHighlightText>
          <ScrollHighlightText>Nearly 80% say AI voices should come from real, attributed voice artists. The market is already moving toward what we&apos;ve been building.</ScrollHighlightText>
        </div>

        <div className="lv-philosophy-movement">
          <ScrollHighlightText>Voice deserves craft. Voice deserves artistry.</ScrollHighlightText>
          <ScrollHighlightText>And voice artists deserve what music artists fought for in the streaming age.</ScrollHighlightText>
          <ScrollHighlightText>Attribution, rights, ongoing compensation in the systems they power.</ScrollHighlightText>
          <ScrollHighlightText>That&apos;s why Lyric is built on the <em>NAVA framework</em> of consent, control, and compensation.</ScrollHighlightText>
        </div>

        <div className="lv-philosophy-movement">
          <ScrollHighlightText>But ethics is the floor, not the ceiling.</ScrollHighlightText>
          <ScrollHighlightText>The real shift is from voice as utility to voice as <em>identity</em>.</ScrollHighlightText>
          <ScrollHighlightText>A casted voice is a transaction. A composed voice is a <em>brand</em>.</ScrollHighlightText>
          <ScrollHighlightText>We build voices as ongoing identities with their own creative lives, directed by real artists who shape how they perform and evolve.</ScrollHighlightText>
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
  )
}

export function OriginalAudiences() {
  return (
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
              <Link href="/for-artists" className="lv-link-cta">
                Apply to the Imprint{" "}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </ScrollReveal>
          </div>

          <div className="lv-audience-block">
            <ScrollReveal delay={90}>
              <span className="lv-audience-number">02</span>
              <p className="lv-audience-label" style={label}>
                For brands
              </p>
              <h2>
                License the <em>artist</em>.
                <br />
                Not the <em>algorithm</em>.
              </h2>
              <p className="lv-audience-body">
                Build sonic identity with voices from the imprint. Directed
                by professional artists, documented consent, transparent
                sourcing, and clear rights for deployment.
              </p>
              <Link href="/for-brands" className="lv-link-cta">
                License from the Imprint{" "}
                <span aria-hidden="true">&rarr;</span>
              </Link>
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
                Score is a dataset product built from real voice artist
                sessions on the imprint. Anchor passages, directed emotional
                range, full performance metadata. Every dataset is
                defensibly sourced.
              </p>
              <span className="lv-link-cta lv-link-cta-disabled" aria-disabled="true">
                Coming soon
              </span>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export function OriginalFinalCTA() {
  return (
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
  )
}
