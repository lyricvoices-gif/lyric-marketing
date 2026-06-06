/* Products section — three pillars of the Lyric imprint, presented as
   three alternating editorial moments on the olive ground chapter break.

   Each pillar gets its own block with a distinct visual treatment, a
   short body description, and a CTA into its dedicated page. The
   visuals are built from CSS and inline SVG rather than image assets so
   the section stays lightweight and the per-pillar motion can be tuned
   from the same place that defines the markup.

   Composer, Timbre (now Direction), and The Lyric Briefing are no
   longer top-level pillars in this section. Composer and Direction are
   the two modes inside Opus; the Briefing lives under the Imprint as
   ongoing cultural output. Both still exist as routes; they just no
   longer surface here. */

import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import OpusVisual from "@/components/products/OpusVisual"
import ScoreVisual from "@/components/products/ScoreVisual"

type Pillar = {
  id: "imprint" | "score" | "opus"
  index: string
  name: string
  body: React.ReactNode
  href: string
  cta: string
  /* When true, the CTA renders as a static "Coming soon" marker
     instead of an active link — used while a pillar's destination
     page is still being built. */
  comingSoon?: boolean
  Visual: () => React.ReactNode
}

/* The Edition 01 roster, hard-coded here so this section stays
   self-contained. Per-voice colors come from the brand memory:
   Morgan gold, Nova sage, Atlas deeper sage, Riven terracotta, Hex
   warm orange. */
const ROSTER = [
  { name: "Atlas", role: "Considered, conversational", color: "#7A9B82" },
  { name: "Hex", role: "Warm, declarative", color: "#E0834A" },
  { name: "Morgan", role: "Editorial, narrative", color: "#F3D171" },
  { name: "Nova", role: "Bright, ambient", color: "#B5C19E" },
  { name: "Riven", role: "Lower register, deliberate", color: "#B5634D" },
] as const

function ImprintVisual() {
  return (
    <div className="lv-pillar-visual lv-pillar-visual-imprint">
      <div className="lv-pillar-bg lv-pillar-bg-imprint" aria-hidden="true" />
      <ul className="lv-imprint-roster" aria-hidden="true">
        {ROSTER.map((voice, i) => (
          <li
            key={voice.name}
            className="lv-imprint-plaque"
            style={{
              // Each plaque breathes with the same period but offset so the
              // dots ripple as a wave rather than pulsing in lockstep.
              ["--breath-delay" as string]: `${i * 0.48}s`,
            }}
          >
            <span
              className="lv-imprint-plaque-dot"
              style={{ background: voice.color }}
            />
            <span className="lv-imprint-plaque-name">{voice.name}</span>
            <span className="lv-imprint-plaque-role">{voice.role}</span>
          </li>
        ))}
      </ul>
      <p className="lv-imprint-caption" aria-hidden="true">
        Edition 01
      </p>
    </div>
  )
}

/* ScoreVisual is hoisted into its own client component because it
   decodes the Morgan audio file via the Web Audio API and renders the
   resulting amplitudes through the ElevenLabs UI Waveform component,
   both of which require the DOM. OpusVisual is similarly hoisted for
   its animated Direction-mode chat state. */

const PILLARS: Pillar[] = [
  {
    id: "imprint",
    index: "01",
    name: "Imprint",
    body: (
      <>
        A curated roster of voice identities, built with real artists who
        retain their rights and shape how their voices perform. The
        foundation of everything Lyric does.
      </>
    ),
    href: "/imprint",
    cta: "Explore the Imprint",
    Visual: ImprintVisual,
  },
  {
    id: "score",
    index: "02",
    name: "Score",
    body: (
      <>
        Performance-grade voice datasets for AI labs and researchers.
        Built from real artist sessions on the imprint. Consented.
        Attributed. Defensibly sourced.
      </>
    ),
    href: "/score",
    cta: "Coming soon",
    comingSoon: true,
    Visual: ScoreVisual,
  },
  {
    id: "opus",
    index: "03",
    name: "Opus",
    body: (
      <>
        Where voice work is directed, not just generated. Two modes in
        one environment: Direction shapes how the voice performs,
        Composer produces the work.
      </>
    ),
    href: "/opus",
    cta: "Explore Opus",
    Visual: OpusVisual,
  },
]

export default function ProductsSection() {
  return (
    <section className="lv-products">
      <div className="lv-products-header">
        <ScrollReveal>
          <div className="lv-philosophy-eyebrow">
            <span className="lv-eyebrow-dot" aria-hidden="true" />
            <span>The Imprint</span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <h2 className="lv-products-headline">
            Three pillars. One <em>imprint</em>.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={220}>
          <p className="lv-products-supporting">
            Lyric is an imprint of curated AI voice identities, built with
            real artists. Each pillar gives that imprint a different way to
            live in the world. To be directed, licensed, and learned from.
          </p>
        </ScrollReveal>
      </div>

      <div className="lv-products-pillars">
        {PILLARS.map((p, i) => {
          const Visual = p.Visual
          return (
            <ScrollReveal key={p.id} delay={i * 80}>
              <article
                className={`lv-pillar lv-pillar-${p.id}`}
                data-orient={i % 2 === 0 ? "visual-left" : "visual-right"}
              >
                <div className="lv-pillar-media">
                  <Visual />
                </div>
                <div className="lv-pillar-copy">
                  <p className="lv-pillar-index">{p.index} · Pillar</p>
                  <h3 className="lv-pillar-name">{p.name}</h3>
                  <p className="lv-pillar-body">{p.body}</p>
                  {p.comingSoon ? (
                    <span className="lv-link-cta lv-link-cta-disabled" aria-disabled="true">
                      {p.cta}
                    </span>
                  ) : (
                    <Link href={p.href} className="lv-link-cta">
                      {p.cta} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                </div>
              </article>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}
