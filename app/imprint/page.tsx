/* Imprint — placeholder.
   The Imprint product page will be built in a future pass. The Listen
   section's brand and artist redirects, and the Products dropdown in
   the nav, both link here; this stub keeps those from 404'ing. */

import Link from "next/link"

export const metadata = {
  title: "Imprint — Lyric",
  description: "An ongoing publication on voice in the age of AI.",
}

export default function ImprintPage() {
  return (
    <main className="lv-notes-stub">
      <div className="lv-notes-stub-inner">
        <p className="lv-notes-stub-eyebrow">Imprint</p>
        <h1>
          The Imprint page is <em>on the way.</em>
        </h1>
        <p>
          Imprint is the home of the Lyric voice roster. The dedicated page
          will surface licensing for brands and partnership for artists when
          it ships.
        </p>
        <p className="lv-notes-stub-back">
          <Link href="/">&larr; Back to home</Link>
        </p>
      </div>
    </main>
  )
}
