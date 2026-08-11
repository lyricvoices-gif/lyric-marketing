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
import Image from "next/image"
import ScrollReveal from "@/components/ScrollReveal"
import { INTAKE_FACTS } from "@/components/callio/intake-facts"
import IntakeRecording from "@/components/callio/IntakeRecording"
import InventoryMap from "@/components/callio/InventoryMap"
import SpecHoldings from "@/components/callio/SpecHoldings"

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
              <h1 className="lv-opus-hero-head">
                The intake is short because the work is <em>already done</em>.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={220}>
              <p className="lv-opus-hero-sub">
                This page explains what the Callio intake asks, why it asks so
                little, and what you hold when it finishes. An intake runs in{" "}
                {F.durationShape}: {F.decisionPoints} decisions and{" "}
                {F.typedFields} typed field. The governance behind your agent is
                not produced in that sitting. It was authored, reviewed, and
                structured before you arrived.
              </p>
            </ScrollReveal>
          </div>
          <div className="lv-cin-hero-visual">
            <ScrollReveal delay={200}>
              <IntakeRecording />
            </ScrollReveal>
          </div>
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
            <h2 className="lv-cin-section-head">
              What exists before you type a <em>word</em>.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={180}>
            <p className="lv-cin-lead">
              Everything below arrives with the intake. It is what an
              institution would otherwise have to author, build, and test
              itself.
            </p>
          </ScrollReveal>
          <div className="lv-cin-inventory-grid">
            <ScrollReveal>
              <article className="lv-cin-card">
                <p className="lv-cin-card-name">The authored governance</p>
                <p className="lv-cin-card-body">
                  {F.governance.totalBlocks} behavioral blocks written for
                  financial services: {F.governance.promptBlocks} prompt-ready
                  rules covering verification, disclosure, hedging, fair
                  treatment, escalation, and register, plus{" "}
                  {F.governance.mannerBlocks} character and delivery-manner
                  blocks. {F.governance.counselGatedBlocks} of the{" "}
                  {F.governance.promptBlocks} rules are compliance-adjacent and
                  held behind a counsel-review gate.
                </p>
                <p className="lv-cin-card-pills">
                  <Pill>{F.governance.totalBlocks} blocks</Pill>
                  <Pill>{F.governance.counselGatedBlocks} counsel-gated</Pill>
                </p>
              </article>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <article className="lv-cin-card">
                <p className="lv-cin-card-name">The foundation</p>
                <p className="lv-cin-card-body">
                  {F.foundation.items} governed items in{" "}
                  {F.foundation.categories} categories, established the moment
                  the industry is set: {F.foundation.pronunciationEntries}{" "}
                  pronunciation entries, {F.foundation.disclosures} required
                  disclosure, {F.foundation.voiceOutputRules} voice-output
                  rules, and {F.foundation.pacingRules} pacing rules enforced on
                  every generated read.
                </p>
                <p className="lv-cin-card-pills">
                  <Pill>{F.foundation.items} items</Pill>
                  <Pill>{F.foundation.categories} categories</Pill>
                </p>
              </article>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <article className="lv-cin-card">
                <p className="lv-cin-card-name">Channel-native guidance</p>
                <p className="lv-cin-card-body">
                  Voice and text are not the same instrument. SMS, email, and
                  chat each carry guidance written separately for that channel,
                  and a normalization inversion states exactly how spoken forms
                  and written forms diverge. {F.governance.voiceOnlyBlocks}{" "}
                  blocks apply only to voice, {F.governance.textOnlyBlocks} only
                  to text, and the rest hold everywhere. A generic form cannot
                  carry this; it is authored depth.
                </p>
                <p className="lv-cin-card-pills">
                  <Pill>SMS</Pill>
                  <Pill>Email</Pill>
                  <Pill>Chat</Pill>
                </p>
              </article>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <article className="lv-cin-card">
                <p className="lv-cin-card-name">The adapters</p>
                <p className="lv-cin-card-body">
                  {F.adapters} renderers carry the spec into use: a voice prompt
                  adapter, a text prompt adapter per channel, deterministic
                  checkable rules, and voice realization profiles keyed by
                  voice, provider, and channel. The spec itself stays brand
                  intent, so your stack remains yours.
                </p>
                <p className="lv-cin-card-pills">
                  <Pill>{F.adapters} adapters</Pill>
                </p>
              </article>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <article className="lv-cin-card">
                <p className="lv-cin-card-name">The evaluation layer</p>
                <p className="lv-cin-card-body">
                  Included with the spec, not sold beside it. It checks
                  adherence outside the live interaction, so you can observe
                  drift and governance adherence yourself, on your own terms.
                </p>
                <p className="lv-cin-card-pills">
                  <Pill>Included</Pill>
                </p>
              </article>
            </ScrollReveal>
            {/* EXEMPLAR SLOT (inventory) — when exemplar and example-selection
                work lands in the intake, add the exemplars card here: the
                authored exemplar set, its count from INTAKE_FACTS, and what
                example selection establishes. Renders nothing until then. */}
          </div>
          <ScrollReveal delay={140}>
            <div className="lv-cin-inventory-visual">
              <InventoryMap />
            </div>
          </ScrollReveal>
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
              <h2 className="lv-cin-section-head">
                Then we ask for <em>{F.questionGroups} things</em>.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <ol className="lv-cin-ask-list">
                <li>
                  <strong>Who you are.</strong> Your industry and your
                  institution&rsquo;s name.
                </li>
                <li>
                  <strong>Where the agent works.</strong> The channels it will
                  speak and write on, and for phone, which contexts.
                </li>
                <li>
                  <strong>How it should carry itself.</strong> The tone your
                  institution leads with.
                </li>
                <li>
                  <strong>Who delivers it.</strong> The produced voice, chosen
                  from {F.voices} on the roster.
                </li>
              </ol>
            </ScrollReveal>
            <ScrollReveal delay={240}>
              <p className="lv-cin-ask-note">
                Delivery is not a question. Its {F.deliveryAxes} axes derive
                from your answers, are stated back to you in plain language,
                and stay overridable. In all: {F.decisionPoints} decisions,
                roughly {F.approxClicks} clicks, {F.typedFields} typed field.
              </p>
            </ScrollReveal>
            {/* EXEMPLAR SLOT (what we ask) — when example selection ships,
                add its question group here (what the institution reviews or
                picks among exemplars) and raise INTAKE_FACTS.questionGroups.
                Renders nothing until then. */}
          </div>
          <ScrollReveal delay={160}>
            <figure className="lv-cin-ask-visual">
              {/* REAL capture of the tone step, from the same recorded session
                  as the hero video. Below the fold: lazy-loaded. */}
              <Image
                src="/images/callio/intake-tone-step.png"
                alt="The tone question in the live intake: Trustworthy, Approachable, Authoritative, and Warm as selectable chips"
                width={1280}
                height={800}
                sizes="(max-width: 900px) 94vw, 560px"
                loading="lazy"
              />
              <figcaption className="lv-cin-recording-caption">
                The persona question, from the live intake.
              </figcaption>
            </figure>
          </ScrollReveal>
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
            <h2 className="lv-cin-section-head">
              A specification you own, honest about what is <em>left</em>.
            </h2>
          </ScrollReveal>
          <div className="lv-cin-hold-grid">
            <ScrollReveal>
              <div>
                <p className="lv-cin-hold-body">
                  The intake closes with a governed specification you can
                  download and keep: {F.spec.fields} fields of brand intent,
                  deliberately free of provider and model parameters, keyed
                  into every layer of the inventory above. Realization stays
                  separate, so the spec survives a change of model or speech
                  engine.
                </p>
                <p className="lv-cin-hold-body">
                  It also names what it does not yet contain.{" "}
                  {F.obligations.total} obligations are emitted empty, each
                  with its owner recorded: your counsel supplies{" "}
                  {F.obligations.counsel}, your team supplies{" "}
                  {F.obligations.institution},{" "}
                  {F.obligations.sharedCounselInstitution} are shared between
                  them, and {F.obligations.intake} belong to the intake itself
                  as it grows. Nothing is silently defaulted.
                </p>
                <p className="lv-cin-hold-body">
                  An empty slot with a named owner is the difference between a
                  governance instrument and a generated document.
                </p>
                <p className="lv-cin-card-pills">
                  <Pill>{F.spec.fields} spec fields</Pill>
                  <Pill>{F.obligations.total} named obligations</Pill>
                </p>
              </div>
            </ScrollReveal>
            {/* EXEMPLAR SLOT (what you hold) — when exemplars land in the
                spec, add the exemplars entry to the holdings list here and
                extend INTAKE_FACTS.spec. Renders nothing until then. */}
            <ScrollReveal delay={160}>
              <div className="lv-cin-hold-visual">
                <SpecHoldings />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 5. Forked CTA — custom spec PRIMARY and free; prebuilt secondary.
            Not equal visual weight. ── */}
      <section className="lv-cin-fork">
        <div className="lv-opus-wrap lv-cin-fork-inner">
          <ScrollReveal>
            <h2 className="lv-cin-section-head">
              Start where <em>you are</em>.
            </h2>
            <p className="lv-cin-fork-sub">
              Generating a spec is free, and it is yours either way. The
              prebuilt Financial Services agent is there when you want delivery
              without the wait.
            </p>
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
