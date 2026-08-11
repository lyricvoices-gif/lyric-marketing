/* Callio — the intake explainer, rebuilt per docs/callio-page-plan.md.
   Structure commit: bands, rules, and layout. Copy lands in the next commit;
   only the two kept lines and eyebrows render here. Visuals (re-recorded
   captures + the real adapter render) land after the excerpt is approved.

   Band rhythm (home register): cream hero -> charcoal primary -> cream ask
   -> bright hold -> charcoal fork. No rounded containers; hierarchy from
   scale, weight, whitespace; hairline rules for separation; olive reserved
   for the single emphasis moment in section 4.

   Figures: components/callio/intake-facts.ts only. Copy rules: short
   declarative sentences, buyer's words, no em dashes, no exclamation points,
   no interception framing (the spec governs how the agent is instructed);
   "prebuilt", never "pre-built". */

import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import IntakeRecording from "@/components/callio/IntakeRecording"
import { INTAKE_FACTS } from "@/components/callio/intake-facts"

export const metadata: Metadata = {
  title: "Callio",
  description:
    "The Callio intake: the governance is already written when you arrive. What it asks, and the governed specification you hold at the end.",
}

const F = INTAKE_FACTS
const START = "/start"
const AGENTS = "/agents"

function Eyebrow({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div className={`lv-philosophy-eyebrow lv-cin2-eyebrow${dark ? " is-dark" : ""}`}>
      <span className="lv-eyebrow-dot" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

/* Ruled inventory row: title + sentence left, aligned mono figure right. */
function Row({
  title,
  children,
  figure,
}: {
  title: ReactNode
  children?: ReactNode
  figure?: ReactNode
}) {
  return (
    <div className="lv-cin2-row">
      <div className="lv-cin2-row-text">
        <h3 className="lv-cin2-row-title">{title}</h3>
        {children ? <p className="lv-cin2-row-body">{children}</p> : null}
      </div>
      {figure ? <div className="lv-cin2-row-figure">{figure}</div> : null}
    </div>
  )
}

export default function CallioPage() {
  return (
    <main className="lv-cin2">
      {/* ── 1. Hero (cream). The claim; the recording near full width. ── */}
      <section className="lv-cin2-hero">
        <div className="lv-cin2-wrap">
          <ScrollReveal>
            <Eyebrow label="Callio" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h1 className="lv-cin2-hero-head">{/* copy commit */}</h1>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p className="lv-cin2-hero-sub">{/* copy commit */}</p>
          </ScrollReveal>
        </div>
        <div className="lv-cin2-wrap-wide">
          <ScrollReveal delay={280}>
            <IntakeRecording />
          </ScrollReveal>
        </div>
      </section>

      {/* ── 2. Already authored (charcoal, PRIMARY). Ruled rows, figure
            column; channel depth folds in here. ── */}
      <section className="lv-cin2-authored">
        <div className="lv-cin2-wrap">
          <ScrollReveal>
            <Eyebrow label="Already authored" dark />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2 className="lv-cin2-section-head">
              What exists before you type a <em>word</em>.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="lv-cin2-section-sub">{/* copy commit */}</p>
          </ScrollReveal>
          <div className="lv-cin2-rows">
            {/* rows land in the copy commit:
                governance / foundation / per-channel / voice-and-text /
                adapters / evaluation layer */}
            {/* EXEMPLAR SLOT (already authored) — when exemplar and
                example-selection work lands, add its Row here with its
                count from INTAKE_FACTS. Renders nothing until then. */}
          </div>
        </div>
      </section>

      {/* ── 3. What we ask (cream, short). Numbered lines (real sequence),
            then the persona capture near full width. ── */}
      <section className="lv-cin2-ask">
        <div className="lv-cin2-wrap">
          <ScrollReveal>
            <Eyebrow label="What we ask" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2 className="lv-cin2-section-head">{/* copy commit */}</h2>
          </ScrollReveal>
          <div className="lv-cin2-ask-list">
            {/* four numbered lines + one closing sentence: copy commit */}
            {/* EXEMPLAR SLOT (what we ask) — when example selection ships,
                add its numbered line here and raise
                INTAKE_FACTS.questionGroups. Renders nothing until then. */}
          </div>
        </div>
        <div className="lv-cin2-wrap-wide">
          <ScrollReveal delay={200}>
            <div className="lv-cin2-capture">{/* persona capture: visuals commit */}</div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 4. What you hold (bright). Leads with what the spec governs;
            the real rendered excerpt is the signature; the kept line is the
            one olive moment; obligations as an aligned table. ── */}
      <section className="lv-cin2-hold">
        <div className="lv-cin2-wrap">
          <ScrollReveal>
            <Eyebrow label="What you hold" />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2 className="lv-cin2-section-head">{/* copy commit */}</h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="lv-cin2-section-sub">{/* copy commit */}</p>
          </ScrollReveal>
        </div>
        <div className="lv-cin2-wrap-wide">
          <div className="lv-cin2-document">
            {/* THE SIGNATURE: real rendered specification excerpt, generated
                from the adapters in the callio repo (visuals commit, after
                the excerpt is approved). Never hand-edited. */}
          </div>
          {/* EXEMPLAR SLOT (what you hold) — when exemplars land in the
              spec, add their entry beside the document here and extend
              INTAKE_FACTS.spec. Renders nothing until then. */}
        </div>
        <div className="lv-cin2-wrap">
          <p className="lv-cin2-olive-line">
            An empty slot with a named owner is the difference between a
            governance instrument and a generated document.
          </p>
          <div className="lv-cin2-owners">{/* obligations table: copy commit */}</div>
        </div>
      </section>

      {/* ── 5. Forked CTA (charcoal). The headline names the choice;
            primary filled, secondary quiet. ── */}
      <section className="lv-cin2-fork">
        <div className="lv-cin2-wrap">
          <ScrollReveal>
            <h2 className="lv-cin2-section-head">{/* copy commit */}</h2>
            <p className="lv-cin2-section-sub">{/* copy commit */}</p>
            <div className="lv-cin2-fork-actions">
              <Link href={START} className="lv-cta lv-cin2-cta-primary">
                Generate your governed spec
              </Link>
              <Link href={AGENTS} className="lv-cin2-cta-quiet">
                See the prebuilt agent
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
