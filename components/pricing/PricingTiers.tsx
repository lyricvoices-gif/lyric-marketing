/* The two purchase paths share one deliverable inventory below the cards.
   Card bullets stay decision-focused: they explain why a buyer would choose
   one path over the other without repeating what both purchases include. */

import Link from "next/link"
import { PRICING } from "@/components/pricing/pricing-data"

const PREBUILT_GET_STARTED = "/agents/get-started"
const CUSTOM_INQUIRY =
  "mailto:info@lyricvoices.ai?subject=Custom%20governed%20agent"
const CONSULTING_INQUIRY =
  "mailto:info@lyricvoices.ai?subject=Callio%20consulting"

const SHARED_INCLUSIONS = [
  "Governance specification",
  "Scenario exemplars",
  "Channel-ready output for voice/text",
  "Evaluation and monitoring",
  "A voice tuned for consistent, governed performance.",
] as const

export default function PricingTiers() {
  return (
    <div className="lv-pricing-offers">
      <div className="lv-pricing-grid">
        <article className="lv-price-card lv-price-card-hero">
          <div className="lv-price-card-topline">
            <span className="lv-price-path">Prebuilt</span>
          </div>

          <div className="lv-price-heading">
            <p className="lv-price-name">
              <span className="lv-price-name-line">Financial Services</span>{" "}
              <span className="lv-price-name-line">Governed Agent</span>
            </p>
            <p className="lv-price-amount">
              {PRICING.prebuilt.amount}
              <span className="lv-price-period"> one time</span>
            </p>
          </div>

          <p className="lv-price-desc">
            Choose the proven financial-services path when speed and a defined
            operating standard matter most.
          </p>

          <ul className="lv-price-decisions">
            <li>
              Financial-services governance authored by domain experts.
            </li>
            <li>
              High-risk workflows for verification, disputes, holds,
              escalation, and disclosure.
            </li>
            <li>
              Ready to implement immediately, with no discovery or intake
              required.
            </li>
          </ul>

          <Link
            href={PREBUILT_GET_STARTED}
            className="lv-price-cta lv-price-cta-primary"
          >
            Choose the prebuilt agent
          </Link>
        </article>

        <article className="lv-price-card">
          <div className="lv-price-card-topline">
            <span className="lv-price-path">Authored for you</span>
          </div>

          <div className="lv-price-heading">
            <p className="lv-price-name">
              <span className="lv-price-name-line">Custom</span>{" "}
              <span className="lv-price-name-line">Governed Agent</span>
            </p>
            <p className="lv-price-amount">
              {PRICING.custom.amount}
              <span className="lv-price-period"> one time</span>
            </p>
          </div>

          <p className="lv-price-desc">
            Choose the custom path when your business needs governance written
            around the way it actually operates.
          </p>

          <ul className="lv-price-decisions">
            <li>
              Governance authored around your business, vertical, and real
              workflows.
            </li>
            <li>
              Custom controls, escalation patterns, scenarios, and vocabulary.
            </li>
            <li>
              Discovery through approval, yielding a specification you own.
            </li>
          </ul>

          <a
            href={CUSTOM_INQUIRY}
            className="lv-price-cta lv-price-cta-ghost"
          >
            Start a custom agent
          </a>
        </article>
      </div>

      <section className="lv-shared-inclusions" aria-labelledby="shared-title">
        <div className="lv-shared-inclusions-heading">
          <p className="lv-shared-kicker">Included with either path</p>
          <h2 id="shared-title">One complete governance system.</h2>
        </div>
        <ul className="lv-shared-inclusions-list">
          {SHARED_INCLUSIONS.map((item) => (
            <li key={item}>
              <span className="lv-shared-check" aria-hidden="true">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <aside className="lv-pricing-consulting" aria-label="Optional consulting">
        <p>
          <strong>Want hands-on support?</strong> Consulting is optional and
          available per engagement for implementation, integration, or
          monitoring support.
        </p>
        <a href={CONSULTING_INQUIRY}>Discuss consulting</a>
      </aside>
    </div>
  )
}
