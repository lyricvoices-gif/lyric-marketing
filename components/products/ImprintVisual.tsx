/* Imprint visual — the Lyric mobile app on the shared dark stage.

   Two CSS-built phone mockups: the front phone shows the Edition 01
   roster screen (the five voices with their identity dots), the back
   phone shows a live session screen for Atlas with a breathing
   waveform and emotional tags. Both are recreated from the mobile app
   designs in CSS rather than bitmap screenshots so the panel stays
   asset-light and color-true to the brand palette; the phone frames
   are plain rounded containers, so real app screenshots can drop into
   .lv-phone-screen later without touching the composition.

   The stage ground matches Score's and Opus's dark panels so the three
   pillar visuals read as one family. */

const ROSTER = [
  { name: "Atlas", role: "Considered, conversational", color: "#7A9B82" },
  { name: "Hex", role: "Warm, declarative", color: "#E0834A" },
  { name: "Morgan", role: "Editorial, narrative", color: "#F3D171" },
  { name: "Nova", role: "Bright, ambient", color: "#B5C19E" },
  { name: "Riven", role: "Lower register, deliberate", color: "#B5634D" },
] as const

/* Static bar heights for the session waveform — an irregular contour
   reads as speech; the breathe animation in CSS does the motion. */
const WAVE = [38, 62, 88, 54, 72, 95, 60, 80, 44, 68, 90, 52, 74, 40]

export default function ImprintVisual() {
  return (
    <div className="lv-pillar-visual lv-pillar-visual-imprint">
      <div className="lv-pillar-bg lv-pillar-bg-imprint" aria-hidden="true" />

      <div className="lv-imprint-phones" aria-hidden="true">
        {/* Back phone — Atlas session screen */}
        <div className="lv-phone lv-phone-back">
          <span className="lv-phone-notch" />
          <div className="lv-phone-screen">
            <p className="lv-phone-kicker">Now directing</p>
            <p className="lv-phone-voice-name">Atlas</p>
            <p className="lv-phone-voice-role">Considered, conversational</p>
            <div className="lv-phone-wave">
              {WAVE.map((h, i) => (
                <span
                  key={i}
                  className="lv-phone-wave-bar"
                  style={{
                    ["--h" as string]: `${h}%`,
                    ["--d" as string]: `${i * 0.12}s`,
                  }}
                />
              ))}
            </div>
            <div className="lv-phone-chips">
              <span className="lv-phone-chip">Considered</span>
              <span className="lv-phone-chip">Warm</span>
              <span className="lv-phone-chip">Take 03</span>
            </div>
          </div>
        </div>

        {/* Front phone — Edition 01 roster screen */}
        <div className="lv-phone lv-phone-front">
          <span className="lv-phone-notch" />
          <div className="lv-phone-screen">
            <div className="lv-phone-screen-head">
              <span className="lv-phone-wordmark">lyric</span>
              <span className="lv-phone-screen-label">Edition 01</span>
            </div>
            <ul className="lv-phone-roster">
              {ROSTER.map((voice, i) => (
                <li
                  key={voice.name}
                  className="lv-phone-row"
                  style={{
                    // Staggered so the dots ripple as a wave, not in lockstep.
                    ["--breath-delay" as string]: `${i * 0.48}s`,
                  }}
                >
                  <span
                    className="lv-phone-row-dot"
                    style={{ background: voice.color }}
                  />
                  <span className="lv-phone-row-text">
                    <span className="lv-phone-row-name">{voice.name}</span>
                    <span className="lv-phone-row-role">{voice.role}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="lv-phone-tabbar">
              <span className="lv-phone-tab is-active">Roster</span>
              <span className="lv-phone-tab">Sessions</span>
              <span className="lv-phone-tab">Library</span>
            </div>
          </div>
        </div>
      </div>

      <p className="lv-imprint-caption" aria-hidden="true">
        Edition 01 · Mobile
      </p>
    </div>
  )
}
