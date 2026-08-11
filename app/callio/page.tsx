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
import Image from "next/image"
import ScrollReveal from "@/components/ScrollReveal"
import IntakeRecording from "@/components/callio/IntakeRecording"
import { INTAKE_FACTS } from "@/components/callio/intake-facts"
import { SPEC_EXCERPT } from "@/components/callio/spec-excerpt.generated"

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
            <h1 className="lv-cin2-hero-head">
              The governance is <em>already written</em>.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p className="lv-cin2-hero-sub">
              You make six decisions and type one name. Everything else your
              agent needs was authored and reviewed before you arrived.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Product capture on its own charcoal band: the light app UI reads as
          one contained object against the dark ground (C5). */}
      <section className="lv-cin2-media-band">
        <div className="lv-cin2-wrap-wide">
          <ScrollReveal delay={120}>
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
            <p className="lv-cin2-section-sub">
              All of it comes with the intake. None of it is yours to write.
            </p>
          </ScrollReveal>
          <div className="lv-cin2-rows">
            <ScrollReveal>
              <Row
                title="Rules your agent follows"
                figure={`${F.governance.totalBlocks} rules`}
              >
                How it verifies a caller, delivers a required disclosure,
                hedges a claim, treats every customer the same, and hands a
                hard call to a human. The sensitive ones clear counsel review
                first.
              </Row>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <Row
                title="What financial services sounds like"
                figure={`${F.foundation.items} items`}
              >
                How APR is pronounced, how a dollar amount is spoken, the
                recording notice, and the pace a difficult call should hold.
              </Row>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <Row
                title="Written separately for SMS, email, and chat"
                figure={`${F.channels.textChannels} channels`}
              >
                A text message, an email, and a chat turn are different
                instruments. Each has its own guidance, and a number spoken
                aloud on a call is written as a figure in text.
              </Row>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <Row
                title="Ready for whatever runs your calls"
                figure={`${F.adapters} adapters`}
              >
                The specification is written to your brand, not to a vendor.
                Adapters carry it to your phone system, your model, and your
                speech engine, and it survives swapping any of them.
              </Row>
            </ScrollReveal>
            <ScrollReveal delay={240}>
              <Row title="Proof it is being followed" figure="included">
                An evaluation layer comes with the specification. It measures
                your agent against the standard outside the live interaction,
                on your schedule.
              </Row>
            </ScrollReveal>
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
            <h2 className="lv-cin2-section-head">
              We ask for <em>four things</em>.
            </h2>
          </ScrollReveal>
          <div className="lv-cin2-ask-list">
            <ScrollReveal>
              <div className="lv-cin2-ask-item">
                <span className="lv-cin2-ask-num">01</span>
                <p className="lv-cin2-ask-text">
                  <strong>Who you are.</strong> Your industry and your
                  institution&rsquo;s name.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <div className="lv-cin2-ask-item">
                <span className="lv-cin2-ask-num">02</span>
                <p className="lv-cin2-ask-text">
                  <strong>Where the agent works.</strong> Phone, text, chat, or
                  email, and which kinds of calls.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div className="lv-cin2-ask-item">
                <span className="lv-cin2-ask-num">03</span>
                <p className="lv-cin2-ask-text">
                  <strong>How it should sound.</strong> The tone your
                  institution leads with.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <div className="lv-cin2-ask-item">
                <span className="lv-cin2-ask-num">04</span>
                <p className="lv-cin2-ask-text">
                  <strong>Which voice speaks.</strong> One of {F.voices}{" "}
                  produced voices.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={240}>
              <p className="lv-cin2-ask-close">
                The delivery is set from your answers and read back in plain
                language. You can change any of it. {F.decisionPoints}{" "}
                decisions, about {F.approxClicks} clicks, one typed name.
              </p>
            </ScrollReveal>
            {/* EXEMPLAR SLOT (what we ask) — when example selection ships,
                add its numbered line here and raise
                INTAKE_FACTS.questionGroups. Renders nothing until then. */}
          </div>
        </div>
      </section>

      {/* Second capture, same dark-band treatment (C5). */}
      <section className="lv-cin2-media-band">
        <div className="lv-cin2-wrap-wide">
          <ScrollReveal delay={120}>
            <figure className="lv-cin2-capture">
              {/* REAL capture: the persona question in the live intake, 2x. */}
              <Image
                src="/images/callio/intake-tone-step.png"
                alt="The persona question in the live intake, with Trustworthy, Approachable, Authoritative, and Warm as choices"
                width={1600}
                height={1000}
                sizes="(max-width: 1180px) 94vw, 1132px"
                loading="lazy"
              />
              <figcaption className="lv-cin2-capture-caption">
                The persona question, from the live intake.
              </figcaption>
            </figure>
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
            <h2 className="lv-cin2-section-head">
              One document, <em>every conversation</em>.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="lv-cin2-section-sub">
              The specification states how your agent verifies, discloses,
              hedges, escalates, and speaks, on the phone and in writing. You
              download it, and it is yours.
            </p>
          </ScrollReveal>
        </div>
        <div className="lv-cin2-wrap-wide">
          <ScrollReveal delay={160}>
            <figure className="lv-cin2-document">
              {/* THE SIGNATURE: a real render from the adapters, verbatim.
                  Generated file; see tools/render-spec-excerpt.mts. */}
              <pre className="lv-cin2-document-pre">{SPEC_EXCERPT.text}</pre>
            </figure>
          </ScrollReveal>
          {/* EXEMPLAR SLOT (what you hold) — when exemplars land in the
              spec, add their entry beside the document here and extend
              INTAKE_FACTS.spec. Renders nothing until then. */}
        </div>
        <div className="lv-cin2-wrap">
          <p className="lv-cin2-olive-line">
            An empty slot with a named owner is the difference between a
            governance instrument and a generated document.
          </p>
          <ScrollReveal>
            <p className="lv-cin2-owners-intro">
              The specification also names what it still needs.{" "}
              {F.obligations.total} entries are left open on purpose, each
              assigned to the only party who can fill it.
            </p>
          </ScrollReveal>
          <div className="lv-cin2-owners">
            <ScrollReveal>
              <div className="lv-cin2-owner-row">
                <span>Wording only your counsel can approve</span>
                <span className="lv-cin2-owner-count">{F.obligations.counsel}</span>
              </div>
              <div className="lv-cin2-owner-row">
                <span>Facts only your team can supply</span>
                <span className="lv-cin2-owner-count">{F.obligations.institution}</span>
              </div>
              <div className="lv-cin2-owner-row">
                <span>Approved by counsel and team together</span>
                <span className="lv-cin2-owner-count">
                  {F.obligations.sharedCounselInstitution}
                </span>
              </div>
              <div className="lv-cin2-owner-row">
                <span>Collected by the intake as it grows</span>
                <span className="lv-cin2-owner-count">{F.obligations.intake}</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 5. Forked CTA (charcoal). The headline names the choice;
            primary filled, secondary quiet. ── */}
      <section className="lv-cin2-fork">
        <div className="lv-cin2-wrap">
          <ScrollReveal>
            <h2 className="lv-cin2-section-head">
              The specification is yours to keep.
            </h2>
            <p className="lv-cin2-section-sub">
              The intake is free. The prebuilt Financial Services agent is
              finished if you need one sooner.
            </p>
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
