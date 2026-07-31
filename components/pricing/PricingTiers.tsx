/* The two purchase paths and the optional consulting add-on. Both paths are
   one-time purchases; each card leads with its single price. Consulting is a
   quieter third card and must never read as required. The evaluation and
   monitoring layer is included on both paths, never an upsell.

   All amounts come from components/pricing/pricing-data.ts. CTAs use named
   routes: the prebuilt agent routes to the agents get-started stub; the
   custom path and consulting route to /contact (named placeholder). */

import Link from "next/link"
import { PRICING } from "@/components/pricing/pricing-data"

const GET_STARTED = "/agents/get-started"
const CONTACT = "/contact"

export default function PricingTiers() {
  return (
    <div className="lv-pricing-grid">
      {/* Path 1 — Prebuilt Financial Services Agent */}
      <article className="lv-price-card lv-price-card-hero">
        <span className="lv-price-badge">Ready to deploy</span>
        <p className="lv-price-name">Prebuilt Financial Services Agent</p>
        <p className="lv-price-billing">{PRICING.prebuilt.billing}</p>
        <p className="lv-price-amount">
          {PRICING.prebuilt.amount}
          <span className="lv-price-period"> one time</span>
        </p>
        <p className="lv-price-desc">
          The governed Financial Services agent, complete and ready to bring
          into service.
        </p>
        <ul className="lv-price-includes">
          <li>
            The complete governed Financial Services specification, authored by
            domain experts
          </li>
          <li>
            Verify-before-disclose call flow, dispute and hold handling,
            escalation controls, and disclosure delivery
          </li>
          <li>
            Scenario exemplars showing on-brand handling for financial services
            situations
          </li>
          <li>Financial services pronunciation and voice-output standards</li>
          <li>Your choice of produced voice: Sol, Sam, or James</li>
          <li>
            The evaluation and monitoring layer, included, so you can observe
            drift and governance adherence yourself
          </li>
          <li>Ready to deploy, with no intake process required</li>
        </ul>
        <Link href={GET_STARTED} className="lv-price-cta lv-price-cta-primary">
          Get started with this agent
        </Link>
      </article>

      {/* Path 2 — Govern Your Existing Agent */}
      <article className="lv-price-card">
        <p className="lv-price-name">Govern Your Existing Agent</p>
        <p className="lv-price-billing">{PRICING.governExisting.billing}</p>
        <p className="lv-price-amount">
          {PRICING.governExisting.amount}
          <span className="lv-price-period"> one time</span>
        </p>
        <p className="lv-price-desc">
          A custom intake that builds the governance around the agent you
          already run.
        </p>
        <ul className="lv-price-includes">
          <li>Full intake and assessment of your existing agent</li>
          <li>
            Governance specification built around your agent, your workflows,
            and your approved language
          </li>
          <li>
            Exemplar selection, scenario coverage, escalation patterns, and
            character definition
          </li>
          <li>
            Testing and approval support through to a governed spec you own
          </li>
          <li>
            The evaluation and monitoring layer, included, on the same terms as
            the prebuilt agent
          </li>
        </ul>
        <Link href={CONTACT} className="lv-price-cta lv-price-cta-ghost">
          Talk to us
        </Link>
      </article>

      {/* Optional add-on — Consulting. Never required, available on either
          path, at purchase or at any point after. */}
      <article className="lv-price-card">
        <p className="lv-price-name">Consulting</p>
        <p className="lv-price-billing">{PRICING.consulting.billing}</p>
        <p className="lv-price-amount">{PRICING.consulting.amount}</p>
        <p className="lv-price-desc">
          An optional add-on. Both paths are complete without it.
        </p>
        <ul className="lv-price-includes">
          <li>
            Implementation and integration support with your telephony and
            account systems
          </li>
          <li>Configuration assistance and validation for your institution</li>
          <li>
            Setup and interpretation of the evaluation layer, including ongoing
            monitoring if you want Callio watching it with you
          </li>
          <li>
            Available on either path, at purchase or at any point after
          </li>
        </ul>
        <Link href={CONTACT} className="lv-price-cta lv-price-cta-ghost">
          Ask about consulting
        </Link>
      </article>
    </div>
  )
}
