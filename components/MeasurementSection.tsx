/* How we verify it — the proof behind the governance claim.

   States the architecture plainly: Lyric prevents drift inline by
   conditioning the model and the speech engine at generation, and verifies
   it with evals that run out of band, never in the call path. The central
   artifact (EvalArtifact) shows a representative eval breakdown.

   Light cream ground so the eval card reads as genuine product UI, and to
   break the run of dark sections around it. Sits after "What it governs"
   and before the final CTA; an integrations section will later slot between
   this and the CTA. */

import ScrollReveal from "@/components/ScrollReveal"
import EvalArtifact from "@/components/measurement/EvalArtifact"

export default function MeasurementSection() {
  return (
    <section className="lv-eval-section">
      <div className="lv-eval-inner">
        <div className="lv-eval-header">
          <ScrollReveal>
            <div className="lv-philosophy-eyebrow">
              <span className="lv-eyebrow-dot" aria-hidden="true" />
              <span>How we verify it</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2 className="lv-eval-headline">
              Prevented inline.<br /> <em>Verified</em> with evals.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p className="lv-eval-supporting">
              Lyric conditions the model and the speech engine at the point of
              generation, so drift does not occur in the live call. We verify
              that with evals that run against your agents out of band, in
              testing and monitoring, never in the call path.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={160}>
          <EvalArtifact />
        </ScrollReveal>

        <ScrollReveal delay={240}>
          <p className="lv-eval-caption">
            Illustrative. A representative Lyric eval run against a brand spec.
            Every output is scored against your spec, the target you configured
            with Lyric, not a reference recording.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
