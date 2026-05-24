/* Opus — placeholder.
   Opus is the creative environment where voice work gets made. It
   houses two modes — Direction (shape how the voice should perform)
   and Composer (produce the voice work itself). A full product page
   will follow; this stub keeps the new homepage Products section
   linking somewhere real until then. */

import Link from "next/link"

export const metadata = {
  title: "Opus — Lyric",
  description:
    "Opus is where voice work gets made. Direction and Composer in one environment. Shape how the voice performs, then produce the work.",
}

export default function OpusPage() {
  return (
    <main className="lv-notes-stub">
      <div className="lv-notes-stub-inner">
        <p className="lv-notes-stub-eyebrow">Opus</p>
        <h1>
          Opus is <em>on the way.</em>
        </h1>
        <p>
          Opus is the creative environment where voice work gets made.
          Direction and Composer in one environment. Shape how the voice
          performs, then produce the work. The full product page will live
          here when it ships.
        </p>
        <p className="lv-notes-stub-back">
          <Link href="/">&larr; Back to home</Link>
        </p>
      </div>
    </main>
  )
}
