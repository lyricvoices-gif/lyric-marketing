/* The three pricing tiers. Foundation (one-time, understated) is the starting
   point; Governance (subscription) is the hero — raised, gold-accented, with a
   "Recommended" badge; Enterprise (custom) is the quiet talk-to-us path.

   Annual is the loud default — there is no monthly/annual toggle. The annual
   price leads; monthly is demoted to one quiet "or $X/mo billed monthly" line.
   The per-agent ladder (annual) shows value-based pricing where the per-agent
   cost drops as the fleet grows; above the top rung it routes to Enterprise. All
   numbers come from components/pricing/pricing-data.ts — the single editable place.

   CTAs use named routes: "Try for free" -> /start (the trial leads into the paid
   flow); "Talk to us" -> /contact (a named placeholder for a contact path built
   later). No dead "#" links. */

import Link from "next/link"
import { PRICING } from "@/components/pricing/pricing-data"

const START = "/start"
const CONTACT = "/contact"

export default function PricingTiers() {
  const gov = PRICING.governance
  const entry = gov.annual[gov.agentTiers[0].key]

  return (
    <div className="lv-pricing-grid">
      {/* Tier 1 — Foundation (one-time, understated) */}
      <article className="lv-price-card">
        <p className="lv-price-name">Foundation</p>
        <p className="lv-price-billing">One-time</p>
        <p className="lv-price-amount">
          {PRICING.foundation.amount}
          <span className="lv-price-period"> once</span>
        </p>
        <p className="lv-price-sub">
          The one-time starting point. Build the Foundation, then govern it.
        </p>
        <p className="lv-price-desc">
          Run the guided intake and walk away with your brand&rsquo;s governed
          voice spec for one agent. A complete deliverable you own.
        </p>
        <ul className="lv-price-includes">
          <li>Guided intake with Sonic</li>
          <li>Governed voice spec for one agent</li>
          <li>Ready to deploy on your engine</li>
        </ul>
        <p className="lv-price-note">
          Custom voice and sound packs available as one-off add-ons.
        </p>
        <Link href={START} className="lv-price-cta lv-price-cta-ghost">
          Try for free
        </Link>
      </article>

      {/* Tier 2 — Governance (subscription) — HERO. Annual leads; monthly quiet. */}
      <article className="lv-price-card lv-price-card-hero">
        <span className="lv-price-badge">Recommended</span>
        <p className="lv-price-name">Governance</p>
        <p className="lv-price-billing">Subscription</p>

        <p className="lv-price-amount">
          <span className="lv-price-from">from</span> {entry}
          <span className="lv-price-period">/yr</span>
        </p>
        <p className="lv-price-monthly">or {gov.monthlyFrom}/mo billed monthly</p>
        <p className="lv-price-sub">
          Billed annually. About the cost of a one-time Foundation, with a year of
          governance on top.
        </p>
        <p className="lv-price-desc">
          Everything in Foundation, plus ongoing governance. Evals, drift
          monitoring, and re-tuning as models and engines change, across every
          agent you run.
        </p>
        <ul className="lv-price-includes">
          <li>Everything in Foundation</li>
          <li>Evals and drift monitoring</li>
          <li>Re-tuning as engines change</li>
          <li>Custom voice and sound packs included</li>
          <li>Manage multiple agents</li>
        </ul>

        <div className="lv-price-tiers">
          <p className="lv-price-tiers-label">Priced by agents governed</p>
          <ul>
            {gov.agentTiers.map((t) => (
              <li key={t.key}>
                <span>{t.label}</span>
                <span className="lv-price-tiers-amount">
                  {gov.annual[t.key]}/yr
                </span>
              </li>
            ))}
            <li className="lv-price-tiers-more">
              <span>{gov.aboveLabel}</span>
              <Link href={CONTACT}>Talk to us</Link>
            </li>
          </ul>
        </div>

        <Link href={START} className="lv-price-cta lv-price-cta-primary">
          Try for free
        </Link>
      </article>

      {/* Tier 3 — Enterprise (custom, quiet) */}
      <article className="lv-price-card">
        <p className="lv-price-name">Enterprise</p>
        <p className="lv-price-billing">Custom</p>
        <p className="lv-price-amount">{PRICING.enterprise.amount}</p>
        <p className="lv-price-desc">
          A hands-on engagement. We codify your brand across a large agent fleet
          and govern it under a recurring contract. It starts with a paid pilot.
        </p>
        <ul className="lv-price-includes">
          <li>Brand codified across a large fleet</li>
          <li>Paid diagnostic and pilot</li>
          <li>Recurring governance contract</li>
          <li>Hands-on, bespoke onboarding</li>
        </ul>
        <Link href={CONTACT} className="lv-price-cta lv-price-cta-ghost">
          Talk to us
        </Link>
      </article>
    </div>
  )
}
