"use client"

/* Score visual — Morgan's actual voice waveform from the Lyric imprint,
   rendered by the ElevenLabs UI Waveform component (installed at
   components/ui/waveform.tsx). The component is a canvas-based renderer
   that takes a pre-computed amplitude array. We compute that array
   client-side by fetching /audio/morgan-sample.wav, decoding it with
   the Web Audio API, and reducing each chunk of samples to its mean
   absolute amplitude. The audio is never connected to a destination
   and the AudioContext is closed once decoding completes, so no sound
   ever plays under any circumstances.

   A custom gold cursor overlays the canvas and traverses left to right
   on a 10s linear loop, fading out at the right edge and fading back
   in at the left so the loop is seamless. Reduced-motion users see the
   cursor parked at a fixed position with no animation.

   The waveform component renders at ElevenLabs' reference sizing
   (height: 128, barWidth: 3, barGap: 2, barRadius: 2). Only the colors
   change to match Lyric's daylight token set. */

import { useEffect, useState } from "react"
import { Waveform } from "@/components/ui/waveform"

const BARS = 400

async function loadWaveformData(url: string, bars: number): Promise<number[]> {
  const response = await fetch(url)
  const arrayBuffer = await response.arrayBuffer()
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext
  const audioContext = new Ctor()
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
  const channelData = audioBuffer.getChannelData(0)
  const samplesPerBar = Math.floor(channelData.length / bars)
  const raw: number[] = []
  let peak = 0
  /* Peak amplitude per chunk, not the mean. Mean smooths out the dynamic
     range and produces the flat, barcode-like silhouette the previous
     pass had. Peak captures the loudest sample in each window, which is
     how desktop audio editors render waveforms and what reads as voice
     data on first glance. */
  for (let i = 0; i < bars; i++) {
    const start = i * samplesPerBar
    let localPeak = 0
    for (let j = 0; j < samplesPerBar; j++) {
      const v = Math.abs(channelData[start + j] || 0)
      if (v > localPeak) localPeak = v
    }
    if (localPeak > peak) peak = localPeak
    raw.push(localPeak)
  }
  // The audio buffer is GC'd with the context. The buffer was never
  // connected to a destination — no sound played at any point.
  void audioContext.close()
  /* Normalize to [0, 1] and apply a square-root compression so the
     quieter bars stretch up and the louder bars stay near the top.
     Without compression the visual reads thinly because most of voice
     audio sits in the lower amplitude range; with sqrt the silhouette
     fills out across the strip while still preserving real peaks. */
  if (peak <= 0) return raw
  return raw.map((v) => Math.sqrt(v / peak))
}

export default function ScoreVisual() {
  const [data, setData] = useState<number[]>([])

  useEffect(() => {
    let cancelled = false
    loadWaveformData("/audio/morgan-sample.wav", BARS)
      .then((result) => {
        if (!cancelled) setData(result)
      })
      .catch((err) => {
        // Decoding failures (e.g. in private browsing) leave the waveform
        // empty — the component renders an empty canvas, which is the
        // graceful degradation. Log for awareness but don't surface.
        console.warn("Score waveform: audio decode failed.", err)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="lv-pillar-visual lv-pillar-visual-score">
      <div className="lv-pillar-bg lv-pillar-bg-score" aria-hidden="true" />

      <div className="lv-score-wave-track" aria-hidden="true">
        <div className="lv-score-wave-host">
          <Waveform
            data={data}
            height={100}
            barColor="rgba(255, 248, 236, 0.7)"
            barWidth={3}
            barGap={2}
            barRadius={2}
            fadeEdges
            fadeWidth={36}
          />
          {/* Gold "played" overlay — identical waveform rendered in the
              brand gold, clip-path animated to reveal left-to-right on
              a slow loop. The leading edge of the gold-to-cream
              boundary is the visual "now" indicator. No separate cursor
              line: a moving vertical bar would only be honest if audio
              were actually playing at that position, which it isn't. */}
          <div className="lv-score-wave-progress">
            <Waveform
              data={data}
              height={100}
              barColor="#F3D171"
              barWidth={3}
              barGap={2}
              barRadius={2}
              fadeEdges
              fadeWidth={36}
            />
          </div>
        </div>
      </div>

      <div className="lv-score-datasheet" aria-hidden="true">
        <p className="lv-score-datasheet-label">Performance metadata</p>
        <dl className="lv-score-datasheet-list">
          <div>
            <dt>Voice</dt>
            <dd>Morgan</dd>
          </div>
          <div>
            <dt>Take</dt>
            <dd>03 / 12</dd>
          </div>
          <div>
            <dt>Emotion</dt>
            <dd>Pensive</dd>
          </div>
          <div>
            <dt>Duration</dt>
            <dd>4.218s</dd>
          </div>
          <div>
            <dt>Consent</dt>
            <dd>On file</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
