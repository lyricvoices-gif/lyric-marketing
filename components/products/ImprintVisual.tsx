/* Imprint visual — the Lyric mobile app on the shared dark stage.

   Two phone mockups carrying real screenshots of the Lyric artist app:
   the front phone shows the Profile tab (the artist's own magazine-style
   identity spread — the literal "real artist" the Imprint copy speaks to),
   the back phone shows the Home tab (the artist's morning briefing). The
   phone frames are plain rounded containers; the screenshots fill the
   screen edge to edge under a centered notch, the classic app-marketing
   "rising into frame" posture (both crop at the panel's bottom edge via
   overflow:hidden on .lv-pillar-visual).

   The stage ground matches Score's and Opus's dark panels so the three
   pillar visuals read as one family. */

export default function ImprintVisual() {
  return (
    <div className="lv-pillar-visual lv-pillar-visual-imprint">
      <div className="lv-pillar-bg lv-pillar-bg-imprint" aria-hidden="true" />

      <div className="lv-imprint-phones" aria-hidden="true">
        {/* Back phone — Home tab (morning briefing) */}
        <div className="lv-phone lv-phone-back">
          <span className="lv-phone-notch" />
          <div className="lv-phone-screen lv-phone-screen-shot">
            <img
              className="lv-phone-shot"
              src="/app-screens/home.png"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Front phone — Profile tab (artist identity spread) */}
        <div className="lv-phone lv-phone-front">
          <span className="lv-phone-notch" />
          <div className="lv-phone-screen lv-phone-screen-shot">
            <img
              className="lv-phone-shot"
              src="/app-screens/profile.png"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <p className="lv-imprint-caption" aria-hidden="true">
        Imprint mobile app
      </p>
    </div>
  )
}
