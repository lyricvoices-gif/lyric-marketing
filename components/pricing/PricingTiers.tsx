/* Pricing is presented as an enterprise buying decision, not a SaaS tier
   comparison. Both paths produce the same class of owned, portable outcome;
   the difference is whether the buyer starts from the Financial Services
   foundation or authors a new standard through Callio. */

import Link from "next/link"
import { PRICING } from "@/components/pricing/pricing-data"

const FOUNDATION_INQUIRY =
  "mailto:info@lyricvoices.ai?subject=Financial%20Services%20foundation&body=We%20would%20like%20to%20start%20with%20the%20Financial%20Services%20foundation."

const PATHS = [
  {
    index: "01",
    eyebrow: "Pre-built foundation",
    name: "Financial Services",
    amount: PRICING.prebuilt.amount,
    description:
      "Start with governance already authored for regulated financial interactions, then tailor it to your institution without rebuilding the standard.",
    points: [
      "Financial Services behavior, terminology, and disclosures",
      "High-stakes workflows, controls, and escalation paths",
      "Evaluation criteria that remain in force after launch",
      "Includes the GovernSpec, implementation adapter, scenario exemplars, voice configuration, and evaluation criteria",
    ],
    href: FOUNDATION_INQUIRY,
    cta: "Start with Financial Services",
    note: "Begins the purchase and tailoring process",
  },
  {
    index: "02",
    eyebrow: "Authored through Callio",
    name: "Custom GovernSpec",
    amount: PRICING.custom.amount,
    description:
      "Author a governed standard around your business, industry, channels, and real workflows through a guided Callio intake.",
    points: [
      "Enterprise and industry context captured through intake",
      "Voice and text behavior authored to one shared standard",
      "A reviewed specification commissioned when you are ready",
      "Includes the GovernSpec, implementation adapter, scenario exemplars, voice configuration, and evaluation criteria",
    ],
    href: "/callio",
    cta: "Build through Callio",
    note: "The intake is free; the fee applies when you commission the build",
  },
] as const

const PURCHASE_STEPS = [
  ["Choose", "Start from Financial Services or author through Callio."],
  ["Tailor or author", "Adapt the foundation or complete the guided intake."],
  ["Review", "Approve the governed behavior, workflows, and evaluation standard."],
  ["Purchase", "Own and download the GovernSpec and implementation adapter."],
  ["Implement", "Deploy with your team or add Lyric professional services."],
] as const

export default function PricingTiers() {
  return (
    <div className="lv-pricing-offers">
      <section className="lv-pricing-paths" aria-label="Purchase options">
        <div className="lv-pricing-path-list">
          {PATHS.map((path) => {
            const isMail = path.href.startsWith("mailto:")
            const action = (
              <>
                {path.cta} <span aria-hidden="true">↗</span>
              </>
            )

            return (
              <article className="lv-pricing-path" key={path.index}>
                <div className="lv-pricing-path-index" aria-hidden="true">
                  {path.index}
                </div>
                <div className="lv-pricing-path-main">
                  <p className="lv-pricing-path-eyebrow">{path.eyebrow}</p>
                  <h3>{path.name}</h3>
                  <p className="lv-pricing-path-description">
                    {path.description}
                  </p>
                  <ul>
                    {path.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="lv-pricing-path-purchase">
                  <p className="lv-pricing-path-price">
                    {path.amount}
                    <span>one-time purchase</span>
                  </p>
                  {isMail ? (
                    <a className="lv-pricing-path-cta" href={path.href}>
                      {action}
                    </a>
                  ) : (
                    <Link className="lv-pricing-path-cta" href={path.href}>
                      {action}
                    </Link>
                  )}
                  <p className="lv-pricing-path-note">{path.note}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="lv-pricing-process" aria-labelledby="process-title">
        <div className="lv-pricing-section-intro lv-pricing-process-intro">
          <p className="lv-pricing-section-kicker">How the purchase works</p>
          <h2 id="process-title">
            <span>A defined path from</span>
            <span>choice to deployment.</span>
          </h2>
          <p className="lv-pricing-section-description">
            Five steps take the standard from selection to implementation.
          </p>
        </div>
        <ol className="lv-pricing-process-list">
          {PURCHASE_STEPS.map(([title, copy], index) => (
            <li key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>

    </div>
  )
}
