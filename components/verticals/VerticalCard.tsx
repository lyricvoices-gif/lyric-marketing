/* Reusable verticals card: a visual area (the illustrative mockup), then a
   small-caps eyebrow with an accent dot, a serif headline (the vertical name),
   and restrained body. The accent is passed as a CSS custom property so both
   the dot and the nested mockup's chips pick it up. Card dimensions are fixed
   in CSS so cards stay uniform inside the carousel. New verticals are added in
   VerticalsCarousel; the card takes an optional comingSoon flag that adds a
   status badge and a subtly recessed treatment. */

import type React from "react"

export default function VerticalCard({
  label,
  headline,
  body,
  accent,
  comingSoon,
  children,
}: {
  label: string
  headline: string
  body: string
  accent?: string
  comingSoon?: boolean
  children: React.ReactNode
}) {
  return (
    <article
      className="lv-vert-card"
      data-soon={comingSoon ? "" : undefined}
      style={accent ? ({ "--card-accent": accent } as React.CSSProperties) : undefined}
    >
      <div className="lv-vert-card-visual" aria-hidden="true">
        {children}
      </div>
      <div className="lv-vert-card-labelrow">
        <span className="lv-vert-card-dot" aria-hidden="true" />
        <p className="lv-vert-card-label">{label}</p>
      </div>
      <div className="lv-vert-card-headrow">
        <h3 className="lv-vert-card-headline">{headline}</h3>
        {comingSoon && <span className="lv-vert-card-soon">Coming soon</span>}
      </div>
      <p className="lv-vert-card-body">{body}</p>
    </article>
  )
}
