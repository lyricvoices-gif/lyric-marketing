# Voice Output Acoustic QA

Status: adopted for all produced voice output. Reference implementation:
`scripts/generate-fs-demo-call.mjs` in this repo. **Owed: port into the
callio voice adapter's realization layer** (the adapter renders
governance prompt and realization side by side; these rules belong to
the realization half). The callio repo is outside this session's scope,
so this document is the portable spec for that port.

## Why

Separately generated TTS takes drift acoustically even with identical
voice settings. Content checks (STT round-trips) do not catch this: a
take can transcribe perfectly and still land at the wrong pitch or with
erratic prosody. The failure was heard in production review on
2026-07-28: a short line rendered in isolation carried a ~96 Hz pitch
interquartile range against ~25-40 Hz for every neighboring take, an
audible seam at the turn boundary. Short lines with no context are the
highest-risk case.

## Rules

1. Prosody conditioning, always. Every TTS request for a multi-turn
   piece carries the same speaker's surrounding lines as
   `previous_text` / `next_text`. No line is rendered in isolation.

2. Acoustic gate on every fresh take. Measure median f0 and
   interquartile range (autocorrelation on decoded PCM; 120-350 Hz
   band; 40 ms frames, 20 ms hop; correlation gate 0.6; energy-gated
   silence). A take FAILS when either:
   - IQR > 65 Hz (erratic prosody), or
   - median deviates > 12% from the speaker's reference.

3. Per-speaker reference from approved takes. The reference median is
   seeded from already-approved takes of the same speaker in the same
   piece, and extended with each accepted fresh take. No fixed
   per-voice constants; the reference is the piece's own approved
   sound.

4. Retry, best-of, loud failure. A failing take regenerates up to 3
   attempts; the best-scoring take (IQR + absolute deviation) wins. If
   none pass, the run WARNS loudly and the take must not ship without a
   human listen.

5. Approved takes are immutable. Once a take is approved by ear it is
   reused byte-for-byte (`reuseFile`); revisions re-render only the
   changed lines. Approved takes are never regenerated as a side
   effect, because TTS is non-deterministic.

6. Content check stays. STT round-trip of every fresh take and of the
   final stitch remains required; acoustics complement it, they do not
   replace it.

7. Report ships with the audio. Every stitched output carries a QA
   report (per-take median f0, IQR, voiced-frame count, per-speaker
   cross-take spread) in its provenance manifest.

## Thresholds

| Check | Threshold | Note |
|---|---|---|
| Take IQR | <= 65 Hz | erratic-prosody gate |
| Median deviation vs speaker reference | <= 12% | cross-take consistency |
| Retries | 3 | best take wins; WARN if none pass |

Thresholds were set from the 2026-07-28 measurements (healthy takes:
IQR 25-40 Hz, cross-take median spread under ~10%) and should be
revisited once the adapter applies them across more voices.

## Port notes for the callio voice adapter

- These rules live in the realization layer, next to voice IDs and
  acoustic parameters — never in the governance prompt.
- The gate wraps the adapter's render call; the per-speaker reference
  maps naturally to the produced-batch baseline for each voice.
- The QA report belongs in the same provenance record as the batch
  manifest, so every produced asset carries its measurements.
