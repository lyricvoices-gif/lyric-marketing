/* Score visual — a slow breathing gold orb (voice as presence) paired
   with a horizontal credit-line strip beneath it that names the
   performance metadata Score produces from every artist session.

   The earlier passes tried a literal waveform (hand-coded, then
   wavesurfer.js, then the ElevenLabs UI Waveform component fed by
   Morgan's real audio); none of them landed as elegant, and a moving
   cursor over non-playing audio was visually dishonest. The orb is
   the right metaphor for voice as presence, and the metadata reads
   below it as a museum-placard credit line rather than the previous
   floating top-left card, which felt orphaned next to a centered orb.

   This is a pure CSS visual now. No audio file is loaded, no Web Audio
   API decode, no canvas rendering. The component is server-renderable
   but stays under the products/ directory alongside CallioVisual for
   layout symmetry. */

export default function ScoreVisual() {
  return (
    <div className="lv-pillar-visual lv-pillar-visual-score">
      <div className="lv-pillar-bg lv-pillar-bg-score" aria-hidden="true" />

      <div className="lv-score-stage" aria-hidden="true">
        <div className="lv-score-orb" />

        <dl className="lv-score-metadata">
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
