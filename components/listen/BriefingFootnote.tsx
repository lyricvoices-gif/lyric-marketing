"use client"

/* Briefing footnote — small italic line beneath the artist roster
   that points to The Lyric Briefing as the place where these voices
   work daily. Demoted from the previous build's prominent lead
   player; here it's a quiet contextual cue with an inline play
   affordance for visitors who want to hear it. */

import {
  useAudioPlayer,
  useTrackState,
} from "@/components/audio/AudioPlayerProvider"
import { briefingTrack } from "./data"

export default function BriefingFootnote() {
  const { isActive, isPlaying, toggle } = useTrackState(briefingTrack)
  const { currentTime, duration } = useAudioPlayer()

  const progress =
    isActive && duration > 0
      ? Math.min(100, (currentTime / duration) * 100)
      : 0

  return (
    <p className="lv-briefing-footnote">
      <em>Hear them work daily on </em>
      <button
        type="button"
        className="lv-briefing-footnote-link"
        onClick={toggle}
        aria-label={
          isPlaying
            ? "Pause The Lyric Briefing"
            : "Play The Lyric Briefing"
        }
        aria-pressed={isPlaying}
        data-active={isActive}
      >
        <span
          className="lv-briefing-footnote-dot"
          aria-hidden="true"
          style={{ background: briefingTrack.voiceColor }}
        >
          {isPlaying ? <PauseGlyph /> : <PlayGlyph />}
        </span>
        <em className="lv-briefing-footnote-label">The Lyric Briefing</em>
        <span
          className="lv-briefing-footnote-line"
          aria-hidden="true"
        >
          <span
            className="lv-briefing-footnote-line-fill"
            style={{ width: `${progress}%` }}
          />
        </span>
      </button>
      <em>.</em>
    </p>
  )
}

function PlayGlyph() {
  return (
    <svg width="5" height="7" viewBox="0 0 5 7" fill="none" aria-hidden="true">
      <path d="M0 0L5 3.5L0 7V0Z" fill="currentColor" />
    </svg>
  )
}

function PauseGlyph() {
  return (
    <svg width="5" height="7" viewBox="0 0 5 7" fill="none" aria-hidden="true">
      <rect x="0" y="0" width="1.5" height="7" fill="currentColor" />
      <rect x="3.5" y="0" width="1.5" height="7" fill="currentColor" />
    </svg>
  )
}
