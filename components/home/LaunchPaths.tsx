import AuthorityQuote from "@/components/AuthorityQuote"
import ScrollReveal from "@/components/ScrollReveal"

export default function LaunchPaths() {
  return (
    <section className="lv-launch" aria-labelledby="launch-quote-title">
      <div className="lv-launch-inner">
        <ScrollReveal>
          <div className="lv-launch-intro">
            <div>
              <div className="lv-philosophy-eyebrow">
                <span className="lv-eyebrow-dot" aria-hidden="true" />
                <span>Quote</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* The section's statement is the regulator's, not ours: rendered
            statically (outside ScrollReveal) so it is visible without JS. */}
        <h2 id="launch-quote-title" className="lv-authq-sr">Regulatory context</h2>
        <AuthorityQuote
          embedded
          align="center"
          variant="olive"
          className="lv-launch-quote"
          quote="A poorly deployed chatbot can lead to customer frustration, reduced trust, and even violations of the law."
          attribution="Rohit Chopra, Director"
          logoSrc="/images/logos/cfpb.svg"
          logoAlt="CFPB"
        />
      </div>
    </section>
  )
}
