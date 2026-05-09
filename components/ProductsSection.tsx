"use client"

/* Products section — tabbed product showcase. Header centered, then a
   row of editorial-style tabs anchored to a hairline rule with a per-
   tab gold underline marking the active product, then a centered video
   stage and copy block beneath. The four products read as a
   constellation, not a path — each tab is its own portal.

   Each tab maps to a product video. Composer leads with `emotional-tag.mp4`
   (the studio composition surface video); the other three reuse existing
   ad-style vignettes as visual placeholders until product-specific
   captures are produced. Section content arrives in a staggered scroll-
   reveal cascade as the user scrolls into the band. */

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import ScrollReveal from "@/components/ScrollReveal"

type Product = {
  id: string
  name: string
  tagline: string
  description: string
  video: string
  href: string
  cta: string
}

/* Tab order matches the global nav dropdown and footer Products
   column so the imprint reads as a single canonical sequence across
   the site: Composer, Imprint, SCOR, Timbre, The Lyric Briefing. */
const PRODUCTS: Product[] = [
  {
    id: "composer",
    name: "Composer",
    tagline: "The composition surface",
    description:
      "A studio for directing voice performance — emotional tags, takes, and revisions on a single canvas. Built for teams who shape voice the way producers shape music.",
    video: "/emotional-tag.mp4",
    href: "/composer",
    cta: "Open Composer",
  },
  {
    id: "imprint",
    name: "Imprint",
    tagline: "The voice roster",
    description:
      "The home of the Lyric voice roster. Built with real artists who direct the performance, retain their rights, and earn as their voices carry forward.",
    video: "/Lets Vogue.mp4",
    href: "/imprint",
    cta: "Explore the Imprint",
  },
  {
    id: "scor",
    name: "SCOR",
    tagline: "The voice licensing layer",
    description:
      "A dataset product built from real voice actor sessions — anchor passages, directed emotional range, full performance metadata. Every dataset is defensibly sourced.",
    video: "/porsche_vignette.mp4",
    href: "/score",
    cta: "Explore SCOR",
  },
  {
    id: "timbre",
    name: "Timbre",
    tagline: "The voice direction layer",
    description:
      "The timing, emphasis, and emotional shape of a performance — exposed as controls that producers and directors can dial in. The artist stays in the room.",
    video: "/Yoga by the Sea.mp4",
    href: "/timbre",
    cta: "Explore Timbre",
  },
  {
    id: "briefing",
    name: "The Lyric Briefing",
    tagline: "Daily intelligence, narrated",
    description:
      "Every morning, Morgan narrates the day's most important AI news. Performance-grade voice AI, in production daily — proof of what the platform can do.",
    video: "/vogue_vignette.mp4",
    href: "/briefing",
    cta: "Listen to the briefing",
  },
]

export default function ProductsSection() {
  const [active, setActive] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Restart the video from the beginning whenever the tab changes so each
  // product's video plays from frame 0 instead of resuming mid-clip.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    v.play().catch(() => {})
  }, [active])

  const product = PRODUCTS[active]

  return (
    <section className="lv-products">
      {/* Section content emerges in a staggered cascade as the user scrolls
          into the products band — eyebrow first, then the headline,
          supporting copy, tabs, and finally the video stage. */}
      <div className="lv-products-header">
        <ScrollReveal>
          <div className="lv-philosophy-eyebrow">
            <span className="lv-eyebrow-dot" aria-hidden="true" />
            <span>Products</span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <h2 className="lv-products-headline">
            Five products. One <em>stance</em>.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={220}>
          <p className="lv-products-supporting">
            Each one solves a different problem in voice AI.
            <br />
            All of them stem from the same belief.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={320}>
        <div className="lv-products-tabs-wrap">
          <div
            className="lv-products-tabs"
            role="tablist"
            aria-label="Products"
          >
            {PRODUCTS.map((p, i) => (
              <button
                key={p.id}
                role="tab"
                type="button"
                aria-selected={i === active}
                aria-controls={`product-panel-${p.id}`}
                id={`product-tab-${p.id}`}
                className={`lv-products-tab${i === active ? " is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="lv-products-tab-name">{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={420}>
        <div
          className="lv-products-stage"
          role="tabpanel"
          id={`product-panel-${product.id}`}
          aria-labelledby={`product-tab-${product.id}`}
        >
          <div className="lv-products-stage-media">
            <video
              ref={videoRef}
              key={product.id}
              className="lv-products-stage-video"
              src={product.video}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
            <span className="lv-products-stage-name" aria-hidden="true">
              {product.name}
            </span>
          </div>

          <div className="lv-products-stage-copy">
            <p className="lv-products-tagline">{product.tagline}</p>
            <p className="lv-products-description">{product.description}</p>
            <Link href={product.href} className="lv-products-cta">
              {product.cta} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
