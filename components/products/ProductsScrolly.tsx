"use client"

/* Scrollytelling pillars — one pinned frame, three movements.

   Desktop: the whole composition pins for ~3 viewport-heights of scroll.
   The left rail lists all three pillars (index + name always visible, a
   gold progress hairline tracking scroll); the active pillar's body and
   CTA expand while the inactive ones dim. The right stage holds the
   three pillar visuals stacked, cross-fading as the reader scrolls
   through the segments — three pillars literally sharing one frame,
   which is the section's whole argument.

   Mobile (<900px): no pinning. The stage is hidden and each rail item
   renders its own visual above its copy, so the section falls back to
   the familiar stacked visual-then-copy rhythm. The visuals are
   rendered twice (stage + per-item) but only one set is ever displayed;
   CallioVisual's animation is IntersectionObserver-gated, so the
   display:none copy never starts its state machine.

   Scroll progress drives two things: the --sp-progress custom property
   (consumed by the rail's gold fill) is written straight to the DOM
   every frame, while the active index goes through React state only
   when it actually changes, so scrolling doesn't re-render on every
   tick. */

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import ImprintVisual from "@/components/products/ImprintVisual"
import CallioVisual from "@/components/products/CallioVisual"
import ScoreVisual from "@/components/products/ScoreVisual"

type Pillar = {
  id: "imprint" | "score" | "opus"
  index: string
  name: string
  body: React.ReactNode
  href: string
  cta: string
  /* When true, the CTA renders as a static "Coming soon" marker
     instead of an active link — used while a pillar's destination
     page is still being built. */
  comingSoon?: boolean
  Visual: () => React.ReactNode
}

const PILLARS: Pillar[] = [
  {
    id: "imprint",
    index: "01",
    name: "Imprint",
    body: (
      <>
        A curated roster of voice identities, built with real artists who
        retain their rights and shape how their voices perform. The
        foundation of everything Lyric does.
      </>
    ),
    href: "/imprint",
    cta: "Explore the Imprint",
    Visual: ImprintVisual,
  },
  {
    id: "score",
    index: "02",
    name: "Score",
    body: (
      <>
        Performance-grade voice datasets for AI labs and researchers.
        Built from real artist sessions on the imprint. Consented.
        Attributed. Defensibly sourced.
      </>
    ),
    href: "/score",
    cta: "Coming soon",
    comingSoon: true,
    Visual: ScoreVisual,
  },
  {
    id: "opus",
    index: "03",
    name: "Callio",
    body: (
      <>
        Where voice work is directed, not just generated. Two modes in
        one environment: Direction shapes how the voice performs,
        Composer produces the work.
      </>
    ),
    href: "/callio",
    cta: "Explore Callio",
    Visual: CallioVisual,
  },
]

export default function ProductsScrolly() {
  const containerRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const travel = el.offsetHeight - window.innerHeight
      const progress =
        travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0
      el.style.setProperty("--sp-progress", progress.toFixed(4))
      const next = Math.min(
        PILLARS.length - 1,
        Math.floor(progress * PILLARS.length),
      )
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="lv-sp" ref={containerRef}>
      <div className="lv-sp-sticky">
        <div className="lv-sp-grid">
          <div className="lv-sp-rail">
            <div className="lv-sp-progress" aria-hidden="true">
              <span className="lv-sp-progress-fill" />
            </div>
            {PILLARS.map((p, i) => {
              const Visual = p.Visual
              return (
                <article
                  key={p.id}
                  className={`lv-sp-item${i === active ? " is-active" : ""}`}
                >
                  <div className="lv-sp-item-visual" aria-hidden="true">
                    <Visual />
                  </div>
                  <p className="lv-sp-item-index">{p.index} · Pillar</p>
                  <h3 className="lv-sp-item-name">{p.name}</h3>
                  <div className="lv-sp-item-detail">
                    <div className="lv-sp-item-detail-inner">
                      <p className="lv-sp-item-body">{p.body}</p>
                      {p.comingSoon ? (
                        <span
                          className="lv-link-cta lv-link-cta-disabled"
                          aria-disabled="true"
                        >
                          {p.cta}
                        </span>
                      ) : (
                        <Link href={p.href} className="lv-link-cta">
                          {p.cta} <span aria-hidden="true">&rarr;</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="lv-sp-stage" aria-hidden="true">
            {PILLARS.map((p, i) => {
              const Visual = p.Visual
              return (
                <div
                  key={p.id}
                  className={`lv-sp-frame${i === active ? " is-active" : ""}`}
                >
                  <Visual />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
