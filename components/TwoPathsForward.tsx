/* Two paths forward — the conversion bookend used at the bottom of
   the imprint and product pages. Same compositional move as the
   home page Final CTA: full-bleed dark ground (here, a darkened
   FLORET background standing in for the architectural reference),
   gold-dot eyebrow, large italic display headline, and two stacked
   PathLines (For artists / For brands) with their own
   destination CTAs.

   Reusable across /imprint and /opus so the page-end conversion
   moment reads identically to the home page Final CTA without us
   having to inline the markup twice. */

import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"

const C = {
  bg: "var(--bg-light)",
  olive: "var(--olive)",
  gold: "var(--gold)",
}

export default function TwoPathsForward() {
  return (
    <section className="lv-imprint-twopaths">
      <div className="lv-imprint-twopaths-bg" aria-hidden="true" />
      <div className="lv-imprint-twopaths-inner">
        <div className="lv-imprint-twopaths-content">
          <ScrollReveal>
            <DarkEyebrow label="Two paths forward" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2 className="lv-imprint-twopaths-headline">
              Pick the path that <em>fits</em>.
            </h2>
          </ScrollReveal>

          <div className="lv-imprint-twopaths-paths">
            <ScrollReveal delay={220}>
              <PathLine
                label="For artists"
                headline={
                  <>
                    Apply to the <em>Imprint</em>.
                  </>
                }
                ctaHref="/imprint/apply"
                ctaLabel="Apply now"
              />
            </ScrollReveal>
            <ScrollReveal delay={320}>
              <PathLine
                label="For brands"
                headline={
                  <>
                    License from the <em>Imprint</em>.
                  </>
                }
                ctaHref="/imprint/license"
                ctaLabel="Inquire about licensing"
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function DarkEyebrow({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        margin: "0 0 22px",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: C.gold,
        }}
      />
      <span
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: C.bg,
        }}
      >
        {label}
      </span>
    </div>
  )
}

function PathLine({
  label,
  headline,
  ctaHref,
  ctaLabel,
}: {
  label: string
  headline: React.ReactNode
  ctaHref: string
  ctaLabel: string
}) {
  return (
    <div
      style={{
        borderTop: "1px solid rgba(255, 248, 236, 0.32)",
        paddingTop: "32px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(255, 248, 236, 0.78)",
          margin: "0 0 16px",
        }}
      >
        {label}
      </p>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "clamp(26px, 3vw, 36px)",
          fontWeight: 500,
          lineHeight: 1.08,
          color: C.bg,
          margin: "0 0 24px",
        }}
      >
        {headline}
      </h3>
      <Link href={ctaHref} className="lv-link-cta" style={{ color: C.bg }}>
        {ctaLabel} <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  )
}
