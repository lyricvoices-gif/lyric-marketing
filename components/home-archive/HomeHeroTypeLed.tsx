/* PRESERVED — the type-led floret home hero.

   When the home hero was re-imaged around the animated "governed call"
   demo, the previous centered, type-led hero (full-bleed floret behind a
   cream scrim, single centered statement) was moved here so it can be
   restored. Nothing imports this file; re-point app/components to it to
   bring the old hero back.

   This is a verbatim copy of the prior components/HomeHero.tsx. */

import Link from "next/link"

export default function HomeHeroTypeLed() {
  return (
    <section className="lv-hero">
      {/* Home-only: contain (not the shared rule's cover) so the full flower
          silhouette reads instead of a cropped close-up. Inline so the /about
          hero, which shares .lv-hero-floret, keeps its cover crop. */}
      <img
        className="lv-hero-floret"
        src="/images/floret-home-hero.jpg"
        alt=""
        aria-hidden="true"
        style={{ objectFit: "contain" }}
      />
      <div className="lv-hero-statement">
        <h1>
          One brand voice across every <em>agent</em>.
        </h1>
        <p className="lv-hero-supporting">
          Enterprises run AI agents on the web, on the phone, and in their apps.
          Each one speaks to customers. Lyric keeps every agent on brand with
          governance that works across models and speech engines.
        </p>
        <Link href="/callio" className="lv-link-cta">
          See how it works <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  )
}
