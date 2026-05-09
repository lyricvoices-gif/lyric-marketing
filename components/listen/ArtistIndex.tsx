"use client"

/* Artist index with progressive disclosure.

   Defaults to the first three voices on load. A small italic toggle
   beneath the visible rows reveals the remainder with a smooth
   grid-row + opacity transition — the height eases open with the same
   editorial cubic curve used by SmoothAnchor for the manifesto link
   in the hero, so the motion reads as part of a coherent system
   rather than a generic accordion. */

import { useState } from "react"
import ScrollReveal from "@/components/ScrollReveal"
import ArtistRow from "./ArtistRow"
import type { Artist } from "./data"

const FIRST_BATCH = 3

export default function ArtistIndex({ artists }: { artists: Artist[] }) {
  const [expanded, setExpanded] = useState(false)
  const visible = artists.slice(0, FIRST_BATCH)
  const rest = artists.slice(FIRST_BATCH)
  const hasRest = rest.length > 0

  return (
    <div className="lv-artist-index">
      {visible.map((artist, i) => (
        <ScrollReveal key={artist.id} delay={320 + i * 80}>
          <ArtistRow artist={artist} index={i + 1} />
        </ScrollReveal>
      ))}

      {hasRest && (
        <div
          className="lv-artist-index-rest"
          data-expanded={expanded}
          aria-hidden={!expanded}
        >
          <div className="lv-artist-index-rest-inner">
            {rest.map((artist, i) => (
              <ArtistRow
                key={artist.id}
                artist={artist}
                index={FIRST_BATCH + i + 1}
              />
            ))}
          </div>
        </div>
      )}

      {hasRest && (
        <button
          type="button"
          className="lv-artist-index-toggle"
          onClick={() => setExpanded(v => !v)}
          aria-expanded={expanded}
        >
          <em>
            {expanded
              ? "Show fewer voices"
              : "Explore more artists from Edition 01"}{" "}
            <span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
          </em>
        </button>
      )}
    </div>
  )
}
