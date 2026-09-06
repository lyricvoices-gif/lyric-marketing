/* AuthorityQuote — an institutional proof point, not a testimonial.

   A full-width editorial pause: a cited external statement (regulator,
   standard, ruling) set in the display face at reading measure, with a
   subordinate mono attribution row that links to the primary source, and an
   optional Lyric-owned closing line beneath. Left-aligned on the home grid so
   it reads as a citation, not a centered customer quote.

   Renders statically on purpose: no entrance motion, so the quotation is
   fully visible with JavaScript disabled, under prefers-reduced-motion, and
   before any observer fires. Styles: lv-authq-* in globals.css. */

import type { ReactNode } from "react"

type Props = {
  quote: string
  attribution: string
  sourceLabel: string
  sourceUrl: string
  eyebrow?: string
  supporting?: ReactNode
  /* "cream" (default) sits on --bg-light; "olive" inverts onto the dark
     olive ground used by the About page's reference section. */
  variant?: "cream" | "olive"
  /* Centered composition (default is left-aligned on the grid). */
  align?: "left" | "center"
  /* embedded: render only the figure (no section, container, or eyebrow) so
     the quote can sit inside an existing section. */
  embedded?: boolean
  className?: string
  id?: string
}

export default function AuthorityQuote({
  quote,
  attribution,
  sourceLabel,
  sourceUrl,
  eyebrow,
  supporting,
  variant = "cream",
  align = "left",
  embedded = false,
  className,
  id,
}: Props) {
  const external = /^https?:\/\//.test(sourceUrl)
  const modeClass = [`lv-authq-${variant}`, align === "center" ? "lv-authq-center" : ""]
    .filter(Boolean)
    .join(" ")

  const figure = (
        <figure className={["lv-authq-figure", embedded ? modeClass : "", embedded ? className : ""].filter(Boolean).join(" ")}>
          <blockquote className="lv-authq-quote" cite={sourceUrl} id={id ? `${id}-quote` : undefined}>
            {/* The typographic quotation marks are decorative: the blockquote
                already conveys quotation, so they are hidden from AT. */}
            <p>
              <span className="lv-authq-mark lv-authq-mark-open" aria-hidden="true">“</span>
              {quote}
              <span className="lv-authq-mark" aria-hidden="true">”</span>
            </p>
          </blockquote>

          <figcaption className="lv-authq-attribution">
            <cite className="lv-authq-source">{attribution}</cite>
            <span className="lv-authq-divider" aria-hidden="true" />
            <a
              className="lv-authq-link"
              href={sourceUrl}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {sourceLabel}
              {external ? (
                <>
                  <span className="lv-authq-sr"> (opens in a new tab)</span>
                  <span className="lv-authq-arrow" aria-hidden="true">↗</span>
                </>
              ) : null}
            </a>
          </figcaption>
          {supporting ? <p className="lv-authq-supporting">{supporting}</p> : null}
        </figure>
  )

  if (embedded) return figure

  const sectionClass = ["lv-authq", modeClass, className].filter(Boolean).join(" ")
  return (
    <section className={sectionClass} id={id} aria-labelledby={id ? `${id}-quote` : undefined}>
      <div className="lv-authq-inner">
        {eyebrow ? (
          <div className="lv-philosophy-eyebrow lv-authq-eyebrow">
            <span className="lv-eyebrow-dot" aria-hidden="true" />
            <span>{eyebrow}</span>
          </div>
        ) : null}
        {figure}
      </div>
    </section>
  )
}
