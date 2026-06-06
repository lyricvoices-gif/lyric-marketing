/* Dark gradient hero comparison — three options stacked full-viewport
   so the actual hero scale and proportion are visible. Temporary route;
   delete after a direction is picked.

   A — deep olive top, slightly lighter olive bottom (subtle, brand-matched)
   B — near-black top fading to olive (most dramatic transition)
   C — warm amber haze at top, pure olive baseline (olive with a hint of
       gold warmth without being light) */

export const metadata = {
  title: "Dark gradient comparison — Lyric",
}

type Option = {
  id: string
  label: string
  description: string
  background: string
}

const OPTIONS: Option[] = [
  {
    id: "a",
    label: "Option A — Olive top → softer olive bottom",
    description: "Deep olive across, with the baseline a hair lighter. Subtle, matches the existing dark sections (Stoute pull-quote, closing line).",
    background:
      "linear-gradient(180deg, var(--olive) 0%, color-mix(in srgb, var(--olive) 88%, #fff 12%) 100%)",
  },
  {
    id: "b",
    label: "Option B — Near-black top → olive bottom",
    description: "Deeper at the top, transitions to mid-tone olive. The most dramatic of the three; reads as the strongest contrast against the cream sections below.",
    background:
      "linear-gradient(180deg, #2b2a25 0%, var(--olive) 100%)",
  },
  {
    id: "c",
    label: "Option C — Amber-warm olive top → pure olive bottom",
    description: "Subtle gold-warm haze at the top, fading into pure olive. A touch of warmth without lightness; mirrors the warm Option A from the previous round, but on a dark ground.",
    background:
      "linear-gradient(180deg, color-mix(in srgb, var(--olive) 88%, var(--gold) 12%) 0%, var(--olive) 100%)",
  },
]

export default function GradientPreviewPage() {
  return (
    <main className="lv-gradient-preview lv-gradient-preview-dark">
      {OPTIONS.map(opt => (
        <section
          key={opt.id}
          className="lv-gradient-preview-hero"
          style={{ background: opt.background }}
        >
          <div className="lv-gradient-preview-label">
            <p className="lv-gradient-preview-label-name">{opt.label}</p>
            <p className="lv-gradient-preview-label-desc">{opt.description}</p>
          </div>

          <div className="lv-gradient-preview-statement">
            <h1>
              Voice <em>artistry</em> in the age of AI.
            </h1>
            <p className="lv-gradient-preview-supporting">
              Over 75% of brands are searching for a better approach to
              voice AI. We&apos;re building it.
            </p>
          </div>
        </section>
      ))}
    </main>
  )
}
