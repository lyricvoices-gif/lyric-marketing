"use client"

/* One row in the editorial index.

   Layout (desktop, single horizontal sweep):

     accent │ 01    Morgan                                     0:24  ●
                    Voiced by Hana
                    Editorial authority. Reads The Lyric Briefing…

   Voice name is the row's typographic anchor — set large in display
   type. The artist byline sits directly beneath the voice name (the
   prominence the attribution deserves), with the roman beat descriptor
   below it. Controls (duration + filled olive play button) anchor the
   right edge of the row. The vertical color accent on the left ties
   the row to the voice's identity. */

import { useTrackState } from "@/components/audio/AudioPlayerProvider"
import { artistToTrack, type Artist } from "./data"

export default function ArtistRow({
  artist,
  index,
}: {
  artist: Artist
  index: number
}) {
  const track = artistToTrack(artist)
  const { isActive, isPlaying, toggle } = useTrackState(track)

  return (
    <div
      className="lv-artist-row"
      data-active={isActive}
      data-playing={isPlaying}
      style={{ ["--voice" as string]: artist.color } as React.CSSProperties}
    >
      <span className="lv-artist-row-accent" aria-hidden="true" />

      <span className="lv-artist-row-num" aria-hidden="true">
        {String(index).padStart(2, "0")}
      </span>

      <div className="lv-artist-row-meta">
        <h3 className="lv-artist-row-name">{artist.voiceName}</h3>
        {artist.artist && (
          <p className="lv-artist-row-credit">Voiced by {artist.artist}</p>
        )}
        <p className="lv-artist-row-beat">{artist.beat}</p>
      </div>

      <div className="lv-artist-row-controls">
        <span className="lv-artist-row-duration">{artist.durationLabel}</span>
        <button
          type="button"
          className="lv-artist-row-play"
          onClick={toggle}
          aria-label={
            isPlaying
              ? `Pause ${artist.voiceName} sample`
              : `Play ${artist.voiceName} sample`
          }
          aria-pressed={isPlaying}
        >
          {isPlaying ? <PauseGlyph /> : <PlayGlyph />}
        </button>
      </div>
    </div>
  )
}

function PlayGlyph() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
      <path d="M0 0L14 8L0 16V0Z" fill="currentColor" />
    </svg>
  )
}

function PauseGlyph() {
  return (
    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" aria-hidden="true">
      <rect x="0" y="0" width="3" height="16" fill="currentColor" />
      <rect x="9" y="0" width="3" height="16" fill="currentColor" />
    </svg>
  )
}
