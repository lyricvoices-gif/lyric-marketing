/* Per-voice color palette + sample track definitions for the Listen
   section.

   The existing Editions page uses a single gold accent across every
   voice card. The Listen section separates voices visually — one
   color per voice — so the persona strip reads as a family of
   distinct identities, and the persistent playback bar can attribute
   the currently-playing track at a glance.

   Colors are tuned to sit on the warm off-white #FFF8EC ground
   without competing with the brand's gold/sage/olive system:

     Morgan — gold #F3D171 (anchor warmth, brand primary accent)
     Nova   — sage #B5C19E (calm presence, paired with brand sage)
     Atlas  — muted teal-sage #7A9B82 (steady, educational clarity)
     Riven  — warm rust #B5634D (narrative depth)
     Hex    — coral #E0834A (creator edge)

   Editions page sample URLs are the canonical source-of-truth for
   each voice's signature clip. Local /public files are used where
   available; the others fall back to the public R2 CDN that powers
   the live Editions page so a visitor hears the same first impression
   on the home page as on /editions. */

import type { Track } from "@/components/audio/AudioPlayerProvider"

export const VOICE_COLORS = {
  morgan: "#F3D171",
  nova:   "#B5C19E",
  atlas:  "#7A9B82",
  riven:  "#B5634D",
  hex:    "#E0834A",
} as const

export type VoiceId = keyof typeof VOICE_COLORS

/* The lead Briefing track. Hardcoded for phase 1 — phase 2 will swap
   src/title/date for a dynamic feed pull, but the surface and the
   Track contract stay the same.

   TODO(phase 2): wire to dynamic feed of latest Briefing episode. The
   marketing site currently has no API surface; the simplest path is a
   build-time fetch from the Substack RSS or a small API route that
   proxies the most recent episode's audio + title + publish date. */
export const briefingTrack: Track & {
  date: string
  durationLabel: string
} = {
  id: "briefing-latest",
  src: "/The-Story-of-Edition-01.wav",
  voiceName: "Morgan",
  title: "The morning the algorithm blinked.",
  voiceColor: VOICE_COLORS.morgan,
  type: "briefing",
  date: "May 6, 2026",
  durationLabel: "4 min listen",
}

/* Artist roster — one entry per Edition 01 voice, paired with the
   real voice artist whose performance powers it. The artist names
   below are the cleared public attributions (confirmed by Lyric on
   the brief that introduced this section). If a future artist's
   attribution is not yet cleared, set artist to undefined and the
   row will omit the "Voiced by" line entirely rather than render a
   placeholder.

   The beat descriptors carry the editorial framing — what each voice
   is actually used for, not adjective-laden self-description. */
export type Artist = {
  id: VoiceId
  voiceName: string
  /* Real voice artist name. Optional — omitted rows render without
     the "Voiced by" line until attribution is cleared. */
  artist?: string
  beat: string
  durationLabel: string
  src: string
  color: string
}

export const artists: Artist[] = [
  {
    id: "morgan",
    voiceName: "Morgan",
    artist: "Hana",
    beat: "Editorial authority. Reads The Lyric Briefing every weekday.",
    durationLabel: "0:24",
    src: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Morgan%20(sample).wav",
    color: VOICE_COLORS.morgan,
  },
  {
    id: "nova",
    voiceName: "Nova",
    artist: "Riot",
    beat: "Emotional presence. Carries long-form features and interviews.",
    durationLabel: "0:22",
    src: "/nova-encouraging.wav",
    color: VOICE_COLORS.nova,
  },
  {
    id: "atlas",
    voiceName: "Atlas",
    artist: "Christian",
    beat: "Educational clarity. Explains complex ideas with calm precision.",
    durationLabel: "0:21",
    src: "/atlas-supportive.wav",
    color: VOICE_COLORS.atlas,
  },
  {
    id: "hex",
    voiceName: "Hex",
    artist: "Tiff",
    beat: "Creator expression. Voices culture, platforms, and the creator economy.",
    durationLabel: "0:19",
    src: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Hex%20(sample).wav",
    color: VOICE_COLORS.hex,
  },
  {
    id: "riven",
    voiceName: "Riven",
    artist: "Nora",
    beat: "Narrative storytelling. Sustains long-form pieces and profiles.",
    durationLabel: "0:26",
    src: "https://pub-af25e52138fa41559b794877a8400712.r2.dev/Voices/edition01/Riven%20(sample).wav",
    color: VOICE_COLORS.riven,
  },
]

/* Adapt an Artist into a playable Track for the audio context. The
   bar's "now playing" line shows the voice name + the artist (if
   cleared) so the credit reads through to the persistent surface. */
export function artistToTrack(a: Artist): Track {
  return {
    id: `voice-${a.id}`,
    src: a.src,
    voiceName: a.voiceName,
    title: a.artist ? `Voiced by ${a.artist}` : a.beat,
    voiceColor: a.color,
    durationLabel: a.durationLabel,
    type: "voice-sample",
  }
}
