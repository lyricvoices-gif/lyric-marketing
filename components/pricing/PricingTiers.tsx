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
/* The custom intake flow entry — the site's established named route (the
   "Build your AI comms spec" destination on the home and Callio pages). */
const INTAKE = "/start"
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
          The governed Financial Services agent, complete and production-ready.
        </p>
        <ul className="lv-price-includes">
          <li>Governed FS specification authored by domain experts</li>
          <li>
            Verify-before-disclose workflow including dispute handling, hold
            handling, escalation controls, and disclosure delivery
          </li>
          <li>
            Scenario exemplars showing consistent, on-brand handling for
            financial services situations
          </li>
          <li>
            FS pronunciation and voice-output standards for clear and compliant
            communication
          </li>
          <li>Choice of produced voice: Sol, Sam, or James</li>
          <li>
            Evaluation and monitoring layer included, so you can observe drift
            and governance adherence directly
          </li>
          <li>Ready to deploy with no intake process required</li>
        </ul>
        <Link href={GET_STARTED} className="lv-price-cta lv-price-cta-primary">
          Get started with this agent
        </Link>
      </article>

      {/* Path 2 — Custom Governed Agent: commissioned and authored for the
          customer's business and vertical, to the same standard as the FS
          agent. NOT governance wrapped around an agent the customer brings. */}
      <article className="lv-price-card">
        <p className="lv-price-name">Custom Governed Agent</p>
        <p className="lv-price-billing">{PRICING.custom.billing}</p>
        <p className="lv-price-amount">
          {PRICING.custom.amount}
          <span className="lv-price-period"> one time</span>
        </p>
        <p className="lv-price-desc">
          A governed agent authored for your business and your vertical, built
          to the same standard as the Financial Services agent.
        </p>
        <ul className="lv-price-includes">
          <li>
            Discovery and definition of your vertical&rsquo;s workflows,
            controls, and escalation patterns
          </li>
          <li>
            A complete governance specification authored for your business, not
            adapted from a template
          </li>
          <li>
            Scenario exemplars written for the situations your agent will
            actually handle
          </li>
          <li>
            Character definition, plus pronunciation and output standards for
            your vocabulary
          </li>
          <li>Your choice of produced voice</li>
          <li>
            Testing and approval support through to a governed specification
            you own
          </li>
          <li>
            The evaluation and monitoring layer, included, on the same terms as
            the prebuilt agent
          </li>
        </ul>
        <p className="lv-price-note">
          The intake and the specification it generates are free; the $25,000
          applies when you commission the build.
        </p>
        <Link href={INTAKE} className="lv-price-cta lv-price-cta-ghost">
          Generate your governed spec
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
          Schedule a call
        </Link>
      </article>
    </div>
  )
}
