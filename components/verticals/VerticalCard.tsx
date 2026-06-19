/* Reusable verticals card: a visual area (the illustrative mockup), then a
   small-caps label, a short serif headline, and restrained body. New verticals
   are added by passing a new entry to VerticalsSection; the card layout does
   not change. */

import type React from "react"

export default function VerticalCard({
  label,
  headline,
  body,
  children,
}: {
  label: string
  headline: string
  body: string
  children: React.ReactNode
}) {
  return (
    <article className="lv-vert-card">
      <div className="lv-vert-card-visual" aria-hidden="true">
        {children}
      </div>
      <p className="lv-vert-card-label">{label}</p>
      <h3 className="lv-vert-card-headline">{headline}</h3>
      <p className="lv-vert-card-body">{body}</p>
    </article>
  )
}
