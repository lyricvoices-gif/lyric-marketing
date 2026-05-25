/* Notes — the home page entry point to Lyric's editorial publication.
   A magazine-style three-up of featured pieces, set with the same
   editorial restraint as the rest of the home page. Each card is a
   portal: the home grid is read-and-decide, the audio player lives
   on the article page itself.

   Cards are equal-weight (no featured-plus-secondary asymmetry).
   The visual posture references the front page of a literary
   journal, not a SaaS blog index. */

import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"

type Note = {
  slug: string
  voice: "Morgan" | "Hex"
  voiceColor: string
  image: string
  imageAlt: string
  headline: string
  dek: string
  readMin: number
  listenMin: number
  date: string
}

/* Voice dot colors mirror the imprint palette pulled from
   lyricvoices.ai/editions and used in the Listen section. */
const MORGAN = "#F3D171"
const HEX = "#E0834A"

const notes: Note[] = [
  {
    slug: "the-artists-behind-the-voice",
    voice: "Morgan",
    voiceColor: MORGAN,
    image: "/images/notes/note-1.jpg",
    imageAlt: "Cover image for The artists behind the voice",
    headline: "The artists behind the voice.",
    dek:
      "How Lyric partners with real voice artists to shape the AI voices that carry their craft forward. The story of the imprint, told by the people building it.",
    readMin: 6,
    listenMin: 5,
    date: "April 5",
  },
  {
    slug: "edition-01",
    voice: "Hex",
    voiceColor: HEX,
    image: "/images/notes/note-2.jpg",
    imageAlt: "Cover image for Edition 01",
    headline: "Edition 01.",
    dek:
      "How the inaugural cohort of Lyric voices came together. The artists, the partnerships, the methodology behind the imprint's first release.",
    readMin: 8,
    listenMin: 7,
    date: "April 12",
  },
  {
    slug: "two-sams",
    voice: "Morgan",
    voiceColor: MORGAN,
    image: "/images/notes/note-3.jpg",
    imageAlt: "Cover image for Two Sams",
    headline: "Two Sams.",
    dek:
      "An editorial deep dive on whether Sam Altman can be trusted, and what the answer means for the AI industry's relationship with the public.",
    readMin: 9,
    listenMin: 8,
    date: "April 18",
  },
]

export default function NotesSection() {
  return (
    <section className="lv-notes">
      <div className="lv-notes-header">
        <ScrollReveal>
          <div className="lv-philosophy-eyebrow">
            <span className="lv-eyebrow-dot" aria-hidden="true" />
            <span>Notes</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <h2 className="lv-notes-headline">
            On voice, <em>artistry</em>, and AI.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={220}>
          <p className="lv-notes-supporting">
            An ongoing publication on voice in the age of AI.
          </p>
        </ScrollReveal>
      </div>

      <div className="lv-notes-grid">
        {notes.map((note, i) => (
          <ScrollReveal key={note.slug} delay={320 + i * 90}>
            <article className="lv-note-card">
              <Link
                href={`/notes/${note.slug}`}
                className="lv-note-card-link"
              >
                <div className="lv-note-thumb">
                  <img
                    src={note.image}
                    alt={note.imageAlt}
                    className="lv-note-thumb-img"
                    loading="lazy"
                  />
                </div>

                <div className="lv-note-body">
                  <p className="lv-note-voice">
                    <span
                      className="lv-note-voice-dot"
                      aria-hidden="true"
                      style={{ background: note.voiceColor }}
                    />
                    Read by {note.voice}
                  </p>

                  <h3 className="lv-note-headline">{note.headline}</h3>

                  <p className="lv-note-dek">{note.dek}</p>

                  <div className="lv-note-meta">
                    <span>{note.readMin} min read</span>
                    <span aria-hidden="true">·</span>
                    <span>{note.listenMin} min listen</span>
                    <span aria-hidden="true">·</span>
                    <span>{note.date}</span>
                  </div>
                </div>
              </Link>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={680}>
        <p className="lv-notes-archive">
          <em>
            <Link href="/notes" className="lv-notes-archive-link">
              Read all notes <span aria-hidden="true">&rarr;</span>
            </Link>
          </em>
        </p>
      </ScrollReveal>
    </section>
  )
}
