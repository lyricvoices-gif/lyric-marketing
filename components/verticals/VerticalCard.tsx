/* Reusable verticals card: a visual area (the illustrative mockup), then a
   small-caps eyebrow with an accent dot, a serif headline (the vertical name),
   and restrained body. The accent is passed as a CSS custom property so both
   the dot and the nested mockup's chips pick it up. Card dimensions are fixed
   in CSS so cards stay uniform inside the carousel. New verticals are added in
   VerticalsCarousel; the card does not change. */

import type React from "react"

export default function VerticalCard({
  label,
  headline,
  body,
  accent,
  children,
}: {
  label: string
  headline: string
  body: string
  accent?: string
  children: React.ReactNode
}) {
  return (
    <article
      className="lv-vert-card"
      style={accent ? ({ "--card-accent": accent } as React.CSSProperties) : undefined}
    >
      <div className="lv-vert-card-visual" aria-hidden="true">
        {children}
      </div>
      <div className="lv-vert-card-labelrow">
        <span className="lv-vert-card-dot" aria-hidden="true" />
        <p className="lv-vert-card-label">{label}</p>
      </div>
      <h3 className="lv-vert-card-headline">{headline}</h3>
      <p className="lv-vert-card-body">{body}</p>
    </article>
  )
}
