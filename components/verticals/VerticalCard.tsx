/* Reusable verticals card: a visual area (the illustrative mockup), then a
   small-caps label, a short serif headline, and restrained body. New verticals
   are added by passing a new entry to VerticalsSection; the card layout does
   not change. A card can be marked comingSoon, which adds a badge beside the
   label and mutes the mockup to signal it is a preview, not live. */

import type React from "react"

export default function VerticalCard({
  label,
  headline,
  body,
  comingSoon = false,
  children,
}: {
  label: string
  headline: string
  body: string
  comingSoon?: boolean
  children: React.ReactNode
}) {
  return (
    <article className={`lv-vert-card${comingSoon ? " is-coming-soon" : ""}`}>
      <div className="lv-vert-card-visual" aria-hidden="true">
        {children}
      </div>
      <div className="lv-vert-card-labelrow">
        <p className="lv-vert-card-label">{label}</p>
        {comingSoon && <span className="lv-vert-card-soon">Coming soon</span>}
      </div>
      <h3 className="lv-vert-card-headline">{headline}</h3>
      <p className="lv-vert-card-body">{body}</p>
    </article>
  )
}
