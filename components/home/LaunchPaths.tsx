import AuthorityQuote from "@/components/AuthorityQuote"

export default function LaunchPaths() {
  return (
    <section className="lv-launch" aria-labelledby="launch-quote-title">
      <div className="lv-launch-inner">
        <h2 id="launch-quote-title" className="lv-authq-sr">Regulatory context</h2>
        {/* Statically rendered (no scroll-reveal) so the quotation is visible
            without JavaScript and under reduced motion. */}
        <AuthorityQuote
          embedded
          align="center"
          variant="olive"
          rule={false}
          className="lv-launch-quote"
          quote="A poorly deployed chatbot can lead to customer frustration, reduced trust, and even violations of the law."
          attribution="Rohit Chopra"
          role="Director"
          logoSrc="/images/logos/cfpb.svg"
          logoAlt="CFPB"
          logoTop
        />
      </div>
    </section>
  )
}
