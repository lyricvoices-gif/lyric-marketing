/* Timbre — placeholder.
   The Timbre product page will be built in a future pass; this stub
   keeps the nav link from 404'ing in the meantime. */

import Link from "next/link"

export const metadata = {
  title: "Timbre — Lyric",
  description: "An ongoing publication on voice in the age of AI.",
}

export default function TimbrePage() {
  return (
    <main className="lv-notes-stub">
      <div className="lv-notes-stub-inner">
        <p className="lv-notes-stub-eyebrow">Timbre</p>
        <h1>
          The Timbre page is <em>on the way.</em>
        </h1>
        <p>
          Timbre is in active development. The product page will live here
          when it ships.
        </p>
        <p className="lv-notes-stub-back">
          <Link href="/">&larr; Back to home</Link>
        </p>
      </div>
    </main>
  )
}
