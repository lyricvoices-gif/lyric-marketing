/* Callio page — an explainer for the intake process, not a specimen page.
   The spec itself is generated in the app and is not shown here.

   Angle (per Lyric, 2026-08-11): the intake being short is the point. Callio
   authored the governance in advance, so the page LEADS with the inventory of
   what an institution receives, then shows the little it asks, then what the
   institution holds at the end. Section order:

     1) Hero        — what this page is; the time commitment stated honestly
     2) Inventory   — PRIMARY: what is already authored, with measured counts
                      (channel depth folds in here, not into the questions)
     3) What we ask — the short beat; the only thing the institution supplies
     4) What you hold — the spec, its structure, the unfilled obligations
                        shown honestly with their owners
     5) Forked CTA  — start a custom spec (PRIMARY, free) / prebuilt (secondary)

   Every figure on this page comes from components/callio/intake-facts.ts;
   no number is written inline. Copy rules: no em dashes, no exclamation
   points, no buzzwords; Callio is never described as intercepting or checking
   output in the call path (the spec governs how the agent is instructed);
   "prebuilt", never "pre-built".

   Visual language: cream ground, olive cards, the site display serif for
   headlines, mono eyebrows, pill tags. Scoped styles: lv-cin-* in globals.css. */

import type { Metadata } from "next"
import type { CSSProperties, ReactNode } from "react"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import { INTAKE_FACTS } from "@/components/callio/intake-facts"

export const metadata: Metadata = {
  title: "Callio",
  description:
    "How the Callio intake works: what is already authored before you arrive, the few things it asks, and the governed specification you hold at the end.",
}

const F = INTAKE_FACTS
const START = "/start"
const AGENTS = "/agents"

/* Pill CTA, mirroring the homepage / pricing Final CTA buttons. */
function CTA({
  href,
  children,
  variant = "dark",
}: {
  href: string
  children: ReactNode
  variant?: "dark" | "light" | "outline"
}) {
  const style: CSSProperties = {
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
  return (
    <Link href={href} className={`lv-cta lv-cta-${variant}`} style={style}>
      {children}
    </Link>
  )
}

/* Mono small-caps eyebrow, dot + label. */
function Eyebrow({ label }: { label: string }) {
  return (
    <div className="lv-philosophy-eyebrow lv-opus-eyebrow">
      <span className="lv-eyebrow-dot" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

/* Mono pill tag (counts, owners, channel names). */
function Pill({ children }: { children: ReactNode }) {
  return <span className="lv-cin-pill">{children}</span>
}

export default function CallioPage() {
  return (
    <main className="lv-opus lv-cin">
      {/* ── 1. Hero — what this page is, time commitment honest. ── */}
      <section className="lv-cin-hero">
        <div className="lv-opus-wrap lv-cin-hero-grid">
          <div>
            <ScrollReveal>
              <Eyebrow label="Callio · The intake" />
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <h1 className="lv-opus-hero-head">{/* copy: commit 2 */}</h1>
            </ScrollReveal>
            <ScrollReveal delay={220}>
              <p className="lv-opus-hero-sub">{/* copy: commit 2 */}</p>
            </ScrollReveal>
          </div>
          <div className="lv-cin-hero-visual">{/* visual: commit 3 (intake recording) */}</div>
        </div>
      </section>

      {/* ── 2. Inventory — PRIMARY. What is already authored on arrival.
            Channel-native depth belongs here (it is what the spec carries,
            not intake branching). ── */}
      <section className="lv-cin-inventory">
        <div className="lv-opus-wrap">
          <ScrollReveal>
            <Eyebrow label="Already authored" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2 className="lv-cin-section-head">{/* copy: commit 2 */}</h2>
          </ScrollReveal>
          <div className="lv-cin-inventory-grid">
            {/* cards: authored blocks / foundation / channel-native guidance /
                adapters / evaluation layer — copy: commit 2 */}
            {/* EXEMPLAR SLOT (inventory) — when exemplar and example-selection
                work lands in the intake, add the exemplars card here: the
                authored exemplar set, its count from INTAKE_FACTS, and what
                example selection establishes. Renders nothing until then. */}
          </div>
          <div className="lv-cin-inventory-visual">{/* visual: commit 3 (corpus map SVG) */}</div>
        </div>
      </section>

      {/* ── 3. What we ask — the short beat. The only thing the institution
            supplies; the contrast with the inventory is the argument. ── */}
      <section className="lv-cin-ask">
        <div className="lv-opus-wrap lv-cin-ask-grid">
          <div>
            <ScrollReveal>
              <Eyebrow label="What we ask" />
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <h2 className="lv-cin-section-head">{/* copy: commit 2 */}</h2>
            </ScrollReveal>
            {/* question groups list — copy: commit 2 */}
            {/* EXEMPLAR SLOT (what we ask) — when example selection ships,
                add its question group here (what the institution reviews or
                picks among exemplars) and raise INTAKE_FACTS.questionGroups.
                Renders nothing until then. */}
          </div>
          <div className="lv-cin-ask-visual">{/* visual: commit 3 (real intake still) */}</div>
        </div>
      </section>

      {/* ── 4. What you hold — the spec, its structure, and the unfilled
            obligations shown honestly with owners. ── */}
      <section className="lv-cin-hold">
        <div className="lv-opus-wrap">
          <ScrollReveal>
            <Eyebrow label="What you hold" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2 className="lv-cin-section-head">{/* copy: commit 2 */}</h2>
          </ScrollReveal>
          <div className="lv-cin-hold-grid">
            {/* spec structure + obligations by owner — copy: commit 2 */}
            {/* EXEMPLAR SLOT (what you hold) — when exemplars land in the
                spec, add the exemplars entry to the holdings list here and
                extend INTAKE_FACTS.spec. Renders nothing until then. */}
          </div>
          <div className="lv-cin-hold-visual">{/* visual: commit 3 (spec + slots SVG) */}</div>
        </div>
      </section>

      {/* ── 5. Forked CTA — custom spec PRIMARY and free; prebuilt secondary.
            Not equal visual weight. ── */}
      <section className="lv-cin-fork">
        <div className="lv-opus-wrap lv-cin-fork-inner">
          <ScrollReveal>
            <h2 className="lv-cin-section-head">{/* copy: commit 2 */}</h2>
            <div className="lv-cta-row">
              <CTA href={START} variant="dark">
                Generate your governed spec
              </CTA>
              <CTA href={AGENTS} variant="outline">
                See the prebuilt agent
              </CTA>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
