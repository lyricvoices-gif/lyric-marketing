/* Two paths forward — the conversion bookend used at the bottom of
   the imprint and product pages. Formatted to mirror the home page's
   "voice-first era is here" Final CTA exactly: dark olive ground,
   centered gold-dot eyebrow, italic display headline, and two pill
   buttons — one for brands, one for artists. It reuses .lv-final +
   .lv-cta-row so the visual parity with the home page holds.

   Reusable across /imprint and /opus so the page-end conversion
   moment reads identically on both, without inlining the markup
   twice. */

import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"

const pill: React.CSSProperties = {
  minHeight: "54px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 28px",
  borderRadius: "100px",
  fontSize: "15px",
  fontWeight: 500,
  transition: "background 0.22s ease, color 0.22s ease",
}

export default function TwoPathsForward() {
  return (
    <section className="lv-final" style={{ background: "#2b2a25" }}>
      <ScrollReveal>
        <div className="lv-philosophy-eyebrow lv-final-eyebrow">
          <span className="lv-eyebrow-dot" aria-hidden="true" />
          <span>Two paths forward</span>
        </div>
        <h2>
          Pick the path that <em>fits.</em>
        </h2>
        <div className="lv-cta-row lv-cta-row-center">
          <Link
            href="/imprint/license"
            className="lv-cta lv-cta-light"
            style={{
              ...pill,
              background: "var(--bg-light)",
              color: "var(--olive)",
              border: "1px solid transparent",
            }}
          >
            License a voice
          </Link>
          <Link
            href="/imprint/apply"
            className="lv-cta lv-cta-outline"
            style={{
              ...pill,
              background: "transparent",
              color: "var(--bg-light)",
              border: "1px solid rgba(255, 248, 236, 0.6)",
            }}
          >
            Partner with Lyric
          </Link>
        </div>
      </ScrollReveal>
    </section>
  )
}
